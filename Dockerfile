FROM node:latest

MAINTAINER Tim Pritchard

ENV PORT=3000
ENV NODE_ENV=production

COPY . /var/www
WORKDIR /var/www

RUN npm install

EXPOSE $PORT

ENTRYPOINT ["npm", "start"]
