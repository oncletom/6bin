FROM node:0.10
MAINTAINER David Bruant <david.bruant@ants.builders>

RUN mkdir /usr/6bin
WORKDIR /usr/6bin

RUN npm install nodemon -g
