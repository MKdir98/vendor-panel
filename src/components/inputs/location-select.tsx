import { Select } from "@medusajs/ui"
import { forwardRef } from "react"
import { useStates, useCities } from "../../hooks/api/cities"
import { Combobox } from "./combobox"

interface StateSelectProps {
  value?: string
  onChange: (value: string) => void
  countryCode?: string
  placeholder?: string
}

export const StateSelect = forwardRef<HTMLButtonElement, StateSelectProps>(
  (
    { value, onChange, countryCode = "ir", placeholder = "انتخاب استان" },
    ref
  ) => {
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

export const CitySelect = forwardRef<HTMLInputElement, CitySelectProps>(
  ({ value, onChange, stateId, placeholder = "انتخاب شهر", disabled }, ref) => {
    const { cities, isLoading } = useCities(stateId || "")
    const isDisabled = disabled || !stateId || isLoading

    const options = cities.map((city) => ({ value: city.id, label: city.name }))

    return (
      <Combobox
        ref={ref}
        value={value}
        onChange={(v) => onChange((v as string) || "")}
        options={options}
        placeholder={placeholder}
        disabled={isDisabled}
      />
    )
  }
)

CitySelect.displayName = "CitySelect"
