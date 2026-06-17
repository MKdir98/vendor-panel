import { Buildings, PencilSquare, Trash } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { Container, StatusBadge, Text, toast, usePrompt } from "@medusajs/ui"
import { useTranslation } from "react-i18next"

import { ActionMenu } from "../../../../../components/common/action-menu"
import { LinkButton } from "../../../../../components/common/link-button"
import { useDeleteStockLocation } from "../../../../../hooks/api/stock-locations"
import { getFormattedAddress } from "../../../../../lib/addresses"

function hasPostex(location: HttpTypes.AdminStockLocation): boolean {
  return !!location.fulfillment_sets?.some((fs) =>
    fs.service_zones?.some((sz) =>
      sz.shipping_options?.some((so) => so.provider_id?.includes("postex"))
    )
  )
}

type LocationProps = {
  location: HttpTypes.AdminStockLocation
}

function LocationListItem(props: LocationProps) {
  const { location } = props
  const { t } = useTranslation()
  const prompt = usePrompt()

  const { mutateAsync: deleteLocation } = useDeleteStockLocation(location.id)

  const handleDelete = async () => {
    const result = await prompt({
      title: t("general.areYouSure"),
      description: t("stockLocations.delete.confirmation", {
        name: location.name,
      }),
      confirmText: t("actions.remove"),
      cancelText: t("actions.cancel"),
    })

    if (!result) {
      return
    }

    await deleteLocation(undefined, {
      onSuccess: () => {
        toast.success(
          t("shippingProfile.delete.successToast", {
            name: location.name,
          })
        )
      },
      onError: (e) => {
        toast.error(e.message)
      },
    })
  }

  return (
    <Container className="flex flex-col divide-y p-0">
      <div className="px-6 py-4">
        <div className="flex flex-row items-center justify-between gap-x-4">
          <div className="shadow-borders-base flex size-7 items-center justify-center rounded-md">
            <div className="bg-ui-bg-field flex size-6 items-center justify-center rounded-[4px]">
              <Buildings className="text-ui-fg-subtle" />
            </div>
          </div>

          <div className="grow-1 flex flex-1 flex-col">
            <Text weight="plus">{location.name}</Text>
            <Text className="text-ui-fg-subtle txt-small">
              {getFormattedAddress({
                address: location.address,
              }).join(", ")}
            </Text>
          </div>

          <div className="flex grow-0 items-center gap-4">
            <ActionMenu
              groups={[
                {
                  actions: [
                    {
                      label: t("actions.edit"),
                      icon: <PencilSquare />,
                      to: `/settings/locations/${location.id}/edit`,
                    },
                  ],
                },
                {
                  actions: [
                    {
                      label: t("actions.delete"),
                      icon: <Trash />,
                      onClick: handleDelete,
                    },
                  ],
                },
              ]}
            />
            <div className="bg-ui-border-strong h-[12px] w-[1px]" />
            <LinkButton to={`/settings/locations/${location.id}`}>
              {t("actions.viewDetails")}
            </LinkButton>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-6 py-4">
        <div className="flex items-center justify-between">
          <Text
            size="small"
            weight="plus"
            className="text-ui-fg-subtle flex-1"
            as="div"
          >
            ارسال پستکس
          </Text>
          <div className="flex-1 text-left">
            <StatusBadge color={hasPostex(location) ? "green" : "grey"}>
              {hasPostex(location) ? "فعال" : "غیرفعال"}
            </StatusBadge>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default LocationListItem
