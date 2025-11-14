import { zodResolver } from "@hookform/resolvers/zod"
import { HttpTypes } from "@medusajs/types"
import { Button, Input, toast } from "@medusajs/ui"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import * as zod from "zod"
import { useEffect } from "react"

import { Form } from "../../../../../components/common/form"
import { CountrySelect } from "../../../../../components/inputs/country-select"
import { StateSelect, CitySelect } from "../../../../../components/inputs/location-select"
import { RouteDrawer, useRouteModal } from "../../../../../components/modals"
import { KeyboundForm } from "../../../../../components/utilities/keybound-form"
import { useUpdateStockLocation } from "../../../../../hooks/api/stock-locations"
import { useStates, useCities, useCity } from "../../../../../hooks/api/cities"

type EditLocationFormProps = {
  location: HttpTypes.AdminStockLocation
}

const EditLocationSchema = zod.object({
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

export const EditLocationForm = ({ location }: EditLocationFormProps) => {
  const { t } = useTranslation()
  const { handleSuccess } = useRouteModal()

  const cityId = (location.address as any)?.city_id || ""
  const { city } = useCity(cityId)

  const form = useForm<zod.infer<typeof EditLocationSchema>>({
    defaultValues: {
      name: location.name,
      address: {
        address_1: location.address?.address_1 || "",
        address_2: location.address?.address_2 || "",
        city_id: cityId,
        state_id: city?.state_id || "",
        company: location.address?.company || "",
        country_code: location.address?.country_code || "ir",
        phone: location.address?.phone || "",
        postal_code: location.address?.postal_code || "",
      },
    },
    resolver: zodResolver(EditLocationSchema),
  })

  const { mutateAsync, isPending } = useUpdateStockLocation(location.id)
  
  const stateId = form.watch("address.state_id")
  const { states } = useStates("ir")
  const { cities } = useCities(stateId)

  useEffect(() => {
    if (city?.state_id && !form.getValues("address.state_id")) {
      form.setValue("address.state_id", city.state_id)
    }
  }, [city, form])

  useEffect(() => {
    if (stateId && !cityId) {
      form.setValue("address.city_id", "")
    }
  }, [stateId, form, cityId])

  const handleSubmit = form.handleSubmit(async (values) => {
    const { name, address } = values
    const selectedState = states.find(s => s.id === address.state_id)
    const selectedCity = cities.find(c => c.id === address.city_id)

    const { state_id, ...addressWithoutStateId } = address

    await mutateAsync(
      {
        name: name,
        address: {
          ...addressWithoutStateId,
          province: selectedState?.name,
          city: selectedCity?.name,
        },
      },
      {
        onSuccess: () => {
          toast.success("Stock location updated")
          handleSuccess()
        },
        onError: (e) => {
          toast.error(e.message)
        },
      }
    )
  })

  return (
    <RouteDrawer.Form form={form}>
      <KeyboundForm
        onSubmit={handleSubmit}
        className="flex flex-1 flex-col overflow-hidden"
      >
        <RouteDrawer.Body className="flex flex-col gap-y-8 overflow-y-auto">
          <div className="grid grid-cols-1 gap-4">
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
                    <Form.Label optional>{t("fields.postalCode")}</Form.Label>
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
        </RouteDrawer.Body>
        <RouteDrawer.Footer>
          <div className="flex items-center justify-end gap-x-2">
            <RouteDrawer.Close asChild>
              <Button size="small" variant="secondary">
                {t("actions.cancel")}
              </Button>
            </RouteDrawer.Close>
            <Button size="small" type="submit" isLoading={isPending}>
              {t("actions.save")}
            </Button>
          </div>
        </RouteDrawer.Footer>
      </KeyboundForm>
    </RouteDrawer.Form>
  )
}
