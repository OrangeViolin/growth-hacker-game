// Intelligent Growth Strategy Engine
// 智能增长策略引擎

class StrategyEngine {
    constructor(context) {
        this.company = context.company;
        this.industry = context.industry;
        this.stage = context.stage;
        this.model = context.model;
        this.users = this.parseNumber(context.users);
        this.revenue = context.revenue;
        this.challenge = context.challenge.toLowerCase();
        this.metrics = context.metrics;
        this.goal = context.goal.toLowerCase();

        this.strategies = [];
        this.primaryProblem = this.identifyProblem();
        this.secondaryProblems = this.identifySecondaryProblems();
    }

    parseNumber(str) {
        if (!str) return 0;
        return parseInt(str.replace(/[^0-9]/g, '')) || 0;
    }

    identifyProblem() {
        const patterns = {
            acquisition: /sign.*up|visitor|traffic|conversion.*rate|landing|获取|注册|流量|转化率|着陆/i,
            activation: /onboarding|setup|first.*use|complete.*profile|激活|入门|设置|完成.*资料/i,
            retention: /retention|return|come.*back|churn|active.*user|留存|回来|流失|活跃.*用户/i,
            revenue: /revenue|monetization|paying|purchase|subscription|变现|付费|购买|订阅/i,
            referral: /referral|viral|share|invite|growth.*rate|推荐|病毒|分享|邀请|增长.*率/i
        };

        for (let [problem, pattern] of Object.entries(patterns)) {
            if (pattern.test(this.challenge) || pattern.test(this.goal)) {
                return problem;
            }
        }

        return 'general';
    }

    identifySecondaryProblems() {
        // Identify additional areas that might need attention
        const problems = [];

        // Early stage companies often have acquisition issues
        if (['idea', 'mvp', 'early'].includes(this.stage) && this.users < 10000) {
            if (this.primaryProblem !== 'acquisition') problems.push('acquisition');
        }

        // Low user base often means activation is also an issue
        if (this.users < 50000 && this.primaryProblem === 'retention') {
            problems.push('activation');
        }

        // If retention is low, revenue will be affected
        if (this.primaryProblem === 'retention' && !problems.includes('revenue')) {
            problems.push('revenue');
        }

        return problems;
    }

    generateStrategies() {
        // Generate 3-5 strategies based on full context
        this.strategies = [];

        // Always address the primary problem first
        this.addStrategiesForProblem(this.primaryProblem, true);

        // Add strategies for secondary problems
        this.secondaryProblems.forEach(problem => {
            this.addStrategiesForProblem(problem, false);
        });

        // Ensure we have at least 3 strategies
        if (this.strategies.length < 3) {
            this.addGeneralStrategies();
        }

        // Limit to top 5 most relevant
        return this.strategies.slice(0, 5);
    }

    addStrategiesForProblem(problem, isPrimary) {
        const methodName = `get${problem.charAt(0).toUpperCase() + problem.slice(1)}Strategies`;
        if (typeof this[methodName] === 'function') {
            const newStrategies = this[methodName](isPrimary);
            this.strategies.push(...newStrategies);
        }
    }

    getAcquisitionStrategies(isPrimary) {
        const strategies = [];
        const userStage = this.users < 1000 ? 'very early' : this.users < 10000 ? 'early' : this.users < 100000 ? 'growth' : 'scale';

        // Strategy 1: Channel optimization
        const channelStrategy = {
            title: `${isPrimary ? '🎯 核心策略：' : ''}优化获取渠道 Optimize Acquisition Channels`,
            framework: 'Acquisition',
            priority: isPrimary ? 'high' : 'medium',
            description: this.industry === 'saas'
                ? `针对${this.company}这样的SaaS产品，应该专注于内容营销+产品试用的组合策略。For SaaS like ${this.company}, focus on content marketing + product trial combination.`
                : this.industry === 'ecommerce'
                ? `电商产品应该测试社交电商+KOL合作，降低获客成本。E-commerce should test social commerce + influencer partnerships to lower CAC.`
                : `专注于找到最适合${this.industry}行业的低成本获取渠道。Focus on finding lowest-cost acquisition channels for ${this.industry} industry.`,
            tactics: this.getAcquisitionTactics(),
            expectedResults: this.getExpectedResults('acquisition'),
            pros: this.getAcquisitionPros(),
            cons: this.getAcquisitionCons(),
            timeframe: '2-4周可见初步效果 2-4 weeks for initial results',
            budget: this.getBudgetEstimate('acquisition')
        };
        strategies.push(channelStrategy);

        // Strategy 2: For different stages
        if (userStage === 'very early' || userStage === 'early') {
            // Product Hunt / Community launch
            strategies.push({
                title: '社区驱动启动 Community-Driven Launch',
                framework: 'Acquisition',
                priority: 'high',
                description: `在早期阶段（当前${this.users}用户），应该通过Product Hunt、Hacker News等社区获得初始用户和反馈。In early stage (current ${this.users} users), gain initial users through Product Hunt, Hacker News communities.`,
                tactics: [
                    `准备Product Hunt发布（选择周二-周四）Prepare Product Hunt launch (choose Tue-Thu)`,
                    `在相关Reddit/Facebook群组分享（提供价值，不要spam）Share in relevant Reddit/FB groups (provide value, no spam)`,
                    `联系10-20个早期采用者进行1对1演示 Contact 10-20 early adopters for 1-on-1 demos`,
                    `在行业垂直论坛/Slack社区活跃 Be active in industry forums/Slack communities`,
                    `提供"创始人特惠"给前100个用户 Offer "founder special" to first 100 users`
                ],
                expectedResults: `预期获得500-2000个注册用户，转化率15-25% Expected 500-2000 signups, 15-25% conversion rate`,
                pros: [
                    `低成本甚至零成本 Low or zero cost`,
                    `获得高质量早期用户和反馈 Get high-quality early users and feedback`,
                    `建立品牌知名度 Build brand awareness`,
                    `真实用户反馈帮助改进产品 Real user feedback helps improve product`
                ],
                cons: [
                    `需要时间准备和参与 Requires time to prepare and engage`,
                    `效果是一次性的，需持续努力 Effect is one-time, needs continuous effort`,
                    `需要产品足够好才能获得正面反馈 Needs product to be good enough for positive feedback`
                ],
                timeframe: '1-2周准备，发布当周见效 1-2 weeks prep, results on launch week',
                budget: '$0-500 (可选的设计/视频制作 Optional design/video production)'
            });
        } else if (industry === 'marketplace') {
            // For marketplaces, solve chicken-and-egg
            strategies.push(this.getMarketplaceStrategy());
        }

        return strategies;
    }

    getAcquisitionTactics() {
        const tactics = [];

        if (this.industry === 'saas' || this.industry === 'fintech') {
            tactics.push(
                `创建教育性内容（博客、视频教程）addressing pain points Create educational content (blog, video tutorials) addressing pain points`,
                `SEO优化针对"[problem] solution"类关键词 SEO for "[problem] solution" keywords`,
                `提供14天免费试用，无需信用卡 Offer 14-day free trial, no credit card required`,
                `在G2, Capterra等平台收集评价 Collect reviews on G2, Capterra`
            );
        } else if (this.industry === 'ecommerce') {
            tactics.push(
                `测试Instagram/TikTok短视频广告 Test Instagram/TikTok short video ads`,
                `与micro-influencers合作（1-10万粉丝）Partner with micro-influencers (10K-100K followers)`,
                `优化产品页面的SEO和转化率 Optimize product pages for SEO and conversion`,
                `设置再营销广告捕获放弃购物车用户 Set up retargeting for cart abandoners`
            );
        } else if (this.industry === 'social' || this.industry === 'media') {
            tactics.push(
                `创建病毒性内容模板供用户使用 Create viral content templates for users`,
                `与现有网红/创作者合作 Partner with existing influencers/creators`,
                `优化App Store/Google Play的ASO Optimize App Store/Google Play ASO`,
                `实施推荐计划（双方获益）Implement referral program (both sides benefit)`
            );
        } else {
            tactics.push(
                `进行渠道测试，分配预算到3-5个渠道 Channel testing across 3-5 channels`,
                `A/B测试着陆页的标题、CTA、视觉元素 A/B test landing page headlines, CTAs, visuals`,
                `设置完整的分析追踪（UTM参数）Set up complete analytics tracking (UTM parameters)`,
                `每周review数据，快速停止无效渠道 Weekly data review, quickly stop ineffective channels`
            );
        }

        return tactics;
    }

    getExpectedResults(problemType) {
        if (problemType === 'acquisition') {
            if (this.users < 1000) {
                return `预期4周内新增300-800用户，如果产品适合市场 Expected 300-800 new users in 4 weeks if product-market fit exists`;
            } else if (this.users < 10000) {
                return `预期提升获客效率20-40%，CAC降低15-25% Expected 20-40% acquisition efficiency improvement, 15-25% CAC reduction`;
            } else {
                return `预期月增长率提升至15-30%，同时保持或降低CAC Expected monthly growth rate increase to 15-30% while maintaining or reducing CAC`;
            }
        }
        // Add more problem types...
        return '根据你的具体执行情况会有不同 Varies based on execution';
    }

    getAcquisitionPros() {
        return [
            '直接增加用户基数和brand awareness Directly increases user base and brand awareness',
            '可以快速测试和迭代 Can test and iterate quickly',
            '数据驱动决策，清晰ROI Data-driven decisions with clear ROI',
            `适合${this.stage}阶段的公司 Suitable for ${this.stage} stage companies`
        ];
    }

    getAcquisitionCons() {
        const cons = [
            '需要持续投入（时间或金钱）Requires continuous investment (time or money)'
        ];

        if (this.primaryProblem !== 'acquisition') {
            cons.push('如果产品留存有问题，获取更多用户只是浪费 If retention is broken, acquiring more users is wasteful');
        }

        if (this.users < 5000) {
            cons.push('在产品未验证PMF前，不应大规模投放 Should not scale spend before validating PMF');
        }

        cons.push('CAC可能随市场竞争增加 CAC may increase with competition');

        return cons;
    }

    getBudgetEstimate(problemType) {
        if (this.stage === 'idea' || this.stage === 'mvp') {
            return '$0-$1000/月（主要靠时间投入）$0-$1000/month (mainly time investment)';
        } else if (this.stage === 'early') {
            return '$500-$3000/月 $500-$3000/month';
        } else if (this.stage === 'growth') {
            return '$2000-$10000/月 $2000-$10000/month';
        } else {
            return '$5000+/月 $5000+/month';
        }
    }

    getMarketplaceStrategy() {
        return {
            title: '解决鸡蛋问题：先集中一个细分市场 Solve Chicken-Egg: Focus on One Niche First',
            framework: 'Acquisition',
            priority: 'high',
            description: `市场平台的核心是先在一个细分领域建立流动性。${this.company}应该选择一个最小可行市场密集发展。Core of marketplace is building liquidity in one niche first. ${this.company} should choose a minimum viable market for dense development.`,
            tactics: [
                '选择一个地理位置或垂直领域（如：旧金山的设计师，而非全国设计师）Choose one geography or vertical (e.g., SF designers, not nationwide designers)',
                '手动招募前20-50个供应方 Manually recruit first 20-50 supply-side users',
                '为供应方提供免费增值服务吸引加入 Provide value-added services to attract supply',
                '确保密度：一个买家能找到5+个供应商 Ensure density: one buyer can find 5+ suppliers',
                '达到流动性后再扩展到下一个市场 Expand to next market after achieving liquidity',
                '参考案例：Uber从旧金山黑车开始，Airbnb从纽约开始 Case: Uber started with SF black cars, Airbnb from NYC'
            ],
            expectedResults: '6-12周在第一个市场达到流动性，GMV增长50-100% 6-12 weeks to achieve liquidity in first market, 50-100% GMV growth',
            pros: [
                '集中资源更容易成功 Concentrated resources easier to succeed',
                '建立网络效应护城河 Build network effect moat',
                '获得清晰的成功模式可复制到其他市场 Clear success pattern replicable to other markets',
                '供需两侧相互吸引形成飞轮 Supply-demand attract each other forming flywheel'
            ],
            cons: [
                '初期增长看起来很慢 Initial growth appears slow',
                '需要拒绝过早扩张的诱惑 Need to resist temptation of premature expansion',
                '需要深入理解选定的细分市场 Requires deep understanding of chosen niche',
                '选错市场会浪费资源 Choosing wrong market wastes resources'
            ],
            timeframe: '6-12周验证第一个市场 6-12 weeks to validate first market',
            budget: '$2000-$5000用于手动招募和激励 $2000-$5000 for manual recruitment and incentives'
        };
    }

    getActivationStrategies(isPrimary) {
        const strategies = [];

        strategies.push({
            title: `${isPrimary ? '🎯 核心策略：' : ''}优化新用户激活流程 Optimize New User Activation`,
            framework: 'Activation',
            priority: isPrimary ? 'high' : 'medium',
            description: `针对${this.company}的${this.industry}产品，关键是让新用户在首次使用的3-5分钟内体验到价值。For ${this.company}'s ${this.industry} product, key is letting new users experience value in first 3-5 minutes.`,
            tactics: [
                `分析当前用户旅程，识别流失点 Analyze current user journey, identify drop-off points`,
                `简化注册流程至最少步骤（理想是<3步）Simplify signup to minimum steps (ideally <3)`,
                `提供"跳过"选项for非必要信息 Provide "skip" option for non-essential info`,
                `使用进度条让用户看到完成度 Use progress bar to show completion`,
                `添加示例数据或模板让用户立即看到效果 Add sample data or templates for immediate value`,
                `在第一次成功操作后立即庆祝（微动画/祝贺消息）Celebrate first success immediately (micro-animation/congrats message)`
            ],
            expectedResults: `预期激活率提升30-60%，从当前基线 Expected 30-60% activation rate improvement from current baseline`,
            pros: [
                '直接提升产品北极星指标 Directly improves product North Star metric',
                '改善的用户更可能长期留存 Activated users more likely to retain long-term',
                '相对容易实施和测试 Relatively easy to implement and test',
                'ROI非常高 Very high ROI'
            ],
            cons: [
                '需要产品/工程资源 Requires product/engineering resources',
                '可能需要2-3周的开发时间 May need 2-3 weeks development time',
                '需要足够数据来A/B测试 Needs sufficient data for A/B testing'
            ],
            timeframe: '2-3周开发，1-2周测试 2-3 weeks development, 1-2 weeks testing',
            budget: '主要是工程时间成本 Mainly engineering time cost'
        });

        return strategies;
    }

    getRetentionStrategies(isPrimary) {
        const strategies = [];

        const habitStrategy = {
            title: `${isPrimary ? '🎯 核心策略：' : ''}建立产品使用习惯 Build Product Usage Habits`,
            framework: 'Retention',
            priority: isPrimary ? 'high' : 'medium',
            description: `${this.industry}产品的留存关键是让用户养成习惯。基于你提到的"${this.challenge.substring(0, 80)}..."，需要创造让用户定期回来的理由。Retention for ${this.industry} products requires building habits. Based on your "${this.challenge.substring(0, 80)}...", need to create reasons for users to return regularly.`,
            tactics: this.getRetentionTactics(),
            expectedResults: this.getRetentionExpectedResults(),
            pros: [
                '显著提升DAU/MAU比率 Significantly improves DAU/MAU ratio',
                '降低流失率 Reduces churn rate',
                '提高LTV，改善单位经济 Increases LTV, improves unit economics',
                '用户粘性增加后更容易变现 Easier to monetize after increasing stickiness'
            ],
            cons: [
                '需要持续的内容或功能更新 Requires continuous content or feature updates',
                '如果过度可能让用户觉得"操纵" May feel manipulative if overdone',
                `不是所有${this.industry}产品都适合高频使用 Not all ${this.industry} products suit high-frequency use`
            ],
            timeframe: '2-4周实施，4-8周看到留存改善 2-4 weeks implementation, 4-8 weeks to see retention improvement',
            budget: this.getBudgetEstimate('retention')
        };

        strategies.push(habitStrategy);

        return strategies;
    }

    getRetentionTactics() {
        const tactics = [];

        if (this.industry === 'education' || this.industry === 'health') {
            tactics.push(
                '实施Streak打卡系统（连续使用天数）Implement streak system (consecutive days)',
                '每日挑战或目标 Daily challenges or goals',
                '进度可视化（如：你已完成60%的课程）Progress visualization (e.g., "60% course complete")',
                '在最佳时间发送1条个性化提醒（基于用户历史活跃时间）Send 1 personalized reminder at optimal time (based on user\'s historical active time)',
                '社交对比（匿名，如：你比80%的用户更活跃）Social comparison (anonymous, e.g., "more active than 80% of users")'
            );
        } else if (this.industry === 'saas') {
            tactics.push(
                '基于用户行为的个性化邮件序列 Behavior-based personalized email sequences',
                '识别不活跃用户，提前7天干预 Identify inactive users, intervene 7 days early',
                '提供使用技巧和最佳实践 Provide usage tips and best practices',
                '创建用户成功里程碑庆祝 Create and celebrate user success milestones',
                '构建社区让用户相互学习 Build community for peer learning'
            );
        } else {
            tactics.push(
                '分析流失用户的共同特征 Analyze common characteristics of churned users',
                '创建预警系统识别流失风险用户 Create early warning system for churn risk',
                '个性化内容推荐提高相关性 Personalized content recommendations',
                '定期用户调研了解需求变化 Regular user research to understand evolving needs',
                '为长期用户提供VIP福利 Provide VIP benefits for long-term users'
            );
        }

        return tactics;
    }

    getRetentionExpectedResults() {
        const currentRetention = this.challenge.match(/(\d+)%/);
        if (currentRetention) {
            const current = parseInt(currentRetention[1]);
            const improved = Math.min(current * 1.4, 85); // 40% improvement, max 85%
            return `如果当前留存率是${current}%，预期4-8周内提升到${Math.round(improved)}% If current retention is ${current}%, expect improvement to ${Math.round(improved)}% in 4-8 weeks`;
        }
        return '预期7天留存提升20-40%，30天留存提升15-30% Expected 20-40% improvement in 7-day retention, 15-30% in 30-day retention';
    }

    getRevenueStrategies(isPrimary) {
        const strategies = [];

        if (this.model === 'freemium' || this.model === 'subscription') {
            strategies.push({
                title: `${isPrimary ? '🎯 核心策略：' : ''}优化免费到付费转化 Optimize Free-to-Paid Conversion`,
                framework: 'Revenue',
                priority: isPrimary ? 'high' : 'medium',
                description: `对于${this.model}模式，关键是在用户最需要升级的时刻提供价值清晰的选项。For ${this.model} model, key is offering clear value at moment of highest upgrade intent.`,
                tactics: [
                    '识别"升级时刻"：用户何时最需要付费功能 Identify "upgrade moments": when users most need paid features',
                    '在触达免费限制时展示升级选项（不是广告式弹窗）Show upgrade options when hitting free limits (not ad-style popups)',
                    '清晰对比免费vs付费的具体价值 Clear comparison of free vs paid specific value',
                    '提供无风险试用（如：30天退款保证）Offer risk-free trial (e.g., 30-day money-back guarantee)',
                    `使用价格锚定：如果付费版$${this.getEstimatedPrice()}/月，展示年付节省20% Use price anchoring: if paid is $${this.getEstimatedPrice()}/month, show annual saves 20%`,
                    '为年付用户提供额外价值（不只是折扣）Provide additional value for annual (not just discount)'
                ],
                expectedResults: `预期免费到付费转化率提升30-50% Expected free-to-paid conversion rate improvement of 30-50%`,
                pros: [
                    '直接增加MRR和ARR Directly increases MRR and ARR',
                    '付费用户留存率通常更高 Paid users typically have higher retention',
                    '改善单位经济模型 Improves unit economics',
                    '可以快速A/B测试不同价格点 Can quickly A/B test different price points'
                ],
                cons: [
                    '需要平衡免费价值和付费门槛 Need to balance free value and paid threshold',
                    '定价太高会影响转化，太低会影响收入 Pricing too high hurts conversion, too low hurts revenue',
                    '可能需要多次迭代找到最佳点 May need multiple iterations to find optimal point'
                ],
                timeframe: '2周实施，4周收集数据并优化 2 weeks implementation, 4 weeks data collection and optimization',
                budget: '主要是产品开发时间 Mainly product development time'
            });
        }

        return strategies;
    }

    getEstimatedPrice() {
        if (this.industry === 'saas') return '49';
        if (this.industry === 'education') return '29';
        if (this.industry === 'health') return '19';
        return '39';
    }

    getReferralStrategies(isPrimary) {
        const strategies = [];

        strategies.push({
            title: `${isPrimary ? '🎯 核心策略：' : ''}产品内建病毒性 Build Virality Into Product`,
            framework: 'Referral',
            priority: isPrimary ? 'high' : 'medium',
            description: `最可持续的增长来自产品本身的病毒性。${this.company}应该让分享成为核心功能，而非附加功能。Most sustainable growth comes from product virality. ${this.company} should make sharing a core feature, not add-on.`,
            tactics: [
                '识别用户为什么会自然分享你的产品 Identify why users would naturally share your product',
                '让产品在多人使用时更有价值（网络效应）Make product more valuable with multiple users (network effects)',
                '例如：协作功能、共享项目、团队工作区 Example: collaboration features, shared projects, team workspaces',
                '简化邀请流程到一键操作 Simplify invitation to one-click',
                '给双方都提供价值（不只是优惠码）Provide value to both sides (not just discount codes)',
                `参考案例：Figma的协作、Loom的视频分享、Notion的团队工作区 Reference: Figma collaboration, Loom video sharing, Notion team workspaces`
            ],
            expectedResults: `目标是病毒系数K>1，即每个用户平均带来>1个新用户 Goal is viral coefficient K>1, i.e., each user brings >1 new user on average`,
            pros: [
                '最低成本的用户获取方式 Lowest cost user acquisition',
                '推荐来的用户质量和留存率更高 Referred users have higher quality and retention',
                '创造指数级增长潜力 Creates exponential growth potential',
                '建立竞争护城河 Builds competitive moat'
            ],
            cons: [
                '需要产品足够好才会有人愿意推荐 Product must be good enough for people to recommend',
                '可能需要重新思考产品核心功能 May require rethinking core product features',
                '达到K>1的病毒系数很难 Achieving K>1 viral coefficient is difficult',
                '需要持续优化邀请流程 Requires continuous optimization of invitation flow'
            ],
            timeframe: '4-8周产品开发，8-12周看到病毒效应 4-8 weeks product development, 8-12 weeks to see viral effects',
            budget: '主要是产品开发成本 Mainly product development cost'
        });

        return strategies;
    }

    addGeneralStrategies() {
        this.strategies.push({
            title: '建立数据驱动的实验文化 Build Data-Driven Experimentation Culture',
            framework: 'All AARRR',
            priority: 'medium',
            description: '无论处于哪个阶段，最重要的是建立快速测试和学习的能力。Regardless of stage, most important is building ability to test and learn quickly.',
            tactics: [
                '设定清晰的北极星指标 Set clear North Star metric',
                '每周运行2-3个增长实验 Run 2-3 growth experiments per week',
                '使用实验框架（假设-测试-学习）Use experiment framework (hypothesis-test-learn)',
                '记录所有实验结果，成功和失败都有价值 Document all experiment results, both successes and failures',
                '优先测试高影响、低成本的实验 Prioritize high-impact, low-cost experiments'
            ],
            expectedResults: '建立持续改进的增长引擎 Build continuous improvement growth engine',
            pros: [
                '降低决策风险 Reduces decision risk',
                '发现意外的增长机会 Discovers unexpected growth opportunities',
                '团队学习增长技能 Team learns growth skills'
            ],
            cons: [
                '需要足够流量才能快速验证 Needs sufficient traffic for quick validation',
                '需要团队有实验思维 Requires team to have experimentation mindset'
            ],
            timeframe: '持续进行 Ongoing',
            budget: '主要是时间投入 Mainly time investment'
        });
    }

    generateRecommendation() {
        const topStrategy = this.strategies[0];
        const contextualAdvice = this.getContextualAdvice();

        return {
            topStrategy: topStrategy.title,
            reasoning: this.getRecommendationReasoning(),
            implementationSteps: this.getImplementationSteps(topStrategy),
            contextualAdvice: contextualAdvice,
            nextSteps: this.getNextSteps()
        };
    }

    getRecommendationReasoning() {
        let reasoning = '';

        if (this.primaryProblem === 'retention' && this.users < 10000) {
            reasoning = `虽然你提到的核心挑战是留存问题，但在${this.users}用户规模下，解决留存比盲目获取新用户更重要。先让现有用户满意并持续使用，再扩大获取规模。While your core challenge is retention, at ${this.users} user scale, fixing retention is more important than blindly acquiring new users. Satisfy and retain current users first, then scale acquisition.`;
        } else if (this.primaryProblem === 'acquisition' && this.challenge.includes('churn')) {
            reasoning = `注意：虽然你想要更多用户，但提到的挑战中有流失问题。建议先确保现有用户留存健康（>40% 7天留存），再加大获取投入。Warning: While you want more users, your challenge mentions churn. Suggest ensuring healthy retention (>40% 7-day) before scaling acquisition.`;
        } else if (this.users > 50000 && this.revenue === '') {
            reasoning = `你已有${this.users}用户但未提供收入数据。这个规模应该开始认真考虑变现，否则增长是不可持续的。You have ${this.users} users but no revenue data provided. At this scale, should seriously consider monetization, otherwise growth is unsustainable.`;
        } else {
            reasoning = `基于你的场景（${this.industry}行业，${this.stage}阶段），这个策略最直接地解决你提到的"${this.challenge.substring(0, 60)}..."挑战。Based on your scenario (${this.industry} industry, ${this.stage} stage), this strategy most directly addresses your "${this.challenge.substring(0, 60)}..." challenge.`;
        }

        return reasoning;
    }

    getImplementationSteps(strategy) {
        return [
            `第1周：分析当前数据，设定基线指标 Week 1: Analyze current data, set baseline metrics`,
            `第2周：设计和开发解决方案（或准备测试）Week 2: Design and develop solution (or prepare test)`,
            `第3周：小规模测试（10-20%用户）Week 3: Small-scale test (10-20% users)`,
            `第4周：收集数据，分析结果 Week 4: Collect data, analyze results`,
            `第5-6周：如果有效则扩大至全部用户；如果无效则尝试下一个策略 Week 5-6: If effective, scale to all users; if not, try next strategy`
        ];
    }

    getContextualAdvice() {
        const advice = [];

        if (this.users < 100) {
            advice.push('⚠️ 你还处于非常早期阶段。在这个阶段，最重要的是验证产品价值，而不是增长黑客技巧。确保前10-50个用户真正喜欢你的产品。You\'re still very early stage. Most important now is validating product value, not growth hacks. Ensure first 10-50 users truly love your product.');
        }

        if (this.industry === 'marketplace' && this.users < 1000) {
            advice.push('📍 市场平台在早期不要追求快速增长。专注于一个小市场建立高密度的供需匹配。Uber和Airbnb都是从一个城市开始的。Marketplaces shouldn\'t pursue rapid growth early. Focus on building dense supply-demand in one small market. Uber and Airbnb both started with one city.');
        }

        if (this.challenge.includes('流失') || this.challenge.includes('churn')) {
            advice.push('⚠️ 流失问题通常说明产品还没找到Product-Market Fit。在解决这个根本问题前，增长策略的效果会很有限。Churn usually indicates lack of Product-Market Fit. Growth strategies will have limited effect before solving this fundamental issue.');
        }

        return advice;
    }

    getNextSteps() {
        return [
            '🎯 明确定义成功指标（如：7天留存从25%提升到35%）Clearly define success metrics (e.g., 7-day retention from 25% to 35%)',
            '📅 设定2-4周的测试周期 Set 2-4 week test period',
            '📊 建立数据跟踪和分析系统 Set up data tracking and analysis',
            '👥 分配责任人和资源 Assign owners and resources',
            '🔄 每周review进展，快速调整 Weekly progress review, rapid adjustment'
        ];
    }
}

// Export for use in HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StrategyEngine;
}
