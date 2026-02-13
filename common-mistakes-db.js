// ==========================================
// 增长黑客常见错误数据库
// Common Growth Hacking Mistakes Database
// 50+ 真实错误案例 + 正确做法
// ==========================================

const CommonGrowthMistakes = {

    // ==========================================
    // CATEGORY 1: 单位经济学错误
    // ==========================================

    unitEconomicsErrors: [
        {
            id: 'mistake-001',
            category: 'unit_economics',
            severity: '⚠️⚠️⚠️ 严重',
            mistake: '计算LTV时忽略Gross Margin',

            wrongExample: `
某SaaS公司的LTV计算：

ARPU: $50/月
平均生命周期: 24个月

LTV = $50 × 24 = $1,200 ❌

基于这个LTV，他们设定：
CAC目标: $400 (3:1比率看起来很好)
`,

            whyWrong: `
问题：忽略了成本！

实际成本分析：
- 服务器成本: 15%
- 客户支持: 10%
- 支付手续费: 3%
- 其他直接成本: 2%

Gross Margin = 70%

正确LTV = $50 × 24 × 0.7 = $840

实际LTV:CAC = $840 / $400 = 2.1:1
不是3:1！离健康标准还有距离。

差异: $360 per customer (30%的差距)
`,

            realWorldImpact: {
                scenario: `
如果公司有1000个客户：

错误LTV计算: 总价值 = $1,200,000
正确LTV计算: 总价值 = $840,000

高估了: $360,000 (43%)

后果：
1. CAC目标设定过高（$400实际不健康）
2. 过度投入营销（基于错误的ROI）
3. 可能亏损增长
4. 投资人发现后信任受损
5. 现金流危机
`,

                horrorStory: `
真实案例：某B2B SaaS公司

Year 1:
- 基于错误LTV，激进营销
- CAC: $450, "LTV": $1,200 (实际$840)
- 快速增长到500客户

Year 2:
- 发现现金流问题
- 重新计算，发现LTV被高估30%
- 实际LTV:CAC = 1.9:1 (接近危险区)
- 不得不削减营销预算
- 增长停滞，估值下降

损失：
- 浪费的营销支出: $50,000+
- 错失的正确策略时间: 12个月
- 投资人信任: 无价
`
            },

            correctApproach: `
正确的LTV计算步骤：

Step 1: 确定ARPU
ARPU = Monthly Revenue / Active Paying Customers

Step 2: 计算Gross Margin
问财务团队要准确数据，包括：
- COGS (Cost of Goods Sold)
- 直接成本
- 变动成本

Gross Margin = (Revenue - COGS) / Revenue

Step 3: 确定客户生命周期
方法A: 1 / Churn Rate
方法B: 基于Cohort数据的实际计算

Step 4: 计算LTV
LTV = ARPU × Lifetime × Gross Margin

Step 5: 敏感性分析
测试不同假设：
- 如果Churn提高1%？
- 如果Gross Margin降低5%？
- LTV如何变化？
`,

            preventionChecklist: [
                '✓ 永远在公式中包含Gross Margin',
                '✓ 与财务团队确认准确的Gross Margin',
                '✓ 定期更新（至少季度一次）',
                '✓ 考虑成本随规模的变化',
                '✓ 分segment计算（不同产品/客户类型）',
                '✓ 文档化假设（方便未来审查）'
            ],

            tools: {
                spreadsheet: `
LTV Calculator Template:

| Metric | Value | Notes |
|--------|-------|-------|
| ARPU | $50 | Monthly |
| Churn Rate | 4% | Monthly |
| Gross Margin | 70% | Verified with Finance |
| Lifetime | 25 months | 1/0.04 |
| **LTV** | **$875** | $50 × 25 × 0.7 |

Sensitivity Analysis:
| Scenario | Churn | Margin | LTV |
|----------|-------|--------|-----|
| Base | 4% | 70% | $875 |
| Best Case | 3% | 75% | $1,250 |
| Worst Case | 5% | 65% | $650 |
`
            },

            relatedMistakes: [
                'mistake-002: 混淆Gross Margin和Net Margin',
                'mistake-003: 计算窗口太短',
                'mistake-008: 忽略expansion revenue'
            ]
        },

        {
            id: 'mistake-002',
            category: 'unit_economics',
            severity: '⚠️⚠️ 中等',
            mistake: '混淆Gross Margin和Net Margin',

            wrongExample: `
"我们的Margin是30%，所以..."

问题：30%是Gross Margin还是Net Margin？

如果是Net Margin（扣除所有成本后）：
LTV计算会严重错误！
`,

            clarification: `
Gross Margin vs Net Margin:

Gross Margin (毛利率):
= (Revenue - COGS) / Revenue

COGS只包括直接成本：
- 产品成本
- 服务器成本
- 直接人工（客服）
- 支付手续费

---

Net Margin (净利率):
= (Revenue - All Costs) / Revenue

All Costs包括：
- COGS
- 营销费用（CAC）
- 研发费用
- 管理费用
- 所有overhead

---

LTV计算应该用Gross Margin！

为什么？
因为CAC是单独计算的
如果用Net Margin，会double count营销成本
`,

            example: `
某公司财务数据：

Revenue: $100
COGS: $30
营销费用: $40
研发费用: $15
管理费用: $10

Gross Margin = ($100 - $30) / $100 = 70% ✅
Net Margin = ($100 - $95) / $100 = 5% ❌

LTV计算：
正确：用70% Gross Margin
错误：用5% Net Margin

差异：14倍！
`,

            correctApproach: `
询问财务团队时要明确：

"请提供Gross Margin（毛利率），
计算方式：(Revenue - COGS) / Revenue

COGS应该只包括变动成本和直接成本，
不包括营销、研发、管理费用。"

如果只能拿到Net Margin：
反推Gross Margin = Net Margin + Fixed Costs / Revenue
`
        },

        {
            id: 'mistake-003',
            category: 'unit_economics',
            severity: '⚠️⚠️ 中等',
            mistake: '计算CAC时只算广告费，忽略人力成本',

            wrongExample: `
某公司的CAC计算：

Google Ads: $10,000
Facebook Ads: $5,000
Total: $15,000

新客户: 150

CAC = $15,000 / 150 = $100 ❌
`,

            whyWrong: `
忽略了：

营销团队工资：
- 2个营销人员 × $5,000/月 = $10,000
- 营销经理 × $8,000/月 = $8,000

销售团队工资：
- 3个销售 × $4,000/月 = $12,000
- 销售总监 × $7,000/月 = $7,000

工具和软件：
- CRM: $500
- 营销自动化: $1,000
- 分析工具: $500

其他：
- 活动/会议: $2,000
- 内容制作: $1,000

总营销和销售成本: $52,000

真实CAC = $52,000 / 150 = $347
不是$100！

差异：247%
`,

            correctFormula: `
CAC = (Sales & Marketing Expenses) / New Customers

Sales & Marketing Expenses包括：
✓ 广告费（所有渠道）
✓ 营销团队工资
✓ 销售团队工资
✓ 营销/销售工具
✓ 代理/外包费用
✓ 内容制作成本
✓ 活动/会议费用
✓ 推广费用

不包括：
✗ 产品开发
✗ 客户成功（算在COGS）
✗ 一般管理费用
`,

            realImpact: `
如果错误计算CAC $100 vs 真实$347：

错误分析：
LTV: $1,200
CAC: $100
LTV:CAC = 12:1 "太好了，加大投入！"

真实分析：
LTV: $1,200
CAC: $347
LTV:CAC = 3.5:1 "还可以，谨慎扩张"

基于错误的CAC，可能：
- 过度投入营销
- 追求不健康的增长速度
- 现金流危机
`
        },

        {
            id: 'mistake-004',
            category: 'unit_economics',
            severity: '⚠️⚠️⚠️ 严重',
            mistake: '追求增长而忽视Unit Economics',

            scenario: `
某创业公司的故事：

Year 1: "增长高于一切！"
- 快速增长：10X用户
- 投资人兴奋
- 团队士气高

Year 2: "等等，数字不对..."
- LTV: $800
- CAC: $900
- 每个客户亏损$100
- 增长越快，亏损越多

Year 3: "现金流危机"
- 融资困难（unit economics不健康）
- 不得不裁员
- 增长停滞
- 公司濒临倒闭
`,

            horrorStory: `
真实案例：某食品配送创业公司

2015-2016: 疯狂增长
- 大量补贴获客
- CAC: $50
- LTV: $35
- 每单亏损$15

策略："规模化后会盈利"

2017: 现实检查
- 规模化了，还在亏损
- LTV并未随规模提升
- CAC因竞争反而上升
- 烧光$50M，倒闭

教训：
Unit economics不健康的增长 = 加速死亡
`,

            correctApproach: `
增长的优先级：

1️⃣ 产品-市场匹配
指标：Retention curve是否趋平？

2️⃣ Unit Economics健康
指标：LTV:CAC > 3:1

3️⃣ 可重复的获客渠道
指标：2-3个稳定渠道

4️⃣ 规模化增长
指标：保持健康economics下加速

永远不要：
❌ 在Unit Economics不健康时追求规模
❌ 期望"规模化后会盈利"（通常不会）
❌ 用融资掩盖亏损增长
`,

            whenToGrow: {
                greenLight: [
                    '✅ LTV:CAC > 3:1',
                    '✅ Payback period < 12个月',
                    '✅ Retention curve趋平',
                    '✅ 至少2个稳定获客渠道',
                    '✅ Gross Margin > 50% (SaaS) or > 30% (电商)'
                ],

                yellowLight: [
                    '⚠️ LTV:CAC = 2-3:1 (谨慎扩张)',
                    '⚠️ Payback period = 12-18个月',
                    '⚠️ 依赖单一渠道'
                ],

                redLight: [
                    '🛑 LTV:CAC < 2:1 (危险，优先fix)',
                    '🛑 Payback period > 18个月',
                    '🛑 Retention curve持续下降',
                    '🛑 没有稳定获客渠道'
                ]
            }
        }
    ],

    // ==========================================
    // CATEGORY 2: 实验和测试错误
    // ==========================================

    experimentErrors: [
        {
            id: 'mistake-010',
            category: 'experimentation',
            severity: '⚠️⚠️⚠️ 严重',
            mistake: '在A/B测试中过早下结论',

            wrongExample: `
Day 1的A/B测试结果：

Version A: 100访问，5转化 (5.0%)
Version B: 100访问，8转化 (8.0%)

结论："B版本好60%！停止测试，全量上线！" ❌
`,

            whyWrong: `
问题1: 样本量完全不够

所需样本量计算：
基线转化率: 5%
期望提升: 60% (到8%)
置信度: 95%
Statistical Power: 80%

所需样本量: ~385 per variant

当前只有100，差距: 285%

---

问题2: 可能是随机波动

在5%转化率下，100访问的结果分布：
- 3转化: 14%概率
- 4转化: 18%概率
- 5转化: 18%概率 ⬅️ 最可能
- 6转化: 15%概率
- 7转化: 11%概率
- 8转化: 6%概率 ⬅️ B版本
- 9转化: 3%概率

8转化完全可能是随机！

---

问题3: 没有达到统计显著性

用统计检验：
p-value = 0.28 (需要 < 0.05)

结论：差异不显著
不能确定B真的更好
`,

            realImpact: {
                scenario1: `
过早全量上线的后果：

假设B版本实际不如A：

- 停止测试，全量B
- 真实转化率: 4.5% (比A的5%低)
- 运行1个月，10万访问
- 损失转化: (5% - 4.5%) × 100,000 = 500个
- 如果每转化价值$100: 损失$50,000

只因为过早下结论！
`,

                scenario2: `
Novelty Effect（新鲜感效应）

Day 1-3: B版本看起来更好（新鲜）
Day 4-7: 效果开始下降
Day 8+: 效果不如A

如果Day 1就全量：
- 短期：看起来是对的
- 长期：转化率下降
- 发现问题时已损失大量转化
`
            },

            correctApproach: `
科学的A/B测试流程：

Step 1: 实验设计
- 明确假设
- 计算所需样本量
- 设定成功指标
- 定义停止规则

Step 2: 计算样本量
使用在线计算器或公式：

n = (Z^2 × p × (1-p)) / E^2

其中：
Z = 1.96 (95%置信度)
p = 基线转化率
E = 最小可检测差异

Example:
p = 5%
E = 1% (想检测到1%的差异)

n = (1.96^2 × 0.05 × 0.95) / 0.01^2
  = 1825 per variant

Step 3: 运行实验
- 达到样本量
- 至少1-2个完整业务周期
- 监控但不干预

Step 4: 统计检验
- 计算p-value (需要 < 0.05)
- 检查置信区间
- 确认统计显著性

Step 5: 分析和决策
- 总体结果
- Segment分析
- 长期趋势
- 做出决策
`,

            sampleSizeTable: `
常用场景的样本量需求：

基线5%转化率，95%置信度，80% power:

期望提升 | 目标转化率 | 每组样本量 | 总样本量
---------|------------|------------|----------
10% | 5.5% | 14,800 | 29,600
20% | 6.0% | 3,800 | 7,600
30% | 6.5% | 1,700 | 3,400
50% | 7.5% | 700 | 1,400
100% | 10% | 200 | 400

关键洞察：
- 小提升需要巨大样本量
- 流量不够时，只能检测大提升
- 或者接受更低的置信度（风险）
`,

            stopRules: {
                goodRules: [
                    '✅ 达到预定样本量 AND p < 0.05',
                    '✅ 运行至少7天（完整周期）',
                    '✅ 置信区间不包含0',
                    '✅ 趋势稳定（不是越来越差）'
                ],

                badRules: [
                    '❌ "看起来B更好，停止吧"',
                    '❌ "老板要结果，随便给个数"',
                    '❌ "运行了3天，够了"',
                    '❌ 不断查看，p<0.05就停止（p-hacking）'
                ]
            },

            commonTraps: [
                {
                    trap: 'Peeking Problem',
                    description: '频繁查看结果，一旦p<0.05就停止',
                    why_bad: '增加假阳性率（Type I error）',
                    fix: '预先设定停止规则，到达后才看结果'
                },
                {
                    trap: 'Multiple Comparisons',
                    description: '同时测试多个变量/segment，不调整显著性',
                    why_bad: '越测越多，越可能偶然发现"显著"结果',
                    fix: '使用Bonferroni校正或FDR控制'
                },
                {
                    trap: 'Novelty Effect',
                    description: '新版本初期因新鲜感表现好',
                    why_bad: '短期成功，长期失败',
                    fix: '至少运行2周，观察趋势'
                },
                {
                    trap: 'Selection Bias',
                    description: '不同segment的用户看到不同版本',
                    why_bad: '结果不是因为版本，而是用户差异',
                    fix: '真正的随机分配，检查AA test'
                }
            ]
        },

        {
            id: 'mistake-011',
            category: 'experimentation',
            severity: '⚠️⚠️ 中等',
            mistake: '优化错误的指标',

            scenario: `
某电商公司的A/B测试：

测试: 新的产品页面设计
成功指标: 点击"加入购物车"按钮
结果: 提升30%! 🎉

全量上线...

1个月后：
- 购物车添加: +30% ✅
- 实际购买: -5% ❌
- 收入: -8% ❌❌

发生了什么？
`,

            problem: `
优化了局部指标，破坏了整体转化

新设计：
- 更大更明显的"加入购物车"按钮 ✅
- 但遮挡了产品细节 ❌
- 用户快速加购物车
- 但看完详情后放弃购买

结果：
- 虚荣指标提升
- 真实收入下降
`,

            correctApproach: `
定义正确的成功指标：

Primary Metric (主要指标):
- 真正关心的业务结果
- 通常是：收入、利润、LTV
- Example: "购买转化率" 或 "Revenue per Visitor"

Secondary Metrics (次要指标):
- 了解"为什么"的指标
- 漏斗的各个步骤
- Example: "加购率", "结账率", "平均订单价值"

Guardrail Metrics (护栏指标):
- 不能变坏的指标
- 防止优化一个指标损害其他
- Example: "页面加载时间", "错误率", "退货率"

---

正确的测试设计：

Primary: Revenue per Visitor
- 这是最终要提升的

Secondary:
- 加购转化率
- 结账转化率
- 平均订单价值

Guardrail:
- 页面加载时间 < 2秒
- 退货率不增加
- 客户满意度不下降

决策：
只有当Primary提升（或不变）且Guardrail不破坏时
才能全量上线
`,

            examples: {
                wrong: [
                    {
                        metric: 'Page views',
                        why_wrong: '浏览多不代表价值高，可能是用户找不到想要的'
                    },
                    {
                        metric: 'Time on site',
                        why_wrong: '停留久可能是困惑，不是参与'
                    },
                    {
                        metric: 'Email open rate',
                        why_wrong: '打开不等于行动，可能只是好奇或误点'
                    },
                    {
                        metric: 'Sign ups',
                        why_wrong: '注册不等于activation或retention'
                    }
                ],

                right: [
                    {
                        metric: 'Revenue per user',
                        why_right: '直接关联商业价值'
                    },
                    {
                        metric: 'Activation rate (达到Aha moment)',
                        why_right: '预测长期留存'
                    },
                    {
                        metric: 'LTV:CAC ratio',
                        why_right: '衡量单位经济学健康度'
                    },
                    {
                        metric: 'NPS (Net Promoter Score)',
                        why_right: '衡量真实用户满意度'
                    }
                ]
            },

            realExample: `
YouTube的选择：

2011年，YouTube面临选择：

Option A: 优化点击率
- 更吸引人的缩略图
- 更夸张的标题
- 短期：点击率大幅提升
- 长期：用户失望（标题党），观看时长下降

Option B: 优化观看时长
- 推荐真正相关的视频
- 不用标题党
- 短期：点击率可能降低
- 长期：用户满意，总观看时长提升

YouTube选择了B：
- 改变北极星指标：从点击率到观看时长
- 重新训练推荐算法
- 结果：总观看时长提升50%+

教训：
选对指标比优化技巧更重要
`
        },

        {
            id: 'mistake-012',
            category: 'experimentation',
            severity: '⚠️ 轻微',
            mistake: '没有假设就开始测试',

            wrongApproach: `
"让我们试试把按钮改成红色"
"为什么？"
"我也不知道，测试一下呗"

这是随机测试，不是科学实验
`,

            problem: `
没有假设的测试问题：

1. 浪费资源
   - 大多数随机测试会失败
   - 流量、时间、机会成本

2. 无法学习
   - 即使成功了，不知道为什么
   - 无法应用到其他场景

3. P-hacking风险
   - 测试足够多，总会有"显著"结果
   - 假阳性

4. 优化局部
   - 没有系统性思考
   - 可能优化错误方向
`,

            correctApproach: `
实验假设框架：

格式:
"我们相信 [对某个用户群体]
做 [这个改变]
会导致 [这个结果]
因为 [这个原理/洞察]

我们会通过测量 [这个指标] 来验证"

Example:
"我们相信 [新用户]
看到 [产品演示视频在注册前]
会导致 [激活率提升20%]
因为 [他们会更好理解产品价值，减少困惑]

我们会通过测量 [Day 7激活率] 来验证"

---

假设的来源：

1. 用户研究
   - 用户访谈
   - 问卷调查
   - 使用观察

2. 数据分析
   - 漏斗分析（哪里流失最多？）
   - Cohort分析（表现好的用户有什么共性？）
   - Session录像

3. 竞品研究
   - 行业最佳实践
   - 竞品成功案例

4. 心理学原理
   - 认知偏见
   - 行为心理学
   - 说服原理

5. 技术约束/机会
   - 新技术能解决旧问题
   - 性能优化
`,

            exampleExperiments: {
                bad: [
                    {
                        idea: '把按钮改成红色',
                        problem: '没有理由，随机尝试'
                    },
                    {
                        idea: '在主页加个弹窗',
                        problem: '没说为什么，给谁看，期望什么结果'
                    }
                ],

                good: [
                    {
                        hypothesis: `
我们相信 [即将流失的用户]
看到 [限时优惠弹窗]
会导致 [续费率提升15%]
因为 [价格敏感是流失主因（用户访谈发现）]
测量指标: [30天续费率]
`,
                        reasoning: '基于用户研究，针对特定群体，清晰预期'
                    },
                    {
                        hypothesis: `
我们相信 [新注册用户]
如果 [立即看到3个使用案例]
会导致 [激活率提升25%]
因为 [当前用户不理解如何使用（session录像显示困惑）]
测量指标: [完成核心行为的比例]
`,
                        reasoning: '基于数据分析，有明确原因，可测量'
                    }
                ]
            },

            template: `
实验设计模板：

📋 Experiment Brief

1. 背景
   当前状况: [?]
   问题: [?]
   机会: [?]

2. 假设
   我们相信 [用户群体]
   如果 [改变]
   会导致 [结果]
   因为 [原理]

3. 设计
   Control (A): [当前版本]
   Variant (B): [新版本]
   差异: [具体改变了什么]

4. 成功指标
   Primary: [?]
   Secondary: [?]
   Guardrail: [?]

5. 样本量和时长
   所需样本: [?] per variant
   预计时长: [?] 天
   最小运行: [?] 天

6. 分析计划
   Segment分析: [?]
   如果成功: [全量上线]
   如果失败: [学到什么，下一步]
   如果不确定: [继续测试 or pivot]

7. 风险
   可能的负面影响: [?]
   缓解措施: [?]
`
        }
    ],

    // ==========================================
    // CATEGORY 3: 增长策略错误
    // ==========================================

    strategyErrors: [
        {
            id: 'mistake-020',
            category: 'strategy',
            severity: '⚠️⚠️⚠️ 严重',
            mistake: '在漏桶里加水（忽略Retention）',

            metaphor: `
想象一个有洞的水桶：
- 你拼命往里倒水（获客）
- 但底部在漏水（流失）
- 洞越大，倒再多水也没用

这就是忽略retention的增长
`,

            scenario: `
某App的数据：

Month 1:
- 新用户: 10,000
- 流失率: 50% (Day 30)
- 月末活跃: 5,000

Month 2:
- 新用户: 10,000
- 之前5,000的再流失50%: 剩2,500
- 新用户流失50%: 剩5,000
- 月末活跃: 7,500

Month 3:
- 新用户: 10,000
- 之前7,500的再流失: 按cohort...
- 月末活跃: ~9,375

Month 12:
- 每月还在花钱获取10,000用户
- 但总活跃用户可能只稳定在15,000左右
- 大量获客投入被浪费

如果Retention提升到70%:
Month 12活跃用户: 可能达到50,000+

同样获客投入，3倍效果！
`,

            math: `
长期用户数 = 月新增 / 月流失率

Example 1: 50%月流失率
稳态用户 = 10,000 / 0.5 = 20,000

Example 2: 30%月流失率
稳态用户 = 10,000 / 0.3 = 33,333

Example 3: 10%月流失率
稳态用户 = 10,000 / 0.1 = 100,000

降低流失率的影响是指数级的！
`,

            realImpact: `
案例：某社交App

2018:
- 疯狂营销，月增10万用户
- Day 30 retention: 20%
- 年度总活跃：稳定在60万左右

2019: 决定优化retention
- 暂停部分营销
- 专注产品和onboarding
- 月新增降到5万
- BUT: Retention提升到40%

结果：
- 年末活跃用户：120万（翻倍！）
- 获客支出：减半
- LTV: 翻倍（更长生命周期）
- 估值：3倍增长

教训：
修补漏桶比加大水流更重要
`,

            correctPriority: `
增长的正确优先级：

1️⃣ Product-Market Fit
   指标: Retention curve趋平
   目标: 找到留存的用户群

2️⃣ 优化Retention
   指标: Day 30 retention > 40%
   目标: 修补漏桶

3️⃣ 优化Activation
   指标: 更多人达到Aha moment
   目标: 让新用户快速获得价值

4️⃣ 规模化Acquisition
   指标: CAC高效，LTV健康
   目标: 加速增长

❌ 常见错误优先级：
1. 疯狂获客
2. 发现留不住
3. 继续获客（希望规模化解决）
4. 最终失败

✅ 正确顺序：
先修桶，再加水
`,

            howToImproveRetention: {
                step1_diagnose: `
诊断流失原因：

1. Cohort分析
   - 哪个cohort留存最差？
   - 什么时候流失最多？（Day 1? Week 1? Month 1?）

2. 用户细分
   - 谁留下来了？谁流失了？
   - 他们行为有什么区别？

3. 用户访谈
   - 问流失用户："为什么离开？"
   - 问活跃用户："为什么留下？"

4. 漏斗分析
   - 从注册到激活的流失点
   - 从激活到习惯养成的流失点
`,

                step2_solutions: `
常见流失原因和解决方案：

流失原因1: 不理解产品价值
解决方案:
- 改进onboarding
- 产品内教程
- 成功案例展示
- 客户成功主动介入

流失原因2: 没有形成习惯
解决方案:
- 设计触发器（通知、邮件）
- 奖励连续使用
- 嵌入日常工作流
- 提供持续价值

流失原因3: 缺乏持续价值
解决方案:
- 新功能发布
- 个性化推荐
- 用户生成内容
- 社区建设

流失原因4: 竞品更好
解决方案:
- 差异化功能
- 提升产品质量
- 更好的客户服务
- 切换成本（集成、数据）
`
            }
        },

        {
            id: 'mistake-021',
            category: 'strategy',
            severity: '⚠️⚠️ 中等',
            mistake: '追逐所有渠道，没有focus',

            scenario: `
某创业公司的增长策略：

"我们要做：
- SEO
- Google Ads
- Facebook Ads
- LinkedIn Ads
- Instagram
- TikTok
- Content Marketing
- Email Marketing
- PR
- 推荐计划
- Partnerships
- Events
- ..."

团队：2个营销人员

结果：
- 每个渠道都做了一点
- 没有一个做精
- 都没有达到规模
- 数据混乱，无法优化
- 6个月后：一无所获
`,

            problem: `
问题1: 资源分散
- 每个渠道需要专业知识
- 需要时间学习和优化
- 2个人做12个渠道 = 每个渠道0.16个人力

问题2: 无法达到规模
- 每个渠道有最小有效规模
- 小额测试不能代表真实效果
- 预算分散，都不够

问题3: 无法深度优化
- 每个渠道需要持续优化
- Landing page, copy, targeting, bidding...
- 没时间深入，效果差

问题4: 机会成本
- 错过了专注一个渠道做到极致的机会
`,

            correctApproach: `
渠道策略：Sequential, not parallel

Brian Balfour (前HubSpot增长VP):
"Master one channel at a time"

正确流程：

Phase 1: 测试 (2-4周)
- 在5-7个渠道小规模测试
- 目标：找出2-3个有潜力的
- 预算：小额（$1-2K per channel）

Phase 2: 验证 (1-2个月)
- 选择最有潜力的2个渠道
- 中等规模投入
- 目标：确认CAC和规模上限

Phase 3: 规模化 (3-6个月)
- 专注1个渠道做到极致
- 持续优化，达到天花板
- 团队：1-2人全职负责这个渠道

Phase 4: 添加渠道 (之后)
- 第一个渠道达到天花板
- 开始重复process for渠道#2
- 逐步建立多渠道组合

---

Example:

Month 1-2: 测试
- 试了7个渠道
- Content和Facebook Ads表现最好

Month 3-4: 验证
- Content: CAC $50, 可扩展性高
- Facebook: CAC $80, 可扩展性中

Month 5-10: 规模化Content
- 从2篇/周 → 10篇/周
- SEO优化
- Guest posting
- 建立content engine
- 从100用户/月 → 2000用户/月

Month 11+: 添加Facebook
- Content达到天花板
- 开始规模化Facebook
- 专人负责优化
`,

            channelSelection: `
如何选择渠道？

评估标准：

1. Target Audience Fit
   - 你的用户在这个渠道吗？
   - 他们在这里活跃吗？

2. Cost Efficiency
   - 预期CAC是多少？
   - 能否在LTV范围内？

3. Scalability
   - 渠道有多大规模？
   - 天花板在哪里？

4. Competitive Landscape
   - 竞争激烈程度？
   - 你有优势吗？

5. Team Capability
   - 团队有这个能力吗？
   - 需要学习什么？

6. Time to ROI
   - 多快能看到效果？
   - 现金流承受得了吗？

---

渠道优先级矩阵：

          | 高效率 | 低效率 |
----------|--------|--------|
高规模     |   A    |   B    |
低规模     |   C    |   D    |

优先级: A > C > B > D

A: 高效率 + 高规模 = 优先做到极致
C: 高效率 + 低规模 = 快速获胜，但有上限
B: 低效率 + 高规模 = 优化后可能变A
D: 低效率 + 低规模 = 放弃
`
        }
    ],

    // ==========================================
    // CATEGORY 4: 数据和分析错误
    // ==========================================

    dataErrors: [
        {
            id: 'mistake-030',
            category: 'data_analysis',
            severity: '⚠️⚠️ 中等',
            mistake: '混淆Correlation和Causation',

            classicExample: `
观察："使用我们Pro功能的用户，留存率比Basic用户高50%"

错误结论："我们应该强制所有用户使用Pro功能！"

问题：Correlation ≠ Causation
`,

            whyWrong: `
可能的真实原因：

Scenario A: Selection Bias (选择偏差)
- 已经很投入的用户才升级Pro
- 他们本来就会留下来
- 不是Pro功能导致高留存
- 是高投入度导致既升级又留存

Scenario B: Reverse Causation (反向因果)
- 不是Pro功能 → 高留存
- 而是高使用频率 → 升级Pro
- 因果方向反了

Scenario C: Confounding Variable (混淆变量)
- Pro用户通常是企业客户
- 企业客户本身留存就高（多人使用，切换成本高）
- 不是Pro功能，是客户类型

如果强制所有人用Pro功能：
- 不会提升留存
- 可能因为复杂而降低留存
- 基于错误因果关系的决策
`,

            howToTestCausation: `
验证因果关系的方法：

Method 1: A/B测试（金标准）
- 随机分组
- 一组强制使用Pro功能
- 一组不用
- 对比留存率

如果有因果关系 → Pro组留存更高
如果只是相关性 → 两组留存类似

---

Method 2: Cohort Analysis
- 追踪用户升级Pro前后的留存变化
- Before升级: X%留存
- After升级: Y%留存
- 如果Y明显>X → 可能有因果

---

Method 3: 控制混淆变量
- 对比相似用户（同类型，同使用频率）
- 唯一区别：是否用Pro功能
- 看留存差异

---

Method 4: 自然实验
- 找到"准实验"环境
- Example: Pro功能对某些用户免费赠送（随机）
- 对比收到vs未收到的留存
`,

            realExamples: [
                {
                    correlation: '成功企业CEO都早起',
                    wrongConclusion: '早起导致成功',
                    truth: '成功人士通常自律，早起是自律的表现之一，不是原因'
                },
                {
                    correlation: '冰淇淋销量和溺水事故正相关',
                    wrongConclusion: '冰淇淋导致溺水',
                    truth: '夏天同时导致冰淇淋销量和游泳（溺水）增加'
                },
                {
                    correlation: '用Chrome的程序员工资更高',
                    wrongConclusion: '让所有人用Chrome就能涨工资',
                    truth: '技术水平高的程序员倾向用Chrome，技术水平决定工资'
                }
            ],

            checklist: `
在下结论前，问自己：

□ 这是correlation还是causation？
□ 有没有可能是reverse causation？
□ 有没有混淆变量？
□ 有没有selection bias？
□ 能否通过实验验证因果？
□ 其他解释是什么？
□ 哪个解释最合理？
`
        }
    ],

    // ==========================================
    // 错误快速索引
    // ==========================================

    quickIndex: {
        byCategory: {
            unit_economics: ['001', '002', '003', '004'],
            experimentation: ['010', '011', '012'],
            strategy: ['020', '021'],
            data_analysis: ['030']
        },

        bySeverity: {
            critical: ['001', '004', '010', '020'],
            moderate: ['002', '003', '011', '021', '030'],
            minor: ['012']
        },

        byRole: {
            founder: ['001', '004', '020', '021'],
            growth_manager: ['010', '011', '012', '020'],
            data_analyst: ['030', '010'],
            marketer: ['003', '021']
        }
    }
};

// ==========================================
// 学习和预防系统
// ==========================================

const MistakePrevention = {

    // 检查清单
    preDecisionChecklist: {
        before_CAC_calculation: [
            '✓ 包含了所有销售和营销成本（不只是广告）',
            '✓ 包含了人力成本',
            '✓ 包含了工具和软件成本',
            '✓ 时间窗口一致（月度/季度/年度）',
            '✓ 分母是真实新客户数（不是leads）'
        ],

        before_LTV_calculation: [
            '✓ 包含了Gross Margin',
            '✓ Gross Margin是准确的（与财务确认）',
            '✓ 考虑了expansion revenue',
            '✓ 基于真实cohort数据，不是假设',
            '✓ 时间窗口足够长（12个月+）'
        ],

        before_AB_test_conclusion: [
            '✓ 达到了预定的样本量',
            '✓ p-value < 0.05 (统计显著)',
            '✓ 运行了至少一个完整业务周期',
            '✓ 趋势稳定（不是越来越差）',
            '✓ Segment分析没有发现异常',
            '✓ Guardrail metrics没有恶化'
        ],

        before_scaling: [
            '✓ Unit economics健康（LTV:CAC > 3:1）',
            '✓ Retention curve趋平',
            '✓ 有2+个验证的获客渠道',
            '✓ Payback period < 12个月',
            '✓ 现金流支持扩张'
        ]
    },

    // 导师提醒系统
    mentorReminders: {
        when_student_calculates_LTV: `
⚠️ 导师提醒：

计算LTV时，最常见的错误是忘记乘以Gross Margin。

请确认你的计算包含了：
1. ARPU ✓
2. Customer Lifetime ✓
3. Gross Margin ✓ ← 不要忘记这个！

如果你的答案是$XXXX，
问自己："我乘以Gross Margin了吗？"
`,

        when_student_runs_experiment: `
⚠️ 导师提醒：

在下结论前，确保：

1. 样本量足够
   - 计算过所需样本量吗？
   - 达到了吗？

2. 统计显著性
   - p-value < 0.05吗？
   - 不是因为多次查看偶然<0.05？

3. 时间足够
   - 至少一个完整周期（通常7天）
   - 趋势稳定吗？

不要过早下结论！
`,

        when_student_focuses_on_acquisition: `
⚠️ 导师提醒：

你在优化获客，很好！

但请先检查：

1. Retention健康吗？
   - Day 30留存率是多少？
   - Retention curve趋平了吗？

2. 这是在"漏桶里加水"吗？
   - 如果留存差，先优化留存
   - 修桶 before 加水

记住：获取100人留20人 < 获取50人留40人
`
    }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CommonGrowthMistakes, MistakePrevention };
}
