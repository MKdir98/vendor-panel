import { format, formatDistance, sub } from "date-fns-jalali"
import { faIR } from "date-fns-jalali/locale"
import { useTranslation } from "react-i18next"

export const useDate = () => {
  const { i18n } = useTranslation()

  const getFullDate = ({
    date,
    includeTime = false,
  }: {
    date: string | Date
    includeTime?: boolean
  }) => {
    const ensuredDate = new Date(date)

    if (isNaN(ensuredDate.getTime())) {
      return ""
    }

    const dateFormat = includeTime ? "yyyy/MM/dd HH:mm" : "yyyy/MM/dd"

    return format(ensuredDate, dateFormat, { locale: faIR })
  }

  function getRelativeDate(date: string | Date): string {
    const now = new Date()

    return formatDistance(sub(new Date(date), { minutes: 0 }), now, {
      addSuffix: true,
      locale: faIR,
    })
  }

  return {
    getFullDate,
    getRelativeDate,
  }
}
