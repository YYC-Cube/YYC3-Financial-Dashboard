/**
 * @file 账户模拟数据
 * @description 账户列表静态数据源（后续替换为 API 调用）
 * @author YYC³
 * @version 1.0.0
 */

import type { Account, DashboardSummary } from "@/types/financial"

export const dashboardSummary: DashboardSummary = {
  totalBalance: "¥26,540.25",
  monthlyIncome: "¥4,500.00",
  monthlyExpense: "¥2,031.97",
  transactionCount: 23,
}

export const accounts: Account[] = [
  {
    id: "1",
    title: "主要储蓄",
    description: "个人储蓄账户",
    balance: "¥8,459.45",
    type: "savings",
  },
  {
    id: "2",
    title: "支票账户",
    description: "日常开支",
    balance: "¥2,850.00",
    type: "checking",
  },
  {
    id: "3",
    title: "投资组合",
    description: "股票和ETF",
    balance: "¥15,230.80",
    type: "investment",
  },
  {
    id: "4",
    title: "信用卡",
    description: "待处理费用",
    balance: "¥1,200.00",
    type: "debt",
  },
  {
    id: "5",
    title: "储蓄账户",
    description: "应急基金",
    balance: "$3,000.00",
    type: "savings",
  },
]
