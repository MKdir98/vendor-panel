export const INVENTORY_ITEM_IDS_KEY = "inventory_item_ids"

export const getInventoryItemDisplayTitle = (
  item: {
    title?: string | null
    sku?: string | null
    variants?: Array<{ title?: string | null; product?: { title?: string | null } | null }> | null
  } | null
): string => {
  if (!item) return ""
  const firstVariant = item.variants?.[0]
  if (firstVariant?.product?.title && firstVariant?.title) {
    return `${firstVariant.product.title} - ${firstVariant.title}`
  }
  return item.title ?? item.sku ?? ""
}
