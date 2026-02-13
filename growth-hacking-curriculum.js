// ==========================================
// 增长黑客完整课程体系
// Growth Hacking Curriculum System
// ==========================================

const GrowthHackingCurriculum = {

    // ==========================================
    // LEVEL 1: 基础 (Foundation)
    // ==========================================

    foundation: {

        // Unit 1: AARRR框架精通
        unit1_aarrr_framework: {
            title: 'AARRR海盗指标框架精通',
            description: '掌握增长的核心框架，理解用户生命周期的每个阶段',

            lessons: [
                {
                    id: 'aarrr-001',
                    name: 'Acquisition - 用户获取的本质',
                    difficulty: 1,
                    estimatedTime: '30分钟',

                    concepts: [
                        'CAC (Customer Acquisition Cost)',
                        'Marketing Channels',
                        'Channel Attribution',
                        'Conversion Tracking',
                        'Traffic Sources'
                    ],

                    theory: {
                        definition: `
用户获取是增长漏斗的第一步，关注如何吸引潜在用户访问你的产品。

核心问题：
1. 目标用户在哪里？
2. 如何以最低成本触达他们？
3. 如何衡量每个渠道的效果？
`,

                        keyMetrics: {
                            CAC: {
                                formula: 'CAC = Total Marketing Spend / Number of New Customers',
                                example: '月营销支出 $10,000，获得100个客户，CAC = $100',
                                benchmark: {
                                    excellent: '< LTV的1/3',
                                    good: '< LTV的1/2',
                                    acceptable: '< LTV的2/3',
                                    poor: '> LTV的2/3'
                                }
                            },

                            channelROI: {
                                formula: 'ROI = (Revenue - Cost) / Cost × 100%',
                                example: '投入$1000，收入$3000，ROI = 200%'
                            },

                            conversionRate: {
                                formula: 'Conversion Rate = Visitors who convert / Total Visitors',
                                example: '1000访问，50注册，转化率 = 5%'
                            }
                        },

                        channels: {
                            paid: {
                                name: 'Paid Channels (付费渠道)',
                                examples: ['Google Ads', 'Facebook Ads', 'LinkedIn Ads', 'Display Advertising'],
                                pros: ['快速起量', '可控性强', '精准定向'],
                                cons: ['成本高', '依赖持续投入', '竞争激烈'],
                                whenToUse: 'LTV > 3× CAC，且有充足预算'
                            },

                            organic: {
                                name: 'Organic Channels (自然渠道)',
                                examples: ['SEO', 'Content Marketing', 'Social Media Organic'],
                                pros: ['长期成本低', '可持续', '建立品牌'],
                                cons: ['起效慢', '需要持续投入', '难以预测'],
                                whenToUse: '长期战略，建立护城河'
                            },

                            viral: {
                                name: 'Viral Channels (病毒传播)',
                                examples: ['Referral Programs', 'Social Sharing', 'Word of Mouth'],
                                pros: ['指数增长', '成本极低', '自我维持'],
                                cons: ['难以启动', '需要优秀产品', '不可控'],
                                whenToUse: '产品有网络效应，NPS > 50'
                            }
                        }
                    },

                    exercises: [
                        {
                            type: 'calculation',
                            difficulty: 'easy',
                            question: `
某SaaS公司上个月的数据：
- Google Ads花费: $5,000
- Facebook Ads花费: $3,000
- SEO内容制作: $2,000

获客结果：
- Google Ads带来: 50个付费用户
- Facebook Ads带来: 40个付费用户
- SEO带来: 30个付费用户

问题：
1. 计算每个渠道的CAC
2. 哪个渠道最高效？
3. 如果预算增加到$15,000，如何分配？
`,
                            expectedSteps: [
                                '计算每个渠道CAC',
                                '对比CAC找出最高效渠道',
                                '基于效率分配预算'
                            ],

                            solution: `
1. 每个渠道的CAC：
   Google Ads: $5,000 / 50 = $100/用户
   Facebook Ads: $3,000 / 40 = $75/用户  ⭐ 最低
   SEO: $2,000 / 30 = $67/用户  ⭐⭐ 最低

2. 最高效渠道：SEO (CAC = $67)

3. 预算分配策略：

   策略A - 基于效率（推荐）：
   - SEO: $7,000 (47%) - 最高效，加大投入
   - Facebook: $5,000 (33%) - 次高效
   - Google: $3,000 (20%) - 保持测试

   策略B - 平衡风险：
   - 不要把所有鸡蛋放一个篮子
   - SEO: $6,000 (40%)
   - Facebook: $5,000 (33%)
   - Google: $3,000 (20%)
   - 新渠道测试: $1,000 (7%)

   关键考虑：
   - SEO有规模上限（搜索量有限）
   - 渠道多样化降低风险
   - 保留预算测试新渠道
`
                        },

                        {
                            type: 'scenario',
                            difficulty: 'medium',
                            question: `
你是一个B2B SaaS创业公司的增长负责人。产品是项目管理工具。

已知数据：
- Average LTV: $1,200
- Current CAC: $400
- Monthly Revenue: $50,000
- Churn Rate: 5%/月

当前渠道表现：
- Content Marketing: CAC $200, 20客户/月
- LinkedIn Ads: CAC $500, 30客户/月
- 推荐计划: CAC $150, 10客户/月

问题：
1. 哪些渠道值得扩大投入？为什么？
2. 你会如何优化高CAC渠道？
3. 设计一个获客策略，目标是3个月内收入翻倍
`,

                            solution: `
1. 渠道评估：

   Content Marketing: ✅ 优秀
   - CAC/LTV = 17% (远低于33%标准)
   - 应该扩大投入
   - 风险：扩展性可能受限

   LinkedIn Ads: ⚠️ 可接受但需优化
   - CAC/LTV = 42% (高于33%标准)
   - 短期保持，寻找优化机会
   - 优化方向：定向、落地页、转化漏斗

   推荐计划: ⭐ 最优
   - CAC/LTV = 12.5%
   - 急需扩大规模
   - 增加激励，简化流程

2. 优化LinkedIn Ads（从$500降到$300）：

   A. 提高转化率：
   - 优化落地页（目标：提升50%转化率）
   - A/B测试广告创意
   - 改进CTA和表单

   B. 降低CPC：
   - 精准定向（职位、公司规模、行业）
   - 提高质量得分
   - 测试不同广告格式

   C. 改进归因：
   - 可能有辅助转化未计入
   - 实施multi-touch attribution

3. 收入翻倍策略（$50K → $100K）：

   当前：60客户/月 × 平均客单价
   需要：120客户/月（翻倍）

   三个月计划：

   Month 1: 基础优化（+20客户 = 80/月）
   - 推荐计划激励翻倍：10 → 20客户
   - Content Marketing加倍投入：20 → 30客户
   - LinkedIn优化（保持30客户）

   Month 2: 规模扩张（+30客户 = 110/月）
   - 推荐计划持续优化：20 → 30客户
   - Content扩展新主题：30 → 40客户
   - LinkedIn优化见效：30 → 35客户
   - 启动新渠道测试：+5客户

   Month 3: 达成目标（+10客户 = 120/月）
   - 各渠道持续优化
   - 新渠道开始贡献

   预算需求：
   Month 1: $22,000
   Month 2: $33,000
   Month 3: $40,000

   风险：
   - Content可扩展性
   - 推荐计划饱和
   - 新渠道不确定性
`
                        }
                    ],

                    realWorldExamples: [
                        {
                            company: 'Dropbox',
                            strategy: '推荐计划 + Product Hunt',
                            result: '病毒系数K=0.65，35%用户来自推荐'
                        },
                        {
                            company: 'Slack',
                            strategy: '口碑 + 内部传播',
                            result: '早期几乎0营销支出，靠产品自传播'
                        }
                    ],

                    keyTakeaways: [
                        'CAC必须显著低于LTV（至少1/3）',
                        '不要依赖单一渠道，分散风险',
                        '优先扩大最高效渠道，同时测试新渠道',
                        '付费渠道要快速验证，自然渠道要长期投入',
                        '追踪全漏斗数据，不只看最终转化'
                    ]
                },

                {
                    id: 'aarrr-002',
                    name: 'Activation - 激活的关键时刻',
                    difficulty: 1,
                    estimatedTime: '40分钟',

                    concepts: [
                        'Aha Moment (啊哈时刻)',
                        'Onboarding Flow',
                        'Time to Value (TTV)',
                        'Activation Rate',
                        'User Journey Mapping'
                    ],

                    theory: {
                        definition: `
激活是用户从"注册"到"体验到产品价值"的过程。这是决定用户是否会继续使用产品的关键阶段。

核心问题：
1. 什么是你的产品的"Aha Moment"？
2. 用户多快能体验到这个时刻？
3. 多少比例的新用户达到了激活？
`,

                        ahaMoment: {
                            definition: '用户突然理解产品价值的那一刻',

                            examples: {
                                Facebook: {
                                    moment: '7天内添加10个好友',
                                    why: '达到这个阈值的用户，留存率提升3倍',
                                    data: 'Chamath Palihapitiya披露的著名数据'
                                },

                                Slack: {
                                    moment: '团队发送2000条消息',
                                    why: '达到后，93%的团队会成为活跃用户',
                                    data: 'Stewart Butterfield在采访中透露'
                                },

                                Twitter: {
                                    moment: '关注30个用户',
                                    why: '信息流变得有趣，用户开始活跃',
                                    data: 'Josh Elman (前Twitter增长负责人)'
                                },

                                Dropbox: {
                                    moment: '在一台设备上保存一个文件',
                                    why: '体验到跨设备同步的魔力',
                                    data: 'Product-led growth经典案例'
                                },

                                LinkedIn: {
                                    moment: '连接5个联系人',
                                    why: '网络效应开始显现',
                                    data: 'Growth team分析结果'
                                }
                            },

                            howToFind: `
找到你的Aha Moment的方法：

1. 数据分析法：
   - 找出活跃用户 vs 流失用户的行为差异
   - 分析：哪些行为与长期留存强相关？
   - 工具：Cohort Analysis, Funnel Analysis

2. 用户访谈法：
   - 问活跃用户："什么时候你觉得这个产品真的有用？"
   - 问流失用户："为什么没有继续使用？"

3. 行为模式分析：
   - 分析前7天/30天的用户行为
   - 找出retention的预测指标

4. A/B测试验证：
   - 引导用户完成假设的Aha Moment
   - 测试对留存的影响
`
                        },

                        timeToValue: {
                            definition: '用户从注册到获得价值的时间',

                            principle: 'The faster, the better',

                            benchmarks: {
                                excellent: '< 5分钟 (简单产品)',
                                good: '< 30分钟 (中等复杂产品)',
                                acceptable: '< 1天 (复杂B2B产品)',
                                poor: '> 1周 (需要优化)'
                            },

                            strategies: [
                                {
                                    name: '减少摩擦',
                                    tactics: [
                                        '减少注册表单字段',
                                        '允许社交账号登录',
                                        '延迟非必要信息收集',
                                        '提供示例数据/模板'
                                    ]
                                },
                                {
                                    name: '渐进式引导',
                                    tactics: [
                                        '分步骤onboarding',
                                        '交互式教程',
                                        '上下文提示（tooltips）',
                                        '成功案例展示'
                                    ]
                                },
                                {
                                    name: '快速胜利',
                                    tactics: [
                                        '先体验核心功能',
                                        '立即展示价值',
                                        '给予即时反馈',
                                        '庆祝小成就'
                                    ]
                                }
                            ]
                        },

                        keyMetrics: {
                            activationRate: {
                                formula: 'Activation Rate = Users who reach Aha Moment / Total Sign-ups',
                                benchmark: {
                                    excellent: '> 60%',
                                    good: '40-60%',
                                    needsWork: '< 40%'
                                }
                            },

                            timeToActivation: {
                                formula: 'Median time from sign-up to Aha Moment',
                                target: '越短越好，理想 < 24小时'
                            }
                        }
                    },

                    exercises: [
                        {
                            type: 'analysis',
                            difficulty: 'medium',
                            question: `
你正在优化一个任务管理应用的激活流程。

当前数据（新用户首周行为）：
- 注册用户: 1000人
- 创建了至少1个任务: 600人
- 创建了至少1个项目: 400人
- 邀请了至少1个团队成员: 200人
- 完成了至少1个任务: 500人

留存数据（30天后仍活跃）：
- 只创建任务，未完成: 10%留存
- 创建并完成任务: 35%留存
- 创建项目: 45%留存
- 邀请团队成员: 70%留存 ⭐

问题：
1. 什么是这个产品的Aha Moment？
2. 当前激活率是多少？
3. 如何提高激活率？设计3个具体策略
`,

                            solution: `
1. Aha Moment分析：

   显然是"邀请团队成员" - 70%留存率远高于其他行为

   为什么？
   - 任务管理的核心价值是协作
   - 邀请团队成员 = 产品嵌入工作流程
   - 网络效应开始发挥作用

   定义Aha Moment：
   "用户邀请至少1个团队成员，且团队共同完成1个任务"

2. 当前激活率：

   仅邀请成员: 200/1000 = 20%

   这是个危险的低激活率！意味着：
   - 80%的新用户没有体验到核心价值
   - 大量获客投入被浪费
   - 需要紧急优化

3. 提高激活率的策略：

   策略A：简化团队邀请流程

   当前问题诊断：
   - 用户可能不知道邀请功能
   - 邀请流程可能太复杂
   - 时机不对（太早或太晚）

   具体优化：
   ✅ 注册后立即提示："邀请你的团队，开始协作"
   ✅ 简化邀请：一键复制链接，而非繁琐的邮件邀请
   ✅ 显示社会证明："已有10,000+团队在使用"
   ✅ 激励：邀请3人解锁高级功能1个月

   预期效果：20% → 35%激活率

   ---

   策略B：渐进式Onboarding

   当前：可能一次性展示太多功能，让用户困惑

   新流程：
   Step 1: "创建你的第一个任务"（简单体验）
   Step 2: "完成这个任务"（获得成就感）
   Step 3: "邀请团队成员协作"（核心价值） ⭐
   Step 4: "一起完成一个项目"（深度使用）

   每步都有：
   - 清晰指引
   - 进度显示
   - 即时反馈
   - 可跳过（但有提醒）

   预期效果：35% → 50%激活率

   ---

   策略C：使用场景引导

   问题：用户可能不理解产品适合团队使用

   优化：
   注册时询问："你打算如何使用这个工具？"
   - [ ] 个人任务管理
   - [ ] 团队项目协作 ⭐
   - [ ] 公司级项目管理

   基于选择定制onboarding：
   - 选"团队协作" → 直接引导邀请成员
   - 选"个人" → 先让体验，后续引导升级到团队

   额外策略：
   - 提供团队模板（如：营销活动、产品发布）
   - 展示团队协作的价值（视频demo）
   - 案例研究："XX公司如何用我们提升30%效率"

   预期效果：50% → 60%激活率

   ---

   综合实施（3个月roadmap）：

   Month 1: 策略A（快速见效）
   - 2周开发
   - 2周测试
   - 目标：20% → 35%

   Month 2: 策略B（中等难度）
   - 3周开发
   - 1周测试
   - 目标：35% → 50%

   Month 3: 策略C（需要内容）
   - 2周开发
   - 1周准备内容
   - 1周测试
   - 目标：50% → 60%

   总提升：20% → 60%（3倍）
   对留存的影响：
   - 之前：1000注册 × 20%激活 × 70%留存 = 140活跃用户
   - 之后：1000注册 × 60%激活 × 70%留存 = 420活跃用户

   3倍激活率 = 3倍长期活跃用户 = 3倍收入
   不需要增加获客预算！
`
                        }
                    ],

                    keyTakeaways: [
                        '找到Aha Moment是激活优化的关键',
                        'Time to Value越短越好，消除一切摩擦',
                        '引导用户完成核心行为，而非介绍所有功能',
                        '激活率的提升直接转化为留存和收入提升',
                        '用数据验证Aha Moment，用A/B测试优化流程'
                    ]
                },

                {
                    id: 'aarrr-003',
                    name: 'Retention - 留存的生死线',
                    difficulty: 1,
                    estimatedTime: '45分钟',

                    concepts: [
                        'Retention Curve',
                        'Cohort Analysis',
                        'Churn Rate',
                        'Product-Market Fit',
                        'Habit Formation'
                    ],

                    theory: {
                        definition: `
留存是增长的基石。没有留存，一切增长都是"漏桶"。

Brian Balfour (前HubSpot增长VP):
"Retention是唯一决定产品是否有未来的指标"
`,

                        retentionCurve: {
                            types: {
                                good: {
                                    shape: '迅速下降后趋于平缓',
                                    description: '早期流失一些不合适用户，之后稳定',
                                    example: 'Facebook, WhatsApp',
                                    signal: 'Product-Market Fit存在'
                                },

                                bad: {
                                    shape: '持续下降，不趋平',
                                    description: '用户持续流失，没有忠实用户群',
                                    example: '大多数失败产品',
                                    signal: '没有PMF，需要pivot'
                                },

                                excellent: {
                                    shape: '下降后平缓，甚至回升',
                                    description: '形成习惯，用户回访增加',
                                    example: 'LinkedIn, Slack',
                                    signal: '强PMF，可扩张'
                                }
                            },

                            benchmarks: {
                                SaaS: {
                                    day1: '70-80%',
                                    day7: '40-50%',
                                    day30: '20-30%',
                                    month3: '15-25%',
                                    excellent: '>30% at month 3'
                                },

                                consumer: {
                                    day1: '60-70%',
                                    day7: '30-40%',
                                    day30: '10-20%',
                                    excellent: '>20% at day 30'
                                },

                                gaming: {
                                    day1: '40-50%',
                                    day7: '20-30%',
                                    day30: '5-10%',
                                    excellent: '>15% at day 30'
                                }
                            }
                        },

                        churnRate: {
                            formula: 'Churn Rate = Lost Customers / Total Customers at Start',

                            acceptableLevels: {
                                B2C: '5-7% monthly',
                                SMB_SaaS: '3-5% monthly',
                                Enterprise_SaaS: '<1% monthly',
                                rule: 'Annual churn应该 < 20%'
                            },

                            impact: {
                                example: `
假设：
- 起始客户: 1000
- 月增长: 100新客户
- 月流失率: 5%

12个月后的客户数：

Month 1: 1000 + 100 - 50 = 1050
Month 2: 1050 + 100 - 52.5 = 1097.5
...
Month 12: ≈ 1400客户

如果流失率降到2%：
Month 12: ≈ 2000客户

5%的流失率看似不高，但一年后客户数相差43%！
`
                            }
                        },

                        improvementStrategies: {
                            onboarding: {
                                why: '用户在最初几天最容易流失',
                                tactics: [
                                    '优化激活流程',
                                    '发送教育邮件序列',
                                    '主动客户成功介入',
                                    '提供模板和指南'
                                ]
                            },

                            habitFormation: {
                                why: '习惯使用的用户不会流失',
                                tactics: [
                                    '设计触发器（notifications, emails）',
                                    '建立使用频率（daily, weekly）',
                                    '奖励连续使用（streaks）',
                                    '嵌入工作流程'
                                ],
                                model: 'Hook Model (Nir Eyal): Trigger → Action → Reward → Investment'
                            },

                            valueDelivery: {
                                why: '用户持续获得价值才会留下',
                                tactics: [
                                    '定期新功能发布',
                                    '个性化推荐',
                                    '数据洞察和报告',
                                    'ROI展示'
                                ]
                            },

                            community: {
                                why: '社交连接增加切换成本',
                                tactics: [
                                    '建立用户社区',
                                    '促进用户互动',
                                    '举办线上/线下活动',
                                    '打造归属感'
                                ]
                            }
                        }
                    },

                    exercises: [
                        {
                            type: 'calculation',
                            difficulty: 'hard',
                            question: `
某SaaS公司的月度Cohort数据：

January 2025 Cohort (100 customers):
- Jan: 100 active (100%)
- Feb: 80 active (80%)
- Mar: 70 active (70%)
- Apr: 65 active (65%)
- May: 63 active (63%)
- Jun: 62 active (62%)

问题：
1. 绘制retention curve，评估PMF
2. 计算月均churn rate
3. 如果继续这个趋势，6个月后还剩多少客户？
4. 如果月churn从最初的20%降到5%，影响有多大？
5. 这是个健康的业务吗？为什么？
`,

                            solution: `
1. Retention Curve分析：

   Month 0: 100%
   Month 1: 80% (下降20%)
   Month 2: 70% (下降10%)
   Month 3: 65% (下降5%)
   Month 4: 63% (下降2%)
   Month 5: 62% (下降1%)

   曲线形态：✅ 迅速下降后趋于平缓

   评估：
   - 早期流失较多（月1：20%）
   - 之后逐渐稳定
   - 月4-5几乎平缓（<2%流失）
   - 预测：会稳定在55-60%

   PMF评估：⚠️ 中等
   - 有一群忠实用户（~60%）
   - 但早期流失太多
   - 需要优化onboarding

2. 月均Churn Rate：

   Month 1: (100-80)/100 = 20%
   Month 2: (80-70)/80 = 12.5%
   Month 3: (70-65)/70 = 7.1%
   Month 4: (65-63)/65 = 3.1%
   Month 5: (63-62)/63 = 1.6%

   平均: (20+12.5+7.1+3.1+1.6)/5 = 8.86%

   ⚠️ 这个平均值有误导性！
   真实情况是：初期高流失，后期低流失

   更有意义的是"稳态流失率" ≈ 2-3%/月

3. 6个月后预测：

   如果趋势继续，月6流失1%：
   62 × 0.99 = 61.38 ≈ 61客户

   总流失：39% (从100到61)

   长期稳态：可能稳定在55-60%

4. 优化影响对比：

   场景A：当前（月1: 20%流失）
   100 → 80 → 70 → 65 → 63 → 62 → 61

   场景B：优化后（月1: 5%流失）
   100 → 95 → 90 → 86 → 83 → 81 → 79

   6个月后：61 vs 79
   差异：+30% customers!

   长期影响：
   - 如果每月新增50客户
   - 场景A稳态：~600客户
   - 场景B稳态：~1000客户

   优化早期流失 = 67%业务增长

5. 健康评估：

   ⚠️ 中等健康，有改进空间

   正面：
   ✅ 曲线趋平（有PMF）
   ✅ 稳态流失率低（2-3%）
   ✅ 有忠实用户群（60%+）

   负面：
   ❌ 早期流失太高（20%）
   ❌ 总留存偏低（62% @ 5个月）
   ❌ 浪费了获客投入

   优先改进：
   1. Onboarding优化（降低月1流失）
   2. 激活流程改进
   3. 早期客户成功介入

   目标：
   - 月1留存：80% → 95%
   - 月3留存：65% → 85%
   - 稳态留存：60% → 80%
`
                        }
                    ],

                    keyTakeaways: [
                        'Retention curve的形态决定产品的未来',
                        '早期流失率对长期影响巨大，必须优化',
                        'Cohort分析是最重要的留存分析方法',
                        '没有留存，增长就是往漏桶里加水',
                        'Product-Market Fit的最佳指标是retention curve'
                    ]
                }
            ]
        },

        // Unit 2: 单位经济学大师
        unit2_unit_economics: {
            title: '单位经济学精通',
            description: '深入理解LTV、CAC、Payback Period等核心财务指标',

            lessons: [
                {
                    id: 'economics-001',
                    name: 'LTV - 客户生命周期价值',
                    difficulty: 1,
                    estimatedTime: '50分钟',

                    concepts: [
                        'LTV (Lifetime Value)',
                        'ARPU (Average Revenue Per User)',
                        'Gross Margin',
                        'Customer Lifetime',
                        'Expansion Revenue'
                    ],

                    theory: {
                        definition: `
LTV是客户在整个生命周期内为公司带来的总利润。

为什么重要？
- 决定你能花多少钱获客（CAC上限）
- 衡量商业模式的健康度
- 指导产品和增长策略
`,

                        formulas: {
                            basic: {
                                formula: 'LTV = ARPU × Average Customer Lifetime × Gross Margin',

                                example: `
ARPU: $100/月
平均生命周期: 24个月
Gross Margin: 80%

LTV = $100 × 24 × 0.8 = $1,920
`,

                                whenToUse: '简单subscription业务'
                            },

                            churnBased: {
                                formula: 'LTV = (ARPU / Churn Rate) × Gross Margin',

                                explanation: `
如果知道月流失率，可以用这个简化公式

平均生命周期 = 1 / Churn Rate

例如：
月流失率 = 5%
平均生命周期 = 1 / 0.05 = 20个月
`,

                                example: `
ARPU: $100/月
月流失率: 4%
Gross Margin: 75%

LTV = ($100 / 0.04) × 0.75
    = $2,500 × 0.75
    = $1,875
`,

                                whenToUse: '流失率稳定的subscription业务'
                            },

                            expansionRevenue: {
                                formula: 'LTV = [(ARPU + Expansion) / Churn Rate] × Gross Margin',

                                explanation: `
考虑用户在生命周期内的升级/扩展收入

Expansion Revenue包括：
- Upsells（升级到更高套餐）
- Cross-sells（购买额外产品）
- Usage-based growth（使用量增长）
`,

                                example: `
初始ARPU: $100/月
平均月expansion: $10/月
月流失率: 3%
Gross Margin: 80%

LTV = [($100 + $10) / 0.03] × 0.8
    = $3,667 × 0.8
    = $2,933

vs 不考虑expansion:
LTV = ($100 / 0.03) × 0.8 = $2,667

Expansion带来额外: $266 (10%提升)
`,

                                whenToUse: '有明显upsell/expansion的SaaS'
                            },

                            cohortBased: {
                                formula: 'LTV = Sum of (Revenue per cohort month × Gross Margin)',

                                explanation: `
基于真实cohort数据计算，最准确但需要时间

步骤：
1. 追踪一个cohort的每月收入
2. 累加所有月份的revenue
3. 乘以gross margin
`,

                                example: `
100人的cohort：

Month 1: 100人 × $100 = $10,000
Month 2: 90人 × $100 = $9,000
Month 3: 85人 × $100 = $8,500
Month 4: 82人 × $100 = $8,200
...
Month 24: 60人 × $100 = $6,000

Total Revenue per 100 customers = $180,000
Revenue per customer = $1,800
LTV (80% margin) = $1,800 × 0.8 = $1,440
`,

                                whenToUse: '有足够历史数据，需要精确LTV'
                            }
                        },

                        components: {
                            ARPU: {
                                definition: 'Average Revenue Per User per period',
                                calculation: 'Total Revenue / Total Active Users',
                                tips: [
                                    '统一时间单位（通常用月）',
                                    '区分新用户和老用户ARPU',
                                    '考虑不同segment的差异'
                                ]
                            },

                            grossMargin: {
                                definition: '收入中除去直接成本后的利润率',

                                calculation: '(Revenue - COGS) / Revenue',

                                COGS_includes: [
                                    'Server/hosting costs',
                                    'Payment processing fees',
                                    'Customer support costs',
                                    'Direct fulfillment costs'
                                ],

                                COGS_excludes: [
                                    'Marketing/Sales costs (included in CAC)',
                                    'R&D costs',
                                    'General overhead'
                                ],

                                benchmarks: {
                                    SaaS: '70-90%',
                                    eCommerce: '30-50%',
                                    marketplace: '60-80%'
                                }
                            }
                        },

                        commonMistakes: [
                            {
                                mistake: '忘记乘以Gross Margin',
                                impact: '高估LTV 20-30%',
                                example: 'LTV = $100 × 20 = $2000 (错误) vs $2000 × 0.75 = $1500 (正确)'
                            },
                            {
                                mistake: '使用总体平均而非cohort分析',
                                impact: '可能高估或低估LTV',
                                fix: '追踪不同cohort的真实表现'
                            },
                            {
                                mistake: '计算窗口太短',
                                impact: '低估LTV',
                                fix: '至少12个月数据，理想24个月+'
                            },
                            {
                                mistake: '忽略expansion revenue',
                                impact: 'SaaS公司可能低估10-30%',
                                fix: '分别追踪new MRR和expansion MRR'
                            }
                        ]
                    },

                    exercises: [
                        {
                            type: 'progressive_calculation',
                            difficulty: 'hard',
                            question: `
你是一个B2B SaaS公司的CFO，需要计算准确的LTV。

基础数据：
- 三个定价tier:
  - Basic: $49/月
  - Pro: $99/月
  - Enterprise: $299/月

- 用户分布：
  - Basic: 60%
  - Pro: 30%
  - Enterprise: 10%

- 月流失率：
  - Basic: 6%
  - Pro: 3%
  - Enterprise: 1.5%

- Gross Margin: 78%

- Expansion data (6个月内):
  - Basic → Pro: 20%
  - Pro → Enterprise: 10%

问题：
1. 计算每个tier的简单LTV（不考虑expansion）
2. 计算blended LTV
3. 考虑expansion后的真实LTV
4. 如果优化能将Basic流失率降到4%，影响有多大？
5. 制定LTV提升策略
`,

                            solution: `
1. 每个Tier的简单LTV（不考虑expansion）:

   Basic Tier:
   LTV = ($49 / 0.06) × 0.78
       = $816.67 × 0.78
       = $637

   Pro Tier:
   LTV = ($99 / 0.03) × 0.78
       = $3,300 × 0.78
       = $2,574

   Enterprise Tier:
   LTV = ($299 / 0.015) × 0.78
       = $19,933 × 0.78
       = $15,548

2. Blended LTV (按用户分布加权):

   Blended LTV = (60% × $637) + (30% × $2,574) + (10% × $15,548)
                = $382 + $772 + $1,555
                = $2,709

3. 考虑Expansion的真实LTV:

   这需要模拟用户升级路径：

   Basic用户的生命周期价值：
   - 80%一直是Basic: $637
   - 20%升级到Pro (假设平均3个月后)
     前3个月: $49 × 3 = $147
     之后作为Pro: ($99 / 0.03) × 0.78 = $2,574
     总计: ($147 + $2,574) × 0.78 = $2,122

   Basic的真实LTV = 80% × $637 + 20% × $2,122
                   = $510 + $424
                   = $934 (vs $637不考虑expansion)

   Pro用户的生命周期价值：
   - 90%一直是Pro: $2,574
   - 10%升级到Enterprise (假设平均6个月后)
     前6个月: $99 × 6 = $594
     之后作为Enterprise: ($299 / 0.015) × 0.78 = $15,548
     总计: ($594 + $15,548) × 0.78 = $12,571

   Pro的真实LTV = 90% × $2,574 + 10% × $12,571
                 = $2,317 + $1,257
                 = $3,574 (vs $2,574不考虑expansion)

   Enterprise保持: $15,548

   新Blended LTV = (60% × $934) + (30% × $3,574) + (10% × $15,548)
                  = $560 + $1,072 + $1,555
                  = $3,187

   Expansion带来的提升: ($3,187 - $2,709) / $2,709 = 17.6% 🚀

4. Basic流失率优化影响:

   当前Basic (6%流失):
   - 简单LTV: $637
   - 考虑expansion: $934

   优化后 (4%流失):
   - 新LTV: ($49 / 0.04) × 0.78 = $955
   - 考虑expansion (生命周期更长，更多人升级):
     假设升级率提升到25% (更长生命周期 = 更多升级机会)
     = 75% × $955 + 25% × $2,122
     = $716 + $531
     = $1,247

   单个Basic用户价值提升: $1,247 vs $934 = +33.5%

   对整体Blended LTV的影响:
   新Blended = (60% × $1,247) + (30% × $3,574) + (10% × $15,548)
             = $748 + $1,072 + $1,555
             = $3,375

   总提升: ($3,375 - $3,187) / $3,187 = +5.9%

   看似只是Basic的优化，但因为Basic占60%用户，
   对整体LTV有明显影响！

5. LTV提升策略 (优先级排序):

   策略1: 降低Basic流失率 (6% → 4%)
   难度: ⭐⭐⭐
   影响: +5.9% Blended LTV
   ROI: 高

   行动:
   - 改进onboarding (Basic用户往往onboarding不充分)
   - 主动客户成功介入 (前30天)
   - 教育内容 (帮助获得价值)
   - 使用提醒和re-engagement

   ---

   策略2: 提高Basic → Pro升级率 (20% → 30%)
   难度: ⭐⭐
   影响: +$50 per Basic user
   ROI: 很高

   行动:
   - 在Basic中展示Pro功能价值
   - 使用限制nudge升级 (如："已达到Basic限制")
   - 升级优惠 (首月折扣)
   - 案例研究 (Pro用户的成功故事)

   ---

   策略3: 提高Enterprise留存 (98.5% → 99%)
   难度: ⭐
   影响: +$7,774 per Enterprise user
   ROI: 极高 (虽然只占10%用户)

   行动:
   - 专属客户成功经理
   - 季度商业审查
   - 定制化功能开发
   - 高管关系维护

   ---

   综合策略 (12个月roadmap):

   Q1: 策略1 (降Basic流失)
   - 重新设计onboarding
   - 建立CSM team for Basic

   Q2: 策略2 (提升升级)
   - 产品内upgrade prompts
   - 升级优惠campaign

   Q3: 策略3 (Enterprise留存)
   - 启动Enterprise成功计划
   - 定制化roadmap

   Q4: 持续优化和新策略
   - 引入annual billing (降流失)
   - 探索usage-based expansion

   预期12个月后：
   Blended LTV: $3,187 → $3,800+
   增长: +19%
   无需增加获客支出！
`
                        }
                    ],

                    keyTakeaways: [
                        'LTV是最重要的单位经济学指标，决定增长上限',
                        '永远要乘以Gross Margin，否则会高估',
                        'Expansion revenue能显著提升LTV (10-30%)',
                        '不同segment的LTV差异巨大，需分别优化',
                        '提升LTV比降低CAC往往更容易，影响更大'
                    ]
                },

                {
                    id: 'economics-002',
                    name: 'CAC与LTV:CAC比率',
                    difficulty: 1,
                    estimatedTime: '40分钟',

                    concepts: [
                        'CAC (Customer Acquisition Cost)',
                        'LTV:CAC Ratio',
                        'Payback Period',
                        'Sales Efficiency',
                        'Unit Economics'
                    ],

                    theory: {
                        CAC: {
                            formula: 'CAC = (Sales & Marketing Costs) / New Customers',

                            includes: [
                                'Ad spend',
                                'Marketing team salaries',
                                'Sales team salaries',
                                'Marketing tools/software',
                                'Agency/contractor fees',
                                'Events/conferences'
                            ],

                            excludes: [
                                'Product development',
                                'Customer success (included in COGS)',
                                'General overhead'
                            ],

                            commonMistake: `
只计算ad spend，忽略人力成本

错误: CAC = $10,000 ad spend / 100 customers = $100
正确: CAC = ($10,000 ads + $20,000 salaries) / 100 = $300
`
                        },

                        LTV_CAC_ratio: {
                            formula: 'LTV:CAC = LTV / CAC',

                            benchmarks: {
                                dangerous: '< 1:1 (亏损，不可持续)',
                                poor: '1:1 to 2:1 (勉强盈利，难扩张)',
                                acceptable: '2:1 to 3:1 (可以运营，但不理想)',
                                good: '3:1 to 4:1 (健康，可扩张) ⭐',
                                excellent: '> 4:1 (非常好，但可能投入不足)'
                            },

                            interpretation: `
3:1 意味着：每花$1获客，能赚回$3
这是SaaS行业的黄金标准

为什么不是越高越好？
- 5:1, 6:1可能意味着你太保守
- 应该增加营销投入，加速增长
- 竞争对手可能超越你
`
                        },

                        paybackPeriod: {
                            definition: '收回CAC所需的时间',

                            formula: 'Payback Period = CAC / (ARPU × Gross Margin)',

                            example: `
CAC: $1,200
ARPU: $100/月
Gross Margin: 80%

Payback = $1,200 / ($100 × 0.8) = 15个月
`,

                            benchmarks: {
                                excellent: '< 6个月',
                                good: '6-12个月',
                                acceptable: '12-18个月',
                                poor: '> 18个月'
                            },

                            importance: `
为什么重要？
1. 现金流: 更短 = 更快reinvest
2. 风险: 更短 = 更低风险
3. 可扩展性: 更短 = 更易扩张

例子:
公司A: 6个月payback
公司B: 18个月payback

一年后：
A可以reinvest 2次
B还在等待收回成本

复利效应让A增长远超B
`
                        }
                    },

                    exercises: [
                        {
                            type: 'diagnosis',
                            difficulty: 'hard',
                            question: `
三家SaaS公司的单位经济学：

Company A:
- LTV: $2,400
- CAC: $800
- Payback: 8个月
- 月增长: 10%

Company B:
- LTV: $3,600
- CAC: $600
- Payback: 4个月
- 月增长: 5%

Company C:
- LTV: $1,800
- CAC: $900
- Payback: 12个月
- 月增长: 15%

问题：
1. 计算每家公司的LTV:CAC比率
2. 诊断每家公司的健康状况
3. 为每家公司提供战略建议
4. 如果你是投资人，会投资哪家？为什么？
5. 2年后，哪家公司会最大？为什么？
`,

                            solution: `
1. LTV:CAC 比率:

   Company A: $2,400 / $800 = 3:1 ✅
   Company B: $3,600 / $600 = 6:1 ⭐⭐
   Company C: $1,800 / $900 = 2:1 ⚠️

2. 详细诊断:

   Company A: 健康且平衡 ✅

   优点:
   - 3:1比率是黄金标准
   - 8个月payback可接受
   - 10%月增长强劲

   问题:
   - 可能还有增长空间
   - CAC可以适当提高来加速增长

   评分: 8/10

   ---

   Company B: 过于保守 ⚠️

   优点:
   - 6:1比率极高，单位经济学优秀
   - 4个月payback极快，现金流健康
   - 产品PMF很强

   问题:
   - 只有5%月增长，太慢！
   - 6:1说明营销投入不足
   - 可能被更激进的竞争对手超越

   建议:
   - 应该把CAC提高到$1,200 (3:1比率)
   - 这样能翻倍营销投入
   - 目标：加速到15%+月增长

   评分: 6/10 (好economics,差增长)

   ---

   Company C: 高风险高增长 ⚠️⚠️

   优点:
   - 15%月增长很快
   - 展现强大执行力

   问题:
   - 2:1比率偏低，接近危险区
   - 12个月payback太长
   - 现金流压力大
   - 可持续性存疑

   紧急建议:
   - 提升LTV (降churn,提价,upsell)
   - 或降低CAC (优化转化率)
   - 否则会烧光现金

   评分: 5/10 (增长好,economics差)

3. 战略建议:

   Company A: 加速增长 🚀

   - 增加50%营销预算
   - 从CAC $800 → $1,000
   - LTV:CAC从3:1 → 2.4:1 (仍可接受)
   - 增长从10% → 15%
   - 12个月后规模扩大80%

   ---

   Company B: 激进扩张 🚀🚀

   - CAC从$600 → $1,200 (翻倍营销)
   - LTV:CAC从6:1 → 3:1
   - Payback从4月 → 8月
   - 目标增长: 5% → 20%

   理由:
   - 有最好的unit economics
   - 不利用这个优势就是浪费
   - 快速占领市场

   ---

   Company C: 优化经济学 ⚙️

   立即行动:
   1. 降低CAC (-20%目标)
      - 优化转化漏斗
      - 提高销售效率
      - 更精准targeting

   2. 提升LTV (+30%目标)
      - 降低churn (最优先)
      - 改进onboarding
      - 引入annual billing

   3. 适当放慢增长
      - 从15% → 12%
      - 确保economics健康
      - 避免现金流危机

   目标Economics:
   - LTV: $1,800 → $2,340 (+30%)
   - CAC: $900 → $720 (-20%)
   - 新比率: 3.25:1 ✅
   - Payback: 8个月 ✅

4. 投资决策:

   短期投资 (12个月): Company A ⭐
   理由:
   - 平衡的economics和增长
   - 风险最低
   - 稳定回报

   长期投资 (3-5年): Company B ⭐⭐⭐
   理由:
   - 最强的unit economics
   - 巨大的增长潜力
   - 如果管理层愿意加速，能成为市场领导者
   - 6:1比率是强PMF的信号

   不投资: Company C ❌
   理由:
   - Economics不健康
   - 现金流风险高
   - 除非他们先fix economics

5. 2年后规模预测:

   假设起始MRR: $100K

   Company A (10%月增长):
   $100K × (1.1)^24 = $987K MRR

   Company B (如果优化到20%月增长):
   $100K × (1.2)^24 = $7,960K MRR ⭐⭐⭐

   Company B (如果维持5%):
   $100K × (1.05)^24 = $320K MRR

   Company C (15%但可能因现金流放慢):
   Best case: $100K × (1.15)^24 = $2,880K MRR
   Realistic: 可能中途资金链断裂

   结论:
   Company B如果执行正确，会是最大的赢家
   但需要管理层改变保守策略

   如果B不改变，A会赢
   C有很大概率失败或被迫融资
`
                        }
                    ],

                    keyTakeaways: [
                        'LTV:CAC比率3:1是SaaS黄金标准',
                        'Payback Period越短，现金流越健康，可扩展性越强',
                        '比率太高(>5:1)可能意味着营销投入不足',
                        'CAC要包含所有销售营销成本，不只是广告',
                        '在健康的unit economics下，应该激进增长'
                    ]
                }
            ]
        }
    },

    // ==========================================
    // LEVEL 2-5: 更多高级课程
    // ==========================================

    intermediate: {
        unit3_growth_experiments: {
            title: '增长实验与A/B测试',
            description: '掌握科学的实验方法，数据驱动决策',
            lessons: [
                // 实验设计、统计显著性、样本量计算等
            ]
        },

        unit4_viral_growth: {
            title: '病毒增长与网络效应',
            description: '设计自增长循环，理解病毒系数',
            lessons: [
                // K-factor, viral loops, referral programs等
            ]
        }
    },

    advanced: {
        unit5_growth_modeling: {
            title: '增长建模与预测',
            description: '构建增长模型，预测未来表现',
            lessons: [
                // Cohort modeling, forecasting, scenario planning等
            ]
        },

        unit6_channel_mastery: {
            title: '渠道精通',
            description: '深度掌握各个增长渠道',
            lessons: [
                // SEO, Paid ads, Content, PR等详细策略
            ]
        }
    },

    expert: {
        unit7_organizational_growth: {
            title: '组织化增长',
            description: '建立增长团队和流程',
            lessons: [
                // Growth team structure, processes, culture等
            ]
        },

        unit8_advanced_strategies: {
            title: '高级增长策略',
            description: '增长黑客的艺术与科学',
            lessons: [
                // Creative growth hacks, platform arbitrage等
            ]
        }
    },

    master: {
        unit9_case_mastery: {
            title: '案例大师',
            description: '深度分析100+真实案例',
            lessons: [
                // 真实公司案例深度分析
            ]
        },

        unit10_strategy_frameworks: {
            title: '战略框架大师',
            description: '构建自己的增长框架',
            lessons: [
                // 整合所有知识，形成体系
            ]
        }
    }
};

// ==========================================
// 教学辅助系统
// ==========================================

const TeachingSupport = {

    // 苏格拉底式提问模板
    socraticQuestions: {
        clarification: [
            '你能更具体地解释{concept}吗？',
            '当你说{statement}，你的意思是什么？',
            '能举个例子说明{idea}吗？'
        ],

        probeAssumptions: [
            '你假设了{assumption}，这个假设总是成立吗？',
            '如果{assumption}不成立，结论会改变吗？',
            '什么证据支持{assumption}？'
        ],

        probeReasoning: [
            '为什么{conclusion}？',
            '从{A}到{B}，逻辑是什么？',
            '还有其他可能的解释吗？'
        ],

        checkImplications: [
            '如果{statement}是真的，那意味着什么？',
            '{action}的长期影响是什么？',
            '这个策略在什么情况下会失败？'
        ],

        exploreAlternatives: [
            '除了{solution}，还有什么其他方法？',
            '如果不能{action}，你会怎么做？',
            '反过来想会怎样？'
        ]
    },

    // 渐进式提示系统
    progressiveHints: {
        level1_direction: '思考这个问题属于AARRR的哪个阶段',
        level2_concept: '回顾我们学过的{concept}',
        level3_formula: '使用公式：{formula}',
        level4_step: '第一步是{step}',
        level5_example: '参考{case}是怎么做的',
        level6_answer: '正确答案是{answer}'
    },

    // 反馈话术
    feedbackTemplates: {
        excellent: {
            opening: '👏 优秀！',
            body: '你的分析{highlight}非常到位。',
            closing: '继续保持这个水平！'
        },

        good: {
            opening: '✅ 做得不错！',
            body: '{what_correct}是对的，{what_missing}可以更深入。',
            closing: '思考一下{next_question}'
        },

        needsWork: {
            opening: '⚠️ 方向对了，但...',
            body: '问题在于{issue}。',
            guidance: '重新思考{aspect}，提示：{hint}'
        },

        incorrect: {
            opening: '❌ 让我们重新思考',
            body: '{what_wrong}是不对的。',
            guidance: '{hint}，再试一次？'
        }
    }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GrowthHackingCurriculum, TeachingSupport };
}
