"use client"

/**
 * @file AI Family 中枢浮窗
 * @description 通用中枢浮窗 — 所有已注册系统共享的 Hub 入口
 * @author YYC³
 * @version 1.0.0
 * @created 2026-07-16
 * @reference docs/AI-Dev/packages/plugin-ai-family/src/AIAssistantHub.tsx
 */

import { useState, useCallback, useEffect, useRef } from "react"
import {
  Sparkles, X, Minimize2, Maximize2, Send, Command,
  MessageSquare, BookOpen, Sliders, Copy, Check, Mic, MicOff,
  Trash2, RotateCcw, Key, Cpu, Star,
} from "lucide-react"
import { eventBus, Events } from "@/lib/ai-family/event-bus"
import { storage, StorageKeys, createSystemStorage } from "@/lib/ai-family/storage"
import { FAMILY_PERSONAS, PERSONAS_MAP, PROMPT_PRESETS, DEFAULT_MODELS, INITIAL_TIMESTAMP, generateMessageId, getCurrentTimestamp } from "@/lib/ai-family/data"
import type { HubCommand } from "@/lib/ai-family/types"

// ============================================================
// Types
// ============================================================

interface ChatMessage {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: number
}

interface PromptPreset {
  id: string; name: string; prompt: string; category: string
}

// ============================================================
// Mock & Speech
// ============================================================

function mockResponse(msg: string): string {
  const l = msg.toLowerCase()
  if (l.includes("状态") || l.includes("节点"))
    return `## 状态报告\n\n**时间**: ${new Date().toLocaleString("zh-CN")}\n\n系统运行正常，所有节点在线。`
  if (l.includes("帮助") || l.includes("help"))
    return `可用命令：\n- 查看状态\n- 执行分析\n- 生成报告\n- 配置参数`
  return `收到: "${msg}"\n\n已处理完毕。需要进一步帮助吗？`
}

function useSR() {
  const [isListening, setIL] = useState(false)
  const [transcript, setT] = useState("")
  const supported = typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
  const ref = useRef<any>(null)
  const start = useCallback(() => {
    if (!supported) return
    const R = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
    const r = new R(); r.lang = "zh-CN"; r.continuous = false; r.interimResults = false
    r.onresult = (e: any) => { setT(e.results[0][0].transcript); setIL(false) }
    r.onerror = () => setIL(false); r.onend = () => setIL(false)
    r.start(); ref.current = r; setIL(true)
  }, [supported])
  const stop = useCallback(() => { ref.current?.stop(); setIL(false) }, [])
  useEffect(() => () => ref.current?.abort(), [])
  return { isListening, transcript, supported, startListening: start, stopListening: stop }
}

// ============================================================
// Props
// ============================================================

export interface AIAssistantHubProps {
  isMobile?: boolean
  systemId: string
  title?: string
  accentColor?: string
  commands?: HubCommand[]
  extraPrompts?: PromptPreset[]
  showPersonas?: boolean
  renderPersonaBar?: () => React.ReactNode
  customMock?: (msg: string) => string
}

const DEFAULT_PROMPTS: PromptPreset[] = [
  { id: "p1", name: "运维助手", prompt: "你是系统运维专家。请分析当前状态，给出优化建议。", category: "通用" },
  { id: "p2", name: "数据分析", prompt: "你是数据分析专家。请解读监控数据，识别趋势和异常。", category: "数据" },
]

export function AIAssistantHub({
  isMobile = false,
  systemId,
  title = "AI 智能助理",
  accentColor = "#00d4ff",
  commands = [],
  extraPrompts,
  showPersonas = false,
  renderPersonaBar,
  customMock,
}: AIAssistantHubProps) {
  const sysStorage = createSystemStorage(systemId)
  const allPrompts = [...(extraPrompts ?? []), ...DEFAULT_PROMPTS]

  const [isOpen, setIsOpen] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [activeTab, setActiveTab] = useState<"chat" | "commands" | "prompts" | "settings">("chat")

  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "welcome", role: "assistant", content: `你好！我是 ${title}。\n\n请输入指令或点击快捷命令开始操作。`, timestamp: INITIAL_TIMESTAMP },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [systemPrompt, setSystemPrompt] = useState(allPrompts[0]?.prompt ?? "")
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const sr = useSR()
  useEffect(() => { if (sr.transcript) setInput(sr.transcript) }, [sr.transcript])
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }) }, [messages, isTyping])

  const ak = sysStorage.get(StorageKeys.AI_API_KEY, "")!
  const [localAk, setLocalAk] = useState(ak)
  const mk = sysStorage.get(StorageKeys.AI_MODEL, "")!
  const [localMk, setLocalMk] = useState(mk)

  useEffect(() => {
    const unsub = eventBus.on(Events.HUB_OPEN, () => setIsOpen(true))
    const unsub2 = eventBus.on(Events.HUB_CLOSE, () => setIsOpen(false))
    return () => { unsub(); unsub2() }
  }, [])

  const send = useCallback(async (content: string) => {
    if (!content.trim()) return
    setMessages((p) => [...p, { id: generateMessageId(), role: "user", content: content.trim(), timestamp: getCurrentTimestamp() }])
    setInput(""); setIsTyping(true)
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 1200))
    const resp = customMock ? customMock(content) : mockResponse(content)
    setMessages((p) => [...p, { id: generateMessageId("-r"), role: "assistant", content: resp, timestamp: getCurrentTimestamp() }])
    setIsTyping(false)
  }, [customMock])

  const handleKey = (e: React.KeyboardEvent) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input) } }
  const cc = (text: string, id: string) => { navigator.clipboard.writeText(text).catch(() => {}); setCopiedId(id); setTimeout(() => setCopiedId(null), 2000) }

  const TABS = [
    { key: "chat" as const, icon: MessageSquare, label: "对话" },
    { key: "commands" as const, icon: Command, label: "命令" },
    { key: "prompts" as const, icon: BookOpen, label: "提示词" },
    { key: "settings" as const, icon: Sliders, label: "配置" },
  ]

  const pClass = isMaximized ? "fixed inset-4 md:inset-8 z-[60]"
    : isMobile ? "fixed inset-0 z-[60]"
    : "fixed bottom-20 right-4 w-[520px] h-[680px] z-[60]"

  // ===== Floating Button =====
  if (!isOpen) {
    return (
      <button onClick={() => setIsOpen(true)} data-testid={`hub-btn-${systemId}`}
        className="fixed z-[60] group" style={{ bottom: isMobile ? 80 : 24, right: isMobile ? 16 : 24 }}>
        <div className="relative rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
          style={{ width: isMobile ? 48 : 56, height: isMobile ? 48 : 56, background: `linear-gradient(135deg, ${accentColor}, ${accentColor}88)` }}>
          <Sparkles className="text-white" size={isMobile ? 22 : 26} />
          <div className="absolute inset-0 rounded-2xl animate-ping opacity-20" style={{ background: accentColor }} />
        </div>
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 rounded-lg bg-[rgba(8,25,55,0.95)] border opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
          style={{ borderColor: `${accentColor}33` }}>
          <span style={{ color: accentColor, fontSize: "0.72rem" }}>{title}</span>
        </div>
      </button>
    )
  }

  // ===== Panel =====
  return (
    <div className={pClass}>
      <div className="w-full h-full rounded-2xl bg-[rgba(8,25,55,0.95)] backdrop-blur-2xl flex flex-col overflow-hidden"
        style={{ border: `1px solid ${accentColor}33`, boxShadow: `0 0 60px ${accentColor}15` }}>

        {/* Header */}
        <div className="shrink-0 px-4 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${accentColor}15`, background: `${accentColor}08` }}>
          <div>
            <h3 className="text-[#e0f0ff]" style={{ fontSize: "0.9rem" }}>{title}</h3>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accentColor }} />
              <span style={{ color: `${accentColor}66`, fontSize: "0.6rem" }}>{systemId} · {commands.length} 条命令</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setMessages([{ id: "new", role: "assistant", content: "对话已清空。", timestamp: getCurrentTimestamp() }])}
              className="p-1.5 rounded-lg hover:bg-[rgba(0,212,255,0.1)]"><Trash2 className="w-4 h-4" style={{ color: `${accentColor}66` }} /></button>
            {!isMobile && (
              <button onClick={() => setIsMaximized(!isMaximized)} className="p-1.5 rounded-lg hover:bg-[rgba(0,212,255,0.1)]">
                {isMaximized ? <Minimize2 className="w-4 h-4" style={{ color: `${accentColor}66` }} /> : <Maximize2 className="w-4 h-4" style={{ color: `${accentColor}66` }} />}
              </button>
            )}
            <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg hover:bg-[rgba(255,51,102,0.1)]">
              <X className="w-4 h-4" style={{ color: `${accentColor}66` }} />
            </button>
          </div>
        </div>

        {/* Persona Bar */}
        {showPersonas && renderPersonaBar?.()}

        {/* Tabs */}
        <div className="shrink-0 flex px-2 pt-1.5 pb-1 gap-0.5" style={{ borderBottom: `1px solid ${accentColor}10` }}>
          {TABS.map((tab) => {
            const Icon = tab.icon
            const active = activeTab === tab.key
            return (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs transition-all"
                style={{
                  color: active ? accentColor : `${accentColor}44`,
                  background: active ? `${accentColor}12` : "transparent",
                }}>
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {activeTab === "chat" && (
            <>
              <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2 hide-scrollbar">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className="max-w-[85%] rounded-xl px-3 py-2 text-sm" style={{
                      background: msg.role === "user" ? `${accentColor}22` : "rgba(0,40,80,0.3)",
                      border: `1px solid ${msg.role === "user" ? `${accentColor}33` : "rgba(255,255,255,0.05)"}`,
                      color: msg.role === "user" ? accentColor : "#e0f0ff",
                    }}>
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span style={{ color: `${accentColor}33`, fontSize: "0.55rem" }}>{new Date(msg.timestamp).toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}</span>
                        {msg.role === "assistant" && (
                          <button onClick={() => cc(msg.content, msg.id)} className="p-0.5 rounded hover:bg-[rgba(0,212,255,0.1)]">
                            {copiedId === msg.id ? <Check className="w-3 h-3" style={{ color: accentColor }} /> : <Copy className="w-3 h-3" style={{ color: `${accentColor}33` }} />}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="px-3 py-2 rounded-xl" style={{ background: "rgba(0,40,80,0.3)", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <span className="animate-pulse" style={{ color: `${accentColor}66`, fontSize: "0.75rem" }}>思考中...</span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
              <div className="shrink-0 px-3 py-2 border-t" style={{ borderColor: `${accentColor}10` }}>
                <div className="flex items-center gap-2">
                  {sr.supported && (
                    <button onClick={sr.isListening ? sr.stopListening : sr.startListening}
                      className="p-2 rounded-lg hover:bg-[rgba(0,212,255,0.1)]">
                      {sr.isListening ? <MicOff className="w-4 h-4 text-red-400" /> : <Mic className="w-4 h-4" style={{ color: `${accentColor}66` }} />}
                    </button>
                  )}
                  <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKey}
                    placeholder="输入指令..."
                    className="flex-1 bg-transparent text-sm outline-none"
                    style={{ color: "#e0f0ff" }} />
                  <button onClick={() => send(input)} disabled={!input.trim()}
                    className="p-2 rounded-lg transition-all"
                    style={{ background: input.trim() ? `${accentColor}22` : "transparent", opacity: input.trim() ? 1 : 0.3 }}>
                    <Send className="w-4 h-4" style={{ color: accentColor }} />
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === "commands" && (
            <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1 hide-scrollbar">
              {commands.length === 0 && (
                <div className="text-center py-8" style={{ color: `${accentColor}33`, fontSize: "0.8rem" }}>暂无注册命令</div>
              )}
              {commands.map((cmd) => {
                const Icon = cmd.icon
                return (
                  <button key={cmd.id} onClick={cmd.action}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all hover:bg-[rgba(0,212,255,0.05)]"
                    style={{ border: `1px solid ${accentColor}08` }}>
                    <Icon className="w-4 h-4" style={{ color: accentColor }} />
                    <div>
                      <div className="text-sm" style={{ color: "#e0f0ff" }}>{cmd.label}</div>
                      <div style={{ color: `${accentColor}33`, fontSize: "0.65rem" }}>{cmd.systemId}</div>
                    </div>
                  </button>
                )
              })}
            </div>
          )}

          {activeTab === "prompts" && (
            <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1 hide-scrollbar">
              {allPrompts.map((p) => (
                <button key={p.id} onClick={() => { setSystemPrompt(p.prompt); setActiveTab("chat") }}
                  className="w-full text-left px-3 py-2 rounded-xl transition-all hover:bg-[rgba(0,212,255,0.05)]"
                  style={{ border: `1px solid ${accentColor}08` }}>
                  <div className="text-sm" style={{ color: "#e0f0ff" }}>{p.name}</div>
                  <div className="text-xs mt-0.5 line-clamp-2" style={{ color: `${accentColor}33` }}>{p.prompt}</div>
                </button>
              ))}
            </div>
          )}

          {activeTab === "settings" && (
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4 hide-scrollbar">
              <div>
                <label className="flex items-center gap-2 text-xs mb-1.5" style={{ color: `${accentColor}55` }}><Key className="w-3.5 h-3.5" /> API Key</label>
                <input value={localAk} onChange={(e) => { setLocalAk(e.target.value); sysStorage.set(StorageKeys.AI_API_KEY, e.target.value) }}
                  className="w-full px-3 py-2 rounded-xl bg-[rgba(0,40,80,0.3)] border text-sm outline-none"
                  style={{ borderColor: `${accentColor}15`, color: "#e0f0ff" }} placeholder="sk-..." />
              </div>
              <div>
                <label className="flex items-center gap-2 text-xs mb-1.5" style={{ color: `${accentColor}55` }}><Cpu className="w-3.5 h-3.5" /> 模型</label>
                <input value={localMk} onChange={(e) => { setLocalMk(e.target.value); sysStorage.set(StorageKeys.AI_MODEL, e.target.value) }}
                  className="w-full px-3 py-2 rounded-xl bg-[rgba(0,40,80,0.3)] border text-sm outline-none"
                  style={{ borderColor: `${accentColor}15`, color: "#e0f0ff" }} placeholder="gpt-4o" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}