FROM node:lts-buster-slim

WORKDIR /home/node
RUN apt update \
    && apt install -y \
        mariadb-client \
        sudo \
        supervisor \
        whois \
    && rm -rf /var/lib/apt/lists/* \
    && yarn global add \
        typeorm \
        typesync \
    && typeorm init --name app --database mysql \
    && chown -R node:node /home/node

USER node
WORKDIR /home/node/app
RUN yarn add \
         @types/express-session \
         @typescript-eslint/eslint-plugin \
         @typescript-eslint/parser \
         apollo-cache-inmemory \
         apollo-client \
         apollo-link-error \
         apollo-link-http \
         apollo-server-express \
         apollo-server-testing \
         bcrypt \
         cookie-parser \
         cors \
         eslint \
         eslint-config-prettier \
         eslint-plugin-prettier \
         express \
         express-graphql \
         express-session \
         fluent-logger \
         graphql \
         graphql-tools \
         jest \
         keycloak-connect \
         mysql2 \
         nodemon \
         openid-client \
         passport \
         prettier \
         reflect-metadata \
         supertest \
         ts-jest \
         ts-node \
         tsconfig-paths \
         type-graphql \
         typescript \
    && typesync \
    && rm /home/node/app/ormconfig.json

ENV APP_HOME /home/node/app
USER root
CMD /usr/bin/supervisord -nc /etc/supervisor/supervisord.conf

