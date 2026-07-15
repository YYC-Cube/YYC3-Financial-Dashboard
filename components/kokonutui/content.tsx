/**
 * @file 内容组件
 * @description 仪表盘主要内容区域，包含账户、交易和日历等信息展示
 * @author YYC³
 * @version 1.0.0
 * @created 2025-09-15
 */

import { Calendar, CreditCard, Wallet } from "lucide-react"
import List01 from "./list-01"
import List02 from "./list-02"
import List03 from "./list-03"

export default function DashboardContent() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 flex flex-col border border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-4 text-left flex items-center gap-2 ">
            <Wallet className="w-3.5 h-3.5 text-blue-600 dark:text-blue-500" />
            账户
          </h2>
          <div className="flex-1">
            <List01 className="h-full" />
          </div>
        </div>
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 flex flex-col border border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-lg font-bold text-green-700 dark:text-green-400 mb-4 text-left flex items-center gap-2">
            <CreditCard className="w-3.5 h-3.5 text-green-600 dark:text-green-500" />
            最近交易
          </h2>
          <div className="flex-1">
            <List02 className="h-full" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 flex flex-col items-start justify-start border border-gray-200 dark:border-[#1F1F23]">
        <h2 className="text-lg font-bold text-purple-700 dark:text-purple-400 mb-4 text-left flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-purple-600 dark:text-purple-500" />
          即将到来的事件
        </h2>
        <List03 />
      </div>
    </div>
  )
}
