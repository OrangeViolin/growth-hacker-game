// Growth Hacker Game - Scenarios Library
// 增长黑客游戏 - 场景库
//
// 15个精心设计的独特场景，灵感来自真实的增长黑客案例

const SCENARIOS_LIBRARY = {
    // ==================== TIER 1: 初级场景 ====================

    tier1: [
        {
            id: 'saas-email-tool',
            tier: 1,
            name: {
                en: 'Email Marketing SaaS Startup',
                zh: 'SaaS邮件营销工具'
            },
            industry: 'SaaS',
            difficulty: 'easy',
            backstory: {
                en: 'You just launched MailFlow, an email marketing tool for small businesses. Your co-founder built a solid product, but after 3 months, you only have 247 users and $890 MRR. Most users signed up from your Product Hunt launch but never sent a campaign. Your runway is 8 months. The freemium model isn\'t converting. What\'s your growth strategy?',
                zh: '你刚刚推出了MailFlow，一个面向小企业的邮件营销工具。你的联合创始人打造了一个可靠的产品，但3个月后，你只有247个用户和890美元的月经常性收入。大多数用户从Product Hunt发布时注册，但从未发送过营销活动。你的资金跑道还有8个月。免费增值模式转化不佳。你的增长策略是什么？'
            },
            startingMetrics: {
                users: 247,
                activeUsers: 34,
                revenue: 890,
                budget: 15000,
                retention7d: 18,
                activation: 14, // 只有14%的用户发送了第一封邮件
                conversionRate: 2.5,
                churnRate: 15,
                nps: 25
            },
            uniqueChallenges: [
                {
                    en: 'Low activation rate - most users never send their first email',
                    zh: '激活率低 - 大多数用户从未发送第一封邮件'
                },
                {
                    en: 'Competing with Mailchimp and ConvertKit',
                    zh: '与Mailchimp和ConvertKit竞争'
                }
            ],
            specialSkills: [
                {
                    name: {
                        en: 'Email Template Library',
                        zh: '邮件模板库'
                    },
                    description: {
                        en: 'Create 50+ pre-designed email templates. Inspired by Canva\'s template strategy - reduce time-to-first-value from 2 hours to 10 minutes.',
                        zh: '创建50+预设计邮件模板。受Canva模板策略启发 - 将首次价值时间从2小时减少到10分钟。'
                    },
                    icon: '📧',
                    aarrr: 'Activation',
                    cost: 2000,
                    timeframe: '2-3周',
                    effectiveness: 0.85,
                    execute: (game) => {
                        const activationBoost = 35; // 从14%提升到49%
                        const newActiveUsers = Math.floor(game.metrics.users * 0.35);
                        game.metrics.activation += activationBoost;
                        game.metrics.activeUsers = newActiveUsers;
                        game.metrics.budget -= 2000;
                        game.currentWeek += 3;

                        return {
                            success: true,
                            feedback: {
                                en: `Template library launched! Activation rate jumped from 14% to 49%. ${newActiveUsers} users sent their first campaign using templates. "This is exactly what I needed!" - User feedback.`,
                                zh: `模板库上线！激活率从14%跃升至49%。${newActiveUsers}名用户使用模板发送了首次营销活动。"这正是我需要的！" - 用户反馈。`
                            },
                            changes: [
                                { label: '激活率 Activation', oldValue: 14, newValue: 49, delta: 35, unit: '%' },
                                { label: '活跃用户 Active Users', oldValue: game.metrics.activeUsers - newActiveUsers, newValue: newActiveUsers, delta: newActiveUsers, unit: '' },
                                { label: '预算 Budget', oldValue: game.metrics.budget + 2000, newValue: game.metrics.budget, delta: -2000, unit: '$' }
                            ]
                        };
                    }
                },
                {
                    name: {
                        en: 'Zapier Integration',
                        zh: 'Zapier集成'
                    },
                    description: {
                        en: 'Build Zapier integration to connect with 5000+ apps. Distribution hack: Each integration = new discovery channel. Inspired by Notion\'s integration strategy.',
                        zh: '构建Zapier集成，连接5000+应用。分发黑客：每个集成 = 新的发现渠道。受Notion集成策略启发。'
                    },
                    icon: '🔌',
                    aarrr: 'Acquisition',
                    cost: 3500,
                    timeframe: '4-5周',
                    effectiveness: 0.75,
                    execute: (game) => {
                        const newUsers = Math.floor(game.metrics.users * 0.40);
                        game.metrics.users += newUsers;
                        game.metrics.budget -= 3500;
                        game.currentWeek += 5;

                        return {
                            success: true,
                            feedback: {
                                en: `Zapier integration live! Featured in Zapier's newsletter to 500K subscribers. Acquired ${newUsers} users from integration discovery. Organic traffic up 3x.`,
                                zh: `Zapier集成上线！在Zapier的50万订阅者通讯中展示。从集成发现获得${newUsers}个用户。自然流量增长3倍。`
                            },
                            changes: [
                                { label: '用户数 Users', oldValue: game.metrics.users - newUsers, newValue: game.metrics.users, delta: newUsers, unit: '' },
                                { label: '预算 Budget', oldValue: game.metrics.budget + 3500, newValue: game.metrics.budget, delta: -3500, unit: '$' }
                            ]
                        };
                    }
                }
            ],
            specialEvents: [
                {
                    name: {
                        en: 'Competitor Mailchimp raises prices by 40%',
                        zh: '竞争对手Mailchimp涨价40%'
                    },
                    description: {
                        en: 'Mailchimp just announced a 40% price increase. Thousands of angry users are looking for alternatives. Your support inbox is flooding with migration requests.',
                        zh: 'Mailchimp刚宣布涨价40%。成千上万愤怒的用户正在寻找替代品。你的支持邮箱被迁移请求淹没。'
                    },
                    probability: 0.15,
                    impact: 'positive',
                    effect: (game) => {
                        const newUsers = Math.floor(game.metrics.users * 0.60);
                        game.metrics.users += newUsers;
                        game.metrics.revenue += newUsers * 15 * 0.05; // 5%转化率，15美元客单价

                        return {
                            en: `Perfect timing! You launched a "Switch from Mailchimp" landing page and migration tool. Acquired ${newUsers} new users in 2 weeks. Revenue up ${Math.floor(newUsers * 15 * 0.05)}$.`,
                            zh: `时机完美！你推出了"从Mailchimp迁移"登录页和迁移工具。2周内获得${newUsers}新用户。收入增长${Math.floor(newUsers * 15 * 0.05)}美元。`
                        };
                    }
                },
                {
                    name: {
                        en: 'GDPR compliance crisis',
                        zh: 'GDPR合规危机'
                    },
                    description: {
                        en: 'A user reported your email consent process doesn\'t meet GDPR standards. If not fixed in 2 weeks, you risk €20M fine and losing all EU users (40% of base).',
                        zh: '一个用户报告你的邮件同意流程不符合GDPR标准。如果2周内不修复，你面临2000万欧元罚款和失去所有欧盟用户（40%用户群）的风险。'
                    },
                    probability: 0.10,
                    impact: 'negative',
                    effect: (game) => {
                        const costFix = 5000;
                        const usersLost = Math.floor(game.metrics.users * 0.40);

                        if (game.metrics.budget >= costFix) {
                            game.metrics.budget -= costFix;
                            return {
                                en: `Crisis averted! Hired GDPR consultant and fixed compliance issues. Cost: $${costFix}. Retained all EU users and improved trust.`,
                                zh: `危机解除！聘请GDPR顾问并修复合规问题。成本：${costFix}美元。保留了所有欧盟用户并提升了信任。`
                            };
                        } else {
                            game.metrics.users -= usersLost;
                            game.metrics.activeUsers = Math.floor(game.metrics.activeUsers * 0.6);
                            return {
                                en: `Disaster! Couldn't afford GDPR fix. Lost ${usersLost} EU users and got negative press coverage. Reputation damaged.`,
                                zh: `灾难！无法负担GDPR修复。失去${usersLost}个欧盟用户并遭到负面新闻报道。声誉受损。`
                            };
                        }
                    }
                }
            ],
            victoryConditions: {
                primary: {
                    en: 'Reach 2,000 users and $5,000 MRR',
                    zh: '达到2000用户和5000美元月经常性收入'
                },
                secondary: {
                    en: 'Achieve 40%+ activation rate and 50%+ 7-day retention',
                    zh: '实现40%+激活率和50%+ 7日留存'
                },
                metrics: {
                    users: 2000,
                    revenue: 5000,
                    activation: 40,
                    retention7d: 50
                }
            },
            inspirationNote: {
                en: 'Inspired by ConvertKit\'s journey from $0 to $29M ARR by focusing on creator-specific features.',
                zh: '受ConvertKit从0到2900万美元年经常性收入的历程启发，专注于创作者特定功能。'
            }
        },

        {
            id: 'ecommerce-fashion',
            tier: 1,
            name: {
                en: 'Fashion E-commerce Boutique',
                zh: '时尚电商精品店'
            },
            industry: 'E-commerce',
            difficulty: 'easy',
            backstory: {
                en: 'StyleHub is your sustainable fashion e-commerce store targeting Gen-Z. You dropship eco-friendly clothing from ethical manufacturers. After 6 months: 5,234 site visitors, 89 orders, $4,200 revenue. Facebook ads are bleeding money ($45 CAC, $32 LTV). Cart abandonment is 78%. Instagram has 2.1K followers but low engagement. How do you turn this around?',
                zh: 'StyleHub是你的可持续时尚电商店，目标客户是Z世代。你从道德制造商那里代发环保服装。6个月后：5234网站访问者，89个订单，4200美元收入。Facebook广告烧钱（45美元CAC，32美元LTV）。购物车放弃率78%。Instagram有2100粉丝但参与度低。你如何扭转局面？'
            },
            startingMetrics: {
                users: 5234, // 网站访问者
                activeUsers: 892, // 回访客户
                orders: 89,
                revenue: 4200,
                budget: 8000,
                conversionRate: 1.7,
                cartAbandonmentRate: 78,
                avgOrderValue: 47,
                cac: 45,
                ltv: 32,
                instagramFollowers: 2100,
                engagementRate: 1.2
            },
            uniqueChallenges: [
                {
                    en: 'Negative unit economics: CAC > LTV',
                    zh: '负向单位经济：CAC > LTV'
                },
                {
                    en: 'High cart abandonment (78%)',
                    zh: '高购物车放弃率（78%）'
                },
                {
                    en: 'Low social media engagement despite decent following',
                    zh: '尽管有不错的关注者，但社交媒体参与度低'
                }
            ],
            specialSkills: [
                {
                    name: {
                        en: 'Size Finder Quiz',
                        zh: '尺码查找测验'
                    },
                    description: {
                        en: 'Build an interactive quiz: "Find Your Perfect Fit in 60 Seconds". Collect emails + reduce returns. Inspired by Function of Beauty\'s personalization quiz (45% conversion).',
                        zh: '构建互动测验："60秒找到完美尺码"。收集邮件+减少退货。受Function of Beauty个性化测验启发（45%转化率）。'
                    },
                    icon: '📏',
                    aarrr: 'Activation',
                    cost: 1500,
                    timeframe: '2周',
                    effectiveness: 0.80,
                    execute: (game) => {
                        game.metrics.conversionRate += 2.1; // 从1.7%到3.8%
                        game.metrics.cartAbandonmentRate -= 23; // 从78%到55%
                        const newOrders = Math.floor(game.metrics.users * 0.038) - game.metrics.orders;
                        game.metrics.orders += newOrders;
                        game.metrics.revenue += newOrders * game.metrics.avgOrderValue;
                        game.metrics.budget -= 1500;
                        game.currentWeek += 2;

                        return {
                            success: true,
                            feedback: {
                                en: `Quiz is a hit! Conversion rate: 1.7%→3.8%. Cart abandonment: 78%→55%. Added ${newOrders} orders. "Finally found clothes that actually fit!" - Customer reviews 5⭐`,
                                zh: `测验大获成功！转化率：1.7%→3.8%。购物车放弃：78%→55%。增加${newOrders}个订单。"终于找到真正合身的衣服了！" - 客户评价5⭐`
                            },
                            changes: [
                                { label: '转化率 Conversion', oldValue: 1.7, newValue: game.metrics.conversionRate, delta: 2.1, unit: '%' },
                                { label: '购物车放弃率 Cart Abandon', oldValue: 78, newValue: game.metrics.cartAbandonmentRate, delta: -23, unit: '%' },
                                { label: '订单数 Orders', oldValue: game.metrics.orders - newOrders, newValue: game.metrics.orders, delta: newOrders, unit: '' },
                                { label: '收入 Revenue', oldValue: game.metrics.revenue - (newOrders * game.metrics.avgOrderValue), newValue: game.metrics.revenue, delta: newOrders * game.metrics.avgOrderValue, unit: '$' }
                            ]
                        };
                    }
                },
                {
                    name: {
                        en: 'UGC Content Campaign',
                        zh: 'UGC内容营销'
                    },
                    description: {
                        en: 'Launch #StyleHubSustainable campaign. Send free items to 50 micro-influencers (5K-20K followers) in exchange for authentic content. Gymshark grew to $500M using this strategy.',
                        zh: '发起#StyleHubSustainable活动。向50个微影响者（5K-20K粉丝）免费送产品以换取真实内容。Gymshark用这个策略增长到5亿美元。'
                    },
                    icon: '📸',
                    aarrr: 'Acquisition',
                    cost: 2500,
                    timeframe: '4周',
                    effectiveness: 0.85,
                    execute: (game) => {
                        const newVisitors = Math.floor(game.metrics.users * 0.65);
                        game.metrics.users += newVisitors;
                        game.metrics.instagramFollowers += 3200;
                        game.metrics.engagementRate += 4.3; // 从1.2%到5.5%
                        game.metrics.cac -= 18; // 从45美元降到27美元
                        game.metrics.budget -= 2500;
                        game.currentWeek += 4;

                        return {
                            success: true,
                            feedback: {
                                en: `Viral success! 50 influencers posted authentic content. +${newVisitors} site visitors, +3.2K Instagram followers. Engagement: 1.2%→5.5%. CAC dropped from $45 to $27. "Love supporting sustainable brands!" trending.`,
                                zh: `病毒式成功！50位影响者发布了真实内容。+${newVisitors}网站访问者，+3200 Instagram粉丝。参与度：1.2%→5.5%。CAC从45美元降至27美元。"爱支持可持续品牌！"成为趋势。`
                            },
                            changes: [
                                { label: '网站访问者 Visitors', oldValue: game.metrics.users - newVisitors, newValue: game.metrics.users, delta: newVisitors, unit: '' },
                                { label: 'Instagram粉丝 Followers', oldValue: game.metrics.instagramFollowers - 3200, newValue: game.metrics.instagramFollowers, delta: 3200, unit: '' },
                                { label: '参与率 Engagement', oldValue: 1.2, newValue: game.metrics.engagementRate, delta: 4.3, unit: '%' },
                                { label: '获客成本 CAC', oldValue: 45, newValue: game.metrics.cac, delta: -18, unit: '$' }
                            ]
                        };
                    }
                },
                {
                    name: {
                        en: 'SMS Abandoned Cart Recovery',
                        zh: '短信购物车挽回'
                    },
                    description: {
                        en: 'Set up SMS automation: "Hey! Your sustainable outfit is waiting ❤️ Complete order in next 2 hours → Get 15% off". SMS has 98% open rate vs 20% email. Inspired by Warby Parker\'s recovery flow.',
                        zh: '设置短信自动化："嘿！你的可持续装扮在等你❤️ 2小时内完成订单→享15%折扣"。短信有98%打开率 vs 20%邮件。受Warby Parker恢复流程启发。'
                    },
                    icon: '💬',
                    aarrr: 'Revenue',
                    cost: 800,
                    timeframe: '1周',
                    effectiveness: 0.75,
                    execute: (game) => {
                        const recoveredCarts = Math.floor(game.metrics.users * game.metrics.cartAbandonmentRate * 0.001 * 0.28); // 28%恢复率
                        const recoveredRevenue = recoveredCarts * game.metrics.avgOrderValue * 0.85; // 15%折扣
                        game.metrics.orders += recoveredCarts;
                        game.metrics.revenue += recoveredRevenue;
                        game.metrics.cartAbandonmentRate -= 12;
                        game.metrics.budget -= 800;
                        game.currentWeek += 1;

                        return {
                            success: true,
                            feedback: {
                                en: `SMS magic! Recovered ${recoveredCarts} abandoned carts. Revenue: +$${Math.floor(recoveredRevenue)}. Cart abandonment: 78%→66%. "The text reminder was perfect timing!" - Customer feedback.`,
                                zh: `短信魔法！挽回${recoveredCarts}个废弃购物车。收入：+${Math.floor(recoveredRevenue)}美元。购物车放弃率：78%→66%。"短信提醒时机完美！" - 客户反馈。`
                            },
                            changes: [
                                { label: '恢复订单 Recovered Orders', oldValue: game.metrics.orders - recoveredCarts, newValue: game.metrics.orders, delta: recoveredCarts, unit: '' },
                                { label: '收入 Revenue', oldValue: game.metrics.revenue - recoveredRevenue, newValue: game.metrics.revenue, delta: Math.floor(recoveredRevenue), unit: '$' },
                                { label: '购物车放弃率 Cart Abandon', oldValue: 78, newValue: game.metrics.cartAbandonmentRate, delta: -12, unit: '%' }
                            ]
                        };
                    }
                }
            ],
            specialEvents: [
                {
                    name: {
                        en: 'Viral TikTok mention by eco-influencer',
                        zh: '生态影响者在TikTok上的病毒式提及'
                    },
                    description: {
                        en: 'A popular eco-lifestyle TikToker (800K followers) randomly featured your brand in a "sustainable fashion finds" video. The video hit 2.3M views. Your site is getting hammered with traffic.',
                        zh: '一位受欢迎的生态生活方式TikToker（80万粉丝）在"可持续时尚发现"视频中随机展示了你的品牌。视频获得230万观看。你的网站被流量淹没。'
                    },
                    probability: 0.12,
                    impact: 'positive',
                    effect: (game) => {
                        const viralTraffic = Math.floor(Math.random() * 15000) + 10000;
                        const viralOrders = Math.floor(viralTraffic * 0.05); // 5%转化率
                        game.metrics.users += viralTraffic;
                        game.metrics.orders += viralOrders;
                        game.metrics.revenue += viralOrders * game.metrics.avgOrderValue;
                        game.metrics.instagramFollowers += 5800;

                        return {
                            en: `VIRAL MOMENT! +${viralTraffic} visitors, +${viralOrders} orders in 48 hours. Revenue spike: +$${Math.floor(viralOrders * game.metrics.avgOrderValue)}. Instagram followers: +5.8K. Strike while it's hot!`,
                            zh: `病毒时刻！48小时内+${viralTraffic}访问者，+${viralOrders}订单。收入激增：+${Math.floor(viralOrders * game.metrics.avgOrderValue)}美元。Instagram粉丝：+5800。趁热打铁！`
                        };
                    }
                },
                {
                    name: {
                        en: 'Supplier quality crisis',
                        zh: '供应商质量危机'
                    },
                    description: {
                        en: 'Your main supplier shipped 200 defective items. Customers are complaining on social media about poor stitching and fading colors. 34 refund requests in 3 days. Your rating dropped from 4.8 to 3.2 stars.',
                        zh: '你的主要供应商发货了200件次品。客户在社交媒体上抱怨缝线差和颜色褪色。3天内34个退款请求。你的评分从4.8星降至3.2星。'
                    },
                    probability: 0.18,
                    impact: 'negative',
                    effect: (game) => {
                        const refundCost = 34 * game.metrics.avgOrderValue;
                        const lostRevenue = Math.floor(game.metrics.revenue * 0.15);
                        game.metrics.budget -= refundCost;
                        game.metrics.revenue -= lostRevenue;
                        game.metrics.conversionRate -= 0.8;

                        return {
                            en: `Quality crisis! Issued 34 refunds ($${refundCost}). Lost trust = -${lostRevenue} revenue. Conversion dropped 0.8%. Lesson: Always order samples and do quality checks. Switched to reliable supplier.`,
                            zh: `质量危机！发放34个退款（${refundCost}美元）。失去信任 = -${lostRevenue}收入。转化率下降0.8%。教训：始终订购样品并进行质量检查。切换到可靠供应商。`
                        };
                    }
                }
            ],
            victoryConditions: {
                primary: {
                    en: 'Reach $25,000 monthly revenue with positive unit economics (CAC < LTV)',
                    zh: '达到25000美元月收入且单位经济为正（CAC < LTV）'
                },
                secondary: {
                    en: 'Reduce cart abandonment to <50% and achieve 3%+ conversion rate',
                    zh: '将购物车放弃率降至<50%，并实现3%+转化率'
                },
                metrics: {
                    revenue: 25000,
                    cacLtvRatio: 0.8, // CAC应该是LTV的80%或更低
                    cartAbandonmentRate: 50,
                    conversionRate: 3.0
                }
            },
            inspirationNote: {
                en: 'Inspired by Allbirds\' sustainable fashion success: $100M in 2 years using UGC + influencer strategy.',
                zh: '受Allbirds可持续时尚成功启发：2年内通过UGC+影响者策略达到1亿美元。'
            }
        },

        {
            id: 'social-media-app',
            tier: 1,
            name: {
                en: 'Social Media App for Book Lovers',
                zh: '读书爱好者社交应用'
            },
            industry: 'Social Media',
            difficulty: 'easy',
            backstory: {
                en: 'BookCircle is your mobile app - "Goodreads meets Instagram". Users can share book reviews with photos, follow friends, join reading clubs. After 4 months: 8,340 downloads, 1,203 MAU (14% retention), 6.2 avg daily sessions per active user. The product is sticky for those who stay, but most users churn after adding 1-2 books. No monetization yet. Venture capitalists want to see 100K users before Series A. What\'s your viral growth plan?',
                zh: 'BookCircle是你的移动应用 - "Goodreads遇上Instagram"。用户可以分享带照片的书评，关注朋友，加入读书俱乐部。4个月后：8340次下载，1203月活跃用户（14%留存），活跃用户平均每天6.2次会话。产品对留下来的用户很有粘性，但大多数用户在添加1-2本书后流失。尚无变现。风险投资人希望在A轮前看到10万用户。你的病毒式增长计划是什么？'
            },
            startingMetrics: {
                users: 8340, // 总下载量
                activeUsers: 1203, // 月活跃用户
                revenue: 0,
                budget: 12000,
                retention7d: 14,
                retention30d: 8,
                dailyActiveUsers: 340,
                avgSessionsPerDay: 6.2,
                viralCoefficient: 0.12, // 每个用户平均邀请0.12个新用户
                appStoreRating: 4.6,
                reviewCount: 127
            },
            uniqueChallenges: [
                {
                    en: 'Low retention: 86% of users churn after first week',
                    zh: '低留存：86%的用户在第一周后流失'
                },
                {
                    en: 'Viral coefficient of 0.12 (need >1.0 for exponential growth)',
                    zh: '病毒系数0.12（需要>1.0才能实现指数增长）'
                },
                {
                    en: 'Zero revenue - VCs questioning business model',
                    zh: '零收入 - 风投质疑商业模式'
                }
            ],
            specialSkills: [
                {
                    name: {
                        en: 'Reading Challenge Game',
                        zh: '阅读挑战游戏'
                    },
                    description: {
                        en: 'Launch "52 Books in 52 Weeks" challenge with badges, leaderboards, and weekly reminders. Gamification inspired by Duolingo\'s streak system (increased DAU by 300%).',
                        zh: '发起"52周读52本书"挑战，包含徽章、排行榜和每周提醒。游戏化受Duolingo连续打卡系统启发（DAU增长300%）。'
                    },
                    icon: '🏆',
                    aarrr: 'Retention',
                    cost: 2500,
                    timeframe: '3周',
                    effectiveness: 0.88,
                    execute: (game) => {
                        game.metrics.retention7d += 28; // 从14%到42%
                        game.metrics.retention30d += 18; // 从8%到26%
                        game.metrics.avgSessionsPerDay += 3.1; // 从6.2到9.3
                        const newActiveUsers = Math.floor(game.metrics.users * 0.25);
                        game.metrics.activeUsers = newActiveUsers;
                        game.metrics.budget -= 2500;
                        game.currentWeek += 3;

                        return {
                            success: true,
                            feedback: {
                                en: `Challenge went viral! 7-day retention: 14%→42%, 30-day: 8%→26%. MAU: ${newActiveUsers}. "I'm reading more than ever!" - User testimonials. App Store ranking: #89→#12 in Books category.`,
                                zh: `挑战病毒传播！7日留存：14%→42%，30日：8%→26%。月活跃用户：${newActiveUsers}。"我读书比以往任何时候都多！" - 用户感言。App Store排名：图书类#89→#12。`
                            },
                            changes: [
                                { label: '7日留存 7d Retention', oldValue: 14, newValue: game.metrics.retention7d, delta: 28, unit: '%' },
                                { label: '30日留存 30d Retention', oldValue: 8, newValue: game.metrics.retention30d, delta: 18, unit: '%' },
                                { label: '月活跃 MAU', oldValue: 1203, newValue: newActiveUsers, delta: newActiveUsers - 1203, unit: '' },
                                { label: '每日会话 Daily Sessions', oldValue: 6.2, newValue: game.metrics.avgSessionsPerDay, delta: 3.1, unit: '' }
                            ]
                        };
                    }
                },
                {
                    name: {
                        en: 'Viral Book Recommendation Widget',
                        zh: '病毒式图书推荐小部件'
                    },
                    description: {
                        en: 'Create shareable "My 2026 Reading List" widget for Instagram Stories/TikTok with your app watermark. Inspired by Spotify Wrapped (500M+ shares annually). Each share = free marketing.',
                        zh: '为Instagram Stories/TikTok创建可分享的"我的2026阅读清单"小部件，带有你的应用水印。受Spotify Wrapped启发（每年5亿+分享）。每次分享 = 免费营销。'
                    },
                    icon: '📱',
                    aarrr: 'Referral',
                    cost: 1800,
                    timeframe: '2周',
                    effectiveness: 0.92,
                    execute: (game) => {
                        game.metrics.viralCoefficient += 0.78; // 从0.12到0.90
                        const newDownloads = Math.floor(game.metrics.activeUsers * 2.3); // 每个活跃用户带来2.3个新下载
                        game.metrics.users += newDownloads;
                        game.metrics.activeUsers += Math.floor(newDownloads * 0.14); // 14%转化为活跃
                        game.metrics.budget -= 1800;
                        game.currentWeek += 2;

                        return {
                            success: true,
                            feedback: {
                                en: `Widget explosion! 42% of users shared their reading list. Viral coefficient: 0.12→0.90. +${newDownloads} organic downloads. #BookCircle2026 trending on TikTok. "This widget is aesthetic AF!" - Gen-Z users.`,
                                zh: `小部件爆炸式增长！42%的用户分享了阅读清单。病毒系数：0.12→0.90。+${newDownloads}自然下载。#BookCircle2026在TikTok上成为趋势。"这个小部件太美了！" - Z世代用户。`
                            },
                            changes: [
                                { label: '病毒系数 Viral K', oldValue: 0.12, newValue: game.metrics.viralCoefficient, delta: 0.78, unit: '' },
                                { label: '下载量 Downloads', oldValue: game.metrics.users - newDownloads, newValue: game.metrics.users, delta: newDownloads, unit: '' },
                                { label: '活跃用户 MAU', oldValue: game.metrics.activeUsers - Math.floor(newDownloads * 0.14), newValue: game.metrics.activeUsers, delta: Math.floor(newDownloads * 0.14), unit: '' }
                            ]
                        };
                    }
                },
                {
                    name: {
                        en: 'Book Club Marketplace',
                        zh: '读书俱乐部市场'
                    },
                    description: {
                        en: 'Let influencers/authors create paid book clubs ($9.99/month). You take 30% commission. Creates network effect + revenue. Inspired by Substack\'s creator economy model.',
                        zh: '让影响者/作者创建付费读书俱乐部（9.99美元/月）。你抽取30%佣金。创造网络效应+收入。受Substack创作者经济模式启发。'
                    },
                    icon: '💰',
                    aarrr: 'Revenue',
                    cost: 4000,
                    timeframe: '5周',
                    effectiveness: 0.75,
                    execute: (game) => {
                        const bookClubCreators = Math.floor(game.metrics.activeUsers * 0.02); // 2%活跃用户成为俱乐部创建者
                        const avgMembersPerClub = 45;
                        const monthlyRevenue = bookClubCreators * avgMembersPerClub * 9.99 * 0.30;
                        game.metrics.revenue += monthlyRevenue;
                        game.metrics.retention30d += 15; // 付费用户留存更好
                        game.metrics.budget -= 4000;
                        game.currentWeek += 5;

                        return {
                            success: true,
                            feedback: {
                                en: `Marketplace live! ${bookClubCreators} creators launched clubs. First month revenue: $${Math.floor(monthlyRevenue)}. 30-day retention: +15%. "Finally monetizing my book community!" - Creator testimonial. VCs are impressed.`,
                                zh: `市场上线！${bookClubCreators}位创建者推出俱乐部。首月收入：${Math.floor(monthlyRevenue)}美元。30日留存：+15%。"终于能将我的图书社区变现了！" - 创建者感言。风投印象深刻。`
                            },
                            changes: [
                                { label: '月收入 Monthly Revenue', oldValue: 0, newValue: game.metrics.revenue, delta: Math.floor(monthlyRevenue), unit: '$' },
                                { label: '俱乐部创建者 Club Creators', oldValue: 0, newValue: bookClubCreators, delta: bookClubCreators, unit: '' },
                                { label: '30日留存 30d Retention', oldValue: game.metrics.retention30d - 15, newValue: game.metrics.retention30d, delta: 15, unit: '%' }
                            ]
                        };
                    }
                }
            ],
            specialEvents: [
                {
                    name: {
                        en: 'Best-selling author joins and promotes app',
                        zh: '畅销书作者加入并推广应用'
                    },
                    description: {
                        en: 'A New York Times bestselling author (2.1M Twitter followers) joined BookCircle and tweeted: "Found my new favorite reading community! 📚✨ @BookCircleApp #ReadingCommunity". Their fans are flooding in.',
                        zh: '一位《纽约时报》畅销书作者（210万Twitter粉丝）加入BookCircle并发推："找到了我最喜欢的阅读社区！📚✨ @BookCircleApp #读书社区"。他们的粉丝蜂拥而至。'
                    },
                    probability: 0.15,
                    impact: 'positive',
                    effect: (game) => {
                        const newDownloads = Math.floor(Math.random() * 12000) + 8000;
                        const newMAU = Math.floor(newDownloads * 0.18); // 18%转化为活跃
                        game.metrics.users += newDownloads;
                        game.metrics.activeUsers += newMAU;
                        game.metrics.appStoreRating += 0.2;
                        game.metrics.reviewCount += 456;

                        return {
                            en: `Celebrity endorsement! +${newDownloads} downloads in 3 days. MAU: +${newMAU}. App Store rating: 4.6→4.8. Featured in "Apps We Love". This is your breakthrough moment!`,
                            zh: `名人代言！3天内+${newDownloads}次下载。月活跃：+${newMAU}。App Store评分：4.6→4.8。入选"我们喜爱的应用"。这是你的突破时刻！`
                        };
                    }
                },
                {
                    name: {
                        en: 'App Store policy change threatens business model',
                        zh: 'App Store政策变化威胁商业模式'
                    },
                    description: {
                        en: 'Apple announced new policies: All in-app communities must use Apple\'s payment system (30% fee) or face removal. Your book club marketplace economics don\'t work with 30% to Apple + 30% to you. Only 40% left for creators.',
                        zh: 'Apple宣布新政策：所有应用内社区必须使用Apple的支付系统（30%费用）或面临下架。你的读书俱乐部市场经济在30%给Apple + 30%给你的情况下无法运作。创建者只剩40%。'
                    },
                    probability: 0.10,
                    impact: 'negative',
                    effect: (game) => {
                        // 你必须选择：降低你的佣金比例或失去创建者
                        const revenueImpact = game.metrics.revenue * 0.50; // 收入减半
                        game.metrics.revenue -= revenueImpact;

                        return {
                            en: `Policy crisis! Reduced your commission from 30% to 15% to keep creators. Revenue: -50%. But retained all ${Math.floor(game.metrics.activeUsers * 0.02)} creators. Exploring alternative monetization: premium memberships.`,
                            zh: `政策危机！将你的佣金从30%降至15%以留住创建者。收入：-50%。但保留了所有${Math.floor(game.metrics.activeUsers * 0.02)}位创建者。探索替代变现：高级会员。`
                        };
                    }
                }
            ],
            victoryConditions: {
                primary: {
                    en: 'Reach 100,000 downloads and 15,000 MAU',
                    zh: '达到10万次下载和1.5万月活跃用户'
                },
                secondary: {
                    en: 'Achieve viral coefficient >1.0 and generate $10K+ monthly revenue',
                    zh: '实现病毒系数>1.0并产生1万美元+月收入'
                },
                metrics: {
                    users: 100000,
                    activeUsers: 15000,
                    viralCoefficient: 1.0,
                    revenue: 10000
                }
            },
            inspirationNote: {
                en: 'Inspired by Clubhouse\'s explosive growth: 0 to 10M users in 10 months through viral invite-only model.',
                zh: '受Clubhouse爆炸式增长启发：通过病毒式仅邀请模式10个月从0到1000万用户。'
            }
        }
    ],

    // ==================== TIER 2: 中级场景 ====================

    tier2: [
        {
            id: 'edtech-language',
            tier: 2,
            name: {
                en: 'EdTech Language Learning Platform',
                zh: '在线语言学习平台'
            },
            industry: 'Education',
            difficulty: 'medium',
            backstory: {
                en: 'LingoAI is your AI-powered language learning platform targeting business professionals. You offer English, Spanish, Mandarin, and French courses with AI conversation partners. After 10 months: 12,450 sign-ups, 3,890 MAU (31% retention), $18,200 MRR. Competing with Duolingo (free) and Rosetta Stone (premium). Your USP is "Learn business language in 3 months". But completion rate is only 12% - most users quit after Week 2. Enterprise sales pipeline is empty. How do you achieve product-market fit and scale?',
                zh: 'LingoAI是你的AI驱动语言学习平台，目标客户是商业专业人士。你提供英语、西班牙语、普通话和法语课程，配有AI对话伙伴。10个月后：12450个注册，3890月活跃用户（31%留存），18200美元月经常性收入。与Duolingo（免费）和Rosetta Stone（高端）竞争。你的独特卖点是"3个月学会商务语言"。但完成率只有12% - 大多数用户在第2周后退出。企业销售管道为空。你如何实现产品市场契合并扩大规模？'
            },
            startingMetrics: {
                users: 12450,
                activeUsers: 3890,
                revenue: 18200,
                budget: 45000,
                retention7d: 45,
                retention30d: 31,
                completionRate: 12,
                avgSubscriptionPrice: 29,
                churnRate: 8.5,
                enterpriseLeads: 3,
                b2bRevenue: 0,
                aiAccuracy: 78,
                userSatisfaction: 6.8 // out of 10
            },
            uniqueChallenges: [
                {
                    en: 'Low course completion (12%) - content isn\'t sticky enough',
                    zh: '低课程完成率（12%）- 内容粘性不够'
                },
                {
                    en: 'Zero enterprise revenue - missing out on high-value B2B market',
                    zh: '零企业收入 - 错过高价值B2B市场'
                },
                {
                    en: 'Competing with Duolingo\'s free gamified model',
                    zh: '与Duolingo的免费游戏化模式竞争'
                }
            ],
            specialSkills: [
                {
                    name: {
                        en: 'Weekly AI Video Call Challenges',
                        zh: '每周AI视频通话挑战'
                    },
                    description: {
                        en: 'Launch "3-Minute Business Conversation" weekly challenges. AI evaluates pronunciation, vocabulary, confidence. Leaderboard + LinkedIn badges for top performers. Inspired by how Peloton creates accountability.',
                        zh: '推出"3分钟商务对话"每周挑战。AI评估发音、词汇、自信度。排行榜+LinkedIn徽章给顶级表现者。受Peloton创造责任感的方式启发。'
                    },
                    icon: '🎥',
                    aarrr: 'Retention',
                    cost: 8000,
                    timeframe: '4周',
                    effectiveness: 0.82,
                    execute: (game) => {
                        game.metrics.completionRate += 23; // 从12%到35%
                        game.metrics.retention30d += 18; // 从31%到49%
                        game.metrics.avgSessionsPerWeek = (game.metrics.avgSessionsPerWeek || 3.2) + 2.1;
                        game.metrics.userSatisfaction += 1.8; // 从6.8到8.6
                        game.metrics.budget -= 8000;
                        game.currentWeek += 4;

                        return {
                            success: true,
                            feedback: {
                                en: `Challenge momentum! Completion rate: 12%→35%. Retention: 31%→49%. "The AI calls force me to practice - I'm actually getting fluent!" Top users sharing LinkedIn badges = free marketing.`,
                                zh: `挑战势头强劲！完成率：12%→35%。留存：31%→49%。"AI通话迫使我练习 - 我真的变流利了！"顶级用户分享LinkedIn徽章 = 免费营销。`
                            },
                            changes: [
                                { label: '完成率 Completion', oldValue: 12, newValue: game.metrics.completionRate, delta: 23, unit: '%' },
                                { label: '30日留存 Retention', oldValue: 31, newValue: game.metrics.retention30d, delta: 18, unit: '%' },
                                { label: '满意度 Satisfaction', oldValue: 6.8, newValue: game.metrics.userSatisfaction, delta: 1.8, unit: '/10' }
                            ]
                        };
                    }
                },
                {
                    name: {
                        en: 'Enterprise B2B Playbook',
                        zh: '企业B2B销售策略'
                    },
                    description: {
                        en: 'Package corporate training: "Upskill Your Global Team in 90 Days". Create case studies, ROI calculator, team dashboard. Outbound to Fortune 500 HR departments. Inspired by how Grammarly scaled to $400M ARR via B2B.',
                        zh: '打包企业培训："90天提升全球团队技能"。创建案例研究、ROI计算器、团队仪表板。向财富500强人力资源部门主动销售。受Grammarly通过B2B扩展到4亿美元年经常性收入的方式启发。'
                    },
                    icon: '🏢',
                    aarrr: 'Revenue',
                    cost: 12000,
                    timeframe: '8周',
                    effectiveness: 0.78,
                    execute: (game) => {
                        const enterpriseDeals = Math.floor(Math.random() * 4) + 3; // 3-7个企业客户
                        const avgDealSize = 15000; // 每个企业每月15000美元
                        game.metrics.enterpriseLeads += 12;
                        game.metrics.b2bRevenue += enterpriseDeals * avgDealSize;
                        game.metrics.revenue += enterpriseDeals * avgDealSize;
                        game.metrics.users += enterpriseDeals * 120; // 每个企业平均120个用户
                        game.metrics.budget -= 12000;
                        game.currentWeek += 8;

                        return {
                            success: true,
                            feedback: {
                                en: `B2B breakthrough! Closed ${enterpriseDeals} enterprise deals. New MRR: +$${enterpriseDeals * avgDealSize}. "Our international team's communication improved 40% in 2 months" - Fortune 500 VP HR. Pipeline: 12 more leads.`,
                                zh: `B2B突破！关闭${enterpriseDeals}个企业交易。新月经常性收入：+${enterpriseDeals * avgDealSize}美元。"我们国际团队的沟通在2个月内提升了40%" - 财富500强人力资源副总裁。管道：12个更多线索。`
                            },
                            changes: [
                                { label: 'B2B收入 B2B Revenue', oldValue: 0, newValue: game.metrics.b2bRevenue, delta: enterpriseDeals * avgDealSize, unit: '$' },
                                { label: '企业客户 Enterprise Deals', oldValue: 0, newValue: enterpriseDeals, delta: enterpriseDeals, unit: '' },
                                { label: '总收入 Total Revenue', oldValue: 18200, newValue: game.metrics.revenue, delta: enterpriseDeals * avgDealSize, unit: '$' }
                            ]
                        };
                    }
                },
                {
                    name: {
                        en: 'Industry-Specific Micro-Courses',
                        zh: '行业特定微课程'
                    },
                    description: {
                        en: 'Create vertical courses: "Medical Spanish for Doctors", "Tech Chinese for Engineers", "Legal French for Lawyers". Niche positioning = premium pricing + less competition. Inspired by Courseera\'s specialization model.',
                        zh: '创建垂直课程："医生的医疗西班牙语"、"工程师的科技中文"、"律师的法律法语"。利基定位 = 溢价定价 + 减少竞争。受Coursera专业化模式启发。'
                    },
                    icon: '🎯',
                    aarrr: 'Acquisition',
                    cost: 15000,
                    timeframe: '6周',
                    effectiveness: 0.85,
                    execute: (game) => {
                        const newNicheUsers = Math.floor(game.metrics.users * 0.35);
                        const premiumPrice = 79; // vs 29美元标准价格
                        game.metrics.users += newNicheUsers;
                        game.metrics.avgSubscriptionPrice = 42; // 混合价格上升
                        game.metrics.revenue += newNicheUsers * 0.08 * premiumPrice; // 8%转化率
                        game.metrics.churnRate -= 2.5; // 利基用户流失更少
                        game.metrics.budget -= 15000;
                        game.currentWeek += 6;

                        return {
                            success: true,
                            feedback: {
                                en: `Niche domination! Launched 3 industry courses. +${newNicheUsers} highly-targeted users. Avg price: $29→$42. Churn: -2.5%. "Finally, language learning for MY job!" Featured in JAMA for Medical Spanish course.`,
                                zh: `利基主导！推出3门行业课程。+${newNicheUsers}个高度针对性用户。平均价格：29美元→42美元。流失：-2.5%。"终于有针对我工作的语言学习了！"医疗西班牙语课程在JAMA上展示。`
                            },
                            changes: [
                                { label: '用户数 Users', oldValue: game.metrics.users - newNicheUsers, newValue: game.metrics.users, delta: newNicheUsers, unit: '' },
                                { label: '平均价格 Avg Price', oldValue: 29, newValue: game.metrics.avgSubscriptionPrice, delta: 13, unit: '$' },
                                { label: '流失率 Churn', oldValue: game.metrics.churnRate + 2.5, newValue: game.metrics.churnRate, delta: -2.5, unit: '%' }
                            ]
                        };
                    }
                }
            ],
            specialEvents: [
                {
                    name: {
                        en: 'Duolingo launches competing business English course',
                        zh: 'Duolingo推出竞争性商务英语课程'
                    },
                    description: {
                        en: 'Duolingo just launched "Business English" - completely free with ads. Their 500M user base gets notified. Your growth rate drops from 15% to 3% overnight. Investors are nervous. You need to differentiate FAST.',
                        zh: 'Duolingo刚推出"商务英语" - 完全免费带广告。他们5亿用户群收到通知。你的增长率一夜之间从15%降至3%。投资者紧张。你需要快速差异化。'
                    },
                    probability: 0.20,
                    impact: 'negative',
                    effect: (game) => {
                        const userLoss = Math.floor(game.metrics.activeUsers * 0.18);
                        const revenueLoss = Math.floor(game.metrics.revenue * 0.15);
                        game.metrics.activeUsers -= userLoss;
                        game.metrics.revenue -= revenueLoss;
                        game.metrics.churnRate += 4.2;

                        return {
                            en: `Competitive threat! Lost ${userLoss} users to Duolingo. Revenue: -$${revenueLoss}. Churn: +4.2%. Pivot to your strengths: AI 1-on-1 coaching, industry-specific content, enterprise training. Free can't beat personalized.`,
                            zh: `竞争威胁！向Duolingo流失${userLoss}个用户。收入：-${revenueLoss}美元。流失：+4.2%。转向你的优势：AI 1对1辅导、行业特定内容、企业培训。免费无法击败个性化。`
                        };
                    }
                },
                {
                    name: {
                        en: 'LinkedIn partnership opportunity',
                        zh: 'LinkedIn合作机会'
                    },
                    description: {
                        en: 'LinkedIn Learning reached out: "Partner with us to offer LingoAI courses to our 850M members. You get 60% revenue share + exposure to enterprise clients." This could be your Series A moment.',
                        zh: 'LinkedIn Learning联系你："与我们合作，向我们8.5亿会员提供LingoAI课程。你获得60%收入分成+企业客户曝光。"这可能是你的A轮时刻。'
                    },
                    probability: 0.12,
                    impact: 'positive',
                    effect: (game) => {
                        const linkedInUsers = Math.floor(Math.random() * 15000) + 10000;
                        const linkedInRevenue = linkedInUsers * 0.04 * 29 * 0.60; // 4%转化，60%分成
                        game.metrics.users += linkedInUsers;
                        game.metrics.revenue += linkedInRevenue;
                        game.metrics.enterpriseLeads += 28;

                        return {
                            en: `MEGA DEAL! LinkedIn partnership signed. +${linkedInUsers} users in first month. Revenue: +$${Math.floor(linkedInRevenue)}. Featured on LinkedIn homepage. Enterprise pipeline: +28 Fortune 500 leads. Series A: HERE WE COME!`,
                            zh: `超级交易！LinkedIn合作伙伴关系签署。首月+${linkedInUsers}用户。收入：+${Math.floor(linkedInRevenue)}美元。在LinkedIn主页展示。企业管道：+28个财富500强线索。A轮：我们来了！`
                        };
                    }
                }
            ],
            victoryConditions: {
                primary: {
                    en: 'Reach $100K MRR with 30%+ from enterprise B2B',
                    zh: '达到10万美元月经常性收入，其中30%+来自企业B2B'
                },
                secondary: {
                    en: 'Achieve 40%+ course completion rate and <5% monthly churn',
                    zh: '实现40%+课程完成率和<5%月流失率'
                },
                metrics: {
                    revenue: 100000,
                    b2bRevenuePercentage: 30,
                    completionRate: 40,
                    churnRate: 5
                }
            },
            inspirationNote: {
                en: 'Inspired by Duolingo ($700M valuation) and Grammarly ($13B valuation) - combination of consumer virality + enterprise revenue.',
                zh: '受Duolingo（7亿美元估值）和Grammarly（130亿美元估值）启发 - 消费者病毒性+企业收入的结合。'
            }
        },

        {
            id: 'fintech-neobank',
            tier: 2,
            name: {
                en: 'Neobank for Freelancers',
                zh: '自由职业者数字银行'
            },
            industry: 'FinTech',
            difficulty: 'medium',
            backstory: {
                en: 'FreelancePay is your digital bank designed for freelancers and gig workers. Features: instant payments, expense tracking, invoicing, tax automation. After 14 months: 18,900 sign-ups, 6,340 active users (34% activation), $127K deposits, $8,900 revenue (interchange fees + subscriptions). The problem: Most users sign up but never deposit money. Your "aha moment" is when users receive their first client payment via your platform. But only 19% reach that moment. How do you grow deposits and become users\' primary bank account?',
                zh: 'FreelancePay是你为自由职业者和零工工作者设计的数字银行。功能：即时支付、费用跟踪、开票、税务自动化。14个月后：18900个注册，6340个活跃用户（34%激活），12.7万美元存款，8900美元收入（交换费+订阅）。问题：大多数用户注册但从不存钱。你的"啊哈时刻"是当用户通过你的平台收到第一笔客户付款时。但只有19%达到那个时刻。你如何增长存款并成为用户的主要银行账户？'
                            },
            startingMetrics: {
                users: 18900,
                activeUsers: 6340,
                revenue: 8900,
                budget: 80000,
                deposits: 127000,
                avgDepositPerUser: 20, // 127K / 6.34K
                activation: 34, // 注册到首次存款
                ahaUserPercentage: 19, // 收到首次客户付款的用户
                monthlyActiveUsers: 4200,
                revenuePerUser: 1.40, // 8900 / 6340
                subscriptionRevenue: 3200,
                interchangeRevenue: 5700
            },
            uniqueChallenges: [
                {
                    en: 'Low activation: 66% of users never deposit money',
                    zh: '低激活：66%的用户从不存钱'
                },
                {
                    en: 'Only 19% reach "aha moment" (first client payment received)',
                    zh: '只有19%达到"啊哈时刻"（收到首次客户付款）'
                },
                {
                    en: 'Competing with established players (Chase, Wise, PayPal)',
                    zh: '与老牌玩家竞争（Chase、Wise、PayPal）'
                }
            ],
            specialSkills: [
                {
                    name: {
                        en: 'Shareable Invoice Payment Links',
                        zh: '可分享发票支付链接'
                    },
                    description: {
                        en: 'Create branded payment links freelancers can send to clients: "Pay [Name] via FreelancePay - 0% fees for first $10K". Each payment = new user acquisition. Inspired by Stripe\'s payment link virality.',
                        zh: '创建自由职业者可以发送给客户的品牌支付链接："通过FreelancePay支付[姓名] - 前1万美元0%费用"。每次支付 = 新用户获取。受Stripe支付链接病毒性启发。'
                    },
                    icon: '💸',
                    aarrr: 'Activation',
                    cost: 6000,
                    timeframe: '3周',
                    effectiveness: 0.88,
                    execute: (game) => {
                        game.metrics.ahaUserPercentage += 28; // 从19%到47%
                        game.metrics.activation += 22; // 从34%到56%
                        const newActivatedUsers = Math.floor(game.metrics.users * 0.22);
                        game.metrics.activeUsers += newActivatedUsers;
                        game.metrics.deposits += newActivatedUsers * 850; // 平均首次付款
                        game.metrics.budget -= 6000;
                        game.currentWeek += 3;

                        return {
                            success: true,
                            feedback: {
                                en: `Payment link magic! Aha moment: 19%→47%. Activation: 34%→56%. "My client paid in 30 seconds - easiest invoice ever!" Viral loop started: Clients see the ease and become users too. Deposits: +$${newActivatedUsers * 850}.`,
                                zh: `支付链接魔法！啊哈时刻：19%→47%。激活：34%→56%。"我的客户30秒内付款 - 最简单的发票！"病毒循环启动：客户看到便利性也成为用户。存款：+${newActivatedUsers * 850}美元。`
                            },
                            changes: [
                                { label: '啊哈时刻 Aha Moment', oldValue: 19, newValue: game.metrics.ahaUserPercentage, delta: 28, unit: '%' },
                                { label: '激活率 Activation', oldValue: 34, newValue: game.metrics.activation, delta: 22, unit: '%' },
                                { label: '存款 Deposits', oldValue: 127000, newValue: game.metrics.deposits, delta: newActivatedUsers * 850, unit: '$' }
                            ]
                        };
                    }
                },
                {
                    name: {
                        en: 'Tax Savings Automation',
                        zh: '税务节省自动化'
                    },
                    description: {
                        en: 'Auto-save 25% of every payment to a "Tax Vault". Send quarterly reminders with tax estimates. Freelancers\' #1 pain = tax surprises. Inspired by Qapital\'s automated savings rules (3x retention boost).',
                        zh: '每次付款自动保存25%到"税务金库"。发送季度提醒和税务估算。自由职业者的#1痛点 = 税务意外。受Qapital自动储蓄规则启发（留存提升3倍）。'
                    },
                    icon: '🏦',
                    aarrr: 'Retention',
                    cost: 8000,
                    timeframe: '4周',
                    effectiveness: 0.85,
                    execute: (game) => {
                        game.metrics.retention30d = (game.metrics.retention30d || 42) + 23;
                        game.metrics.deposits += Math.floor(game.metrics.deposits * 0.85); // 存款增加85%
                        game.metrics.avgDepositPerUser = Math.floor(game.metrics.deposits / game.metrics.activeUsers);
                        game.metrics.subscriptionRevenue += 2100; // 更多用户升级到付费
                        game.metrics.budget -= 8000;
                        game.currentWeek += 4;

                        return {
                            success: true,
                            feedback: {
                                en: `Tax automation wins! Deposits: +85% (users keeping money in the platform). 30-day retention: +23%. "Saved me from a $8K tax shock - FreelancePay is my financial safety net!" Average deposit per user doubled.`,
                                zh: `税务自动化获胜！存款：+85%（用户将钱保留在平台中）。30日留存：+23%。"让我免于8000美元税务冲击 - FreelancePay是我的财务安全网！"每用户平均存款翻倍。`
                            },
                            changes: [
                                { label: '存款 Deposits', oldValue: game.metrics.deposits - Math.floor(game.metrics.deposits * 0.85 / 1.85), newValue: game.metrics.deposits, delta: Math.floor(game.metrics.deposits * 0.85 / 1.85), unit: '$' },
                                { label: '30日留存 Retention', oldValue: 42, newValue: game.metrics.retention30d, delta: 23, unit: '%' },
                                { label: '订阅收入 Sub Revenue', oldValue: 3200, newValue: game.metrics.subscriptionRevenue, delta: 2100, unit: '$' }
                            ]
                        };
                    }
                },
                {
                    name: {
                        en: 'Freelancer Community Marketplace',
                        zh: '自由职业者社区市场'
                    },
                    description: {
                        en: 'Build marketplace: Freelancers can find clients, clients can find freelancers. You take 5% commission. Creates stickiness + network effects. Inspired by how Wise grew to $7B valuation with peer-to-peer model.',
                        zh: '构建市场：自由职业者可以找到客户，客户可以找到自由职业者。你抽取5%佣金。创造粘性+网络效应。受Wise如何通过P2P模式增长到70亿美元估值的启发。'
                    },
                    icon: '🤝',
                    aarrr: 'Revenue',
                    cost: 18000,
                    timeframe: '8周',
                    effectiveness: 0.75,
                    execute: (game) => {
                        const marketplaceTransactions = Math.floor(game.metrics.activeUsers * 0.12); // 12%用户通过市场获得工作
                        const avgJobValue = 2500;
                        const marketplaceRevenue = marketplaceTransactions * avgJobValue * 0.05;
                        game.metrics.revenue += marketplaceRevenue;
                        game.metrics.deposits += marketplaceTransactions * avgJobValue;
                        game.metrics.users += marketplaceTransactions * 3; // 每个工作平均吸引3个新用户
                        game.metrics.budget -= 18000;
                        game.currentWeek += 8;

                        return {
                            success: true,
                            feedback: {
                                en: `Marketplace launch! ${marketplaceTransactions} jobs completed in first 2 months. Revenue: +$${Math.floor(marketplaceRevenue)}. "Found 3 new clients through FreelancePay!" Network effects kicking in. Deposits surging.`,
                                zh: `市场推出！前2个月完成${marketplaceTransactions}个工作。收入：+${Math.floor(marketplaceRevenue)}美元。"通过FreelancePay找到3个新客户！"网络效应开始发挥作用。存款激增。`
                            },
                            changes: [
                                { label: '市场收入 Marketplace Rev', oldValue: 0, newValue: Math.floor(marketplaceRevenue), delta: Math.floor(marketplaceRevenue), unit: '$' },
                                { label: '存款 Deposits', oldValue: game.metrics.deposits - (marketplaceTransactions * avgJobValue), newValue: game.metrics.deposits, delta: marketplaceTransactions * avgJobValue, unit: '$' },
                                { label: '用户数 Users', oldValue: game.metrics.users - (marketplaceTransactions * 3), newValue: game.metrics.users, delta: marketplaceTransactions * 3, unit: '' }
                            ]
                        };
                    }
                }
            ],
            specialEvents: [
                {
                    name: {
                        en: 'Banking regulation audit',
                        zh: '银行监管审计'
                    },
                    description: {
                        en: 'Federal regulators are auditing your banking partner due to compliance issues. Your deposits are frozen for 30 days pending review. Users can\'t withdraw money. Twitter is exploding with angry tweets. Trust crisis.',
                        zh: '联邦监管机构因合规问题审计你的银行合作伙伴。你的存款被冻结30天等待审查。用户无法提取资金。Twitter上充满愤怒的推文。信任危机。'
                    },
                    probability: 0.15,
                    impact: 'negative',
                    effect: (game) => {
                        const userChurn = Math.floor(game.metrics.activeUsers * 0.35);
                        const depositLoss = Math.floor(game.metrics.deposits * 0.42);
                        game.metrics.activeUsers -= userChurn;
                        game.metrics.deposits -= depositLoss;
                        game.metrics.revenue -= Math.floor(game.metrics.revenue * 0.30);

                        return {
                            en: `CRISIS! Audit caused panic. Lost ${userChurn} users and $${depositLoss} in deposits. Lesson: Diversify banking partners. You issued transparent updates, offered compensation, switched to more reliable partner. Rebuilding trust.`,
                            zh: `危机！审计引起恐慌。流失${userChurn}用户和${depositLoss}美元存款。教训：多样化银行合作伙伴。你发布透明更新，提供补偿，切换到更可靠的合作伙伴。重建信任。`
                        };
                    }
                },
                {
                    name: {
                        en: 'Partnership with Upwork',
                        zh: '与Upwork合作'
                    },
                    description: {
                        en: 'Upwork (12M freelancers) offers integration: "Get paid instantly via FreelancePay - no 5-day wait". You pay them $50K for featured placement. Could be a rocket ship moment if conversion is good.',
                        zh: 'Upwork（1200万自由职业者）提供集成："通过FreelancePay即时获得报酬 - 无需等待5天"。你支付他们5万美元获得特色展示。如果转化率好，这可能是火箭时刻。'
                    },
                    probability: 0.10,
                    impact: 'positive',
                    effect: (game) => {
                        if (game.metrics.budget >= 50000) {
                            const newUpworkUsers = Math.floor(Math.random() * 8000) + 5000;
                            const activationRate = 0.52; // 比平均34%高
                            const newActiveUsers = Math.floor(newUpworkUsers * activationRate);
                            game.metrics.users += newUpworkUsers;
                            game.metrics.activeUsers += newActiveUsers;
                            game.metrics.deposits += newActiveUsers * 1200;
                            game.metrics.budget -= 50000;

                            return {
                                en: `UPWORK DEAL! +${newUpworkUsers} sign-ups, 52% activated (vs 34% avg). Deposits: +$${newActiveUsers * 1200}. "Finally getting paid same-day!" Featured in Upwork's newsletter to 12M freelancers. ROI: 3.5x in first month.`,
                                zh: `UPWORK交易！+${newUpworkUsers}注册，52%激活（vs 34%平均）。存款：+${newActiveUsers * 1200}美元。"终于可以当天获得报酬！"在Upwork的1200万自由职业者通讯中展示。ROI：首月3.5倍。`
                            };
                        } else {
                            return {
                                en: `Missed opportunity! Upwork deal required $50K but you only have $${game.metrics.budget}. They went with a competitor. Lesson: Keep cash reserves for strategic partnerships.`,
                                zh: `错过机会！Upwork交易需要5万美元但你只有${game.metrics.budget}美元。他们选择了竞争对手。教训：为战略合作保留现金储备。`
                            };
                        }
                    }
                }
            ],
            victoryConditions: {
                primary: {
                    en: 'Reach $2M in deposits and $50K monthly revenue',
                    zh: '达到200万美元存款和5万美元月收入'
                },
                secondary: {
                    en: 'Achieve 60%+ activation rate and 50%+ users reaching aha moment',
                    zh: '实现60%+激活率和50%+用户达到啊哈时刻'
                },
                metrics: {
                    deposits: 2000000,
                    revenue: 50000,
                    activation: 60,
                    ahaUserPercentage: 50
                }
            },
            inspirationNote: {
                en: 'Inspired by Chime ($25B valuation) and Wise ($7B valuation) - focus on underserved niche + viral payment mechanics.',
                zh: '受Chime（250亿美元估值）和Wise（70亿美元估值）启发 - 专注于服务不足的利基市场+病毒式支付机制。'
            }
        }

        ,

        {
            id: 'marketplace-housing',
            tier: 2,
            name: {
                en: 'Housing Rental Marketplace',
                zh: '租房市场平台'
            },
            industry: 'Marketplace',
            difficulty: 'medium',
            backstory: {
                en: 'RentEasy connects renters with landlords - "Airbnb for long-term rentals". After 18 months: 24,560 listings, 89,200 users, 1,240 completed rentals, $186K revenue (4% commission). The classic marketplace problem: Which side to grow first? Landlords complain about low quality leads. Renters complain about limited inventory. You\'re burning $35K/month on Facebook ads for both sides. How do you solve the chicken-and-egg problem and achieve liquidity?',
                zh: 'RentEasy连接租客与房东 - "长期租赁的Airbnb"。18个月后：24560个房源，89200个用户，1240个完成的租赁，18.6万美元收入（4%佣金）。经典的市场问题：先增长哪一边？房东抱怨潜在客户质量低。租客抱怨房源有限。你每月在Facebook广告上为两边烧3.5万美元。你如何解决鸡蛋问题并实现流动性？'
            },
            startingMetrics: {
                users: 89200, // 总用户
                listings: 24560, // 房源
                landlords: 8200,
                renters: 81000,
                completedRentals: 1240,
                revenue: 186000,
                budget: 120000,
                avgCommission: 150, // 平均每笔交易佣金
                conversionRate: 1.4, // 用户到租赁转化
                marketplaceLiquidity: 28, // 流动性得分（越高越好，满分100）
                avgResponseTime: 18, // 房东响应时间（小时）
                repeatRenterRate: 8 // 回头客比例
            },
            uniqueChallenges: [
                {
                    en: 'Classic two-sided marketplace problem: Need supply to attract demand, need demand to attract supply',
                    zh: '经典双边市场问题：需要供给吸引需求，需要需求吸引供给'
                },
                {
                    en: 'Low liquidity (28/100) - most searches return <3 relevant results',
                    zh: '低流动性（28/100）- 大多数搜索返回<3个相关结果'
                },
                {
                    en: 'High CAC on both sides - burning money unsustainably',
                    zh: '双方高CAC - 不可持续地烧钱'
                }
            ],
            specialSkills: [
                {
                    name: {
                        en: 'Supply-Side Blitz: Landlord Referral Program',
                        zh: '供给侧闪电战：房东推荐计划'
                    },
                    description: {
                        en: 'Pay landlords $200 for each landlord they refer. Focus on multi-property owners (1 owner = 20+ listings). Inspired by Uber\'s driver referral program that fueled 10x growth.',
                        zh: '为每位推荐的房东支付200美元。专注于多物业业主（1个业主 = 20+房源）。受Uber司机推荐计划推动10倍增长的启发。'
                    },
                    icon: '🏘️',
                    aarrr: 'Acquisition',
                    cost: 15000,
                    timeframe: '5周',
                    effectiveness: 0.85,
                    execute: (game) => {
                        const newLandlords = Math.floor(game.metrics.landlords * 0.45);
                        const newListings = newLandlords * 3.2; // 平均每个房东3.2个房源
                        game.metrics.landlords += newLandlords;
                        game.metrics.listings += Math.floor(newListings);
                        game.metrics.marketplaceLiquidity += 18; // 从28到46
                        game.metrics.budget -= 15000;
                        game.currentWeek += 5;

                        return {
                            success: true,
                            feedback: {
                                en: `Landlord explosion! +${newLandlords} landlords, +${Math.floor(newListings)} listings. Liquidity: 28→46. "Made $800 referring my landlord friends!" Search results improved dramatically. Renters noticing better inventory.`,
                                zh: `房东激增！+${newLandlords}房东，+${Math.floor(newListings)}房源。流动性：28→46。"推荐房东朋友赚了800美元！"搜索结果显著改善。租客注意到更好的库存。`
                            },
                            changes: [
                                { label: '房东 Landlords', oldValue: game.metrics.landlords - newLandlords, newValue: game.metrics.landlords, delta: newLandlords, unit: '' },
                                { label: '房源 Listings', oldValue: game.metrics.listings - Math.floor(newListings), newValue: game.metrics.listings, delta: Math.floor(newListings), unit: '' },
                                { label: '流动性 Liquidity', oldValue: 28, newValue: game.metrics.marketplaceLiquidity, delta: 18, unit: '/100' }
                            ]
                        };
                    }
                },
                {
                    name: {
                        en: 'Instant Match Algorithm',
                        zh: '即时匹配算法'
                    },
                    description: {
                        en: 'Build ML algorithm that auto-matches renters to top 5 listings based on preferences. Send push notification within 2 minutes of new listing. Inspired by Tinder\'s matching success (26M matches/day).',
                        zh: '构建ML算法，根据偏好自动匹配租客到前5个房源。新房源发布后2分钟内发送推送通知。受Tinder匹配成功启发（每天2600万匹配）。'
                    },
                    icon: '⚡',
                    aarrr: 'Activation',
                    cost: 12000,
                    timeframe: '6周',
                    effectiveness: 0.88,
                    execute: (game) => {
                        game.metrics.conversionRate += 2.8; // 从1.4%到4.2%
                        game.metrics.avgResponseTime -= 12; // 从18小时到6小时
                        const newRentals = Math.floor((game.metrics.renters * 0.042) - game.metrics.completedRentals);
                        game.metrics.completedRentals += newRentals;
                        game.metrics.revenue += newRentals * game.metrics.avgCommission;
                        game.metrics.budget -= 12000;
                        game.currentWeek += 6;

                        return {
                            success: true,
                            feedback: {
                                en: `Matching magic! Conversion: 1.4%→4.2%. Response time: 18hrs→6hrs. +${newRentals} rentals. "Got 5 perfect matches instantly!" Both sides happier. Revenue: +$${newRentals * game.metrics.avgCommission}.`,
                                zh: `匹配魔法！转化：1.4%→4.2%。响应时间：18小时→6小时。+${newRentals}租赁。"立即获得5个完美匹配！"双方更满意。收入：+${newRentals * game.metrics.avgCommission}美元。`
                            },
                            changes: [
                                { label: '转化率 Conversion', oldValue: 1.4, newValue: game.metrics.conversionRate, delta: 2.8, unit: '%' },
                                { label: '响应时间 Response Time', oldValue: 18, newValue: game.metrics.avgResponseTime, delta: -12, unit: 'hrs' },
                                { label: '完成租赁 Rentals', oldValue: game.metrics.completedRentals - newRentals, newValue: game.metrics.completedRentals, delta: newRentals, unit: '' }
                            ]
                        };
                    }
                }
            ],
            specialEvents: [
                {
                    name: {
                        en: 'Competitor raises $50M and launches in your top 3 cities',
                        zh: '竞争对手融资5000万美元并在你的前3个城市推出'
                    },
                    description: {
                        en: 'Well-funded competitor launched with $0 commission for first 6 months. They\'re poaching your landlords with cash bonuses. You\'re losing market share fast in NYC, SF, LA.',
                        zh: '资金充足的竞争对手推出前6个月0佣金。他们用现金奖金挖走你的房东。你在纽约、旧金山、洛杉矶快速失去市场份额。'
                    },
                    probability: 0.18,
                    impact: 'negative',
                    effect: (game) => {
                        const listingsLost = Math.floor(game.metrics.listings * 0.22);
                        const rentersLost = Math.floor(game.metrics.renters * 0.15);
                        game.metrics.listings -= listingsLost;
                        game.metrics.renters -= rentersLost;
                        game.metrics.marketplaceLiquidity -= 8;

                        return {
                            en: `Competition intensified! Lost ${listingsLost} listings, ${rentersLost} renters. Pivot: Double down on 5 mid-sized cities where you're #1. "Quality over quantity" positioning. Network effects still favor you there.`,
                            zh: `竞争加剧！失去${listingsLost}房源，${rentersLost}租客。转向：加倍投入你排名第一的5个中型城市。"质量胜于数量"定位。那里的网络效应仍然有利于你。`
                        };
                    }
                }
            ],
            victoryConditions: {
                primary: {
                    en: 'Achieve 70+ liquidity score and $500K monthly revenue',
                    zh: '实现70+流动性得分和50万美元月收入'
                },
                secondary: {
                    en: 'Complete 5,000+ rentals with 5%+ conversion rate',
                    zh: '完成5000+租赁，转化率5%+'
                },
                metrics: {
                    marketplaceLiquidity: 70,
                    revenue: 500000,
                    completedRentals: 5000,
                    conversionRate: 5
                }
            },
            inspirationNote: {
                en: 'Inspired by Airbnb\'s supply-side focus in early days: "Get 100 great listings in one city before expanding."',
                zh: '受Airbnb早期供给侧专注启发："在扩张前先在一个城市获得100个优质房源。"'
            }
        },

        {
            id: 'gaming-studio',
            tier: 2,
            name: {
                en: 'Indie Mobile Gaming Studio',
                zh: '独立手游工作室'
            },
            industry: 'Gaming',
            difficulty: 'medium',
            backstory: {
                en: 'PixelForge is your indie mobile game studio. Your first game "Dungeon Quest" launched 11 months ago - a puzzle-RPG hybrid. Current stats: 340K downloads, 28K DAU (8% retention), $47K revenue (mostly IAP). The game is fun but monetization is weak. You tried ads but users hate them. Your second game is in development but you need cash flow from Game #1 first. Top 1% of players spend $200+, but 95% never spend anything. How do you improve retention and monetization?',
                zh: 'PixelForge是你的独立手游工作室。你的第一款游戏"地下城探索"11个月前推出 - 一款益智RPG混合游戏。当前数据：34万下载，2.8万日活（8%留存），4.7万美元收入（主要是IAP）。游戏很有趣但变现很弱。你尝试了广告但用户讨厌它们。你的第二款游戏在开发中但你首先需要游戏#1的现金流。前1%的玩家花费200美元+，但95%从不花钱。你如何改善留存和变现？'
            },
            startingMetrics: {
                downloads: 340000,
                dau: 28000,
                mau: 85000,
                revenue: 47000,
                budget: 38000,
                retention1d: 42,
                retention7d: 8,
                retention30d: 3.2,
                avgRevenuePerUser: 0.138, // 47K / 340K
                payingUserPercentage: 5,
                avgRevenuePerPayingUser: 27.65,
                adRevenue: 8000,
                iapRevenue: 39000
            },
            uniqueChallenges: [
                {
                    en: 'Terrible retention: 92% of players quit within first week',
                    zh: '糟糕的留存：92%的玩家在第一周内退出'
                },
                {
                    en: 'Only 5% of players ever spend money',
                    zh: '只有5%的玩家曾经花钱'
                },
                {
                    en: 'Need sustainable revenue to fund next game development',
                    zh: '需要可持续收入来资助下一款游戏开发'
                }
            ],
            specialSkills: [
                {
                    name: {
                        en: 'Battle Pass System',
                        zh: '战斗通行证系统'
                    },
                    description: {
                        en: 'Launch $9.99/season battle pass with exclusive skins, characters, emotes. Creates FOMO + recurring revenue. Inspired by Fortnite\'s $1B+ annual battle pass revenue.',
                        zh: '推出9.99美元/赛季战斗通行证，包含独家皮肤、角色、表情。创造FOMO+经常性收入。受Fortnite年度10亿美元+战斗通行证收入启发。'
                    },
                    icon: '🎮',
                    aarrr: 'Revenue',
                    cost: 8000,
                    timeframe: '4周',
                    effectiveness: 0.88,
                    execute: (game) => {
                        const battlePassBuyers = Math.floor(game.metrics.mau * 0.18); // 18%转化率
                        const battlePassRevenue = battlePassBuyers * 9.99;
                        game.metrics.payingUserPercentage += 13; // 从5%到18%
                        game.metrics.revenue += battlePassRevenue;
                        game.metrics.retention30d += 8.5; // 通行证玩家留存更好
                        game.metrics.budget -= 8000;
                        game.currentWeek += 4;

                        return {
                            success: true,
                            feedback: {
                                en: `Battle Pass hit! ${battlePassBuyers} players bought Season 1. Revenue: +$${Math.floor(battlePassRevenue)}. Paying users: 5%→18%. "Best $10 I've spent on a mobile game!" 30-day retention: +8.5%. Players grinding daily for rewards.`,
                                zh: `战斗通行证命中！${battlePassBuyers}名玩家购买第一赛季。收入：+${Math.floor(battlePassRevenue)}美元。付费用户：5%→18%。"我在手游上花的最值10美元！"30日留存：+8.5%。玩家每天刷奖励。`
                            },
                            changes: [
                                { label: '付费用户 Paying %', oldValue: 5, newValue: game.metrics.payingUserPercentage, delta: 13, unit: '%' },
                                { label: '收入 Revenue', oldValue: game.metrics.revenue - battlePassRevenue, newValue: game.metrics.revenue, delta: Math.floor(battlePassRevenue), unit: '$' },
                                { label: '30日留存 Retention', oldValue: 3.2, newValue: game.metrics.retention30d, delta: 8.5, unit: '%' }
                            ]
                        };
                    }
                },
                {
                    name: {
                        en: 'Daily Quests & Streaks',
                        zh: '每日任务与连胜'
                    },
                    description: {
                        en: 'Add daily quests with escalating rewards. 7-day streak = rare character. 30-day = legendary skin. Gamification inspired by Duolingo\'s streak system (300% DAU increase).',
                        zh: '添加每日任务，奖励递增。7天连胜 = 稀有角色。30天 = 传奇皮肤。游戏化受Duolingo连续打卡系统启发（DAU增加300%）。'
                    },
                    icon: '🔥',
                    aarrr: 'Retention',
                    cost: 5000,
                    timeframe: '3周',
                    effectiveness: 0.92,
                    execute: (game) => {
                        game.metrics.retention1d += 18; // 从42%到60%
                        game.metrics.retention7d += 15; // 从8%到23%
                        game.metrics.retention30d += 6; // 从3.2%到9.2%
                        game.metrics.dau += Math.floor(game.metrics.dau * 0.45);
                        game.metrics.budget -= 5000;
                        game.currentWeek += 3;

                        return {
                            success: true,
                            feedback: {
                                en: `Streak addiction! D1 retention: 42%→60%, D7: 8%→23%, D30: 3.2%→9.2%. DAU: +45%. "Can't break my 28-day streak!" App Store ranking: #234→#47 in RPG category. Addiction (in a good way) achieved.`,
                                zh: `连胜上瘾！D1留存：42%→60%，D7：8%→23%，D30：3.2%→9.2%。DAU：+45%。"不能打破我的28天连胜！"App Store排名：RPG类别#234→#47。实现成瘾（好的方式）。`
                            },
                            changes: [
                                { label: 'D1留存 D1 Retention', oldValue: 42, newValue: game.metrics.retention1d, delta: 18, unit: '%' },
                                { label: 'D7留存 D7 Retention', oldValue: 8, newValue: game.metrics.retention7d, delta: 15, unit: '%' },
                                { label: 'D30留存 D30 Retention', oldValue: 3.2, newValue: game.metrics.retention30d, delta: 6, unit: '%' }
                            ]
                        };
                    }
                }
            ],
            specialEvents: [
                {
                    name: {
                        en: 'Viral TikTok gameplay video',
                        zh: 'TikTok游戏视频病毒传播'
                    },
                    description: {
                        en: 'A gaming influencer (3.2M followers) posted a funny "Dungeon Quest fails" compilation. Video hit 8.7M views. Comments: "What game is this? Looks fun!" Your App Store listing is spiking.',
                        zh: '一位游戏影响者（320万粉丝）发布了一个有趣的"地下城探索失败"合集。视频获得870万观看。评论："这是什么游戏？看起来很有趣！"你的App Store排名飙升。'
                    },
                    probability: 0.12,
                    impact: 'positive',
                    effect: (game) => {
                        const viralDownloads = Math.floor(Math.random() * 150000) + 100000;
                        game.metrics.downloads += viralDownloads;
                        game.metrics.dau += Math.floor(viralDownloads * 0.15);
                        game.metrics.mau += Math.floor(viralDownloads * 0.08);

                        return {
                            en: `VIRAL EXPLOSION! +${viralDownloads} downloads in 72 hours. DAU spiked by ${Math.floor(viralDownloads * 0.15)}. App Store: #47→#3 in RPG. "This is our Among Us moment!" Servers struggling but holding. Capitalize NOW with monetization!`,
                            zh: `病毒爆炸！72小时内+${viralDownloads}次下载。DAU激增${Math.floor(viralDownloads * 0.15)}。App Store：RPG类#47→#3。"这是我们的Among Us时刻！"服务器吃力但坚持。现在用变现方式利用！`
                        };
                    }
                }
            ],
            victoryConditions: {
                primary: {
                    en: 'Reach $200K monthly revenue and 100K DAU',
                    zh: '达到20万美元月收入和10万DAU'
                },
                secondary: {
                    en: 'Achieve 20%+ D7 retention and 15%+ paying user percentage',
                    zh: '实现20%+ D7留存和15%+付费用户比例'
                },
                metrics: {
                    revenue: 200000,
                    dau: 100000,
                    retention7d: 20,
                    payingUserPercentage: 15
                }
            },
            inspirationNote: {
                en: 'Inspired by Supercell\'s retention-first approach: "If retention is good, monetization will follow."',
                zh: '受Supercell留存优先方法启发："如果留存好，变现会跟随。"'
            }
        }
    ],

    // ==================== TIER 3: 高级场景 ====================

    tier3: [
        {
            id: 'healthtech-telemedicine',
            tier: 3,
            name: {
                en: 'Telemedicine Health Platform',
                zh: '远程医疗健康平台'
            },
            industry: 'HealthTech',
            difficulty: 'hard',
            backstory: {
                en: 'HealthNow offers video consultations with licensed doctors. Launched 2 years ago in 3 states. Current: 45,600 registered patients, 8,900 monthly consultations, $267K revenue. Problems: 1) Customer acquisition is expensive ($120 CAC), 2) Patients only use it once (12% repeat rate), 3) Insurance integration is messy, 4) Doctor supply constrained. You\'re competing with well-funded players like Teladoc ($2B revenue). Need to find a sustainable growth model and improve unit economics.',
                zh: 'HealthNow提供与执照医生的视频咨询。2年前在3个州推出。当前：45600名注册患者，8900次月度咨询，26.7万美元收入。问题：1）客户获取昂贵（120美元CAC），2）患者只使用一次（12%重复率），3）保险整合混乱，4）医生供应受限。你与Teladoc（20亿美元收入）等资金充足的玩家竞争。需要找到可持续增长模式并改善单位经济。'
            },
            startingMetrics: {
                patients: 45600,
                monthlyConsultations: 8900,
                revenue: 267000,
                budget: 180000,
                cac: 120,
                ltv: 95, // 负向单位经济！
                repeatRate: 12,
                avgConsultationPrice: 45,
                doctorCount: 234,
                avgWaitTime: 35, // 分钟
                patientSatisfaction: 7.2, // out of 10
                insuranceIntegrated: false
            },
            uniqueChallenges: [
                {
                    en: 'Negative unit economics: CAC ($120) > LTV ($95)',
                    zh: '负向单位经济：CAC（120美元）> LTV（95美元）'
                },
                {
                    en: 'Low repeat rate (12%) - patients see it as "one-time emergency tool"',
                    zh: '低重复率（12%）- 患者将其视为"一次性应急工具"'
                },
                {
                    en: 'Competing with billion-dollar players in a regulated industry',
                    zh: '在受监管行业与数十亿美元玩家竞争'
                }
            ],
            specialSkills: [
                {
                    name: {
                        en: 'Chronic Care Management Program',
                        zh: '慢性病管理项目'
                    },
                    description: {
                        en: 'Pivot to chronic conditions: diabetes, hypertension, mental health. Monthly subscription model ($79/mo) with unlimited consults + care coordinator. Inspired by Omada Health\'s $600M valuation focusing on chronic care.',
                        zh: '转向慢性病：糖尿病、高血压、心理健康。月订阅模式（79美元/月），无限次咨询+护理协调员。受Omada Health专注慢性病护理6亿美元估值启发。'
                    },
                    icon: '💊',
                    aarrr: 'Retention',
                    cost: 35000,
                    timeframe: '8周',
                    effectiveness: 0.82,
                    execute: (game) => {
                        const chronicCarePatients = Math.floor(game.metrics.patients * 0.08); // 8%转向订阅
                        const subscriptionRevenue = chronicCarePatients * 79;
                        game.metrics.repeatRate += 58; // 从12%到70%！
                        game.metrics.ltv += 850; // 从95美元到945美元
                        game.metrics.revenue += subscriptionRevenue;
                        game.metrics.budget -= 35000;
                        game.currentWeek += 8;

                        return {
                            success: true,
                            feedback: {
                                en: `Chronic care pivot successful! ${chronicCarePatients} patients subscribed. Repeat rate: 12%→70%. LTV: $95→$945. "My diabetes is finally under control!" Unit economics now POSITIVE. This is the business model.`,
                                zh: `慢性病护理转型成功！${chronicCarePatients}名患者订阅。重复率：12%→70%。LTV：95美元→945美元。"我的糖尿病终于得到控制！"单位经济现在为正。这是商业模式。`
                            },
                            changes: [
                                { label: '重复率 Repeat Rate', oldValue: 12, newValue: game.metrics.repeatRate, delta: 58, unit: '%' },
                                { label: 'LTV', oldValue: 95, newValue: game.metrics.ltv, delta: 850, unit: '$' },
                                { label: '收入 Revenue', oldValue: game.metrics.revenue - subscriptionRevenue, newValue: game.metrics.revenue, delta: Math.floor(subscriptionRevenue), unit: '$' }
                            ]
                        };
                    }
                },
                {
                    name: {
                        en: 'Employer B2B Sales',
                        zh: '雇主B2B销售'
                    },
                    description: {
                        en: 'Sell to employers as an employee benefit: "$5/employee/month for unlimited telemedicine". Lower CAC (acquire 500 employees per deal), predictable revenue. Inspired by how One Medical grew to $5B valuation via employer contracts.',
                        zh: '向雇主销售作为员工福利："每员工每月5美元，无限远程医疗"。更低CAC（每笔交易获取500名员工），可预测收入。受One Medical通过雇主合同增长到50亿美元估值启发。'
                    },
                    icon: '🏢',
                    aarrr: 'Acquisition',
                    cost: 45000,
                    timeframe: '12周',
                    effectiveness: 0.78,
                    execute: (game) => {
                        const employerDeals = Math.floor(Math.random() * 6) + 8; // 8-14个雇主
                        const avgEmployeesPerEmployer = 650;
                        const newPatients = employerDeals * avgEmployeesPerEmployer;
                        const b2bRevenue = newPatients * 5; // 每月5美元/员工
                        game.metrics.patients += newPatients;
                        game.metrics.revenue += b2bRevenue;
                        game.metrics.cac = 18; // B2B CAC远低于B2C的120美元
                        game.metrics.budget -= 45000;
                        game.currentWeek += 12;

                        return {
                            success: true,
                            feedback: {
                                en: `B2B breakthrough! Signed ${employerDeals} employers. +${newPatients} covered employees. CAC: $120→$18 (83% reduction!). Monthly B2B revenue: $${b2bRevenue}. "Our employees love the benefit!" - HR testimonials.`,
                                zh: `B2B突破！签署${employerDeals}个雇主。+${newPatients}名覆盖员工。CAC：120美元→18美元（降低83%！）。月度B2B收入：${b2bRevenue}美元。"我们的员工喜欢这个福利！" - 人力资源感言。`
                            },
                            changes: [
                                { label: '患者 Patients', oldValue: game.metrics.patients - newPatients, newValue: game.metrics.patients, delta: newPatients, unit: '' },
                                { label: 'CAC', oldValue: 120, newValue: game.metrics.cac, delta: -102, unit: '$' },
                                { label: '收入 Revenue', oldValue: game.metrics.revenue - b2bRevenue, newValue: game.metrics.revenue, delta: b2bRevenue, unit: '$' }
                            ]
                        };
                    }
                }
            ],
            specialEvents: [],
            victoryConditions: {
                primary: {
                    en: 'Achieve positive unit economics (LTV > CAC × 3) and $1M monthly revenue',
                    zh: '实现正向单位经济（LTV > CAC × 3）和100万美元月收入'
                },
                secondary: {
                    en: 'Reach 50%+ repeat rate and sign 20+ employer contracts',
                    zh: '达到50%+重复率并签署20+雇主合同'
                },
                metrics: {
                    ltvToCacRatio: 3,
                    revenue: 1000000,
                    repeatRate: 50,
                    employerContracts: 20
                }
            },
            inspirationNote: {
                en: 'Inspired by One Medical\'s B2B pivot: Went from struggling consumer app to $5B company by focusing on employer market.',
                zh: '受One Medical的B2B转型启发：从挣扎的消费者应用通过专注雇主市场成长为50亿美元公司。'
            }
        },

        {
            id: 'tiktok-creator',
            tier: 3,
            name: {
                en: 'TikTok Creator Monetization',
                zh: 'TikTok创作者变现'
            },
            industry: 'Creator Economy',
            difficulty: 'hard',
            backstory: {
                en: 'You\'re a TikTok creator with 487K followers posting productivity/self-improvement content. Stats: Avg 80K views/video, 6.2% engagement rate, $2,100/month from Creator Fund (terrible). You have an audience but no business model. Your options: Sponsorships? Digital products? Coaching? Community? The algorithm is unpredictable. One viral video could change everything - or you could be forgotten tomorrow. How do you build sustainable income from your audience?',
                zh: '你是一位拥有48.7万粉丝的TikTok创作者，发布生产力/自我提升内容。数据：平均每视频8万观看，6.2%参与率，创作者基金每月2100美元（糟糕）。你有观众但没有商业模式。你的选择：赞助？数字产品？辅导？社区？算法不可预测。一个病毒视频可以改变一切 - 或者你明天可能被遗忘。你如何从你的观众建立可持续收入？'
            },
            startingMetrics: {
                followers: 487000,
                avgViews: 80000,
                engagementRate: 6.2,
                monthlyRevenue: 2100,
                budget: 8000,
                emailList: 3400, // 只有0.7%粉丝在邮件列表上
                videoPostFrequency: 5, // 每周
                viralVideos: 3, // 过去6个月
                sponsorshipDeals: 2,
                avgSponsorshipRate: 1200
            },
            uniqueChallenges: [
                {
                    en: 'Platform-dependent: Algorithm change could kill your reach overnight',
                    zh: '平台依赖：算法变化可能一夜间杀死你的触达'
                },
                {
                    en: 'No owned audience: Only 0.7% on email list',
                    zh: '没有拥有的观众：只有0.7%在邮件列表上'
                },
                {
                    en: 'Low revenue per follower: $0.004/follower/month',
                    zh: '每粉丝低收入：每月0.004美元/粉丝'
                }
            ],
            specialSkills: [
                {
                    name: {
                        en: 'Digital Product Funnel',
                        zh: '数字产品漏斗'
                    },
                    description: {
                        en: 'Create $27 "Productivity System" Notion template. Promote via TikTok → landing page → email course → product. Inspired by Ali Abdaal\'s $4.6M/year from digital products with 3.5M YouTube subs.',
                        zh: '创建27美元"生产力系统"Notion模板。通过TikTok推广→登录页→邮件课程→产品。受Ali Abdaal从数字产品年收入460万美元启发（350万YouTube订阅者）。'
                    },
                    icon: '📦',
                    aarrr: 'Revenue',
                    cost: 2000,
                    timeframe: '3周',
                    effectiveness: 0.85,
                    execute: (game) => {
                        const productConversionRate = 0.008; // 0.8%的粉丝购买
                        const productBuyers = Math.floor(game.metrics.followers * productConversionRate);
                        const productRevenue = productBuyers * 27;
                        game.metrics.monthlyRevenue += productRevenue;
                        game.metrics.emailList += productBuyers; // 买家加入邮件列表
                        game.metrics.budget -= 2000;
                        game.currentWeek += 3;

                        return {
                            success: true,
                            feedback: {
                                en: `Digital product WIN! ${productBuyers} bought your template. Revenue: +$${productRevenue}. "This system changed my life!" Email list: 3.4K→${game.metrics.emailList}. Revenue per follower: $0.004→$${((game.metrics.monthlyRevenue / game.metrics.followers) * 1000).toFixed(3)}.`,
                                zh: `数字产品胜利！${productBuyers}人购买了你的模板。收入：+${productRevenue}美元。"这个系统改变了我的生活！"邮件列表：3400→${game.metrics.emailList}。每粉丝收入：0.004美元→${((game.metrics.monthlyRevenue / game.metrics.followers) * 1000).toFixed(3)}美元。`
                            },
                            changes: [
                                { label: '月收入 Monthly Revenue', oldValue: 2100, newValue: game.metrics.monthlyRevenue, delta: productRevenue, unit: '$' },
                                { label: '邮件列表 Email List', oldValue: 3400, newValue: game.metrics.emailList, delta: productBuyers, unit: '' },
                                { label: '每粉丝收入 Rev/Follower', oldValue: 0.004, newValue: (game.metrics.monthlyRevenue / game.metrics.followers), delta: ((game.metrics.monthlyRevenue / game.metrics.followers) - 0.004), unit: '$' }
                            ]
                        };
                    }
                },
                {
                    name: {
                        en: 'Premium Community Launch',
                        zh: '高级社区推出'
                    },
                    description: {
                        en: 'Launch $29/month "Productivity Accelerator" community on Circle/Discord. Weekly coaching calls, accountability partners, exclusive content. Inspired by Ali Abdaal\'s Part-Time YouTuber Academy ($4.5M revenue).',
                        zh: '在Circle/Discord上推出29美元/月"生产力加速器"社区。每周辅导电话、责任伙伴、独家内容。受Ali Abdaal的兼职YouTuber学院（450万美元收入）启发。'
                    },
                    icon: '👥',
                    aarrr: 'Revenue',
                    cost: 3500,
                    timeframe: '4周',
                    effectiveness: 0.78,
                    execute: (game) => {
                        const communityConversionRate = 0.003; // 0.3%加入
                        const communityMembers = Math.floor(game.metrics.followers * communityConversionRate);
                        const communityRevenue = communityMembers * 29;
                        game.metrics.monthlyRevenue += communityRevenue;
                        game.metrics.budget -= 3500;
                        game.currentWeek += 4;

                        return {
                            success: true,
                            feedback: {
                                en: `Community thriving! ${communityMembers} members @ $29/mo = $${communityRevenue}/mo recurring. "Finally found my productivity tribe!" MRR: ${game.metrics.monthlyRevenue}. This is SCALABLE income. Less algorithm-dependent now.`,
                                zh: `社区蓬勃发展！${communityMembers}名成员 @ 29美元/月 = ${communityRevenue}美元/月经常性收入。"终于找到了我的生产力部落！"MRR：${game.metrics.monthlyRevenue}。这是可扩展收入。现在较少依赖算法。`
                            },
                            changes: [
                                { label: '社区成员 Members', oldValue: 0, newValue: communityMembers, delta: communityMembers, unit: '' },
                                { label: '月收入 Monthly Revenue', oldValue: game.metrics.monthlyRevenue - communityRevenue, newValue: game.metrics.monthlyRevenue, delta: communityRevenue, unit: '$' }
                            ]
                        };
                    }
                }
            ],
            specialEvents: [
                {
                    name: {
                        en: 'Mega-viral video: 8.7M views',
                        zh: '超级病毒视频：870万观看'
                    },
                    description: {
                        en: 'Your "5 AM Morning Routine That Changed My Life" video went MEGA viral: 8.7M views, 12K new followers/day. Your link in bio is getting slammed. This is your moment to convert attention to revenue.',
                        zh: '你的"改变我生活的早上5点晨间例行"视频超级病毒传播：870万观看，每天1.2万新粉丝。你的个人简介链接被疯狂点击。这是你将注意力转化为收入的时刻。'
                    },
                    probability: 0.15,
                    impact: 'positive',
                    effect: (game) => {
                        const newFollowers = Math.floor(Math.random() * 80000) + 60000;
                        const linkClicks = Math.floor(newFollowers * 0.18);
                        const emailSignups = Math.floor(linkClicks * 0.35);
                        game.metrics.followers += newFollowers;
                        game.metrics.emailList += emailSignups;
                        game.metrics.avgViews = Math.floor(game.metrics.avgViews * 1.8); // 涨粉后观看提升

                        return {
                            en: `VIRAL EXPLOSION! +${newFollowers} followers in 4 days. ${linkClicks} link clicks. ${emailSignups} email sign-ups. Product sales spiking! This is your breakthrough. Capitalize by launching high-ticket offer NOW.`,
                            zh: `病毒爆炸！4天内+${newFollowers}粉丝。${linkClicks}链接点击。${emailSignups}邮件注册。产品销售激增！这是你的突破。现在通过推出高价offer利用这个机会。`
                        };
                    }
                },
                {
                    name: {
                        en: 'Algorithm change kills reach',
                        zh: '算法变化杀死触达'
                    },
                    description: {
                        en: 'TikTok changed the algorithm. Your avg views dropped from 80K to 12K overnight. Engagement down 70%. "Am I shadowbanned?" This is why you need owned audience (email/community) not rented.',
                        zh: 'TikTok改变了算法。你的平均观看一夜之间从8万降至1.2万。参与度下降70%。"我被影子禁了吗？"这就是为什么你需要拥有的观众（邮件/社区）而不是租来的。'
                    },
                    probability: 0.20,
                    impact: 'negative',
                    effect: (game) => {
                        game.metrics.avgViews = Math.floor(game.metrics.avgViews * 0.15);
                        game.metrics.engagementRate -= 4.2;

                        // 如果你有邮件列表/社区，损害较小
                        const emailBufferProtection = game.metrics.emailList > 10000 ? 0.5 : 0;
                        const actualRevenueLoss = Math.floor(game.metrics.monthlyRevenue * (0.40 - emailBufferProtection));
                        game.metrics.monthlyRevenue -= actualRevenueLoss;

                        return {
                            en: `Algorithm disaster! Views: 80K→${game.metrics.avgViews}. Revenue: -$${actualRevenueLoss}. ${game.metrics.emailList > 10000 ? 'But your email list saved you - still have direct audience access!' : 'This is why owned audience matters. Start building email list NOW.'}`,
                            zh: `算法灾难！观看：8万→${game.metrics.avgViews}。收入：-${actualRevenueLoss}美元。${game.metrics.emailList > 10000 ? '但你的邮件列表救了你 - 仍然有直接观众访问！' : '这就是为什么拥有的观众很重要。现在开始建立邮件列表。'}`
                        };
                    }
                }
            ],
            victoryConditions: {
                primary: {
                    en: 'Reach $15K+ monthly revenue from owned channels (products/community, not ads)',
                    zh: '从拥有的渠道（产品/社区，而非广告）达到1.5万美元+月收入'
                },
                secondary: {
                    en: 'Build 25K+ email list and 500+ paying community members',
                    zh: '建立2.5万+邮件列表和500+付费社区成员'
                },
                metrics: {
                    monthlyRevenue: 15000,
                    emailList: 25000,
                    communityMembers: 500,
                    ownedRevenuePercentage: 80 // 至少80%收入来自拥有的渠道
                }
            },
            inspirationNote: {
                en: 'Inspired by Ali Abdaal (3.5M YouTube) who makes $4.6M/year: 70% from courses/community, only 15% from ads.',
                zh: '受Ali Abdaal（350万YouTube）启发，年收入460万美元：70%来自课程/社区，只有15%来自广告。'
            }
        }

        ,

        {
            id: 'b2b-saas-enterprise',
            tier: 3,
            name: {
                en: 'B2B Enterprise SaaS',
                zh: 'B2B企业级SaaS'
            },
            industry: 'B2B SaaS',
            difficulty: 'hard',
            backstory: {
                en: 'DataFlow is your data analytics platform for enterprise companies. After 3 years: 89 customers, $2.3M ARR, avg deal size $26K, 6-12 month sales cycles. The challenge: Long sales cycles burn cash, high churn (23% annually) from poor onboarding, competitors (Tableau, Looker) have massive brands. You need to shorten sales cycle, reduce churn, and find a wedge into enterprises. How do you scale B2B without raising $50M?',
                zh: 'DataFlow是你为企业公司提供的数据分析平台。3年后：89个客户，230万美元年经常性收入，平均交易规模2.6万美元，6-12个月销售周期。挑战：长销售周期烧钱，高流失率（年度23%）源于糟糕的入职，竞争对手（Tableau、Looker）有巨大品牌。你需要缩短销售周期、减少流失并找到进入企业的楔子。你如何在不融资5000万美元的情况下扩展B2B？'
            },
            startingMetrics: {
                customers: 89,
                arr: 2300000,
                avgDealSize: 26000,
                salesCycleLength: 8.5, // 月
                churnRate: 23,
                budget: 450000,
                cac: 12000,
                ltv: 78000,
                nps: 32,
                timeToValue: 45, // 天
                expansionRevenue: 180000
            },
            uniqueChallenges: [
                {
                    en: '8.5 month sales cycles - bleeding cash on sales team',
                    zh: '8.5个月销售周期 - 销售团队烧钱'
                },
                {
                    en: '23% annual churn - losing hard-won customers',
                    zh: '23%年度流失 - 失去来之不易的客户'
                },
                {
                    en: 'Competing with $1B+ competitors',
                    zh: '与10亿美元+竞争对手竞争'
                }
            ],
            specialSkills: [
                {
                    name: {
                        en: 'Product-Led Growth Freemium',
                        zh: '产品驱动增长免费增值'
                    },
                    description: {
                        en: 'Launch free self-serve tier for teams <50. Let users experience value before talking to sales. Inspired by Slack/Zoom\'s PLG strategy (cut sales cycle 60%).',
                        zh: '为<50人团队推出免费自助层级。让用户在与销售交谈前体验价值。受Slack/Zoom的PLG策略启发（销售周期减少60%）。'
                    },
                    icon: '🎁',
                    aarrr: 'Acquisition',
                    cost: 85000,
                    timeframe: '12周',
                    effectiveness: 0.82,
                    execute: (game) => {
                        const freemiumUsers = Math.floor(Math.random() * 2500) + 1500;
                        const conversionRate = 0.08; // 8%转化为付费
                        const newCustomers = Math.floor(freemiumUsers * conversionRate);
                        game.metrics.customers += newCustomers;
                        game.metrics.arr += newCustomers * 12000; // 较小交易
                        game.metrics.salesCycleLength -= 5.1; // 从8.5月到3.4月
                        game.metrics.budget -= 85000;
                        game.currentWeek += 12;

                        return {
                            success: true,
                            feedback: {
                                en: `PLG transformation! ${freemiumUsers} free users, ${newCustomers} converted to paid. Sales cycle: 8.5mo→3.4mo. "They called us already sold!" ARR: +$${newCustomers * 12000}. This changes everything.`,
                                zh: `PLG转型！${freemiumUsers}免费用户，${newCustomers}转化为付费。销售周期：8.5月→3.4月。"他们打电话时已经被说服了！"ARR：+${newCustomers * 12000}美元。这改变了一切。`
                            },
                            changes: []
                        };
                    }
                },
                {
                    name: {
                        en: 'Customer Success Team',
                        zh: '客户成功团队'
                    },
                    description: {
                        en: 'Hire 5 CSMs focused on onboarding + adoption. Reduce time-to-value from 45 to 10 days. Inspired by Gainsight: "Retention is the new acquisition."',
                        zh: '聘请5名CSM专注于入职+采用。将价值时间从45天减少到10天。受Gainsight启发："留存是新的获取。"'
                    },
                    icon: '🤝',
                    aarrr: 'Retention',
                    cost: 180000,
                    timeframe: '8周',
                    effectiveness: 0.88,
                    execute: (game) => {
                        game.metrics.churnRate -= 16; // 从23%到7%
                        game.metrics.timeToValue -= 35; // 从45天到10天
                        game.metrics.nps += 28; // 从32到60
                        game.metrics.expansionRevenue += 420000;
                        game.metrics.budget -= 180000;
                        game.currentWeek += 8;

                        return {
                            success: true,
                            feedback: {
                                en: `CS team impact! Churn: 23%→7%. Time-to-value: 45d→10d. NPS: 32→60. "Best onboarding experience ever!" Expansion revenue: +$420K. Retention is growth.`,
                                zh: `CS团队影响！流失：23%→7%。价值时间：45天→10天。NPS：32→60。"有史以来最好的入职体验！"扩展收入：+42万美元。留存就是增长。`
                            },
                            changes: []
                        };
                    }
                }
            ],
            specialEvents: [],
            victoryConditions: {
                primary: {
                    en: 'Reach $10M ARR with <10% annual churn',
                    zh: '达到1000万美元ARR，年度流失<10%'
                },
                secondary: {
                    en: 'Reduce sales cycle to <4 months and achieve 60+ NPS',
                    zh: '将销售周期减少到<4个月并实现60+ NPS'
                },
                metrics: {
                    arr: 10000000,
                    churnRate: 10,
                    salesCycleLength: 4,
                    nps: 60
                }
            },
            inspirationNote: {
                en: 'Inspired by Slack\'s PLG journey: $0 to $1B ARR in 8 years, mostly through self-serve.',
                zh: '受Slack的PLG历程启发：8年内从0到10亿美元ARR，主要通过自助服务。'
            }
        },

        {
            id: 'subscription-box',
            tier: 3,
            name: {
                en: 'Subscription Box Service',
                zh: '订阅盒子服务'
            },
            industry: 'E-commerce',
            difficulty: 'hard',
            backstory: {
                en: 'SnackBox delivers curated international snacks monthly. After 2 years: 12,400 subscribers, $37/box, $458K MRR, but 38% churn after first box. The subscription model is brutal - you must re-earn customers every month. CAC is $42, LTV is only $95 (2.5 boxes average). Instagram has 56K followers but conversions are weak. How do you reduce churn, increase LTV, and make the economics work?',
                zh: 'SnackBox每月递送精选国际零食。2年后：12400订阅者，37美元/盒，45.8万美元月经常性收入，但首盒后38%流失。订阅模式残酷 - 你必须每月重新赢得客户。CAC是42美元，LTV只有95美元（平均2.5盒）。Instagram有5.6万粉丝但转化疲软。你如何减少流失、增加LTV并使经济效益有效？'
            },
            startingMetrics: {
                subscribers: 12400,
                revenue: 458000,
                boxPrice: 37,
                budget: 120000,
                churnRate: 38,
                cac: 42,
                ltv: 95,
                avgLifetimeBoxes: 2.5,
                instagramFollowers: 56000,
                unboxingVideos: 340,
                referralRate: 4
            },
            uniqueChallenges: [
                {
                    en: 'Negative unit economics: CAC $42 > LTV $95 (need 3x)',
                    zh: '负向单位经济：CAC 42美元 > LTV 95美元（需要3倍）'
                },
                {
                    en: '38% churn after first box - "one and done" problem',
                    zh: '首盒后38%流失 - "一次性"问题'
                },
                {
                    en: 'Subscription fatigue - customers have too many subscriptions',
                    zh: '订阅疲劳 - 客户有太多订阅'
                }
            ],
            specialSkills: [
                {
                    name: {
                        en: 'Personalization Quiz',
                        zh: '个性化测验'
                    },
                    description: {
                        en: '"Take our Taste Profile quiz - we\'ll curate YOUR perfect box." Personalization reduces churn 40%. Inspired by Stitch Fix\'s $2B success with personalization.',
                        zh: '"参加我们的口味档案测验 - 我们将为您策划完美盒子。"个性化减少40%流失。受Stitch Fix凭借个性化20亿美元成功启发。'
                    },
                    icon: '🎯',
                    aarrr: 'Retention',
                    cost: 25000,
                    timeframe: '6周',
                    effectiveness: 0.85,
                    execute: (game) => {
                        game.metrics.churnRate -= 15; // 从38%到23%
                        game.metrics.avgLifetimeBoxes += 2.8; // 从2.5到5.3
                        game.metrics.ltv = game.metrics.avgLifetimeBoxes * game.metrics.boxPrice;
                        game.metrics.budget -= 25000;
                        game.currentWeek += 6;

                        return {
                            success: true,
                            feedback: {
                                en: `Personalization works! Churn: 38%→23%. Avg lifetime: 2.5→5.3 boxes. LTV: $95→$${Math.floor(game.metrics.ltv)}. "Finally, snacks I actually like!" Unit economics improving.`,
                                zh: `个性化有效！流失：38%→23%。平均生命周期：2.5→5.3盒。LTV：95美元→${Math.floor(game.metrics.ltv)}美元。"终于，我真正喜欢的零食！"单位经济改善。`
                            },
                            changes: []
                        };
                    }
                },
                {
                    name: {
                        en: 'Referral Program with Incentives',
                        zh: '激励推荐计划'
                    },
                    description: {
                        en: '"Give $10, Get $10" + enter friend into sweepstakes. Make sharing the box on social = extra snacks next month. Inspired by Dollar Shave Club\'s viral referral.',
                        zh: '"送10美元，得10美元" + 让朋友参加抽奖。在社交媒体分享盒子 = 下月额外零食。受Dollar Shave Club病毒式推荐启发。'
                    },
                    icon: '🎁',
                    aarrr: 'Referral',
                    cost: 18000,
                    timeframe: '4周',
                    effectiveness: 0.82,
                    execute: (game) => {
                        game.metrics.referralRate += 18; // 从4%到22%
                        const newSubscribers = Math.floor(game.metrics.subscribers * 0.22);
                        game.metrics.subscribers += newSubscribers;
                        game.metrics.cac = 22; // 推荐CAC远低于付费
                        game.metrics.unboxingVideos += 890;
                        game.metrics.budget -= 18000;
                        game.currentWeek += 4;

                        return {
                            success: true,
                            feedback: {
                                en: `Referral explosion! 22% of subscribers referred friends. +${newSubscribers} new subs. CAC: $42→$22. +890 unboxing videos on social. "My friends need to try this!" Going viral.`,
                                zh: `推荐爆炸！22%的订阅者推荐了朋友。+${newSubscribers}新订阅者。CAC：42美元→22美元。社交媒体上+890个开箱视频。"我的朋友需要试试这个！"病毒传播中。`
                            },
                            changes: []
                        };
                    }
                }
            ],
            specialEvents: [],
            victoryConditions: {
                primary: {
                    en: 'Reach 50K subscribers with LTV/CAC ratio >3',
                    zh: '达到5万订阅者，LTV/CAC比率>3'
                },
                secondary: {
                    en: 'Reduce churn to <15% and achieve 6+ average boxes per customer',
                    zh: '将流失率降至<15%，每客户平均6+盒'
                },
                metrics: {
                    subscribers: 50000,
                    ltvToCacRatio: 3,
                    churnRate: 15,
                    avgLifetimeBoxes: 6
                }
            },
            inspirationNote: {
                en: 'Inspired by Dollar Shave Club: Sold for $1B to Unilever using viral content + subscription model.',
                zh: '受Dollar Shave Club启发：使用病毒内容+订阅模式以10亿美元卖给联合利华。'
            }
        }
    ],

    // ==================== TIER 4: 专家级场景 ====================

    tier4: [
        {
            id: 'failing-startup-rescue',
            tier: 4,
            name: {
                en: '🆘 Rescue a Failing Startup',
                zh: '🆘 拯救失败的创业公司'
            },
            industry: 'Crisis Management',
            difficulty: 'expert',
            backstory: {
                en: 'You\'ve been brought in as "Chief Growth Officer" to save TechVenture, a once-promising SaaS that\'s now dying. Current situation: 4,200 users (down from 12K peak), $28K MRR (down from $95K), 3 months runway, team morale is dead, competitors are circling, press is writing obituaries. The founder is burnt out. Board wants to shut down unless you can turn it around in 90 days. This is your Hail Mary. Can you pull off an impossible comeback?',
                zh: '你被聘为"首席增长官"来拯救TechVenture，一家曾经前途光明但现在濒临死亡的SaaS公司。当前情况：4200用户（从1.2万峰值下降），2.8万美元月经常性收入（从9.5万美元下降），3个月资金跑道，团队士气死亡，竞争对手虎视眈眈，媒体在写讣告。创始人精疲力竭。董事会想要关闭，除非你能在90天内扭转局面。这是你的孤注一掷。你能完成不可能的逆转吗？'
            },
            startingMetrics: {
                users: 4200,
                peakUsers: 12000,
                revenue: 28000,
                peakRevenue: 95000,
                budget: 45000, // 只有3个月
                churnRate: 45,
                nps: -12, // 负值NPS！
                teamSize: 8,
                daysRemaining: 90,
                pressArticles: -8 // 负面报道
            },
            uniqueChallenges: [
                {
                    en: 'Only 90 days to turn around or company dies',
                    zh: '只有90天时间扭转局面否则公司死亡'
                },
                {
                    en: 'Negative NPS (-12) - users actively hate your product',
                    zh: '负值NPS（-12）- 用户积极讨厌你的产品'
                },
                {
                    en: '45% monthly churn - bleeding users faster than acquiring',
                    zh: '45%月流失率 - 失去用户比获取更快'
                }
            ],
            specialSkills: [
                {
                    name: {
                        en: 'Emergency Product Pivot',
                        zh: '紧急产品转型'
                    },
                    description: {
                        en: 'Interview churned customers, find the ONE feature they\'d pay for. Kill everything else. Focus. Inspired by Instagram killing all features except photos.',
                        zh: '采访流失客户，找到他们愿意付费的一个功能。杀掉其他一切。专注。受Instagram杀掉除照片外所有功能启发。'
                    },
                    icon: '🔥',
                    aarrr: 'Retention',
                    cost: 15000,
                    timeframe: '3周',
                    effectiveness: 0.75,
                    execute: (game) => {
                        game.metrics.churnRate -= 25;
                        game.metrics.nps += 35;
                        game.metrics.budget -= 15000;
                        game.currentWeek += 3;

                        return {
                            success: true,
                            feedback: {
                                en: `Pivot executed! Found the core value. Churn: 45%→20%. NPS: -12→23. "This is what we always wanted!" Users coming back. There\'s hope.`,
                                zh: `转型执行！找到核心价值。流失：45%→20%。NPS：-12→23。"这就是我们一直想要的！"用户回来了。有希望了。`
                            },
                            changes: []
                        };
                    }
                },
                {
                    name: {
                        en: 'Win-Back Campaign',
                        zh: '挽回活动'
                    },
                    description: {
                        en: 'Email 8K churned users: "We listened. We changed. Come back free for 3 months." Swallow pride, admit mistakes. Inspired by Snapchat\'s redesign reversal.',
                        zh: '向8000流失用户发邮件："我们倾听了。我们改变了。免费回来3个月。"放下自尊，承认错误。受Snapchat重新设计逆转启发。'
                    },
                    icon: '💌',
                    aarrr: 'Acquisition',
                    cost: 5000,
                    timeframe: '2周',
                    effectiveness: 0.70,
                    execute: (game) => {
                        const churnedUsers = game.metrics.peakUsers - game.metrics.users;
                        const winBackRate = 0.18;
                        const returnedUsers = Math.floor(churnedUsers * winBackRate);
                        game.metrics.users += returnedUsers;
                        game.metrics.budget -= 5000;
                        game.currentWeek += 2;

                        return {
                            success: true,
                            feedback: {
                                en: `Comeback! ${returnedUsers} users returned. "Glad you fixed it." Revenue recovering. This might actually work. Keep fighting.`,
                                zh: `东山再起！${returnedUsers}用户回归。"很高兴你们修复了。"收入恢复中。这可能真的有用。继续战斗。`
                            },
                            changes: []
                        };
                    }
                }
            ],
            specialEvents: [
                {
                    name: {
                        en: 'Board meeting deadline',
                        zh: '董事会会议截止日期'
                    },
                    description: {
                        en: 'Day 90: Board meeting. They\'re looking at your metrics. Did you save the company or is this the end?',
                        zh: '第90天：董事会会议。他们在看你的指标。你拯救了公司还是这就是终结？'
                    },
                    probability: 1.0,
                    impact: 'critical',
                    effect: (game) => {
                        const saved = game.metrics.revenue > 60000 && game.metrics.churnRate < 20;
                        return {
                            en: saved ? 'SAVED! Board approves 6 more months. "Incredible turnaround. Keep going."' : 'Company shut down. You gave it your best shot. Sometimes startups die. Lesson learned.',
                            zh: saved ? '拯救成功！董事会批准再给6个月。"不可思议的逆转。继续前进。"' : '公司关闭。你尽力了。有时创业公司会死。汲取教训。'
                        };
                    }
                }
            ],
            victoryConditions: {
                primary: {
                    en: 'Reach $75K MRR within 90 days',
                    zh: '在90天内达到7.5万美元月经常性收入'
                },
                secondary: {
                    en: 'Reduce churn to <15% and achieve positive NPS',
                    zh: '将流失率降至<15%并实现正NPS'
                },
                metrics: {
                    revenue: 75000,
                    churnRate: 15,
                    nps: 0,
                    daysRemaining: 0
                }
            },
            inspirationNote: {
                en: 'Inspired by Slack\'s pivot from gaming to enterprise SaaS after failed game launch.',
                zh: '受Slack从游戏失败后转型为企业SaaS的启发。'
            }
        },

        {
            id: 'blitzscaling-challenge',
            tier: 4,
            name: {
                en: '⚡ Blitzscaling Challenge',
                zh: '⚡ 闪电扩张挑战'
            },
            industry: 'Hyper-Growth',
            difficulty: 'expert',
            backstory: {
                en: 'Your startup just raised a $50M Series B. The investors want GROWTH at all costs. "Uber spent $1B on growth. We need you to think bigger." Current: 340K users, $2.8M MRR, growing 15%/mo. Target: 5M users, $25M MRR in 18 months for Series C at $500M valuation. The competition is vicious. Market window is closing. You have capital but you need execution. Blitzscale or die.',
                zh: '你的创业公司刚融资5000万美元B轮。投资者不惜一切代价要增长。"Uber在增长上花了10亿美元。我们需要你想得更大。"当前：34万用户，280万美元月经常性收入，月增长15%。目标：18个月内达到500万用户，2500万美元月经常性收入，为估值5亿美元的C轮融资。竞争残酷。市场窗口正在关闭。你有资金但需要执行。闪电扩张或死亡。'
            },
            startingMetrics: {
                users: 340000,
                revenue: 2800000,
                budget: 50000000,
                monthlyGrowthRate: 15,
                targetUsers: 5000000,
                targetRevenue: 25000000,
                monthsRemaining: 18,
                competitorGrowth: 25 // 竞争对手月增长
            },
            uniqueChallenges: [
                {
                    en: 'Must grow 15x in 18 months while competitors are growing 25%/mo',
                    zh: '必须在18个月内增长15倍，而竞争对手月增长25%'
                },
                {
                    en: 'Burn $50M efficiently - spending too slow = lose market, too fast = run out',
                    zh: '高效烧5000万美元 - 烧太慢 = 失去市场，太快 = 耗尽'
                },
                {
                    en: 'Maintain quality while scaling 15x - infrastructure will break',
                    zh: '在15倍扩张时保持质量 - 基础设施会崩溃'
                }
            ],
            specialSkills: [
                {
                    name: {
                        en: 'Aggressive Paid Acquisition',
                        zh: '激进付费获取'
                    },
                    description: {
                        en: 'Spend $10M on multi-channel blitz: TV, YouTube, podcasts, influencers, billboards. Uber/Airbnb playbook: Saturate the market.',
                        zh: '在多渠道闪电战上花费1000万美元：电视、YouTube、播客、影响者、广告牌。Uber/Airbnb手册：饱和市场。'
                    },
                    icon: '💰',
                    aarrr: 'Acquisition',
                    cost: 10000000,
                    timeframe: '8周',
                    effectiveness: 0.85,
                    execute: (game) => {
                        const newUsers = Math.floor(game.metrics.users * 1.8);
                        game.metrics.users += newUsers;
                        game.metrics.budget -= 10000000;
                        game.currentWeek += 8;

                        return {
                            success: true,
                            feedback: {
                                en: `Marketing blitz! +${newUsers} users. Everyone knows your brand now. App Store: #2 overall. "Saw your ad everywhere!" Burned $10M but worth it. Keep scaling.`,
                                zh: `营销闪电战！+${newUsers}用户。现在每个人都知道你的品牌。App Store：总榜第2。"到处看到你的广告！"烧了1000万美元但值得。继续扩张。`
                            },
                            changes: []
                        };
                    }
                },
                {
                    name: {
                        en: 'International Expansion',
                        zh: '国际扩张'
                    },
                    description: {
                        en: 'Launch in 15 countries simultaneously. Hire local teams, localize product. Risky but Blitzscaling requires boldness. Inspired by Uber\'s global playbook.',
                        zh: '同时在15个国家推出。聘请本地团队，本地化产品。有风险但闪电扩张需要勇气。受Uber全球手册启发。'
                    },
                    icon: '🌍',
                    aarrr: 'Acquisition',
                    cost: 15000000,
                    timeframe: '12周',
                    effectiveness: 0.80,
                    execute: (game) => {
                        const internationalUsers = Math.floor(game.metrics.users * 2.2);
                        game.metrics.users += internationalUsers;
                        game.metrics.budget -= 15000000;
                        game.currentWeek += 12;

                        return {
                            success: true,
                            feedback: {
                                en: `Global launch! +${internationalUsers} users from 15 countries. "#1 app in Brazil, India, Indonesia!" International revenue: $8.5M. You\'re everywhere. Series C looking good.`,
                                zh: `全球发布！来自15个国家的+${internationalUsers}用户。"巴西、印度、印度尼西亚#1应用！"国际收入：850万美元。你无处不在。C轮看起来不错。`
                            },
                            changes: []
                        };
                    }
                }
            ],
            specialEvents: [],
            victoryConditions: {
                primary: {
                    en: 'Reach 5M users and $25M MRR in 18 months',
                    zh: '在18个月内达到500万用户和2500万美元月经常性收入'
                },
                secondary: {
                    en: 'Maintain >20% monthly growth and retain $5M+ cash buffer',
                    zh: '保持>20%月增长并保留500万美元+现金缓冲'
                },
                metrics: {
                    users: 5000000,
                    revenue: 25000000,
                    monthlyGrowthRate: 20,
                    budget: 5000000
                }
            },
            inspirationNote: {
                en: 'Inspired by Uber\'s $15B burned to dominate ride-sharing globally.',
                zh: '受Uber烧掉150亿美元主导全球打车市场启发。'
            }
        },

        {
            id: 'zero-budget-bootstrap',
            tier: 4,
            name: {
                en: '🎒 Zero Budget Bootstrap',
                zh: '🎒 零预算自力更生'
            },
            industry: 'Bootstrapped',
            difficulty: 'expert',
            backstory: {
                en: 'You quit your job to build your dream SaaS. No investors, no co-founder, no budget. Just you, your laptop, and $2,500 savings. You need to reach $10K MRR to quit freelancing and go full-time. But you can\'t spend money you don\'t have. Every growth hack must be free or near-free. This is pure hustle. Can you bootstrap to profitability?',
                zh: '你辞职建立梦想SaaS。没有投资者，没有联合创始人，没有预算。只有你、你的笔记本电脑和2500美元储蓄。你需要达到1万美元月经常性收入才能辞掉自由职业全职投入。但你不能花你没有的钱。每个增长黑客必须是免费或近乎免费的。这是纯粹的奋斗。你能自力更生实现盈利吗？'
            },
            startingMetrics: {
                users: 0,
                revenue: 0,
                budget: 2500,
                timeSpentBuilding: 4, // 月
                targetRevenue: 10000,
                freelanceIncome: 3500 // 每月
            },
            uniqueChallenges: [
                {
                    en: 'Literally zero marketing budget - must use only free channels',
                    zh: '实际上零营销预算 - 必须只使用免费渠道'
                },
                {
                    en: 'Competing with VC-funded competitors spending millions',
                    zh: '与花费数百万美元的风投支持竞争对手竞争'
                },
                {
                    en: 'Every month that passes without hitting $10K = longer you stay stuck',
                    zh: '每个月未达到1万美元 = 你陷入困境更久'
                }
            ],
            specialSkills: [
                {
                    name: {
                        en: 'Reddit/HackerNews Launch',
                        zh: 'Reddit/HackerNews发布'
                    },
                    description: {
                        en: 'Craft perfect "Show HN" post. Be authentic, share your story, provide value. FREE but high-impact. Inspired by countless bootstrapped successes.',
                        zh: '精心制作完美的"Show HN"帖子。真实、分享你的故事、提供价值。免费但高影响。受无数自力更生成功故事启发。'
                    },
                    icon: '📱',
                    aarrr: 'Acquisition',
                    cost: 0,
                    timeframe: '1周',
                    effectiveness: 0.70,
                    execute: (game) => {
                        const hackerNewsUsers = Math.floor(Math.random() * 500) + 200;
                        game.metrics.users += hackerNewsUsers;
                        game.currentWeek += 1;

                        return {
                            success: true,
                            feedback: {
                                en: `HN frontpage! +${hackerNewsUsers} users, 342 upvotes. "Finally, a tool that does X!" First 10 paying customers. $0 spent. This is the way.`,
                                zh: `HN首页！+${hackerNewsUsers}用户，342个赞。"终于，一个能做X的工具！"前10个付费客户。花费0美元。这就是方法。`
                            },
                            changes: []
                        };
                    }
                },
                {
                    name: {
                        en: 'Content SEO Grind',
                        zh: '内容SEO苦干'
                    },
                    description: {
                        en: 'Write 50 blog posts targeting longtail keywords. FREE but time-intensive. Inspired by Buffer\'s 0 to 100K users via blogging alone.',
                        zh: '撰写50篇博客文章针对长尾关键词。免费但耗时。受Buffer仅通过博客从0到10万用户启发。'
                    },
                    icon: '✍️',
                    aarrr: 'Acquisition',
                    cost: 0,
                    timeframe: '12周',
                    effectiveness: 0.75,
                    execute: (game) => {
                        const organicUsers = Math.floor(game.metrics.users * 0.80) + 300;
                        game.metrics.users += organicUsers;
                        game.currentWeek += 12;

                        return {
                            success: true,
                            feedback: {
                                en: `SEO paying off! +${organicUsers} organic users. 8 keywords ranking page 1. FREE traffic forever. "Found you on Google!" Bootstrap life.`,
                                zh: `SEO回报！+${organicUsers}自然用户。8个关键词排名第1页。永远免费流量。"在Google上找到你！"自力更生生活。`
                            },
                            changes: []
                        };
                    }
                }
            ],
            specialEvents: [],
            victoryConditions: {
                primary: {
                    en: 'Reach $10K MRR spending <$500 total',
                    zh: '总花费<500美元达到1万美元月经常性收入'
                },
                secondary: {
                    en: 'Build to 1,000+ users entirely through free channels',
                    zh: '完全通过免费渠道建立1000+用户'
                },
                metrics: {
                    revenue: 10000,
                    users: 1000,
                    totalSpent: 500
                }
            },
            inspirationNote: {
                en: 'Inspired by Pieter Levels: Built 12 startups to $1M+ revenue, all bootstrapped, zero funding.',
                zh: '受Pieter Levels启发：建立12个创业公司达到100万美元+收入，全部自力更生，零融资。'
            }
        },

        {
            id: 'competitor-attack',
            tier: 4,
            name: {
                en: '⚔️ Competitor Under Attack',
                zh: '⚔️ 竞争对手攻击'
            },
            industry: 'Competitive',
            difficulty: 'expert',
            backstory: {
                en: 'You\'re the market leader with 45% market share. Life is good. Then a well-funded competitor launches and declares war: "We\'re going to destroy [YourCompany]." They\'re offering your product FREE for 12 months, poaching your best employees with 2x salaries, spreading FUD in the press. Your growth rate dropped from 30% to 8%. Customers are nervous. Board is panicking. How do you defend your castle and turn defense into offense?',
                zh: '你是市场领导者，拥有45%市场份额。生活美好。然后一个资金充足的竞争对手推出并宣战："我们要摧毁[你的公司]。"他们免费提供你的产品12个月，用2倍薪水挖你最好的员工，在媒体上散布FUD。你的增长率从30%降至8%。客户紧张。董事会恐慌。你如何保卫你的城堡并将防御转为进攻？'
            },
            startingMetrics: {
                marketShare: 45,
                users: 890000,
                revenue: 18500000,
                budget: 25000000,
                growthRate: 8, // 从30%下降
                employeesPoached: 12,
                customerChurn: 18,
                competitorUsers: 120000 // 3个月内
            },
            uniqueChallenges: [
                {
                    en: 'Competitor offering your product FREE - price war is on',
                    zh: '竞争对手免费提供你的产品 - 价格战开始'
                },
                {
                    en: 'Losing best talent to 2x salary offers',
                    zh: '因2倍薪水优惠失去最佳人才'
                },
                {
                    en: 'FUD campaign damaging brand - "They\'re old tech, we\'re the future"',
                    zh: 'FUD活动损害品牌 - "他们是旧技术，我们是未来"'
                }
            ],
            specialSkills: [
                {
                    name: {
                        en: 'Aggressive Feature Release',
                        zh: '激进功能发布'
                    },
                    description: {
                        en: 'Release 10 major features in 3 months. Out-innovate them. Make them look slow. Inspired by how Notion crushed competitors through speed.',
                        zh: '3个月内发布10个主要功能。创新超越他们。让他们看起来缓慢。受Notion如何通过速度击溃竞争对手启发。'
                    },
                    icon: '🚀',
                    aarrr: 'Retention',
                    cost: 5000000,
                    timeframe: '12周',
                    effectiveness: 0.85,
                    execute: (game) => {
                        game.metrics.customerChurn -= 12;
                        game.metrics.growthRate += 18;
                        game.metrics.budget -= 5000000;
                        game.currentWeek += 12;

                        return {
                            success: true,
                            feedback: {
                                en: `Innovation blitz! 10 features shipped. Churn: 18%→6%. Growth: 8%→26%. "Competitor can\'t keep up!" Press: "Market leader shows why they\'re #1." Momentum shifted.`,
                                zh: `创新闪电战！10个功能发布。流失：18%→6%。增长：8%→26%。"竞争对手跟不上！"媒体："市场领导者展示了为什么他们是第一。"势头转移。`
                            },
                            changes: []
                        };
                    }
                },
                {
                    name: {
                        en: 'Customer Loyalty Program',
                        zh: '客户忠诚计划'
                    },
                    description: {
                        en: 'Reward longtime customers: "Been with us 2+ years? 50% discount forever + VIP support." Make switching painful. Inspired by Amazon Prime\'s lock-in.',
                        zh: '奖励长期客户："与我们在一起2年以上？永久50%折扣+VIP支持。"让切换变得痛苦。受Amazon Prime锁定启发。'
                    },
                    icon: '🏆',
                    aarrr: 'Retention',
                    cost: 3000000,
                    timeframe: '4周',
                    effectiveness: 0.90,
                    execute: (game) => {
                        game.metrics.customerChurn -= 8;
                        const loyalUsers = Math.floor(game.metrics.users * 0.35);
                        game.metrics.budget -= 3000000;
                        game.currentWeek += 4;

                        return {
                            success: true,
                            feedback: {
                                en: `Loyalty works! ${loyalUsers} customers locked in. "Why would I leave?" Competitor growth stalled. "Can\'t match incumbent\'s relationships." You won.`,
                                zh: `忠诚有效！${loyalUsers}客户锁定。"我为什么要离开？"竞争对手增长停滞。"无法匹配现有者的关系。"你赢了。`
                            },
                            changes: []
                        };
                    }
                }
            ],
            specialEvents: [],
            victoryConditions: {
                primary: {
                    en: 'Maintain 40%+ market share and return to 25%+ growth',
                    zh: '保持40%+市场份额并恢复到25%+增长'
                },
                secondary: {
                    en: 'Reduce churn to <5% and force competitor to pivot/exit',
                    zh: '将流失率降至<5%并迫使竞争对手转型/退出'
                },
                metrics: {
                    marketShare: 40,
                    growthRate: 25,
                    customerChurn: 5,
                    competitorMarketShare: 15 // 压制到<15%
                }
            },
            inspirationNote: {
                en: 'Inspired by Microsoft vs Netscape: Bundled IE with Windows, Netscape market share collapsed.',
                zh: '受微软对抗Netscape启发：将IE捆绑Windows，Netscape市场份额崩溃。'
            }
        }
    ]
};

// Export for use in game engine
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SCENARIOS_LIBRARY;
}
