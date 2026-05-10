# Build context: vendor-panel/
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci && npm cache clean --force

FROM node:20-alpine AS builder
WORKDIR /app
ENV NODE_OPTIONS=--max-old-space-size=2048
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build:preview && rm -rf /app/node_modules/.cache

FROM nginx:1.27-alpine AS runner
RUN apk add --no-cache gettext
COPY docker/nginx-spa.conf /etc/nginx/conf.d/default.conf
COPY docker/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
COPY --from=builder /app/dist /usr/share/nginx/html
COPY docker/runtime-config.js.template /usr/share/nginx/html/runtime-config.js.template
EXPOSE 80
ENTRYPOINT ["/docker-entrypoint.sh"]
