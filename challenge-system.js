/**
 * 高难度闯关挑战系统
 * 包含计算题、逻辑推理题、策略设计题等多种题型
 * 用户必须真正思考和计算才能通过
 */

class ChallengeSystem {
    constructor() {
        this.challenges = this.initializeChallenges();
        this.userProgress = new Map();
        this.unlockSystem = new UnlockSystem();
    }

    initializeChallenges() {
        return {
            // ==================== 第一章：基础指标计算 ====================
            chapter1: {
                title: '基础指标精通',
                description: '掌握增长黑客的核心计算能力',
                challenges: [
                    {
                        id: 'calc_001_ltv_basic',
                        level: 1,
                        difficulty: 'medium',
                        type: 'calculation',
                        timeLimit: 600,
                        title: 'LTV基础计算',
                        scenario: `
你的SaaS产品数据：
- 月费：$99
- 平均留存月数：8个月
- Gross Margin：75%

问题：
1. 计算Gross LTV
2. 计算Net LTV
3. 解释两者的区别及应用场景

要求：显示完整计算步骤`,
                        requiredCalculations: [
                            { variable: 'gross_ltv', formula: '99 × 8', expected: 792 },
                            { variable: 'net_ltv', formula: '792 × 0.75', expected: 594 }
                        ],
                        validationRules: {
                            mustShowWork: true,
                            tolerancePercent: 1,
                            mustExplainDifference: true,
                            minExplanationWords: 50
                        },
                        hints: [
                            { unlockAfterMinutes: 3, text: 'Gross LTV不考虑成本' },
                            { unlockAfterMinutes: 5, text: 'Net LTV = Gross LTV × Gross Margin' }
                        ],
                        points: 100,
                        unlocks: ['calc_002_cac_payback']
                    },

                    {
                        id: 'calc_002_cac_payback',
                        level: 1,
                        difficulty: 'hard',
                        type: 'calculation',
                        timeLimit: 900,
                        title: 'CAC Payback Period计算与优化',
                        scenario: `
你的SaaS公司运营数据：
- 月费：$49
- Gross Margin：70%
- 平均CAC：$490
- 月流失率：5%
- 当前付费用户：500人

计算任务：
1. CAC Payback Period是多少个月？
2. 如果要在6个月内回本，有两个方案：
   方案A：提高月费（保持CAC不变）
   方案B：降低CAC（保持月费不变）
   分别计算需要的新月费和新CAC
3. 从商业角度，你推荐哪个方案？为什么？
4. 计算两个方案对年度MRR的影响

公式：
- Payback Period = CAC / (MRR × Gross Margin)
- 假设价格提升10%会导致3%的流失

要求：
- 显示每一步计算
- 解释6个月阈值的重要性
- 分析方案的风险和机会成本
- 给出数据支持的建议`,
                        requiredCalculations: [
                            { variable: 'current_payback', formula: '490 / (49 × 0.7)', expected: 14.29, tolerance: 0.5 },
                            { variable: 'target_mrr_margin', formula: '490 / 6', expected: 81.67, tolerance: 1 },
                            { variable: 'new_price', formula: '81.67 / 0.7', expected: 116.67, tolerance: 1 },
                            { variable: 'new_cac', formula: '49 × 0.7 × 6', expected: 205.8, tolerance: 1 }
                        ],
                        validationRules: {
                            mustShowWork: true,
                            tolerancePercent: 2,
                            mustExplainThreshold: true,
                            mustAnalyzeRisks: true,
                            mustCalculateImpact: true,
                            recommendationMustBeFeasible: true,
                            minExplanationWords: 150
                        },
                        points: 200,
                        unlocks: ['calc_003_blended_cac', 'logic_001_conversion_drop']
                    },

                    {
                        id: 'calc_003_blended_cac',
                        level: 2,
                        difficulty: 'hard',
                        type: 'calculation',
                        timeLimit: 1200,
                        title: 'Blended CAC与渠道优化',
                        scenario: `
你的获客渠道数据（上月）：

Organic（SEO/内容）：
- 新用户：300
- 成本：$0
- 转化率：5%

Paid Social（Facebook/LinkedIn）：
- 新用户：500
- 广告支出：$75,000
- 转化率：3%

Paid Search（Google Ads）：
- 新用户：200
- 广告支出：$40,000
- 转化率：4%

产品数据：
- 月费：$99
- Gross Margin：75%
- 平均留存：10个月

计算与分析：
1. 计算每个渠道的CAC
2. 计算Blended CAC
3. 计算每个渠道的LTV/CAC比例
4. 如果下月预算增加到$150,000，如何分配才能使ROI最大化？
5. 计算优化后的Blended CAC和预期新增付费用户数

要求：
- 完整计算过程
- 渠道效率排名
- 预算分配策略（必须给出具体数字）
- 说明分配逻辑
- 计算优化后的关键指标`,
                        requiredCalculations: [
                            { variable: 'organic_cac', expected: 0 },
                            { variable: 'paid_social_cac', formula: '75000 / (500 × 0.03)', expected: 5000, tolerance: 10 },
                            { variable: 'paid_search_cac', formula: '40000 / (200 × 0.04)', expected: 5000, tolerance: 10 },
                            { variable: 'blended_cac', formula: '115000 / ((300 × 0.05) + (500 × 0.03) + (200 × 0.04))', expected: 2743, tolerance: 50 },
                            { variable: 'ltv', formula: '99 × 10 × 0.75', expected: 742.5 }
                        ],
                        validationRules: {
                            mustShowWork: true,
                            mustRankChannels: true,
                            budgetAllocationMustTotal: 150000,
                            mustJustifyAllocation: true,
                            mustCalculateExpectedResults: true,
                            tolerancePercent: 3
                        },
                        points: 250,
                        unlocks: ['calc_004_unit_economics', 'strategy_001_growth_plan']
                    },

                    {
                        id: 'calc_004_unit_economics',
                        level: 2,
                        difficulty: 'expert',
                        type: 'calculation',
                        timeLimit: 1500,
                        title: 'Unit Economics深度分析',
                        scenario: `
你是一个B2B SaaS的增长负责人，CFO要求你证明商业模式是健康的。

当前数据（月度）：
- 付费用户：1,200
- MRR：$118,800（不同plan）
  - Basic ($79)：600人
  - Pro ($129)：400人
  - Enterprise ($199)：200人

成本结构：
- 服务器成本：$15,000/月（固定）+ $2/活跃用户/月
- 客服成本：$8,000/月 + $5/ticket（平均0.5 ticket/用户/月）
- 销售团队：5人 × $8,000/月
- 营销支出：$50,000/月

获客数据：
- 月新增付费用户：120
- 平均销售周期：60天
- 各plan分布与当前用户一致

留存数据：
- Basic：平均留存6个月
- Pro：平均留存12个月
- Enterprise：平均留存18个月

问题：
1. 计算各plan的Unit Economics：
   - LTV（考虑Gross Margin）
   - Blended CAC
   - LTV/CAC比例
   - Payback Period

2. 计算公司整体的：
   - Gross Margin
   - Blended LTV
   - Blended CAC
   - 月度盈亏平衡点

3. 健康度评估：
   - LTV/CAC是否健康（应>3）
   - Payback是否健康（应<12个月）
   - 识别问题

4. 优化方案：
   - 如果LTV/CAC不健康，提出2个可量化的改进方案
   - 计算改进后的指标
   - 评估可行性

要求：
- 所有计算必须显示过程
- 必须考虑plan mix
- 必须计算加权平均
- 优化方案必须有具体数字`,
                        requiredCalculations: [
                            { variable: 'basic_revenue_per_user', expected: 79 },
                            { variable: 'pro_revenue_per_user', expected: 129 },
                            { variable: 'enterprise_revenue_per_user', expected: 199 },
                            { variable: 'total_cogs', formula: '15000 + (2 × 1200) + 8000 + (5 × 0.5 × 1200) + (5 × 8000)', expected: 68400 },
                            { variable: 'gross_margin_percent', formula: '(118800 - 68400) / 118800', expected: 0.424, tolerance: 0.01 },
                            { variable: 'blended_cac', formula: '50000 / 120', expected: 416.67, tolerance: 10 },
                            { variable: 'basic_ltv', formula: '79 × 6 × gross_margin', expected: 201, tolerance: 5 },
                            { variable: 'pro_ltv', formula: '129 × 12 × gross_margin', expected: 656, tolerance: 10 },
                            { variable: 'enterprise_ltv', formula: '199 × 18 × gross_margin', expected: 1519, tolerance: 20 }
                        ],
                        validationRules: {
                            mustShowWork: true,
                            mustCalculateByPlan: true,
                            mustCalculateBlended: true,
                            mustAssessHealth: true,
                            mustProvideOptimization: true,
                            optimizationMustBeQuantified: true,
                            tolerancePercent: 5,
                            minExplanationWords: 200
                        },
                        points: 400,
                        unlocks: ['chapter2']
                    }
                ]
            },

            // ==================== 第二章：逻辑推理与分析 ====================
            chapter2: {
                title: '数据侦探：逻辑推理',
                description: '从数据中发现问题，推理根因',
                challenges: [
                    {
                        id: 'logic_001_conversion_drop',
                        level: 3,
                        difficulty: 'hard',
                        type: 'logic_puzzle',
                        timeLimit: 1200,
                        title: '转化率下降之谜',
                        scenario: `
你的SaaS产品过去4周的数据：

Week 1:
- 注册：1,000
- 激活（完成onboarding）：100（10%）
- 付费转化：20（2%）

Week 2:
- 注册：1,200
- 激活：108（9%）
- 付费转化：19（1.58%）

Week 3:
- 注册：1,500
- 激活：105（7%）
- 付费转化：15（1%）

Week 4:
- 注册：2,000
- 激活：100（5%）
- 付费转化：10（0.5%）

额外信息：
- Week 3开始投放Facebook广告
- Week 4开始在Product Hunt推广
- 产品功能没有变化
- 定价没有变化
- Onboarding流程没有变化

分析任务：
1. 现象描述：用数据量化问题的严重程度
2. 提出3个可能的假设（按可能性排序）
3. 每个假设必须：
   - 解释为什么会导致观察到的数据
   - 提供支持性推理
   - 说明如何验证
4. 选出最可能的假设，给出充分理由
5. 设计验证实验（包括需要的数据、预期结果、判断标准）
6. 提出具体的优化方案

要求：
- 必须用数据支持每个论点
- 必须说明因果关系
- 验证方法必须可执行
- 不能有逻辑跳跃`,
                        expectedElements: {
                            quantified_problem: true,
                            hypothesis_count: 3,
                            each_hypothesis_has: ['explanation', 'reasoning', 'validation_method'],
                            selected_hypothesis: true,
                            selection_reasoning: true,
                            experiment_design: {
                                data_needed: true,
                                expected_results: true,
                                success_criteria: true
                            },
                            optimization_plan: true
                        },
                        validationRules: {
                            mustQuantifyProblem: true,
                            mustProvideThreeHypotheses: true,
                            mustRankByLikelihood: true,
                            mustExplainCausality: true,
                            mustDesignValidation: true,
                            validationMustBeSpecific: true,
                            mustProvideDataSupport: true,
                            minExplanationWords: 300
                        },
                        points: 300,
                        unlocks: ['logic_002_cohort_mystery', 'logic_003_churn_spike']
                    },

                    {
                        id: 'logic_002_cohort_mystery',
                        level: 3,
                        difficulty: 'expert',
                        type: 'logic_puzzle',
                        timeLimit: 1800,
                        title: 'Cohort留存之谜',
                        scenario: `
观察以下3个月的Cohort留存数据：

2024年1月Cohort（1,000用户）：
- Month 0: 100% (1,000)
- Month 1: 45% (450)
- Month 2: 28% (280)
- Month 3: 22% (220)

2024年2月Cohort（1,200用户）：
- Month 0: 100% (1,200)
- Month 1: 38% (456)
- Month 2: 20% (240)
- Month 3: ? (预测)

2024年3月Cohort（1,500用户）：
- Month 0: 100% (1,500)
- Month 1: 32% (480)
- Month 2: ? (预测)

2024年4月Cohort（2,000用户）：
- Month 0: 100% (2,000)
- Month 1: ? (预测)

补充信息：
- 2月开始调整定价（涨价15%）
- 3月推出新功能A（使用率40%）
- 4月推出新功能B（使用率未知）
- 获客渠道mix在变化（具体不详）

分析任务：
1. 趋势分析：
   - Month 1留存率的变化趋势（计算变化率）
   - Month 2留存率的变化趋势
   - 识别是改善还是恶化，用数据证明

2. 根因分析：
   - 哪些因素可能导致留存率变化？
   - 用数据推理各因素的影响程度
   - 识别主要因素

3. 预测建模：
   - 如果趋势继续，预测缺失的数据
   - 说明预测方法和假设
   - 给出置信区间

4. 影响评估：
   - 如果趋势继续6个月，计算对业务的影响
     - MRR影响
     - LTV影响
     - 需要多少新用户才能维持增长

5. 行动计划：
   - 提出3个优化方案（优先级排序）
   - 每个方案的预期影响（量化）
   - 实施计划和资源需求

要求：
- 所有推理必须基于数据
- 计算必须显示过程
- 预测必须说明方法
- 方案必须可执行`,
                        requiredCalculations: [
                            { variable: 'jan_m1_retention', expected: 0.45 },
                            { variable: 'feb_m1_retention', expected: 0.38 },
                            { variable: 'mar_m1_retention', expected: 0.32 },
                            { variable: 'm1_decline_rate', formula: '((0.32 - 0.45) / 0.45)', expected: -0.289, tolerance: 0.01 }
                        ],
                        validationRules: {
                            mustIdentifyTrend: true,
                            mustCalculateTrendRate: true,
                            mustAnalyzeRootCause: true,
                            mustMakePredictions: true,
                            predictionMustHaveMethod: true,
                            mustCalculateBusinessImpact: true,
                            actionPlanMustBePrioritized: true,
                            mustQuantifyExpectedImpact: true,
                            minExplanationWords: 400
                        },
                        points: 500,
                        unlocks: ['logic_003_churn_spike', 'strategy_002_retention_plan']
                    },

                    {
                        id: 'logic_003_churn_spike',
                        level: 4,
                        difficulty: 'expert',
                        type: 'logic_puzzle',
                        timeLimit: 2100,
                        title: '流失率突增的多维分析',
                        scenario: `
你的SaaS产品3月份出现流失率突增：

历史数据（月流失率）：
- 12月：4.5%
- 1月：4.3%
- 2月：4.6%
- 3月：8.2% ← 异常！

3月分层数据：

按Plan：
- Basic（$79/月）：流失率 12%（用户占比60%）
- Pro（$129/月）：流失率 6%（用户占比30%）
- Enterprise（$199/月）：流失率 3%（用户占比10%）

按注册时间：
- 0-3个月：15%
- 3-6个月：8%
- 6-12个月：5%
- 12个月以上：2%

按使用频率（3月）：
- 高频（每日）：2%
- 中频（每周）：6%
- 低频（每月）：18%
- 未使用：35%

按获客渠道：
- Organic：4%
- Paid Search：7%
- Paid Social：12%
- Referral：3%

时间线事件：
- 2月15日：竞争对手Product X降价30%
- 3月1日：我们推出新功能Y（复杂度高）
- 3月10日：服务器故障2小时
- 3月15日：发送邮件推销Enterprise plan

分析任务：

1. 多维分解（30%）：
   - 计算各维度对整体流失的贡献
   - 识别最大贡献因素
   - 用数据证明

2. 交叉分析（25%）：
   - 结合多个维度分析
   - 识别高风险用户画像
   - 找出共性

3. 根因推理（25%）：
   - 综合时间线和数据，推理根本原因
   - 为什么影响了特定用户群？
   - 为什么是3月爆发？

4. 影响预测（10%）：
   - 如果不采取行动，未来3个月的预期流失
   - 对MRR的影响
   - 对增长的影响

5. 应对方案（10%）：
   - 短期止血方案（1周内）
   - 中期改善方案（1月内）
   - 长期预防方案（3月内）
   - 每个方案的预期效果（量化）

要求：
- 必须进行多维度分析
- 必须找到交叉关系
- 推理必须严密
- 方案必须针对性强`,
                        validationRules: {
                            mustCalculateContribution: true,
                            mustPerformCrossAnalysis: true,
                            mustIdentifyHighRiskProfile: true,
                            mustInferRootCause: true,
                            rootCauseMustBeSpecific: true,
                            mustPredictFutureImpact: true,
                            mustProvideThreeTierPlan: true,
                            plansMustBeTargeted: true,
                            mustQuantifyExpectedResults: true,
                            minExplanationWords: 500
                        },
                        points: 600,
                        unlocks: ['chapter3']
                    }
                ]
            },

            // ==================== 第三章：策略设计 ====================
            chapter3: {
                title: '战略家：增长策略设计',
                description: '设计可执行的增长策略',
                challenges: [
                    {
                        id: 'strategy_001_growth_plan',
                        level: 5,
                        difficulty: 'expert',
                        type: 'strategy_design',
                        timeLimit: 2400,
                        title: '6个月增长策略设计',
                        scenario: `
你是一个B2B SaaS的增长负责人，董事会给了你明确目标：

目标：
- 当前：1,000付费客户，MRR $120,000
- 6个月后：5,000付费客户，MRR $600,000

当前数据：
- 平均客单价：$120/月
- CAC：$2,000
- LTV：$15,000（留存12.5个月）
- Sales cycle：60天
- 销售团队：5人（每人每月成交4单）
- 营销预算：$80,000/月

限制条件：
- CEO要求：必须健康增长（CAC < LTV × 30% = $4,500）
- CFO要求：
  - 前3个月烧钱不超过$200,000
  - 后3个月必须盈亏平衡
- CTO要求：团队规模不能超过当前2倍
- 投资人要求：至少保持30% MoM增长

挑战：
- 当前销售产能：5人 × 4单 = 20单/月
- 要达到目标需要：(5000-1000)/6 = 667新客户/月
- 产能缺口：667 - 20 = 647单/月

设计任务：

1. 目标分解（15%）：
   - 每月目标（客户数、MRR）
   - 每周目标
   - 必须满足30% MoM增长要求

2. 增长模型（25%）：
   - 设计获客渠道组合（至少3个）
   - 每个渠道的：
     - 目标客户数
     - CAC
     - 转化率
     - 所需预算
   - 必须算得通（数字加总=总目标）

3. 资源规划（20%）：
   - 团队扩张计划（时间、人数、成本）
   - 预算分配（每月、每渠道）
   - 必须满足CFO的限制

4. 风险管理（20%）：
   - 识别至少5个关键风险
   - 每个风险的应对预案
   - 最坏情况下的保底方案

5. 执行路线图（20%）：
   - 月度里程碑
   - 关键指标监控
   - Go/No-go决策点

验证要求：
- 所有数字必须算得通
- 必须满足所有限制条件
- 方案必须可执行
- 必须有数据支持`,
                        constraints: {
                            cac_max: 4500,
                            budget_first_3_months: 200000,
                            breakeven_after_month_3: true,
                            team_size_max_multiplier: 2,
                            mom_growth_min: 0.30
                        },
                        validationCriteria: {
                            mathCheck: true,
                            constraintCheck: true,
                            feasibilityCheck: true,
                            riskAssessment: true,
                            executionPlan: true,
                            minChannels: 3,
                            minRisks: 5,
                            mustShowCalculations: true
                        },
                        validationRules: {
                            mustDecomposeGoals: true,
                            goalsMustMeetMoM: true,
                            mustDesignChannelMix: true,
                            channelsMustAddUp: true,
                            mustPlanResources: true,
                            budgetMustRespectConstraints: true,
                            mustIdentifyRisks: true,
                            mustProvideMitigation: true,
                            mustCreateRoadmap: true,
                            roadmapMustHaveMilestones: true,
                            minExplanationWords: 600
                        },
                        points: 800,
                        unlocks: ['strategy_002_retention_plan', 'strategy_003_pivot']
                    },

                    {
                        id: 'strategy_002_retention_plan',
                        level: 6,
                        difficulty: 'expert',
                        type: 'strategy_design',
                        timeLimit: 2400,
                        title: '留存率提升策略',
                        scenario: `
你的产品留存率不健康，需要系统性改善。

当前Cohort留存曲线：
- Day 1: 100%
- Day 7: 35%
- Day 30: 18%
- Day 90: 12%
- Day 180: 8%

分层数据：

按使用频率（Day 30）：
- 使用≥10次：留存90%
- 使用5-9次：留存45%
- 使用1-4次：留存12%
- 使用0次：留存2%

按功能使用：
- 使用核心功能A：留存85%
- 未使用核心功能A：留存8%

按Onboarding完成度：
- 完成100%：留存70%
- 完成50-99%：留存25%
- 完成<50%：留存5%

当前Onboarding数据：
- 完成率：只有20%完成100%
- 平均完成时间：45分钟
- 放弃率最高的步骤：步骤3（集成设置，35%放弃）

业务影响：
- 如果Day 30留存提升到25%，LTV将从$1,200增加到$1,667（+39%）
- 如果Day 90留存提升到20%，LTV将增加到$2,000（+67%）

目标：
- 3个月内将Day 30留存提升到30%
- 6个月内将Day 90留存提升到25%

设计任务：

1. 问题诊断（20%）：
   - 分析当前留存曲线，识别关键流失点
   - 计算各流失点的影响
   - 找出最大杠杆点

2. 策略设计（30%）：
   - Onboarding优化策略
     - 具体改进点
     - 预期完成率
     - 实施计划
   - Activation优化策略
     - 如何引导使用核心功能
     - 具体tactics
   - Engagement优化策略
     - 如何提高使用频率
     - 触发机制设计

3. 执行计划（25%）：
   - 月度路线图
   - 资源需求（人力、技术、预算）
   - 优先级排序

4. 效果预测（15%）：
   - 每个策略的预期影响（量化）
   - 综合影响（Day 30、Day 90留存率）
   - LTV提升计算
   - MRR增长计算

5. 监控与迭代（10%）：
   - 关键指标dashboard
   - 成功标准
   - 迭代机制

要求：
- 策略必须针对诊断出的问题
- 必须量化预期影响
- 必须可执行
- 必须有监控机制`,
                        validationRules: {
                            mustDiagnoseBottlenecks: true,
                            mustCalculateImpact: true,
                            mustDesignOnboardingOptimization: true,
                            mustDesignActivationStrategy: true,
                            mustDesignEngagementStrategy: true,
                            mustCreateExecutionPlan: true,
                            mustPrioritize: true,
                            mustQuantifyExpectedImpact: true,
                            impactMustBeRealistic: true,
                            mustDefinemetrics: true,
                            mustDefineSuccessCriteria: true,
                            minExplanationWords: 500
                        },
                        points: 700,
                        unlocks: ['strategy_003_pivot', 'strategy_004_pricing']
                    },

                    {
                        id: 'strategy_003_pivot',
                        level: 7,
                        difficulty: 'nightmare',
                        type: 'strategy_design',
                        timeLimit: 3600,
                        title: '战略转型：PMF危机',
                        scenario: `
危机情况：你的SaaS产品运营18个月后，数据显示PMF不足。

当前状况：
- 付费用户：800
- MRR：$95,000
- MoM增长：5%（持续下降）
- CAC：$3,500（持续上升）
- LTV：$8,400（由于流失率上升而下降）
- LTV/CAC：2.4（不健康）
- 现金储备：$500,000（按当前烧钱率，还有8个月）
- 团队：15人

用户反馈分析：
- NPS：-15（糟糕）
- 主要抱怨：
  - "功能太复杂，不知道怎么用"（45%）
  - "价格太贵，价值不匹配"（30%）
  - "缺少关键功能X"（25%）

使用数据分析：
- 只有15%的用户使用核心功能
- 85%的用户只用了基础功能
- 基础功能的竞品价格只有你的1/3

市场分析：
- 你的定位：Enterprise（$150/月）
- 实际客户：80%是小企业
- 小企业真正需要：简化版，$49/月
- Enterprise客户需要：更多功能，$299/月

数据洞察：
- 使用核心功能的用户：LTV $18,000，NPS 45，留存极好
- 只用基础功能的用户：LTV $4,200，NPS -30，大量流失

决策时刻：你需要Pivot

设计任务：

1. 战略分析（20%）：
   - 诊断PMF问题根源
   - 分析用户分层
   - 识别真正的机会市场
   - 量化各市场的潜力

2. Pivot方案设计（30%）：
   设计2个Pivot方案：

   方案A：向下市场（Small Business）
   - 产品简化策略
   - 定价策略
   - 目标客户画像
   - Go-to-market策略

   方案B：向上市场（Enterprise）
   - 产品增强策略
   - 定价策略
   - 目标客户画像
   - Go-to-market策略

   每个方案必须包含：
   - 详细的产品调整
   - 定价模型
   - 营销渠道
   - 销售策略
   - 18个月财务预测

3. 方案评估（20%）：
   对比两个方案：
   - 市场规模
   - 获客难度和成本
   - 产品开发工作量
   - 财务模型
   - 风险评估
   - 推荐选择（必须给出充分理由）

4. 执行计划（20%）：
   针对推荐方案：
   - 6个月详细路线图
   - 资源重新分配
   - 团队调整
   - 现有客户处理策略
   - 关键里程碑和决策点

5. 风险与应对（10%）：
   - 识别关键风险
   - 每个风险的应对方案
   - 退出策略（如果Pivot失败）

要求：
- 必须基于数据做决策
- 财务模型必须算得通
- 必须考虑现金储备约束
- 方案必须现实可行
- 必须处理现有客户`,
                        validationRules: {
                            mustDiagnosePMF: true,
                            mustAnalyzeSegments: true,
                            mustDesignTwoOptions: true,
                            eachOptionMustHave: [
                                'product_strategy',
                                'pricing_model',
                                'gtm_strategy',
                                'financial_projection'
                            ],
                            mustCompareOptions: true,
                            comparisonMustBeQuantified: true,
                            mustRecommendOne: true,
                            recommendationMustBeJustified: true,
                            mustCreateDetailedRoadmap: true,
                            mustPlanResourceReallocation: true,
                            mustAddressExistingCustomers: true,
                            mustIdentifyRisks: true,
                            mustProvideExitStrategy: true,
                            financialsMustBeRealistic: true,
                            mustRespectCashConstraint: true,
                            minExplanationWords: 800
                        },
                        points: 1000,
                        unlocks: ['chapter4']
                    }
                ]
            },

            // ==================== 第四章：高级实战 ====================
            chapter4: {
                title: '增长大师：综合实战',
                description: '综合运用所有技能解决复杂问题',
                challenges: [
                    {
                        id: 'master_001_full_audit',
                        level: 8,
                        difficulty: 'nightmare',
                        type: 'comprehensive',
                        timeLimit: 4800,
                        title: '完整增长审计与优化',
                        scenario: `
你被聘为增长顾问，对一个SaaS产品进行完整审计。

[包含完整的漏斗数据、财务数据、用户行为数据...]

任务：
1. 完整的增长诊断报告
2. 优先级排序的优化建议
3. 详细执行计划
4. 预期ROI计算

[详细要求...]`,
                        validationRules: {
                            // 综合所有之前的验证规则
                            requiresAllSkills: true,
                            minExplanationWords: 1000
                        },
                        points: 1500,
                        unlocks: ['master_certification']
                    }
                ]
            }
        };
    }

    // 获取用户当前可用的挑战
    getAvailableChallenges(userId) {
        const progress = this.userProgress.get(userId) || {
            completedChallenges: [],
            unlockedChallenges: ['calc_001_ltv_basic'],
            level: 1
        };

        return this.getAllChallenges()
            .filter(challenge => progress.unlockedChallenges.includes(challenge.id))
            .sort((a, b) => a.level - b.level);
    }

    // 获取所有挑战（扁平化）
    getAllChallenges() {
        const allChallenges = [];
        Object.values(this.challenges).forEach(chapter => {
            allChallenges.push(...chapter.challenges);
        });
        return allChallenges;
    }

    // 获取单个挑战
    getChallenge(challengeId) {
        return this.getAllChallenges().find(c => c.id === challengeId);
    }

    // 开始挑战
    startChallenge(userId, challengeId) {
        const challenge = this.getAllChallenges().find(c => c.id === challengeId);
        if (!challenge) {
            throw new Error('Challenge not found');
        }

        const progress = this.userProgress.get(userId) || {};
        if (!progress.unlockedChallenges || !progress.unlockedChallenges.includes(challengeId)) {
            throw new Error('Challenge not unlocked');
        }

        return {
            challenge: challenge,
            startTime: Date.now(),
            timeLimit: challenge.timeLimit,
            attempts: 0,
            hintsUsed: []
        };
    }

    // 提交答案（在validation-rules.js中处理验证）
    submitAnswer(userId, challengeId, answer, session) {
        // 由ValidationRules处理
        return {
            challengeId,
            userId,
            answer,
            session,
            submittedAt: Date.now()
        };
    }

    // 解锁新挑战
    unlockChallenges(userId, unlockedIds) {
        const progress = this.userProgress.get(userId) || {
            completedChallenges: [],
            unlockedChallenges: ['calc_001_ltv_basic'],
            level: 1
        };

        unlockedIds.forEach(id => {
            if (!progress.unlockedChallenges.includes(id)) {
                progress.unlockedChallenges.push(id);
            }
        });

        this.userProgress.set(userId, progress);
    }

    // 获取提示
    getHint(challengeId, elapsedMinutes) {
        const challenge = this.getAllChallenges().find(c => c.id === challengeId);
        if (!challenge || !challenge.hints) return null;

        const availableHints = challenge.hints.filter(
            hint => elapsedMinutes >= hint.unlockAfterMinutes
        );

        return availableHints[availableHints.length - 1] || null;
    }
}

// 解锁系统
class UnlockSystem {
    checkUnlock(userScore, userProgress, challenge) {
        const unlocks = {
            skills: [],
            challenges: [],
            hints: [],
            content: [],
            achievements: []
        };

        // 基于分数解锁
        if (userScore >= 90) {
            // 完美通关
            unlocks.achievements.push('perfectionist_' + challenge.id);
            unlocks.challenges.push(...(challenge.unlocks || []));
            unlocks.content.push('master_template_' + challenge.id);

            // 如果连续3次90+，解锁特殊技能
            if (this.checkWinStreak(userProgress, 90) >= 3) {
                unlocks.skills.push('advanced_analytics');
                unlocks.achievements.push('consistent_excellence');
            }
        } else if (userScore >= 80) {
            // 优秀
            unlocks.challenges.push(...(challenge.unlocks || []));
            unlocks.content.push('pro_template_' + challenge.id);
        } else if (userScore >= 70) {
            // 通过
            unlocks.challenges.push(...(challenge.unlocks || []));
        } else {
            // 不及格，不解锁
            unlocks.retry = true;
            unlocks.message = '需要达到70分才能继续';
            unlocks.requiredScore = 70;
            unlocks.currentScore = userScore;
        }

        // 章节完成奖励
        if (this.isChapterComplete(userProgress, challenge)) {
            unlocks.achievements.push('chapter_complete_' + this.getChapter(challenge));
            unlocks.content.push('chapter_summary_' + this.getChapter(challenge));
        }

        return unlocks;
    }

    checkWinStreak(userProgress, minScore) {
        const recentScores = userProgress.recentScores || [];
        let streak = 0;
        for (let i = recentScores.length - 1; i >= 0; i--) {
            if (recentScores[i] >= minScore) {
                streak++;
            } else {
                break;
            }
        }
        return streak;
    }

    isChapterComplete(userProgress, challenge) {
        const chapter = this.getChapter(challenge);
        // 检查该章节所有挑战是否都完成
        // 实现逻辑...
        return false;
    }

    getChapter(challenge) {
        if (challenge.id.startsWith('calc_')) return 'chapter1';
        if (challenge.id.startsWith('logic_')) return 'chapter2';
        if (challenge.id.startsWith('strategy_')) return 'chapter3';
        if (challenge.id.startsWith('master_')) return 'chapter4';
        return 'unknown';
    }
}

module.exports = { ChallengeSystem, UnlockSystem };
