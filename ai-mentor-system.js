/**
 * AI严格导师系统 - 增长黑客教学引擎
 * 基于苏格拉底式教学法，通过提问引导而非直接给答案
 */

class AIMentorSystem {
    constructor() {
        this.knowledgeBase = new KnowledgeBase();
        this.dialogues = new MentorDialogueTemplates();
        this.scoringSystem = new MentorScoringSystem();
        this.clueSystem = new ClueSystem();
        this.questionGenerator = new SocraticQuestionGenerator();

        this.currentChallenge = null;
        this.userProgress = {
            level: 1,
            totalScore: 0,
            masteredConcepts: [],
            weakPoints: [],
            attemptHistory: [],
            badges: [],
            currentStreak: 0
        };
    }

    /**
     * 开始新的挑战关卡
     */
    startChallenge(challengeId) {
        const challenge = this.knowledgeBase.getChallenge(challengeId);

        if (!this.canAccessChallenge(challenge)) {
            return {
                error: true,
                message: this.dialogues.getBlockedMessage(challenge.prerequisite)
            };
        }

        this.currentChallenge = {
            ...challenge,
            startTime: Date.now(),
            attempts: [],
            hintsUsed: 0
        };

        return {
            greeting: this.dialogues.getChallengeIntro(challenge),
            question: this.generateQuestion(challenge),
            context: this.buildContext(challenge),
            requirements: challenge.requiredElements,
            timeLimit: challenge.timeLimit,
            maxAttempts: challenge.maxAttempts || 3
        };
    }

    /**
     * 生成挑战问题
     */
    generateQuestion(challenge) {
        const template = this.dialogues.getQuestionTemplate(challenge.type);
        const context = this.buildChallengeContext(challenge);

        return {
            mainQuestion: this.interpolate(template.main, context),
            subQuestions: template.sub.map(q => this.interpolate(q, context)),
            requiredOutputs: challenge.requiredElements.map(element => ({
                name: element,
                description: this.knowledgeBase.getElementDescription(element),
                format: this.getExpectedFormat(element)
            })),
            thinkingFramework: this.getSuggestedFramework(challenge.requiredKnowledge)
        };
    }

    /**
     * 评估用户答案 - 多维度严格评分
     */
    async evaluateAnswer(userAnswer, attemptNumber = 1) {
        if (!this.currentChallenge) {
            throw new Error('No active challenge');
        }

        const startEvalTime = Date.now();

        // 1. 解析用户答案
        const parsed = this.parseUserAnswer(userAnswer);

        // 2. 提取关键信息
        const extracted = this.extractKeyInformation(parsed, this.currentChallenge);

        // 3. 多维度评估
        const evaluation = {
            // 数据准确性 (30分)
            dataAccuracy: await this.evaluateDataAccuracy(extracted),

            // 逻辑完整性 (25分)
            logicCompleteness: this.evaluateLogicCompleteness(extracted),

            // 计算准确性 (20分)
            calculationCorrectness: this.evaluateCalculations(extracted),

            // 概念理解 (15分)
            conceptUnderstanding: this.evaluateConceptUnderstanding(extracted),

            // 策略可行性 (10分)
            feasibility: this.evaluateFeasibility(extracted)
        };

        // 4. 计算总分
        const totalScore = Object.values(evaluation).reduce((sum, score) => sum + score.points, 0);

        // 5. 判定等级
        const grade = this.determineGrade(totalScore);

        // 6. 识别缺失和错误
        const gaps = this.identifyGaps(extracted, evaluation);
        const mistakes = this.identifyMistakes(extracted, evaluation);

        // 7. 生成导师反馈
        const feedback = this.generateMentorFeedback({
            score: totalScore,
            grade,
            evaluation,
            gaps,
            mistakes,
            attemptNumber,
            timeSpent: startEvalTime - this.currentChallenge.startTime
        });

        // 8. 决定下一步行动
        const nextAction = this.decideNextAction(grade, attemptNumber, gaps);

        // 9. 记录尝试
        this.recordAttempt({
            attemptNumber,
            answer: userAnswer,
            extracted,
            evaluation,
            score: totalScore,
            grade,
            timestamp: Date.now()
        });

        return {
            passed: grade.pass,
            score: totalScore,
            grade: grade.level,
            feedback: feedback,
            nextAction: nextAction,
            detailedBreakdown: evaluation,
            gaps: gaps,
            mistakes: mistakes,
            canRetry: attemptNumber < this.currentChallenge.maxAttempts,
            unlocks: grade.pass ? grade.unlock : []
        };
    }

    /**
     * 评估数据准确性 (30分)
     */
    evaluateDataAccuracy(extracted) {
        const challenge = this.currentChallenge;
        const expectedData = challenge.expectedAnswer.data;

        let points = 0;
        let maxPoints = 30;
        let details = [];

        // 检查每个必需的数据点
        for (const [key, expectedValue] of Object.entries(expectedData)) {
            const userValue = extracted.data[key];

            if (userValue === undefined) {
                details.push({
                    item: key,
                    status: 'missing',
                    message: `缺失关键数据: ${key}`,
                    lost: 5
                });
                continue;
            }

            // 数值精度检查
            if (typeof expectedValue === 'number') {
                const tolerance = expectedValue * 0.02; // 2% 容错率
                const diff = Math.abs(userValue - expectedValue);

                if (diff <= tolerance) {
                    points += 5;
                    details.push({
                        item: key,
                        status: 'correct',
                        message: `${key}: 正确`,
                        earned: 5
                    });
                } else if (diff <= tolerance * 3) {
                    points += 3;
                    details.push({
                        item: key,
                        status: 'close',
                        message: `${key}: 接近正确值，但有偏差`,
                        earned: 3
                    });
                } else {
                    details.push({
                        item: key,
                        status: 'wrong',
                        message: `${key}: 数值错误 (期望: ${expectedValue}, 实际: ${userValue})`,
                        lost: 5
                    });
                }
            } else {
                // 非数值比较
                if (this.compareValues(userValue, expectedValue)) {
                    points += 5;
                    details.push({
                        item: key,
                        status: 'correct',
                        message: `${key}: 正确`,
                        earned: 5
                    });
                } else {
                    details.push({
                        item: key,
                        status: 'wrong',
                        message: `${key}: 答案不正确`,
                        lost: 5
                    });
                }
            }
        }

        return {
            points: Math.min(points, maxPoints),
            maxPoints,
            percentage: (points / maxPoints) * 100,
            details
        };
    }

    /**
     * 评估逻辑完整性 (25分)
     */
    evaluateLogicCompleteness(extracted) {
        const challenge = this.currentChallenge;
        const requiredSteps = challenge.expectedAnswer.logicSteps;

        let points = 0;
        let maxPoints = 25;
        let details = [];

        // 检查推理链条
        const userLogicChain = this.extractLogicChain(extracted);

        for (const step of requiredSteps) {
            const foundStep = userLogicChain.find(s => this.matchesLogicStep(s, step));

            if (foundStep) {
                if (this.validateLogicStep(foundStep, step)) {
                    points += step.weight || 5;
                    details.push({
                        step: step.name,
                        status: 'complete',
                        message: `逻辑步骤完整: ${step.description}`,
                        earned: step.weight || 5
                    });
                } else {
                    points += (step.weight || 5) * 0.5;
                    details.push({
                        step: step.name,
                        status: 'incomplete',
                        message: `逻辑步骤不完整: ${step.description}`,
                        earned: (step.weight || 5) * 0.5
                    });
                }
            } else {
                details.push({
                    step: step.name,
                    status: 'missing',
                    message: `缺失关键推理: ${step.description}`,
                    lost: step.weight || 5
                });
            }
        }

        // 检查逻辑跳跃
        const jumps = this.detectLogicJumps(userLogicChain);
        if (jumps.length > 0) {
            points -= jumps.length * 3;
            details.push({
                status: 'penalty',
                message: `发现${jumps.length}处逻辑跳跃`,
                lost: jumps.length * 3,
                jumps: jumps
            });
        }

        return {
            points: Math.max(0, Math.min(points, maxPoints)),
            maxPoints,
            percentage: (points / maxPoints) * 100,
            details,
            logicJumps: jumps
        };
    }

    /**
     * 评估计算准确性 (20分)
     */
    evaluateCalculations(extracted) {
        const challenge = this.currentChallenge;
        const requiredCalculations = challenge.expectedAnswer.calculations;

        let points = 0;
        let maxPoints = 20;
        let details = [];

        for (const calc of requiredCalculations) {
            const userCalc = extracted.calculations.find(c => c.type === calc.type);

            if (!userCalc) {
                details.push({
                    calculation: calc.name,
                    status: 'missing',
                    message: `缺失计算: ${calc.formula}`,
                    lost: calc.weight || 4
                });
                continue;
            }

            // 检查公式是否正确
            const formulaCorrect = this.validateFormula(userCalc.formula, calc.formula);

            // 检查结果是否正确
            const resultCorrect = this.validateCalculationResult(
                userCalc.result,
                calc.expectedResult,
                calc.tolerance || 0.01
            );

            if (formulaCorrect && resultCorrect) {
                points += calc.weight || 4;
                details.push({
                    calculation: calc.name,
                    status: 'correct',
                    message: `计算正确: ${calc.name}`,
                    earned: calc.weight || 4
                });
            } else if (resultCorrect && !formulaCorrect) {
                points += (calc.weight || 4) * 0.7;
                details.push({
                    calculation: calc.name,
                    status: 'result_only',
                    message: `结果正确但公式不清晰`,
                    earned: (calc.weight || 4) * 0.7
                });
            } else if (formulaCorrect && !resultCorrect) {
                points += (calc.weight || 4) * 0.4;
                details.push({
                    calculation: calc.name,
                    status: 'formula_only',
                    message: `公式正确但计算有误`,
                    earned: (calc.weight || 4) * 0.4
                });
            } else {
                details.push({
                    calculation: calc.name,
                    status: 'wrong',
                    message: `计算错误: ${calc.name}`,
                    lost: calc.weight || 4
                });
            }
        }

        return {
            points: Math.min(points, maxPoints),
            maxPoints,
            percentage: (points / maxPoints) * 100,
            details
        };
    }

    /**
     * 评估概念理解 (15分)
     */
    evaluateConceptUnderstanding(extracted) {
        const challenge = this.currentChallenge;
        const requiredConcepts = challenge.requiredKnowledge;

        let points = 0;
        let maxPoints = 15;
        let details = [];

        for (const conceptId of requiredConcepts) {
            const concept = this.knowledgeBase.getConcept(conceptId);
            const understanding = this.assessConceptUnderstanding(extracted, concept);

            points += understanding.score;
            details.push({
                concept: concept.name,
                score: understanding.score,
                maxScore: 5,
                evidence: understanding.evidence,
                feedback: understanding.feedback
            });
        }

        return {
            points: Math.min(points, maxPoints),
            maxPoints,
            percentage: (points / maxPoints) * 100,
            details
        };
    }

    /**
     * 评估策略可行性 (10分)
     */
    evaluateFeasibility(extracted) {
        let points = 0;
        let maxPoints = 10;
        let details = [];

        if (!extracted.strategy) {
            return {
                points: 0,
                maxPoints,
                percentage: 0,
                details: [{ message: '未提出策略', lost: 10 }]
            };
        }

        // 检查是否考虑了约束条件
        const constraints = this.currentChallenge.context.constraints || [];
        for (const constraint of constraints) {
            if (this.strategyConsidersConstraint(extracted.strategy, constraint)) {
                points += 2;
                details.push({
                    constraint: constraint.name,
                    status: 'considered',
                    earned: 2
                });
            } else {
                details.push({
                    constraint: constraint.name,
                    status: 'ignored',
                    message: `未考虑约束: ${constraint.description}`,
                    lost: 2
                });
            }
        }

        // 检查策略的实际可行性
        const feasibilityCheck = this.checkStrategyFeasibility(extracted.strategy);
        if (feasibilityCheck.feasible) {
            points += 4;
            details.push({
                status: 'feasible',
                message: '策略实际可行',
                earned: 4
            });
        } else {
            details.push({
                status: 'not_feasible',
                message: `策略存在问题: ${feasibilityCheck.issues.join(', ')}`,
                lost: 4
            });
        }

        return {
            points: Math.min(points, maxPoints),
            maxPoints,
            percentage: (points / maxPoints) * 100,
            details
        };
    }

    /**
     * 判定成绩等级
     */
    determineGrade(totalScore) {
        if (totalScore >= 90) {
            return {
                level: 'A+',
                label: '卓越',
                pass: true,
                unlock: 2,
                badge: 'master',
                message: '完美！你已经完全掌握了这个知识点。'
            };
        } else if (totalScore >= 80) {
            return {
                level: 'A',
                label: '优秀',
                pass: true,
                unlock: 1,
                badge: 'excellent',
                message: '优秀！你的理解很深入。'
            };
        } else if (totalScore >= 70) {
            return {
                level: 'B',
                label: '良好',
                pass: true,
                unlock: 1,
                badge: null,
                message: '良好。继续保持这个势头。'
            };
        } else if (totalScore >= 60) {
            return {
                level: 'C',
                label: '及格',
                pass: true,
                unlock: 0,
                badge: null,
                message: '勉强及格。这个知识点需要加强。',
                weakPoint: true
            };
        } else {
            return {
                level: 'F',
                label: '不及格',
                pass: false,
                unlock: 0,
                badge: null,
                message: '未通过。让我们重新理解这个概念。',
                retry: true
            };
        }
    }

    /**
     * 生成导师反馈
     */
    generateMentorFeedback(context) {
        const { score, grade, evaluation, gaps, mistakes, attemptNumber } = context;

        let feedback = {
            opening: '',
            strengths: [],
            weaknesses: [],
            questions: [],
            hints: [],
            closing: '',
            nextSteps: []
        };

        // 开场白
        feedback.opening = this.dialogues.getGradeFeedback(grade.level, attemptNumber);

        // 找出优点
        for (const [dimension, result] of Object.entries(evaluation)) {
            if (result.percentage >= 80) {
                feedback.strengths.push(
                    this.dialogues.getStrengthFeedback(dimension, result)
                );
            }
        }

        // 找出问题
        for (const gap of gaps) {
            feedback.weaknesses.push({
                issue: gap.description,
                severity: gap.severity,
                impact: gap.impact
            });
        }

        // 针对错误生成苏格拉底式追问
        for (const mistake of mistakes.slice(0, 3)) { // 最多3个追问
            const question = this.questionGenerator.generateSocraticQuestion(
                mistake,
                this.currentChallenge
            );
            feedback.questions.push(question);
        }

        // 根据尝试次数给出不同程度的提示
        if (!grade.pass && attemptNumber < this.currentChallenge.maxAttempts) {
            const clue = this.clueSystem.provideClue(
                attemptNumber,
                this.currentChallenge,
                gaps
            );
            feedback.hints = clue.hints;
        }

        // 结束语和下一步
        if (grade.pass) {
            feedback.closing = this.dialogues.getPassMessage(grade.level);
            feedback.nextSteps = this.getNextChallenges(grade.unlock);
        } else {
            feedback.closing = this.dialogues.getRetryMessage(attemptNumber);
            feedback.nextSteps = [
                '仔细思考我提出的问题',
                '回顾相关知识点的定义',
                '重新计算并检查逻辑链条'
            ];
        }

        return feedback;
    }

    /**
     * 决定下一步行动
     */
    decideNextAction(grade, attemptNumber, gaps) {
        if (grade.pass) {
            return {
                action: 'pass',
                message: '恭喜通关！',
                unlocks: this.getUnlockedContent(grade.unlock),
                nextChallenge: this.getNextChallenge()
            };
        }

        if (attemptNumber >= this.currentChallenge.maxAttempts) {
            return {
                action: 'fail',
                message: '已达到最大尝试次数。让我们一起回顾这个知识点。',
                review: this.generateReviewSession(gaps),
                canRetake: true,
                retakeAfter: 3600000 // 1小时后可重做
            };
        }

        return {
            action: 'retry',
            message: `还有 ${this.currentChallenge.maxAttempts - attemptNumber} 次机会。`,
            focusAreas: gaps.map(g => g.concept),
            suggestedReview: this.suggestReviewMaterials(gaps)
        };
    }

    /**
     * 提供线索
     */
    provideClue(attemptNumber) {
        return this.clueSystem.provideClue(
            attemptNumber,
            this.currentChallenge,
            this.identifyCurrentGaps()
        );
    }

    /**
     * 苏格拉底式追问
     */
    askFollowUpQuestions(userAnswer) {
        const gaps = this.identifyGaps(this.extractKeyInformation(userAnswer));
        const questions = [];

        for (const gap of gaps) {
            const question = this.questionGenerator.generateFollowUp(gap, userAnswer);
            questions.push(question);
        }

        return {
            type: 'follow_up',
            intro: this.dialogues.getFollowUpIntro(),
            questions: questions,
            expectation: '请逐一回答这些问题，证明你的理解。'
        };
    }

    /**
     * 辅助方法
     */
    parseUserAnswer(rawAnswer) {
        // 解析用户答案的结构
        return {
            text: rawAnswer,
            numbers: this.extractNumbers(rawAnswer),
            formulas: this.extractFormulas(rawAnswer),
            keywords: this.extractKeywords(rawAnswer),
            structure: this.analyzeStructure(rawAnswer)
        };
    }

    extractKeyInformation(parsed, challenge = this.currentChallenge) {
        return {
            data: this.extractDataPoints(parsed),
            calculations: this.extractCalculations(parsed),
            logic: this.extractLogicChain(parsed),
            concepts: this.extractConceptUsage(parsed),
            strategy: this.extractStrategy(parsed)
        };
    }

    extractNumbers(text) {
        const numberPattern = /\$?(\d+(?:,\d{3})*(?:\.\d+)?)\s*(%|k|m|billion)?/gi;
        const matches = [...text.matchAll(numberPattern)];
        return matches.map(m => ({
            raw: m[0],
            value: parseFloat(m[1].replace(/,/g, '')),
            unit: m[2] || 'number'
        }));
    }

    extractFormulas(text) {
        // 识别常见的增长黑客公式
        const formulas = [];
        const patterns = {
            'ltv': /LTV\s*=\s*([^,\n]+)/gi,
            'cac': /CAC\s*=\s*([^,\n]+)/gi,
            'cac_ltv_ratio': /CAC\s*\/\s*LTV\s*=\s*([^,\n]+)/gi,
            'viral_coefficient': /K\s*=\s*([^,\n]+)/gi,
            'conversion_rate': /conversion\s+rate\s*=\s*([^,\n]+)/gi
        };

        for (const [type, pattern] of Object.entries(patterns)) {
            const matches = [...text.matchAll(pattern)];
            for (const match of matches) {
                formulas.push({
                    type,
                    formula: match[1].trim(),
                    full: match[0]
                });
            }
        }

        return formulas;
    }

    identifyGaps(extracted, evaluation) {
        const gaps = [];

        // 基于评估结果识别知识gap
        for (const [dimension, result] of Object.entries(evaluation)) {
            for (const detail of result.details) {
                if (detail.status === 'missing' || detail.status === 'wrong') {
                    gaps.push({
                        dimension,
                        concept: detail.item || detail.step || detail.calculation,
                        description: detail.message,
                        severity: this.calculateSeverity(result.percentage),
                        impact: detail.lost || 0
                    });
                }
            }
        }

        return gaps.sort((a, b) => b.impact - a.impact);
    }

    identifyMistakes(extracted, evaluation) {
        const mistakes = [];

        for (const [dimension, result] of Object.entries(evaluation)) {
            for (const detail of result.details) {
                if (detail.status === 'wrong' || detail.status === 'incomplete') {
                    mistakes.push({
                        type: dimension,
                        item: detail.item || detail.step || detail.calculation,
                        userValue: detail.userValue,
                        expectedValue: detail.expectedValue,
                        feedback: detail.message
                    });
                }
            }
        }

        return mistakes;
    }

    calculateSeverity(percentage) {
        if (percentage < 30) return 'critical';
        if (percentage < 60) return 'high';
        if (percentage < 80) return 'medium';
        return 'low';
    }

    recordAttempt(attempt) {
        this.currentChallenge.attempts.push(attempt);
        this.userProgress.attemptHistory.push({
            challengeId: this.currentChallenge.id,
            ...attempt
        });
    }

    canAccessChallenge(challenge) {
        if (!challenge.prerequisite) return true;

        for (const prereqId of challenge.prerequisite) {
            if (!this.userProgress.masteredConcepts.includes(prereqId)) {
                return false;
            }
        }

        return true;
    }

    buildContext(challenge) {
        return {
            scenario: challenge.scenario,
            data: challenge.context.data,
            constraints: challenge.context.constraints,
            goalMetrics: challenge.context.goalMetrics
        };
    }

    interpolate(template, context) {
        return template.replace(/\{(\w+)\}/g, (match, key) => context[key] || match);
    }
}

/**
 * 导师评分系统
 */
class MentorScoringSystem {
    constructor() {
        this.weights = {
            dataAccuracy: 0.30,
            logicCompleteness: 0.25,
            calculationCorrectness: 0.20,
            conceptUnderstanding: 0.15,
            feasibility: 0.10
        };
    }

    evaluate(results) {
        let totalScore = 0;

        for (const [dimension, weight] of Object.entries(this.weights)) {
            totalScore += results[dimension].points * weight;
        }

        return totalScore;
    }
}

/**
 * 线索系统 - 渐进式提示
 */
class ClueSystem {
    provideClue(attemptNumber, challenge, gaps) {
        const primaryGap = gaps[0]; // 最严重的gap

        if (attemptNumber === 1) {
            // 第一次：方向性提示
            return {
                type: 'direction',
                hints: [
                    `思考方向: 这个问题的核心是 ${challenge.coreTheme}`,
                    `关键概念: ${challenge.requiredKnowledge.slice(0, 2).join(', ')}`,
                    `问自己: ${this.getGuidingQuestion(challenge)}`
                ]
            };
        } else if (attemptNumber === 2) {
            // 第二次：框架提示
            return {
                type: 'framework',
                hints: [
                    `使用这个框架: ${this.getFramework(challenge)}`,
                    `公式参考: ${this.getFormulaHint(primaryGap)}`,
                    `示例: ${this.getExample(challenge)}`
                ]
            };
        } else {
            // 第三次：详细步骤
            return {
                type: 'steps',
                hints: [
                    '按照这些步骤:',
                    ...this.getDetailedSteps(challenge, gaps)
                ]
            };
        }
    }

    getGuidingQuestion(challenge) {
        const questions = {
            'unit_economics': '这个生意的单位经济学是否健康？',
            'funnel_optimization': '漏斗的哪个环节是最大瓶颈？',
            'viral_growth': '病毒系数需要达到多少才能实现自增长？',
            'retention': '什么是好的留存率？如何判断？'
        };
        return questions[challenge.category] || '核心问题是什么？';
    }

    getFramework(challenge) {
        const frameworks = {
            'unit_economics': 'CAC < LTV × 30%',
            'funnel_optimization': 'AARRR Funnel Analysis',
            'viral_growth': 'K = i × c (K > 1 为病毒增长)',
            'retention': 'Cohort Analysis + Retention Curve'
        };
        return frameworks[challenge.category] || challenge.framework;
    }

    getFormulaHint(gap) {
        const formulas = {
            'LTV': 'LTV = ARPU × Customer Lifetime (months)',
            'CAC': 'CAC = Total Marketing Spend / New Customers',
            'viral_coefficient': 'K = Invites per User × Conversion Rate',
            'conversion_rate': 'CR = Conversions / Total Visitors × 100%'
        };
        return formulas[gap.concept] || '请查阅相关公式';
    }

    getExample(challenge) {
        // 返回一个相似但不同数字的示例
        return challenge.exampleTemplate || '参考类似案例...';
    }

    getDetailedSteps(challenge, gaps) {
        return challenge.solutionSteps || [
            '1. 列出所有已知数据',
            '2. 确定需要计算的指标',
            '3. 应用相关公式',
            '4. 验证结果的合理性',
            '5. 得出结论和建议'
        ];
    }
}

/**
 * 苏格拉底式提问生成器
 */
class SocraticQuestionGenerator {
    generateSocraticQuestion(mistake, challenge) {
        const templates = {
            'missing_data': [
                `你提到了 {concept}，但是 {missing_element} 呢？为什么它重要？`,
                `如果 {missing_element} 是 {hypothetical_value}，会如何影响你的结论？`,
                `你的分析缺少了 {missing_element}。这个数据从哪里来？如何计算？`
            ],
            'wrong_calculation': [
                `你的 {calculation} 结果是 {user_value}。让我们验证一下：{formula} = ?`,
                `检查你的计算。如果 {input_a} = {value_a}，{input_b} = {value_b}，那么结果应该是多少？`,
                `{calculation} 的公式是什么？请写出完整的计算过程。`
            ],
            'logic_gap': [
                `你从 {premise_a} 得出了 {conclusion}。中间的推理步骤是什么？`,
                `为什么 {premise} 会导致 {conclusion}？请解释逻辑链条。`,
                `{assumption} 这个假设成立吗？在什么条件下成立？`
            ],
            'concept_misunderstanding': [
                `你对 {concept} 的理解是什么？请用自己的话解释。`,
                `{concept} 和 {related_concept} 有什么区别？`,
                `在这个场景下，{concept} 意味着什么？如何应用？`
            ]
        };

        const template = templates[mistake.type]?.[0] || '请详细解释你的思路。';
        return this.interpolate(template, {
            concept: mistake.item,
            missing_element: mistake.item,
            calculation: mistake.item,
            user_value: mistake.userValue,
            ...challenge.context
        });
    }

    generateFollowUp(gap, userAnswer) {
        return {
            gap: gap.concept,
            question: `关于 ${gap.concept}：${gap.description}`,
            guidingQuestions: [
                `${gap.concept} 的定义是什么？`,
                `在这个场景下如何计算 ${gap.concept}？`,
                `${gap.concept} 的值会如何影响最终决策？`
            ]
        };
    }

    interpolate(template, context) {
        return template.replace(/\{(\w+)\}/g, (match, key) => context[key] || match);
    }
}

// Classes available globally - no export needed for browser
// export { AIMentorSystem, MentorScoringSystem, ClueSystem, SocraticQuestionGenerator };
