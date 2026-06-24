import { PencilSquare } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { Container, Heading } from "@medusajs/ui"
import { useTranslation } from "react-i18next"
import { ActionMenu } from "../../../../../components/common/action-menu"
import { SectionRow } from "../../../../../components/common/section"
import { useDashboardExtension } from "../../../../../extensions"
import { useProductSizes } from "../../../../../hooks/api/product-sizes"

type ProductAttributeSectionProps = {
  product: HttpTypes.AdminProduct
}

export const ProductAttributeSection = ({
  product,
}: ProductAttributeSectionProps) => {
  const { t } = useTranslation()
  const { getDisplays } = useDashboardExtension()
  const { product_sizes } = useProductSizes()

  const matchedSize = product_sizes.find(
    (s) =>
      s.width === product.width &&
      s.height === product.height &&
      s.length === product.length
  )

  const sizeDisplay = matchedSize
    ? matchedSize.name
    : product.width != null && product.height != null && product.length != null
      ? `${product.width} × ${product.height} × ${product.length}`
      : "-"

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">{t("products.attributes")}</Heading>
        <ActionMenu
          groups={[
            {
              actions: [
                {
                  label: t("actions.edit"),
                  to: "attributes",
                  icon: <PencilSquare />,
                },
              ],
            },
          ]}
        />
      </div>
      <SectionRow title="سایز" value={sizeDisplay} />
      <SectionRow title={`${t("fields.weight")} (g)`} value={product.weight} />
      {getDisplays("product", "attributes").map((Component, i) => {
        return <Component key={i} data={product} />
      })}
    </Container>
  )
}
