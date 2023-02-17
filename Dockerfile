FROM node:16-alpine AS deps

WORKDIR /app

COPY package.json .
COPY ./ ./

RUN yarn

CMD yarn start