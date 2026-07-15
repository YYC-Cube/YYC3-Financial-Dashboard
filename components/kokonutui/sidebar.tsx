/**
 * @file 侧边栏组件
 * @description 仪表盘的侧边导航栏组件，支持多语言、路由跳转、AI Family 入口
 * @author YYC³
 * @version 2.0.0
 * @created 2025-09-15
 * @updated 2026-07-16 — 接入真实路由 + i18n + AI Family 入口
 */

"use client"

import {
  Activity,
  BarChart2,
  Bot,
  Brain,
  Building2,
  Code2,
  CreditCard,
  Folder,
  HelpCircle,
  Home,
  Menu,
  MessagesSquare,
  Receipt,
  Settings,
  Shield,
  ShieldCheck,
  Users2,
  Video,
  Wallet,
  Wrench,
} from "lucide-react"

import { useTranslation } from "@/lib/i18n/react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname() || "/"
  const { t } = useTranslation()

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
    icon: React.ElementType
    children: React.ReactNode
    color?: string
  }) {
    const isActive = href === "/dashboard"
      ? pathname === "/dashboard" || pathname === "/"
      : pathname.startsWith(href)
    const colorClasses: Record<string, string> = {
      blue: "text-blue-600 dark:text-blue-400",
      green: "text-green-600 dark:text-green-400",
      amber: "text-amber-600 dark:text-amber-400",
      purple: "text-purple-600 dark:text-purple-400",
      pink: "text-pink-600 dark:text-pink-400",
      teal: "text-teal-600 dark:text-teal-400",
      emerald: "text-emerald-600 dark:text-emerald-400",
    }

    return (
      <Link
        href={href}
        onClick={handleNavigation}
        className={`flex items-center px-3 py-2 text-sm rounded-md transition-all duration-200 ${isActive
          ? `${colorClasses[color] ?? "text-blue-600 dark:text-blue-400"} font-medium bg-blue-50 dark:bg-blue-900/20`
          : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23]"
          }`}
      >
        <Icon
          className={`h-4 w-4 mr-3 shrink-0 ${isActive ? (colorClasses[color] ?? "text-blue-500") : "text-gray-500 dark:text-gray-400"}`}
        />
        {children}
      </Link>
    )
  }

  return (
    <>
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-70 p-2 rounded-lg bg-white dark:bg-[#0F0F12] shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </button>
      <nav
        className={`
                fixed inset-y-0 left-0 z-70 w-64 bg-white dark:bg-[#0F0F12] transform transition-transform duration-200 ease-in-out
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
                className="shrink-0"
              />
              <span className="text-lg font-semibold hover:cursor-pointer text-gray-900 dark:text-white">
                YYC³
              </span>
            </div>
          </Link>

          <div className="flex-1 overflow-y-auto py-4 px-4">
            <div className="space-y-6">
              {/* 概览 */}
              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {t("nav.overview")}
                </div>
                <div className="space-y-1">
                  <NavItem href="/dashboard" icon={Home} color="blue">
                    {t("nav.dashboard")}
                  </NavItem>
                  <NavItem href="/dashboard" icon={BarChart2} color="purple">
                    {t("nav.analytics")}
                  </NavItem>
                  <NavItem href="/dashboard" icon={Building2} color="teal">
                    {t("nav.organization")}
                  </NavItem>
                  <NavItem href="/dashboard" icon={Folder} color="amber">
                    {t("nav.projects")}
                  </NavItem>
                </div>
              </div>

              {/* 财务 */}
              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {t("nav.finance")}
                </div>
                <div className="space-y-1">
                  <NavItem href="/dashboard" icon={Wallet} color="green">
                    {t("nav.transactions")}
                  </NavItem>
                  <NavItem href="/dashboard" icon={Receipt} color="blue">
                    {t("nav.invoices")}
                  </NavItem>
                  <NavItem href="/dashboard" icon={CreditCard} color="amber">
                    {t("nav.payments")}
                  </NavItem>
                </div>
              </div>

              {/* 团队 */}
              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {t("nav.team")}
                </div>
                <div className="space-y-1">
                  <NavItem href="/dashboard" icon={Users2} color="purple">
                    {t("nav.members")}
                  </NavItem>
                  <NavItem href="/dashboard" icon={Shield} color="green">
                    {t("nav.permissions")}
                  </NavItem>
                  <NavItem href="/dashboard" icon={MessagesSquare} color="blue">
                    {t("nav.chat")}
                  </NavItem>
                  <NavItem href="/dashboard" icon={Video} color="pink">
                    {t("nav.meetings")}
                  </NavItem>
                </div>
              </div>

              {/* AI Family 子系统 */}
              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  {t("nav.aiFamily")}
                </div>
                <div className="space-y-1">
                  <NavItem href="/ai-family" icon={Bot} color="emerald">
                    {t("nav.familyHome")}
                  </NavItem>
                  <NavItem href="/ai-family/chat" icon={MessagesSquare} color="emerald">
                    {t("nav.familyChat")}
                  </NavItem>
                  <NavItem href="/dashboard" icon={Activity} color="emerald">
                    {t("nav.monitorCenter")}
                  </NavItem>
                  <NavItem href="/dashboard" icon={Wrench} color="emerald">
                    {t("nav.opsCenter")}
                  </NavItem>
                  <NavItem href="/dashboard" icon={Brain} color="emerald">
                    {t("nav.aiDecision")}
                  </NavItem>
                  <NavItem href="/dashboard" icon={Code2} color="emerald">
                    {t("nav.devTools")}
                  </NavItem>
                  <NavItem href="/dashboard" icon={ShieldCheck} color="emerald">
                    {t("nav.sysAdmin")}
                  </NavItem>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-4 border-t border-gray-200 dark:border-[#1F1F23]">
            <div className="space-y-1">
              <NavItem href="/ai-family/settings" icon={Settings} color="teal">
                {t("nav.settings")}
              </NavItem>
              <NavItem href="/dashboard" icon={HelpCircle} color="amber">
                {t("nav.help")}
              </NavItem>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-65 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
