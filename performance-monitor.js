/**
 * 性能监控系统 | Performance Monitoring System
 * 增长黑客游戏 - Growth Hacker Game
 *
 * 功能:
 * - FPS监控
 * - 内存使用监控
 * - 网络性能监控
 * - 自动降级策略
 * - 性能报告生成
 */

class PerformanceMonitor {
    constructor(options = {}) {
        this.options = {
            enableFPSMonitor: true,
            enableMemoryMonitor: true,
            enableNetworkMonitor: true,
            fpsThreshold: 30,           // FPS低于30触发低性能模式
            memoryThreshold: 100,       // 内存超过100MB触发警告
            logToConsole: true,         // 是否输出到控制台
            showDebugPanel: false,      // 是否显示调试面板
            autoOptimize: true,         // 是否自动优化
            ...options
        };

        this.metrics = {
            fps: 60,
            memory: 0,
            loadTime: 0,
            firstPaint: 0,
            firstContentfulPaint: 0,
            domContentLoaded: 0,
            networkRequests: 0,
            failedRequests: 0
        };

        this.isLowPerformanceMode = false;
        this.frameCount = 0;
        this.lastTime = performance.now();
        this.lastSecond = Date.now();

        this.init();
    }

    /**
     * 初始化监控系统
     */
    init() {
        this.log('🚀 性能监控系统启动');

        // 检测设备性能
        this.detectDeviceCapabilities();

        // 监控FPS
        if (this.options.enableFPSMonitor) {
            this.startFPSMonitoring();
        }

        // 监控内存
        if (this.options.enableMemoryMonitor && performance.memory) {
            this.startMemoryMonitoring();
        }

        // 监控网络性能
        if (this.options.enableNetworkMonitor) {
            this.monitorNetworkPerformance();
        }

        // 监控页面加载性能
        this.monitorPageLoad();

        // 创建调试面板
        if (this.options.showDebugPanel) {
            this.createDebugPanel();
        }

        // 监听性能观察
        this.observePerformance();

        this.log('✅ 性能监控初始化完成');
    }

    /**
     * 检测设备性能
     */
    detectDeviceCapabilities() {
        const capabilities = {
            isMobile: this.isMobile(),
            isLowEnd: this.isLowEndDevice(),
            cpuCores: navigator.hardwareConcurrency || 'unknown',
            connection: this.getConnectionInfo(),
            deviceMemory: navigator.deviceMemory || 'unknown',
            maxTouchPoints: navigator.maxTouchPoints || 0
        };

        this.deviceCapabilities = capabilities;

        this.log('📱 设备信息:', capabilities);

        // 如果是低端设备，自动启用低性能模式
        if (capabilities.isLowEnd && this.options.autoOptimize) {
            this.log('⚠️ 检测到低端设备，启用性能优化模式');
            this.enableLowPerformanceMode();
        }

        return capabilities;
    }

    /**
     * 判断是否移动设备
     */
    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    /**
     * 判断是否低端设备
     */
    isLowEndDevice() {
        // 检查CPU核心数
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
            return true;
        }

        // 检查设备内存
        if (navigator.deviceMemory && navigator.deviceMemory < 4) {
            return true;
        }

        // 检查网络连接
        const connection = this.getConnectionInfo();
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            return true;
        }

        return false;
    }

    /**
     * 获取网络连接信息
     */
    getConnectionInfo() {
        const connection = navigator.connection ||
                          navigator.mozConnection ||
                          navigator.webkitConnection;

        if (!connection) {
            return { effectiveType: 'unknown', downlink: 'unknown' };
        }

        return {
            effectiveType: connection.effectiveType || 'unknown',
            downlink: connection.downlink || 'unknown',
            rtt: connection.rtt || 'unknown',
            saveData: connection.saveData || false
        };
    }

    /**
     * 开始FPS监控
     */
    startFPSMonitoring() {
        const measureFPS = () => {
            const now = performance.now();
            this.frameCount++;

            // 每秒更新一次FPS
            if (now >= this.lastTime + 1000) {
                this.metrics.fps = Math.round((this.frameCount * 1000) / (now - this.lastTime));
                this.frameCount = 0;
                this.lastTime = now;

                // 检查是否需要降级
                if (this.metrics.fps < this.options.fpsThreshold && !this.isLowPerformanceMode) {
                    this.log(`⚠️ 低FPS检测: ${this.metrics.fps} FPS`);

                    if (this.options.autoOptimize) {
                        this.enableLowPerformanceMode();
                    }
                }

                // 更新调试面板
                if (this.debugPanel) {
                    this.updateDebugPanel();
                }
            }

            requestAnimationFrame(measureFPS);
        };

        requestAnimationFrame(measureFPS);
    }

    /**
     * 开始内存监控
     */
    startMemoryMonitoring() {
        setInterval(() => {
            if (performance.memory) {
                const usedMemoryMB = Math.round(performance.memory.usedJSHeapSize / 1048576);
                this.metrics.memory = usedMemoryMB;

                if (usedMemoryMB > this.options.memoryThreshold) {
                    this.log(`⚠️ 内存使用过高: ${usedMemoryMB} MB`);

                    if (this.options.autoOptimize) {
                        this.optimizeMemory();
                    }
                }
            }
        }, 5000); // 每5秒检查一次
    }

    /**
     * 监控网络性能
     */
    monitorNetworkPerformance() {
        // 监控资源加载
        if ('PerformanceObserver' in window) {
            try {
                const observer = new PerformanceObserver((list) => {
                    list.getEntries().forEach((entry) => {
                        if (entry.entryType === 'resource') {
                            this.metrics.networkRequests++;

                            // 检查失败的请求
                            if (entry.transferSize === 0 && entry.duration > 0) {
                                this.metrics.failedRequests++;
                            }

                            // 慢请求警告
                            if (entry.duration > 3000) {
                                this.log(`⚠️ 慢请求: ${entry.name} (${Math.round(entry.duration)}ms)`);
                            }
                        }
                    });
                });

                observer.observe({ entryTypes: ['resource'] });
            } catch (e) {
                this.log('⚠️ PerformanceObserver不支持');
            }
        }
    }

    /**
     * 监控页面加载性能
     */
    monitorPageLoad() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.timing;
                const navigation = performance.getEntriesByType('navigation')[0];

                // 计算各项指标
                this.metrics.loadTime = perfData.loadEventEnd - perfData.navigationStart;
                this.metrics.domContentLoaded = perfData.domContentLoadedEventEnd - perfData.navigationStart;

                // Performance Paint Timing
                const paintEntries = performance.getEntriesByType('paint');
                paintEntries.forEach((entry) => {
                    if (entry.name === 'first-paint') {
                        this.metrics.firstPaint = Math.round(entry.startTime);
                    } else if (entry.name === 'first-contentful-paint') {
                        this.metrics.firstContentfulPaint = Math.round(entry.startTime);
                    }
                });

                this.log('📊 页面加载性能:');
                this.log(`  - 总加载时间: ${this.metrics.loadTime}ms`);
                this.log(`  - DOM加载: ${this.metrics.domContentLoaded}ms`);
                this.log(`  - 首次绘制: ${this.metrics.firstPaint}ms`);
                this.log(`  - 首次内容绘制: ${this.metrics.firstContentfulPaint}ms`);

                // 性能评分
                this.generatePerformanceScore();
            }, 0);
        });
    }

    /**
     * 观察性能
     */
    observePerformance() {
        if ('PerformanceObserver' in window) {
            try {
                // 观察长任务
                const observer = new PerformanceObserver((list) => {
                    list.getEntries().forEach((entry) => {
                        if (entry.duration > 50) {
                            this.log(`⚠️ 长任务检测: ${Math.round(entry.duration)}ms`);
                        }
                    });
                });

                observer.observe({ entryTypes: ['longtask'] });
            } catch (e) {
                // 不支持longtask
            }
        }
    }

    /**
     * 启用低性能模式
     */
    enableLowPerformanceMode() {
        if (this.isLowPerformanceMode) return;

        this.log('🔧 启用低性能模式');
        this.isLowPerformanceMode = true;
        document.body.classList.add('low-performance-mode');

        // 禁用粒子系统
        if (window.particleSystem) {
            this.log('  - 禁用粒子系统');
            try {
                if (typeof window.particleSystem.destroy === 'function') {
                    window.particleSystem.destroy();
                } else if (window.particleSystem.canvas) {
                    window.particleSystem.canvas.style.display = 'none';
                }
            } catch (e) {
                this.log('  - 粒子系统禁用失败:', e);
            }
        }

        // 减少动画
        this.log('  - 减少动画效果');
        const style = document.createElement('style');
        style.id = 'low-performance-styles';
        style.textContent = `
            .low-performance-mode * {
                animation-duration: 0.1s !important;
                transition-duration: 0.1s !important;
            }
            .low-performance-mode .animated-element {
                animation: none !important;
            }
        `;
        document.head.appendChild(style);

        // 触发自定义事件
        window.dispatchEvent(new CustomEvent('lowPerformanceMode', {
            detail: { enabled: true }
        }));
    }

    /**
     * 优化内存
     */
    optimizeMemory() {
        this.log('🧹 执行内存优化');

        // 清理未使用的元素
        const unusedElements = document.querySelectorAll('.hidden, .removed, [style*="display: none"]');
        this.log(`  - 找到 ${unusedElements.length} 个隐藏元素`);

        // 触发垃圾回收（仅供参考，浏览器自行决定）
        if (window.gc && typeof window.gc === 'function') {
            window.gc();
            this.log('  - 请求垃圾回收');
        }
    }

    /**
     * 生成性能评分
     */
    generatePerformanceScore() {
        let score = 100;

        // 加载时间评分
        if (this.metrics.loadTime > 5000) score -= 30;
        else if (this.metrics.loadTime > 3000) score -= 20;
        else if (this.metrics.loadTime > 1000) score -= 10;

        // FCP评分
        if (this.metrics.firstContentfulPaint > 3000) score -= 20;
        else if (this.metrics.firstContentfulPaint > 1800) score -= 10;

        // FPS评分
        if (this.metrics.fps < 30) score -= 20;
        else if (this.metrics.fps < 50) score -= 10;

        // 内存评分
        if (this.metrics.memory > 150) score -= 15;
        else if (this.metrics.memory > 100) score -= 10;

        this.metrics.performanceScore = Math.max(0, score);

        const rating = score >= 90 ? '优秀 ✅' :
                      score >= 70 ? '良好 ⚠️' :
                      score >= 50 ? '一般 ⚠️' : '较差 ❌';

        this.log(`📊 性能评分: ${score}/100 - ${rating}`);

        return { score, rating };
    }

    /**
     * 创建调试面板
     */
    createDebugPanel() {
        const panel = document.createElement('div');
        panel.id = 'performance-debug-panel';
        panel.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.85);
            color: #0f0;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            padding: 10px;
            border-radius: 8px;
            z-index: 99999;
            min-width: 200px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;

        panel.innerHTML = `
            <div style="margin-bottom: 8px; font-weight: bold; color: #fff;">
                📊 Performance Monitor
            </div>
            <div id="perf-fps">FPS: --</div>
            <div id="perf-memory">Memory: --</div>
            <div id="perf-mode">Mode: Normal</div>
            <div id="perf-device" style="margin-top: 8px; font-size: 10px; color: #888;">
                Device: --
            </div>
        `;

        document.body.appendChild(panel);
        this.debugPanel = panel;

        // 允许拖动
        this.makeDebugPanelDraggable();
    }

    /**
     * 使调试面板可拖动
     */
    makeDebugPanelDraggable() {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        this.debugPanel.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        const elementDrag = (e) => {
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            this.debugPanel.style.top = (this.debugPanel.offsetTop - pos2) + "px";
            this.debugPanel.style.right = "auto";
            this.debugPanel.style.left = (this.debugPanel.offsetLeft - pos1) + "px";
        };

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    /**
     * 更新调试面板
     */
    updateDebugPanel() {
        if (!this.debugPanel) return;

        const fpsColor = this.metrics.fps >= 50 ? '#0f0' :
                        this.metrics.fps >= 30 ? '#ff0' : '#f00';

        document.getElementById('perf-fps').innerHTML =
            `FPS: <span style="color: ${fpsColor}">${this.metrics.fps}</span>`;

        document.getElementById('perf-memory').innerHTML =
            `Memory: ${this.metrics.memory} MB`;

        document.getElementById('perf-mode').innerHTML =
            `Mode: ${this.isLowPerformanceMode ? '<span style="color: #f00">Low Performance</span>' : 'Normal'}`;

        document.getElementById('perf-device').innerHTML =
            `Device: ${this.deviceCapabilities.isMobile ? 'Mobile' : 'Desktop'} | ` +
            `CPU: ${this.deviceCapabilities.cpuCores} cores`;
    }

    /**
     * 获取性能报告
     */
    getPerformanceReport() {
        const score = this.generatePerformanceScore();

        return {
            metrics: { ...this.metrics },
            device: { ...this.deviceCapabilities },
            isLowPerformanceMode: this.isLowPerformanceMode,
            performanceScore: score.score,
            performanceRating: score.rating,
            timestamp: new Date().toISOString()
        };
    }

    /**
     * 导出性能报告
     */
    exportReport() {
        const report = this.getPerformanceReport();
        const json = JSON.stringify(report, null, 2);

        this.log('📄 性能报告:');
        this.log(json);

        // 复制到剪贴板
        if (navigator.clipboard) {
            navigator.clipboard.writeText(json).then(() => {
                this.log('✅ 报告已复制到剪贴板');
            });
        }

        return report;
    }

    /**
     * 日志输出
     */
    log(...args) {
        if (this.options.logToConsole) {
            console.log('[PerformanceMonitor]', ...args);
        }
    }

    /**
     * 销毁监控器
     */
    destroy() {
        this.log('🛑 停止性能监控');

        if (this.debugPanel) {
            this.debugPanel.remove();
        }

        // 移除低性能模式样式
        const style = document.getElementById('low-performance-styles');
        if (style) {
            style.remove();
        }

        document.body.classList.remove('low-performance-mode');
    }
}

// 自动启动（可配置）
if (typeof window !== 'undefined') {
    // 从URL参数读取配置
    const params = new URLSearchParams(window.location.search);
    const showDebug = params.get('debug') === 'true';

    window.performanceMonitor = new PerformanceMonitor({
        showDebugPanel: showDebug,
        logToConsole: true,
        autoOptimize: true
    });

    // 暴露全局快捷命令
    window.perfReport = () => window.performanceMonitor.exportReport();
    window.perfToggle = () => {
        if (window.performanceMonitor.debugPanel) {
            window.performanceMonitor.debugPanel.remove();
            window.performanceMonitor.debugPanel = null;
        } else {
            window.performanceMonitor.createDebugPanel();
        }
    };

    console.log('%c🚀 性能监控已启动', 'color: #0f0; font-weight: bold; font-size: 14px;');
    console.log('%c💡 使用 perfReport() 导出性能报告', 'color: #888;');
    console.log('%c💡 使用 perfToggle() 切换调试面板', 'color: #888;');
    console.log('%c💡 URL添加 ?debug=true 显示调试面板', 'color: #888;');
}

// 导出给Node.js环境使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceMonitor;
}
