# Security Policy

<div align="center">

[![Security Status](https://img.shields.io/badge/security-active-brightgreen.svg?style=flat-square)]()
[![CVE Reporting](https://img.shields.io/badge/cve-reporting-yes-blue.svg?style=flat-square)]()
[![Responsible Disclosure](https://img.shields.io/badge/disclosure-responsible-orange.svg?style=flat-square)]()

**YYC³ Financial Dashboard - 安全政策 | Security Policy**

</div>

---

## 📋 目录 Table of Contents

- [🔒 安全承诺 Security Commitment](#-安全承诺-security-commitment)
- [🐛 报告漏洞 Reporting Vulnerabilities](#-报告漏洞-reporting-vulnerabilities)
- [⏱️ 响应时间 Response Time](#-响应时间-response-time)
- [🛡️ 安全最佳实践 Security Best Practices](#-安全最佳实践-security-best-practices)
- [📊 已知安全问题 Known Security Issues](#-已知安全问题-known-security-issues)
- [🔐 安全架构 Security Architecture](#-安全架构-security-architecture)
- [📝 安全审计 Security Audit](#-安全审计-security-audit)

---

## 🔒 安全承诺 Security Commitment

我们高度重视 YYC³ 金融仪表盘的安全性。作为金融类应用，我们将安全性视为最高优先级，致力于：

We take the security of YYC³ Financial Dashboard seriously. As a financial application, we treat security as our highest priority and are committed to:

- ✅ **保护用户数据 Protecting user data** - 实施多层安全防护
- ✅ **快速响应漏洞 Rapid vulnerability response** - 48小时内确认，7天内修复
- ✅ **透明度 Transparency** - 公开披露安全问题和修复措施
- ✅ **持续改进 Continuous improvement** - 定期安全审计和更新
- ✅ **合规性 Compliance** - 遵循行业安全标准和法规

### **安全原则 Security Principles**

1. **最小权限原则 Principle of Least Privilege**
   - 仅授予必要的访问权限
   - 最小化攻击面
   - 细粒度访问控制

2. **纵深防御 Defense in Depth**
   - 多层安全防护
   - 冗余安全机制
   - 故障安全设计

3. **安全默认值 Secure by Default**
   - 默认启用安全功能
   - 默认拒绝未知请求
   - 加密传输为默认选项

---

## 🐛 报告漏洞 Reporting Vulnerabilities

我们认为负责任的披露是维护生态系统安全的关键。

We believe responsible disclosure is key to maintaining ecosystem security.

### **如何报告 How to Report**

如果您发现安全漏洞，请通过以下方式报告：

If you discover a security vulnerability, please report it through:

#### **首选方式 Preferred Method**

📧 **Email**: admin@0379.email

**邮件主题格式 Email Subject Format:**
```
[SECURITY] Brief description of the issue
例如: [SECURITY] XSS vulnerability in dashboard component
```

**请包含 Please Include:**
- 📝 漏洞描述 Description of the vulnerability
- 📍 复现步骤 Steps to reproduce
- 💥 潜在影响 Potential impact
- 🛠️ 建议修复方案 Suggested fix (optional)
- 👤 您的联系信息 Your contact information

#### **备选方式 Alternative Methods**

- **GitHub Security Advisories**: [创建安全建议](https://github.com/YYC-Cube/YYC3-Financial-Dashboard/security/advisories/new) (推荐用于公开披露)
- **PGP Key**: 可提供加密通信（如需要）

### **什么应该报告 What to Report**

请报告以下类型的安全问题：

Please report the following types of security issues:

#### **关键 Critical**
- 💀 远程代码执行 (RCE)
- 💀 SQL 注入 / NoSQL 注入
- 💀 认证绕过
- 💀 敏感数据泄露（密码、密钥、token）

#### **高 High**
- ⚠️ 存储型 XSS
- ⚠️ CSRF 攻击
- ⚠️ 权限提升
- ⚠️ 敏感信息暴露

#### **中 Medium**
- 🔶 反射型 XSS
- 🔶 点击劫持
- 🔶 开放重定向
- 🔶 信息泄露

#### **低 Low**
- 🔹 缺少安全头
- 🔹 版本信息暴露
- 🔹 安全配置不当
- 🔹 最佳实践偏差

### **请不要报告 Do NOT Report**

以下内容不属于安全漏洞范畴：

The following are NOT considered security vulnerabilities:

- ❌ 理论上可行但无法实际利用的问题
- ❌ 需要物理接触设备的攻击
- ❌ 需要用户执行不常见操作的问题
- ❌ 第三方依赖的已知问题（除非有特定影响）
- ❌ 功能性问题或 Bug（除非涉及安全）
- ❌ 缺少功能或特性请求

---

## ⏱️ 响应时间 Response Time

我们承诺在以下时间范围内响应安全报告：

We commit to responding to security reports within the following timeframes:

| 阶段 Stage | 时间范围 Timeframe | 行动 Action |
|-----------|-------------------|------------|
| **确认 Acknowledgment** | **< 48 小时 hours** | 收到报告并确认收到 |
| **初步评估 Initial Assessment** | **< 3 天 days** | 分类严重程度并评估影响 |
| **详细分析 Detailed Analysis** | **< 5 天 days** | 复现并理解漏洞 |
| **修复开发 Fix Development** | **< 7 天 days** (Critical/High) | 开发并测试修复方案 |
| **补丁发布 Patch Release** | **< 10 天 days** (Critical/High) | 发布安全更新 |
| **公开披露 Public Disclosure** | **修复后 30 天内** | 发布安全公告 (经您同意) |

### **紧急联系 Emergency Contact**

对于**关键 (Critical)** 漏洞，您可以期望更快的响应：

For **Critical** vulnerabilities, you can expect faster response:

- 📞 **24小时内响应**: < 24 hour initial response
- 🔧 **72小时内临时缓解**: < 72 hour temporary mitigation
- 🚀 **7天内完整修复**: < 7 day complete fix

---

## 🛡️ 安全最佳实践 Security Best Practices

### **开发者安全指南 For Developers**

#### **1. 输入验证 Input Validation**

```typescript
// ✅ 好的做法 Good Practice
import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/),
  age: z.number().min(18).max(120),
});

// 验证输入
const validatedData = userSchema.parse(inputData);

// ❌ 避免的做法 Avoid This
const userInput = req.body.username; // 未验证直接使用
```

#### **2. SQL / NoSQL 注入防护 Injection Prevention**

```typescript
// ✅ 使用参数化查询 Use Parameterized Queries
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 安全的参数化查询
const users = await prisma.user.findMany({
  where: {
    email: userEmail, // 自动转义
    age: { gte: minAge },
  },
});

// ❌ 避免字符串拼接 Avoid String Concatenation
const query = `SELECT * FROM users WHERE email = '${userEmail}'`; // 危险!
```

#### **3. XSS 防护 XSS Prevention**

```tsx
// ✅ React 自动转义 React Auto-Escapes
const UserComponent = ({ name }: { name: string }) => {
  return <div>Hello, {name}</div>; // 自动转义
};

// ✅ 使用 DOMPurify 清理 HTML Sanitize HTML with DOMPurify
import DOMPurify from 'dompurify';

const cleanHTML = DOMPurify.sanitize(dirtyHTML);
<div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;

// ❌ 避免 Avoid
<div dangerouslySetInnerHTML={{ __html: userInput }} />; // 危险!
```

#### **4. CSRF 防护 CSRF Protection**

```typescript
// Next.js 内置 CSRF 保护 Built-in CSRF Protection
// 使用 next-auth 或类似的认证库自动处理

// 自定义 CSRF Token 实现
import { generateCSRFToken, verifyCSRFToken } from '@/lib/csrf';

// 在表单中包含 Token
<form method="POST" action="/api/submit">
  <input type="hidden" name="csrf_token" value={csrfToken} />
  {/* form fields */}
</form>
```

#### **5. 安全头部 Security Headers**

项目已配置完整的金融级安全头（见 [next.config.mjs](next.config.mjs)）：

The project has comprehensive financial-grade security headers configured:

```http
# 当前已实现的安全头 Currently Implemented Headers
X-DNS-Prefetch-Control: on
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-XSS-Protection: 1; mode=block
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Referrer-Policy: origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Cache-Control: no-store, must-revalidate (for API routes)
```

### **部署安全 Deployment Security**

#### **环境变量管理 Environment Variables Management**

```bash
# ✅ 使用 .env.local 本地开发
# .env.local (不要提交到 Git!)
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-super-secret-key"
NEXTAUTH_URL="http://localhost:3498"

# ✅ 生产环境使用平台环境变量
# Vercel / AWS / GCP 环境变量设置
```

#### **依赖安全 Dependency Security**

```bash
# 定期检查漏洞 Regularly Check for Vulnerabilities
pnpm audit

# 自动修复可自动更新的包 Fix Auto-updatable Packages
pnpm audit fix

# 更新所有依赖 Update All Dependencies
pnpm update

# 检查过时的依赖 Check Outdated Dependencies
pnpm outdated
```

---

## 📊 已知安全问题 Known Security Issues

### **当前状态 Current Status**

✅ **无已知的 Critical 或 High 级别安全漏洞**

**No known Critical or High severity security vulnerabilities**

### **已解决的问题 Resolved Issues**

| ID | 严重程度 Severity | 描述 Description | 状态 Status | 日期 Date |
|----|------------------|------------------|------------|----------|
| SEC-001 | Medium | recharts v3 类型定义不兼容 | ✅ Fixed | 2026-05-27 |
| SEC-002 | Low | vaul 库 React 19 peer dependency 警告 | ⏳ Monitoring | 2026-05-27 |

### **监控中 Monitoring**

- 🔍 **vaul@0.9.9**: React 19 兼容性问题（等待上游更新）
- 🔍 **第三方依赖**: 通过 pnpm audit 持续监控

---

## 🔐 安全架构 Security Architecture

### **多层安全模型 Multi-Layered Security Model**

```
┌─────────────────────────────────────────────┐
│           用户界面层 UI Layer                │
│  ┌─────────────────────────────────────┐    │
│  │ • CSP (Content-Security-Policy)     │    │
│  │ • XSS Protection                   │    │
│  │ • CSRF Tokens                      │    │
│  │ • Input Validation                 │    │
│  └─────────────────────────────────────┘    │
├─────────────────────────────────────────────┤
│          应用层 Application Layer           │
│  ┌─────────────────────────────────────┐    │
│  │ • Authentication & Authorization  │    │
│  │ • Rate Limiting                    │    │
│  │ • Session Management               │    │
│  │ • Error Handling (no info leak)    │    │
│  └─────────────────────────────────────┘    │
├─────────────────────────────────────────────┤
│            API 层 API Layer                  │
│  ┌─────────────────────────────────────┐    │
│  │ • CORS Configuration               │    │
│  │ • Request Validation               │    │
│  │ • SQL Injection Prevention         │    │
│  │ • Output Encoding                  │    │
│  └─────────────────────────────────────┘    │
├─────────────────────────────────────────────┤
│        数据层 Data Layer                     │
│  ┌─────────────────────────────────────┐    │
│  │ • Encrypted Connections (TLS 1.3)  │    │
│  │ • Data Encryption at Rest          │    │
│  │ • Access Controls                  │    │
│  │ • Audit Logging                    │    │
│  └─────────────────────────────────────┘    │
├─────────────────────────────────────────────┤
│       基础设施层 Infrastructure Layer        │
│  ┌─────────────────────────────────────┐    │
│  │ • DDoS Protection                  │    │
│  │ • Firewall Rules                   │    │
│  │ • Network Segmentation             │    │
│  │ • Monitoring & Alerting            │    │
│  └─────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
```

### **当前实现的安全控制 Currently Implemented Controls**

#### **网络层 Network Layer**
- ✅ HTTPS 强制使用 (生产环境)
- ✅ HSTS 启用 (2年有效期)
- ✅ TLS 1.2+ 要求
- ✅ DNS 预解析优化

#### **应用层 Application Layer**
- ✅ 7项安全头配置
- ✅ XSS 防护 (X-XSS-Protection)
- ✅ 点击劫持防护 (X-Frame-Options)
- ✅ MIME 类型嗅探防护 (X-Content-Type-Options)
- ✅ 权限策略限制 (Permissions-Policy)

#### **数据层 Data Layer**
- ✅ API 路由禁用缓存 (no-store)
- ✅ 引用策略隐私保护
- ✅ 敏感 API 的速率限制准备

#### **代码层 Code Layer**
- ✅ TypeScript 严格模式
- ✅ ESLint 安全规则
- ✅ 无 eval() 使用
- ✅ 无 innerHTML 直接赋值

---

## 📝 安全审计 Security Audit

### **定期审计计划 Regular Audit Schedule**

| 审计类型 Audit Type | 频率 Frequency | 上次审计 Last Audit | 下次计划 Next Scheduled |
|-------------------|---------------|--------------------|----------------------|
| **依赖漏洞扫描 Dependency Scan** | 每周 Weekly | 2026-05-27 | 2026-06-03 |
| **代码安全审查 Code Review** | 每月 Monthly | 2026-05-27 | 2026-06-27 |
| **渗透测试 Penetration Testing** | 每季度 Quarterly | 待安排 Q3 2026 | Q3 2026 |
| **合规审计 Compliance Audit** | 半年 Semi-annual | 待安排 | Q4 2026 |

### **自动化安全工具 Automated Security Tools**

```json
{
  "scripts": {
    "security:audit": "pnpm audit",
    "security:fix": "pnpm audit fix",
    "security:outdated": "pnpm outdated"
  }
}
```

**推荐的集成工具 Recommended Integrated Tools:**
- **Snyk**: 依赖漏洞扫描
- **GitHub Dependabot**: 自动依赖更新
- **CodeQL**: 静态代码分析
- **Semgrep**: 自定义安全规则

### **安全事件响应流程 Incident Response Process**

```
发现 Discovery
    ↓
报告 Report (to admin@0379.email)
    ↓
确认 Acknowledge (< 48h)
    ↓
分类 Classify (Critical/High/Medium/Low)
    ↓
遏制 Contain (临时缓解措施)
    ↓
根除 Eradicate (开发永久修复)
    ↓
恢复 Recover (部署修复)
    ↓
回顾 Post-Mortem (经验总结)
    ↓
公开披露 Public Disclosure (30天后)
```

---

## 🏆 安全奖励计划 Bug Bounty Program

### **范围 Scope**

目前我们不提供正式的漏洞奖励计划，但我们会认可所有有效的安全报告：

We currently don't offer a formal bug bounty program, but we recognize all valid security reports:

- 🏅 **荣誉认可 Recognition**: 在安全致谢列表中提及
- 📜 **证书颁发 Certificate**: 为重大贡献者颁发安全研究员证书
- 🎁 **周边礼品 Swag**: Top 贡献者获得 YYC³ 周边
- 💼 **推荐信 Reference**: 对职业发展有帮助的推荐

### **排除项 Out of Scope**

以下不在奖励范围内：

The following are out of scope:
- ❌ DDOS 攻击
- ❌ 社会工程学攻击
- ❌ 物理安全攻击
- ❌ 第三方服务的漏洞
- ❌ 已知公开的漏洞（未提供新信息）

---

## 📞 安全联系方式 Security Contact

### **主要联系方式 Primary Contact**

- 📧 **Email**: admin@0379.email
- 📱 **PGP Key**: 可按要求提供 (Available on request)
- 🕐 **响应时间**: 48小时以内 (Within 48 hours)

### **紧急情况 Emergencies**

对于**关键 (Critical)** 或**正在被利用的漏洞 actively exploited vulnerabilities**：

For **Critical** or **actively exploited vulnerabilities**:

1. **立即发送邮件至**: admin@0379.email (主题: `[CRITICAL] ...`)
2. **等待确认**: 我们会在24小时内响应
3. **提供详细信息**: 包括复现步骤、影响范围、PoC（如有）
4. **保持沟通**: 协助我们理解和修复问题

---

## 📚 安全资源 Security Resources

### **学习资源 Learning Resources**

- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Web 应用安全风险
- [Next.js Security Documentation](https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy) - Next.js 安全配置
- [React Security Best Practices](https://react.dev/reference/react-dom/components/common#security) - React 安全实践
- [Web Security Academy](https://portswigger.net/web-security) - 免费安全培训

### **工具 Tools**

- [Snyk](https://snyk.io/) - 安全扫描工具
- [npm audit](https://docs.npmjs.com/cli/v9/commands/npm-audit) - Node.js 安全审计
- [ OWASP ZAP](https://www.zaproxy.org/) - 渗透测试工具
- [SecurityHeaders.com](https://securityheaders.com/) - 安全头检查

---

## 📜 法律声明 Legal Disclaimer

本安全政策仅供参考，不构成法律建议。YYC³ 团队保留随时修改此政策的权利。

This security policy is for reference only and does not constitute legal advice. The YYC³ team reserves the right to modify this policy at any time.

**最后更新 Last Updated**: 2026-05-27  
**文档版本 Version**: v1.0.0  
**下次审查 Next Review**: 2026-06-27  
**维护者 Maintainer**: YanYuCloudCube Team

---

<div align="center">

### **— YYC³ Financial Dashboard Security Policy —**

> **"安全是基础，信任是目标"**
>
> **"Security is the foundation, trust is the goal"**
>
> ---
>
> **感谢您帮助我们要让 YYC³ 更安全！**
>
> **Thank you for helping us make YYC³ more secure!**
>
> **© 2025-2026 YanYuCloudCube Team**

</div>

---

**相关文档 Related Documents:**
- [README.md](README.md) - 项目概述
- [CONTRIBUTING.md](CONTRIBUTING.md) - 贡献指南
- [CHANGELOG.md](CHANGELOG.md) - 变更日志
- [LICENSE](LICENSE) - 许可证
