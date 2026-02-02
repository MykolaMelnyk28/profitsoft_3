FROM node:20-alpine AS build

WORKDIR /app

COPY public ./public
COPY src ./src
COPY package.json package.json
COPY package-lock.json ./package-lock.json
COPY jsconfig.json ./jsconfig.json
COPY .env ./.env

RUN npm ci --legacy-peer-deps

RUN npm run build

FROM nginx:stable-alpine

RUN apk add --no-cache curl

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]