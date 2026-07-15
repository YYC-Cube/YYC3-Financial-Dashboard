/**
 * @file AI 助手数据定义
 * @description 金融顾问人格、快捷命令、技能、模型等数据（适配自 YYC3 AI-Dev）
 * @author YYC³
 * @version 1.0.0
 * @reference docs/AI-Dev/AIAssistant/data.ts
 */

import {
  Wallet, TrendingUp, PiggyBank, Target, BarChart3, Receipt,
  CreditCard, Coins, Shield, Zap, DollarSign, Scale,
} from "lucide-react"
import type {
  FinancePersona, SystemCommand, PromptPreset, ModelOption,
  AISkill, AIPlugin, CommandCategory,
} from "./types"

// ============================================================
// 金融顾问人格（4 位）
// ============================================================

export const FINANCE_PERSONAS: FinancePersona[] = [
  {
    id: "analyst",
    name: "智析·数据",
    shortName: "智析",
    enTitle: "Analyst",
    role: "数据分析与洞察",
    color: "#00d4ff",
    icon: BarChart3,
    personality: "沉稳内敛，思维深邃",
    expertise: ["收支分析", "趋势洞察", "数据可视化"],
    greeting: "你好，智析在此。每一个数据背后都有故事。",
    mood: "thoughtful",
    modelName: "DeepSeek",
  },
  {
    id: "advisor",
    name: "睿谋·顾问",
    shortName: "睿谋",
    enTitle: "Advisor",
    role: "财务规划与建议",
    color: "#00ff88",
    icon: Scale,
    personality: "沉稳大气，统揽全局",
    expertise: ["预算管理", "投资建议", "风险评估"],
    greeting: "睿谋在此。让财富稳健增长是我的使命。",
    mood: "steady",
    modelName: "GPT-4o",
  },
  {
    id: "guardian",
    name: "金盾·守护",
    shortName: "金盾",
    enTitle: "Guardian",
    role: "安全与防护",
    color: "#BF00FF",
    icon: Shield,
    personality: "外冷内热，默默守护",
    expertise: ["异常检测", "安全审计", "风险预警"],
    greeting: "金盾在岗。放心，每一笔交易都有我守护。",
    mood: "vigilant",
    modelName: "Llama 3",
  },
  {
    id: "scout",
    name: "远见·先知",
    shortName: "远见",
    enTitle: "Scout",
    role: "趋势预测与规划",
    color: "#FFD700",
    icon: Target,
    personality: "神秘而温和，感知变化",
    expertise: ["趋势预测", "目标规划", "情景分析"],
    greeting: "远见已上线。我看到了财富增长的可能性。",
    mood: "serene",
    modelName: "GLM-4",
  },
]

export const PERSONAS_MAP = Object.fromEntries(FINANCE_PERSONAS.map((p) => [p.id, p]))

// ============================================================
// 快捷命令
// ============================================================

export const FINANCE_COMMANDS: (SystemCommand & { persona?: string })[] = [
  { id: "cmd-01", icon: Wallet, label: "账户总览", desc: "查看所有账户余额和状态", category: "account" as CommandCategory, action: "显示所有账户的总余额、分类统计和近期变动", color: "#00d4ff", persona: "analyst" },
  { id: "cmd-02", icon: Receipt, label: "最近交易", desc: "查看最近10笔交易明细", category: "transaction" as CommandCategory, action: "列出最近10笔交易，包含金额、分类和时间", color: "#00ff88", persona: "analyst" },
  { id: "cmd-03", icon: BarChart3, label: "收支分析", desc: "生成本月收支分析报告", category: "analysis" as CommandCategory, action: "分析本月收入和支出趋势，生成可视化报告", color: "#aa55ff", persona: "analyst" },
  { id: "cmd-04", icon: TrendingUp, label: "消费趋势", desc: "分析近6个月消费趋势", category: "analysis" as CommandCategory, action: "展示近6个月的收支趋势图和环比变化", color: "#00d4ff", persona: "scout" },
  { id: "cmd-05", icon: Target, label: "目标进度", desc: "查看财务目标完成进度", category: "goal" as CommandCategory, action: "显示所有财务目标的当前进度和预计完成时间", color: "#FFD700", persona: "scout" },
  { id: "cmd-06", icon: PiggyBank, label: "预算建议", desc: "基于消费习惯生成预算建议", category: "budget" as CommandCategory, action: "根据历史消费数据，生成下月预算建议", color: "#00ff88", persona: "advisor" },
  { id: "cmd-07", icon: Shield, label: "安全检查", desc: "扫描异常交易和安全风险", category: "transaction" as CommandCategory, action: "检测异常交易模式，识别潜在风险", color: "#ff3366", persona: "guardian" },
  { id: "cmd-08", icon: Coins, label: "储蓄优化", desc: "分析储蓄效率并给出建议", category: "budget" as CommandCategory, action: "分析当前储蓄率，给出优化建议", color: "#FFD700", persona: "advisor" },
]

// ============================================================
// 提示词预设
// ============================================================

export const PROMPT_PRESETS: PromptPreset[] = [
  { id: "p1", name: "财务分析师", prompt: "你是专业的财务分析师。请分析用户的收支数据，识别消费模式，给出优化建议。使用中文回答，简洁专业。", category: "分析" },
  { id: "p2", name: "理财顾问", prompt: "你是个人理财顾问。请根据用户的财务状况，提供个性化的储蓄、投资和预算建议。保持友好专业的态度。", category: "规划" },
  { id: "p3", name: "风险预警", prompt: "你是金融风险检测专家。请审查交易记录，识别异常消费模式，并发出预警。关注大额、频繁或异常分类的交易。", category: "安全" },
  { id: "p4", name: "智能助手", prompt: "你是 YYC³ 金融仪表盘的 AI 助手。帮助用户查询账户、分析交易、管理预算、追踪目标。一切以中文交互，保持简洁友好。", category: "通用" },
]

// ============================================================
// 默认模型
// ============================================================

export const DEFAULT_MODELS: ModelOption[] = [
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI", isLocal: false },
  { id: "gpt-4o-mini", name: "GPT-4o Mini", provider: "OpenAI", isLocal: false },
  { id: "deepseek-chat", name: "DeepSeek Chat", provider: "DeepSeek", isLocal: false },
  { id: "glm-4-flash", name: "GLM-4-Flash", provider: "Z.ai", isLocal: false },
  { id: "qwen-turbo", name: "Qwen Turbo", provider: "Alibaba", isLocal: false },
]

// ============================================================
// 技能
// ============================================================

export const AI_SKILLS: AISkill[] = [
  { id: "s1", name: "收支分类", description: "自动识别和分类交易", icon: Receipt, category: "分析", color: "#00d4ff", active: true },
  { id: "s2", name: "趋势预测", description: "基于历史数据预测消费趋势", icon: TrendingUp, category: "预测", color: "#FFD700", active: true },
  { id: "s3", name: "异常检测", description: "识别异常交易和潜在风险", icon: Shield, category: "安全", color: "#ff3366", active: true },
  { id: "s4", name: "预算优化", description: "智能生成个性化预算方案", icon: PiggyBank, category: "规划", color: "#00ff88", active: false },
  { id: "s5", name: "目标追踪", description: "自动追踪财务目标进度", icon: Target, category: "规划", color: "#aa55ff", active: true },
  { id: "s6", name: "报表生成", description: "生成可视化财务报表", icon: BarChart3, category: "分析", color: "#00BFFF", active: false },
]

// ============================================================
// 插件
// ============================================================

export const AI_PLUGINS: AIPlugin[] = [
  { id: "pl1", name: "汇率换算", description: "实时汇率换算工具", version: "1.0.0", icon: DollarSign, color: "#00ff88", category: "工具", enabled: true },
  { id: "pl2", name: "账单提醒", description: "订阅和账单到期提醒", version: "1.1.0", icon: CreditCard, color: "#FFD700", category: "提醒", enabled: false },
  { id: "pl3", name: "智能导入", description: "从银行账单自动导入交易", version: "0.9.0", icon: Receipt, color: "#00d4ff", category: "数据", enabled: false },
]

// ============================================================
// 工具函数
// ============================================================

export const moodEmoji: Record<string, string> = {
  thoughtful: "🤔",
  steady: "😊",
  vigilant: "🛡️",
  serene: "🔮",
  energetic: "⚡",
  warm: "🌟",
  focused: "🎯",
  inspired: "💡",
}

export const cmdCategories = [
  { id: "all", label: "全部" },
  { id: "account", label: "账户" },
  { id: "transaction", label: "交易" },
  { id: "analysis", label: "分析" },
  { id: "goal", label: "目标" },
  { id: "budget", label: "预算" },
]

export const INITIAL_TIMESTAMP = Date.now()

export const generateMessageId = (suffix = "") =>
  `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}${suffix}`

export const getCurrentTimestamp = () => Date.now()

export const ALL_TABS = [
  { key: "chat" as const, icon: Zap, label: "对话" },
  { key: "commands" as const, icon: Zap, label: "命令" },
  { key: "people" as const, icon: Zap, label: "顾问" },
  { key: "skills" as const, icon: Zap, label: "技能" },
  { key: "settings" as const, icon: Zap, label: "设置" },
]
