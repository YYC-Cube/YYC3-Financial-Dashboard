/**
 * @file i18n 模块统一导出
 * @description YYC³ 金融仪表盘多语言系统入口
 * @author YYC³
 * @version 1.0.0
 * @created 2026-07-15
 * @reference YYC3-i18n-Core (https://github.com/YYC-Cube/YYC3-i18n-Core)
 */

export { I18nEngine, i18n, t, type Locale, type TranslationMap, type I18nEngineConfig } from "./engine"
export { I18nProvider, useI18nContext, useTranslation, type I18nProviderProps, type UseTranslationReturn, type I18nContextValue } from "./react"
