/**
 * @file AI 助手 Mock 回复引擎
 * @description 金融顾问人格化回复（适配自 YYC3 AI-Dev）
 * @author YYC³
 * @reference docs/AI-Dev/AIAssistant/mock.ts
 */

const PERSONA_RESPONSES: Record<string, string[]> = {
  analyst: [
    "已收到你的消息。我正在分析收支数据，稍后给出洞察报告。",
    "从数据来看，本月支出比上月减少了 12%，这是一个积极的趋势。",
    "让我深入分析一下这笔交易的分类是否合理。",
    "数据显示，餐饮支出占总支出的 28%，建议关注这个品类。",
  ],
  advisor: [
    "根据你当前的财务状况，我建议将储蓄率提升至收入的 20%。",
    "好消息！你的应急基金已覆盖 3 个月支出，达到了安全线。",
    "我为你制定了一份月度预算方案，涵盖了所有关键支出类别。",
    "理财的关键在于坚持，让我们一起实现财务目标。",
  ],
  guardian: [
    "安全检查完毕，近期交易未发现异常模式。",
    "检测到一笔大额支出（¥3,299），已标记为需要确认。",
    "你的账户安全等级良好，建议开启双重验证以进一步提升安全性。",
    "已完成全面安全扫描，所有交易均在正常范围内。",
  ],
  scout: [
    "根据趋势分析，预计下月收入将保持稳定增长。",
    "按照当前储蓄进度，你的应急基金目标将在 2 个月内达成。",
    "我预测未来 3 个月的消费趋势，建议提前规划节日预算。",
    "从长远来看，你的投资组合有稳健的增长潜力。",
  ],
}

const FALLBACK_RESPONSES = [
  "我理解了你的问题，让我为你查找相关信息。",
  "这是一个很好的问题，让我分析一下。",
  "收到！我正在处理你的请求。",
  "让我看看数据怎么说...",
]

/**
 * 获取人格化回复
 */
export function getPersonaResponse(personaId: string, _userMessage: string): string {
  const responses = PERSONA_RESPONSES[personaId] ?? FALLBACK_RESPONSES
  return responses[Math.floor(Math.random() * responses.length)]
}

/**
 * 获取人格问候语
 */
export function getPersonaGreeting(personaId: string): string {
  const greetings: Record<string, string> = {
    analyst: "你好，智析在此。每一个数据背后都有故事。",
    advisor: "睿谋在此。让财富稳健增长是我的使命。",
    guardian: "金盾在岗。放心，每一笔交易都有我守护。",
    scout: "远见已上线。我看到了财富增长的可能性。",
  }
  return greetings[personaId] ?? "你好，我是 YYC³ 金融 AI 助手。"
}
