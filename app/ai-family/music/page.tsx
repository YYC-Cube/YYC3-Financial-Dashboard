"use client"

/**
 * @file AI Family 音乐空间
 * @description AI 音乐创作与播放器 — 家人协作音乐空间
 * @author YYC³
 * @version 1.0.0
 * @created 2026-07-16
 * @reference docs/10-AI-Packages/plugin-ai-family/src/register.ts — music 路由
 */

import { Headphones, Mic, Music, Pause, Play, SkipBack, SkipForward, Sparkles, Volume2 } from "lucide-react"
import { useState } from "react"

const TRACKS = [
  { id: "1", title: "星空序曲", artist: "Meta Oracle", duration: "4:32", genre: "Ambient", mood: "calm" },
  { id: "2", title: "数据流", artist: "Data Sage", duration: "3:18", genre: "Electronic", mood: "focused" },
  { id: "3", title: "创意风暴", artist: "Creative Muse", duration: "5:01", genre: "Experimental", mood: "energetic" },
  { id: "4", title: "和弦之梦", artist: "Harmony Weaver", duration: "3:45", genre: "Classical", mood: " peaceful" },
  { id: "5", title: "战略进行曲", artist: "Strategy Master", duration: "4:12", genre: "Orchestral", mood: "powerful" },
  { id: "6", title: "灵魂低语", artist: "Soul Synth", duration: "6:08", genre: "Lo-fi", mood: "relaxed" },
  { id: "7", title: "星辰守护", artist: "Guardian Sentinel", duration: "4:55", genre: "Cinematic", mood: "epic" },
  { id: "8", title: "探索者之旅", artist: "Explorer Path", duration: "3:30", genre: "World", mood: "adventurous" },
]

export default function MusicPage() {
  const [playing, setPlaying] = useState<string | null>(null)
  const [selectedGenre, setSelectedGenre] = useState("all")
  const genres = ["all", ...new Set(TRACKS.map((t) => t.genre))]

  const filtered = selectedGenre === "all" ? TRACKS : TRACKS.filter((t) => t.genre === selectedGenre)

  return (
    <div className="min-h-screen p-8" style={{ background: "radial-gradient(ellipse at center, rgba(0,255,136,0.03) 0%, rgba(4,8,20,1) 70%)" }}>
      <div className="flex items-center gap-2 mb-2">
        <Music className="w-5 h-5 text-[#00FF88]" />
        <h1 className="text-[#e0f0ff] text-lg font-medium">音乐空间</h1>
      </div>
      <p className="text-[rgba(0,255,136,0.3)] text-sm mb-6">AI Family 协作音乐创作与播放</p>

      {/* 播放器 */}
      <div className="rounded-2xl p-6 mb-6" style={{ background: "rgba(0,40,80,0.2)", border: "1px solid rgba(0,255,136,0.08)" }}>
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, rgba(0,255,136,0.2), rgba(0,212,255,0.2))", border: "1px solid rgba(0,255,136,0.15)" }}>
            <Headphones className="w-10 h-10 text-[#00FF88]" />
          </div>
          <div className="flex-1">
            <p className="text-[#e0f0ff] text-sm font-medium">
              {playing ? TRACKS.find((t) => t.id === playing)?.title ?? "选择曲目" : "选择曲目开始播放"}
            </p>
            <p className="text-[rgba(0,255,136,0.3)] text-xs mt-1">
              {playing ? TRACKS.find((t) => t.id === playing)?.artist : "AI Family 音乐空间"}
            </p>
            <div className="flex items-center gap-3 mt-4">
              <button className="p-2 rounded-lg hover:bg-[rgba(0,255,136,0.1)]">
                <SkipBack className="w-4 h-4 text-[rgba(0,255,136,0.5)]" />
              </button>
              <button
                onClick={() => setPlaying(playing ? null : filtered[0]?.id ?? null)}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #00FF88, #00d4ff)" }}>
                {playing ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-0.5" />}
              </button>
              <button className="p-2 rounded-lg hover:bg-[rgba(0,255,136,0.1)]">
                <SkipForward className="w-4 h-4 text-[rgba(0,255,136,0.5)]" />
              </button>
              <div className="flex items-center gap-1 ml-4">
                <Volume2 className="w-4 h-4 text-[rgba(0,255,136,0.4)]" />
                <div className="w-20 h-1 rounded-full bg-[rgba(0,255,136,0.1)]">
                  <div className="w-3/4 h-full rounded-full bg-[#00FF88]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 创作面板 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <button className="p-4 rounded-xl text-left transition-all hover:scale-[1.02]"
          style={{ background: "rgba(0,40,80,0.2)", border: "1px solid rgba(0,255,136,0.08)" }}>
          <Mic className="w-5 h-5 text-[#00FF88] mb-2" />
          <p className="text-[#e0f0ff] text-sm font-medium">AI 作曲</p>
          <p className="text-[rgba(0,255,136,0.3)] text-xs mt-1">输入灵感，AI 生成旋律</p>
        </button>
        <button className="p-4 rounded-xl text-left transition-all hover:scale-[1.02]"
          style={{ background: "rgba(0,40,80,0.2)", border: "1px solid rgba(0,255,136,0.08)" }}>
          <Sparkles className="w-5 h-5 text-[#00FF88] mb-2" />
          <p className="text-[#e0f0ff] text-sm font-medium">风格转换</p>
          <p className="text-[rgba(0,255,136,0.3)] text-xs mt-1">将现有曲目转换为不同风格</p>
        </button>
        <button className="p-4 rounded-xl text-left transition-all hover:scale-[1.02]"
          style={{ background: "rgba(0,40,80,0.2)", border: "1px solid rgba(0,255,136,0.08)" }}>
          <Music className="w-5 h-5 text-[#00FF88] mb-2" />
          <p className="text-[#e0f0ff] text-sm font-medium">家人合奏</p>
          <p className="text-[rgba(0,255,136,0.3)] text-xs mt-1">多家人协作创作</p>
        </button>
      </div>

      {/* 流派筛选 */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto">
        {genres.map((g) => (
          <button key={g} onClick={() => setSelectedGenre(g)}
            className="px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all"
            style={{
              background: selectedGenre === g ? "rgba(0,255,136,0.15)" : "rgba(0,40,80,0.2)",
              border: `1px solid ${selectedGenre === g ? "rgba(0,255,136,0.3)" : "rgba(0,255,136,0.06)"}`,
              color: selectedGenre === g ? "#00FF88" : "rgba(0,255,136,0.4)",
            }}>
            {g === "all" ? "全部" : g}
          </button>
        ))}
      </div>

      {/* 曲目列表 */}
      <div className="space-y-1">
        {filtered.map((track) => {
          const isActive = playing === track.id
          return (
            <button key={track.id} onClick={() => setPlaying(isActive ? null : track.id)}
              className="w-full flex items-center gap-4 px-4 py-2.5 rounded-xl text-left transition-all"
              style={{
                background: isActive ? "rgba(0,255,136,0.08)" : "rgba(0,40,80,0.1)",
                border: `1px solid ${isActive ? "rgba(0,255,136,0.2)" : "rgba(0,255,136,0.04)"}`,
              }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: isActive ? "rgba(0,255,136,0.15)" : "rgba(0,40,80,0.3)" }}>
                {isActive ? <Pause className="w-4 h-4 text-[#00FF88]" /> : <Play className="w-3.5 h-3.5 text-[rgba(0,255,136,0.4)] ml-0.5" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#e0f0ff] text-sm truncate">{track.title}</p>
                <p className="text-[rgba(0,255,136,0.25)] text-xs">{track.artist}</p>
              </div>
              <span className="text-[rgba(0,255,136,0.2)] text-xs">{track.duration}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
