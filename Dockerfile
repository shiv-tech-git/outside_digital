FROM node:latest
RUN mkdir /usr/app
WORKDIR /usr/app
COPY . .
RUN npm install
RUN ["chmod", "+x", "/usr/app/wait-for-postgres.sh"]
EXPOSE 3000