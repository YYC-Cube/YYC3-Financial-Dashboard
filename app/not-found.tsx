/**
 * @file 404 Not Found 页面
 * @description 静态导出兼容的 404 页面，不使用 i18n hooks
 * @author YYC³
 * @version 1.0.0
 * @created 2026-07-16
 */

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-zinc-300 dark:text-zinc-700">404</h1>
        <p className="mt-4 text-zinc-500 dark:text-zinc-400">Page Not Found</p>
        <a
          href="/"
          className="mt-6 inline-block px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors"
        >
          Back to Home
        </a>
      </div>
    </div>
  )
}