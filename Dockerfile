FROM node:alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

RUN medusa telemetry --disable

RUN yarn predeploy

CMD ["yarn", "run", "start"]