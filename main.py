from flask import Flask, request
from flask_cors import CORS


from databaseFunctions import create_connection, create_user, get_user_password, delete_user, get_user_data
database = "./users.db"
current_user = ""

app = Flask("Fitness Something Something")
CORS(app)


@app.route('/api/sign-up', methods=["POST"])
def signup():
    try:
        body = request.json
        global current_user
        conn = create_connection(database)
        create_user(conn, body)
        current_user = body.get('user_email')
        conn.close()
        return '', 204
    except Exception as e:
        error = {
            "error": f"--Failed to create user. Message: {e}"
        }
        return error, 500


@app.route('/api/sign-in', methods=["POST"])
def sign_in():
    body = request.json
    conn = create_connection(database)
    email = body.get("user_email", None)
    global current_user
    current_user = email
    if email is None:
        error = {
            "error": "--Failed to sign in. Missing email."
        }
        return error, 400

    password = body.get("user_password", None)
    if password is None:
        error = {
            "error": "--Failed to sign in. Missing password."
        }
        return error, 400

    try:
        existing_password = get_user_password(conn, email)
    except Exception as e:
        error = {
            "error": f"--Failed to sign in. Message: {e}"
        }
        return error, 500

    if existing_password is None:
        error = {
            "error": "--Failed to sign in. Password does not exist."
        }
        return error, 401

    if password != existing_password:
        error = {
            "error": "--Failed to sign in. Invalid email or password."
        }
        return error, 401
    conn.close()
    return '', 204


@app.route('/api/sign-in/user-data', methods=["GET"])
def user_data():
    try:
        global current_user
        conn = create_connection(database)
        data = get_user_data(conn, current_user)
        return data, 204
    except Exception as e:
        error = {
            'error': f"Failed to get user data. Message:  {e}"
        }
        conn.close()
        return error, 500


@app.route('/api/delete', methods=["POST"])
def delete():
    print(current_user)
    conn = create_connection(database)
    try:
        delete_user(conn, current_user)
        return '', 201
    except Exception as e:
        error = {
            "error": f"--Failed to delete user. Message: {e}"
        }
        return error, 400
    conn.close()
    return '', 200


if __name__ == "__main__":
    app.run(debug=True, port=3013)