import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Heading, Input, Text, toast } from "@medusajs/ui"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import * as zod from "zod"
import { useEffect } from "react"
import { Form } from "../../../../../components/common/form"
import { CountrySelect } from "../../../../../components/inputs/country-select"
import { StateSelect, CitySelect } from "../../../../../components/inputs/location-select"
import {
  RouteFocusModal,
  useRouteModal,
} from "../../../../../components/modals"
import { KeyboundForm } from "../../../../../components/utilities/keybound-form"
import { useCreateStockLocation } from "../../../../../hooks/api/stock-locations"
import { useStates, useCities } from "../../../../../hooks/api/cities"

const CreateLocationSchema = zod.object({
  name: zod.string().min(1),
  address: zod.object({
    address_1: zod.string().min(1),
    address_2: zod.string().optional(),
    country_code: zod.string().min(2).max(2),
    city_id: zod.string().min(1, "انتخاب شهر الزامی است"),
    state_id: zod.string().min(1, "انتخاب استان الزامی است"),
    postal_code: zod.string().optional(),
    company: zod.string().optional(),
    phone: zod.string().optional(),
  }),
})

export const CreateLocationForm = () => {
  const { t } = useTranslation()
  const { handleSuccess } = useRouteModal()

  const form = useForm<zod.infer<typeof CreateLocationSchema>>({
    defaultValues: {
      name: "",
      address: {
        address_1: "",
        address_2: "",
        city_id: "",
        state_id: "",
        company: "",
        country_code: "ir",
        phone: "",
        postal_code: "",
      },
    },
    resolver: zodResolver(CreateLocationSchema),
  })

  const { mutateAsync, isPending } = useCreateStockLocation()
  
  const stateId = form.watch("address.state_id")
  const { states } = useStates("ir")
  const { cities } = useCities(stateId)

  useEffect(() => {
    if (stateId) {
      form.setValue("address.city_id", "")
    }
  }, [stateId, form])

  const handleSubmit = form.handleSubmit(async (values) => {
    const selectedState = states.find(s => s.id === values.address.state_id)
    const selectedCity = cities.find(c => c.id === values.address.city_id)
    
    const { state_id, ...addressWithoutStateId } = values.address
    
    await mutateAsync(
      {
        name: values.name,
        address: {
          ...addressWithoutStateId,
          province: selectedState?.name,
          city: selectedCity?.name,
        },
      },
      {
        onSuccess: ({ stock_location }) => {
          toast.success(t("locations.toast.create"))

          handleSuccess(`/settings/locations/${stock_location.id}`)
        },
        onError: (e) => {
          toast.error(e.message)
        },
      }
    )
  })

  return (
    <RouteFocusModal.Form form={form}>
      <KeyboundForm
        onSubmit={handleSubmit}
        className="flex h-full flex-col overflow-hidden"
      >
        <RouteFocusModal.Header />
        <RouteFocusModal.Body className="flex flex-1 flex-col overflow-hidden">
          <div className="flex flex-1 flex-col items-center overflow-y-auto">
            <div className="flex w-full max-w-[720px] flex-col gap-y-8 px-2 py-16">
              <div>
                <Heading className="capitalize">
                  {t("stockLocations.create.header")}
                </Heading>
                <Text size="small" className="text-ui-fg-subtle">
                  {t("stockLocations.create.hint")}
                </Text>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Form.Field
                  control={form.control}
                  name="name"
                  render={({ field }) => {
                    return (
                      <Form.Item>
                        <Form.Label>{t("fields.name")}</Form.Label>
                        <Form.Control>
                          <Input size="small" {...field} />
                        </Form.Control>
                        <Form.ErrorMessage />
                      </Form.Item>
                    )
                  }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Form.Field
                  control={form.control}
                  name="address.address_1"
                  render={({ field }) => {
                    return (
                      <Form.Item>
                        <Form.Label>{t("fields.address")}</Form.Label>
                        <Form.Control>
                          <Input size="small" {...field} />
                        </Form.Control>
                        <Form.ErrorMessage />
                      </Form.Item>
                    )
                  }}
                />
                <Form.Field
                  control={form.control}
                  name="address.address_2"
                  render={({ field }) => {
                    return (
                      <Form.Item>
                        <Form.Label optional>{t("fields.address2")}</Form.Label>
                        <Form.Control>
                          <Input size="small" {...field} />
                        </Form.Control>
                        <Form.ErrorMessage />
                      </Form.Item>
                    )
                  }}
                />
                <Form.Field
                  control={form.control}
                  name="address.postal_code"
                  render={({ field }) => {
                    return (
                      <Form.Item>
                        <Form.Label optional>
                          {t("fields.postalCode")}
                        </Form.Label>
                        <Form.Control>
                          <Input size="small" {...field} />
                        </Form.Control>
                        <Form.ErrorMessage />
                      </Form.Item>
                    )
                  }}
                />
                <Form.Field
                  control={form.control}
                  name="address.state_id"
                  render={({ field }) => {
                    return (
                      <Form.Item>
                        <Form.Label>{t("fields.state")}</Form.Label>
                        <Form.Control>
                          <StateSelect {...field} countryCode="ir" />
                        </Form.Control>
                        <Form.ErrorMessage />
                      </Form.Item>
                    )
                  }}
                />
                <Form.Field
                  control={form.control}
                  name="address.city_id"
                  render={({ field }) => {
                    return (
                      <Form.Item>
                        <Form.Label>{t("fields.city")}</Form.Label>
                        <Form.Control>
                          <CitySelect {...field} stateId={stateId} />
                        </Form.Control>
                        <Form.ErrorMessage />
                      </Form.Item>
                    )
                  }}
                />
                <Form.Field
                  control={form.control}
                  name="address.country_code"
                  render={({ field }) => {
                    return (
                      <Form.Item>
                        <Form.Label>{t("fields.country")}</Form.Label>
                        <Form.Control>
                          <CountrySelect {...field} />
                        </Form.Control>
                        <Form.ErrorMessage />
                      </Form.Item>
                    )
                  }}
                />
                <Form.Field
                  control={form.control}
                  name="address.company"
                  render={({ field }) => {
                    return (
                      <Form.Item>
                        <Form.Label optional>{t("fields.company")}</Form.Label>
                        <Form.Control>
                          <Input size="small" {...field} />
                        </Form.Control>
                        <Form.ErrorMessage />
                      </Form.Item>
                    )
                  }}
                />
                <Form.Field
                  control={form.control}
                  name="address.phone"
                  render={({ field }) => {
                    return (
                      <Form.Item>
                        <Form.Label optional>{t("fields.phone")}</Form.Label>
                        <Form.Control>
                          <Input size="small" {...field} />
                        </Form.Control>
                        <Form.ErrorMessage />
                      </Form.Item>
                    )
                  }}
                />
              </div>
            </div>
          </div>
        </RouteFocusModal.Body>
        <RouteFocusModal.Footer>
          <div className="flex items-center justify-end gap-x-2">
            <RouteFocusModal.Close asChild>
              <Button size="small" variant="secondary">
                {t("actions.cancel")}
              </Button>
            </RouteFocusModal.Close>
            <Button type="submit" size="small" isLoading={isPending}>
              {t("actions.save")}
            </Button>
          </div>
        </RouteFocusModal.Footer>
      </KeyboundForm>
    </RouteFocusModal.Form>
  )
}
