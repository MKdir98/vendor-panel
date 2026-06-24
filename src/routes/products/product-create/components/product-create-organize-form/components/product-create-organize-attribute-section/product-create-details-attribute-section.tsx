import { Heading, Select, Input } from "@medusajs/ui"
import { UseFormReturn } from "react-hook-form"
import { useTranslation } from "react-i18next"

import { Form } from "../../../../../../../components/common/form"
import { useProductSizes } from "../../../../../../../hooks/api/product-sizes"
import { ProductCreateSchemaType } from "../../../../types"

type ProductCreateAttributeSectionProps = {
  form: UseFormReturn<ProductCreateSchemaType>
}

export const ProductCreateAttributeSection = ({
  form,
}: ProductCreateAttributeSectionProps) => {
  const { t } = useTranslation()
  const { product_sizes } = useProductSizes()

  return (
    <div id="attributes" className="flex flex-col gap-y-8">
      <Heading level="h2">{t("products.attributes")}</Heading>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8">
        <Form.Field
          control={form.control}
          name="product_size_id"
          render={({ field: { onChange, value, ref } }) => {
            return (
              <Form.Item className="col-span-2">
                <Form.Label>سایز</Form.Label>
                <Form.Control>
                  <Select
                    value={value || ""}
                    onValueChange={(selectedId) => {
                      const size = product_sizes.find((s) => s.id === selectedId)
                      if (size) {
                        onChange(selectedId)
                        form.setValue("width", String(size.width))
                        form.setValue("height", String(size.height))
                        form.setValue("length", String(size.length))
                      }
                    }}
                  >
                    <Select.Trigger ref={ref}>
                      <Select.Value placeholder="انتخاب سایز" />
                    </Select.Trigger>
                    <Select.Content>
                      {product_sizes.map((size) => (
                        <Select.Item key={size.id} value={size.id}>
                          {size.name}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select>
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
