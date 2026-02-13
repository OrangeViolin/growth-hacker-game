/**
 * 增长黑客知识库
 * 包含50+核心概念、挑战关卡、常见错误和最佳实践
 */

class KnowledgeBase {
    constructor() {
        this.concepts = this.initializeConcepts();
        this.challenges = this.initializeChallenges();
        this.commonMistakes = this.initializeCommonMistakes();
        this.bestPractices = this.initializeBestPractices();
        this.conceptGraph = this.buildConceptGraph();
    }

    /**
     * 初始化50个核心概念
     */
    initializeConcepts() {
        return {
            // ===== Level 1: 基础概念 (10个) =====
            'aarrr': {
                id: 'aarrr',
                name: 'AARRR框架',
                level: 1,
                category: 'framework',
                definition: '获客(Acquisition)、激活(Activation)、留存(Retention)、收入(Revenue)、推荐(Referral)的海盗指标框架',
                formula: null,
                keyPoints: [
                    '五个关键增长阶段',
                    '每个阶段都有可量化的指标',
                    '找出当前阶段的最大瓶颈',
                    '优先优化瓶颈环节'
                ],
                commonMistakes: [
                    '同时优化所有环节',
                    '没有量化每个环节的指标',
                    '忽略后期的留存和推荐'
                ],
                relatedConcepts: ['funnel_analysis', 'north_star_metric', 'pirate_metrics']
            },

            'north_star_metric': {
                id: 'north_star_metric',
                name: '北极星指标',
                level: 1,
                category: 'metrics',
                definition: '最能代表产品核心价值和长期增长的单一关键指标',
                examples: {
                    'Facebook': 'DAU (Daily Active Users)',
                    'Airbnb': 'Nights Booked',
                    'Netflix': 'Hours Watched',
                    'Slack': 'Messages Sent'
                },
                keyPoints: [
                    '必须反映用户获得的价值',
                    '与长期增长直接相关',
                    '全公司围绕这个指标优化',
                    '避免虚荣指标'
                ],
                commonMistakes: [
                    '选择注册数等虚荣指标',
                    '选择多个北极星指标',
                    '北极星指标与收入无关'
                ]
            },

            'funnel_analysis': {
                id: 'funnel_analysis',
                name: '漏斗分析',
                level: 1,
                category: 'analytics',
                definition: '分析用户从接触产品到完成目标行为的每个步骤的转化率',
                formula: 'Conversion Rate = (Users at Step N / Users at Step 1) × 100%',
                keyPoints: [
                    '识别最大drop-off点',
                    '计算每步转化率',
                    '找出改进优先级',
                    '持续A/B测试优化'
                ],
                calculations: [
                    {
                        name: 'stage_conversion',
                        formula: 'Stage CR = Users Completed / Users Entered',
                        example: '100 visitors → 20 signups = 20% conversion'
                    },
                    {
                        name: 'overall_funnel',
                        formula: 'Overall CR = Final Conversions / Initial Visitors',
                        example: '1000 visits → 50 purchases = 5% overall'
                    }
                ]
            },

            'cac': {
                id: 'cac',
                name: 'CAC - 客户获取成本',
                level: 1,
                category: 'metrics',
                definition: '获取一个新付费客户所需的平均成本',
                formula: 'CAC = Total Marketing & Sales Spend / Number of New Customers',
                keyPoints: [
                    'CAC应该远小于LTV',
                    '健康比例: CAC < LTV × 30%',
                    '包含所有获客成本（广告、销售工资、工具）',
                    '按渠道拆分CAC'
                ],
                calculations: [
                    {
                        name: 'basic_cac',
                        formula: 'CAC = Total Spend / New Customers',
                        example: '$10,000 spend / 100 customers = $100 CAC'
                    },
                    {
                        name: 'channel_cac',
                        formula: 'Channel CAC = Channel Spend / Channel Customers',
                        example: 'Facebook: $5,000 / 50 = $100; SEO: $2,000 / 50 = $40'
                    }
                ],
                commonMistakes: [
                    '只计算广告费，忽略人力成本',
                    '不区分渠道CAC',
                    '没有计算payback period'
                ],
                relatedConcepts: ['ltv', 'unit_economics', 'payback_period']
            },

            'ltv': {
                id: 'ltv',
                name: 'LTV - 客户生命周期价值',
                level: 1,
                category: 'metrics',
                definition: '一个客户在整个生命周期内为公司带来的总价值',
                formula: 'LTV = ARPU × Average Customer Lifetime (months)',
                alternativeFormula: 'LTV = ARPU / Churn Rate',
                keyPoints: [
                    'LTV必须显著大于CAC',
                    'LTV/CAC比例应 > 3',
                    '考虑时间价值（折现）',
                    '区分不同客群的LTV'
                ],
                calculations: [
                    {
                        name: 'simple_ltv',
                        formula: 'LTV = Monthly Revenue × Avg Months',
                        example: '$50/month × 24 months = $1,200'
                    },
                    {
                        name: 'churn_based_ltv',
                        formula: 'LTV = ARPU / Monthly Churn Rate',
                        example: '$50 / 5% = $1,000'
                    },
                    {
                        name: 'gross_margin_ltv',
                        formula: 'LTV = (ARPU × Gross Margin) / Churn Rate',
                        example: '($50 × 80%) / 5% = $800'
                    }
                ],
                commonMistakes: [
                    '忽略churn rate',
                    '不考虑gross margin',
                    '用过短的时间窗口计算'
                ]
            },

            'unit_economics': {
                id: 'unit_economics',
                name: 'Unit Economics - 单位经济学',
                level: 1,
                category: 'business_model',
                definition: '单个客户带来的收入与成本的关系，决定商业模式的可行性',
                formula: 'Unit Profit = LTV - CAC',
                healthyRatio: 'LTV / CAC > 3 且 CAC Payback < 12 months',
                keyPoints: [
                    '健康的单位经济学是增长的前提',
                    'LTV/CAC比例至少3:1',
                    'CAC回收期 < 12个月',
                    '如果unit economics不健康，增长越快亏损越多'
                ],
                decisonTree: {
                    'LTV > CAC × 3': '健康，可以加速增长',
                    'LTV > CAC × 2': '可以增长，但需优化',
                    'LTV > CAC × 1': '勉强盈利，必须优化',
                    'LTV < CAC': '每卖一单亏一单，停止增长！'
                },
                commonMistakes: [
                    '单位经济学不健康就大举投广告',
                    '只看收入不看利润',
                    '忽略CAC回收期'
                ]
            },

            'pmf': {
                id: 'pmf',
                name: 'PMF - 产品市场契合度',
                level: 1,
                category: 'product',
                definition: '产品解决了市场真实需求的程度',
                measurement: '40%规则：至少40%用户表示如果失去产品会"非常失望"',
                keyPoints: [
                    '达到PMF之前不要大规模增长',
                    '信号：用户主动推荐、高NPS、低churn',
                    'PMF不是一次性状态，需要持续维护',
                    '不同市场segment可能有不同PMF程度'
                ],
                signals: {
                    strong: ['organic growth', 'NPS > 50', 'retention > 60% (M3)', 'users desperately need it'],
                    weak: ['high CAC', 'high churn', 'low engagement', 'need to push users']
                }
            },

            'viral_coefficient': {
                id: 'viral_coefficient',
                name: 'Viral Coefficient - 病毒系数',
                level: 1,
                category: 'growth',
                definition: '平均每个用户带来的新用户数量',
                formula: 'K = i × c (i=邀请数, c=转化率)',
                keyPoints: [
                    'K > 1: 病毒式自增长',
                    'K = 1: 零增长',
                    'K < 1: 需要持续投入获客',
                    '提高K的两个杠杆：增加邀请数i，提高转化率c'
                ],
                calculations: [
                    {
                        name: 'k_factor',
                        formula: 'K = Invites per User × Invite Conversion Rate',
                        example: '5 invites × 20% = K of 1.0'
                    },
                    {
                        name: 'viral_growth',
                        formula: 'New Users (cycle n) = Current Users × K',
                        example: '100 users × K=1.2 = 120 new users per cycle'
                    }
                ],
                viralLoopDesign: [
                    '1. 找到natural sharing moment',
                    '2. 降低分享摩擦',
                    '3. 激励分享（双向奖励）',
                    '4. 优化被邀请人体验'
                ]
            },

            'retention_curve': {
                id: 'retention_curve',
                name: 'Retention Curve - 留存曲线',
                level: 1,
                category: 'retention',
                definition: '用户随时间的留存率变化曲线',
                keyPoints: [
                    '健康产品的留存曲线会趋于平稳（flatten）',
                    '如果一直下降，说明缺乏long-term value',
                    '关注D1, D7, D30留存率',
                    '不同cohort的留存曲线对比'
                ],
                benchmarks: {
                    'excellent': 'D1>40%, D7>25%, D30>15%',
                    'good': 'D1>30%, D7>20%, D30>10%',
                    'poor': 'D1<20%, D7<10%, D30<5%'
                },
                formula: 'Retention Rate (Day N) = Active Users on Day N / Users Started'
            },

            'cohort_analysis': {
                id: 'cohort_analysis',
                name: 'Cohort Analysis - 队列分析',
                level: 1,
                category: 'analytics',
                definition: '按用户注册时间分组，对比不同时期用户的行为表现',
                keyPoints: [
                    '对比不同月份cohort的留存率',
                    '识别产品改进的效果',
                    '发现long-term trends',
                    '计算真实的LTV'
                ],
                useCases: [
                    '评估产品改版效果',
                    '对比获客渠道质量',
                    '预测未来留存和收入',
                    '识别季节性模式'
                ]
            },

            // ===== Level 2: 进阶策略 (15个) =====
            'ab_testing': {
                id: 'ab_testing',
                name: 'A/B Testing - A/B测试',
                level: 2,
                category: 'optimization',
                definition: '通过随机分组对比不同版本的效果',
                keyPoints: [
                    '必须有足够的样本量',
                    '达到统计显著性（p < 0.05）',
                    '一次只测一个变量',
                    '测试核心指标，不是虚荣指标'
                ],
                formula: 'Sample Size = (Z² × p × (1-p)) / E²',
                commonMistakes: [
                    '样本量太小',
                    '测试时间太短',
                    '同时改多个变量',
                    'p-hacking（不断测试直到显著）'
                ],
                prerequisite: ['funnel_analysis', 'statistical_significance']
            },

            'onboarding_flow': {
                id: 'onboarding_flow',
                name: 'Onboarding Flow - 用户引导流程',
                level: 2,
                category: 'activation',
                definition: '新用户从注册到体验核心价值的引导过程',
                keyPoints: [
                    '目标：让用户尽快到达"啊哈时刻"',
                    '减少摩擦，不要要求太多信息',
                    '展示价值优先于要求权限',
                    '个性化onboarding path'
                ],
                bestPractices: [
                    'Show, don\'t tell',
                    'Progressive disclosure',
                    'Quick wins first',
                    'Contextual education'
                ],
                metrics: [
                    'Onboarding completion rate',
                    'Time to aha moment',
                    'D7 retention of onboarded users'
                ]
            },

            'activation_metrics': {
                id: 'activation_metrics',
                name: 'Activation Metrics - 激活指标',
                level: 2,
                category: 'metrics',
                definition: '用户完成关键行为，体验到产品核心价值的指标',
                examples: {
                    'Facebook': 'Add 7 friends in 10 days',
                    'Twitter': 'Follow 30 accounts',
                    'Dropbox': 'Upload 1 file',
                    'Slack': 'Send 2000 team messages'
                },
                keyPoints: [
                    '激活用户的留存率远高于未激活用户',
                    '找到activation metric是PMF的关键',
                    '持续优化activation rate',
                    '缩短time to activation'
                ]
            },

            'aha_moment': {
                id: 'aha_moment',
                name: 'Aha Moment - 啊哈时刻',
                level: 2,
                category: 'product',
                definition: '用户突然理解产品价值的那一刻',
                discovery: '通过分析留存用户vs流失用户的early behaviors找到',
                keyPoints: [
                    '每个产品的aha moment不同',
                    '需要通过数据分析发现',
                    'Onboarding的目标是引导用户到aha moment',
                    'Aha moment越早越好'
                ],
                discoveryMethod: [
                    '1. 对比留存vs流失用户的前7天行为',
                    '2. 找出高相关性的行为',
                    '3. 验证因果关系（不只是相关性）',
                    '4. 设计实验引导更多用户完成该行为'
                ]
            },

            'hook_model': {
                id: 'hook_model',
                name: 'Hook Model - 上瘾模型',
                level: 2,
                category: 'retention',
                definition: 'Nir Eyal的习惯养成模型：触发→行动→奖励→投入',
                stages: {
                    'Trigger': '外部触发（通知）或内部触发（情绪）',
                    'Action': '最小化的行动（降低摩擦）',
                    'Variable Reward': '不确定的奖励（多巴胺）',
                    'Investment': '用户投入（下次更有价值）'
                },
                examples: {
                    'Instagram': '通知→打开app→看到赞和评论→发布新内容',
                    'Gmail': '感到无聊→检查邮件→发现新邮件→回复（期待回信）'
                }
            },

            'growth_loop': {
                id: 'growth_loop',
                name: 'Growth Loop - 增长循环',
                level: 2,
                category: 'growth',
                definition: '用户行为本身驱动新用户增长的自我强化循环',
                types: {
                    'Viral Loop': '用户邀请用户（Dropbox, PayPal）',
                    'Content Loop': '用户创造内容→SEO流量→新用户（Pinterest, Medium）',
                    'Paid Loop': '收入→广告→新用户→收入（mobile games）'
                },
                keyPoints: [
                    'Growth loop可持续，不依赖外部投入',
                    '多个loop叠加效果更强',
                    '优化loop的每个环节',
                    '缩短loop cycle time'
                ],
                vsLinearGrowth: 'Loop是exponential，linear需要持续投入'
            },

            'referral_program': {
                id: 'referral_program',
                name: 'Referral Program - 推荐计划',
                level: 2,
                category: 'acquisition',
                definition: '激励现有用户推荐新用户的系统',
                bestPractices: [
                    '双向激励（推荐人和被推荐人都得好处）',
                    '在用户最high的moment提示分享',
                    '降低分享摩擦（预填文案、一键分享）',
                    '追踪每个渠道的转化率'
                ],
                examples: {
                    'Dropbox': '推荐人和被推荐人各得500MB空间',
                    'Uber': '推荐人和被推荐人各得$10乘车券',
                    'Airbnb': '推荐人得$25，被推荐人得$40'
                },
                metrics: [
                    'Referral rate（%用户参与推荐）',
                    'Invites per referring user',
                    'Invite conversion rate',
                    'K factor'
                ]
            },

            'seo_strategy': {
                id: 'seo_strategy',
                name: 'SEO Strategy - SEO策略',
                level: 2,
                category: 'acquisition',
                definition: '通过优化搜索引擎排名获取免费流量',
                keyPoints: [
                    'Long-tail keywords通常更容易排名',
                    '内容质量 > 关键词堆砌',
                    'Backlinks是最重要的ranking factor',
                    'Technical SEO：速度、mobile、结构化数据'
                ],
                contentStrategy: [
                    '1. 关键词研究（搜索量 vs 难度）',
                    '2. 创造10x content',
                    '3. 获取backlinks',
                    '4. 持续更新内容'
                ],
                metrics: [
                    'Organic traffic',
                    'Ranking positions',
                    'Domain authority',
                    'Backlink profile'
                ]
            },

            'content_marketing': {
                id: 'content_marketing',
                name: 'Content Marketing - 内容营销',
                level: 2,
                category: 'acquisition',
                definition: '通过有价值的内容吸引和教育潜在用户',
                contentTypes: [
                    'Blog posts (SEO)',
                    'Video tutorials (YouTube)',
                    'Podcasts',
                    'Infographics',
                    'Case studies',
                    'Webinars'
                ],
                distributionChannels: [
                    'SEO (owned)',
                    'Social media (earned)',
                    'Email newsletter (owned)',
                    'Guest posting (earned)',
                    'Content syndication (paid)'
                ],
                metrics: [
                    'Traffic generated',
                    'Leads captured',
                    'CAC of content channel',
                    'Content ROI'
                ]
            },

            'product_led_growth': {
                id: 'product_led_growth',
                name: 'Product-Led Growth - 产品驱动增长',
                level: 2,
                category: 'growth',
                definition: '产品本身是主要的获客、激活和留存驱动力',
                characteristics: [
                    'Self-serve signup (no sales)',
                    'Freemium or free trial',
                    'Product delivers value before payment',
                    'Viral loops built into product'
                ],
                examples: {
                    'Slack': '团队协作本身带来增长',
                    'Zoom': '免费版让更多人体验',
                    'Notion': '模板分享带来新用户',
                    'Figma': '协作邀请队友'
                },
                keyMetrics: [
                    'Time to value',
                    'Activation rate',
                    'Free to paid conversion',
                    'Expansion revenue'
                ]
            },

            'network_effect': {
                id: 'network_effect',
                name: 'Network Effect - 网络效应',
                level: 2,
                category: 'moat',
                definition: '随着用户增加，产品对每个用户的价值也增加',
                types: {
                    'Direct': '更多用户→更多价值（电话、社交网络）',
                    'Indirect': '更多用户→更多内容/供给（marketplace）',
                    'Data': '更多用户→更好的算法（推荐系统）'
                },
                examples: {
                    'Facebook': 'Direct - 你的朋友都在上面',
                    'Airbnb': 'Indirect - 更多房源和客人',
                    'Waze': 'Data - 更多用户→更准确的路况'
                },
                coldStartProblem: '早期网络价值低，如何启动？'
            },

            'two_sided_marketplace': {
                id: 'two_sided_marketplace',
                name: 'Two-Sided Marketplace - 双边市场',
                level: 2,
                category: 'business_model',
                definition: '连接供给侧和需求侧的平台',
                challenges: [
                    'Chicken-and-egg problem',
                    'Balancing supply and demand',
                    'Maintaining quality',
                    'Taking rate optimization'
                ],
                examples: {
                    'Airbnb': '房东 ↔ 旅客',
                    'Uber': '司机 ↔ 乘客',
                    'Upwork': '自由职业者 ↔ 雇主'
                },
                strategies: [
                    '先启动一侧（通常是供给侧）',
                    '垂直切入（地理或品类）',
                    '补贴一侧带动另一侧',
                    '确保liquidity（快速匹配）'
                ]
            },

            'freemium_model': {
                id: 'freemium_model',
                name: 'Freemium Model - 免费增值',
                level: 2,
                category: 'business_model',
                definition: '基础功能免费，高级功能付费',
                keyPoints: [
                    'Free tier必须有真实价值',
                    'Conversion rate通常1-10%',
                    '需要大量免费用户才能支撑',
                    'Upgrade触发点要自然'
                ],
                designPrinciples: [
                    '免费版让用户体验核心价值',
                    '付费版解锁usage limits或高级功能',
                    '不要让免费用户感觉被欺骗',
                    'Upsell时机：when they hit limits'
                ],
                metrics: [
                    'Free to paid conversion rate',
                    'Time to conversion',
                    'MRR per paid user',
                    'CAC payback period'
                ]
            },

            'pricing_strategy': {
                id: 'pricing_strategy',
                name: 'Pricing Strategy - 定价策略',
                level: 2,
                category: 'monetization',
                definition: '如何定价以最大化价值捕获和增长',
                approaches: {
                    'Value-based': '基于客户感知价值',
                    'Cost-plus': '成本加成（不推荐）',
                    'Competitive': '参考竞争对手',
                    'Penetration': '低价快速获客',
                    'Skimming': '高价逐步降低'
                },
                testingStrategy: [
                    'A/B test different price points',
                    'Van Westendorp Price Sensitivity Meter',
                    'Conjoint analysis',
                    '监测conversion rate和revenue'
                ],
                tieredPricing: [
                    'Good-Better-Best',
                    '锚定效应（anchor pricing）',
                    '大部分用户选中间tier'
                ]
            },

            'churn_analysis': {
                id: 'churn_analysis',
                name: 'Churn Analysis - 流失分析',
                level: 2,
                category: 'retention',
                definition: '分析用户流失的原因和模式',
                churnTypes: {
                    'Voluntary': '用户主动取消',
                    'Involuntary': '支付失败等被动流失'
                },
                analysisSteps: [
                    '1. 计算churn rate by cohort',
                    '2. 对比churned vs retained用户行为',
                    '3. 识别early warning signals',
                    '4. 设计intervention campaigns'
                ],
                metrics: [
                    'Monthly churn rate',
                    'Revenue churn vs user churn',
                    'Churn reasons (exit survey)',
                    'Reactivation rate'
                ],
                formula: 'Churn Rate = Users Lost / Users at Start × 100%'
            },

            // ===== Level 3: 高级技巧 (15个) =====
            'programmatic_seo': {
                id: 'programmatic_seo',
                name: 'Programmatic SEO - 程序化SEO',
                level: 3,
                category: 'acquisition',
                definition: '通过自动化批量生成大量SEO优化页面',
                examples: {
                    'Zillow': '为每个地址生成页面',
                    'TripAdvisor': '城市×酒店组合页面',
                    'Yelp': '城市×品类组合页面'
                },
                requirements: [
                    '大量结构化数据',
                    '模板化页面生成',
                    '保证内容质量（避免thin content）',
                    '内部链接优化'
                ],
                risks: [
                    'Google可能判定为spam',
                    '需要真实的用户价值',
                    '内容质量控制难'
                ]
            },

            'viral_loop_design': {
                id: 'viral_loop_design',
                name: 'Viral Loop Design - 病毒循环设计',
                level: 3,
                category: 'growth',
                definition: '设计产品内置的病毒传播机制',
                designPrinciples: [
                    '1. 找到natural sharing moment',
                    '2. 给分享者明确好处',
                    '3. 降低分享摩擦',
                    '4. 优化被邀请人landing page',
                    '5. 缩短viral cycle time'
                ],
                viralMechanics: {
                    'Incentivized': '给奖励（Dropbox, Uber）',
                    'Organic': '使用即分享（Instagram, Loom）',
                    'Social proof': '展示他人使用（Clubhouse）',
                    'Collaboration': '邀请协作（Figma, Notion）'
                },
                optimizationMetrics: [
                    'K factor (must be > 1)',
                    'Viral cycle time',
                    'Conversion rate of invites',
                    'Invites sent per user'
                ]
            },

            'growth_hacking_canvas': {
                id: 'growth_hacking_canvas',
                name: 'Growth Hacking Canvas - 增长画布',
                level: 3,
                category: 'framework',
                definition: '系统化思考增长策略的框架',
                sections: [
                    '1. Product/Market Fit',
                    '2. Growth Channels',
                    '3. Key Metrics',
                    '4. Unfair Advantage',
                    '5. Value Proposition',
                    '6. Customer Segments',
                    '7. Existing Alternatives',
                    '8. Revenue Streams',
                    '9. Cost Structure'
                ],
                usage: '团队workshop工具，系统化增长思考'
            },

            'ice_score': {
                id: 'ice_score',
                name: 'ICE Score Framework - ICE优先级框架',
                level: 3,
                category: 'framework',
                definition: 'Impact × Confidence × Ease评分系统，用于优先级排序',
                formula: 'ICE Score = (Impact + Confidence + Ease) / 3',
                scoring: {
                    'Impact': '1-10, 对核心指标的影响',
                    'Confidence': '1-10, 确定性（有数据支持更高）',
                    'Ease': '1-10, 实施难度（越容易分数越高）'
                },
                usage: [
                    '评估所有增长实验想法',
                    '优先做高ICE score的实验',
                    '避免只凭直觉决策',
                    '团队对齐优先级'
                ],
                alternatives: ['RICE (Reach × Impact × Confidence / Effort)', 'PIE (Potential × Importance × Ease)']
            },

            'pirate_metrics': {
                id: 'pirate_metrics',
                name: 'Pirate Metrics - 海盗指标',
                level: 3,
                category: 'metrics',
                definition: 'AARRR框架的另一个名称，强调全链路指标',
                detailedMetrics: {
                    'Acquisition': ['Traffic sources', 'CAC by channel', 'Conversion rate'],
                    'Activation': ['Signup rate', 'Onboarding completion', 'Time to aha'],
                    'Retention': ['D1/D7/D30 retention', 'Churn rate', 'Cohort retention'],
                    'Revenue': ['ARPU', 'LTV', 'Monetization rate'],
                    'Referral': ['K factor', 'Referral rate', 'Viral cycle time']
                },
                dashboardDesign: '构建实时增长仪表盘追踪所有指标'
            },

            'bullseye_framework': {
                id: 'bullseye_framework',
                name: 'Bullseye Framework - 靶心框架',
                level: 3,
                category: 'framework',
                definition: '系统化测试和选择增长渠道的框架',
                steps: [
                    '1. Brainstorm: 列出所有可能的19个渠道',
                    '2. Rank: 快速评估，选出最有潜力的3-5个',
                    '3. Test: 小规模快速测试这些渠道',
                    '4. Focus: 专注于1个最有效的渠道'
                ],
                nineteenChannels: [
                    'Viral marketing', 'PR', 'Unconventional PR',
                    'SEM', 'Social ads', 'Offline ads',
                    'SEO', 'Content marketing', 'Email marketing',
                    'Engineering as marketing', 'Blog targeting',
                    'Business development', 'Sales', 'Affiliate programs',
                    'Existing platforms', 'Trade shows',
                    'Offline events', 'Speaking engagements', 'Community building'
                ]
            },

            'jobs_to_be_done': {
                id: 'jobs_to_be_done',
                name: 'Jobs To Be Done - 待完成任务',
                level: 3,
                category: 'product',
                definition: '理解用户"雇佣"产品要完成什么任务',
                framework: '当我___（情境），我想要___（动机），这样我可以___（预期结果）',
                examples: {
                    'Milkshake': '当我早上开车通勤（情境），我想要不无聊（动机），这样我可以度过无聊的通勤（结果）',
                    'Airbnb': '当我去陌生城市旅行，我想要像当地人一样生活，这样我可以获得authentic体验'
                },
                applicationToGrowth: [
                    '理解真实的购买动机',
                    '发现竞争对手（不是同类产品）',
                    '优化messaging和定位',
                    '找到增长机会'
                ]
            },

            'cro': {
                id: 'cro',
                name: 'CRO - 转化率优化',
                level: 3,
                category: 'optimization',
                definition: '系统化提升网站/产品转化率',
                process: [
                    '1. Research: 分析数据，用户测试，热力图',
                    '2. Hypothesize: 提出假设和优化方案',
                    '3. Prioritize: ICE/PIE评分',
                    '4. Test: A/B测试',
                    '5. Learn: 分析结果，迭代'
                ],
                commonOptimizations: [
                    'Headline clarity',
                    'CTA button color/text',
                    'Social proof (testimonials)',
                    'Reduce form fields',
                    'Page load speed',
                    'Mobile optimization'
                ],
                tools: ['Hotjar', 'Google Optimize', 'VWO', 'Optimizely']
            },

            'landing_page_optimization': {
                id: 'landing_page_optimization',
                name: 'Landing Page Optimization - 落地页优化',
                level: 3,
                category: 'optimization',
                definition: '优化广告/链接目标页面的转化率',
                bestPractices: [
                    '标题与广告message一致',
                    '单一清晰的CTA',
                    '移除导航（减少退出）',
                    '社会证明（testimonials, logos）',
                    'Above the fold包含核心价值',
                    '移动端优先'
                ],
                formula: 'Conversion Rate = Unique Conversions / Unique Visitors × 100%',
                testingElements: [
                    'Headline',
                    'Hero image/video',
                    'CTA button text and color',
                    'Form length',
                    'Trust signals',
                    'Page layout'
                ]
            },

            'email_marketing_automation': {
                id: 'email_marketing_automation',
                name: 'Email Marketing Automation - 邮件营销自动化',
                level: 3,
                category: 'retention',
                definition: '基于用户行为触发的自动化邮件流程',
                keyFlows: {
                    'Welcome series': '新用户注册后的教育邮件',
                    'Onboarding': '引导用户完成关键行为',
                    'Re-engagement': '唤醒不活跃用户',
                    'Upsell': '推荐付费或升级',
                    'Win-back': '挽回流失用户'
                },
                bestPractices: [
                    '个性化（名字、行为）',
                    '时机很重要（right timing）',
                    'A/B test subject lines',
                    'Mobile-friendly',
                    'Clear CTA',
                    '监测每封邮件的表现'
                ],
                metrics: [
                    'Open rate (20-30% is good)',
                    'Click rate (2-5% is good)',
                    'Conversion rate',
                    'Unsubscribe rate (<0.5%)'
                ]
            },

            'retargeting_strategy': {
                id: 'retargeting_strategy',
                name: 'Retargeting Strategy - 重定向策略',
                level: 3,
                category: 'acquisition',
                definition: '向访问过但未转化的用户展示广告',
                platforms: ['Facebook Pixel', 'Google Ads', 'AdRoll', 'Perfect Audience'],
                audiences: [
                    '访问过特定页面',
                    '加入购物车未付款',
                    '看过价格页面',
                    '已付费用户（upsell）'
                ],
                bestPractices: [
                    '动态广告（展示用户看过的产品）',
                    '频次控制（避免骚扰）',
                    'Sequential messaging',
                    'Exclude已转化用户',
                    '测试不同时间窗口（7天vs30天）'
                ],
                metrics: [
                    'CTR (typically higher than cold ads)',
                    'Conversion rate',
                    'CPA (usually lower)',
                    'ROAS (Return on Ad Spend)'
                ]
            },

            'influencer_marketing_roi': {
                id: 'influencer_marketing_roi',
                name: 'Influencer Marketing ROI - 网红营销ROI',
                level: 3,
                category: 'acquisition',
                definition: '通过影响力人物推广产品',
                calculation: 'ROI = (Revenue - Cost) / Cost × 100%',
                influencerTiers: {
                    'Nano': '<10k followers, high engagement, affordable',
                    'Micro': '10k-100k, good engagement, cost-effective',
                    'Macro': '100k-1M, broad reach, expensive',
                    'Mega': '>1M, massive reach, very expensive'
                },
                bestPractices: [
                    '选择与品牌契合的influencer',
                    '重视engagement rate > follower count',
                    '给创意自由（authentic content）',
                    '使用unique promo codes追踪',
                    'Long-term partnerships > one-off'
                ],
                metrics: [
                    'Impressions & Reach',
                    'Engagement rate',
                    'Click-through rate',
                    'Conversions & Revenue',
                    'Cost per acquisition'
                ]
            },

            'community_led_growth': {
                id: 'community_led_growth',
                name: 'Community-Led Growth - 社区驱动增长',
                level: 3,
                category: 'growth',
                definition: '通过建立活跃社区驱动产品增长',
                examples: {
                    'Notion': '用户社区分享模板和使用技巧',
                    'Figma': '设计师社区创造插件和资源',
                    'Webflow': 'No-code社区互相帮助和展示作品'
                },
                benefits: [
                    'Lower CAC (organic word-of-mouth)',
                    'Higher retention (sense of belonging)',
                    'Product feedback and co-creation',
                    'User-generated content'
                ],
                buildingBlocks: [
                    'Platform (forum, Slack, Discord)',
                    'Content (education, inspiration)',
                    'Events (meetups, conferences)',
                    'Recognition (badges, leaderboards)',
                    'Empowerment (ambassadors, moderators)'
                ]
            },

            'marketplace_liquidity': {
                id: 'marketplace_liquidity',
                name: 'Marketplace Liquidity - 市场流动性',
                level: 3,
                category: 'marketplace',
                definition: '买家能快速找到卖家，卖家能快速找到买家',
                measurement: 'Time to transaction & Match rate',
                strategies: [
                    '地理密集化（先做好一个城市）',
                    '品类聚焦（先做好一个垂直）',
                    '供给质量控制',
                    '智能匹配算法',
                    '动态定价'
                ],
                liquidityIndicators: [
                    'Search-to-fill rate',
                    'Time to first booking',
                    'Repeat usage rate',
                    'Utilization rate (supply side)'
                ]
            },

            'cold_start_problem': {
                id: 'cold_start_problem',
                name: 'Cold Start Problem - 冷启动问题',
                level: 3,
                category: 'marketplace',
                definition: '双边市场或网络效应产品的早期启动难题',
                strategies: {
                    'Fake it': '用自己充当供给侧（Reddit早期）',
                    'Subsidize': '补贴一侧吸引另一侧（Uber补贴司机）',
                    'Single-player mode': '单人也有价值（Instagram滤镜）',
                    'Focus on subset': '先服务小群体（Facebook从哈佛开始）',
                    'Piggyback': '利用现有网络（Airbnb抓Craigslist）'
                },
                examples: {
                    'Tinder': '在USC派对推广，快速达到critical mass',
                    'Uber': '专注旧金山，补贴司机和乘客',
                    'OpenTable': '给餐厅免费POS系统'
                }
            },

            // ===== Level 4: 大师级 (10个) =====
            'blitzscaling': {
                id: 'blitzscaling',
                name: 'Blitzscaling - 闪电式扩张',
                level: 4,
                category: 'strategy',
                definition: '牺牲效率换取速度，快速占领市场',
                when: [
                    '1. 巨大的市场机会',
                    '2. 先发优势很重要（网络效应）',
                    '3. 有充足资本支持',
                    '4. 已验证PMF和unit economics'
                ],
                risks: [
                    '烧钱速度极快',
                    '组织chaos',
                    '产品质量下降',
                    '文化稀释'
                ],
                examples: {
                    'Amazon': '牺牲利润快速扩品类',
                    'Uber': '全球快速扩张抢占市场',
                    'Facebook': '快速增长用户不惜代价'
                },
                prerequisite: ['pmf', 'unit_economics', 'network_effect']
            },

            'zero_budget_growth': {
                id: 'zero_budget_growth',
                name: 'Zero-Budget Growth - 零预算增长',
                level: 4,
                category: 'growth',
                definition: '不花钱或极低预算实现增长',
                tactics: [
                    'Product Hunt launch',
                    'Reddit/HackerNews有机传播',
                    'SEO content marketing',
                    'Community building',
                    'PR hacking (newsjacking)',
                    'Influencer outreach (no pay)',
                    'Partnership/Integration',
                    'Referral program (product credit)'
                ],
                mindset: 'Creativity > Budget',
                examples: {
                    'Dropbox': 'Referral program用产品换增长',
                    'Airbnb': 'Craigslist integration',
                    'Hotmail': '邮件签名"PS: I love you"'
                }
            },

            'competitive_moat': {
                id: 'competitive_moat',
                name: 'Competitive Moat - 竞争壁垒',
                level: 4,
                category: 'strategy',
                definition: '防止竞争对手复制的护城河',
                moatTypes: {
                    'Network effects': '用户越多价值越大',
                    'Brand': '强大的品牌认知',
                    'Scale': '规模带来成本优势',
                    'Switching costs': '切换成本高',
                    'Data moat': '数据越多产品越好',
                    'Regulatory': '许可证或监管壁垒'
                },
                examples: {
                    'Facebook': 'Network effect',
                    'Apple': 'Brand + ecosystem',
                    'Amazon': 'Scale + logistics',
                    'Salesforce': 'Switching costs',
                    'Google': 'Data moat'
                },
                building: '从Day 1思考，不是后期加的'
            },

            'platform_strategy': {
                id: 'platform_strategy',
                name: 'Platform Strategy - 平台策略',
                level: 4,
                category: 'strategy',
                definition: '从产品到平台，让第三方在上面建设',
                evolution: 'Product → Platform → Ecosystem',
                examples: {
                    'Shopify': '电商工具→开发者平台→app生态',
                    'Stripe': '支付API→金融基础设施平台',
                    'iOS': '手机→App Store→开发者生态'
                },
                platformAdvantages: [
                    '快速扩展功能（leverage third-party）',
                    '增加switching costs',
                    '网络效应放大',
                    '收入分成'
                ],
                challenges: [
                    '平台vs开发者利益冲突',
                    '质量控制',
                    '需要governance'
                ]
            },

            'ecosystem_play': {
                id: 'ecosystem_play',
                name: 'Ecosystem Play - 生态系统策略',
                level: 4,
                category: 'strategy',
                definition: '构建一个多方共赢的商业生态系统',
                components: [
                    'Core product/platform',
                    'Complementors (third-party)',
                    'Developers',
                    'Users/customers',
                    'Partners'
                ],
                examples: {
                    'Apple': 'iPhone + App Store + developers + users',
                    'AWS': 'Cloud + SaaS partners + consultants + customers',
                    'Salesforce': 'CRM + AppExchange + consultants + enterprises'
                },
                winningStrategy: '让所有参与方都获得价值'
            },

            'data_driven_culture': {
                id: 'data_driven_culture',
                name: 'Data-Driven Culture - 数据驱动文化',
                level: 4,
                category: 'organization',
                definition: '用数据而非观点驱动决策的组织文化',
                principles: [
                    '所有假设都要测试',
                    '用数据支持决策',
                    '快速实验文化',
                    '学习比正确更重要'
                ],
                infrastructure: [
                    '完善的数据收集（tracking）',
                    '易用的分析工具',
                    '实时dashboard',
                    '实验平台（A/B testing）'
                ],
                challenges: [
                    '过度依赖数据忽视直觉',
                    '数据质量问题',
                    'Analysis paralysis',
                    '短期数据vs长期vision'
                ]
            },

            'experiment_design': {
                id: 'experiment_design',
                name: 'Experiment Design - 实验设计',
                level: 4,
                category: 'methodology',
                definition: '科学严谨的增长实验设计方法',
                components: {
                    'Hypothesis': '清晰的假设和预期',
                    'Metric': '主要指标和guardrail metrics',
                    'Sample size': '统计power计算',
                    'Duration': '运行时间（1-2 weeks typical）',
                    'Analysis plan': '如何分析结果'
                },
                template: '如果[change]，那么[metric]会[direction]，因为[reasoning]',
                commonErrors: [
                    '样本量太小',
                    '时间太短',
                    '多个变量同时改变',
                    'Peeking (中途看数据)',
                    'Cherry-picking metrics'
                ]
            },

            'statistical_significance': {
                id: 'statistical_significance',
                name: 'Statistical Significance - 统计显著性',
                level: 4,
                category: 'methodology',
                definition: '判断实验结果是真实效果还是随机波动',
                keyTerms: {
                    'P-value': 'P < 0.05 通常认为显著',
                    'Confidence interval': '95% CI不包含0',
                    'Statistical power': '至少80%',
                    'Effect size': '实际影响大小'
                },
                formula: 'Sample Size = (Z² × σ² × 2) / Δ²',
                tools: [
                    'Evan Miller\'s calculator',
                    'Optimizely Stats Engine',
                    'Google Optimize',
                    'Custom Bayesian analysis'
                ],
                bayesianVsFrequentist: 'Bayesian可以peeking，但需要expertise'
            },

            'multi_touch_attribution': {
                id: 'multi_touch_attribution',
                name: 'Multi-Touch Attribution - 多触点归因',
                level: 4,
                category: 'analytics',
                definition: '分析用户转化前的多个touchpoint的贡献',
                models: {
                    'Last-click': '100%归因最后一个touchpoint（简单但不准）',
                    'First-click': '100%归因第一个（重视awareness）',
                    'Linear': '平均分配给所有touchpoint',
                    'Time-decay': '越接近转化权重越高',
                    'U-shaped': '首次和最后各40%，中间20%',
                    'Data-driven': 'ML模型计算真实贡献'
                },
                challenges: [
                    'Cross-device tracking',
                    'Offline touchpoints',
                    'Privacy limitations (iOS14+)',
                    '数据孤岛'
                ],
                tools: ['Google Analytics 360', 'Adobe Analytics', 'Custom ML models']
            },

            'growth_team_structure': {
                id: 'growth_team_structure',
                name: 'Growth Team Structure - 增长团队结构',
                level: 4,
                category: 'organization',
                definition: '专门的跨职能增长团队',
                roles: [
                    'Growth Lead (strategy)',
                    'Growth PM (prioritization)',
                    'Data Analyst (insights)',
                    'Growth Engineer (implementation)',
                    'Growth Designer (optimization)',
                    'Growth Marketer (acquisition)'
                ],
                structure: {
                    'Embedded': '嵌入产品团队',
                    'Standalone': '独立增长团队',
                    'Hybrid': '混合模式'
                },
                process: [
                    '1. 分析数据找机会',
                    '2. Brainstorm实验想法',
                    '3. ICE打分排优先级',
                    '4. 快速实验测试',
                    '5. 分析结果迭代'
                ],
                kpi: 'North Star Metric + supporting metrics'
            }
        };
    }

    /**
     * 初始化挑战关卡
     */
    initializeChallenges() {
        return {
            // Level 1 Challenges
            'ue_basics': {
                id: 'ue_basics',
                name: '单位经济学入门',
                level: 1,
                difficulty: 'beginner',
                category: 'unit_economics',
                coreTheme: '判断生意健康度',
                requiredKnowledge: ['ltv', 'cac', 'unit_economics'],
                prerequisite: null,

                scenario: '你运营一个SaaS产品',
                context: {
                    data: {
                        monthlyPrice: 50,
                        avgRetentionMonths: 12,
                        currentCAC: 80,
                        grossMargin: 0.80
                    },
                    constraints: [
                        { name: 'cash_flow', description: '现金流紧张，需要快速回本' },
                        { name: 'competition', description: '竞争对手正在快速增长' }
                    ],
                    goalMetrics: ['健康的LTV/CAC比例', '合理的payback period']
                },

                questionTemplate: `
假设你运营一个SaaS产品：
- 月费：$50
- 平均用户留存：12个月
- 目前CAC：$80
- Gross Margin: 80%

问题：
1. 这个生意健康吗？为什么？
2. LTV是多少？（请给出计算过程）
3. CAC/LTV比例是多少？
4. 这个比例意味着什么？
5. 你会采取什么行动？

我需要看到完整的计算过程和推理逻辑。
`,

                expectedAnswer: {
                    data: {
                        ltv_simple: 600, // 50 * 12
                        ltv_with_margin: 480, // 50 * 12 * 0.8
                        cac: 80,
                        ltv_cac_ratio: 6, // 480 / 80
                        payback_months: 1.6 // 80 / (50 * 0.8)
                    },
                    logicSteps: [
                        {
                            name: 'calculate_ltv',
                            description: '计算LTV = ARPU × Lifetime',
                            weight: 5
                        },
                        {
                            name: 'consider_margin',
                            description: '考虑gross margin调整LTV',
                            weight: 5
                        },
                        {
                            name: 'calculate_ratio',
                            description: '计算LTV/CAC比例',
                            weight: 5
                        },
                        {
                            name: 'evaluate_health',
                            description: '判断是否健康（ratio > 3）',
                            weight: 5
                        },
                        {
                            name: 'strategic_decision',
                            description: '基于分析给出行动建议',
                            weight: 5
                        }
                    ],
                    calculations: [
                        {
                            type: 'ltv',
                            name: 'LTV计算',
                            formula: 'LTV = $50 × 12 months × 80% = $480',
                            expectedResult: 480,
                            tolerance: 0.01,
                            weight: 5
                        },
                        {
                            type: 'cac_ltv_ratio',
                            name: 'LTV/CAC比例',
                            formula: 'LTV/CAC = $480 / $80 = 6',
                            expectedResult: 6,
                            tolerance: 0.01,
                            weight: 5
                        },
                        {
                            type: 'payback',
                            name: 'Payback Period',
                            formula: 'Payback = $80 / ($50 × 80%) = 2 months',
                            expectedResult: 2,
                            tolerance: 0.1,
                            weight: 4
                        }
                    ],
                    conclusion: '非常健康，LTV/CAC = 6 > 3，可以加速增长'
                },

                requiredElements: [
                    'ltv_calculation',
                    'cac_ltv_ratio',
                    'health_judgment',
                    'action_recommendation'
                ],

                timeLimit: 600000, // 10分钟
                maxAttempts: 3,
                passingScore: 70,

                framework: 'LTV/CAC > 3 且 Payback < 12个月',
                exampleTemplate: '如果LTV=$1000, CAC=$200, 则比例=5，非常健康'
            },

            'funnel_optimization': {
                id: 'funnel_optimization',
                name: '漏斗优化分析',
                level: 2,
                difficulty: 'intermediate',
                category: 'funnel_optimization',
                prerequisite: ['ue_basics'],
                requiredKnowledge: ['funnel_analysis', 'conversion_rate', 'aarrr'],

                scenario: '分析电商转化漏斗，找出最大瓶颈',
                context: {
                    data: {
                        visits: 10000,
                        productViews: 5000,
                        addToCart: 1000,
                        checkout: 500,
                        purchase: 200
                    }
                },

                questionTemplate: `
某电商网站的转化漏斗数据：
- 访问量：10,000
- 查看商品详情：5,000
- 加入购物车：1,000
- 进入结账：500
- 完成购买：200

问题：
1. 计算每一步的转化率
2. 识别最大的drop-off点在哪里？
3. 为什么这是最大瓶颈？
4. 提出3个具体的优化建议
5. 预估如果优化成功，GMV能提升多少？
`,

                expectedAnswer: {
                    data: {
                        visit_to_view: 0.50,
                        view_to_cart: 0.20,
                        cart_to_checkout: 0.50,
                        checkout_to_purchase: 0.40,
                        overall_conversion: 0.02
                    },
                    bottleneck: 'view_to_cart',
                    reasoning: '20%转化率最低，提升空间最大',
                    optimizations: [
                        '优化产品详情页',
                        '增加social proof',
                        '提供促销incentive'
                    ]
                },

                timeLimit: 900000, // 15分钟
                maxAttempts: 3,
                passingScore: 75
            }

            // ... 更多挑战关卡
        };
    }

    /**
     * 初始化常见错误库
     */
    initializeCommonMistakes() {
        return {
            'ltv_calculation': [
                {
                    mistake: '忘记乘以gross margin',
                    why_wrong: 'LTV应该是利润，不是revenue',
                    correct: 'LTV = ARPU × Lifetime × Gross Margin',
                    example: '$50×12×80% = $480, 不是 $600'
                },
                {
                    mistake: '用平均留存天数而非月数',
                    why_wrong: '单位不一致',
                    correct: '如果ARPU是月收入，lifetime也要用月数'
                }
            ],
            'cac_calculation': [
                {
                    mistake: '只计算广告费，忽略人力成本',
                    why_wrong: 'CAC应包含所有获客成本',
                    correct: 'CAC = (Marketing Spend + Sales Salaries + Tools) / New Customers'
                },
                {
                    mistake: '用总用户数而非新增付费用户',
                    why_wrong: '应该用付费用户数',
                    correct: 'CAC = Total Spend / New Paying Customers'
                }
            ],
            'funnel_analysis': [
                {
                    mistake: '只看overall conversion rate',
                    why_wrong: '找不到具体瓶颈',
                    correct: '必须拆解每一步的conversion rate'
                },
                {
                    mistake: '不对比benchmark',
                    why_wrong: '不知道20%转化率是好是坏',
                    correct: '对比行业benchmark或竞品数据'
                }
            ]
        };
    }

    /**
     * 初始化最佳实践
     */
    initializeBestPractices() {
        return {
            'unit_economics': {
                principles: [
                    '永远先优化unit economics再规模化',
                    'LTV/CAC比例至少3:1',
                    'Payback period < 12个月',
                    '按渠道分别计算CAC'
                ],
                antiPatterns: [
                    '❌ Unit economics不健康就大规模投广告',
                    '❌ 只看revenue不看profit',
                    '❌ 忽略CAC payback period'
                ],
                realWorldExamples: [
                    'Groupon: 忽视unit economics，增长越快亏越多',
                    'Netflix: 精确计算LTV，敢于投高CAC获客'
                ]
            },
            'growth_experiments': {
                principles: [
                    'One variable at a time',
                    '足够的样本量和时间',
                    '预先定义success metrics',
                    '快速失败，快速学习'
                ],
                process: [
                    '1. 数据分析找机会',
                    '2. 提出假设',
                    '3. 设计实验',
                    '4. 运行测试',
                    '5. 分析结果',
                    '6. 迭代或pivot'
                ]
            }
        };
    }

    /**
     * 构建概念关系图
     */
    buildConceptGraph() {
        const graph = {};

        // 建立概念之间的依赖和关联关系
        for (const [id, concept] of Object.entries(this.concepts)) {
            graph[id] = {
                prerequisites: this.getPrerequisites(concept),
                relatedConcepts: concept.relatedConcepts || [],
                enabledBy: [], // 掌握此概念后解锁的内容
                applications: this.getApplications(id)
            };
        }

        return graph;
    }

    getPrerequisites(concept) {
        const prereqMap = {
            'ab_testing': ['funnel_analysis', 'statistical_significance'],
            'viral_loop_design': ['viral_coefficient', 'growth_loop'],
            'blitzscaling': ['pmf', 'unit_economics', 'network_effect']
        };
        return prereqMap[concept.id] || [];
    }

    getApplications(conceptId) {
        // 这个概念在哪些挑战中会用到
        return Object.values(this.challenges)
            .filter(c => c.requiredKnowledge?.includes(conceptId))
            .map(c => c.id);
    }

    // Getter methods
    getConcept(id) {
        return this.concepts[id];
    }

    getChallenge(id) {
        return this.challenges[id];
    }

    getCommonMistakes(conceptId) {
        return this.commonMistakes[conceptId] || [];
    }

    getBestPractices(category) {
        return this.bestPractices[category];
    }

    getConceptsByLevel(level) {
        return Object.values(this.concepts).filter(c => c.level === level);
    }

    getElementDescription(element) {
        const descriptions = {
            'ltv_calculation': '完整的LTV计算过程，包括公式和数值',
            'cac_ltv_ratio': 'CAC/LTV比例的计算',
            'health_judgment': '基于数据判断生意是否健康',
            'action_recommendation': '具体可执行的行动建议'
        };
        return descriptions[element] || element;
    }
}

// Class available globally - no export needed for browser
// export { KnowledgeBase };
