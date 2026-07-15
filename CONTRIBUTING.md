# 贡 Contributing to YYC³ Financial Dashboard

<div align="center">

**感谢您考虑为 YYC³ 金融仪表盘项目做出贡献！**

**Thank you for considering contributing to YYC³ Financial Dashboard!**

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

</div>

---

## 📋 目录 Table of Contents

- [🤝 贡献方式 Ways to Contribute](#-贡献方式-ways-to-contribute)
- [🚀 开发流程 Development Workflow](#-开发流程-development-workflow)
- [📝 代码规范 Code Standards](#-代码规范-code-standards)
- [🔧 技术要求 Technical Requirements](#-技术要求-technical-requirements)
- [🐛 提交 Bug Reporting Bugs](#-提交-bug-reporting-bugs)
- [💡 功能建议 Feature Requests](#-功能建议-feature-requests)
- [📖 Pull Request 流程 Pull Request Process](#-pull-request-流程-pull-request-process)
- [✅ 检查清单 Checklist](#-检查清单-checklist)

---

## 🤝 贡献方式 Ways to Contribute

我们欢迎各种形式的贡献！以下是一些您可以参与的方式：

We welcome all forms of contribution! Here are some ways you can participate:

### **代码贡献 Code Contributions**
- 🐛 修复 Bug (Fix bugs)
- ✨ 新增功能 (Add new features)
- ⚡ 性能优化 (Performance optimization)
- 📝 文档改进 (Documentation improvements)
- 🧪 测试用例 (Test cases)

### **非代码贡献 Non-Code Contributions**
- 📖 文档翻译 (Translation)
- 🎨 UI/UX 设计建议 (Design suggestions)
- 💬 问题解答 (Answering questions)
- 📢 项目推广 (Promotion)
- 🔍 Bug 报告 (Bug reports)

---

## 🚀 开发流程 Development Workflow

### **1. Fork 和 Clone**

```bash
# Fork 仓库到您的 GitHub 账号
# Fork the repository to your GitHub account

# 克隆您的 Fork
git clone https://github.com/YOUR_USERNAME/YYC3-Financial-Dashboard.git

# 进入项目目录
cd YYC3-Financial-Dashboard

# 添加上游仓库
git remote add upstream https://github.com/YYC-Cube/YYC3-Financial-Dashboard.git
```

### **2. 创建分支**

```bash
# 确保您在最新的主分支上
git checkout master
git pull upstream master

# 创建新的功能分支（使用规范的分支命名）
git checkout -b feature/amazing-feature
```

#### **分支命名规范 Branch Naming Convention**

| 类型 Type | 前缀 Prefix | 示例 Example |
|----------|------------|--------------|
| 新功能 Feature | `feature/` | `feature/user-authentication` |
| Bug 修复 Fix | `fix/` | `fix/chart-tooltip-error` |
| 热修复 Hotfix | `hotfix/` | `hotfix/security-vulnerability` |
| 重构 Refactor | `refactor/` | `refactor/dashboard-layout` |
| 文档 Docs | `docs/` | `docs/update-readme` |
| 升级 Upgrade | `upgrade/` | `upgrade/nextjs-16` |
| 样式 Style | `style/` | `style/button-component` |

### **3. 开发和测试**

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 运行类型检查
pnpm tsc --noEmit

# 运行 Lint
pnpm lint

# 构建测试
pnpm build
```

### **4. 提交更改**

```bash
# 查看更改状态
git status

# 添加文件
git add .

# 使用 Conventional Commits 规范提交
git commit -m "feat: add user authentication system"
```

---

## 📝 代码规范 Code Standards

### **Conventional Commits 规范**

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

We use [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### **Type 类型**

| 类型 Type | 描述 Description |
|-----------|------------------|
| `feat` | 新功能 New feature |
| `fix` | Bug 修复 Bug fix |
| `docs` | 文档变更 Documentation only |
| `style` | 代码格式化 Formatting (不影响代码运行) |
| `refactor` | 代码重构 Refactoring (不是新功能也不是修复) |
| `perf` | 性能优化 Performance improvements |
| `test` | 添加测试 Adding tests |
| `chore` | 构建过程或辅助工具的变动 Build process or auxiliary tool changes |
| `ci` | CI 配置文件和脚本的变动 Changes to CI configuration files and scripts |

#### **示例 Examples**

```bash
# 好的例子 Good examples
feat(dashboard): add real-time data streaming
fix(chart): resolve tooltip type error in recharts v3
docs(readme): update installation instructions for Node.js 20
perf(build): optimize Turbopack configuration for faster HMR
refactor(auth): simplify authentication flow with custom hook

# 不好的例子 Bad examples
"fixed bug" # 缺少 type 和 scope
"update readme" # 不够具体
"WIP" # 不清晰的描述
```

### **代码风格 Code Style**

#### **TypeScript / React**

```typescript
// ✅ 好的做法 Good practices
interface UserProps {
  name: string;
  email: string;
  age?: number; // 可选属性使用 ?
}

const UserProfile: React.FC<UserProps> = ({ name, email, age }) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-gray-600">{email}</p>
      {age && <span>Age: {age}</span>}
    </div>
  );
};

// ❌ 避免的做法 Avoid these
var x = 1; // 使用 const/let 而不是 var
function Foo() {} // 使用箭头函数或命名函数表达式
// 缺少类型注解
// 过长的函数（超过 50 行）
```

#### **组件命名 Component Naming**

- **文件名**: PascalCase (e.g., `UserProfile.tsx`)
- **组件名**: PascalCase (e.g., `export const UserProfile`)
- **工具函数**: camelCase (e.g., `formatDate.ts`, `calculateTotal()`)
- **常量**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)

#### **CSS / Tailwind CSS**

```tsx
// ✅ 使用 Tailwind 工具类优先
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
  {/* content */}
</div>

// ❌ 避免内联样式和自定义 CSS（除非必要）
<div style={{ display: 'flex', padding: '16px' }}>
  {/* avoid this */}
</div>
```

---

## 🔧 技术要求 Technical Requirements

### **环境要求 Prerequisites**

- **Node.js**: >= 18.17.0 (推荐 20.x LTS)
- **pnpm**: >= 8.0.0
- **Git**: 最新版本
- **编辑器**: VS Code (推荐) + 官方插件

### **推荐的 VS Code 扩展 Recommended Extensions**

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "naumovs.color-highlight",
    "streetsidesoftware.code-spell-checker"
  ]
}
```

### **项目结构遵循 Project Structure**

请确保您的代码符合现有的项目结构：

Please ensure your code follows the existing project structure:

```
src/
├── app/           # Next.js App Router (页面和布局)
├── components/    # React 组件
│   ├── ui/       # shadcn/ui 基础组件
│   └── ...       # 业务组件
├── lib/          # 工具函数和配置
├── hooks/        # 自定义 Hooks
├── types/        # TypeScript 类型定义
└── utils/        # 通用工具函数
```

---

## 🐛 提交 Bug Reporting Bugs

### **Bug 报告模板 Bug Report Template**

在创建 Issue 前，请先搜索是否已存在类似问题。

Before creating an issue, please search if it already exists.

```markdown
## 🐛 Bug 描述 Bug Description
清晰简洁地描述这个 bug 是什么。
A clear and concise description of what the bug is.

## 📋 复现步骤 Steps to Reproduce
1. 进入 '...' 页面 Go to '...'
2. 点击 '....' Click on '....'
3. 向下滚动到 '....' Scroll down to '....'
4. 看到错误 See error

## ✅ 期望行为 Expected Behavior
您期望发生什么。
What you expected to happen.

## ❌ 实际行为 Actual Behavior
实际发生了什么。
What actually happened.

## 📸 截图 Screenshots
如果适用，添加截图以帮助解释问题。
If applicable, add screenshots to help explain your problem.

## 🖥️ 环境信息 Environment Info
 - OS: [e.g., macOS 14.0, Windows 11, Ubuntu 22.04]
 - Browser: [e.g., Chrome 120, Safari 17, Firefox 121]
 - Node.js version: [e.g., 20.10.0]
 - pnpm version: [e.g., 8.15.0]

## 📝 补充信息 Additional Context
关于问题的其他任何补充信息。
Any other context about the problem here.
```

---

## 💡 功能建议 Feature Requests

### **功能请求模板 Feature Request Template**

```markdown
## 🎯 功能描述 Feature Description
清晰简洁地描述您希望实现的功能。
A clear and concise description of the feature you want to implement.

## 🤔 问题/用例 Problem/Use Case
这个功能解决了什么问题？用例是什么？
What problem does this solve? What is the use case?

## 💡 解决方案 Proposed Solution
您希望的解决方案是什么？
What is the proposed solution?

## 🔄 替代方案 Alternatives
您考虑过的其他替代解决方案？
What alternative solutions have you considered?

## 📊 附加信息 Additional Context
关于功能的任何其他截图、mockup 或上下文信息。
Any other context, mockups, or screenshots about the feature here.
```

---

## 📖 Pull Request 流程 Pull Request Process

### **1. 提交 PR 前 Before Submitting**

- ✅ 确保代码遵循项目的代码风格指南
- ✅ 更新相关文档（README、CHANGELOG 等）
- ✅ 确保所有测试通过
- ✅ 确保 Lint 检查通过 (`pnpm lint`)
- ✅ 确保构建成功 (`pnpm build`)
- ✅ 为复杂的 PR 添加测试用例

### **2. PR 标题格式 PR Title Format**

使用 Conventional Commits 格式：

Use Conventional Commits format:

```
type(scope): concise description

例如:
feat(auth): add OAuth2 Google login support
fix(chart): resolve tooltip rendering issue in dark mode
docs(readme): update installation guide for Windows users
perf(build): reduce bundle size by 15% with tree shaking
```

### **3. PR 描述模板 PR Description Template**

```markdown
## 📝 变更描述 Change Description
简要描述此 PR 的变更内容。
Brief description of what this PR changes.

## 🎯 相关 Issue Related Issues
Fixes #(issue number)
Closes #(issue number)

## 🔄 变更类型 Change Type
- [ ] 🐛 Bug fix (修复了一个 bug)
- [ ] ✨ New feature (新增功能)
- [ ] 💥 Breaking change (破坏性变更或 API 修改)
- [ ] 📝 Documentation update (文档更新)
- [ ] 🎨 Style/UI update (样式/界面更新)
- [ ] ⚡ Performance improvement (性能优化)
- [ ] ♻️ Code refactoring (代码重构)
- [ ] 🧪 Test coverage (测试覆盖)

## 🧪 测试 Testing
请描述您运行的测试：
Describe the tests you ran:
- [ ] 单元测试 Unit tests
- [ ] 集成测试 Integration tests
- [ ] E2E 测试 E2E tests
- [ ] 手动测试 Manual testing

## 📸 截图 Screenshots (如果适用)
如果有 UI 变更，请附上截图。
If there are UI changes, please attach screenshots.

## ✅ 检查清单 Checklist
- [ ] 我的代码遵循项目的代码风格
- [ ] 我已经自我审查了自己的代码
- [ ] 我已经对代码进行了注释，特别是在复杂部分
- [ ] 我已经更新了相关文档
- [ ] 我的更改没有产生新的警告
- [ ] 我已经测试了所有受影响的功能
- [ ] 我已经在本地通过了构建和测试
```

### **4. PR 审查流程 PR Review Process**

1. **自动化检查** - CI/CD 会自动运行测试和 Lint
2. **代码审查** - 维护者会在 48 小时内审查您的 PR
3. **修改请求** - 如果需要修改，请在同一分支更新并推送
4. **批准合并** - 通过审查后，维护者会合并您的 PR

---

## ✅ 检查清单 Checklist

在提交 PR 或 Issue 前，请确认：

Before submitting a PR or Issue, please confirm:

### **对于代码贡献 For Code Contributions**

- [ ] 我已阅读并理解了这份贡献指南
- [ ] 我的代码遵循 Conventional Commits 规范
- [ ] 我的代码通过 ESLint 检查 (`pnpm lint`)
- [ ] 我的代码通过 TypeScript 类型检查 (`pnpm tsc --noEmit`)
- [ ] 构建成功 (`pnpm build`)
- [ ] 新功能包含适当的测试
- [ ] 文档已更新（如适用）
- [ ] 分支名称遵循规范
- [ ] PR 描述清晰完整

### **对于 Bug 报告 For Bug Reports**

- [ ] 我已搜索过现有的 Issues
- [ ] 我提供了清晰的复现步骤
- [ ] 我包含了环境信息
- [ ] 我提供了相关的错误日志
- [ ] 我附上了截图（如适用）

### **对于功能建议 For Feature Requests**

- [ ] 我清楚地描述了功能和用例
- [ ] 我说明了当前的问题/痛点
- [ ] 我提出了可能的解决方案
- [ ] 我提供了 mockup 或参考（可选）

---

## 🎖️ 认可与奖励 Recognition & Rewards

我们重视每一位贡献者！

We value every contributor!

### **贡献者认可 Contributor Recognition**

- 🏆 **Contributors 列表** - 所有贡献者都会被列在项目中
- 📰 **Release Notes** - 重要贡献会在版本发布中提及
- 💼 **推荐信** - 长期贡献者可获得推荐信
- 🎁 **周边礼品** - Top 贡献者可获得 YYC³ 周边礼品

### **贡献等级 Contribution Levels**

| 等级 Level | 要求 Requirement | 权益 Benefits |
|-----------|-----------------|-------------|
| 🌱 Observer | 报告 1 个 Issue | Issue 中提及 |
| 🐣 Contributor | 合并 1 个 PR | Contributors 列表 |
| ⭐ Active Contributor | 合并 5+ 个 PR | Release Notes 提及 |
| 🚀 Core Contributor | 合并 20+ 个 PR | 推荐信 + 周边 |
| 👑 Maintainer | 长期活跃 + 高质量贡献 | 团队成员邀请 |

---

## 📞 需要帮助？Need Help？

如果您有任何疑问或需要帮助：

If you have any questions or need help:

- 💬 **Discord 社区**: [加入我们的 Discord](#) (Coming Soon)
- 📧 **Email**: admin@0379.email
- 📱 **GitHub Discussions**: 在仓库中开启 Discussion
- 🐛 **GitHub Issues**: 创建 Issue 寻求帮助

---

## 📜 许可 License

通过向本项目贡献代码，您同意您的贡献将在与项目相同的 [MIT License](LICENSE) 下授权。

By contributing code, you agree that your contributions will be licensed under the same [MIT License](LICENSE) as the project.

---

<div align="center">

### **感谢您的贡献！Thank you for your contribution!**

> **"言启千行代码，语枢万物智能"**
>
> **Together we build the future of intelligent applications!**
>
> **© 2025-2026 YanYuCloudCube Team**

</div>

---

**最后更新 Last Updated**: 2026-05-27  
**文档版本 Version**: v1.0.0  
**维护者 Maintainer**: YanYuCloudCube Team
