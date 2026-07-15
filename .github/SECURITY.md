name: Security Policy

# YYC³ Financial Dashboard 安全政策 | Security Policy

## 📋 支持的版本 Supported Versions

| 版本 Version | 支持状态 Support Status |
|-------------|----------------------|
| **0.1.x (当前)** | ✅ ** actively supported** |
| < 0.1.0 | ❌ 不支持 Not supported |

---

## 🔒 报告漏洞 Reporting a Vulnerability

YYC³ 团队非常重视安全问题。我们承诺在收到安全漏洞报告后快速响应并修复。

The YYC³ team takes security seriously. We are committed to responding quickly to and fixing security vulnerabilities.

### ⚠️ 重要提示 IMPORTANT NOTICE

**请勿在公开的 GitHub Issue 中报告安全漏洞！**
**DO NOT report security vulnerabilities in public GitHub issues!**

公开披露安全漏洞可能会对用户造成严重危害。请使用以下私密渠道报告：
Publicly disclosing security vulnerabilities can put users at serious risk. Please use the following private channels to report:

---

## 📧 报告渠道 Reporting Channels

### 优先渠道 Primary Channel（推荐 Recommended）

**📧 Email**: [security@yyc3.com](mailto:security@yyc3.com)

**邮件内容应包含**:
- 漏洞类型和描述
- 复现步骤
- 可能的影响范围
- 您的建议修复方案（可选）

**Email should include**:
- Type and description of vulnerability
- Steps to reproduce
- Potential scope of impact
- Suggested fix (optional)

---

### 备用渠道 Alternative Channels

#### 1. GitHub Security Advisories（推荐 Recommended）

🔗 **链接**: [提交私有安全报告](https://github.com/YYC-Cube/YYC3-Financial-Dashboard/security/advisories/new)

**优势**:
- 官方支持的私密漏洞报告平台
- 自动跟踪和管理
- 可选择公开或保持私有

**Advantages**:
- Official private vulnerability reporting platform
- Automatic tracking and management
- Option to publish or keep private

#### 2. 其他联系方式 Other Contact Methods

如果您无法使用上述方式，可以通过以下渠道联系：
If you cannot use the methods above, you can contact us through:

- 💬 **Discord**: [YYC³ Server](https://discord.gg/yyc3)
- 🐦 **Twitter/X**: [@YYC3Security](https://twitter.com/YYC3Security)

> ⚠️ 请注意：这些渠道可能不如 Email 私密，仅作为备用选项。
> ⚠️ Note: These channels may not be as private as email, use only as backup.

---

## ⏱️ 响应时间 SLA Response Time SLA

我们承诺在以下时间范围内响应：

We commit to responding within the following timeframes:

| 严重等级 Severity | 确认时间 Acknowledge Time | 初步响应 Initial Response | 修复目标 Fix Target |
|------------------|-------------------------|------------------------|-------------------|
| 🔴 **Critical** | **< 24 小时 hours** | **< 48 小时 hours** | **< 7 天 days** |
| 🟠 **High** | **< 48 小时 hours** | **< 72 小时 hours** | **< 14 天 days** |
| 🟡 **Medium** | **< 72 小时 hours** | **< 7 天 days** | **< 30 天 days** |
| 🟢 **Low** | **< 7 天 days** | **< 14 天 days** | **< 60 天 days** |

---

## 🎯 严重等级定义 Severity Definitions

### 🔴 Critical（紧急）

可能导致以下后果的问题：
Issues that could lead to:

- 💰 用户财务数据泄露
- 🔑 未授权访问用户账户
- 🌐 远程代码执行 (RCE)
- 💻 完全系统接管
- 🗄️ 数据库完全泄露

### 🟠 High（高）

可能导致以下后果的问题：
Issues that could lead to:

- 👤 部分敏感信息泄露
- 🔒 权限提升
- 🚫 认证绕过
- 📊 数据篡改

### 🟡 Medium（中）

需要关注但影响有限的问题：
Issues that require attention but have limited impact:

- 🔍 信息泄露（非敏感）
- ⚙️ 配置错误
- 🛡️ 缺少安全头
- 📝 XSS（需用户交互）

### 🟢 Low（低）

改进建议，无直接风险：
Improvement suggestions with no direct risk:

- 📚 文档中的安全隐患说明
- 🔧 最佳实践建议
- 🧪 测试覆盖不足
- 📋 依赖版本过旧

---

## 🔄 漏洞处理流程 Vulnerability Handling Process

```
1. 接收报告 Receive Report
   ↓
2. 确认收到 Acknowledge Receipt (< SLA 时间)
   ↓
3. 初步评估 Initial Assessment
   ↓
4. 复现验证 Reproduce & Verify
   ↓
5. 开发修复 Develop Fix
   ↓
6. 内部测试 Internal Testing
   ↓
7. 发布补丁 Release Patch
   ↓
8. 公开披露 Public Disclosure（经您同意后 With your consent）
```

---

## 🏆 安全奖励计划 Security Rewards Program

为了感谢安全研究者的贡献，我们提供以下奖励：

To thank security researchers for their contributions, we offer the following rewards:

### 奖励级别 Reward Tiers

| 等级 Tier | 严重程度 Severity | 奖励 Reward |
|----------|------------------|------------|
| 🥇 **Gold** | Critical | 🏆 荣誉证书 + $500 USD / ¥3500 CNY 或等值礼品 |
| 🥈 **Silver** | High | 🎖️ 荣誉证书 + $200 USD / ¥1400 CNY 或等值礼品 |
| 🥉 **Bronze** | Medium | 📜 荣誉证书 + $50 USD / ¥350 CNY 或等值礼品 |
| 🏅 **Participant** | Low | 🙏 致谢 + YYC³ 周边礼品 |

### 额外奖励 Additional Rewards

- 🌟 **首次发现 First Discovery**: 在每个严重等级的首个发现者获得额外 20% 奖励
- 📈 **深度分析 Deep Analysis**: 提供详细复现步骤和修复建议者额外 10% 奖励
- 🔄 **连锁漏洞 Chain Vulnerabilities**: 发现多个关联漏洞的组合奖励
- 🎯 **关键路径 Critical Path**: 影响核心功能的漏洞额外重视

### 奖励发放流程 Reward Distribution Process

1. 确认漏洞有效性
2. 与研究者确认奖励偏好
3. 修复发布后 14 天内发放奖励
4. 在安全公告中致谢（除非要求匿名）

---

## 📊 公开披露政策 Public Disclosure Policy

我们遵循 **负责任的披露 Responsible Disclosure** 原则：

We follow the **Responsible Disclosure** principle:

### 时间线 Timeline

1. **接收日 Day 0**: 收到漏洞报告
2. **确认日 Day 0-7**: 确认并开始评估
3. **修复日 Day 7-90**: 开发和测试修复
4. **协调日 Day 90**: 协调公开日期
5. **公开日 Day 90+**: 经双方同意后公开披露

### 特殊情况 Special Circumstances

- 如果漏洞已被公开利用，我们将立即发布安全公告
- 如果您希望延迟公开，我们可以协商更长的窗口期
- 我们绝不会在未通知您的情况下公开您的身份

---

## 🔐 安全最佳实践 Security Best Practices

### 对于用户 For Users

✅ **推荐做法 Recommended Practices:**

- 🔄 定期更新到最新版本
- 🔑 使用强密码和双因素认证 (2FA)
- 🌐 仅通过官方渠道访问应用
- 📧 对可疑邮件和链接保持警惕
- 🔒 使用 HTTPS 连接

❌ **应避免 Avoid:**

- 🚫 使用已不再支持的版本
- 🚫 从非官方源下载
- 🚫 在公共网络上传输敏感数据
- 🚫 忽略浏览器安全警告

### 对于开发者 For Developers

✅ **安全开发 Secure Development:**

- 📝 遵循 OWASP Top 10 防护指南
- 🔍 定期进行代码审查和安全审计
- 🧪 编写安全性测试用例
- 📦 及时更新依赖包
- 🔐 正确处理敏感信息

---

## 📞 紧急联系 Emergency Contact

对于 **Critical** 级别的紧急安全问题，除了上述渠道外，您还可以：

For **Critical** level urgent security issues, in addition to the channels above, you can also:

- 📱 **手机 Phone**: [+86-xxx-xxxx-xxxx](tel:+86-xxx-xxxx-xxxx) （工作时间 Working hours）
- 📧 **紧急邮箱 Emergency Email**: [urgent-security@yyc3.com](mailto:urgent-security@yyc3.com)
- 💬 **即时通讯 IM**: 通过 Discord @mention 管理员

> **注意**: 紧急联系方式仅在 Critical 漏洞时使用，滥用将被列入黑名单。
> **Note**: Emergency contacts only for Critical vulnerabilities, abuse will result in blacklisting.

---

## 📚 相关资源 Related Resources

- 📖 [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- 🛡️ [GitHub Security Best Practices](https://docs.github.com/en/code-security)
- 🔒 [CWE - Common Weakness Enumeration](https://cwe.mitre.org/)
- 📋 [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- 🎓 [SANS Security Resources](https://www.sans.org/security-resources/)

---

<div align="center">

## 🙏 感谢您的贡献 Thank You for Your Contribution

**您的安全意识让互联网变得更安全！**
**Your security awareness makes the internet safer!**

**YYC³ 团队承诺保护每一位用户的隐私和安全。**
**The YYC³ team is committed to protecting every user's privacy and security.**

---

**最后更新 Last Updated**: 2026-05-27
**下次审核 Next Review**: 2026-08-27

**© 2025-2026 YanYuCloudCube Team. All Rights Reserved.**

</div>
