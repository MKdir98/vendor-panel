import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

import { defaultI18nOptions } from "../../../i18n/config"

const faDefaultDetector = {
  name: "faDefault",
  lookup: () => {
    if (typeof window === "undefined") return undefined
    const stored = localStorage.getItem("lng")
    const cookie = document.cookie.match(/lng=([^;]+)/)?.[1]
    if ((stored || cookie) && stored !== "en" && cookie !== "en") return undefined
    return "fa"
  },
}

export const I18n = () => {
  if (i18n.isInitialized) {
    return null
  }

  const languageDetector = new LanguageDetector(null, {
    lookupCookie: "lng",
    lookupLocalStorage: "lng",
  })
  languageDetector.addDetector(faDefaultDetector)

  i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init(defaultI18nOptions)

  return null
}

export { i18n }
