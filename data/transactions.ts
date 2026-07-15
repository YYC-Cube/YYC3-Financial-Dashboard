/**
 * @file 交易模拟数据
 * @description 交易记录静态数据源（后续替换为 API 调用）
 * @author YYC³
 * @version 1.0.0
 */

import {
  Wallet,
  ShoppingCart,
  CreditCard,
} from "lucide-react"
import type { Transaction } from "@/types/financial"

export const transactions: Transaction[] = [
  {
    id: "1",
    title: "Apple Store 购物",
    amount: "¥999.00",
    type: "outgoing",
    category: "shopping",
    icon: ShoppingCart,
    timestamp: "今天 14:45",
    status: "completed",
  },
  {
    id: "2",
    title: "工资入账",
    amount: "¥4,500.00",
    type: "incoming",
    category: "salary",
    icon: Wallet,
    timestamp: "今天 09:00",
    status: "completed",
  },
  {
    id: "3",
    title: "Netflix 订阅",
    amount: "¥15.99",
    type: "outgoing",
    category: "subscription",
    icon: CreditCard,
    timestamp: "昨天",
    status: "pending",
  },
  {
    id: "4",
    title: "Apple Store 购物",
    amount: "¥999.00",
    type: "outgoing",
    category: "shopping",
    icon: ShoppingCart,
    timestamp: "今天 14:45",
    status: "completed",
  },
  {
    id: "5",
    title: "Supabase 订阅",
    amount: "¥15.99",
    type: "outgoing",
    category: "subscription",
    icon: CreditCard,
    timestamp: "昨天",
    status: "pending",
  },
  {
    id: "6",
    title: "Vercel 订阅",
    amount: "¥15.99",
    type: "outgoing",
    category: "subscription",
    icon: CreditCard,
    timestamp: "昨天",
    status: "pending",
  },
]
