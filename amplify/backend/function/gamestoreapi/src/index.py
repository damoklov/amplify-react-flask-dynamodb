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
API_KEY = os.environ.get("API_KEY")
app = Flask(__name__)
CORS(app)
BASE_ROUTE = "/iot"


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
    if request_json.get("API_KEY") != API_KEY:
        return jsonify(message="Wrong API key")
    client.put_item(TableName=TABLE, Item={
        'id': {'S': str(uuid4())},
        'timestamp': {'S': request_json.get("timestamp")},
        'sensor_id': {'S': request_json.get("sensor_id")},
        'sensor_type': {'S': request_json.get("sensor_type")},
        'cpu_load': {'N': request_json.get("cpu_load")},
        'gpu_load': {'N': request_json.get("gpu_load")},
        'fps': {'N': request_json.get("fps")},
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
        UpdateExpression='SET #timestamp = :timestamp, #sensor_id = :sensor_id, #sensor_type = :sensor_type, #cpu_load = :cpu_load, #gpu_load = :gpu_load, #fps = :fps',
        ExpressionAttributeNames={
            '#timestamp': 'timestamp',
            '#sensor_id': 'sensor_id',
            '#sensor_type': 'sensor_type',
            '#cpu_load': 'cpu_load',
            '#gpu_load': 'gpu_load',
            '#fps': 'fps'
        },
        ExpressionAttributeValues={
            ':timestamp': {'S': request.json['timestamp']},
            ':sensor_id': {'S': request.json['sensor_id']},
            ':sensor_type': {'S': request.json['sensor_type']},
            ':cpu_load': {'N': request.json['cpu_load']},
            ':gpu_load': {'N': request.json['gpu_load']},
            ':fps': {'N': request.json['fps']},
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
