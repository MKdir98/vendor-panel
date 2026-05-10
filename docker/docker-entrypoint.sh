#!/bin/sh
set -e
export VITE_MEDUSA_BASE="${VITE_MEDUSA_BASE:-/}"
export VITE_MEDUSA_BACKEND_URL="${VITE_MEDUSA_BACKEND_URL:-http://localhost:9000}"
export VITE_MEDUSA_STOREFRONT_URL="${VITE_MEDUSA_STOREFRONT_URL:-http://localhost:3000}"
export VITE_PUBLISHABLE_API_KEY="${VITE_PUBLISHABLE_API_KEY:-}"
export VITE_TALK_JS_APP_ID="${VITE_TALK_JS_APP_ID:-}"
export VITE_DISABLE_SELLERS_REGISTRATION="${VITE_DISABLE_SELLERS_REGISTRATION:-false}"

envsubst < /usr/share/nginx/html/runtime-config.js.template \
  > /usr/share/nginx/html/runtime-config.js

exec nginx -g 'daemon off;'
