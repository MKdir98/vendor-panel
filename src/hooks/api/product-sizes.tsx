import { useQuery } from "@tanstack/react-query"
import { fetchQuery } from "../../lib/client"

export interface ProductSize {
  id: string
  name: string
  width: number
  height: number
  length: number
  sort_order: number
}

const productSizesQueryKeys = {
  all: () => ["product_sizes"] as const,
}

export const useProductSizes = () => {
  const { data, ...rest } = useQuery({
    queryKey: productSizesQueryKeys.all(),
    queryFn: async () => {
      const response = await fetchQuery("/vendor/product-sizes", {
        method: "GET",
      })
      return response as { product_sizes: ProductSize[] }
    },
    staleTime: Infinity,
  })

  return {
    product_sizes: data?.product_sizes ?? [],
    ...rest,
  }
}
