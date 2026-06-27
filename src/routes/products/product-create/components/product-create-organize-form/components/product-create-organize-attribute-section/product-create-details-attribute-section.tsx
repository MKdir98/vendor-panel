import { Heading, Input } from "@medusajs/ui"
import { useMemo, useState } from "react"
import { UseFormReturn } from "react-hook-form"
import { useTranslation } from "react-i18next"

import { Form } from "../../../../../../../components/common/form"
import { Combobox } from "../../../../../../../components/inputs/combobox"
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
  const isManualSize = form.watch("is_manual_size") || false

  const [sizeSearch, setSizeSearch] = useState("")
  const sizeOptions = useMemo(() => {
    const q = sizeSearch.trim().toLowerCase()
    return product_sizes
      .filter((s) => !q || s.name.toLowerCase().includes(q))
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((s) => ({ value: s.id, label: s.name }))
  }, [product_sizes, sizeSearch])

  return (
    <div id="attributes" className="flex flex-col gap-y-8">
      <Heading level="h2">{t("products.attributes")}</Heading>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8">
        <Form.Field
          control={form.control}
          name="product_size_id"
          render={({ field: { onChange, value } }) => {
            return (
              <Form.Item className="col-span-2">
                <Form.Label>سایز</Form.Label>
                <Form.Control>
                  <Combobox
                    value={value || ""}
                    searchValue={sizeSearch}
                    onSearchValueChange={setSizeSearch}
                    onChange={(selectedId) => {
                      const size = product_sizes.find((s) => s.id === selectedId)
                      if (size) {
                        onChange(selectedId)
                        if (size.width === 0 && size.height === 0 && size.length === 0) {
                          form.setValue("is_manual_size", true)
                          form.setValue("width", "")
                          form.setValue("height", "")
                          form.setValue("length", "")
                        } else {
                          form.setValue("is_manual_size", false)
                          form.setValue("width", String(size.width))
                          form.setValue("height", String(size.height))
                          form.setValue("length", String(size.length))
                        }
                      } else {
                        onChange("")
                        form.setValue("is_manual_size", false)
                      }
                    }}
                    options={sizeOptions}
                    placeholder="انتخاب سایز"
                  />
                </Form.Control>
                <Form.ErrorMessage />
              </Form.Item>
            )
          }}
        />
        {isManualSize && (
          <div className="col-span-2 grid grid-cols-3 gap-x-4">
            <Form.Field
              control={form.control}
              name="length"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>طول (cm)</Form.Label>
                  <Form.Control>
                    <Input {...field} type="number" min={1} step="1" placeholder="0" />
                  </Form.Control>
                  <Form.ErrorMessage />
                </Form.Item>
              )}
            />
            <Form.Field
              control={form.control}
              name="width"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>عرض (cm)</Form.Label>
                  <Form.Control>
                    <Input {...field} type="number" min={1} step="1" placeholder="0" />
                  </Form.Control>
                  <Form.ErrorMessage />
                </Form.Item>
              )}
            />
            <Form.Field
              control={form.control}
              name="height"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>ارتفاع (cm)</Form.Label>
                  <Form.Control>
                    <Input {...field} type="number" min={1} step="1" placeholder="0" />
                  </Form.Control>
                  <Form.ErrorMessage />
                </Form.Item>
              )}
            />
          </div>
        )}
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
