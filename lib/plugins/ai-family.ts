/**
 * @file AI Family 子系统注册
 * @description AI Family 中枢 — 统一协同所有系统
 * @author YYC³
 * @version 1.0.0
 * @created 2026-07-16
 * @reference docs/AI-Dev/packages/plugin-ai-family/src/register.ts
 */

import { UserCircle2 } from "lucide-react"
import type { SystemRegistration } from "@/lib/ai-family/types"

export function register(): SystemRegistration {
  return {
    id: "ai-family",
    name: "AI Family",
    description: "中枢 · 家人协同",
    icon: UserCircle2,
    color: "#00FF88",
    order: 40,

    menuItems: [
      { path: "/ai-family", label: "家族首页" },
      { path: "/ai-family/chat", label: "交流中心" },
      { path: "/ai-family/music", label: "音乐空间" },
      { path: "/ai-family/voice", label: "语音系统" },
      { path: "/ai-family/settings", label: "Family 设置" },
    ],

    routes: [
      { index: true, lazy: () => import("@/app/ai-family/page") },
      { path: "chat", lazy: () => import("@/app/ai-family/chat/page") },
      { path: "music", lazy: () => import("@/app/ai-family/page") },
      { path: "voice", lazy: () => import("@/app/ai-family/chat/page") },
      { path: "settings", lazy: () => import("@/app/ai-family/settings/page") },
    ],

    hubCommands: [
      { id: "hub-call-thinker", label: "呼叫万物分析数据", systemId: "ai-family", icon: UserCircle2, action: () => {} },
      { id: "hub-call-sentinel", label: "呼叫守护安全检查", systemId: "ai-family", icon: UserCircle2, action: () => {} },
    ],
  }
}