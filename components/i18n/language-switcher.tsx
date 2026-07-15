"use client"

/**
 * @file 语言切换组件
 * @description 提供 10 种语言切换按钮
 * @author YYC³
 * @version 2.0.0
 * @created 2026-07-15
 * @updated 2026-07-16 — 扩展至 10 种语言
 * @reference YYC3-i18n-Core
 */

import type { Locale } from "@/lib/i18n/engine"
import { useTranslation } from "@/lib/i18n/react"
import { cn } from "@/lib/utils"
import { Check, Languages } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const localeOptions: { value: Locale; label: string; flag: string }[] = [
  { value: "zh-CN", label: "Simplified Chinese", flag: "CN" },
  { value: "zh-TW", label: "Traditional Chinese", flag: "TW" },
  { value: "en", label: "English", flag: "US" },
  { value: "ja", label: "Japanese", flag: "JP" },
  { value: "ko", label: "Korean", flag: "KR" },
  { value: "fr", label: "French", flag: "FR" },
  { value: "de", label: "German", flag: "DE" },
  { value: "es", label: "Spanish", flag: "ES" },
  { value: "pt-BR", label: "Portuguese (BR)", flag: "BR" },
  { value: "ar", label: "Arabic", flag: "SA" },
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
        <div className="absolute right-0 top-full mt-1 w-44 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700 py-1 z-50 max-h-64 overflow-y-auto">
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
                <span className="text-[10px] font-mono text-zinc-400 w-5 text-center">{option.flag}</span>
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
