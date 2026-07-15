"use client"

/**
 * @file PWA 注册组件
 * @description 注册 Service Worker，启用 PWA 离线能力
 * @author YYC³
 * @version 1.0.0
 * @created 2026-07-15
 * @reference YYC3-多端适配-规范文档 §4.2 PWA 渐进式 Web 应用
 */

import { useEffect } from "react"

export default function PWARegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .then((registration) => {
          // 检查更新
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                  // 新版本已就绪，通知用户刷新
                  newWorker.postMessage("SKIP_WAITING")
                }
              })
            }
          })
        })
        .catch((error) => {
          console.warn("SW 注册失败:", error)
        })
    }
  }, [])

  return null
}
