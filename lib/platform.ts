/**
 * @file 平台检测与响应式工具
 * @description 根据 YYC3-多端适配-规范文档 §3 定义断点和平台检测
 * @author YYC³
 * @version 1.0.0
 * @created 2026-07-15
 * @reference YYC3-多端适配-规范文档 §3 五维驱动 + §4.3 响应式断点
 */

/** 响应式断点定义（与规范文档 §4.3 一致） */
export const breakpoints = {
  xs: 480,
  sm: 768,
  md: 1024,
  lg: 1280,
  xl: 1536,
} as const

/** 设备类型 */
export type DeviceType = "mobile" | "tablet" | "desktop"

/** 平台类型 */
export type Platform = "web" | "pwa" | "mobile-h5" | "wechat-miniapp"

/** 检测当前设备类型 */
export function detectDevice(width: number): DeviceType {
  if (width < breakpoints.sm) return "mobile"
  if (width < breakpoints.lg) return "tablet"
  return "desktop"
}

/** 检测运行平台 */
export function detectPlatform(): Platform {
  if (typeof window === "undefined") return "web"

  // PWA 检测
  if (window.matchMedia("(display-mode: standalone)").matches) return "pwa"

  // 微信小程序 WebView 检测
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes("miniprogram")) return "wechat-miniapp"

  // 移动端 H5 检测
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua)
  if (isMobile) return "mobile-h5"

  return "web"
}

/** 检测是否为触屏设备 */
export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false
  return "ontouchstart" in window || navigator.maxTouchPoints > 0
}

/** 检测是否为 PWA 已安装模式 */
export function isStandalone(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(display-mode: standalone)").matches
}
