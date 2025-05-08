FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install -g vite && npm install

COPY . .

EXPOSE 5174
CMD ["npm", "run", "dev"]
