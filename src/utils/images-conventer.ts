import { getBackendUrl } from "../lib/client"

const INTERNAL_HOSTS = [
  "localhost",
  "127.0.0.1",
  "backend",
  "host.docker.internal",
]

export default function imagesConverter(src: string) {
  if (!src) return src
  const decoded = decodeURIComponent(src)
  if (!decoded.startsWith("http://") && !decoded.startsWith("https://"))
    return decoded

  try {
    const u = new URL(decoded)
    if (INTERNAL_HOSTS.includes(u.hostname)) {
      const base = getBackendUrl()
      const origin = new URL(base.startsWith("http") ? base : `https://${base}`)
      u.protocol = origin.protocol
      u.host = origin.host
      u.port = ""
      return u.toString()
    }
  } catch {
    return decoded
  }

  return decoded
}
