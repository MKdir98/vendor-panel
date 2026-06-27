import { HttpTypes } from "@medusajs/types"
import { Button, Input } from "@medusajs/ui"
import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import * as zod from "zod"
import { Form } from "../../../../../components/common/form"
import { CountrySelect } from "../../../../../components/inputs/country-select"
import { Combobox } from "../../../../../components/inputs/combobox"
import { RouteDrawer, useRouteModal } from "../../../../../components/modals"
import { KeyboundForm } from "../../../../../components/utilities/keybound-form"
import {
  FormExtensionZone,
  useDashboardExtension,
  useExtendableForm,
} from "../../../../../extensions"
import { useUpdateProduct } from "../../../../../hooks/api/products"
import { useProductSizes } from "../../../../../hooks/api/product-sizes"

type ProductAttributesFormProps = {
  product: HttpTypes.AdminProduct
}

const dimension = zod
  .union([zod.string(), zod.number()])
  .transform((value) => {
    if (value === "") {
      return null
    }
    return Number(value)
  })
  .optional()
  .nullable()

const ProductAttributesSchema = zod
  .object({
    product_size_id: zod.string().min(1, { message: "Size is required" }),
    is_manual_size: zod.boolean().optional(),
    weight: dimension,
    length: dimension,
    width: dimension,
    height: dimension,
    mid_code: zod.string().optional(),
    hs_code: zod.string().optional(),
    origin_country: zod.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.is_manual_size) {
      if (data.width == null || data.width === 0) {
        ctx.addIssue({ code: zod.ZodIssueCode.custom, path: ["width"], message: "Required" })
      }
      if (data.height == null || data.height === 0) {
        ctx.addIssue({ code: zod.ZodIssueCode.custom, path: ["height"], message: "Required" })
      }
      if (data.length == null || data.length === 0) {
        ctx.addIssue({ code: zod.ZodIssueCode.custom, path: ["length"], message: "Required" })
      }
    }
  })

export const ProductAttributesForm = ({
  product,
}: ProductAttributesFormProps) => {
  const { t } = useTranslation()
  const { handleSuccess } = useRouteModal()
  const { getFormConfigs, getFormFields } = useDashboardExtension()
  const { product_sizes } = useProductSizes()

  const configs = getFormConfigs("product", "attributes")
  const fields = getFormFields("product", "attributes")

  const form = useExtendableForm({
    defaultValues: {
      product_size_id: "",
      is_manual_size: false,
      height: product.height ? product.height : null,
      width: product.width ? product.width : null,
      length: product.length ? product.length : null,
      weight: product.weight ? product.weight : null,
      mid_code: product.mid_code || "",
      hs_code: product.hs_code || "",
      origin_country: product.origin_country || "",
    },
    schema: ProductAttributesSchema,
    configs: configs,
    data: product,
  })

  const isManualSize = form.watch("is_manual_size") || false

  const [sizeSearch, setSizeSearch] = useState("")
  const sizeOptions = useMemo(() => {
    const q = sizeSearch.trim().toLowerCase()
    return product_sizes
      .filter((s) => !q || s.name.toLowerCase().includes(q))
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((s) => ({ value: s.id, label: s.name }))
  }, [product_sizes, sizeSearch])

  useEffect(() => {
    if (!product_sizes.length) return
    const match = product_sizes.find(
      (s) =>
        s.width === product.width &&
        s.height === product.height &&
        s.length === product.length
    )
    if (match) {
      form.setValue("product_size_id", match.id)
      form.setValue("is_manual_size", false)
    } else {
      const manualSize = product_sizes.find(
        (s) => s.width === 0 && s.height === 0 && s.length === 0
      )
      if (manualSize && product.width != null) {
        form.setValue("product_size_id", manualSize.id)
        form.setValue("is_manual_size", true)
      }
    }
  }, [product_sizes, product.width, product.height, product.length])

  const { mutateAsync, isPending } = useUpdateProduct(product.id)

  const handleSubmit = form.handleSubmit(async (data) => {
    await mutateAsync(
      {
        weight: data.weight ? data.weight : undefined,
        length: data.length ? data.length : undefined,
        width: data.width ? data.width : undefined,
        height: data.height ? data.height : undefined,
        mid_code: data.mid_code,
        hs_code: data.hs_code,
        origin_country: data.origin_country,
      },
      {
        onSuccess: () => {
          handleSuccess()
        },
      }
    )
  })

  return (
    <RouteDrawer.Form form={form}>
      <KeyboundForm onSubmit={handleSubmit} className="flex h-full flex-col">
        <RouteDrawer.Body>
          <div className="flex h-full flex-col gap-y-8">
            <div className="flex flex-col gap-y-4">
              <Form.Field
                control={form.control}
                name="product_size_id"
                render={({ field: { onChange, value } }) => {
                  return (
                    <Form.Item>
                      <Form.Label>سایز</Form.Label>
                      <Form.Control>
                        <Combobox
                          value={value || ""}
                          searchValue={sizeSearch}
                          onSearchValueChange={setSizeSearch}
                          onChange={(selectedId) => {
                            const size = product_sizes.find(
                              (s) => s.id === selectedId
                            )
                            if (size) {
                              onChange(selectedId)
                              if (size.width === 0 && size.height === 0 && size.length === 0) {
                                form.setValue("is_manual_size", true)
                                form.setValue("width", null)
                                form.setValue("height", null)
                                form.setValue("length", null)
                              } else {
                                form.setValue("is_manual_size", false)
                                form.setValue("width", size.width)
                                form.setValue("height", size.height)
                                form.setValue("length", size.length)
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
                <div className="grid grid-cols-3 gap-x-4">
                  <Form.Field
                    control={form.control}
                    name="length"
                    render={({ field: { onChange, value, ...field } }) => (
                      <Form.Item>
                        <Form.Label>طول (cm)</Form.Label>
                        <Form.Control>
                          <Input
                            type="number"
                            min={1}
                            step="any"
                            value={value ?? ""}
                            onChange={(e) => {
                              const v = e.target.value
                              onChange(v === "" ? null : parseFloat(v))
                            }}
                            {...field}
                          />
                        </Form.Control>
                        <Form.ErrorMessage />
                      </Form.Item>
                    )}
                  />
                  <Form.Field
                    control={form.control}
                    name="width"
                    render={({ field: { onChange, value, ...field } }) => (
                      <Form.Item>
                        <Form.Label>عرض (cm)</Form.Label>
                        <Form.Control>
                          <Input
                            type="number"
                            min={1}
                            step="any"
                            value={value ?? ""}
                            onChange={(e) => {
                              const v = e.target.value
                              onChange(v === "" ? null : parseFloat(v))
                            }}
                            {...field}
                          />
                        </Form.Control>
                        <Form.ErrorMessage />
                      </Form.Item>
                    )}
                  />
                  <Form.Field
                    control={form.control}
                    name="height"
                    render={({ field: { onChange, value, ...field } }) => (
                      <Form.Item>
                        <Form.Label>ارتفاع (cm)</Form.Label>
                        <Form.Control>
                          <Input
                            type="number"
                            min={1}
                            step="any"
                            value={value ?? ""}
                            onChange={(e) => {
                              const v = e.target.value
                              onChange(v === "" ? null : parseFloat(v))
                            }}
                            {...field}
                          />
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
                render={({ field: { onChange, value, ...field } }) => {
                  return (
                    <Form.Item>
                      <Form.Label>{t("fields.weight")} (g)</Form.Label>
                      <Form.Control>
                        <Input
                          type="number"
                          min={0}
                          step="any"
                          value={value || ""}
                          onChange={(e) => {
                            const value = e.target.value
                            if (value === "") {
                              onChange(null)
                            } else {
                              onChange(parseFloat(value))
                            }
                          }}
                          {...field}
                        />
                      </Form.Control>
                      <Form.ErrorMessage />
                    </Form.Item>
                  )
                }}
              />
              <Form.Field
                control={form.control}
                name="mid_code"
                render={({ field }) => {
                  return (
                    <Form.Item>
                      <Form.Label>{t("fields.midCode")}</Form.Label>
                      <Form.Control>
                        <Input {...field} />
                      </Form.Control>
                      <Form.ErrorMessage />
                    </Form.Item>
                  )
                }}
              />
              <Form.Field
                control={form.control}
                name="hs_code"
                render={({ field }) => {
                  return (
                    <Form.Item>
                      <Form.Label>{t("fields.hsCode")}</Form.Label>
                      <Form.Control>
                        <Input {...field} />
                      </Form.Control>
                      <Form.ErrorMessage />
                    </Form.Item>
                  )
                }}
              />
              <Form.Field
                control={form.control}
                name="origin_country"
                render={({ field }) => {
                  return (
                    <Form.Item>
                      <Form.Label>{t("fields.countryOfOrigin")}</Form.Label>
                      <Form.Control>
                        <CountrySelect {...field} />
                      </Form.Control>
                      <Form.ErrorMessage />
                    </Form.Item>
                  )
                }}
              />
              <FormExtensionZone fields={fields} form={form} />
            </div>
          </div>
        </RouteDrawer.Body>
        <RouteDrawer.Footer>
          <div className="flex items-center justify-end gap-x-2">
            <RouteDrawer.Close asChild>
              <Button size="small" variant="secondary">
                {t("actions.cancel")}
              </Button>
            </RouteDrawer.Close>
            <Button size="small" type="submit" isLoading={isPending}>
              {t("actions.save")}
            </Button>
          </div>
        </RouteDrawer.Footer>
      </KeyboundForm>
    </RouteDrawer.Form>
  )
}
