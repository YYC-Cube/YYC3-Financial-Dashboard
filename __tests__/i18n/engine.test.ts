/**
 * @file i18n 引擎测试
 * @description 测试 YYC³ i18n 引擎核心功能：翻译、插值、切换、缓存、订阅
 * @author YYC³
 * @version 1.0.0
 * @created 2026-07-15
 */

import type { TranslationMap } from "@/lib/i18n/engine"
import { I18nEngine } from "@/lib/i18n/engine"
import { beforeEach, describe, expect } from "vitest"

const testTranslations: Record<string, TranslationMap> = {
  "zh-CN": {
    common: { save: "保存", cancel: "取消" },
    account: { title: "账户", totalBalance: "总余额" },
    transaction: { count: "{count} 笔交易" },
  },
  en: {
    common: { save: "Save", cancel: "Cancel" },
    account: { title: "Accounts", totalBalance: "Total Balance" },
    transaction: { count: "{count} transactions" },
  },
}

describe("I18nEngine", () => {
  let engine: I18nEngine

  beforeEach(() => {
    engine = new I18nEngine({
      locale: "zh-CN",
      fallbackLocale: "en",
      translations: testTranslations,
    })
  })

  describe("基本翻译", () => {
    it("应正确翻译中文键", () => {
      expect(engine.t("common.save")).toBe("保存")
      expect(engine.t("common.cancel")).toBe("取消")
    })

    it("应正确翻译嵌套键", () => {
      expect(engine.t("account.title")).toBe("账户")
    })
  })

  describe("语言切换", () => {
    it("应正确切换到英文", async () => {
      await engine.setLocale("en")
      expect(engine.getLocale()).toBe("en")
      expect(engine.t("common.save")).toBe("Save")
    })

    it("切换后应清除缓存", async () => {
      engine.t("common.save") // 填充缓存
      await engine.setLocale("en")
      expect(engine.t("common.save")).toBe("Save")
    })
  })

  describe("ICU 参数插值", () => {
    it("应正确插值中文参数", () => {
      expect(engine.t("transaction.count", { count: "23" })).toBe("23 笔交易")
    })

    it("应正确插值英文参数", async () => {
      await engine.setLocale("en")
      expect(engine.t("transaction.count", { count: "5" })).toBe("5 transactions")
    })

    it("缺失参数应保留占位符", () => {
      expect(engine.t("transaction.count")).toBe("{count} 笔交易")
    })
  })

  describe("回退机制", () => {
    it("缺失翻译键应回退到英文", async () => {
      const partialEngine = new I18nEngine({
        locale: "zh-CN",
        fallbackLocale: "en",
        translations: {
          "zh-CN": { common: {} },
          en: { common: { save: "Save" } },
        },
      })
      // zh-CN 没有 common.save，回退到 en
      expect(partialEngine.t("common.save")).toBe("Save")
    })

    it("完全缺失的键应返回键名", () => {
      expect(engine.t("nonexistent.key")).toBe("nonexistent.key")
    })
  })

  describe("订阅机制", () => {
    it("语言切换应通知订阅者", async () => {
      const mockSubscriber = vi.fn()
      engine.subscribe(mockSubscriber)

      await engine.setLocale("en")

      expect(mockSubscriber).toHaveBeenCalledWith("en")
    })

    it("取消订阅后不应再收到通知", async () => {
      const mockSubscriber = vi.fn()
      const unsubscribe = engine.subscribe(mockSubscriber)

      unsubscribe()
      await engine.setLocale("en")

      expect(mockSubscriber).not.toHaveBeenCalled()
    })
  })

  describe("引擎统计", () => {
    it("应返回正确的统计信息", () => {
      const stats = engine.getStats()
      expect(stats.locale).toBe("zh-CN")
      expect(stats.loadedLocales).toContain("zh-CN")
      expect(stats.loadedLocales).toContain("en")
    })
  })
})
