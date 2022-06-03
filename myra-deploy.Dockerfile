FROM node:16-alpine

# RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json .
RUN yarn
