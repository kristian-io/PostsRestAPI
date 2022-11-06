FROM node:18-alpine3.15 AS development

WORKDIR /app


COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY . ./

EXPOSE 3000

CMD ["npm", "start"]

