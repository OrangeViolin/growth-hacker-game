# 🚀 一键生成游戏 - 独立超级Prompt（V2）

## ⚠️ 重要说明

**这是完全独立的生成模板，不依赖任何现有游戏代码！**

---

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
└── ... (100+个skills)
```

### 步骤2：复制下面的超级Prompt
把【skill文件夹路径】替换成你的实际路径

### 步骤3：粘贴给Claude Code
等待10-15分钟，游戏自动生成完成！

---

## 🎯 超级Prompt V2（完全独立版）

```
【替换这里为你的skill文件夹路径，例如：/Users/mac/Documents/精益创业-output/】

## 核心要求

⚠️ **重要：请从零开始生成所有代码，不要参考或复用任何现有游戏！**

我想基于这个skill文件夹生成一个完整的学习游戏。

---

## 第一步：分析Skill文件夹

1. 读取所有SKILL.md文件，提取关键信息：
   - 技能名称
   - 适用场景
   - 执行步骤
   - 注意事项/约束条件

2. 选择10个最适合做游戏的skills：
   - 有明确决策场景的
   - 有清晰步骤的
   - 有对错标准的
   - 难度递进的

3. 告诉我选择了哪10个skills及理由

---

## 第二步：设计游戏框架

### 游戏类型
**情境模拟闯关游戏**

### 核心玩法
1. **场景化学习**
   - 每关设定一个真实场景
   - 玩家需要做出正确决策
   - 基于书中的知识判断对错

2. **时间压力机制**
   - 每关有时间限制（根据场景设定，如30分钟-3小时）
   - 实时倒计时显示
   - 超时则失败

3. **资源管理系统**
   - 时间（主资源，倒计时）
   - 精力（执行行动消耗）
   - 信任（错误选择会降低）
   - 其他资源（根据书籍主题定制）

4. **多步决策**
   - 每关提供6-8个行动选项
   - 每个行动消耗时间和资源
   - 2-3个是关键行动（必须完成）
   - 3-4个是辅助行动（有帮助但非必需）
   - 1-2个是陷阱行动（浪费时间）

5. **知识问答**
   - 完成调查后进入问答环节
   - NPC（根据场景设定）提出2-3个问题
   - 每题4个选项
   - 必须基于行动中收集的信息回答
   - 正确率≥66%通过

### 成功/失败判定
- **成功条件**：
  - 在时间内完成关键行动
  - 问答正确率≥66%
  - 关键资源未耗尽

- **失败条件**：
  - 时间耗尽
  - 问答正确率<66%
  - 关键资源耗尽

---

## 第三步：UI设计规范

### 配色方案
```css
/* 深色主题 */
--bg-primary: linear-gradient(135deg, #0F172A 0%, #020617 100%);
--bg-card: linear-gradient(135deg, #1E293B 0%, #0F172A 100%);

/* 主题色 */
--color-primary: #A855F7;      /* 紫色 - 主色调 */
--color-secondary: #06B6D4;    /* 青色 - 信息 */
--color-success: #10B981;      /* 绿色 - 成功 */
--color-warning: #F59E0B;      /* 橙色 - 警告 */
--color-danger: #EF4444;       /* 红色 - 危险 */

/* 文字色 */
--text-primary: #E2E8F0;
--text-secondary: #CBD5E1;
--text-muted: #94A3B8;
```

### 卡片样式
```css
.card {
    background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%);
    border: 2px solid #475569;
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 4px 20px rgba(168, 85, 247, 0.1);
}
```

### 按钮样式
```css
.button {
    background: linear-gradient(135deg, #334155 0%, #1E293B 100%);
    border: 2px solid #475569;
    border-radius: 12px;
    padding: 20px;
    color: #E2E8F0;
    transition: all 0.3s ease;
    cursor: pointer;
}

.button:hover {
    border-color: #A855F7;
    transform: scale(0.98);
    box-shadow: 0 0 30px rgba(168, 85, 247, 0.5);
}
```

### 动画效果
```css
/* 快速交互 */
transition: all 0.3s ease;

/* 弹窗出现 */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes zoomIn {
    from { transform: scale(0.5); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
}

/* 数字滚动 */
使用CountUp.js或自定义动画，持续0.8秒

/* 进度条 */
transition: width 0.5s ease;
```

### 移动端适配
```css
/* 手机（480px以下） */
@media (max-width: 480px) {
    body { font-size: 14px; }
    .card { padding: 15px; }
    .button { min-height: 44px; } /* iOS推荐 */
}

/* 平板（768px以下） */
@media (max-width: 768px) {
    body { font-size: 15px; }
    /* 单列布局 */
}
```

---

## 第四步：关卡设计模板

### 每个关卡包含

#### 1. 基本信息
```javascript
{
    id: 1,
    title: "【基于skill的关卡标题】",
    objective: "【任务目标，基于skill的使用场景】",
    timeLimit: 【时间限制，单位：分钟】,
}
```

#### 2. 场景描述（HOOK法则）
```javascript
scene: {
    time: "【具体时间，如：星期一，早上9:17】",
    text: `
【500-800字的场景描述，必须包含】：

1. HOOK（钩子）- 开场吸引注意
   - 突发事件
   - 紧急情况
   - 关键时刻

2. CONTEXT（情境）- 提供信息
   - 3-5个关键数据/事实
   - 现场环境描述
   - 相关人物介绍

3. CHALLENGE（挑战）- 引入压力
   - 明确的任务目标
   - 严格的时间限制
   - 明确的失败后果

4. CHOICE（选择）- 行动提示
   - "现在是XX:XX，你有X小时X分钟"
   - "选择你的行动..."
    `
}
```

#### 3. 行动选项设计（6-8个）
```javascript
actions: [
    // 关键行动（2-3个，必须完成）
    {
        id: "critical-1",
        name: "【基于skill核心方法的行动名称】",
        desc: "【简短描述，10-30字】",
        time: 【消耗时间，分钟】,
        value: 5,  // 价值星级
        critical: true,
        feedback: `【200-400字详细反馈】

你执行了【skill名称】中的【具体方法】...

【发现的数据/信息】
- 数据点1：【具体内容】
- 数据点2：【具体内容】
- 数据点3：【具体内容】

【基于skill理论的分析】
根据【skill核心概念】，这些数据说明...

【关键洞察】
【引用skill的输出结果/最佳实践】
        `
    },

    // 辅助行动（3-4个，有帮助但非必需）
    {
        id: "useful-1",
        name: "【次要方法】",
        desc: "【描述】",
        time: 【时间】,
        value: 3,
        critical: false,
        feedback: "【150-300字，提供辅助信息】"
    },

    // 陷阱行动（1-2个，浪费时间）
    {
        id: "trap-1",
        name: "【看似有用实则无效的行动】",
        desc: "【迷惑性描述】",
        time: 【较长时间】,
        value: 1,
        critical: false,
        feedback: `【100-200字】

你花了XX分钟做了【无用的事】...

【问题所在】
这违反了【skill约束条件/常见错误】

【教训】
【基于skill理论说明为什么错误】
        `
    }
]
```

#### 4. 对话问题设计（2-3个）
```javascript
questions: [
    {
        npc: "【NPC名称，基于场景设定】",
        question: "【基于skill核心概念的问题】",
        options: [
            {
                text: "【基于数据的正确答案】",
                correct: true,
                feedback: `✅ 正确！

【数据支撑】
通过【行动名称】你发现：
- 【关键数据1】
- 【关键数据2】

【逻辑推理】
根据【skill理论】，【推理过程】

【关键洞察】
【引用skill最佳实践】

【NPC反应】
【基于场景的正面反馈】
                `
            },
            {
                text: "【凭感觉的错误答案】",
                correct: false,
                feedback: `❌ 错误！

【问题所在】
这违反了【skill核心原则】

【数据反驳】
如果做了【关键行动】，会发现：
- 【反驳数据】

【正确做法】
应该【基于skill的正确方法】
                `
            },
            // 另外2个错误选项...
        ]
    }
]
```

#### 5. 成功/失败文本
```javascript
// ⚠️ 重要：所有文本必须基于当前书籍/skill的主题

successText: {
    perfect: `【庆祝emoji】完美！

你在【用时】内成功完成了【任务】！

对话表现：【X/Y】题全对

你展现了：
✓ 【能力1，基于skill】
✓ 【能力2，基于skill】
✓ 【能力3，基于skill】

【NPC评价，基于场景】

【奖励/结果】
    `,

    pass: `通过！但有待提高。

对话表现：【X/Y】题正确

【NPC评价，略显犹豫】

⚠️ 【改进建议】
    `
},

failText: {
    timeout: `⏰ 时间到！

【基于场景的时间耗尽后果】

【NPC/旁白描述失败情况】

【具体后果】
    `,

    wrongAnswers: `失败！

对话表现：【X/Y】题正确

失败原因：
1. 【原因1，基于skill】
2. 【原因2，基于skill】

【NPC失望评价，基于场景】

【后果描述】

🔄 重新挑战？
    `
}
```

---

## 第五步：生成文件清单

请在一个新文件夹中生成以下文件：

### 1. index.html（主菜单）
```html
包含：
- 游戏标题（基于书名）
- 开始游戏按钮
- 关卡选择界面（显示10关）
- 进度统计
- 简单的CSS和JS（可以内联）
```

### 2. game.html（游戏主页面）
```html
包含：
- 完整的HTML结构
- 所有CSS样式（内联）
- 完整的JavaScript游戏逻辑（内联）
- 资源系统
- 倒计时系统
- 行动选择系统
- 对话系统
- 移动端适配
```

### 3. levels-data.js（关卡配置）
```javascript
const LEVELS_DATA = [
    // 从skills生成的10个关卡
    // 每个关卡完整包含：
    // - 基本信息
    // - 场景描述
    // - 行动选项（6-8个）
    // - 问题（2-3个，每题4选项）
    // - 成功/失败文本
];
```

### 4. README.md（游戏说明）
```markdown
# 【书名】学习游戏

基于《【书名】》生成的互动式学习游戏。

## 游戏介绍
...

## 10关预览
...

## 如何玩
...

## 部署
...
```

---

## 第六步：质量检查

生成后请自动检查：

### 内容质量
- [ ] 所有场景描述500-800字
- [ ] 所有行动反馈200-400字
- [ ] 所有问题反馈100-300字
- [ ] 所有内容基于skill的真实案例
- [ ] **没有任何其他领域的残留文本**

### 文本一致性检查（⚠️ 极其重要）
请检查整个代码中的所有文本，确保：

❌ **绝对不能出现的内容**（如果出现，必须删除/替换）：
- 商业术语：投资人、用户、产品、服务器、融资、数据泄露
- 技术术语：代码、API、数据库、服务器
- 职位名称：CEO、CTO、增长负责人
- 其他书籍的特定术语

✅ **必须基于当前skill主题**：
- NPC名称应该基于场景（医生、家人、朋友、教练等）
- 评价应该基于skill能力（急救知识、操作技能等）
- 后果应该基于场景（健康、安全、关系等）

### 代码质量
- [ ] 所有JavaScript函数完整
- [ ] 资源系统正常工作
- [ ] 倒计时准确
- [ ] 对话系统流畅
- [ ] 移动端适配
- [ ] 无console错误

### 用户体验
- [ ] 首次玩能看懂
- [ ] 失败时能理解原因
- [ ] 成功时有成就感
- [ ] 动画流畅
- [ ] 响应快速

---

## 第七步：提供使用说明

生成完成后，告诉我：

```markdown
✅ 游戏生成完成！

## 选择的10个Skills
1. 【skill名称】 - 【理由】
2. ...

## 文件清单
- index.html (XXkB)
- game.html (XXkB)
- levels-data.js (XXkB)
- README.md

## 快速测试
```bash
# 在浏览器中打开
open index.html
```

## 部署到GitHub Pages
```bash
git init
git add .
git commit -m "Add game"
gh repo create 游戏名 --public
git push origin main
# 在GitHub仓库设置中启用Pages
```

## 在线地址
https://[username].github.io/[repo-name]/
```

---

## ⚠️ 最重要的要求

1. **完全独立生成**：不要参考、复用、修改任何现有游戏代码
2. **从零开始**：手写所有HTML、CSS、JavaScript
3. **内容一致性**：所有文本必须基于当前skill主题，绝对不能有其他领域的残留
4. **场景化**：每个关卡都是一个真实、生动的场景
5. **教学性**：玩家能从游戏中学到书中的真实知识

---

现在开始执行吧！🚀
```

---

## 📝 使用示例

### 示例：精益创业
```
/Users/mac/Documents/精益创业-output/

【粘贴完整的超级Prompt V2】
```

### 示例：零售的哲学
```
/Users/mac/Documents/零售的哲学-output/

【粘贴完整的超级Prompt V2】
```

---

## ✅ 成功标准

生成完成后，你应该得到：
- ✅ 完全独立的游戏代码
- ✅ 所有文本基于skill主题
- ✅ 没有任何其他领域的残留
- ✅ 可直接运行的HTML文件
- ✅ 移动端完美适配

---

**这是完全独立的生成模板，确保游戏内容100%基于你的书籍！** 🎮
