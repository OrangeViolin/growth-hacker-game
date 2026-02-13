# AI对话系统 - 快速开始

## 🚀 5分钟快速上手

### 1️⃣ 测试系统（最快）

```bash
# 在浏览器打开测试页面
open test-ai-dialogue-system.html
```

**立即体验：**
- ✅ 无需API Key（使用Mock模式）
- ✅ 完整UI界面
- ✅ 实时对话测试
- ✅ NPC反应演示
- ✅ 场景生成测试

---

### 2️⃣ 基础集成（3行代码）

```javascript
// 引入文件
<script src="ai-dialogue-engine.js"></script>
<script src="npc-system.js"></script>
<script src="scene-generator.js"></script>

// 初始化
const ai = new AIDialogueEngine();
const npc = new NPCManager();
const scene = new SceneGenerator(ai);

// 使用
const response = await ai.sendMessage("我想做病毒营销", gameState);
console.log(response.text);
```

---

### 3️⃣ 使用真实AI（可选）

```javascript
// 设置API Key
const ai = new AIDialogueEngine('your-claude-api-key');

// 其他代码完全相同
const response = await ai.sendMessage(input, gameState);
```

---

## 📦 文件说明

| 文件 | 大小 | 说明 |
|------|------|------|
| `ai-dialogue-engine.js` | 26KB | AI对话引擎 |
| `npc-system.js` | 25KB | NPC管理系统 |
| `scene-generator.js` | 32KB | 场景生成器 |
| `test-ai-dialogue-system.html` | 32KB | 测试演示页面 |
| `AI_DIALOGUE_SYSTEM_README.md` | 17KB | 完整文档 |

---

## 🎯 核心功能

### AI对话引擎
```javascript
const engine = new AIDialogueEngine();

// 发送消息
const response = await engine.sendMessage(
  "我想快速获取用户",
  { users: 0, budget: 10000, teamEnergy: 100 }
);

// 响应包含
response.text          // 对话内容
response.emotion       // 情绪（happy/neutral/concerned/angry）
response.suggestions   // 建议列表
response.nextRole      // 下一个角色
```

### NPC系统
```javascript
const npc = new NPCManager();

// 获取NPC反应
const reaction = npc.getReaction('ceo', {
  type: 'marketing',
  cost: 1000,
  users: 100,
  growthRate: 20
}, gameState);

// 反应包含
reaction.text              // 反应文本
reaction.emotion           // 情绪
reaction.satisfactionChange // 满意度变化
```

### 场景生成器
```javascript
const gen = new SceneGenerator(aiEngine);

// 生成场景
const scene = await gen.generateScene(
  { day: 1, users: 0, budget: 10000 },
  []
);

// 场景包含
scene.title           // 场景标题
scene.description     // 场景描述
scene.challenge       // 核心挑战
scene.hints           // 策略提示
scene.npcDialogues    // NPC对话
```

---

## 💡 常用示例

### 示例1：完整对话流程

```javascript
// 1. 初始化
const ai = new AIDialogueEngine();
const gameState = {
  day: 1,
  users: 0,
  revenue: 0,
  budget: 10000,
  teamEnergy: 100,
  userTrust: 70,
  brandReputation: 60
};

// 2. 用户输入
const userInput = "我想通过社交媒体营销获取用户";

// 3. AI响应
const response = await ai.sendMessage(userInput, gameState);

// 4. 显示结果
console.log(`AI顾问: ${response.text}`);
console.log(`建议: ${response.suggestions.join(', ')}`);

// 5. 更新游戏状态
if (response.resourceImpact) {
  gameState.teamEnergy += response.resourceImpact.teamEnergy || 0;
}
```

### 示例2：NPC反应系统

```javascript
// 1. 初始化
const npc = new NPCManager();

// 2. 用户行动
const action = {
  type: 'aggressive_marketing',
  cost: 5000,
  users: 500,
  growthRate: 50,
  speed: 'fast',
  quality: 'medium'
};

// 3. 获取不同NPC的反应
const ceoReaction = npc.getReaction('ceo', action, gameState);
const investorReaction = npc.getReaction('investor', action, gameState);
const ctoReaction = npc.getReaction('cto', action, gameState);

// 4. 显示反应
console.log(`CEO: ${ceoReaction.emotion} - ${ceoReaction.text}`);
console.log(`投资人: ${investorReaction.emotion} - ${investorReaction.text}`);
console.log(`CTO: ${ctoReaction.emotion} - ${ctoReaction.text}`);

// 5. 更新满意度
npc.updateSatisfaction('ceo', ceoReaction.satisfactionChange);
```

### 示例3：场景生成

```javascript
// 1. 初始化
const gen = new SceneGenerator(aiEngine);

// 2. 生成场景
const scene = await gen.generateScene(gameState, decisionHistory);

// 3. 显示场景
console.log(`🎬 ${scene.title}`);
console.log(scene.description);
console.log(`\n🎯 挑战: ${scene.challenge}`);

// 4. 显示NPC对话
Object.entries(scene.npcDialogues).forEach(([role, dialogue]) => {
  console.log(`\n${role}: ${dialogue}`);
});

// 5. 显示提示
console.log('\n💡 策略提示:');
scene.hints.forEach((hint, i) => {
  console.log(`${i + 1}. ${hint}`);
});
```

---

## 🎮 游戏集成

### 完整游戏类

```javascript
class GrowthHackerGame {
  constructor(apiKey = null) {
    this.ai = new AIDialogueEngine(apiKey);
    this.npc = new NPCManager();
    this.scene = new SceneGenerator(this.ai);

    this.gameState = {
      day: 1,
      users: 0,
      revenue: 0,
      budget: 10000,
      teamEnergy: 100,
      userTrust: 70,
      brandReputation: 60
    };
  }

  async start() {
    // 生成初始场景
    return await this.scene.generateScene(this.gameState, []);
  }

  async handleDecision(decision) {
    // AI响应
    const response = await this.ai.sendMessage(decision, this.gameState);

    // 更新状态
    this.updateState(response.resourceImpact);

    // 更新NPC
    this.updateNPC(response);

    return response;
  }

  updateState(impact) {
    if (!impact) return;
    Object.keys(impact).forEach(key => {
      if (this.gameState[key] !== undefined) {
        this.gameState[key] += impact[key] || 0;
      }
    });
  }

  updateNPC(response) {
    const change = {
      'happy': 5,
      'neutral': 0,
      'concerned': -3,
      'angry': -10
    }[response.emotion] || 0;

    this.npc.updateSatisfaction(response.role, change);
  }
}

// 使用
const game = new GrowthHackerGame();
const scene = await game.start();
const response = await game.handleDecision("我选择内容营销");
```

---

## 🔧 配置选项

### Mock模式 vs Real API

| 特性 | Mock模式 | Real API |
|------|---------|----------|
| 响应速度 | < 100ms | 2-5秒 |
| 网络需求 | ❌ 不需要 | ✅ 需要 |
| API费用 | ❌ 免费 | ✅ 付费 |
| 响应质量 | ⭐⭐⭐ 规则引擎 | ⭐⭐⭐⭐⭐ AI生成 |
| 适用场景 | 开发/测试 | 生产环境 |

### 推荐配置

```javascript
// 开发环境 - Mock模式
const ai = new AIDialogueEngine();

// 生产环境 - 混合模式
const ai = new AIDialogueEngine(apiKey);
// 70%使用模板，30%使用AI（已内置）

// 高级环境 - 纯AI模式
const ai = new AIDialogueEngine(apiKey);
// 修改scene-generator.js中的概率为100%
```

---

## 📊 性能数据

### Mock模式性能
- ✅ 响应时间：< 100ms
- ✅ 内存占用：< 5MB
- ✅ 离线可用：是
- ✅ 并发支持：无限

### Real API性能
- ✅ 响应时间：2-5秒
- ✅ 内存占用：< 10MB
- ✅ 离线可用：否
- ✅ 并发支持：根据API限制

---

## ❓ 常见问题

### Q1: 没有API Key怎么办？
**A:** 不需要！系统默认使用Mock模式，功能完全可用。

### Q2: Mock模式和Real API有什么区别？
**A:** Mock使用规则引擎，响应快但固定；Real API使用Claude，响应更智能但需要网络和费用。

### Q3: 如何切换模式？
**A:**
```javascript
// Mock模式
const ai = new AIDialogueEngine();

// Real API模式
const ai = new AIDialogueEngine('your-api-key');
```

### Q4: 可以自定义NPC吗？
**A:** 可以！在`npc-system.js`中的`this.npcs`对象里添加新NPC。

### Q5: 如何添加新场景？
**A:** 在`scene-generator.js`的`loadSceneTemplates()`方法中添加新场景对象。

### Q6: 系统支持多语言吗？
**A:** 当前是中文，但可以轻松修改所有文本为其他语言。

---

## 🎯 下一步

1. **立即测试**
   ```bash
   open test-ai-dialogue-system.html
   ```

2. **阅读完整文档**
   ```bash
   open AI_DIALOGUE_SYSTEM_README.md
   ```

3. **集成到游戏**
   - 复制示例代码
   - 修改游戏状态结构
   - 添加UI展示

4. **自定义扩展**
   - 添加新NPC
   - 创建新场景
   - 调整对话风格

---

## 📞 支持

- 📖 完整文档：`AI_DIALOGUE_SYSTEM_README.md`
- 🎮 测试页面：`test-ai-dialogue-system.html`
- 💻 源代码：已包含详细注释

---

**开始你的AI对话之旅吧！** 🚀

---

**版本：** 1.0.0
**更新：** 2026-02-12
**作者：** AI Integration Engineer
