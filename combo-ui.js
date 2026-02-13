// Combo UI - Visual combo counter and streak display
// Combo UI - 连击计数器和连击显示

class ComboUI {
    constructor() {
        this.currentCombo = 0;
        this.maxCombo = 0;
        this.comboElement = null;
        this.hideTimeout = null;
        this.init();
    }

    /**
     * 初始化Combo UI
     */
    init() {
        // 创建Combo显示元素
        this.comboElement = document.createElement('div');
        this.comboElement.id = 'combo-display';
        this.comboElement.className = 'combo-card';
        this.comboElement.innerHTML = `
            <div class="combo-content">
                <div class="combo-icon">🔥</div>
                <div class="combo-text">
                    <div class="combo-label">COMBO</div>
                    <div class="combo-count">×<span class="combo-number">0</span></div>
                </div>
            </div>
        `;

        // 添加到页面右上角
        document.body.appendChild(this.comboElement);

        // 初始状态隐藏
        this.hide(true);
    }

    /**
     * 更新Combo显示
     * @param {number} combo - 当前连击数
     * @param {boolean} isCorrect - 是否答对
     */
    update(combo, isCorrect = true) {
        if (isCorrect) {
            this.currentCombo = combo;
            if (combo > this.maxCombo) {
                this.maxCombo = combo;
            }

            if (combo > 0) {
                this.show();
                this.animate();
                this.updateStyle();
            }

            // 清除隐藏计时器
            if (this.hideTimeout) {
                clearTimeout(this.hideTimeout);
            }

            // 5秒无操作后隐藏
            this.hideTimeout = setTimeout(() => {
                this.hide();
            }, 5000);

        } else {
            // 答错了，断连震动消失
            this.breakCombo();
        }
    }

    /**
     * 显示Combo UI
     */
    show() {
        this.comboElement.classList.remove('hidden');
        this.comboElement.classList.add('visible');

        // 更新数字
        const numberEl = this.comboElement.querySelector('.combo-number');
        this.animateNumber(numberEl, this.currentCombo);
    }

    /**
     * 隐藏Combo UI
     * @param {boolean} instant - 是否立即隐藏
     */
    hide(instant = false) {
        if (instant) {
            this.comboElement.classList.add('hidden');
            this.comboElement.classList.remove('visible');
        } else {
            this.comboElement.classList.add('hiding');
            setTimeout(() => {
                this.comboElement.classList.add('hidden');
                this.comboElement.classList.remove('visible', 'hiding');
            }, 300);
        }
    }

    /**
     * 断连动画
     */
    breakCombo() {
        // 震动动画
        this.comboElement.classList.add('combo-break');

        // 显示断连提示
        const breakText = document.createElement('div');
        breakText.className = 'combo-break-text';
        breakText.textContent = 'COMBO BREAK!';
        this.comboElement.appendChild(breakText);

        setTimeout(() => {
            this.comboElement.classList.remove('combo-break');
            breakText.remove();
            this.hide();
        }, 800);

        // 重置combo
        this.currentCombo = 0;
    }

    /**
     * 更新样式（根据combo等级）
     */
    updateStyle() {
        const iconEl = this.comboElement.querySelector('.combo-icon');
        const labelEl = this.comboElement.querySelector('.combo-label');

        // 移除所有等级类
        this.comboElement.classList.remove('level-1', 'level-2', 'level-3');

        if (this.currentCombo >= 5) {
            // 金色 - 传奇连击
            this.comboElement.classList.add('level-3');
            iconEl.textContent = '⚡';
            labelEl.textContent = 'LEGENDARY';
        } else if (this.currentCombo >= 3) {
            // 红色 - 火热连击
            this.comboElement.classList.add('level-2');
            iconEl.textContent = '🔥';
            labelEl.textContent = 'ON FIRE';
        } else {
            // 橙色 - 基础连击
            this.comboElement.classList.add('level-1');
            iconEl.textContent = '⚡';
            labelEl.textContent = 'COMBO';
        }
    }

    /**
     * 动画效果
     */
    animate() {
        // 移除旧动画类
        this.comboElement.classList.remove('pulse');

        // 强制重排以重启动画
        void this.comboElement.offsetWidth;

        // 添加脉冲动画
        this.comboElement.classList.add('pulse');
    }

    /**
     * 数字滚动动画
     * @param {HTMLElement} element - 数字元素
     * @param {number} targetValue - 目标值
     */
    animateNumber(element, targetValue) {
        const startValue = parseInt(element.textContent) || 0;
        const duration = 300;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // 使用easeOut缓动
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(startValue + (targetValue - startValue) * easeProgress);

            element.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    /**
     * 获取当前Combo
     */
    getCombo() {
        return this.currentCombo;
    }

    /**
     * 获取最大Combo
     */
    getMaxCombo() {
        return this.maxCombo;
    }

    /**
     * 重置
     */
    reset() {
        this.currentCombo = 0;
        this.hide(true);
    }
}

// CSS样式
const comboStyles = `
<style>
/* Combo卡片容器 */
.combo-card {
    position: fixed;
    top: 100px;
    right: 20px;
    background: linear-gradient(135deg, rgba(44, 24, 16, 0.95) 0%, rgba(26, 15, 10, 0.95) 100%);
    border: 3px solid #FFA500;
    border-radius: 15px;
    padding: 15px 25px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 165, 0, 0.3);
    z-index: 10000;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    transform-origin: top right;
}

.combo-card.hidden {
    opacity: 0;
    transform: scale(0.5) translateX(20px);
    pointer-events: none;
}

.combo-card.visible {
    opacity: 1;
    transform: scale(1) translateX(0);
}

.combo-card.hiding {
    opacity: 0;
    transform: scale(0.8) translateX(20px);
}

/* Combo内容 */
.combo-content {
    display: flex;
    align-items: center;
    gap: 15px;
}

.combo-icon {
    font-size: 40px;
    animation: iconFloat 2s ease-in-out infinite;
}

@keyframes iconFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
}

.combo-text {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.combo-label {
    font-size: 14px;
    font-weight: bold;
    color: #FFD700;
    letter-spacing: 2px;
    text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.combo-count {
    font-size: 32px;
    font-weight: bold;
    color: #FFFFFF;
    text-shadow: 0 0 15px rgba(255, 165, 0, 0.8);
    line-height: 1;
}

/* 连击等级样式 */
.combo-card.level-1 {
    border-color: #FFA500;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 165, 0, 0.4);
}

.combo-card.level-2 {
    border-color: #FF4500;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), 0 0 40px rgba(255, 69, 0, 0.6);
    animation: fireGlow 1s ease-in-out infinite;
}

.combo-card.level-3 {
    border-color: #FFD700;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), 0 0 50px rgba(255, 215, 0, 0.8);
    animation: legendaryGlow 1s ease-in-out infinite;
}

@keyframes fireGlow {
    0%, 100% {
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), 0 0 40px rgba(255, 69, 0, 0.6);
    }
    50% {
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), 0 0 60px rgba(255, 69, 0, 0.9);
    }
}

@keyframes legendaryGlow {
    0%, 100% {
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), 0 0 50px rgba(255, 215, 0, 0.8);
    }
    50% {
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), 0 0 70px rgba(255, 215, 0, 1);
    }
}

/* 脉冲动画 */
.combo-card.pulse {
    animation: comboPulse 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes comboPulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.15);
    }
    100% {
        transform: scale(1);
    }
}

/* 断连动画 */
.combo-card.combo-break {
    animation: comboBreak 0.8s ease-out;
    border-color: #FF4444;
}

@keyframes comboBreak {
    0% {
        transform: rotate(0deg) scale(1);
    }
    25% {
        transform: rotate(-5deg) scale(0.95);
    }
    50% {
        transform: rotate(5deg) scale(0.95);
    }
    75% {
        transform: rotate(-3deg) scale(0.9);
    }
    100% {
        transform: rotate(0deg) scale(0);
        opacity: 0;
    }
}

.combo-break-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
    font-weight: bold;
    color: #FF4444;
    text-shadow: 0 0 10px rgba(255, 68, 68, 0.8);
    white-space: nowrap;
    animation: breakTextFloat 0.8s ease-out;
    pointer-events: none;
}

@keyframes breakTextFloat {
    0% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.5);
    }
    50% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.2);
    }
    100% {
        opacity: 0;
        transform: translate(-50%, -150%) scale(0.8);
    }
}

/* 响应式 */
@media (max-width: 768px) {
    .combo-card {
        top: 80px;
        right: 10px;
        padding: 12px 20px;
    }

    .combo-icon {
        font-size: 32px;
    }

    .combo-label {
        font-size: 12px;
    }

    .combo-count {
        font-size: 28px;
    }
}
</style>
`;

// 导出
if (typeof window !== 'undefined') {
    window.ComboUI = ComboUI;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ComboUI;
}
