/**
 * @file 布局组件
 * @description 仪表盘的主布局组件，包含侧边栏和顶部导航，支持多端自适应
 * @author YYC³
 * @version 1.1.0
 * @created 2025-09-15
 * @updated 2026-07-15 多端适配：移动端侧边栏自动隐藏
 * @reference YYC3-多端适配-规范文档 §4.3 移动端 H5 响应式
 */

"use client"

import type { ReactNode } from "react"
import Sidebar from "./sidebar"
import TopNav from "./top-nav"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className={`flex h-screen ${theme === "dark" ? "dark" : ""}`}>
      {/* 桌面端固定侧边栏，移动端隐藏（通过 CSS 媒体查询） */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      <div className="w-full flex flex-1 flex-col">
        <header className="h-16 border-b border-gray-200 dark:border-[#1F1F23]">
          <TopNav />
        </header>
        {/* 移动端减少 padding，桌面端保持 p-6 */}
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-white dark:bg-[#0F0F12]">{children}</main>
      </div>
    </div>
  )
}
