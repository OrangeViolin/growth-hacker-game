# 经营模拟核心系统文档

## 系统概述

本游戏实现了两个核心系统：
1. **资源系统 (Resource System)** - 管理5种核心资源
2. **随机事件系统 (Event System)** - 实现3类随机事件

---

## 一、资源系统 (resource-system.js)

### 1.1 核心资源

游戏包含5种核心资源：

| 资源 | 图标 | 初始值 | 上限 | 临界值 | 说明 |
|------|------|--------|------|--------|------|
| 现金 (cash) | 💰 | 10,000 | 100,000 | 2,000 | 维持公司运营，低于临界值触发警告 |
| 时间 (time) | ⏰ | 180 | 180 | 30 | 完成任务的剩余时间 |
| 精力 (energy) | ⚡ | 100 | 100 | 20 | 个人精力值，影响决策质量 |
| 信任 (trust) | 🤝 | 80 | 100 | 30 | 团队和投资人信任度 |
| 声誉 (reputation) | ⭐ | 60 | 100 | 25 | 行业内声誉值 |

### 1.2 资源机制

#### 消耗机制
```javascript
// 单个资源消耗
resourceSystem.consume('cash', 1000, '广告投放');

// 批量资源消耗
resourceSystem.consumeMultiple({
    cash: 1000,
    time: 30,
    energy: 15
}, '市场调研');
```

#### 恢复机制
```javascript
// 增加资源
resourceSystem.gain('trust', 10, '成功完成任务');

// 自动恢复（每小时恢复5点精力）
resourceSystem.startAutoRecovery('energy', 5, 3600000);
```

#### 资源检查
```javascript
// 检查是否有足够资源
const check = resourceSystem.canAfford({
    cash: 5000,
    time: 60
});

if (check.canAfford) {
    // 执行操作
} else {
    console.log('资源不足:', check.insufficient);
}
```

### 1.3 资源状态

资源有3种状态：
- **normal** - 正常状态
- **critical** - 临界状态（低于临界值）
- **empty** - 耗尽状态（降至最低值）

### 1.4 资源事件监听

```javascript
// 监听临界值事件
resourceSystem.on('onCritical', (data) => {
    alert(`${data.resource.name}告急！当前：${data.value}`);
});

// 监听资源耗尽
resourceSystem.on('onEmpty', (data) => {
    if (data.type === 'cash') {
        // 游戏失败：资金链断裂
        gameOver('资金链断裂');
    }
});

// 监听资源变化
resourceSystem.on('onChange', (data) => {
    console.log(`${data.type}从${data.oldValue}变为${data.newValue}`);
});
```

### 1.5 资源UI

资源UI自动显示5个资源条：

```javascript
// 初始化资源UI
const resourceUI = new ResourceUI(resourceSystem, 'resource-container');

// UI会自动：
// 1. 显示当前值和百分比
// 2. 临界值时显示警告动画
// 3. 资源变化时显示过渡动画
```

---

## 二、事件系统 (event-system.js)

### 2.1 事件类型

游戏包含3类事件：

| 类型 | 英文标识 | 图标 | 说明 | 示例 |
|------|----------|------|------|------|
| 机会 | opportunity | 📈 | 正面事件，可获得资源或优势 | 投资人关注、媒体采访 |
| 危机 | crisis | ⚠️ | 负面事件，需要应对 | 员工离职、系统Bug |
| 里程碑 | milestone | 🎉 | 重大节点，需要决策 | 用户突破10000 |

### 2.2 事件触发

#### 触发概率
- 每周30%概率触发事件
- 每个行动视为一周的工作

#### 触发条件
每个事件可以设置触发条件：

```javascript
{
    triggerCondition: (resources) => {
        // 声誉>60才能触发
        return resources.reputation.value > 60;
    }
}
```

#### 事件稀有度
事件有4个稀有度等级，影响触发权重：
- **common** (普通) - 权重50
- **uncommon** (罕见) - 权重30
- **rare** (稀有) - 权重15
- **epic** (史诗) - 权重5

### 2.3 事件结构

每个事件包含：

```javascript
{
    id: 'opportunity_1',                    // 事件ID
    type: 'opportunity',                    // 事件类型
    title: '天使投资人关注',               // 事件标题
    description: '一位天使投资人...',       // 事件描述
    context: '他的投资风格...',             // 背景信息
    icon: '💰',                             // 事件图标
    rarity: 'rare',                         // 稀有度
    triggerCondition: (resources) => {},    // 触发条件
    choices: [                              // 选择列表
        {
            id: 'accept',                   // 选择ID
            text: '立即约见面',             // 选择文本
            cost: {                         // 资源消耗
                time: 45,
                energy: 20
            },
            outcome: {                      // 结果
                success: {                  // 成功结果
                    text: '你打动了投资人！',
                    effects: {              // 资源效果
                        cash: 50000,
                        reputation: 15
                    }
                },
                fail: {                     // 失败结果（可选）
                    text: '准备不充分...',
                    effects: {
                        reputation: -5
                    }
                }
            },
            successRate: 0.7                // 成功率
        }
    ]
}
```

### 2.4 事件使用

#### 触发事件
```javascript
// 尝试触发事件（返回事件对象或null）
const event = eventSystem.tryTriggerEvent();

if (event) {
    console.log('触发事件:', event.title);
}
```

#### 玩家选择
```javascript
// 玩家做出选择
const result = eventSystem.makeChoice('accept');

if (result.success) {
    console.log('成功:', result.outcome.text);
    // 资源效果已自动应用
} else {
    console.log('失败或资源不足');
}
```

#### 添加自定义事件
```javascript
eventSystem.addEvent({
    id: 'custom_event',
    type: 'opportunity',
    title: '新机会',
    description: '描述...',
    context: '背景...',
    icon: '🎯',
    rarity: 'common',
    choices: [/* 选择列表 */]
});
```

### 2.5 事件监听

```javascript
// 监听事件触发
eventSystem.on('onEventTrigger', (event) => {
    console.log('事件触发:', event.title);
});

// 监听选择完成
eventSystem.on('onChoiceMade', (data) => {
    console.log('玩家选择:', data.choice.text);
    console.log('结果:', data.isSuccess ? '成功' : '失败');
});

// 监听事件完成
eventSystem.on('onEventComplete', (data) => {
    console.log('事件完成:', data.event.title);
});
```

### 2.6 事件UI

事件UI会自动显示弹窗：

```javascript
// 初始化事件UI
const eventUI = new EventUI(eventSystem, 'event-overlay');

// UI自动处理：
// 1. 显示事件弹窗
// 2. 显示选择和消耗
// 3. 处理玩家点击
// 4. 显示结果动画
```

---

## 三、整合到游戏

### 3.1 在 crisis-mission.html 中的整合

#### 步骤1：引入脚本
```html
<script src="resource-system.js"></script>
<script src="event-system.js"></script>
```

#### 步骤2：初始化系统
```javascript
// 初始化资源系统
let resourceSystem = new ResourceSystem();
let resourceUI = new ResourceUI(resourceSystem, 'resource-container');

// 初始化事件系统
let eventSystem = new EventSystem(resourceSystem);
let eventUI = new EventUI(eventSystem, 'event-overlay');
```

#### 步骤3：在行动中消耗资源
```javascript
function takeAction(actionId) {
    const action = actions[actionId];

    // 检查并消耗资源
    const costs = {
        time: action.time,
        energy: Math.floor(action.time / 3)
    };

    if (!resourceSystem.consumeMultiple(costs, action.name)) {
        alert('资源不足！');
        return;
    }

    // 执行行动
    // ...

    // 尝试触发事件
    eventSystem.tryTriggerEvent();
}
```

#### 步骤4：监听资源危机
```javascript
// 现金耗尽 -> 游戏失败
resourceSystem.on('onEmpty', (data) => {
    if (data.type === 'cash') {
        gameOver('资金链断裂！');
    }
});

// 信任耗尽 -> 游戏失败
resourceSystem.on('onEmpty', (data) => {
    if (data.type === 'trust') {
        gameOver('信任崩塌！');
    }
});

// 精力耗尽 -> 强制休息
resourceSystem.on('onEmpty', (data) => {
    if (data.type === 'energy') {
        resourceSystem.consume('time', 30, '强制休息');
        resourceSystem.gain('energy', 50, '休息恢复');
    }
});
```

---

## 四、内置示例事件

### 4.1 机会事件

1. **天使投资人关注** (rare)
   - 可获得5万现金投资
   - 提升声誉和信任
   - 需要消耗时间和精力准备

2. **媒体采访邀请** (uncommon)
   - 成功后流量暴增，声誉提升
   - 失败可能引发公关危机
   - 需要精心准备

### 4.2 危机事件

1. **核心员工要离职** (common)
   - 需要加薪或给期权挽留
   - 处理不当会损失信任
   - 多种应对策略

2. **严重Bug被发现** (common)
   - 需要紧急修复
   - 延误会造成声誉损失
   - 测试疲劳管理能力

### 4.3 里程碑事件

1. **用户突破10,000** (epic)
   - 重大成长节点
   - 需要决定扩容策略
   - 影响未来发展方向

---

## 五、扩展指南

### 5.1 添加新资源

```javascript
// 在 ResourceSystem 构造函数中添加
this.resources.newResource = {
    name: '新资源',
    icon: '🔥',
    value: 50,
    max: 100,
    min: 0,
    critical: 20,
    color: '#FF6B6B',
    unit: '点',
    description: '资源描述'
};
```

### 5.2 创建新事件

```javascript
const newEvent = {
    id: 'new_event',
    type: 'opportunity',
    title: '新事件标题',
    description: '事件描述',
    context: '背景信息',
    icon: '🎯',
    rarity: 'uncommon',
    triggerCondition: (resources) => {
        return resources.cash.value > 5000;
    },
    choices: [
        {
            id: 'choice_1',
            text: '选择1',
            cost: { time: 30 },
            outcome: {
                success: {
                    text: '成功文本',
                    effects: { reputation: 10 }
                }
            },
            successRate: 0.8
        }
    ]
};

eventSystem.addEvent(newEvent);
```

### 5.3 调整触发概率

```javascript
// 设置事件触发概率（默认30%）
eventSystem.setTriggerProbability(0.5); // 50%概率
```

---

## 六、CSS样式类

### 6.1 资源系统样式

- `.resource-panel` - 资源面板容器
- `.resource-item` - 单个资源项
- `.resource-item.critical` - 临界状态
- `.resource-item.empty` - 耗尽状态
- `.resource-bar` - 资源条
- `.resource-change` - 变化动画

### 6.2 事件系统样式

- `.event-overlay` - 事件遮罩层
- `.event-modal` - 事件弹窗
- `.event-header.opportunity` - 机会类型头部
- `.event-header.crisis` - 危机类型头部
- `.event-header.milestone` - 里程碑类型头部
- `.event-choice` - 事件选择
- `.event-outcome.success` - 成功结果
- `.event-outcome.fail` - 失败结果

---

## 七、测试建议

### 7.1 资源系统测试

```javascript
// 测试资源消耗
resourceSystem.consume('cash', 5000, '测试');

// 测试临界状态
resourceSystem.set('cash', 1500, '测试');

// 测试资源耗尽
resourceSystem.set('trust', 0, '测试');

// 查看历史
console.log(resourceSystem.getHistory('cash'));
```

### 7.2 事件系统测试

```javascript
// 强制触发事件（调试用）
eventSystem.setTriggerProbability(1.0); // 100%触发

// 查看可用事件
const available = eventSystem.getAvailableEvents();
console.log('可用事件:', available);

// 查看事件历史
console.log(eventSystem.getHistory());
```

---

## 八、性能优化

### 8.1 资源系统
- 历史记录限制在最近100条
- 使用节流优化UI更新频率
- 事件监听器自动去重

### 8.2 事件系统
- 历史记录限制在最近50个事件
- 最近5个事件不会重复触发
- 事件触发条件预检查

---

## 九、常见问题

### Q1: 如何禁用事件系统？
```javascript
eventSystem.setTriggerProbability(0);
```

### Q2: 如何让某个资源无限？
```javascript
resourceSystem.resources.cash.max = Infinity;
```

### Q3: 如何手动触发特定事件？
```javascript
const event = eventSystem.events.find(e => e.id === 'opportunity_1');
eventSystem.activeEvent = event;
eventUI.show(event);
```

### Q4: 如何保存/读取进度？
```javascript
// 导出状态
const saveData = {
    resources: resourceSystem.export(),
    events: eventSystem.export()
};
localStorage.setItem('gameSave', JSON.stringify(saveData));

// 导入状态
const saveData = JSON.parse(localStorage.getItem('gameSave'));
resourceSystem.import(saveData.resources);
eventSystem.import(saveData.events);
```

---

## 十、总结

本系统实现了完整的经营模拟核心功能：

✅ **资源系统**
- 5种核心资源管理
- 资源消耗和恢复机制
- 临界值和耗尽状态处理
- 可视化资源条UI

✅ **事件系统**
- 3类事件（机会/危机/里程碑）
- 30%触发概率
- 多选项决策系统
- 成功率和后果机制
- 5个完整示例事件

✅ **游戏整合**
- 行动消耗资源
- 资源不足触发危机
- 事件弹窗显示
- 完整的游戏循环

系统设计遵循模块化原则，易于扩展和维护。所有功能都经过测试，可直接用于游戏开发。
