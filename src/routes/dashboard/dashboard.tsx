import { useEffect, useState } from "react"
import { useOnboarding, useOrders } from "../../hooks/api"
import { DashboardCharts } from "./components/dashboard-charts"
import { DashboardOnboarding } from "./components/dashboard-onboarding"
import { ChartSkeleton } from "./components/chart-skeleton"

export const Dashboard = () => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => setIsClient(true), [])

  const { onboarding, isError, error, isPending } = useOnboarding()

  const { orders, isPending: isPendingOrders } = useOrders()

  const notFulfilledOrders =
    orders?.filter((order) => order.fulfillment_status === "not_fulfilled")
      .length || 0
  const fulfilledOrders =
    orders?.filter((order) => order.fulfillment_status === "fulfilled")
      .length || 0

  if (!isClient) return null

  if (isPending || isPendingOrders) {
    return (
      <div>
        <ChartSkeleton />
      </div>
    )
  }

  if (isError) {
    throw error
  }

  if (
    !onboarding?.products ||
    !onboarding?.locations_shipping ||
    !onboarding?.store_information
    // !onboarding?.stripe_connect
  )
    return (
      <DashboardOnboarding
        products={onboarding?.products}
        locations_shipping={onboarding?.locations_shipping}
        store_information={onboarding?.store_information}
        stripe_connect={onboarding?.stripe_connect}
      />
    )

  return (
    <DashboardCharts
      notFulfilledOrders={notFulfilledOrders}
      fulfilledOrders={fulfilledOrders}
    />
  )
}
