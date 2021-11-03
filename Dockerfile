FROM node:14-slim

## default port 3050 - can be changed during docker build process
ARG PORT=3050

## define working directory
WORKDIR /usr/src/app

## DUE TO CACHING IN DOCKER
## WEHN REBUILD THESE STEPS ARE NOT DONE AGAIN (THEY ARE CACHED)
COPY package*.json ./

RUN npm install
## DUE TO CACHING IN DOCKER

## copy the rest of app directory
COPY . .

## expose the port
EXPOSE $PORT

## start our node application with: npm start
CMD ["npm", "start"]
