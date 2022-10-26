FROM node:lts-alpine

WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .

ARG PORT
ENV PORT ${PORT}

EXPOSE ${PORT}

CMD ["npm", "start"]
