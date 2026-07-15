"use client"

/**
 * @file 金融 AI 助手主组件
 * @description 浮窗式 AI 助手，支持 floating/inline 双模式
 * @author YYC³
 * @version 1.0.0
 * @reference docs/AI-Dev/AIAssistant/AIAssistant.tsx
 */

import { useState, useCallback } from "react"
import { Sparkles, X, Send, Trash2, Settings, Zap, Users } from "lucide-react"
import { useTranslation } from "@/lib/i18n/react"
import {
  FINANCE_PERSONAS, PERSONAS_MAP, DEFAULT_MODELS,
  FINANCE_COMMANDS, AI_SKILLS, cmdCategories,
  moodEmoji, generateMessageId, getCurrentTimestamp, INITIAL_TIMESTAMP,
} from "./data"
import { getPersonaResponse, getPersonaGreeting } from "./mock"
import type { FinanceAssistantProps, ChatMessage, TabKey } from "./types"
import { cn } from "@/lib/utils"

const TABS: { key: TabKey; icon: typeof Zap; label: string }[] = [
  { key: "chat", icon: Sparkles, label: "对话" },
  { key: "commands", icon: Zap, label: "命令" },
  { key: "people", icon: Users, label: "顾问" },
  { key: "settings", icon: Settings, label: "设置" },
]

export function FinanceAssistant({
  mode = "floating",
  defaultOpen = false,
}: FinanceAssistantProps) {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(mode === "inline" ? true : defaultOpen)
  const [activeTab, setActiveTab] = useState<TabKey>("chat")
  const [activePersona, setActivePersona] = useState("analyst")

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: getPersonaGreeting("analyst"),
      timestamp: INITIAL_TIMESTAMP,
      personaId: "analyst",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [cmdFilter, setCmdFilter] = useState("all")

  const currentPersona = PERSONAS_MAP[activePersona]

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return
      const userMsg: ChatMessage = {
        id: generateMessageId(),
        role: "user",
        content: content.trim(),
        timestamp: getCurrentTimestamp(),
        personaId: activePersona,
      }
      setMessages((prev) => [...prev, userMsg])
      setInputValue("")
      setIsTyping(true)
      await new Promise((r) => setTimeout(r, 800 + Math.random() * 800))
      const response = getPersonaResponse(activePersona, content)
      const assistantMsg: ChatMessage = {
        id: generateMessageId("-resp"),
        role: "assistant",
        content: response,
        timestamp: getCurrentTimestamp(),
        personaId: activePersona,
        emotion: PERSONAS_MAP[activePersona]?.mood,
      }
      setMessages((prev) => [...prev, assistantMsg])
      setIsTyping(false)
    },
    [activePersona],
  )

  const switchPersona = (personaId: string) => {
    setActivePersona(personaId)
    const p = PERSONAS_MAP[personaId]
    if (!p) return
    setMessages((prev) => [
      ...prev,
      {
        id: generateMessageId("-persona"),
        role: "system",
        content: `已切换至「${p.name}」\n${p.greeting}\n\n角色: ${p.role} | 专长: ${p.expertise.join("、")}`,
        timestamp: getCurrentTimestamp(),
      },
    ])
  }

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: getPersonaGreeting(activePersona),
        timestamp: getCurrentTimestamp(),
        personaId: activePersona,
      },
    ])
  }

  const filteredCmds =
    cmdFilter === "all" ? FINANCE_COMMANDS : FINANCE_COMMANDS.filter((c) => c.category === cmdFilter)

  // ---- 浮动模式：未展开时显示浮动按钮 ----
  if (mode === "floating" && !isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30 flex items-center justify-center text-white hover:scale-110 transition-transform"
        aria-label="AI 助手"
      >
        <Sparkles className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
      </button>
    )
  }

  return (
    <div
      className={cn(
        mode === "floating" &&
          "fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)]",
        "bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden",
      )}
    >
      {/* 标题栏 */}
      <div
        className="flex items-center justify-between px-4 py-3 text-white"
        style={{ background: `linear-gradient(135deg, ${currentPersona.color}, #7b2ff7)` }}
      >
        <div className="flex items-center gap-2">
          <currentPersona.icon className="w-5 h-5" />
          <div>
            <p className="text-sm font-semibold">{currentPersona.name}</p>
            <p className="text-[10px] opacity-80">{currentPersona.role}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={clearChat}
            className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
            title="清空对话"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          {mode === "floating" && (
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
              title="关闭"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Tab 栏 */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "flex-1 flex flex-col items-center gap-0.5 py-2 text-[10px] font-medium transition-colors",
              activeTab === tab.key
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-500"
                : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300",
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* 面板内容 */}
      <div className="h-[360px] overflow-y-auto">
        {/* ---- 对话面板 ---- */}
        {activeTab === "chat" && (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex flex-col gap-1",
                    msg.role === "user" ? "items-end" : "items-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed",
                      msg.role === "user"
                        ? "bg-blue-500 text-white rounded-br-sm"
                        : msg.role === "system"
                          ? "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 text-center w-full rounded-lg"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-bl-sm",
                    )}
                  >
                    {msg.content}
                  </div>
                  {msg.emotion && (
                    <span className="text-[10px] opacity-60 px-1">
                      {moodEmoji[msg.emotion] ?? "✨"}
                    </span>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-1 px-3">
                  <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              )}
            </div>
            <div className="p-2 border-t border-zinc-200 dark:border-zinc-800 flex gap-2">
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage(inputValue)
                  }
                }}
                placeholder="输入消息..."
                className="flex-1 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-700 dark:text-zinc-300 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-blue-500/30"
              />
              <button
                onClick={() => sendMessage(inputValue)}
                disabled={!inputValue.trim() || isTyping}
                className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-40 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ---- 命令面板 ---- */}
        {activeTab === "commands" && (
          <div className="p-3">
            <div className="flex gap-1 mb-3 overflow-x-auto">
              {cmdCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCmdFilter(cat.id)}
                  className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-medium whitespace-nowrap transition-colors",
                    cmdFilter === cat.id
                      ? "bg-blue-500 text-white"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400",
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <div className="space-y-1.5">
              {filteredCmds.map((cmd) => (
                <button
                  key={cmd.id}
                  onClick={() => {
                    setActiveTab("chat")
                    sendMessage(cmd.action)
                  }}
                  className="w-full flex items-start gap-2 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-left"
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${cmd.color}20` }}
                  >
                    <cmd.icon className="w-3.5 h-3.5" style={{ color: cmd.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                      {cmd.label}
                    </p>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400">{cmd.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ---- 顾问面板 ---- */}
        {activeTab === "people" && (
          <div className="p-3 space-y-2">
            {FINANCE_PERSONAS.map((persona) => (
              <button
                key={persona.id}
                onClick={() => {
                  switchPersona(persona.id)
                  setActiveTab("chat")
                }}
                className={cn(
                  "w-full flex items-center gap-3 p-2 rounded-lg transition-colors text-left",
                  activePersona === persona.id
                    ? "bg-zinc-100 dark:bg-zinc-800 ring-1 ring-blue-500/30"
                    : "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                )}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white flex-shrink-0"
                  style={{ backgroundColor: persona.color }}
                >
                  <persona.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    {persona.name}
                    <span className="ml-1 text-[10px] text-zinc-400">({persona.enTitle})</span>
                  </p>
                  <p className="text-[10px] text-zinc-500">{persona.role}</p>
                  <p className="text-[10px] text-zinc-400 truncate">
                    {persona.expertise.join(" · ")}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* ---- 设置面板 ---- */}
        {activeTab === "settings" && (
          <div className="p-4 space-y-4">
            <div>
              <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                AI 模型
              </p>
              <select className="w-full px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-700 dark:text-zinc-300 outline-none">
                {DEFAULT_MODELS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.provider})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                技能状态
              </p>
              <div className="space-y-1">
                {AI_SKILLS.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center justify-between p-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-950"
                  >
                    <div className="flex items-center gap-2">
                      <skill.icon className="w-3.5 h-3.5" style={{ color: skill.color }} />
                      <span className="text-[11px] text-zinc-600 dark:text-zinc-400">
                        {skill.name}
                      </span>
                    </div>
                    <span
                      className={cn(
                        "w-2 h-2 rounded-full",
                        skill.active ? "bg-green-400" : "bg-zinc-300 dark:bg-zinc-700",
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-zinc-400">
                YYC³ 金融 AI 助手 v1.0.0
                <br />
                基于 YYC³ AI-Dev 架构
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FinanceAssistant
