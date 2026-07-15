/**
 * @file 主题提供者组件
 * @description 提供应用的主题切换功能
 * @author YYC³
 * @version 1.0.0
 * @created 2025-09-15
 */

"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
