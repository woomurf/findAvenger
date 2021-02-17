FROM node:10.23.0

WORKDIR /app 

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install 

COPY . /app

EXPOSE 80

CMD node server.js



