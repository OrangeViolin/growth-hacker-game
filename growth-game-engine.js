// Growth Hacker Game Engine
// 增长黑客游戏引擎

class GrowthGameEngine {
    constructor(config) {
        this.mode = config.mode; // 'real' or 'ai'
        this.company = config.company || this.generateCompany();
        this.industry = config.industry || this.generateIndustry();

        // Initialize metrics
        this.metrics = {
            users: config.initialUsers || this.generateInitialUsers(),
            revenue: config.initialRevenue || 0,
            budget: config.budget || 5000,
            retention7d: 25, // 7-day retention %
            activation: 30, // activation rate %
            viralCoefficient: 0.3,
            nps: 20
        };

        this.challenge = config.challenge || '';
        this.currentLevel = 0;
        this.completedLevels = [];
        this.skillsUsed = [];
        this.achievements = [];

        // Track week by week changes
        this.history = [{ ...this.metrics }];
        this.currentWeek = 0;

        // Initialize levels
        this.levels = this.generateLevels();
    }

    generateCompany() {
        const names = ['TechFlow', 'GrowthHub', 'DataDrive', 'UserBoost', 'MetricPro', 'ScaleUp'];
        return names[Math.floor(Math.random() * names.length)];
    }

    generateIndustry() {
        const industries = ['saas', 'ecommerce', 'social', 'education', 'fintech', 'marketplace'];
        return industries[Math.floor(Math.random() * industries.length)];
    }

    generateInitialUsers() {
        return Math.floor(Math.random() * 10000) + 1000; // 1000-11000
    }

    generateLevels() {
        return [
            this.createLevel1_Acquisition(),
            this.createLevel2_Activation(),
            this.createLevel3_Retention(),
            this.createLevel4_Revenue(),
            this.createLevel5_Referral(),
            this.createLevel6_Scale()
        ];
    }

    createLevel1_Acquisition() {
        return {
            levelNumber: 1,
            title: '关卡1：获取用户 Level 1: Acquisition',
            description: '你的产品已经上线，但用户增长缓慢。如何快速获得第一批种子用户？',
            situation: `当前有${this.metrics.users}个用户，月增长率只有5%。你需要找到有效的获客渠道，目标是在4周内将月增长率提升到20%以上。`,
            skills: [
                {
                    name: 'Product Hunt发布',
                    description: '在Product Hunt发布产品，获得科技圈关注。准备精美的介绍页面和演示视频。',
                    icon: '🚀',
                    aarrr: 'Acquisition',
                    cost: 500,
                    timeframe: '1-2周',
                    effectiveness: 0.8,
                    execute: (game) => {
                        const newUsers = Math.floor(game.metrics.users * 0.15); // 15% growth
                        game.metrics.users += newUsers;
                        game.metrics.budget -= 500;
                        game.currentWeek += 2;

                        return {
                            success: true,
                            feedback: `Product Hunt发布成功！你的产品登上了当日TOP 5，获得了${newUsers}个新注册用户。科技媒体开始报道你的产品，品牌知名度大幅提升。`,
                            changes: [
                                { label: '用户数', newValue: game.metrics.users, delta: newUsers, unit: '' },
                                { label: '预算', newValue: game.metrics.budget, delta: -500, unit: '$' }
                            ]
                        };
                    }
                },
                {
                    name: '内容营销+SEO',
                    description: '创建高质量博客内容，针对目标关键词优化SEO，建立长期有机流量来源。',
                    icon: '📝',
                    aarrr: 'Acquisition',
                    cost: 1000,
                    timeframe: '4-6周',
                    effectiveness: 0.7,
                    execute: (game) => {
                        const newUsers = Math.floor(game.metrics.users * 0.12);
                        game.metrics.users += newUsers;
                        game.metrics.budget -= 1000;
                        game.currentWeek += 4;

                        // SEO also improves activation slightly due to better qualified traffic
                        game.metrics.activation += 5;

                        return {
                            success: true,
                            feedback: `发布了10篇高质量博客文章，针对行业痛点进行SEO优化。虽然见效较慢，但带来了${newUsers}个高质量用户，这些用户的激活率比平均水平高30%。`,
                            changes: [
                                { label: '用户数', newValue: game.metrics.users, delta: newUsers, unit: '' },
                                { label: '激活率', newValue: game.metrics.activation, delta: 5, unit: '%' },
                                { label: '预算', newValue: game.metrics.budget, delta: -1000, unit: '$' }
                            ]
                        };
                    }
                },
                {
                    name: '社交媒体广告',
                    description: '在Facebook/Instagram投放精准定向广告，快速测试不同受众和创意。',
                    icon: '📱',
                    aarrr: 'Acquisition',
                    cost: 2000,
                    timeframe: '2-3周',
                    effectiveness: 0.6,
                    execute: (game) => {
                        const newUsers = Math.floor(game.metrics.users * 0.20); // 20% growth but costly
                        game.metrics.users += newUsers;
                        game.metrics.budget -= 2000;
                        game.currentWeek += 3;

                        return {
                            success: true,
                            feedback: `投放了$2000的社交媒体广告，通过A/B测试找到了最佳受众和创意组合。获得了${newUsers}个新用户，但CAC较高（$${Math.round(2000/newUsers)}）。需要优化转化率来降低成本。`,
                            changes: [
                                { label: '用户数', newValue: game.metrics.users, delta: newUsers, unit: '' },
                                { label: '预算', newValue: game.metrics.budget, delta: -2000, unit: '$' }
                            ],
                            achievement: newUsers > 1000 ? {
                                title: '🎯 千人里程碑',
                                description: '单次活动获得超过1000个新用户！'
                            } : null
                        };
                    }
                },
                {
                    name: '社区营销',
                    description: '加入相关Reddit、Facebook群组，提供价值而非直接推销，建立信任和口碑。',
                    icon: '👥',
                    aarrr: 'Acquisition',
                    cost: 200,
                    timeframe: '3-4周',
                    effectiveness: 0.5,
                    execute: (game) => {
                        const newUsers = Math.floor(game.metrics.users * 0.08);
                        game.metrics.users += newUsers;
                        game.metrics.budget -= 200;
                        game.currentWeek += 3;

                        // Community users have higher retention
                        game.metrics.retention7d += 3;

                        return {
                            success: true,
                            feedback: `花时间在相关社区活跃，回答问题，提供价值。虽然增长较慢（+${newUsers}用户），但这些用户质量极高，7日留存率达到${game.metrics.retention7d}%！`,
                            changes: [
                                { label: '用户数', newValue: game.metrics.users, delta: newUsers, unit: '' },
                                { label: '7日留存', newValue: game.metrics.retention7d, delta: 3, unit: '%' },
                                { label: '预算', newValue: game.metrics.budget, delta: -200, unit: '$' }
                            ]
                        };
                    }
                }
            ]
        };
    }

    createLevel2_Activation() {
        return {
            levelNumber: 2,
            title: '关卡2：激活用户 Level 2: Activation',
            description: '用户注册了，但很多人没有完成关键操作。如何让他们快速体验到产品价值？',
            situation: `当前激活率只有${this.metrics.activation}%，大部分用户注册后就流失了。你需要优化新用户体验，让他们在首次使用的5分钟内看到价值。`,
            skills: [
                {
                    name: '简化入门流程',
                    description: '将注册步骤从7步减少到3步，延迟收集非必要信息，添加进度条。',
                    icon: '⚡',
                    aarrr: 'Activation',
                    cost: 800,
                    timeframe: '2周',
                    effectiveness: 0.9,
                    execute: (game) => {
                        game.metrics.activation += 15;
                        game.metrics.budget -= 800;
                        game.currentWeek += 2;

                        // Better activation leads to better retention
                        game.metrics.retention7d += 5;

                        return {
                            success: true,
                            feedback: `重新设计了入门流程，从7步减少到3步核心步骤。激活率从${game.metrics.activation-15}%跃升到${game.metrics.activation}%！用户完成设置的时间从15分钟缩短到3分钟。`,
                            changes: [
                                { label: '激活率', newValue: game.metrics.activation, delta: 15, unit: '%' },
                                { label: '7日留存', newValue: game.metrics.retention7d, delta: 5, unit: '%' },
                                { label: '预算', newValue: game.metrics.budget, delta: -800, unit: '$' }
                            ],
                            achievement: game.metrics.activation >= 50 ? {
                                title: '🎊 激活大师',
                                description: '激活率突破50%！你已经掌握了用户激活的精髓。'
                            } : null
                        };
                    }
                },
                {
                    name: '设计"啊哈时刻"',
                    description: '识别产品的核心价值时刻，引导用户最快到达这个时刻。提供示例数据加速体验。',
                    icon: '💡',
                    aarrr: 'Activation',
                    cost: 1200,
                    timeframe: '3周',
                    effectiveness: 0.85,
                    execute: (game) => {
                        game.metrics.activation += 12;
                        game.metrics.budget -= 1200;
                        game.currentWeek += 3;

                        // Users who hit aha moment have much better retention
                        game.metrics.retention7d += 8;
                        game.metrics.nps += 10;

                        return {
                            success: true,
                            feedback: `分析数据发现：完成第一个项目的用户留存率高3倍！你重新设计了流程，使用预填充的示例数据，让新用户在2分钟内完成第一个项目。激活率提升${12}%，用户满意度飙升！`,
                            changes: [
                                { label: '激活率', newValue: game.metrics.activation, delta: 12, unit: '%' },
                                { label: '7日留存', newValue: game.metrics.retention7d, delta: 8, unit: '%' },
                                { label: 'NPS', newValue: game.metrics.nps, delta: 10, unit: '' },
                                { label: '预算', newValue: game.metrics.budget, delta: -1200, unit: '$' }
                            ]
                        };
                    }
                },
                {
                    name: '新手引导教程',
                    description: '创建互动式新手教程，用户边学边做，完成后获得成就感。',
                    icon: '🎯',
                    aarrr: 'Activation',
                    cost: 600,
                    timeframe: '2周',
                    effectiveness: 0.7,
                    execute: (game) => {
                        game.metrics.activation += 10;
                        game.metrics.budget -= 600;
                        game.currentWeek += 2;

                        return {
                            success: true,
                            feedback: `上线了互动式新手教程，将复杂功能拆解成5个小任务。65%的用户完成了教程，激活率提升${10}%。用户反馈："终于知道怎么用这个产品了！"`,
                            changes: [
                                { label: '激活率', newValue: game.metrics.activation, delta: 10, unit: '%' },
                                { label: '预算', newValue: game.metrics.budget, delta: -600, unit: '$' }
                            ]
                        };
                    }
                },
                {
                    name: '个性化欢迎邮件',
                    description: '根据用户注册时选择的目标，发送个性化的使用建议和案例。',
                    icon: '📧',
                    aarrr: 'Activation',
                    cost: 400,
                    timeframe: '1周',
                    effectiveness: 0.6,
                    execute: (game) => {
                        game.metrics.activation += 7;
                        game.metrics.budget -= 400;
                        game.currentWeek += 1;

                        return {
                            success: true,
                            feedback: `设置了个性化邮件序列，根据用户类型（创业者/企业/个人）发送不同的内容。邮件打开率45%，点击率18%，带来了${7}%的激活率提升。`,
                            changes: [
                                { label: '激活率', newValue: game.metrics.activation, delta: 7, unit: '%' },
                                { label: '预算', newValue: game.metrics.budget, delta: -400, unit: '$' }
                            ]
                        };
                    }
                }
            ]
        };
    }

    createLevel3_Retention() {
        return {
            levelNumber: 3,
            title: '关卡3：留住用户 Level 3: Retention',
            description: '用户来了又走，留存率太低。如何让他们养成使用习惯，持续回来？',
            situation: `7日留存率只有${this.metrics.retention7d}%，很多用户用了一次就再也不回来了。你需要建立让用户定期回来的机制。`,
            skills: [
                {
                    name: '打卡系统+游戏化',
                    description: '实施连续打卡奖励，每日任务，进度可视化，创造习惯循环。',
                    icon: '🔥',
                    aarrr: 'Retention',
                    cost: 1500,
                    timeframe: '3周',
                    effectiveness: 0.9,
                    execute: (game) => {
                        game.metrics.retention7d += 18;
                        game.metrics.budget -= 1500;
                        game.currentWeek += 3;

                        const newActiveUsers = Math.floor(game.metrics.users * 0.12);

                        return {
                            success: true,
                            feedback: `上线了Streak打卡系统！用户连续使用可以获得徽章和奖励。结果超出预期：7日留存从${game.metrics.retention7d-18}%跃升到${game.metrics.retention7d}%，DAU/MAU比率提升40%。用户开始每天打开产品！`,
                            changes: [
                                { label: '7日留存', newValue: game.metrics.retention7d, delta: 18, unit: '%' },
                                { label: '预算', newValue: game.metrics.budget, delta: -1500, unit: '$' }
                            ],
                            achievement: game.metrics.retention7d >= 50 ? {
                                title: '💪 留存之王',
                                description: '7日留存率突破50%！用户已经养成了使用习惯。'
                            } : null
                        };
                    }
                },
                {
                    name: '智能推送通知',
                    description: '基于用户行为，在最佳时间发送个性化通知，而非垃圾信息轰炸。',
                    icon: '🔔',
                    aarrr: 'Retention',
                    cost: 800,
                    timeframe: '2周',
                    effectiveness: 0.75,
                    execute: (game) => {
                        game.metrics.retention7d += 12;
                        game.metrics.budget -= 800;
                        game.currentWeek += 2;

                        return {
                            success: true,
                            feedback: `使用机器学习算法分析每个用户的最佳活跃时间，发送个性化通知。通知打开率从8%提升到35%，7日留存提升${12}%。关键是质量而非数量！`,
                            changes: [
                                { label: '7日留存', newValue: game.metrics.retention7d, delta: 12, unit: '%' },
                                { label: '预算', newValue: game.metrics.budget, delta: -800, unit: '$' }
                            ]
                        };
                    }
                },
                {
                    name: '用户社区建设',
                    description: '创建论坛/群组，让用户相互交流，分享经验，形成网络效应。',
                    icon: '👫',
                    aarrr: 'Retention',
                    cost: 1000,
                    timeframe: '4周',
                    effectiveness: 0.8,
                    execute: (game) => {
                        game.metrics.retention7d += 15;
                        game.metrics.viralCoefficient += 0.2;
                        game.metrics.nps += 15;
                        game.metrics.budget -= 1000;
                        game.currentWeek += 4;

                        return {
                            success: true,
                            feedback: `建立了用户社区，招募了前50个活跃用户作为版主。社区每天有200+条讨论，用户开始相互帮助。参与社区的用户留存率高达75%，还会主动推荐朋友加入！`,
                            changes: [
                                { label: '7日留存', newValue: game.metrics.retention7d, delta: 15, unit: '%' },
                                { label: '病毒系数', newValue: game.metrics.viralCoefficient.toFixed(1), delta: 0.2, unit: '' },
                                { label: 'NPS', newValue: game.metrics.nps, delta: 15, unit: '' },
                                { label: '预算', newValue: game.metrics.budget, delta: -1000, unit: '$' }
                            ]
                        };
                    }
                },
                {
                    name: '流失预警干预',
                    description: '识别流失风险用户，在他们离开前主动联系，了解问题并提供帮助。',
                    icon: '🚨',
                    aarrr: 'Retention',
                    cost: 600,
                    timeframe: '2周',
                    effectiveness: 0.65,
                    execute: (game) => {
                        game.metrics.retention7d += 10;
                        game.metrics.budget -= 600;
                        game.currentWeek += 2;

                        return {
                            success: true,
                            feedback: `设置了流失预警系统：7天未登录的用户会收到个性化关怀邮件。30%的流失风险用户被成功召回，7日留存提升${10}%。很多用户表示："没想到你们这么关心我！"`,
                            changes: [
                                { label: '7日留存', newValue: game.metrics.retention7d, delta: 10, unit: '%' },
                                { label: '预算', newValue: game.metrics.budget, delta: -600, unit: '$' }
                            ]
                        };
                    }
                }
            ]
        };
    }

    createLevel4_Revenue() {
        return {
            levelNumber: 4,
            title: '关卡4：创造收入 Level 4: Revenue',
            description: '有了用户和活跃度，现在需要思考如何变现。如何在不伤害用户体验的前提下赚钱？',
            situation: `当前月收入 $${this.metrics.revenue}，需要找到可持续的变现模式。免费用户很多，但付费转化率太低。`,
            skills: [
                {
                    name: '情境化升级提示',
                    description: '在用户触达免费版限制时，展示升级的具体价值，而非硬性弹窗。',
                    icon: '💰',
                    aarrr: 'Revenue',
                    cost: 1000,
                    timeframe: '2周',
                    effectiveness: 0.9,
                    execute: (game) => {
                        const conversionRate = 0.05; // 5% of users convert
                        const avgPrice = 49;
                        const newRevenue = Math.floor(game.metrics.users * conversionRate * avgPrice);

                        game.metrics.revenue += newRevenue;
                        game.metrics.budget -= 1000;
                        game.currentWeek += 2;

                        return {
                            success: true,
                            feedback: `实施了智能升级提示系统：当用户需要高级功能时才出现，并清晰展示价值。免费到付费转化率达到5%，本月新增收入 $${newRevenue}！用户反馈："终于知道为什么要付费了"。`,
                            changes: [
                                { label: '月收入', newValue: game.metrics.revenue, delta: newRevenue, unit: '$' },
                                { label: '预算', newValue: game.metrics.budget, delta: -1000, unit: '$' }
                            ],
                            achievement: game.metrics.revenue >= 10000 ? {
                                title: '💵 万元月收入',
                                description: '月收入突破$10,000！你已经建立了可持续的商业模式。'
                            } : null
                        };
                    }
                },
                {
                    name: '优化定价策略',
                    description: '测试不同价格点，添加年付选项（折扣20%），创建3-4个价格档位。',
                    icon: '💳',
                    aarrr: 'Revenue',
                    cost: 800,
                    timeframe: '3周',
                    effectiveness: 0.85,
                    execute: (game) => {
                        const revenueIncrease = Math.floor(game.metrics.revenue * 0.35); // 35% increase
                        game.metrics.revenue += revenueIncrease;
                        game.metrics.budget -= 800;
                        game.currentWeek += 3;

                        return {
                            success: true,
                            feedback: `重新设计了定价页面：基础版$29，专业版$49（标记"最受欢迎"），企业版$99。添加了年付选项节省20%。结果：30%的用户选择了年付，ARPU提升35%，收入增加 $${revenueIncrease}/月！`,
                            changes: [
                                { label: '月收入', newValue: game.metrics.revenue, delta: revenueIncrease, unit: '$' },
                                { label: '预算', newValue: game.metrics.budget, delta: -800, unit: '$' }
                            ]
                        };
                    }
                },
                {
                    name: '企业版销售',
                    description: '开发企业级功能包，主动联系100+ user的潜在企业客户。',
                    icon: '🏢',
                    aarrr: 'Revenue',
                    cost: 2000,
                    timeframe: '4周',
                    effectiveness: 0.75,
                    execute: (game) => {
                        const enterpriseRevenue = 5000; // Fixed enterprise deals
                        game.metrics.revenue += enterpriseRevenue;
                        game.metrics.budget -= 2000;
                        game.currentWeek += 4;

                        return {
                            success: true,
                            feedback: `打造了企业版功能：SSO登录、团队管理、优先支持。主动接触了20家企业，成功签约3家，平均每家 $500/月。企业客户更稳定，流失率几乎为零！`,
                            changes: [
                                { label: '月收入', newValue: game.metrics.revenue, delta: enterpriseRevenue, unit: '$' },
                                { label: '预算', newValue: game.metrics.budget, delta: -2000, unit: '$' }
                            ]
                        };
                    }
                },
                {
                    name: '联盟营销计划',
                    description: '招募affiliate partners，每成交一单给20%佣金，扩大销售渠道。',
                    icon: '🤝',
                    aarrr: 'Revenue',
                    cost: 500,
                    timeframe: '3周',
                    effectiveness: 0.7,
                    execute: (game) => {
                        const affiliateRevenue = Math.floor(game.metrics.users * 0.02 * 49); // 2% conversion via affiliates
                        game.metrics.revenue += affiliateRevenue;
                        game.metrics.budget -= 500;
                        game.currentWeek += 3;

                        // Affiliates also bring new users
                        const newUsers = Math.floor(game.metrics.users * 0.08);
                        game.metrics.users += newUsers;

                        return {
                            success: true,
                            feedback: `启动了联盟营销计划，招募了50个affiliate partners。他们帮你带来了${newUsers}个新用户和 $${affiliateRevenue} 额外收入。虽然要付20%佣金，但这是纯增量收入！`,
                            changes: [
                                { label: '用户数', newValue: game.metrics.users, delta: newUsers, unit: '' },
                                { label: '月收入', newValue: game.metrics.revenue, delta: affiliateRevenue, unit: '$' },
                                { label: '预算', newValue: game.metrics.budget, delta: -500, unit: '$' }
                            ]
                        };
                    }
                }
            ]
        };
    }

    createLevel5_Referral() {
        return {
            levelNumber: 5,
            title: '关卡5：病毒传播 Level 5: Referral',
            description: '用户喜欢你的产品，但很少主动推荐。如何创造病毒式增长？',
            situation: `当前病毒系数是${this.metrics.viralCoefficient}，小于1意味着增长不可持续。你需要让产品自己传播。`,
            skills: [
                {
                    name: '产品内置分享',
                    description: '让分享成为核心功能：协作文档、共享项目、团队邀请等，产品在多人使用时更有价值。',
                    icon: '🔗',
                    aarrr: 'Referral',
                    cost: 2000,
                    timeframe: '4周',
                    effectiveness: 0.95,
                    execute: (game) => {
                        game.metrics.viralCoefficient += 0.5;
                        game.metrics.budget -= 2000;
                        game.currentWeek += 4;

                        const viralUsers = Math.floor(game.metrics.users * 0.25);
                        game.metrics.users += viralUsers;

                        return {
                            success: true,
                            feedback: `重新设计了产品核心：添加协作功能，用户可以邀请团队成员。结果惊人：病毒系数从${(game.metrics.viralCoefficient-0.5).toFixed(1)}提升到${game.metrics.viralCoefficient.toFixed(1)}，每个用户平均带来${game.metrics.viralCoefficient.toFixed(1)}个新用户！产品开始自己增长！`,
                            changes: [
                                { label: '病毒系数', newValue: game.metrics.viralCoefficient.toFixed(1), delta: 0.5, unit: '' },
                                { label: '用户数', newValue: game.metrics.users, delta: viralUsers, unit: '' },
                                { label: '预算', newValue: game.metrics.budget, delta: -2000, unit: '$' }
                            ],
                            achievement: game.metrics.viralCoefficient >= 1 ? {
                                title: '🚀 病毒增长',
                                description: '病毒系数突破1.0！产品实现了自增长，每个用户带来超过1个新用户！'
                            } : null
                        };
                    }
                },
                {
                    name: '双边推荐奖励',
                    description: 'Dropbox式推荐：推荐人和新用户都获得奖励（额外功能/积分/折扣）。',
                    icon: '🎁',
                    aarrr: 'Referral',
                    cost: 1500,
                    timeframe: '2周',
                    effectiveness: 0.8,
                    execute: (game) => {
                        game.metrics.viralCoefficient += 0.3;
                        game.metrics.budget -= 1500;
                        game.currentWeek += 2;

                        const referralUsers = Math.floor(game.metrics.users * 0.18);
                        game.metrics.users += referralUsers;

                        return {
                            success: true,
                            feedback: `推出了"邀请好友，双方获得1个月免费Pro"活动。40%的用户参与了推荐，带来了${referralUsers}个高质量新用户。推荐来的用户留存率比普通用户高50%！`,
                            changes: [
                                { label: '病毒系数', newValue: game.metrics.viralCoefficient.toFixed(1), delta: 0.3, unit: '' },
                                { label: '用户数', newValue: game.metrics.users, delta: referralUsers, unit: '' },
                                { label: '预算', newValue: game.metrics.budget, delta: -1500, unit: '$' }
                            ]
                        };
                    }
                },
                {
                    name: '社交分享优化',
                    description: '优化分享卡片（Open Graph），让分享到社交媒体的内容更吸引人。添加一键分享按钮。',
                    icon: '📢',
                    aarrr: 'Referral',
                    cost: 800,
                    timeframe: '2周',
                    effectiveness: 0.65,
                    execute: (game) => {
                        game.metrics.viralCoefficient += 0.15;
                        game.metrics.budget -= 800;
                        game.currentWeek += 2;

                        const socialUsers = Math.floor(game.metrics.users * 0.10);
                        game.metrics.users += socialUsers;

                        return {
                            success: true,
                            feedback: `优化了社交分享：精美的卡片设计、引人注目的标题、清晰的价值主张。分享率提升3倍，通过社交媒体来的新用户增加${socialUsers}人。`,
                            changes: [
                                { label: '病毒系数', newValue: game.metrics.viralCoefficient.toFixed(1), delta: 0.15, unit: '' },
                                { label: '用户数', newValue: game.metrics.users, delta: socialUsers, unit: '' },
                                { label: '预算', newValue: game.metrics.budget, delta: -800, unit: '$' }
                            ]
                        };
                    }
                },
                {
                    name: '用户成功案例',
                    description: '邀请满意的用户分享成功故事，制作案例研究，让用户成为你的代言人。',
                    icon: '⭐',
                    aarrr: 'Referral',
                    cost: 1000,
                    timeframe: '3周',
                    effectiveness: 0.7,
                    execute: (game) => {
                        game.metrics.viralCoefficient += 0.2;
                        game.metrics.nps += 20;
                        game.metrics.budget -= 1000;
                        game.currentWeek += 3;

                        const caseStudyUsers = Math.floor(game.metrics.users * 0.12);
                        game.metrics.users += caseStudyUsers;

                        return {
                            success: true,
                            feedback: `采访了10位超级用户，制作了详细的成功案例。他们的故事在社交媒体获得了广泛传播，NPS提升到${game.metrics.nps}，带来了${caseStudyUsers}个新用户。真实用户的声音比任何广告都有效！`,
                            changes: [
                                { label: '病毒系数', newValue: game.metrics.viralCoefficient.toFixed(1), delta: 0.2, unit: '' },
                                { label: 'NPS', newValue: game.metrics.nps, delta: 20, unit: '' },
                                { label: '用户数', newValue: game.metrics.users, delta: caseStudyUsers, unit: '' },
                                { label: '预算', newValue: game.metrics.budget, delta: -1000, unit: '$' }
                            ]
                        };
                    }
                }
            ]
        };
    }

    createLevel6_Scale() {
        return {
            levelNumber: 6,
            title: '关卡6：规模化增长 Level 6: Scale',
            description: '🏆 最终Boss：你已经验证了PMF，现在是时候全力加速，实现10倍增长！',
            situation: `当前各项指标良好，是时候踩油门了。目标：在接下来的8周内实现10倍增长，同时保持健康的单位经济模型。`,
            skills: [
                {
                    name: '全渠道增长引擎',
                    description: '同时优化所有增长渠道：SEO + 付费广告 + 内容营销 + 推荐计划，建立增长飞轮。',
                    icon: '🎡',
                    aarrr: 'All AARRR',
                    cost: 5000,
                    timeframe: '6周',
                    effectiveness: 0.95,
                    execute: (game) => {
                        const growthMultiplier = 3;
                        const newUsers = Math.floor(game.metrics.users * growthMultiplier);
                        const newRevenue = Math.floor(game.metrics.revenue * 2);

                        game.metrics.users += newUsers;
                        game.metrics.revenue += newRevenue;
                        game.metrics.budget -= 5000;
                        game.currentWeek += 6;

                        return {
                            success: true,
                            feedback: `全面启动增长引擎！SEO流量增长200%，付费广告ROI达到3:1，推荐计划带来30%的新用户，内容营销建立了品牌权威。用户从${game.metrics.users-newUsers}暴增到${game.metrics.users}（${growthMultiplier}x），收入增加 $${newRevenue}！`,
                            changes: [
                                { label: '用户数', newValue: game.metrics.users, delta: newUsers, unit: '' },
                                { label: '月收入', newValue: game.metrics.revenue, delta: newRevenue, unit: '$' },
                                { label: '预算', newValue: game.metrics.budget, delta: -5000, unit: '$' }
                            ],
                            achievement: {
                                title: '👑 增长黑客大师',
                                description: '恭喜！你已经掌握了AARRR框架的所有精髓，实现了规模化增长！'
                            }
                        };
                    }
                },
                {
                    name: '国际化扩张',
                    description: '将产品翻译成多语言，进入新市场，复制成功经验到全球。',
                    icon: '🌍',
                    aarrr: 'Acquisition',
                    cost: 4000,
                    timeframe: '8周',
                    effectiveness: 0.85,
                    execute: (game) => {
                        const internationalUsers = Math.floor(game.metrics.users * 1.5);
                        game.metrics.users += internationalUsers;
                        game.metrics.revenue += Math.floor(game.metrics.revenue * 0.8);
                        game.metrics.budget -= 4000;
                        game.currentWeek += 8;

                        return {
                            success: true,
                            feedback: `产品支持了5种语言，进入欧洲和亚洲市场。国际用户增长迅速（+${internationalUsers}），虽然ARPU略低，但TAM扩大了10倍！你的产品走向了世界！`,
                            changes: [
                                { label: '用户数', newValue: game.metrics.users, delta: internationalUsers, unit: '' },
                                { label: '月收入', newValue: game.metrics.revenue, delta: Math.floor(game.metrics.revenue * 0.8), unit: '$' },
                                { label: '预算', newValue: game.metrics.budget, delta: -4000, unit: '$' }
                            ]
                        };
                    }
                },
                {
                    name: 'B2B转型',
                    description: '在C端成功后，打造企业版，进入利润更高的B2B市场。',
                    icon: '🏭',
                    aarrr: 'Revenue',
                    cost: 6000,
                    timeframe: '8周',
                    effectiveness: 0.9,
                    execute: (game) => {
                        const enterpriseRevenue = 15000;
                        game.metrics.revenue += enterpriseRevenue;
                        game.metrics.budget -= 6000;
                        game.currentWeek += 8;

                        return {
                            success: true,
                            feedback: `基于C端产品打造了企业版，添加了SSO、权限管理、API、专属支持等功能。成功签约了10家企业客户，平均每家 $1500/月。企业市场的LTV是C端的10倍！`,
                            changes: [
                                { label: '月收入', newValue: game.metrics.revenue, delta: enterpriseRevenue, unit: '$' },
                                { label: '预算', newValue: game.metrics.budget, delta: -6000, unit: '$' }
                            ],
                            achievement: {
                                title: '💼 企业级玩家',
                                description: '成功从C端转向B2B，打开了利润更高的企业市场！'
                            }
                        };
                    }
                },
                {
                    name: '融资加速',
                    description: '凭借优秀的增长数据，获得VC投资，用资本加速增长。',
                    icon: '💵',
                    aarrr: 'All AARRR',
                    cost: 0,
                    timeframe: '4周',
                    effectiveness: 0.8,
                    execute: (game) => {
                        const funding = 100000;
                        game.metrics.budget += funding;
                        game.currentWeek += 4;

                        return {
                            success: true,
                            feedback: `凭借月增长率40%、留存率${game.metrics.retention7d}%、病毒系数${game.metrics.viralCoefficient.toFixed(1)}的优秀数据，成功获得了 $${funding} 的A轮融资！现在有充足的资金加速增长了！`,
                            changes: [
                                { label: '预算', newValue: game.metrics.budget, delta: funding, unit: '$' }
                            ],
                            achievement: {
                                title: '🦄 潜力独角兽',
                                description: '获得VC投资，正式进入规模化增长阶段！'
                            }
                        };
                    }
                }
            ]
        };
    }

    getCurrentLevel() {
        return this.levels[this.currentLevel];
    }

    executeSkill(skillIndex) {
        const level = this.getCurrentLevel();
        const skill = level.skills[skillIndex];

        if (!skill) {
            return { success: false, feedback: 'Invalid skill selection' };
        }

        if (this.metrics.budget < skill.cost) {
            return {
                success: false,
                feedback: `预算不足！这个策略需要 $${skill.cost}，但你只有 $${this.metrics.budget}。`
            };
        }

        // Execute the skill
        const result = skill.execute(this);

        // Record the skill usage
        this.skillsUsed.push({
            level: level.levelNumber,
            skill: skill.name,
            week: this.currentWeek,
            aarrr: skill.aarrr
        });

        // Save to history
        this.history.push({ ...this.metrics });

        // Check for achievement
        if (result.achievement) {
            this.achievements.push(result.achievement);
        }

        // Mark level as completed and move to next
        this.completedLevels.push(level.levelNumber);
        this.currentLevel++;

        return result;
    }

    getMetrics() {
        return [
            {
                label: '用户数 Users',
                value: this.metrics.users.toLocaleString(),
                change: this.history.length > 1 ? this.metrics.users - this.history[this.history.length - 2].users : 0,
                unit: ''
            },
            {
                label: '月收入 MRR',
                value: '$' + this.metrics.revenue.toLocaleString(),
                change: this.history.length > 1 ? this.metrics.revenue - this.history[this.history.length - 2].revenue : 0,
                unit: '$'
            },
            {
                label: '预算 Budget',
                value: '$' + this.metrics.budget.toLocaleString(),
                change: this.history.length > 1 ? this.metrics.budget - this.history[this.history.length - 2].budget : 0,
                unit: '$'
            },
            {
                label: '7日留存 Retention',
                value: this.metrics.retention7d + '%',
                change: this.history.length > 1 ? this.metrics.retention7d - this.history[this.history.length - 2].retention7d : 0,
                unit: '%'
            },
            {
                label: '激活率 Activation',
                value: this.metrics.activation + '%',
                change: this.history.length > 1 ? this.metrics.activation - this.history[this.history.length - 2].activation : 0,
                unit: '%'
            },
            {
                label: 'NPS',
                value: this.metrics.nps,
                change: this.history.length > 1 ? this.metrics.nps - this.history[this.history.length - 2].nps : 0,
                unit: ''
            }
        ];
    }

    isGameComplete() {
        return this.currentLevel >= this.levels.length;
    }

    generateFinalPlan() {
        const initialMetrics = this.history[0];
        const finalMetrics = this.metrics;

        return {
            company: this.company,
            industry: this.industry,
            finalMetrics: [
                {
                    label: '用户数 Users',
                    value: finalMetrics.users.toLocaleString(),
                    growth: Math.round(((finalMetrics.users - initialMetrics.users) / initialMetrics.users) * 100)
                },
                {
                    label: '月收入 MRR',
                    value: '$' + finalMetrics.revenue.toLocaleString(),
                    growth: finalMetrics.revenue > 0 ? Math.round(((finalMetrics.revenue - initialMetrics.revenue) / Math.max(initialMetrics.revenue, 1)) * 100) : 0
                },
                {
                    label: '7日留存率',
                    value: finalMetrics.retention7d + '%',
                    growth: Math.round(((finalMetrics.retention7d - initialMetrics.retention7d) / initialMetrics.retention7d) * 100)
                },
                {
                    label: '激活率',
                    value: finalMetrics.activation + '%',
                    growth: Math.round(((finalMetrics.activation - initialMetrics.activation) / initialMetrics.activation) * 100)
                }
            ],
            phases: this.generatePhases(),
            keyFactors: this.generateKeyFactors(),
            skillsUsed: this.skillsUsed.map(s => s.skill)
        };
    }

    generatePhases() {
        const phases = [];
        let currentWeek = 1;

        for (let i = 0; i < this.skillsUsed.length; i++) {
            const skill = this.skillsUsed[i];
            const phase = {
                title: this.levels[skill.level - 1].title.split(':')[1].trim(),
                actions: [
                    {
                        week: `第${currentWeek}-${currentWeek+1}周`,
                        action: skill.skill,
                        description: `执行${skill.aarrr}策略`,
                        expected: this.getExpectedOutcome(skill.skill)
                    }
                ]
            };
            phases.push(phase);
            currentWeek += 2;
        }

        return phases;
    }

    getExpectedOutcome(skillName) {
        const outcomes = {
            'Product Hunt发布': '获得500-2000个早期用户，建立品牌知名度',
            '内容营销+SEO': '建立长期有机流量来源，提高激活率',
            '社交媒体广告': '快速获取用户，测试产品市场匹配度',
            '社区营销': '获得高质量种子用户，提升留存率',
            '简化入门流程': '激活率提升15%+，改善用户第一印象',
            '设计"啊哈时刻"': '显著提升留存率和NPS',
            '新手引导教程': '帮助用户理解产品价值',
            '个性化欢迎邮件': '提高用户参与度',
            '打卡系统+游戏化': '建立用户使用习惯，留存率大幅提升',
            '智能推送通知': '提高DAU/MAU比率',
            '用户社区建设': '创造网络效应，提升NPS',
            '流失预警干预': '降低流失率10%+',
            '情境化升级提示': '免费到付费转化率提升30-50%',
            '优化定价策略': 'ARPU提升35%，增加年度订阅',
            '企业版销售': '建立稳定的企业客户基础',
            '联盟营销计划': '扩大销售渠道，增加增量收入',
            '产品内置分享': '病毒系数突破1.0，实现自增长',
            '双边推荐奖励': '推荐率提升，获得高质量用户',
            '社交分享优化': '提高社交媒体曝光和转化',
            '用户成功案例': '建立信任，提升NPS和推荐率',
            '全渠道增长引擎': '实现10倍增长，建立增长飞轮',
            '国际化扩张': 'TAM扩大10倍，进入新市场',
            'B2B转型': '提高LTV，进入企业市场',
            '融资加速': '获得资金支持，加速增长'
        };
        return outcomes[skillName] || '优化相关指标';
    }

    generateKeyFactors() {
        const factors = [];

        if (this.metrics.retention7d >= 50) {
            factors.push('✅ 优秀的留存率（' + this.metrics.retention7d + '%）证明产品找到了PMF');
        }

        if (this.metrics.viralCoefficient >= 1) {
            factors.push('✅ 病毒系数>1，产品实现了自增长');
        }

        if (this.metrics.revenue > 10000) {
            factors.push('✅ 建立了可持续的商业模式，月收入 $' + this.metrics.revenue.toLocaleString());
        }

        if (this.metrics.activation >= 45) {
            factors.push('✅ 高激活率（' + this.metrics.activation + '%）确保新用户能快速体验到价值');
        }

        if (this.metrics.nps >= 40) {
            factors.push('✅ 高NPS（' + this.metrics.nps + '）说明用户满意度极高，有强大的口碑传播潜力');
        }

        factors.push('📊 掌握了AARRR框架的全部技能：获取、激活、留存、变现、推荐');
        factors.push('🎯 建立了数据驱动的增长文化，每个决策都基于数据分析');
        factors.push('🚀 从单点优化到系统化增长，建立了可持续的增长引擎');

        return factors;
    }

    generatePlanText() {
        const plan = this.generateFinalPlan();
        let text = `
===============================================
${plan.company} 增长计划
Growth Plan for ${plan.company}
===============================================

行业 Industry: ${this.industry}
游戏完成时间 Completion: ${this.currentWeek}周

===============================================
最终成绩 FINAL RESULTS
===============================================

${plan.finalMetrics.map(m => `${m.label}: ${m.value} (增长 ${m.growth}%)`).join('\n')}

===============================================
完整增长计划 COMPLETE GROWTH PLAN
===============================================

${plan.phases.map((phase, i) => `
阶段 ${i+1}: ${phase.title}
${phase.actions.map(action => `
  ${action.week}: ${action.action}
  - ${action.description}
  - 预期效果: ${action.expected}
`).join('\n')}
`).join('\n')}

===============================================
关键成功因素 KEY SUCCESS FACTORS
===============================================

${plan.keyFactors.join('\n')}

===============================================
掌握的增长黑客技能 GROWTH HACKING SKILLS MASTERED
===============================================

${plan.skillsUsed.join(', ')}

===============================================
获得的成就 ACHIEVEMENTS UNLOCKED
===============================================

${this.achievements.map(a => `🏆 ${a.title}: ${a.description}`).join('\n')}

===============================================
下一步建议 NEXT STEPS
===============================================

1. 持续监控关键指标（用户数、留存率、收入）
2. 建立增长团队，制度化增长实验流程
3. 每周运行2-3个增长实验，快速迭代
4. 关注单位经济模型（CAC vs LTV）
5. 准备融资，用资本加速已验证的增长渠道

===============================================
祝你的增长之旅一帆风顺！
Wish you success on your growth journey!
===============================================

此计划由增长黑客模拟器生成
Generated by Growth Hacker Simulator
https://github.com/OrangeViolin/growth-hacker-game
        `;

        return text;
    }
}

// Make it available globally
if (typeof window !== 'undefined') {
    window.GrowthGameEngine = GrowthGameEngine;
}
