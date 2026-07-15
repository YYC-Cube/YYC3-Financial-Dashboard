"use client"

/**
 * @file AI 助手 Wrapper（客户端入口）
 * @description 在 Server Component (layout.tsx) 中安全引用客户端 AI 助手
 * @author YYC³
 * @version 1.0.0
 */

import dynamic from "next/dynamic"

/** 动态导入 AI 助手，禁用 SSR（浮窗组件仅在客户端运行） */
const FinanceAssistant = dynamic(
  () => import("./index").then((m) => m.FinanceAssistant),
  {
    ssr: false,
    loading: () => null,
  },
)

export default function FinanceAssistantWrapper() {
  return <FinanceAssistant mode="floating" />
}
