/**
 * 互动式新手引导系统
 * 提供沉浸式的首次体验，手把手引导玩家
 */

const OnboardingSystem = {
    // 引导状态
    hasCompletedOnboarding: false,
    currentStep: 0,
    isSkipped: false,

    // 引导步骤配置
    steps: [
        {
            id: 'intro',
            type: 'story',
            duration: 3000,
            content: {
                title: '早上 9:15',
                text: '你是这家创业公司的增长负责人。\n\n突然，CEO Sarah的电话打来...\n\n"有麻烦了，马上来会议室！"',
                icon: '📱'
            }
        },
        {
            id: 'crisis',
            type: 'story',
            duration: 3000,
            content: {
                title: '危机来临',
                text: '会议室里，投资人Tom看起来很焦虑。\n\n白板上的数字触目惊心：\n用户流失 -50%\n\n你只有3小时准备答案...',
                icon: '⚠️'
            }
        },
        {
            id: 'first-action',
            type: 'interactive',
            target: '.action-btn:first-child',
            content: {
                title: '你的第一步',
                text: '时间紧迫！试试点击这个按钮，开始收集关键数据。',
                tooltip: '点这里！',
                highlight: true
            }
        },
        {
            id: 'encourage',
            type: 'reward',
            duration: 2000,
            content: {
                title: '很好！',
                text: '你开始行动了！\n\n记住：增长负责人要依靠数据做决策，不是凭感觉！',
                icon: '✅'
            }
        },
        {
            id: 'tutorial',
            type: 'tips',
            duration: 3000,
            content: {
                title: '快速提示',
                text: '• 时间有限，选择最关键的调查\n• 收集至少2项情报才能回答\n• 每个行动都会消耗时间\n• 你只有一次回答机会',
                icon: '💡'
            }
        }
    ],

    // 初始化引导系统
    init() {
        // 检查是否已完成引导
        this.hasCompletedOnboarding = localStorage.getItem('onboarding_completed') === 'true';

        // 如果是第一次进入，显示引导
        if (!this.hasCompletedOnboarding) {
            this.start();
        }
    },

    // 开始引导
    start() {
        console.log('Starting onboarding...');
        this.currentStep = 0;
        this.isSkipped = false;

        // 创建引导容器
        this.createOnboardingUI();

        // 显示第一步
        setTimeout(() => {
            this.showStep(0);
        }, 500);
    },

    // 创建引导UI
    createOnboardingUI() {
        // 检查是否已存在
        if (document.getElementById('onboarding-overlay')) {
            return;
        }

        const overlay = document.createElement('div');
        overlay.id = 'onboarding-overlay';
        overlay.innerHTML = `
            <div class="onboarding-dimmer"></div>
            <div class="onboarding-spotlight"></div>
            <div class="onboarding-content">
                <div class="onboarding-box">
                    <div class="onboarding-icon" id="onboarding-icon">📱</div>
                    <div class="onboarding-title" id="onboarding-title">欢迎</div>
                    <div class="onboarding-text" id="onboarding-text">正在加载...</div>
                    <div class="onboarding-actions">
                        <button class="onboarding-btn-skip" id="onboarding-skip">跳过引导</button>
                        <button class="onboarding-btn-next" id="onboarding-next">继续</button>
                    </div>
                </div>
                <div class="onboarding-tooltip" id="onboarding-tooltip">
                    <div class="tooltip-arrow"></div>
                    <div class="tooltip-text">点这里！</div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // 添加样式
        this.injectStyles();

        // 绑定事件
        document.getElementById('onboarding-skip').addEventListener('click', () => this.skip());
        document.getElementById('onboarding-next').addEventListener('click', () => this.next());
    },

    // 注入样式
    injectStyles() {
        if (document.getElementById('onboarding-styles')) {
            return;
        }

        const style = document.createElement('style');
        style.id = 'onboarding-styles';
        style.textContent = `
            #onboarding-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 10000;
                pointer-events: auto;
            }

            .onboarding-dimmer {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.85);
                animation: fadeIn 0.5s;
            }

            .onboarding-spotlight {
                position: absolute;
                border: 3px solid #FFD700;
                border-radius: 12px;
                box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.85),
                            0 0 30px rgba(255, 215, 0, 0.5),
                            inset 0 0 20px rgba(255, 215, 0, 0.2);
                pointer-events: none;
                transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                display: none;
                z-index: 10001;
            }

            .onboarding-spotlight.active {
                display: block;
                animation: pulse 2s infinite;
            }

            .onboarding-content {
                position: relative;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10002;
            }

            .onboarding-box {
                background: linear-gradient(135deg, #2C1810 0%, #1A0F0A 100%);
                border: 3px solid #FFD700;
                border-radius: 20px;
                padding: 40px;
                max-width: 600px;
                width: 90%;
                text-align: center;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                animation: zoomIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
                position: relative;
            }

            .onboarding-icon {
                font-size: 5em;
                margin-bottom: 20px;
                animation: bounce 1s infinite;
            }

            .onboarding-title {
                font-size: 2.5em;
                color: #FFD700;
                margin-bottom: 20px;
                font-weight: bold;
                text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
            }

            .onboarding-text {
                font-size: 1.3em;
                line-height: 1.8;
                color: #E8DCC4;
                margin-bottom: 30px;
                white-space: pre-line;
            }

            .onboarding-actions {
                display: flex;
                gap: 15px;
                justify-content: center;
            }

            .onboarding-btn-skip {
                background: rgba(139, 0, 0, 0.3);
                border: 2px solid #8B7355;
                color: #C9A961;
                padding: 12px 30px;
                border-radius: 10px;
                font-size: 1em;
                cursor: pointer;
                transition: all 0.3s;
                font-weight: 600;
            }

            .onboarding-btn-skip:hover {
                background: rgba(139, 0, 0, 0.5);
                border-color: #C9A961;
                transform: scale(1.05);
            }

            .onboarding-btn-next {
                background: linear-gradient(135deg, #C9A961 0%, #A08040 100%);
                border: none;
                color: #000;
                padding: 12px 40px;
                border-radius: 10px;
                font-size: 1.1em;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s;
                box-shadow: 0 5px 20px rgba(201, 169, 97, 0.3);
            }

            .onboarding-btn-next:hover {
                transform: scale(1.05);
                box-shadow: 0 8px 30px rgba(201, 169, 97, 0.5);
            }

            .onboarding-tooltip {
                position: absolute;
                background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
                color: #000;
                padding: 15px 25px;
                border-radius: 12px;
                font-weight: bold;
                font-size: 1.2em;
                box-shadow: 0 5px 20px rgba(255, 215, 0, 0.5);
                display: none;
                z-index: 10003;
                animation: bounce 1s infinite;
            }

            .onboarding-tooltip.active {
                display: block;
            }

            .tooltip-arrow {
                position: absolute;
                width: 0;
                height: 0;
                border-left: 15px solid transparent;
                border-right: 15px solid transparent;
                border-bottom: 15px solid #FFD700;
                top: -15px;
                left: 50%;
                transform: translateX(-50%);
            }

            .tooltip-text {
                animation: pulse 1.5s infinite;
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            @keyframes zoomIn {
                from {
                    transform: scale(0.5);
                    opacity: 0;
                }
                to {
                    transform: scale(1);
                    opacity: 1;
                }
            }

            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-20px); }
            }

            @keyframes pulse {
                0%, 100% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.7; transform: scale(0.95); }
            }

            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
            }
        `;

        document.head.appendChild(style);
    },

    // 显示指定步骤
    showStep(stepIndex) {
        if (stepIndex >= this.steps.length) {
            this.complete();
            return;
        }

        this.currentStep = stepIndex;
        const step = this.steps[stepIndex];

        console.log('Showing step:', step.id);

        // 根据类型显示不同的内容
        switch (step.type) {
            case 'story':
                this.showStoryStep(step);
                break;
            case 'interactive':
                this.showInteractiveStep(step);
                break;
            case 'reward':
                this.showRewardStep(step);
                break;
            case 'tips':
                this.showTipsStep(step);
                break;
        }
    },

    // 显示故事步骤
    showStoryStep(step) {
        const box = document.querySelector('.onboarding-box');
        const icon = document.getElementById('onboarding-icon');
        const title = document.getElementById('onboarding-title');
        const text = document.getElementById('onboarding-text');
        const nextBtn = document.getElementById('onboarding-next');
        const skipBtn = document.getElementById('onboarding-skip');
        const spotlight = document.querySelector('.onboarding-spotlight');
        const tooltip = document.getElementById('onboarding-tooltip');

        // 隐藏高亮和提示
        spotlight.classList.remove('active');
        tooltip.classList.remove('active');

        // 显示内容框
        box.style.display = 'block';

        // 更新内容
        icon.textContent = step.content.icon;
        title.textContent = step.content.title;
        text.textContent = step.content.text;

        // 显示按钮
        nextBtn.style.display = 'inline-block';
        skipBtn.style.display = 'inline-block';

        // 自动进入下一步
        if (step.duration) {
            setTimeout(() => {
                if (!this.isSkipped && this.currentStep === this.steps.findIndex(s => s.id === step.id)) {
                    this.next();
                }
            }, step.duration);
        }
    },

    // 显示互动步骤
    showInteractiveStep(step) {
        const box = document.querySelector('.onboarding-box');
        const spotlight = document.querySelector('.onboarding-spotlight');
        const tooltip = document.getElementById('onboarding-tooltip');
        const icon = document.getElementById('onboarding-icon');
        const title = document.getElementById('onboarding-title');
        const text = document.getElementById('onboarding-text');

        // 更新内容
        icon.textContent = '👆';
        title.textContent = step.content.title;
        text.textContent = step.content.text;

        // 隐藏继续按钮，只显示跳过
        document.getElementById('onboarding-next').style.display = 'none';

        // 等待DOM更新
        setTimeout(() => {
            // 查找目标元素
            const target = document.querySelector(step.target);

            if (!target) {
                console.error('Target not found:', step.target);
                this.next();
                return;
            }

            // 高亮目标
            const rect = target.getBoundingClientRect();
            spotlight.style.top = rect.top - 10 + 'px';
            spotlight.style.left = rect.left - 10 + 'px';
            spotlight.style.width = rect.width + 20 + 'px';
            spotlight.style.height = rect.height + 20 + 'px';
            spotlight.classList.add('active');

            // 显示提示
            tooltip.querySelector('.tooltip-text').textContent = step.content.tooltip;
            tooltip.style.top = rect.top - 60 + 'px';
            tooltip.style.left = rect.left + rect.width / 2 + 'px';
            tooltip.style.transform = 'translateX(-50%)';
            tooltip.classList.add('active');

            // 使目标可点击
            target.style.position = 'relative';
            target.style.zIndex = '10004';
            target.style.pointerEvents = 'auto';

            // 监听点击
            const clickHandler = (e) => {
                console.log('First action clicked!');
                target.removeEventListener('click', clickHandler);
                target.style.zIndex = '';
                target.style.pointerEvents = '';

                // 延迟进入下一步，让玩家看到反馈
                setTimeout(() => {
                    this.next();
                }, 1000);
            };

            target.addEventListener('click', clickHandler);
        }, 500);
    },

    // 显示奖励步骤
    showRewardStep(step) {
        const spotlight = document.querySelector('.onboarding-spotlight');
        const tooltip = document.getElementById('onboarding-tooltip');
        const icon = document.getElementById('onboarding-icon');
        const title = document.getElementById('onboarding-title');
        const text = document.getElementById('onboarding-text');
        const nextBtn = document.getElementById('onboarding-next');

        // 隐藏高亮
        spotlight.classList.remove('active');
        tooltip.classList.remove('active');

        // 更新内容
        icon.textContent = step.content.icon;
        title.textContent = step.content.title;
        text.textContent = step.content.text;

        // 添加特效
        icon.style.animation = 'bounce 0.5s ease-in-out 3';

        // 显示继续按钮
        nextBtn.style.display = 'inline-block';

        // 自动进入下一步
        if (step.duration) {
            setTimeout(() => {
                if (!this.isSkipped && this.currentStep === this.steps.findIndex(s => s.id === step.id)) {
                    this.next();
                }
            }, step.duration);
        }
    },

    // 显示提示步骤
    showTipsStep(step) {
        const spotlight = document.querySelector('.onboarding-spotlight');
        const tooltip = document.getElementById('onboarding-tooltip');
        const icon = document.getElementById('onboarding-icon');
        const title = document.getElementById('onboarding-title');
        const text = document.getElementById('onboarding-text');
        const nextBtn = document.getElementById('onboarding-next');

        // 隐藏高亮
        spotlight.classList.remove('active');
        tooltip.classList.remove('active');

        // 更新内容
        icon.textContent = step.content.icon;
        title.textContent = step.content.title;
        text.innerHTML = step.content.text;
        text.style.textAlign = 'left';

        // 显示继续按钮
        nextBtn.style.display = 'inline-block';
        nextBtn.textContent = '开始游戏！';

        // 自动进入下一步
        if (step.duration) {
            setTimeout(() => {
                if (!this.isSkipped && this.currentStep === this.steps.findIndex(s => s.id === step.id)) {
                    this.next();
                }
            }, step.duration);
        }
    },

    // 下一步
    next() {
        this.showStep(this.currentStep + 1);
    },

    // 跳过引导
    skip() {
        this.isSkipped = true;
        this.complete();
    },

    // 完成引导
    complete() {
        console.log('Onboarding completed');

        // 标记为已完成
        localStorage.setItem('onboarding_completed', 'true');
        this.hasCompletedOnboarding = true;

        // 移除引导UI
        const overlay = document.getElementById('onboarding-overlay');
        if (overlay) {
            overlay.style.animation = 'fadeIn 0.3s reverse';
            setTimeout(() => {
                overlay.remove();
            }, 300);
        }

        // 触发游戏开始事件
        if (typeof window.onOnboardingComplete === 'function') {
            window.onOnboardingComplete();
        }
    },

    // 重置引导状态（用于测试）
    reset() {
        localStorage.removeItem('onboarding_completed');
        this.hasCompletedOnboarding = false;
        this.currentStep = 0;
        this.isSkipped = false;

        const overlay = document.getElementById('onboarding-overlay');
        if (overlay) {
            overlay.remove();
        }

        console.log('Onboarding reset - refresh page to see it again');
    }
};

// 页面加载时自动初始化
if (typeof window !== 'undefined') {
    window.OnboardingSystem = OnboardingSystem;

    // 添加便捷方法到控制台
    window.resetOnboarding = () => OnboardingSystem.reset();
}
