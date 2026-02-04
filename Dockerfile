FROM node:20-alpine AS build

WORKDIR /app

COPY public ./public
COPY src ./src
COPY package.json package.json
COPY package-lock.json ./package-lock.json
COPY jsconfig.json ./jsconfig.json

RUN npm ci --legacy-peer-deps

RUN npm run build

FROM nginx:stable-alpine

RUN apk add --no-cache curl

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf.template /etc/nginx/conf.d/default.conf.template

EXPOSE 80

CMD ["sh", "-c", "envsubst '$REACT_APP_API_BASE_URL' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]