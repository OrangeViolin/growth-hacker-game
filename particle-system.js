// Particle System - Visual feedback for game actions
// 粒子系统 - 游戏动作的视觉反馈

class ParticleSystem {
    constructor() {
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        this.init();
    }

    /**
     * 初始化Canvas
     */
    init() {
        // 创建Canvas元素
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'particle-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9998;
        `;
        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.resize();

        // 监听窗口大小变化
        window.addEventListener('resize', () => this.resize());

        // 启动动画循环
        this.animate();
    }

    /**
     * 调整Canvas大小
     */
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    /**
     * 从按钮中心爆炸金色粒子
     * @param {HTMLElement} element - 触发元素
     * @param {Object} options - 配置选项
     */
    explodeFromButton(element, options = {}) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const defaults = {
            count: 50,
            color: '#FFD700',
            colors: ['#FFD700', '#FFA500', '#FF8C00', '#FFEC8B', '#FFE4B5'],
            size: { min: 3, max: 8 },
            speed: { min: 3, max: 12 },
            life: { min: 60, max: 120 },
            gravity: 0.3,
            friction: 0.98
        };

        const config = { ...defaults, ...options };

        // 创建粒子
        for (let i = 0; i < config.count; i++) {
            const angle = (Math.PI * 2 * i) / config.count + (Math.random() - 0.5) * 0.5;
            const speed = config.speed.min + Math.random() * (config.speed.max - config.speed.min);

            const particle = {
                x: centerX,
                y: centerY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: config.size.min + Math.random() * (config.size.max - config.size.min),
                color: config.colors[Math.floor(Math.random() * config.colors.length)],
                life: config.life.min + Math.random() * (config.life.max - config.life.min),
                maxLife: config.life.min + Math.random() * (config.life.max - config.life.min),
                gravity: config.gravity,
                friction: config.friction,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.2,
                alpha: 1
            };

            this.particles.push(particle);
        }
    }

    /**
     * 创建成功光晕效果
     * @param {HTMLElement} element - 目标元素
     */
    createSuccessGlow(element) {
        const rect = element.getBoundingClientRect();

        // 创建光晕元素
        const glow = document.createElement('div');
        glow.className = 'success-glow';
        glow.style.cssText = `
            position: fixed;
            left: ${rect.left}px;
            top: ${rect.top}px;
            width: ${rect.width}px;
            height: ${rect.height}px;
            border-radius: 12px;
            background: radial-gradient(circle, rgba(74, 255, 74, 0.4) 0%, rgba(74, 255, 74, 0) 70%);
            box-shadow: 0 0 30px rgba(74, 255, 74, 0.6), inset 0 0 20px rgba(74, 255, 74, 0.3);
            pointer-events: none;
            z-index: 9997;
            animation: glowPulse 0.6s ease-out forwards;
        `;
        document.body.appendChild(glow);

        // 添加边框闪光
        element.style.border = '2px solid #4AFF4A';
        element.style.boxShadow = '0 0 20px rgba(74, 255, 74, 0.6)';

        // 0.6秒后移除
        setTimeout(() => {
            glow.remove();
            element.style.border = '';
            element.style.boxShadow = '';
        }, 600);
    }

    /**
     * 创建失败震动效果（橙色）
     * @param {HTMLElement} element - 目标元素
     */
    createFailureShake(element) {
        // 添加橙色闪光
        const originalBorder = element.style.border;
        const originalBoxShadow = element.style.boxShadow;

        element.style.border = '2px solid #FF8844';
        element.style.boxShadow = '0 0 20px rgba(255, 136, 68, 0.6)';

        // 添加震动动画类
        element.classList.add('shake-animation');

        // 0.5秒后恢复
        setTimeout(() => {
            element.classList.remove('shake-animation');
            element.style.border = originalBorder;
            element.style.boxShadow = originalBoxShadow;
        }, 500);
    }

    /**
     * 创建组合技特效（更强烈的爆炸）
     * @param {HTMLElement} element - 触发元素
     * @param {number} comboLevel - 连击等级
     */
    createComboExplosion(element, comboLevel = 1) {
        // 基础粒子爆炸
        this.explodeFromButton(element, {
            count: 50 + (comboLevel * 20),
            colors: this.getComboColors(comboLevel),
            speed: { min: 5, max: 15 },
            size: { min: 4, max: 10 }
        });

        // 添加光圈扩散效果
        const rect = element.getBoundingClientRect();
        const ring = document.createElement('div');
        ring.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            border: 3px solid ${this.getComboColor(comboLevel)};
            pointer-events: none;
            z-index: 9997;
            transform: translate(-50%, -50%);
            animation: ringExpand 0.8s ease-out forwards;
            opacity: 0.8;
        `;
        document.body.appendChild(ring);

        setTimeout(() => ring.remove(), 800);
    }

    /**
     * 获取Combo颜色
     */
    getComboColor(level) {
        if (level >= 5) return '#FFD700'; // 金色
        if (level >= 3) return '#FF4500'; // 红色
        return '#FFA500'; // 橙色
    }

    /**
     * 获取Combo颜色数组
     */
    getComboColors(level) {
        if (level >= 5) {
            return ['#FFD700', '#FFA500', '#FFEC8B', '#FFE4B5', '#FFF8DC'];
        }
        if (level >= 3) {
            return ['#FF4500', '#FF6347', '#FF7F50', '#FFA500', '#FFB347'];
        }
        return ['#FFA500', '#FF8C00', '#FFD700', '#FFEC8B', '#FFE4B5'];
    }

    /**
     * 创建文字飘浮效果
     * @param {string} text - 文字内容
     * @param {number} x - X坐标
     * @param {number} y - Y坐标
     * @param {Object} options - 配置
     */
    createFloatingText(text, x, y, options = {}) {
        const defaults = {
            color: '#4AFF4A',
            fontSize: 24,
            duration: 1500,
            distance: 80
        };
        const config = { ...defaults, ...options };

        const textEl = document.createElement('div');
        textEl.textContent = text;
        textEl.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            color: ${config.color};
            font-size: ${config.fontSize}px;
            font-weight: bold;
            pointer-events: none;
            z-index: 9999;
            text-shadow: 0 0 10px rgba(0,0,0,0.5), 0 0 20px ${config.color};
            animation: floatUp ${config.duration}ms ease-out forwards;
            transform: translate(-50%, -50%);
        `;
        document.body.appendChild(textEl);

        setTimeout(() => textEl.remove(), config.duration);
    }

    /**
     * 动画循环
     */
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 更新和绘制所有粒子
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];

            // 更新物理
            p.vy += p.gravity;
            p.vx *= p.friction;
            p.vy *= p.friction;
            p.x += p.vx;
            p.y += p.vy;
            p.rotation += p.rotationSpeed;
            p.life--;

            // 计算透明度
            p.alpha = p.life / p.maxLife;

            // 移除死亡粒子
            if (p.life <= 0 || p.y > this.canvas.height) {
                this.particles.splice(i, 1);
                continue;
            }

            // 绘制粒子
            this.ctx.save();
            this.ctx.globalAlpha = p.alpha;
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rotation);

            // 绘制圆形粒子
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(0, 0, p.size, 0, Math.PI * 2);
            this.ctx.fill();

            // 添加光晕效果
            const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 2);
            gradient.addColorStop(0, p.color + '40');
            gradient.addColorStop(1, p.color + '00');
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(0, 0, p.size * 2, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.restore();
        }

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    /**
     * 清空所有粒子
     */
    clear() {
        this.particles = [];
    }

    /**
     * 销毁粒子系统
     */
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        this.particles = [];
    }
}

// CSS动画样式（需要添加到页面中）
const particleStyles = `
<style>
@keyframes glowPulse {
    0% {
        opacity: 0;
        transform: scale(0.8);
    }
    50% {
        opacity: 1;
        transform: scale(1.1);
    }
    100% {
        opacity: 0;
        transform: scale(1.3);
    }
}

@keyframes ringExpand {
    0% {
        width: 0;
        height: 0;
        opacity: 0.8;
    }
    100% {
        width: 200px;
        height: 200px;
        opacity: 0;
    }
}

@keyframes floatUp {
    0% {
        opacity: 0;
        transform: translate(-50%, -50%) translateY(0) scale(0.5);
    }
    20% {
        opacity: 1;
        transform: translate(-50%, -50%) translateY(-20px) scale(1.2);
    }
    100% {
        opacity: 0;
        transform: translate(-50%, -50%) translateY(-80px) scale(0.8);
    }
}

.shake-animation {
    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes shake {
    10%, 90% {
        transform: translate3d(-2px, 0, 0);
    }
    20%, 80% {
        transform: translate3d(4px, 0, 0);
    }
    30%, 50%, 70% {
        transform: translate3d(-6px, 0, 0);
    }
    40%, 60% {
        transform: translate3d(6px, 0, 0);
    }
}
</style>
`;

// 导出
if (typeof window !== 'undefined') {
    window.ParticleSystem = ParticleSystem;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ParticleSystem;
}
