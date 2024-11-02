FROM node:alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

RUN yarn predeploy

COPY . .

CMD ["yarn", "run", "start"]