/**
 * @file 金融数据状态管理
 * @description Zustand 全局状态 store，管理交易、账户等金融数据
 * @author YYC³
 * @version 1.0.0
 * @created 2026-07-15
 */

import { accounts as seedAccounts, dashboardSummary as seedSummary } from "@/data/accounts"
import { financialGoals as seedGoals } from "@/data/goals"
import { transactions as seedTransactions } from "@/data/transactions"
import type {
  Account,
  DashboardSummary,
  FinancialGoal,
  Transaction,
  TransactionCategory,
  TransactionDirection,
} from "@/types/financial"
import {
  Bus,
  CreditCard,
  Film,
  ShoppingCart,
  UtensilsCrossed,
  Wallet,
  type LucideIcon,
} from "lucide-react"
import { create } from "zustand"

/** 新增交易输入（不含自动生成的 id 和 icon） */
export interface NewTransactionInput {
  title: string
  amount: string
  type: TransactionDirection
  category: TransactionCategory
  timestamp: string
}

/** 根据分类选择图标 */
const categoryIconMap: Record<TransactionCategory, LucideIcon> = {
  shopping: ShoppingCart,
  food: UtensilsCrossed,
  transport: Bus,
  entertainment: Film,
  salary: Wallet,
  subscription: CreditCard,
}

interface FinancialState {
  /** 仪表盘汇总 */
  summary: DashboardSummary
  /** 账户列表 */
  accounts: Account[]
  /** 交易列表 */
  transactions: Transaction[]
  /** 财务目标 */
  goals: FinancialGoal[]

  /** 新增交易 */
  addTransaction: (input: NewTransactionInput) => void
  /** 删除交易 */
  removeTransaction: (id: string) => void
  /** 更新目标进度 */
  updateGoalProgress: (id: string, progress: number) => void
}

let transactionCounter = seedTransactions.length

export const useFinancialStore = create<FinancialState>((set) => ({
  summary: seedSummary,
  accounts: seedAccounts,
  transactions: seedTransactions,
  goals: seedGoals,

  addTransaction: (input) =>
    set((state) => {
      transactionCounter += 1
      const newTransaction: Transaction = {
        id: String(transactionCounter),
        ...input,
        status: "pending",
        icon: categoryIconMap[input.category],
      }
      return {
        transactions: [newTransaction, ...state.transactions],
        summary: {
          ...state.summary,
          transactionCount: state.summary.transactionCount + 1,
        },
      }
    }),

  removeTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
      summary: {
        ...state.summary,
        transactionCount: Math.max(0, state.summary.transactionCount - 1),
      },
    })),

  updateGoalProgress: (id, progress) =>
    set((state) => ({
      goals: state.goals.map((goal) =>
        goal.id === id
          ? {
            ...goal,
            progress,
            status: progress >= 100 ? "completed" : "in-progress",
          }
          : goal,
      ),
    })),
}))
