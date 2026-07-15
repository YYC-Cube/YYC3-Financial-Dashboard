/**
 * @file 交易列表组件
 * @description 展示最近交易记录的组件
 * @author YYC³
 * @version 1.1.0
 * @created 2025-09-15
 * @updated 2026-07-15 解耦数据层，使用统一类型
 */

import AddTransactionDialog from "@/components/forms/add-transaction-dialog"
import { dashboardSummary } from "@/data/accounts"
import { transactions as defaultTransactions } from "@/data/transactions"
import { useTranslation } from "@/lib/i18n/react"
import { cn } from "@/lib/utils"
import type { Transaction } from "@/types/financial"
import { ArrowDownLeft, ArrowRight, ArrowUpRight } from "lucide-react"

interface List02Props {
  transactions?: Transaction[]
  className?: string
}

export default function List02({ transactions = defaultTransactions, className }: List02Props) {
  const { t } = useTranslation()
  return (
    <div
      className={cn(
        "w-full max-w-xl mx-auto",
        "bg-white dark:bg-zinc-900/70",
        "border border-zinc-100 dark:border-zinc-800",
        "rounded-xl shadow-sm backdrop-blur-xl",
        className,
      )}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {t("transaction.title")}
            <span className="text-xs font-normal text-zinc-600 dark:text-zinc-400 ml-1">({t("transaction.count", { count: String(dashboardSummary.transactionCount) })})</span>
          </h2>
          <span className="text-xs text-zinc-600 dark:text-zinc-400">{t("transaction.thisMonth")}</span>
        </div>

        <div className="space-y-1">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className={cn(
                "group flex items-center gap-3",
                "p-2 rounded-lg",
                "hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
                "transition-all duration-200",
              )}
            >
              <div
                className={cn(
                  "p-2 rounded-lg",
                  "bg-zinc-100 dark:bg-zinc-800",
                  "border border-zinc-200 dark:border-zinc-700",
                )}
              >
                <transaction.icon className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
              </div>

              <div className="flex-1 flex items-center justify-between min-w-0">
                <div className="space-y-0.5">
                  <h3 className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{transaction.title}</h3>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400">{transaction.timestamp}</p>
                </div>

                <div className="flex items-center gap-1.5 pl-3">
                  <span
                    className={cn(
                      "text-xs font-medium",
                      transaction.type === "incoming"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-600 dark:text-red-400",
                    )}
                  >
                    {transaction.type === "incoming" ? "+" : "-"}
                    {transaction.amount}
                  </span>
                  {transaction.type === "incoming" ? (
                    <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <ArrowUpRight className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-2 border-t border-zinc-100 dark:border-zinc-800">
        <div className="flex gap-2">
          <AddTransactionDialog />
          <button
            type="button"
            className={cn(
              "flex-1 flex items-center justify-center gap-2",
              "py-2 px-3 rounded-lg",
              "text-xs font-medium",
              "bg-gradient-to-r from-blue-600 to-blue-500",
              "dark:from-blue-500 dark:to-blue-600",
              "text-white dark:text-white",
              "hover:from-blue-700 hover:to-blue-600",
              "dark:hover:from-blue-600 dark:hover:to-blue-700",
              "shadow-md hover:shadow-lg",
              "transform transition-all duration-250",
              "hover:-translate-y-0.5 hover:scale-[1.02]",
              "active:translate-y-0 active:scale-100",
              "focus:outline-none focus:ring-2",
              "focus:ring-blue-500 dark:focus:ring-blue-400",
              "focus:ring-offset-2 dark:focus:ring-offset-zinc-900",
            )}
          >
            <span>{t("transaction.viewAll")}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
