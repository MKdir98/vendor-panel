import { useQuery } from "@tanstack/react-query"
import { fetchQuery } from "../../lib/client"

const citiesQueryKeys = {
  all: () => ["cities"] as const,
  states: (countryCode: string) => [...citiesQueryKeys.all(), "states", countryCode] as const,
  cities: (stateId: string) => [...citiesQueryKeys.all(), "cities", stateId] as const,
  city: (cityId: string) => [...citiesQueryKeys.all(), "city", cityId] as const,
}

export interface State {
  id: string
  name: string
  country_code: string
  postex_province_code?: string
}

export interface City {
  id: string
  name: string
  country_code: string
  state_id: string
  postex_city_code?: string
}

export const useStates = (countryCode: string = "ir") => {
  const { data, ...rest } = useQuery({
    queryKey: citiesQueryKeys.states(countryCode),
    queryFn: async () => {
      const response = await fetchQuery(`/vendor/states`, {
        method: "GET",
        query: { country_code: countryCode }
      })
      return response as { states: State[] }
    },
    enabled: !!countryCode,
  })

  return {
    states: data?.states || [],
    ...rest,
  }
}

export const useCities = (stateId: string) => {
  const { data, ...rest } = useQuery({
    queryKey: citiesQueryKeys.cities(stateId),
    queryFn: async () => {
      const response = await fetchQuery(`/vendor/cities`, {
        method: "GET",
        query: { state_id: stateId }
      })
      return response as { cities: City[] }
    },
    enabled: !!stateId,
  })

  return {
    cities: data?.cities || [],
    ...rest,
  }
}

export const useCity = (cityId: string) => {
  const { data, ...rest } = useQuery({
    queryKey: citiesQueryKeys.city(cityId),
    queryFn: async () => {
      const response = await fetchQuery(`/vendor/cities/${cityId}`, {
        method: "GET"
      })
      return response as { city: City }
    },
    enabled: !!cityId,
  })

  return {
    city: data?.city || null,
    ...rest,
  }
}

