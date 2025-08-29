import "@medusajs/types"

declare module "@medusajs/types" {
  export namespace HttpTypes {
    interface AdminCreateRegion {
      city_id?: string
      [key: string]: any
    }

    interface AdminUpdateRegion {
      city_id?: string
      [key: string]: any
    }

    interface AdminRegion {
      city_id?: string
      city?: {
        id: string
        name: string
      }
      [key: string]: any
    }
  }
} 