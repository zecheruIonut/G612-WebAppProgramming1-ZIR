import sqlite3


# connect to db --> connection object
def create_connection(dbfile):
    conn = sqlite3.connect(dbfile)
    return conn


# get a cursor --> cursor object
def create_cursor(conn):
    cursor = conn.cursor()
    return cursor


# insert one user
def create_user(conn, user_data):
    query = """insert into user_data (user_name, user_email, user_password, user_age,
            user_gender, user_phone_number, user_weight, user_activity_level, user_height)
    values ('{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}');""".format(user_data.get('user_name'), user_data.get('user_email'), user_data.get('user_password'), user_data.get('user_age'), user_data.get('user_gender'), user_data.get('user_phone_number'),user_data.get('user_weight'),user_data.get('user_activity_level'), user_data.get('user_height'))
    cursor = conn.cursor()
    cursor.execute(query, user_data)
    conn.commit()


# delete user
def delete_user(conn, user_email=None):
    query = ""
    if user_email is not None:
        query = f"delete from user_data where user_email = '{user_email}'"
    cursor = conn.cursor()
    cursor.execute(query)
    conn.commit()


def get_user_password(conn, email):
    cursor = conn.cursor()
    query = f"select user_password from user_data where user_email='{email}'"
    cursor.execute(query)
    result = cursor.fetchone()
    result = ''.join(ch for ch in result if ch.isalnum())
    return result


def get_user_data(conn, current_user):
    cursor = conn.cursor()
    query = f"SELECT user_name, user_age, user_gender, user_weight, user_activity_level, user_height FROM user_data WHERE user_email = '{current_user}'"
    cursor.execute(query)
    result = list(cursor.fetchone())
    return result

