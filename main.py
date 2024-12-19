import json
from flask import Flask, render_template, request, redirect, url_for, session
import os

app = Flask(__name__)
app.secret_key = 'trdsfgdnhjmkmnhcfgxdcfgvbhjnmkjnhcf'

DATA_DIR = 'data'


def load_json(filename):
    filepath = os.path.join(DATA_DIR, filename)
    try:
        with open(filepath, 'r') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []


def save_json(filename, data):
    filepath = os.path.join(DATA_DIR, filename)
    with open(filepath, 'w') as f:
        json.dump(data, f, indent=4)


def get_next_id(data, key="id"):
    if not data:
        return 1
    return max(item.get(key, 0) for item in data) + 1


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/signin', methods=['POST'])
def signin():
    if request.method == 'POST':
        username = request.form['user']
        password = request.form['pass']
        users = load_json('users.json')
        for user in users:
            if user['username'] == username and user['password'] == password:
                session['username'] = username
                session['role'] = user['role']
                return redirect(url_for('dashboard'))
        return 'Invalid credentials', 401
    return redirect(url_for('index'))


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['user']
        password = request.form['pass']

        users = load_json('users.json')
        new_user = {
            'id': get_next_id(users),
            'username': username,
            'password': password,
            'role': 'user'
        }
        users.append(new_user)
        save_json('users.json', users)
        return redirect(url_for('index'))
    return render_template('registr.html')


@app.route('/dashboard')
def dashboard():
    if 'username' in session:
        if session['role'] == 'admin':
            return render_template('dashboard.html', role='admin', username=session['username'])
        elif session['role'] == 'user':
            return render_template('dashboard.html', role='user', username=session['username'])
    return redirect(url_for('index'))


@app.route('/logout')
def logout():
    session.pop('username', None)
    session.pop('role', None)
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(debug=True)