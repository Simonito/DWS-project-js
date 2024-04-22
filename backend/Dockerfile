FROM node:21.7.3

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 41000

CMD [ "npm", "start" ]
