/**
 * @file Next.js 配置文件
 * @description YYC³ 金融仪表盘 - Next.js 16 优化配置（Turbopack + 安全增强）
 * @author YanYuCloudCube Team
 * @version 2.1.0
 * @created 2025-09-15
 * @updated 2026-07-15 GitHub Pages 自定义域名部署优化
 * @status active
 * tags: [config],[nextjs],[security],[performance]
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静态导出配置（GitHub Pages 部署）
  output: 'export',

  // TypeScript 配置（严格模式）
  typescript: {
    ignoreBuildErrors: false,
  },

  // 图片优化配置（适配金融图表场景）
  images: {
    // 静态导出必须启用 unoptimized
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.yyc3.com',
      },
    ],
  },

  // 环境变量配置
  env: {
    PORT: '3498',
    DEFAULT_LOCALE: 'zh-CN',
    NEXT_PUBLIC_APP_VERSION: '2.1.0',
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
  },

  // Turbopack 配置（Next.js 16 默认启用）
  turbopack: {
    root: process.cwd(),
  },

  // trailingSlash：确保 GitHub Pages 子路径正确解析
  trailingSlash: true,

  // 安全头配置（符合金融应用安全标准）
  // 注意：静态导出模式下 headers() 不生效，安全头通过 GitHub Pages/_config.yml 或 CDN 配置
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload; always' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },

  // 日志输出配置
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

export default nextConfig
