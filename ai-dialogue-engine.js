/**
 * AI对话引擎 - 增长黑客游戏
 * 支持双模式：真实AI API调用 / 智能规则引擎
 *
 * @class AIDialogueEngine
 * @author AI Integration Engineer
 * @version 1.0.0
 */

class AIDialogueEngine {
    constructor(apiKey = null) {
        this.apiKey = apiKey;
        this.conversationHistory = [];
        this.currentRole = 'advisor';
        this.useRealAPI = !!apiKey; // 如果没有API key就用模拟模式
        this.maxHistoryLength = 10; // 最多保存10轮对话

        // 角色描述
        this.roleDescriptions = {
            'advisor': 'AI增长顾问，理性客观，教育和指导',
            'ceo': 'CEO，激进追求增长，关注结果不管过程',
            'investor': '投资人，谨慎保守，关注ROI和健康增长',
            'cto': 'CTO，技术完美主义，担心技术债',
            'user': '用户代表，挑剔真实，关注产品体验'
        };

        // 初始化统计
        this.stats = {
            totalMessages: 0,
            apiCalls: 0,
            mockCalls: 0,
            errors: 0
        };

        console.log(`🤖 AI对话引擎初始化 - 模式: ${this.useRealAPI ? 'Real API' : 'Mock'}`);
    }

    /**
     * 核心方法 - 发送消息
     * @param {string} userInput - 用户输入
     * @param {Object} gameContext - 游戏上下文
     * @returns {Promise<Object>} AI响应
     */
    async sendMessage(userInput, gameContext) {
        try {
            this.stats.totalMessages++;

            // 记录用户消息到历史
            this.addToHistory('user', userInput);

            let response;
            if (this.useRealAPI) {
                this.stats.apiCalls++;
                response = await this.callClaudeAPI(userInput, gameContext);
            } else {
                this.stats.mockCalls++;
                response = this.mockResponse(userInput, gameContext);
            }

            // 记录AI响应到历史
            if (response && response.text) {
                this.addToHistory('assistant', response.text);
            }

            return response;

        } catch (error) {
            this.stats.errors++;
            console.error('❌ AI对话引擎错误:', error);
            return this.getErrorResponse(error);
        }
    }

    /**
     * Claude API调用
     * @private
     */
    async callClaudeAPI(userInput, context) {
        try {
            const systemPrompt = this.buildSystemPrompt(context);

            const response = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': this.apiKey,
                    'anthropic-version': '2023-06-01'
                },
                body: JSON.stringify({
                    model: 'claude-3-5-sonnet-20241022',
                    max_tokens: 1024,
                    messages: this.conversationHistory,
                    system: systemPrompt,
                    temperature: 0.8 // 稍微增加创造性
                })
            });

            if (!response.ok) {
                throw new Error(`API错误: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return this.parseResponse(data);

        } catch (error) {
            console.error('❌ Claude API调用失败:', error);
            // 降级到模拟模式
            console.log('🔄 降级到模拟响应模式');
            return this.mockResponse(userInput, context);
        }
    }

    /**
     * 构建System Prompt
     * @private
     */
    buildSystemPrompt(context) {
        const roleDesc = this.roleDescriptions[this.currentRole];

        return `你是增长黑客游戏中的${roleDesc}。

当前游戏状态：
- 用户数: ${context.users || 0}
- 收入: $${context.revenue || 0}
- 预算: $${context.budget || 10000}
- 团队精力: ${context.teamEnergy || 100}%
- 市场时机: ${context.marketTiming || 50}%
- 用户信任: ${context.userTrust || 70}%
- 品牌声誉: ${context.brandReputation || 60}%
- 当前天数: Day ${context.day || 1}

你的任务：
1. 扮演${this.currentRole}角色，根据性格特点回复
2. 对用户的策略给出深度反馈和追问
3. 使用苏格拉底式提问引导思考
4. 教育增长黑客原则
5. 根据对话决定是否触发新场景或角色切换

响应格式（JSON）：
{
  "role": "${this.currentRole}",
  "text": "对话内容（100-200字）",
  "emotion": "neutral|happy|concerned|angry",
  "suggestions": ["建议1", "建议2", "建议3"],
  "nextRole": "advisor|ceo|investor|cto|user|null",
  "sceneChange": null | {
    "type": "event|challenge|milestone",
    "description": "场景描述"
  },
  "resourceImpact": {
    "teamEnergy": 0,
    "userTrust": 0,
    "brandReputation": 0
  }
}

重要：
- 保持角色一致性
- 追问要有深度
- 给出具体可操作的建议
- 适时挑战用户的假设
- 回复要简洁有力，100-200字即可`;
    }

    /**
     * 解析API响应
     * @private
     */
    parseResponse(apiData) {
        try {
            // 提取内容
            const content = apiData.content?.[0]?.text || '';

            // 尝试解析JSON
            let parsed;
            try {
                // 提取JSON部分（可能被包裹在```json```中）
                const jsonMatch = content.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    parsed = JSON.parse(jsonMatch[0]);
                } else {
                    // 如果没有JSON，构造默认响应
                    parsed = {
                        role: this.currentRole,
                        text: content,
                        emotion: 'neutral',
                        suggestions: [],
                        nextRole: null,
                        sceneChange: null,
                        resourceImpact: {}
                    };
                }
            } catch (e) {
                // JSON解析失败，使用原文本
                parsed = {
                    role: this.currentRole,
                    text: content,
                    emotion: 'neutral',
                    suggestions: [],
                    nextRole: null,
                    sceneChange: null,
                    resourceImpact: {}
                };
            }

            // 验证和补全响应
            return this.validateResponse(parsed);

        } catch (error) {
            console.error('❌ 响应解析错误:', error);
            return this.getDefaultResponse();
        }
    }

    /**
     * 模拟响应（没有API key时使用）
     * @private
     */
    mockResponse(userInput, context) {
        console.log(`💭 生成模拟响应 - 角色: ${this.currentRole}`);

        // 分析用户输入
        const analysis = this.analyzeUserInput(userInput);

        // 基于角色和上下文生成响应
        const responses = this.generateMockResponses(userInput, context, analysis);

        return responses[this.currentRole] || responses.default;
    }

    /**
     * 分析用户输入
     * @private
     */
    analyzeUserInput(input) {
        const lower = input.toLowerCase();

        return {
            isQuestion: lower.includes('?') || lower.includes('吗') || lower.includes('如何'),
            mentionsGrowth: /增长|用户|流量|获客/i.test(input),
            mentionsMoney: /钱|预算|成本|roi|收入/i.test(input),
            mentionsTech: /技术|开发|功能|产品/i.test(input),
            mentionsStrategy: /策略|计划|方案|建议/i.test(input),
            isAggressive: /快速|立即|马上|激进/i.test(input),
            isCautious: /稳妥|谨慎|保守|风险/i.test(input),
            sentiment: this.analyzeSentiment(input)
        };
    }

    /**
     * 情感分析
     * @private
     */
    analyzeSentiment(input) {
        const positive = /好|棒|赞|优秀|成功/i.test(input);
        const negative = /差|糟|失败|问题|困难/i.test(input);

        if (positive && !negative) return 'positive';
        if (negative && !positive) return 'negative';
        return 'neutral';
    }

    /**
     * 生成模拟响应
     * @private
     */
    generateMockResponses(userInput, context, analysis) {
        const responses = {
            advisor: this.generateAdvisorResponse(userInput, context, analysis),
            ceo: this.generateCEOResponse(userInput, context, analysis),
            investor: this.generateInvestorResponse(userInput, context, analysis),
            cto: this.generateCTOResponse(userInput, context, analysis),
            user: this.generateUserResponse(userInput, context, analysis),
            default: this.getDefaultResponse()
        };

        return responses;
    }

    /**
     * 顾问响应生成器
     * @private
     */
    generateAdvisorResponse(input, context, analysis) {
        const templates = [
            {
                condition: analysis.isQuestion,
                text: `这是个好问题。让我们从增长黑客的角度来思考：\n\n首先，${this.getGrowthPrinciple()}。\n\n我建议你考虑：`,
                suggestions: this.getStrategicSuggestions(context),
                emotion: 'neutral'
            },
            {
                condition: analysis.mentionsStrategy,
                text: `你的策略思路不错。不过，我想提醒你关注几个关键点：\n\n1. 是否有明确的北极星指标？\n2. 这个策略是否可以快速验证？\n3. 成本效益比如何？`,
                suggestions: this.getValidationSuggestions(context),
                emotion: 'neutral'
            },
            {
                condition: analysis.isAggressive,
                text: `我理解你想快速增长的心情。但记住：可持续增长 > 一时激进。\n\n让我们先确保：\n- 产品市场契合度\n- 单位经济模型健康\n- 团队能承受压力`,
                suggestions: this.getBalancedSuggestions(context),
                emotion: 'concerned'
            },
            {
                condition: true, // 默认
                text: `基于当前状态（${context.users}用户，$${context.revenue}收入），我建议你：\n\n${this.getCurrentPriorityAdvice(context)}`,
                suggestions: this.getContextualSuggestions(context),
                emotion: 'neutral'
            }
        ];

        const selected = templates.find(t => t.condition);

        return {
            role: 'advisor',
            text: selected.text,
            emotion: selected.emotion,
            suggestions: selected.suggestions,
            nextRole: this.determineNextRole(context, analysis),
            sceneChange: this.checkSceneTrigger(context),
            resourceImpact: {
                teamEnergy: 0,
                userTrust: 0,
                brandReputation: 0
            }
        };
    }

    /**
     * CEO响应生成器
     * @private
     */
    generateCEOResponse(input, context, analysis) {
        const isGrowthSlow = context.users < 1000 || (context.revenue < 5000 && context.day > 30);

        if (isGrowthSlow) {
            return {
                role: 'ceo',
                text: `看看这数据！${context.users}用户，$${context.revenue}收入？\n\n我们需要更激进的策略！竞争对手不会等我们。给我一个能快速10倍增长的方案！`,
                emotion: 'angry',
                suggestions: [
                    '病毒营销活动',
                    '大规模付费广告',
                    '激进的增长黑客手段'
                ],
                nextRole: 'investor',
                sceneChange: {
                    type: 'challenge',
                    description: 'CEO施压要求快速增长'
                },
                resourceImpact: {
                    teamEnergy: -10,
                    userTrust: 0,
                    brandReputation: 0
                }
            };
        } else {
            return {
                role: 'ceo',
                text: `不错！增长势头很好。但我们不能满足于现状。\n\n下一步怎么扩大规模？我希望看到指数级增长！`,
                emotion: 'happy',
                suggestions: [
                    '扩大成功策略',
                    '开拓新渠道',
                    '提升转化率'
                ],
                nextRole: null,
                sceneChange: null,
                resourceImpact: {
                    teamEnergy: 5,
                    userTrust: 0,
                    brandReputation: 0
                }
            };
        }
    }

    /**
     * 投资人响应生成器
     * @private
     */
    generateInvestorResponse(input, context, analysis) {
        const roi = context.revenue / (10000 - context.budget + 1);
        const isHealthy = roi > 0.5 && context.userTrust > 60;

        if (!isHealthy) {
            return {
                role: 'investor',
                text: `我看了你的数据，有些担忧。\n\nROI是${(roi * 100).toFixed(1)}%，用户信任${context.userTrust}%。这不是健康的增长。\n\n我们需要看到：\n1. 清晰的盈利路径\n2. 可持续的获客成本\n3. 强大的用户留存`,
                emotion: 'concerned',
                suggestions: [
                    '优化单位经济模型',
                    '提升用户留存',
                    '降低获客成本'
                ],
                nextRole: 'advisor',
                sceneChange: {
                    type: 'challenge',
                    description: '投资人质疑增长质量'
                },
                resourceImpact: {
                    teamEnergy: -5,
                    userTrust: 0,
                    brandReputation: -5
                }
            };
        } else {
            return {
                role: 'investor',
                text: `很好，你在控制成本的同时实现了增长。这才是我想看到的。\n\n继续保持这个节奏，专注于健康的指标。`,
                emotion: 'happy',
                suggestions: [
                    '保持当前策略',
                    '逐步扩大规模',
                    '建立护城河'
                ],
                nextRole: null,
                sceneChange: null,
                resourceImpact: {
                    teamEnergy: 0,
                    userTrust: 5,
                    brandReputation: 5
                }
            };
        }
    }

    /**
     * CTO响应生成器
     * @private
     */
    generateCTOResponse(input, context, analysis) {
        const isTechStressed = context.teamEnergy < 50 || context.users > 10000;

        if (isTechStressed) {
            return {
                role: 'cto',
                text: `等等！我们的技术架构能支撑这个增长吗？\n\n团队精力只有${context.teamEnergy}%，技术债在累积。如果系统崩溃，所有增长都是空谈。\n\n我需要时间优化架构和重构代码。`,
                emotion: 'concerned',
                suggestions: [
                    '暂缓增长，修复技术债',
                    '招聘更多工程师',
                    '自动化和优化系统'
                ],
                nextRole: 'ceo',
                sceneChange: {
                    type: 'challenge',
                    description: 'CTO警告技术风险'
                },
                resourceImpact: {
                    teamEnergy: -10,
                    userTrust: 0,
                    brandReputation: 0
                }
            };
        } else {
            return {
                role: 'cto',
                text: `从技术角度看，这个方案可行。\n\n我们的系统可以支撑，团队也有余力。不过记得给我们留足够的时间做好质量保证。`,
                emotion: 'neutral',
                suggestions: [
                    '确保代码质量',
                    '添加监控和报警',
                    '准备扩容方案'
                ],
                nextRole: null,
                sceneChange: null,
                resourceImpact: {
                    teamEnergy: 0,
                    userTrust: 0,
                    brandReputation: 0
                }
            };
        }
    }

    /**
     * 用户响应生成器
     * @private
     */
    generateUserResponse(input, context, analysis) {
        const isUserHappy = context.userTrust > 70 && context.brandReputation > 60;

        if (!isUserHappy) {
            return {
                role: 'user',
                text: `说实话，我觉得你们太关注增长了，产品体验呢？\n\n用户信任${context.userTrust}%，这说明我们不满意。别光想着拉新用户，先把现有用户服务好！`,
                emotion: 'angry',
                suggestions: [
                    '改善产品体验',
                    '倾听用户反馈',
                    '修复核心问题'
                ],
                nextRole: 'advisor',
                sceneChange: {
                    type: 'event',
                    description: '用户投诉增加'
                },
                resourceImpact: {
                    teamEnergy: 0,
                    userTrust: -10,
                    brandReputation: -10
                }
            };
        } else {
            return {
                role: 'user',
                text: `作为用户，我挺满意的。产品确实解决了我的问题。\n\n不过建议你们加强某些功能，我会推荐给朋友的！`,
                emotion: 'happy',
                suggestions: [
                    '推出推荐奖励',
                    '优化分享功能',
                    '建立用户社区'
                ],
                nextRole: null,
                sceneChange: null,
                resourceImpact: {
                    teamEnergy: 5,
                    userTrust: 5,
                    brandReputation: 5
                }
            };
        }
    }

    /**
     * 辅助方法 - 获取增长原则
     * @private
     */
    getGrowthPrinciple() {
        const principles = [
            '增长黑客的核心是数据驱动的实验',
            '先找到产品市场契合度，再谈规模化',
            '北极星指标是团队对齐的关键',
            '增长 = 获客 × 激活 × 留存 × 变现',
            '最好的增长策略往往是产品本身'
        ];
        return principles[Math.floor(Math.random() * principles.length)];
    }

    /**
     * 辅助方法 - 获取战略建议
     * @private
     */
    getStrategicSuggestions(context) {
        const suggestions = [];

        if (context.users < 1000) {
            suggestions.push('专注种子用户获取和激活');
        }
        if (context.userTrust < 70) {
            suggestions.push('提升产品体验和用户满意度');
        }
        if (context.budget > 5000) {
            suggestions.push('考虑小规模付费测试');
        }
        if (context.teamEnergy > 80) {
            suggestions.push('可以尝试更激进的策略');
        }

        // 至少返回3个建议
        while (suggestions.length < 3) {
            suggestions.push('分析数据，优化漏斗');
        }

        return suggestions.slice(0, 3);
    }

    /**
     * 辅助方法 - 获取验证建议
     * @private
     */
    getValidationSuggestions(context) {
        return [
            '设计最小可行实验（MVE）',
            '定义成功的关键指标',
            '设置快速反馈循环'
        ];
    }

    /**
     * 辅助方法 - 获取平衡建议
     * @private
     */
    getBalancedSuggestions(context) {
        return [
            '同时关注增长速度和增长质量',
            '确保团队不会过度消耗',
            '建立可持续的增长引擎'
        ];
    }

    /**
     * 辅助方法 - 获取上下文建议
     * @private
     */
    getContextualSuggestions(context) {
        if (context.day < 10) {
            return ['验证核心假设', '找到早期adopters', '快速迭代产品'];
        } else if (context.day < 30) {
            return ['优化获客渠道', '提升激活率', '建立留存机制'];
        } else {
            return ['规模化成功策略', '拓展新市场', '建立品牌'];
        }
    }

    /**
     * 辅助方法 - 获取当前优先建议
     * @private
     */
    getCurrentPriorityAdvice(context) {
        if (context.users === 0) {
            return '首要任务是获取第一批种子用户。考虑手动推广和社区运营。';
        } else if (context.users < 100) {
            return '专注于验证产品市场契合度，与用户深度交流。';
        } else if (context.users < 1000) {
            return '寻找可规模化的获客渠道，优化激活流程。';
        } else {
            return '关注留存和变现，建立增长飞轮。';
        }
    }

    /**
     * 辅助方法 - 决定下一个角色
     * @private
     */
    determineNextRole(context, analysis) {
        // 基于游戏状态决定下一个发言角色
        if (context.users > 5000 && Math.random() < 0.3) {
            return 'ceo'; // 增长好时CEO可能发言
        }
        if (context.budget < 2000 && Math.random() < 0.4) {
            return 'investor'; // 预算紧张时投资人可能发言
        }
        if (context.teamEnergy < 40 && Math.random() < 0.5) {
            return 'cto'; // 团队疲惫时CTO可能发言
        }
        if (context.userTrust < 50 && Math.random() < 0.3) {
            return 'user'; // 用户不满时用户代表可能发言
        }

        return null; // 继续当前角色对话
    }

    /**
     * 辅助方法 - 检查场景触发
     * @private
     */
    checkSceneTrigger(context) {
        // 基于特定条件触发场景
        if (context.users >= 10000 && !context.milestone_10k) {
            return {
                type: 'milestone',
                description: '突破1万用户里程碑！'
            };
        }
        if (context.revenue >= 50000 && !context.milestone_50k_revenue) {
            return {
                type: 'milestone',
                description: '收入突破5万美元！'
            };
        }
        if (context.budget <= 0) {
            return {
                type: 'challenge',
                description: '预算耗尽危机！'
            };
        }
        if (context.teamEnergy <= 20) {
            return {
                type: 'event',
                description: '团队濒临崩溃！'
            };
        }

        return null;
    }

    /**
     * 验证响应格式
     * @private
     */
    validateResponse(response) {
        return {
            role: response.role || this.currentRole,
            text: response.text || '我在思考...',
            emotion: response.emotion || 'neutral',
            suggestions: Array.isArray(response.suggestions)
                ? response.suggestions.slice(0, 3)
                : ['继续思考', '分析数据', '制定策略'],
            nextRole: response.nextRole || null,
            sceneChange: response.sceneChange || null,
            resourceImpact: response.resourceImpact || {}
        };
    }

    /**
     * 获取默认响应
     * @private
     */
    getDefaultResponse() {
        return {
            role: this.currentRole,
            text: '让我思考一下...\n\n这是个有意思的想法。我建议你先做小规模测试，验证假设，然后再决定是否扩大投入。',
            emotion: 'neutral',
            suggestions: [
                '制定测试计划',
                '设定成功指标',
                '控制风险和成本'
            ],
            nextRole: null,
            sceneChange: null,
            resourceImpact: {}
        };
    }

    /**
     * 获取错误响应
     * @private
     */
    getErrorResponse(error) {
        return {
            role: this.currentRole,
            text: `抱歉，我遇到了一些技术问题。但让我给你一个建议：\n\n${this.getGrowthPrinciple()}`,
            emotion: 'concerned',
            suggestions: [
                '检查当前数据',
                '回顾之前决策',
                '寻找优化空间'
            ],
            nextRole: null,
            sceneChange: null,
            resourceImpact: {},
            error: error.message
        };
    }

    /**
     * 添加到对话历史
     * @private
     */
    addToHistory(role, content) {
        this.conversationHistory.push({
            role: role,
            content: content
        });

        // 限制历史长度
        if (this.conversationHistory.length > this.maxHistoryLength * 2) {
            this.conversationHistory = this.conversationHistory.slice(-this.maxHistoryLength * 2);
        }
    }

    /**
     * 切换角色
     * @param {string} newRole - 新角色
     */
    switchRole(newRole) {
        if (this.roleDescriptions[newRole]) {
            this.currentRole = newRole;
            console.log(`🔄 角色切换: ${newRole}`);
        } else {
            console.warn(`⚠️ 无效角色: ${newRole}`);
        }
    }

    /**
     * 清空对话历史
     */
    clearHistory() {
        this.conversationHistory = [];
        console.log('🗑️ 对话历史已清空');
    }

    /**
     * 获取统计信息
     */
    getStats() {
        return {
            ...this.stats,
            historyLength: this.conversationHistory.length,
            currentRole: this.currentRole,
            mode: this.useRealAPI ? 'Real API' : 'Mock'
        };
    }

    /**
     * 导出对话历史
     */
    exportHistory() {
        return {
            history: this.conversationHistory,
            stats: this.getStats(),
            timestamp: new Date().toISOString()
        };
    }
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AIDialogueEngine;
}
