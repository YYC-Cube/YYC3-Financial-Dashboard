/**
 * @file 根布局组件
 * @description 应用的全局布局组件，配置默认语言和主题提供者
 * @author YYC³
 * @version 1.0.0
 * @created 2025-09-15
 */

import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "YYC³ 金融仪表盘 | Financial Dashboard",
  description: "YYC³ (YanYuCloudCube) — 现代化智能金融数据可视化平台",
  generator: 'yyc3-project'
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
