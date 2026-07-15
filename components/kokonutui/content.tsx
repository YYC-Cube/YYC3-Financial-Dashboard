/**
 * @file 内容组件
 * @description 仪表盘主要内容区域，包含账户、交易、图表和目标等信息展示
 * @author YYC³
 * @version 1.3.0
 * @created 2025-09-15
 * @updated 2026-07-15 集成 i18n 多语言
 */

"use client"

import { Calendar, CreditCard, PieChart, TrendingUp, Wallet } from "lucide-react"
import dynamic from "next/dynamic"
import List01 from "./list-01"
import List02 from "./list-02"
import List03 from "./list-03"
import { useTranslation } from "@/lib/i18n/react"

/** 动态导入图表组件，减少初始 bundle 大小 */
const SpendingTrendChart = dynamic(() => import("@/components/charts/spending-trend-chart"), {
  loading: () => (
    <div className="h-[280px] flex items-center justify-center text-sm text-zinc-400">
      ...
    </div>
  ),
  ssr: false,
})

const ExpenseCategoryChart = dynamic(() => import("@/components/charts/expense-category-chart"), {
  loading: () => (
    <div className="h-[200px] flex items-center justify-center text-sm text-zinc-400">
      ...
    </div>
  ),
  ssr: false,
})

export default function DashboardContent() {
  const { t } = useTranslation()

  return (
    <div className="space-y-4">
      {/* 收支趋势图 + 支出分类 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-4 text-left flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-500" />
            {t("chart.spendingTrend")}
          </h2>
          <SpendingTrendChart />
        </div>
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-lg font-bold text-purple-700 dark:text-purple-400 mb-4 text-left flex items-center gap-2">
            <PieChart className="w-3.5 h-3.5 text-purple-600 dark:text-purple-500" />
            {t("chart.expenseCategory")}
          </h2>
          <ExpenseCategoryChart />
        </div>
      </div>

      {/* 账户 + 交易 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 flex flex-col border border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-4 text-left flex items-center gap-2 ">
            <Wallet className="w-3.5 h-3.5 text-blue-600 dark:text-blue-500" />
            {t("account.title")}
          </h2>
          <div className="flex-1">
            <List01 className="h-full" />
          </div>
        </div>
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 flex flex-col border border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-lg font-bold text-green-700 dark:text-green-400 mb-4 text-left flex items-center gap-2">
            <CreditCard className="w-3.5 h-3.5 text-green-600 dark:text-green-500" />
            {t("transaction.title")}
          </h2>
          <div className="flex-1">
            <List02 className="h-full" />
          </div>
        </div>
      </div>

      {/* 财务目标 */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 flex flex-col items-start justify-start border border-gray-200 dark:border-[#1F1F23]">
        <h2 className="text-lg font-bold text-purple-700 dark:text-purple-400 mb-4 text-left flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-purple-600 dark:text-purple-500" />
          {t("goal.title")}
        </h2>
        <List03 />
      </div>
    </div>
  )
}
