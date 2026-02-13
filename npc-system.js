/**
 * NPC管理系统 - 增长黑客游戏
 * 管理所有NPC角色的状态、性格和反应
 *
 * @class NPCManager
 * @author AI Integration Engineer
 * @version 1.0.0
 */

class NPCManager {
    constructor() {
        // NPC数据库
        this.npcs = {
            ceo: {
                id: 'ceo',
                name: '张总',
                emoji: '🧑‍💼',
                personality: 'aggressive',
                concerns: ['growth', 'speed', 'results'],
                satisfaction: 80,
                trustLevel: 70,
                dialogueStyle: 'direct',
                patience: 60,
                traits: {
                    ambition: 95,
                    riskTolerance: 80,
                    empathy: 40,
                    analyticalThinking: 70
                }
            },
            investor: {
                id: 'investor',
                name: '李先生',
                emoji: '💰',
                personality: 'cautious',
                concerns: ['roi', 'sustainability', 'metrics'],
                satisfaction: 60,
                trustLevel: 50,
                dialogueStyle: 'analytical',
                patience: 40,
                traits: {
                    ambition: 70,
                    riskTolerance: 30,
                    empathy: 50,
                    analyticalThinking: 95
                }
            },
            cto: {
                id: 'cto',
                name: '王工',
                emoji: '👨‍💻',
                personality: 'perfectionist',
                concerns: ['tech_debt', 'quality', 'scalability'],
                satisfaction: 70,
                trustLevel: 60,
                dialogueStyle: 'technical',
                patience: 50,
                traits: {
                    ambition: 60,
                    riskTolerance: 40,
                    empathy: 60,
                    analyticalThinking: 90
                }
            },
            user: {
                id: 'user',
                name: '用户小明',
                emoji: '😊',
                personality: 'critical',
                concerns: ['experience', 'simplicity', 'value'],
                satisfaction: 50,
                trustLevel: 40,
                dialogueStyle: 'emotional',
                patience: 30,
                traits: {
                    ambition: 20,
                    riskTolerance: 20,
                    empathy: 80,
                    analyticalThinking: 50
                }
            },
            advisor: {
                id: 'advisor',
                name: 'AI顾问',
                emoji: '🤖',
                personality: 'objective',
                concerns: ['education', 'best_practices'],
                satisfaction: 100,
                trustLevel: 100,
                dialogueStyle: 'educational',
                patience: 100,
                traits: {
                    ambition: 50,
                    riskTolerance: 50,
                    empathy: 70,
                    analyticalThinking: 100
                }
            }
        };

        // 反应模板
        this.reactionTemplates = this.loadReactionTemplates();

        // 情绪状态
        this.emotionStates = {
            'happy': ['😊', '😃', '🎉', '👍'],
            'neutral': ['😐', '🤔', '💭', '📊'],
            'concerned': ['😟', '😰', '⚠️', '🤨'],
            'angry': ['😠', '😡', '💢', '🔥']
        };

        // 统计
        this.stats = {
            totalInteractions: 0,
            satisfactionChanges: 0,
            trustChanges: 0
        };

        console.log('👥 NPC系统初始化完成');
    }

    /**
     * 获取NPC信息
     * @param {string} npcRole - NPC角色ID
     * @returns {Object} NPC数据
     */
    getNPC(npcRole) {
        return this.npcs[npcRole] || null;
    }

    /**
     * 获取所有NPC
     * @returns {Object} 所有NPC数据
     */
    getAllNPCs() {
        return this.npcs;
    }

    /**
     * 获取NPC反应
     * @param {string} npcRole - NPC角色
     * @param {Object} userAction - 用户行动
     * @param {Object} context - 游戏上下文
     * @returns {Object} NPC反应
     */
    getReaction(npcRole, userAction, context) {
        this.stats.totalInteractions++;

        const npc = this.npcs[npcRole];
        if (!npc) {
            console.warn(`⚠️ 未找到NPC: ${npcRole}`);
            return null;
        }

        // 分析行动
        const actionAnalysis = this.analyzeAction(userAction, npc);

        // 生成反应
        const reaction = this.generateReaction(npc, actionAnalysis, context);

        // 更新NPC状态
        this.updateNPCState(npc, actionAnalysis, reaction);

        return reaction;
    }

    /**
     * 分析用户行动
     * @private
     */
    analyzeAction(action, npc) {
        const analysis = {
            type: action.type || 'unknown',
            impact: this.calculateImpact(action, npc),
            alignment: this.checkAlignment(action, npc),
            riskLevel: this.assessRisk(action),
            cost: action.cost || 0,
            expectedReturn: action.expectedReturn || 0
        };

        // 基于NPC关注点评分
        analysis.concernScore = this.scoreConcerns(action, npc.concerns);

        return analysis;
    }

    /**
     * 计算影响
     * @private
     */
    calculateImpact(action, npc) {
        let impact = 0;

        // 基于行动类型
        if (action.users) impact += action.users * 0.1;
        if (action.revenue) impact += action.revenue * 0.01;
        if (action.cost) impact -= action.cost * 0.005;

        // 基于NPC性格调整
        if (npc.personality === 'aggressive') {
            impact *= action.speed || 1;
        } else if (npc.personality === 'cautious') {
            impact *= (action.safety || 0.5);
        }

        return Math.round(impact);
    }

    /**
     * 检查对齐度
     * @private
     */
    checkAlignment(action, npc) {
        let alignmentScore = 50;

        // CEO关心增长速度
        if (npc.id === 'ceo') {
            if (action.growthRate > 20) alignmentScore += 30;
            if (action.speed === 'fast') alignmentScore += 20;
            if (action.speed === 'slow') alignmentScore -= 20;
        }

        // 投资人关心ROI
        if (npc.id === 'investor') {
            const roi = (action.expectedReturn || 0) / (action.cost || 1);
            if (roi > 2) alignmentScore += 30;
            if (roi < 1) alignmentScore -= 30;
            if (action.sustainable) alignmentScore += 20;
        }

        // CTO关心技术质量
        if (npc.id === 'cto') {
            if (action.quality === 'high') alignmentScore += 30;
            if (action.techDebt === 'low') alignmentScore += 20;
            if (action.rushed) alignmentScore -= 30;
        }

        // 用户关心体验
        if (npc.id === 'user') {
            if (action.userExperience > 80) alignmentScore += 30;
            if (action.simplicity) alignmentScore += 20;
            if (action.annoying) alignmentScore -= 40;
        }

        return Math.max(0, Math.min(100, alignmentScore));
    }

    /**
     * 评估风险
     * @private
     */
    assessRisk(action) {
        let riskLevel = 0;

        if (action.cost > 5000) riskLevel += 30;
        if (action.experimental) riskLevel += 20;
        if (action.irreversible) riskLevel += 25;
        if (action.unproven) riskLevel += 25;

        return Math.min(100, riskLevel);
    }

    /**
     * 关注点评分
     * @private
     */
    scoreConcerns(action, concerns) {
        let score = 50;

        concerns.forEach(concern => {
            switch (concern) {
                case 'growth':
                    if (action.growthRate) score += action.growthRate;
                    break;
                case 'speed':
                    if (action.speed === 'fast') score += 20;
                    break;
                case 'roi':
                    const roi = (action.expectedReturn || 0) / (action.cost || 1);
                    score += roi * 10;
                    break;
                case 'quality':
                    if (action.quality === 'high') score += 30;
                    break;
                case 'experience':
                    if (action.userExperience) score += action.userExperience * 0.3;
                    break;
            }
        });

        return Math.max(0, Math.min(100, score));
    }

    /**
     * 生成反应
     * @private
     */
    generateReaction(npc, analysis, context) {
        const emotion = this.determineEmotion(npc, analysis);
        const intensity = this.calculateIntensity(analysis);

        // 获取反应文本
        const text = this.getReactionText(npc, analysis, emotion, context);

        // 生成建议
        const suggestions = this.generateSuggestions(npc, analysis, context);

        // 计算满意度变化
        const satisfactionChange = this.calculateSatisfactionChange(analysis, npc);

        return {
            npcId: npc.id,
            npcName: npc.name,
            emoji: this.getEmotionEmoji(emotion),
            emotion: emotion,
            intensity: intensity,
            text: text,
            suggestions: suggestions,
            satisfactionChange: satisfactionChange,
            trustChange: Math.round(satisfactionChange * 0.5),
            alignment: analysis.alignment,
            timestamp: Date.now()
        };
    }

    /**
     * 确定情绪
     * @private
     */
    determineEmotion(npc, analysis) {
        const score = analysis.alignment;

        // 基于性格调整阈值
        let happyThreshold = 70;
        let concernedThreshold = 40;

        if (npc.personality === 'aggressive') {
            happyThreshold = 80; // CEO更难满足
            concernedThreshold = 50;
        } else if (npc.personality === 'cautious') {
            happyThreshold = 60; // 投资人较保守
            concernedThreshold = 35;
        }

        if (score >= happyThreshold) return 'happy';
        if (score >= concernedThreshold) return 'neutral';
        if (score >= 20) return 'concerned';
        return 'angry';
    }

    /**
     * 计算强度
     * @private
     */
    calculateIntensity(analysis) {
        const baseIntensity = Math.abs(analysis.alignment - 50) / 50;
        const riskMultiplier = 1 + (analysis.riskLevel / 100);
        return Math.min(1, baseIntensity * riskMultiplier);
    }

    /**
     * 获取反应文本
     * @private
     */
    getReactionText(npc, analysis, emotion, context) {
        const templates = this.reactionTemplates[npc.id]?.[emotion] || [];

        if (templates.length === 0) {
            return this.getGenericReaction(npc, emotion);
        }

        // 随机选择模板
        const template = templates[Math.floor(Math.random() * templates.length)];

        // 替换变量
        return this.replaceVariables(template, analysis, context);
    }

    /**
     * 加载反应模板
     * @private
     */
    loadReactionTemplates() {
        return {
            ceo: {
                happy: [
                    '很好！这个决策有魄力！{users}用户，增长{growthRate}%，这才是我要的结果！',
                    '不错！继续保持这个势头。我看到了指数增长的可能性！',
                    '干得漂亮！这个策略符合我们的激进风格。'
                ],
                neutral: [
                    '嗯，可以试试。但我希望看到更快的增长。',
                    '方向对了，但力度还不够。我们需要更大胆的行动。',
                    '这个策略保守了些，不过先执行看看效果。'
                ],
                concerned: [
                    '这个策略太慢了！竞争对手不会等我们。',
                    '我担心这样下去会错过市场时机。能不能更激进一点？',
                    '增长速度不够！我们需要10倍增长，不是10%增长。'
                ],
                angry: [
                    '这是什么策略？！{users}用户，{revenue}收入？我们在浪费时间！',
                    '完全不能接受！我需要看到立即的改变！',
                    '如果继续这样，我们会被市场淘汰！必须改变策略！'
                ]
            },
            investor: {
                happy: [
                    '很好，ROI达到{roi}，这是健康的增长。',
                    '不错，成本控制得当，收入稳步增长。这才是可持续的模式。',
                    '满意。用户信任{userTrust}%，品牌声誉{brandReputation}%，都在健康范围。'
                ],
                neutral: [
                    '数据还可以，但需要继续观察。',
                    '方向没问题，注意控制成本。',
                    '这个策略风险可控，可以尝试。'
                ],
                concerned: [
                    '我对ROI有些担忧。{cost}的成本是否值得？',
                    '增长速度可以，但质量呢？用户信任只有{userTrust}%。',
                    '预算剩余{budget}，需要更谨慎地使用每一分钱。'
                ],
                angry: [
                    '这是在烧钱！ROI完全不合理！',
                    '不能接受！这样的增长不可持续，我们需要立即改变。',
                    '预算快耗尽了！你们在做什么？！'
                ]
            },
            cto: {
                happy: [
                    '从技术角度看，这个方案很稳健。',
                    '不错，考虑到了技术债和可扩展性。',
                    '很好，团队精力{teamEnergy}%，我们有余力执行这个计划。'
                ],
                neutral: [
                    '技术上可行，但需要额外的开发时间。',
                    '可以做，不过要注意代码质量。',
                    '这个功能不复杂，可以快速实现。'
                ],
                concerned: [
                    '等等，团队精力只有{teamEnergy}%了。我们需要休息和重构。',
                    '我担心技术债在累积。这样下去系统会不稳定。',
                    '这个功能会增加系统复杂度。真的必要吗？'
                ],
                angry: [
                    '不行！团队已经筋疲力尽了！继续这样会导致系统崩溃！',
                    '技术债已经无法忍受！我们需要停下来修复问题！',
                    '质量在下降！Bug在增加！这不是可持续的开发方式！'
                ]
            },
            user: {
                happy: [
                    '这个功能太棒了！完全解决了我的问题！',
                    '体验很好，我会推荐给朋友的！',
                    '简单好用，这才是我想要的产品！'
                ],
                neutral: [
                    '还行吧，基本能用。',
                    '功能是有了，但体验一般。',
                    '可以接受，不过还有改进空间。'
                ],
                concerned: [
                    '这个功能有点复杂，能简化吗？',
                    '体验不够好，用起来不太顺手。',
                    '感觉你们更关心增长，不关心用户。'
                ],
                angry: [
                    '什么鬼！这个功能完全没用！',
                    '体验太差了！我要卸载了！',
                    '你们根本不听用户反馈！只知道推销！'
                ]
            },
            advisor: {
                happy: [
                    '很好的决策！你正在掌握增长黑客的精髓。',
                    '不错！这个策略平衡了速度和质量。',
                    '优秀！你考虑了多方利益相关者。'
                ],
                neutral: [
                    '这是个合理的选择。让我们看看效果如何。',
                    '方向对了，继续优化细节。',
                    '可以尝试，记得追踪关键指标。'
                ],
                concerned: [
                    '我建议你再思考一下这个决策的长期影响。',
                    '这个策略可能存在风险，需要准备Plan B。',
                    '注意平衡短期增长和长期健康。'
                ],
                angry: [] // 顾问不会生气
            }
        };
    }

    /**
     * 替换变量
     * @private
     */
    replaceVariables(template, analysis, context) {
        let text = template;

        // 替换上下文变量
        const variables = {
            users: context.users || 0,
            revenue: context.revenue || 0,
            budget: context.budget || 0,
            teamEnergy: context.teamEnergy || 100,
            userTrust: context.userTrust || 70,
            brandReputation: context.brandReputation || 60,
            growthRate: Math.round((analysis.impact || 0) * 100) / 100,
            roi: Math.round((analysis.expectedReturn / (analysis.cost || 1)) * 100) / 100,
            cost: analysis.cost || 0
        };

        Object.keys(variables).forEach(key => {
            const regex = new RegExp(`\\{${key}\\}`, 'g');
            text = text.replace(regex, variables[key]);
        });

        return text;
    }

    /**
     * 获取通用反应
     * @private
     */
    getGenericReaction(npc, emotion) {
        const reactions = {
            happy: `${npc.name}看起来很满意你的决策。`,
            neutral: `${npc.name}对此持中立态度。`,
            concerned: `${npc.name}对这个决策有些担忧。`,
            angry: `${npc.name}对此非常不满！`
        };

        return reactions[emotion] || `${npc.name}做出了反应。`;
    }

    /**
     * 生成建议
     * @private
     */
    generateSuggestions(npc, analysis, context) {
        const suggestions = [];

        // 基于NPC性格和关注点生成建议
        switch (npc.id) {
            case 'ceo':
                if (analysis.alignment < 50) {
                    suggestions.push('加快增长速度');
                    suggestions.push('尝试更激进的策略');
                    suggestions.push('关注竞争对手动态');
                }
                break;

            case 'investor':
                if (analysis.alignment < 50) {
                    suggestions.push('优化ROI');
                    suggestions.push('降低获客成本');
                    suggestions.push('提升用户留存');
                }
                break;

            case 'cto':
                if (context.teamEnergy < 60) {
                    suggestions.push('给团队休息时间');
                    suggestions.push('重构核心代码');
                    suggestions.push('自动化重复工作');
                }
                break;

            case 'user':
                if (context.userTrust < 60) {
                    suggestions.push('改善产品体验');
                    suggestions.push('倾听用户反馈');
                    suggestions.push('简化核心功能');
                }
                break;
        }

        return suggestions.slice(0, 3);
    }

    /**
     * 计算满意度变化
     * @private
     */
    calculateSatisfactionChange(analysis, npc) {
        let change = (analysis.alignment - 50) / 5;

        // 基于性格调整
        if (npc.personality === 'aggressive') {
            change *= 1.5; // CEO情绪波动更大
        } else if (npc.personality === 'cautious') {
            change *= 0.8; // 投资人更稳定
        }

        return Math.round(change);
    }

    /**
     * 获取情绪表情
     * @private
     */
    getEmotionEmoji(emotion) {
        const emojis = this.emotionStates[emotion] || ['😐'];
        return emojis[Math.floor(Math.random() * emojis.length)];
    }

    /**
     * 更新NPC状态
     * @private
     */
    updateNPCState(npc, analysis, reaction) {
        // 更新满意度
        this.updateSatisfaction(npc.id, reaction.satisfactionChange);

        // 更新信任度
        this.updateTrust(npc.id, reaction.trustChange);

        // 更新耐心
        if (reaction.emotion === 'angry') {
            npc.patience = Math.max(0, npc.patience - 10);
        } else if (reaction.emotion === 'happy') {
            npc.patience = Math.min(100, npc.patience + 5);
        }
    }

    /**
     * 更新满意度
     * @param {string} npcRole - NPC角色
     * @param {number} change - 变化量
     */
    updateSatisfaction(npcRole, change) {
        const npc = this.npcs[npcRole];
        if (npc) {
            npc.satisfaction = Math.max(0, Math.min(100,
                npc.satisfaction + change
            ));
            this.stats.satisfactionChanges++;

            console.log(`${npc.emoji} ${npc.name} 满意度: ${npc.satisfaction}% (${change > 0 ? '+' : ''}${change})`);
        }
    }

    /**
     * 更新信任度
     * @param {string} npcRole - NPC角色
     * @param {number} change - 变化量
     */
    updateTrust(npcRole, change) {
        const npc = this.npcs[npcRole];
        if (npc) {
            npc.trustLevel = Math.max(0, Math.min(100,
                npc.trustLevel + change
            ));
            this.stats.trustChanges++;
        }
    }

    /**
     * 获取NPC状态总结
     * @returns {Object} 状态总结
     */
    getStatusSummary() {
        const summary = {};

        Object.keys(this.npcs).forEach(role => {
            const npc = this.npcs[role];
            summary[role] = {
                name: npc.name,
                emoji: npc.emoji,
                satisfaction: npc.satisfaction,
                trustLevel: npc.trustLevel,
                patience: npc.patience,
                status: this.getNPCStatus(npc)
            };
        });

        return summary;
    }

    /**
     * 获取NPC状态
     * @private
     */
    getNPCStatus(npc) {
        if (npc.satisfaction >= 80) return 'very_satisfied';
        if (npc.satisfaction >= 60) return 'satisfied';
        if (npc.satisfaction >= 40) return 'neutral';
        if (npc.satisfaction >= 20) return 'dissatisfied';
        return 'very_dissatisfied';
    }

    /**
     * 检查是否触发特殊事件
     * @param {string} npcRole - NPC角色
     * @returns {Object|null} 特殊事件
     */
    checkSpecialEvent(npcRole) {
        const npc = this.npcs[npcRole];
        if (!npc) return null;

        // CEO满意度很低时可能辞退
        if (npc.id === 'ceo' && npc.satisfaction < 20 && npc.patience < 20) {
            return {
                type: 'crisis',
                title: 'CEO最后通牒',
                description: '张总对你的表现极度不满，给你最后一次机会！',
                consequences: '如果下次决策再失败，你可能会被辞退！'
            };
        }

        // 投资人不满可能撤资
        if (npc.id === 'investor' && npc.satisfaction < 15 && npc.trustLevel < 20) {
            return {
                type: 'crisis',
                title: '投资人警告',
                description: '李先生对投资回报非常失望，考虑撤资！',
                consequences: '预算可能会被削减50%！'
            };
        }

        // CTO不满可能离职
        if (npc.id === 'cto' && npc.satisfaction < 20 && npc.patience < 15) {
            return {
                type: 'crisis',
                title: '技术团队危机',
                description: '王工和技术团队濒临崩溃，考虑集体离职！',
                consequences: '所有开发速度降低50%！'
            };
        }

        // 用户不满可能流失
        if (npc.id === 'user' && npc.satisfaction < 15) {
            return {
                type: 'crisis',
                title: '用户大量流失',
                description: '用户对产品极度不满，正在大量流失！',
                consequences: '每天流失10%用户！'
            };
        }

        return null;
    }

    /**
     * 重置NPC状态
     * @param {string} npcRole - NPC角色（可选，不传则重置所有）
     */
    reset(npcRole = null) {
        if (npcRole) {
            const npc = this.npcs[npcRole];
            if (npc) {
                npc.satisfaction = 60;
                npc.trustLevel = 50;
                npc.patience = 50;
            }
        } else {
            // 重置所有NPC
            Object.values(this.npcs).forEach(npc => {
                npc.satisfaction = 60;
                npc.trustLevel = 50;
                npc.patience = 50;
            });
        }

        console.log('🔄 NPC状态已重置');
    }

    /**
     * 获取统计信息
     * @returns {Object} 统计数据
     */
    getStats() {
        return {
            ...this.stats,
            npcsCount: Object.keys(this.npcs).length,
            averageSatisfaction: this.getAverageSatisfaction(),
            averageTrust: this.getAverageTrust()
        };
    }

    /**
     * 获取平均满意度
     * @private
     */
    getAverageSatisfaction() {
        const npcs = Object.values(this.npcs);
        const total = npcs.reduce((sum, npc) => sum + npc.satisfaction, 0);
        return Math.round(total / npcs.length);
    }

    /**
     * 获取平均信任度
     * @private
     */
    getAverageTrust() {
        const npcs = Object.values(this.npcs);
        const total = npcs.reduce((sum, npc) => sum + npc.trustLevel, 0);
        return Math.round(total / npcs.length);
    }
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NPCManager;
}
