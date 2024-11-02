FROM node:alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

RUN yarn build

COPY . .

RUN medusa telemetry --disable

RUN yarn predeploy

CMD ["yarn", "run", "start"]