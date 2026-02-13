// Meta Progression System - Persistent player progress and skill tree
// 元进程系统 - 持久化玩家进度与技能树

class MetaProgressionSystem {
    constructor() {
        this.playerProfile = this.loadPlayerProfile();
        this.skillTree = this.initializeSkillTree();
        this.scenarioProgress = this.loadScenarioProgress();
    }

    // Initialize player profile
    loadPlayerProfile() {
        const saved = this.loadFromStorage('playerProfile');

        return saved || {
            playerId: this.generatePlayerId(),
            playerName: 'Growth Hacker',
            level: 1,
            totalXP: 0,
            xpToNextLevel: 1000,
            gamesPlayed: 0,
            gamesWon: 0,
            totalUsers: 0,
            totalRevenue: 0,
            achievements: [],
            unlockedSkills: new Set(['Product Hunt发布', '内容营销+SEO', '社交媒体广告']),
            unlockedScenarios: new Set(['startup-saas', 'early-stage']),
            stats: {
                bestUserGrowth: 0,
                bestRevenue: 0,
                fastestWin: 0,
                longestStreak: 0,
                totalDecisions: 0,
                excellentDecisions: 0,
                hiddenCombosFound: 0
            },
            preferences: {
                language: 'zh-CN',
                difficulty: 'medium',
                tutorialCompleted: false
            },
            createdAt: Date.now(),
            lastPlayed: Date.now()
        };
    }

    // Save player profile to localStorage
    savePlayerProfile() {
        // Convert Set to Array for JSON serialization
        const profileToSave = {
            ...this.playerProfile,
            unlockedSkills: Array.from(this.playerProfile.unlockedSkills),
            unlockedScenarios: Array.from(this.playerProfile.unlockedScenarios)
        };

        this.saveToStorage('playerProfile', profileToSave);
    }

    // Initialize 48-skill tree (expanded from 12)
    initializeSkillTree() {
        const saved = this.loadFromStorage('skillTree');

        if (saved) return saved;

        return {
            // Tier 1: Acquisition (12 skills)
            acquisition: {
                tier: 1,
                category: 'Acquisition',
                skills: [
                    // Initially unlocked (3)
                    { id: 'ph-launch', name: 'Product Hunt发布', unlocked: true, level: 0, maxLevel: 3, xpCost: 0 },
                    { id: 'content-seo', name: '内容营销+SEO', unlocked: true, level: 0, maxLevel: 3, xpCost: 0 },
                    { id: 'social-ads', name: '社交媒体广告', unlocked: true, level: 0, maxLevel: 3, xpCost: 0 },

                    // Unlock with XP (9)
                    { id: 'kol-collab', name: 'KOL合作推广', unlocked: false, level: 0, maxLevel: 3, xpCost: 500, requires: ['ph-launch'] },
                    { id: 'viral-video', name: '病毒视频营销', unlocked: false, level: 0, maxLevel: 3, xpCost: 500, requires: ['social-ads'] },
                    { id: 'programmatic-seo', name: '程序化SEO', unlocked: false, level: 0, maxLevel: 3, xpCost: 800, requires: ['content-seo'] },
                    { id: 'community-launch', name: '社区联合发布', unlocked: false, level: 0, maxLevel: 3, xpCost: 600, requires: ['ph-launch'] },
                    { id: 'press-release', name: '媒体公关传播', unlocked: false, level: 0, maxLevel: 3, xpCost: 700, requires: ['ph-launch'] },
                    { id: 'partnership', name: '战略合作渠道', unlocked: false, level: 0, maxLevel: 3, xpCost: 1000, requires: ['kol-collab'] },
                    { id: 'affiliate', name: '联盟营销网络', unlocked: false, level: 0, maxLevel: 3, xpCost: 900, requires: ['kol-collab'] },
                    { id: 'cold-outreach', name: '冷启动外展', unlocked: false, level: 0, maxLevel: 3, xpCost: 600, requires: ['social-ads'] },
                    { id: 'event-marketing', name: '活动营销', unlocked: false, level: 0, maxLevel: 3, xpCost: 700, requires: ['community-launch'] }
                ]
            },

            // Tier 2: Activation (12 skills)
            activation: {
                tier: 2,
                category: 'Activation',
                skills: [
                    { id: 'onboarding', name: '优化注册流程', unlocked: false, level: 0, maxLevel: 3, xpCost: 400, requires: [] },
                    { id: 'welcome-email', name: '欢迎邮件序列', unlocked: false, level: 0, maxLevel: 3, xpCost: 400, requires: [] },
                    { id: 'quick-wins', name: '快速成功体验', unlocked: false, level: 0, maxLevel: 3, xpCost: 500, requires: ['onboarding'] },
                    { id: 'tutorial', name: '交互式教程', unlocked: false, level: 0, maxLevel: 3, xpCost: 600, requires: ['onboarding'] },
                    { id: 'personalization', name: '个性化推荐', unlocked: false, level: 0, maxLevel: 3, xpCost: 800, requires: ['quick-wins'] },
                    { id: 'ab-testing', name: 'AB测试优化', unlocked: false, level: 0, maxLevel: 3, xpCost: 700, requires: ['onboarding'] },
                    { id: 'social-proof', name: '社会证明展示', unlocked: false, level: 0, maxLevel: 3, xpCost: 500, requires: ['quick-wins'] },
                    { id: 'demo-data', name: '演示数据预填', unlocked: false, level: 0, maxLevel: 3, xpCost: 600, requires: ['tutorial'] },
                    { id: 'progress-bar', name: '进度可视化', unlocked: false, level: 0, maxLevel: 3, xpCost: 500, requires: ['tutorial'] },
                    { id: 'chatbot', name: 'AI聊天助手', unlocked: false, level: 0, maxLevel: 3, xpCost: 900, requires: ['personalization'] },
                    { id: 'video-guide', name: '视频引导', unlocked: false, level: 0, maxLevel: 3, xpCost: 600, requires: ['tutorial'] },
                    { id: 'gamify-onboard', name: '游戏化入门', unlocked: false, level: 0, maxLevel: 3, xpCost: 800, requires: ['progress-bar'] }
                ]
            },

            // Tier 3: Retention (12 skills)
            retention: {
                tier: 3,
                category: 'Retention',
                skills: [
                    { id: 'streak-system', name: '打卡系统+游戏化', unlocked: false, level: 0, maxLevel: 3, xpCost: 600, requires: [] },
                    { id: 'push-notif', name: 'Push通知优化', unlocked: false, level: 0, maxLevel: 3, xpCost: 500, requires: [] },
                    { id: 'email-auto', name: '邮件营销自动化', unlocked: false, level: 0, maxLevel: 3, xpCost: 700, requires: [] },
                    { id: 'community', name: '社区驱动增长', unlocked: false, level: 0, maxLevel: 3, xpCost: 800, requires: ['streak-system'] },
                    { id: 'ugc', name: '用户生成内容UGC', unlocked: false, level: 0, maxLevel: 3, xpCost: 900, requires: ['community'] },
                    { id: 'loyalty', name: '会员体系设计', unlocked: false, level: 0, maxLevel: 3, xpCost: 1000, requires: ['streak-system'] },
                    { id: 'habit-form', name: '习惯养成机制', unlocked: false, level: 0, maxLevel: 3, xpCost: 900, requires: ['streak-system'] },
                    { id: 'win-back', name: '流失召回策略', unlocked: false, level: 0, maxLevel: 3, xpCost: 700, requires: ['email-auto'] },
                    { id: 'engagement-loop', name: '参与度循环', unlocked: false, level: 0, maxLevel: 3, xpCost: 800, requires: ['community'] },
                    { id: 'content-calendar', name: '内容日历系统', unlocked: false, level: 0, maxLevel: 3, xpCost: 600, requires: ['ugc'] },
                    { id: 'social-features', name: '社交功能增强', unlocked: false, level: 0, maxLevel: 3, xpCost: 900, requires: ['community'] },
                    { id: 'seasonal-events', name: '季节性活动', unlocked: false, level: 0, maxLevel: 3, xpCost: 700, requires: ['engagement-loop'] }
                ]
            },

            // Tier 4: Revenue (12 skills)
            revenue: {
                tier: 4,
                category: 'Revenue',
                skills: [
                    { id: 'pricing-opt', name: '定价策略优化', unlocked: false, level: 0, maxLevel: 3, xpCost: 800, requires: [] },
                    { id: 'upsell', name: '增值服务套餐', unlocked: false, level: 0, maxLevel: 3, xpCost: 700, requires: [] },
                    { id: 'freemium', name: 'Freemium转化优化', unlocked: false, level: 0, maxLevel: 3, xpCost: 900, requires: ['pricing-opt'] },
                    { id: 'trial-opt', name: '免费试用优化', unlocked: false, level: 0, maxLevel: 3, xpCost: 700, requires: ['pricing-opt'] },
                    { id: 'payment-opt', name: '支付流程优化', unlocked: false, level: 0, maxLevel: 3, xpCost: 600, requires: ['upsell'] },
                    { id: 'subscription', name: '订阅模式设计', unlocked: false, level: 0, maxLevel: 3, xpCost: 1000, requires: ['pricing-opt'] },
                    { id: 'cross-sell', name: '交叉销售策略', unlocked: false, level: 0, maxLevel: 3, xpCost: 800, requires: ['upsell'] },
                    { id: 'enterprise', name: '企业级方案', unlocked: false, level: 0, maxLevel: 3, xpCost: 1200, requires: ['subscription'] },
                    { id: 'usage-based', name: '使用量计费', unlocked: false, level: 0, maxLevel: 3, xpCost: 900, requires: ['subscription'] },
                    { id: 'annual-plan', name: '年费优惠策略', unlocked: false, level: 0, maxLevel: 3, xpCost: 700, requires: ['subscription'] },
                    { id: 'addon-market', name: '插件市场', unlocked: false, level: 0, maxLevel: 3, xpCost: 1000, requires: ['cross-sell'] },
                    { id: 'premium-support', name: '高级支持服务', unlocked: false, level: 0, maxLevel: 3, xpCost: 800, requires: ['enterprise'] }
                ]
            },

            // Tier 5: Referral (12 skills)
            referral: {
                tier: 5,
                category: 'Referral',
                skills: [
                    { id: 'referral-basic', name: '双边推荐奖励', unlocked: false, level: 0, maxLevel: 3, xpCost: 700, requires: [] },
                    { id: 'social-share', name: '社交分享功能', unlocked: false, level: 0, maxLevel: 3, xpCost: 600, requires: [] },
                    { id: 'referral-game', name: '游戏化推荐系统', unlocked: false, level: 0, maxLevel: 3, xpCost: 900, requires: ['referral-basic'] },
                    { id: 'viral-loop', name: '病毒循环设计', unlocked: false, level: 0, maxLevel: 3, xpCost: 1000, requires: ['referral-basic'] },
                    { id: 'invite-contest', name: '邀请竞赛活动', unlocked: false, level: 0, maxLevel: 3, xpCost: 800, requires: ['referral-game'] },
                    { id: 'brand-ambassador', name: '品牌大使计划', unlocked: false, level: 0, maxLevel: 3, xpCost: 1100, requires: ['viral-loop'] },
                    { id: 'user-story', name: '用户故事传播', unlocked: false, level: 0, maxLevel: 3, xpCost: 700, requires: ['social-share'] },
                    { id: 'testimonial', name: '用户证言系统', unlocked: false, level: 0, maxLevel: 3, xpCost: 600, requires: ['user-story'] },
                    { id: 'case-study', name: '案例研究发布', unlocked: false, level: 0, maxLevel: 3, xpCost: 800, requires: ['testimonial'] },
                    { id: 'integration', name: '第三方集成传播', unlocked: false, level: 0, maxLevel: 3, xpCost: 900, requires: ['viral-loop'] },
                    { id: 'api-viral', name: 'API病毒传播', unlocked: false, level: 0, maxLevel: 3, xpCost: 1200, requires: ['integration'] },
                    { id: 'widget-embed', name: '嵌入式组件', unlocked: false, level: 0, maxLevel: 3, xpCost: 1000, requires: ['integration'] }
                ]
            }
        };
    }

    // Generate unique player ID
    generatePlayerId() {
        return 'player_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Add XP and check for level up
    addXP(amount, reason) {
        this.playerProfile.totalXP += amount;

        const levelUps = [];

        while (this.playerProfile.totalXP >= this.playerProfile.xpToNextLevel) {
            this.playerProfile.level++;
            this.playerProfile.totalXP -= this.playerProfile.xpToNextLevel;
            this.playerProfile.xpToNextLevel = Math.floor(this.playerProfile.xpToNextLevel * 1.5);

            levelUps.push({
                newLevel: this.playerProfile.level,
                reward: this.getLevelUpReward(this.playerProfile.level)
            });
        }

        this.savePlayerProfile();

        return {
            xpGained: amount,
            reason: reason,
            currentXP: this.playerProfile.totalXP,
            xpToNextLevel: this.playerProfile.xpToNextLevel,
            levelUps: levelUps
        };
    }

    // Get rewards for leveling up
    getLevelUpReward(level) {
        const rewards = [];

        // Every level: unlock 1-2 skills
        if (level % 2 === 0) {
            rewards.push({ type: 'skill', amount: 2 });
        } else {
            rewards.push({ type: 'skill', amount: 1 });
        }

        // Every 5 levels: unlock a new scenario
        if (level % 5 === 0) {
            rewards.push({ type: 'scenario', name: this.getNextScenario() });
        }

        // Every 10 levels: special achievement
        if (level % 10 === 0) {
            rewards.push({ type: 'achievement', name: `达到等级${level}` });
        }

        return rewards;
    }

    // Unlock a skill
    unlockSkill(skillId, category = null) {
        const skill = this.findSkill(skillId, category);

        if (!skill) {
            return { success: false, message: '技能未找到' };
        }

        if (skill.unlocked) {
            return { success: false, message: '技能已解锁' };
        }

        // Check requirements
        if (skill.requires && skill.requires.length > 0) {
            const unmetRequirements = skill.requires.filter(reqId =>
                !this.isSkillUnlocked(reqId)
            );

            if (unmetRequirements.length > 0) {
                return {
                    success: false,
                    message: '需要先解锁前置技能',
                    requirements: unmetRequirements
                };
            }
        }

        // Check XP cost
        if (this.playerProfile.totalXP < skill.xpCost) {
            return {
                success: false,
                message: `需要 ${skill.xpCost} XP，当前只有 ${this.playerProfile.totalXP} XP`
            };
        }

        // Unlock skill
        skill.unlocked = true;
        this.playerProfile.totalXP -= skill.xpCost;
        this.playerProfile.unlockedSkills.add(skill.name);

        this.savePlayerProfile();
        this.saveToStorage('skillTree', this.skillTree);

        return {
            success: true,
            message: `解锁技能：${skill.name}`,
            skill: skill
        };
    }

    // Upgrade a skill level
    upgradeSkill(skillId, category = null) {
        const skill = this.findSkill(skillId, category);

        if (!skill) {
            return { success: false, message: '技能未找到' };
        }

        if (!skill.unlocked) {
            return { success: false, message: '技能未解锁' };
        }

        if (skill.level >= skill.maxLevel) {
            return { success: false, message: '技能已满级' };
        }

        const upgradeCost = (skill.level + 1) * 200; // Each level costs more

        if (this.playerProfile.totalXP < upgradeCost) {
            return {
                success: false,
                message: `升级需要 ${upgradeCost} XP`
            };
        }

        skill.level++;
        this.playerProfile.totalXP -= upgradeCost;

        this.savePlayerProfile();
        this.saveToStorage('skillTree', this.skillTree);

        return {
            success: true,
            message: `${skill.name} 升级到 Lv.${skill.level}`,
            skill: skill
        };
    }

    // Find a skill by ID
    findSkill(skillId, category = null) {
        if (category && this.skillTree[category]) {
            return this.skillTree[category].skills.find(s => s.id === skillId);
        }

        // Search all categories
        for (const cat of Object.values(this.skillTree)) {
            const skill = cat.skills.find(s => s.id === skillId);
            if (skill) return skill;
        }

        return null;
    }

    // Check if skill is unlocked
    isSkillUnlocked(skillId) {
        const skill = this.findSkill(skillId);
        return skill && skill.unlocked;
    }

    // Get all unlocked skills
    getUnlockedSkills() {
        const unlocked = [];

        for (const [catKey, category] of Object.entries(this.skillTree)) {
            const catUnlocked = category.skills.filter(s => s.unlocked);
            if (catUnlocked.length > 0) {
                unlocked.push({
                    category: category.category,
                    skills: catUnlocked
                });
            }
        }

        return unlocked;
    }

    // Get skill tree progress
    getSkillTreeProgress() {
        let totalSkills = 0;
        let unlockedSkills = 0;
        let totalLevels = 0;
        let currentLevels = 0;

        for (const category of Object.values(this.skillTree)) {
            for (const skill of category.skills) {
                totalSkills++;
                totalLevels += skill.maxLevel;

                if (skill.unlocked) {
                    unlockedSkills++;
                    currentLevels += skill.level;
                }
            }
        }

        return {
            totalSkills,
            unlockedSkills,
            unlockedPercentage: Math.round((unlockedSkills / totalSkills) * 100),
            totalLevels,
            currentLevels,
            levelPercentage: Math.round((currentLevels / totalLevels) * 100)
        };
    }

    // Record game completion
    recordGameCompletion(gameData) {
        this.playerProfile.gamesPlayed++;
        this.playerProfile.lastPlayed = Date.now();

        if (gameData.won) {
            this.playerProfile.gamesWon++;
        }

        // Update stats
        this.playerProfile.totalUsers += gameData.finalUsers || 0;
        this.playerProfile.totalRevenue += gameData.finalRevenue || 0;

        if (gameData.finalUsers > this.playerProfile.stats.bestUserGrowth) {
            this.playerProfile.stats.bestUserGrowth = gameData.finalUsers;
        }

        if (gameData.finalRevenue > this.playerProfile.stats.bestRevenue) {
            this.playerProfile.stats.bestRevenue = gameData.finalRevenue;
        }

        this.playerProfile.stats.totalDecisions += gameData.totalDecisions || 0;
        this.playerProfile.stats.excellentDecisions += gameData.excellentDecisions || 0;

        if (gameData.maxCombo > this.playerProfile.stats.longestStreak) {
            this.playerProfile.stats.longestStreak = gameData.maxCombo;
        }

        // Award XP based on performance
        let xpAwarded = 0;
        const xpReasons = [];

        if (gameData.won) {
            xpAwarded += 500;
            xpReasons.push('完成游戏: +500 XP');
        } else {
            xpAwarded += 200;
            xpReasons.push('尝试游戏: +200 XP');
        }

        xpAwarded += Math.floor(gameData.finalUsers / 100);
        xpReasons.push(`用户增长: +${Math.floor(gameData.finalUsers / 100)} XP`);

        xpAwarded += Math.floor(gameData.finalRevenue / 10);
        xpReasons.push(`收入增长: +${Math.floor(gameData.finalRevenue / 10)} XP`);

        if (gameData.excellentDecisions) {
            xpAwarded += gameData.excellentDecisions * 50;
            xpReasons.push(`优秀决策: +${gameData.excellentDecisions * 50} XP`);
        }

        if (gameData.maxCombo >= 3) {
            xpAwarded += gameData.maxCombo * 100;
            xpReasons.push(`连击奖励: +${gameData.maxCombo * 100} XP`);
        }

        this.savePlayerProfile();

        return {
            xpAwarded,
            xpReasons,
            xpResult: this.addXP(xpAwarded, 'Game Completion')
        };
    }

    // Scenario progress tracking
    loadScenarioProgress() {
        const saved = this.loadFromStorage('scenarioProgress');
        return saved || {};
    }

    saveScenarioProgress(scenarioId, progress) {
        this.scenarioProgress[scenarioId] = {
            ...progress,
            lastPlayed: Date.now()
        };

        this.saveToStorage('scenarioProgress', this.scenarioProgress);
    }

    getNextScenario() {
        const scenarios = [
            'startup-saas',
            'early-stage',
            'growth-stage',
            'marketplace',
            'ecommerce',
            'social-network',
            'fintech',
            'education',
            'b2b-saas',
            'consumer-app'
        ];

        const unlocked = this.playerProfile.unlockedScenarios.size;
        return scenarios[unlocked] || scenarios[scenarios.length - 1];
    }

    // Storage helpers
    saveToStorage(key, data) {
        try {
            // Convert Sets to Arrays for JSON
            const dataToSave = JSON.parse(JSON.stringify(data, (k, v) =>
                v instanceof Set ? Array.from(v) : v
            ));

            localStorage.setItem(`gh_game_${key}`, JSON.stringify(dataToSave));
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    }

    loadFromStorage(key) {
        try {
            const data = localStorage.getItem(`gh_game_${key}`);
            if (!data) return null;

            const parsed = JSON.parse(data);

            // Convert Arrays back to Sets where needed
            if (key === 'playerProfile') {
                parsed.unlockedSkills = new Set(parsed.unlockedSkills || []);
                parsed.unlockedScenarios = new Set(parsed.unlockedScenarios || []);
            }

            return parsed;
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            return null;
        }
    }

    clearAllProgress() {
        if (confirm('确定要清除所有进度吗？此操作不可撤销！')) {
            localStorage.removeItem('gh_game_playerProfile');
            localStorage.removeItem('gh_game_skillTree');
            localStorage.removeItem('gh_game_scenarioProgress');

            // Reinitialize
            this.playerProfile = this.loadPlayerProfile();
            this.skillTree = this.initializeSkillTree();
            this.scenarioProgress = {};

            return true;
        }
        return false;
    }

    // Export/Import for backup
    exportProgress() {
        return {
            playerProfile: this.playerProfile,
            skillTree: this.skillTree,
            scenarioProgress: this.scenarioProgress,
            exportedAt: Date.now(),
            version: '1.0'
        };
    }

    importProgress(data) {
        try {
            if (data.version !== '1.0') {
                throw new Error('Incompatible save version');
            }

            this.playerProfile = data.playerProfile;
            this.skillTree = data.skillTree;
            this.scenarioProgress = data.scenarioProgress;

            this.savePlayerProfile();
            this.saveToStorage('skillTree', this.skillTree);
            this.saveToStorage('scenarioProgress', this.scenarioProgress);

            return { success: true, message: '进度导入成功！' };
        } catch (error) {
            return { success: false, message: '导入失败：' + error.message };
        }
    }
}

// Export
if (typeof window !== 'undefined') {
    window.MetaProgressionSystem = MetaProgressionSystem;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = MetaProgressionSystem;
}
