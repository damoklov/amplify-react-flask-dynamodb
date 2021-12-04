import requests
import json
import time
from random import randint
import os


url = 'http://www.visiti.travel/api/'
headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
API_KEY = os.environ.get("API_KEY")

while True:
    data = {"timestamp": str(time.time()), "sensor_id": "1",
             "sensor_type": "PC-1", "cpu_load": str(randint(0, 100)),
             "gpu_load": str(str(randint(0, 100))),
             "fps": str(randint(0, 100)),
             "API_KEY": API_KEY}
    x = requests.post(url, data=json.dumps(data), headers=headers)
    print("SENT:", data)
    print(x.text)
    time.sleep(5)
