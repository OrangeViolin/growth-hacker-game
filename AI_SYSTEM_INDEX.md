# AI对话系统 - 文件索引

## 📁 项目文件结构

```
growth-hacker-game/
├── 核心系统文件
│   ├── ai-dialogue-engine.js          (26KB) - AI对话引擎
│   ├── npc-system.js                  (25KB) - NPC管理系统
│   └── scene-generator.js             (32KB) - 场景生成器
│
├── 测试和演示
│   └── test-ai-dialogue-system.html   (32KB) - 完整测试页面
│
└── 文档
    ├── AI_DIALOGUE_SYSTEM_README.md   (17KB) - 完整技术文档
    ├── AI_SYSTEM_QUICK_START.md       (8KB)  - 快速开始指南
    ├── AI_SYSTEM_SUMMARY.txt          (13KB) - 系统总结
    └── AI_SYSTEM_INDEX.md             (本文件) - 文件索引
```

## 🚀 快速导航

### 1. 我想立即测试
👉 打开 `test-ai-dialogue-system.html`

### 2. 我想快速上手
👉 阅读 `AI_SYSTEM_QUICK_START.md`

### 3. 我想了解技术细节
👉 阅读 `AI_DIALOGUE_SYSTEM_README.md`

### 4. 我想看系统总结
👉 查看 `AI_SYSTEM_SUMMARY.txt`

### 5. 我想直接使用代码
👉 引入三个核心JS文件即可

## 📦 文件详细说明

### 核心系统文件

#### 1. ai-dialogue-engine.js (26KB)
**AI对话引擎 - 系统核心**

- **功能**
  - 双模式运行（Real API / Mock）
  - 5种角色对话（advisor/ceo/investor/cto/user）
  - 上下文对话历史管理
  - 情感系统和建议生成
  - 智能规则引擎

- **主要类**
  - `AIDialogueEngine` - 对话引擎主类

- **关键方法**
  ```javascript
  new AIDialogueEngine(apiKey)
  sendMessage(input, context)
  switchRole(role)
  clearHistory()
  getStats()
  ```

- **使用场景**
  - 处理玩家输入
  - 生成AI响应
  - 管理对话流程
  - 角色切换控制

---

#### 2. npc-system.js (25KB)
**NPC管理系统 - 角色管理**

- **功能**
  - 5个NPC角色完整实现
  - 满意度/信任度/耐心系统
  - 性格化反应生成
  - 特殊事件触发
  - 对话模板系统

- **主要类**
  - `NPCManager` - NPC管理器主类

- **关键方法**
  ```javascript
  new NPCManager()
  getNPC(role)
  getReaction(role, action, context)
  updateSatisfaction(role, change)
  checkSpecialEvent(role)
  getStatusSummary()
  ```

- **使用场景**
  - 获取NPC信息
  - 生成NPC反应
  - 更新NPC状态
  - 检查危机事件

---

#### 3. scene-generator.js (32KB)
**场景生成器 - 内容生成**

- **功能**
  - AI动态场景生成
  - 8个预设场景模板
  - 条件触发系统
  - 4种场景类型
  - 难度和奖励系统

- **主要类**
  - `SceneGenerator` - 场景生成器主类

- **关键方法**
  ```javascript
  new SceneGenerator(aiEngine)
  generateScene(state, history)
  getCurrentScene()
  getSceneHistory()
  resetUsedScenes()
  ```

- **使用场景**
  - 生成新场景
  - 触发剧情事件
  - 管理场景流程
  - 追踪场景历史

---

### 测试和演示

#### 4. test-ai-dialogue-system.html (32KB)
**完整测试页面 - 可视化演示**

- **功能**
  - 完整UI界面
  - 实时对话测试
  - NPC状态监控
  - 场景生成演示
  - API Key设置
  - 统计数据展示

- **包含模块**
  - 游戏状态面板
  - AI对话面板
  - NPC状态面板
  - 场景展示面板
  - 控制按钮区

- **使用方法**
  1. 在浏览器中打开
  2. （可选）设置API Key
  3. 点击"生成新场景"
  4. 输入策略并发送
  5. 观察AI响应和NPC反应

- **适用人群**
  - 产品经理（查看功能演示）
  - 开发者（测试集成效果）
  - 设计师（查看UI展示）
  - 任何想快速了解系统的人

---

### 文档文件

#### 5. AI_DIALOGUE_SYSTEM_README.md (17KB)
**完整技术文档 - 开发者必读**

- **内容结构**
  1. 系统概述
  2. 文件说明（详细）
  3. 快速开始
  4. API参考手册
  5. 集成指南
  6. 性能优化
  7. 自定义扩展
  8. 调试和测试

- **适用人群**
  - 开发者
  - 技术经理
  - 需要深度集成的团队

---

#### 6. AI_SYSTEM_QUICK_START.md (8KB)
**快速开始指南 - 5分钟上手**

- **内容结构**
  1. 5分钟快速上手
  2. 文件说明（简明）
  3. 核心功能展示
  4. 常用示例代码
  5. 常见问题解答
  6. 下一步指引

- **适用人群**
  - 初次使用者
  - 需要快速了解的人
  - 寻找示例代码的开发者

---

#### 7. AI_SYSTEM_SUMMARY.txt (13KB)
**系统总结 - 快速参考**

- **内容结构**
  1. 文件列表
  2. 核心功能
  3. 快速开始
  4. 预设场景
  5. NPC角色详情
  6. 性能指标
  7. 集成示例
  8. 下一步

- **适用人群**
  - 需要快速了解系统的人
  - 查找参考资料的人
  - 做技术评估的人

---

#### 8. AI_SYSTEM_INDEX.md (本文件)
**文件索引 - 导航中心**

- **内容**
  - 文件结构
  - 快速导航
  - 详细说明
  - 使用流程

---

## 🎯 使用流程建议

### 新手流程
```
1. 阅读 AI_SYSTEM_SUMMARY.txt (5分钟)
   ↓
2. 打开 test-ai-dialogue-system.html (10分钟测试)
   ↓
3. 阅读 AI_SYSTEM_QUICK_START.md (10分钟)
   ↓
4. 开始集成到项目
```

### 开发者流程
```
1. 阅读 AI_SYSTEM_QUICK_START.md
   ↓
2. 查看 test-ai-dialogue-system.html 源代码
   ↓
3. 参考 AI_DIALOGUE_SYSTEM_README.md 的API手册
   ↓
4. 集成三个核心JS文件
   ↓
5. 根据需要查阅完整文档
```

### 产品经理流程
```
1. 阅读 AI_SYSTEM_SUMMARY.txt
   ↓
2. 打开 test-ai-dialogue-system.html 体验功能
   ↓
3. 查看预设场景列表
   ↓
4. 评估是否符合需求
```

---

## 📊 文件依赖关系

```
test-ai-dialogue-system.html
├── 依赖 → ai-dialogue-engine.js
├── 依赖 → npc-system.js
└── 依赖 → scene-generator.js
         └── 可选依赖 → ai-dialogue-engine.js
```

**说明：**
- `scene-generator.js` 可选依赖 `ai-dialogue-engine.js`（用于AI生成场景）
- 三个核心文件互相独立，可单独使用
- 测试页面需要引入全部三个核心文件

---

## 🔍 按需查找

### 我想了解...

#### ...如何初始化系统？
👉 `AI_SYSTEM_QUICK_START.md` - 第2节"基础集成"

#### ...API有哪些方法？
👉 `AI_DIALOGUE_SYSTEM_README.md` - 第9节"API参考"

#### ...如何添加新NPC？
👉 `AI_DIALOGUE_SYSTEM_README.md` - 第8节"自定义和扩展"

#### ...Mock和Real API的区别？
👉 `AI_SYSTEM_QUICK_START.md` - 第7节"配置选项"

#### ...预设了哪些场景？
👉 `AI_SYSTEM_SUMMARY.txt` - "预设场景列表"部分

#### ...性能如何？
👉 `AI_SYSTEM_SUMMARY.txt` - "性能指标"部分

#### ...如何集成到游戏？
👉 `AI_DIALOGUE_SYSTEM_README.md` - 第5节"集成到游戏"

#### ...有完整示例吗？
👉 `test-ai-dialogue-system.html` 或 `AI_SYSTEM_QUICK_START.md` 第4节

---

## 💡 学习路径推荐

### 路径1：快速体验（15分钟）
1. 打开 `test-ai-dialogue-system.html`
2. 点击按钮测试功能
3. 阅读 `AI_SYSTEM_SUMMARY.txt`

### 路径2：开发集成（1小时）
1. 阅读 `AI_SYSTEM_QUICK_START.md`
2. 查看 `test-ai-dialogue-system.html` 源代码
3. 复制示例代码到项目
4. 参考 `AI_DIALOGUE_SYSTEM_README.md` 调整

### 路径3：深度学习（3小时）
1. 完整阅读 `AI_DIALOGUE_SYSTEM_README.md`
2. 研究三个核心JS文件源代码
3. 测试所有功能
4. 尝试自定义扩展

---

## 📞 技术支持

### 问题排查顺序
1. 查看 `AI_SYSTEM_QUICK_START.md` 的"常见问题"
2. 查看 `AI_DIALOGUE_SYSTEM_README.md` 的"调试和测试"
3. 检查浏览器控制台错误信息
4. 查看源代码注释

### 常见问题快速链接
- Mock模式不工作？→ 检查是否正确引入JS文件
- API调用失败？→ 检查API Key和网络连接
- NPC反应不对？→ 检查传入的action对象格式
- 场景不触发？→ 检查gameState是否满足触发条件

---

## ✅ 检查清单

### 文件完整性
- [x] ai-dialogue-engine.js (26KB)
- [x] npc-system.js (25KB)
- [x] scene-generator.js (32KB)
- [x] test-ai-dialogue-system.html (32KB)
- [x] AI_DIALOGUE_SYSTEM_README.md (17KB)
- [x] AI_SYSTEM_QUICK_START.md (8KB)
- [x] AI_SYSTEM_SUMMARY.txt (13KB)
- [x] AI_SYSTEM_INDEX.md (本文件)

### 功能完整性
- [x] AI对话引擎（双模式）
- [x] 5个NPC角色
- [x] 8个预设场景
- [x] 情感系统
- [x] 满意度系统
- [x] 场景触发系统
- [x] 测试页面
- [x] 完整文档

---

## 🎉 开始使用

选择你的起点：

1. **我想立即看效果** → 打开 `test-ai-dialogue-system.html`
2. **我想快速集成** → 阅读 `AI_SYSTEM_QUICK_START.md`
3. **我想深入学习** → 阅读 `AI_DIALOGUE_SYSTEM_README.md`
4. **我想了解概况** → 查看 `AI_SYSTEM_SUMMARY.txt`

---

**版本：** 1.0.0
**更新：** 2026-02-12
**作者：** AI Integration Engineer
