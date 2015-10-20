FROM node:4.2
MAINTAINER Alexandre Vallette <alexandre.vallette@ants.builders>

RUN mkdir /6bin
WORKDIR /6bin
RUN npm install nodemon -g
