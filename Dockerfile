FROM node:alpine AS build

WORKDIR /app

ARG STORE_CORS=${STORE_CORS}
ARG ADMIN_CORS=${ADMIN_CORS}
ARG AUTH_CORS=${AUTH_CORS}
ARG JWT_SECRET=${JWT_SECRET}
ARG COOKIE_SECRET=${COOKIE_SECRET}
ARG DATABASE_URL=${DATABASE_URL}
ARG REDIS_URL=${REDIS_URL}

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:alpine

COPY --from=build /app/.medusa/server ./.medusa/server
COPY --from=build /app/package.json ./

RUN npm run telemetry

RUN npm run migrate

ENV NODE_ENV=production

CMD ["npm", "run", "start"]