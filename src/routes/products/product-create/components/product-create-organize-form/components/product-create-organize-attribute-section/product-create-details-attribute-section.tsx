import { Heading, Input } from "@medusajs/ui"
import { UseFormReturn } from "react-hook-form"
import { useTranslation } from "react-i18next"

import { Form } from "../../../../../../../components/common/form"
import { ProductCreateSchemaType } from "../../../../types"

type ProductCreateAttributeSectionProps = {
  form: UseFormReturn<ProductCreateSchemaType>
}

export const ProductCreateAttributeSection = ({
  form,
}: ProductCreateAttributeSectionProps) => {
  const { t } = useTranslation()

  return (
    <div id="attributes" className="flex flex-col gap-y-8">
      <Heading level="h2">{t("products.attributes")}</Heading>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8">
        <Form.Field
          control={form.control}
          name="width"
          render={({ field }) => {
            return (
              <Form.Item>
                <Form.Label>{t("products.fields.width.label")} (cm)</Form.Label>
                <Form.Control>
                  <Input
                    {...field}
                    type="number"
                    min={0}
                    step="0.1"
                    placeholder="0"
                  />
                </Form.Control>
                <Form.ErrorMessage />
              </Form.Item>
            )
          }}
        />
        <Form.Field
          control={form.control}
          name="length"
          render={({ field }) => {
            return (
              <Form.Item>
                <Form.Label>
                  {t("products.fields.length.label")} (cm)
                </Form.Label>
                <Form.Control>
                  <Input
                    {...field}
                    type="number"
                    min={0}
                    step="0.1"
                    placeholder="0"
                  />
                </Form.Control>
                <Form.ErrorMessage />
              </Form.Item>
            )
          }}
        />
        <Form.Field
          control={form.control}
          name="height"
          render={({ field }) => {
            return (
              <Form.Item>
                <Form.Label>
                  {t("products.fields.height.label")} (cm)
                </Form.Label>
                <Form.Control>
                  <Input
                    {...field}
                    type="number"
                    min={0}
                    step="0.1"
                    placeholder="0"
                  />
                </Form.Control>
                <Form.ErrorMessage />
              </Form.Item>
            )
          }}
        />
        <Form.Field
          control={form.control}
          name="weight"
          render={({ field }) => {
            return (
              <Form.Item>
                <Form.Label>{t("products.fields.weight.label")} (g)</Form.Label>
                <Form.Control>
                  <Input
                    {...field}
                    type="number"
                    min={0}
                    step="0.001"
                    placeholder="0"
                  />
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
