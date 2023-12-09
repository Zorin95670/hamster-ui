# Build stage
FROM node:18.12-alpine as build-stage
WORKDIR /app
COPY . .
RUN rm -rf node_modules dist
RUN npm install -g npm@8.19.2
RUN npm install
RUN npm run build

# Production stage
FROM nginx:1.18.0-alpine as production-stage
COPY --from=build-stage /app/dist/spa          /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf        /etc/nginx/nginx.conf
COPY --from=build-stage /app/ssl/localhost.crt /etc/nginx/ssl/localhost.crt
COPY --from=build-stage /app/ssl/localhost.key /etc/nginx/ssl/localhost.key
COPY --from=build-stage /app/ssl/nginx.pass    /etc/keys/nginx.pass
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
