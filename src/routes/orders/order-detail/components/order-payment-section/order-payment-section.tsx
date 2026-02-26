import { AdminOrder, HttpTypes } from "@medusajs/types"
import { Container, Heading, StatusBadge, Text } from "@medusajs/ui"

import { useTranslation } from "react-i18next"

import { getStylizedAmount } from "../../../../../lib/money-amount-helpers"
import { getOrderPaymentStatus } from "../../../../../lib/order-helpers"

type OrderPaymentSectionProps = {
  order: HttpTypes.AdminOrder
}

export const getPaymentsFromOrder = (order: HttpTypes.AdminOrder) => {
  return order.payment_collections
    ?.map((collection: HttpTypes.AdminPaymentCollection) => collection.payments)
    .flat(1)
    .filter(Boolean) as HttpTypes.AdminPayment[]
}

export const OrderPaymentSection = ({ order }: OrderPaymentSectionProps) => {
  return (
    <Container className="divide-y divide-dashed p-0">
      <Header order={order} />
      <Total order={order} />
    </Container>
  )
}

const Header = ({ order }: { order: any }) => {
  const { t } = useTranslation()
  const { label, color } = getOrderPaymentStatus(t, order.payment_status)

  return (
    <div className="flex items-center justify-between px-6 py-4">
      <Heading level="h2">{t("orders.payment.title")}</Heading>

      <StatusBadge color={color} className="text-nowrap">
        {label}
      </StatusBadge>
    </div>
  )
}

const Total = ({ order }: { order: AdminOrder }) => {
  const { t } = useTranslation()
  const splitPayment = order.split_order_payment
  if (!splitPayment) {
    return null
  }
  const totalPending =
    splitPayment.authorized_amount - splitPayment.captured_amount

  return (
    <div>
      <div className="flex items-center justify-between px-6 py-4">
        <Text size="small" weight="plus" leading="compact">
          {t("orders.payment.totalPaidByCustomer")}
        </Text>

        <Text size="small" weight="plus" leading="compact">
          {getStylizedAmount(
            splitPayment.captured_amount,
            splitPayment.currency_code
          )}
        </Text>
      </div>

      {(splitPayment.status === "refunded" ||
        splitPayment.status === "partially_refunded") && (
        <div className="flex items-center justify-between px-6 py-4">
          <Text size="small" weight="plus" leading="compact">
            Refunded
          </Text>

          <Text size="small" weight="plus" leading="compact">
            {getStylizedAmount(
              splitPayment.refunded_amount,
              splitPayment.currency_code
            )}
          </Text>
        </div>
      )}

      {order.status !== "canceled" && totalPending > 0 && (
        <div className="flex items-center justify-between px-6 py-4">
          <Text size="small" weight="plus" leading="compact">
            Total pending
          </Text>

          <Text size="small" weight="plus" leading="compact">
            {getStylizedAmount(
              totalPending,
              splitPayment.currency_code
            )}
          </Text>
        </div>
      )}
    </div>
  )
}
