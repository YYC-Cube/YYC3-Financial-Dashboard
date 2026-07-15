"use client"

/**
 * @file i18n React Provider 和 Hook
 * @description 兼容 @yyc3/i18n-react API，提供 useTranslation Hook
 * @author YYC³
 * @version 1.0.0
 * @created 2026-07-15
 * @reference YYC3-i18n-Core/packages/i18n-react
 */

import { createContext, useContext, useEffect, useState, useCallback, useMemo, type ReactNode } from "react"
import { I18nEngine, type Locale } from "./engine"

export interface I18nContextValue {
  engine: I18nEngine
  locale: Locale
  setLocale: (locale: Locale) => Promise<void>
  t: (key: string, params?: Record<string, string>) => string
  ready: boolean
}

const I18nContext = createContext<I18nContextValue | null>(null)

export interface I18nProviderProps {
  engine: I18nEngine
  children: ReactNode
}

export function I18nProvider({ engine, children }: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(engine.getLocale())
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
    setLocaleState(engine.getLocale())

    const unsubscribe = engine.subscribe((newLocale) => {
      setLocaleState(newLocale)
    })

    return () => {
      unsubscribe()
    }
  }, [engine])

  const value = useMemo<I18nContextValue>(
    () => ({
      engine,
      locale,
      ready,
      setLocale: async (newLocale: Locale) => {
        await engine.setLocale(newLocale)
        setLocaleState(newLocale)
      },
      t: (key: string, params?: Record<string, string>) => engine.t(key, params),
    }),
    [engine, locale, ready],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

/** 当 Provider 缺失时的兜底上下文（SSR / 静态导出的 not-found 页面等场景） */
const FALLBACK_CTX: I18nContextValue = {
  engine: null as unknown as I18nEngine,
  locale: "zh-CN" as Locale,
  ready: false,
  setLocale: async () => {},
  t: (key: string) => key,
}

export function useI18nContext(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    if (typeof window !== "undefined") {
      console.warn(
        "[i18n] useTranslation 在 <I18nProvider> 外使用，返回兜底值。请用 <I18nProvider engine={engine}> 包裹组件树。",
      )
    }
    return FALLBACK_CTX
  }
  return ctx
}

export interface UseTranslationReturn {
  t: (key: string, params?: Record<string, string>) => string
  locale: Locale
  setLocale: (locale: Locale) => Promise<void>
  ready: boolean
}

export function useTranslation(): UseTranslationReturn {
  const ctx = useI18nContext()
  const t = useCallback(
    (key: string, params?: Record<string, string>) => ctx.t(key, params),
    [ctx],
  )
  return {
    t,
    locale: ctx.locale,
    setLocale: ctx.setLocale,
    ready: ctx.ready,
  }
}
