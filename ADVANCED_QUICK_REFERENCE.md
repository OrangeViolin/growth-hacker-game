# Advanced Systems Quick Reference | 高级系统快速参考

## 🚀 快速开始 | Quick Start

```javascript
// 1. 初始化游戏
const game = new GrowthGameEngineV2({
    mode: 'real',        // 'real' or 'ai'
    difficulty: 'medium', // 'easy', 'medium', 'hard'
    company: 'MyStartup',
    industry: 'saas'     // 'saas', 'ecommerce', 'social', etc.
});

// 2. 初始化高级系统
game.initializeAdvancedSystems();

// 3. 开始游戏!
```

---

## 📊 核心资源 | Core Resources

| 资源 | 范围 | 说明 |
|------|------|------|
| 💼 Budget | $0+ | 预算 |
| ⚡ Team Energy | 0-100% | 团队精力 |
| ⏰ Market Timing | 0-100% | 市场时机 (每周-2%) |
| 🤝 User Trust | 0-100% | 用户信任 (影响转化) |
| ⭐ Brand Reputation | 0-100% | 品牌声誉 (影响病毒) |

```javascript
// 检查资源
const canProceed = game.checkResourceConstraints({
    budget: 2000,
    teamEnergy: 30
});

// 更新资源
game.updateResources({
    budget: -1000,
    teamEnergy: -15,
    userTrust: 10
});

// 休息恢复
game.restAndRecover(1); // 1周
```

---

## 🎯 决策质量 | Decision Quality

```
Excellent (优秀) = 7+ points
├─ +2 用户增长 > 0
├─ +2 收入增长 > 0
├─ +2 用户增长 > 10%
├─ +2 效率 > 1.2x
├─ +1 团队精力消耗 < 10%
└─ +1 成本效率 > 1.0

Good (良好) = 4-6 points
Poor (一般) = <4 points
```

---

## ✨ 组合技速查 | Combo Quick Reference

### 常规协同 (8个)

| Icon | Name | Skills | Multiplier |
|------|------|--------|------------|
| 📝🔍 | SEO内容王者 | SEO + 内容 + PH | 1.5x |
| 📱🌟 | 社交病毒传播 | 社交 + KOL + 视频 | 1.6x |
| 🎮💎 | 粘性增长专家 | 打卡 + 会员 + 社区 | 1.4x |
| 📧🤖 | 自动化营销 | 邮件 + 推荐 + CRM | 1.3x |
| 🚀💡 | 产品驱动 | 产品循环 + 注册 + 功能 | 1.5x |
| 📊🎯 | 数据驱动 | AB测试 + 仪表盘 + 分析 | 1.4x |
| 👥💬 | 社区力量 | 社区 + UGC + Slack | 1.5x |
| 📢🔥 | 推荐大师 | 推荐 + 游戏化 + 分享 | 1.7x |

### 隐藏组合 (5个)

| Icon | Name | Multiplier | Bonus |
|------|------|------------|-------|
| 🔮 | 三A战略 | 2.0x | +30激活率, +$1000 |
| 🌀 | 增长飞轮 | 2.2x | +5000用户, +0.5病毒 |
| 📚 | 内容帝国 | 2.1x | +30品牌, +20信任 |
| ⚡ | 完美风暴 | 2.5x | +10000用户, +40品牌 |
| 🏰 | 留存堡垒 | 2.0x | +40留存, +30NPS |

### 连击系统

```
2x Combo ⚡ → +10% 效果
3x Combo 🔥 → +30% 效果 (On Fire!)
5x Combo ✨ → +50% 效果 (Legendary!)
```

---

## 🌳 技能树 | Skill Tree

### 60个技能 / 5个分类

```
📥 Acquisition (12)    ← 3个初始解锁
🎯 Activation (12)     ← 全部需要解锁
🔄 Retention (12)      ← 全部需要解锁
💰 Revenue (12)        ← 全部需要解锁
📢 Referral (12)       ← 全部需要解锁
```

### XP奖励

| 行动 | XP |
|------|-----|
| 完成游戏(胜) | 500 |
| 完成游戏(败) | 200 |
| 100用户 | 1 |
| $10收入 | 1 |
| 优秀决策 | 50 |
| 连击 | 100×n |

```javascript
// 解锁技能
metaProgression.unlockSkill('kol-collab', 'acquisition');

// 升级技能
metaProgression.upgradeSkill('content-seo', 'acquisition');

// 查看进度
const progress = metaProgression.getSkillTreeProgress();
```

---

## 🎮 完整游戏流程 | Full Game Flow

```javascript
// 1. 初始化
const game = new GrowthGameEngineV2({ mode: 'real', difficulty: 'medium' });
game.initializeAdvancedSystems();

// 2. 获取当前关卡
const level = game.getCurrentLevel();
console.log(level.title);

// 3. 查看可用技能
const skills = game.getAvailableSkillsForLevel(0);

// 4. 获取决策选项
const decisions = game.getSkillDecisions(0);

// 5. 玩家选择
const choices = [
    decisions[0].options[0],
    decisions[1].options[1],
    decisions[2].options[0]
];

// 6. 执行技能
const result = game.executeSkillWithAdvancedSystems(0, choices);

// 7. 显示结果
console.log(result.feedback);
console.log('Synergies:', result.activeSynergies);
console.log('Combo:', result.comboState);

// 8. 查看指标
const metrics = game.getMetrics();
console.log(metrics);

// 9. 检查组合技
const comboInsights = game.getComboInsights();
console.log('Combo:', comboInsights.currentCombo);
console.log('Discovered:', comboInsights.discoveredCombos);

// 10. 完成游戏
const summary = game.completeGame();
console.log('XP Awarded:', summary.metaProgression.xpAwarded);
```

---

## 🔧 常用方法 | Common Methods

### 游戏引擎 | Game Engine

```javascript
// 执行技能
game.executeSkillWithAdvancedSystems(skillIndex, decisions)

// 资源管理
game.updateResources({ budget: -1000, teamEnergy: -10 })
game.checkResourceConstraints({ budget: 2000 })
game.restAndRecover(weeks)

// 获取信息
game.getMetrics()
game.getCurrentLevel()
game.getDecisionChainInsights()
game.getComboInsights()
game.getGameSummary()
```

### 组合系统 | Combo System

```javascript
// 检查协同
comboSystem.checkSynergies(recentSkills)
comboSystem.applySynergyBonus(result, synergies)

// 连击系统
comboSystem.updateComboState('excellent')
comboSystem.getOnFireBonus()
comboSystem.getComboDisplay()

// 发现系统
comboSystem.getDiscoveredCombos()
comboSystem.getComboHints()
```

### 元进程 | Meta-Progression

```javascript
// 玩家档案
metaProgression.playerProfile
metaProgression.addXP(amount, reason)
metaProgression.recordGameCompletion(summary)

// 技能树
metaProgression.unlockSkill(skillId, category)
metaProgression.upgradeSkill(skillId, category)
metaProgression.getSkillTreeProgress()
metaProgression.getUnlockedSkills()

// 存储
metaProgression.savePlayerProfile()
metaProgression.exportProgress()
metaProgression.importProgress(data)
metaProgression.clearAllProgress()
```

---

## 🐛 错误处理 | Error Handling

```javascript
// 资源不足
const check = game.checkResourceConstraints({...});
if (!check.canProceed) {
    check.constraints.forEach(c => console.error(c.message));
}

// 技能未解锁
const result = metaProgression.unlockSkill('xxx');
if (!result.success) {
    console.error(result.message);
}

// 执行失败
const result = game.executeSkillWithAdvancedSystems(...);
if (!result.success) {
    console.error(result.feedback);
}
```

---

## 📚 文档链接 | Documentation

- `ADVANCED_SYSTEMS_README.md` - 完整API文档
- `IMPLEMENTATION_SUMMARY.md` - 实现总结
- `test-advanced-systems.html` - 交互测试页面
- `advanced-systems-demo.js` - 代码示例

---

## 🧪 测试 | Testing

```bash
# 打开测试页面
open /Users/mac/growth-hacker-game/test-advanced-systems.html
```

---

**版本 | Version**: 1.0.0
**更新日期 | Last Updated**: 2026-02-12
