/**
 * API配置模板
 *
 * 使用说明：
 * 1. 复制此文件为 api-config.js
 * 2. 填入你的Claude API Key（可选）
 * 3. 如果不填API Key，游戏将使用智能规则引擎模式运行
 *
 * 获取API Key：
 * - 访问 https://console.anthropic.com/
 * - 创建账号并生成API密钥
 * - API Key格式: sk-ant-api03-...
 *
 * 注意：
 * - api-config.js 已在 .gitignore 中，不会被提交到Git
 * - 请勿分享你的API Key
 */

const API_CONFIG = {
    // ========== Claude API配置 ==========

    /**
     * Claude API密钥（可选）
     *
     * 如果留空：游戏使用智能规则引擎，完全免费，功能完整
     * 如果填入：游戏使用真实AI对话，更智能更自然
     *
     * 示例：'sk-ant-api03-...'
     */
    CLAUDE_API_KEY: '',

    /**
     * 是否使用真实API
     *
     * 默认：false（使用规则引擎）
     * 自动：如果填入了有效的API Key，会自动切换为true
     */
    USE_REAL_API: false,

    // ========== 模型配置 ==========

    /**
     * Claude模型选择
     *
     * 推荐模型：
     * - claude-3-5-sonnet-20241022 (最新，最智能)
     * - claude-3-5-haiku-20241022 (快速，经济)
     * - claude-3-opus-20240229 (强大，稍贵)
     */
    MODEL: 'claude-3-5-sonnet-20241022',

    /**
     * 最大生成长度
     *
     * 默认：1024 tokens
     * 范围：256-4096
     */
    MAX_TOKENS: 1024,

    /**
     * 温度参数（创造性）
     *
     * 默认：0.7
     * 范围：0.0-1.0
     * - 0.0: 非常确定性，适合事实性任务
     * - 0.5: 平衡
     * - 1.0: 非常创造性，适合故事生成
     */
    TEMPERATURE: 0.7,

    // ========== 高级配置 ==========

    /**
     * API请求超时（毫秒）
     */
    TIMEOUT: 30000,

    /**
     * 重试次数
     */
    MAX_RETRIES: 2,

    /**
     * 调试模式
     *
     * true: 在控制台打印详细日志
     * false: 仅打印重要信息
     */
    DEBUG: false,

    /**
     * API端点（一般不需要修改）
     */
    API_ENDPOINT: 'https://api.anthropic.com/v1/messages',

    /**
     * API版本
     */
    API_VERSION: '2023-06-01',

    // ========== 游戏配置 ==========

    /**
     * NPC对话缓存
     *
     * true: 缓存相似问题的回答（节省API调用）
     * false: 每次都生成新回答
     */
    ENABLE_CACHE: true,

    /**
     * 缓存过期时间（分钟）
     */
    CACHE_EXPIRY: 30,

    /**
     * 对话历史保留条数
     *
     * 用于上下文记忆，太多会增加token消耗
     */
    CONVERSATION_HISTORY_LIMIT: 10,

    /**
     * 模拟模式配置（无API时使用）
     */
    SIMULATION_MODE: {
        // 响应延迟（毫秒），模拟真实API延迟
        RESPONSE_DELAY: 500,

        // NPC个性强度（0-1）
        PERSONALITY_STRENGTH: 0.8,

        // 随机性（0-1）
        RANDOMNESS: 0.3
    }
};

// ========== 自动检测与验证 ==========

/**
 * 验证API Key格式
 */
function validateAPIKey(key) {
    if (!key) return false;

    // Claude API Key格式: sk-ant-api03-...
    const pattern = /^sk-ant-api\d{2}-[A-Za-z0-9_-]{95,}$/;
    return pattern.test(key);
}

/**
 * 自动检测并设置USE_REAL_API
 */
if (API_CONFIG.CLAUDE_API_KEY && validateAPIKey(API_CONFIG.CLAUDE_API_KEY)) {
    API_CONFIG.USE_REAL_API = true;
    console.log('✅ 检测到有效的Claude API Key，启用真实API模式');
} else if (API_CONFIG.CLAUDE_API_KEY && !validateAPIKey(API_CONFIG.CLAUDE_API_KEY)) {
    console.warn('⚠️ API Key格式不正确，将使用规则引擎模式');
    API_CONFIG.USE_REAL_API = false;
} else {
    console.log('ℹ️ 未配置API Key，使用智能规则引擎模式（完全免费）');
}

/**
 * 获取当前配置摘要
 */
function getConfigSummary() {
    return {
        mode: API_CONFIG.USE_REAL_API ? 'Real API' : 'Rule Engine',
        model: API_CONFIG.USE_REAL_API ? API_CONFIG.MODEL : 'Built-in Rules',
        apiKeyConfigured: !!API_CONFIG.CLAUDE_API_KEY,
        debug: API_CONFIG.DEBUG,
        cacheEnabled: API_CONFIG.ENABLE_CACHE
    };
}

/**
 * 测试API连接
 */
async function testAPIConnection() {
    if (!API_CONFIG.USE_REAL_API) {
        return {
            success: true,
            mode: 'simulation',
            message: '规则引擎模式，无需API连接'
        };
    }

    try {
        const response = await fetch(API_CONFIG.API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_CONFIG.CLAUDE_API_KEY,
                'anthropic-version': API_CONFIG.API_VERSION
            },
            body: JSON.stringify({
                model: API_CONFIG.MODEL,
                max_tokens: 100,
                messages: [{
                    role: 'user',
                    content: 'Test connection'
                }]
            })
        });

        if (response.ok) {
            return {
                success: true,
                mode: 'api',
                message: 'API连接成功'
            };
        } else {
            const error = await response.json();
            return {
                success: false,
                mode: 'api',
                error: error.error?.message || '连接失败',
                status: response.status
            };
        }
    } catch (error) {
        return {
            success: false,
            mode: 'api',
            error: error.message
        };
    }
}

// ========== 导出配置 ==========

if (typeof window !== 'undefined') {
    window.API_CONFIG = API_CONFIG;
    window.validateAPIKey = validateAPIKey;
    window.getConfigSummary = getConfigSummary;
    window.testAPIConnection = testAPIConnection;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        API_CONFIG,
        validateAPIKey,
        getConfigSummary,
        testAPIConnection
    };
}

// ========== 使用示例 ==========

/*
// 示例1: 查看当前配置
console.log(getConfigSummary());

// 示例2: 测试API连接
testAPIConnection().then(result => {
    console.log('API测试结果:', result);
});

// 示例3: 在游戏中使用
const game = new GrowthGameEngineV3({
    company: 'MyStartup',
    industry: 'saas',
    initialUsers: 1000,
    budget: 10000
});

// 初始化AI系统
game.initializeAI(API_CONFIG.CLAUDE_API_KEY);

// 示例4: 动态切换模式
API_CONFIG.USE_REAL_API = false; // 切换到规则引擎
API_CONFIG.USE_REAL_API = true;  // 切换到真实API

// 示例5: 调试模式
API_CONFIG.DEBUG = true; // 启用详细日志
*/

// ========== 环境变量支持 ==========

/**
 * 支持从环境变量读取配置（适用于部署环境）
 */
if (typeof process !== 'undefined' && process.env) {
    if (process.env.CLAUDE_API_KEY) {
        API_CONFIG.CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
        API_CONFIG.USE_REAL_API = validateAPIKey(process.env.CLAUDE_API_KEY);
    }

    if (process.env.CLAUDE_MODEL) {
        API_CONFIG.MODEL = process.env.CLAUDE_MODEL;
    }

    if (process.env.DEBUG === 'true') {
        API_CONFIG.DEBUG = true;
    }
}

// ========== 配置预设 ==========

/**
 * 预设配置方案
 */
const CONFIG_PRESETS = {
    // 开发模式：快速响应，低成本
    development: {
        MODEL: 'claude-3-5-haiku-20241022',
        MAX_TOKENS: 512,
        TEMPERATURE: 0.5,
        DEBUG: true,
        ENABLE_CACHE: true
    },

    // 生产模式：高质量，智能
    production: {
        MODEL: 'claude-3-5-sonnet-20241022',
        MAX_TOKENS: 1024,
        TEMPERATURE: 0.7,
        DEBUG: false,
        ENABLE_CACHE: true
    },

    // 创意模式：最大创造性
    creative: {
        MODEL: 'claude-3-5-sonnet-20241022',
        MAX_TOKENS: 1536,
        TEMPERATURE: 0.9,
        DEBUG: false,
        ENABLE_CACHE: false
    },

    // 经济模式：最低成本
    economy: {
        MODEL: 'claude-3-5-haiku-20241022',
        MAX_TOKENS: 256,
        TEMPERATURE: 0.3,
        DEBUG: false,
        ENABLE_CACHE: true
    }
};

/**
 * 应用预设配置
 */
function applyPreset(presetName) {
    const preset = CONFIG_PRESETS[presetName];
    if (!preset) {
        console.error(`未知的预设: ${presetName}`);
        return false;
    }

    Object.assign(API_CONFIG, preset);
    console.log(`✅ 已应用预设配置: ${presetName}`);
    return true;
}

// 导出预设
if (typeof window !== 'undefined') {
    window.CONFIG_PRESETS = CONFIG_PRESETS;
    window.applyPreset = applyPreset;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports.CONFIG_PRESETS = CONFIG_PRESETS;
    module.exports.applyPreset = applyPreset;
}

// ========== 配置完成 ==========

console.log('📋 API配置加载完成');
console.log('当前模式:', API_CONFIG.USE_REAL_API ? '🌐 真实API' : '🎮 规则引擎');

if (API_CONFIG.DEBUG) {
    console.log('完整配置:', getConfigSummary());
}
