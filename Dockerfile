# Estágio de build
FROM node:18.20.4 as build

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY --from=build /app/dist/ .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
