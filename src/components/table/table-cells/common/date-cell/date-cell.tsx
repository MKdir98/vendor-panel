import { Tooltip } from "@medusajs/ui"
import { format } from "date-fns-jalali/format"
import { useTranslation } from "react-i18next"
import { PlaceholderCell } from "../placeholder-cell"

type DateCellProps = {
  date?: Date | string | null
}

export const DateCell = ({ date }: DateCellProps) => {
  if (!date) {
    return <PlaceholderCell />
  }

  const value = new Date(date)
  value.setMinutes(value.getMinutes() - value.getTimezoneOffset())

  const hour12 = Intl.DateTimeFormat().resolvedOptions().hour12
  const timestampFormat = hour12 ? "yyyy/MM/dd hh:mm a" : "yyyy/MM/dd HH:mm"

  return (
    <div className="flex h-full w-full items-center overflow-hidden">
      <Tooltip
        className="z-10"
        content={
          <span className="text-pretty">{`${format(
            value,
            timestampFormat
          )}`}</span>
        }
      >
        <span className="truncate">{format(value, "yyyy/MM/dd")}</span>
      </Tooltip>
    </div>
  )
}

export const DateHeader = () => {
  const { t } = useTranslation()

  return (
    <div className="flex h-full w-full items-center">
      <span className="truncate">{t("fields.date")}</span>
    </div>
  )
}
