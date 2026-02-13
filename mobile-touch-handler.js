/**
 * ============================================
 * 移动端触摸交互处理器
 * Mobile Touch Interaction Handler
 * ============================================
 */

class MobileTouchHandler {
    constructor() {
        this.isTouch = 'ontouchstart' in window;
        this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        this.isAndroid = /Android/.test(navigator.userAgent);

        this.init();
    }

    /**
     * 初始化触摸处理器
     */
    init() {
        this.setupTouchFeedback();
        this.setupRippleEffect();
        this.setupHapticFeedback();
        this.setupSwipeGestures();
        this.setupToastNotifications();
        this.preventDefaultBehaviors();
        this.optimizeScrolling();
        this.setupDoubleTapPrevention();

        console.log('✅ Mobile Touch Handler Initialized');
    }

    /**
     * 1. 触摸反馈效果
     * Touch Feedback Effects
     */
    setupTouchFeedback() {
        const touchElements = document.querySelectorAll(
            '.btn, button, .option, .suggestion-btn, .skill-item, .nav-links a'
        );

        touchElements.forEach(element => {
            // 触摸开始
            element.addEventListener('touchstart', (e) => {
                element.classList.add('touch-active');
                this.triggerHaptic('light');
            }, { passive: true });

            // 触摸结束
            element.addEventListener('touchend', () => {
                setTimeout(() => {
                    element.classList.remove('touch-active');
                }, 150);
            }, { passive: true });

            // 触摸取消（手指移出元素）
            element.addEventListener('touchcancel', () => {
                element.classList.remove('touch-active');
            }, { passive: true });
        });
    }

    /**
     * 2. 涟漪效果
     * Ripple Effect (Material Design)
     */
    setupRippleEffect() {
        const rippleElements = document.querySelectorAll(
            '.btn-primary, .option, .suggestion-btn'
        );

        rippleElements.forEach(element => {
            element.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = element.getBoundingClientRect();

                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple-effect');

                element.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            });
        });

        // 添加涟漪CSS
        this.injectRippleCSS();
    }

    /**
     * 注入涟漪效果CSS
     */
    injectRippleCSS() {
        if (document.getElementById('ripple-styles')) return;

        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            .touch-active {
                opacity: 0.8;
                transform: scale(0.98);
            }

            .ripple-effect {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple-animation 0.6s ease-out;
                pointer-events: none;
            }

            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }

            /* 长按效果 */
            .long-press-active {
                animation: long-press-pulse 0.5s ease-in-out infinite;
            }

            @keyframes long-press-pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * 3. 振动反馈 (Haptic Feedback)
     * iOS和Android支持
     */
    triggerHaptic(type = 'light') {
        if (!this.isTouch) return;

        // iOS Haptic Engine
        if (this.isIOS && window.navigator.vibrate) {
            const patterns = {
                light: 10,
                medium: 20,
                heavy: 30,
                success: [10, 50, 10],
                error: [20, 50, 20, 50, 20],
                warning: [15, 50, 15]
            };
            window.navigator.vibrate(patterns[type] || 10);
        }
        // Android Vibration API
        else if (this.isAndroid && window.navigator.vibrate) {
            const patterns = {
                light: 10,
                medium: 25,
                heavy: 40,
                success: [10, 30, 10],
                error: [20, 40, 20, 40, 20],
                warning: [15, 40, 15]
            };
            window.navigator.vibrate(patterns[type] || 10);
        }
    }

    setupHapticFeedback() {
        // 成功操作的振动反馈
        document.addEventListener('success', () => {
            this.triggerHaptic('success');
        });

        // 错误操作的振动反馈
        document.addEventListener('error', () => {
            this.triggerHaptic('error');
        });
    }

    /**
     * 4. 滑动手势支持
     * Swipe Gesture Support
     */
    setupSwipeGestures() {
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;

        const swipeableElements = document.querySelectorAll(
            '.swipeable, .message, .option'
        );

        swipeableElements.forEach(element => {
            element.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                touchStartY = e.changedTouches[0].screenY;
            }, { passive: true });

            element.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                touchEndY = e.changedTouches[0].screenY;
                this.handleSwipe(element, touchStartX, touchStartY, touchEndX, touchEndY);
            }, { passive: true });
        });
    }

    /**
     * 处理滑动逻辑
     */
    handleSwipe(element, startX, startY, endX, endY) {
        const diffX = endX - startX;
        const diffY = endY - startY;
        const threshold = 50; // 最小滑动距离

        // 水平滑动
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                // 向右滑动
                element.dispatchEvent(new CustomEvent('swiperight'));
                this.triggerHaptic('light');
            } else {
                // 向左滑动
                element.dispatchEvent(new CustomEvent('swipeleft'));
                this.triggerHaptic('light');
            }
        }
        // 垂直滑动
        else if (Math.abs(diffY) > threshold) {
            if (diffY > 0) {
                // 向下滑动
                element.dispatchEvent(new CustomEvent('swipedown'));
            } else {
                // 向上滑动
                element.dispatchEvent(new CustomEvent('swipeup'));
            }
        }
    }

    /**
     * 5. Toast通知系统
     * Toast Notification System
     */
    setupToastNotifications() {
        window.showToast = (message, type = 'info', duration = 3000) => {
            const toast = document.createElement('div');
            toast.className = `mobile-toast mobile-toast-${type}`;
            toast.textContent = message;

            // 样式
            Object.assign(toast.style, {
                position: 'fixed',
                bottom: '80px',
                left: '50%',
                transform: 'translateX(-50%) translateY(100px)',
                padding: '16px 24px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                zIndex: '10000',
                maxWidth: '90%',
                textAlign: 'center',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                minHeight: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            });

            // 颜色
            const colors = {
                success: { bg: '#4CAF50', color: 'white' },
                error: { bg: '#F44336', color: 'white' },
                warning: { bg: '#FF9800', color: 'white' },
                info: { bg: '#2196F3', color: 'white' }
            };

            const { bg, color } = colors[type] || colors.info;
            toast.style.backgroundColor = bg;
            toast.style.color = color;

            document.body.appendChild(toast);

            // 动画显示
            setTimeout(() => {
                toast.style.transform = 'translateX(-50%) translateY(0)';
            }, 10);

            // 振动反馈
            this.triggerHaptic(type === 'success' ? 'success' : type === 'error' ? 'error' : 'light');

            // 自动隐藏
            setTimeout(() => {
                toast.style.transform = 'translateX(-50%) translateY(100px)';
                toast.style.opacity = '0';
                setTimeout(() => toast.remove(), 300);
            }, duration);

            // 点击关闭
            toast.addEventListener('click', () => {
                toast.style.transform = 'translateX(-50%) translateY(100px)';
                toast.style.opacity = '0';
                setTimeout(() => toast.remove(), 300);
            });
        };
    }

    /**
     * 6. 防止默认行为
     * Prevent Default Behaviors
     */
    preventDefaultBehaviors() {
        // 防止双击缩放
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (e) => {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, { passive: false });

        // 防止长按选择文本（仅按钮）
        const noSelectElements = document.querySelectorAll(
            '.btn, button, .option, .suggestion-btn'
        );
        noSelectElements.forEach(el => {
            el.addEventListener('touchstart', (e) => {
                e.preventDefault();
            }, { passive: false });
        });

        // 防止下拉刷新（仅在非滚动容器）
        const preventPullRefresh = document.querySelector('body');
        let startY = 0;
        preventPullRefresh.addEventListener('touchstart', (e) => {
            startY = e.touches[0].pageY;
        }, { passive: true });

        preventPullRefresh.addEventListener('touchmove', (e) => {
            const y = e.touches[0].pageY;
            if (window.scrollY === 0 && y > startY) {
                // 在顶部下拉时防止默认行为
                // e.preventDefault(); // 按需启用
            }
        }, { passive: true });
    }

    /**
     * 7. 优化滚动性能
     * Optimize Scrolling Performance
     */
    optimizeScrolling() {
        const scrollContainers = document.querySelectorAll(
            '.conversation-history, .status-panel, .content'
        );

        scrollContainers.forEach(container => {
            // 添加平滑滚动
            container.style.scrollBehavior = 'smooth';
            container.style.webkitOverflowScrolling = 'touch';

            // 滚动到底部时的反馈
            container.addEventListener('scroll', () => {
                const isBottom = container.scrollHeight - container.scrollTop === container.clientHeight;
                if (isBottom) {
                    this.triggerHaptic('light');
                }
            }, { passive: true });
        });
    }

    /**
     * 8. 防止双击
     * Prevent Double Tap
     */
    setupDoubleTapPrevention() {
        const buttons = document.querySelectorAll('.btn, button');

        buttons.forEach(button => {
            let processing = false;

            button.addEventListener('click', (e) => {
                if (processing) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }

                processing = true;
                setTimeout(() => {
                    processing = false;
                }, 500); // 500ms 内防止重复点击
            });
        });
    }

    /**
     * 9. 长按操作支持
     * Long Press Support
     */
    setupLongPress(element, callback, duration = 500) {
        let timer = null;

        element.addEventListener('touchstart', (e) => {
            element.classList.add('long-press-active');

            timer = setTimeout(() => {
                element.classList.remove('long-press-active');
                this.triggerHaptic('heavy');
                callback(e);
            }, duration);
        }, { passive: true });

        element.addEventListener('touchend', () => {
            clearTimeout(timer);
            element.classList.remove('long-press-active');
        }, { passive: true });

        element.addEventListener('touchmove', () => {
            clearTimeout(timer);
            element.classList.remove('long-press-active');
        }, { passive: true });
    }

    /**
     * 10. 检测网络状态
     * Network Status Detection
     */
    setupNetworkMonitoring() {
        window.addEventListener('online', () => {
            showToast('网络已连接 ✓', 'success', 2000);
        });

        window.addEventListener('offline', () => {
            showToast('网络已断开 ✗', 'error', 3000);
        });
    }

    /**
     * 11. 性能监控
     * Performance Monitoring
     */
    monitorPerformance() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.duration > 100) {
                        console.warn('⚠️ Slow interaction detected:', entry.name, entry.duration + 'ms');
                    }
                }
            });

            observer.observe({ entryTypes: ['measure', 'navigation'] });
        }
    }

    /**
     * 12. 添加加载状态
     * Add Loading State
     */
    static setButtonLoading(button, loading = true) {
        if (loading) {
            button.disabled = true;
            button.classList.add('loading');
            button.dataset.originalText = button.textContent;
            button.innerHTML = `
                <span class="spinner"></span>
                <span>${button.dataset.loadingText || '加载中...'}</span>
            `;
        } else {
            button.disabled = false;
            button.classList.remove('loading');
            button.textContent = button.dataset.originalText || button.textContent;
        }
    }

    /**
     * 13. 优化表单输入
     * Optimize Form Input
     */
    optimizeFormInputs() {
        const inputs = document.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            // 自动聚焦时滚动到可见区域
            input.addEventListener('focus', () => {
                setTimeout(() => {
                    input.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 300); // 等待虚拟键盘弹出
            });

            // 输入完成后隐藏键盘
            if (input.type === 'search') {
                input.addEventListener('search', () => {
                    input.blur();
                });
            }
        });
    }

    /**
     * 14. 添加触摸工具提示
     * Touch Tooltips
     */
    static showTooltip(element, message, duration = 2000) {
        const tooltip = document.createElement('div');
        tooltip.className = 'touch-tooltip';
        tooltip.textContent = message;

        const rect = element.getBoundingClientRect();
        tooltip.style.position = 'fixed';
        tooltip.style.top = (rect.top - 40) + 'px';
        tooltip.style.left = (rect.left + rect.width / 2) + 'px';
        tooltip.style.transform = 'translateX(-50%)';
        tooltip.style.padding = '8px 12px';
        tooltip.style.background = 'rgba(0,0,0,0.8)';
        tooltip.style.color = 'white';
        tooltip.style.borderRadius = '8px';
        tooltip.style.fontSize = '14px';
        tooltip.style.zIndex = '10001';
        tooltip.style.pointerEvents = 'none';

        document.body.appendChild(tooltip);

        setTimeout(() => {
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateX(-50%) translateY(-10px)';
            setTimeout(() => tooltip.remove(), 300);
        }, duration);
    }
}

/**
 * ============================================
 * 辅助工具函数
 * Utility Functions
 * ============================================
 */

/**
 * 检测是否为移动设备
 */
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * 获取设备像素比
 */
function getDevicePixelRatio() {
    return window.devicePixelRatio || 1;
}

/**
 * 检测是否支持触摸
 */
function supportsTouchEvents() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * 平滑滚动到元素
 */
function smoothScrollToElement(element, offset = 0) {
    const top = element.getBoundingClientRect().top + window.pageYOffset + offset;
    window.scrollTo({
        top: top,
        behavior: 'smooth'
    });
}

/**
 * 节流函数
 */
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * 防抖函数
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * ============================================
 * 自动初始化
 * Auto Initialize
 * ============================================
 */

// 页面加载完成后自动初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (isMobileDevice() || supportsTouchEvents()) {
            window.mobileTouchHandler = new MobileTouchHandler();
        }
    });
} else {
    if (isMobileDevice() || supportsTouchEvents()) {
        window.mobileTouchHandler = new MobileTouchHandler();
    }
}

// 导出到全局
window.MobileTouchHandler = MobileTouchHandler;
window.isMobileDevice = isMobileDevice;
window.supportsTouchEvents = supportsTouchEvents;
window.smoothScrollToElement = smoothScrollToElement;
