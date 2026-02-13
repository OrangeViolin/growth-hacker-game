# 动画系统集成指南 Animation System Integration Guide

## 快速开始 Quick Start

### 1. 文件引入 Include Files

在 HTML 文件的 `<head>` 部分添加：

```html
<link rel="stylesheet" href="ui-effects.css">
```

在 `</body>` 标签之前添加：

```html
<script src="animations.js"></script>
```

### 2. 基础使用 Basic Usage

动画系统会自动创建全局实例 `gameAnimations`：

```javascript
// 数字计数
gameAnimations.countUp(element, 0, 1000, 1500);

// 显示成就
gameAnimations.showAchievement({
    title: '首次成就',
    description: '完成第一个任务',
    icon: '🎉',
    rarity: 'common'
});

// 触发里程碑
gameAnimations.triggerMilestoneAnimation(10000, 'users');
```

---

## 集成到现有项目 Integration Steps

### Step 1: 准备 HTML 结构

确保指标卡片有正确的 data 属性：

```html
<div class="metric-card" data-metric="users">
    <div class="metric-label">用户数</div>
    <div class="metric-value" data-value="5000">5,000</div>
</div>
```

### Step 2: 初始化追踪

在游戏开始时初始化指标追踪：

```javascript
let gameEngine;
let previousMetrics = {}; // 用于追踪指标变化

function initGame() {
    gameEngine = new GrowthGameEngine(config);

    // 保存初始值
    const metrics = gameEngine.getMetrics();
    metrics.forEach(metric => {
        previousMetrics[metric.key] = metric.rawValue;
    });
}
```

### Step 3: 更新指标时使用动画

```javascript
function updateMetrics() {
    const metrics = gameEngine.getMetrics();

    // 更新 DOM
    const dashboard = document.getElementById('metrics-dashboard');
    dashboard.innerHTML = metrics.map((metric, index) => `
        <div class="metric-card" data-metric="${metric.key}">
            <div class="metric-label">${metric.label}</div>
            <div class="metric-value" data-value="${metric.rawValue}">${metric.value}</div>
            ${metric.change ? `
                <div class="metric-change ${metric.change > 0 ? 'positive' : 'negative'}">
                    ${metric.change > 0 ? '↑' : '↓'} ${Math.abs(metric.change)}${metric.unit}
                </div>
            ` : ''}
        </div>
    `).join('');

    // 应用动画
    animateMetricChanges(metrics);
}

function animateMetricChanges(metrics) {
    metrics.forEach(metric => {
        const element = document.querySelector(`[data-metric="${metric.key}"] .metric-value`);

        if (element && previousMetrics[metric.key] !== undefined) {
            const oldValue = previousMetrics[metric.key];
            const newValue = metric.rawValue;

            if (oldValue !== newValue) {
                // 数字计数动画
                gameAnimations.countUp(element, oldValue, newValue, 1000, metric.formatter);

                // 检查里程碑
                if (metric.key === 'users' || metric.key === 'revenue') {
                    gameAnimations.checkMilestone(oldValue, newValue, metric.key);
                }
            }
        }

        // 更新追踪
        previousMetrics[metric.key] = metric.rawValue;
    });

    // 更新指标脉冲状态
    if (gameEngine.metrics) {
        gameAnimations.updateMetricPulses(gameEngine.metrics);
    }
}
```

### Step 4: 卡片选择添加动画

```javascript
function selectSkill(index) {
    const card = document.getElementById(`skill-${index}`);

    // 取消其他选中
    document.querySelectorAll('.skill-card').forEach(c => {
        gameAnimations.unhighlightCard(c);
    });

    // 选中当前卡片
    gameAnimations.highlightCard(card);
    gameAnimations.flipCard(card);

    selectedSkillIndex = index;
}
```

### Step 5: 成就系统集成

```javascript
function displayResult(result) {
    // ... 显示结果 ...

    // 检查成就
    if (result.achievement) {
        setTimeout(() => {
            gameAnimations.showAchievement({
                ...result.achievement,
                rarity: determineRarity(result.achievement)
            });
        }, 800);
    }
}

function determineRarity(achievement) {
    // 根据成就类型决定稀有度
    const title = achievement.title.toLowerCase();
    if (title.includes('大师') || title.includes('完美')) return 'epic';
    if (title.includes('突破') || title.includes('里程碑')) return 'rare';
    return 'common';
}
```

### Step 6: 办公室场景初始化

```javascript
function startGame() {
    // ... 游戏初始化 ...

    // 初始化办公室场景
    const container = document.getElementById('office-scene-container');
    const scene = gameAnimations.initOfficeScene();
    container.appendChild(scene);

    // 根据当前用户数设置场景
    gameAnimations.updateOfficeLevel(gameEngine.metrics.users);
}

// 每次指标更新时检查办公室升级
function updateMetrics() {
    // ... 其他更新逻辑 ...

    gameAnimations.updateOfficeLevel(gameEngine.metrics.users);
}
```

### Step 7: 添加涟漪效果

在 DOMContentLoaded 时添加全局事件监听：

```javascript
document.addEventListener('DOMContentLoaded', () => {
    // 为所有可点击元素添加涟漪效果
    document.addEventListener('click', (e) => {
        const clickable = e.target.closest('.btn, .skill-card, .mode-card');
        if (clickable) {
            gameAnimations.createRipple(e, clickable);
        }
    });
});
```

---

## 游戏引擎修改 Game Engine Modifications

为了让动画系统正常工作，需要修改 `getMetrics()` 方法：

```javascript
getMetrics() {
    return [
        {
            key: 'users',              // 添加：唯一标识符
            label: '用户数 Users',
            value: this.metrics.users.toLocaleString(),
            rawValue: this.metrics.users,  // 添加：原始数值
            change: /* ... */,
            unit: '',
            formatter: (v) => Math.floor(v).toLocaleString()  // 添加：格式化函数
        },
        // ... 其他指标
    ];
}
```

---

## 高级功能 Advanced Features

### 自定义里程碑

```javascript
// 修改默认里程碑阈值
gameAnimations.milestones = {
    users: [1000, 5000, 10000, 50000, 100000, 500000],
    revenue: [10000, 50000, 100000, 500000, 1000000, 5000000],
    custom: [100, 500, 1000]  // 自定义指标
};
```

### 自定义办公室场景

```javascript
// 添加新的办公室级别
const customLevel = {
    threshold: 500000,
    class: 'mega-office',
    label: '超大总部 Mega HQ'
};

// 手动切换
gameAnimations.transitionOffice(sceneElement, customLevel);
```

### 批量动画

```javascript
// 一次性更新多个指标
const metricsToAnimate = [
    {
        element: document.querySelector('#users'),
        oldValue: 5000,
        newValue: 8000,
        formatter: (v) => Math.floor(v).toLocaleString()
    },
    {
        element: document.querySelector('#revenue'),
        oldValue: 10000,
        newValue: 25000,
        formatter: (v) => '$' + Math.floor(v).toLocaleString()
    }
];

gameAnimations.animateMetrics(metricsToAnimate);
```

---

## 性能优化建议 Performance Tips

### 1. 避免频繁重绘

```javascript
// ❌ 不好：每次都重新创建 DOM
function updateMetrics() {
    dashboard.innerHTML = '...'; // 触发重绘
    animateMetrics();
}

// ✅ 更好：仅更新变化的元素
function updateMetrics() {
    metrics.forEach(metric => {
        const element = document.querySelector(`[data-metric="${metric.key}"]`);
        if (element) {
            // 仅更新文本内容
            const valueEl = element.querySelector('.metric-value');
            // 使用动画更新
        }
    });
}
```

### 2. 节流动画触发

```javascript
let animationInProgress = false;

function triggerAnimation() {
    if (animationInProgress) return;

    animationInProgress = true;
    gameAnimations.countUp(element, old, new, 1000);

    setTimeout(() => {
        animationInProgress = false;
    }, 1000);
}
```

### 3. 使用 CSS 优先

```javascript
// ✅ 优先使用 CSS 类
element.classList.add('metric-updating');

// 而不是 JS 修改样式
element.style.transform = 'scale(1.1)';
```

---

## 调试技巧 Debugging

### 启用调试模式

```javascript
// 控制台中
gameAnimations.debug = true;
```

### 测试单个动画

```javascript
// 在浏览器控制台测试
gameAnimations.countUp(
    document.querySelector('.metric-value'),
    0,
    1000,
    2000
);
```

### 查看当前状态

```javascript
console.log('Previous metrics:', previousMetrics);
console.log('Current metrics:', gameEngine.metrics);
```

---

## 常见问题解决 Troubleshooting

### 动画不生效

1. 检查 CSS 文件是否正确加载：
```javascript
console.log(getComputedStyle(element).animation);
```

2. 检查元素是否存在：
```javascript
console.log(document.querySelector('.metric-card'));
```

3. 检查是否有 JavaScript 错误：
打开浏览器控制台查看错误信息。

### 数字跳动不平滑

确保提供了正确的 formatter 函数：
```javascript
gameAnimations.countUp(element, 0, 1000, 1500, (v) => {
    return Math.floor(v).toLocaleString();
});
```

### 里程碑不触发

检查阈值设置和参数：
```javascript
// 确保参数类型正确
gameAnimations.checkMilestone(
    Number(oldValue),  // 必须是数字
    Number(newValue),
    'users'  // 必须是有效的 key
);
```

---

## 完整示例 Complete Example

查看以下文件获取完整的集成示例：

- **基础集成**: `/Users/mac/growth-hacker-game/game-mode.html`
- **演示页面**: `/Users/mac/growth-hacker-game/animation-demo.html`
- **系统文档**: `/Users/mac/growth-hacker-game/ANIMATION_SYSTEM.md`

---

## 下一步 Next Steps

1. ✅ 完成基础集成
2. ✅ 测试所有动画效果
3. ⏭️ 根据需求自定义动画
4. ⏭️ 优化性能
5. ⏭️ 添加音效（可选）

---

## 需要帮助？ Need Help?

如果遇到问题：

1. 查看 `ANIMATION_SYSTEM.md` 了解详细 API
2. 打开 `animation-demo.html` 查看实际效果
3. 查看浏览器控制台的错误信息
4. 检查元素的 data 属性是否正确设置

---

祝你的游戏更加生动有趣！🎮✨
Good luck making your game more engaging! 🎮✨
