FROM node:5

RUN mkdir -p /usr/src/tdjs

COPY . /usr/src/tdjs

WORKDIR /usr/src/tdjs

RUN npm install -g /usr/src/tdjs

RUN apt-get update
RUN apt-get install -y tofrodos

RUN fromdos $(find /usr/src/tdjs)
RUN td --version
