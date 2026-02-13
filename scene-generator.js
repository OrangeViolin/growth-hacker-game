/**
 * 场景生成器 - 增长黑客游戏
 * 动态生成游戏场景、事件和挑战
 *
 * @class SceneGenerator
 * @author AI Integration Engineer
 * @version 1.0.0
 */

class SceneGenerator {
    constructor(aiEngine = null) {
        this.aiEngine = aiEngine;
        this.sceneTemplates = this.loadSceneTemplates();
        this.dynamicScenes = this.loadDynamicScenes();
        this.usedScenes = new Set();
        this.sceneHistory = [];
        this.currentScene = null;

        // 场景类型权重
        this.sceneWeights = {
            'challenge': 0.4,
            'event': 0.3,
            'milestone': 0.2,
            'crisis': 0.1
        };

        // 统计
        this.stats = {
            totalScenes: 0,
            aiGenerated: 0,
            templateBased: 0,
            byType: {
                challenge: 0,
                event: 0,
                milestone: 0,
                crisis: 0
            }
        };

        console.log('🎬 场景生成器初始化完成');
    }

    /**
     * 生成新场景
     * @param {Object} gameState - 游戏状态
     * @param {Array} decisionHistory - 决策历史
     * @returns {Promise<Object>} 生成的场景
     */
    async generateScene(gameState, decisionHistory = []) {
        this.stats.totalScenes++;

        try {
            let scene;

            // 如果有AI引擎且使用真实API，尝试AI生成
            if (this.aiEngine?.useRealAPI && Math.random() < 0.3) {
                scene = await this.generateWithAI(gameState, decisionHistory);
                this.stats.aiGenerated++;
            } else {
                scene = this.generateFromTemplate(gameState, decisionHistory);
                this.stats.templateBased++;
            }

            // 增强场景
            scene = this.enhanceScene(scene, gameState);

            // 记录历史
            this.sceneHistory.push({
                scene: scene,
                gameState: { ...gameState },
                timestamp: Date.now()
            });

            this.currentScene = scene;
            this.usedScenes.add(scene.id || scene.title);

            // 统计类型
            if (this.stats.byType[scene.type]) {
                this.stats.byType[scene.type]++;
            }

            return scene;

        } catch (error) {
            console.error('❌ 场景生成错误:', error);
            return this.getFallbackScene(gameState);
        }
    }

    /**
     * AI生成场景
     * @private
     */
    async generateWithAI(gameState, history) {
        try {
            // 构建提示词
            const prompt = this.buildAIPrompt(gameState, history);

            // 调用AI
            const response = await this.aiEngine.sendMessage(prompt, gameState);

            // 解析AI响应
            return this.parseAIScene(response, gameState);

        } catch (error) {
            console.error('❌ AI场景生成失败:', error);
            // 降级到模板
            return this.generateFromTemplate(gameState, history);
        }
    }

    /**
     * 构建AI提示词
     * @private
     */
    buildAIPrompt(gameState, history) {
        const recentDecisions = history.slice(-3).map(d =>
            `- ${d.action}: ${d.result}`
        ).join('\n');

        return `作为增长黑客游戏的场景设计师，基于当前游戏状态生成下一个场景。

游戏状态：
- Day ${gameState.day}
- 用户数: ${gameState.users}
- 收入: $${gameState.revenue}
- 预算: $${gameState.budget}
- 团队精力: ${gameState.teamEnergy}%
- 用户信任: ${gameState.userTrust}%
- 品牌声誉: ${gameState.brandReputation}%

最近决策：
${recentDecisions || '暂无'}

请生成一个引人入胜的增长挑战场景，包括：

1. **场景标题**（简洁有力，10字以内）
2. **场景描述**（像小说一样，营造氛围，150-200字）
3. **核心挑战**（玩家面临的具体问题）
4. **NPC对话**（CEO、投资人、CTO或用户的反应）
5. **策略提示**（3-4个可能的方向，不要太具体）
6. **预期影响**（这个场景会如何影响游戏状态）

响应格式（JSON）：
{
  "type": "challenge|event|milestone",
  "title": "场景标题",
  "description": "场景描述（150-200字，要有画面感）",
  "challenge": "核心挑战说明",
  "npcs": ["ceo", "investor", "cto", "user"],
  "npcDialogues": {
    "ceo": "CEO的话",
    "investor": "投资人的话"
  },
  "hints": ["提示1", "提示2", "提示3"],
  "difficulty": "easy|medium|hard",
  "timeLimit": 7,
  "expectedImpact": {
    "users": "+20%",
    "revenue": "+$1000",
    "teamEnergy": "-10"
  }
}

重要：
- 场景要符合当前游戏进度
- 挑战要有教育意义
- 提示要启发思考，不要直接给答案
- 确保场景有趣且真实`;
    }

    /**
     * 解析AI场景
     * @private
     */
    parseAIScene(response, gameState) {
        try {
            // 如果response是字符串，尝试解析JSON
            let sceneData = response;
            if (typeof response === 'string') {
                const jsonMatch = response.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    sceneData = JSON.parse(jsonMatch[0]);
                }
            } else if (response.text) {
                const jsonMatch = response.text.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    sceneData = JSON.parse(jsonMatch[0]);
                }
            }

            // 验证和补全场景数据
            return {
                id: `ai_scene_${Date.now()}`,
                type: sceneData.type || 'challenge',
                title: sceneData.title || '新的挑战',
                description: sceneData.description || '一个新的增长挑战出现了...',
                challenge: sceneData.challenge || '如何应对这个挑战？',
                npcs: sceneData.npcs || ['advisor'],
                npcDialogues: sceneData.npcDialogues || {},
                hints: sceneData.hints || ['分析数据', '考虑成本', '测试假设'],
                difficulty: sceneData.difficulty || 'medium',
                timeLimit: sceneData.timeLimit || 7,
                expectedImpact: sceneData.expectedImpact || {},
                source: 'ai',
                createdAt: Date.now()
            };

        } catch (error) {
            console.error('❌ AI场景解析失败:', error);
            return this.generateFromTemplate(gameState, []);
        }
    }

    /**
     * 从模板生成场景
     * @private
     */
    generateFromTemplate(gameState, decisionHistory) {
        // 找到匹配的模板
        const matchedTemplates = this.findMatchingTemplates(gameState);

        if (matchedTemplates.length === 0) {
            // 使用动态场景
            return this.generateDynamicScene(gameState);
        }

        // 选择一个模板（优先未使用的）
        const template = this.selectTemplate(matchedTemplates);

        // 基于模板生成场景
        return this.instantiateTemplate(template, gameState);
    }

    /**
     * 查找匹配的模板
     * @private
     */
    findMatchingTemplates(gameState) {
        return this.sceneTemplates.filter(template => {
            return this.checkTrigger(template.trigger, gameState);
        });
    }

    /**
     * 检查触发条件
     * @private
     */
    checkTrigger(trigger, gameState) {
        if (!trigger) return true;

        // 检查每个条件
        for (const [key, condition] of Object.entries(trigger)) {
            const value = gameState[key];

            if (typeof condition === 'string') {
                // 字符串条件（如 "<1000", ">50%"）
                if (!this.evaluateCondition(value, condition)) {
                    return false;
                }
            } else if (typeof condition === 'object') {
                // 对象条件（如 {min: 10, max: 100}）
                if (condition.min !== undefined && value < condition.min) return false;
                if (condition.max !== undefined && value > condition.max) return false;
            } else {
                // 直接值比较
                if (value !== condition) return false;
            }
        }

        return true;
    }

    /**
     * 评估条件
     * @private
     */
    evaluateCondition(value, condition) {
        const match = condition.match(/([<>=]+)(\d+)/);
        if (!match) return true;

        const operator = match[1];
        const threshold = parseInt(match[2]);

        switch (operator) {
            case '<': return value < threshold;
            case '<=': return value <= threshold;
            case '>': return value > threshold;
            case '>=': return value >= threshold;
            case '=': return value === threshold;
            default: return true;
        }
    }

    /**
     * 选择模板
     * @private
     */
    selectTemplate(templates) {
        // 优先选择未使用的
        const unused = templates.filter(t => !this.usedScenes.has(t.id));
        const pool = unused.length > 0 ? unused : templates;

        // 随机选择
        return pool[Math.floor(Math.random() * pool.length)];
    }

    /**
     * 实例化模板
     * @private
     */
    instantiateTemplate(template, gameState) {
        return {
            id: template.id,
            type: template.type,
            title: template.title,
            description: this.replaceVariables(template.description, gameState),
            challenge: this.replaceVariables(template.challenge, gameState),
            npcs: template.npcs || ['advisor'],
            npcDialogues: this.generateNPCDialogues(template, gameState),
            hints: template.hints || [],
            difficulty: template.difficulty || 'medium',
            timeLimit: template.timeLimit || 7,
            expectedImpact: template.expectedImpact || {},
            source: 'template',
            createdAt: Date.now()
        };
    }

    /**
     * 生成NPC对话
     * @private
     */
    generateNPCDialogues(template, gameState) {
        const dialogues = {};

        (template.npcs || []).forEach(npc => {
            if (template.npcDialogues && template.npcDialogues[npc]) {
                dialogues[npc] = this.replaceVariables(
                    template.npcDialogues[npc],
                    gameState
                );
            }
        });

        return dialogues;
    }

    /**
     * 替换变量
     * @private
     */
    replaceVariables(text, gameState) {
        if (!text) return '';

        let result = text;

        // 替换游戏状态变量
        const vars = {
            day: gameState.day || 1,
            users: gameState.users || 0,
            revenue: gameState.revenue || 0,
            budget: gameState.budget || 10000,
            teamEnergy: gameState.teamEnergy || 100,
            userTrust: gameState.userTrust || 70,
            brandReputation: gameState.brandReputation || 60
        };

        Object.keys(vars).forEach(key => {
            const regex = new RegExp(`\\{${key}\\}`, 'g');
            result = result.replace(regex, vars[key]);
        });

        return result;
    }

    /**
     * 生成动态场景
     * @private
     */
    generateDynamicScene(gameState) {
        // 根据游戏状态动态选择场景类型
        const type = this.selectSceneType(gameState);
        const dynamicScenes = this.dynamicScenes[type] || [];

        if (dynamicScenes.length === 0) {
            return this.getFallbackScene(gameState);
        }

        const scene = dynamicScenes[Math.floor(Math.random() * dynamicScenes.length)];
        return this.instantiateTemplate(scene, gameState);
    }

    /**
     * 选择场景类型
     * @private
     */
    selectSceneType(gameState) {
        // 危机情况
        if (gameState.budget < 1000 || gameState.teamEnergy < 20) {
            return 'crisis';
        }

        // 里程碑
        if (gameState.users >= 10000 || gameState.revenue >= 50000) {
            return 'milestone';
        }

        // 随机事件
        if (Math.random() < 0.3) {
            return 'event';
        }

        // 默认挑战
        return 'challenge';
    }

    /**
     * 增强场景
     * @private
     */
    enhanceScene(scene, gameState) {
        // 添加上下文信息
        scene.context = {
            day: gameState.day,
            phase: this.getGamePhase(gameState),
            urgency: this.calculateUrgency(scene, gameState)
        };

        // 添加可选目标
        scene.optionalGoals = this.generateOptionalGoals(scene, gameState);

        // 添加奖励预览
        scene.rewards = this.generateRewards(scene, gameState);

        return scene;
    }

    /**
     * 获取游戏阶段
     * @private
     */
    getGamePhase(gameState) {
        if (gameState.day < 30) return 'early';
        if (gameState.day < 90) return 'growth';
        if (gameState.day < 180) return 'scale';
        return 'mature';
    }

    /**
     * 计算紧急度
     * @private
     */
    calculateUrgency(scene, gameState) {
        let urgency = 50;

        if (scene.type === 'crisis') urgency += 40;
        if (gameState.budget < 2000) urgency += 20;
        if (gameState.teamEnergy < 30) urgency += 15;
        if (scene.timeLimit && scene.timeLimit < 5) urgency += 15;

        return Math.min(100, urgency);
    }

    /**
     * 生成可选目标
     * @private
     */
    generateOptionalGoals(scene, gameState) {
        return [
            {
                description: '完美解决（获得额外奖励）',
                requirement: '超越预期目标20%',
                reward: { bonus: '+50%' }
            },
            {
                description: '快速解决（时间奖励）',
                requirement: '在3天内完成',
                reward: { time: '+3 days' }
            },
            {
                description: '低成本解决（效率奖励）',
                requirement: '花费少于预算50%',
                reward: { budget: '+$1000' }
            }
        ];
    }

    /**
     * 生成奖励
     * @private
     */
    generateRewards(scene, gameState) {
        const baseReward = {
            users: Math.floor(gameState.users * 0.1),
            revenue: Math.floor(gameState.revenue * 0.15),
            reputation: 5
        };

        // 根据难度调整
        const multiplier = {
            'easy': 0.8,
            'medium': 1.0,
            'hard': 1.5
        }[scene.difficulty] || 1.0;

        return {
            users: Math.floor(baseReward.users * multiplier),
            revenue: Math.floor(baseReward.revenue * multiplier),
            reputation: Math.floor(baseReward.reputation * multiplier)
        };
    }

    /**
     * 获取后备场景
     * @private
     */
    getFallbackScene(gameState) {
        return {
            id: 'fallback',
            type: 'challenge',
            title: '日常增长挑战',
            description: `Day ${gameState.day}，你继续推动产品增长。\n\n目前有${gameState.users}用户，收入$${gameState.revenue}。团队精力${gameState.teamEnergy}%，还有$${gameState.budget}预算可用。\n\n下一步该怎么做？`,
            challenge: '选择最有效的增长策略，在有限资源下实现最大化增长。',
            npcs: ['advisor'],
            npcDialogues: {
                advisor: '让我们分析一下当前情况，找到最佳的增长路径。'
            },
            hints: [
                '分析当前最大的瓶颈',
                '考虑成本效益比',
                '关注长期可持续性'
            ],
            difficulty: 'medium',
            timeLimit: 7,
            expectedImpact: {},
            source: 'fallback',
            createdAt: Date.now()
        };
    }

    /**
     * 加载场景模板
     * @private
     */
    loadSceneTemplates() {
        return [
            {
                id: 'startup_launch',
                trigger: { day: 1, users: 0 },
                type: 'challenge',
                title: '初创启动',
                description: '你刚加入这家创业公司担任增长负责人。\n\n办公室里只有CEO张总、CTO王工和你三个人。产品刚开发完成，一个用户都没有，预算只有$10000。\n\n张总拍着你的肩膀说："我们的产品绝对能改变市场！但现在最重要的是获取第一批用户。你有什么计划？"',
                challenge: '如何获取第一批种子用户？',
                npcs: ['ceo', 'advisor'],
                npcDialogues: {
                    ceo: '我们需要快速验证市场！能不能在一周内拿到100个用户？',
                    advisor: '记住，早期用户质量 > 数量。找到真正的早期adopters。'
                },
                hints: [
                    '手动推广可能比付费广告更有效',
                    '在相关社区直接接触目标用户',
                    '提供独特价值，而非促销',
                    '深度交流，了解真实需求'
                ],
                difficulty: 'easy',
                timeLimit: 7,
                expectedImpact: {
                    users: '+50-200',
                    teamEnergy: '-5'
                }
            },
            {
                id: 'growth_stagnation',
                trigger: { day: { min: 20, max: 40 }, users: '<500' },
                type: 'challenge',
                title: '增长停滞',
                description: '一个月过去了，增长不如预期。\n\n每天只有零星的新用户注册，{users}的用户数让投资人李先生很不满意。他在电话里冷冷地说："我看不到增长的迹象。给你两周时间，拿出像样的增长数据，否则我们要重新考虑投资了。"',
                challenge: '如何突破增长瓶颈？',
                npcs: ['investor', 'ceo', 'advisor'],
                npcDialogues: {
                    investor: '数据说明一切。我需要看到至少3倍的增长。',
                    ceo: '是不是策略有问题？我们要不要换个方向？',
                    advisor: '先别慌。分析数据，找到真正的瓶颈在哪里。'
                },
                hints: [
                    '分析用户漏斗，找到最大掉点',
                    '深度访谈现有用户',
                    '测试新的获客渠道',
                    '优化产品核心价值'
                ],
                difficulty: 'medium',
                timeLimit: 14,
                expectedImpact: {
                    users: '+500',
                    teamEnergy: '-15'
                }
            },
            {
                id: 'viral_opportunity',
                trigger: { users: { min: 500, max: 5000 }, userTrust: '>60' },
                type: 'event',
                title: '病毒传播机会',
                description: '你注意到一个有趣的现象：有些用户自发在社交媒体上分享你的产品。\n\n数据显示，这些分享带来的用户转化率是其他渠道的3倍！而且用户信任度高达{userTrust}%，这是建立病毒循环的绝佳时机。',
                challenge: '如何设计病毒增长机制？',
                npcs: ['advisor', 'cto'],
                npcDialogues: {
                    advisor: '病毒增长的核心是给用户分享的动机。不要用金钱奖励，那会降低质量。',
                    cto: '实现分享功能不难，但要做得优雅自然，不能打扰用户。'
                },
                hints: [
                    '找到用户自然分享的动机',
                    '降低分享摩擦',
                    '优化分享内容',
                    '建立激励机制'
                ],
                difficulty: 'medium',
                timeLimit: 10,
                expectedImpact: {
                    users: '+50%',
                    revenue: '+20%'
                }
            },
            {
                id: 'budget_crisis',
                trigger: { budget: '<2000' },
                type: 'crisis',
                title: '预算危机',
                description: '预算告急！\n\n财务报表显示，账上只剩${budget}。按照目前的烧钱速度，最多还能撑一个月。\n\n投资人李先生说："下一轮融资至少要等3个月。你必须让公司自给自足，否则..."他没有说完，但意思很明显。',
                challenge: '如何在预算耗尽前实现盈利？',
                npcs: ['investor', 'ceo', 'advisor'],
                npcDialogues: {
                    investor: '削减不必要的开支。如果需要，裁员也在考虑范围内。',
                    ceo: '我们不能死在钱上！想办法变现！',
                    advisor: '冷静。分析成本结构，找到快速变现的机会。'
                },
                hints: [
                    '停止所有付费推广',
                    '专注核心付费用户',
                    '快速测试变现方案',
                    '降低运营成本'
                ],
                difficulty: 'hard',
                timeLimit: 30,
                expectedImpact: {
                    revenue: '+300%',
                    teamEnergy: '-30'
                }
            },
            {
                id: 'team_burnout',
                trigger: { teamEnergy: '<30' },
                type: 'crisis',
                title: '团队濒临崩溃',
                description: '连续加班让团队精疲力竭。\n\nCTO王工在会议上爆发了："看看这些bug！看看这些技术债！我们的代码质量已经烂到不能再烂了！"\n\n他摔门而出，留下一句话："再这样下去，我就辞职。"',
                challenge: '如何平衡增长和团队健康？',
                npcs: ['cto', 'ceo', 'advisor'],
                npcDialogues: {
                    cto: '团队精力只有{teamEnergy}%！系统随时可能崩溃！',
                    ceo: '但我们不能停下来！市场不会等我们！',
                    advisor: '短期的快速增长不能以牺牲团队为代价。找到平衡。'
                },
                hints: [
                    '给团队休息时间',
                    '重构核心代码',
                    '自动化重复工作',
                    '调整增长预期'
                ],
                difficulty: 'hard',
                timeLimit: 7,
                expectedImpact: {
                    teamEnergy: '+40',
                    users: '-10%'
                }
            },
            {
                id: 'milestone_10k',
                trigger: { users: { min: 10000, max: 15000 } },
                type: 'milestone',
                title: '突破1万用户！',
                description: '恭喜！用户数突破1万大关！\n\n全公司都在庆祝这个里程碑。CEO张总开了香槟，投资人李先生也发来祝贺邮件。\n\n但庆祝过后，张总问了一个问题："下一步呢？我们如何从1万做到10万？"',
                challenge: '如何规模化成功经验？',
                npcs: ['ceo', 'investor', 'advisor'],
                npcDialogues: {
                    ceo: '这证明了我们的模式！现在是时候大规模扩张了！',
                    investor: '不错。但要确保增长质量。我希望看到健康的单位经济模型。',
                    advisor: '恭喜你达到PMF！接下来要关注规模化和建立护城河。'
                },
                hints: [
                    '分析增长引擎',
                    '优化单位经济',
                    '建立增长团队',
                    '拓展新渠道'
                ],
                difficulty: 'medium',
                timeLimit: 14,
                expectedImpact: {
                    users: '+100%',
                    revenue: '+200%'
                }
            },
            {
                id: 'user_revolt',
                trigger: { userTrust: '<40' },
                type: 'crisis',
                title: '用户反叛',
                description: '社交媒体上爆发了对你产品的批评风暴。\n\n用户小明代表一大群不满的用户说："你们只想着赚钱，根本不在乎用户体验！这个垃圾功能是谁设计的？！"\n\n负面评论铺天盖地，用户信任度跌至{userTrust}%。',
                challenge: '如何挽回用户信任？',
                npcs: ['user', 'advisor', 'ceo'],
                npcDialogues: {
                    user: '别再给我推销了！先把产品做好再说！',
                    advisor: '这是个危机，但也是机会。真诚倾听，快速改进。',
                    ceo: '我们的品牌声誉受损！必须立即采取行动！'
                },
                hints: [
                    '公开道歉和承诺',
                    '快速修复核心问题',
                    '建立用户反馈机制',
                    '暂停激进增长策略'
                ],
                difficulty: 'hard',
                timeLimit: 7,
                expectedImpact: {
                    userTrust: '+30',
                    brandReputation: '+20',
                    users: '-15%'
                }
            },
            {
                id: 'competitor_threat',
                trigger: { users: { min: 5000 }, brandReputation: '>60' },
                type: 'event',
                title: '竞争对手威胁',
                description: '一家资金雄厚的竞争对手进入市场。\n\n他们烧钱获客，价格比你低50%，广告铺天盖地。更糟的是，他们挖走了你的几个核心用户。\n\nCEO张总焦虑地说："他们有的是钱！我们怎么竞争？"',
                challenge: '如何应对强势竞争？',
                npcs: ['ceo', 'advisor', 'investor'],
                npcDialogues: {
                    ceo: '我们要不要也烧钱？打价格战？',
                    advisor: '不要陷入价格战。专注差异化和核心价值。',
                    investor: '记住，他们也在烧投资人的钱。谁能活到最后才是赢家。'
                },
                hints: [
                    '强化差异化优势',
                    '提升用户粘性',
                    '建立品牌忠诚度',
                    '不要打价格战'
                ],
                difficulty: 'hard',
                timeLimit: 14,
                expectedImpact: {
                    userTrust: '+15',
                    brandReputation: '+10'
                }
            }
        ];
    }

    /**
     * 加载动态场景
     * @private
     */
    loadDynamicScenes() {
        return {
            challenge: [
                {
                    id: 'optimize_funnel',
                    type: 'challenge',
                    title: '优化转化漏斗',
                    description: '数据显示，你的转化漏斗存在严重掉点。\n\n访客到注册的转化率只有2%，注册到激活只有30%，激活到付费只有5%。\n\n这意味着大量流量在浪费。如果能优化漏斗，增长会立即提升。',
                    challenge: '如何系统性优化转化漏斗？',
                    npcs: ['advisor', 'cto'],
                    hints: ['A/B测试关键页面', '简化注册流程', '优化首次体验', '改进价值传达'],
                    difficulty: 'medium',
                    timeLimit: 10
                },
                {
                    id: 'retention_problem',
                    type: 'challenge',
                    title: '留存危机',
                    description: '虽然新用户在增长，但老用户在流失。\n\n7日留存只有20%，30日留存不到10%。这像一个漏水的桶，再怎么往里倒水也填不满。',
                    challenge: '如何提升用户留存？',
                    npcs: ['advisor', 'user'],
                    hints: ['建立Aha时刻', '设计留存钩子', '优化通知策略', '建立用户习惯'],
                    difficulty: 'hard',
                    timeLimit: 14
                }
            ],
            event: [
                {
                    id: 'media_exposure',
                    type: 'event',
                    title: '媒体曝光机会',
                    description: '一家知名科技媒体的记者联系你，希望报道你的产品。\n\n这是个绝佳的免费曝光机会，但你需要准备一个引人入胜的故事。',
                    challenge: '如何最大化媒体曝光价值？',
                    npcs: ['advisor', 'ceo'],
                    hints: ['准备独特故事', '优化落地页', '准备应对流量', '设置追踪机制'],
                    difficulty: 'easy',
                    timeLimit: 7
                },
                {
                    id: 'partnership_opportunity',
                    type: 'event',
                    title: '合作机会',
                    description: '一家大公司提出合作意向，他们可以为你带来大量用户。\n\n但代价是要给他们30%的收入分成，并且要深度集成他们的系统。',
                    challenge: '是否接受合作？如何谈判？',
                    npcs: ['ceo', 'investor', 'cto'],
                    hints: ['评估长期价值', '考虑依赖风险', '谈判更好条件', '小规模测试'],
                    difficulty: 'medium',
                    timeLimit: 7
                }
            ],
            milestone: [
                {
                    id: 'product_market_fit',
                    type: 'milestone',
                    title: '产品市场契合',
                    description: '数据显示你达到了PMF！\n\n用户自增长率超过40%，NPS分数70+，用户反馈"如果没有这个产品会非常失望"的比例达到40%。',
                    challenge: '如何巩固和扩大PMF？',
                    npcs: ['advisor', 'investor'],
                    hints: ['规模化增长', '拓展市场', '建立护城河', '优化经济模型'],
                    difficulty: 'medium',
                    timeLimit: 14
                }
            ],
            crisis: [
                {
                    id: 'security_breach',
                    type: 'crisis',
                    title: '安全危机',
                    description: '系统被黑客攻击！\n\n部分用户数据可能泄露。这是灾难性的危机，处理不好可能导致公司倒闭。',
                    challenge: '如何处理安全危机？',
                    npcs: ['cto', 'advisor', 'user'],
                    hints: ['立即修复漏洞', '透明沟通', '赔偿受影响用户', '加强安全措施'],
                    difficulty: 'hard',
                    timeLimit: 3
                }
            ]
        };
    }

    /**
     * 获取当前场景
     * @returns {Object|null} 当前场景
     */
    getCurrentScene() {
        return this.currentScene;
    }

    /**
     * 获取场景历史
     * @returns {Array} 场景历史
     */
    getSceneHistory() {
        return this.sceneHistory;
    }

    /**
     * 清空使用记录（新游戏时调用）
     */
    resetUsedScenes() {
        this.usedScenes.clear();
        this.sceneHistory = [];
        this.currentScene = null;
        console.log('🔄 场景使用记录已清空');
    }

    /**
     * 获取统计信息
     * @returns {Object} 统计数据
     */
    getStats() {
        return {
            ...this.stats,
            totalTemplates: this.sceneTemplates.length,
            usedScenes: this.usedScenes.size,
            historyLength: this.sceneHistory.length,
            currentScene: this.currentScene?.title || null
        };
    }
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SceneGenerator;
}
