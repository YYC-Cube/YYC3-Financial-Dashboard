"use client"

/**
 * @file 收支趋势图组件
 * @description 使用 recharts 展示月度收入和支出趋势
 * @author YYC³
 * @version 1.0.0
 * @created 2026-07-15
 */

import { monthlyTrends } from "@/data/charts"
import { useTheme } from "next-themes"
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export default function SpendingTrendChart() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const gridColor = isDark ? "#27272a" : "#e4e4e7"
  const textColor = isDark ? "#a1a1aa" : "#71717a"

  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={monthlyTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="oklch(0.75 0.16 150)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="oklch(0.75 0.16 150)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="oklch(0.55 0.24 30)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="oklch(0.55 0.24 30)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: textColor }} stroke={gridColor} />
        <YAxis tick={{ fontSize: 12, fill: textColor }} stroke={gridColor} />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#0f0f12" : "#fff",
            border: `1px solid ${gridColor}`,
            borderRadius: "8px",
            fontSize: "12px",
          }}
          formatter={(value) => `¥${Number(value).toLocaleString()}`}
        />
        <Legend wrapperStyle={{ fontSize: "12px" }} />
        <Area
          type="monotone"
          dataKey="income"
          name="收入"
          stroke="oklch(0.75 0.16 150)"
          strokeWidth={2}
          fill="url(#incomeGradient)"
        />
        <Area
          type="monotone"
          dataKey="expense"
          name="支出"
          stroke="oklch(0.55 0.24 30)"
          strokeWidth={2}
          fill="url(#expenseGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
