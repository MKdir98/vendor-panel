import { InitOptions } from "i18next"

import translations from "./translations"

export const defaultI18nOptions: InitOptions = {
  debug: process.env.NODE_ENV === "development",
  lng: "fa",
  detection: {
    caches: ["cookie", "localStorage", "header"],
    lookupCookie: "lng",
    lookupLocalStorage: "lng",
    order: ["faDefault", "cookie", "localStorage", "navigator"],
  },
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: translations,
  supportedLngs: Object.keys(translations),
}
