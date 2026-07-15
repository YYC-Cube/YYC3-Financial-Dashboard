# YYC³ 金融仪表盘 — 安全策略

## 支持版本

| 版本 | 支持状态 | 安全更新 |
|------|----------|----------|
| 2.x  | ✅ 当前  | ✅ 全力支持 |
| < 2.0 | ❌ 已停止 | ❌ 不再维护 |

## 报告漏洞

如果您发现安全漏洞，请**不要**通过公开 Issue 报告。

请通过以下方式私密报告：
1. 发送邮件至 `admin@0379.email`
2. 在 GitHub 仓库创建私密 Security Advisory（Settings → Security → Advisories）

我们承诺：
- 24 小时内确认收到报告
- 72 小时内提供初步评估
- 修复发布后公开致谢

## 安全措施

### 传输安全
- **HTTPS 强制**：GitHub Pages 自动启用 HTTPS
- **HSTS**：Strict-Transport-Security 头（max-age=2年）
- **TLS 1.2+**：GitHub Pages 自动配置

### 内容安全
- **XSS 防护**：X-XSS-Protection: 1; mode=block
- **点击劫持防护**：X-Frame-Options: SAMEORIGIN
- **MIME 嗅探防护**：X-Content-Type-Options: nosniff
- **引用控制**：Referrer-Policy: origin-when-cross-origin

### 权限控制
- **Permissions-Policy**：禁用 camera、microphone、geolocation

### 依赖安全
- **Dependabot**：每周自动检查依赖更新
- **pnpm audit**：CI/CD 流水线自动安全审计
- **锁定文件**：pnpm-lock.yaml 确保版本一致性

## 联系方式

- **安全邮箱**：admin@0379.email
- **团队**：YanYuCloudCube Team
- **GitHub 组织**：https://github.com/YYC-Cube
