"use client"

/**
 * @file AI Family 语音系统
 * @description AI 语音交互 — 语音识别、合成、家人声纹
 * @author YYC³
 * @version 1.0.0
 * @created 2026-07-16
 * @reference docs/10-AI-Packages/plugin-ai-family/src/register.ts — voice 路由
 */

import { useState } from "react"
import { Mic, MicOff, Volume2, Radio, User, Headphones, Sparkles, Zap } from "lucide-react"
import { FAMILY_PERSONAS } from "@/lib/ai-family/data"

export default function VoicePage() {
  const [isListening, setIsListening] = useState(false)
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null)
  const [transcript, setTranscript] = useState("")

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false)
      setTranscript("语音识别已停止")
    } else {
      setIsListening(true)
      setTranscript("正在聆听...")
    }
  }

  return (
    <div className="min-h-screen p-8" style={{ background: "radial-gradient(ellipse at center, rgba(0,255,136,0.03) 0%, rgba(4,8,20,1) 70%)" }}>
      <div className="flex items-center gap-2 mb-2">
        <Mic className="w-5 h-5 text-[#00FF88]" />
        <h1 className="text-[#e0f0ff] text-lg font-medium">语音系统</h1>
      </div>
      <p className="text-[rgba(0,255,136,0.3)] text-sm mb-6">AI 语音识别与合成，支持家人声纹</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 语音识别 */}
        <div className="rounded-2xl p-6" style={{ background: "rgba(0,40,80,0.2)", border: "1px solid rgba(0,255,136,0.08)" }}>
          <div className="flex items-center gap-2 mb-4">
            <Radio className="w-4 h-4 text-[#00FF88]" />
            <h2 className="text-[#e0f0ff] text-sm font-medium">语音识别</h2>
          </div>

          <div className="flex flex-col items-center py-6">
            <button
              onClick={toggleListening}
              className="w-24 h-24 rounded-full flex items-center justify-center transition-all mb-4"
              style={{
                background: isListening
                  ? "linear-gradient(135deg, rgba(0,255,136,0.3), rgba(0,212,255,0.3))"
                  : "rgba(0,40,80,0.4)",
                border: `3px solid ${isListening ? "rgba(0,255,136,0.5)" : "rgba(0,255,136,0.15)"}`,
                boxShadow: isListening ? "0 0 40px rgba(0,255,136,0.2)" : "none",
              }}>
              {isListening ? (
                <Mic className="w-8 h-8 text-[#00FF88] animate-pulse" />
              ) : (
                <MicOff className="w-8 h-8 text-[rgba(0,255,136,0.3)]" />
              )}
            </button>
            <p className="text-[rgba(0,255,136,0.4)] text-sm">
              {isListening ? "正在聆听..." : "点击开始录音"}
            </p>
          </div>

          <div className="rounded-xl p-4 min-h-[80px]" style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(0,255,136,0.06)" }}>
            <p className="text-[rgba(0,255,136,0.3)] text-sm">{transcript || "识别结果将显示在这里..."}</p>
          </div>
        </div>

        {/* 语音合成 */}
        <div className="rounded-2xl p-6" style={{ background: "rgba(0,40,80,0.2)", border: "1px solid rgba(0,255,136,0.08)" }}>
          <div className="flex items-center gap-2 mb-4">
            <Volume2 className="w-4 h-4 text-[#00FF88]" />
            <h2 className="text-[#e0f0ff] text-sm font-medium">语音合成</h2>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, rgba(0,255,136,0.2), rgba(0,212,255,0.2))" }}>
              <Headphones className="w-6 h-6 text-[#00FF88]" />
            </div>
            <div>
              <p className="text-[#e0f0ff] text-sm font-medium">
                {selectedPersona ? FAMILY_PERSONAS.find((p) => p.id === selectedPersona)?.name : "选择家人声纹"}
              </p>
              <p className="text-[rgba(0,255,136,0.3)] text-xs">TTS 语音合成引擎</p>
            </div>
          </div>

          <textarea
            className="w-full h-24 rounded-xl p-3 resize-none text-sm"
            style={{
              background: "rgba(0,0,0,0.2)",
              border: "1px solid rgba(0,255,136,0.06)",
              color: "#e0f0ff",
            }}
            placeholder="输入要合成的文本..."
          />
          <button className="w-full mt-3 py-2 rounded-xl text-sm flex items-center justify-center gap-2"
            style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.2)", color: "#00FF88" }}>
            <Sparkles className="w-4 h-4" /> 生成语音
          </button>
        </div>
      </div>

      {/* 家人声纹 */}
      <div className="mt-6">
        <div className="flex items-center gap-2 mb-4">
          <User className="w-4 h-4 text-[#00FF88]" />
          <h2 className="text-[#e0f0ff] text-sm font-medium">家人声纹</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {FAMILY_PERSONAS.map((p) => {
            const Icon = p.icon
            const isSelected = selectedPersona === p.id
            return (
              <button key={p.id} onClick={() => setSelectedPersona(isSelected ? null : p.id)}
                className="p-4 rounded-xl text-center transition-all"
                style={{
                  background: isSelected ? `${p.color}20` : "rgba(0,40,80,0.2)",
                  border: `1px solid ${isSelected ? p.color : "rgba(0,255,136,0.06)"}`,
                  boxShadow: isSelected ? `0 0 20px ${p.color}33` : "none",
                }}>
                <div className="w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center"
                  style={{ background: `${p.color}25`, border: `1px solid ${p.color}40` }}>
                  <Icon size={18} style={{ color: p.color }} />
                </div>
                <p className="text-[#e0f0ff] text-xs">{p.shortName}</p>
                <p className="text-[rgba(0,255,136,0.2)] text-[10px] mt-1">{p.role}</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <Zap className="w-3 h-3" style={{ color: isSelected ? p.color : "rgba(0,255,136,0.2)" }} />
                  <span className="text-[rgba(0,255,136,0.3)]" style={{ fontSize: "0.6rem" }}>
                    {isSelected ? "已选择" : "选择"}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}