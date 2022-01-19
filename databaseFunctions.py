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
            user_gender, user_phone_number, user_weight, user_activity_level)
    values ('{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}');""".format(user_data.get('user_name'), user_data.get('user_email'), user_data.get('user_password'), user_data.get('user_age'), user_data.get('user_gender'), user_data.get('user_phone_number'),user_data.get('user_weight'),user_data.get('user_activity_level'))
    cursor = conn.cursor()
    cursor.execute(query, user_data)
    conn.commit()


# delete
def delete_user(conn, user_name=None):
    query = ""
    if user_name is not None:
        query = f"delete from user_data where user_name = '{user_name}'"
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
    # voiam sa afisez datele in html si momentan signup le baga in local storage
    # si le folosesc de acolo, problema e la sign in
    cursor = conn.cursor()
    query = f"SELECT user_name, user_age, user_gender, user_weight, user_activity_level FROM user_data WHERE user_email = '{current_user}'"
    result = list(cursor.execute(query))
    return result

