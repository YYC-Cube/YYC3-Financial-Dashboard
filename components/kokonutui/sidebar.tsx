/**
 * @file 侧边栏组件
 * @description 仪表盘的侧边导航栏组件
 * @author YYC³
 * @version 1.0.0
 * @created 2025-09-15
 */

"use client"

import {
  BarChart2,
  Receipt,
  Building2,
  CreditCard,
  Folder,
  Wallet,
  Users2,
  Shield,
  MessagesSquare,
  Video,
  Settings,
  HelpCircle,
  Menu,
} from "lucide-react"

import { Home } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname() || '/'

  function handleNavigation() {
    setIsMobileMenuOpen(false)
  }

  function NavItem({
    href,
    icon: Icon,
    children,
    color = "blue",
  }: {
    href: string
    icon: any
    children: React.ReactNode
    color?: string
  }) {
    const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
    const colorClasses = {
      blue: "text-blue-600 dark:text-blue-400",
      green: "text-green-600 dark:text-green-400",
      amber: "text-amber-600 dark:text-amber-400",
      purple: "text-purple-600 dark:text-purple-400",
      pink: "text-pink-600 dark:text-pink-400",
      teal: "text-teal-600 dark:text-teal-400",
    }
    
    return (
      <Link
        href={href}
        onClick={handleNavigation}
        className={`flex items-center px-3 py-2 text-sm rounded-md transition-all duration-200 ${
          isActive 
            ? `${colorClasses[color as keyof typeof colorClasses]} font-medium bg-blue-50 dark:bg-blue-900/20` 
            : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23]"
        }`}
      >
        <Icon 
          className={`h-4 w-4 mr-3 flex-shrink-0 ${isActive ? colorClasses[color as keyof typeof colorClasses] : "text-gray-500 dark:text-gray-400"}`} 
        />
        {children}
      </Link>
    )
  }

  return (
    <>
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-white dark:bg-[#0F0F12] shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </button>
      <nav
        className={`
                fixed inset-y-0 left-0 z-[70] w-64 bg-white dark:bg-[#0F0F12] transform transition-transform duration-200 ease-in-out
                lg:translate-x-0 lg:static lg:w-64 border-r border-gray-200 dark:border-[#1F1F23]
                ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
            `}
      >
        <div className="h-full flex flex-col">
          <Link
            href="/dashboard"
            className="h-16 px-6 flex items-center border-b border-gray-200 dark:border-[#1F1F23]"
          >
            <div className="flex items-center gap-3">
              <Image
                src="/yyc3-icons/web/icon-192.png"
                alt="YYC³"
                width={32}
                height={32}
                className="flex-shrink-0"
              />
              <span className="text-lg font-semibold hover:cursor-pointer text-gray-900 dark:text-white">
                YYC³
              </span>
            </div>
          </Link>

          <div className="flex-1 overflow-y-auto py-4 px-4">
            <div className="space-y-6">
                <div>
                  <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    概览
                  </div>
                  <div className="space-y-1">
                  <NavItem href="#" icon={Home} color="blue">
                    仪表盘
                  </NavItem>
                  <NavItem href="#" icon={BarChart2} color="purple">
                    分析
                  </NavItem>
                  <NavItem href="#" icon={Building2} color="teal">
                    组织
                  </NavItem>
                  <NavItem href="#" icon={Folder} color="amber">
                    项目
                  </NavItem>
                </div>
              </div>

              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  财务
                </div>
                <div className="space-y-1">
                  <NavItem href="#" icon={Wallet} color="green">
                    交易
                  </NavItem>
                  <NavItem href="#" icon={Receipt} color="blue">
                    发票
                  </NavItem>
                  <NavItem href="#" icon={CreditCard} color="amber">
                    支付
                  </NavItem>
                </div>
              </div>

              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  团队
                </div>
                <div className="space-y-1">
                  <NavItem href="#" icon={Users2} color="purple">
                    成员
                  </NavItem>
                  <NavItem href="#" icon={Shield} color="green">
                    权限
                  </NavItem>
                  <NavItem href="#" icon={MessagesSquare} color="blue">
                    聊天
                  </NavItem>
                  <NavItem href="#" icon={Video} color="pink">
                    会议
                  </NavItem>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-4 border-t border-gray-200 dark:border-[#1F1F23]">
            <div className="space-y-1">
              <NavItem href="#" icon={Settings} color="teal">
                设置
              </NavItem>
              <NavItem href="#" icon={HelpCircle} color="amber">
                帮助
              </NavItem>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[65] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
