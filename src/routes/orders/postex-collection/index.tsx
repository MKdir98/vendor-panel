import { useState } from "react"
import { useTranslation } from "react-i18next"
import {
  Button,
  Checkbox,
  Container,
  Heading,
  Text,
  toast,
} from "@medusajs/ui"
import { SingleColumnPage } from "../../../components/layout/pages"
import { useDashboardExtension } from "../../../extensions"
import {
  usePostexCollection,
  usePostexCollectionOrders,
} from "../../../hooks/api/orders"
import { backendUrl } from "../../../lib/client/client"
import { getLocaleAmount } from "../../../lib/money-amount-helpers"

const PostexCollection = () => {
  const { t } = useTranslation()
  const { getWidgets } = useDashboardExtension()
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [collectionResult, setCollectionResult] = useState<{
    shipments: Array<{
      order_id: string
      fulfillment_id: string
      tracking_number: string
      label_url: string
    }>
    errors?: Array<{ order_id: string; message: string }>
  } | null>(null)

  const { data, isLoading, isError, error } = usePostexCollectionOrders()
  const postexOrders = data?.orders ?? []

  const { mutateAsync: requestCollection, isPending } = usePostexCollection({
    onSuccess: (data) => {
      setCollectionResult(data)
      if (data.shipments?.length) {
        toast.success(
          t("orders.postexCollection.toast.success", {
            count: data.shipments.length,
          })
        )
      }
      if (data.errors?.length) {
        data.errors.forEach((e) =>
          toast.error(`${e.order_id}: ${e.message}`)
        )
      }
    },
    onError: (e) => {
      toast.error(e.message)
    },
  })

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleAll = () => {
    if (selectedIds.size === postexOrders.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(postexOrders.map((o) => o.id)))
    }
  }

  const handleRequestCollection = async () => {
    if (selectedIds.size === 0) {
      toast.error(t("orders.postexCollection.error.noSelection"))
      return
    }
    setCollectionResult(null)
    await requestCollection({ order_ids: Array.from(selectedIds) })
  }

  const getLabelFullUrl = (path: string) =>
    `${backendUrl.replace(/\/$/, "")}${path}`

  if (isError) throw error

  return (
    <SingleColumnPage
      widgets={{
        before: getWidgets("order.list.before"),
        after: getWidgets("order.list.after"),
      }}
      hasOutlet={false}
    >
      <Container className="divide-y p-0">
        <div className="flex items-center justify-between px-6 py-4">
          <Heading>{t("orders.postexCollection.title")}</Heading>
          {!collectionResult && (
            <Button
              onClick={handleRequestCollection}
              disabled={isPending || selectedIds.size === 0}
              isLoading={isPending}
            >
              {t("orders.postexCollection.requestCollection")}
            </Button>
          )}
        </div>

        {collectionResult ? (
          <div className="px-6 py-4">
            <Heading level="h2" className="mb-4">
              {t("orders.postexCollection.labelsTitle")}
            </Heading>
            <div className="flex flex-col gap-4">
              {collectionResult.shipments?.length > 0 && (
                <div className="flex justify-end">
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => {
                      collectionResult.shipments?.forEach((s) =>
                        window.open(getLabelFullUrl(s.label_url), "_blank")
                      )
                    }}
                  >
                    {t("orders.postexCollection.printAll")}
                  </Button>
                </div>
              )}
              {collectionResult.shipments?.map((s) => (
                <div
                  key={s.order_id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <Text weight="plus">
                      {t("orders.postexCollection.order")} #{s.order_id.slice(0, 8)}
                    </Text>
                    <Text size="small" className="text-ui-fg-muted">
                      {t("orders.fulfillment.trackingLabel")}: {s.tracking_number}
                    </Text>
                  </div>
                  <a
                    href={getLabelFullUrl(s.label_url)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="secondary" size="small">
                      {t("orders.fulfillment.printLabel")}
                    </Button>
                  </a>
                </div>
              ))}
            </div>
            <Button
              variant="secondary"
              className="mt-4"
              onClick={() => {
                setCollectionResult(null)
                setSelectedIds(new Set())
              }}
            >
              {t("orders.postexCollection.selectMore")}
            </Button>
          </div>
        ) : (
          <div className="px-6 py-4">
            <Text className="text-ui-fg-muted mb-4">
              {t("orders.postexCollection.description")}
            </Text>
            {isLoading ? (
              <Text>{t("labels.loading")}</Text>
            ) : postexOrders.length === 0 ? (
              <Text>{t("orders.postexCollection.noOrders")}</Text>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 py-2">
                  <Checkbox
                    checked={
                      postexOrders.length > 0 &&
                      selectedIds.size === postexOrders.length
                    }
                    onCheckedChange={toggleAll}
                  />
                  <Text size="small" weight="plus">
                    {t("orders.postexCollection.selectAll")}
                  </Text>
                </div>
                {postexOrders.map((order) => {
                  const totalNum =
                    typeof order.total === "number"
                      ? order.total
                      : order.total?.value
                        ? Number(order.total.value)
                        : 0
                  const currencyCode = order.currency_code ?? "IRR"
                  return (
                    <div
                      key={order.id}
                      className="flex items-center gap-2 rounded border p-3"
                    >
                      <Checkbox
                        checked={selectedIds.has(order.id)}
                        onCheckedChange={() => toggleSelect(order.id)}
                      />
                      <div className="flex-1 min-w-0">
                        <Text size="small" weight="plus">
                          #{order.display_id ?? order.id.slice(0, 8)}
                        </Text>
                        <Text size="small" className="text-ui-fg-muted block">
                          {order.email}
                        </Text>
                        {order.items_summary && (
                          <Text size="small" className="text-ui-fg-muted block truncate">
                            {order.items_summary}
                          </Text>
                        )}
                        {totalNum > 0 && (
                          <Text size="small" weight="plus" className="mt-1">
                            {getLocaleAmount(totalNum, currencyCode)}
                          </Text>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </Container>
    </SingleColumnPage>
  )
}

export default PostexCollection
