import { Heading, Input, Text, Textarea } from "@medusajs/ui"
import { useFieldArray } from "react-hook-form"
import { UseFormReturn } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useCallback } from "react"

import {
  FileType,
  FileUpload,
} from "../../../../../components/common/file-upload"
import { Form } from "../../../../../components/common/form"
import { HandleInput } from "../../../../../components/inputs/handle-input"
import { CreateCategorySchema } from "./schema"

const SUPPORTED_FORMATS = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/heic",
  "image/svg+xml",
]

const SUPPORTED_FORMATS_FILE_EXTENSIONS = [
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".heic",
  ".svg",
]

type CreateCategoryDetailsProps = {
  form: UseFormReturn<CreateCategorySchema>
}

export const CreateCategoryDetails = ({ form }: CreateCategoryDetailsProps) => {
  const { t } = useTranslation()

  const { fields } = useFieldArray({
    name: "media",
    control: form.control,
    keyName: "field_id",
  })

  const hasInvalidFiles = useCallback(
    (fileList: FileType[]) => {
      const invalidFile = fileList.find(
        (f) => !SUPPORTED_FORMATS.includes(f.file.type)
      )

      if (invalidFile) {
        form.setError("media", {
          type: "invalid_file",
          message: t("products.media.invalidFileType", {
            name: invalidFile.file.name,
            types: SUPPORTED_FORMATS_FILE_EXTENSIONS.join(", "),
          }),
        })

        return true
      }

      return false
    },
    [form, t]
  )

  const onUploaded = useCallback(
    (files: FileType[]) => {
      form.clearErrors("media")
      if (hasInvalidFiles(files)) {
        return
      }

      form.setValue("media", [{ ...files[0], isThumbnail: true }])
    },
    [form, hasInvalidFiles]
  )

  return (
    <div className="flex flex-col items-center p-16">
      <div className="flex w-full max-w-[720px] flex-col gap-y-8">
        <div>
          <Heading>Request Category</Heading>
          <Text size="small" className="text-ui-fg-subtle">
            Request for a new category to organize your products.
          </Text>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Form.Field
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <Form.Item>
                  <Form.Label>{t("fields.title")}</Form.Label>
                  <Form.Control>
                    <Input autoComplete="off" {...field} />
                  </Form.Control>
                  <Form.ErrorMessage />
                </Form.Item>
              )
            }}
          />
          <Form.Field
            control={form.control}
            name="handle"
            render={({ field }) => {
              return (
                <Form.Item>
                  <Form.Label optional tooltip={t("collections.handleTooltip")}>
                    {t("fields.handle")}
                  </Form.Label>
                  <Form.Control>
                    <HandleInput {...field} />
                  </Form.Control>
                  <Form.ErrorMessage />
                </Form.Item>
              )
            }}
          />
        </div>
        <Form.Field
          control={form.control}
          name="media"
          render={() => (
            <Form.Item>
              <div className="flex flex-col gap-y-2">
                <Form.Label optional>
                  {t("categories.fields.image.label")}
                </Form.Label>
                <Form.Control>
                  <FileUpload
                    uploadedImage={fields[0]?.url || ""}
                    multiple={false}
                    label={t("products.media.uploadImagesLabel")}
                    hint={t("products.media.uploadImagesHint")}
                    hasError={!!form.formState.errors.media}
                    formats={SUPPORTED_FORMATS}
                    onUploaded={onUploaded}
                  />
                </Form.Control>
                <Form.ErrorMessage />
              </div>
            </Form.Item>
          )}
        />
        <Form.Field
          control={form.control}
          name="description"
          render={({ field }) => {
            return (
              <Form.Item>
                <Form.Label optional>{t("fields.description")}</Form.Label>
                <Form.Control>
                  <Textarea {...field} />
                </Form.Control>
                <Form.ErrorMessage />
              </Form.Item>
            )
          }}
        />
      </div>
    </div>
  )
}
