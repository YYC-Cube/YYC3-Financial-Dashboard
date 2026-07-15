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
import { en } from "@/locales/en"

const engine = new I18nEngine({
  locale: "zh-CN",
  fallbackLocale: "en",
  translations: {
    "zh-CN": zhCN,
    en,
  },
})

export function I18nApp({ children }: { children: ReactNode }) {
  return <I18nProvider engine={engine}>{children}</I18nProvider>
}
