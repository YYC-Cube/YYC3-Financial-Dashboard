/**
 * @file 账户列表组件
 * @description 展示用户账户信息和余额的组件
 * @author YYC³
 * @version 1.0.0
 * @created 2025-09-15
 */

import { cn } from "@/lib/utils"
import { ArrowUpRight, ArrowDownLeft, Wallet, SendHorizontal, QrCode, Plus, ArrowRight, CreditCard } from "lucide-react"

interface AccountItem {
  id: string
  title: string
  description?: string
  balance: string
  type: "savings" | "checking" | "investment" | "debt"
}

interface List01Props {
  totalBalance?: string
  accounts?: AccountItem[]
  className?: string
}

const ACCOUNTS: AccountItem[] = [
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

export default function List01({ totalBalance = "¥26,540.25", accounts = ACCOUNTS, className }: List01Props) {
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
        <p className="text-xs text-zinc-600 dark:text-zinc-400">Total Balance</p>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{totalBalance}</h1>
      </div>

      {/* Accounts List */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-medium text-zinc-900 dark:text-zinc-100">Your Accounts</h2>
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
          <button
            type="button"
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
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
          <button
            type="button"
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
            <span>Send</span>
          </button>
          <button
            type="button"
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
            <span>Top-up</span>
          </button>
          <button
            type="button"
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
            <span>More</span>
          </button>
        </div>
      </div>
    </div>
  )
}
