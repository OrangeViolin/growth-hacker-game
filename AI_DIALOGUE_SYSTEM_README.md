# AI对话系统 - 完整文档

## 🎯 系统概述

这是一个为增长黑客游戏打造的AI驱动对话系统，包含三个核心模块：

1. **AI对话引擎** (`ai-dialogue-engine.js`) - 智能对话生成
2. **NPC管理系统** (`npc-system.js`) - 角色状态和反应管理
3. **场景生成器** (`scene-generator.js`) - 动态场景创建

## 📁 文件说明

### 1. ai-dialogue-engine.js - AI对话引擎

**核心功能：**
- ✅ 双模式运行：Real API / Mock模式
- ✅ 多角色对话（顾问、CEO、投资人、CTO、用户）
- ✅ 上下文对话历史管理
- ✅ 智能规则引擎（Mock模式）
- ✅ 情感系统和建议生成

**主要方法：**

```javascript
// 初始化（可选API key）
const engine = new AIDialogueEngine('your-api-key');  // Real API
const engine = new AIDialogueEngine();                 // Mock模式

// 发送消息
const response = await engine.sendMessage(userInput, gameContext);

// 切换角色
engine.switchRole('ceo');

// 清空历史
engine.clearHistory();

// 获取统计
const stats = engine.getStats();
```

**响应格式：**

```javascript
{
  role: 'advisor',                    // 当前角色
  text: '对话内容...',                // 对话文本
  emotion: 'neutral',                 // 情绪：happy/neutral/concerned/angry
  suggestions: ['建议1', '建议2'],     // 建议列表
  nextRole: 'ceo',                    // 下一个发言角色（可选）
  sceneChange: {...},                 // 场景切换（可选）
  resourceImpact: {                   // 资源影响
    teamEnergy: 0,
    userTrust: 0,
    brandReputation: 0
  }
}
```

---

### 2. npc-system.js - NPC管理系统

**核心功能：**
- ✅ 5个NPC角色管理（CEO、投资人、CTO、用户、顾问）
- ✅ 满意度和信任度系统
- ✅ 性格化反应生成
- ✅ 特殊事件触发（危机、警告等）
- ✅ 基于性格的对话模板

**主要方法：**

```javascript
// 初始化
const npcManager = new NPCManager();

// 获取NPC信息
const npc = npcManager.getNPC('ceo');

// 获取NPC反应
const reaction = npcManager.getReaction('ceo', userAction, gameContext);

// 更新满意度
npcManager.updateSatisfaction('ceo', +10);

// 检查特殊事件
const event = npcManager.checkSpecialEvent('investor');

// 获取状态总结
const summary = npcManager.getStatusSummary();
```

**NPC数据结构：**

```javascript
{
  id: 'ceo',
  name: '张总',
  emoji: '🧑‍💼',
  personality: 'aggressive',          // 性格类型
  concerns: ['growth', 'speed'],      // 关注点
  satisfaction: 80,                   // 满意度 0-100
  trustLevel: 70,                     // 信任度 0-100
  patience: 60,                       // 耐心值 0-100
  traits: {                           // 性格特质
    ambition: 95,
    riskTolerance: 80,
    empathy: 40,
    analyticalThinking: 70
  }
}
```

**反应数据结构：**

```javascript
{
  npcId: 'ceo',
  npcName: '张总',
  emoji: '😊',
  emotion: 'happy',
  intensity: 0.8,                     // 情绪强度 0-1
  text: 'NPC反应文本...',
  suggestions: ['建议1', '建议2'],
  satisfactionChange: +10,            // 满意度变化
  trustChange: +5,                    // 信任度变化
  alignment: 75                       // 对齐度 0-100
}
```

---

### 3. scene-generator.js - 场景生成器

**核心功能：**
- ✅ AI动态生成场景（30%概率）
- ✅ 模板场景系统（8个预设场景）
- ✅ 条件触发系统
- ✅ 场景类型：挑战、事件、里程碑、危机
- ✅ 场景增强（奖励、目标、紧急度）

**主要方法：**

```javascript
// 初始化（传入AI引擎）
const generator = new SceneGenerator(aiEngine);

// 生成场景
const scene = await generator.generateScene(gameState, decisionHistory);

// 获取当前场景
const current = generator.getCurrentScene();

// 获取场景历史
const history = generator.getSceneHistory();

// 重置使用记录
generator.resetUsedScenes();

// 获取统计
const stats = generator.getStats();
```

**场景数据结构：**

```javascript
{
  id: 'startup_launch',
  type: 'challenge',                  // challenge/event/milestone/crisis
  title: '初创启动',
  description: '场景描述（150-200字）',
  challenge: '核心挑战说明',
  npcs: ['ceo', 'advisor'],           // 参与NPC
  npcDialogues: {                     // NPC对话
    ceo: 'CEO的话...',
    advisor: '顾问的话...'
  },
  hints: ['提示1', '提示2'],          // 策略提示
  difficulty: 'medium',               // easy/medium/hard
  timeLimit: 7,                       // 天数限制
  expectedImpact: {                   // 预期影响
    users: '+50-200',
    teamEnergy: '-5'
  },
  context: {                          // 上下文信息（自动添加）
    day: 1,
    phase: 'early',                   // early/growth/scale/mature
    urgency: 50                       // 紧急度 0-100
  },
  optionalGoals: [...],               // 可选目标
  rewards: {...}                      // 奖励预览
}
```

**场景触发条件：**

```javascript
{
  // 精确匹配
  day: 1,
  users: 0,

  // 比较运算
  users: '<500',
  budget: '>5000',

  // 范围匹配
  day: { min: 20, max: 40 },
  users: { min: 500, max: 5000 },

  // 百分比
  userTrust: '>60%',
  teamEnergy: '<30%'
}
```

---

## 🚀 快速开始

### 1. 基础使用

```javascript
// 初始化系统
const aiEngine = new AIDialogueEngine();           // Mock模式
const npcManager = new NPCManager();
const sceneGen = new SceneGenerator(aiEngine);

// 定义游戏状态
const gameState = {
  day: 1,
  users: 0,
  revenue: 0,
  budget: 10000,
  teamEnergy: 100,
  userTrust: 70,
  brandReputation: 60
};

// 生成场景
const scene = await sceneGen.generateScene(gameState, []);
console.log(scene.title);

// 用户输入
const userInput = "我想通过社交媒体营销获取用户";

// AI响应
const response = await aiEngine.sendMessage(userInput, gameState);
console.log(response.text);

// NPC反应
const action = {
  type: 'marketing',
  cost: 1000,
  users: 100,
  growthRate: 20
};
const reaction = npcManager.getReaction('ceo', action, gameState);
console.log(reaction.text);
```

### 2. 使用Real API

```javascript
// 设置API Key
const apiKey = 'your-anthropic-api-key';
const aiEngine = new AIDialogueEngine(apiKey);
const sceneGen = new SceneGenerator(aiEngine);

// 其他用法相同
const response = await aiEngine.sendMessage(userInput, gameState);
```

### 3. 完整对话流程

```javascript
// 1. 生成场景
const scene = await sceneGen.generateScene(gameState, history);

// 2. 显示场景和NPC对话
Object.entries(scene.npcDialogues).forEach(([role, dialogue]) => {
  console.log(`${role}: ${dialogue}`);
});

// 3. 用户输入策略
const strategy = "我选择手动推广到Reddit社区";

// 4. AI响应
const response = await aiEngine.sendMessage(strategy, gameState);

// 5. 更新游戏状态
if (response.resourceImpact) {
  gameState.teamEnergy += response.resourceImpact.teamEnergy || 0;
  gameState.userTrust += response.resourceImpact.userTrust || 0;
}

// 6. NPC反应
npcManager.updateSatisfaction(response.role,
  response.emotion === 'happy' ? 5 : -5
);

// 7. 角色切换
if (response.nextRole) {
  aiEngine.switchRole(response.nextRole);
}

// 8. 场景切换
if (response.sceneChange) {
  const newScene = await sceneGen.generateScene(gameState, history);
}
```

---

## 🎮 测试和演示

### 运行测试页面

```bash
# 在浏览器中打开
open test-ai-dialogue-system.html
```

**测试页面功能：**

1. **API Key设置**
   - 输入Claude API Key使用Real API
   - 留空使用Mock模式

2. **对话测试**
   - 输入策略或问题
   - 查看AI响应和建议
   - 观察情感变化

3. **场景生成**
   - 点击"生成新场景"
   - 查看场景描述和挑战
   - 观察NPC对话

4. **行动模拟**
   - 点击"模拟用户行动"
   - 查看NPC反应
   - 观察满意度变化

5. **状态监控**
   - 实时游戏状态
   - NPC满意度/信任度
   - 系统统计数据

---

## 🔧 集成到游戏

### 1. 引入文件

```html
<script src="ai-dialogue-engine.js"></script>
<script src="npc-system.js"></script>
<script src="scene-generator.js"></script>
```

### 2. 初始化系统

```javascript
class GrowthHackerGame {
  constructor(apiKey = null) {
    // 初始化AI系统
    this.aiEngine = new AIDialogueEngine(apiKey);
    this.npcManager = new NPCManager();
    this.sceneGenerator = new SceneGenerator(this.aiEngine);

    // 游戏状态
    this.gameState = {
      day: 1,
      users: 0,
      revenue: 0,
      budget: 10000,
      teamEnergy: 100,
      userTrust: 70,
      brandReputation: 60
    };

    // 决策历史
    this.decisionHistory = [];
  }

  async startNewDay() {
    this.gameState.day++;

    // 生成新场景
    const scene = await this.sceneGenerator.generateScene(
      this.gameState,
      this.decisionHistory
    );

    return scene;
  }

  async handleUserDecision(decision) {
    // AI响应
    const response = await this.aiEngine.sendMessage(
      decision,
      this.gameState
    );

    // 更新游戏状态
    this.updateGameState(response.resourceImpact);

    // 更新NPC
    this.updateNPCs(response);

    // 记录历史
    this.decisionHistory.push({
      decision: decision,
      response: response,
      gameState: { ...this.gameState },
      timestamp: Date.now()
    });

    return response;
  }

  updateGameState(impact) {
    if (!impact) return;

    Object.keys(impact).forEach(key => {
      if (this.gameState[key] !== undefined) {
        this.gameState[key] = Math.max(0, Math.min(100,
          this.gameState[key] + impact[key]
        ));
      }
    });
  }

  updateNPCs(response) {
    const satisfaction = {
      'happy': 5,
      'neutral': 0,
      'concerned': -3,
      'angry': -10
    }[response.emotion] || 0;

    this.npcManager.updateSatisfaction(response.role, satisfaction);
  }

  checkCrisis() {
    // 检查所有NPC的特殊事件
    const npcs = ['ceo', 'investor', 'cto', 'user'];

    for (const npc of npcs) {
      const event = this.npcManager.checkSpecialEvent(npc);
      if (event) {
        return event;
      }
    }

    return null;
  }
}
```

### 3. 使用示例

```javascript
// 创建游戏实例
const game = new GrowthHackerGame();  // Mock模式
// const game = new GrowthHackerGame('api-key');  // Real API

// 开始新一天
const scene = await game.startNewDay();
console.log(scene.title);
console.log(scene.description);

// 用户做决策
const decision = "我要做病毒营销活动";
const response = await game.handleUserDecision(decision);
console.log(response.text);
console.log(response.suggestions);

// 检查危机
const crisis = game.checkCrisis();
if (crisis) {
  console.log('危机:', crisis.title);
}

// 查看NPC状态
const npcStatus = game.npcManager.getStatusSummary();
console.log(npcStatus);
```

---

## 📊 性能优化

### 1. Mock模式优化

Mock模式完全离线运行，响应时间 < 100ms：

- 智能规则引擎
- 上下文感知响应
- 性格化对话生成
- 无需网络请求

### 2. API调用优化

使用Real API时的优化策略：

```javascript
// 1. 降级策略
async callAPI(input, context) {
  try {
    return await this.callClaudeAPI(input, context);
  } catch (error) {
    console.log('API失败，降级到Mock');
    return this.mockResponse(input, context);
  }
}

// 2. 对话历史限制
this.maxHistoryLength = 10;  // 只保存最近10轮

// 3. 混合模式
if (Math.random() < 0.3) {
  // 30%使用AI生成
  return await this.generateWithAI(gameState);
} else {
  // 70%使用模板
  return this.generateFromTemplate(gameState);
}
```

### 3. 缓存策略

```javascript
// 场景缓存
this.sceneCache = new Map();

generateScene(gameState) {
  const cacheKey = this.getStateCacheKey(gameState);

  if (this.sceneCache.has(cacheKey)) {
    return this.sceneCache.get(cacheKey);
  }

  const scene = this.doGenerateScene(gameState);
  this.sceneCache.set(cacheKey, scene);

  return scene;
}
```

---

## 🎨 自定义和扩展

### 1. 添加新NPC

```javascript
// 在npc-system.js中添加
this.npcs.newRole = {
  id: 'newRole',
  name: '新角色',
  emoji: '🎯',
  personality: 'analytical',
  concerns: ['metrics', 'data'],
  satisfaction: 70,
  trustLevel: 60,
  dialogueStyle: 'data-driven',
  patience: 50,
  traits: {
    ambition: 70,
    riskTolerance: 50,
    empathy: 60,
    analyticalThinking: 95
  }
};
```

### 2. 添加新场景模板

```javascript
// 在scene-generator.js的loadSceneTemplates()中添加
{
  id: 'new_scene',
  trigger: { users: '>1000', day: '>30' },
  type: 'event',
  title: '新场景标题',
  description: '场景描述...',
  challenge: '核心挑战...',
  npcs: ['advisor', 'ceo'],
  npcDialogues: {
    advisor: '顾问的话...',
    ceo: 'CEO的话...'
  },
  hints: ['提示1', '提示2', '提示3'],
  difficulty: 'medium',
  timeLimit: 7
}
```

### 3. 自定义对话风格

```javascript
// 在ai-dialogue-engine.js中修改
generateAdvisorResponse(input, context, analysis) {
  // 自定义顾问响应逻辑
  const customTemplate = {
    condition: true,
    text: `自定义对话文本...`,
    suggestions: ['自定义建议1', '自定义建议2'],
    emotion: 'neutral'
  };

  return {
    role: 'advisor',
    ...customTemplate
  };
}
```

### 4. 扩展场景类型

```javascript
// 添加新的场景类型
this.sceneWeights = {
  'challenge': 0.4,
  'event': 0.3,
  'milestone': 0.2,
  'crisis': 0.1,
  'tutorial': 0.05,    // 新增：教程场景
  'surprise': 0.05     // 新增：惊喜场景
};
```

---

## 🐛 调试和测试

### 1. 开启调试模式

```javascript
// 在浏览器控制台
localStorage.setItem('aiDebug', 'true');

// 查看详细日志
const response = await aiEngine.sendMessage(input, context);
console.log('Response:', response);
console.log('Stats:', aiEngine.getStats());
console.log('History:', aiEngine.exportHistory());
```

### 2. 测试场景

```javascript
// 测试所有场景触发
const testStates = [
  { day: 1, users: 0 },              // 初创启动
  { day: 30, users: 200 },           // 增长停滞
  { users: 1000, userTrust: 70 },    // 病毒机会
  { budget: 1500 },                  // 预算危机
  { teamEnergy: 25 },                // 团队崩溃
  { users: 12000 }                   // 1万里程碑
];

for (const state of testStates) {
  const scene = await sceneGen.generateScene(state, []);
  console.log(`${state.day || state.users}: ${scene.title}`);
}
```

### 3. 测试NPC反应

```javascript
// 测试不同行动的NPC反应
const actions = [
  { type: 'aggressive', cost: 5000, growthRate: 50, speed: 'fast' },
  { type: 'cautious', cost: 500, sustainable: true, quality: 'high' },
  { type: 'rushed', cost: 2000, techDebt: 'high', quality: 'low' }
];

for (const action of actions) {
  const reaction = npcManager.getReaction('ceo', action, gameState);
  console.log(`${action.type}: ${reaction.emotion} - ${reaction.text}`);
}
```

---

## 📚 API参考

### AIDialogueEngine

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `constructor(apiKey)` | `apiKey?: string` | `AIDialogueEngine` | 创建实例 |
| `sendMessage(input, context)` | `input: string, context: Object` | `Promise<Response>` | 发送消息 |
| `switchRole(role)` | `role: string` | `void` | 切换角色 |
| `clearHistory()` | - | `void` | 清空历史 |
| `getStats()` | - | `Object` | 获取统计 |
| `exportHistory()` | - | `Object` | 导出历史 |

### NPCManager

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `constructor()` | - | `NPCManager` | 创建实例 |
| `getNPC(role)` | `role: string` | `Object` | 获取NPC |
| `getReaction(role, action, context)` | `role: string, action: Object, context: Object` | `Reaction` | 获取反应 |
| `updateSatisfaction(role, change)` | `role: string, change: number` | `void` | 更新满意度 |
| `updateTrust(role, change)` | `role: string, change: number` | `void` | 更新信任度 |
| `checkSpecialEvent(role)` | `role: string` | `Event \| null` | 检查特殊事件 |
| `getStatusSummary()` | - | `Object` | 获取状态总结 |
| `reset(role)` | `role?: string` | `void` | 重置状态 |
| `getStats()` | - | `Object` | 获取统计 |

### SceneGenerator

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `constructor(aiEngine)` | `aiEngine?: AIDialogueEngine` | `SceneGenerator` | 创建实例 |
| `generateScene(state, history)` | `state: Object, history: Array` | `Promise<Scene>` | 生成场景 |
| `getCurrentScene()` | - | `Scene \| null` | 获取当前场景 |
| `getSceneHistory()` | - | `Array` | 获取历史 |
| `resetUsedScenes()` | - | `void` | 重置使用记录 |
| `getStats()` | - | `Object` | 获取统计 |

---

## ✅ 检查清单

开发完成检查：

- [x] AI对话引擎 - 支持双模式运行
- [x] NPC系统 - 5个角色完整实现
- [x] 场景生成器 - 8个预设场景
- [x] 对话历史管理
- [x] 情感系统
- [x] 角色切换
- [x] 场景触发系统
- [x] 满意度/信任度系统
- [x] 特殊事件触发
- [x] 完整测试页面
- [x] 详细文档
- [x] 错误处理
- [x] 性能优化

---

## 🎉 总结

这个AI对话系统提供了：

1. **灵活性** - 支持Real API和Mock双模式
2. **智能性** - 上下文感知、性格化对话
3. **可扩展性** - 易于添加新NPC、场景、对话
4. **可靠性** - 完善的错误处理和降级策略
5. **易用性** - 简单的API、详细的文档

立即体验：打开 `test-ai-dialogue-system.html` 开始测试！

---

**作者：** AI Integration Engineer
**版本：** 1.0.0
**更新日期：** 2026-02-12
