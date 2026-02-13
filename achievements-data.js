// Growth Hacker Game - Achievements System
// 增长黑客游戏 - 成就系统
//
// 20个隐藏成就，激励玩家探索不同的增长策略

const ACHIEVEMENTS = {
    // ==================== 普通成就 (Common) ====================

    common: [
        {
            id: 'first_blood',
            rarity: 'common',
            name: {
                en: '🎯 First Blood',
                zh: '🎯 首次出击'
            },
            description: {
                en: 'Complete your first growth scenario',
                zh: '完成你的第一个增长场景'
            },
            unlockCondition: {
                type: 'scenarios_completed',
                value: 1
            },
            reward: {
                en: 'Unlocked: Scenario Analytics Dashboard',
                zh: '解锁：场景分析仪表板'
            },
            flavorText: {
                en: '"Every growth hacker starts somewhere. You just took your first step."',
                zh: '"每个增长黑客都有起点。你刚刚迈出了第一步。"'
            },
            unlockedBy: 0.85 // 85%的玩家解锁
        },

        {
            id: 'viral_moment',
            rarity: 'common',
            name: {
                en: '🚀 Viral Moment',
                zh: '🚀 病毒时刻'
            },
            description: {
                en: 'Achieve a viral coefficient >1.0',
                zh: '实现病毒系数>1.0'
            },
            unlockCondition: {
                type: 'metric_threshold',
                metric: 'viralCoefficient',
                value: 1.0,
                comparison: '>'
            },
            reward: {
                en: '+20% effectiveness for all Referral skills',
                zh: '所有推荐技能+20%效果'
            },
            flavorText: {
                en: '"When K>1, your users become your marketing team."',
                zh: '"当K>1时，你的用户成为你的营销团队。"'
            },
            unlockedBy: 0.62
        },

        {
            id: 'cash_flow_positive',
            rarity: 'common',
            name: {
                en: '💰 Cash Flow Positive',
                zh: '💰 现金流为正'
            },
            description: {
                en: 'Achieve positive unit economics (LTV > CAC × 3)',
                zh: '实现正向单位经济（LTV > CAC × 3）'
            },
            unlockCondition: {
                type: 'custom',
                check: (game) => {
                    return game.metrics.ltv > (game.metrics.cac * 3);
                }
            },
            reward: {
                en: 'Budget increase: +$10,000',
                zh: '预算增加：+10000美元'
            },
            flavorText: {
                en: '"The best growth hack is a business model that works."',
                zh: '"最好的增长黑客是一个有效的商业模式。"'
            },
            unlockedBy: 0.58
        },

        {
            id: 'retention_master',
            rarity: 'common',
            name: {
                en: '🔄 Retention Master',
                zh: '🔄 留存大师'
            },
            description: {
                en: 'Achieve 50%+ 7-day retention rate',
                zh: '实现50%+ 7日留存率'
            },
            unlockCondition: {
                type: 'metric_threshold',
                metric: 'retention7d',
                value: 50,
                comparison: '>='
            },
            reward: {
                en: 'Unlock: "Cohort Analysis" advanced metrics',
                zh: '解锁："群组分析"高级指标'
            },
            flavorText: {
                en: '"Retention is the silent killer of startups. You mastered it."',
                zh: '"留存是创业公司的沉默杀手。你掌握了它。"'
            },
            unlockedBy: 0.47
        },

        {
            id: 'product_market_fit',
            rarity: 'common',
            name: {
                en: '🎯 Product-Market Fit',
                zh: '🎯 产品市场契合'
            },
            description: {
                en: 'Reach 40%+ users who would be "very disappointed" without your product',
                zh: '达到40%+用户如果没有你的产品会"非常失望"'
            },
            unlockCondition: {
                type: 'metric_threshold',
                metric: 'pmfScore',
                value: 40,
                comparison: '>='
            },
            reward: {
                en: 'All growth tactics +15% effectiveness',
                zh: '所有增长策略+15%效果'
            },
            flavorText: {
                en: '"You can feel when product-market fit isn\'t happening. And you can feel when it is." - Marc Andreessen',
                zh: '"你能感觉到产品市场契合何时没有发生。你也能感觉到何时发生。" - Marc Andreessen'
            },
            unlockedBy: 0.39
        }
    ],

    // ==================== 稀有成就 (Rare) ====================

    rare: [
        {
            id: 'zero_budget_hero',
            rarity: 'rare',
            name: {
                en: '🦸 Zero Budget Hero',
                zh: '🦸 零预算英雄'
            },
            description: {
                en: 'Reach 10,000 users spending less than $500 total',
                zh: '总花费少于500美元达到10000用户'
            },
            unlockCondition: {
                type: 'custom',
                check: (game) => {
                    const totalSpent = game.initialBudget - game.metrics.budget;
                    return game.metrics.users >= 10000 && totalSpent < 500;
                }
            },
            reward: {
                en: 'Unlock: "Guerrilla Marketing" tactics library',
                zh: '解锁："游击营销"策略库'
            },
            flavorText: {
                en: '"Constraints breed creativity. You proved that money isn\'t everything."',
                zh: '"约束孕育创造力。你证明了钱不是一切。"'
            },
            unlockedBy: 0.23
        },

        {
            id: 'enterprise_whale',
            rarity: 'rare',
            name: {
                en: '🐋 Enterprise Whale',
                zh: '🐋 企业大客户'
            },
            description: {
                en: 'Close a single deal worth $50K+ MRR',
                zh: '关闭一笔价值5万美元+月经常性收入的交易'
            },
            unlockCondition: {
                type: 'event',
                eventType: 'deal_closed',
                minValue: 50000
            },
            reward: {
                en: 'Unlock: "B2B Sales Playbook" with enterprise tactics',
                zh: '解锁："B2B销售手册"与企业策略'
            },
            flavorText: {
                en: '"One whale can feed you for a year. But make sure you can service them."',
                zh: '"一条鲸鱼可以养活你一年。但要确保你能服务好它们。"'
            },
            unlockedBy: 0.19
        },

        {
            id: 'comeback_kid',
            rarity: 'rare',
            name: {
                en: '🔥 Comeback Kid',
                zh: '🔥 东山再起'
            },
            description: {
                en: 'Recover from losing 50%+ of users/revenue and achieve new all-time high',
                zh: '从失去50%+用户/收入中恢复并创下新的历史高点'
            },
            unlockCondition: {
                type: 'custom',
                check: (game) => {
                    // 检查历史数据中是否有过50%+的下跌然后恢复
                    if (!game.history || game.history.length < 10) return false;

                    let hadMajorDrop = false;
                    let highBeforeDrop = 0;
                    let lowPoint = Infinity;

                    for (let i = 0; i < game.history.length; i++) {
                        const current = game.history[i].users || game.history[i].revenue;
                        if (current > highBeforeDrop) highBeforeDrop = current;
                        if (current < lowPoint) lowPoint = current;

                        if (lowPoint < highBeforeDrop * 0.5) {
                            hadMajorDrop = true;
                        }
                    }

                    const currentMetric = game.metrics.users || game.metrics.revenue;
                    return hadMajorDrop && currentMetric > highBeforeDrop * 1.2;
                }
            },
            reward: {
                en: 'Unlock: "Crisis Management" skills',
                zh: '解锁："危机管理"技能'
            },
            flavorText: {
                en: '"What doesn\'t kill your startup makes it stronger. You proved it."',
                zh: '"杀不死你的创业公司让它更强大。你证明了这一点。"'
            },
            unlockedBy: 0.15
        },

        {
            id: 'aarrr_master',
            rarity: 'rare',
            name: {
                en: '📊 AARRR Pirate Master',
                zh: '📊 AARRR海盗大师'
            },
            description: {
                en: 'Use at least one skill from each AARRR category in a single scenario',
                zh: '在单个场景中使用每个AARRR类别的至少一个技能'
            },
            unlockCondition: {
                type: 'custom',
                check: (game) => {
                    const categories = new Set(game.skillsUsed.map(s => s.aarrr));
                    return categories.has('Acquisition') &&
                           categories.has('Activation') &&
                           categories.has('Retention') &&
                           categories.has('Revenue') &&
                           categories.has('Referral');
                }
            },
            reward: {
                en: 'Unlock: "Full-Funnel Dashboard" with advanced insights',
                zh: '解锁："全漏斗仪表板"与高级洞察'
            },
            flavorText: {
                en: '"You don\'t optimize one metric. You optimize the entire pirate funnel."',
                zh: '"你不是优化一个指标。你优化整个海盗漏斗。"'
            },
            unlockedBy: 0.31
        },

        {
            id: 'speed_runner',
            rarity: 'rare',
            name: {
                en: '⚡ Speed Runner',
                zh: '⚡ 速通大师'
            },
            description: {
                en: 'Complete a scenario in less than 20 weeks',
                zh: '在不到20周内完成一个场景'
            },
            unlockCondition: {
                type: 'custom',
                check: (game) => {
                    return game.scenarioCompleted && game.currentWeek < 20;
                }
            },
            reward: {
                en: 'Unlock: "Blitzscaling" aggressive growth tactics',
                zh: '解锁："闪电扩张"激进增长策略'
            },
            flavorText: {
                en: '"Move fast and break things. But you moved fast and fixed things."',
                zh: '"快速行动，打破常规。但你快速行动，修复问题。"'
            },
            unlockedBy: 0.18
        }
    ],

    // ==================== 史诗成就 (Epic) ====================

    epic: [
        {
            id: 'unicorn_founder',
            rarity: 'epic',
            name: {
                en: '🦄 Unicorn Founder',
                zh: '🦄 独角兽创始人'
            },
            description: {
                en: 'Build a company valued at $1B+ (100K users × $10K LTV)',
                zh: '建立估值10亿美元+的公司（10万用户 × 1万美元LTV）'
            },
            unlockCondition: {
                type: 'custom',
                check: (game) => {
                    const valuation = game.metrics.users * (game.metrics.ltv || 0);
                    return valuation >= 1000000000;
                }
            },
            reward: {
                en: 'Unlock: "Unicorn Club" exclusive case studies',
                zh: '解锁："独角兽俱乐部"独家案例研究'
            },
            flavorText: {
                en: '"From zero to unicorn. You joined the 1% club."',
                zh: '"从零到独角兽。你加入了1%俱乐部。"'
            },
            unlockedBy: 0.08
        },

        {
            id: 'viral_loop_architect',
            rarity: 'epic',
            name: {
                en: '♾️ Viral Loop Architect',
                zh: '♾️ 病毒循环架构师'
            },
            description: {
                en: 'Achieve viral coefficient >2.0 (exponential growth)',
                zh: '实现病毒系数>2.0（指数增长）'
            },
            unlockCondition: {
                type: 'metric_threshold',
                metric: 'viralCoefficient',
                value: 2.0,
                comparison: '>'
            },
            reward: {
                en: 'Unlock: "Viral Mechanics" advanced playbook',
                zh: '解锁："病毒机制"高级手册'
            },
            flavorText: {
                en: '"You didn\'t just go viral. You built a perpetual motion machine."',
                zh: '"你不仅仅是病毒传播。你建造了一个永动机。"'
            },
            unlockedBy: 0.06
        },

        {
            id: 'market_dominator',
            rarity: 'epic',
            name: {
                en: '👑 Market Dominator',
                zh: '👑 市场霸主'
            },
            description: {
                en: 'Achieve >70% market share in your category',
                zh: '在你的类别中实现>70%市场份额'
            },
            unlockCondition: {
                type: 'metric_threshold',
                metric: 'marketShare',
                value: 70,
                comparison: '>'
            },
            reward: {
                en: 'Unlock: "Network Effects" monopoly strategies',
                zh: '解锁："网络效应"垄断策略'
            },
            flavorText: {
                en: '"You didn\'t compete in the market. You became the market."',
                zh: '"你没有在市场中竞争。你成为了市场。"'
            },
            unlockedBy: 0.05
        },

        {
            id: 'pivot_genius',
            rarity: 'epic',
            name: {
                en: '🔄 Pivot Genius',
                zh: '🔄 转型天才'
            },
            description: {
                en: 'Successfully pivot your business model and 10x revenue',
                zh: '成功转型你的商业模式并实现收入10倍增长'
            },
            unlockCondition: {
                type: 'custom',
                check: (game) => {
                    // 检查是否使用了"pivot"类技能并且收入增长10倍
                    const hasPivoted = game.skillsUsed.some(s => s.tags && s.tags.includes('pivot'));
                    const revenueGrowth = game.history && game.history.length > 5 ?
                        game.metrics.revenue / game.history[5].revenue : 0;
                    return hasPivoted && revenueGrowth >= 10;
                }
            },
            reward: {
                en: 'Unlock: "Strategic Pivot" decision framework',
                zh: '解锁："战略转型"决策框架'
            },
            flavorText: {
                en: '"Instagram started as Burbn. Slack started as a game. You found your pivot."',
                zh: '"Instagram从Burbn开始。Slack从游戏开始。你找到了你的转型。"'
            },
            unlockedBy: 0.09
        }
    ],

    // ==================== 传说成就 (Legendary) ====================

    legendary: [
        {
            id: 'growth_hacker_legend',
            rarity: 'legendary',
            name: {
                en: '🏆 Growth Hacker Legend',
                zh: '🏆 增长黑客传奇'
            },
            description: {
                en: 'Complete all 15 scenarios with perfect scores',
                zh: '以完美分数完成所有15个场景'
            },
            unlockCondition: {
                type: 'custom',
                check: (game) => {
                    return game.completedScenarios &&
                           game.completedScenarios.length === 15 &&
                           game.completedScenarios.every(s => s.score === 'perfect');
                }
            },
            reward: {
                en: 'Unlock: "Hall of Fame" certificate + Secret scenario "Build the Next Facebook"',
                zh: '解锁："名人堂"证书 + 秘密场景"打造下一个Facebook"'
            },
            flavorText: {
                en: '"You didn\'t just learn growth hacking. You mastered it. You are the 0.1%."',
                zh: '"你不仅仅学习了增长黑客。你掌握了它。你是0.1%。"'
            },
            unlockedBy: 0.003
        },

        {
            id: 'the_sean_ellis',
            rarity: 'legendary',
            name: {
                en: '🎩 The Sean Ellis',
                zh: '🎩 肖恩·埃利斯'
            },
            description: {
                en: 'Achieve 40%+ PMF score + viral K>1.5 + LTV/CAC>5 in same scenario',
                zh: '在同一场景中实现40%+ PMF得分 + 病毒K>1.5 + LTV/CAC>5'
            },
            unlockCondition: {
                type: 'custom',
                check: (game) => {
                    return (game.metrics.pmfScore || 0) >= 40 &&
                           (game.metrics.viralCoefficient || 0) > 1.5 &&
                           (game.metrics.ltv || 0) / (game.metrics.cac || 1) > 5;
                }
            },
            reward: {
                en: 'Unlock: Personal mentorship session with a real growth expert (fictional)',
                zh: '解锁：与真实增长专家的个人指导课程（虚构）'
            },
            flavorText: {
                en: '"Sean Ellis coined \'Growth Hacking\'. You just earned the right to call yourself one."',
                zh: '"肖恩·埃利斯创造了\'增长黑客\'一词。你刚刚赢得了称自己为增长黑客的权利。"'
            },
            unlockedBy: 0.012
        },

        {
            id: 'impossible_comeback',
            rarity: 'legendary',
            name: {
                en: '🔥 The Phoenix',
                zh: '🔥 凤凰涅槃'
            },
            description: {
                en: 'Win a "Failing Startup" tier 4 scenario with less than $5K budget remaining',
                zh: '以少于5000美元剩余预算赢得"失败创业"4级场景'
            },
            unlockCondition: {
                type: 'custom',
                check: (game) => {
                    return game.scenarioCompleted &&
                           game.scenarioTier === 4 &&
                           game.scenarioId.includes('failing') &&
                           game.metrics.budget < 5000;
                }
            },
            reward: {
                en: 'Unlock: "Against All Odds" comeback strategies',
                zh: '解锁："绝地反击"逆转策略'
            },
            flavorText: {
                en: '"From the ashes of failure rose a phoenix. That phoenix is you."',
                zh: '"从失败的灰烬中升起了一只凤凰。那只凤凰就是你。"'
            },
            unlockedBy: 0.007
        },

        {
            id: 'rocket_ship',
            rarity: 'legendary',
            name: {
                en: '🚀 Rocket Ship',
                zh: '🚀 火箭飞船'
            },
            description: {
                en: 'Achieve 100% month-over-month growth for 6 consecutive months',
                zh: '连续6个月实现100%环比增长'
            },
            unlockCondition: {
                type: 'custom',
                check: (game) => {
                    if (!game.history || game.history.length < 24) return false; // 至少6个月的周数据

                    let consecutiveMonths = 0;
                    for (let i = 4; i < game.history.length; i += 4) { // 每4周 = 1个月
                        const currentMonth = game.history[i].users;
                        const previousMonth = game.history[i - 4].users;
                        const growth = (currentMonth - previousMonth) / previousMonth;

                        if (growth >= 1.0) { // 100%增长
                            consecutiveMonths++;
                            if (consecutiveMonths >= 6) return true;
                        } else {
                            consecutiveMonths = 0;
                        }
                    }
                    return false;
                }
            },
            reward: {
                en: 'Unlock: "Blitzscaling" Reid Hoffman\'s playbook',
                zh: '解锁："闪电扩张"里德·霍夫曼手册'
            },
            flavorText: {
                en: '"100% MoM for 6 months. You\'re not growing. You\'re exploding."',
                zh: '"连续6个月100%环比增长。你不是在增长。你是在爆炸式增长。"'
            },
            unlockedBy: 0.004
        },

        {
            id: 'the_secret_master',
            rarity: 'legendary',
            name: {
                en: '🎭 The Secret Master',
                zh: '🎭 秘密大师'
            },
            description: {
                en: 'Discover and use all 15 hidden growth tactics across scenarios',
                zh: '发现并使用所有场景中的15个隐藏增长策略'
            },
            unlockCondition: {
                type: 'custom',
                check: (game) => {
                    const hiddenSkillsUsed = game.skillsUsed.filter(s => s.hidden === true);
                    return hiddenSkillsUsed.length >= 15;
                }
            },
            reward: {
                en: 'Unlock: "Black Book" of underground growth hacks',
                zh: '解锁："黑皮书"地下增长黑客技巧'
            },
            flavorText: {
                en: '"You found the growth hacks that most people never discover. You see the matrix."',
                zh: '"你发现了大多数人永远不会发现的增长黑客技巧。你看到了矩阵。"'
            },
            unlockedBy: 0.002
        }
    ]
};

// Achievement unlock logic
class AchievementSystem {
    constructor() {
        this.unlockedAchievements = [];
        this.pendingNotifications = [];
    }

    checkAchievements(game) {
        const newlyUnlocked = [];

        // 检查所有成就类别
        ['common', 'rare', 'epic', 'legendary'].forEach(rarity => {
            ACHIEVEMENTS[rarity].forEach(achievement => {
                // 如果已解锁，跳过
                if (this.isUnlocked(achievement.id)) return;

                // 检查解锁条件
                if (this.checkUnlockCondition(achievement.unlockCondition, game)) {
                    this.unlockAchievement(achievement, game);
                    newlyUnlocked.push(achievement);
                }
            });
        });

        return newlyUnlocked;
    }

    checkUnlockCondition(condition, game) {
        switch (condition.type) {
            case 'scenarios_completed':
                return (game.completedScenarios || []).length >= condition.value;

            case 'metric_threshold':
                const metricValue = game.metrics[condition.metric];
                if (metricValue === undefined) return false;

                switch (condition.comparison) {
                    case '>': return metricValue > condition.value;
                    case '>=': return metricValue >= condition.value;
                    case '<': return metricValue < condition.value;
                    case '<=': return metricValue <= condition.value;
                    case '=': return metricValue === condition.value;
                    default: return false;
                }

            case 'event':
                // 事件类型成就需要在事件发生时手动触发
                return false;

            case 'custom':
                return condition.check(game);

            default:
                return false;
        }
    }

    unlockAchievement(achievement, game) {
        const unlockData = {
            id: achievement.id,
            name: achievement.name,
            description: achievement.description,
            rarity: achievement.rarity,
            unlockedAt: new Date().toISOString(),
            scenario: game.scenarioId || 'unknown',
            metrics: { ...game.metrics }
        };

        this.unlockedAchievements.push(unlockData);
        this.pendingNotifications.push(achievement);

        // 应用奖励
        this.applyReward(achievement, game);

        // 保存到本地存储
        this.saveProgress();
    }

    applyReward(achievement, game) {
        // 根据成就应用奖励
        // 这里可以实现各种奖励效果
        switch (achievement.id) {
            case 'viral_moment':
                // +20%推荐技能效果
                game.referralSkillBonus = (game.referralSkillBonus || 0) + 0.20;
                break;

            case 'cash_flow_positive':
                // +$10,000预算
                game.metrics.budget += 10000;
                break;

            case 'product_market_fit':
                // 所有技能+15%效果
                game.globalSkillBonus = (game.globalSkillBonus || 0) + 0.15;
                break;

            // 可以添加更多奖励逻辑
        }
    }

    isUnlocked(achievementId) {
        return this.unlockedAchievements.some(a => a.id === achievementId);
    }

    getProgress() {
        const totalAchievements =
            ACHIEVEMENTS.common.length +
            ACHIEVEMENTS.rare.length +
            ACHIEVEMENTS.epic.length +
            ACHIEVEMENTS.legendary.length;

        return {
            unlocked: this.unlockedAchievements.length,
            total: totalAchievements,
            percentage: Math.floor((this.unlockedAchievements.length / totalAchievements) * 100),
            byRarity: {
                common: this.unlockedAchievements.filter(a => a.rarity === 'common').length,
                rare: this.unlockedAchievements.filter(a => a.rarity === 'rare').length,
                epic: this.unlockedAchievements.filter(a => a.rarity === 'epic').length,
                legendary: this.unlockedAchievements.filter(a => a.rarity === 'legendary').length
            }
        };
    }

    saveProgress() {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('growthHackerAchievements', JSON.stringify(this.unlockedAchievements));
        }
    }

    loadProgress() {
        if (typeof localStorage !== 'undefined') {
            const saved = localStorage.getItem('growthHackerAchievements');
            if (saved) {
                this.unlockedAchievements = JSON.parse(saved);
            }
        }
    }

    getPendingNotifications() {
        const pending = [...this.pendingNotifications];
        this.pendingNotifications = [];
        return pending;
    }
}

// Export for use in game engine
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ACHIEVEMENTS, AchievementSystem };
}
