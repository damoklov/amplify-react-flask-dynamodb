FROM node:16-alpine AS build-step

WORKDIR /app

RUN apk --no-cache add git

RUN git clone https://github.com/damoklov/amplify-react-flask-dynamodb -b k8
WORKDIR /app/amplify-react-flask-dynamodb

RUN npm install
RUN npm run build

#CMD ["npm", "run", "start"]

FROM nginx:stable-alpine

COPY --from=build-step /app/amplify-react-flask-dynamodb/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

