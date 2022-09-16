FROM nginx:stable-alpine
COPY /build /usr/share/nginx/html
EXPOSE 9441
CMD ["nginx", "-g", "daemon off;"]
