# 新手引导系统 - 快速启动指南

## 1分钟快速开始

### 体验新手引导

**方法1：在游戏中体验**
```bash
# 打开游戏主页
打开文件: /Users/mac/growth-hacker-game/crisis-mission.html

# 如果已经体验过，在浏览器控制台执行：
window.resetOnboarding()
# 然后刷新页面
```

**方法2：在测试页面体验**
```bash
# 打开测试页面
打开文件: /Users/mac/growth-hacker-game/test-onboarding.html

# 点击"启动新手引导"按钮
```

### 验证集成

```bash
# 打开集成验证页面
打开文件: /Users/mac/growth-hacker-game/test-onboarding-integration.html

# 自动检测所有功能是否正常
```

## 引导流程一览

```
步骤1 (3秒)  →  步骤2 (3秒)  →  步骤3 (互动)  →  步骤4 (2秒)  →  步骤5 (3秒)
   ↓              ↓               ↓               ↓              ↓
危机引入       情境说明        点击引导         即时奖励       快速提示
```

总时长：约15秒（包含用户互动时间）

## 核心功能

### 自动检测
- 首次访问 → 自动显示引导
- 再次访问 → 直接进入游戏

### 可跳过
- 任何时候点击"跳过引导"
- 立即记录为已完成
- 下次不再显示

### 手动重置
```javascript
// 浏览器控制台执行
window.resetOnboarding()

// 或
OnboardingSystem.reset()
```

## 文件说明

| 文件 | 用途 |
|------|------|
| `onboarding.js` | 核心系统（19KB） |
| `crisis-mission.html` | 游戏主页（已整合） |
| `test-onboarding.html` | 独立测试页面 |
| `test-onboarding-integration.html` | 集成验证工具 |
| `ONBOARDING_SYSTEM_README.md` | 详细文档 |
| `ONBOARDING_IMPLEMENTATION.md` | 实现总结 |

## 常用命令

### 控制台命令
```javascript
// 重置引导状态
window.resetOnboarding()

// 检查是否完成
localStorage.getItem('onboarding_completed')

// 强制标记为已完成
localStorage.setItem('onboarding_completed', 'true')

// 强制标记为未完成
localStorage.removeItem('onboarding_completed')
```

## 测试清单

- [ ] 首次打开游戏，自动显示引导
- [ ] 可以点击"跳过引导"
- [ ] 可以完整体验5个步骤
- [ ] 第3步可以点击高亮按钮
- [ ] 完成后不再显示引导
- [ ] 可以通过控制台重置

## 下一步

1. **查看详细文档**
   ```
   打开: ONBOARDING_SYSTEM_README.md
   ```

2. **了解实现细节**
   ```
   打开: ONBOARDING_IMPLEMENTATION.md
   ```

3. **自定义引导内容**
   ```
   编辑: onboarding.js
   修改: steps 数组
   ```

## 支持

遇到问题？
1. 检查控制台是否有错误
2. 确认 onboarding.js 已正确加载
3. 查看 ONBOARDING_SYSTEM_README.md 的"常见问题"部分

---

**快速链接：**
- [详细文档](./ONBOARDING_SYSTEM_README.md)
- [实现总结](./ONBOARDING_IMPLEMENTATION.md)
- [游戏主页](./crisis-mission.html)
- [测试页面](./test-onboarding.html)
