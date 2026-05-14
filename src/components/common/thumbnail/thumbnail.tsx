import { Photo } from "@medusajs/icons"
import { clx } from "@medusajs/ui"
import imagesConverter from "../../../utils/images-conventer"

type ThumbnailProps = {
  src?: string | null
  alt?: string
  size?: "small" | "base" | "large"
}

export const Thumbnail = ({ src, alt, size = "base" }: ThumbnailProps) => {
  const convertedSrc = src ? imagesConverter(src) : src
  return (
    <div
      className={clx(
        "bg-ui-bg-component border-ui-border-base flex items-center justify-center overflow-hidden rounded border",
        {
          "h-8 w-6": size === "base",
          "h-5 w-4": size === "small",
          "h-12 w-12": size === "large",
        }
      )}
    >
      {convertedSrc ? (
        <img
          src={convertedSrc}
          alt={alt}
          className="h-full w-full object-cover object-center"
        />
      ) : (
        <Photo className="text-ui-fg-subtle" />
      )}
    </div>
  )
}
