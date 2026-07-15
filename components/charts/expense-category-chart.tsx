"use client"

/**
 * @file 支出分类饼图组件
 * @description 使用 recharts 展示支出分类占比
 * @author YYC³
 * @version 1.0.0
 * @created 2026-07-15
 */

import { expenseCategories } from "@/data/charts"
import { useTheme } from "next-themes"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

export default function ExpenseCategoryChart() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const total = expenseCategories.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <ResponsiveContainer width="100%" height={200} className="sm:max-w-[200px]">
        <PieChart>
          <Pie
            data={expenseCategories}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {expenseCategories.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "#0f0f12" : "#fff",
              border: `1px solid ${isDark ? "#27272a" : "#e4e4e7"}`,
              borderRadius: "8px",
              fontSize: "12px",
            }}
            formatter={(value) => {
              const num = Number(value)
              return `¥${num.toLocaleString()} (${((num / total) * 100).toFixed(1)}%)`
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex-1 space-y-2 w-full">
        {expenseCategories.map((category) => (
          <div key={category.name} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span className="text-zinc-700 dark:text-zinc-300">{category.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-zinc-900 dark:text-zinc-100">
                ¥{category.value.toLocaleString()}
              </span>
              <span className="text-zinc-500 dark:text-zinc-400 w-10 text-right">
                {((category.value / total) * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
