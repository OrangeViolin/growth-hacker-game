/**
 * 多层验证规则系统
 * 确保用户答案的完整性、准确性、逻辑性
 * 不能蒙混过关，必须真正理解和计算
 */

class ValidationRules {
    constructor() {
        this.penaltySystem = new PenaltySystem();
        this.calculationParser = new CalculationParser();
        this.logicChainAnalyzer = new LogicChainAnalyzer();
        this.feasibilityChecker = new FeasibilityChecker();
    }

    // 主验证入口
    validate(userAnswer, challenge, session) {
        const layers = [
            // Layer 1: 格式检查 (20分)
            this.layer1_formatCheck(userAnswer, challenge),

            // Layer 2: 数据完整性检查 (20分)
            this.layer2_completenessCheck(userAnswer, challenge),

            // Layer 3: 计算准确性检查 (25分)
            this.layer3_calculationCheck(userAnswer, challenge),

            // Layer 4: 逻辑一致性检查 (20分)
            this.layer4_logicCheck(userAnswer, challenge),

            // Layer 5: 可行性检查 (15分)
            this.layer5_feasibilityCheck(userAnswer, challenge)
        ];

        const results = {
            layer1: layers[0],
            layer2: layers[1],
            layer3: layers[2],
            layer4: layers[3],
            layer5: layers[4]
        };

        // 计算总分
        const baseScore = Object.values(results).reduce((sum, r) => sum + r.score, 0);

        // 应用惩罚
        const penalties = this.penaltySystem.calculatePenalties(results, session);
        const finalScore = Math.max(0, baseScore - penalties.totalPenalty);

        // 判断是否通过
        const passed = finalScore >= 70 && this.checkCriticalRequirements(results, challenge);

        // 生成分层反馈
        const feedback = this.generateLayeredFeedback(results, penalties, challenge);

        return {
            passed: passed,
            score: finalScore,
            baseScore: baseScore,
            penalties: penalties,
            layerResults: results,
            feedback: feedback,
            detailedErrors: this.collectDetailedErrors(results),
            nextSteps: this.suggestNextSteps(results, passed, challenge)
        };
    }

    // Layer 1: 格式检查
    layer1_formatCheck(answer, challenge) {
        const issues = [];
        let score = 20;

        // 检查答案结构
        if (!answer || typeof answer !== 'object') {
            return {
                passed: false,
                score: 0,
                issues: ['答案格式错误：必须是结构化对象']
            };
        }

        // 检查必需的章节
        const requiredSections = this.getRequiredSections(challenge);
        requiredSections.forEach(section => {
            if (!answer[section]) {
                issues.push(`缺少必需章节：${section}`);
                score -= 5;
            }
        });

        // 检查是否包含计算过程
        if (challenge.validationRules?.mustShowWork) {
            if (!answer.calculations || !Array.isArray(answer.calculations) || answer.calculations.length === 0) {
                issues.push('必须显示计算过程');
                score -= 5;
            }
        }

        // 检查是否包含解释说明
        if (challenge.validationRules?.mustExplainDifference ||
            challenge.validationRules?.mustExplainLogic) {
            if (!answer.explanation || answer.explanation.length < 20) {
                issues.push('必须提供详细解释');
                score -= 5;
            }
        }

        // 检查字数要求
        if (challenge.validationRules?.minExplanationWords) {
            const wordCount = this.countWords(answer);
            if (wordCount < challenge.validationRules.minExplanationWords) {
                issues.push(`解释不够详细：需要至少${challenge.validationRules.minExplanationWords}字，当前${wordCount}字`);
                score -= 3;
            }
        }

        return {
            passed: score >= 15,
            score: Math.max(0, score),
            issues: issues,
            message: issues.length === 0 ? '格式检查通过' : '格式存在问题'
        };
    }

    // Layer 2: 完整性检查
    layer2_completenessCheck(answer, challenge) {
        const issues = [];
        let score = 20;
        const missing = [];

        // 检查必需元素
        if (challenge.expectedElements) {
            const elements = challenge.expectedElements;

            // 检查简单的必需字段
            Object.keys(elements).forEach(key => {
                if (elements[key] === true && !answer[key]) {
                    missing.push(key);
                    score -= 3;
                }
            });

            // 检查复杂的必需结构
            if (elements.hypothesis_count && (!answer.hypotheses || answer.hypotheses.length < elements.hypothesis_count)) {
                issues.push(`需要提供${elements.hypothesis_count}个假设，当前只有${answer.hypotheses?.length || 0}个`);
                score -= 5;
            }

            if (elements.each_hypothesis_has) {
                (answer.hypotheses || []).forEach((hyp, idx) => {
                    elements.each_hypothesis_has.forEach(field => {
                        if (!hyp[field]) {
                            issues.push(`假设${idx + 1}缺少：${field}`);
                            score -= 2;
                        }
                    });
                });
            }

            if (elements.experiment_design) {
                Object.keys(elements.experiment_design).forEach(field => {
                    if (elements.experiment_design[field] && !answer.experiment?.[field]) {
                        issues.push(`实验设计缺少：${field}`);
                        score -= 3;
                    }
                });
            }
        }

        // 检查必需的计算项
        if (challenge.requiredCalculations) {
            challenge.requiredCalculations.forEach(calc => {
                const found = this.findCalculation(answer, calc.variable);
                if (!found) {
                    missing.push(calc.variable);
                    score -= 4;
                }
            });
        }

        // 检查策略设计的完整性
        if (challenge.type === 'strategy_design') {
            const strategyElements = ['goals', 'channels', 'budget', 'timeline', 'risks'];
            strategyElements.forEach(elem => {
                if (!answer[elem]) {
                    missing.push(elem);
                    score -= 3;
                }
            });
        }

        if (missing.length > 0) {
            issues.push(`缺少以下必需内容：${missing.join(', ')}`);
        }

        return {
            passed: score >= 14,
            score: Math.max(0, score),
            issues: issues,
            missing: missing,
            message: issues.length === 0 ? '内容完整' : '内容不完整'
        };
    }

    // Layer 3: 计算准确性检查
    layer3_calculationCheck(answer, challenge) {
        if (!challenge.requiredCalculations) {
            return {
                passed: true,
                score: 25,
                message: '本题不需要计算检查'
            };
        }

        const errors = [];
        let score = 25;
        const tolerance = challenge.validationRules?.tolerancePercent || 5;

        challenge.requiredCalculations.forEach(calc => {
            // 从用户答案中提取计算结果
            const userValue = this.extractUserCalculation(answer, calc.variable);

            if (userValue === null) {
                errors.push({
                    variable: calc.variable,
                    error: 'missing',
                    message: `未找到${calc.variable}的计算结果`
                });
                score -= 5;
                return;
            }

            // 检查计算是否准确
            const expectedValue = calc.expected;
            const actualTolerance = calc.tolerance || (expectedValue * tolerance / 100);
            const difference = Math.abs(userValue - expectedValue);
            const errorPercent = (difference / expectedValue) * 100;

            if (difference > actualTolerance) {
                errors.push({
                    variable: calc.variable,
                    expected: expectedValue,
                    actual: userValue,
                    difference: difference,
                    errorPercent: errorPercent.toFixed(2),
                    message: `${calc.variable}计算错误：期望${expectedValue}，实际${userValue}，误差${errorPercent.toFixed(2)}%`
                });

                // 根据误差程度扣分
                if (errorPercent > 20) {
                    score -= 5; // 误差超过20%，重度扣分
                } else if (errorPercent > 10) {
                    score -= 3; // 误差10-20%，中度扣分
                } else {
                    score -= 2; // 误差5-10%，轻度扣分
                }
            }

            // 检查是否显示了计算过程
            if (challenge.validationRules?.mustShowWork) {
                const showsWork = this.checkShowsWork(answer, calc.variable);
                if (!showsWork) {
                    errors.push({
                        variable: calc.variable,
                        error: 'no_work_shown',
                        message: `${calc.variable}没有显示计算过程`
                    });
                    score -= 2;
                }
            }
        });

        return {
            passed: score >= 18,
            score: Math.max(0, score),
            errors: errors,
            errorCount: errors.length,
            message: errors.length === 0 ? '计算全部正确' : `发现${errors.length}个计算错误`
        };
    }

    // Layer 4: 逻辑一致性检查
    layer4_logicCheck(answer, challenge) {
        if (challenge.type !== 'logic_puzzle' && !challenge.validationRules?.mustAnalyzeRootCause) {
            return {
                passed: true,
                score: 20,
                message: '本题不需要逻辑检查'
            };
        }

        const issues = [];
        let score = 20;

        // 检查逻辑链条的完整性
        if (answer.reasoning || answer.analysis) {
            const logicChain = this.logicChainAnalyzer.parseLogicChain(answer);
            const gaps = this.logicChainAnalyzer.findLogicGaps(logicChain, challenge);

            gaps.forEach(gap => {
                issues.push({
                    type: 'logic_gap',
                    from: gap.from,
                    to: gap.to,
                    message: `逻辑跳跃：从"${gap.from}"到"${gap.to}"缺少推理步骤`
                });
                score -= 3;
            });
        }

        // 检查因果关系的合理性
        if (challenge.validationRules?.mustExplainCausality) {
            const causalityCheck = this.checkCausality(answer, challenge);
            if (!causalityCheck.valid) {
                issues.push({
                    type: 'causality_error',
                    message: '因果关系解释不充分或不合理'
                });
                score -= 5;
            }
        }

        // 检查数据支持
        if (challenge.validationRules?.mustProvideDataSupport) {
            const dataSupport = this.checkDataSupport(answer);
            if (!dataSupport.sufficient) {
                issues.push({
                    type: 'insufficient_data',
                    message: '缺少数据支持论点',
                    details: dataSupport.missing
                });
                score -= 4;
            }
        }

        // 检查假设的合理性
        if (answer.hypotheses) {
            answer.hypotheses.forEach((hyp, idx) => {
                if (!hyp.reasoning || hyp.reasoning.length < 50) {
                    issues.push({
                        type: 'weak_reasoning',
                        hypothesis: idx + 1,
                        message: `假设${idx + 1}的推理不够充分`
                    });
                    score -= 2;
                }

                if (!hyp.validation_method) {
                    issues.push({
                        type: 'no_validation',
                        hypothesis: idx + 1,
                        message: `假设${idx + 1}没有提供验证方法`
                    });
                    score -= 2;
                }
            });
        }

        // 检查矛盾
        const contradictions = this.findContradictions(answer);
        contradictions.forEach(contra => {
            issues.push({
                type: 'contradiction',
                message: `发现矛盾：${contra.description}`,
                location: contra.location
            });
            score -= 4;
        });

        return {
            passed: score >= 14,
            score: Math.max(0, score),
            issues: issues,
            issueCount: issues.length,
            message: issues.length === 0 ? '逻辑严密' : `发现${issues.length}个逻辑问题`
        };
    }

    // Layer 5: 可行性检查
    layer5_feasibilityCheck(answer, challenge) {
        if (challenge.type !== 'strategy_design' && !challenge.validationCriteria?.feasibilityCheck) {
            return {
                passed: true,
                score: 15,
                message: '本题不需要可行性检查'
            };
        }

        const issues = [];
        let score = 15;

        // 检查数学是否算得通
        if (challenge.validationCriteria?.mathCheck) {
            const mathCheck = this.checkMathConsistency(answer, challenge);
            if (!mathCheck.consistent) {
                mathCheck.errors.forEach(err => {
                    issues.push({
                        type: 'math_inconsistency',
                        message: err
                    });
                    score -= 3;
                });
            }
        }

        // 检查约束条件
        if (challenge.constraints) {
            const constraintCheck = this.checkConstraints(answer, challenge.constraints);
            constraintCheck.violations.forEach(violation => {
                issues.push({
                    type: 'constraint_violation',
                    constraint: violation.constraint,
                    message: violation.message
                });
                score -= 5; // 违反约束，重罚
            });
        }

        // 检查预算分配
        if (answer.budget && challenge.validationRules?.budgetAllocationMustTotal) {
            const totalAllocated = this.sumBudget(answer.budget);
            const expected = challenge.validationRules.budgetAllocationMustTotal;
            const difference = Math.abs(totalAllocated - expected);

            if (difference > expected * 0.01) { // 允许1%误差
                issues.push({
                    type: 'budget_mismatch',
                    message: `预算分配总和${totalAllocated}不等于总预算${expected}，差异${difference}`
                });
                score -= 4;
            }
        }

        // 检查资源可行性
        if (answer.resources) {
            const resourceCheck = this.checkResourceFeasibility(answer.resources, challenge);
            if (!resourceCheck.feasible) {
                resourceCheck.issues.forEach(issue => {
                    issues.push({
                        type: 'resource_infeasible',
                        message: issue
                    });
                    score -= 2;
                });
            }
        }

        // 检查时间线可行性
        if (answer.timeline) {
            const timelineCheck = this.checkTimelineFeasibility(answer.timeline);
            if (!timelineCheck.feasible) {
                timelineCheck.issues.forEach(issue => {
                    issues.push({
                        type: 'timeline_infeasible',
                        message: issue
                    });
                    score -= 2;
                });
            }
        }

        // 检查方案的现实性
        const realismScore = this.assessRealism(answer, challenge);
        if (realismScore < 5) {
            issues.push({
                type: 'unrealistic',
                message: `方案现实性不足（评分：${realismScore}/10）`
            });
            score -= (10 - realismScore);
        }

        return {
            passed: score >= 10,
            score: Math.max(0, score),
            issues: issues,
            issueCount: issues.length,
            realismScore: realismScore,
            message: issues.length === 0 ? '方案可行' : `发现${issues.length}个可行性问题`
        };
    }

    // ============== 辅助方法 ==============

    getRequiredSections(challenge) {
        const sections = [];

        if (challenge.validationRules?.mustShowWork) {
            sections.push('calculations');
        }

        if (challenge.validationRules?.mustExplainLogic ||
            challenge.validationRules?.mustExplainDifference) {
            sections.push('explanation');
        }

        if (challenge.validationRules?.mustProvideOptimization) {
            sections.push('optimization');
        }

        if (challenge.validationRules?.mustDesignOnboardingOptimization) {
            sections.push('onboarding_strategy');
        }

        if (challenge.validationRules?.mustCreateDetailedRoadmap) {
            sections.push('roadmap');
        }

        return sections;
    }

    countWords(answer) {
        let text = '';

        const extractText = (obj) => {
            if (typeof obj === 'string') {
                text += obj + ' ';
            } else if (Array.isArray(obj)) {
                obj.forEach(item => extractText(item));
            } else if (typeof obj === 'object' && obj !== null) {
                Object.values(obj).forEach(value => extractText(value));
            }
        };

        extractText(answer);

        return text.trim().split(/\s+/).length;
    }

    findCalculation(answer, variableName) {
        if (!answer.calculations) return null;

        return answer.calculations.find(calc =>
            calc.variable === variableName ||
            calc.name === variableName
        );
    }

    extractUserCalculation(answer, variableName) {
        // 从answer中提取特定变量的计算结果
        if (answer.calculations) {
            const calc = answer.calculations.find(c =>
                c.variable === variableName || c.name === variableName
            );
            if (calc && calc.result !== undefined) {
                return parseFloat(calc.result);
            }
        }

        // 也检查answer的直接属性
        if (answer[variableName] !== undefined) {
            return parseFloat(answer[variableName]);
        }

        // 尝试从results对象中查找
        if (answer.results && answer.results[variableName] !== undefined) {
            return parseFloat(answer.results[variableName]);
        }

        return null;
    }

    checkShowsWork(answer, variableName) {
        if (!answer.calculations) return false;

        const calc = answer.calculations.find(c =>
            c.variable === variableName || c.name === variableName
        );

        return calc && (calc.formula || calc.steps || calc.workShown);
    }

    checkCausality(answer, challenge) {
        // 检查是否解释了因果关系
        const text = JSON.stringify(answer).toLowerCase();

        const causalWords = ['因为', '导致', '造成', '引起', 'because', 'cause', 'lead to', 'result in'];
        const hasCausalLanguage = causalWords.some(word => text.includes(word));

        if (!hasCausalLanguage) {
            return { valid: false, reason: '缺少因果关系解释' };
        }

        // 检查是否有数据支持因果关系
        if (answer.reasoning && answer.reasoning.length < 100) {
            return { valid: false, reason: '因果关系解释不够详细' };
        }

        return { valid: true };
    }

    checkDataSupport(answer) {
        const missing = [];
        let dataPointsCount = 0;

        // 检查是否引用了数据
        const text = JSON.stringify(answer);
        const numberMatches = text.match(/\d+\.?\d*%?/g) || [];
        dataPointsCount = numberMatches.length;

        if (dataPointsCount < 5) {
            missing.push('缺少足够的数据引用（应至少引用5个数据点）');
        }

        // 检查是否有数据对比
        const hasComparison = text.includes('vs') || text.includes('对比') ||
                              text.includes('增长') || text.includes('下降');

        if (!hasComparison) {
            missing.push('缺少数据对比');
        }

        return {
            sufficient: missing.length === 0,
            missing: missing,
            dataPointsCount: dataPointsCount
        };
    }

    findContradictions(answer) {
        const contradictions = [];

        // 检查数字矛盾
        if (answer.calculations) {
            // 例如：检查百分比是否加总为100%
            const percentages = answer.calculations
                .filter(c => c.variable && c.variable.includes('percent'))
                .map(c => parseFloat(c.result));

            if (percentages.length > 1) {
                const sum = percentages.reduce((a, b) => a + b, 0);
                if (Math.abs(sum - 100) > 1 && Math.abs(sum - 1) > 0.01) {
                    contradictions.push({
                        description: `百分比总和${sum}不合理`,
                        location: 'calculations'
                    });
                }
            }
        }

        // 检查逻辑矛盾（简化版）
        const text = JSON.stringify(answer).toLowerCase();
        if (text.includes('增长') && text.includes('下降')) {
            // 这是一个非常简化的检查，实际应该更复杂
            // 检查是否在说同一个指标
        }

        return contradictions;
    }

    checkMathConsistency(answer, challenge) {
        const errors = [];

        // 检查目标分解是否一致
        if (answer.goals && answer.goals.monthly) {
            const monthlyGoals = answer.goals.monthly;
            if (Array.isArray(monthlyGoals) && monthlyGoals.length === 6) {
                const total = monthlyGoals.reduce((sum, m) => sum + (m.newCustomers || 0), 0);
                const expectedTotal = challenge.constraints?.total_new_customers;

                if (expectedTotal && Math.abs(total - expectedTotal) > expectedTotal * 0.05) {
                    errors.push(`月度目标总和${total}与总目标${expectedTotal}不一致`);
                }
            }
        }

        // 检查渠道分配是否一致
        if (answer.channels) {
            const totalBudget = answer.channels.reduce((sum, ch) => sum + (ch.budget || 0), 0);
            const totalTarget = answer.channels.reduce((sum, ch) => sum + (ch.targetCustomers || 0), 0);

            if (answer.budget && answer.budget.total) {
                if (Math.abs(totalBudget - answer.budget.total) > answer.budget.total * 0.01) {
                    errors.push(`渠道预算总和${totalBudget}与总预算${answer.budget.total}不一致`);
                }
            }

            // 检查CAC计算是否一致
            answer.channels.forEach(ch => {
                if (ch.budget && ch.targetCustomers && ch.cac) {
                    const calculatedCAC = ch.budget / ch.targetCustomers;
                    if (Math.abs(calculatedCAC - ch.cac) > ch.cac * 0.05) {
                        errors.push(`渠道${ch.name}的CAC计算不一致`);
                    }
                }
            });
        }

        return {
            consistent: errors.length === 0,
            errors: errors
        };
    }

    checkConstraints(answer, constraints) {
        const violations = [];

        // 检查CAC限制
        if (constraints.cac_max && answer.cac) {
            if (answer.cac > constraints.cac_max) {
                violations.push({
                    constraint: 'cac_max',
                    message: `CAC ${answer.cac}超过限制${constraints.cac_max}`
                });
            }
        }

        // 检查预算限制
        if (constraints.budget_first_3_months && answer.budget) {
            const first3MonthsBudget = this.calculateFirst3MonthsBudget(answer.budget);
            if (first3MonthsBudget > constraints.budget_first_3_months) {
                violations.push({
                    constraint: 'budget_first_3_months',
                    message: `前3个月预算${first3MonthsBudget}超过限制${constraints.budget_first_3_months}`
                });
            }
        }

        // 检查团队规模限制
        if (constraints.team_size_max_multiplier && answer.team) {
            const maxTeamSize = 5 * constraints.team_size_max_multiplier; // 假设初始5人
            if (answer.team.size > maxTeamSize) {
                violations.push({
                    constraint: 'team_size_max',
                    message: `团队规模${answer.team.size}超过限制${maxTeamSize}`
                });
            }
        }

        // 检查增长率要求
        if (constraints.mom_growth_min && answer.growth) {
            const minGrowth = answer.growth.monthly ?
                Math.min(...answer.growth.monthly) : 0;
            if (minGrowth < constraints.mom_growth_min) {
                violations.push({
                    constraint: 'mom_growth_min',
                    message: `最低月增长率${minGrowth}低于要求${constraints.mom_growth_min}`
                });
            }
        }

        return { violations };
    }

    calculateFirst3MonthsBudget(budget) {
        if (budget.monthly && Array.isArray(budget.monthly)) {
            return budget.monthly.slice(0, 3).reduce((sum, m) => sum + m, 0);
        }
        return 0;
    }

    sumBudget(budget) {
        if (typeof budget === 'number') return budget;

        if (Array.isArray(budget)) {
            return budget.reduce((sum, item) => {
                return sum + (typeof item === 'number' ? item : item.amount || 0);
            }, 0);
        }

        if (typeof budget === 'object') {
            if (budget.total) return budget.total;
            return Object.values(budget).reduce((sum, val) => {
                return sum + (typeof val === 'number' ? val : 0);
            }, 0);
        }

        return 0;
    }

    checkResourceFeasibility(resources, challenge) {
        const issues = [];

        // 检查人员配置是否合理
        if (resources.team) {
            if (resources.team.hiring && resources.team.hiring.length > 0) {
                const totalNewHires = resources.team.hiring.reduce((sum, h) => sum + h.count, 0);
                const hiringPeriod = 6; // 月
                const hiringRate = totalNewHires / hiringPeriod;

                if (hiringRate > 3) {
                    issues.push('招聘速度过快，平均每月超过3人不现实');
                }
            }
        }

        // 检查技术资源
        if (resources.technology) {
            // 检查工具和系统的合理性
        }

        return {
            feasible: issues.length === 0,
            issues: issues
        };
    }

    checkTimelineFeasibility(timeline) {
        const issues = [];

        if (Array.isArray(timeline)) {
            // 检查里程碑之间的时间间隔
            for (let i = 1; i < timeline.length; i++) {
                const prev = timeline[i - 1];
                const curr = timeline[i];

                // 检查复杂任务是否有足够时间
                if (curr.complexity === 'high' && curr.duration < 30) {
                    issues.push(`${curr.milestone}复杂度高但时间不足`);
                }
            }
        }

        return {
            feasible: issues.length === 0,
            issues: issues
        };
    }

    assessRealism(answer, challenge) {
        let score = 10;

        // 评估增长目标的现实性
        if (answer.growth && answer.growth.monthly) {
            const avgGrowth = answer.growth.monthly.reduce((a, b) => a + b, 0) / answer.growth.monthly.length;
            if (avgGrowth > 0.5) score -= 2; // 月增长50%以上不太现实
            if (avgGrowth > 1) score -= 3; // 月增长100%以上非常不现实
        }

        // 评估预算效率的现实性
        if (answer.channels) {
            answer.channels.forEach(ch => {
                if (ch.cac && ch.cac < 100) score -= 1; // CAC太低不现实
                if (ch.conversionRate && ch.conversionRate > 0.2) score -= 1; // 转化率太高
            });
        }

        return Math.max(0, score);
    }

    // 检查关键要求
    checkCriticalRequirements(results, challenge) {
        // 某些要求是强制性的，不满足直接不通过
        if (challenge.validationRules?.mustShowWork) {
            if (!results.layer1.passed) return false;
        }

        if (challenge.constraints) {
            if (results.layer5.issues.some(i => i.type === 'constraint_violation')) {
                return false; // 违反约束条件，不通过
            }
        }

        return true;
    }

    // 生成分层反馈
    generateLayeredFeedback(results, penalties, challenge) {
        const feedback = {
            summary: '',
            layers: {},
            strengths: [],
            improvements: [],
            criticalIssues: []
        };

        // Layer 1
        feedback.layers.format = {
            score: results.layer1.score,
            status: results.layer1.passed ? '通过' : '未通过',
            issues: results.layer1.issues
        };

        if (!results.layer1.passed) {
            feedback.criticalIssues.push('答案格式存在问题，请检查必需章节');
        }

        // Layer 2
        feedback.layers.completeness = {
            score: results.layer2.score,
            status: results.layer2.passed ? '通过' : '未通过',
            missing: results.layer2.missing || []
        };

        if (results.layer2.missing && results.layer2.missing.length > 0) {
            feedback.improvements.push(`补充缺失内容：${results.layer2.missing.join(', ')}`);
        }

        // Layer 3
        feedback.layers.calculation = {
            score: results.layer3.score,
            status: results.layer3.passed ? '通过' : '未通过',
            errors: results.layer3.errors || []
        };

        if (results.layer3.errors && results.layer3.errors.length > 0) {
            feedback.criticalIssues.push('存在计算错误，请仔细检查计算过程');
            results.layer3.errors.forEach(err => {
                if (err.message) {
                    feedback.improvements.push(err.message);
                }
            });
        } else if (results.layer3.score === 25) {
            feedback.strengths.push('计算全部正确');
        }

        // Layer 4
        feedback.layers.logic = {
            score: results.layer4.score,
            status: results.layer4.passed ? '通过' : '未通过',
            issues: results.layer4.issues || []
        };

        if (results.layer4.issues && results.layer4.issues.length > 0) {
            const logicGaps = results.layer4.issues.filter(i => i.type === 'logic_gap');
            if (logicGaps.length > 0) {
                feedback.improvements.push('填补逻辑跳跃，完善推理链条');
            }
        }

        // Layer 5
        feedback.layers.feasibility = {
            score: results.layer5.score,
            status: results.layer5.passed ? '通过' : '未通过',
            issues: results.layer5.issues || []
        };

        const constraintViolations = results.layer5.issues.filter(i => i.type === 'constraint_violation');
        if (constraintViolations.length > 0) {
            feedback.criticalIssues.push('违反了约束条件，方案不可行');
            constraintViolations.forEach(v => {
                feedback.improvements.push(v.message);
            });
        }

        // 生成总结
        const totalIssues = [
            ...results.layer1.issues,
            ...results.layer2.issues,
            ...(results.layer3.errors || []),
            ...(results.layer4.issues || []),
            ...(results.layer5.issues || [])
        ].length;

        if (totalIssues === 0) {
            feedback.summary = '完美！所有检查都通过，答案质量优秀。';
        } else if (feedback.criticalIssues.length > 0) {
            feedback.summary = `发现${feedback.criticalIssues.length}个严重问题，必须解决才能通过。`;
        } else {
            feedback.summary = `发现${totalIssues}个小问题，建议改进以获得更高分数。`;
        }

        return feedback;
    }

    // 收集详细错误
    collectDetailedErrors(results) {
        const errors = [];

        if (results.layer1.issues) {
            results.layer1.issues.forEach(issue => {
                errors.push({ layer: 1, type: 'format', message: issue });
            });
        }

        if (results.layer2.issues) {
            results.layer2.issues.forEach(issue => {
                errors.push({ layer: 2, type: 'completeness', message: issue });
            });
        }

        if (results.layer3.errors) {
            results.layer3.errors.forEach(err => {
                errors.push({ layer: 3, type: 'calculation', ...err });
            });
        }

        if (results.layer4.issues) {
            results.layer4.issues.forEach(issue => {
                errors.push({ layer: 4, type: 'logic', ...issue });
            });
        }

        if (results.layer5.issues) {
            results.layer5.issues.forEach(issue => {
                errors.push({ layer: 5, type: 'feasibility', ...issue });
            });
        }

        return errors;
    }

    // 建议下一步
    suggestNextSteps(results, passed, challenge) {
        const suggestions = [];

        if (!passed) {
            // 未通过，给出改进建议
            if (!results.layer1.passed) {
                suggestions.push({
                    priority: 'high',
                    action: '修正答案格式',
                    details: results.layer1.issues
                });
            }

            if (!results.layer3.passed && results.layer3.errors.length > 0) {
                suggestions.push({
                    priority: 'high',
                    action: '修正计算错误',
                    details: results.layer3.errors.map(e => e.message)
                });
            }

            if (!results.layer5.passed) {
                suggestions.push({
                    priority: 'critical',
                    action: '调整方案以满足约束条件',
                    details: results.layer5.issues.map(i => i.message)
                });
            }

            suggestions.push({
                priority: 'medium',
                action: '重新提交答案',
                details: ['在修正上述问题后重新提交']
            });
        } else {
            // 通过了，但可以做得更好
            const score = Object.values(results).reduce((sum, r) => sum + r.score, 0);

            if (score < 90) {
                suggestions.push({
                    priority: 'low',
                    action: '追求完美通关',
                    details: ['当前分数' + score + '，可以通过完善细节获得更高分数']
                });
            }

            suggestions.push({
                priority: 'low',
                action: '继续下一个挑战',
                details: ['你已解锁新的挑战']
            });
        }

        return suggestions;
    }
}

// 惩罚系统
class PenaltySystem {
    constructor() {
        this.penalties = {
            calculation_error: {
                firstTime: { penalty: 0, warning: '计算有误，请检查' },
                secondTime: { penalty: 10, warning: '再次计算错误，-10分' },
                thirdTime: { penalty: 20, lockout: 300 } // 锁定5分钟
            },
            logic_gap: {
                firstTime: { penalty: 5, hint: '逻辑不完整' },
                secondTime: { penalty: 15, requirement: '必须填补逻辑链' },
                thirdTime: { penalty: 30, reset: true }
            },
            constraint_violation: {
                penalty: 25,
                message: '违反约束条件，重罚'
            },
            incomplete_answer: {
                penalty: 10,
                message: '回答不完整'
            }
        };

        this.streakMultiplier = {
            2: 1.5,
            3: 2.0,
            4: 3.0,
            5: null // 直接失败
        };
    }

    calculatePenalties(results, session) {
        let totalPenalty = 0;
        const penalties = [];

        // 计算各种错误的惩罚
        if (results.layer3.errors && results.layer3.errors.length > 0) {
            const attemptCount = session.attempts || 1;
            const penaltyConfig = this.penalties.calculation_error;

            let penalty = 0;
            if (attemptCount === 1) {
                penalty = penaltyConfig.firstTime.penalty;
            } else if (attemptCount === 2) {
                penalty = penaltyConfig.secondTime.penalty;
            } else {
                penalty = penaltyConfig.thirdTime.penalty;
            }

            penalties.push({
                type: 'calculation_error',
                penalty: penalty,
                attempt: attemptCount
            });

            totalPenalty += penalty;
        }

        // 逻辑问题惩罚
        if (results.layer4.issues && results.layer4.issues.length > 0) {
            const logicGaps = results.layer4.issues.filter(i => i.type === 'logic_gap');
            if (logicGaps.length > 0) {
                const attemptCount = session.attempts || 1;
                const penaltyConfig = this.penalties.logic_gap;

                let penalty = 0;
                if (attemptCount === 1) {
                    penalty = penaltyConfig.firstTime.penalty;
                } else if (attemptCount === 2) {
                    penalty = penaltyConfig.secondTime.penalty;
                } else {
                    penalty = penaltyConfig.thirdTime.penalty;
                }

                penalties.push({
                    type: 'logic_gap',
                    penalty: penalty,
                    attempt: attemptCount
                });

                totalPenalty += penalty;
            }
        }

        // 约束违反惩罚
        if (results.layer5.issues && results.layer5.issues.some(i => i.type === 'constraint_violation')) {
            const penalty = this.penalties.constraint_violation.penalty;
            penalties.push({
                type: 'constraint_violation',
                penalty: penalty
            });
            totalPenalty += penalty;
        }

        // 连续错误加倍惩罚
        if (session.errorStreak && session.errorStreak >= 2) {
            const multiplier = this.streakMultiplier[Math.min(session.errorStreak, 4)];
            if (multiplier === null) {
                // 5次连续错误，直接失败
                return {
                    totalPenalty: 100,
                    penalties: penalties,
                    directFail: true,
                    message: '连续错误次数过多，本题失败'
                };
            } else {
                const additionalPenalty = totalPenalty * (multiplier - 1);
                penalties.push({
                    type: 'error_streak',
                    penalty: additionalPenalty,
                    streak: session.errorStreak,
                    multiplier: multiplier
                });
                totalPenalty += additionalPenalty;
            }
        }

        return {
            totalPenalty: Math.round(totalPenalty),
            penalties: penalties,
            directFail: false
        };
    }
}

// 计算解析器
class CalculationParser {
    parse(calculationText) {
        // 解析计算文本，提取变量和结果
        // 支持多种格式
        const patterns = [
            /(\w+)\s*=\s*([\d.]+)/g,  // variable = 123
            /(\w+):\s*([\d.]+)/g,      // variable: 123
            /(\w+)\s+([\d.]+)/g        // variable 123
        ];

        const results = {};

        patterns.forEach(pattern => {
            let match;
            while ((match = pattern.exec(calculationText)) !== null) {
                results[match[1]] = parseFloat(match[2]);
            }
        });

        return results;
    }
}

// 逻辑链分析器
class LogicChainAnalyzer {
    parseLogicChain(answer) {
        // 解析逻辑链条
        const chain = [];

        if (answer.reasoning) {
            // 简化版：按句子分割
            const sentences = answer.reasoning.split(/[。.]/);
            sentences.forEach((sent, idx) => {
                if (sent.trim().length > 10) {
                    chain.push({
                        step: idx + 1,
                        statement: sent.trim(),
                        type: this.classifyStatement(sent)
                    });
                }
            });
        }

        return chain;
    }

    classifyStatement(statement) {
        if (statement.includes('因此') || statement.includes('所以')) {
            return 'conclusion';
        } else if (statement.includes('因为') || statement.includes('由于')) {
            return 'premise';
        } else if (statement.includes('数据') || /\d+/.test(statement)) {
            return 'evidence';
        } else {
            return 'claim';
        }
    }

    findLogicGaps(chain, challenge) {
        const gaps = [];

        // 检查逻辑链条的连贯性
        for (let i = 1; i < chain.length; i++) {
            const prev = chain[i - 1];
            const curr = chain[i];

            // 如果从evidence直接跳到conclusion，没有reasoning
            if (prev.type === 'evidence' && curr.type === 'conclusion') {
                const hasReasoningBetween = false; // 简化版
                if (!hasReasoningBetween) {
                    gaps.push({
                        from: prev.statement.substring(0, 50),
                        to: curr.statement.substring(0, 50),
                        type: 'missing_reasoning'
                    });
                }
            }
        }

        return gaps;
    }
}

// 可行性检查器
class FeasibilityChecker {
    checkFeasibility(answer, challenge) {
        // 综合检查方案的可行性
        const checks = {
            mathConsistency: this.checkMath(answer),
            resourceAvailability: this.checkResources(answer),
            timeRealism: this.checkTimeline(answer),
            costRealism: this.checkCosts(answer)
        };

        const feasible = Object.values(checks).every(c => c.feasible);

        return {
            feasible: feasible,
            checks: checks
        };
    }

    checkMath(answer) {
        // 检查数学一致性
        return { feasible: true };
    }

    checkResources(answer) {
        // 检查资源可行性
        return { feasible: true };
    }

    checkTimeline(answer) {
        // 检查时间可行性
        return { feasible: true };
    }

    checkCosts(answer) {
        // 检查成本合理性
        return { feasible: true };
    }
}

module.exports = {
    ValidationRules,
    PenaltySystem,
    CalculationParser,
    LogicChainAnalyzer,
    FeasibilityChecker
};
