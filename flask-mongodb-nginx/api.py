from flask import Flask, jsonify, request, render_template
from pymongo import MongoClient
from datetime import datetime

app = Flask(__name__)
now = datetime.now() # current date and time

# manage cache
# app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 2592000 # 30 days
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

client = MongoClient('mongodb://mongodb:27017/')
db = client.test_database

@app.route('/')
def hello_world():
    return "Good morning world!"

@app.route('/users')
def users():
    collection = db.users.find()

    item = {}
    data = []
    for element in collection:
        item = {
            'id': str(element['_id']),
            'name': element['name'],
            'lastname': element['lastname']
        }
        data.append(item)

    return jsonify(
        data=data
    )

@app.route('/user')
def user():
    name = request.args.get('name')
    lastname = request.args.get('lastname')
    user = {
        'name': name,
        'lastname': lastname
    }
    db.users.insert_one(user)

    return 'Saved!', 201

@app.route('/ajax1')
def ajax1():
    return render_template('/ajax1/index.html', title = 'Ajax 1 - Text file',time = now.strftime("%m%d%Y%f"))

@app.route('/ajax2')
def ajax2():
    return render_template('/ajax2/index.html', title = 'Ajax 2 - Local JSON',time = now.strftime("%m%d%Y%f"))

@app.route('/ajax3')
def ajax3():
    return render_template('/ajax3/index.html', title = 'Ajax 3 - External Api',time = now.strftime("%m%d%Y%f"))