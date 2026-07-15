/**
 * @file Next.js 配置文件
 * @description YYC³ 金融仪表盘 - Next.js 16 优化配置（Turbopack + AI + 安全增强）
 * @author YanYuCloudCube Team
 * @version 2.0.0
 * @created 2025-09-15
 * @updated 2026-05-27
 * @status active
 * tags: [config],[nextjs],[security],[performance]
 *
 * brief: Next.js 16 生产级优化配置
 *
 * details:
 * - Turbopack 默认启用（开发模式）
 * - AI 功能支持预配置
 * - 安全头完整配置
 * - 图片优化策略
 * - 性能监控就绪
 *
 * dependencies: Next.js 16, React 19.2.6
 * notes: 升级自 v1.0.0，适配 Next.js 16 新特性
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

    // 支持的现代图片格式
    formats: ['image/avif', 'image/webp'],

    // 设备尺寸优化（覆盖主流设备）
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],

    // 图片尺寸配置
    imageSizes: [16, 32, 48, 64, 96, 128, 256],

    // 域名白名单（如需加载外部图片）
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
    NEXT_PUBLIC_APP_VERSION: '0.1.0',
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
  },

  // Next.js 16 新特性：缓存组件（原 PPR）
  // 注意：静态导出模式下不支持 PPR，已注释
  // cacheComponents: true,

  // Turbopack 配置（Next.js 16 默认启用）
  turbopack: {
    // 解决中文路径兼容性问题
    root: process.cwd(),
  },

  // 安全头配置（符合金融应用安全标准）
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload; always'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate'
          },
        ],
      },
    ];
  },

  // Webpack 配置（已迁移至 Turbopack - Next.js 16 默认）
  // 如需自定义 webpack 配置，请使用 turbopack 配置替代
  // webpack: (config, { isServer }) => {
  //   config.module.rules.push({
  //     test: /\.svg$/,
  //     use: ['@svgr/webpack'],
  //   });
  //
  //   if (!isServer) {
  //     config.resolve.fallback = {
  //       ...config.resolve.fallback,
  //       fs: false,
  //       net: false,
  //       tls: false,
  //     };
  //   }
  //
  //   return config;
  // },

  // 日志输出配置（便于调试和监控）
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
