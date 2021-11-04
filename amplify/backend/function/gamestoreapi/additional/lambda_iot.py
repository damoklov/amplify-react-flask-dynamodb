import json
import boto3
from uuid import uuid4


def lambda_handler(event, context):
    client = boto3.client("dynamodb")
    response = client.put_item(
        TableName='iot-iot',
        Item={
            'id': {'S': str(uuid4())},
            'timestamp':{'S':event['timestamp']},
            'sensor_id':{'S':event['sensor_id']},
            'sensor_type':{'S':event['sensor_type']},
            'cpu_load':{'N':event['cpu_load']},
            'gpu_load':{'N':event['gpu_load']},
            'fps':{'N':event['fps']}
            }
        )

    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
