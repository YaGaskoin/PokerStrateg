FROM node:13-alpine
EXPOSE 3000
RUN mkdir /app
WORKDIR /app/
COPY ./package*.json ./
RUN npm install
COPY ./ /app
CMD ['npm', 'start']