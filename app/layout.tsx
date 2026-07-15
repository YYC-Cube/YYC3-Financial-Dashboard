/**
 * @file 根布局组件
 * @description 应用的全局布局组件，配置默认语言、主题提供者、PWA、i18n 和 AI 助手
 * @author YYC³
 * @version 1.3.0
 * @created 2025-09-15
 * @updated 2026-07-16 集成 AI 助手 + Logo 迁移
 */

import FinanceAssistantWrapper from "@/components/ai-assistant/wrapper"
import PWAInstallPrompt from "@/components/pwa/pwa-install-prompt"
import PWARegister from "@/components/pwa/pwa-register"
import { ThemeProvider } from "@/components/theme-provider"
import { I18nApp } from "@/lib/i18n/app"
import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://fd.yyc3.top"),
  title: {
    default: "YYC³ 金融仪表盘 | Financial Dashboard",
    template: "%s | YYC³ 金融仪表盘",
  },
  description: "现代化智能金融数据可视化平台 — 账户管理、交易追踪、收支分析、财务目标",
  keywords: ["金融仪表盘", "财务管理", "收支分析", "YYC³", "Financial Dashboard"],
  authors: [{ name: "YanYuCloudCube Team", url: "https://yyc3.top" }],
  creator: "YanYuCloudCube Team",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    alternateLocale: ["en_US"],
    url: "https://fd.yyc3.top",
    siteName: "YYC³ 金融仪表盘",
    title: "YYC³ 金融仪表盘 | Financial Dashboard",
    description: "现代化智能金融数据可视化平台",
    images: [{ url: "/yyc3-icons/web/icon-512.png", width: 512, height: 512, alt: "YYC³" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "YYC³ 金融仪表盘",
    description: "现代化智能金融数据可视化平台",
    images: ["/yyc3-icons/web/icon-512.png"],
  },
  icons: {
    icon: [
      { url: "/yyc3-icons/web/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/yyc3-icons/web/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/yyc3-icons/web/apple-touch-icon.png", sizes: "180x180" }],
  },
  appleWebApp: {
    capable: true,
    title: "YYC³ FD",
    statusBarStyle: "black-translucent",
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <I18nApp>
            {children}
            <PWARegister />
            <PWAInstallPrompt />
            <FinanceAssistantWrapper />
          </I18nApp>
        </ThemeProvider>
      </body>
    </html>
  )
}
