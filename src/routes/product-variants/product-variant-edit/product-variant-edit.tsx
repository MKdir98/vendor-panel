import { Heading } from "@medusajs/ui"
import { useTranslation } from "react-i18next"
import { useParams, useSearchParams } from "react-router-dom"
import { RouteDrawer } from "../../../components/modals"
import { useProduct } from "../../../hooks/api/products"
import { ProductEditVariantForm } from "./components/product-edit-variant-form"

export const ProductVariantEdit = () => {
  const { t } = useTranslation()
  const { id, variant_id: paramVariantId } = useParams()
  const [searchParams] = useSearchParams()
  const searchVariantId = searchParams.get("variant_id")
  const variant_id = paramVariantId || searchVariantId

  const {
    product,
    isPending: isProductPending,
    isError: isProductError,
    error: productError,
  } = useProduct(id!, {
    fields: "*variants",
  })

  const variant = product?.variants?.find(
    (variant) => variant.id === variant_id
  )

  if (isProductError) {
    throw productError
  }

  if (isProductPending) {
    return (
      <RouteDrawer>
        <RouteDrawer.Header>
          <Heading>{t("products.variant.edit.header")}</Heading>
        </RouteDrawer.Header>
        <RouteDrawer.Body>
          <div className="flex items-center justify-center py-8">
            Loading...
          </div>
        </RouteDrawer.Body>
      </RouteDrawer>
    )
  }

  if (!variant) {
    return (
      <RouteDrawer>
        <RouteDrawer.Header>
          <Heading>{t("products.variant.edit.header")}</Heading>
        </RouteDrawer.Header>
        <RouteDrawer.Body>
          <div className="flex items-center justify-center py-8">
            Variant not found
          </div>
        </RouteDrawer.Body>
      </RouteDrawer>
    )
  }

  return (
    <RouteDrawer>
      <RouteDrawer.Header>
        <Heading>{t("products.variant.edit.header")}</Heading>
      </RouteDrawer.Header>
      <ProductEditVariantForm variant={variant} product={product!} />
    </RouteDrawer>
  )
}
