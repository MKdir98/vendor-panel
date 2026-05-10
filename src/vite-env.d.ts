// / <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MEDUSA_BASE?: string
  readonly VITE_MEDUSA_BACKEND_URL?: string
  readonly VITE_MEDUSA_STOREFRONT_URL?: string
  readonly VITE_PUBLISHABLE_API_KEY?: string
  readonly VITE_TALK_JS_APP_ID?: string
  readonly VITE_DISABLE_SELLERS_REGISTRATION?: string
  readonly VITE_MEDUSA_PROJECT?: string
  readonly VITE_MEDUSA_ADMIN_BACKEND_URL?: string
  readonly VITE_MEDUSA_V2?: "true" | "false"
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
