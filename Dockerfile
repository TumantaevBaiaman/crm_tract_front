FROM node:16-alpine AS deps

WORKDIR /app

COPY package.json .
COPY ./ ./

RUN yarn

RUN yarn build

CMD yarn start