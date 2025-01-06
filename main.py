# -*- coding: utf-8 -*-
from flask import Flask, render_template, request, redirect, url_for, session, Response, make_response
from werkzeug.utils import secure_filename
import os
import datetime
import json

app = Flask(__name__)
app.secret_key = 'gv4ds1nhjmlk8nj3bhg4skgo6j7dhbvigsn9jgnsv3jr'

DATA_DIR = 'data'


def load_json(filename):
    filepath = os.path.join(DATA_DIR, filename)
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []


def save_json(filename, data):
    filepath = os.path.join(DATA_DIR, filename)
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)


def get_next_id(data, key="id"):
    if not data:
        return 1
    return max(item.get(key, 0) for item in data) + 1


@app.after_request
def add_header(response):
    response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'
    return response


@app.route('/', methods=['GET'])
def index():
    if 'session_username' in request.cookies:
        return redirect(url_for('dashboard'))
    return redirect(url_for('signin'))


@app.route('/magazine')
def magazine():
    return render_template('magazine.html')


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

                    # Получаем текущее время
                    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                    # Обновляем last_login в users.json
                    for user in users:
                        if user['username'] == username:
                            user['last_login'] = now
                            break
                    save_json('users.json', users)

                    # Устанавливаем Cookie
                    response = make_response(redirect(url_for('dashboard')))
                    response.set_cookie(
                        'session_username', username, httponly=True, secure=True, samesite='Lax')
                    return response
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
            users = load_json('users.json')
            now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            new_user = {
                'id': get_next_id(users),
                'username': username,
                'password': password,
                'role': 'user',
                "last_login": now
            }
            users.append(new_user)
            save_json('users.json', users)

            # Устанавливаем Cookie
            response = make_response(redirect(url_for('dashboard')))
            response.set_cookie('session_username', username,
                                httponly=True, secure=True, samesite='Lax')
            return response
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
    if 'session_username' in request.cookies:
        session['username'] = request.cookies['session_username']
        users = load_json('users.json')
        for user in users:
            if user['username'] == session['username']:
                session['role'] = user['role']
        menu = request.args.get('menu')
        user_pages_settings = load_json('user_pages_settings.json')
        pages = user_pages_settings.get(session['role'], [])

        if session['role'] == 'user':
            if menu not in ['requests', None]:
                return redirect(url_for('dashboard'))
        return render_template('dashboard/dashboard.html', menu=menu, pages=pages)
    return redirect(url_for('signin'))


@app.route('/dashboard/load_page')
def load_subpage():
    menu = request.args.get('menu')
    subpage = request.args.get('subpage')
    print(f"Loading subpage: menu={menu}, subpage={subpage}")
    if menu == "inventory_management":
        if subpage == "inventory_add_edit":
            return render_template('dashboard_subsubpage/inventory_management/inventory_add_edit.html')
        elif subpage == "all_inventory":
            return render_template('dashboard_subsubpage/inventory_management/all_inventory.html')
    elif menu == "inventory_assignment":
        if subpage == "inventory_assignment_create":
            return render_template('dashboard_subsubpage/inventory_assignment/inventory_assignment_create.html')
        elif subpage == "all_assignments":
            return render_template('dashboard_subsubpage/inventory_assignment/all_assignments.html')
    elif menu == "purchases_management":
        if subpage == "purchases_add_edit":
            return render_template('dashboard_subsubpage/purchases_management/purchases_add_edit.html')
        elif subpage == "all_purchase_plans":
            return render_template('dashboard_subsubpage/purchases_management/all_purchase_plans.html')
    elif menu == "reports":
        if subpage == "all_inventory":
            return render_template('dashboard_subsubpage/reports/all_inventory.html')
        elif subpage == "all_assignments_and_purchases":
            return render_template('dashboard_subsubpage/reports/all_assignments_and_purchases.html')
    elif menu == "requests":
        return render_template('dashboard_subpage/requests.html')
    return "Страница не найдена", 404


# Маршруты для inventory
@app.route('/dashboard/inventory_add', methods=['POST'])
def inventory_add():
    try:
        data = request.form
        image_type = data['image_type']
        image_file = None
        if image_type == '1':
            image_file = request.files.get('image')
            if image_file:
                file_extension = os.path.splitext(image_file.filename)[1]
                image_filename = data['name'] + file_extension
                image_path = os.path.join('static/images', image_filename)
                image_file.save(image_path)
                image = image_filename
            else:
                image = ""
        else:
            image = data.get('image', '')
        inventory = load_json('inventory.json')
        new_inventory = {
            'id': get_next_id(inventory),
            'name': data['name'],
            'image': image,
            'quantity': int(data['quantity']),
            'state': data['state'],
            'image_type': image_type,
            'price': int(data['price']),
        }
        inventory.append(new_inventory)
        save_json('inventory.json', inventory)
        return '', 200
    except Exception as e:
        print(e)
        return "Ошибка добавления инвентаря", 500


@app.route('/dashboard/inventory_edit', methods=['POST'])
def inventory_edit():
    try:
        data = request.form
        image_type = data['edit-image_type']
        image_file = None
        if image_type == '1':
            image_file = request.files.get('image')
            if image_file:
                file_extension = os.path.splitext(image_file.filename)[1]
                image_filename = data['edit-name'] + file_extension
                image_path = os.path.join('static/images', image_filename)
                image_file.save(image_path)
                image = image_filename
            else:
                image = ""
        else:
            image = data.get('edit-image', '')
        inventory = load_json('inventory.json')
        edit_id = int(data['edit-id'])
        for item in inventory:
            if item['id'] == edit_id:
                item['name'] = data['edit-name']
                item['image'] = image
                item['quantity'] = int(data['edit-quantity'])
                item['state'] = data['edit-state']
                item['image_type'] = image_type
                item['price'] = int(data['edit-price'])
                break
        save_json('inventory.json', inventory)
        return '', 200
    except Exception as e:
        print(e)
        return "Ошибка изменения инвентаря", 500


@app.route('/dashboard/get_all_inventory')
def get_all_inventory():
    try:
        inventory = load_json('inventory.json')
        json_data = json.dumps(inventory, ensure_ascii=False, indent=4)
        return Response(json_data, mimetype='application/json; charset=utf-8')
    except Exception as e:
        print(e)
        return "Error loading inventory", 500


# Маршруты для assignments
@app.route('/dashboard/assign_inventory', methods=['POST'])
def assign_inventory():
    try:
        data = request.get_json()
        assignments = load_json('inventory_assignments.json')
        now = datetime.datetime.now().strftime("%Y-%m-%d")
        new_assignment = {
            'id': get_next_id(assignments),
            'user_id': int(data['user_id']),
            'inventory_id': int(data['inventory_id']),
            'quantity_assigned': int(data['quantity_assigned']),
            'assignment_date': now
        }
        assignments.append(new_assignment)
        save_json('inventory_assignments.json', assignments)
        return '', 200
    except Exception as e:
        print(e)
        return "Ошибка назначения инвентаря", 500


@app.route('/dashboard/get_all_assignments')
def get_all_assignments():
    try:
        assignments = load_json('inventory_assignments.json')
        json_data = json.dumps(assignments, ensure_ascii=False, indent=4)
        return Response(json_data, mimetype='application/json; charset=utf-8')
    except Exception as e:
        print(e)
        return "Error loading assignments", 500


# Маршруты для purchases
@app.route('/dashboard/purchase_add', methods=['POST'])
def purchase_add():
    try:
        data = request.get_json()
        purchases = load_json('purchase_plans.json')
        new_purchase = {
            'id': get_next_id(purchases),
            'inventory_id': int(data['inventory_id']),
            'quantity': int(data['quantity']),
            'price': int(data['price']),
            'supplier': data['supplier']
        }
        purchases.append(new_purchase)
        save_json('purchase_plans.json', purchases)
        return '', 200
    except Exception as e:
        print(e)
        return "Ошибка добавления плана закупки", 500


@app.route('/dashboard/purchase_edit', methods=['POST'])
def purchase_edit():
    try:
        data = request.get_json()
        purchases = load_json('purchase_plans.json')
        edit_id = int(data['edit-id'])
        for item in purchases:
            if item['id'] == edit_id:
                item['inventory_id'] = int(data['edit-inventory_id'])
                item['quantity'] = int(data['edit-quantity'])
                item['price'] = int(data['edit-price'])
                item['supplier'] = data['edit-supplier']
                break
        save_json('purchase_plans.json', purchases)
        return '', 200
    except Exception as e:
        print(e)
        return "Ошибка изменения плана закупки", 500


@app.route('/dashboard/get_all_purchases')
def get_all_purchases():
    try:
        purchases = load_json('purchase_plans.json')
        json_data = json.dumps(purchases, ensure_ascii=False, indent=4)
        return Response(json_data, mimetype='application/json; charset=utf-8')
    except Exception as e:
        print(e)
        return "Error loading purchases", 500


# Маршруты для reports
@app.route('/dashboard/get_all_inventory')
def get_all_inventory_for_report():
    try:
        inventory = load_json('inventory.json')
        json_data = json.dumps(inventory, ensure_ascii=False, indent=4)
        return Response(json_data, mimetype='application/json; charset=utf-8')
    except Exception as e:
        print(e)
        return "Error loading inventory", 500


@app.route('/dashboard/get_all_assignments')
def get_all_assignments_for_report():
    try:
        assignments = load_json('inventory_assignments.json')
        json_data = json.dumps(assignments, ensure_ascii=False, indent=4)
        return Response(json_data, mimetype='application/json; charset=utf-8')
    except Exception as e:
        print(e)
        return "Error loading assignments", 500


@app.route('/dashboard/get_all_purchases')
def get_all_purchases_for_report():
    try:
        purchases = load_json('purchase_plans.json')
        json_data = json.dumps(purchases, ensure_ascii=False, indent=4)
        return Response(json_data, mimetype='application/json; charset=utf-8')
    except Exception as e:
        print(e)
        return "Error loading purchases", 500


# Маршруты для requests
@app.route('/dashboard/request_create', methods=['POST'])
def request_create():
    try:
        data = request.get_json()
        requests = load_json('requests.json')
        now = datetime.datetime.now().strftime("%Y-%m-%d")
        new_request = {
            'id': get_next_id(requests),
            'user_id': get_user_id_from_username(session['username']),
            'inventory_id': int(data['inventory_id']),
            'quantity_requested': int(data['quantity_requested']),
            'status': 'pending',
            'request_type': data['request_type'],
            'request_date': now,
        }
        requests.append(new_request)
        save_json('requests.json', requests)
        return '', 200
    except Exception as e:
        print(e)
        return "Ошибка создания запроса", 500


@app.route('/dashboard/get_all_requests')
def get_all_requests():
    try:
        requests = load_json('requests.json')
        json_data = json.dumps(requests, ensure_ascii=False, indent=4)
        return Response(json_data, mimetype='application/json; charset=utf-8')
    except Exception as e:
        print(e)
        return "Error loading requests", 500


def get_user_id_from_username(username):
    users = load_json('users.json')
    for user in users:
        if user['username'] == username:
            return user['id']
    return None


# Маршрут для завершения сессии
@app.route('/logout')
def logout():
    session.pop('username', None)
    session.pop('role', None)
    resp = make_response(redirect(url_for('signin')))
    resp.set_cookie('session_username', '', expires=0)
    return resp


# Маршруты для обработки ошибок
@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404


@app.errorhandler(Exception)
def handle_exception(e):
    if 'session_username' in session and session['role'] == 'admin':
        return render_template('admin_error.html', error=str(e)), 500
    else:
        return render_template('user_error.html'), 500


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=443,
            ssl_context=('cert.pem', 'key.pem'))
