/**
 * @file AI 智能子系统注册
 * @author YYC³
 * @version 1.0.0
 * @created 2026-07-16
 * @reference docs/AI-Dev/packages/plugin-ai/src/register.ts
 */

import { Brain } from "lucide-react"
import type { SystemRegistration } from "@/lib/ai-family/types"

export function register(): SystemRegistration {
  return {
    id: "ai",
    name: "AI 智能",
    description: "决策/模型/诊断",
    icon: Brain,
    color: "#AA55FF",
    order: 30,

    menuItems: [
      { path: "/ai", label: "nav.aiDecision" },
      { path: "/ai/models", label: "nav.modelProvider" },
      { path: "/ai/diagnosis", label: "nav.aiDiagnosis" },
    ],

    routes: [],

    hubCommands: [
      { id: "ai-analyze", label: "AI 智能分析", systemId: "ai", icon: Brain, action: () => {} },
    ],
  }
}