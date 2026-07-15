"use client"

/**
 * @file HTML 属性动态设置组件
 * @description 根据当前语言动态设置 <html> 的 lang 和 dir 属性，支持 RTL 语言
 * @author YYC³
 * @version 1.0.0
 * @created 2026-07-16
 * @reference YYC3-多端适配-规范文档 §4.1 PC Web 端 + §4.2 PWA
 */

import { useEffect } from "react"
import { useTranslation } from "@/lib/i18n/react"

/** 语言到 HTML lang 属性的映射 */
const langMap: Record<string, string> = {
  "zh-CN": "zh-CN",
  "zh-TW": "zh-TW",
  en: "en",
  ja: "ja",
  ko: "ko",
  fr: "fr",
  de: "de",
  es: "es",
  "pt-BR": "pt-BR",
  ar: "ar",
}

/** RTL 语言列表 */
const rtlLocales = new Set(["ar"])

export default function HtmlAttributes() {
  const { locale } = useTranslation()

  useEffect(() => {
    const html = document.documentElement
    html.lang = langMap[locale] ?? "en"
    html.dir = rtlLocales.has(locale) ? "rtl" : "ltr"
  }, [locale])

  return null
}