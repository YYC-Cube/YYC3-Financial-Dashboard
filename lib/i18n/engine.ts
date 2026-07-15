/**
 * @file i18n 引擎核心
 * @description 兼容 @yyc3/i18n-core API 的轻量级实现，支持 ICU 参数插值、缓存、订阅
 * @author YYC³
 * @version 1.0.0
 * @created 2026-07-15
 * @reference YYC3-i18n-Core (https://github.com/YYC-Cube/YYC3-i18n-Core)
 */

/** 支持的语言 */
export type Locale = "zh-CN" | "en"

/** 翻译映射类型 */
export type TranslationMap = { [key: string]: string | TranslationMap }

/** 引擎配置 */
export interface I18nEngineConfig {
  locale?: Locale
  fallbackLocale?: Locale
  translations?: Partial<Record<Locale, TranslationMap>>
  debug?: boolean
}

type Subscriber = (locale: Locale) => void

const STORAGE_KEY = "yyc3.i18n.locale"

export class I18nEngine {
  private locale: Locale
  private fallbackLocale: Locale
  private translations: Partial<Record<Locale, TranslationMap>>
  private subscribers: Set<Subscriber> = new Set()
  private cache: Map<string, string> = new Map()
  private debugMode: boolean

  constructor(config: I18nEngineConfig = {}) {
    this.locale = config.locale ?? this.detectLocale()
    this.fallbackLocale = config.fallbackLocale ?? "en"
    this.translations = config.translations ?? {}
    this.debugMode = config.debug ?? false

    // 持久化初始语言
    this.persistLocale(this.locale)
  }

  /** 检测用户语言偏好 */
  private detectLocale(): Locale {
    if (typeof window !== "undefined") {
      // 1. 检查 localStorage
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === "zh-CN" || stored === "en") return stored

      // 2. 检查浏览器语言
      const browserLang = navigator.language
      if (browserLang.startsWith("zh")) return "zh-CN"
    }
    return "zh-CN"
  }

  /** 持久化语言选择 */
  private persistLocale(locale: Locale): void {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, locale)
      } catch {
        // 忽略存储失败
      }
    }
  }

  /** 获取当前语言 */
  getLocale(): Locale {
    return this.locale
  }

  /** 切换语言 */
  async setLocale(locale: Locale): Promise<void> {
    if (this.locale === locale) return
    const oldLocale = this.locale
    this.locale = locale
    this.persistLocale(locale)
    this.cache.clear()
    this.notify()
    if (this.debugMode) {
      console.debug(`[i18n] 语言切换: ${oldLocale} → ${locale}`)
    }
  }

  /** 注册翻译 */
  registerTranslation(locale: Locale, map: TranslationMap): void {
    this.translations[locale] = map
    this.cache.clear()
  }

  /** 订阅语言变更 */
  subscribe(sub: Subscriber): () => void {
    this.subscribers.add(sub)
    return () => this.subscribers.delete(sub)
  }

  /** 通知订阅者 */
  private notify(): void {
    for (const sub of Array.from(this.subscribers)) {
      sub(this.locale)
    }
  }

  /** 翻译核心方法 */
  t(key: string, params?: Record<string, string>): string {
    // 检查缓存
    const cacheKey = `${this.locale}:${key}`
    const cached = this.cache.get(cacheKey)
    if (cached !== undefined) {
      return params ? this.interpolate(cached, params) : cached
    }

    // 解析翻译
    let value = this.resolveTranslation(key)

    // 回退到 fallbackLocale
    if (value === undefined && this.locale !== this.fallbackLocale) {
      value = this.resolveTranslation(key, this.fallbackLocale)
    }

    // 最终回退：返回 key
    if (value === undefined) {
      if (this.debugMode) {
        console.warn(`[i18n] 缺失翻译键: "${key}" (${this.locale})`)
      }
      value = key
    }

    // 缓存
    this.cache.set(cacheKey, value)

    // 插值参数
    return params ? this.interpolate(value, params) : value
  }

  /** 解析嵌套翻译键 */
  private resolveTranslation(key: string, locale?: Locale): string | undefined {
    const targetLocale = locale ?? this.locale
    const map = this.translations[targetLocale]
    if (!map) return undefined

    const keys = key.split(".")
    let value: unknown = map

    for (const k of keys) {
      if (value && typeof value === "object") {
        value = (value as Record<string, unknown>)[k]
      } else {
        return undefined
      }
    }

    return typeof value === "string" ? value : undefined
  }

  /** ICU 参数插值 */
  private interpolate(template: string, params: Record<string, string>): string {
    return template.replace(/\{(\w+)\}/g, (_, k) => params[k] ?? `{${k}}`)
  }

  /** 获取引擎统计信息 */
  getStats() {
    return {
      locale: this.locale,
      cacheSize: this.cache.size,
      subscriberCount: this.subscribers.size,
      loadedLocales: Object.keys(this.translations),
    }
  }
}

/** 单例实例 */
export const i18n = new I18nEngine()

/** 便捷翻译函数 */
export const t = (key: string, params?: Record<string, string>) => i18n.t(key, params)
