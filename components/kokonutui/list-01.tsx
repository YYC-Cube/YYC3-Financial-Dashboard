/**
 * @file 账户列表组件
 * @description 展示用户账户信息和余额的组件
 * @author YYC³
 * @version 1.1.0
 * @created 2025-09-15
 * @updated 2026-07-15 解耦数据层，使用统一类型
 */

import AddTransactionDialog from "@/components/forms/add-transaction-dialog"
import { dashboardSummary, accounts as defaultAccounts } from "@/data/accounts"
import { useTranslation } from "@/lib/i18n/react"
import { cn } from "@/lib/utils"
import { useFinancialStore } from "@/store/financial-store"
import type { Account } from "@/types/financial"
import { ArrowDownLeft, ArrowRight, ArrowUpRight, CreditCard, QrCode, SendHorizontal, Wallet } from "lucide-react"

interface List01Props {
  totalBalance?: string
  accounts?: Account[]
  className?: string
}

export default function List01({ totalBalance = dashboardSummary.totalBalance, accounts = defaultAccounts, className }: List01Props) {
  const { t } = useTranslation()
  const addTransaction = useFinancialStore((s) => s.addTransaction)

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
      {/* Total Balance Section */}
      <div className="p-4 border-b border-zinc-100 dark:border-zinc-800">
        <p className="text-xs text-zinc-600 dark:text-zinc-400">{t("account.totalBalance")}</p>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{totalBalance}</h1>
      </div>

      {/* Accounts List */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{t("account.title")}</h2>
        </div>

        <div className="space-y-1">
          {accounts.map((account) => (
            <div
              key={account.id}
              className={cn(
                "group flex items-center justify-between",
                "p-2 rounded-lg",
                "hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
                "transition-all duration-200",
              )}
            >
              <div className="flex items-center gap-2">
                <div
                  className={cn("p-1.5 rounded-lg", {
                    "bg-emerald-100 dark:bg-emerald-900/30": account.type === "savings",
                    "bg-blue-100 dark:bg-blue-900/30": account.type === "checking",
                    "bg-purple-100 dark:bg-purple-900/30": account.type === "investment",
                  })}
                >
                  {account.type === "savings" && (
                    <Wallet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  )}
                  {account.type === "checking" && <QrCode className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
                  {account.type === "investment" && (
                    <ArrowUpRight className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  )}
                  {account.type === "debt" && <CreditCard className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />}
                </div>
                <div>
                  <h3 className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{account.title}</h3>
                  {account.description && (
                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400">{account.description}</p>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{account.balance}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Updated footer with four buttons */}
      <div className="p-2 border-t border-zinc-100 dark:border-zinc-800">
        <div className="grid grid-cols-4 gap-2">
          <AddTransactionDialog />
          <button
            type="button"
            onClick={() => {
              addTransaction({
                title: t("action.send"),
                amount: "0.00",
                type: "outgoing",
                category: "shopping",
                timestamp: new Date().toISOString(),
              })
            }}
            className={cn(
              "flex items-center justify-center gap-2",
              "py-2 px-3 rounded-lg",
              "text-xs font-medium",
              "bg-blue-600 dark:bg-blue-500",
              "text-white dark:text-white",
              "hover:bg-blue-700 dark:hover:bg-blue-600",
              "shadow-sm hover:shadow",
              "transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0",
            )}
          >
            <SendHorizontal className="w-3.5 h-3.5" />
            <span>{t("action.send")}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              addTransaction({
                title: t("action.topUp"),
                amount: "0.00",
                type: "incoming",
                category: "salary",
                timestamp: new Date().toISOString(),
              })
            }}
            className={cn(
              "flex items-center justify-center gap-2",
              "py-2 px-3 rounded-lg",
              "text-xs font-medium",
              "bg-blue-600 dark:bg-blue-500",
              "text-white dark:text-white",
              "hover:bg-blue-700 dark:hover:bg-blue-600",
              "shadow-sm hover:shadow",
              "transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0",
            )}
          >
            <ArrowDownLeft className="w-3.5 h-3.5" />
            <span>{t("action.topUp")}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              addTransaction({
                title: t("action.more"),
                amount: "0.00",
                type: "outgoing",
                category: "entertainment",
                timestamp: new Date().toISOString(),
              })
            }}
            className={cn(
              "flex items-center justify-center gap-2",
              "py-2 px-3 rounded-lg",
              "text-xs font-medium",
              "bg-blue-600 dark:bg-blue-500",
              "text-white dark:text-white",
              "hover:bg-blue-700 dark:hover:bg-blue-600",
              "shadow-sm hover:shadow",
              "transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0",
            )}
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>{t("action.more")}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
