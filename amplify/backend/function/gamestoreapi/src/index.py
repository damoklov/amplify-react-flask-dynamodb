import awsgi
import json
import boto3
import os
import ast
from flask_cors import CORS
from flask import Flask, jsonify, request
from uuid import uuid4

client = boto3.client("dynamodb")
TABLE = os.environ.get("STORAGE_GAMESTOREDB_NAME")
app = Flask(__name__)
CORS(app)
BASE_ROUTE = "/game"


@app.route(BASE_ROUTE, methods=['GET'])
def list_games():
    response = client.scan(TableName=TABLE)
    data = response['Items']
    while response.get('LastEvaluatedKey'):
        response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
        data.extend(response['Items'])
    return jsonify(data)


@app.route(BASE_ROUTE, methods=['POST'])
def create_game():
    request_json = request.get_json()
    #request_json = ast.literal_eval(request.__dict__['environ']['awsgi.event']['body'])
    client.put_item(TableName=TABLE, Item={
        'id': {'S': str(uuid4())},
        'name': {'S': request_json.get("name")},
        'developer': {'S': request_json.get("developer")},
        'browser': {'S': request_json.get("browser")},
        'registered': {'S': request_json.get("registered")},
        'started': {'S': request_json.get("started")},
        'online': {'BOOL': request_json.get("online")},
    })
    return jsonify(message="item created")


@app.route(BASE_ROUTE + '/<game_id>', methods=['GET'])
def get_game(game_id):
    item = client.get_item(TableName=TABLE, Key={
        'id': {
            'S': game_id
        }
    })
    return jsonify(data=item)


@app.route(BASE_ROUTE + '/<game_id>', methods=['PUT'])
def update_game(game_id):
    client.update_item(
        TableName=TABLE,
        Key={'id': {'S': game_id}},
        UpdateExpression='SET #name = :name, #developer = :developer, #browser = :browser, #registered = :registered, #started = :started, #online = :online',
        ExpressionAttributeNames={
            '#name': 'name',
            '#developer': 'developer',
            '#browser': 'browser',
            '#registered': 'registered',
            '#started': 'started',
            '#online': 'online'
        },
        ExpressionAttributeValues={
            ':name': {'S': request.json['name']},
            ':developer': {'S': request.json['developer']},
            ':browser': {'S': request.json['browser']},
            ':registered': {'S': request.json['registered']},
            ':started': {'S': request.json['started']},
            ':online': {'BOOL': request.json['online']},
        }
    )
    return jsonify(message="item updated")


@app.route(BASE_ROUTE + '/<game_id>', methods=['DELETE'])
def delete_game(game_id):
    client.delete_item(
        TableName=TABLE,
        Key={'id': {'S': game_id}}
    )
    return jsonify(message="item deleted")


def handler(event, context):
    return awsgi.response(app, event, context)
