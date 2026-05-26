import { useTranslation } from "react-i18next"
import { orderCode } from "../../../../../lib/order-helpers"
import { PlaceholderCell } from "../../common/placeholder-cell"

export const DisplayIdCell = ({ displayId }: { displayId?: number | null }) => {
  if (!displayId) {
    return <PlaceholderCell />
  }

  return (
    <div className="text-ui-fg-subtle txt-compact-small flex h-full w-full items-center overflow-hidden">
      <span className="truncate">{orderCode(displayId)}</span>
    </div>
  )
}

export const DisplayIdHeader = () => {
  const { t } = useTranslation()

  return (
    <div className="flex h-full w-full items-center">
      <span className="truncate">{t("fields.order")}</span>
    </div>
  )
}
