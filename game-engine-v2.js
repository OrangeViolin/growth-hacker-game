// Growth Hacker Game Engine V2 - With Interactive Decisions
// 增长黑客游戏引擎 V2 - 交互式决策版本

class GrowthGameEngineV2 {
    constructor(config) {
        this.mode = config.mode; // 'real' or 'ai'
        this.difficulty = config.difficulty || 'medium'; // 'easy', 'medium', 'hard'
        this.company = config.company || this.generateCompany();
        this.industry = config.industry || this.generateIndustry();

        // Difficulty settings
        this.difficultySettings = {
            easy: {
                budget: 10000,
                timeLimit: 30, // weeks
                randomEventChance: 0.2,
                aiAdvisorUses: 10,
                competitionLevel: 'low',
                marketGrowth: 1.2
            },
            medium: {
                budget: 5000,
                timeLimit: 24,
                randomEventChance: 0.4,
                aiAdvisorUses: 5,
                competitionLevel: 'medium',
                marketGrowth: 1.0
            },
            hard: {
                budget: 3000,
                timeLimit: 20,
                randomEventChance: 0.6,
                aiAdvisorUses: 3,
                competitionLevel: 'high',
                marketGrowth: 0.8
            }
        };

        const settings = this.difficultySettings[this.difficulty];

        // Initialize resources
        this.metrics = {
            users: config.initialUsers || this.generateInitialUsers(),
            revenue: config.initialRevenue || 0,
            budget: settings.budget,
            teamEnergy: 100, // Team morale and energy
            retention7d: 25,
            activation: 30,
            viralCoefficient: 0.3,
            nps: 20,
            marketShare: 5 // percentage
        };

        this.aiAdvisorUses = settings.aiAdvisorUses;
        this.weeksRemaining = settings.timeLimit;
        this.currentLevel = 0;
        this.completedLevels = [];
        this.skillsUsed = [];
        this.achievements = [];
        this.decisions = [];
        this.randomEvents = [];

        // Track history
        this.history = [{ ...this.metrics }];
        this.currentWeek = 0;

        // Competition tracking
        this.competition = {
            level: settings.competitionLevel,
            users: Math.floor(this.metrics.users * 2),
            growthRate: 0.15
        };
    }

    generateCompany() {
        const names = ['TechFlow', 'GrowthHub', 'DataDrive', 'UserBoost', 'MetricPro', 'ScaleUp', 'Momentum', 'Velocity'];
        return names[Math.floor(Math.random() * names.length)];
    }

    generateIndustry() {
        const industries = ['saas', 'ecommerce', 'social', 'education', 'fintech', 'marketplace'];
        return industries[Math.floor(Math.random() * industries.length)];
    }

    generateInitialUsers() {
        if (this.difficulty === 'easy') return Math.floor(Math.random() * 5000) + 5000; // 5K-10K
        if (this.difficulty === 'medium') return Math.floor(Math.random() * 3000) + 2000; // 2K-5K
        return Math.floor(Math.random() * 1000) + 500; // 500-1500
    }

    // Get current level with decisions
    getCurrentLevel() {
        const level = this.levels[this.currentLevel];
        if (!level) return null;
        return level;
    }

    // Main method: Get decision sequence for a skill
    getSkillDecisions(skillIndex) {
        const level = this.getCurrentLevel();
        const skill = level.skills[skillIndex];

        if (!skill) return null;

        // Generate decision sequence based on skill type
        return this.generateDecisionSequence(skill);
    }

    generateDecisionSequence(skill) {
        const decisions = [];

        // Each skill has 3-5 decision points
        switch(skill.name) {
            case 'Product Hunt发布':
                decisions.push(
                    {
                        question: '选择发布时间 Choose Launch Timing',
                        description: 'Product Hunt的流量在不同时间差异很大 Traffic varies significantly by time',
                        options: [
                            {
                                text: '周二上午 Tuesday Morning',
                                impact: { effectiveness: 1.3, cost: 0 },
                                explanation: '周二流量最高，竞争也最激烈 Highest traffic but most competitive'
                            },
                            {
                                text: '周三上午 Wednesday Morning',
                                impact: { effectiveness: 1.2, cost: 0 },
                                explanation: '平衡的选择，流量和竞争都适中 Balanced choice'
                            },
                            {
                                text: '周五下午 Friday Afternoon',
                                impact: { effectiveness: 0.7, cost: 0 },
                                explanation: '流量低，但竞争少 Lower traffic but less competition'
                            }
                        ]
                    },
                    {
                        question: '准备什么素材？ What materials to prepare?',
                        description: '好的展示材料能提高转化率 Good materials improve conversion',
                        options: [
                            {
                                text: '专业演示视频 Professional demo video',
                                impact: { effectiveness: 1.4, cost: 300 },
                                explanation: '最吸引眼球，但成本高 Most eye-catching but costly'
                            },
                            {
                                text: '精美截图+GIF Screenshot + GIF',
                                impact: { effectiveness: 1.1, cost: 100 },
                                explanation: '性价比高的选择 Cost-effective choice'
                            },
                            {
                                text: '纯文字描述 Text only',
                                impact: { effectiveness: 0.6, cost: 0 },
                                explanation: '省钱但效果差 Saves money but poor results'
                            }
                        ]
                    },
                    {
                        question: '社区预热策略？ Community warm-up strategy?',
                        description: '提前在社区造势可以提高发布效果 Pre-launch buzz improves results',
                        options: [
                            {
                                text: '提前2周在Twitter/Reddit预热 2-week Twitter/Reddit warm-up',
                                impact: { effectiveness: 1.3, cost: 200, teamEnergy: -10 },
                                explanation: '需要时间精力，但能建立期待 Takes time but builds anticipation'
                            },
                            {
                                text: '发布当天邀请朋友支持 Invite friends on launch day',
                                impact: { effectiveness: 1.1, cost: 50, teamEnergy: -5 },
                                explanation: '快速且低成本 Quick and low cost'
                            },
                            {
                                text: '不做预热，直接发布 No warm-up, direct launch',
                                impact: { effectiveness: 0.8, cost: 0, teamEnergy: 0 },
                                explanation: '省时但效果可能一般 Saves time but may underperform'
                            }
                        ]
                    }
                );
                break;

            case '内容营销+SEO':
                decisions.push(
                    {
                        question: '内容主题方向？ Content theme direction?',
                        description: '选择正确的主题能吸引目标用户 Right theme attracts target users',
                        options: [
                            {
                                text: '行业痛点解决方案 Industry pain point solutions',
                                impact: { effectiveness: 1.4, cost: 0 },
                                explanation: '高度相关，转化率高 Highly relevant, high conversion'
                            },
                            {
                                text: '产品使用教程 Product tutorials',
                                impact: { effectiveness: 1.1, cost: 0 },
                                explanation: '帮助用户上手，激活率提升 Helps activation'
                            },
                            {
                                text: '行业新闻评论 Industry news commentary',
                                impact: { effectiveness: 0.9, cost: 0 },
                                explanation: '流量大但转化低 High traffic but low conversion'
                            }
                        ]
                    },
                    {
                        question: 'SEO策略？ SEO Strategy?',
                        description: '不同的SEO策略有不同的时间成本 Different strategies have different timelines',
                        options: [
                            {
                                text: '长尾关键词快速排名 Long-tail keywords for quick ranking',
                                impact: { effectiveness: 1.0, cost: 500, weeks: 3 },
                                explanation: '3周见效，流量稳定 Results in 3 weeks, steady traffic'
                            },
                            {
                                text: '竞争性关键词慢速积累 Competitive keywords slow build',
                                impact: { effectiveness: 1.5, cost: 800, weeks: 6 },
                                explanation: '6周见效，但流量潜力大 6 weeks, higher traffic potential'
                            },
                            {
                                text: '不做SEO优化 No SEO optimization',
                                impact: { effectiveness: 0.5, cost: 200, weeks: 2 },
                                explanation: '快但效果有限 Fast but limited effect'
                            }
                        ]
                    },
                    {
                        question: '内容发布频率？ Publishing frequency?',
                        description: '频率影响SEO效果和团队负担 Frequency affects SEO and team load',
                        options: [
                            {
                                text: '每周3篇高质量 3 high-quality posts/week',
                                impact: { effectiveness: 1.3, cost: 1200, teamEnergy: -15 },
                                explanation: 'SEO效果最佳但团队压力大 Best for SEO but high team stress'
                            },
                            {
                                text: '每周1篇精品 1 premium post/week',
                                impact: { effectiveness: 1.0, cost: 600, teamEnergy: -5 },
                                explanation: '平衡的选择 Balanced approach'
                            },
                            {
                                text: '每月2篇 2 posts/month',
                                impact: { effectiveness: 0.7, cost: 300, teamEnergy: 0 },
                                explanation: '轻松但效果打折 Easy but reduced impact'
                            }
                        ]
                    }
                );
                break;

            case '社交媒体广告':
                decisions.push(
                    {
                        question: '选择广告平台？ Choose ad platform?',
                        description: '不同平台适合不同产品和受众 Different platforms suit different products',
                        options: [
                            {
                                text: 'Facebook/Instagram (B2C)',
                                impact: { effectiveness: this.industry === 'ecommerce' || this.industry === 'social' ? 1.4 : 1.0, cost: 0 },
                                explanation: this.industry === 'ecommerce' ? '最适合电商 Perfect for e-commerce' : '一般适合 Generally suitable'
                            },
                            {
                                text: 'LinkedIn (B2B)',
                                impact: { effectiveness: this.industry === 'saas' || this.industry === 'fintech' ? 1.4 : 0.8, cost: 0 },
                                explanation: this.industry === 'saas' ? '最适合SaaS Perfect for SaaS' : 'B2C效果一般 Mediocre for B2C'
                            },
                            {
                                text: 'TikTok (年轻用户 Young users)',
                                impact: { effectiveness: this.industry === 'social' || this.industry === 'education' ? 1.3 : 0.9, cost: 0 },
                                explanation: 'Z世代聚集地 Gen Z hub'
                            }
                        ]
                    },
                    {
                        question: '受众定向策略？ Audience targeting?',
                        description: '精准定向提高ROI Precise targeting improves ROI',
                        options: [
                            {
                                text: '精准定向（兴趣+行为）Precise (interests + behaviors)',
                                impact: { effectiveness: 1.3, cost: 0, cpc: 1.2 },
                                explanation: '点击贵但转化高 Expensive clicks but high conversion'
                            },
                            {
                                text: '宽泛定向（demographics only）',
                                impact: { effectiveness: 0.9, cost: 0, cpc: 0.8 },
                                explanation: '点击便宜但转化低 Cheap clicks but low conversion'
                            },
                            {
                                text: 'Lookalike受众 Lookalike audience',
                                impact: { effectiveness: 1.4, cost: 0, cpc: 1.0 },
                                explanation: '需要已有数据，但效果最好 Needs existing data, best results'
                            }
                        ]
                    },
                    {
                        question: '预算分配策略？ Budget allocation?',
                        description: '不同策略风险和回报不同 Different risk-reward profiles',
                        options: [
                            {
                                text: '保守：80%测试 20%扩量 Conservative: 80% test 20% scale',
                                impact: { effectiveness: 0.9, risk: 0.3 },
                                explanation: '安全但增长慢 Safe but slow growth'
                            },
                            {
                                text: '平衡：50%测试 50%扩量 Balanced: 50-50',
                                impact: { effectiveness: 1.1, risk: 0.5 },
                                explanation: '平衡风险和回报 Balanced risk-reward'
                            },
                            {
                                text: '激进：20%测试 80%扩量 Aggressive: 20% test 80% scale',
                                impact: { effectiveness: 1.3, risk: 0.8 },
                                explanation: '高风险高回报 High risk high reward'
                            }
                        ]
                    },
                    {
                        question: '创意类型？ Creative type?',
                        description: '创意影响点击率和转化率 Creative affects CTR and conversion',
                        options: [
                            {
                                text: '短视频（15秒）Short video (15s)',
                                impact: { effectiveness: 1.4, cost: 500 },
                                explanation: '最吸引注意力 Most engaging'
                            },
                            {
                                text: '轮播图（3-5张）Carousel (3-5 images)',
                                impact: { effectiveness: 1.2, cost: 200 },
                                explanation: '展示多个卖点 Show multiple benefits'
                            },
                            {
                                text: '单图广告 Single image ad',
                                impact: { effectiveness: 1.0, cost: 100 },
                                explanation: '简单快速 Simple and quick'
                            }
                        ]
                    }
                );
                break;

            case '打卡系统+游戏化':
                decisions.push(
                    {
                        question: '奖励机制设计？ Reward mechanism?',
                        description: '不同奖励吸引不同用户 Different rewards attract different users',
                        options: [
                            {
                                text: '虚拟徽章+排行榜 Virtual badges + leaderboard',
                                impact: { effectiveness: 1.2, cost: 200 },
                                explanation: '激发竞争心理 Triggers competitive psychology'
                            },
                            {
                                text: '解锁高级功能 Unlock premium features',
                                impact: { effectiveness: 1.4, cost: 0, revenueImpact: -0.1 },
                                explanation: '强激励但影响收入 Strong incentive but hurts revenue'
                            },
                            {
                                text: '积分换礼品 Points for gifts',
                                impact: { effectiveness: 1.3, cost: 800 },
                                explanation: '实物激励，成本高 Physical rewards, costly'
                            }
                        ]
                    },
                    {
                        question: '打卡目标设定？ Streak goal setting?',
                        description: '目标太难会让用户放弃 Too difficult discourages users',
                        options: [
                            {
                                text: '连续3天获得奖励 3-day streak for reward',
                                impact: { effectiveness: 1.3, cost: 0 },
                                explanation: '门槛低，参与度高 Low barrier, high participation'
                            },
                            {
                                text: '连续7天获得奖励 7-day streak',
                                impact: { effectiveness: 1.1, cost: 0 },
                                explanation: '适中的挑战 Moderate challenge'
                            },
                            {
                                text: '连续30天获得奖励 30-day streak',
                                impact: { effectiveness: 0.8, cost: 0 },
                                explanation: '太难，多数人放弃 Too hard, most give up'
                            }
                        ]
                    },
                    {
                        question: '通知策略？ Notification strategy?',
                        description: '提醒频率影响用户体验 Reminder frequency affects UX',
                        options: [
                            {
                                text: '每天固定时间提醒 Daily fixed-time reminder',
                                impact: { effectiveness: 1.2, cost: 100 },
                                explanation: '培养习惯 Builds habits'
                            },
                            {
                                text: '只在快断连时提醒 Only when streak at risk',
                                impact: { effectiveness: 1.4, cost: 150 },
                                explanation: '智能且不打扰 Smart and non-intrusive'
                            },
                            {
                                text: '不发通知 No notifications',
                                impact: { effectiveness: 0.7, cost: 0 },
                                explanation: '尊重用户但效果差 Respectful but poor results'
                            }
                        ]
                    }
                );
                break;

            // 为其他技能添加类似的决策序列...
            default:
                // 通用决策模板
                decisions.push(
                    {
                        question: '执行力度？ Execution intensity?',
                        description: '投入更多资源能提高效果 More resources improve results',
                        options: [
                            {
                                text: '全力以赴 Full commitment',
                                impact: { effectiveness: 1.3, cost: skill.cost * 0.5, teamEnergy: -15 },
                                explanation: '最大化效果但团队压力大 Maximize results but high team stress'
                            },
                            {
                                text: '标准执行 Standard execution',
                                impact: { effectiveness: 1.0, cost: 0, teamEnergy: -5 },
                                explanation: '平衡的approach Balanced approach'
                            },
                            {
                                text: '试探性尝试 Tentative attempt',
                                impact: { effectiveness: 0.7, cost: -skill.cost * 0.3, teamEnergy: 0 },
                                explanation: '省资源但效果打折 Save resources but reduced impact'
                            }
                        ]
                    },
                    {
                        question: '时间投入？ Time investment?',
                        description: '快速执行vs精细打磨 Speed vs quality',
                        options: [
                            {
                                text: '快速上线（1周）Quick launch (1 week)',
                                impact: { effectiveness: 0.8, weeks: 1 },
                                explanation: '抢时间但可能有瑕疵 Fast but may have flaws'
                            },
                            {
                                text: '正常节奏（2-3周）Normal pace (2-3 weeks)',
                                impact: { effectiveness: 1.0, weeks: 2 },
                                explanation: '平衡速度和质量 Balance speed and quality'
                            },
                            {
                                text: '精细打磨（4周+）Polish (4+ weeks)',
                                impact: { effectiveness: 1.2, weeks: 4 },
                                explanation: '追求完美但耗时 Perfect but time-consuming'
                            }
                        ]
                    }
                );
        }

        return decisions;
    }

    // Execute skill with user's decision path
    executeSkillWithDecisions(skillIndex, decisionChoices) {
        const level = this.getCurrentLevel();
        const skill = level.skills[skillIndex];

        if (!skill) {
            return { success: false, feedback: 'Invalid skill' };
        }

        // Calculate total impact based on decisions
        let totalEffectiveness = skill.effectiveness || 1.0;
        let totalCost = skill.cost;
        let totalWeeks = 2; // default
        let teamEnergyChange = -10; // default
        let riskLevel = 0.3; // default
        let additionalEffects = {};

        // Apply decision impacts
        decisionChoices.forEach(choice => {
            if (choice.impact.effectiveness) {
                totalEffectiveness *= choice.impact.effectiveness;
            }
            if (choice.impact.cost !== undefined) {
                totalCost += choice.impact.cost;
            }
            if (choice.impact.weeks) {
                totalWeeks = choice.impact.weeks;
            }
            if (choice.impact.teamEnergy) {
                teamEnergyChange += choice.impact.teamEnergy;
            }
            if (choice.impact.risk) {
                riskLevel = choice.impact.risk;
            }
            if (choice.impact.revenueImpact) {
                additionalEffects.revenueMultiplier = 1 + choice.impact.revenueImpact;
            }
        });

        // Check if enough budget
        if (this.metrics.budget < totalCost) {
            return {
                success: false,
                feedback: `预算不足！需要 $${totalCost}，但只有 $${this.metrics.budget}。Insufficient budget! Need $${totalCost} but only have $${this.metrics.budget}.`
            };
        }

        // Check team energy
        if (this.metrics.teamEnergy < 20 && teamEnergyChange < 0) {
            return {
                success: false,
                feedback: '团队精力不足，需要休息！考虑选择压力较小的策略。Team exhausted! Consider less stressful strategies.',
                warning: true
            };
        }

        // Random event check (based on difficulty)
        const randomEvent = this.triggerRandomEvent(riskLevel);

        // Calculate results
        const baseUserGrowth = this.calculateUserGrowth(skill, totalEffectiveness);
        const result = this.calculateFinalResults(skill, totalEffectiveness, randomEvent, additionalEffects);

        // Apply changes
        this.metrics.users += result.userChange;
        this.metrics.revenue += result.revenueChange;
        this.metrics.budget -= totalCost;
        this.metrics.teamEnergy = Math.max(0, Math.min(100, this.metrics.teamEnergy + teamEnergyChange));

        if (result.retentionChange) this.metrics.retention7d += result.retentionChange;
        if (result.activationChange) this.metrics.activation += result.activationChange;
        if (result.viralChange) this.metrics.viralCoefficient += result.viralChange;
        if (result.npsChange) this.metrics.nps += result.npsChange;

        this.currentWeek += totalWeeks;
        this.weeksRemaining -= totalWeeks;

        // Competition grows
        this.competition.users = Math.floor(this.competition.users * (1 + this.competition.growthRate * (totalWeeks / 4)));

        // Record decision
        this.decisions.push({
            level: level.levelNumber,
            skill: skill.name,
            choices: decisionChoices,
            result: result,
            week: this.currentWeek
        });

        if (randomEvent) {
            this.randomEvents.push(randomEvent);
        }

        // Save history
        this.history.push({ ...this.metrics });

        // Record skill usage
        this.skillsUsed.push({
            level: level.levelNumber,
            skill: skill.name,
            week: this.currentWeek,
            aarrr: skill.aarrr,
            effectiveness: totalEffectiveness
        });

        // Check achievements
        const achievement = this.checkAchievements(result);

        // Move to next level
        this.completedLevels.push(level.levelNumber);
        this.currentLevel++;

        return {
            success: result.userChange > 0,
            result: result,
            randomEvent: randomEvent,
            achievement: achievement,
            feedback: this.generateFeedback(skill, result, randomEvent, decisionChoices),
            changes: this.getMetricChanges(result, totalCost, teamEnergyChange, totalWeeks)
        };
    }

    calculateUserGrowth(skill, effectiveness) {
        const baseGrowth = this.metrics.users * 0.15; // 15% base growth
        return Math.floor(baseGrowth * effectiveness);
    }

    calculateFinalResults(skill, effectiveness, randomEvent, additionalEffects) {
        let userChange = this.calculateUserGrowth(skill, effectiveness);
        let revenueChange = 0;
        let retentionChange = 0;
        let activationChange = 0;
        let viralChange = 0;
        let npsChange = 0;

        // Skill-specific effects
        switch(skill.aarrr) {
            case 'Acquisition':
                // Acquisition skills mainly add users
                break;
            case 'Activation':
                activationChange = Math.floor(10 * effectiveness);
                retentionChange = Math.floor(5 * effectiveness);
                break;
            case 'Retention':
                retentionChange = Math.floor(12 * effectiveness);
                npsChange = Math.floor(8 * effectiveness);
                break;
            case 'Revenue':
                const conversionRate = 0.05;
                const avgPrice = 49;
                revenueChange = Math.floor(this.metrics.users * conversionRate * avgPrice * effectiveness);
                break;
            case 'Referral':
                viralChange = 0.2 * effectiveness;
                userChange = Math.floor(userChange * 1.5); // Viral effects compound
                npsChange = Math.floor(10 * effectiveness);
                break;
        }

        // Apply additional effects
        if (additionalEffects.revenueMultiplier) {
            revenueChange = Math.floor(revenueChange * additionalEffects.revenueMultiplier);
        }

        // Apply random event effects
        if (randomEvent) {
            userChange = Math.floor(userChange * randomEvent.userMultiplier);
            revenueChange = Math.floor(revenueChange * randomEvent.revenueMultiplier);
            if (randomEvent.budgetChange) {
                // Will be applied separately
            }
        }

        return {
            userChange,
            revenueChange,
            retentionChange,
            activationChange,
            viralChange,
            npsChange
        };
    }

    triggerRandomEvent(riskLevel) {
        const settings = this.difficultySettings[this.difficulty];
        const eventChance = settings.randomEventChance * riskLevel;

        if (Math.random() > eventChance) {
            return null; // No event
        }

        const events = [
            // Positive events
            {
                type: 'positive',
                title: '🎉 意外的媒体曝光 Unexpected Media Coverage',
                description: 'TechCrunch注意到了你的产品并写了一篇正面报道！TechCrunch noticed your product and wrote a positive article!',
                userMultiplier: 1.5,
                revenueMultiplier: 1.2,
                probability: 0.15
            },
            {
                type: 'positive',
                title: '🤝 战略合作机会 Strategic Partnership',
                description: '一家大公司主动联系，希望合作推广 A major company reached out for partnership',
                userMultiplier: 1.3,
                revenueMultiplier: 1.4,
                probability: 0.1
            },
            {
                type: 'positive',
                title: '📈 市场趋势利好 Favorable Market Trend',
                description: '行业整体向好，所有玩家都受益 Industry boom benefits all players',
                userMultiplier: 1.2,
                revenueMultiplier: 1.2,
                probability: 0.2
            },

            // Negative events
            {
                type: 'negative',
                title: '⚠️ 竞争对手降价 Competitor Price War',
                description: '主要竞争对手突然降价50%，抢走了部分用户 Main competitor slashed prices by 50%',
                userMultiplier: 0.7,
                revenueMultiplier: 0.8,
                probability: 0.15
            },
            {
                type: 'negative',
                title: '🐛 技术故障 Technical Outage',
                description: '服务器宕机2天，影响了用户体验 Server down for 2 days, hurt user experience',
                userMultiplier: 0.6,
                revenueMultiplier: 0.9,
                npsImpact: -15,
                probability: 0.1
            },
            {
                type: 'negative',
                title: '😠 负面评价 Negative Reviews',
                description: '一些用户在社交媒体上抱怨，影响了口碑 Users complained on social media',
                userMultiplier: 0.8,
                revenueMultiplier: 1.0,
                npsImpact: -10,
                probability: 0.15
            },
            {
                type: 'negative',
                title: '💼 核心团队成员离职 Key Team Member Left',
                description: '一位核心成员意外离职，团队士气受影响 A key member unexpectedly left',
                userMultiplier: 0.9,
                revenueMultiplier: 1.0,
                teamEnergyImpact: -20,
                probability: 0.1
            },

            // Neutral/Challenge events
            {
                type: 'challenge',
                title: '🎯 病毒传播机会 Viral Opportunity',
                description: '有机会上热搜，但需要额外$500推广费 Chance to go viral but needs $500 extra budget',
                choice: true,
                costIfAccept: 500,
                userMultiplierIfAccept: 2.0,
                userMultiplierIfDecline: 1.0,
                probability: 0.1
            }
        ];

        // Weighted random selection
        const totalProb = events.reduce((sum, e) => sum + e.probability, 0);
        let random = Math.random() * totalProb;

        for (let event of events) {
            random -= event.probability;
            if (random <= 0) {
                return event;
            }
        }

        return null;
    }

    checkAchievements(result) {
        // Check for various achievements
        if (this.metrics.users >= 10000 && !this.achievements.find(a => a.id === 'users_10k')) {
            const achievement = {
                id: 'users_10k',
                title: '🎯 万人用户',
                description: '用户数突破10,000！'
            };
            this.achievements.push(achievement);
            return achievement;
        }

        if (this.metrics.retention7d >= 50 && !this.achievements.find(a => a.id === 'retention_king')) {
            const achievement = {
                title: '💪 留存之王',
                description: '7日留存率突破50%！'
            };
            this.achievements.push(achievement);
            return achievement;
        }

        if (this.metrics.viralCoefficient >= 1.0 && !this.achievements.find(a => a.id === 'viral_growth')) {
            const achievement = {
                title: '🚀 病毒增长',
                description: '病毒系数突破1.0，实现自增长！'
            };
            this.achievements.push(achievement);
            return achievement;
        }

        if (this.metrics.revenue >= 10000 && !this.achievements.find(a => a.id === 'revenue_10k')) {
            const achievement = {
                title: '💵 万元月收入',
                description: '月收入突破$10,000！'
            };
            this.achievements.push(achievement);
            return achievement;
        }

        if (this.metrics.teamEnergy <= 20 && !this.achievements.find(a => a.id === 'burnout_survivor')) {
            const achievement = {
                title: '🔥 压力幸存者',
                description: '团队精力降到20%以下但坚持了下来！'
            };
            this.achievements.push(achievement);
            return achievement;
        }

        return null;
    }

    generateFeedback(skill, result, randomEvent, decisionChoices) {
        let feedback = '';

        // Skill execution feedback
        if (result.userChange > 0) {
            feedback += `✅ 策略执行成功！ Strategy executed successfully!\n\n`;
        } else {
            feedback += `⚠️ 策略效果不理想 Strategy underperformed\n\n`;
        }

        // Decision-specific feedback
        feedback += `基于你的决策：Based on your decisions:\n`;
        decisionChoices.forEach((choice, i) => {
            feedback += `${i+1}. ${choice.text} - ${choice.explanation}\n`;
        });
        feedback += `\n`;

        // Results
        if (result.userChange > 0) {
            feedback += `📈 新增用户 ${result.userChange}人\n`;
        }
        if (result.revenueChange > 0) {
            feedback += `💰 收入增加 $${result.revenueChange}\n`;
        }
        if (result.retentionChange > 0) {
            feedback += `📊 留存率提升 ${result.retentionChange}%\n`;
        }

        // Random event
        if (randomEvent) {
            feedback += `\n🎲 随机事件：${randomEvent.title}\n${randomEvent.description}\n`;
        }

        // Competition update
        feedback += `\n⚔️ 竞争动态：竞争对手现有 ${this.competition.users.toLocaleString()} 用户（你有 ${this.metrics.users.toLocaleString()}）\n`;

        return feedback;
    }

    getMetricChanges(result, cost, teamEnergyChange, weeks) {
        return [
            { label: '用户数 Users', newValue: this.metrics.users, delta: result.userChange, unit: '' },
            { label: '月收入 MRR', newValue: '$' + this.metrics.revenue, delta: result.revenueChange, unit: '$' },
            { label: '预算 Budget', newValue: '$' + this.metrics.budget, delta: -cost, unit: '$' },
            { label: '团队精力 Team Energy', newValue: this.metrics.teamEnergy + '%', delta: teamEnergyChange, unit: '%' },
            { label: '耗时 Weeks', newValue: weeks + '周', delta: weeks, unit: 'weeks' }
        ];
    }

    // AI Advisor functionality
    useAIAdvisor(context) {
        if (this.aiAdvisorUses <= 0) {
            return {
                available: false,
                message: 'AI顾问次数已用完！ No AI advisor uses remaining!'
            };
        }

        this.aiAdvisorUses--;

        // Generate advice based on current situation
        const advice = this.generateAIAdvice(context);

        return {
            available: true,
            remaining: this.aiAdvisorUses,
            advice: advice
        };
    }

    generateAIAdvice(context) {
        let advice = '🤖 AI顾问建议：\n\n';

        // Analyze current metrics
        if (this.metrics.teamEnergy < 30) {
            advice += '⚠️ 团队精力低！建议选择压力较小的策略，或暂时休整。\n';
        }

        if (this.metrics.budget < 2000) {
            advice += '💰 预算紧张！优先选择ROI高、成本低的策略。\n';
        }

        if (this.metrics.retention7d < 30) {
            advice += '📊 留存率低是当前最大问题，应优先解决再扩大获取。\n';
        }

        if (this.competition.users > this.metrics.users * 2) {
            advice += '⚔️ 竞争对手领先明显，考虑差异化策略而非正面竞争。\n';
        }

        // Decision-specific advice
        if (context.decisionIndex === 0) {
            advice += '\n对于第一个决策，建议：\n';
            advice += '- 考虑你的目标受众活跃时间\n';
            advice += '- 平衡效果和成本\n';
        }

        if (this.difficulty === 'hard') {
            advice += '\n⚠️ 困难模式下，每个决策都很关键，建议谨慎选择。\n';
        }

        return advice;
    }

    getMetrics() {
        return [
            {
                label: '用户数 Users',
                value: this.metrics.users.toLocaleString(),
                change: this.history.length > 1 ? this.metrics.users - this.history[this.history.length - 2].users : 0
            },
            {
                label: '月收入 MRR',
                value: '$' + this.metrics.revenue.toLocaleString(),
                change: this.history.length > 1 ? this.metrics.revenue - this.history[this.history.length - 2].revenue : 0
            },
            {
                label: '预算 Budget',
                value: '$' + this.metrics.budget.toLocaleString(),
                change: this.history.length > 1 ? this.metrics.budget - this.history[this.history.length - 2].budget : 0
            },
            {
                label: '团队精力 Team Energy',
                value: this.metrics.teamEnergy + '%',
                change: this.history.length > 1 ? this.metrics.teamEnergy - this.history[this.history.length - 2].teamEnergy : 0
            },
            {
                label: '剩余时间 Time Left',
                value: this.weeksRemaining + '周',
                change: 0
            },
            {
                label: 'AI顾问 AI Advisor',
                value: this.aiAdvisorUses + '次',
                change: 0
            }
        ];
    }

    isGameComplete() {
        return this.currentLevel >= 6 || this.weeksRemaining <= 0;
    }

    // Initialize levels (simplified version, will use same structure as V1)
    get levels() {
        // Reuse levels from V1 but they will use the new decision system
        if (!this._levels) {
            this._levels = [
                // ... (use the same level structure as growth-game-engine.js)
                // But the execution will go through the new decision system
            ];
        }
        return this._levels;
    }
}

// Export
if (typeof window !== 'undefined') {
    window.GrowthGameEngineV2 = GrowthGameEngineV2;
}
