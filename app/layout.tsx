/**
 * @file 根布局组件
 * @description 应用的全局布局组件，配置默认语言和主题提供者
 * @author YYC³
 * @version 1.0.0
 * @created 2025-09-15
 */

import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
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
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
