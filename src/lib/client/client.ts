import Medusa, { type Config } from "@medusajs/js-sdk"
import { getBackendUrl, getPublishableApiKey } from "../app-config"

export { getBackendUrl, getPublishableApiKey } from "../app-config"

const token = () => window.localStorage.getItem("medusa_auth_token") || ""

let _sdk: Medusa | null = null

function getOrCreateSdk(): Medusa {
  if (!_sdk) {
    const config: Config = {
      baseUrl: getBackendUrl() || "/",
      publishableKey: getPublishableApiKey(),
      debug: import.meta.env.DEV,
    }
    _sdk = new Medusa(config)
  }
  return _sdk
}

export const sdk = new Proxy({} as Medusa, {
  get(_, prop) {
    return (getOrCreateSdk() as unknown as Record<string | symbol, unknown>)[
      prop
    ]
  },
})

// useful when you want to call the BE from the console and try things out quickly
if (typeof window !== "undefined") {
  ;(window as any).__sdk = sdk
}

export const importProductsQuery = async (file: File) => {
  const formData = new FormData()
  formData.append("file", file)
  const backendUrl = getBackendUrl()
  const publishableApiKey = getPublishableApiKey()

  return await fetch(`${backendUrl}/vendor/products/import`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token()}`,
      "x-publishable-api-key": publishableApiKey,
    },
    body: formData,
  })
    .then((res) => res.json())
    .catch(() => null)
}

export const uploadFilesQuery = async (files: any[]) => {
  const formData = new FormData()
  const backendUrl = getBackendUrl()
  const publishableApiKey = getPublishableApiKey()

  for (const { file } of files) {
    formData.append("files", file)
  }

  return await fetch(`${backendUrl}/vendor/uploads`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token()}`,
      "x-publishable-api-key": publishableApiKey,
    },
    body: formData,
  })
    .then((res) => res.json())
    .catch(() => null)
}

export const fetchQuery = async (
  url: string,
  {
    method,
    body,
    query,
    headers,
  }: {
    method: "GET" | "POST" | "PATCH" | "DELETE"
    body?: object
    query?: Record<string, string | number>
    headers?: { [key: string]: string }
  }
) => {
  const backendUrl = getBackendUrl()
  const publishableApiKey = getPublishableApiKey()
  const bearer = (await window.localStorage.getItem("medusa_auth_token")) || ""
  const params = Object.entries(query || {}).reduce(
    (acc, [key, value], index) => {
      if (value && value !== undefined) {
        const queryLength = Object.values(query || {}).filter(
          (i) => i && i !== undefined
        ).length
        acc += `${key}=${value}${index + 1 <= queryLength ? "&" : ""}`
      }
      return acc
    },
    ""
  )
  const fullUrl = `${backendUrl}${url}${params && `?${params}`}`
  const response = await fetch(fullUrl, {
    method: method,
    headers: {
      authorization: `Bearer ${bearer}`,
      "Content-Type": "application/json",
      "x-publishable-api-key": publishableApiKey,
      ...headers,
    },
    body: body ? JSON.stringify(body) : null,
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Nieznany błąd serwera")
  }

  return response.json()
}

export const fetchPdfWithAuth = async (path: string): Promise<Blob> => {
  const backendUrl = getBackendUrl()
  const publishableApiKey = getPublishableApiKey()
  const bearer =
    (typeof window !== "undefined" &&
      window.localStorage.getItem("medusa_auth_token")) ||
    ""
  const fullUrl = `${backendUrl.replace(/\/$/, "")}${path}`
  const response = await fetch(fullUrl, {
    method: "GET",
    headers: {
      authorization: `Bearer ${bearer}`,
      "x-publishable-api-key": publishableApiKey,
    },
  })
  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.message || "Failed to fetch PDF")
  }
  return response.blob()
}
