/**
 * @file 根布局组件
 * @description 应用的全局布局组件，配置默认语言、主题提供者、PWA 和 i18n
 * @author YYC³
 * @version 1.2.0
 * @created 2025-09-15
 * @updated 2026-07-15 集成 PWA + SEO 元数据 + i18n 多语言
 */

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
  description: "YYC³ (YanYuCloudCube) — 现代化智能金融数据可视化平台，基于 Next.js 16 + React 19 构建",
  generator: "yyc3-project",
  manifest: "/manifest.json",
  applicationName: "YYC³ 金融仪表盘",
  authors: [{ name: "YanYuCloudCube Team", url: "https://github.com/YYC-Cube" }],
  keywords: ["金融仪表盘", "财务管理", "数据可视化", "Financial Dashboard", "YYC³", "YanYuCloudCube", "Next.js", "React"],
  referrer: "origin-when-cross-origin",
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://fd.yyc3.top",
    siteName: "YYC³ 金融仪表盘",
    title: "YYC³ 金融仪表盘 | Financial Dashboard",
    description: "现代化智能金融数据可视化平台",
    images: [{ url: "/yyc3/Web App/android-chrome-512.png", width: 512, height: 512, alt: "YYC³" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "YYC³ 金融仪表盘",
    description: "现代化智能金融数据可视化平台",
    images: ["/yyc3/Web App/android-chrome-512.png"],
  },
  icons: {
    icon: [
      { url: "/yyc3/Web App/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/yyc3/Web App/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/yyc3/Web App/apple-touch-icon.png", sizes: "180x180" }],
  },
  appleWebApp: {
    capable: true,
    title: "YYC³ FD",
    statusBarStyle: "default",
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
          </I18nApp>
        </ThemeProvider>
      </body>
    </html>
  )
}
