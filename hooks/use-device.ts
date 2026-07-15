"use client"

/**
 * @file 设备检测 Hook
 * @description 响应式断点检测，用于多端自适应组件
 * @author YYC³
 * @version 1.0.0
 * @created 2026-07-15
 * @reference YYC3-多端适配-规范文档 §4.3 响应式断点规范
 */

import { useEffect, useState } from "react"
import { breakpoints, detectDevice, type DeviceType } from "@/lib/platform"

export interface DeviceInfo {
  /** 当前设备类型 */
  device: DeviceType
  /** 当前视口宽度 */
  width: number
  /** 是否为移动端 */
  isMobile: boolean
  /** 是否为平板 */
  isTablet: boolean
  /** 是否为桌面端 */
  isDesktop: boolean
  /** 断点匹配 */
  matches: {
    xs: boolean
    sm: boolean
    md: boolean
    lg: boolean
    xl: boolean
  }
}

export function useDevice(): DeviceInfo {
  const [width, setWidth] = useState<number>(0)

  useEffect(() => {
    setWidth(window.innerWidth)
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const device = detectDevice(width)

  return {
    device,
    width,
    isMobile: device === "mobile",
    isTablet: device === "tablet",
    isDesktop: device === "desktop",
    matches: {
      xs: width >= breakpoints.xs,
      sm: width >= breakpoints.sm,
      md: width >= breakpoints.md,
      lg: width >= breakpoints.lg,
      xl: width >= breakpoints.xl,
    },
  }
}
