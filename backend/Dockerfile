FROM node:20.11-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3001

EXPOSE 3001

CMD ["yarn", "start"]
