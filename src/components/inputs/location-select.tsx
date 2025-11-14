import { Select } from "@medusajs/ui"
import { forwardRef, useEffect, useState } from "react"
import { useStates, useCities } from "../../hooks/api/cities"

interface StateSelectProps {
  value?: string
  onChange: (value: string) => void
  countryCode?: string
  placeholder?: string
}

export const StateSelect = forwardRef<HTMLButtonElement, StateSelectProps>(
  ({ value, onChange, countryCode = "ir", placeholder = "انتخاب استان" }, ref) => {
    const { states, isLoading } = useStates(countryCode)

    return (
      <Select value={value} onValueChange={onChange} disabled={isLoading}>
        <Select.Trigger ref={ref}>
          <Select.Value placeholder={placeholder} />
        </Select.Trigger>
        <Select.Content className="max-h-[300px] overflow-y-auto">
          {states.map((state) => (
            <Select.Item key={state.id} value={state.id}>
              {state.name}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    )
  }
)

StateSelect.displayName = "StateSelect"

interface CitySelectProps {
  value?: string
  onChange: (value: string) => void
  stateId?: string
  placeholder?: string
  disabled?: boolean
}

export const CitySelect = forwardRef<HTMLButtonElement, CitySelectProps>(
  ({ value, onChange, stateId, placeholder = "انتخاب شهر", disabled }, ref) => {
    const { cities, isLoading } = useCities(stateId || "")
    const isDisabled = disabled || !stateId || isLoading

    return (
      <Select value={value} onValueChange={onChange} disabled={isDisabled}>
        <Select.Trigger ref={ref}>
          <Select.Value placeholder={placeholder} />
        </Select.Trigger>
        <Select.Content className="max-h-[300px] overflow-y-auto">
          {cities.map((city) => (
            <Select.Item key={city.id} value={city.id}>
              {city.name}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    )
  }
)

CitySelect.displayName = "CitySelect"

