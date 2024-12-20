import json
from flask import Flask, render_template, request, redirect, url_for, session, Response
import os

app = Flask(__name__)
app.secret_key = 'gv4ds1nhjmlk8nj3bhg4skgo6j7dhbvigsn9jgnsv3jr'

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


@app.route('/', methods=['GET'])
def index():
    return redirect(url_for('signin'))


@app.route('/signin', methods=['GET', 'POST'])
def signin():
    if request.method == 'POST':
        try:
            data = request.get_json()
            username = data['user']
            password = data['pass']
            users = load_json('users.json')

            for user in users:
                if user['username'] == username and user['password'] == password:
                    session['username'] = username
                    session['role'] = user['role']
                    return '', 200
            return 'Неверные учетные данные', 401
        except Exception as e:
            print(e)
            return 'Error parsing JSON', 400
    return render_template('sign_in.html')


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        try:
            data = request.get_json()
            username = data['user']
            password = data['pass']
            if len(password) < 6:
                return "Пароль слишком короткий (минимум 6 символов)", 400
            users = load_json('users.json')
            new_user = {
                'id': get_next_id(users),
                'username': username,
                'password': password,
                'role': 'user'
            }
            users.append(new_user)
            save_json('users.json', users)
            return render_template('register__sign_up.html', registration_success=True)
        except Exception as e:
            print(e)
            return "Registration failed", 500
    return render_template('register__sign_up.html', registration_success=False)


@app.route('/check_username', methods=['POST'])
def check_username():
    try:
        data = request.get_json()
        username = data['user']
        users = load_json('users.json')
        exists = any(user['username'] == username for user in users)
        return json.dumps({'exists': exists})
    except Exception as e:
        print(e)
        return "Error checking username", 500


@app.route('/dashboard')
def dashboard():
    if 'username' in session:
        if session['role'] == 'admin':
            return render_template('dashboard.html', role='admin', username=session['username'])
        elif session['role'] == 'user':
            return render_template('dashboard.html', role='user', username=session['username'])
    return redirect(url_for('signin'))


@app.route('/magazine')
def magazine():
    return render_template('magazine.html')


@app.route('/get_inventory')
def get_inventory():
    try:
        inventory = load_json('inventory.json')
        json_data = json.dumps(inventory, ensure_ascii=False, indent=4)
        return Response(json_data, mimetype='application/json; charset=utf-8')
    except Exception as e:
        print(e)
        return "Error loading inventory", 500


@app.route('/logout')
def logout():
    session.pop('username', None)
    session.pop('role', None)
    return redirect(url_for('signin'))


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)
