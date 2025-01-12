#staage 1
FROM node:20 as build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

#stage 2 L: serve angular app
FROM nginx:stable-alpine
COPY --from=build /app/dist/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
