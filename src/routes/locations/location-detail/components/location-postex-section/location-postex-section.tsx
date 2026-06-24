import { HttpTypes } from "@medusajs/types"
import {
  Button,
  Container,
  Heading,
  StatusBadge,
  Text,
  toast,
  usePrompt,
} from "@medusajs/ui"
import { useTranslation } from "react-i18next"

import {
  useDisablePostex,
  useSetupPostex,
} from "../../../../../hooks/api/stock-locations"

type LocationPostexSectionProps = {
  location: HttpTypes.AdminStockLocation
}

const hasPostexShippingOption = (loc: any) =>
  loc.fulfillment_sets?.some((fs: any) =>
    fs.service_zones?.some((sz: any) =>
      sz.shipping_options?.some((so: any) => so.provider_id?.includes("postex"))
    )
  )

export const LocationPostexSection = ({
  location,
}: LocationPostexSectionProps) => {
  const { t } = useTranslation()
  const prompt = usePrompt()

  const isPostexActive = hasPostexShippingOption(location)

  const { mutateAsync: setupPostex, isPending: isEnabling } = useSetupPostex(
    location.id
  )
  const { mutateAsync: disablePostex, isPending: isDisabling } =
    useDisablePostex(location.id)

  const handleEnable = async () => {
    await setupPostex(undefined, {
      onSuccess: () => toast.success("ارسال پستکس فعال شد"),
      onError: (e) => toast.error(e.message),
    })
  }

  const handleDisable = async () => {
    const confirmed = await prompt({
      title: "آیا مطمئن هستید؟",
      description: "ارسال پستکس برای این انبار غیرفعال می‌شود.",
      confirmText: "غیرفعال‌سازی",
      cancelText: t("actions.cancel"),
    })
    if (!confirmed) return
    await disablePostex(undefined, {
      onSuccess: () => toast.success("ارسال پستکس غیرفعال شد"),
      onError: (e) => toast.error(e.message),
    })
  }

  return (
    <Container className="p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-x-3">
          <Heading level="h2">ارسال پستکس</Heading>
          <StatusBadge color={isPostexActive ? "green" : "grey"}>
            {isPostexActive ? "فعال" : "غیرفعال"}
          </StatusBadge>
        </div>
        {isPostexActive ? (
          <Button
            size="small"
            variant="danger"
            onClick={handleDisable}
            isLoading={isDisabling}
          >
            غیرفعال‌سازی
          </Button>
        ) : (
          <Button
            size="small"
            variant="primary"
            onClick={handleEnable}
            isLoading={isEnabling}
          >
            فعال‌سازی پستکس
          </Button>
        )}
      </div>
      {isPostexActive && (
        <div className="border-ui-border-base border-t px-6 py-4">
          <Text size="small" className="text-ui-fg-subtle">
            ارسال مرسوله از طریق پستکس فعال است. هزینه ارسال بر اساس مبدأ و مقصد محاسبه می‌شود.
          </Text>
        </div>
      )}
    </Container>
  )
}
