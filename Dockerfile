ARG VERSION=20

FROM node:${VERSION} AS build

WORKDIR /app

COPY package.json ./

RUN npm config set registry https://registry.npmjs.org/
RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY config.js.template /usr/share/nginx/html/config.js.template

COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["/bin/sh", "-c", "envsubst '${BASE_URL}' < /usr/share/nginx/html/config.js.template > /usr/share/nginx/html/config.js && nginx -g 'daemon off;'"]