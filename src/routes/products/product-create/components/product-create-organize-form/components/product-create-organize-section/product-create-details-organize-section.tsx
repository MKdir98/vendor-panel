import { Heading } from "@medusajs/ui"
import { UseFormReturn } from "react-hook-form"
import { useTranslation } from "react-i18next"

import { Form } from "../../../../../../../components/common/form"
import { SwitchBox } from "../../../../../../../components/common/switch-box"
import { ProductCreateSchemaType } from "../../../../types"
import { CategoryCombobox } from "../../../../../common/components/category-combobox"

type ProductCreateOrganizationSectionProps = {
  form: UseFormReturn<ProductCreateSchemaType>
}

export const ProductCreateOrganizationSection = ({
  form,
}: ProductCreateOrganizationSectionProps) => {
  const { t } = useTranslation()

  return (
    <div id="organize" className="flex flex-col gap-y-8">
      <Heading>{t("products.organization.header")}</Heading>
      <SwitchBox
        control={form.control}
        name="discountable"
        label={t("products.fields.discountable.label")}
        description={t("products.fields.discountable.hint")}
        optional
      />
      <Form.Field
        control={form.control}
        name="categories"
        render={({ field }) => {
          return (
            <Form.Item>
              <Form.Label>{t("products.fields.categories.label")}</Form.Label>
              <Form.Control>
                <CategoryCombobox {...field} />
              </Form.Control>
              <Form.ErrorMessage />
            </Form.Item>
          )
        }}
      />
    </div>
  )
}
