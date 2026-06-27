import { Badge, Button, Container, Heading } from "@medusajs/ui"
import { format } from "date-fns"
import { StarsRating } from "../../../../components/common/stars-rating/stars-rating"
import { StatusCell } from "../../../../components/table/table-cells/review/status-cell"
import { ActionMenu } from "../../../../components/common/action-menu"
import { ExclamationCircle } from "@medusajs/icons"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

export const ReviewGeneralSection = ({
  review,
  isRequested = false,
}: {
  review: any
  isRequested?: boolean
}) => {
  const { t } = useTranslation()

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading>{t("reviews.domain")}</Heading>
        <div className="flex items-center gap-4">
          <Badge>
            <StatusCell status={review.seller_note} />
          </Badge>
          {isRequested ? (
            <Badge className="flex items-center gap-2">
              <ExclamationCircle />
              {t("reviews.requestedToRemove")}
            </Badge>
          ) : (
            <ActionMenu
              groups={[
                {
                  actions: [
                    {
                      label: t("reviews.actions.report"),
                      to: `/reviews/${review.id}/report`,
                      icon: <ExclamationCircle />,
                      disabled: isRequested,
                    },
                  ],
                },
              ]}
            />
          )}
        </div>
      </div>
      <div className="px-6 py-4 grid grid-cols-2">
        <div>{t("reviews.fields.stars")}</div>
        <div>
          <StarsRating rate={review.rating} />
        </div>
      </div>
      <div className="px-6 py-4 grid grid-cols-2">
        <div>{t("reviews.fields.review")}</div>
        <div>{review.customer_note}</div>
      </div>
      <div className="px-6 py-4 grid grid-cols-2">
        <div>{t("reviews.fields.reply")}</div>
        <div>{review.seller_note || "-"}</div>
      </div>
      <div className="px-6 py-4 grid grid-cols-2">
        <div>{t("reviews.fields.added")}</div>
        <div>{format(review.created_at, "dd MMM yyyy")}</div>
      </div>
      <div className="px-6 py-4 flex justify-end">
        <Link to={`/reviews/${review.id}/reply`}>
          <Button className="px-6">
            {review.seller_note ? t("reviews.actions.editReply") : t("reviews.actions.reply")}
          </Button>
        </Link>
      </div>
    </Container>
  )
}
