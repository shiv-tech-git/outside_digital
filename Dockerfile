FROM node:14.17.6-alpine
RUN apk add --no-cache bash
RUN mkdir /usr/app
WORKDIR /usr/app
COPY . .
RUN ["chmod", "+x", "/usr/app/wait-for-postgres.sh"]
EXPOSE 3000