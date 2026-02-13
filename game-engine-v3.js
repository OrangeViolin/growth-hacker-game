/**
 * Growth Hacker Game Engine V3
 * 支持AI对话的增强游戏引擎
 *
 * 功能：
 * - 自由对话输入
 * - AI驱动的NPC响应
 * - 动态场景生成
 * - 策略评估与执行
 * - 多轮对话支持
 * - 个性化结局生成
 */

class GrowthGameEngineV3 {
    constructor(config) {
        // 基础状态
        this.company = config.company || 'MyStartup';
        this.industry = config.industry || 'saas';

        // 游戏指标
        this.metrics = {
            users: config.initialUsers || 1000,
            revenue: config.initialRevenue || 5000,
            budget: config.budget || 10000,
            teamEnergy: 100,
            marketTiming: 100,
            userTrust: 50,
            brandReputation: 50
        };

        // 游戏进度
        this.day = 1;
        this.currentScene = null;
        this.conversationHistory = [];
        this.decisionHistory = [];

        // NPC关系
        this.relationships = {
            ceo: 80,
            investor: 60,
            team: 70,
            user: 50
        };

        // AI系统
        this.aiEngine = null;
        this.npcManager = null;
        this.sceneGenerator = null;

        // 游戏状态
        this.gameActive = true;
        this.currentNPC = 'advisor';
        this.waitingForUserInput = false;

        // 配置
        this.config = config;
    }

    /**
     * 初始化AI系统
     * @param {string} apiKey - Claude API密钥（可选）
     */
    initializeAI(apiKey) {
        try {
            this.aiEngine = new AIDialogueEngine(apiKey);
            this.npcManager = new NPCManager();
            this.sceneGenerator = new SceneGenerator(this.aiEngine);

            console.log('🎮 AI系统初始化:', this.aiEngine.useRealAPI ? '真实API模式' : '智能规则引擎模式');

            return {
                success: true,
                mode: this.aiEngine.useRealAPI ? 'api' : 'rules'
            };
        } catch (error) {
            console.error('AI系统初始化失败:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * 处理用户输入（核心方法）
     * @param {string} userInput - 用户输入的文本
     * @returns {Promise<Object>} 处理结果
     */
    async handleUserInput(userInput) {
        try {
            if (!this.gameActive) {
                return {
                    success: false,
                    error: '游戏已结束'
                };
            }

            // 1. 记录输入
            this.conversationHistory.push({
                role: 'user',
                content: userInput,
                timestamp: Date.now(),
                day: this.day
            });

            // 2. 构建上下文
            const context = this._buildContext();

            // 3. 发送给AI分析
            const aiResponse = await this.aiEngine.sendMessage(userInput, context);

            // 4. 记录AI响应
            this.conversationHistory.push({
                role: aiResponse.role || this.currentNPC,
                content: aiResponse.text,
                emotion: aiResponse.emotion,
                timestamp: Date.now(),
                day: this.day
            });

            // 5. 应用资源影响
            if (aiResponse.resourceImpact) {
                this.updateMetrics(aiResponse.resourceImpact);
            }

            // 6. 更新NPC关系
            if (aiResponse.relationshipImpact) {
                this.updateRelationships(aiResponse.relationshipImpact);
            }

            // 7. 检查场景切换
            if (aiResponse.sceneChange) {
                await this.changeScene(aiResponse.sceneChange);
            }

            // 8. 切换当前NPC
            if (aiResponse.nextRole) {
                this.currentNPC = aiResponse.nextRole;
            }

            // 9. 检查游戏结束条件
            const gameEndCheck = this.checkGameEnd();

            return {
                success: true,
                response: aiResponse,
                gameState: this.getGameState(),
                nextNPC: this.currentNPC,
                gameEnd: gameEndCheck.ended ? gameEndCheck : null
            };
        } catch (error) {
            console.error('处理用户输入失败:', error);
            return {
                success: false,
                error: error.message,
                fallbackResponse: this._getFallbackResponse(userInput)
            };
        }
    }

    /**
     * 执行策略（当用户确定执行某个方案时）
     * @param {string} strategyDescription - 策略描述
     * @returns {Promise<Object>} 执行结果
     */
    async executeStrategy(strategyDescription) {
        try {
            console.log(`📋 执行策略: ${strategyDescription}`);

            // 1. 评估策略
            const evaluation = await this.evaluateStrategy(strategyDescription);

            // 2. 应用效果
            const effects = this.applyStrategyEffects(evaluation);

            // 3. 推进时间
            const timeRequired = evaluation.timeRequired || 7;
            this.advanceTime(timeRequired);

            // 4. 生成结果反馈
            const resultFeedback = await this.generateResultFeedback(evaluation, effects);

            // 5. 触发后续事件
            const events = this.checkTriggeredEvents();

            // 6. 检查游戏结束
            const gameEndCheck = this.checkGameEnd();

            return {
                success: true,
                evaluation,
                effects,
                resultFeedback,
                events,
                timeElapsed: timeRequired,
                newGameState: this.getGameState(),
                gameEnd: gameEndCheck.ended ? gameEndCheck : null
            };
        } catch (error) {
            console.error('执行策略失败:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * 评估策略（AI驱动）
     * @param {string} strategy - 策略描述
     * @returns {Promise<Object>} 评估结果
     */
    async evaluateStrategy(strategy) {
        const prompt = `作为增长顾问，评估这个策略：

策略：${strategy}

当前状态：
- 用户数: ${this.metrics.users}
- 收入: $${this.metrics.revenue}
- 预算: $${this.metrics.budget}
- 团队精力: ${this.metrics.teamEnergy}%
- 市场时机: ${this.metrics.marketTiming}%
- 用户信任: ${this.metrics.userTrust}%
- 品牌声誉: ${this.metrics.brandReputation}%
- 当前第${this.day}天

请评估：
1. 可行性 (1-10分)
2. 预期效果（用户增长、收入增长）
3. 成本（金钱、时间、精力）
4. 风险等级（低/中/高）
5. 建议优化

以JSON格式返回：
{
  "feasibility": 8,
  "expectedUserGrowth": 500,
  "expectedRevenueGrowth": 2000,
  "cost": 3000,
  "timeRequired": 7,
  "energyCost": 15,
  "risk": "中",
  "optimization": "建议...",
  "summary": "总结..."
}`;

        try {
            const response = await this.aiEngine.sendMessage(prompt, this._buildContext());

            // 尝试解析JSON
            let evaluation;
            try {
                evaluation = this._extractJSON(response.text);
            } catch (e) {
                // 如果无法解析，使用规则引擎
                evaluation = this._fallbackEvaluation(strategy);
            }

            evaluation.strategy = strategy;
            return evaluation;
        } catch (error) {
            console.error('策略评估失败，使用备用评估:', error);
            return this._fallbackEvaluation(strategy);
        }
    }

    /**
     * 应用策略效果
     * @param {Object} evaluation - 策略评估结果
     * @returns {Object} 实际效果
     */
    applyStrategyEffects(evaluation) {
        // 基于AI评估应用效果（带随机性）
        const randomFactor = 0.7 + Math.random() * 0.6; // 0.7-1.3倍

        const effects = {
            userGrowth: Math.round((evaluation.expectedUserGrowth || 0) * randomFactor),
            revenueGrowth: Math.round((evaluation.expectedRevenueGrowth || 0) * randomFactor),
            cost: evaluation.cost || 0,
            energyCost: evaluation.energyCost || 10,
            reputationChange: this._calculateReputationChange(evaluation),
            trustChange: this._calculateTrustChange(evaluation)
        };

        // 应用到指标
        this.metrics.users = Math.max(0, this.metrics.users + effects.userGrowth);
        this.metrics.revenue = Math.max(0, this.metrics.revenue + effects.revenueGrowth);
        this.metrics.budget = Math.max(0, this.metrics.budget - effects.cost);
        this.metrics.teamEnergy = Math.max(0, Math.min(100, this.metrics.teamEnergy - effects.energyCost));
        this.metrics.brandReputation = Math.max(0, Math.min(100, this.metrics.brandReputation + effects.reputationChange));
        this.metrics.userTrust = Math.max(0, Math.min(100, this.metrics.userTrust + effects.trustChange));

        // 记录决策
        this.decisionHistory.push({
            day: this.day,
            strategy: evaluation.strategy,
            evaluation: evaluation,
            effects: effects,
            quality: this.assessDecisionQuality(effects, evaluation),
            timestamp: Date.now()
        });

        console.log('✅ 策略效果已应用:', effects);
        return effects;
    }

    /**
     * 推进时间
     * @param {number} days - 推进的天数
     */
    advanceTime(days) {
        this.day += days;

        console.log(`⏰ 时间推进 ${days} 天 (第${this.day}天)`);

        // 时间流逝的效果
        this.metrics.marketTiming = Math.max(0, this.metrics.marketTiming - days * 2);
        this.metrics.teamEnergy = Math.min(100, this.metrics.teamEnergy + days * 1);

        // 自然增长/衰减
        const naturalGrowth = this.calculateNaturalGrowth(days);
        this.metrics.users = Math.max(0, this.metrics.users + naturalGrowth.users);
        this.metrics.revenue = Math.max(0, this.metrics.revenue + naturalGrowth.revenue);

        // 预算消耗（运营成本）
        const operatingCost = days * 50; // 每天$50运营成本
        this.metrics.budget = Math.max(0, this.metrics.budget - operatingCost);
    }

    /**
     * 计算自然增长
     * @param {number} days - 天数
     * @returns {Object} 增长数据
     */
    calculateNaturalGrowth(days) {
        // 基于当前用户和信任度的自然增长
        const baseGrowthRate = 0.001; // 0.1%/天
        const trustMultiplier = this.metrics.userTrust / 100;

        return {
            users: Math.round(this.metrics.users * baseGrowthRate * days * trustMultiplier),
            revenue: Math.round(this.metrics.revenue * baseGrowthRate * days * trustMultiplier * 0.5)
        };
    }

    /**
     * 改变场景
     * @param {string|Object} sceneChange - 场景变更信息
     * @returns {Promise<Object>} 新场景对话
     */
    async changeScene(sceneChange) {
        try {
            const newScene = await this.sceneGenerator.generateScene(
                this.getGameState(),
                this.decisionHistory
            );

            this.currentScene = newScene;
            console.log('🎬 场景切换:', newScene.name);

            // 触发场景开始对话
            return await this.startSceneDialogue(newScene);
        } catch (error) {
            console.error('场景切换失败:', error);
            return null;
        }
    }

    /**
     * 开始场景对话
     * @param {Object} scene - 场景对象
     * @returns {Promise<Array>} NPC对话列表
     */
    async startSceneDialogue(scene) {
        const npcDialogues = [];
        const npcs = scene.npcs || ['advisor'];

        for (const npcRole of npcs) {
            try {
                const npc = this.npcManager.getNPC(npcRole);
                this.aiEngine.currentRole = npcRole;

                const prompt = `场景：${scene.description || scene.name}

你作为${npc.name}（${npcRole}），对玩家说什么？

当前关系: ${this.relationships[npcRole] || 50}/100
场景情绪: ${scene.mood || 'neutral'}

用第一人称，简短有力（100字内）。`;

                const dialogue = await this.aiEngine.sendMessage(prompt, this._buildContext());

                const dialogueEntry = {
                    role: npcRole,
                    name: npc.name,
                    text: dialogue.text,
                    emotion: dialogue.emotion || npc.personality.defaultEmotion
                };

                npcDialogues.push(dialogueEntry);

                this.conversationHistory.push({
                    role: npcRole,
                    content: dialogue.text,
                    timestamp: Date.now(),
                    day: this.day,
                    scene: scene.name
                });
            } catch (error) {
                console.error(`NPC ${npcRole} 对话生成失败:`, error);
            }
        }

        return npcDialogues;
    }

    /**
     * 生成结果反馈
     * @param {Object} evaluation - 评估结果
     * @param {Object} effects - 实际效果
     * @returns {Promise<Object>} 反馈文本
     */
    async generateResultFeedback(evaluation, effects) {
        const prompt = `策略执行完毕，生成结果反馈：

策略: ${evaluation.strategy}
预期效果: 用户+${evaluation.expectedUserGrowth}, 收入+$${evaluation.expectedRevenueGrowth}
实际效果: 用户+${effects.userGrowth}, 收入+$${effects.revenueGrowth}

花费: $${effects.cost}, 精力-${effects.energyCost}%

以第一人称，生成一段100字的结果描述，包括：
1. 执行过程
2. 实际效果对比预期
3. 意外收获或问题
4. 下一步建议`;

        try {
            const response = await this.aiEngine.sendMessage(prompt, this._buildContext());
            return {
                text: response.text,
                sentiment: this._analyzeSentiment(effects, evaluation)
            };
        } catch (error) {
            console.error('结果反馈生成失败:', error);
            return {
                text: this._generateFallbackFeedback(effects, evaluation),
                sentiment: 'neutral'
            };
        }
    }

    /**
     * 检查触发的事件
     * @returns {Array} 事件列表
     */
    checkTriggeredEvents() {
        const events = [];

        // 里程碑事件
        if (this.metrics.users >= 5000 && !this._hasTriggered('milestone_5k')) {
            events.push({
                type: 'milestone',
                title: '🎉 用户突破5000！',
                description: '你的产品开始获得市场认可',
                impact: { brandReputation: 5 }
            });
            this._markTriggered('milestone_5k');
        }

        if (this.metrics.users >= 10000 && !this._hasTriggered('milestone_10k')) {
            events.push({
                type: 'milestone',
                title: '🚀 用户破万！',
                description: '投资人开始主动联系你',
                impact: { investor: 10, brandReputation: 10 }
            });
            this._markTriggered('milestone_10k');
        }

        // 危机事件
        if (this.metrics.budget < 2000 && !this._hasTriggered('crisis_lowbudget')) {
            events.push({
                type: 'crisis',
                title: '⚠️ 预算紧张！',
                description: '账上资金不足$2000，需要开源节流',
                impact: { teamEnergy: -10 }
            });
            this._markTriggered('crisis_lowbudget');
        }

        if (this.metrics.teamEnergy < 30 && !this._hasTriggered('crisis_burnout')) {
            events.push({
                type: 'crisis',
                title: '😫 团队倦怠',
                description: '团队精力严重不足，需要休整',
                impact: { team: -10 }
            });
            this._markTriggered('crisis_burnout');
        }

        // 应用事件影响
        events.forEach(event => {
            if (event.impact) {
                if (event.impact.brandReputation) {
                    this.updateMetrics({ brandReputation: event.impact.brandReputation });
                }
                if (event.impact.teamEnergy) {
                    this.updateMetrics({ teamEnergy: event.impact.teamEnergy });
                }
                Object.keys(event.impact).forEach(key => {
                    if (this.relationships.hasOwnProperty(key)) {
                        this.updateRelationships({ [key]: event.impact[key] });
                    }
                });
            }
        });

        return events;
    }

    /**
     * 检查游戏结束条件
     * @returns {Object} 检查结果
     */
    checkGameEnd() {
        if (!this.gameActive) {
            return { ended: false };
        }

        // 胜利条件
        if (this.day >= 180 && this.metrics.users >= 20000) {
            return { ended: true, outcome: 'success', trigger: 'target_achieved' };
        }

        // 完美胜利
        if (this.metrics.revenue > 50000 && this.metrics.users > 15000 && this.day < 90) {
            return { ended: true, outcome: 'spectacular', trigger: 'rapid_growth' };
        }

        // 失败条件
        if (this.metrics.budget <= 0) {
            return { ended: true, outcome: 'failure', trigger: 'bankrupt' };
        }

        if (this.metrics.teamEnergy <= 0) {
            return { ended: true, outcome: 'failure', trigger: 'burnout' };
        }

        if (this.relationships.investor <= 10) {
            return { ended: true, outcome: 'failure', trigger: 'investor_quit' };
        }

        if (this.day >= 365 && this.metrics.users < 10000) {
            return { ended: true, outcome: 'failure', trigger: 'timeout' };
        }

        return { ended: false };
    }

    /**
     * 结束游戏
     * @param {string} outcome - 结局类型
     * @returns {Promise<Object>} 结局信息
     */
    async endGame(outcome) {
        this.gameActive = false;
        console.log(`🎮 游戏结束: ${outcome}`);

        // AI生成个性化结局
        const ending = await this.generateEnding(outcome);

        return {
            outcome,
            ending,
            finalMetrics: { ...this.metrics },
            finalRelationships: { ...this.relationships },
            decisions: this.decisionHistory,
            conversations: this.conversationHistory.length,
            daysSurvived: this.day,
            score: this._calculateScore()
        };
    }

    /**
     * 生成结局
     * @param {string} outcome - 结局类型
     * @returns {Promise<Object>} 结局内容
     */
    async generateEnding(outcome) {
        const outcomeMap = {
            success: '成功达成目标',
            spectacular: '完美通关',
            failure: '遗憾失败'
        };

        const prompt = `基于游戏结果生成结局故事：

结果：${outcomeMap[outcome]}
最终指标：
- 用户数: ${this.metrics.users}
- 收入: $${this.metrics.revenue}
- 天数: ${this.day}
- 关键决策: ${this.decisionHistory.length}个
- 团队精力: ${this.metrics.teamEnergy}%
- 品牌声誉: ${this.metrics.brandReputation}%

主要关系：
- CEO: ${this.relationships.ceo}/100
- 投资人: ${this.relationships.investor}/100
- 团队: ${this.relationships.team}/100

生成一个300字的结局故事，包括：
1. 董事会会议场景（对话）
2. 各NPC的最终评价
3. 公司未来走向
4. 玩家学到的增长经验

要像小说一样生动，有细节描写。`;

        try {
            const response = await this.aiEngine.sendMessage(prompt, this._buildContext());

            return {
                story: response.text,
                title: this._getEndingTitle(outcome),
                achievements: this._getAchievements()
            };
        } catch (error) {
            console.error('结局生成失败:', error);
            return {
                story: this._generateFallbackEnding(outcome),
                title: this._getEndingTitle(outcome),
                achievements: this._getAchievements()
            };
        }
    }

    /**
     * 获取游戏状态
     * @returns {Object} 完整游戏状态
     */
    getGameState() {
        return {
            company: this.company,
            industry: this.industry,
            day: this.day,
            metrics: { ...this.metrics },
            relationships: { ...this.relationships },
            currentScene: this.currentScene,
            currentNPC: this.currentNPC,
            conversationCount: this.conversationHistory.length,
            decisionCount: this.decisionHistory.length,
            gameActive: this.gameActive,
            recentDecisions: this.decisionHistory.slice(-3)
        };
    }

    /**
     * 更新指标
     * @param {Object} changes - 指标变化
     */
    updateMetrics(changes) {
        Object.keys(changes).forEach(key => {
            if (this.metrics.hasOwnProperty(key)) {
                const change = changes[key];
                let newValue = this.metrics[key] + change;

                // 限制范围
                if (['teamEnergy', 'marketTiming', 'userTrust', 'brandReputation'].includes(key)) {
                    newValue = Math.max(0, Math.min(100, newValue));
                } else {
                    newValue = Math.max(0, newValue);
                }

                this.metrics[key] = newValue;

                if (Math.abs(change) > 0) {
                    console.log(`📊 ${key}: ${this.metrics[key]} (${change > 0 ? '+' : ''}${change})`);
                }
            }
        });
    }

    /**
     * 更新关系
     * @param {Object} changes - 关系变化
     */
    updateRelationships(changes) {
        Object.keys(changes).forEach(key => {
            if (this.relationships.hasOwnProperty(key)) {
                const change = changes[key];
                const newValue = Math.max(0, Math.min(100, this.relationships[key] + change));
                this.relationships[key] = newValue;

                if (Math.abs(change) > 0) {
                    console.log(`👥 ${key}关系: ${newValue}/100 (${change > 0 ? '+' : ''}${change})`);
                }
            }
        });
    }

    /**
     * 获取策略建议
     * @param {string} context - 上下文描述
     * @returns {Promise<Array>} 建议列表
     */
    async getSuggestions(context = '') {
        const prompt = `基于当前情况，给玩家3-4个可行的增长策略建议：

当前状态：
- 第${this.day}天
- 用户: ${this.metrics.users}
- 收入: $${this.metrics.revenue}
- 预算: $${this.metrics.budget}
- 团队精力: ${this.metrics.teamEnergy}%
- 市场时机: ${this.metrics.marketTiming}%

${context}

要求：
1. 每个建议30字内
2. 直接可执行
3. 包含预期效果
4. 考虑当前资源

返回JSON数组：["建议1", "建议2", "建议3"]`;

        try {
            const response = await this.aiEngine.sendMessage(prompt, this._buildContext());

            // 尝试解析建议
            let suggestions = [];
            try {
                suggestions = this._extractJSON(response.text);
                if (!Array.isArray(suggestions)) {
                    suggestions = [suggestions];
                }
            } catch (e) {
                // 从文本中提取
                suggestions = this._extractSuggestionsFromText(response.text);
            }

            return suggestions.slice(0, 4);
        } catch (error) {
            console.error('建议生成失败:', error);
            return this._getFallbackSuggestions();
        }
    }

    // ========== 辅助方法 ==========

    /**
     * 构建AI上下文
     * @private
     */
    _buildContext() {
        return {
            ...this.metrics,
            day: this.day,
            relationships: this.relationships,
            currentScene: this.currentScene,
            currentNPC: this.currentNPC,
            recentDecisions: this.decisionHistory.slice(-3),
            conversationHistory: this.conversationHistory.slice(-5)
        };
    }

    /**
     * 从文本中提取JSON
     * @private
     */
    _extractJSON(text) {
        // 尝试找到JSON代码块
        const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) ||
                         text.match(/\{[\s\S]*\}/) ||
                         text.match(/\[[\s\S]*\]/);

        if (jsonMatch) {
            return JSON.parse(jsonMatch[1] || jsonMatch[0]);
        }

        throw new Error('No JSON found in response');
    }

    /**
     * 备用策略评估
     * @private
     */
    _fallbackEvaluation(strategy) {
        const strategyLower = strategy.toLowerCase();

        // 简单规则匹配
        let base = {
            feasibility: 7,
            expectedUserGrowth: 300,
            expectedRevenueGrowth: 1000,
            cost: 2000,
            timeRequired: 7,
            energyCost: 15,
            risk: '中',
            optimization: '建议分阶段执行，降低风险',
            summary: '这是一个中等可行性的策略'
        };

        // 关键词调整
        if (strategyLower.includes('广告') || strategyLower.includes('投放')) {
            base.cost = 5000;
            base.expectedUserGrowth = 800;
            base.risk = '高';
        } else if (strategyLower.includes('优化') || strategyLower.includes('改进')) {
            base.cost = 1000;
            base.expectedUserGrowth = 200;
            base.risk = '低';
        } else if (strategyLower.includes('合作') || strategyLower.includes('联盟')) {
            base.timeRequired = 14;
            base.expectedUserGrowth = 1000;
            base.cost = 3000;
        }

        return base;
    }

    /**
     * 计算声誉变化
     * @private
     */
    _calculateReputationChange(evaluation) {
        const base = Math.floor(evaluation.feasibility / 2);
        const riskPenalty = evaluation.risk === '高' ? -3 : evaluation.risk === '低' ? 2 : 0;
        return base + riskPenalty;
    }

    /**
     * 计算信任变化
     * @private
     */
    _calculateTrustChange(evaluation) {
        const successFactor = evaluation.feasibility > 7 ? 3 : evaluation.feasibility > 5 ? 1 : -2;
        return successFactor;
    }

    /**
     * 评估决策质量
     * @private
     */
    assessDecisionQuality(effects, evaluation) {
        const roi = (effects.revenueGrowth - effects.cost) / Math.max(effects.cost, 1);
        const userGrowthQuality = effects.userGrowth / Math.max(evaluation.expectedUserGrowth, 1);

        let quality = 'average';
        if (roi > 1 && userGrowthQuality > 1) {
            quality = 'excellent';
        } else if (roi > 0.5 && userGrowthQuality > 0.8) {
            quality = 'good';
        } else if (roi < 0 || userGrowthQuality < 0.5) {
            quality = 'poor';
        }

        return quality;
    }

    /**
     * 分析情绪
     * @private
     */
    _analyzeSentiment(effects, evaluation) {
        const netGrowth = effects.userGrowth + effects.revenueGrowth / 10;
        const netCost = effects.cost + effects.energyCost * 50;

        if (netGrowth > netCost * 1.5) return 'positive';
        if (netGrowth < netCost * 0.5) return 'negative';
        return 'neutral';
    }

    /**
     * 生成备用反馈
     * @private
     */
    _generateFallbackFeedback(effects, evaluation) {
        const sentiment = this._analyzeSentiment(effects, evaluation);

        if (sentiment === 'positive') {
            return `策略执行顺利！用户增长${effects.userGrowth}人，收入增加$${effects.revenueGrowth}，超出预期。团队士气高涨，继续保持这个势头。`;
        } else if (sentiment === 'negative') {
            return `策略遇到困难。用户仅增长${effects.userGrowth}人，收入增加$${effects.revenueGrowth}，低于预期。需要反思并调整方向。`;
        } else {
            return `策略基本达成目标。用户增长${effects.userGrowth}人，收入增加$${effects.revenueGrowth}。效果中规中矩，可以考虑优化执行细节。`;
        }
    }

    /**
     * 检查是否已触发
     * @private
     */
    _hasTriggered(eventId) {
        if (!this._triggeredEvents) {
            this._triggeredEvents = new Set();
        }
        return this._triggeredEvents.has(eventId);
    }

    /**
     * 标记已触发
     * @private
     */
    _markTriggered(eventId) {
        if (!this._triggeredEvents) {
            this._triggeredEvents = new Set();
        }
        this._triggeredEvents.add(eventId);
    }

    /**
     * 计算分数
     * @private
     */
    _calculateScore() {
        return Math.round(
            this.metrics.users * 1 +
            this.metrics.revenue * 0.5 +
            this.metrics.budget * 0.2 +
            this.metrics.brandReputation * 10 +
            Object.values(this.relationships).reduce((a, b) => a + b, 0) * 5 -
            this.day * 10
        );
    }

    /**
     * 获取结局标题
     * @private
     */
    _getEndingTitle(outcome) {
        const titles = {
            success: '🎉 目标达成 - 增长黑客',
            spectacular: '👑 完美通关 - 增长大师',
            failure: '💔 创业维艰 - 经验宝贵'
        };
        return titles[outcome] || '游戏结束';
    }

    /**
     * 获取成就
     * @private
     */
    _getAchievements() {
        const achievements = [];

        if (this.metrics.users >= 20000) achievements.push('用户2万里程碑');
        if (this.metrics.revenue >= 50000) achievements.push('营收5万达成');
        if (this.day < 90) achievements.push('神速增长');
        if (this.decisionHistory.length >= 20) achievements.push('决策大师');
        if (Object.values(this.relationships).every(v => v > 70)) achievements.push('人脉达人');
        if (this.metrics.teamEnergy > 80) achievements.push('团队活力');

        return achievements;
    }

    /**
     * 生成备用结局
     * @private
     */
    _generateFallbackEnding(outcome) {
        if (outcome === 'success') {
            return `经过${this.day}天的奋斗，你终于达成了目标。董事会会议上，CEO满意地点头："${this.metrics.users}用户，$${this.metrics.revenue}收入，你证明了自己的增长能力。" 投资人也表示愿意追加投资。你的增长黑客之路，才刚刚开始。`;
        } else if (outcome === 'spectacular') {
            return `仅用${this.day}天，你就创造了奇迹！${this.metrics.users}用户，$${this.metrics.revenue}收入，连投资人都惊叹不已。CEO在全员会议上说："这是我见过最出色的增长案例。" 你的名字开始在硅谷流传。`;
        } else {
            return `第${this.day}天，一切戛然而止。董事会会议上，投资人叹了口气："我们尽力了。" ${this.metrics.users}用户，$${this.metrics.budget}剩余预算...虽然失败了，但你学到了宝贵的经验。下一次，一定能做得更好。`;
        }
    }

    /**
     * 从文本提取建议
     * @private
     */
    _extractSuggestionsFromText(text) {
        const lines = text.split('\n').filter(line => line.trim());
        const suggestions = [];

        for (const line of lines) {
            const trimmed = line.trim().replace(/^[0-9\-\*\.]+\s*/, '');
            if (trimmed.length > 10 && trimmed.length < 100) {
                suggestions.push(trimmed);
            }
        }

        return suggestions.slice(0, 4);
    }

    /**
     * 获取备用建议
     * @private
     */
    _getFallbackSuggestions() {
        const suggestions = [
            '优化产品核心功能，提升用户留存率（预计+5%留存）',
            '开展推荐奖励活动，激励老用户带新（预计+300用户）',
            '投放精准广告，快速获客（需要$3000预算）',
            '与互补产品合作，互换流量（预计+500用户）'
        ];

        // 根据当前状态筛选
        if (this.metrics.budget < 3000) {
            return suggestions.filter(s => !s.includes('$3000'));
        }

        return suggestions;
    }

    /**
     * 获取备用响应
     * @private
     */
    _getFallbackResponse(userInput) {
        return {
            text: '我理解你的想法。作为你的增长顾问，我需要更多信息来给出准确建议。你能详细说说你的具体计划吗？',
            emotion: 'thoughtful',
            role: 'advisor'
        };
    }
}

// 导出
if (typeof window !== 'undefined') {
    window.GrowthGameEngineV3 = GrowthGameEngineV3;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = GrowthGameEngineV3;
}
