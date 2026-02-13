# Advanced Game Systems Documentation
# 高级游戏系统文档

## Overview | 概述

This document describes the enhanced core game mechanics implemented in the Growth Hacker Game, including multi-resource management, decision dependency chains, combo system, and meta-progression.

本文档描述增长黑客游戏中实现的增强核心游戏机制，包括多资源管理、决策依赖链、组合技系统和元进程系统。

---

## 1. Multi-Resource Management System | 多资源管理系统

### Resources | 资源

The game now tracks 7 core resources instead of just 4:

游戏现在追踪7个核心资源而不是4个：

| Resource | Range | Description | 影响 |
|----------|-------|-------------|------|
| **Budget** 预算 | $0+ | Money available for strategies | 可用于策略的资金 |
| **Team Energy** 团队精力 | 0-100% | Team morale and capacity | 团队士气和能力 |
| **Market Timing** 市场时机 | 0-100% | Market opportunity window | 市场机会窗口 |
| **User Trust** 用户信任 | 0-100% | User confidence in product | 用户对产品的信心 |
| **Brand Reputation** 品牌声誉 | 0-100% | Public brand perception | 公众品牌认知 |
| **Users** 用户数 | 0+ | Total user count | 总用户数 |
| **Revenue** 收入 | $0+ | Monthly recurring revenue | 月度经常性收入 |

### Resource Effects | 资源效果

- **Market Timing** decreases by 2% per week (time-sensitive opportunities)
  - 市场时机每周减少2%（时间敏感的机会）

- **User Trust** affects conversion rates and revenue
  - 用户信任影响转化率和收入

- **Brand Reputation** affects viral growth and referral effectiveness
  - 品牌声誉影响病毒式增长和推荐效果

- **Team Energy** affects execution quality and availability of strategies
  - 团队精力影响执行质量和策略的可用性

### API Usage | API使用

```javascript
// Update resources
game.updateResources({
    budget: -1000,
    teamEnergy: -15,
    userTrust: 10,
    brandReputation: 5
});

// Check resource constraints
const check = game.checkResourceConstraints({
    budget: 2000,
    teamEnergy: 30,
    userTrust: 40
});

if (!check.canProceed) {
    console.log('Insufficient resources:', check.constraints);
}

// Rest and recover
const result = game.restAndRecover(1); // Rest for 1 week
```

---

## 2. Decision Dependency Chain System | 决策依赖链系统

### Overview | 概述

Decisions made in earlier levels affect options available in later levels.

早期关卡的决策影响后期关卡的可用选项。

### How It Works | 工作原理

1. **Decision Recording** | 决策记录
   - Every decision is recorded with its quality (excellent/good/poor)
   - 每个决策都会记录其质量（优秀/良好/一般）

2. **Impact Processing** | 影响处理
   - Decisions unlock or lock future options based on quality
   - 决策根据质量解锁或锁定未来选项

3. **Decision Quality** | 决策质量评估
   ```
   Excellent: 7+ points (high growth, good efficiency, low stress)
   Good: 4-6 points (moderate performance)
   Poor: <4 points (low growth or high cost)
   ```

### Dependency Rules | 依赖规则

Example dependencies:

示例依赖关系：

| Level 1 Decision | Quality | Level 3 Impact |
|------------------|---------|----------------|
| Product Hunt发布 | Excellent | Unlocks: 社区驱动增长, 用户生成内容UGC<br>Bonus: +10 品牌声誉, +5 用户信任 |
| 内容营销+SEO | Excellent | Unlocks: SEO内容矩阵, 内容病毒传播<br>Bonus: +15 品牌声誉 |
| 社交媒体广告 | Poor | Locks: 品牌溢价策略<br>Penalty: -5 用户信任, -5 品牌声誉 |

### API Usage | API使用

```javascript
// Record a decision
const decision = game.recordDecision(
    levelNumber,
    skill,
    choices,
    outcome
);

// Check what's unlocked
const isUnlocked = game.isOptionUnlocked(3, '社区驱动增长');

// Get available skills (filtered by dependencies)
const availableSkills = game.getAvailableSkills(3);

// Get decision chain insights
const insights = game.getDecisionChainInsights();
console.log('Unlocked options:', insights.unlockedOptions);
console.log('Locked options:', insights.lockedOptions);
```

---

## 3. Combo System | 组合技系统

### Overview | 概述

Combine related skills to trigger powerful synergy bonuses and discover hidden combos.

组合相关技能触发强大的协同奖励并发现隐藏组合技。

### Types of Combos | 组合类型

#### A. Synergy Combos | 协同组合

Regular combos that activate when using related skills:

使用相关技能时激活的常规组合：

| Combo Name | Skills Required | Multiplier | Bonus |
|------------|-----------------|------------|-------|
| SEO内容王者 | 内容营销+SEO, SEO内容矩阵, Product Hunt发布 | 1.5x | +10 品牌声誉 |
| 社交病毒传播 | 社交媒体广告, KOL合作推广, 病毒视频营销 | 1.6x | +0.3 病毒系数, +15 品牌声誉 |
| 粘性增长专家 | 打卡系统+游戏化, 会员体系设计, 社区驱动增长 | 1.4x | +15 留存率, +10 用户信任 |
| 自动化营销大师 | 邮件营销自动化, 个性化推荐系统, CRM系统优化 | 1.3x | +15 团队精力, +10 激活率 |

#### B. Hidden Combos | 隐藏组合技

Secret powerful combos discovered through experimentation:

通过实验发现的秘密强大组合：

| Combo Name | Skills Required | Multiplier | Special Bonus |
|------------|-----------------|------------|---------------|
| 🔮 三A战略 | AB测试优化, 优化注册流程, 个性化推荐系统 | 2.0x | +30 激活率, +15 用户信任, +$1000 |
| 🌀 增长飞轮 | 产品内增长循环, 双边推荐奖励, 社区驱动增长 | 2.2x | +0.5 病毒系数, +5000 用户, +20 品牌声誉 |
| 📚 内容帝国 | 内容营销+SEO, SEO内容矩阵, 用户生成内容UGC | 2.1x | +30 品牌声誉, +20 用户信任 |
| ⚡ 完美风暴 | 病毒视频营销, KOL合作推广, 社交媒体广告, Product Hunt发布 | 2.5x | +10000 用户, +40 品牌声誉 |

#### C. Streak System | 连击系统

Make consecutive excellent decisions to enter "On Fire" state:

连续做出优秀决策进入"On Fire"状态：

- **2x Combo**: Good start (+10% effectiveness)
  - 2连击：良好开始（+10%效果）

- **3x Combo (On Fire)**: 🔥 All effects +30%
  - 3连击（On Fire）：🔥 所有效果+30%

- **5x Combo (Legendary)**: ⚡ All effects +50%, +10 team energy per turn
  - 5连击（传奇）：⚡ 所有效果+50%，每回合+10团队精力

### API Usage | API使用

```javascript
// Initialize combo system
const comboSystem = new ComboSystem(game);

// Check for synergies (automatically checks last 5 skills)
const recentSkills = game.skillsUsed.slice(-5);
const synergies = comboSystem.checkSynergies(recentSkills);

// Apply synergy bonuses to result
const enhancedResult = comboSystem.applySynergyBonus(baseResult, synergies);

// Update combo state based on decision quality
comboSystem.updateComboState('excellent'); // or 'good', 'poor'

// Check if on fire
const onFireBonus = comboSystem.getOnFireBonus();

// Get combo display for UI
const display = comboSystem.getComboDisplay();
// Returns: { level: 'ON FIRE', count: 3, icon: '🔥', message: '3x ON FIRE!' }

// Get discovered combos
const discovered = comboSystem.getDiscoveredCombos();

// Get hints for undiscovered combos
const hints = comboSystem.getComboHints();
```

---

## 4. Meta-Progression System | 元进程系统

### Overview | 概述

Persistent player progression across multiple game sessions with a 48-skill tree.

跨多个游戏会话的持久玩家进度，包含48技能树。

### Player Profile | 玩家档案

```javascript
{
    playerId: 'player_123456',
    playerName: 'Growth Hacker',
    level: 15,
    totalXP: 12500,
    xpToNextLevel: 15000,
    gamesPlayed: 23,
    gamesWon: 18,
    achievements: [...],
    stats: {
        bestUserGrowth: 50000,
        bestRevenue: 15000,
        longestStreak: 7,
        totalDecisions: 156,
        excellentDecisions: 89,
        hiddenCombosFound: 3
    }
}
```

### Skill Tree Structure | 技能树结构

**5 Tiers × 12 Skills = 60 Total Skills**

Each skill has:
- **3 initially unlocked** (basic skills)
- **57 locked** (requires XP to unlock)
- **3 levels per skill** (can be upgraded)

每个技能有：
- **3个初始解锁**（基础技能）
- **57个锁定**（需要XP解锁）
- **每个技能3级**（可升级）

#### Tier 1: Acquisition (12 skills) | 获取

- Product Hunt发布 ✓ (unlocked)
- 内容营销+SEO ✓ (unlocked)
- 社交媒体广告 ✓ (unlocked)
- KOL合作推广 (500 XP)
- 病毒视频营销 (500 XP)
- 程序化SEO (800 XP)
- 社区联合发布 (600 XP)
- 媒体公关传播 (700 XP)
- 战略合作渠道 (1000 XP)
- 联盟营销网络 (900 XP)
- 冷启动外展 (600 XP)
- 活动营销 (700 XP)

#### Tier 2: Activation (12 skills) | 激活

- 优化注册流程 (400 XP)
- 欢迎邮件序列 (400 XP)
- 快速成功体验 (500 XP)
- 交互式教程 (600 XP)
- 个性化推荐 (800 XP)
- AB测试优化 (700 XP)
- 社会证明展示 (500 XP)
- 演示数据预填 (600 XP)
- 进度可视化 (500 XP)
- AI聊天助手 (900 XP)
- 视频引导 (600 XP)
- 游戏化入门 (800 XP)

#### Tier 3: Retention (12 skills) | 留存

- 打卡系统+游戏化 (600 XP)
- Push通知优化 (500 XP)
- 邮件营销自动化 (700 XP)
- 社区驱动增长 (800 XP)
- 用户生成内容UGC (900 XP)
- 会员体系设计 (1000 XP)
- 习惯养成机制 (900 XP)
- 流失召回策略 (700 XP)
- 参与度循环 (800 XP)
- 内容日历系统 (600 XP)
- 社交功能增强 (900 XP)
- 季节性活动 (700 XP)

#### Tier 4: Revenue (12 skills) | 变现

- 定价策略优化 (800 XP)
- 增值服务套餐 (700 XP)
- Freemium转化优化 (900 XP)
- 免费试用优化 (700 XP)
- 支付流程优化 (600 XP)
- 订阅模式设计 (1000 XP)
- 交叉销售策略 (800 XP)
- 企业级方案 (1200 XP)
- 使用量计费 (900 XP)
- 年费优惠策略 (700 XP)
- 插件市场 (1000 XP)
- 高级支持服务 (800 XP)

#### Tier 5: Referral (12 skills) | 推荐

- 双边推荐奖励 (700 XP)
- 社交分享功能 (600 XP)
- 游戏化推荐系统 (900 XP)
- 病毒循环设计 (1000 XP)
- 邀请竞赛活动 (800 XP)
- 品牌大使计划 (1100 XP)
- 用户故事传播 (700 XP)
- 用户证言系统 (600 XP)
- 案例研究发布 (800 XP)
- 第三方集成传播 (900 XP)
- API病毒传播 (1200 XP)
- 嵌入式组件 (1000 XP)

### XP System | 经验值系统

#### Earning XP | 获得经验值

| Action | XP Reward |
|--------|-----------|
| Complete game (win) | 500 XP |
| Complete game (lose) | 200 XP |
| Per 100 users gained | 1 XP |
| Per $10 revenue | 1 XP |
| Each excellent decision | 50 XP |
| Each combo | 100 XP × combo count |

#### Leveling Up | 升级

- **Level 1→2**: 1,000 XP
- **Level 2→3**: 1,500 XP
- **Level 3→4**: 2,250 XP
- Each level requires 1.5× previous XP

Level up rewards:
- Odd levels: Unlock 1 skill
- Even levels: Unlock 2 skills
- Every 5 levels: Unlock new scenario
- Every 10 levels: Special achievement

### API Usage | API使用

```javascript
// Initialize meta-progression
const metaProgression = new MetaProgressionSystem();

// Get player profile
const profile = metaProgression.playerProfile;
console.log(`Level ${profile.level}, ${profile.totalXP} XP`);

// Unlock a skill
const result = metaProgression.unlockSkill('kol-collab', 'acquisition');
if (result.success) {
    console.log('Skill unlocked!');
}

// Upgrade a skill
const upgradeResult = metaProgression.upgradeSkill('content-seo', 'acquisition');

// Get skill tree progress
const progress = metaProgression.getSkillTreeProgress();
console.log(`Progress: ${progress.unlockedPercentage}%`);

// Record game completion (automatic XP award)
const summary = {
    won: true,
    finalUsers: 50000,
    finalRevenue: 12000,
    totalDecisions: 8,
    excellentDecisions: 6,
    maxCombo: 4
};

const result = metaProgression.recordGameCompletion(summary);
console.log(`Awarded ${result.xpAwarded} XP`);

// Save/Load
metaProgression.savePlayerProfile();
const saveData = metaProgression.exportProgress();

// Import
metaProgression.importProgress(saveData);

// Clear all progress
metaProgression.clearAllProgress();
```

---

## 5. Integration Guide | 集成指南

### Complete Example | 完整示例

```javascript
// Step 1: Initialize game with all systems
const game = new GrowthGameEngineV2({
    mode: 'real',
    difficulty: 'medium',
    company: 'MyStartup',
    industry: 'saas'
});

const systems = game.initializeAdvancedSystems();

// Step 2: Get available skills (filtered by meta-progression)
const level = game.getCurrentLevel();
const availableSkills = game.getAvailableSkillsForLevel(0);

// Step 3: Get decision options for selected skill
const decisions = game.getSkillDecisions(0);

// Step 4: Player makes decisions
const playerChoices = [
    decisions[0].options[0], // First decision
    decisions[1].options[1], // Second decision
    decisions[2].options[0]  // Third decision
];

// Step 5: Execute with all systems
const result = game.executeSkillWithAdvancedSystems(0, playerChoices);

// Step 6: Display results
console.log('Feedback:', result.feedback);

if (result.activeSynergies.length > 0) {
    console.log('Synergies:', result.activeSynergies);
}

if (result.comboBonus) {
    console.log('Combo:', result.comboBonus);
}

// Step 7: Continue playing through levels...

// Step 8: Complete game and save progress
const summary = game.completeGame();
console.log('XP Awarded:', summary.metaProgression.xpAwarded);
```

---

## 6. Performance Considerations | 性能考虑

### Optimization Tips | 优化建议

1. **LocalStorage Management** | LocalStorage管理
   - Skill tree and player profile are saved separately
   - Use `savePlayerProfile()` after significant changes
   - 技能树和玩家档案分别保存
   - 在重大更改后使用 `savePlayerProfile()`

2. **Combo System** | 组合系统
   - Only checks last 5 skills for synergies
   - Hidden combo check is O(n) but n is small (~5 combos)
   - 仅检查最近5个技能的协同
   - 隐藏组合检查是O(n)但n很小（约5个组合）

3. **Decision Chain** | 决策链
   - Uses Set for O(1) unlock/lock checks
   - Decision history is append-only
   - 使用Set进行O(1)解锁/锁定检查
   - 决策历史是仅追加的

4. **Resource Updates** | 资源更新
   - All resource changes batched in `updateResources()`
   - Bounds checking prevents invalid states
   - 所有资源更改都在 `updateResources()` 中批处理
   - 边界检查防止无效状态

---

## 7. Error Handling | 错误处理

### Common Errors | 常见错误

```javascript
// Insufficient resources
if (!resourceCheck.canProceed) {
    // Show constraints to user
    resourceCheck.constraints.forEach(c => {
        console.error(c.message);
    });
}

// Skill not unlocked in meta-progression
const skill = metaProgression.findSkill('kol-collab');
if (!skill.unlocked) {
    console.error('Skill not yet unlocked');
}

// Invalid skill ID
const result = game.executeSkillWithAdvancedSystems(99, choices);
if (!result.success) {
    console.error(result.feedback);
}
```

---

## 8. Testing | 测试

### Run Demo | 运行演示

```html
<!-- Include all scripts -->
<script src="game-engine-v2.js"></script>
<script src="combo-system.js"></script>
<script src="meta-progression.js"></script>
<script src="advanced-systems-demo.js"></script>

<script>
    // Run full playthrough demo
    const result = AdvancedSystemsDemo.fullGamePlaythrough();

    // Or test individual features
    AdvancedSystemsDemo.demonstrateResourceManagement(game);
    AdvancedSystemsDemo.manageSkillTree(metaProgression);
</script>
```

---

## 9. Extending the System | 扩展系统

### Adding New Synergies | 添加新协同

```javascript
// In combo-system.js, add to defineSynergies()
'NEW_COMBO': {
    skills: ['Skill1', 'Skill2', 'Skill3'],
    name: 'Combo Name',
    description: 'Description',
    multiplier: 1.5,
    bonus: { brandReputation: 10 },
    icon: '🎯'
}
```

### Adding New Hidden Combos | 添加新隐藏组合

```javascript
// In combo-system.js, add to defineHiddenCombos()
'SECRET_COMBO': {
    skills: ['Skill1', 'Skill2', 'Skill3', 'Skill4'],
    name: '🔮 Secret Name',
    description: 'Amazing effect!',
    hidden: true,
    multiplier: 2.0,
    bonus: { users: 10000 },
    icon: '🔮✨'
}
```

### Adding New Skills to Tree | 添加新技能到技能树

```javascript
// In meta-progression.js, add to initializeSkillTree()
{
    id: 'new-skill',
    name: 'New Skill Name',
    unlocked: false,
    level: 0,
    maxLevel: 3,
    xpCost: 800,
    requires: ['prerequisite-skill-id']
}
```

---

## 10. FAQ | 常见问题

### Q: How does market timing affect the game?
**A:** Market timing decreases 2% per week. Low market timing (<40%) reduces user growth effectiveness. Act fast to capitalize on opportunities!

### Q: What happens when team energy is low?
**A:** Below 30% energy, you can't execute high-stress strategies. Use `restAndRecover()` to restore energy.

### Q: How do I discover hidden combos?
**A:** Use related skills within a 5-skill window. Check `getComboHints()` for progress on undiscovered combos.

### Q: Can I reset my meta-progression?
**A:** Yes, use `metaProgression.clearAllProgress()`. Warning: This cannot be undone!

### Q: How is decision quality calculated?
**A:** Based on user growth, revenue, efficiency, and resource management. 7+ points = excellent, 4-6 = good, <4 = poor.

---

## Files Created | 创建的文件

1. **game-engine-v2.js** (enhanced) - Core game engine with multi-resource and decision chain systems
2. **combo-system.js** (new) - Synergy and combo logic
3. **meta-progression.js** (new) - Skill tree and persistent progression
4. **advanced-systems-demo.js** (new) - Examples and testing utilities

## License | 许可证

MIT License - Part of the Growth Hacker Game project
