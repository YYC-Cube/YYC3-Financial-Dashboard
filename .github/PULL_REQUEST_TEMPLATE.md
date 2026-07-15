## 📋 PR 描述 | Pull Request Description

### 🎯 变更概述 | Change Summary

**简要描述此 PR 的主要变更。**
**Briefly describe the main changes in this PR.**

**相关 Issue**: Closes #[Issue Number]

---

## 📝 变更类型 | Type of Change

请删除不适用的选项 | Please delete options that are not relevant:

- [ ] 🐛 **Bug 修复 Bug fix** - 修复了一个非关键性错误
- [ ] ✨ **新功能 New feature** - 新增功能（非破坏性更改）
- [ ] 💥 **破坏性更改 Breaking change** - 导致现有功能无法正常工作的修复或功能
- [ ] 🔧 **重构 Refactoring** - 代码重构（不影响功能）
- [ ] 📚 **文档更新 Documentation update** - 仅文档更改
- [ ] ⚡ **性能优化 Performance optimization** - 性能改进
- [ ] 🔒 **安全修复 Security fix** - 安全漏洞修复
- [ ] 🎨 **样式/UI 更新 Style/UI update** - UI 或样式更改
- [ ] 🧪 **测试添加 Tests added** - 添加了新的测试用例

---

## ✅ 检查清单 | Checklist

**提交 PR 前，请确保完成以下检查：**
**Before submitting this PR, please make sure you've completed the following checks:**

#### 代码质量 Code Quality
- [ ] ✅ 我的代码遵循项目的代码风格规范
- [ ] ✅ 我已经进行了自我代码审查
- [ ] ✅ 我已经注释了我的代码，特别是在难以理解的部分
- [ ] ✅ 我的更改没有产生新的警告
- [ ] ✅ 我已使用 TypeScript 严格模式，无类型错误

#### 测试 Testing
- [ ] 🧪 我已经添加了测试来覆盖我的更改（如果适用）
- [ ] ✅ 所有现有测试都通过
- [ ] ✅ 本地构建成功 (`pnpm build`)
- [ ] ✅ Lint 检查通过 (`pnpm lint`)

#### 文档 Documentation
- [ ] 📚 我已经更新了相关的文档（README、CHANGELOG 等）
- [ ] 📝 我的 commit messages 遵循 Conventional Commits 规范

#### 安全 Security
- [ ] 🔒 我的更改没有引入已知的安全漏洞
- [ ] ✅ 敏感信息（API keys、密码等）未被提交

---

## 🔄 变更详情 | Change Details

### 修改的文件 Modified Files

| 文件 File | 变更类型 Change Type | 描述 Description |
|----------|-------------------|------------------|
| `path/to/file1.ts` | 修改/新增/删除 | 简要说明 |
| `path/to/file2.tsx` | 修改/新增/删除 | 简要说明 |

---

## 🖼️ 截图/Screenshots (如果是 UI 更改)

**如果适用，请添加截图展示变更前后的对比。**
**If applicable, add screenshots showing before and after comparisons.**

**Before 之前:**
<!-- 在此添加截图 -->

**After 之后:**
<!-- 在此添加截图 -->

---

## 🧪 测试步骤 | Test Steps

**如何测试这些变更？**
**How to test these changes?**

```bash
# 1. 安装依赖
pnpm install

# 2. 启动开发服务器
pnpm dev

# 3. 访问以下页面进行测试:
# - http://localhost:3498/
# - http://localhost:3498/dashboard

# 4. 执行以下操作:
# - 步骤 1: ...
# - 步骤 2: ...
```

---

## ⚠️ 已知问题 | Known Issues

**是否有任何已知的问题或限制？**
**Are there any known issues or limitations?**

> 如果没有，请填写 "无" | If none, write "None"

---

## 💬 额外说明 | Additional Notes

**任何其他需要审查者了解的信息。**
**Any other information reviewers should know.**

---

<div align="center">

## 🙏 审查指南 | Review Guidelines

### 对于审查者 For Reviewers:

1. **🔍 代码质量**: 检查代码是否清晰、高效、符合项目规范
2. **🧪 测试覆盖**: 确保新功能有充分的测试覆盖
3. **📚 文档完整性**: 验证文档是否准确反映代码变更
4. **🔒 安全性**: 确认没有引入安全隐患
5. **⚡ 性能**: 评估对性能的影响

### 审查标签 Review Labels:

- `ready-to-merge`: 代码质量高，可以合并
- `needs-changes`: 需要一些小调整
- `needs-review`: 需要更深入的审查
- `work-in-progress`: 正在进行中，暂不合并

---

**感谢你的贡献！🎉**
**Thank you for your contribution!**

*YYC³ 团队将在 24-48 小时内完成首次审查*
*The YYC³ team will complete the first review within 24-48 hours*

</div>
