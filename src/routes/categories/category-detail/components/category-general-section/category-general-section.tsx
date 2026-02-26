import { HttpTypes } from "@medusajs/types"
import { Container, Heading, Text, toast } from "@medusajs/ui"
import { useCallback, useState } from "react"
import { useTranslation } from "react-i18next"

import {
  FileType,
  FileUpload,
} from "../../../../../components/common/file-upload"
import { useUpdateProductCategoryMetadata } from "../../../../../hooks/api/categories"
import { uploadFilesQuery } from "../../../../../lib/client"

const SUPPORTED_FORMATS = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/heic",
  "image/svg+xml",
]

type CategoryGeneralSectionProps = {
  category: HttpTypes.AdminProductCategory
}

export const CategoryGeneralSection = ({
  category,
}: CategoryGeneralSectionProps) => {
  const { t } = useTranslation()
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const { mutateAsync, isPending } = useUpdateProductCategoryMetadata(
    category.id!
  )

  const thumbnailUrl =
    uploadedImage ||
    (category.metadata as Record<string, string> | undefined)?.thumbnail ||
    ""

  const hasInvalidFiles = useCallback((fileList: FileType[]) => {
    const invalidFile = fileList.find(
      (f) => !SUPPORTED_FORMATS.includes(f.file.type)
    )
    return !!invalidFile
  }, [])

  const onUploaded = useCallback(
    async (files: FileType[]) => {
      if (hasInvalidFiles(files)) {
        toast.error(t("products.media.invalidFileType"))
        return
      }

      const { files: uploaded } = await uploadFilesQuery([{ file: files[0].file }])
      const url = uploaded?.[0]?.url
      if (!url) {
        toast.error(t("products.media.failedToUpload"))
        return
      }

      const metadata = {
        ...(category.metadata as Record<string, unknown> || {}),
        thumbnail: url,
      }

      await mutateAsync(
        { metadata },
        {
          onSuccess: () => {
            setUploadedImage(url)
            toast.success(t("categories.edit.imageSuccessToast"))
          },
          onError: (error) => {
            toast.error(error.message)
          },
        }
      )
    },
    [category.metadata, hasInvalidFiles, mutateAsync, t]
  )

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading>{category.name}</Heading>
      </div>
      <div className="text-ui-fg-subtle grid grid-cols-2 gap-3 px-6 py-4">
        <Text size="small" leading="compact" weight="plus">
          {t("categories.fields.image.label")}
        </Text>
        <div className="flex flex-col gap-2">
          <FileUpload
            uploadedImage={thumbnailUrl}
            multiple={false}
            label={t("products.media.uploadImagesLabel")}
            hint={t("products.media.uploadImagesHint")}
            formats={SUPPORTED_FORMATS}
            onUploaded={onUploaded}
          />
          {isPending && (
            <Text size="small" className="text-ui-fg-muted">
              Updating...
            </Text>
          )}
        </div>
      </div>
      <div className="text-ui-fg-subtle grid grid-cols-2 gap-3 px-6 py-4">
        <Text size="small" leading="compact" weight="plus">
          {t("fields.description")}
        </Text>
        <Text size="small" leading="compact">
          {category.description || "-"}
        </Text>
      </div>
      <div className="text-ui-fg-subtle grid grid-cols-2 gap-3 px-6 py-4">
        <Text size="small" leading="compact" weight="plus">
          {t("fields.handle")}
        </Text>
        <Text size="small" leading="compact">
          /{category.handle}
        </Text>
      </div>
    </Container>
  )
}
