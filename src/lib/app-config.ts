/**
 * Browser config: production reads window.__VENDOR_RUNTIME__ (written by
 * /runtime-config.js at container start). Dev uses import.meta.env.VITE_*.
 */

export type VendorRuntimeConfig = {
  base: string
  backendUrl: string
  storefrontUrl: string
  publishableApiKey: string
  talkJsAppId: string
  disableSellersRegistration: string
}

declare global {
  interface Window {
    __VENDOR_RUNTIME__?: Partial<VendorRuntimeConfig>
  }
}

function fromWindow(): Partial<VendorRuntimeConfig> | undefined {
  if (typeof window === "undefined") return undefined
  return window.__VENDOR_RUNTIME__
}

export function getAppBase(): string {
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_MEDUSA_BASE || "/"
  }
  const b = fromWindow()?.base
  if (b != null && b !== "") return b
  return "/"
}

export function getBackendUrl(): string {
  if (import.meta.env.DEV) {
    return (
      import.meta.env.VITE_MEDUSA_BACKEND_URL || "https://core.doorfestival.com"
    ).replace(/\/$/, "")
  }
  return (fromWindow()?.backendUrl || "https://core.doorfestival.com").replace(/\/$/, "")
}

export function getPublishableApiKey(): string {
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_PUBLISHABLE_API_KEY || ""
  }
  return fromWindow()?.publishableApiKey || ""
}

export function getStorefrontUrl(): string {
  if (import.meta.env.DEV) {
    return (
      import.meta.env.VITE_MEDUSA_STOREFRONT_URL || "http://localhost:8000"
    )
  }
  return fromWindow()?.storefrontUrl || "http://localhost:8000"
}

export function getTalkJsAppId(): string {
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_TALK_JS_APP_ID || ""
  }
  return fromWindow()?.talkJsAppId || ""
}

export function getDisableSellersRegistration(): string {
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_DISABLE_SELLERS_REGISTRATION || "false"
  }
  return fromWindow()?.disableSellersRegistration ?? "false"
}
