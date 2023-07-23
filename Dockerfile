FROM node:18.16.0-alpine3.16
WORKDIR /

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start:server"]
