FROM node:23-alpine3.20

WORKDIR /app

COPY . /app/

RUN npm install --legacy-peer-deps --verbose

RUN npm run build-storybook

CMD node init.js && npm run start
