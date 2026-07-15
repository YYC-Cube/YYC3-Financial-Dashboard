/**
 * @file 运维管理子系统注册
 * @author YYC³
 * @version 1.0.0
 * @created 2026-07-16
 * @reference docs/AI-Dev/packages/plugin-ops/src/register.ts
 */

import { Wrench } from "lucide-react"
import type { SystemRegistration } from "@/lib/ai-family/types"

export function register(): SystemRegistration {
  return {
    id: "ops",
    name: "运维管理",
    description: "操作/文件/数据库",
    icon: Wrench,
    color: "#FF6600",
    order: 20,

    menuItems: [
      { path: "/ops", label: "nav.operationCenter" },
      { path: "/ops/files", label: "nav.fileManager" },
      { path: "/ops/database", label: "nav.databaseManager" },
      { path: "/ops/reports", label: "nav.reportExport" },
    ],

    routes: [],

    hubCommands: [
      { id: "ops-backup", label: "执行数据备份", systemId: "ops", icon: Wrench, action: () => {} },
    ],
  }
}