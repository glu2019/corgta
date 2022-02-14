FROM node:latest as build
EXPOSE 4200
RUN mkdir /usr/local/corgta/
RUN mkdir /usr/local/corgta/frontend/
WORKDIR /usr/local/corgta/frontend/

COPY package.json /usr/local/corgta/frontend/
RUN npm install -g @angular/cli
RUN npm install --legacy-peer-deps
CMD ["npm", "start"]