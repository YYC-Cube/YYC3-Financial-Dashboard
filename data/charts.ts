/**
 * @file 图表模拟数据
 * @description 收支趋势和分类统计数据源
 * @author YYC³
 * @version 1.0.0
 * @created 2026-07-15
 */

/** 月度收支趋势数据 */
export interface MonthlyTrend {
  month: string
  income: number
  expense: number
}

export const monthlyTrends: MonthlyTrend[] = [
  { month: "1月", income: 4200, expense: 3100 },
  { month: "2月", income: 3800, expense: 2700 },
  { month: "3月", income: 4500, expense: 3400 },
  { month: "4月", income: 4100, expense: 2900 },
  { month: "5月", income: 4800, expense: 3600 },
  { month: "6月", income: 4500, expense: 2032 },
]

/** 支出分类数据 */
export interface ExpenseCategory {
  name: string
  value: number
  color: string
}

export const expenseCategories: ExpenseCategory[] = [
  { name: "购物", value: 1998, color: "oklch(0.62 0.18 250)" },
  { name: "订阅服务", value: 48, color: "oklch(0.75 0.16 150)" },
  { name: "餐饮", value: 650, color: "oklch(0.7 0.14 350)" },
  { name: "交通", value: 320, color: "oklch(0.8 0.18 80)" },
  { name: "其他", value: 180, color: "oklch(0.55 0.24 30)" },
]
