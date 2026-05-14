import { HttpTypes } from "@medusajs/types"
import { Navigate, Outlet, RouteObject, UIMatch } from "react-router-dom"

import { t } from "i18next"
import { ProtectedRoute } from "../../components/authentication/protected-route"
import { MainLayout } from "../../components/layout/main-layout"
import { PublicLayout } from "../../components/layout/public-layout"
import { SettingsLayout } from "../../components/layout/settings-layout"
import { ErrorBoundary } from "../../components/utilities/error-boundary"
import { TaxRegionDetailBreadcrumb } from "../../routes/tax-regions/tax-region-detail/breadcrumb"
import { taxRegionLoader } from "../../routes/tax-regions/tax-region-detail/loader"
import { RouteExtensions } from "./route-extensions"
import { SettingsExtensions } from "./settings-extensions"

export function getRouteMap(): RouteObject[] {
  return [
  {
    element: <ProtectedRoute />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: "/",
            errorElement: <ErrorBoundary />,
            lazy: () => import("../../routes/home"),
          },
          // temporarily disabled — re-enable by restoring lazy import
          { path: "stripe-connect/*", element: <Navigate to="/dashboard" replace /> },
          {
            path: "dashboard",
            errorElement: <ErrorBoundary />,
            lazy: () => import("../../routes/dashboard"),
          },
          {
            path: "/requests",
            errorElement: <ErrorBoundary />,
            handle: {
              breadcrumb: () => "Requests",
            },
            children: [
              {
                path: "",
                lazy: async () => {
                  const { Requests } = await import(
                    "../../routes/requests/requests-list"
                  )

                  return {
                    Component: Requests,
                  }
                },
              },
              {
                path: "categories",
                handle: {
                  breadcrumb: () => "Categories requests",
                },
                lazy: async () => {
                  const { RequestsCategoriesList } = await import(
                    "../../routes/requests/requests-list"
                  )

                  return {
                    Component: RequestsCategoriesList,
                  }
                },
                children: [
                  {
                    path: "create",
                    lazy: () =>
                      import("../../routes/categories/category-create"),
                  },
                  {
                    path: ":id/edit",
                    lazy: () => import("../../routes/categories/category-edit"),
                  },
                ],
              },
              {
                path: "collections",
                handle: {
                  breadcrumb: () => "Collection requests",
                },
                lazy: async () => {
                  const { RequestsCollectionsList } = await import(
                    "../../routes/requests/requests-list"
                  )

                  return {
                    Component: RequestsCollectionsList,
                  }
                },
                children: [
                  {
                    path: "create",
                    lazy: () =>
                      import("../../routes/collections/collection-create"),
                  },
                  {
                    path: ":id/edit",
                    lazy: () =>
                      import("../../routes/collections/collection-edit"),
                  },
                ],
              },
              {
                path: "reviews",
                handle: {
                  breadcrumb: () => "Reviews requests",
                },
                lazy: async () => {
                  const { RequestReviewsList } = await import(
                    "../../routes/requests/requests-list"
                  )

                  return {
                    Component: RequestReviewsList,
                  }
                },
                children: [
                  {
                    path: ":id/edit",
                    lazy: () => import("../../routes/reviews/review-report"),
                  },
                ],
              },
              {
                path: "orders",
                handle: {
                  breadcrumb: () => "Orders requests",
                },
                lazy: async () => {
                  const { RequestOrdersList } = await import(
                    "../../routes/requests/requests-list"
                  )

                  return {
                    Component: RequestOrdersList,
                  }
                },
                children: [
                  {
                    path: ":id/review",
                    lazy: async () =>
                      await import(
                        "../../routes/requests/request-order-return"
                      ),
                  },
                ],
              },
              {
                path: ":id",
                lazy: async () => {
                  const { Component, Breadcrumb, loader } = await import(
                    "../../routes/requests/request-detail"
                  )

                  return {
                    Component,
                    loader,
                    handle: {
                      breadcrumb: (match: UIMatch<any>) => (
                        <Breadcrumb {...match} />
                      ),
                    },
                  }
                },
              },
            ],
          },
          // temporarily disabled — re-enable by restoring lazy import
          { path: "/messages/*", element: <Navigate to="/dashboard" replace /> },
          // temporarily disabled — re-enable by restoring children
          { path: "/reviews/*", element: <Navigate to="/dashboard" replace /> },
          {
            path: "/products",
            errorElement: <ErrorBoundary />,
            handle: {
              breadcrumb: () => t("products.domain"),
            },
            children: [
              {
                path: "",
                lazy: () => import("../../routes/products/product-list"),
                children: [
                  {
                    path: "create",
                    lazy: () => import("../../routes/products/product-create"),
                  },
                  {
                    path: "import",
                    lazy: () => import("../../routes/products/product-import"),
                  },
                  {
                    path: "export",
                    lazy: () => import("../../routes/products/product-export"),
                  },
                ],
              },
              {
                path: ":id",
                errorElement: <ErrorBoundary />,
                lazy: async () => {
                  const { Breadcrumb, loader } = await import(
                    "../../routes/products/product-detail"
                  )

                  return {
                    Component: Outlet,
                    loader,
                    handle: {
                      breadcrumb: (
                        match: UIMatch<HttpTypes.AdminProductResponse>
                      ) => <Breadcrumb {...match} />,
                    },
                  }
                },
                children: [
                  {
                    path: "",
                    lazy: () => import("../../routes/products/product-detail"),
                    children: [
                      {
                        path: "additional-attributes",
                        lazy: () =>
                          import(
                            "../../routes/products/product-additional-attributes"
                          ),
                      },
                      {
                        path: "edit",
                        lazy: () =>
                          import("../../routes/products/product-edit"),
                      },
                      {
                        path: "edit-variant",
                        lazy: () =>
                          import(
                            "../../routes/product-variants/product-variant-edit"
                          ),
                      },
                      {
                        path: "sales-channels",
                        lazy: () =>
                          import(
                            "../../routes/products/product-sales-channels"
                          ),
                      },
                      {
                        path: "attributes",
                        lazy: () =>
                          import("../../routes/products/product-attributes"),
                      },
                      {
                        path: "organization",
                        lazy: () =>
                          import("../../routes/products/product-organization"),
                      },
                      {
                        path: "shipping-profile",
                        lazy: () =>
                          import(
                            "../../routes/products/product-shipping-profile"
                          ),
                      },
                      {
                        path: "media",
                        lazy: () =>
                          import("../../routes/products/product-media"),
                      },
                      {
                        path: "prices",
                        lazy: () =>
                          import("../../routes/products/product-prices"),
                      },
                      {
                        path: "options/create",
                        lazy: () =>
                          import("../../routes/products/product-create-option"),
                      },
                      {
                        path: "options/:option_id/edit",
                        lazy: () =>
                          import("../../routes/products/product-edit-option"),
                      },
                      {
                        path: "variants/create",
                        lazy: () =>
                          import(
                            "../../routes/products/product-create-variant"
                          ),
                      },
                      {
                        path: "stock",
                        lazy: () =>
                          import("../../routes/products/product-stock"),
                      },
                      {
                        path: "metadata/edit",
                        lazy: () =>
                          import("../../routes/products/product-metadata"),
                      },
                    ],
                  },
                  {
                    path: "variants/:variant_id",
                    lazy: async () => {
                      const { Component, Breadcrumb, loader } = await import(
                        "../../routes/product-variants/product-variant-detail"
                      )

                      return {
                        Component,
                        loader,
                        handle: {
                          breadcrumb: (
                            // eslint-disable-next-line max-len
                            match: UIMatch<HttpTypes.AdminProductVariantResponse>
                          ) => <Breadcrumb {...match} />,
                        },
                      }
                    },
                    children: [
                      {
                        path: "edit",
                        lazy: () =>
                          import(
                            "../../routes/product-variants/product-variant-edit"
                          ),
                      },
                      {
                        path: "prices",
                        lazy: () =>
                          import("../../routes/products/product-prices"),
                      },
                      {
                        path: "manage-items",
                        lazy: () =>
                          import(
                            "../../routes/product-variants/product-variant-manage-inventory-items"
                          ),
                      },
                      {
                        path: "metadata/edit",
                        lazy: () =>
                          import(
                            "../../routes/product-variants/product-variant-metadata"
                          ),
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            path: "/categories",
            errorElement: <ErrorBoundary />,
            handle: {
              breadcrumb: () => t("categories.domain"),
            },
            children: [
              {
                path: "",
                lazy: () => import("../../routes/categories/category-list"),
                children: [
                  {
                    path: "create",
                    lazy: () =>
                      import("../../routes/categories/category-create"),
                  },
                  {
                    path: "organize",
                    lazy: () =>
                      import("../../routes/categories/category-organize"),
                  },
                ],
              },
              {
                path: ":id",
                lazy: async () => {
                  const { Component, Breadcrumb, loader } = await import(
                    "../../routes/categories/category-detail"
                  )

                  return {
                    Component,
                    loader,
                    handle: {
                      breadcrumb: (
                        match: UIMatch<HttpTypes.AdminProductCategoryResponse>
                      ) => <Breadcrumb {...match} />,
                    },
                  }
                },
                children: [
                  {
                    path: "edit",
                    lazy: () => import("../../routes/categories/category-edit"),
                  },
                  {
                    path: "products",
                    lazy: () =>
                      import("../../routes/categories/category-products"),
                  },
                  {
                    path: "organize",
                    lazy: () =>
                      import("../../routes/categories/category-organize"),
                  },
                  {
                    path: "metadata/edit",
                    lazy: () =>
                      import("../../routes/categories/categories-metadata"),
                  },
                ],
              },
            ],
          },
          {
            path: "/orders",
            errorElement: <ErrorBoundary />,
            handle: {
              breadcrumb: () => t("orders.domain"),
            },
            children: [
              {
                path: "",
                lazy: () => import("../../routes/orders/order-list"),
              },
              {
                path: "postex-collection",
                lazy: async () => {
                  const mod = await import("../../routes/orders/postex-collection")
                  return { Component: mod.default ?? mod.Component }
                },
              },
              {
                path: ":id",
                lazy: async () => {
                  const { Component, Breadcrumb, loader } = await import(
                    "../../routes/orders/order-detail"
                  )

                  return {
                    Component,
                    loader,
                    handle: {
                      breadcrumb: (
                        match: UIMatch<HttpTypes.AdminOrderResponse>
                      ) => <Breadcrumb {...match} />,
                    },
                  }
                },
                children: [
                  {
                    path: "fulfillment",
                    lazy: () =>
                      import("../../routes/orders/order-create-fulfillment"),
                  },
                  {
                    path: "returns/:return_id/receive",
                    lazy: () =>
                      import("../../routes/orders/order-receive-return"),
                  },
                  {
                    path: "allocate-items",
                    lazy: () =>
                      import("../../routes/orders/order-allocate-items"),
                  },
                  {
                    path: ":f_id/create-shipment",
                    lazy: () =>
                      import("../../routes/orders/order-create-shipment"),
                  },
                  {
                    path: "returns",
                    lazy: () =>
                      import("../../routes/orders/order-create-return"),
                  },
                  {
                    path: "claims",
                    lazy: () =>
                      import("../../routes/orders/order-create-claim"),
                  },
                  {
                    path: "exchanges",
                    lazy: () =>
                      import("../../routes/orders/order-create-exchange"),
                  },
                  {
                    path: "edits",
                    lazy: () => import("../../routes/orders/order-create-edit"),
                  },
                  {
                    path: "refund",
                    lazy: () =>
                      import("../../routes/orders/order-create-refund"),
                  },
                  {
                    path: "transfer",
                    lazy: () =>
                      import("../../routes/orders/order-request-transfer"),
                  },
                  {
                    path: "email",
                    lazy: () => import("../../routes/orders/order-edit-email"),
                  },
                  {
                    path: "shipping-address",
                    lazy: () =>
                      import("../../routes/orders/order-edit-shipping-address"),
                  },
                  {
                    path: "billing-address",
                    lazy: () =>
                      import("../../routes/orders/order-edit-billing-address"),
                  },
                  {
                    path: "metadata/edit",
                    lazy: () => import("../../routes/orders/order-metadata"),
                  },
                ],
              },
            ],
          },
          // temporarily disabled — re-enable by restoring children
          { path: "/promotions/*", element: <Navigate to="/dashboard" replace /> },
          // temporarily disabled — re-enable by restoring children
          { path: "/campaigns/*", element: <Navigate to="/dashboard" replace /> },
          {
            path: "/collections",
            errorElement: <ErrorBoundary />,
            handle: {
              breadcrumb: () => t("collections.domain"),
            },
            children: [
              {
                path: "",
                lazy: () => import("../../routes/collections/collection-list"),
                children: [
                  {
                    path: "create",
                    lazy: () =>
                      import("../../routes/collections/collection-create"),
                  },
                ],
              },
              {
                path: ":id",
                lazy: async () => {
                  const { Component, Breadcrumb, loader } = await import(
                    "../../routes/collections/collection-detail"
                  )

                  return {
                    Component,
                    loader,
                    handle: {
                      breadcrumb: (
                        match: UIMatch<HttpTypes.AdminCollectionResponse>
                      ) => <Breadcrumb {...match} />,
                    },
                  }
                },
                children: [
                  {
                    path: "edit",
                    lazy: () =>
                      import("../../routes/collections/collection-edit"),
                  },
                  {
                    path: "products",
                    lazy: () =>
                      import(
                        "../../routes/collections/collection-add-products"
                      ),
                  },
                  {
                    path: "metadata/edit",
                    lazy: () =>
                      import("../../routes/collections/collection-metadata"),
                  },
                ],
              },
            ],
          },
          // temporarily disabled — re-enable by restoring children
          { path: "/price-lists/*", element: <Navigate to="/dashboard" replace /> },
          // temporarily disabled — re-enable by restoring children
          { path: "/customers/*", element: <Navigate to="/dashboard" replace /> },
          // temporarily disabled — re-enable by restoring children
          { path: "/customer-groups/*", element: <Navigate to="/dashboard" replace /> },
          {
            path: "/reservations",
            errorElement: <ErrorBoundary />,
            handle: {
              breadcrumb: () => t("reservations.domain"),
            },
            children: [
              {
                path: "",
                lazy: () =>
                  import("../../routes/reservations/reservation-list"),
                children: [
                  {
                    path: "create",
                    lazy: () =>
                      import("../../routes/reservations/reservation-create"),
                  },
                ],
              },
              {
                path: ":id",
                lazy: async () => {
                  const { Component, Breadcrumb, loader } = await import(
                    "../../routes/reservations/reservation-detail"
                  )

                  return {
                    Component,
                    loader,
                    handle: {
                      breadcrumb: (
                        match: UIMatch<HttpTypes.AdminReservationResponse>
                      ) => <Breadcrumb {...match} />,
                    },
                  }
                },
                children: [
                  {
                    path: "edit",
                    lazy: () =>
                      import(
                        "../../routes/reservations/reservation-detail/components/edit-reservation"
                      ),
                  },
                  {
                    path: "metadata/edit",
                    lazy: () =>
                      import("../../routes/reservations/reservation-metadata"),
                  },
                ],
              },
            ],
          },
          {
            path: "/inventory",
            errorElement: <ErrorBoundary />,
            handle: {
              breadcrumb: () => t("inventory.domain"),
            },
            children: [
              {
                path: "",
                lazy: () => import("../../routes/inventory/inventory-list"),
                children: [
                  {
                    path: "create",
                    lazy: () =>
                      import("../../routes/inventory/inventory-create"),
                  },
                  {
                    path: "stock",
                    lazy: () =>
                      import("../../routes/inventory/inventory-stock"),
                  },
                ],
              },
              {
                path: ":id",
                lazy: async () => {
                  const { Component, Breadcrumb, loader } = await import(
                    "../../routes/inventory/inventory-detail"
                  )

                  return {
                    Component,
                    loader,
                    handle: {
                      breadcrumb: (
                        match: UIMatch<HttpTypes.AdminInventoryItemResponse>
                      ) => <Breadcrumb {...match} />,
                    },
                  }
                },
                children: [
                  {
                    path: "edit",
                    lazy: () =>
                      import(
                        "../../routes/inventory/inventory-detail/components/edit-inventory-item"
                      ),
                  },
                  {
                    path: "attributes",
                    lazy: () =>
                      import(
                        "../../routes/inventory/inventory-detail/components/edit-inventory-item-attributes"
                      ),
                  },
                  {
                    path: "metadata/edit",
                    lazy: () =>
                      import("../../routes/inventory/inventory-metadata"),
                  },
                  {
                    path: "locations",
                    lazy: () =>
                      import(
                        "../../routes/inventory/inventory-detail/components/manage-locations"
                      ),
                  },
                  {
                    path: "locations/:location_id",
                    lazy: () =>
                      import(
                        "../../routes/inventory/inventory-detail/components/adjust-inventory"
                      ),
                  },
                ],
              },
            ],
          },
          ...RouteExtensions,
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/settings",
        handle: {
          breadcrumb: () => t("app.nav.settings.header"),
        },
        element: <SettingsLayout />,
        children: [
          {
            index: true,
            errorElement: <ErrorBoundary />,
            lazy: () => import("../../routes/settings"),
          },
          {
            path: "profile",
            errorElement: <ErrorBoundary />,
            lazy: () => import("../../routes/profile/profile-detail"),
            handle: {
              breadcrumb: () => t("profile.domain"),
            },
            children: [
              {
                path: "edit",
                lazy: () => import("../../routes/profile/profile-edit"),
              },
            ],
          },
          {
            path: "regions",
            errorElement: <ErrorBoundary />,
            element: <Outlet />,
            handle: {
              breadcrumb: () => t("regions.domain"),
            },
            children: [
              {
                path: "",
                lazy: () => import("../../routes/regions/region-list"),
                children: [
                  {
                    path: "create",
                    lazy: () => import("../../routes/regions/region-create"),
                  },
                ],
              },
              {
                path: ":id",
                lazy: async () => {
                  const { Component, Breadcrumb, loader } = await import(
                    "../../routes/regions/region-detail"
                  )

                  return {
                    Component,
                    loader,
                    handle: {
                      breadcrumb: (
                        match: UIMatch<HttpTypes.AdminRegionResponse>
                      ) => <Breadcrumb {...match} />,
                    },
                  }
                },
                children: [
                  {
                    path: "edit",
                    lazy: () => import("../../routes/regions/region-edit"),
                  },
                  {
                    path: "countries/add",
                    lazy: () =>
                      import("../../routes/regions/region-add-countries"),
                  },
                  {
                    path: "metadata/edit",
                    lazy: () => import("../../routes/regions/region-metadata"),
                  },
                ],
              },
            ],
          },
          {
            path: "store",
            errorElement: <ErrorBoundary />,
            lazy: () => import("../../routes/store/store-detail"),
            handle: {
              breadcrumb: () => t("store.domain"),
            },
            children: [
              {
                path: "edit",
                lazy: () => import("../../routes/store/store-edit"),
              },
              {
                path: "edit-company",
                lazy: () => import("../../routes/store/store-edit-company"),
              },
              {
                path: "currencies",
                lazy: () => import("../../routes/store/store-add-currencies"),
              },
              {
                path: "metadata/edit",
                lazy: () => import("../../routes/store/store-metadata"),
              },
            ],
          },
          {
            path: "users",
            errorElement: <ErrorBoundary />,
            element: <Outlet />,
            handle: {
              breadcrumb: () => t("users.domain"),
            },
            children: [
              {
                path: "",
                lazy: () => import("../../routes/users/user-list"),
                children: [
                  {
                    path: "invite",
                    lazy: () => import("../../routes/users/user-invite"),
                  },
                ],
              },
              {
                path: ":id",
                lazy: async () => {
                  const { Component, Breadcrumb, loader } = await import(
                    "../../routes/users/user-detail"
                  )

                  return {
                    Component,
                    loader,
                    handle: {
                      breadcrumb: (
                        match: UIMatch<HttpTypes.AdminUserResponse>
                      ) => <Breadcrumb {...match} />,
                    },
                  }
                },
                children: [
                  {
                    path: "edit",
                    lazy: () => import("../../routes/users/user-edit"),
                  },
                  {
                    path: "metadata/edit",
                    lazy: () => import("../../routes/users/user-metadata"),
                  },
                ],
              },
            ],
          },
          {
            path: "sales-channels",
            errorElement: <ErrorBoundary />,
            element: <Outlet />,
            handle: {
              breadcrumb: () => t("salesChannels.domain"),
            },
            children: [
              {
                path: "",
                lazy: () =>
                  import("../../routes/sales-channels/sales-channel-list"),
                children: [
                  {
                    path: "create",
                    lazy: () =>
                      import(
                        "../../routes/sales-channels/sales-channel-create"
                      ),
                  },
                ],
              },
              {
                path: ":id",
                lazy: async () => {
                  const { Component, Breadcrumb, loader } = await import(
                    "../../routes/sales-channels/sales-channel-detail"
                  )

                  return {
                    Component,
                    loader,
                    handle: {
                      breadcrumb: (
                        match: UIMatch<HttpTypes.AdminSalesChannelResponse>
                      ) => <Breadcrumb {...match} />,
                    },
                  }
                },
                children: [
                  {
                    path: "edit",
                    lazy: () =>
                      import("../../routes/sales-channels/sales-channel-edit"),
                  },
                  {
                    path: "add-products",
                    lazy: () =>
                      import(
                        "../../routes/sales-channels/sales-channel-add-products"
                      ),
                  },
                  {
                    path: "metadata/edit",
                    lazy: () =>
                      import(
                        "../../routes/sales-channels/sales-channel-metadata"
                      ),
                  },
                ],
              },
            ],
          },
          {
            path: "locations",
            errorElement: <ErrorBoundary />,
            element: <Outlet />,
            handle: {
              breadcrumb: () => t("locations.domain"),
            },
            children: [
              {
                path: "",
                lazy: () => import("../../routes/locations/location-list"),
              },
              {
                path: "create",
                lazy: () => import("../../routes/locations/location-create"),
              },
              {
                path: "shipping-profiles",
                element: <Outlet />,
                handle: {
                  breadcrumb: () => t("shippingProfile.domain"),
                },
                children: [
                  {
                    path: "",
                    lazy: () =>
                      import(
                        "../../routes/shipping-profiles/shipping-profiles-list"
                      ),
                    children: [
                      {
                        path: "create",
                        lazy: () =>
                          import(
                            "../../routes/shipping-profiles/shipping-profile-create"
                          ),
                      },
                    ],
                  },
                  {
                    path: ":shipping_profile_id",
                    lazy: async () => {
                      const { Component, Breadcrumb, loader } = await import(
                        "../../routes/shipping-profiles/shipping-profile-detail"
                      )

                      return {
                        Component,
                        loader,
                        handle: {
                          breadcrumb: (
                            // eslint-disable-next-line max-len
                            match: UIMatch<HttpTypes.AdminShippingProfileResponse>
                          ) => <Breadcrumb {...match} />,
                        },
                      }
                    },
                    children: [
                      {
                        path: "metadata/edit",
                        lazy: () =>
                          import(
                            "../../routes/shipping-profiles/shipping-profile-metadata"
                          ),
                      },
                    ],
                  },
                ],
              },
              {
                path: ":location_id",
                lazy: async () => {
                  const { Component, Breadcrumb, loader } = await import(
                    "../../routes/locations/location-detail"
                  )

                  return {
                    Component,
                    loader,
                    handle: {
                      breadcrumb: (
                        match: UIMatch<HttpTypes.AdminStockLocationResponse>
                      ) => <Breadcrumb {...match} />,
                    },
                  }
                },
                children: [
                  {
                    path: "edit",
                    lazy: () => import("../../routes/locations/location-edit"),
                  },
                  {
                    path: "sales-channels",
                    lazy: () =>
                      import("../../routes/locations/location-sales-channels"),
                  },
                  {
                    path: "fulfillment-providers",
                    lazy: () =>
                      import(
                        "../../routes/locations/location-fulfillment-providers"
                      ),
                  },
                  {
                    path: "fulfillment-set/:fset_id",
                    children: [
                      {
                        path: "service-zones/create",
                        lazy: () =>
                          import(
                            "../../routes/locations/location-service-zone-create"
                          ),
                      },
                      {
                        path: "service-zone/:zone_id",
                        children: [
                          {
                            path: "edit",
                            lazy: () =>
                              import(
                                "../../routes/locations/location-service-zone-edit"
                              ),
                          },
                          {
                            path: "areas",
                            lazy: () =>
                              import(
                                "../../routes/locations/location-service-zone-manage-areas"
                              ),
                          },
                          {
                            path: "shipping-option",
                            children: [
                              {
                                path: "create",
                                lazy: () =>
                                  import(
                                    "../../routes/locations/location-service-zone-shipping-option-create"
                                  ),
                              },
                              {
                                path: ":so_id",
                                children: [
                                  {
                                    path: "edit",
                                    lazy: () =>
                                      import(
                                        "../../routes/locations/location-service-zone-shipping-option-edit"
                                      ),
                                  },
                                  {
                                    path: "pricing",
                                    lazy: () =>
                                      import(
                                        "../../routes/locations/location-service-zone-shipping-option-pricing"
                                      ),
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            path: "product-tags",
            errorElement: <ErrorBoundary />,
            element: <Outlet />,
            handle: {
              breadcrumb: () => t("productTags.domain"),
            },
            children: [
              {
                path: "",
                lazy: () =>
                  import("../../routes/product-tags/product-tag-list"),
                children: [
                  {
                    path: "create",
                    lazy: () =>
                      import("../../routes/product-tags/product-tag-create"),
                  },
                ],
              },
              {
                path: ":id",
                lazy: async () => {
                  const { Component, Breadcrumb, loader } = await import(
                    "../../routes/product-tags/product-tag-detail"
                  )

                  return {
                    Component,
                    loader,
                    handle: {
                      breadcrumb: (
                        match: UIMatch<HttpTypes.AdminProductTagResponse>
                      ) => <Breadcrumb {...match} />,
                    },
                  }
                },
                children: [
                  {
                    path: "edit",
                    lazy: () =>
                      import("../../routes/product-tags/product-tag-edit"),
                  },
                ],
              },
            ],
          },
          {
            path: "workflows",
            errorElement: <ErrorBoundary />,
            element: <Outlet />,
            handle: {
              breadcrumb: () => t("workflowExecutions.domain"),
            },
            children: [
              {
                path: "",
                lazy: () =>
                  import(
                    "../../routes/workflow-executions/workflow-execution-list"
                  ),
              },
              {
                path: ":id",
                lazy: async () => {
                  const { Component, Breadcrumb, loader } = await import(
                    "../../routes/workflow-executions/workflow-execution-detail"
                  )

                  return {
                    Component,
                    loader,
                    handle: {
                      breadcrumb: (
                        match: UIMatch<HttpTypes.AdminWorkflowExecutionResponse>
                      ) => <Breadcrumb {...match} />,
                    },
                  }
                },
              },
            ],
          },
          {
            path: "product-types",
            errorElement: <ErrorBoundary />,
            element: <Outlet />,
            handle: {
              breadcrumb: () => t("productTypes.domain"),
            },
            children: [
              {
                path: "",
                lazy: () =>
                  import("../../routes/product-types/product-type-list"),
                children: [
                  {
                    path: "create",
                    lazy: () =>
                      import("../../routes/product-types/product-type-create"),
                  },
                ],
              },
              {
                path: ":id",
                lazy: async () => {
                  const { Component, Breadcrumb, loader } = await import(
                    "../../routes/product-types/product-type-detail"
                  )

                  return {
                    Component,
                    loader,
                    handle: {
                      breadcrumb: (
                        match: UIMatch<HttpTypes.AdminProductTypeResponse>
                      ) => <Breadcrumb {...match} />,
                    },
                  }
                },
                children: [
                  {
                    path: "edit",
                    lazy: () =>
                      import("../../routes/product-types/product-type-edit"),
                  },
                ],
              },
            ],
          },
          {
            path: "publishable-api-keys",
            element: <Outlet />,
            handle: {
              breadcrumb: () => t("apiKeyManagement.domain.publishable"),
            },
            children: [
              {
                path: "",
                element: <Outlet />,
                children: [
                  {
                    path: "",
                    lazy: () =>
                      import(
                        "../../routes/api-key-management/api-key-management-list"
                      ),
                    children: [
                      {
                        path: "create",
                        lazy: () =>
                          import(
                            "../../routes/api-key-management/api-key-management-create"
                          ),
                      },
                    ],
                  },
                ],
              },
              {
                path: ":id",
                lazy: async () => {
                  const { Component, Breadcrumb, loader } = await import(
                    "../../routes/api-key-management/api-key-management-detail"
                  )

                  return {
                    Component,
                    loader,
                    handle: {
                      breadcrumb: (
                        match: UIMatch<HttpTypes.AdminApiKeyResponse>
                      ) => <Breadcrumb {...match} />,
                    },
                  }
                },
                children: [
                  {
                    path: "edit",
                    lazy: () =>
                      import(
                        "../../routes/api-key-management/api-key-management-edit"
                      ),
                  },
                  {
                    path: "sales-channels",
                    lazy: () =>
                      import(
                        "../../routes/api-key-management/api-key-management-sales-channels"
                      ),
                  },
                ],
              },
            ],
          },
          {
            path: "secret-api-keys",
            element: <Outlet />,
            handle: {
              breadcrumb: () => t("apiKeyManagement.domain.secret"),
            },
            children: [
              {
                path: "",
                element: <Outlet />,
                children: [
                  {
                    path: "",
                    lazy: () =>
                      import(
                        "../../routes/api-key-management/api-key-management-list"
                      ),
                    children: [
                      {
                        path: "create",
                        lazy: () =>
                          import(
                            "../../routes/api-key-management/api-key-management-create"
                          ),
                      },
                    ],
                  },
                ],
              },
              {
                path: ":id",
                lazy: async () => {
                  const { Component, Breadcrumb, loader } = await import(
                    "../../routes/api-key-management/api-key-management-detail"
                  )

                  return {
                    Component,
                    loader,
                    handle: {
                      breadcrumb: (
                        match: UIMatch<HttpTypes.AdminApiKeyResponse>
                      ) => <Breadcrumb {...match} />,
                    },
                  }
                },
                children: [
                  {
                    path: "edit",
                    lazy: () =>
                      import(
                        "../../routes/api-key-management/api-key-management-edit"
                      ),
                  },
                ],
              },
            ],
          },
          {
            path: "tax-regions",
            element: <Outlet />,
            handle: {
              breadcrumb: () => t("taxRegions.domain"),
            },
            children: [
              {
                path: "",
                lazy: () => import("../../routes/tax-regions/tax-region-list"),
                children: [
                  {
                    path: "create",
                    lazy: () =>
                      import("../../routes/tax-regions/tax-region-create"),
                  },
                ],
              },
              {
                path: ":id",
                Component: Outlet,
                loader: taxRegionLoader,
                handle: {
                  breadcrumb: (
                    match: UIMatch<HttpTypes.AdminTaxRegionResponse>
                  ) => <TaxRegionDetailBreadcrumb {...match} />,
                },
                children: [
                  {
                    path: "",
                    lazy: async () => {
                      const { Component } = await import(
                        "../../routes/tax-regions/tax-region-detail"
                      )

                      return {
                        Component,
                      }
                    },
                    children: [
                      {
                        path: "provinces/create",
                        lazy: () =>
                          import(
                            "../../routes/tax-regions/tax-region-province-create"
                          ),
                      },
                      {
                        path: "overrides/create",
                        lazy: () =>
                          import(
                            "../../routes/tax-regions/tax-region-tax-override-create"
                          ),
                      },
                      {
                        path: "overrides/:tax_rate_id/edit",
                        lazy: () =>
                          import(
                            "../../routes/tax-regions/tax-region-tax-override-edit"
                          ),
                      },
                      {
                        path: "tax-rates/create",
                        lazy: () =>
                          import(
                            "../../routes/tax-regions/tax-region-tax-rate-create"
                          ),
                      },
                      {
                        path: "tax-rates/:tax_rate_id/edit",
                        lazy: () =>
                          import(
                            "../../routes/tax-regions/tax-region-tax-rate-edit"
                          ),
                      },
                    ],
                  },
                  {
                    path: "provinces/:province_id",
                    lazy: async () => {
                      const { Component, Breadcrumb, loader } = await import(
                        "../../routes/tax-regions/tax-region-province-detail"
                      )

                      return {
                        Component,
                        loader,
                        handle: {
                          breadcrumb: (
                            match: UIMatch<HttpTypes.AdminTaxRegionResponse>
                          ) => <Breadcrumb {...match} />,
                        },
                      }
                    },
                    children: [
                      {
                        path: "tax-rates/create",
                        lazy: () =>
                          import(
                            "../../routes/tax-regions/tax-region-tax-rate-create"
                          ),
                      },
                      {
                        path: "tax-rates/:tax_rate_id/edit",
                        lazy: () =>
                          import(
                            "../../routes/tax-regions/tax-region-tax-rate-edit"
                          ),
                      },
                      {
                        path: "overrides/create",
                        lazy: () =>
                          import(
                            "../../routes/tax-regions/tax-region-tax-override-create"
                          ),
                      },
                      {
                        path: "overrides/:tax_rate_id/edit",
                        lazy: () =>
                          import(
                            "../../routes/tax-regions/tax-region-tax-override-edit"
                          ),
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            path: "return-reasons",
            element: <Outlet />,
            handle: {
              breadcrumb: () => t("returnReasons.domain"),
            },
            children: [
              {
                path: "",
                lazy: () =>
                  import("../../routes/return-reasons/return-reason-list"),
                children: [
                  {
                    path: "create",
                    lazy: () =>
                      import(
                        "../../routes/return-reasons/return-reason-create"
                      ),
                  },

                  {
                    path: ":id",
                    children: [
                      {
                        path: "edit",
                        lazy: () =>
                          import(
                            "../../routes/return-reasons/return-reason-edit"
                          ),
                      },
                    ],
                  },
                ],
              },
            ],
          },
          ...SettingsExtensions,
        ],
      },
    ],
  },
  {
    element: <PublicLayout />,
    children: [
      {
        errorElement: <ErrorBoundary />,
        children: [
          {
            path: "/login",
            lazy: () => import("../../routes/login"),
          },
          {
            path: "/register",
            lazy: () => import("../../routes/register"),
          },
          {
            path: "/reset-password",
            lazy: () => import("../../routes/reset-password"),
          },
          {
            path: "/invite",
            lazy: () => import("../../routes/invite"),
          },
          {
            path: "/terms",
            handle: {
              breadcrumb: () => "Terms and Conditions",
            },
            lazy: () => import("../../routes/terms"),
          },
          {
            path: "*",
            lazy: () => import("../../routes/no-match"),
          },
        ],
      },
    ],
  },
]
}
