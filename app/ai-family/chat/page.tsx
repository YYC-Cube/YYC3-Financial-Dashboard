"use client"

/**
 * @file AI Family 交流中心
 * @description 家人对话页面 — 内嵌 AI 智能助理，支持 8 位家人人格切换
 * @author YYC³
 * @version 2.0.0
 * @created 2026-07-16
 * @reference docs/AI-Dev/AIAssistant/AIAssistant.tsx — inline mode
 */

import { eventBus, Events } from "@/lib/ai-family/event-bus"
import { MessageSquare } from "lucide-react"
import dynamic from "next/dynamic"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect } from "react"

const FinanceAssistant = dynamic(
  () => import("@/components/ai-assistant/index").then((m) => m.FinanceAssistant),
  { ssr: false, loading: () => <div className="flex items-center justify-center h-full text-[rgba(0,255,136,0.3)]">加载中...</div> },
)

/** 内部组件：处理 useSearchParams 的 suspense 边界 */
function ChatContent() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const persona = searchParams.get("persona")
    if (persona) {
      eventBus.emit(Events.AI_PERSONA_CHANGED, persona)
    }
  }, [searchParams])

  return <FinanceAssistant mode="inline" defaultOpen={true} />
}

export default function FamilyChatPage() {
  return (
    <div className="flex flex-col h-full" style={{ background: "radial-gradient(ellipse at center, rgba(0,255,136,0.03) 0%, rgba(4,8,20,1) 70%)" }}>
      <div className="px-8 pt-6 pb-2 shrink-0">
        <h1 className="text-[#e0f0ff] text-lg font-medium flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[#00FF88]" /> 交流中心
        </h1>
        <p className="text-[rgba(0,255,136,0.3)] text-sm mt-1">与 AI 家人群聊或私聊</p>
      </div>
      <div className="flex-1 px-4 pb-4">
        <Suspense fallback={<div className="flex items-center justify-center h-full text-[rgba(0,255,136,0.3)]">加载中...</div>}>
          <ChatContent />
        </Suspense>
      </div>
    </div>
  )
}
