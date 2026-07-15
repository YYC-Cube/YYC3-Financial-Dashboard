/**
 * @file AI 助手类型定义
 * @description 金融仪表盘 AI 助手类型（适配自 YYC3 AI-Dev）
 * @author YYC³
 * @version 1.0.0
 * @reference docs/AI-Dev/AIAssistant/types.ts
 */

import type React from "react"

/** 聊天消息 */
export interface ChatMessage {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: number
  personaId?: string
  emotion?: string
}

/** 金融命令分类 */
export type CommandCategory = "account" | "transaction" | "analysis" | "goal" | "budget"

/** 快捷命令 */
export interface SystemCommand {
  id: string
  icon: React.ElementType
  label: string
  desc: string
  category: CommandCategory
  action: string
  color: string
  persona?: string
}

/** 提示词预设 */
export interface PromptPreset {
  id: string
  name: string
  prompt: string
  category: string
}

/** AI 模型选项 */
export interface ModelOption {
  id: string
  name: string
  provider: string
  isLocal: boolean
}

/** 金融顾问人格 */
export interface FinancePersona {
  id: string
  name: string
  shortName: string
  enTitle: string
  role: string
  color: string
  icon: React.ElementType
  personality: string
  expertise: string[]
  greeting: string
  mood: string
  modelName?: string
}

/** AI 技能 */
export interface AISkill {
  id: string
  name: string
  description: string
  icon: React.ElementType
  category: string
  color: string
  active: boolean
}

/** 插件 */
export interface AIPlugin {
  id: string
  name: string
  description: string
  version: string
  icon: React.ElementType
  color: string
  category: string
  enabled: boolean
}

export type TabKey = "chat" | "commands" | "people" | "skills" | "settings"

/** Tab 配置 */
export interface TabConfig {
  key: TabKey
  icon: React.ElementType
  label: string
}

/** 组件 Props */
export interface FinanceAssistantProps {
  isMobile?: boolean
  models?: ModelOption[]
  apiKey?: string
  baseUrl?: string
  loading?: boolean
  mode?: "floating" | "inline"
  defaultOpen?: boolean
}
