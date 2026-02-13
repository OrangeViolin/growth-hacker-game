// Combo System - Skill synergies and streak bonuses
// 组合技系统 - 技能协同与连击奖励

class ComboSystem {
    constructor(gameEngine) {
        this.game = gameEngine;
        this.synergies = this.defineSynergies();
        this.hiddenCombos = this.defineHiddenCombos();
        this.discoveredCombos = new Set();
    }

    // Define skill synergies
    defineSynergies() {
        return {
            // SEO + Content Marketing = 1.5x effectiveness
            'SEO_CONTENT': {
                skills: ['内容营销+SEO', 'SEO内容矩阵', 'Product Hunt发布'],
                name: 'SEO内容王者 SEO Content King',
                description: 'SEO与内容营销相结合，流量翻倍',
                multiplier: 1.5,
                bonus: { brandReputation: 10 },
                icon: '📝🔍'
            },

            // Social Media + Influencer = 1.6x effectiveness
            'SOCIAL_VIRAL': {
                skills: ['社交媒体广告', 'KOL合作推广', '病毒视频营销'],
                name: '社交病毒传播 Social Viral Master',
                description: '社交媒体与KOL结合，病毒式传播',
                multiplier: 1.6,
                bonus: { viralCoefficient: 0.3, brandReputation: 15 },
                icon: '📱🌟'
            },

            // Gamification + Retention = 1.4x effectiveness
            'GAME_RETAIN': {
                skills: ['打卡系统+游戏化', '会员体系设计', '社区驱动增长'],
                name: '粘性增长专家 Engagement Master',
                description: '游戏化机制提升用户粘性',
                multiplier: 1.4,
                bonus: { retention7d: 15, userTrust: 10 },
                icon: '🎮💎'
            },

            // Email + Automation = 1.3x effectiveness
            'EMAIL_AUTO': {
                skills: ['邮件营销自动化', '个性化推荐系统', 'CRM系统优化'],
                name: '自动化营销大师 Automation Guru',
                description: '自动化工具提升效率',
                multiplier: 1.3,
                bonus: { teamEnergy: 15, activation: 10 },
                icon: '📧🤖'
            },

            // Product-Led Growth combo
            'PRODUCT_LED': {
                skills: ['产品内增长循环', '优化注册流程', '功能解锁策略'],
                name: '产品驱动增长 Product-Led Growth',
                description: '产品即增长引擎',
                multiplier: 1.5,
                bonus: { activation: 20, userTrust: 15 },
                icon: '🚀💡'
            },

            // Data-Driven combo
            'DATA_DRIVEN': {
                skills: ['AB测试优化', '数据分析仪表盘', '用户行为分析'],
                name: '数据驱动决策 Data-Driven Master',
                description: '用数据指导每个决策',
                multiplier: 1.4,
                bonus: { activation: 15, retention7d: 10 },
                icon: '📊🎯'
            },

            // Community-Led Growth
            'COMMUNITY_POWER': {
                skills: ['社区驱动增长', '用户生成内容UGC', 'Discord/Slack社群'],
                name: '社区力量 Community Power',
                description: '建立强大的用户社区',
                multiplier: 1.5,
                bonus: { userTrust: 20, viralCoefficient: 0.25, nps: 15 },
                icon: '👥💬'
            },

            // Referral Master combo
            'REFERRAL_MASTER': {
                skills: ['双边推荐奖励', '游戏化推荐系统', '社交分享功能'],
                name: '推荐营销大师 Referral Master',
                description: '用户自发传播，病毒增长',
                multiplier: 1.7,
                bonus: { viralCoefficient: 0.4, userTrust: 10 },
                icon: '📢🔥'
            }
        };
    }

    // Define hidden combos (discovered through experimentation)
    defineHiddenCombos() {
        return {
            'TRIPLE_A': {
                skills: ['AB测试优化', '优化注册流程', '个性化推荐系统'],
                name: '🔮 三A战略 Triple-A Strategy',
                description: '同时优化激活、测试和个性化，转化率提升3倍！',
                hidden: true,
                multiplier: 2.0,
                bonus: { activation: 30, userTrust: 15, revenue: 1000 },
                icon: '🔮✨'
            },

            'GROWTH_LOOP': {
                skills: ['产品内增长循环', '双边推荐奖励', '社区驱动增长'],
                name: '🌀 增长飞轮 Growth Flywheel',
                description: '建立自增强的增长循环，实现指数增长！',
                hidden: true,
                multiplier: 2.2,
                bonus: { viralCoefficient: 0.5, users: 5000, brandReputation: 20 },
                icon: '🌀💫'
            },

            'CONTENT_EMPIRE': {
                skills: ['内容营销+SEO', 'SEO内容矩阵', '用户生成内容UGC'],
                name: '📚 内容帝国 Content Empire',
                description: '建立内容护城河，长期主导搜索流量！',
                hidden: true,
                multiplier: 2.1,
                bonus: { brandReputation: 30, userTrust: 20, marketTiming: 20 },
                icon: '📚👑'
            },

            'PERFECT_STORM': {
                skills: ['病毒视频营销', 'KOL合作推广', '社交媒体广告', 'Product Hunt发布'],
                name: '⚡ 完美风暴 Perfect Storm',
                description: '多渠道同时爆发，引发现象级传播！',
                hidden: true,
                multiplier: 2.5,
                bonus: { users: 10000, brandReputation: 40, viralCoefficient: 0.6 },
                icon: '⚡🌊'
            },

            'RETENTION_FORTRESS': {
                skills: ['打卡系统+游戏化', '会员体系设计', '邮件营销自动化', 'Push通知优化'],
                name: '🏰 留存堡垒 Retention Fortress',
                description: '构建不可攻破的留存体系！',
                hidden: true,
                multiplier: 2.0,
                bonus: { retention7d: 40, userTrust: 25, nps: 30 },
                icon: '🏰💪'
            }
        };
    }

    // Check for active synergies based on recently used skills
    checkSynergies(recentSkills) {
        const activeSynergies = [];
        const recentSkillNames = recentSkills.map(s => s.skill);

        // Check regular synergies
        for (const [key, synergy] of Object.entries(this.synergies)) {
            const matchCount = synergy.skills.filter(skill =>
                recentSkillNames.includes(skill)
            ).length;

            if (matchCount >= 2) {
                activeSynergies.push({
                    ...synergy,
                    key: key,
                    matchCount: matchCount,
                    isComplete: matchCount === synergy.skills.length
                });
            }
        }

        // Check hidden combos
        for (const [key, combo] of Object.entries(this.hiddenCombos)) {
            const matchCount = combo.skills.filter(skill =>
                recentSkillNames.includes(skill)
            ).length;

            if (matchCount === combo.skills.length && !this.discoveredCombos.has(key)) {
                // Hidden combo discovered!
                this.discoveredCombos.add(key);
                activeSynergies.push({
                    ...combo,
                    key: key,
                    isHiddenCombo: true,
                    justDiscovered: true
                });
            }
        }

        return activeSynergies;
    }

    // Apply synergy bonuses to a skill execution
    applySynergyBonus(baseResult, activeSynergies) {
        let result = { ...baseResult };
        let totalMultiplier = 1.0;
        let bonuses = {};

        activeSynergies.forEach(synergy => {
            // Apply multipliers (multiplicative)
            totalMultiplier *= synergy.multiplier;

            // Accumulate bonuses
            if (synergy.bonus) {
                for (const [key, value] of Object.entries(synergy.bonus)) {
                    bonuses[key] = (bonuses[key] || 0) + value;
                }
            }
        });

        // Apply multiplier to user and revenue growth
        if (result.userChange) {
            result.userChange = Math.floor(result.userChange * totalMultiplier);
        }
        if (result.revenueChange) {
            result.revenueChange = Math.floor(result.revenueChange * totalMultiplier);
        }

        // Apply accumulated bonuses
        result.synergyBonuses = bonuses;
        result.totalMultiplier = totalMultiplier;
        result.activeSynergies = activeSynergies;

        return result;
    }

    // Update combo state based on decision quality
    updateComboState(decisionQuality) {
        const prevCombo = this.game.comboState.currentCombo;

        if (decisionQuality === 'excellent') {
            this.game.comboState.currentCombo++;
            this.game.comboState.lastDecisionQuality = 'excellent';
        } else if (decisionQuality === 'good' && prevCombo > 0) {
            // Good decisions maintain combo but don't increase it
            this.game.comboState.lastDecisionQuality = 'good';
        } else {
            // Poor decisions break the combo
            this.game.comboState.currentCombo = 0;
            this.game.comboState.onFire = false;
            this.game.comboState.lastDecisionQuality = 'poor';
        }

        // Update max combo
        if (this.game.comboState.currentCombo > this.game.comboState.maxCombo) {
            this.game.comboState.maxCombo = this.game.comboState.currentCombo;
        }

        // Check for "On Fire" state (3+ excellent decisions)
        if (this.game.comboState.currentCombo >= 3) {
            this.game.comboState.onFire = true;
        }

        return this.game.comboState;
    }

    // Get combo bonuses when "On Fire"
    getOnFireBonus() {
        if (!this.game.comboState.onFire) {
            return null;
        }

        const comboCount = this.game.comboState.currentCombo;
        const bonusMultiplier = 1 + (comboCount * 0.1); // 10% per combo

        return {
            name: '🔥 ON FIRE 状态激活！',
            description: `连续${comboCount}个优秀决策！所有效果提升${Math.round((bonusMultiplier - 1) * 100)}%`,
            multiplier: bonusMultiplier,
            bonus: {
                teamEnergy: 10,
                brandReputation: 5
            },
            icon: '🔥'
        };
    }

    // Get combo display for UI
    getComboDisplay() {
        const state = this.game.comboState;

        if (state.currentCombo === 0) {
            return null;
        }

        let level = 'COMBO';
        let color = '#FFA500';

        if (state.currentCombo >= 5) {
            level = 'LEGENDARY';
            color = '#FFD700';
        } else if (state.currentCombo >= 3) {
            level = 'ON FIRE';
            color = '#FF4500';
        }

        return {
            level: level,
            count: state.currentCombo,
            maxCombo: state.maxCombo,
            color: color,
            icon: state.currentCombo >= 3 ? '🔥' : '⚡',
            message: `${state.currentCombo}x ${level}!`
        };
    }

    // Calculate total effectiveness with all bonuses
    calculateTotalEffectiveness(baseEffectiveness, activeSynergies, isOnFire) {
        let total = baseEffectiveness;

        // Apply synergy multipliers
        activeSynergies.forEach(synergy => {
            total *= synergy.multiplier;
        });

        // Apply On Fire bonus
        if (isOnFire) {
            const onFireBonus = this.getOnFireBonus();
            if (onFireBonus) {
                total *= onFireBonus.multiplier;
            }
        }

        return total;
    }

    // Get summary of all discovered combos
    getDiscoveredCombos() {
        const discovered = [];

        for (const [key, combo] of Object.entries(this.hiddenCombos)) {
            if (this.discoveredCombos.has(key)) {
                discovered.push({
                    key: key,
                    ...combo
                });
            }
        }

        return discovered;
    }

    // Get hints for undiscovered combos
    getComboHints() {
        const hints = [];
        const usedSkills = new Set(this.game.skillsUsed.map(s => s.skill));

        for (const [key, combo] of Object.entries(this.hiddenCombos)) {
            if (!this.discoveredCombos.has(key)) {
                const matchedSkills = combo.skills.filter(skill => usedSkills.has(skill));

                if (matchedSkills.length > 0) {
                    hints.push({
                        progress: `${matchedSkills.length}/${combo.skills.length}`,
                        hint: `尝试组合使用${combo.skills.join('、')}`,
                        matchedCount: matchedSkills.length
                    });
                }
            }
        }

        return hints;
    }
}

// Export
if (typeof window !== 'undefined') {
    window.ComboSystem = ComboSystem;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ComboSystem;
}
