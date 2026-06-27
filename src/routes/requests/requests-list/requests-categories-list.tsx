import { Button, Container, Heading, Text } from "@medusajs/ui"
import { SingleColumnPage } from "../../../components/layout/pages"
import { useDashboardExtension } from "../../../extensions"
import { RequestListTable } from "./components/request-list-table"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

export const RequestsCategoriesList = () => {
  const { getWidgets } = useDashboardExtension()
  const { t } = useTranslation()

  return (
    <SingleColumnPage
      widgets={{
        after: getWidgets("customer.list.after"),
        before: getWidgets("customer.list.before"),
      }}
    >
      <Container className="divided-y p-0">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <Heading>{t("requests.categories.heading")}</Heading>
            <Text className="text-ui-fg-subtle" size="small">
              {t("requests.categories.description")}
            </Text>
          </div>
          <Button variant="secondary" asChild>
            <Link to="create">{t("requests.categories.action")}</Link>
          </Button>
        </div>
        <div className="px-6 py-4">
          <RequestListTable request_type="product_category" />
        </div>
      </Container>
    </SingleColumnPage>
  )
}
