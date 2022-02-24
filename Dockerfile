FROM node:14.16.1 as builder
WORKDIR /home/www
ARG BUILD_ENV=production
COPY package.json .
RUN npm i

COPY . .
RUN BUILD_ENV=${BUILD_ENV} npm run build

FROM narrowizard/caddy:latest
WORKDIR /srv
COPY --from=builder /home/www/dist/ .
COPY --from=builder /home/www/Caddyfile /etc/Caddyfile
