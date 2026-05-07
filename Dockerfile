# Build context: vendor-panel/
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci || npm install

FROM node:20-alpine AS builder
WORKDIR /app
ENV NODE_OPTIONS=--max-old-space-size=2048
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG VITE_MEDUSA_BASE=/
ARG VITE_MEDUSA_STOREFRONT_URL=http://localhost:3000
ARG VITE_MEDUSA_BACKEND_URL=http://localhost:9000
ARG VITE_TALK_JS_APP_ID
ARG VITE_DISABLE_SELLERS_REGISTRATION=false
ENV VITE_MEDUSA_BASE=$VITE_MEDUSA_BASE \
    VITE_MEDUSA_STOREFRONT_URL=$VITE_MEDUSA_STOREFRONT_URL \
    VITE_MEDUSA_BACKEND_URL=$VITE_MEDUSA_BACKEND_URL \
    VITE_TALK_JS_APP_ID=$VITE_TALK_JS_APP_ID \
    VITE_DISABLE_SELLERS_REGISTRATION=$VITE_DISABLE_SELLERS_REGISTRATION
RUN npm run build:preview

FROM nginx:1.27-alpine AS runner
COPY docker/nginx-spa.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
