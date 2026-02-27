import { XCircle } from "@medusajs/icons"
import {
  AdminOrder,
  AdminOrderFulfillment,
  AdminOrderLineItem,
  HttpTypes,
  OrderLineItemDTO,
} from "@medusajs/types"
import {
  Button,
  Container,
  Copy,
  Heading,
  StatusBadge,
  Text,
  Tooltip,
  toast,
  usePrompt,
} from "@medusajs/ui"
import { useState } from "react"
import { format } from "date-fns"
import { useTranslation } from "react-i18next"
import { Link, useNavigate } from "react-router-dom"
import { ActionMenu } from "../../../../../components/common/action-menu"
import { Skeleton } from "../../../../../components/common/skeleton"
import { Thumbnail } from "../../../../../components/common/thumbnail"
import {
  useCancelOrderFulfillment,
  useMarkOrderFulfillmentAsDelivered,
} from "../../../../../hooks/api/orders"
import { useStockLocation } from "../../../../../hooks/api/stock-locations"
import {
  fetchPdfWithAuth,
} from "../../../../../lib/client/client"
import { formatProvider } from "../../../../../lib/format-provider"
import { getLocaleAmount } from "../../../../../lib/money-amount-helpers"

type OrderFulfillmentSectionProps = {
  order: AdminOrder
}

export const OrderFulfillmentSection = ({
  order,
}: OrderFulfillmentSectionProps) => {
  const fulfillments = order.fulfillments || []

  return (
    <div className="flex flex-col gap-y-3">
      <UnfulfilledItemBreakdown order={order} />
      {fulfillments.map((f, index) => (
        <Fulfillment key={f.id} index={index} fulfillment={f} order={order} />
      ))}
    </div>
  )
}

const UnfulfilledItem = ({
  item,
  currencyCode,
}: {
  item: OrderLineItemDTO & {
    variant: HttpTypes.AdminProductVariant
  }
  currencyCode: string
}) => {
  return (
    <div
      key={item.id}
      className="text-ui-fg-subtle grid grid-cols-2 items-start px-6 py-4"
    >
      <div className="flex items-start gap-x-4">
        <Thumbnail src={item.thumbnail} />
        <div>
          <Text
            size="small"
            leading="compact"
            weight="plus"
            className="text-ui-fg-base"
          >
            {item.title}
          </Text>
          {item.variant_sku && (
            <div className="flex items-center gap-x-1">
              <Text size="small">{item.variant_sku}</Text>
              <Copy content={item.variant_sku} className="text-ui-fg-muted" />
            </div>
          )}
          <Text size="small">
            {item.variant?.options?.map((o) => o.value).join(" · ")}
          </Text>
        </div>
      </div>
      <div className="grid grid-cols-3 items-center gap-x-4">
        <div className="flex items-center justify-end">
          <Text size="small">
            {getLocaleAmount(item.unit_price, currencyCode)}
          </Text>
        </div>
        <div className="flex items-center justify-end">
          <Text>
            <span className="tabular-nums">
              {item.quantity - item.detail.fulfilled_quantity}
            </span>
            x
          </Text>
        </div>
        <div className="flex items-center justify-end">
          <Text size="small">
            {getLocaleAmount(item.subtotal || 0, currencyCode)}
          </Text>
        </div>
      </div>
    </div>
  )
}

const UnfulfilledItemBreakdown = ({ order }: { order: AdminOrder }) => {
  // Create an array of order items that haven't been fulfilled or at least not fully fulfilled
  const unfulfilledItemsWithShipping = order.items!.filter(
    (i) => i.requires_shipping && i.detail.fulfilled_quantity < i.quantity
  )

  const unfulfilledItemsWithoutShipping = order.items!.filter(
    (i) => !i.requires_shipping && i.detail.fulfilled_quantity < i.quantity
  )

  return (
    <>
      {!!unfulfilledItemsWithShipping.length && (
        <UnfulfilledItemDisplay
          order={order}
          unfulfilledItems={unfulfilledItemsWithShipping}
          requiresShipping={true}
        />
      )}

      {!!unfulfilledItemsWithoutShipping.length && (
        <UnfulfilledItemDisplay
          order={order}
          unfulfilledItems={unfulfilledItemsWithoutShipping}
          requiresShipping={false}
        />
      )}
    </>
  )
}

const UnfulfilledItemDisplay = ({
  order,
  unfulfilledItems,
  requiresShipping = false,
}: {
  order: AdminOrder
  unfulfilledItems: AdminOrderLineItem[]
  requiresShipping: boolean
}) => {
  const { t } = useTranslation()

  if (order.status === "canceled") {
    return
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">{t("orders.fulfillment.unfulfilledItems")}</Heading>

        <div className="flex items-center gap-x-4">
          {requiresShipping && (
            <StatusBadge color="red" className="text-nowrap">
              {t("orders.fulfillment.requiresShipping")}
            </StatusBadge>
          )}

          <StatusBadge color="red" className="text-nowrap">
            {t("orders.fulfillment.awaitingFulfillmentBadge")}
          </StatusBadge>
        </div>
      </div>
      <div>
        {unfulfilledItems.map((item: AdminOrderLineItem) => (
          <UnfulfilledItem
            key={item.id}
            item={item}
            currencyCode={order.currency_code}
          />
        ))}
      </div>
      <div className="px-6 py-4 flex justify-end">
        <Link
          to={`/orders/${order.id}/fulfillment?requires_shipping=${requiresShipping}`}
        >
          <Button>Fulfill items</Button>
        </Link>
      </div>
    </Container>
  )
}

const PrintLabelButton = ({
  orderId,
  fulfillmentId,
  label,
}: {
  orderId: string
  fulfillmentId: string
  label: string
}) => {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    try {
      const blob = await fetchPdfWithAuth(
        `/vendor/orders/${orderId}/fulfillments/${fulfillmentId}/postex-label`
      )
      const url = URL.createObjectURL(blob)
      window.open(url, "_blank")
      setTimeout(() => URL.revokeObjectURL(url), 60000)
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to fetch label")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant="secondary"
      size="small"
      onClick={handleClick}
      disabled={loading}
      isLoading={loading}
    >
      {label}
    </Button>
  )
}

type FulfillmentWithItems = AdminOrderFulfillment & {
  items?: Array<{ line_item_id: string; quantity: number; title: string }>
  fulfillment_items?: Array<{ line_item_id: string; quantity: number; title: string }>
  labels?: Array<{ url?: string; label_url?: string; tracking_number: string }>
}

const Fulfillment = ({
  fulfillment,
  order,
  index,
}: {
  fulfillment: AdminOrderFulfillment
  order: AdminOrder
  index: number
}) => {
  const { t } = useTranslation()
  const f = fulfillment as FulfillmentWithItems
  const fulfillmentItems = Array.isArray(f.items) ? f.items : Array.isArray(f.fulfillment_items) ? f.fulfillment_items : []
  const fulfillmentLabels = Array.isArray(f.labels) ? f.labels : []
  const prompt = usePrompt()
  const navigate = useNavigate()

  const showLocation = !!fulfillment.location_id

  const fulfillmentExt = fulfillment as { shipping_option_type_id?: string }
  const shippingOptionType = fulfillmentExt.shipping_option_type_id
  const isPostexCollection =
    fulfillment.provider_id?.includes("postex") &&
    shippingOptionType === "postex-pickup"
  const isPickUpFulfillment = isPostexCollection

  if (process.env.NODE_ENV === "development") {
    console.log("[Fulfillment] debug", {
      fulfillmentId: fulfillment.id,
      provider_id: fulfillment.provider_id,
      labels: f.labels,
      fulfillmentLabelsLength: fulfillmentLabels.length,
      shipping_option: fulfillment.shipping_option,
      isPickUpFulfillment,
      shippingOptionType,
      isPostexCollection,
      showPrintButton:
        fulfillment.provider_id?.includes("postex") &&
        fulfillmentLabels.length > 0,
    })
  }

  const { stock_location, isError, error } = useStockLocation(
    fulfillment.location_id!,
    undefined,
    {
      enabled: showLocation,
    }
  )

  let statusKey = fulfillment.requires_shipping
    ? isPostexCollection
      ? "orders.fulfillment.status.awaitingCollection"
      : isPickUpFulfillment
        ? "orders.fulfillment.status.awaitingPickup"
        : "orders.fulfillment.status.awaitingShipping"
    : "orders.fulfillment.status.awaitingDelivery"
  let statusColor: "blue" | "green" | "red" = "blue"
  let statusTimestamp = fulfillment.created_at

  if (fulfillment.canceled_at) {
    statusKey = "orders.fulfillment.status.canceled"
    statusColor = "red"
    statusTimestamp = fulfillment.canceled_at
  } else if (fulfillment.delivered_at) {
    statusKey = "orders.fulfillment.status.delivered"
    statusColor = "green"
    statusTimestamp = fulfillment.delivered_at
  } else if (fulfillment.shipped_at) {
    statusKey = "orders.fulfillment.status.shipped"
    statusColor = "green"
    statusTimestamp = fulfillment.shipped_at
  }

  const { mutateAsync } = useCancelOrderFulfillment(order.id, fulfillment.id)
  const { mutateAsync: markAsDelivered } = useMarkOrderFulfillmentAsDelivered(
    order.id,
    fulfillment.id
  )

  const showShippingButton =
    !fulfillment.canceled_at &&
    !fulfillment.shipped_at &&
    !fulfillment.delivered_at &&
    fulfillment.requires_shipping &&
    !isPickUpFulfillment

  const showDeliveryButton =
    !fulfillment.canceled_at && !fulfillment.delivered_at

  const handleMarkAsDelivered = async () => {
    const res = await prompt({
      title: t("general.areYouSure"),
      description: t("orders.fulfillment.markAsDeliveredWarning"),
      confirmText: t("actions.continue"),
      cancelText: t("actions.cancel"),
      variant: "confirmation",
    })

    if (res) {
      await markAsDelivered(undefined, {
        onSuccess: () => {
          toast.success(
            t(
              isPickUpFulfillment
                ? "orders.fulfillment.toast.fulfillmentPickedUp"
                : "orders.fulfillment.toast.fulfillmentDelivered"
            )
          )
        },
        onError: (e) => {
          toast.error(e.message)
        },
      })
    }
  }

  const handleCancel = async () => {
    if (fulfillment.shipped_at) {
      toast.warning(t("orders.fulfillment.toast.fulfillmentShipped"))
      return
    }

    const res = await prompt({
      title: t("general.areYouSure"),
      description: t("orders.fulfillment.cancelWarning"),
      confirmText: t("actions.continue"),
      cancelText: t("actions.cancel"),
    })

    if (res) {
      await mutateAsync(undefined, {
        onSuccess: () => {
          toast.success(t("orders.fulfillment.toast.canceled"))
        },
        onError: (e) => {
          toast.error(e.message)
        },
      })
    }
  }

  if (isError) {
    throw error
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">
          {t("orders.fulfillment.number", {
            number: index + 1,
          })}
        </Heading>
        <div className="flex items-center gap-x-4">
          <Tooltip
            content={format(
              new Date(statusTimestamp),
              "dd MMM, yyyy, HH:mm:ss"
            )}
          >
            <StatusBadge color={statusColor} className="text-nowrap">
              {t(statusKey)}
            </StatusBadge>
          </Tooltip>
          <ActionMenu
            groups={[
              {
                actions: [
                  {
                    label: t("actions.cancel"),
                    icon: <XCircle />,
                    onClick: handleCancel,
                    disabled: !!fulfillment.canceled_at,
                  },
                ],
              },
            ]}
          />
        </div>
      </div>
      <div className="text-ui-fg-subtle grid grid-cols-2 items-start px-6 py-4">
        <Text size="small" leading="compact" weight="plus">
          {t("orders.fulfillment.itemsLabel")}
        </Text>
        <ul>
          {fulfillmentItems.map((f_item) => (
            <li key={f_item.line_item_id}>
              <Text size="small" leading="compact">
                {f_item.quantity}x {f_item.title}
              </Text>
            </li>
          ))}
        </ul>
      </div>
      {showLocation && (
        <div className="text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4">
          <Text size="small" leading="compact" weight="plus">
            {t("orders.fulfillment.shippingFromLabel")}
          </Text>
          {stock_location ? (
            <Link
              to={`/settings/locations/${stock_location.id}`}
              className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover transition-fg"
            >
              <Text size="small" leading="compact">
                {stock_location.name}
              </Text>
            </Link>
          ) : (
            <Skeleton className="w-16" />
          )}
        </div>
      )}
      <div className="text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4">
        <Text size="small" leading="compact" weight="plus">
          {t("fields.provider")}
        </Text>

        <Text size="small" leading="compact">
          {formatProvider(fulfillment.provider_id)}
        </Text>
      </div>
      <div className="text-ui-fg-subtle grid grid-cols-2 items-start px-6 py-4">
        <Text size="small" leading="compact" weight="plus">
          {t("orders.fulfillment.trackingLabel")}
        </Text>
        <div className="flex flex-col gap-2">
          {fulfillmentLabels.length > 0 ? (
            <ul>
              {fulfillmentLabels.map((tlink) => {
                const trackingUrl =
                  (tlink as { tracking_url?: string }).tracking_url ||
                  tlink.url
                const hasTrackingUrl =
                  trackingUrl &&
                  trackingUrl.length > 0 &&
                  trackingUrl !== "#"

                if (hasTrackingUrl) {
                  return (
                    <li key={tlink.tracking_number}>
                      <a
                        href={trackingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover transition-fg"
                      >
                        <Text size="small" leading="compact">
                          {tlink.tracking_number}
                        </Text>
                      </a>
                    </li>
                  )
                }

                return (
                  <li key={tlink.tracking_number}>
                    <Text size="small" leading="compact">
                      {tlink.tracking_number}
                    </Text>
                  </li>
                )
              })}
            </ul>
          ) : (
            <Text size="small" leading="compact">
              -
            </Text>
          )}
          {fulfillment.provider_id?.includes("postex") && (
              <PrintLabelButton
                orderId={order.id}
                fulfillmentId={fulfillment.id}
                label={t("orders.fulfillment.printLabel")}
              />
            )}
        </div>
      </div>

      {(showShippingButton || showDeliveryButton) && (
        <div className="bg-ui-bg-subtle flex items-center justify-end gap-x-2 rounded-b-xl px-4 py-4">
          {showDeliveryButton && (
            <Button onClick={handleMarkAsDelivered} variant="secondary">
              {t(
                isPickUpFulfillment
                  ? "orders.fulfillment.markAsPickedUp"
                  : "orders.fulfillment.markAsDelivered"
              )}
            </Button>
          )}

          {showShippingButton && (
            <Button
              onClick={() => navigate(`./${fulfillment.id}/create-shipment`)}
              variant="secondary"
            >
              {t("orders.fulfillment.markAsShipped")}
            </Button>
          )}
        </div>
      )}
    </Container>
  )
}
