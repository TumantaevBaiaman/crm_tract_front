FROM node:16-alpine AS deps

WORKDIR /app

COPY ./ ./

RUN yarn

CMD npm run dev