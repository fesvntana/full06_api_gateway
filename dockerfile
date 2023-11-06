FROM node:16

WORKDIR /API_Gateway

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000 

CMD ["node","index.js"]
