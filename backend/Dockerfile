FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 8080

CMD ["sh", "-c", "npm run db:deploy && npm run dev"]