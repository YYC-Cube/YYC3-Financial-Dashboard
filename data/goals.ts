/**
 * @file 财务目标模拟数据
 * @description 财务目标静态数据源（后续替换为 API 调用）
 * @author YYC³
 * @version 1.0.0
 */

import { PiggyBank, TrendingUp, CreditCard } from "lucide-react"
import type { FinancialGoal } from "@/types/financial"

export const financialGoals: FinancialGoal[] = [
  {
    id: "1",
    title: "应急基金",
    subtitle: "已保存3个月支出",
    icon: PiggyBank,
    iconStyle: "savings",
    date: "目标日期: 2024年12月",
    amount: "¥15,000",
    status: "in-progress",
    progress: 65,
  },
  {
    id: "2",
    title: "股票投资组合",
    subtitle: "科技行业投资计划",
    icon: TrendingUp,
    iconStyle: "investment",
    date: "目标日期: 2024年6月",
    amount: "¥50,000",
    status: "pending",
    progress: 30,
  },
  {
    id: "3",
    title: "债务偿还",
    subtitle: "学生贷款还款计划",
    icon: CreditCard,
    iconStyle: "debt",
    date: "目标日期: 2025年3月",
    amount: "¥25,000",
    status: "in-progress",
    progress: 45,
  },
]
