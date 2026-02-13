# 动画系统快速参考 Quick Reference Guide

## 🚀 一分钟快速上手 Quick Start in 1 Minute

```html
<!-- 1. 引入文件 -->
<link rel="stylesheet" href="ui-effects.css">
<script src="animations.js"></script>

<!-- 2. 使用动画 -->
<script>
// 数字动画
gameAnimations.countUp(element, 0, 1000, 1500);

// 显示成就
gameAnimations.showAchievement({
    title: '首次成就',
    description: '完成第一个任务',
    icon: '🎉',
    rarity: 'rare'
});
</script>
```

---

## 📚 常用 API 速查 Common API Reference

### 数字计数 CountUp

```javascript
// 基础用法
gameAnimations.countUp(element, startValue, endValue, duration);

// 带格式化
gameAnimations.countUp(
    element,
    0,
    10000,
    1500,
    (v) => '$' + Math.floor(v).toLocaleString()
);
```

### 里程碑 Milestone

```javascript
// 自动检测
gameAnimations.checkMilestone(oldValue, newValue, 'users');

// 手动触发
gameAnimations.triggerMilestoneAnimation(10000, 'users');

// 仅彩带
gameAnimations.confettiExplosion();

// 仅震动
gameAnimations.screenShake(300);
```

### 指标脉冲 Metric Pulse

```javascript
// 添加脉冲
gameAnimations.addMetricPulse(element, 'danger');  // 红色
gameAnimations.addMetricPulse(element, 'warning'); // 黄色
gameAnimations.addMetricPulse(element, 'success'); // 绿色

// 移除脉冲
gameAnimations.removeMetricPulse(element);

// 自动更新
gameAnimations.updateMetricPulses(gameState);
```

### 卡片动画 Card Animations

```javascript
// 翻转
gameAnimations.flipCard(card);

// 高亮
gameAnimations.highlightCard(card);
gameAnimations.unhighlightCard(card);

// 滑动交互
const cleanup = gameAnimations.enableCardSwipe(
    card,
    () => console.log('左滑'),
    () => console.log('右滑')
);
```

### 成就系统 Achievement

```javascript
gameAnimations.showAchievement({
    title: '成就标题',
    description: '成就描述',
    icon: '🏆',
    rarity: 'legendary'  // common, rare, epic, legendary
});

// 关闭
gameAnimations.closeAchievement();

// 分享
gameAnimations.shareAchievement(achievement);
```

### 办公室场景 Office Scene

```javascript
// 初始化
const scene = gameAnimations.initOfficeScene();
container.appendChild(scene);

// 自动升级
gameAnimations.updateOfficeLevel(userCount);
```

### 辅助功能 Helpers

```javascript
// 提示消息
gameAnimations.showToast('消息内容', 'success');
// 类型: success, warning, error, info

// 进度条
gameAnimations.animateProgressBar(element, 75, 1000);

// 涟漪
gameAnimations.createRipple(event, element);
```

---

## 🎨 CSS 类名速查 CSS Classes

### 指标动画
```css
.metric-updating          /* 指标更新脉冲 */
.metric-pulse-danger      /* 危险脉冲（红） */
.metric-pulse-warning     /* 警告脉冲（黄） */
.metric-pulse-success     /* 成功脉冲（绿） */
```

### 卡片动画
```css
.card-flipping           /* 卡片翻转中 */
.card-dragging           /* 卡片拖拽中 */
.card-selected           /* 卡片已选中 */
.card-glow               /* 卡片光环 */
.swipe-left-hint         /* 左滑提示 */
.swipe-right-hint        /* 右滑提示 */
```

### 成就系统
```css
.achievement-unlock-popup     /* 成就弹窗 */
.achievement-overlay          /* 成就遮罩 */
.rarity-common               /* 普通成就 */
.rarity-rare                 /* 稀有成就 */
.rarity-epic                 /* 史诗成就 */
.rarity-legendary            /* 传奇成就 */
```

### 办公室场景
```css
.office-scene           /* 场景容器 */
.garage                 /* 车库 */
.small-office           /* 小办公室 */
.medium-office          /* 中型办公室 */
.startup-hq             /* 创业总部 */
.transitioning          /* 场景过渡中 */
```

### 通用
```css
.screen-shake           /* 屏幕震动 */
.toast                  /* 提示消息 */
.toast-success          /* 成功消息 */
.toast-warning          /* 警告消息 */
.toast-error            /* 错误消息 */
.toast-info             /* 信息消息 */
.ripple                 /* 涟漪效果 */
```

---

## 🎯 使用场景速查 Use Cases

### 场景 1: 用户数增长
```javascript
const oldUsers = 5000;
const newUsers = 10000;

// 1. 数字动画
gameAnimations.countUp(
    document.querySelector('#users'),
    oldUsers,
    newUsers,
    1500
);

// 2. 检查里程碑
gameAnimations.checkMilestone(oldUsers, newUsers, 'users');

// 3. 更新办公室
gameAnimations.updateOfficeLevel(newUsers);
```

### 场景 2: 预算不足警告
```javascript
if (budget < 1000) {
    const card = document.querySelector('[data-metric="budget"]');
    gameAnimations.addMetricPulse(card, 'danger');
}
```

### 场景 3: 卡片选择
```javascript
function selectSkill(index) {
    const card = document.getElementById(`skill-${index}`);

    // 取消其他选中
    document.querySelectorAll('.skill-card').forEach(c => {
        gameAnimations.unhighlightCard(c);
    });

    // 选中当前
    gameAnimations.highlightCard(card);
    gameAnimations.flipCard(card);
}
```

### 场景 4: 成就解锁
```javascript
if (users >= 10000) {
    gameAnimations.showAchievement({
        title: '用户破万',
        description: '成功获得10,000名用户！',
        icon: '🎉',
        rarity: 'rare'
    });
}
```

### 场景 5: 操作反馈
```javascript
// 成功
gameAnimations.showToast('策略执行成功！', 'success');

// 警告
gameAnimations.showToast('预算不足', 'warning');

// 错误
gameAnimations.showToast('执行失败', 'error');
```

---

## 🔧 配置参数速查 Configuration

### 里程碑阈值
```javascript
{
    users: [1000, 5000, 10000, 50000, 100000],
    revenue: [10000, 50000, 100000, 500000, 1000000]
}
```

### 办公室级别
```javascript
{
    garage: { threshold: 0, label: '车库办公' },
    small_office: { threshold: 5000, label: '小办公室' },
    medium_office: { threshold: 20000, label: '中型办公室' },
    startup_hq: { threshold: 100000, label: '创业总部' }
}
```

### 脉冲阈值
```javascript
{
    budget: { danger: 1000, warning: 3000 },
    retention7d: { danger: 15, warning: 25 },
    nps: { danger: 0, warning: 20 }
}
```

### 成就稀有度
```javascript
{
    common: '普通 - 银色光效',
    rare: '稀有 - 蓝色光效 + 粒子',
    epic: '史诗 - 紫色光效 + 光芒',
    legendary: '传奇 - 金色光效 + 震动'
}
```

---

## ⚡ 性能技巧 Performance Tips

### ✅ 推荐做法
```javascript
// 使用 CSS 类
element.classList.add('metric-updating');

// 批量操作
const fragment = document.createDocumentFragment();
// 添加元素到 fragment
container.appendChild(fragment);

// requestAnimationFrame
requestAnimationFrame(() => {
    // 动画逻辑
});
```

### ❌ 避免做法
```javascript
// 避免频繁重绘
dashboard.innerHTML = '...';  // 每次都触发

// 避免在循环中读取布局
for (let i = 0; i < items.length; i++) {
    const height = element.offsetHeight;  // ❌
}

// 避免 JS 修改样式
element.style.transform = '...';  // 用 CSS 类代替
```

---

## 🐛 调试技巧 Debug Tips

### 启用调试
```javascript
gameAnimations.debug = true;
```

### 查看状态
```javascript
// 控制台
console.log('Previous metrics:', previousMetrics);
console.log('Current metrics:', gameEngine.metrics);
console.log('Animation in progress:', gameAnimations.isAnimating);
```

### 测试单个动画
```javascript
// 在控制台直接测试
gameAnimations.countUp(
    document.querySelector('.metric-value'),
    0,
    1000,
    2000
);
```

### 检查元素
```javascript
// 检查元素是否存在
console.log(document.querySelector('.metric-card'));

// 检查动画状态
console.log(getComputedStyle(element).animation);
```

---

## 📱 移动端注意事项 Mobile Notes

### 触摸事件
```javascript
element.addEventListener('touchstart', handler);
element.addEventListener('touchmove', handler);
element.addEventListener('touchend', handler);
```

### 响应式设计
```css
@media (max-width: 768px) {
    .achievement-popup {
        max-width: 95%;
    }
}
```

### 性能优化
```javascript
// 移动端减少粒子数
const particleCount = isMobile ? 30 : 60;
```

---

## 🔗 快速链接 Quick Links

- **完整文档**: `ANIMATION_SYSTEM.md`
- **集成指南**: `INTEGRATION_GUIDE.md`
- **项目总结**: `ANIMATION_SUMMARY.md`
- **演示页面**: `animation-demo.html`
- **游戏主页**: `game-mode.html`

---

## 💡 常见问题 FAQ

**Q: 动画不生效？**
```javascript
// 检查文件加载
console.log(typeof gameAnimations);  // 应该是 'object'

// 检查元素存在
console.log(document.querySelector('.metric-value'));
```

**Q: 数字跳动不平滑？**
```javascript
// 确保提供 formatter
gameAnimations.countUp(el, 0, 1000, 1500, (v) => Math.floor(v));
```

**Q: 里程碑不触发？**
```javascript
// 确保参数是数字类型
gameAnimations.checkMilestone(
    Number(oldValue),
    Number(newValue),
    'users'
);
```

---

## 📋 代码片段 Code Snippets

### 完整的指标更新
```javascript
function updateMetrics() {
    const metrics = gameEngine.getMetrics();

    metrics.forEach(metric => {
        const element = document.querySelector(
            `[data-metric="${metric.key}"] .metric-value`
        );

        if (element && previousMetrics[metric.key]) {
            const oldValue = previousMetrics[metric.key];
            const newValue = metric.rawValue;

            if (oldValue !== newValue) {
                gameAnimations.countUp(
                    element,
                    oldValue,
                    newValue,
                    1000,
                    metric.formatter
                );

                if (metric.key === 'users') {
                    gameAnimations.checkMilestone(
                        oldValue,
                        newValue,
                        'users'
                    );
                }
            }
        }

        previousMetrics[metric.key] = metric.rawValue;
    });

    gameAnimations.updateMetricPulses(gameEngine.metrics);
    gameAnimations.updateOfficeLevel(gameEngine.metrics.users);
}
```

### 添加涟漪效果
```javascript
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (e) => {
        const clickable = e.target.closest(
            '.btn, .skill-card, .mode-card'
        );
        if (clickable) {
            gameAnimations.createRipple(e, clickable);
        }
    });
});
```

---

## 🎨 设计规范 Design Guidelines

### 动画时长
- 快速反馈: 200-300ms
- 常规动画: 300-500ms
- 复杂动画: 500-1000ms
- 特殊效果: 1000-2000ms

### 缓动函数
- 入场: ease-out
- 出场: ease-in
- 循环: ease-in-out
- 弹性: cubic-bezier

### 颜色方案
- 成功: #28a745 (绿)
- 警告: #ffc107 (黄)
- 危险: #dc3545 (红)
- 信息: #17a2b8 (蓝)
- 主色: #667eea (紫)

---

**最后更新**: 2026-02-12
**版本**: 1.0.0

---

💡 **提示**: 遇到问题先看完整文档，大部分问题都有详细说明！
