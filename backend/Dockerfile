FROM node:lts-hydrogen

WORKDIR /app
RUN npm install -g typescript
COPY package*.json ./
RUN npm install
COPY . .
RUN tsc
WORKDIR /app/dist/application
EXPOSE 3003
CMD ["node", "server.js"]
