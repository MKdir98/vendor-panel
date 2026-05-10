import { getBackendUrl } from "../lib/client"

export default function imagesConverter(images: string) {
  const isLocalhost =
    images.startsWith("http://localhost:9000") ||
    images.startsWith("https://localhost:9000")

  if (isLocalhost) {
    return images
      .replace("http://localhost:9000", getBackendUrl())
      .replace("https://localhost:9000", getBackendUrl())
  }

  return images
}
