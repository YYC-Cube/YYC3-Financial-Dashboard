/**
 * @file 跨系统事件总线
 * @description AI Family 中枢核心 — 全局事件通信
 * @author YYC³
 * @version 1.0.0
 * @created 2026-07-16
 * @reference docs/AI-Dev/packages/shell/src/event-bus.ts
 */

type Handler = (...args: any[]) => void

export class EventBus {
  private listeners = new Map<string, Set<Handler>>()

  emit(event: string, ...args: any[]): void {
    this.listeners.get(event)?.forEach((fn) => fn(...args))
  }

  on(event: string, fn: Handler): () => void {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set())
    this.listeners.get(event)!.add(fn)
    return () => this.listeners.get(event)?.delete(fn)
  }

  once(event: string, fn: Handler): void {
    const wrapper = (...args: any[]) => {
      fn(...args)
      this.off(event, wrapper)
    }
    this.on(event, wrapper)
  }

  off(event: string, fn: Handler): void {
    this.listeners.get(event)?.delete(fn)
  }

  clear(event?: string): void {
    if (event) this.listeners.delete(event)
    else this.listeners.clear()
  }
}

export const eventBus = new EventBus()

export const Events = {
  AI_PERSONA_CHANGED: "ai:persona-changed",
  AI_ASK: "ai:ask",
  AI_RESPONSE: "ai:response",

  HUB_OPEN: "hub:open",
  HUB_CLOSE: "hub:close",
  HUB_NAVIGATE: "hub:navigate",
  HUB_COMMAND: "hub:command",

  SYSTEM_NOTIFY: "system:notify",
  SYSTEM_NAVIGATE: "system:navigate",

  SHELL_WELCOME_DISMISS: "shell:welcome-dismiss",
  SHELL_SIDEBAR_TOGGLE: "shell:sidebar-toggle",
} as const
