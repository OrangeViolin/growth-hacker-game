/**
 * 资源系统 - Resource Management System
 * 管理5种核心资源：现金、时间、精力、信任、声誉
 */

class ResourceSystem {
    constructor() {
        // 5种核心资源定义
        this.resources = {
            cash: {
                name: '现金',
                icon: '💰',
                value: 10000,          // 当前值
                max: 100000,           // 上限
                min: 0,                // 下限
                critical: 2000,        // 临界值（低于此值触发警告）
                color: '#4AFF4A',      // 显示颜色
                unit: '$',             // 单位
                description: '维持公司运营的基础，低于临界值可能导致资金链断裂'
            },
            time: {
                name: '时间',
                icon: '⏰',
                value: 180,            // 180分钟 = 3小时
                max: 180,
                min: 0,
                critical: 30,          // 30分钟临界
                color: '#FF8844',
                unit: '分钟',
                description: '完成任务的剩余时间，时间耗尽即任务失败'
            },
            energy: {
                name: '精力',
                icon: '⚡',
                value: 100,            // 满精力
                max: 100,
                min: 0,
                critical: 20,          // 20%临界
                color: '#FFD700',
                unit: '%',
                description: '个人精力值，过低会影响决策质量和工作效率'
            },
            trust: {
                name: '信任',
                icon: '🤝',
                value: 80,             // 初始信任度
                max: 100,
                min: 0,
                critical: 30,          // 30%临界
                color: '#A855F7',
                unit: '%',
                description: '团队和投资人对你的信任，低于临界值可能导致合作关系破裂'
            },
            reputation: {
                name: '声誉',
                icon: '⭐',
                value: 60,             // 初始声誉
                max: 100,
                min: 0,
                critical: 25,          // 25%临界
                color: '#60A5FA',
                unit: '%',
                description: '行业内的声誉值，影响未来机会和合作可能性'
            }
        };

        // 资源变化历史
        this.history = [];

        // 资源回调监听器
        this.listeners = {
            onChange: [],      // 资源变化时
            onCritical: [],    // 达到临界值时
            onEmpty: [],       // 资源耗尽时
            onMax: []          // 资源达到上限时
        };
    }

    /**
     * 获取资源信息
     */
    getResource(type) {
        return this.resources[type];
    }

    /**
     * 获取所有资源
     */
    getAllResources() {
        return this.resources;
    }

    /**
     * 消耗资源
     * @param {string} type - 资源类型
     * @param {number} amount - 消耗数量
     * @param {string} reason - 消耗原因
     * @returns {boolean} 是否成功消耗
     */
    consume(type, amount, reason = '未知操作') {
        const resource = this.resources[type];

        if (!resource) {
            console.error(`Resource type "${type}" not found`);
            return false;
        }

        // 检查是否有足够资源
        if (resource.value < amount) {
            this.triggerEvent('onEmpty', {
                type,
                required: amount,
                current: resource.value,
                reason
            });
            return false;
        }

        // 记录消耗前的值
        const oldValue = resource.value;

        // 执行消耗
        resource.value = Math.max(resource.min, resource.value - amount);

        // 记录历史
        this.recordHistory(type, oldValue, resource.value, -amount, reason);

        // 触发事件
        this.checkAndTriggerEvents(type, oldValue, resource.value);

        return true;
    }

    /**
     * 增加资源
     * @param {string} type - 资源类型
     * @param {number} amount - 增加数量
     * @param {string} reason - 增加原因
     * @returns {boolean} 是否成功增加
     */
    gain(type, amount, reason = '未知来源') {
        const resource = this.resources[type];

        if (!resource) {
            console.error(`Resource type "${type}" not found`);
            return false;
        }

        // 记录增加前的值
        const oldValue = resource.value;

        // 执行增加（不超过上限）
        resource.value = Math.min(resource.max, resource.value + amount);

        // 记录历史
        this.recordHistory(type, oldValue, resource.value, amount, reason);

        // 触发事件
        this.checkAndTriggerEvents(type, oldValue, resource.value);

        return true;
    }

    /**
     * 设置资源值
     * @param {string} type - 资源类型
     * @param {number} value - 新值
     * @param {string} reason - 设置原因
     */
    set(type, value, reason = '系统设置') {
        const resource = this.resources[type];

        if (!resource) {
            console.error(`Resource type "${type}" not found`);
            return false;
        }

        const oldValue = resource.value;
        resource.value = Math.max(resource.min, Math.min(resource.max, value));

        this.recordHistory(type, oldValue, resource.value, resource.value - oldValue, reason);
        this.checkAndTriggerEvents(type, oldValue, resource.value);

        return true;
    }

    /**
     * 检查资源是否充足
     * @param {Object} costs - 资源消耗对象 {cash: 1000, time: 30, ...}
     * @returns {Object} {canAfford: boolean, insufficient: []}
     */
    canAfford(costs) {
        const insufficient = [];

        for (const [type, amount] of Object.entries(costs)) {
            const resource = this.resources[type];
            if (!resource || resource.value < amount) {
                insufficient.push({
                    type,
                    required: amount,
                    current: resource ? resource.value : 0,
                    missing: amount - (resource ? resource.value : 0)
                });
            }
        }

        return {
            canAfford: insufficient.length === 0,
            insufficient
        };
    }

    /**
     * 批量消耗资源
     * @param {Object} costs - 资源消耗对象
     * @param {string} reason - 消耗原因
     * @returns {boolean} 是否成功
     */
    consumeMultiple(costs, reason = '综合操作') {
        // 先检查是否全部充足
        const check = this.canAfford(costs);
        if (!check.canAfford) {
            return false;
        }

        // 执行消耗
        for (const [type, amount] of Object.entries(costs)) {
            this.consume(type, amount, reason);
        }

        return true;
    }

    /**
     * 检查资源状态
     * @param {string} type - 资源类型
     * @returns {string} 'normal' | 'critical' | 'empty'
     */
    getStatus(type) {
        const resource = this.resources[type];
        if (!resource) return 'unknown';

        if (resource.value <= resource.min) return 'empty';
        if (resource.value <= resource.critical) return 'critical';
        return 'normal';
    }

    /**
     * 获取资源百分比
     * @param {string} type - 资源类型
     * @returns {number} 0-100
     */
    getPercentage(type) {
        const resource = this.resources[type];
        if (!resource) return 0;

        return Math.round((resource.value / resource.max) * 100);
    }

    /**
     * 记录资源变化历史
     */
    recordHistory(type, oldValue, newValue, change, reason) {
        this.history.push({
            timestamp: Date.now(),
            type,
            oldValue,
            newValue,
            change,
            reason
        });

        // 只保留最近100条历史
        if (this.history.length > 100) {
            this.history.shift();
        }
    }

    /**
     * 检查并触发事件
     */
    checkAndTriggerEvents(type, oldValue, newValue) {
        const resource = this.resources[type];

        // 资源变化事件
        this.triggerEvent('onChange', {
            type,
            oldValue,
            newValue,
            change: newValue - oldValue,
            resource
        });

        // 达到临界值
        if (oldValue > resource.critical && newValue <= resource.critical) {
            this.triggerEvent('onCritical', {
                type,
                value: newValue,
                critical: resource.critical,
                resource
            });
        }

        // 资源耗尽
        if (oldValue > resource.min && newValue <= resource.min) {
            this.triggerEvent('onEmpty', {
                type,
                resource
            });
        }

        // 资源满值
        if (oldValue < resource.max && newValue >= resource.max) {
            this.triggerEvent('onMax', {
                type,
                resource
            });
        }
    }

    /**
     * 添加事件监听器
     * @param {string} event - 事件类型
     * @param {Function} callback - 回调函数
     */
    on(event, callback) {
        if (this.listeners[event]) {
            this.listeners[event].push(callback);
        }
    }

    /**
     * 移除事件监听器
     */
    off(event, callback) {
        if (this.listeners[event]) {
            this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
        }
    }

    /**
     * 触发事件
     */
    triggerEvent(event, data) {
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
     * 自动恢复机制（例如每分钟恢复精力）
     * @param {string} type - 资源类型
     * @param {number} amount - 恢复数量
     * @param {number} interval - 恢复间隔（毫秒）
     */
    startAutoRecovery(type, amount, interval) {
        return setInterval(() => {
            this.gain(type, amount, '自动恢复');
        }, interval);
    }

    /**
     * 获取资源历史
     * @param {string} type - 可选，指定资源类型
     * @param {number} limit - 可选，限制返回数量
     */
    getHistory(type = null, limit = 10) {
        let history = this.history;

        if (type) {
            history = history.filter(h => h.type === type);
        }

        return history.slice(-limit);
    }

    /**
     * 重置所有资源
     */
    reset() {
        this.resources.cash.value = 10000;
        this.resources.time.value = 180;
        this.resources.energy.value = 100;
        this.resources.trust.value = 80;
        this.resources.reputation.value = 60;
        this.history = [];
    }

    /**
     * 导出资源状态（用于存档）
     */
    export() {
        return {
            resources: Object.entries(this.resources).reduce((acc, [key, res]) => {
                acc[key] = { value: res.value };
                return acc;
            }, {}),
            history: this.history.slice(-20)
        };
    }

    /**
     * 导入资源状态（用于读档）
     */
    import(data) {
        if (data.resources) {
            Object.entries(data.resources).forEach(([key, res]) => {
                if (this.resources[key]) {
                    this.resources[key].value = res.value;
                }
            });
        }
        if (data.history) {
            this.history = data.history;
        }
    }
}

// 资源UI渲染器
class ResourceUI {
    constructor(resourceSystem, containerId) {
        this.system = resourceSystem;
        this.container = document.getElementById(containerId);

        if (!this.container) {
            console.error(`Container "${containerId}" not found`);
            return;
        }

        this.render();
        this.bindEvents();
    }

    /**
     * 渲染资源条UI
     */
    render() {
        const resources = this.system.getAllResources();

        const html = `
            <div class="resource-panel">
                <div class="resource-title">📊 资源状态</div>
                <div class="resource-bars" id="resource-bars">
                    ${Object.entries(resources).map(([key, res]) => `
                        <div class="resource-item" data-resource="${key}">
                            <div class="resource-header">
                                <span class="resource-label">
                                    ${res.icon} ${res.name}
                                </span>
                                <span class="resource-value" id="${key}-value">
                                    ${this.formatValue(key, res.value)}
                                </span>
                            </div>
                            <div class="resource-bar-container">
                                <div class="resource-bar"
                                     id="${key}-bar"
                                     style="width: ${this.system.getPercentage(key)}%;
                                            background-color: ${res.color};">
                                </div>
                            </div>
                            <div class="resource-hint">${res.description}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        this.container.innerHTML = html;
    }

    /**
     * 格式化资源值显示
     */
    formatValue(type, value) {
        const resource = this.system.getResource(type);

        if (type === 'cash') {
            return `$${value.toLocaleString()}`;
        } else if (type === 'time') {
            const hours = Math.floor(value / 60);
            const minutes = value % 60;
            return `${hours}:${minutes.toString().padStart(2, '0')}`;
        } else {
            return `${value}${resource.unit}`;
        }
    }

    /**
     * 更新单个资源显示
     */
    updateResource(type) {
        const resource = this.system.getResource(type);
        const valueElement = document.getElementById(`${type}-value`);
        const barElement = document.getElementById(`${type}-bar`);
        const itemElement = document.querySelector(`[data-resource="${type}"]`);

        if (valueElement) {
            valueElement.textContent = this.formatValue(type, resource.value);
        }

        if (barElement) {
            const percentage = this.system.getPercentage(type);
            barElement.style.width = `${percentage}%`;

            // 添加动画效果
            barElement.classList.add('resource-change');
            setTimeout(() => barElement.classList.remove('resource-change'), 300);
        }

        if (itemElement) {
            // 移除之前的状态类
            itemElement.classList.remove('critical', 'empty', 'normal');

            // 添加当前状态类
            const status = this.system.getStatus(type);
            itemElement.classList.add(status);
        }
    }

    /**
     * 绑定事件监听
     */
    bindEvents() {
        // 监听资源变化
        this.system.on('onChange', (data) => {
            this.updateResource(data.type);
        });

        // 监听临界状态
        this.system.on('onCritical', (data) => {
            this.showWarning(data);
        });

        // 监听资源耗尽
        this.system.on('onEmpty', (data) => {
            this.showDanger(data);
        });
    }

    /**
     * 显示警告
     */
    showWarning(data) {
        const resource = data.resource;
        console.warn(`⚠️ ${resource.name}已达到临界值！`);

        // 可以在这里添加更多视觉反馈
        const itemElement = document.querySelector(`[data-resource="${data.type}"]`);
        if (itemElement) {
            itemElement.classList.add('warning-flash');
            setTimeout(() => itemElement.classList.remove('warning-flash'), 1000);
        }
    }

    /**
     * 显示危险状态
     */
    showDanger(data) {
        const resource = data.resource;
        console.error(`🚨 ${resource.name}已耗尽！`);

        // 可以在这里触发游戏失败或其他机制
        const itemElement = document.querySelector(`[data-resource="${data.type}"]`);
        if (itemElement) {
            itemElement.classList.add('danger-flash');
        }
    }
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ResourceSystem, ResourceUI };
}
