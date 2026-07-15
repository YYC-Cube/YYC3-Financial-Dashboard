/**
 * @file 顶部导航组件
 * @description 仪表盘的顶部导航栏组件，包含面包屑、通知和用户信息
 * @author YYC³
 * @version 1.0.0
 * @created 2025-09-15
 */

"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { Bell, ChevronRight } from "lucide-react"
import Profile01 from "./profile-01"
import Link from "next/link"
import { ThemeToggle } from "../theme-toggle"

interface BreadcrumbItem {
  label: string
  href?: string
}

export default function TopNav() {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "YYC³", href: "#" },
    { label: "仪表盘", href: "#" },
  ]

  return (
    <nav className="px-3 sm:px-6 flex items-center justify-between bg-white dark:bg-[#0F0F12] border-b border-gray-200 dark:border-[#1F1F23] h-full">
      <div className="font-medium text-sm hidden sm:flex items-center space-x-1 truncate max-w-[300px]">
        {breadcrumbs.map((item, index) => (
          <div key={item.label} className="flex items-center">
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
          className="p-1.5 sm:p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-all duration-200"
        >
          <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
        </button>

        <ThemeToggle />

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
