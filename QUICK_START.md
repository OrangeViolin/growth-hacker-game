# ⚡ 10分钟快速开始

## 🎯 三步生成游戏

### 第一步：准备Skill文件夹（5分钟）
```bash
# 使用 pdf2skill 工具转换书籍
pdf2skill 你的书籍.pdf

# 得到skill文件夹：
书籍名称-output/
├── skill-1/
│   ├── SKILL.md
│   └── references/
├── skill-2/
└── ... (100+个skills)
```

### 第二步：打开模板（1分钟）
打开这个文件：
```
ONE_CLICK_GENERATOR.md
```

复制里面的**超级Prompt**（完整的那一大段）

### 第三步：粘贴给AI（10分钟）
```
1. 把【skill文件夹路径】替换成你的实际路径
2. 粘贴给Claude Code
3. 等待10分钟
4. ✅ 游戏自动生成完成！
```

---

## 📦 你会得到什么

```
生成的文件：
├── index.html              (主菜单)
├── crisis-mission.html     (游戏页面)
├── levels-data.js          (10个关卡)
├── resource-system.js      (资源系统)
├── event-system.js         (随机事件)
├── onboarding.js           (新手引导)
└── README.md               (说明文档)

效果：
✅ 完全复制 growth-hacker-game 的UI
✅ 暗色赛博朋克风格
✅ 时间压力型闯关游戏
✅ 资源管理系统
✅ 移动端完美适配
✅ 可直接部署到GitHub Pages
```

---

## 🎮 立即测试

生成完成后：
```bash
# 在浏览器中打开
open index.html

# 或者启动本地服务器
python -m http.server 8000
# 访问 http://localhost:8000
```

---

## 🚀 部署上线

```bash
# 初始化Git
git init
git add .
git commit -m "Add learning game"

# 推送到GitHub
gh repo create 你的游戏名 --public
git push origin main

# 启用GitHub Pages
gh repo edit --enable-pages

# 在线地址
https://你的用户名.github.io/你的游戏名/
```

---

## 🔧 常见问题

**Q: 需要编程基础吗？**
A: 不需要！只需要复制粘贴。

**Q: 生成需要多久？**
A: 10-15分钟（AI自动完成）

**Q: 可以自定义吗？**
A: 可以！生成后可以修改：
- 颜色主题（改CSS变量）
- 关卡内容（改levels-data.js）
- 资源配置（改resource-system.js）

**Q: 支持哪些书籍？**
A: 任何通过pdf2skill转换的书籍都可以！

**Q: 游戏效果如何？**
A: 和 growth-hacker-game 完全一样！
在线体验：https://orangeviolin.github.io/growth-hacker-game/

---

## 📚 相关文档

- **ONE_CLICK_GENERATOR.md** - 完整的超级Prompt
- **DESIGN_SPECIFICATIONS.md** - 所有参数配置
- **README_TEMPLATE_SYSTEM.md** - 完整说明

---

**现在就开始！打开 ONE_CLICK_GENERATOR.md** 🚀
