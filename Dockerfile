FROM MySQL:latest

LABEL maintainer="nicolasbernard@gmail.com"

ENV MySQL_ROOT_PASSWORD ynovpwd

COPY ./database/migrate-v001.sql /docker-entrypoint-initdb.d

EXPOSE 3306