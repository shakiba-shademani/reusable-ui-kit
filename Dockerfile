FROM node:23-alpine3.20

WORKDIR /app

COPY . /app/

RUN npm install --legacy-peer-deps --verbose

RUN npm run build-storybook

EXPOSE 3000

CMD ["npm", "run", "start"]
