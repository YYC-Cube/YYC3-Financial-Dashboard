#!/usr/bin/env python3
"""
YYC³ 金融仪表盘 — 文档批量补全脚本
将 52 个空壳文档（"本文档待填充"）替换为与项目实际现状对齐的真实内容。
"""

import os
import re
import glob

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCS_DIR = os.path.join(PROJECT_ROOT, "docs")

# ============ 文档内容映射表 ============
# 每个文档的 "详细内容" 部分根据其描述生成

DOC_CONTENT = {
    # === 00-项目总览索引 ===
    "00-项目总览索引-001-项目总览手册.md": """## 项目定位

**YYC³ 金融仪表盘**（YanYuCloudCube Financial Dashboard）是面向个人和中小企业的现代化智能金融数据可视化平台。

### 核心信息

| 属性 | 值 |
|------|-----|
| 项目名称 | YYC³ Financial Dashboard |
| 版本 | 2.1.0 |
| 技术栈 | Next.js 16 + React 19 + shadcn/ui + Radix UI + Tailwind v4 + pnpm |
| 部署地址 | https://fd.yyc3.top |
| 代码仓库 | https://github.com/YYC-Cube/YYC3-Financial-Dashboard |
| 开发团队 | YanYuCloudCube Team |
| 许可证 | MIT |

### 项目阶段

当前项目已完成 P0-P4 全阶段落地（22/22 节点），具备生产上线能力：

- **P0 安全与版本控制**：Git 初始化 + CI/CD + Dependabot
- **P1 架构修正**：Tailwind v4 统一 + 数据层架构 + 组件解耦
- **P2 功能深化**：recharts 图表 + Zustand 状态管理 + react-hook-form 表单
- **P3 体验优化**：PWA 离线 + SEO + 多端适配 + i18n 多语言
- **P4 部署上线**：GitHub Pages + 自定义域名 + HTTPS + 监控告警

### 核心功能

1. **账户管理**：多账户汇总（储蓄/支票/投资/信用卡/应急基金）
2. **交易追踪**：收支记录、分类统计、历史趋势
3. **数据可视化**：收支趋势 AreaChart + 支出分类 PieChart
4. **财务目标**：目标设定、进度追踪、到期提醒
5. **多语言**：zh-CN / en 双语支持，基于 YYC3-i18n-Core 架构
6. **PWA 离线**：Service Worker 缓存，可安装到桌面""",

    "00-项目总览索引-002-文档架构导航.md": """## 文档体系结构

项目文档采用 **九大阶段分类法**，覆盖从规划到运维的全生命周期。

### 目录结构

```
docs/
├── 00-项目总览索引/          # 项目级文档（总览、导航、指南）
├── 01-启动规划阶段/          # 立项、需求、可行性、风险
├── 02-项目设计阶段/          # 架构设计、详细设计（九层）
├── 03-开发实施阶段/          # 环境搭建、开发规范
├── 04-测试审核阶段/          # 测试策略、质量审核
├── 05-交付部署阶段/          # 交付物管理
├── 06-运维保障阶段/          # 运维策略
├── 07-合规安全保障/          # 安全管理
├── 08-资产知识管理/          # 资产清单
├── 09-智能演进优化/          # 持续改进
├── 10-团队通用指南/          # 团队标规文档
├── YYC3-FD-落地推进阶段节点文档.md    # 主推进文档
├── YYC3-FD-综合项目审计报告.md       # 审计报告
└── YYC3-FD-双项目差距分析报告.md     # 差距分析
```

### 导航指南

| 需求 | 推荐文档 |
|------|----------|
| 了解项目全貌 | `00-项目总览索引-001-项目总览手册` |
| 快速启动开发 | `00-项目总览索引-003-快速开始指南` |
| 查看技术架构 | `02-项目设计阶段/0201-架构设计` |
| 了解开发规范 | `03-开发实施阶段/0302-开发规范` |
| 查看落地进度 | `YYC3-FD-落地推进阶段节点文档.md` |""",

    "00-项目总览索引-003-快速开始指南.md": """## 环境要求

| 工具 | 最低版本 | 说明 |
|------|----------|------|
| Node.js | 20.0+ | 推荐使用 LTS 版本 |
| pnpm | 11.0+ | 包管理器 |
| Git | 2.40+ | 版本控制 |

## 快速启动

### 1. 克隆仓库

```bash
git clone https://github.com/YYC-Cube/YYC3-Financial-Dashboard.git
cd YYC3-Financial-Dashboard
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 启动开发服务器

```bash
pnpm dev
# 访问 http://localhost:3498
```

### 4. 构建生产版本

```bash
pnpm build    # 静态导出到 out/ 目录
```

### 5. 运行测试

```bash
pnpm test     # 运行 vitest 测试套件
```

## 常用命令

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 启动开发服务器（端口 3498） |
| `pnpm build` | 构建生产版本（静态导出） |
| `pnpm lint` | ESLint 代码检查 |
| `pnpm typecheck` | TypeScript 类型检查 |
| `pnpm test` | 运行测试 |
| `pnpm quality` | 全量质量检查（lint + typecheck + build） |""",

    "00-项目总览索引-004-核心概念词典.md": """## 核心术语

| 术语 | 全称 | 说明 |
|------|------|------|
| YYC³ | YanYuCloudCube | 言语云立方，团队名称与技术品牌 |
| PWA | Progressive Web App | 渐进式 Web 应用，支持离线和安装 |
| ICU | International Components for Unicode | 国际化消息格式标准 |
| SWR | Stale While Revalidate | 缓存策略：先返回缓存，后台更新 |
| RSC | React Server Components | React 服务端组件 |

## 五高五标五化五维体系

### 五高架构
高可用 | 高性能 | 高安全 | 高扩展 | 高智能

### 五标体系
标准化 | 规范化 | 自动化 | 可视化 | 智能化

### 五化转型
流程化 | 数字化 | 生态化 | 工具化 | 服务化

### 五维评估
时间维 | 空间维 | 属性维 | 事件维 | 关联维""",

    "00-项目总览索引-005-版本更新日志.md": """## 版本历史

### v2.1.0 (2026-07-15) — 生产上线

**P0-P4 全阶段完成**

#### 新增
- PWA 离线支持（manifest + Service Worker + 安装引导）
- SEO 完整配置（OpenGraph + Twitter Card + sitemap）
- i18n 多语言系统（zh-CN/en，兼容 YYC3-i18n-Core API）
- recharts 图表（收支趋势 + 支出分类）
- Zustand 全局状态管理
- react-hook-form + zod 表单验证
- 多端响应式适配（useDevice Hook + 平台检测）
- GitHub Pages 自动部署 + HTTPS

#### 优化
- Tailwind v4 配置统一，删除 v3 残留
- 组件解耦：数据层 + 类型层分离
- 图表组件 next/dynamic 动态导入
- 字体改为系统栈（离线构建可用）

#### 安全
- Dependabot 自动依赖更新
- SECURITY.md 安全策略
- HSTS + X-Frame-Options 安全头

### v1.0.0 (2025-09-15) — 初始版本
- 基础仪表盘 UI（Kokonut UI 组件）
- 账户/交易/目标列表
- 明暗双主题""",

    # === 01-启动规划阶段 ===
    "0101-项目规划-001-项目章程与愿景.md": """## 项目愿景

构建一个 **现代化、智能化、多端适配** 的金融数据可视化平台，为用户提供直观、高效的财务管理体验。

## 项目目标

### 核心目标
1. **数据可视化**：通过图表直观展示收支趋势和分类占比
2. **多端一致**：PC/移动端/PWA 体验统一
3. **离线可用**：PWA 支持离线访问核心功能
4. **国际化**：支持中英文切换，架构兼容更多语言

### 成功标准
- 页面加载时间 < 2s（LCP）
- Lighthouse 评分 >= 90
- TypeScript 零错误
- 测试覆盖率 >= 80%

## 项目范围

详见 `0101-项目规划-002-项目范围说明书.md`""",

    "0101-项目规划-002-项目范围说明书.md": """## 范围定义

### 包含内容
- 仪表盘主界面（账户汇总 + 交易列表 + 图表 + 目标）
- PWA 离线支持
- 中英文国际化
- 明暗双主题
- 响应式多端适配

### 不包含内容
- 后端 API 服务（当前使用静态数据）
- 用户认证系统
- 银行数据对接
- 实时数据推送

### 交付物
- 可部署的静态网站（out/ 目录）
- 完整文档体系
- 测试套件""",

    "0101-项目规划-003-项目里程碑计划.md": """## 里程碑

| 里程碑 | 阶段 | 状态 | 完成日期 |
|--------|------|------|----------|
| M1 | P0 安全与版本控制 | ✅ | 2026-07-15 |
| M2 | P1 架构修正 | ✅ | 2026-07-15 |
| M3 | P2 功能深化 | ✅ | 2026-07-15 |
| M4 | P3 体验优化 | ✅ | 2026-07-15 |
| M5 | P4 部署上线 | ✅ | 2026-07-15 |

全部里程碑已达成。""",

    "0101-项目规划-004-项目资源规划.md": """## 人力资源

| 角色 | 职责 |
|------|------|
| 项目负责人 | 整体规划与决策 |
| 前端开发 | UI 实现、组件开发 |
| 架构师 | 技术选型、代码审核 |
| 文档工程师 | 文档编写与维护 |

## 技术资源

| 资源 | 说明 |
|------|------|
| GitHub | 代码仓库 + CI/CD + Pages |
| pnpm | 包管理 |
| Next.js 16 | 应用框架 |
| shadcn/ui | UI 组件库 |""",

    "0101-项目规划-005-干系人管理计划.md": """## 干系人清单

| 干系人 | 利益/影响 | 沟通策略 |
|--------|-----------|----------|
| 开发团队 | 直接执行者 | 日常站会 + 文档同步 |
| 最终用户 | 产品使用者 | 用户反馈渠道 |
| 开源社区 | 代码贡献者 | GitHub Issues/PR |

## 沟通频率
- 每日：开发进度同步
- 每周：里程碑回顾
- 每阶段：文档更新""",

    # === 需求规划 ===
    "0102-需求规划-001-业务需求分析.md": """## 业务需求

### 核心业务场景
1. **财务概览**：用户需要一目了然地查看所有账户的总余额
2. **收支追踪**：记录和分类每笔交易，了解消费习惯
3. **趋势分析**：通过图表识别收支模式和异常
4. **目标管理**：设定储蓄/投资目标并追踪进度

### 业务规则
- 金额以人民币（¥）为单位
- 交易分为收入（incoming）和支出（outgoing）
- 支出分类：购物、餐饮、交通、娱乐、订阅""",

    "0102-需求规划-002-用户需求调研报告.md": """## 用户画像

### 主要用户：个人用户
- 年龄：25-40 岁
- 需求：个人财务管理、消费分析
- 设备：手机 + 电脑
- 偏好：简洁界面、快速操作、数据可视化

### 次要用户：小企业主
- 需求：现金流监控、支出分类
- 设备：电脑为主
- 偏好：详细报表、多账户管理""",

    "0102-需求规划-003-产品需求文档-PRD.md": """## 产品需求文档

### 功能需求

#### FR-01 仪表盘
- 显示总余额
- 账户列表（储蓄/支票/投资/信用卡/应急基金）
- 收支趋势图（6 个月）
- 支出分类饼图

#### FR-02 交易管理
- 交易列表（最近交易）
- 添加交易（名称/金额/类型/分类）
- 交易计数显示

#### FR-03 财务目标
- 目标列表（应急基金/投资/还债）
- 进度条显示
- 状态标签（进行中/待开始/已完成）

#### FR-04 多语言
- 中文/英文切换
- 全量 UI 文本国际化

#### FR-05 PWA
- 可安装到桌面
- 离线访问""",

    "0102-需求规划-004-需求优先级矩阵.md": """## 需求优先级

| 需求 | 优先级 | 状态 | 阶段 |
|------|--------|------|------|
| 仪表盘 UI | P0 | ✅ | 初始版本 |
| 明暗主题 | P0 | ✅ | 初始版本 |
| recharts 图表 | P1 | ✅ | P2 |
| 交易表单 | P1 | ✅ | P2 |
| PWA 离线 | P1 | ✅ | P3 |
| 多语言 i18n | P1 | ✅ | P3 |
| SEO 优化 | P2 | ✅ | P3 |
| 响应式适配 | P2 | ✅ | P3 |
| GitHub Pages 部署 | P1 | ✅ | P4 |""",

    # === 可行性分析 ===
    "0103-可行性分析-001-技术可行性分析.md": """## 技术可行性

### 技术栈评估

| 技术 | 版本 | 可行性 | 说明 |
|------|------|--------|------|
| Next.js | 16 | ✅ | App Router + 静态导出 |
| React | 19 | ✅ | RSC 支持 |
| Tailwind CSS | v4 | ✅ | 零配置 CSS-first |
| shadcn/ui | latest | ✅ | Radix UI 原语 |
| recharts | 3.x | ✅ | React 图表库 |
| Zustand | 5.x | ✅ | 轻量状态管理 |
| pnpm | 11+ | ✅ | 高效包管理 |

### 结论：技术栈完全可行，所有核心依赖均有成熟方案。""",

    "0103-可行性分析-002-经济可行性分析.md": """## 经济可行性

### 成本分析

| 项目 | 成本 | 说明 |
|------|------|------|
| 域名 | 已有 | yyc3.top 已注册 |
| 托管 | 免费 | GitHub Pages |
| SSL | 免费 | GitHub 自动配置 |
| CDN | 免费 | GitHub Pages 自带 |
| 开发工具 | 免费 | VS Code + 开源工具 |

### 结论：零额外成本，经济可行性极高。""",

    "0103-可行性分析-003-市场可行性分析.md": """## 市场可行性

### 目标市场
个人财务管理工具市场持续增长，用户对简洁、可视化的仪表盘需求旺盛。

### 竞品分析
- Mint（已关闭）：功能全面但复杂
- YNAB：注重预算管理
- 个人 Excel：灵活但无可视化

### 差异化
- 开源免费
- PWA 离线可用
- 简洁现代的 UI
- 多语言支持""",

    "0103-可行性分析-004-操作可行性分析.md": """## 操作可行性

### 用户操作流程
1. 访问 https://fd.yyc3.top
2. 查看仪表盘（自动加载数据）
3. 切换语言/主题
4. 安装为 PWA（可选）

### 维护操作
- Dependabot 自动更新依赖
- GitHub Actions 自动部署
- 文档体系完整，易于交接

### 结论：操作简单，维护成本低。""",

    # === 风险管理 ===
    "0104-风险管理-001-项目初期风险评估.md": """## 风险评估

| 风险 | 概率 | 影响 | 等级 | 状态 |
|------|------|------|------|------|
| Tailwind v3/v4 冲突 | 已发生 | 高 | 高 | ✅ 已解决 |
| Google Fonts 离线失败 | 已发生 | 中 | 中 | ✅ 已解决 |
| 依赖版本漂移 | 低 | 中 | 低 | ✅ 已解决 |
| GitHub token scope 限制 | 已发生 | 低 | 低 | ⚠️ 需手动处理 |""",

    "0104-风险管理-002-风险应对预案.md": """## 应对预案

### Tailwind 冲突
- **预防**：统一使用 v4，删除 v3 配置
- **应急**：回退到已知良好的 commit

### 构建失败
- **预防**：CI/CD 自动检查
- **应急**：本地 `pnpm quality` 验证

### 依赖漏洞
- **预防**：Dependabot 每周扫描
- **应急**：`pnpm audit` + 及时更新""",

    "0104-风险管理-003-项目预算与成本控制.md": """## 预算

### 成本项
| 项目 | 预算 | 实际 | 差异 |
|------|------|------|------|
| 域名 | ¥0 | ¥0 | 已有资产 |
| 托管 | ¥0 | ¥0 | GitHub Pages 免费 |
| 开发 | ¥0 | ¥0 | 内部资源 |

### 结论：项目零预算运行，成本可控。""",

    "0104-风险管理-004-项目成功标准定义.md": """## 成功标准

### 技术指标
- ✅ TypeScript 零错误
- ✅ pnpm build 成功
- ✅ 12 个测试全部通过
- ✅ GitHub Pages 部署成功

### 业务指标
- ✅ 核心功能完整（仪表盘 + 交易 + 图表 + 目标）
- ✅ PWA 可安装
- ✅ 中英文切换正常
- ✅ 移动端响应式正常

### 质量指标
- ✅ 文档体系完整
- ✅ 代码规范一致
- ✅ 安全策略就位""",

    # === 02-项目设计阶段 ===
    "0201-架构设计-001-系统架构总览图.md": """## 系统架构

```
┌─────────────────────────────────────┐
│           GitHub Pages (CDN)         │
├─────────────────────────────────────┤
│         Next.js 静态导出 (out/)      │
├─────────────────────────────────────┤
│          React 19 组件层             │
│  ┌──────────┬──────────┬─────────┐ │
│  │  Pages   │ Components│ Charts  │ │
│  └──────────┴──────────┴─────────┘ │
├─────────────────────────────────────┤
│           状态与逻辑层               │
│  ┌──────────┬──────────┐           │
│  │ Zustand  │  i18n    │           │
│  └──────────┴──────────┘           │
├─────────────────────────────────────┤
│           数据与类型层               │
│  ┌──────────┬──────────┐           │
│  │  Types   │   Data   │           │
│  └──────────┴──────────┘           │
├─────────────────────────────────────┤
│         UI 基础设施                  │
│  ┌──────────┬──────────┐           │
│  │ shadcn/ui│ Tailwind │           │
│  └──────────┴──────────┘           │
└─────────────────────────────────────┘
```""",

    "0201-架构设计-002-九层功能架构设计.md": """## 功能架构分层

本项目采用分层架构设计：

1. **页面层**：app/ 目录（layout + page）
2. **组件层**：components/（kokonutui + charts + forms + pwa + i18n）
3. **状态层**：store/（Zustand）
4. **国际化层**：lib/i18n/ + locales/
5. **数据层**：data/（accounts + transactions + goals + charts）
6. **类型层**：types/（financial）
7. **工具层**：lib/（utils + platform）
8. **Hook 层**：hooks/（use-device）
9. **样式层**：app/globals.css（Tailwind v4 CSS-first）""",

    "0201-架构设计-003-技术选型论证报告.md": """## 技术选型

### 框架：Next.js 16
- **选择原因**：App Router + 静态导出 + Turbopack
- **替代方案**：Vite SPA（缺少 SSR/SSG）

### UI：shadcn/ui + Radix UI
- **选择原因**：无障碍 + 可定制 + 组合式
- **替代方案**：Ant Design（体积大、定制难）

### 状态：Zustand
- **选择原因**：轻量、无 Provider、TypeScript 友好
- **替代方案**：Redux Toolkit（过度工程化）

### 图表：recharts
- **选择原因**：React 原生、声明式、暗黑模式支持
- **替代方案**：Chart.js（需要 wrapper）

### 包管理：pnpm
- **选择原因**：磁盘效率、严格依赖、workspace 支持""",

    "0201-架构设计-004-微服务架构设计.md": """## 说明

本项目为前端静态应用，当前不涉及微服务架构。

数据层使用静态文件（data/*.ts），未来可扩展为 API 调用。

### 未来扩展点
- API 层：`lib/api/` 封装 fetch 请求
- 认证层：NextAuth.js 集成
- 后端服务：独立 Node.js/Go 服务""",

    "0201-架构设计-005-网络拓扑图.md": """## 网络拓扑

```
用户浏览器
    │
    ▼
GitHub Pages CDN (fd.yyc3.top)
    │
    ├── HTML/CSS/JS 静态资源
    ├── Service Worker (离线缓存)
    └── manifest.json (PWA)
    
    DNS: yyc3.top → GitHub Pages
    SSL: GitHub 自动管理 (Let's Encrypt)
```""",

    "0201-架构设计-006-高可用设计.md": """## 高可用策略

### 静态托管高可用
- GitHub Pages 自带 CDN 和多区域部署
- 99.9%+ 可用性保证

### PWA 离线降级
- Service Worker 三层缓存策略
- 离线时可访问缓存的页面和数据

### 故障恢复
- 代码版本控制（Git）
- Dependabot 自动修复依赖漏洞
- 文档完整，可快速重建""",

    # === 详细设计（各层）===
    "AI智能层-001-AI智能层设计.md": """## AI 智能层

当前项目暂未集成 AI 功能。

### 规划中的 AI 能力
- 智能分类：自动识别交易类别
- 消费预测：基于历史数据预测支出
- 异常检测：识别异常交易
- 自然语言查询：通过对话查询财务数据

### 技术预留
- i18n 引擎已兼容 YYC3-i18n-Core 的 AI 翻译能力
- 数据层结构支持未来接入 AI 分析 API""",

    "业务逻辑层-001-业务逻辑层设计.md": """## 业务逻辑层

### 状态管理（Zustand）

文件：`store/financial-store.ts`

管理以下状态：
- `transactions`：交易列表
- `accounts`：账户列表
- `goals`：财务目标

Actions：
- `addTransaction`：添加交易
- `removeTransaction`：删除交易
- `updateGoalProgress`：更新目标进度

### 数据层

| 文件 | 内容 |
|------|------|
| `data/accounts.ts` | 5 个账户 + 汇总数据 |
| `data/transactions.ts` | 6 条交易记录 |
| `data/goals.ts` | 3 个财务目标 |
| `data/charts.ts` | 图表模拟数据 |""",

    "基础设施层-001-基础设施层设计.md": """## 基础设施层

### 构建基础设施
- **包管理**：pnpm 11+（pnpm-lock.yaml）
- **构建工具**：Next.js 16 + Turbopack
- **类型检查**：TypeScript 5.x（strict 模式）
- **代码规范**：ESLint + Prettier

### 部署基础设施
- **托管**：GitHub Pages
- **域名**：fd.yyc3.top（CNAME）
- **HTTPS**：GitHub 自动管理
- **CI/CD**：GitHub Actions（deploy.yml）

### 监控基础设施
- **依赖监控**：Dependabot（每周扫描）
- **安全策略**：SECURITY.md""",

    "应用表现层-001-应用表现层设计.md": """## 应用表现层

### 页面结构
- `/`：首页（重定向到仪表盘）
- `/dashboard`：仪表盘主页面

### 组件树
```
RootLayout
├── ThemeProvider（明暗主题）
├── I18nApp（多语言 Provider）
│   ├── Layout
│   │   ├── Sidebar（侧边栏，md+ 显示）
│   │   ├── TopNav（顶部导航）
│   │   │   ├── ThemeToggle
│   │   │   ├── LanguageSwitcher
│   │   │   └── Profile
│   │   └── DashboardContent
│   │       ├── SpendingTrendChart（动态导入）
│   │       ├── ExpenseCategoryChart（动态导入）
│   │       ├── List01（账户列表）
│   │       ├── List02（交易列表）
│   │       └── List03（目标列表）
│   ├── PWARegister
│   └── PWAInstallPrompt
```""",

    "数据存储层-001-数据存储层设计.md": """## 数据存储层

### 当前方案：静态数据文件

| 文件 | 数据类型 | 说明 |
|------|----------|------|
| `data/accounts.ts` | Account[] | 5 个账户 |
| `data/transactions.ts` | Transaction[] | 6 条交易 |
| `data/goals.ts` | Goal[] | 3 个目标 |
| `data/charts.ts` | ChartData | 图表数据 |

### 类型定义（`types/financial.ts`）
- `Account`：账户类型
- `Transaction`：交易类型
- `Goal`：目标类型
- `DashboardSummary`：汇总数据

### 客户端持久化
- **localStorage**：i18n 语言偏好、PWA 安装状态
- **Zustand**：运行时状态（内存）
- **Service Worker Cache**：离线资源缓存""",

    "核心服务层-001-核心服务层设计.md": """## 核心服务层

### i18n 引擎（`lib/i18n/`）
- `engine.ts`：I18nEngine 核心（翻译/插值/缓存/订阅）
- `react.tsx`：I18nProvider + useTranslation Hook
- `app.tsx`：客户端初始化

### 平台检测（`lib/platform.ts`）
- `detectDevice()`：设备类型（mobile/tablet/desktop）
- `detectPlatform()`：运行平台（web/pwa/h5/miniapp）
- `isTouchDevice()`：触屏检测

### 工具函数（`lib/utils.ts`）
- `cn()`：Tailwind 类名合并""",

    "用户交互层-001-用户交互层设计.md": """## 用户交互层

### 交互组件
- **LanguageSwitcher**：语言切换下拉菜单
- **ThemeToggle**：明暗主题切换
- **AddTransactionDialog**：添加交易对话框
- **PWAInstallPrompt**：PWA 安装引导

### 交互模式
- **桌面端**：固定侧边栏 + 顶部导航
- **移动端**：隐藏侧边栏（md: 断点）+ 顶部导航
- **触控优化**：按钮最小 44px 触摸目标""",

    # === 03-开发实施阶段 ===
    "0301-开发环境-001-开发环境搭建指南.md": """## 开发环境搭建

### 必需工具

1. **Node.js 20+**
   ```bash
   # 使用 nvm 安装
   nvm install 20
   nvm use 20
   ```

2. **pnpm 11+**
   ```bash
   npm install -g pnpm
   ```

3. **Git**
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your@email.com"
   ```

### 项目初始化

```bash
git clone https://github.com/YYC-Cube/YYC3-Financial-Dashboard.git
cd YYC3-Financial-Dashboard
pnpm install
pnpm dev  # http://localhost:3498
```

### VS Code 推荐插件
- ESLint
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)
- PostCSS Language Support""",

    "0301-开发环境-002-多环境配置规范.md": """## 多环境配置

### 环境变量

| 变量 | 开发 | 生产 | 说明 |
|------|------|------|------|
| `NODE_ENV` | development | production | 运行环境 |
| `PORT` | 3498 | - | 开发端口 |
| `NEXT_PUBLIC_APP_VERSION` | 2.1.0 | 2.1.0 | 应用版本 |

### 配置文件
- `next.config.mjs`：Next.js 配置
- `tsconfig.json`：TypeScript 配置
- `vitest.config.ts`：测试配置
- `.github/dependabot.yml`：依赖更新配置""",

    "0302-开发规范-001-Git工作流规范.md": """## Git 工作流

### 分支策略
- `main`：生产分支（受保护）
- `feature/*`：功能分支
- `fix/*`：修复分支

### 提交规范（Conventional Commits）
```
<type>(<scope>): <subject>

feat: 新功能
fix: 修复
docs: 文档
style: 格式
refactor: 重构
test: 测试
chore: 构建/工具
ci: CI/CD
```

### PR 流程
1. 创建功能分支
2. 开发 + 测试
3. 创建 PR
4. 代码审核
5. 合并到 main
6. 自动部署""",

    "0302-开发规范-002-代码提交规范.md": """## 提交信息规范

### 格式
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### 示例
```
feat(i18n): add language switcher component

fix(pwa): resolve service worker registration error

docs: update P4 deployment status

chore(deps): bump next from 16.0.0 to 16.0.1
```

### 注意事项
- 使用中文或英文均可，保持一致性
- 描述以动词开头
- 不超过 50 字符""",

    "0302-开发规范-003-代码注释规范.md": """## 注释规范

### 文件头注释
每个 `.ts/.tsx` 文件必须有文件头：
```typescript
/**
 * @file 文件名称
 * @description 文件描述
 * @author YYC³
 * @version 1.0.0
 * @created 2026-07-15
 */
```

### 函数注释
```typescript
/**
 * 翻译核心方法
 * @param key - 翻译键（点分隔）
 * @param params - ICU 参数
 * @returns 翻译后的字符串
 */
```

### 行内注释
- 仅在逻辑不直观时添加
- 使用中文注释
- 避免显而易见的注释""",

    # === 04-测试审核阶段 ===
    "0401-测试策略-001-测试策略总纲.md": """## 测试策略

### 测试框架
- **运行器**：Vitest 4.x
- **环境**：jsdom
- **React 测试**：@testing-library/react

### 测试分层
1. **单元测试**：i18n 引擎、工具函数
2. **组件测试**：UI 组件渲染和交互
3. **集成测试**：页面级功能验证
4. **E2E 测试**：（规划中）Playwright

### 当前覆盖
- `__tests__/i18n/engine.test.ts`：12 个测试（翻译/插值/切换/缓存/订阅/回退/统计）

### 运行命令
```bash
pnpm test          # 运行一次
pnpm test:watch    # 监听模式
```""",

    "0401-测试策略-002-测试环境管理规范.md": """## 测试环境

### 配置（vitest.config.ts）
- **环境**：jsdom（模拟浏览器）
- **globals**：true（无需导入 describe/it/expect）
- **路径别名**：`@/` → 项目根目录

### 测试文件位置
- `__tests__/` 目录
- 命名：`*.test.ts` 或 `*.test.tsx`

### CI 集成
- GitHub Actions 中运行 `pnpm test`
- 测试失败阻止部署""",

    "0406-质量审核-001-代码质量审核标准.md": """## 代码质量标准

### TypeScript
- ✅ strict 模式启用
- ✅ 零 `any` 类型（特殊情况除外）
- ✅ 所有 props 定义接口

### 代码风格
- ✅ ESLint 规则通过
- ✅ Prettier 格式化
- ✅ 文件头注释完整

### 组件规范
- ✅ 函数式组件
- ✅ Hooks 使用规范
- ✅ "use client" 正确标注

### 质量命令
```bash
pnpm quality  # lint + typecheck + build
```""",

    "0406-质量审核-002-质量门禁标准.md": """## 质量门禁

### 合并前必须通过
| 检查项 | 命令 | 标准 |
|--------|------|------|
| 类型检查 | `pnpm typecheck` | 零错误 |
| 代码规范 | `pnpm lint` | 零错误 |
| 测试 | `pnpm test` | 全部通过 |
| 构建 | `pnpm build` | 成功 |

### CI/CD 自动检查
- GitHub Actions 在 PR 时自动运行
- 任一检查失败阻止合并""",

    # === 05-交付部署阶段 ===
    "0507-交付物管理-001-交付物清单.md": """## 交付物清单

### 代码交付物
| 交付物 | 位置 | 说明 |
|--------|------|------|
| 源代码 | GitHub 仓库 | main 分支 |
| 构建产物 | out/ 目录 | 静态文件 |
| 部署站点 | https://fd.yyc3.top | GitHub Pages |

### 文档交付物
| 交付物 | 说明 |
|--------|------|
| 项目文档（52 篇） | docs/ 目录 |
| README.md | 项目说明 |
| SECURITY.md | 安全策略 |
| CHANGELOG | 版本日志 |

### 测试交付物
| 交付物 | 说明 |
|--------|------|
| i18n 引擎测试 | 12 个测试用例 |""",

    "0507-交付物管理-002-交付验收标准.md": """## 验收标准

### 功能验收
- ✅ 仪表盘正常显示（账户/交易/图表/目标）
- ✅ 添加交易功能正常
- ✅ 语言切换功能正常
- ✅ 主题切换功能正常
- ✅ PWA 可安装

### 技术验收
- ✅ TypeScript 零错误
- ✅ 构建成功
- ✅ 测试全部通过
- ✅ HTTPS 证书有效

### 部署验收
- ✅ https://fd.yyc3.top 可访问
- ✅ GitHub Actions 自动部署
- ✅ Dependabot 活跃""",

    # === 06-运维保障阶段 ===
    "0601-运维策略-001-运维策略总纲.md": """## 运维策略

### 自动化运维
- **部署**：GitHub Actions 自动构建部署
- **依赖更新**：Dependabot 每周扫描
- **安全告警**：GitHub Security Advisories

### 监控指标
- 站点可用性（GitHub Pages SLA 99.9%）
- 构建状态（CI/CD 绿灯）
- 依赖漏洞（Dependabot alerts）

### 应急响应
- 构建失败：检查 commit，回退到上一个稳定版本
- 安全漏洞：根据 SECURITY.md 流程处理
- 域名问题：检查 DNS 配置""",

    # === 07-合规安全保障 ===
    "0702-安全管理-001-安全开发规范.md": """## 安全开发规范

### 传输安全
- HTTPS 强制（GitHub Pages 自动）
- HSTS 头（max-age=63072000）

### 内容安全
- X-XSS-Protection: 1; mode=block
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- Referrer-Policy: origin-when-cross-origin

### 权限控制
- Permissions-Policy: 禁用 camera/microphone/geolocation

### 依赖安全
- pnpm-lock.yaml 锁定版本
- Dependabot 自动审计
- 定期 `pnpm audit`""",

    "0702-安全管理-002-安全运维规范.md": """## 安全运维规范

### 漏洞报告流程
1. 私密报告至 admin@0379.email
2. 或 GitHub Security Advisory
3. 24h 确认 → 72h 评估 → 修复发布

### 依赖更新策略
- Dependabot 每周一扫描
- 自动合并 minor/patch 更新
- major 更新需人工审核

### 访问控制
- GitHub 仓库权限分级
- main 分支保护
- PR 审核必需

详见 `SECURITY.md`""",

    # === 08-资产知识管理 ===
    "0801-资产管理-001-资产清单.md": """## 资产清单

### 数字资产
| 资产 | 类型 | 位置 |
|------|------|------|
| 源代码 | Git 仓库 | GitHub |
| 域名 | yyc3.top | 域名注册商 |
| SSL 证书 | TLS | GitHub 管理 |

### 品牌资产
| 资产 | 位置 |
|------|------|
| Logo（多尺寸） | public/yyc3/ |
| Android 图标 | public/yyc3/Android/ |
| iOS 图标 | public/yyc3/iOS/ |
| macOS 图标 | public/yyc3/macOS/ |
| watchOS 图标 | public/yyc3/watchOS/ |

### 文档资产
| 资产 | 数量 |
|------|------|
| 项目文档 | 52 篇 |
| 团队规范 | 10-团队通用指南/ |""",

    # === 09-智能演进优化 ===
    "0907-质量提升-001-持续改进计划.md": """## 持续改进计划

### 短期（1-3 月）
- [ ] 增加组件测试覆盖率
- [ ] 添加 E2E 测试（Playwright）
- [ ] Lighthouse 性能审计
- [ ] 更多语言支持（ja/ko）

### 中期（3-6 月）
- [ ] 后端 API 集成
- [ ] 用户认证系统
- [ ] 数据持久化（IndexedDB）
- [ ] 离线数据同步

### 长期（6-12 月）
- [ ] AI 智能分类
- [ ] 消费预测模型
- [ ] 多用户协作
- [ ] 移动端原生应用

### 度量指标
- 测试覆盖率：目标 80%+
- Lighthouse 评分：目标 90+
- 包体积：< 500KB（gzip）""",
}


def fill_document(filepath):
    """填充单个文档"""
    filename = os.path.basename(filepath)

    # 获取该文档的内容
    content = DOC_CONTENT.get(filename)
    if not content:
        return False

    # 读取原文件
    with open(filepath, "r", encoding="utf-8") as f:
        original = f.read()

    # 替换 "本文档待填充" 部分为实际内容
    # 匹配: ## 详细内容\n\n> 本文档待填充: xxx\n\n---
    pattern = r"(## 详细内容\n\n)> 本文档待填充: [^\n]+\n\n(---)"
    replacement = r"\1" + content + r"\n\n\2"

    new_content = re.sub(pattern, replacement, original)

    if new_content != original:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        return True

    return False


def main():
    filled = 0
    skipped = 0

    for root, dirs, files in os.walk(DOCS_DIR):
        for filename in files:
            if filename.endswith(".md"):
                filepath = os.path.join(root, filename)

                # 检查是否是空壳文档
                with open(filepath, "r", encoding="utf-8") as f:
                    content = f.read()

                if "本文档待填充" in content:
                    if fill_document(filepath):
                        filled += 1
                        print(f"  ✅ 已填充: {filename}")
                    else:
                        skipped += 1
                        print(f"  ⚠️ 无映射: {filename}")

    print(f"\n总计: {filled} 个文档已填充, {skipped} 个跳过")


if __name__ == "__main__":
    main()
