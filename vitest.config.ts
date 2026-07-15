/**
 * @file vitest 配置
 * @description 测试环境配置（jsdom + 路径别名）
 * @author YYC³
 */

import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import { resolve } from "path"

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: [],
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "."),
    },
  },
})
