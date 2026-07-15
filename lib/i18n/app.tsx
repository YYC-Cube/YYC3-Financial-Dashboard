"use client"

/**
 * @file i18n 初始化组件
 * @description 注册翻译并包裹 I18nProvider，作为客户端入口
 * @author YYC³
 * @version 1.0.0
 * @created 2026-07-15
 */

import { useMemo, type ReactNode } from "react"
import { I18nEngine } from "./engine"
import { I18nProvider } from "./react"
import { zhCN } from "@/locales/zh-CN"
import { zhTW } from "@/locales/zh-TW"
import { en } from "@/locales/en"
import { ja } from "@/locales/ja"
import { ko } from "@/locales/ko"
import { fr } from "@/locales/fr"
import { de } from "@/locales/de"
import { es } from "@/locales/es"
import { ptBR } from "@/locales/pt-BR"
import { ar } from "@/locales/ar"

const engine = new I18nEngine({
  locale: "zh-CN",
  fallbackLocale: "en",
  translations: {
    "zh-CN": zhCN,
    "zh-TW": zhTW,
    en,
    ja,
    ko,
    fr,
    de,
    es,
    "pt-BR": ptBR,
    ar,
  },
})

export function I18nApp({ children }: { children: ReactNode }) {
  return <I18nProvider engine={engine}>{children}</I18nProvider>
}
