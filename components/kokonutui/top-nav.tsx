/**
 * @file 顶部导航组件
 * @description 仪表盘的顶部导航栏组件，包含面包屑、通知和用户信息，支持动态路由
 * @author YYC³
 * @version 2.0.0
 * @created 2025-09-15
 * @updated 2026-07-16 — 动态面包屑 + AI Family 路由 + 通知事件
 */

"use client"

import LanguageSwitcher from "@/components/i18n/language-switcher"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { eventBus, Events } from "@/lib/ai-family/event-bus"
import { Bell, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCallback } from "react"
import { ThemeToggle } from "../theme-toggle"
import Profile01 from "./profile-01"

interface BreadcrumbItem {
  label: string
  href?: string
}

/** 根据路径生成面包屑 */
function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { label: "YYC³", href: "/dashboard" },
  ]

  if (pathname === "/dashboard" || pathname === "/") {
    items.push({ label: "仪表盘" })
    return items
  }

  if (pathname.startsWith("/ai-family")) {
    items.push({ label: "AI Family", href: "/ai-family" })
    if (pathname === "/ai-family/chat") {
      items.push({ label: "家群对话" })
    } else if (pathname === "/ai-family/settings") {
      items.push({ label: "设置" })
    }
    return items
  }

  items.push({ label: "仪表盘" })
  return items
}

export default function TopNav() {
  const pathname = usePathname() || "/dashboard"
  const breadcrumbs = getBreadcrumbs(pathname)

  const handleNotification = useCallback(() => {
    eventBus.emit(Events.HUB_OPEN, { tab: "chat" })
  }, [])

  return (
    <nav className="px-3 sm:px-6 flex items-center justify-between bg-white dark:bg-[#0F0F12] border-b border-gray-200 dark:border-[#1F1F23] h-full">
      <div className="font-medium text-sm hidden sm:flex items-center space-x-1 truncate max-w-[300px]">
        {breadcrumbs.map((item, index) => (
          <div key={item.label + index} className="flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4 text-blue-600 dark:text-blue-400 mx-1" />}
            {item.href ? (
              <Link
                href={item.href}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-blue-700 dark:text-blue-300 font-semibold">{item.label}</span>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 sm:gap-4 ml-auto sm:ml-0">
        <button
          type="button"
          onClick={handleNotification}
          className="p-1.5 sm:p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-all duration-200"
          aria-label="通知"
        >
          <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
        </button>

        <ThemeToggle />
        <LanguageSwitcher />

        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <Image
              src="/placeholder-user.jpg"
              alt="用户头像"
              width={28}
              height={28}
              className="rounded-full ring-2 ring-blue-500 dark:ring-blue-400 sm:w-8 sm:h-8 cursor-pointer transition-all duration-200 hover:ring-blue-600 dark:hover:ring-blue-300"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-[280px] sm:w-80 bg-background border-border rounded-lg shadow-lg"
          >
            <Profile01 avatar="/placeholder-user.jpg" />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}
