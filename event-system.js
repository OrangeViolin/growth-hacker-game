/**
 * 随机事件系统 - Random Event System
 * 实现3类事件：机会、危机、里程碑
 * 每周30%触发概率
 */

class EventSystem {
    constructor(resourceSystem) {
        this.resourceSystem = resourceSystem;

        // 事件类型
        this.eventTypes = {
            OPPORTUNITY: 'opportunity',    // 机会事件（正面）
            CRISIS: 'crisis',              // 危机事件（负面）
            MILESTONE: 'milestone'         // 里程碑事件（中性/重大）
        };

        // 事件库
        this.events = this.initializeEvents();

        // 事件历史
        this.history = [];

        // 事件触发概率
        this.triggerProbability = 0.3; // 30%

        // 当前激活的事件
        this.activeEvent = null;

        // 事件监听器
        this.listeners = {
            onEventTrigger: [],
            onEventComplete: [],
            onChoiceMade: []
        };
    }

    /**
     * 初始化事件库
     */
    initializeEvents() {
        return [
            // 机会事件
            {
                id: 'opportunity_1',
                type: this.eventTypes.OPPORTUNITY,
                title: '🎯 天使投资人关注',
                description: '一位天使投资人在Twitter上看到了你的产品，对你的增长数据很感兴趣，想约时间深入聊聊。',
                context: '他的投资风格偏好数据驱动的团队，最近刚退出一个SaaS项目赚了20倍。',
                icon: '💰',
                rarity: 'rare',
                triggerCondition: (resources) => {
                    // 声誉>60才能触发
                    return resources.reputation.value > 60;
                },
                choices: [
                    {
                        id: 'accept',
                        text: '立即约见面（投入时间准备BP）',
                        cost: { time: 45, energy: 20 },
                        outcome: {
                            success: {
                                text: '你用数据打动了投资人！他承诺投资$50,000，并介绍了3个行业资源给你。',
                                effects: {
                                    cash: 50000,
                                    reputation: 15,
                                    trust: 10
                                }
                            },
                            fail: {
                                text: '准备不充分，投资人对你的商业模式提出质疑，最后没有下文。',
                                effects: {
                                    reputation: -5,
                                    energy: -10
                                }
                            }
                        },
                        successRate: 0.7
                    },
                    {
                        id: 'delay',
                        text: '婉拒（现在不是融资时机）',
                        cost: {},
                        outcome: {
                            success: {
                                text: '你专注于产品打磨，虽然错过了这次机会，但保持了节奏。',
                                effects: {
                                    energy: 10
                                }
                            }
                        },
                        successRate: 1.0
                    },
                    {
                        id: 'team',
                        text: '让团队准备材料（节省自己时间）',
                        cost: { time: 20, trust: 10 },
                        outcome: {
                            success: {
                                text: '团队做了出色的BP，投资人决定小额投资$20,000测试。',
                                effects: {
                                    cash: 20000,
                                    trust: 5,
                                    reputation: 10
                                }
                            },
                            fail: {
                                text: '团队准备的材料不够专业，投资人失去了兴趣。',
                                effects: {
                                    trust: -15,
                                    reputation: -8
                                }
                            }
                        },
                        successRate: 0.5
                    }
                ]
            },

            // 危机事件
            {
                id: 'crisis_1',
                type: this.eventTypes.CRISIS,
                title: '⚠️ 核心员工要离职',
                description: '你的首席技术官(CTO)突然来找你谈话，他收到了大厂的offer，薪资是现在的2倍。',
                context: '他是团队的技术支柱，如果离开，至少需要3个月找到合适的替代者。公司现在正处于产品迭代关键期。',
                icon: '💔',
                rarity: 'common',
                triggerCondition: (resources) => {
                    return resources.trust.value < 70;
                },
                choices: [
                    {
                        id: 'raise',
                        text: '加薪挽留（涨薪50%）',
                        cost: { cash: 5000, trust: 5 },
                        outcome: {
                            success: {
                                text: '他决定留下，并表示会更加努力。团队士气得到提升。',
                                effects: {
                                    trust: 20,
                                    energy: 10
                                }
                            },
                            fail: {
                                text: '他还是选择离开，你的加薪反而让其他人产生攀比心理。',
                                effects: {
                                    trust: -15,
                                    energy: -20
                                }
                            }
                        },
                        successRate: 0.6
                    },
                    {
                        id: 'equity',
                        text: '给期权（用未来换现在）',
                        cost: { time: 30, energy: 15 },
                        outcome: {
                            success: {
                                text: '你用期权和愿景说服了他。他选择相信公司的未来，继续留任。',
                                effects: {
                                    trust: 25,
                                    reputation: 5
                                }
                            }
                        },
                        successRate: 0.75
                    },
                    {
                        id: 'let_go',
                        text: '祝福他离开（尊重选择）',
                        cost: { trust: 20 },
                        outcome: {
                            success: {
                                text: '他很感激你的理解，承诺会做好交接，并推荐了一位优秀的候选人。',
                                effects: {
                                    reputation: 10,
                                    time: -60
                                }
                            }
                        },
                        successRate: 1.0
                    }
                ]
            },

            // 里程碑事件
            {
                id: 'milestone_1',
                type: this.eventTypes.MILESTONE,
                title: '🎉 用户突破10,000',
                description: '产品用户数突破1万大关！这是一个重要的里程碑，但也面临新的挑战。',
                context: '服务器成本开始显著上升，客服压力增大，需要决定如何应对这个增长阶段。',
                icon: '🚀',
                rarity: 'epic',
                triggerCondition: (resources) => {
                    return true; // 里程碑可以在任何时候触发
                },
                choices: [
                    {
                        id: 'scale',
                        text: '立即扩容（升级基础设施）',
                        cost: { cash: 8000, time: 40 },
                        outcome: {
                            success: {
                                text: '系统平稳升级，用户体验优秀，口碑传播加速，新增2000用户！',
                                effects: {
                                    reputation: 20,
                                    trust: 10
                                }
                            }
                        },
                        successRate: 1.0
                    },
                    {
                        id: 'optimize',
                        text: '优化代码（暂时不扩容）',
                        cost: { time: 60, energy: 30 },
                        outcome: {
                            success: {
                                text: '通过代码优化降低了30%成本，为公司节省了大笔开支。',
                                effects: {
                                    cash: 5000,
                                    trust: 15,
                                    energy: -10
                                }
                            },
                            fail: {
                                text: '优化效果有限，用户开始抱怨系统慢，部分用户流失。',
                                effects: {
                                    reputation: -15,
                                    trust: -10,
                                    energy: -20
                                }
                            }
                        },
                        successRate: 0.6
                    },
                    {
                        id: 'celebrate',
                        text: '先庆祝（提升团队士气）',
                        cost: { cash: 2000, time: 30 },
                        outcome: {
                            success: {
                                text: '团队聚餐庆祝，大家干劲十足，有人主动加班优化了系统。',
                                effects: {
                                    trust: 25,
                                    energy: 20,
                                    reputation: 5
                                }
                            }
                        },
                        successRate: 1.0
                    }
                ]
            },

            // 机会事件2
            {
                id: 'opportunity_2',
                type: this.eventTypes.OPPORTUNITY,
                title: '📰 媒体采访邀请',
                description: 'TechCrunch记者想采访你，报道你的增长故事。这是一次绝佳的曝光机会。',
                context: '如果采访内容被报道，可能会带来大量流量和关注，但也需要准备充分，避免说错话。',
                icon: '📺',
                rarity: 'uncommon',
                triggerCondition: (resources) => {
                    return resources.reputation.value > 50;
                },
                choices: [
                    {
                        id: 'accept_interview',
                        text: '接受采访（精心准备）',
                        cost: { time: 50, energy: 25 },
                        outcome: {
                            success: {
                                text: '采访很成功！文章发布后，网站流量暴增300%，声誉大幅提升！',
                                effects: {
                                    reputation: 30,
                                    trust: 10
                                }
                            },
                            fail: {
                                text: '你在采访中说漏嘴提到竞争对手，引发了公关危机。',
                                effects: {
                                    reputation: -20,
                                    trust: -15,
                                    energy: -20
                                }
                            }
                        },
                        successRate: 0.7
                    },
                    {
                        id: 'decline',
                        text: '婉拒（保持低调）',
                        cost: {},
                        outcome: {
                            success: {
                                text: '你选择继续专注产品，虽然错过曝光，但保持了稳健节奏。',
                                effects: {
                                    energy: 10
                                }
                            }
                        },
                        successRate: 1.0
                    }
                ]
            },

            // 危机事件2
            {
                id: 'crisis_2',
                type: this.eventTypes.CRISIS,
                title: '🐛 严重Bug被发现',
                description: '用户在社交媒体上爆料，产品存在数据泄露风险，已经有小范围传播。',
                context: '虽然实际上只是一个小bug，但用户的恐慌情绪正在蔓延。需要立即应对。',
                icon: '🚨',
                rarity: 'common',
                triggerCondition: (resources) => {
                    return resources.energy.value < 50; // 疲劳容易出bug
                },
                choices: [
                    {
                        id: 'emergency_fix',
                        text: '紧急修复（团队通宵）',
                        cost: { time: 90, energy: 40, cash: 3000 },
                        outcome: {
                            success: {
                                text: '6小时内修复完成！你发布公告说明情况，用户赞扬响应速度。',
                                effects: {
                                    reputation: 15,
                                    trust: 20
                                }
                            }
                        },
                        successRate: 1.0
                    },
                    {
                        id: 'investigate',
                        text: '先调查（评估影响）',
                        cost: { time: 45, energy: 15 },
                        outcome: {
                            success: {
                                text: '调查显示问题被夸大了，你发布澄清公告，化解了危机。',
                                effects: {
                                    reputation: 10,
                                    trust: 5
                                }
                            },
                            fail: {
                                text: '调查时间太长，用户恐慌加剧，部分用户卸载产品。',
                                effects: {
                                    reputation: -25,
                                    trust: -20,
                                    cash: -5000
                                }
                            }
                        },
                        successRate: 0.6
                    },
                    {
                        id: 'ignore',
                        text: '暂时忽略（等待热度降低）',
                        cost: {},
                        outcome: {
                            success: {
                                text: '热度很快过去，你专注于产品迭代，没有被节奏打乱。',
                                effects: {
                                    energy: 10
                                }
                            },
                            fail: {
                                text: '问题持续发酵，媒体开始关注，声誉受到严重损害。',
                                effects: {
                                    reputation: -35,
                                    trust: -30,
                                    cash: -8000
                                }
                            }
                        },
                        successRate: 0.3
                    }
                ]
            }
        ];
    }

    /**
     * 尝试触发事件
     * @returns {Object|null} 触发的事件或null
     */
    tryTriggerEvent() {
        // 检查概率
        if (Math.random() > this.triggerProbability) {
            return null;
        }

        // 获取可触发的事件
        const availableEvents = this.getAvailableEvents();

        if (availableEvents.length === 0) {
            return null;
        }

        // 根据稀有度加权随机选择
        const selectedEvent = this.selectEventByRarity(availableEvents);

        // 设置为激活事件
        this.activeEvent = JSON.parse(JSON.stringify(selectedEvent)); // 深拷贝

        // 触发事件监听器
        this.triggerListener('onEventTrigger', this.activeEvent);

        return this.activeEvent;
    }

    /**
     * 获取可用事件列表
     */
    getAvailableEvents() {
        const resources = this.resourceSystem.getAllResources();

        return this.events.filter(event => {
            // 检查触发条件
            if (event.triggerCondition && !event.triggerCondition(resources)) {
                return false;
            }

            // 避免重复触发（最近5个事件）
            const recentEvents = this.history.slice(-5);
            if (recentEvents.some(h => h.eventId === event.id)) {
                return false;
            }

            return true;
        });
    }

    /**
     * 根据稀有度选择事件
     */
    selectEventByRarity(events) {
        const rarityWeights = {
            common: 50,
            uncommon: 30,
            rare: 15,
            epic: 5
        };

        // 构建权重数组
        const weightedEvents = [];
        events.forEach(event => {
            const weight = rarityWeights[event.rarity] || 30;
            for (let i = 0; i < weight; i++) {
                weightedEvents.push(event);
            }
        });

        // 随机选择
        return weightedEvents[Math.floor(Math.random() * weightedEvents.length)];
    }

    /**
     * 玩家做出选择
     * @param {string} choiceId - 选择的ID
     * @returns {Object} 选择结果
     */
    makeChoice(choiceId) {
        if (!this.activeEvent) {
            console.error('No active event');
            return null;
        }

        const choice = this.activeEvent.choices.find(c => c.id === choiceId);

        if (!choice) {
            console.error('Choice not found:', choiceId);
            return null;
        }

        // 检查资源是否足够
        const affordCheck = this.resourceSystem.canAfford(choice.cost);
        if (!affordCheck.canAfford) {
            return {
                success: false,
                message: '资源不足',
                insufficient: affordCheck.insufficient
            };
        }

        // 消耗资源
        this.resourceSystem.consumeMultiple(choice.cost, `事件选择: ${this.activeEvent.title}`);

        // 判断成功/失败
        const isSuccess = Math.random() < choice.successRate;
        const outcome = isSuccess ? choice.outcome.success : (choice.outcome.fail || choice.outcome.success);

        // 应用效果
        if (outcome.effects) {
            Object.entries(outcome.effects).forEach(([resource, amount]) => {
                if (amount > 0) {
                    this.resourceSystem.gain(resource, amount, `事件结果: ${this.activeEvent.title}`);
                } else if (amount < 0) {
                    this.resourceSystem.consume(resource, Math.abs(amount), `事件结果: ${this.activeEvent.title}`);
                }
            });
        }

        // 记录历史
        this.recordEventHistory(this.activeEvent, choice, isSuccess, outcome);

        // 触发监听器
        this.triggerListener('onChoiceMade', {
            event: this.activeEvent,
            choice,
            isSuccess,
            outcome
        });

        // 清除激活事件
        const completedEvent = this.activeEvent;
        this.activeEvent = null;

        // 触发完成监听器
        this.triggerListener('onEventComplete', {
            event: completedEvent,
            choice,
            isSuccess,
            outcome
        });

        return {
            success: isSuccess,
            outcome,
            event: completedEvent
        };
    }

    /**
     * 记录事件历史
     */
    recordEventHistory(event, choice, isSuccess, outcome) {
        this.history.push({
            timestamp: Date.now(),
            eventId: event.id,
            eventTitle: event.title,
            eventType: event.type,
            choiceId: choice.id,
            choiceText: choice.text,
            isSuccess,
            outcomeText: outcome.text,
            effects: outcome.effects
        });

        // 只保留最近50个事件
        if (this.history.length > 50) {
            this.history.shift();
        }
    }

    /**
     * 获取当前激活的事件
     */
    getActiveEvent() {
        return this.activeEvent;
    }

    /**
     * 获取事件历史
     */
    getHistory(limit = 10) {
        return this.history.slice(-limit);
    }

    /**
     * 添加自定义事件
     */
    addEvent(event) {
        // 验证事件格式
        if (!event.id || !event.type || !event.title || !event.choices) {
            console.error('Invalid event format');
            return false;
        }

        this.events.push(event);
        return true;
    }

    /**
     * 添加事件监听器
     */
    on(event, callback) {
        if (this.listeners[event]) {
            this.listeners[event].push(callback);
        }
    }

    /**
     * 触发监听器
     */
    triggerListener(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in ${event} listener:`, error);
                }
            });
        }
    }

    /**
     * 设置触发概率
     */
    setTriggerProbability(probability) {
        this.triggerProbability = Math.max(0, Math.min(1, probability));
    }

    /**
     * 重置系统
     */
    reset() {
        this.activeEvent = null;
        this.history = [];
    }

    /**
     * 导出状态
     */
    export() {
        return {
            history: this.history.slice(-20),
            activeEvent: this.activeEvent
        };
    }

    /**
     * 导入状态
     */
    import(data) {
        if (data.history) {
            this.history = data.history;
        }
        if (data.activeEvent) {
            this.activeEvent = data.activeEvent;
        }
    }
}

// 事件UI管理器
class EventUI {
    constructor(eventSystem, overlayId) {
        this.system = eventSystem;
        this.overlayId = overlayId;

        this.bindEvents();
    }

    /**
     * 显示事件弹窗
     */
    show(event) {
        const overlay = this.createOverlay(event);
        document.body.appendChild(overlay);

        // 动画显示
        setTimeout(() => {
            overlay.classList.add('show');
        }, 10);
    }

    /**
     * 创建事件弹窗
     */
    createOverlay(event) {
        const overlay = document.createElement('div');
        overlay.className = 'event-overlay';
        overlay.id = this.overlayId;

        const typeInfo = this.getTypeInfo(event.type);

        overlay.innerHTML = `
            <div class="event-modal">
                <div class="event-header ${event.type}">
                    <div class="event-icon">${event.icon}</div>
                    <div class="event-type-badge">${typeInfo.badge}</div>
                    <div class="event-title">${event.title}</div>
                </div>
                <div class="event-body">
                    <div class="event-description">${event.description}</div>
                    <div class="event-context">
                        <strong>背景：</strong>${event.context}
                    </div>
                    <div class="event-choices">
                        <div class="choices-title">你的选择：</div>
                        ${event.choices.map((choice, index) => `
                            <div class="event-choice" data-choice-id="${choice.id}">
                                <div class="choice-header">
                                    <span class="choice-label">${String.fromCharCode(65 + index)}.</span>
                                    <span class="choice-text">${choice.text}</span>
                                </div>
                                ${this.renderChoiceCost(choice.cost)}
                                <div class="choice-success-rate">
                                    成功率: ${Math.round(choice.successRate * 100)}%
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        // 绑定选择事件
        overlay.querySelectorAll('.event-choice').forEach(choiceEl => {
            choiceEl.addEventListener('click', () => {
                const choiceId = choiceEl.dataset.choiceId;
                this.handleChoice(choiceId, overlay);
            });
        });

        return overlay;
    }

    /**
     * 渲染选择消耗
     */
    renderChoiceCost(cost) {
        if (Object.keys(cost).length === 0) {
            return '<div class="choice-cost">无消耗</div>';
        }

        const costItems = Object.entries(cost).map(([resource, amount]) => {
            const res = this.system.resourceSystem.getResource(resource);
            return `${res.icon} ${amount}${res.unit}`;
        }).join(' | ');

        return `<div class="choice-cost">消耗: ${costItems}</div>`;
    }

    /**
     * 获取事件类型信息
     */
    getTypeInfo(type) {
        const typeMap = {
            opportunity: { badge: '机会', color: '#4AFF4A' },
            crisis: { badge: '危机', color: '#FF4444' },
            milestone: { badge: '里程碑', color: '#FFD700' }
        };

        return typeMap[type] || typeMap.opportunity;
    }

    /**
     * 处理选择
     */
    handleChoice(choiceId, overlay) {
        const result = this.system.makeChoice(choiceId);

        if (!result || !result.success) {
            // 显示资源不足提示
            this.showInsufficientResources(result.insufficient);
            return;
        }

        // 显示结果
        this.showOutcome(result, overlay);
    }

    /**
     * 显示结果
     */
    showOutcome(result, overlay) {
        const outcomeDiv = document.createElement('div');
        outcomeDiv.className = `event-outcome ${result.success ? 'success' : 'fail'}`;

        outcomeDiv.innerHTML = `
            <div class="outcome-icon">${result.success ? '✅' : '❌'}</div>
            <div class="outcome-title">${result.success ? '成功！' : '失败...'}</div>
            <div class="outcome-text">${result.outcome.text}</div>
            <button class="outcome-close">明白了</button>
        `;

        overlay.querySelector('.event-modal').appendChild(outcomeDiv);

        // 关闭按钮
        outcomeDiv.querySelector('.outcome-close').addEventListener('click', () => {
            this.close(overlay);
        });
    }

    /**
     * 显示资源不足
     */
    showInsufficientResources(insufficient) {
        if (!insufficient || insufficient.length === 0) return;

        const messages = insufficient.map(item => {
            const res = this.system.resourceSystem.getResource(item.type);
            return `${res.name}不足（需要${item.required}，当前${item.current}）`;
        }).join('\n');

        alert('资源不足！\n\n' + messages);
    }

    /**
     * 关闭弹窗
     */
    close(overlay) {
        overlay.classList.remove('show');
        setTimeout(() => {
            overlay.remove();
        }, 300);
    }

    /**
     * 绑定系统事件
     */
    bindEvents() {
        // 监听事件触发
        this.system.on('onEventTrigger', (event) => {
            this.show(event);
        });
    }
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EventSystem, EventUI };
}
