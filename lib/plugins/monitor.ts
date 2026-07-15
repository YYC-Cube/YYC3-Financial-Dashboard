/**
 * @file 监控中心子系统注册
 * @author YYC³
 * @version 1.0.0
 * @created 2026-07-16
 * @reference docs/AI-Dev/packages/plugin-monitor/src/register.ts
 */

import { Activity } from "lucide-react"
import type { SystemRegistration } from "@/lib/ai-family/types"

export function register(): SystemRegistration {
  return {
    id: "monitor",
    name: "监控中心",
    description: "实时监控与告警",
    icon: Activity,
    color: "#00d4ff",
    order: 10,

    menuItems: [
      { path: "/monitor", label: "nav.dataMonitor" },
      { path: "/monitor/follow-up", label: "nav.followUp" },
      { path: "/monitor/patrol", label: "nav.patrol" },
      { path: "/monitor/alerts", label: "nav.alerts" },
    ],

    routes: [],

    hubCommands: [
      { id: "mon-status", label: "查看集群状态", systemId: "monitor", icon: Activity, action: () => {} },
    ],
  }
}