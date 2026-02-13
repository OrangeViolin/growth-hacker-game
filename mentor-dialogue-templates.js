/**
 * 导师对话模板库
 * 严格但循循善诱的导师风格，苏格拉底式提问
 */

class MentorDialogueTemplates {
    constructor() {
        this.personality = {
            tone: 'strict_but_supportive',
            approach: 'socratic',
            values: ['precision', 'logic', 'depth', 'mastery']
        };
    }

    /**
     * 挑战开场白
     */
    getChallengeIntro(challenge) {
        const intros = {
            beginner: `
很好，让我们从基础开始。

这不是简单的选择题，我需要看到你的思考过程。
记住：增长黑客的本质是用数据和逻辑驱动决策。

【${challenge.name}】

难度：⭐️
要求：完整的计算过程 + 清晰的推理逻辑
时间：${challenge.timeLimit / 60000}分钟
机会：${challenge.maxAttempts}次

准备好了吗？让我们开始。
`,
            intermediate: `
进入中级关卡。

从现在开始，我会更加严格。模糊的答案和不完整的逻辑都不会被接受。

【${challenge.name}】

难度：⭐️⭐️⭐️
要求：深度分析 + 多维度思考 + 可执行策略
时间：${challenge.timeLimit / 60000}分钟
通过要求：${challenge.passingScore}分

这个问题没有标准答案，但有明确的评判标准。
证明你真正理解了这些概念。
`,
            advanced: `
高级挑战。

这里测试的是你的综合能力：分析、判断、策略设计。
我会像真实的增长负责人一样追问你的每一个假设。

【${challenge.name}】

难度：⭐️⭐️⭐️⭐️⭐️
要求：大师级分析 + 创新思维 + 完整方案
通过要求：${challenge.passingScore}分

只有最严谨的答案才能通过。
`,
            master: `
大师级挑战。

如果你能完美解答这个问题，说明你已经掌握了增长黑客的精髓。

【${challenge.name}】

难度：⭐️⭐️⭐️⭐️⭐️⭐️
要求：业界顶尖水平

这是最后的考验。
`
        };

        return intros[challenge.difficulty] || intros.beginner;
    }

    /**
     * 问题模板
     */
    getQuestionTemplate(questionType) {
        const templates = {
            calculation: {
                main: `
场景：{scenario}

数据：
{data_points}

问题：
1. 计算{metric_1}（给出完整计算过程）
2. 计算{metric_2}（展示公式）
3. 这些数字意味着什么？
4. 基于这些数据，你会采取什么行动？

要求：
- 每一步计算都要写出公式
- 解释每个数字的含义
- 推理过程要完整
`,
                sub: [
                    '公式是什么？',
                    '为什么用这个公式？',
                    '计算过程是什么？',
                    '结果的含义是什么？'
                ]
            },

            analysis: {
                main: `
场景：{scenario}

背景：
{context}

问题：
1. 分析当前状况的核心问题是什么？
2. 数据支持你的判断吗？（给出具体数据）
3. 有哪些可能的原因？（至少3个）
4. 如何验证你的假设？
5. 提出具体的优化方案

要求：
- 用数据说话
- 逻辑链条完整
- 方案可执行
`,
                sub: [
                    '问题的根本原因是什么？',
                    '有什么数据支持这个判断？',
                    '还有其他可能性吗？',
                    '如何验证这个假设？'
                ]
            },

            strategy: {
                main: `
场景：{scenario}

约束条件：
{constraints}

目标：
{goals}

问题：
1. 设计一个增长策略
2. 为什么选择这个策略？（给出3个理由）
3. 需要哪些资源？
4. 预期效果和风险是什么？
5. 如何衡量成功？

要求：
- 策略要具体可执行
- 考虑所有约束条件
- 给出量化的预期
- 识别主要风险
`,
                sub: [
                    '为什么这个策略最优？',
                    '有考虑所有约束吗？',
                    '预期收益如何计算？',
                    '最大的风险是什么？'
                ]
            },

            logic: {
                main: `
场景：{scenario}

前提：
{premises}

问题：
1. 基于这些前提，可以得出什么结论？
2. 推理过程是什么？（步骤要完整）
3. 这个结论的置信度如何？
4. 有哪些隐含假设？
5. 如果{condition}改变，结论会如何变化？

要求：
- 推理链条清晰
- 识别所有假设
- 考虑边界条件
`,
                sub: [
                    '从前提A如何推导到结论B？',
                    '中间省略了什么步骤？',
                    '这个假设成立吗？',
                    '边界情况如何？'
                ]
            }
        };

        return templates[questionType] || templates.analysis;
    }

    /**
     * 成绩反馈
     */
    getGradeFeedback(grade, attemptNumber) {
        const feedbacks = {
            'A+': [
                '👏 卓越！这是我见过最好的答案之一。',
                '💯 完美！你的分析深度和广度都达到了大师级水平。',
                '⭐ 杰出！你不仅理解了概念，还能灵活应用。',
                '🎯 精准！每一个细节都准确无误。'
            ],
            'A': [
                '👍 优秀！你的理解很深入。',
                '✨ 很好！分析逻辑严密。',
                '💪 出色！继续保持这个水平。',
                '🌟 不错！已经掌握了核心要点。'
            ],
            'B': [
                '✅ 良好。你理解了主要概念。',
                '👌 可以。但还有提升空间。',
                '📈 不错的开始。继续深入思考。',
                '💡 基本正确。但细节需要加强。'
            ],
            'C': [
                '⚠️ 勉强及格。这个知识点需要加强。',
                '😐 及格了，但不够扎实。',
                '📚 通过了，但建议再复习一遍核心概念。',
                '🤔 刚好到及格线。需要更深入的理解。'
            ],
            'F': [
                '❌ 不及格。让我们重新理解这个概念。',
                '🚫 未通过。你的理解存在根本性问题。',
                '⛔ 失败。这个答案显示你还没掌握核心知识点。',
                '💔 很遗憾，这次没通过。但失败是学习的一部分。'
            ]
        };

        const gradeMessages = feedbacks[grade] || feedbacks['F'];
        const message = gradeMessages[Math.min(attemptNumber - 1, gradeMessages.length - 1)];

        if (attemptNumber > 1 && grade !== 'F') {
            return `${message}\n\n第${attemptNumber}次尝试有了明显进步。`;
        }

        return message;
    }

    /**
     * 优点反馈
     */
    getStrengthFeedback(dimension, result) {
        const strengths = {
            dataAccuracy: [
                `数据计算准确无误（${result.percentage.toFixed(0)}%）。`,
                `你对数字的把握很精准。`,
                `计算能力很强，每个数字都对。`
            ],
            logicCompleteness: [
                `逻辑链条完整（${result.percentage.toFixed(0)}%）。`,
                `推理过程清晰严密。`,
                `你的分析很有条理。`
            ],
            calculationCorrectness: [
                `所有公式都正确（${result.percentage.toFixed(0)}%）。`,
                `计算过程规范准确。`,
                `对公式的理解很到位。`
            ],
            conceptUnderstanding: [
                `概念理解深刻（${result.percentage.toFixed(0)}%）。`,
                `你真正理解了这些知识点。`,
                `对核心概念的把握很准确。`
            ],
            feasibility: [
                `策略切实可行（${result.percentage.toFixed(0)}%）。`,
                `你的方案很实用。`,
                `考虑得很周全。`
            ]
        };

        const messages = strengths[dimension] || [`${dimension}表现出色`];
        return messages[Math.floor(Math.random() * messages.length)];
    }

    /**
     * 苏格拉底式追问 - 针对不同错误类型
     */
    getSocraticQuestion(mistake, context) {
        const questionTemplates = {
            missing_data: {
                gentle: `
你提到了 {concept}，这很好。

但是，我注意到你没有提到 {missing_element}。

问题：
1. {missing_element} 在这个分析中重要吗？为什么？
2. 如果 {missing_element} = {hypothetical_value}，会如何影响你的结论？
3. 如何获取或计算 {missing_element}？

请回答这三个问题。
`,
                firm: `
等等。你的分析缺少了关键数据。

你没有考虑 {missing_element}。这不是小问题。

在增长黑客中，{missing_element} 是 {importance}。
没有这个数据，你的结论是不完整的。

现在，请回答：
1. {missing_element} 是什么？定义清楚。
2. 如何计算它？写出公式。
3. 它的值是多少？展示计算过程。
4. 它如何改变你之前的结论？

重新完整地回答。
`,
                strict: `
❌ 停。这个分析根本性缺失。

{missing_element} 是这个问题的核心要素之一。
你完全忽略了它，说明你对问题的理解是表面的。

让我明确告诉你 {missing_element} 为什么重要：
{explanation}

现在，重新思考整个问题：
1. 重新列出所有需要的数据点
2. 对每个数据点，说明为什么需要它
3. 计算 {missing_element}
4. 基于完整的数据，重新得出结论

这次，不要遗漏任何关键要素。
`
            },

            wrong_calculation: {
                gentle: `
你的计算有些偏差。让我们一起检查。

你算出 {calculation} = {user_value}
但我认为应该重新验证一下。

提示：
- 公式是：{formula}
- 输入值：{inputs}
- 请重新计算

是哪一步出错了？
`,
                firm: `
计算错误。

{calculation} 的结果不是 {user_value}。

让我们逐步检查：
1. 公式正确吗？应该是 {correct_formula}
2. 输入值对吗？
   - {input_1} = {value_1}
   - {input_2} = {value_2}
3. 计算过程：{step_by_step}

请指出你在哪一步出错了，然后给出正确答案。
`,
                strict: `
❌ 严重的计算错误。

{calculation} = {user_value} 是完全错误的。
正确答案是 {correct_value}，你的误差达到了 {error_percent}%。

这个错误说明你对 {concept} 的理解不够扎实。

现在，我要求你：
1. 写出 {calculation} 的标准公式
2. 解释公式中每个变量的含义
3. 代入正确的数值
4. 一步步展示计算过程
5. 验证结果的合理性

重新计算，这次要确保每一步都正确。
`
            },

            logic_gap: {
                gentle: `
你的推理跳跃了一些步骤。

你说：从 {premise} 得出 {conclusion}。

但是，中间的推理步骤是什么？

问题：
1. {premise} 为什么会导致 {conclusion}？
2. 中间需要哪些推理？
3. 有什么隐含假设？

请补充完整的逻辑链条。
`,
                firm: `
逻辑链条不完整。

你直接从 {premise} 跳到了 {conclusion}。
这中间省略了太多关键推理。

让我追问：
1. {premise} → ??? → {conclusion}，中间是什么？
2. 你假设了 {assumption}，但这个假设成立吗？
3. 如果 {condition} 改变，结论还成立吗？
4. 有没有反例？

重新构建完整的推理链条。每一步都要有根据。
`,
                strict: `
❌ 严重的逻辑错误。

从 {premise} 无法直接得出 {conclusion}。
你的推理存在多处跳跃和未验证的假设。

关键问题：
1. 你假设了 {assumption_1}，但这需要证明
2. 你忽略了 {factor}，这会影响结论
3. 存在反例：{counter_example}

在增长黑客中，逻辑严密性至关重要。
模糊的推理会导致错误的策略。

现在，重新分析：
1. 明确列出所有前提
2. 说明每个推理步骤
3. 验证所有假设
4. 考虑边界条件
5. 得出有据可依的结论

这次，要像写数学证明一样严谨。
`
            },

            concept_misunderstanding: {
                gentle: `
你对 {concept} 的理解有些偏差。

你说：{user_understanding}

但实际上，{concept} 的定义是：{correct_definition}

问题：
1. {concept} 和 {related_concept} 有什么区别？
2. 在这个场景下，{concept} 意味着什么？
3. 如何正确应用 {concept}？

请重新理解这个概念。
`,
                firm: `
概念理解错误。

{concept} ≠ {user_understanding}

这是一个基础概念，必须准确理解：

【正确定义】
{correct_definition}

【关键要点】
{key_points}

【常见误区】
❌ {misconception_1}
❌ {misconception_2}

现在，请用自己的话解释 {concept}，并说明：
1. 它的核心是什么？
2. 如何计算或衡量？
3. 在实际中如何应用？
4. 有哪些注意事项？
`,
                strict: `
❌ 根本性的概念混淆。

你对 {concept} 的理解是错误的。
这个错误说明你需要回到基础，重新学习。

{concept} 是增长黑客的核心概念之一。
如果不能准确理解，后面的所有分析都是空中楼阁。

【必须掌握】
- 定义：{definition}
- 公式：{formula}
- 应用场景：{use_cases}
- 常见错误：{common_mistakes}

任务：
1. 仔细阅读 {concept} 的知识点
2. 找3个真实案例，分析 {concept} 如何应用
3. 写出 {concept} 与 {related_concepts} 的对比
4. 重新回答原问题

只有真正理解了概念，才能继续。
`
            },

            incomplete_strategy: {
                gentle: `
你的策略方向是对的，但不够具体。

你提出：{strategy_outline}

但是，我需要更多细节：
1. 具体怎么做？（step by step）
2. 需要什么资源？
3. 预期效果是什么？（量化）
4. 如何衡量成功？
5. 有什么风险？

请补充完整。
`,
                firm: `
策略太粗略，无法执行。

你说：{vague_strategy}

这不是一个可执行的策略，只是一个方向。

作为增长负责人，你需要回答：
1. 【具体行动】三个月内，每周做什么？
2. 【资源需求】需要多少预算？几个人？什么技能？
3. 【量化目标】具体的KPI是什么？
4. 【成功指标】如何判断策略是否有效？
5. 【风险控制】主要风险是什么？如何应对？
6. 【备选方案】如果失败，Plan B是什么？

重新设计一个可执行的策略。
`,
                strict: `
❌ 这不是策略，这是空话。

{vague_strategy} - 这太虚了。

我见过太多这样的"策略"：
- 说了等于没说
- 无法执行
- 无法衡量
- 没有考虑约束

真正的增长策略需要：

【清晰度】
- 精确的行动步骤
- 明确的负责人
- 具体的时间表

【可行性】
- 考虑了所有约束条件
- 资源配置合理
- 风险可控

【可衡量】
- 量化的目标
- 明确的成功指标
- 监控dashboard

现在，重新设计策略。用这个模板：

## 策略名称
[30字以内清晰描述]

## 目标
[量化的KPI，3个月目标]

## 行动计划
Week 1-4: [具体做什么]
Week 5-8: [具体做什么]
Week 9-12: [具体做什么]

## 资源需求
- 预算：$xxx
- 人力：x人 × x周
- 工具：[清单]

## 成功指标
- 北极星指标：[X]
- 支持指标：[Y, Z]
- 最低成功标准：[数字]

## 风险与应对
- 风险1：[具体风险] → 应对：[措施]
- 风险2：[具体风险] → 应对：[措施]

## 备选方案
如果主策略失败，Plan B：[...]

这才是可执行的策略。
`
            }
        };

        return questionTemplates;
    }

    /**
     * 追问引导语
     */
    getFollowUpIntro() {
        const intros = [
            '你的答案引发了一些问题。让我追问几个：',
            '还没完。我需要你回答这些问题：',
            '等等，先别急着下结论。请先回答：',
            '你的分析有些地方需要澄清。请回答：',
            '好，继续往深处想。回答这几个问题：'
        ];

        return intros[Math.floor(Math.random() * intros.length)];
    }

    /**
     * 通关消息
     */
    getPassMessage(grade) {
        const messages = {
            'A+': `
🎉 完美通关！

你已经完全掌握了这个知识点。
这样的水平，可以直接去做增长负责人了。

【解锁】
✅ 2个新挑战关卡
✅ 大师级提示
✅ "增长大师"徽章

继续保持这个水平！
`,
            'A': `
🌟 优秀通关！

你的理解很深入，分析很到位。

【解锁】
✅ 1个新挑战关卡
✅ 高级提示

继续加油！
`,
            'B': `
✅ 通关！

你掌握了主要知识点。
如果能在细节上更严谨，会更好。

【解锁】
✅ 1个新挑战关卡

继续学习！
`,
            'C': `
😐 勉强通关

你理解了基础概念，但还不够扎实。

【注意】
⚠️ 这个知识点被标记为"脆弱知识点"
⚠️ 建议稍后复习

【未解锁新内容】

建议加强这个知识点后再继续。
`
        };

        return messages[grade] || messages['C'];
    }

    /**
     * 重试消息
     */
    getRetryMessage(attemptNumber) {
        const messages = [
            {
                attempt: 1,
                message: `
第1次尝试没通过。这很正常。

失败是学习的一部分。
现在你知道了差距在哪里。

【建议】
1. 仔细阅读我的反馈
2. 思考我提出的问题
3. 复习相关知识点
4. 重新尝试

还有2次机会。加油！
`
            },
            {
                attempt: 2,
                message: `
第2次还是没通过。

你需要更认真地对待这个问题。
不要猜，要真正理解。

【强烈建议】
1. 回顾知识点的定义
2. 理解公式背后的逻辑
3. 做一遍完整的计算
4. 检查每一步推理

最后1次机会了。认真对待。
`
            },
            {
                attempt: 3,
                message: `
很遗憾，三次机会都用完了。

但这不是结束，而是重新开始。

【接下来】
1. 我会详细讲解这个知识点
2. 你需要认真复习
3. 1小时后可以重新挑战

记住：增长黑客需要扎实的基础。
不要急，把每个概念都吃透。

失败不可怕，放弃才可怕。
`
            }
        ];

        return messages.find(m => m.attempt === attemptNumber)?.message || messages[2].message;
    }

    /**
     * 被阻挡的消息
     */
    getBlockedMessage(prerequisite) {
        return `
🔒 这个关卡暂时无法访问

【前置要求】
需要先完成：${prerequisite.join(', ')}

【原因】
这个关卡依赖于之前的知识点。
如果基础不牢，学习效果会很差。

请先完成前置关卡。

记住：增长黑客是一个体系，
需要循序渐进地学习。
`;
    }

    /**
     * 提示消息（线索）
     */
    getHintMessage(hintType, hint) {
        const headers = {
            direction: '💡 方向提示',
            framework: '🧰 框架提示',
            steps: '📝 步骤提示',
            answer: '📖 完整解答'
        };

        return `
${headers[hintType] || '💡 提示'}

${hint}

---

记住：真正的理解来自于自己的思考，
而不是看答案。
`;
    }

    /**
     * 复习建议
     */
    getReviewSuggestion(gaps) {
        const weakConcepts = gaps.slice(0, 3).map(g => g.concept);

        return `
📚 复习建议

基于你的答题情况，建议重点复习：

${weakConcepts.map((c, i) => `${i + 1}. ${c} - ${this.getConceptTip(c)}`).join('\n')}

【学习方法】
1. 仔细阅读概念定义
2. 理解公式背后的逻辑
3. 看真实案例
4. 自己做计算练习
5. 用自己的话解释概念

【资源】
- 知识库中的详细说明
- 相关案例分析
- 练习题

花30分钟认真复习后，再重新挑战。
`;
    }

    getConceptTip(concept) {
        const tips = {
            'ltv': '理解为什么要乘以gross margin',
            'cac': '记住包含所有获客成本',
            'unit_economics': '核心是LTV > CAC × 3',
            'funnel_analysis': '拆解每一步，找瓶颈',
            'viral_coefficient': 'K > 1才能病毒增长'
        };

        return tips[concept] || '掌握核心定义和应用';
    }

    /**
     * 鼓励消息
     */
    getEncouragementMessage(context) {
        const { currentStreak, totalChallenges, masteredConcepts } = context;

        if (currentStreak >= 5) {
            return `
🔥 连续${currentStreak}关通过！

你的学习状态很好。
保持这个势头，你会很快成为增长黑客大师。

【当前进度】
- 已完成挑战：${totalChallenges}
- 已掌握概念：${masteredConcepts.length}

继续加油！
`;
        }

        if (masteredConcepts.length >= 10) {
            return `
🎯 已掌握${masteredConcepts.length}个概念

你的知识体系正在快速构建。
继续保持深度学习的态度。

记住：质量 > 数量
真正理解 > 快速通关
`;
        }

        return `
💪 继续努力！

每一个挑战都是成长的机会。
保持好奇心，保持严谨性。

增长黑客的道路需要耐心和坚持。
`;
    }

    /**
     * 最终评语（完成所有挑战）
     */
    getFinalEvaluation(performance) {
        const { totalScore, averageScore, masteredConcepts, badges } = performance;

        if (averageScore >= 90) {
            return `
🏆 恭喜！你已经成为增长黑客大师！

【最终成绩】
- 总分：${totalScore}
- 平均分：${averageScore}
- 掌握概念：${masteredConcepts.length}/50
- 获得徽章：${badges.length}

【评价】
你展现了：
✅ 扎实的数据分析能力
✅ 严密的逻辑思维
✅ 深刻的概念理解
✅ 创新的策略设计能力

你已经具备了顶尖增长黑客的素质。

【下一步】
去实战中应用这些知识吧！
理论+实践，才能成为真正的大师。

记住我教你的：
- 用数据说话
- 逻辑严密
- 快速实验
- 持续学习

祝你在增长黑客的道路上越走越远！
`;
        } else if (averageScore >= 75) {
            return `
🌟 很好！你已经掌握了增长黑客的核心知识！

【最终成绩】
- 平均分：${averageScore}
- 掌握概念：${masteredConcepts.length}/50

【评价】
你的基础很扎实，继续保持。

【建议】
1. 复习薄弱环节
2. 多看实际案例
3. 在实践中深化理解

继续加油！
`;
        } else {
            return `
✅ 完成了所有挑战！

【最终成绩】
- 平均分：${averageScore}

【建议】
你掌握了基础知识，但还需要加强：
1. 重点复习低分的知识点
2. 多做练习
3. 实际应用中学习

增长黑客是一个持续学习的过程。
继续努力！
`;
        }
    }
}

// Class available globally - no export needed for browser
// export { MentorDialogueTemplates };
