"use client"

/**
 * @file 添加交易对话框
 * @description 使用 react-hook-form + zod 验证 + Zustand 状态管理的交易添加表单
 * @author YYC³
 * @version 1.0.0
 * @created 2026-07-15
 */

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useFinancialStore } from "@/store/financial-store"

/** Zod 验证 schema */
const transactionSchema = z.object({
  title: z.string().min(1, "请输入交易名称").max(50, "名称不能超过50个字符"),
  amount: z.string().min(1, "请输入金额").regex(/^\d+(\.\d{1,2})?$/, "请输入有效金额"),
  type: z.enum(["incoming", "outgoing"]),
  category: z.enum(["shopping", "food", "transport", "entertainment", "salary", "subscription"]),
})

type TransactionFormData = z.infer<typeof transactionSchema>

const categoryLabels: Record<string, string> = {
  shopping: "购物",
  food: "餐饮",
  transport: "交通",
  entertainment: "娱乐",
  salary: "工资",
  subscription: "订阅",
}

export default function AddTransactionDialog() {
  const [open, setOpen] = useState(false)
  const addTransaction = useFinancialStore((s) => s.addTransaction)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      title: "",
      amount: "",
      type: "outgoing",
      category: "shopping",
    },
  })

  const selectedType = watch("type")
  const selectedCategory = watch("category")

  const onSubmit = (data: TransactionFormData) => {
    addTransaction({
      title: data.title,
      amount: `¥${data.amount}`,
      type: data.type,
      category: data.category,
      timestamp: "刚刚",
    })
    reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex items-center justify-center gap-2",
            "py-2 px-3 rounded-lg",
            "text-xs font-medium",
            "bg-blue-600 dark:bg-blue-500",
            "text-white",
            "hover:bg-blue-700 dark:hover:bg-blue-600",
            "shadow-sm hover:shadow",
            "transition-all duration-200",
          )}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>添加交易</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>添加新交易</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* 交易名称 */}
          <div className="space-y-2">
            <Label htmlFor="title">交易名称</Label>
            <Input
              id="title"
              placeholder="例如：超市购物"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-xs text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* 金额 */}
          <div className="space-y-2">
            <Label htmlFor="amount">金额 (¥)</Label>
            <Input
              id="amount"
              type="text"
              inputMode="decimal"
              placeholder="0.00"
              {...register("amount")}
            />
            {errors.amount && (
              <p className="text-xs text-red-500">{errors.amount.message}</p>
            )}
          </div>

          {/* 收支类型 */}
          <div className="space-y-2">
            <Label>收支类型</Label>
            <div className="grid grid-cols-2 gap-2">
              <button
                key="outgoing-btn"
                type="button"
                onClick={() => setValue("type", "outgoing")}
                className={cn(
                  "py-2 px-3 rounded-lg text-xs font-medium border transition-all",
                  selectedType === "outgoing"
                    ? "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                    : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400",
                )}
              >
                支出
              </button>
              <button
                key="incoming-btn"
                type="button"
                onClick={() => setValue("type", "incoming")}
                className={cn(
                  "py-2 px-3 rounded-lg text-xs font-medium border transition-all",
                  selectedType === "incoming"
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                    : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400",
                )}
              >
                收入
              </button>
            </div>
          </div>

          {/* 分类 */}
          <div className="space-y-2">
            <Label>分类</Label>
            <Select
              value={selectedCategory}
              onValueChange={(val) => setValue("category", val as TransactionFormData["category"])}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(categoryLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 提交 */}
          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setOpen(false)}
            >
              取消
            </Button>
            <Button type="submit" className="flex-1">
              确认添加
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
