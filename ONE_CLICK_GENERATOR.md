# 🚀 一键生成游戏 - 超级Prompt模板

## 📋 使用流程（3步）

### 步骤1：准备Skill文件夹
```bash
# 使用 pdf2skill 工具转换书籍
pdf2skill [你的书籍.pdf]

# 生成的文件夹结构：
书籍名称-output/
├── index.md              # 总索引
├── skill-1/
│   ├── SKILL.md         # 技能描述
│   └── references/      # 参考资料
├── skill-2/
├── skill-3/
└── ... (100+个skills)
```

### 步骤2：复制下面的超级Prompt
把【skill文件夹路径】替换成你的实际路径

### 步骤3：粘贴给Claude Code
等待5-10分钟，游戏自动生成完成！

---

## 🎯 超级Prompt模板（复制粘贴即可）

```
【替换这里为你的skill文件夹路径，例如：/Users/mac/Documents/精益创业-output/】

我想基于这个skill文件夹生成一个完整的闯关游戏，帮助用户学习这本书的知识。

## 游戏要求

### 核心玩法
1. **时间压力型闯关游戏**
   - 10个关卡，每关3小时（游戏内时间）
   - 实时倒计时，超时失败
   - 资源管理（现金、时间、精力、信任、声誉）

2. **多步决策机制**
   - 每关提供6-8个行动选项
   - 每个行动消耗时间和资源
   - 必须完成2-3个关键行动才能回答问题
   - 陷阱行动（浪费时间但无价值）

3. **对话评分系统**
   - 完成调查后进入对话环节
   - NPC提出2-3个问题
   - 4选1单选题
   - 必须基于收集的数据回答
   - 正确率≥66%通过

### UI风格（完全复制 growth-hacker-game）

#### 配色方案（暗色赛博朋克风格）
```css
/* 背景色 */
background: linear-gradient(135deg, #0F172A 0%, #020617 100%);

/* 主题色 */
--accent-primary: #A855F7;    /* 紫色 - 标题、按钮 */
--accent-secondary: #06B6D4;  /* 青色 - 信息、提示 */
--accent-success: #10B981;    /* 绿色 - 成功 */
--accent-warning: #F59E0B;    /* 橙色 - 警告 */
--accent-danger: #EF4444;     /* 红色 - 危险 */
--accent-gold: #FFD700;       /* 金色 - 资源 */

/* 卡片样式 */
.card {
    background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%);
    border: 2px solid #475569;
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 4px 20px rgba(168, 85, 247, 0.1);
}

/* 按钮交互 */
.btn:hover {
    transform: scale(0.98);
    border-color: #A855F7;
    box-shadow: 0 0 30px rgba(168, 85, 247, 0.5);
}
```

#### 动画效果
```css
/* 快速交互 */
transition: all 0.3s ease;

/* 弹窗出现 */
animation: fadeIn 0.3s, zoomIn 0.5s;

/* 数字滚动 */
CountUp动画，持续0.8秒

/* 进度条 */
transition: width 0.5s ease;

/* 闪烁警告 */
@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
}
```

### 资源系统配置
```javascript
const RESOURCES = {
    cash: {
        name: '现金',
        icon: '💰',
        initial: 10000,
        max: 100000,
        critical: 1000,
        color: '#FFD700'
    },
    time: {
        name: '时间',
        icon: '⏱️',
        initial: 180,  // 分钟
        max: 480,
        critical: 30,
        color: '#F59E0B'
    },
    energy: {
        name: '精力',
        icon: '⚡',
        initial: 100,
        max: 100,
        critical: 20,
        color: '#06B6D4'
    },
    trust: {
        name: '信任',
        icon: '🤝',
        initial: 80,
        max: 100,
        critical: 30,
        color: '#10B981'
    },
    reputation: {
        name: '声誉',
        icon: '⭐',
        initial: 60,
        max: 100,
        critical: 20,
        color: '#A855F7'
    }
};
```

### 移动端适配
```css
/* 手机（480px以下） */
- 单列布局
- 按钮最小44px高度
- 字体14px
- 间距缩小为15px

/* 平板（768px以下） */
- 侧边栏移到下方
- 字体15px

/* 横屏优化 */
- 弹窗max-height: 85vh
- 滚动支持
```

---

## 执行要求

### 第一步：分析Skill文件夹

请执行以下操作：

1. **读取所有skill文件夹**
   ```bash
   遍历指定路径下的所有子文件夹
   找到所有SKILL.md文件
   解析每个skill的内容
   ```

2. **提取关键信息**
   从每个SKILL.md中提取：
   - 技能名称（name）
   - 使用场景（何时使用）
   - 核心方法/步骤
   - 案例研究（references/文件夹中的案例）
   - 常见错误
   - 约束条件

3. **选择10个最适合做游戏的skills**
   优先选择：
   - 有明确决策场景的
   - 有真实案例的
   - 有对错标准的
   - 难度递进的

### 第二步：设计10个关卡

基于选中的10个skills，生成关卡配置：

#### 关卡设计模板（HOOK法则）

每个关卡包含：

**1. HOOK（钩子）- 吸引注意**
```javascript
scene: {
    time: "星期一，早上9:17",
    text: `
你的手机响了三次。是CEO Sarah。

"会议室，现在。Tom（投资人）也在。"

你快步走进去，白板上用红笔写着：
昨晚8点：10,000人
今早8点：5,000人（-50%）
当前流失速度：15%/天

Tom看起来很焦虑："【引用skill中的真实场景】"

【基于skill案例的具体数据】

【NPC对话，制造紧迫感】

现在是9:20，你有2小时40分钟准备。
    `
}
```

**2. CONTEXT（情境）- 提供信息**
- 基于skill的案例提供3-5个关键数据
- 设定资源初始值
- 明确时间限制

**3. CHALLENGE（挑战）- 引入压力**
- 基于skill的"何时使用"设定挑战
- 明确失败后果
- 设定成功标准

**4. CHOICE（选择）- 行动选项**

设计6-8个行动选项：

```javascript
actions: [
    // 2-3个关键行动（基于skill的核心方法）
    {
        id: "critical-1",
        name: "👥 【基于skill方法的行动名称】",
        desc: "【简短描述，来自skill内容】",
        time: 40,
        value: 5,
        critical: true,
        feedback: `【200-400字详细反馈】

你执行了【skill名称】中的【具体方法】...

【发现的数据】
- 数据点1：【具体数字】
- 数据点2：【具体数字】
- 数据点3：【具体数字】

【基于skill理论的分析】
根据【skill核心概念】，这些数据说明...

【关键洞察】
【引用skill的输出结果/最佳实践】
        `
    },

    // 3-4个有用但非关键的行动
    {
        id: "useful-1",
        name: "💰 【次要方法】",
        desc: "【描述】",
        time: 30,
        value: 3,
        critical: false,
        feedback: "【150-300字反馈，提供辅助信息】"
    },

    // 1-2个陷阱行动（skill中的常见错误）
    {
        id: "trap-1",
        name: "📄 【看似有用实则浪费时间的行动】",
        desc: "【迷惑性描述】",
        time: 90,
        value: 1,
        critical: false,
        feedback: `【100-200字反馈】

你花了90分钟做了【无用的事】...

【问题所在】
这是skill中提到的典型错误：【引用skill约束条件】

【教训】
【基于skill理论说明为什么这是错误的】
        `
    }
]
```

**5. 对话问题设计**

基于skill的核心概念，设计2-3个问题：

```javascript
questions: [
    {
        question: "【NPC名称】：\"【基于skill的核心问题】\"",
        options: [
            {
                text: "【基于数据的正确答案，引用skill方法】",
                correct: true,
                feedback: `✅ 正确！

【数据支撑】
你通过【行动名称】发现：
【列出关键数据】

【逻辑推理】
根据【skill理论】，【推理过程】

【关键洞察】
【引用skill的最佳实践/输出结果】

【NPC反应】
"很好，你掌握了【skill名称】的精髓！"
                `
            },
            {
                text: "【凭感觉的错误答案】",
                correct: false,
                feedback: `❌ 错误！

【问题所在】
这违反了【skill名称】的【核心原则】

【数据反驳】
如果你做了【关键行动】，会发现：
【列出关键数据】

【正确做法】
根据【skill理论】，应该【正确方法】
                `
            },
            // 另外2个错误选项...
        ]
    }
]
```

### 第三步：生成所有代码文件

请一次性生成以下文件：

#### 1. index.html（主菜单）
```html
包含：
- 游戏标题（基于书名）
- 开始游戏按钮
- 关卡选择（显示10个关卡）
- 进度统计
- 成就收藏
```

#### 2. crisis-mission.html（游戏主页面）
```html
包含：
- 完整的HTML结构
- 所有CSS样式（内联）
- 完整的JavaScript游戏逻辑
- 资源系统UI
- 事件系统
- 新手引导
- 移动端适配
```

#### 3. levels-data.js（关卡配置）
```javascript
const LEVELS_DATA = [
    // 从skills生成的10个关卡
    {
        id: 1,
        title: "⚠️ 关卡 #1：【基于skill场景的标题】",
        objective: "🎯 任务目标：【基于skill的目标】",
        details: "【详细说明】",
        timeLimit: 180,
        scene: { ... },
        actions: [ ... ],
        questions: [ ... ]
    },
    // ... 关卡2-10
];
```

#### 4. resource-system.js（资源管理）
```javascript
// 完整的ResourceSystem类
// 完整的ResourceUI类
// 包含所有资源逻辑和UI渲染
```

#### 5. event-system.js（随机事件）
```javascript
// 完整的EventSystem类
// 完整的EventUI类
// 基于skill生成10个随机事件
```

#### 6. onboarding.js（新手引导）
```javascript
// 完整的OnboardingSystem
// 6步引导流程
```

#### 7. elegant-game.css（样式文件，可选）
```css
// 所有样式提取到独立文件
// 方便后续修改主题
```

#### 8. README.md（游戏说明）
```markdown
# 【书名】学习游戏

基于《【书名】》自动生成的互动式学习游戏。

## 如何玩
...

## 技术栈
...

## 部署
...
```

### 第四步：验证和测试

生成完成后，请：

1. **验证文件完整性**
   ```bash
   检查所有文件是否生成
   检查文件大小是否合理
   ```

2. **代码质量检查**
   ```javascript
   - 所有函数是否定义
   - 事件监听器是否绑定
   - 资源系统是否初始化
   - 关卡数据是否完整
   ```

3. **内容质量检查**
   ```markdown
   - 场景描述是否生动（500-800字）
   - 反馈文本是否详细（200-400字）
   - 问题是否基于skill核心概念
   - 数据是否真实可信
   ```

### 第五步：提供使用说明

生成完成后，告诉我：

```markdown
✅ 游戏生成完成！

## 文件清单
- index.html (12KB)
- crisis-mission.html (68KB)
- levels-data.js (102KB, 10个关卡)
- resource-system.js (17KB)
- event-system.js (28KB)
- onboarding.js (19KB)
- README.md

## 快速测试
1. 打开 index.html（在浏览器中）
2. 点击"开始游戏"
3. 体验第一关

## 部署到GitHub Pages
【提供部署命令】

## 在线地址
【提供预期的GitHub Pages地址】
```

---

## 质量标准

### 内容质量
- ✅ 每个关卡场景描述：500-800字，生动有画面感
- ✅ 每个行动反馈：200-400字，包含数据+分析+洞察
- ✅ 每个问题反馈：100-300字，解释为什么对/错
- ✅ 所有内容基于skill的真实案例和理论
- ✅ 难度递进：关卡1-3简单，4-6中等，7-10困难

### 代码质量
- ✅ 所有JavaScript函数完整可用
- ✅ 资源系统正常工作
- ✅ 倒计时准确
- ✅ 对话系统流畅
- ✅ 移动端完美适配
- ✅ 无console错误

### 用户体验
- ✅ 首次玩有新手引导
- ✅ 失败时能理解原因
- ✅ 成功时有成就感
- ✅ 动画流畅不卡顿
- ✅ 响应快速（<100ms）

---

## 开始生成

现在，请基于我提供的skill文件夹路径，一次性生成完整的游戏。

生成时请：
1. 先告诉我读取到了多少个skills
2. 列出你选择的10个skills及选择理由
3. 逐个生成文件，每个文件生成后告诉我
4. 最后提供完整的使用说明

开始吧！🚀
```

---

## 📝 使用示例

### 示例1：精益创业
```
/Users/mac/Documents/精益创业-output/

我想基于这个skill文件夹生成一个完整的闯关游戏...
【粘贴完整的超级Prompt】
```

### 示例2：零售的哲学
```
/Users/mac/Documents/零售的哲学-output/

我想基于这个skill文件夹生成一个完整的闯关游戏...
【粘贴完整的超级Prompt】
```

---

## ⏱️ 预计耗时

- **AI生成时间**：5-10分钟
- **人工验证**：5-10分钟
- **总计**：10-20分钟

---

## 🎯 成功标准

生成完成后，你应该得到：
- ✅ 可直接打开的index.html
- ✅ 10个完整可玩的关卡
- ✅ 完全复制growth-hacker-game的UI和体验
- ✅ 移动端完美适配
- ✅ 可直接部署到GitHub Pages

---

## 🔧 后续优化（可选）

生成基础版本后，可以继续添加：
- 成就系统
- 技能树
- AI导师模式
- 多难度选择
- 数据统计

但建议先确保基础版本完美运行！

---

**复制上面的超级Prompt，替换skill路径，粘贴给Claude Code，等待10分钟，游戏自动生成！** 🎮
