/**
 * @file 金融数据类型定义
 * @description YYC³ 金融仪表盘核心业务类型
 * @author YYC³
 * @version 1.0.0
 * @created 2025-09-15
 */

import type { LucideIcon } from "lucide-react"

/** 账户类型 */
export type AccountType = "savings" | "checking" | "investment" | "debt"

/** 账户项 */
export interface Account {
  id: string
  title: string
  description?: string
  balance: string
  type: AccountType
}

/** 交易方向 */
export type TransactionDirection = "incoming" | "outgoing"

/** 交易状态 */
export type TransactionStatus = "completed" | "pending" | "failed"

/** 交易分类 */
export type TransactionCategory =
  | "shopping"
  | "food"
  | "transport"
  | "entertainment"
  | "salary"
  | "subscription"

/** 交易记录 */
export interface Transaction {
  id: string
  title: string
  amount: string
  type: TransactionDirection
  category: TransactionCategory
  icon: LucideIcon
  timestamp: string
  status: TransactionStatus
}

/** 财务目标状态 */
export type GoalStatus = "pending" | "in-progress" | "completed"

/** 财务目标图标风格 */
export type GoalIconStyle = "savings" | "investment" | "debt"

/** 财务目标 */
export interface FinancialGoal {
  id: string
  title: string
  subtitle: string
  icon: LucideIcon
  iconStyle: GoalIconStyle
  date: string
  time?: string
  amount?: string
  status: GoalStatus
  progress?: number
}

/** 仪表盘汇总数据 */
export interface DashboardSummary {
  totalBalance: string
  monthlyIncome: string
  monthlyExpense: string
  transactionCount: number
}
