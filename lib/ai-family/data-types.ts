/**
 * @file AI Family 数据类型定义
 * @description FamilyPersona, SystemCommand, AISkill 等类型
 * @author YYC³
 * @version 1.0.0
 * @created 2026-07-16
 */

import type React from "react"

export type CommandCategory = "cluster" | "model" | "data" | "security" | "monitor"

export interface FamilyPersona {
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
  modelName: string
}

export interface SystemCommand {
  id: string
  icon: React.ElementType
  label: string
  desc: string
  category: CommandCategory
  action: string
  color: string
}

export interface PromptPreset {
  id: string
  name: string
  prompt: string
  category: string
}

export interface ModelOption {
  id: string
  name: string
  provider: string
  isLocal: boolean
}

export interface AISkill {
  id: string
  name: string
  description: string
  icon: React.ElementType
  category: string
  color: string
  active: boolean
}

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

export interface AIModule {
  id: string
  name: string
  description: string
  size: string
  icon: React.ElementType
  color: string
  loaded: boolean
}