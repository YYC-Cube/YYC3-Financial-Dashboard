/**
 * @file 事件列表组件
 * @description 显示即将到来的财务事件和目标进度
 * @author YYC³
 * @version 1.1.0
 * @created 2025-09-15
 * @updated 2026-07-15 解耦数据层，使用统一类型
 */

import { financialGoals as defaultItems } from "@/data/goals"
import { cn } from "@/lib/utils"
import type { FinancialGoal } from "@/types/financial"
import {
  AlertCircle,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Timer,
} from "lucide-react"
import React from "react"

interface List03Props {
  items?: FinancialGoal[]
  className?: string
}

const iconStyles = {
  savings: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
  investment: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  debt: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
}

const statusConfig = {
  pending: {
    icon: Timer,
    class: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-100 dark:bg-amber-900/30",
  },
  "in-progress": {
    icon: AlertCircle,
    class: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-100 dark:bg-blue-900/30",
  },
  completed: {
    icon: CheckCircle2,
    class: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
  },
}

export default function List03({ items = defaultItems, className }: List03Props) {
  return (
    <div className={cn("w-full overflow-x-auto scrollbar-none", className)}>
      <div className="flex gap-3 min-w-full p-1">
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              "flex flex-col",
              "w-[280px] shrink-0",
              "bg-white dark:bg-zinc-900/70",
              "rounded-xl",
              "border border-zinc-100 dark:border-zinc-800",
              "hover:border-zinc-200 dark:hover:border-zinc-700",
              "transition-all duration-200",
              "shadow-sm backdrop-blur-xl",
            )}
          >
            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className={cn("p-2 rounded-lg", iconStyles[item.iconStyle])}>
                  <item.icon className="w-4 h-4" />
                </div>
                <div
                  className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1.5",
                    statusConfig[item.status].bg,
                    statusConfig[item.status].class,
                  )}
                >
                  {React.createElement(statusConfig[item.status].icon, { className: "w-3.5 h-3.5" })}
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-1">{item.title}</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">{item.subtitle}</p>
              </div>

              {typeof item.progress === "number" && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-600 dark:text-zinc-400">Progress</span>
                    <span className="text-zinc-900 dark:text-zinc-100">{item.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ease-out ${item.status === 'completed' ? 'bg-emerald-600 dark:bg-emerald-500' : 'bg-blue-600 dark:bg-blue-500'}`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {item.amount && (
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{item.amount}</span>
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">target</span>
                </div>
              )}

              <div className="flex items-center text-xs text-zinc-600 dark:text-zinc-400">
                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                <span>{item.date}</span>
              </div>
            </div>

            <div className="mt-auto border-t border-zinc-100 dark:border-zinc-800">
              <button
                className={cn(
                  "w-full flex items-center justify-center gap-2",
                  "py-2.5 px-3",
                  "text-xs font-medium",
                  "text-blue-600 dark:text-blue-500",
                  "hover:text-blue-700 dark:hover:text-blue-400",
                  "hover:bg-blue-50 dark:hover:bg-blue-900/20",
                  "transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0",
                )}
              >
                View Details
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
