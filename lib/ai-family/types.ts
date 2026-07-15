/**
 * @file 系统注册接口类型定义
 * @description AI Family 中枢架构核心类型
 * @author YYC³
 * @version 1.0.0
 * @created 2026-07-16
 * @reference docs/AI-Dev/packages/shell/src/types.ts
 */

import type React from "react"

/** 侧边栏菜单项 */
export interface MenuItem {
  path: string
  label: string
  icon?: React.ElementType
  badge?: string | number
}

/** 浮窗 Hub 快捷命令 */
export interface HubCommand {
  id: string
  label: string
  systemId: string
  icon: React.ElementType
  action: () => void
}

/** 子系统注册信息 */
export interface SystemRegistration {
  id: string
  name: string
  description: string
  icon: React.ElementType
  color: string
  order: number

  menuItems: MenuItem[]
  /** 路由配置 (相对路径) */
  routes: { index?: boolean; path?: string; lazy?: () => Promise<{ default: React.ComponentType }> }[]
  /** 翻译贡献 */
  i18n?: Record<string, string>
  hubCommands?: HubCommand[]
}

/** 欢迎页系统卡片 */
export interface SystemCard {
  id: string
  name: string
  description: string
  icon: React.ElementType
  color: string
  path: string
  badge?: string
}