import { useLoaderData, useParams } from "react-router-dom"

import { useStockLocation } from "../../../hooks/api/stock-locations"
import { LocationGeneralSection } from "./components/location-general-section"
import { locationLoader } from "./loader"

import { TwoColumnPageSkeleton } from "../../../components/common/skeleton"
import { TwoColumnPage } from "../../../components/layout/pages"
import { useDashboardExtension } from "../../../extensions"
import { LOCATION_DETAILS_FIELD } from "./constants"

export const LocationDetail = () => {
  const initialData = useLoaderData() as Awaited<
    ReturnType<typeof locationLoader>
  >

  const { location_id } = useParams()
  const {
    stock_location: location,
    isPending: isLoading,
    isError,
    error,
  } = useStockLocation(
    location_id!,
    { fields: LOCATION_DETAILS_FIELD },
    { initialData }
  )

  const { getWidgets } = useDashboardExtension()

  if (isLoading || !location) {
    return (
      <TwoColumnPageSkeleton mainSections={2} sidebarSections={0} showJSON />
    )
  }

  if (isError) {
    throw error
  }

  return (
    <TwoColumnPage
      widgets={{
        after: getWidgets("location.details.after"),
        before: getWidgets("location.details.before"),
        sideAfter: getWidgets("location.details.side.after"),
        sideBefore: getWidgets("location.details.side.before"),
      }}
      data={location}
      hasOutlet
    >
      <TwoColumnPage.Main>
        <LocationGeneralSection location={location} />
      </TwoColumnPage.Main>
      <TwoColumnPage.Sidebar>
        <div />
      </TwoColumnPage.Sidebar>
    </TwoColumnPage>
  )
}
