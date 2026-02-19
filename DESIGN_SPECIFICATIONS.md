# 🎨 设计规范 - 所有参数配置表

## 📋 目录
- [颜色系统](#颜色系统)
- [排版系统](#排版系统)
- [间距系统](#间距系统)
- [动画系统](#动画系统)
- [组件规范](#组件规范)
- [响应式断点](#响应式断点)
- [游戏参数](#游戏参数)

---

## 🎨 颜色系统

### 主题色（完全复制）
```css
/* 背景色 */
--bg-primary: linear-gradient(135deg, #0F172A 0%, #020617 100%);
--bg-secondary: linear-gradient(135deg, #1E293B 0%, #0F172A 100%);
--bg-tertiary: linear-gradient(135deg, #334155 0%, #1E293B 100%);

/* 强调色 */
--accent-primary: #A855F7;    /* 紫色 - 标题、按钮、重要元素 */
--accent-secondary: #06B6D4;  /* 青色 - 信息、提示 */
--accent-success: #10B981;    /* 绿色 - 成功、正确 */
--accent-warning: #F59E0B;    /* 橙色 - 警告、时间 */
--accent-danger: #EF4444;     /* 红色 - 危险、错误 */
--accent-gold: #FFD700;       /* 金色 - 资源、成就 */

/* 文字色 */
--text-primary: #E2E8F0;      /* 主文字 - 白色偏灰 */
--text-secondary: #CBD5E1;    /* 次要文字 */
--text-tertiary: #94A3B8;     /* 辅助文字 */
--text-disabled: #64748B;     /* 禁用文字 */

/* 边框色 */
--border-primary: #475569;    /* 主边框 */
--border-secondary: #334155;  /* 次要边框 */
--border-accent: #A855F7;     /* 强调边框 */

/* 资源颜色（进度条） */
--resource-cash: #FFD700;     /* 现金 - 金色 */
--resource-time: #F59E0B;     /* 时间 - 橙色 */
--resource-energy: #06B6D4;   /* 精力 - 青色 */
--resource-trust: #10B981;    /* 信任 - 绿色 */
--resource-reputation: #A855F7; /* 声誉 - 紫色 */
```

### 颜色使用规则
```css
/* 卡片背景 */
background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%);

/* 卡片边框 */
border: 2px solid #475569;

/* hover时边框 */
border-color: #A855F7;

/* 发光效果 */
box-shadow: 0 0 30px rgba(168, 85, 247, 0.5);

/* 成功状态 */
border-color: #10B981;
box-shadow: 0 0 30px rgba(16, 185, 129, 0.6);

/* 危险状态 */
border-color: #EF4444;
box-shadow: 0 0 30px rgba(239, 68, 68, 0.6);
```

---

## 📝 排版系统

### 字体族
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
             'Helvetica Neue', Arial, sans-serif;
```

### 字号系统
```css
/* 标题 */
--font-size-h1: 1.8em;   /* 页面主标题 */
--font-size-h2: 1.5em;   /* 区块标题 */
--font-size-h3: 1.3em;   /* 卡片标题 */
--font-size-h4: 1.1em;   /* 小标题 */

/* 正文 */
--font-size-body: 1em;     /* 正文（16px基准） */
--font-size-small: 0.9em;  /* 小字 */
--font-size-tiny: 0.85em;  /* 更小 */
--font-size-mini: 0.8em;   /* 最小 */

/* 特殊 */
--font-size-stat: 1.8em;   /* 统计数字 */
--font-size-result: 3em;   /* 结果标题 */
--font-size-icon: 5em;     /* 大图标 */
```

### 字重
```css
--font-weight-normal: 400;
--font-weight-medium: 600;
--font-weight-bold: 700;
--font-weight-black: 800;
```

### 行高
```css
--line-height-tight: 1.3;
--line-height-normal: 1.6;
--line-height-relaxed: 1.8;
```

### 字间距
```css
--letter-spacing-tight: 1px;
--letter-spacing-normal: 2px;
--letter-spacing-wide: 3px;
```

### 实际应用
```css
/* 页面主标题 */
.mission-title {
    font-size: 1.8em;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
}

/* 正文 */
body {
    font-size: 16px;
    line-height: 1.6;
}

/* 场景描述 */
.scene-text {
    line-height: 1.8;
    white-space: pre-wrap;
}
```

---

## 📏 间距系统

### 标准间距
```css
--spacing-xs: 5px;
--spacing-sm: 10px;
--spacing-md: 15px;
--spacing-lg: 20px;
--spacing-xl: 25px;
--spacing-2xl: 30px;
--spacing-3xl: 40px;
```

### Padding（内边距）
```css
/* 卡片内边距 */
.card-padding-sm: 15px;
.card-padding-md: 20px;
.card-padding-lg: 25px;

/* 按钮内边距 */
.button-padding: 20px;         /* 大按钮 */
.button-padding-sm: 15px 30px; /* 中按钮 */
.button-padding-xs: 12px 24px; /* 小按钮 */

/* 弹窗内边距 */
.modal-padding: 40px;
.modal-padding-sm: 30px;  /* 移动端 */
.modal-padding-xs: 20px;  /* 小屏 */
```

### Margin（外边距）
```css
/* 卡片间距 */
.card-margin: 20px;
.card-margin-sm: 15px; /* 移动端 */

/* 区块间距 */
.section-margin: 30px;

/* 元素间距 */
.element-margin: 15px;
.element-margin-sm: 10px;
```

### Gap（Grid/Flex间距）
```css
/* Grid间距 */
.grid-gap: 20px;
.grid-gap-sm: 15px;  /* 移动端 */
.grid-gap-xs: 12px;  /* 小屏 */

/* Flex间距 */
.flex-gap: 15px;
.flex-gap-sm: 10px;
```

---

## 🎬 动画系统

### 动画时长
```css
/* 快速交互（hover、active） */
--duration-fast: 0.3s;

/* 中速过渡（弹窗、卡片） */
--duration-medium: 0.5s;

/* 慢速展示（页面切换、大动画） */
--duration-slow: 0.8s;

/* 超慢（特殊效果） */
--duration-slower: 1s;
```

### 缓动函数
```css
--easing-default: ease;
--easing-in: ease-in;
--easing-out: ease-out;
--easing-in-out: ease-in-out;
```

### 标准动画

#### 1. 按钮交互
```css
.action-btn {
    transition: all 0.3s ease;
}

.action-btn:hover {
    transform: scale(0.98);
    border-color: #A855F7;
    box-shadow: 0 0 30px rgba(168, 85, 247, 0.5);
}

.action-btn:active {
    transform: scale(0.95);
}
```

#### 2. 弹窗出现
```css
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes zoomIn {
    from {
        transform: scale(0.5);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}

.result-overlay.show {
    animation: fadeIn 0.3s;
}

.result-box {
    animation: zoomIn 0.5s;
}
```

#### 3. 数字滚动（CountUp）
```javascript
function animateValue(element, start, end, duration = 800) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) ||
            (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}
```

#### 4. 进度条动画
```css
.resource-bar {
    transition: width 0.5s ease, background-color 0.3s;
}

.resource-bar.resource-change {
    animation: bar-flash 0.3s;
}

@keyframes bar-flash {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
}
```

#### 5. 闪烁警告
```css
@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
}

.stat-value.critical {
    color: #FF4444;
    animation: blink 1s infinite;
}
```

#### 6. 脉冲效果
```css
@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
}

.mission-title {
    animation: pulse 2s infinite;
}
```

#### 7. 弹跳效果
```css
@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
}

.result-icon {
    animation: bounce 1s infinite;
}
```

---

## 🧩 组件规范

### 卡片组件
```css
.card {
    background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%);
    border: 2px solid #475569;
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 4px 20px rgba(168, 85, 247, 0.1);
}

/* 移动端 */
@media (max-width: 480px) {
    .card {
        padding: 15px;
        margin-bottom: 15px;
    }
}
```

### 按钮组件
```css
.btn-primary {
    background: linear-gradient(135deg, #A855F7 0%, #7C3AED 100%);
    color: #FFF;
    border: none;
    padding: 15px 40px;
    border-radius: 10px;
    font-size: 1.1em;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(168, 85, 247, 0.4);
}

.btn-primary:hover {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(168, 85, 247, 0.8);
}

.btn-primary:active {
    transform: scale(0.95);
}

/* 移动端 */
@media (max-width: 480px) {
    .btn-primary {
        padding: 14px 28px;
        font-size: 1em;
        min-height: 44px; /* iOS推荐 */
    }
}
```

### 输入框组件
```css
.input-field {
    background: rgba(15, 23, 42, 0.6);
    border: 2px solid #475569;
    border-radius: 8px;
    padding: 12px 16px;
    color: #E2E8F0;
    font-size: 1em;
    transition: border-color 0.3s;
}

.input-field:focus {
    outline: none;
    border-color: #A855F7;
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
}
```

### 进度条组件
```css
.progress-container {
    width: 100%;
    height: 8px;
    background: rgba(0,0,0,0.5);
    border-radius: 4px;
    overflow: hidden;
}

.progress-bar {
    height: 100%;
    border-radius: 4px;
    transition: width 0.5s ease, background-color 0.3s;
}

/* 不同状态的颜色 */
.progress-bar.normal {
    background: #10B981; /* 绿色 */
}

.progress-bar.warning {
    background: #F59E0B; /* 橙色 */
}

.progress-bar.danger {
    background: #EF4444; /* 红色 */
}
```

### 标签组件
```css
.badge {
    display: inline-block;
    padding: 5px 15px;
    background: rgba(201,169,97,0.3);
    border: 1px solid #C9A961;
    border-radius: 20px;
    font-size: 0.85em;
}

.badge-success {
    background: rgba(16, 185, 129, 0.2);
    border-color: #10B981;
    color: #10B981;
}

.badge-danger {
    background: rgba(239, 68, 68, 0.2);
    border-color: #EF4444;
    color: #EF4444;
}
```

---

## 📱 响应式断点

### 断点定义
```css
/* 超小屏（手机竖屏） */
@media (max-width: 360px) { }

/* 小屏（手机） */
@media (max-width: 480px) { }

/* 中屏（平板竖屏） */
@media (max-width: 768px) { }

/* 大屏（平板横屏、小笔记本） */
@media (max-width: 1024px) { }

/* 超大屏（桌面） */
@media (min-width: 1440px) { }

/* 横屏模式 */
@media (max-width: 768px) and (orientation: landscape) { }
```

### 移动端适配规则

#### 字体缩放
```css
/* 桌面（默认） */
body { font-size: 16px; }

/* 平板 */
@media (max-width: 768px) {
    body { font-size: 15px; }
}

/* 手机 */
@media (max-width: 480px) {
    body { font-size: 14px; }
}

/* 小屏 */
@media (max-width: 360px) {
    body { font-size: 13px; }
}
```

#### 布局切换
```css
/* 桌面：两列 */
.game-grid {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 20px;
}

/* 平板/手机：单列 */
@media (max-width: 768px) {
    .game-grid {
        grid-template-columns: 1fr;
        gap: 15px;
    }
}
```

#### 间距调整
```css
/* 桌面 */
.card { padding: 25px; margin-bottom: 20px; }

/* 手机 */
@media (max-width: 480px) {
    .card { padding: 15px; margin-bottom: 15px; }
}
```

#### 触摸优化
```css
/* 手机上的按钮 */
@media (max-width: 480px) {
    .action-btn {
        min-height: 88px; /* 确保触摸区域足够 */
        padding: 16px;
    }

    /* 禁用hover效果 */
    .action-btn:hover {
        transform: none;
    }

    /* 增强active反馈 */
    .action-btn:active {
        transform: scale(0.95);
        background: rgba(168, 85, 247, 0.3);
    }
}
```

---

## 🎮 游戏参数

### 资源配置
```javascript
const RESOURCE_CONFIG = {
    cash: {
        name: '现金',
        icon: '💰',
        unit: '$',
        initial: 10000,
        max: 100000,
        critical: 1000,
        color: '#FFD700'
    },
    time: {
        name: '时间',
        icon: '⏱️',
        unit: '分钟',
        initial: 180,
        max: 480,
        critical: 30,
        color: '#F59E0B'
    },
    energy: {
        name: '精力',
        icon: '⚡',
        unit: '点',
        initial: 100,
        max: 100,
        critical: 20,
        color: '#06B6D4'
    },
    trust: {
        name: '信任',
        icon: '🤝',
        unit: '点',
        initial: 80,
        max: 100,
        critical: 30,
        color: '#10B981'
    },
    reputation: {
        name: '声誉',
        icon: '⭐',
        unit: '点',
        initial: 60,
        max: 100,
        critical: 20,
        color: '#A855F7'
    }
};
```

### 难度配置
```javascript
const DIFFICULTY_CONFIG = {
    easy: {
        timeLimit: 240,        // 4小时
        resourceMultiplier: 1.5, // 资源+50%
        hintEnabled: true,     // 显示提示
        retryAllowed: 3        // 允许重试3次
    },
    normal: {
        timeLimit: 180,        // 3小时
        resourceMultiplier: 1.0,
        hintEnabled: false,
        retryAllowed: 1
    },
    hard: {
        timeLimit: 120,        // 2小时
        resourceMultiplier: 0.7, // 资源-30%
        hintEnabled: false,
        retryAllowed: 0
    }
};
```

### 评分标准
```javascript
const SCORING_CONFIG = {
    // 通过条件
    passingScore: 0.66,  // 至少66%正确率
    minActions: 2,        // 最少完成2个行动

    // 评级标准
    ratings: {
        perfect: { score: 1.0, stars: 5, title: '完美' },
        excellent: { score: 0.85, stars: 4, title: '优秀' },
        good: { score: 0.66, stars: 3, title: '良好' },
        pass: { score: 0.5, stars: 2, title: '及格' },
        fail: { score: 0, stars: 0, title: '失败' }
    },

    // 奖励系数
    speedBonus: {
        fast: 1.2,    // <50%时间：+20%
        normal: 1.0,  // 50-80%时间：无奖励
        slow: 0.8     // >80%时间：-20%
    }
};
```

### 行动消耗规则
```javascript
const ACTION_COST_RULES = {
    // 时间消耗
    timePerAction: {
        quick: 20,    // 快速行动：20分钟
        normal: 40,   // 普通行动：40分钟
        deep: 60,     // 深度行动：60分钟
        meeting: 90   // 会议：90分钟
    },

    // 精力消耗（时间/3）
    energyPerMinute: 1/3,

    // 自动恢复
    energyRegenPerHour: 5,  // 每游戏内1小时恢复5点

    // 失败惩罚
    failurePenalty: {
        time: 30,      // 额外消耗30分钟
        trust: -10,    // 信任-10
        energy: -20    // 精力-20
    }
};
```

### 事件触发规则
```javascript
const EVENT_CONFIG = {
    // 触发概率
    triggerChance: 0.3,  // 每次行动30%概率
    maxEventsPerLevel: 3, // 每关最多3个事件

    // 事件类型分布
    typeDistribution: {
        opportunity: 0.3,  // 30%机遇
        crisis: 0.5,       // 50%危机
        milestone: 0.2     // 20%里程碑
    },

    // 冷却时间
    cooldownActions: 2   // 连续2个行动后才能再次触发
};
```

### 新手引导配置
```javascript
const ONBOARDING_CONFIG = {
    steps: [
        {
            target: '.mission-objective',
            title: '认识你的任务',
            content: '这是你的任务目标，注意时间限制和失败后果',
            position: 'bottom',
            highlightPadding: 10
        },
        {
            target: '#time-left',
            title: '时间倒计时',
            content: '时间有限！每个行动都会消耗时间',
            position: 'bottom',
            highlightPadding: 5
        },
        {
            target: '.action-btn:first-child',
            title: '执行行动',
            content: '点击行动按钮来收集信息和数据',
            position: 'right',
            highlightPadding: 15
        },
        {
            target: '.resource-panel',
            title: '资源管理',
            content: '注意你的资源消耗，不要让它们耗尽',
            position: 'left',
            highlightPadding: 10
        },
        {
            target: '#ready-btn',
            title: '准备回答',
            content: '完成至少2个调查后，就可以回答问题了',
            position: 'top',
            highlightPadding: 10
        }
    ],

    // 样式配置
    overlay: {
        background: 'rgba(0,0,0,0.85)',
        zIndex: 9999
    },
    highlight: {
        boxShadow: '0 0 0 9999px rgba(0,0,0,0.85), 0 0 30px rgba(168, 85, 247, 0.8)',
        borderRadius: '10px'
    }
};
```

---

## 📊 数据格式规范

### 关卡数据格式
```javascript
{
    id: 1,
    title: "⚠️ 关卡 #1：投资人生死劫",
    objective: "🎯 任务目标：3小时内准备好数据，说服投资人继续支持",
    details: "⏰ 12:00 投资人Tom将来电\n⚠️ 失败后果：融资终止\n✅ 成功条件：正确率≥66%",
    timeLimit: 180,

    scene: {
        time: "星期一，早上9:17",
        text: "[场景描述，500-800字]"
    },

    actions: [
        {
            id: "users",
            name: "👥 深挖用户数据",
            desc: "查看用户构成、流失明细、付费转化率",
            time: 40,
            value: 5,
            critical: true,
            feedback: "[详细反馈，200-400字]"
        }
    ],

    questions: [
        {
            question: "Tom："我们能撑过这次危机吗？"",
            options: [
                {
                    text: "能，我们有30%的核心用户",
                    correct: true,
                    feedback: "✅ 正确！基于数据..."
                }
            ]
        }
    ]
}
```

### 反馈文本模板
```javascript
// 正确答案反馈
const FEEDBACK_CORRECT = {
    template: "✅ 正确！\n\n【数据支撑】\n{data}\n\n【逻辑推理】\n{reasoning}\n\n【关键洞察】\n{insight}",

    example: "✅ 正确！\n\n【数据支撑】\n你发现：\n- 30%的用户是核心用户（健身7天+）\n- 他们贡献了80%的收入\n- 流失的主要是试用用户\n\n【逻辑推理】\n核心用户的留存率很高（95%），说明产品本身有价值。竞品免费吸引的是低质量用户，不会影响核心群体。\n\n【关键洞察】\n危机是暂时的，只要守住核心用户，公司就能活下来。"
};

// 错误答案反馈
const FEEDBACK_WRONG = {
    template: "❌ 错误！\n\n【问题所在】\n{problem}\n\n【数据反驳】\n{data}\n\n【正确做法】\n{correct}",

    example: "❌ 错误！\n\n【问题所在】\n这是凭感觉的判断，缺乏数据支撑。投资人要的是证据，不是信心。\n\n【数据反驳】\n如果你做了用户数据分析，会发现：\n- 总用户数减少50%（10000→5000）\n- 但付费用户只减少10%（1000→900）\n- 核心用户几乎没流失\n\n【正确做法】\n应该先分析用户构成，再给出基于数据的判断。"
};
```

---

## 🔧 技术参数

### 性能优化
```javascript
const PERFORMANCE_CONFIG = {
    // 动画帧率
    targetFPS: 60,

    // 懒加载阈值
    lazyLoadThreshold: '50px',

    // 防抖延迟
    debounceDelay: 300,

    // 节流间隔
    throttleInterval: 100,

    // 缓存时长
    cacheExpiry: 3600000  // 1小时
};
```

### 浏览器兼容
```javascript
const BROWSER_SUPPORT = {
    minimum: {
        chrome: 90,
        firefox: 88,
        safari: 14,
        edge: 90
    },

    polyfills: [
        'Promise',
        'fetch',
        'Object.assign',
        'Array.from'
    ]
};
```

---

## 📝 文案规范

### 语气风格
- **场景描述**：第三人称，电影感，细节丰富
- **行动描述**：动词开头，简洁明确
- **反馈文本**：第二人称，教学式，逻辑清晰
- **错误提示**：友好、建设性，指出问题+给出方案

### 长度标准
```javascript
const TEXT_LENGTH = {
    title: '6-12字',
    objective: '15-30字',
    sceneText: '500-800字',
    actionDesc: '10-30字',
    actionFeedback: '200-400字',
    questionText: '15-50字',
    optionText: '10-30字',
    optionFeedback: '100-300字'
};
```

### Emoji使用
```javascript
const EMOJI_GUIDE = {
    status: {
        success: '✅',
        fail: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    },
    actions: {
        data: '📊',
        people: '👥',
        money: '💰',
        time: '⏱️',
        meeting: '💬',
        document: '📄',
        research: '🔍',
        plan: '📋'
    },
    results: {
        perfect: '🎉',
        good: '👍',
        fail: '💀',
        retry: '🔄'
    }
};
```

---

## 🎯 使用方法

### 快速复制
所有参数都可以直接复制粘贴到代码中：

```css
/* 复制颜色 */
:root {
    --accent-primary: #A855F7;
    /* ... 其他颜色 */
}

/* 复制组件 */
.card {
    background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%);
    /* ... 其他样式 */
}
```

```javascript
// 复制配置
const RESOURCE_CONFIG = {
    cash: {
        name: '现金',
        initial: 10000,
        // ... 其他参数
    }
};
```

### 自定义修改
如果需要调整某个参数：

```javascript
// 例如：修改时间限制
timeLimit: 120  // 改为2小时

// 例如：修改颜色主题
--accent-primary: #FF6B6B;  // 改为红色主题
```

---

**所有参数都已列出！直接复制即可实现完全一致的效果。** 🎨
