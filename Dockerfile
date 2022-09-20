FROM node:alpine as build-stage
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY . .
RUN npm ci
RUN npm run build
FROM nginx:stable-alpine
COPY --from=build-stage /app/build/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]