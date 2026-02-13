# 动画系统文档 Animation System Documentation

## 概览 Overview

增长黑客游戏的动画系统提供了丰富的视觉效果和交互反馈，提升用户体验。系统采用纯 CSS3 + Vanilla JavaScript 实现，无需任何外部库依赖。

The animation system for the Growth Hacker Game provides rich visual effects and interactive feedback to enhance user experience. Built with pure CSS3 + Vanilla JavaScript, no external dependencies required.

---

## 文件结构 File Structure

```
/Users/mac/growth-hacker-game/
├── animations.js          # 动画逻辑核心类
├── ui-effects.css        # 动画样式定义
├── game-mode.html        # 集成动画的游戏主界面
└── animation-demo.html   # 动画系统演示页面
```

---

## 核心功能 Core Features

### 1. 数字计数动画 (CountUp Animation)

**功能说明：**
数字从旧值平滑过渡到新值，使用 `requestAnimationFrame` 实现 60fps 流畅动画。

**使用方法：**

```javascript
// 基础用法
gameAnimations.countUp(element, startValue, endValue, duration);

// 带格式化函数
gameAnimations.countUp(
    element,
    0,
    10000,
    1500,
    (value) => '$' + Math.floor(value).toLocaleString()
);

// 批量更新指标
gameAnimations.animateMetrics([
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
        formatter: (v) => '$' + Math.floor(v).toLocaleString(),
        suffix: ''
    }
]);
```

**缓动函数：**
使用 `easeOutExpo` 缓动，前快后慢，视觉效果更自然。

**性能优化：**
- 使用 `requestAnimationFrame` 确保与浏览器刷新率同步
- 避免强制同步布局
- 数字格式化仅在每帧计算一次

---

### 2. 里程碑粒子效果 (Milestone Celebration)

**功能说明：**
当用户达到重要里程碑（如 10,000 用户）时，触发彩带粒子动画和屏幕震动。

**里程碑阈值：**
```javascript
const milestones = {
    users: [1000, 5000, 10000, 50000, 100000],
    revenue: [10000, 50000, 100000, 500000, 1000000]
};
```

**使用方法：**

```javascript
// 自动检测里程碑
gameAnimations.checkMilestone(oldValue, newValue, 'users');

// 手动触发
gameAnimations.triggerMilestoneAnimation(10000, 'users');

// 仅彩带效果
gameAnimations.confettiExplosion();

// 仅屏幕震动
gameAnimations.screenShake(duration);
```

**视觉效果：**
- 60 个彩带粒子从中心爆发
- 随机颜色（渐变色系）
- 重力和摩擦力物理模拟
- 旋转和淡出效果
- 屏幕震动 300ms

**性能考虑：**
- 粒子使用 CSS transform，启用 GPU 加速
- 动画完成后自动清理 DOM 节点
- 限制同时存在的粒子数量

---

### 3. 指标脉冲动画 (Metric Pulse)

**功能说明：**
当指标处于警戒状态时（预算不足、留存率低等），显示脉冲动画提醒用户。

**脉冲类型：**

```javascript
// 危险脉冲（红色）- 指标严重低于阈值
gameAnimations.addMetricPulse(element, 'danger');

// 警告脉冲（黄色）- 指标接近阈值
gameAnimations.addMetricPulse(element, 'warning');

// 成功脉冲（绿色）- 指标达到目标
gameAnimations.addMetricPulse(element, 'success');

// 移除脉冲
gameAnimations.removeMetricPulse(element);
```

**自动监控：**

```javascript
// 自动检查并更新所有指标的脉冲状态
gameAnimations.updateMetricPulses(gameState);

// 默认阈值配置
const thresholds = {
    budget: { danger: 1000, warning: 3000 },
    retention7d: { danger: 15, warning: 25 },
    nps: { danger: 0, warning: 20 }
};
```

**CSS 实现：**
- 使用 `@keyframes` 定义脉冲动画
- box-shadow 扩散效果
- 背景色微妙变化
- 无限循环播放

---

### 4. 决策卡片动画 (Card Animations)

**功能说明：**
卡片翻转、选中高亮、滑动交互等效果。

#### 4.1 卡片翻转

```javascript
// 3D 翻转效果
gameAnimations.flipCard(cardElement);
```

**CSS 实现：**
```css
@keyframes cardFlip {
    0% { transform: rotateY(0deg) scale(1); }
    50% { transform: rotateY(90deg) scale(0.95); }
    100% { transform: rotateY(0deg) scale(1); }
}
```

#### 4.2 选中高亮

```javascript
// 添加选中效果（带光环）
gameAnimations.highlightCard(cardElement);

// 移除选中效果
gameAnimations.unhighlightCard(cardElement);
```

**视觉效果：**
- 卡片放大并上浮
- 边框变绿色
- 背景渐变
- 发光光环（渐变动画）

#### 4.3 滑动交互

```javascript
// 启用卡片滑动（类似 Tinder）
const cleanup = gameAnimations.enableCardSwipe(
    cardElement,
    () => console.log('左滑'),
    () => console.log('右滑')
);

// 清理事件监听
cleanup();
```

**交互逻辑：**
- 触摸/鼠标拖拽支持
- 左滑/右滑阈值 100px
- 实时视觉反馈
- 平滑的回弹动画
- 移动端优化

---

### 5. 成就解锁系统 (Achievement System)

**功能说明：**
成就解锁时的震撼效果，包括光芒、粒子、旋转等多重动画。

**使用方法：**

```javascript
gameAnimations.showAchievement({
    title: '用户破万',
    description: '成功获得10,000名用户',
    icon: '🚀',
    rarity: 'rare' // 'common' | 'rare' | 'epic' | 'legendary'
});
```

**稀有度效果：**

| 稀有度 | 颜色 | 光效 | 特殊效果 |
|--------|------|------|----------|
| common | 银色 | 微光 | - |
| rare | 蓝色 | 中等光晕 | 粒子效果 |
| epic | 紫色 | 强光晕 | 光芒旋转 |
| legendary | 金色 | 极强光晕 | 光芒旋转 + 屏幕震动 |

**动画层次：**
1. 背景光晕脉冲
2. 徽章图标弹跳旋转
3. 光芒旋转（4条）
4. 30 个金色粒子爆发
5. 标题文字渐变闪烁
6. 屏幕震动（传奇级）

**分享功能：**

```javascript
// 生成可分享的成就卡片
gameAnimations.shareAchievement(achievement);
```

支持：
- Web Share API（移动端）
- 复制到剪贴板（桌面端）
- Canvas 生成图片（未来）

---

### 6. 公司成长可视化 (Office Scene)

**功能说明：**
根据用户数量自动升级办公室场景，提供视觉化的成长反馈。

**办公室级别：**

| 级别 | 用户数 | 场景 | 图标 |
|------|--------|------|------|
| 车库 Garage | 0 - 5K | 灰色背景 | 🚗 💡 |
| 小办公室 Small Office | 5K - 20K | 浅灰背景 | 🪑 🖥️ 📊 |
| 中型办公室 Medium Office | 20K - 100K | 米黄背景 | 🪑🪑 🖥️🖥️ 📈 🎯 |
| 创业总部 Startup HQ | 100K+ | 绿色背景 | 🏢 🚀 💰 🎉 |

**使用方法：**

```javascript
// 初始化场景
const scene = gameAnimations.initOfficeScene();
container.appendChild(scene);

// 自动升级（根据用户数）
gameAnimations.updateOfficeLevel(userCount);

// 手动切换
gameAnimations.transitionOffice(sceneElement, newLevelConfig);
```

**过渡动画：**
- 淡出当前场景（500ms）
- 切换背景和图标
- 淡入新场景（500ms）
- 显示升级提示

---

### 7. 辅助功能 (Helper Functions)

#### 7.1 屏幕震动

```javascript
gameAnimations.screenShake(duration = 300);
```

#### 7.2 提示消息

```javascript
// 类型：'success' | 'warning' | 'error' | 'info'
gameAnimations.showToast(message, type = 'info');
```

自动 3 秒后消失。

#### 7.3 进度条动画

```javascript
gameAnimations.animateProgressBar(element, targetPercent, duration);
```

#### 7.4 涟漪效果

```javascript
// 点击反馈效果
gameAnimations.createRipple(event, element);
```

自动集成到所有 `.btn`、`.skill-card`、`.mode-card` 元素。

---

## CSS 类名参考 CSS Class Reference

### 指标动画
- `.metric-updating` - 指标更新脉冲
- `.metric-pulse-danger` - 危险脉冲（红）
- `.metric-pulse-warning` - 警告脉冲（黄）
- `.metric-pulse-success` - 成功脉冲（绿）

### 卡片动画
- `.card-flipping` - 卡片翻转中
- `.card-dragging` - 卡片拖拽中
- `.card-selected` - 卡片已选中
- `.card-glow` - 卡片光环
- `.swipe-left-hint` - 左滑提示
- `.swipe-right-hint` - 右滑提示

### 成就系统
- `.achievement-unlock-popup` - 成就弹窗
- `.achievement-overlay` - 成就遮罩
- `.achievement-glow` - 成就光晕
- `.achievement-rays` - 成就光芒
- `.rarity-common/rare/epic/legendary` - 稀有度样式

### 办公室场景
- `.office-scene` - 场景容器
- `.garage` - 车库
- `.small-office` - 小办公室
- `.medium-office` - 中型办公室
- `.startup-hq` - 创业总部
- `.transitioning` - 场景过渡中

### 通用
- `.screen-shake` - 屏幕震动
- `.toast` - 提示消息
- `.ripple` - 涟漪效果
- `.confetti-particle` - 彩带粒子
- `.milestone-toast` - 里程碑提示

---

## 性能优化 Performance Optimization

### GPU 加速

所有动画元素启用 GPU 加速：

```css
.skill-card,
.achievement-unlock-popup,
.confetti-particle {
    will-change: transform;
    transform: translateZ(0);
    backface-visibility: hidden;
}
```

### requestAnimationFrame

所有 JavaScript 动画使用 `requestAnimationFrame`：

```javascript
const animate = (currentTime) => {
    // 动画逻辑
    if (progress < 1) {
        requestAnimationFrame(animate);
    }
};
requestAnimationFrame(animate);
```

### 内存管理

- 动画完成后自动清理 DOM 节点
- 粒子池复用机制
- 事件监听器及时移除

### 移动端优化

- 触摸事件支持
- 响应式布局
- 降低粒子数量（移动端）
- 禁用复杂动画（低性能设备）

### 辅助功能支持

```css
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}
```

---

## 浏览器兼容性 Browser Compatibility

| 功能 | Chrome | Firefox | Safari | Edge |
|------|--------|---------|--------|------|
| CSS Animations | ✅ | ✅ | ✅ | ✅ |
| CSS Transforms | ✅ | ✅ | ✅ | ✅ |
| requestAnimationFrame | ✅ | ✅ | ✅ | ✅ |
| Web Animations API | ✅ | ✅ | ✅ | ✅ |
| Touch Events | ✅ | ✅ | ✅ | ✅ |
| Web Share API | ✅ | ❌ | ✅ | ❌ |

最低支持版本：
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

---

## 使用示例 Usage Examples

### 完整集成示例

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="ui-effects.css">
</head>
<body>
    <div class="metric-card" data-metric="users">
        <div class="metric-label">用户数</div>
        <div class="metric-value">5000</div>
    </div>

    <script src="animations.js"></script>
    <script>
        // 初始化
        const previousValue = 5000;
        const newValue = 10000;

        // 数字动画
        const element = document.querySelector('[data-metric="users"] .metric-value');
        gameAnimations.countUp(element, previousValue, newValue, 1500);

        // 检查里程碑
        gameAnimations.checkMilestone(previousValue, newValue, 'users');

        // 更新办公室
        gameAnimations.updateOfficeLevel(newValue);

        // 显示成就
        if (newValue >= 10000) {
            gameAnimations.showAchievement({
                title: '用户破万',
                description: '你的产品已经有10,000名用户了！',
                icon: '🎉',
                rarity: 'rare'
            });
        }
    </script>
</body>
</html>
```

---

## 调试模式 Debug Mode

启用调试模式查看动画详情：

```javascript
// 在浏览器控制台中
gameAnimations.debug = true;

// 查看性能统计
gameAnimations.getStats();
```

---

## 演示页面 Demo

打开 `animation-demo.html` 查看所有动画效果的实时演示。

```bash
# 本地服务器运行
python3 -m http.server 8000
# 访问 http://localhost:8000/animation-demo.html
```

---

## 扩展开发 Extension Development

### 添加新动画

1. 在 `animations.js` 中添加方法：

```javascript
class GameAnimations {
    customAnimation(element, options) {
        // 动画逻辑
    }
}
```

2. 在 `ui-effects.css` 中定义样式：

```css
.custom-animation {
    animation: customKeyframes 1s ease-out;
}

@keyframes customKeyframes {
    /* 关键帧 */
}
```

3. 调用动画：

```javascript
gameAnimations.customAnimation(element, { duration: 1000 });
```

---

## 常见问题 FAQ

**Q: 动画在移动端卡顿怎么办？**
A: 确保启用了 GPU 加速（`transform: translateZ(0)`），降低粒子数量，使用 CSS 动画代替 JS 动画。

**Q: 如何禁用某些动画？**
A: 在元素上添加 `data-no-animation` 属性，或在 CSS 中覆盖动画样式。

**Q: 动画播放完不消失？**
A: 检查是否正确调用了清理函数，确保设置了 `onfinish` 回调。

**Q: 如何自定义动画时长？**
A: 大部分函数都接受 `duration` 参数，单位为毫秒。

---

## 更新日志 Changelog

### v1.0.0 (2026-02-12)
- ✨ 初始版本发布
- ✅ 8 大核心动画系统
- ✅ 完整的 CSS 和 JS 实现
- ✅ 移动端优化
- ✅ 演示页面

---

## 贡献 Contributing

欢迎提交 Issue 和 Pull Request！

---

## 许可证 License

MIT License

---

## 联系方式 Contact

如有问题或建议，请通过 GitHub Issues 联系。
