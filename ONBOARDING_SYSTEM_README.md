# 新手引导系统使用说明

## 概述

互动式新手引导系统为首次访问游戏的玩家提供沉浸式、手把手的引导体验。

## 核心特性

### 1. 剧情式引入
- 3秒快速动画展示危机情境
- "你是增长负责人，CEO给你一个任务..."
- 不讲规则，直接进入剧情

### 2. 互动式引导
- 高亮第一个行动按钮
- 悬浮提示："点这里！"
- 点击后立即奖励和鼓励
- 手把手引导玩家完成首个决策

### 3. 可跳过设计
- 老玩家可以随时跳过
- "跳过引导"按钮始终可见
- 引导状态保存在 localStorage
- 第二次访问自动跳过

### 4. 自动记忆
- 使用 `localStorage.getItem('onboarding_completed')`
- 完成后自动标记
- 老玩家直接开始游戏

## 文件结构

```
/Users/mac/growth-hacker-game/
├── onboarding.js              # 新手引导核心系统
├── crisis-mission.html        # 已整合引导的游戏主文件
├── test-onboarding.html       # 测试页面
└── ONBOARDING_SYSTEM_README.md # 本文档
```

## 使用方法

### 在现有页面整合

1. **引入脚本**
```html
<!-- 在游戏脚本之前加载 -->
<script src="onboarding.js"></script>
```

2. **初始化引导**
```javascript
window.addEventListener('DOMContentLoaded', () => {
    // 检查是否需要新手引导
    const hasCompletedOnboarding = localStorage.getItem('onboarding_completed') === 'true';

    if (!hasCompletedOnboarding) {
        // 首次进入，启动新手引导
        setTimeout(() => {
            OnboardingSystem.init();
        }, 500);

        // 引导完成后启动游戏
        window.onOnboardingComplete = () => {
            console.log('Onboarding complete - starting game');
            startGame(); // 你的游戏启动函数
        };
    } else {
        // 老玩家直接开始
        startGame();
    }
});
```

## 引导步骤

### 步骤 1: 危机引入 (3秒)
```
早上 9:15

你是这家创业公司的增长负责人。

突然，CEO Sarah的电话打来...

"有麻烦了，马上来会议室！"
```

### 步骤 2: 情境说明 (3秒)
```
危机来临

会议室里，投资人Tom看起来很焦虑。

白板上的数字触目惊心：
用户流失 -50%

你只有3小时准备答案...
```

### 步骤 3: 互动引导
- 高亮第一个行动按钮
- 显示动画提示："点这里！"
- 等待玩家点击

### 步骤 4: 即时奖励 (2秒)
```
很好！

你开始行动了！

记住：增长负责人要依靠数据做决策，不是凭感觉！
```

### 步骤 5: 快速提示 (3秒)
```
快速提示

• 时间有限，选择最关键的调查
• 收集至少2项情报才能回答
• 每个行动都会消耗时间
• 你只有一次回答机会
```

## API 接口

### OnboardingSystem.init()
初始化并启动新手引导系统。

```javascript
OnboardingSystem.init();
```

### OnboardingSystem.reset()
重置引导状态，用于测试或重新体验。

```javascript
OnboardingSystem.reset();
// 或在控制台中
window.resetOnboarding();
```

### window.onOnboardingComplete
引导完成时的回调函数。

```javascript
window.onOnboardingComplete = () => {
    console.log('Onboarding completed!');
    // 启动游戏逻辑
};
```

## 自定义引导步骤

在 `onboarding.js` 中修改 `steps` 数组：

```javascript
steps: [
    {
        id: 'intro',
        type: 'story',          // 类型：story | interactive | reward | tips
        duration: 3000,         // 自动进入下一步的时间（毫秒）
        content: {
            title: '标题',
            text: '内容',
            icon: '📱'
        }
    },
    {
        id: 'first-action',
        type: 'interactive',
        target: '.action-btn:first-child',  // CSS选择器
        content: {
            title: '你的第一步',
            text: '引导文字',
            tooltip: '点这里！',
            highlight: true
        }
    }
]
```

### 步骤类型说明

1. **story** - 故事叙述
   - 显示图标、标题、文字
   - 可设置自动进入下一步

2. **interactive** - 互动引导
   - 高亮目标元素
   - 显示提示工具栏
   - 等待用户点击

3. **reward** - 奖励反馈
   - 鼓励用户操作
   - 正面反馈

4. **tips** - 提示说明
   - 列表式提示
   - 游戏规则快速说明

## 测试方法

### 方法 1: 使用测试页面
```
打开: /Users/mac/growth-hacker-game/test-onboarding.html
```

### 方法 2: 在实际游戏中测试
```
1. 打开 crisis-mission.html
2. 如果已完成引导，打开控制台执行：
   window.resetOnboarding()
3. 刷新页面，重新体验引导
```

### 方法 3: 使用 URL 参数
```
打开: test-onboarding.html?auto=true
自动启动引导
```

## 样式自定义

所有样式都在 `onboarding.js` 的 `injectStyles()` 方法中。

主要样式类：
- `.onboarding-overlay` - 引导遮罩层
- `.onboarding-dimmer` - 背景遮罩
- `.onboarding-spotlight` - 高亮框
- `.onboarding-box` - 内容框
- `.onboarding-tooltip` - 提示工具栏

## 浏览器兼容性

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

需要支持的特性：
- CSS Animations
- localStorage
- ES6 (箭头函数、const/let)

## 性能考虑

- 引导UI动态创建，不影响页面初始加载
- 完成后自动清理DOM元素
- 样式表只注入一次
- 使用 CSS 动画而非 JavaScript 动画

## 常见问题

### Q: 如何强制显示引导？
A: 打开控制台执行 `window.resetOnboarding()`，然后刷新页面。

### Q: 如何修改引导文本？
A: 修改 `onboarding.js` 中的 `steps` 数组。

### Q: 如何添加新步骤？
A: 在 `steps` 数组中添加新对象，按照现有格式配置。

### Q: 如何禁用新手引导？
A: 在页面加载前设置：
```javascript
localStorage.setItem('onboarding_completed', 'true');
```

### Q: 引导能否支持多语言？
A: 可以，将 `steps` 中的文本提取到独立的语言配置文件。

## 优化建议

### UX 优化
1. 根据用户反馈调整引导步骤时长
2. A/B 测试不同的引导文案
3. 收集跳过率数据，优化引导流程

### 技术优化
1. 考虑使用 Intersection Observer 优化高亮定位
2. 添加引导完成度追踪（GA/埋点）
3. 支持引导步骤的条件跳转

### 扩展功能
1. 支持多个引导流程（针对不同功能）
2. 添加引导重播功能
3. 支持引导步骤的进度保存

## 更新日志

### v1.0.0 (2026-02-13)
- 初始版本发布
- 5步引导流程
- 支持跳过和自动记忆
- 互动式高亮引导
- 完整的样式系统

## 作者

增长黑客游戏开发团队

## 许可证

MIT License
