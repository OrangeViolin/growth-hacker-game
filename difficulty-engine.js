/**
 * 动态难度调整引擎
 * 根据用户表现自动调整难度
 * 生成题目变体，防止死记硬背
 */

class DifficultyEngine {
    constructor() {
        this.userPerformanceHistory = new Map();
        this.difficultyParameters = this.initializeDifficultyParameters();
        this.adaptiveAlgorithm = new AdaptiveAlgorithm();
    }

    initializeDifficultyParameters() {
        return {
            // 时间相关
            timeLimit: {
                min: 300,      // 5分钟
                max: 3600,     // 60分钟
                default: 900   // 15分钟
            },

            // 数据复杂度
            dataComplexity: {
                levels: {
                    simple: {
                        variables: 3,
                        calculations: 2,
                        constraints: 0
                    },
                    medium: {
                        variables: 5,
                        calculations: 4,
                        constraints: 1
                    },
                    hard: {
                        variables: 8,
                        calculations: 7,
                        constraints: 3
                    },
                    expert: {
                        variables: 12,
                        calculations: 10,
                        constraints: 5
                    },
                    nightmare: {
                        variables: 15,
                        calculations: 15,
                        constraints: 8
                    }
                }
            },

            // 计算步骤
            calculationSteps: {
                min: 2,
                max: 15,
                default: 5
            },

            // 逻辑链条长度
            logicChainLength: {
                min: 2,
                max: 10,
                default: 4
            },

            // 限制条件数量
            constraints: {
                min: 0,
                max: 8,
                default: 3
            },

            // 提示可用性
            hints: {
                min: 0,
                max: 5,
                default: 2
            },

            // 尝试次数
            attempts: {
                min: 1,
                max: 5,
                default: 3
            }
        };
    }

    // 分析用户表现
    analyzePerformance(userId) {
        const history = this.userPerformanceHistory.get(userId) || [];

        if (history.length === 0) {
            return {
                avgScore: null,
                avgTime: null,
                failureRate: null,
                trend: 'unknown',
                skillLevel: 'beginner'
            };
        }

        // 计算最近10次的表现
        const recentHistory = history.slice(-10);

        const avgScore = recentHistory.reduce((sum, h) => sum + h.score, 0) / recentHistory.length;
        const avgTime = recentHistory.reduce((sum, h) => sum + h.timeSpent, 0) / recentHistory.length;
        const failureRate = recentHistory.filter(h => h.score < 70).length / recentHistory.length;
        const avgAttempts = recentHistory.reduce((sum, h) => sum + h.attempts, 0) / recentHistory.length;

        // 分析趋势（最近5次 vs 之前5次）
        let trend = 'stable';
        if (recentHistory.length >= 10) {
            const recent5 = recentHistory.slice(-5);
            const previous5 = recentHistory.slice(-10, -5);
            const recentAvg = recent5.reduce((sum, h) => sum + h.score, 0) / 5;
            const previousAvg = previous5.reduce((sum, h) => sum + h.score, 0) / 5;

            if (recentAvg > previousAvg + 10) trend = 'improving';
            else if (recentAvg < previousAvg - 10) trend = 'declining';
        }

        // 评估技能等级
        let skillLevel = 'beginner';
        if (avgScore >= 90 && failureRate < 0.1) skillLevel = 'master';
        else if (avgScore >= 80 && failureRate < 0.2) skillLevel = 'expert';
        else if (avgScore >= 70 && failureRate < 0.3) skillLevel = 'advanced';
        else if (avgScore >= 60 && failureRate < 0.5) skillLevel = 'intermediate';

        // 识别弱点
        const weaknesses = this.identifyWeaknesses(history);

        return {
            avgScore,
            avgTime,
            failureRate,
            avgAttempts,
            trend,
            skillLevel,
            weaknesses,
            totalChallenges: history.length,
            recentHistory: recentHistory
        };
    }

    // 识别弱点
    identifyWeaknesses(history) {
        const weaknesses = {
            calculation: { count: 0, total: 0 },
            logic: { count: 0, total: 0 },
            strategy: { count: 0, total: 0 },
            timeManagement: { count: 0, total: 0 },
            accuracy: { count: 0, total: 0 }
        };

        history.forEach(h => {
            // 计算题弱点
            if (h.challengeType === 'calculation') {
                weaknesses.calculation.total++;
                if (h.score < 70) weaknesses.calculation.count++;
            }

            // 逻辑题弱点
            if (h.challengeType === 'logic_puzzle') {
                weaknesses.logic.total++;
                if (h.score < 70) weaknesses.logic.count++;
            }

            // 策略题弱点
            if (h.challengeType === 'strategy_design') {
                weaknesses.strategy.total++;
                if (h.score < 70) weaknesses.strategy.count++;
            }

            // 时间管理弱点
            if (h.timeSpent > h.timeLimit * 0.9) {
                weaknesses.timeManagement.total++;
                if (h.score < 70) weaknesses.timeManagement.count++;
            }

            // 准确性弱点
            if (h.attempts > 2) {
                weaknesses.accuracy.total++;
                if (h.score < 70) weaknesses.accuracy.count++;
            }
        });

        // 计算弱点率
        const weaknessRates = {};
        Object.keys(weaknesses).forEach(key => {
            const w = weaknesses[key];
            weaknessRates[key] = w.total > 0 ? w.count / w.total : 0;
        });

        return weaknessRates;
    }

    // 调整难度
    adjustDifficulty(userId, challenge) {
        const analysis = this.analyzePerformance(userId);

        if (!analysis.avgScore) {
            // 新用户，使用默认难度
            return this.getDefaultDifficulty(challenge);
        }

        const adjustments = {};

        // 太容易 → 提高难度
        if (analysis.avgScore > 85 && analysis.avgTime < challenge.timeLimit * 0.5 && analysis.failureRate < 0.1) {
            adjustments.action = 'increase';
            adjustments.reason = '表现优秀，提高挑战难度';
            adjustments.changes = {
                timeLimit: Math.max(
                    this.difficultyParameters.timeLimit.min,
                    challenge.timeLimit * 0.8
                ),
                dataComplexity: this.increaseComplexity(challenge.difficulty),
                calculationSteps: '+2',
                constraints: '+1',
                hints: '-1',
                tolerancePercent: challenge.validationRules?.tolerancePercent ?
                    Math.max(1, challenge.validationRules.tolerancePercent - 1) : 3
            };
        }
        // 太难 → 降低难度
        else if (analysis.avgScore < 50 && analysis.failureRate > 0.6) {
            adjustments.action = 'decrease';
            adjustments.reason = '遇到困难，适当降低难度';
            adjustments.changes = {
                timeLimit: Math.min(
                    this.difficultyParameters.timeLimit.max,
                    challenge.timeLimit * 1.3
                ),
                dataComplexity: this.decreaseComplexity(challenge.difficulty),
                calculationSteps: '-1',
                constraints: '-1',
                hints: '+1',
                attempts: '+1',
                tolerancePercent: challenge.validationRules?.tolerancePercent ?
                    challenge.validationRules.tolerancePercent + 2 : 5
            };
        }
        // 略难 → 微调
        else if (analysis.avgScore >= 60 && analysis.avgScore < 70) {
            adjustments.action = 'slight_decrease';
            adjustments.reason = '接近通过，稍微降低难度';
            adjustments.changes = {
                timeLimit: challenge.timeLimit * 1.1,
                hints: '+1',
                tolerancePercent: challenge.validationRules?.tolerancePercent ?
                    challenge.validationRules.tolerancePercent + 1 : 4
            };
        }
        // 适中 → 保持，但根据弱点微调
        else {
            adjustments.action = 'maintain';
            adjustments.reason = '难度适中';
            adjustments.changes = this.adjustForWeaknesses(challenge, analysis.weaknesses);
        }

        return adjustments;
    }

    // 增加复杂度
    increaseComplexity(currentDifficulty) {
        const levels = ['simple', 'medium', 'hard', 'expert', 'nightmare'];
        const currentIndex = levels.indexOf(currentDifficulty);
        const nextIndex = Math.min(levels.length - 1, currentIndex + 1);
        return levels[nextIndex];
    }

    // 降低复杂度
    decreaseComplexity(currentDifficulty) {
        const levels = ['simple', 'medium', 'hard', 'expert', 'nightmare'];
        const currentIndex = levels.indexOf(currentDifficulty);
        const prevIndex = Math.max(0, currentIndex - 1);
        return levels[prevIndex];
    }

    // 根据弱点调整
    adjustForWeaknesses(challenge, weaknesses) {
        const changes = {};

        // 如果时间管理有问题，增加时间
        if (weaknesses.timeManagement > 0.5) {
            changes.timeLimit = challenge.timeLimit * 1.2;
            changes.message = '增加时间限制，帮助你更好地完成题目';
        }

        // 如果准确性有问题，增加提示和容错
        if (weaknesses.accuracy > 0.5) {
            changes.hints = '+1';
            changes.tolerancePercent = '+1';
            changes.message = '提供更多提示和容错空间';
        }

        // 如果特定类型有问题，提供针对性调整
        if (challenge.type === 'calculation' && weaknesses.calculation > 0.5) {
            changes.calculationSteps = '-1';
            changes.providedFormulas = true;
            changes.message = '简化计算步骤，提供公式参考';
        }

        if (challenge.type === 'logic_puzzle' && weaknesses.logic > 0.5) {
            changes.logicChainLength = '-1';
            changes.providedFramework = true;
            changes.message = '简化逻辑链条，提供分析框架';
        }

        if (challenge.type === 'strategy_design' && weaknesses.strategy > 0.5) {
            changes.constraints = '-1';
            changes.providedTemplate = true;
            changes.message = '减少限制条件，提供策略模板';
        }

        return changes;
    }

    // 获取默认难度
    getDefaultDifficulty(challenge) {
        return {
            action: 'default',
            reason: '首次挑战，使用标准难度',
            changes: {
                timeLimit: challenge.timeLimit,
                dataComplexity: challenge.difficulty,
                hints: 2,
                attempts: 3,
                tolerancePercent: 5
            }
        };
    }

    // 生成题目变体
    generateVariant(challenge, variantLevel = 'medium') {
        const variant = JSON.parse(JSON.stringify(challenge)); // 深拷贝

        switch (challenge.type) {
            case 'calculation':
                return this.generateCalculationVariant(variant, variantLevel);

            case 'logic_puzzle':
                return this.generateLogicVariant(variant, variantLevel);

            case 'strategy_design':
                return this.generateStrategyVariant(variant, variantLevel);

            default:
                return variant;
        }
    }

    // 生成计算题变体
    generateCalculationVariant(challenge, variantLevel) {
        // 保持问题结构，但改变数字
        const numberVariations = {
            low: 0.9,     // 变化10%
            medium: 0.8,  // 变化20%
            high: 0.6     // 变化40%
        };

        const variation = numberVariations[variantLevel] || numberVariations.medium;

        // 替换scenario中的数字
        let newScenario = challenge.scenario;
        const numbers = challenge.scenario.match(/\$?\d+\.?\d*/g) || [];

        numbers.forEach(num => {
            const numValue = parseFloat(num.replace('$', ''));
            const hasDollar = num.startsWith('$');
            const hasDecimal = num.includes('.');

            // 生成新数字（在原数字的80%-120%之间）
            const newNum = numValue * (variation + Math.random() * (2 - 2 * variation));
            const formattedNum = hasDecimal ? newNum.toFixed(2) : Math.round(newNum);
            const finalNum = hasDollar ? '$' + formattedNum : formattedNum;

            newScenario = newScenario.replace(num, finalNum);
        });

        challenge.scenario = newScenario;

        // 重新计算expected值
        if (challenge.requiredCalculations) {
            challenge.requiredCalculations = challenge.requiredCalculations.map(calc => {
                // 这里需要根据新的数字重新计算expected值
                // 简化处理：保持公式结构，但标记需要重新验证
                return {
                    ...calc,
                    needsRecalculation: true
                };
            });
        }

        return challenge;
    }

    // 生成逻辑题变体
    generateLogicVariant(challenge, variantLevel) {
        // 改变数据顺序、规模，但保持问题本质
        let newScenario = challenge.scenario;

        // 改变时间周期
        newScenario = newScenario.replace(/Week/g, () => {
            return Math.random() > 0.5 ? 'Month' : 'Week';
        });

        // 改变数字规模
        const scaleFactors = {
            low: [0.95, 1.05],
            medium: [0.8, 1.2],
            high: [0.5, 1.5]
        };

        const [min, max] = scaleFactors[variantLevel] || scaleFactors.medium;
        const scaleFactor = min + Math.random() * (max - min);

        const numbers = newScenario.match(/\d+/g) || [];
        numbers.forEach(num => {
            const newNum = Math.round(parseInt(num) * scaleFactor);
            newScenario = newScenario.replace(num, newNum.toString());
        });

        challenge.scenario = newScenario;

        return challenge;
    }

    // 生成策略题变体
    generateStrategyVariant(challenge, variantLevel) {
        // 改变目标规模、时间限制、预算等约束条件
        let newScenario = challenge.scenario;

        // 改变目标数字
        if (challenge.constraints) {
            const newConstraints = { ...challenge.constraints };

            Object.keys(newConstraints).forEach(key => {
                if (typeof newConstraints[key] === 'number') {
                    const variation = variantLevel === 'high' ? 0.3 : 0.15;
                    const factor = 1 + (Math.random() - 0.5) * variation * 2;
                    newConstraints[key] = Math.round(newConstraints[key] * factor);
                }
            });

            challenge.constraints = newConstraints;
        }

        // 更新scenario中的数字以匹配新的约束
        const numbers = newScenario.match(/\$?\d+,?\d*/g) || [];
        numbers.forEach(num => {
            const numValue = parseInt(num.replace(/[$,]/g, ''));
            const variation = variantLevel === 'high' ? 0.3 : 0.15;
            const factor = 1 + (Math.random() - 0.5) * variation * 2;
            const newNum = Math.round(numValue * factor);
            const formatted = num.includes('$') ? '$' + newNum.toLocaleString() : newNum.toLocaleString();
            newScenario = newScenario.replace(num, formatted);
        });

        challenge.scenario = newScenario;

        return challenge;
    }

    // 记录用户表现
    recordPerformance(userId, challengeId, result) {
        const history = this.userPerformanceHistory.get(userId) || [];

        history.push({
            challengeId: challengeId,
            challengeType: result.challengeType,
            score: result.score,
            timeSpent: result.timeSpent,
            timeLimit: result.timeLimit,
            attempts: result.attempts,
            hintsUsed: result.hintsUsed,
            timestamp: Date.now(),
            difficulty: result.difficulty
        });

        // 只保留最近50次记录
        if (history.length > 50) {
            history.shift();
        }

        this.userPerformanceHistory.set(userId, history);

        // 返回更新后的分析
        return this.analyzePerformance(userId);
    }

    // 推荐下一个挑战
    recommendNextChallenge(userId, availableChallenges) {
        const analysis = this.analyzePerformance(userId);

        if (!analysis.avgScore) {
            // 新用户，推荐最简单的
            return availableChallenges
                .filter(c => c.level === 1)
                .sort((a, b) => a.difficulty.localeCompare(b.difficulty))[0];
        }

        // 根据表现和弱点推荐
        let recommendedType = null;

        // 如果有明显弱点，推荐相关类型以改进
        if (analysis.weaknesses.calculation > 0.5) {
            recommendedType = 'calculation';
        } else if (analysis.weaknesses.logic > 0.5) {
            recommendedType = 'logic_puzzle';
        } else if (analysis.weaknesses.strategy > 0.5) {
            recommendedType = 'strategy_design';
        }

        // 筛选合适难度和类型的挑战
        let suitable = availableChallenges.filter(c => {
            // 类型匹配（如果有推荐类型）
            if (recommendedType && c.type !== recommendedType) return false;

            // 难度匹配
            const difficultyMatch = this.isDifficultyMatch(c.difficulty, analysis.skillLevel);
            return difficultyMatch;
        });

        if (suitable.length === 0) {
            suitable = availableChallenges; // 如果没有合适的，从所有可用中选
        }

        // 按level排序，选择下一个
        suitable.sort((a, b) => a.level - b.level);

        return suitable[0];
    }

    // 判断难度是否匹配
    isDifficultyMatch(challengeDifficulty, skillLevel) {
        const difficultyLevels = {
            'simple': 1,
            'medium': 2,
            'hard': 3,
            'expert': 4,
            'nightmare': 5
        };

        const skillLevels = {
            'beginner': 1,
            'intermediate': 2,
            'advanced': 3,
            'expert': 4,
            'master': 5
        };

        const diffLevel = difficultyLevels[challengeDifficulty] || 2;
        const skill = skillLevels[skillLevel] || 1;

        // 挑战难度应该在技能等级 ± 1的范围内
        return Math.abs(diffLevel - skill) <= 1;
    }
}

// 自适应算法
class AdaptiveAlgorithm {
    // 使用机器学习风格的自适应算法
    // 根据用户的历史表现预测最佳难度

    calculateOptimalDifficulty(userHistory) {
        if (userHistory.length < 5) {
            return 'medium'; // 数据不足，使用默认
        }

        // 计算每个难度级别的平均表现
        const performanceByDifficulty = {
            simple: [],
            medium: [],
            hard: [],
            expert: [],
            nightmare: []
        };

        userHistory.forEach(h => {
            if (performanceByDifficulty[h.difficulty]) {
                performanceByDifficulty[h.difficulty].push(h.score);
            }
        });

        // 找到用户表现在70-85分范围内的难度级别（最佳挑战区域）
        const optimalRange = { min: 70, max: 85 };
        let optimalDifficulty = 'medium';
        let closestToOptimal = Infinity;

        Object.keys(performanceByDifficulty).forEach(difficulty => {
            const scores = performanceByDifficulty[difficulty];
            if (scores.length === 0) return;

            const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;

            // 计算与最佳区域的距离
            let distance;
            if (avgScore < optimalRange.min) {
                distance = optimalRange.min - avgScore;
            } else if (avgScore > optimalRange.max) {
                distance = avgScore - optimalRange.max;
            } else {
                distance = 0; // 在最佳区域内
            }

            if (distance < closestToOptimal) {
                closestToOptimal = distance;
                optimalDifficulty = difficulty;
            }
        });

        return optimalDifficulty;
    }

    // 预测用户在特定难度下的表现
    predictPerformance(userHistory, targetDifficulty) {
        const difficultyScores = {
            simple: 1,
            medium: 2,
            hard: 3,
            expert: 4,
            nightmare: 5
        };

        const targetScore = difficultyScores[targetDifficulty];

        // 找到相近难度的历史表现
        const relevantHistory = userHistory
            .filter(h => {
                const hScore = difficultyScores[h.difficulty] || 2;
                return Math.abs(hScore - targetScore) <= 1;
            })
            .slice(-5); // 最近5次

        if (relevantHistory.length === 0) {
            return {
                predictedScore: 50,
                confidence: 'low'
            };
        }

        const avgScore = relevantHistory.reduce((sum, h) => sum + h.score, 0) / relevantHistory.length;
        const variance = relevantHistory.reduce((sum, h) => sum + Math.pow(h.score - avgScore, 2), 0) / relevantHistory.length;
        const stdDev = Math.sqrt(variance);

        return {
            predictedScore: avgScore,
            confidenceInterval: [avgScore - stdDev, avgScore + stdDev],
            confidence: stdDev < 15 ? 'high' : stdDev < 25 ? 'medium' : 'low'
        };
    }
}

module.exports = { DifficultyEngine, AdaptiveAlgorithm };
