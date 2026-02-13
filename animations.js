// Growth Hacker Game - Animation System
// 增长黑客游戏 - 动画系统

class GameAnimations {
    constructor() {
        this.isAnimating = false;
        this.particlePool = [];
        this.maxParticles = 100;
    }

    // ============================================
    // 1. 数字计数动画系统 (CountUp Animation)
    // ============================================

    /**
     * 数字从旧值平滑过渡到新值
     * @param {HTMLElement} element - 目标元素
     * @param {number} start - 起始值
     * @param {number} end - 结束值
     * @param {number} duration - 动画持续时间(ms)
     * @param {function} formatter - 数字格式化函数
     */
    countUp(element, start, end, duration = 1000, formatter = null) {
        const startTime = performance.now();
        const difference = end - start;

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // 使用 easeOutExpo 缓动函数
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const currentValue = start + (difference * easeProgress);

            // 格式化显示
            if (formatter) {
                element.textContent = formatter(currentValue);
            } else {
                element.textContent = Math.floor(currentValue).toLocaleString();
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    /**
     * 批量更新指标并带动画
     * @param {Array} metrics - 指标数组 [{element, oldValue, newValue, formatter}, ...]
     */
    animateMetrics(metrics) {
        metrics.forEach(metric => {
            const { element, oldValue, newValue, formatter, suffix } = metric;

            // 添加脉冲效果
            element.parentElement.classList.add('metric-updating');

            this.countUp(element, oldValue, newValue, 1200, (value) => {
                const formatted = formatter ? formatter(value) : Math.floor(value).toLocaleString();
                return suffix ? formatted + suffix : formatted;
            });

            // 移除脉冲效果
            setTimeout(() => {
                element.parentElement.classList.remove('metric-updating');
            }, 1200);
        });
    }

    // ============================================
    // 2. 里程碑粒子效果系统 (Milestone Particles)
    // ============================================

    /**
     * 检查并触发里程碑动画
     * @param {number} oldValue - 旧值
     * @param {number} newValue - 新值
     * @param {string} metricType - 指标类型 ('users', 'revenue', etc.)
     */
    checkMilestone(oldValue, newValue, metricType) {
        const milestones = {
            users: [1000, 5000, 10000, 50000, 100000],
            revenue: [10000, 50000, 100000, 500000, 1000000]
        };

        const relevantMilestones = milestones[metricType] || [];

        relevantMilestones.forEach(milestone => {
            if (oldValue < milestone && newValue >= milestone) {
                this.triggerMilestoneAnimation(milestone, metricType);
            }
        });
    }

    /**
     * 触发里程碑动画（彩带+粒子）
     */
    triggerMilestoneAnimation(milestone, metricType) {
        // 屏幕震动
        this.screenShake();

        // 彩带动画
        this.confettiExplosion();

        // 显示里程碑提示
        this.showMilestoneToast(milestone, metricType);

        // 播放音效（如果需要）
        this.playSound('milestone');
    }

    /**
     * 彩带爆炸效果
     */
    confettiExplosion() {
        const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a'];
        const particleCount = 60;
        const container = document.body;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'confetti-particle';
            particle.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: 50%;
                top: 50%;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                pointer-events: none;
                z-index: 9999;
            `;

            container.appendChild(particle);

            // 随机方向和速度
            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = 5 + Math.random() * 10;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;

            this.animateParticle(particle, vx, vy);
        }
    }

    /**
     * 粒子运动动画
     */
    animateParticle(particle, vx, vy) {
        let x = 0, y = 0;
        let opacity = 1;
        let rotation = 0;
        const gravity = 0.5;
        const friction = 0.98;

        const animate = () => {
            vy += gravity;
            vx *= friction;

            x += vx;
            y += vy;
            opacity -= 0.015;
            rotation += 10;

            particle.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
            particle.style.opacity = opacity;

            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };

        requestAnimationFrame(animate);
    }

    /**
     * 显示里程碑提示
     */
    showMilestoneToast(milestone, metricType) {
        const toast = document.createElement('div');
        toast.className = 'milestone-toast';

        const labels = {
            users: '用户',
            revenue: '收入'
        };

        toast.innerHTML = `
            <div class="milestone-icon">🎉</div>
            <div class="milestone-text">
                <strong>里程碑达成！</strong><br>
                ${labels[metricType] || metricType} 突破 ${milestone.toLocaleString()}
            </div>
        `;

        document.body.appendChild(toast);

        // 动画入场
        setTimeout(() => toast.classList.add('show'), 10);

        // 3秒后移除
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ============================================
    // 3. 指标条脉冲动画 (Metric Pulse)
    // ============================================

    /**
     * 为低指标添加警告脉冲
     * @param {HTMLElement} element - 指标元素
     * @param {string} type - 警告类型 ('danger', 'warning', 'success')
     */
    addMetricPulse(element, type = 'danger') {
        element.classList.add(`metric-pulse-${type}`);
    }

    /**
     * 移除脉冲效果
     */
    removeMetricPulse(element) {
        element.classList.remove('metric-pulse-danger', 'metric-pulse-warning', 'metric-pulse-success');
    }

    /**
     * 检查并更新所有指标脉冲状态
     */
    updateMetricPulses(gameState) {
        const metrics = [
            { key: 'budget', element: document.querySelector('[data-metric="budget"]'), thresholds: { danger: 1000, warning: 3000 } },
            { key: 'retention7d', element: document.querySelector('[data-metric="retention"]'), thresholds: { danger: 15, warning: 25 } },
            { key: 'nps', element: document.querySelector('[data-metric="nps"]'), thresholds: { danger: 0, warning: 20 } }
        ];

        metrics.forEach(({ key, element, thresholds }) => {
            if (!element) return;

            const value = gameState[key];

            if (value <= thresholds.danger) {
                this.addMetricPulse(element.closest('.metric-card'), 'danger');
            } else if (value <= thresholds.warning) {
                this.addMetricPulse(element.closest('.metric-card'), 'warning');
            } else {
                this.removeMetricPulse(element.closest('.metric-card'));
            }
        });
    }

    // ============================================
    // 4. 决策卡片动画 (Decision Card Animations)
    // ============================================

    /**
     * 卡片翻转效果
     * @param {HTMLElement} card - 卡片元素
     */
    flipCard(card) {
        card.classList.add('card-flipping');

        setTimeout(() => {
            card.classList.remove('card-flipping');
        }, 600);
    }

    /**
     * 卡片滑动选择交互
     * @param {HTMLElement} card - 卡片元素
     * @param {function} onSwipeLeft - 左滑回调
     * @param {function} onSwipeRight - 右滑回调
     */
    enableCardSwipe(card, onSwipeLeft, onSwipeRight) {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        const handleStart = (e) => {
            isDragging = true;
            startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            card.classList.add('card-dragging');
        };

        const handleMove = (e) => {
            if (!isDragging) return;

            currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            const diff = currentX - startX;

            // 限制拖动范围
            const maxDrag = 150;
            const limitedDiff = Math.max(-maxDrag, Math.min(maxDrag, diff));

            card.style.transform = `translateX(${limitedDiff}px) rotate(${limitedDiff * 0.1}deg)`;

            // 添加视觉反馈
            if (diff > 50) {
                card.classList.add('swipe-right-hint');
                card.classList.remove('swipe-left-hint');
            } else if (diff < -50) {
                card.classList.add('swipe-left-hint');
                card.classList.remove('swipe-right-hint');
            } else {
                card.classList.remove('swipe-right-hint', 'swipe-left-hint');
            }
        };

        const handleEnd = () => {
            if (!isDragging) return;

            const diff = currentX - startX;
            card.classList.remove('card-dragging', 'swipe-right-hint', 'swipe-left-hint');

            // 判断滑动方向
            if (diff > 100) {
                // 右滑
                this.animateCardExit(card, 'right', onSwipeRight);
            } else if (diff < -100) {
                // 左滑
                this.animateCardExit(card, 'left', onSwipeLeft);
            } else {
                // 回弹
                card.style.transform = '';
            }

            isDragging = false;
        };

        // 添加事件监听
        card.addEventListener('mousedown', handleStart);
        card.addEventListener('touchstart', handleStart);
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('touchmove', handleMove);
        document.addEventListener('mouseup', handleEnd);
        document.addEventListener('touchend', handleEnd);

        // 返回清理函数
        return () => {
            card.removeEventListener('mousedown', handleStart);
            card.removeEventListener('touchstart', handleStart);
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('touchmove', handleMove);
            document.removeEventListener('mouseup', handleEnd);
            document.removeEventListener('touchend', handleEnd);
        };
    }

    /**
     * 卡片退出动画
     */
    animateCardExit(card, direction, callback) {
        const distance = direction === 'right' ? 1000 : -1000;
        card.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.transform = `translateX(${distance}px) rotate(${distance * 0.05}deg)`;

        setTimeout(() => {
            if (callback) callback();
            card.style.transition = '';
            card.style.transform = '';
        }, 400);
    }

    /**
     * 卡片选中视觉反馈
     */
    highlightCard(card) {
        card.classList.add('card-selected');

        // 创建光环效果
        const glow = document.createElement('div');
        glow.className = 'card-glow';
        card.appendChild(glow);

        setTimeout(() => {
            glow.classList.add('active');
        }, 10);
    }

    /**
     * 移除卡片高亮
     */
    unhighlightCard(card) {
        card.classList.remove('card-selected');
        const glow = card.querySelector('.card-glow');
        if (glow) glow.remove();
    }

    // ============================================
    // 5. 成就弹窗系统 (Achievement System)
    // ============================================

    /**
     * 显示成就解锁动画
     * @param {Object} achievement - 成就对象 {title, description, icon, rarity}
     */
    showAchievement(achievement) {
        // 屏幕震动
        this.screenShake(200);

        // 创建成就弹窗
        const popup = document.createElement('div');
        popup.className = `achievement-unlock-popup rarity-${achievement.rarity || 'common'}`;
        popup.innerHTML = `
            <div class="achievement-glow"></div>
            <div class="achievement-content">
                <div class="achievement-badge">
                    <div class="achievement-icon">${achievement.icon || '🏆'}</div>
                    <div class="achievement-rays"></div>
                </div>
                <div class="achievement-text">
                    <div class="achievement-label">成就解锁 Achievement Unlocked</div>
                    <h3 class="achievement-title">${achievement.title}</h3>
                    <p class="achievement-description">${achievement.description}</p>
                </div>
            </div>
            <div class="achievement-actions">
                <button class="btn-share" onclick="gameAnimations.shareAchievement(${JSON.stringify(achievement).replace(/"/g, '&quot;')})">
                    分享 Share
                </button>
                <button class="btn-continue" onclick="gameAnimations.closeAchievement()">
                    继续 Continue
                </button>
            </div>
        `;

        document.body.appendChild(popup);

        // 添加遮罩
        const overlay = document.createElement('div');
        overlay.className = 'achievement-overlay';
        overlay.onclick = () => this.closeAchievement();
        document.body.appendChild(overlay);

        // 触发动画
        setTimeout(() => {
            popup.classList.add('show');
            overlay.classList.add('show');
        }, 10);

        // 粒子效果
        this.achievementParticles(popup);

        // 音效
        this.playSound('achievement');

        // 保存引用以便关闭
        this.currentAchievementPopup = popup;
        this.currentAchievementOverlay = overlay;
    }

    /**
     * 成就粒子效果
     */
    achievementParticles(container) {
        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'achievement-particle';

            const size = 4 + Math.random() * 8;
            const hue = Math.random() * 60 + 30; // 金色系

            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: hsl(${hue}, 100%, 60%);
                border-radius: 50%;
                top: 50%;
                left: 50%;
                pointer-events: none;
            `;

            container.appendChild(particle);

            // 动画
            const angle = (Math.PI * 2 * i) / particleCount;
            const distance = 100 + Math.random() * 100;
            const duration = 1000 + Math.random() * 500;

            particle.animate([
                {
                    transform: 'translate(-50%, -50%) scale(0)',
                    opacity: 1
                },
                {
                    transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(1)`,
                    opacity: 0
                }
            ], {
                duration,
                easing: 'cubic-bezier(0, 0.5, 0.5, 1)'
            }).onfinish = () => particle.remove();
        }
    }

    /**
     * 关闭成就弹窗
     */
    closeAchievement() {
        if (this.currentAchievementPopup) {
            this.currentAchievementPopup.classList.remove('show');
            this.currentAchievementOverlay.classList.remove('show');

            setTimeout(() => {
                if (this.currentAchievementPopup) this.currentAchievementPopup.remove();
                if (this.currentAchievementOverlay) this.currentAchievementOverlay.remove();
                this.currentAchievementPopup = null;
                this.currentAchievementOverlay = null;
            }, 300);
        }
    }

    /**
     * 分享成就
     */
    shareAchievement(achievement) {
        // 生成成就卡片图片
        const card = this.generateAchievementCard(achievement);

        // 使用 Web Share API 或复制到剪贴板
        if (navigator.share) {
            navigator.share({
                title: `成就解锁: ${achievement.title}`,
                text: achievement.description,
                url: window.location.href
            }).catch(err => console.log('分享取消', err));
        } else {
            // 复制链接
            navigator.clipboard.writeText(`我解锁了成就: ${achievement.title} - ${achievement.description}`);
            this.showToast('成就已复制到剪贴板！');
        }
    }

    /**
     * 生成可分享的成就卡片
     */
    generateAchievementCard(achievement) {
        const canvas = document.createElement('canvas');
        canvas.width = 600;
        canvas.height = 400;
        const ctx = canvas.getContext('2d');

        // 绘制背景渐变
        const gradient = ctx.createLinearGradient(0, 0, 600, 400);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 600, 400);

        // 绘制成就图标（简化版）
        ctx.font = 'bold 80px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(achievement.icon || '🏆', 300, 150);

        // 绘制文字
        ctx.fillStyle = 'white';
        ctx.font = 'bold 32px Arial';
        ctx.fillText(achievement.title, 300, 250);

        ctx.font = '20px Arial';
        ctx.fillText(achievement.description, 300, 300);

        return canvas;
    }

    // ============================================
    // 6. 公司成长可视化 (Company Growth Visual)
    // ============================================

    /**
     * 初始化办公室场景
     */
    initOfficeScene() {
        const container = document.createElement('div');
        container.id = 'office-scene';
        container.className = 'office-scene garage';
        container.innerHTML = `
            <div class="office-background"></div>
            <div class="office-items"></div>
            <div class="office-label">车库办公 Garage</div>
        `;

        return container;
    }

    /**
     * 根据用户数更新办公室级别
     * @param {number} users - 当前用户数
     */
    updateOfficeLevel(users) {
        const officeScene = document.getElementById('office-scene');
        if (!officeScene) return;

        const levels = [
            { threshold: 0, class: 'garage', label: '车库办公 Garage' },
            { threshold: 5000, class: 'small-office', label: '小办公室 Small Office' },
            { threshold: 20000, class: 'medium-office', label: '中型办公室 Medium Office' },
            { threshold: 100000, class: 'startup-hq', label: '创业总部 Startup HQ' }
        ];

        let newLevel = levels[0];
        for (const level of levels) {
            if (users >= level.threshold) {
                newLevel = level;
            }
        }

        // 检查是否需要升级
        if (!officeScene.classList.contains(newLevel.class)) {
            this.transitionOffice(officeScene, newLevel);
        }
    }

    /**
     * 办公室升级过渡动画
     */
    transitionOffice(container, newLevel) {
        // 淡出当前场景
        container.classList.add('transitioning');

        setTimeout(() => {
            // 移除所有办公室类
            container.className = 'office-scene';
            container.classList.add(newLevel.class);

            // 更新标签
            const label = container.querySelector('.office-label');
            if (label) {
                label.textContent = newLevel.label;
            }

            // 淡入新场景
            setTimeout(() => {
                container.classList.remove('transitioning');

                // 显示升级提示
                this.showToast(`🎉 办公室升级: ${newLevel.label}`, 'success');
            }, 50);
        }, 500);
    }

    // ============================================
    // 7. 辅助功能 (Helper Functions)
    // ============================================

    /**
     * 屏幕震动效果
     */
    screenShake(duration = 300) {
        const container = document.querySelector('.container');
        if (!container) return;

        container.classList.add('screen-shake');

        setTimeout(() => {
            container.classList.remove('screen-shake');
        }, duration);
    }

    /**
     * 显示提示消息
     */
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;

        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 10);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    /**
     * 播放音效
     */
    playSound(type) {
        // 如果有音频文件，可以在这里播放
        // 这里仅作为占位符
        if (window.audioEnabled) {
            // const audio = new Audio(`/sounds/${type}.mp3`);
            // audio.play().catch(err => console.log('音频播放失败', err));
        }
    }

    /**
     * 进度条动画
     */
    animateProgressBar(element, targetPercent, duration = 1000) {
        const start = parseFloat(element.style.width) || 0;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOut

            const currentPercent = start + (targetPercent - start) * easeProgress;
            element.style.width = `${currentPercent}%`;

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    /**
     * 涟漪效果（点击反馈）
     */
    createRipple(event, element) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';

        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: scale(0);
            pointer-events: none;
        `;

        element.appendChild(ripple);

        ripple.animate([
            { transform: 'scale(0)', opacity: 1 },
            { transform: 'scale(2)', opacity: 0 }
        ], {
            duration: 600,
            easing: 'ease-out'
        }).onfinish = () => ripple.remove();
    }
}

// 创建全局实例
const gameAnimations = new GameAnimations();

// 导出（如果使用模块系统）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GameAnimations;
}
