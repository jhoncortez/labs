from flask import Flask, jsonify, request, render_template, json
#from pymongo import MongoClient
import pymongo
from datetime import datetime


app = Flask(__name__)
now = datetime.now() # current date and time

# manage cache
# app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 2592000 # 30 days
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

client = pymongo.MongoClient('mongodb://mongodb:27017/')
db = client.test_database

@app.route('/')
def hello_world():
    return "Good morning world!"

@app.route('/users')
def users():
    
    try:
        item = {}
        data = []
        collection = db.users.find()
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
    except:
        print("An exception occurred")
        return str({}) 
    

@app.route('/user/<string:username>')
def getUser(username): 

    myquery = { "name": username }

    try:
        doc = db.users.find_one(myquery)
        user = {
            "id":str(doc['_id']),
            "name": doc['name'],
            "lastname": doc['lastname']
        }
        return json.dumps(user)
    except:
        print("An exception occurred")
        return str({}) 
    

    

@app.route('/search', methods=['POST', 'GET'])
def search(): 
    name = request.args.get('name')
    myquery = { "name": name }

    try:
        doc = db.users.find(myquery)

        items = {}
        data = []
        for x in doc:
            items = {
                "id":str(x['_id']),
                "name": x['name'],
                "lastname": x['lastname']
            }
            data.append(items)

        return jsonify(
            data=data
        )
        
    except:
        print("An exception occurred")
        return str({}) 

@app.route('/addUser', methods=['POST', 'GET'])
def addUser():

    if request.method == 'POST':
        name = request.form.get('name')
        lastname = request.form.get('lastname')

    elif request.method == 'GET':
        name = request.args.get('name')
        lastname = request.args.get('lastname')

    user = {
            'name': name,
            'lastname': lastname
        }

    try:
        db.users.insert_one(user)
        return jsonify(
            response = {'text':f'user {name} {lastname} Saved!','status': 200, 'error': 0}
            )
    except:
        print("An exception occurred")
        return jsonify(
            response = {'text':"An exception occurred",'status': 403, 'error': 1}
            )


@app.route('/ajax1')
def ajax1():
    return render_template('/ajax1/index.html', title = 'Ajax 1 - Text file',time = now.strftime("%m%d%Y%f"))

@app.route('/ajax2')
def ajax2():
    return render_template('/ajax2/index.html', title = 'Ajax 2 - Local JSON',time = now.strftime("%m%d%Y%f"))

@app.route('/ajax3')
def ajax3():
    return render_template('/ajax3/index.html', title = 'Ajax 3 - External Api',time = now.strftime("%m%d%Y%f"))

@app.route('/ajax4')
def ajax4():
    return render_template('/ajax4/index.html', title = 'Ajax 4 - Ajax & Flask Forms',time = now.strftime("%m%d%Y%f"))

@app.route('/addForm')
def addForm():
    return render_template('/ajax4/add.html', title = 'Ajax 4 - Add user form',time = now.strftime("%m%d%Y%f"))