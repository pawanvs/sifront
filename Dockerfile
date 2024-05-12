FROM node:20.13-bookworm

WORKDIR /usr/src/app

RUN npm install -g npm@10.5.2

COPY package*.json ./
COPY vite.config.js ./

COPY . .

RUN npm install

EXPOSE 4000

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
