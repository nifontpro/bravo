FROM node:18-buster

RUN mkdir /app
WORKDIR /app

COPY package*.json /app
RUN npm install

COPY . /app

EXPOSE 3000:3000
ENTRYPOINT ["npm","run","dev"]