import {
  RouterProvider as Provider,
  createBrowserRouter,
} from "react-router-dom"
import { useMemo } from "react"

import { getAppBase } from "../../lib/app-config"
import { getRouteMap } from "./route-map"

export const RouterProvider = () => {
  const router = useMemo(
    () =>
      createBrowserRouter(getRouteMap(), {
        basename: getAppBase() || "/",
      }),
    []
  )

  return <Provider router={router} />
}
