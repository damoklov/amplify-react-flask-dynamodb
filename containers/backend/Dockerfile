FROM python:3.8

WORKDIR /backend

RUN apt-get update -y 
RUN apt-get install -y git pipenv

RUN git clone https://github.com/damoklov/amplify-react-flask-dynamodb -b k8

WORKDIR /backend/amplify-react-flask-dynamodb/amplify/backend/function/gamestoreapi/src
RUN pip3 install --upgrade pip -r requirements.txt
RUN pip3 install --user pipenv
RUN pip3 --no-cache-dir install --upgrade awscli
RUN pip3 install gunicorn

#ARG AWS_ACCESS_KEY_ID
#ARG AWS_SECRET_ACCESS_KEY
#ARG AWS_REGION=us-east-2

#RUN aws ecr get-login --region us-east-1 --no-include-email

ENV STORAGE_GAMESTOREDB_NAME=gamestore-iot

EXPOSE 5000

CMD ["gunicorn", "-b", ":5000", "index:app"]
#CMD ["python3", "index.py"]
