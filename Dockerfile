FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Expón el puerto que utiliza tu aplicación de NestJS (el mismo que tienes configurado en tu aplicación)
EXPOSE 3000

RUN npm run build

CMD [ "npm", "run", "start:dev" ]