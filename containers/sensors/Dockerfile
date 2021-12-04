FROM python:3.8

WORKDIR /sensor

RUN apt-get update -y
RUN apt-get install -y git

RUN git clone https://github.com/damoklov/amplify-react-flask-dynamodb -b k8

WORKDIR /sensor/amplify-react-flask-dynamodb/containers/sensors

RUN pip3 install requests

CMD ["python3", "http-sensor.py"]