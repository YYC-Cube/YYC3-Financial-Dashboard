/**
 * @file 开发工具子系统注册
 * @author YYC³
 * @version 1.0.0
 * @created 2026-07-16
 * @reference docs/AI-Dev/packages/plugin-dev/src/register.ts
 */

import { Code2 } from "lucide-react"
import type { SystemRegistration } from "@/lib/ai-family/types"

export function register(): SystemRegistration {
  return {
    id: "dev",
    name: "开发工具",
    description: "设计/终端/IDE",
    icon: Code2,
    color: "#E8E8E8",
    order: 50,

    menuItems: [
      { path: "/dev", label: "nav.designSystem" },
      { path: "/dev/terminal", label: "nav.terminal" },
      { path: "/dev/ide", label: "nav.idePanel" },
    ],

    routes: [],

    hubCommands: [
      { id: "dev-terminal", label: "打开终端", systemId: "dev", icon: Code2, action: () => {} },
    ],
  }
}