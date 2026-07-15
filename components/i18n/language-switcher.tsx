"use client"

/**
 * @file 语言切换组件
 * @description 提供 zh-CN/en 切换按钮
 * @author YYC³
 * @version 1.0.0
 * @created 2026-07-15
 * @reference YYC3-i18n-Core
 */

import { Languages, Check } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useTranslation } from "@/lib/i18n/react"
import type { Locale } from "@/lib/i18n/engine"
import { cn } from "@/lib/utils"

const localeOptions: { value: Locale; label: string; flag: string }[] = [
  { value: "zh-CN", label: "中文", flag: "🇨🇳" },
  { value: "en", label: "English", flag: "🇺🇸" },
]

export default function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      >
        <Languages className="w-3.5 h-3.5" />
        <span>{localeOptions.find((o) => o.value === locale)?.flag}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-32 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700 py-1 z-50">
          {localeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setLocale(option.value)
                setOpen(false)
              }}
              className={cn(
                "w-full flex items-center justify-between px-3 py-1.5 text-xs transition-colors",
                locale === option.value
                  ? "text-blue-600 dark:text-blue-400 font-medium"
                  : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800",
              )}
            >
              <span className="flex items-center gap-2">
                <span>{option.flag}</span>
                <span>{option.label}</span>
              </span>
              {locale === option.value && <Check className="w-3 h-3" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
