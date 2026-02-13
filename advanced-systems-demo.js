// Advanced Systems Integration Demo
// 高级系统集成演示

/**
 * This file demonstrates how to use the enhanced game engine with:
 * 1. Multi-resource management
 * 2. Decision dependency chains
 * 3. Combo system
 * 4. Meta-progression system
 */

// Example 1: Initialize game with advanced systems
function initializeAdvancedGame() {
    // Create game engine
    const game = new GrowthGameEngineV2({
        mode: 'real',
        difficulty: 'medium',
        company: 'MyStartup',
        industry: 'saas',
        initialUsers: 3000
    });

    // Initialize combo and meta-progression systems
    const systems = game.initializeAdvancedSystems();

    console.log('Advanced systems initialized:', systems);
    console.log('Initial metrics:', game.getMetrics());

    return game;
}

// Example 2: Execute skill with full system integration
function executeSkillWithAllSystems(game, skillIndex, decisionChoices) {
    console.log('--- Executing Skill with Advanced Systems ---');

    // Get current state before execution
    const beforeState = {
        users: game.metrics.users,
        revenue: game.metrics.revenue,
        combo: game.comboState.currentCombo,
        teamEnergy: game.metrics.teamEnergy
    };

    // Execute skill with all systems
    const result = game.executeSkillWithAdvancedSystems(skillIndex, decisionChoices);

    console.log('Execution result:', result);

    // Display synergies
    if (result.activeSynergies && result.activeSynergies.length > 0) {
        console.log('\n✨ Active Synergies:');
        result.activeSynergies.forEach(synergy => {
            console.log(`  ${synergy.icon} ${synergy.name}`);
            console.log(`     ${synergy.description}`);
            console.log(`     Multiplier: ${synergy.multiplier}x`);
        });
    }

    // Display combo state
    if (result.comboBonus) {
        console.log(`\n🔥 ${result.comboBonus.name}`);
        console.log(`   ${result.comboBonus.description}`);
    }

    // Display combo insights
    const comboInsights = game.getComboInsights();
    if (comboInsights) {
        console.log('\n📊 Combo Insights:');
        console.log(`   Current Combo: ${comboInsights.currentCombo}`);
        console.log(`   Max Combo: ${comboInsights.maxCombo}`);
        console.log(`   On Fire: ${comboInsights.onFire}`);

        if (comboInsights.discoveredCombos.length > 0) {
            console.log('\n   Discovered Hidden Combos:');
            comboInsights.discoveredCombos.forEach(combo => {
                console.log(`     ${combo.icon} ${combo.name}`);
            });
        }
    }

    // Display decision chain insights
    const chainInsights = game.getDecisionChainInsights();
    console.log('\n🔗 Decision Chain Insights:');
    console.log(`   Total Decisions: ${chainInsights.totalDecisions}`);
    console.log(`   Excellent: ${chainInsights.excellentCount}`);
    console.log(`   Good: ${chainInsights.goodCount}`);
    console.log(`   Poor: ${chainInsights.poorCount}`);

    if (chainInsights.unlockedOptions.length > 0) {
        console.log(`\n   Unlocked Options:`);
        chainInsights.unlockedOptions.forEach(opt => console.log(`     ✓ ${opt}`));
    }

    return result;
}

// Example 3: Complete game and save to meta-progression
function completeGameWithMetaProgression(game) {
    console.log('\n--- Completing Game ---');

    const summary = game.completeGame();

    console.log('Game Summary:', summary);

    if (summary.metaProgression) {
        console.log('\n🎉 Meta-Progression Updated:');
        console.log(`   XP Awarded: ${summary.metaProgression.xpAwarded}`);
        console.log(`   XP Reasons:`);
        summary.metaProgression.xpReasons.forEach(reason => {
            console.log(`     - ${reason}`);
        });

        if (summary.metaProgression.xpResult.levelUps.length > 0) {
            console.log('\n   🎊 LEVEL UP!');
            summary.metaProgression.xpResult.levelUps.forEach(levelUp => {
                console.log(`     New Level: ${levelUp.newLevel}`);
                console.log(`     Rewards:`, levelUp.reward);
            });
        }
    }

    return summary;
}

// Example 4: Use meta-progression to unlock skills
function manageSkillTree(metaProgression) {
    console.log('\n--- Managing Skill Tree ---');

    // Get skill tree progress
    const progress = metaProgression.getSkillTreeProgress();
    console.log('Skill Tree Progress:');
    console.log(`  Unlocked: ${progress.unlockedSkills}/${progress.totalSkills} (${progress.unlockedPercentage}%)`);
    console.log(`  Levels: ${progress.currentLevels}/${progress.totalLevels} (${progress.levelPercentage}%)`);

    // Unlock a new skill
    console.log('\n🔓 Unlocking Skills:');

    const result1 = metaProgression.unlockSkill('kol-collab', 'acquisition');
    console.log(`  ${result1.success ? '✓' : '✗'} ${result1.message}`);

    const result2 = metaProgression.unlockSkill('onboarding', 'activation');
    console.log(`  ${result2.success ? '✓' : '✗'} ${result2.message}`);

    // Upgrade a skill
    console.log('\n⬆️ Upgrading Skills:');
    const upgradeResult = metaProgression.upgradeSkill('content-seo', 'acquisition');
    console.log(`  ${upgradeResult.success ? '✓' : '✗'} ${upgradeResult.message}`);

    // Get unlocked skills
    const unlockedSkills = metaProgression.getUnlockedSkills();
    console.log('\n📋 Unlocked Skills:');
    unlockedSkills.forEach(category => {
        console.log(`  ${category.category}:`);
        category.skills.forEach(skill => {
            console.log(`    - ${skill.name} (Lv.${skill.level}/${skill.maxLevel})`);
        });
    });

    return progress;
}

// Example 5: Resource management scenario
function demonstrateResourceManagement(game) {
    console.log('\n--- Resource Management Demo ---');

    // Check current resources
    console.log('Current Resources:');
    console.log(`  Budget: $${game.metrics.budget}`);
    console.log(`  Team Energy: ${game.metrics.teamEnergy}%`);
    console.log(`  Market Timing: ${game.metrics.marketTiming}%`);
    console.log(`  User Trust: ${game.metrics.userTrust}%`);
    console.log(`  Brand Reputation: ${game.metrics.brandReputation}%`);

    // Try an action with resource constraints
    console.log('\n🔍 Checking Resource Constraints:');
    const constraints = game.checkResourceConstraints({
        budget: 2000,
        teamEnergy: 30
    });

    if (constraints.canProceed) {
        console.log('  ✓ Sufficient resources for action');
    } else {
        console.log('  ✗ Insufficient resources:');
        constraints.constraints.forEach(c => {
            console.log(`     ${c.message}`);
        });
    }

    // Demonstrate rest and recovery
    if (game.metrics.teamEnergy < 40) {
        console.log('\n💤 Team needs rest...');
        const restResult = game.restAndRecover(1);
        console.log(`  ${restResult.message}`);
        console.log(`  Team Energy now: ${restResult.teamEnergy}%`);
    }

    return game.metrics;
}

// Example 6: Full game playthrough example
function fullGamePlaythrough() {
    console.log('=== FULL GAME PLAYTHROUGH DEMO ===\n');

    // Initialize
    const game = initializeAdvancedGame();

    // Play through several levels
    console.log('\n📍 Level 1: Acquisition');

    const level1Decisions = [
        { text: '周二上午 Tuesday Morning', impact: { effectiveness: 1.3, cost: 0 } },
        { text: '专业演示视频 Professional demo video', impact: { effectiveness: 1.4, cost: 300 } },
        { text: '提前2周在Twitter/Reddit预热', impact: { effectiveness: 1.3, cost: 200, teamEnergy: -10 } }
    ];

    const result1 = executeSkillWithAllSystems(game, 0, level1Decisions);

    // Check resources after first level
    demonstrateResourceManagement(game);

    // Continue playing...
    console.log('\n📍 Level 2: Activation');

    const level2Decisions = [
        { text: '行业痛点解决方案', impact: { effectiveness: 1.4, cost: 0 } },
        { text: '长尾关键词快速排名', impact: { effectiveness: 1.0, cost: 500, weeks: 3 } },
        { text: '每周1篇精品', impact: { effectiveness: 1.0, cost: 600, teamEnergy: -5 } }
    ];

    const result2 = executeSkillWithAllSystems(game, 0, level2Decisions);

    // Get combo insights
    const comboInsights = game.getComboInsights();
    console.log('\n🎯 Current Game State:');
    console.log(`  Users: ${game.metrics.users.toLocaleString()}`);
    console.log(`  Revenue: $${game.metrics.revenue.toLocaleString()}`);
    console.log(`  Combo: ${comboInsights.currentCombo}x`);
    console.log(`  Weeks Left: ${game.weeksRemaining}`);

    // Complete game
    const summary = completeGameWithMetaProgression(game);

    // Manage skill tree
    if (game.metaProgression) {
        manageSkillTree(game.metaProgression);
    }

    return {
        game,
        summary
    };
}

// Example 7: Export/Import save data
function demonstrateSaveSystem(metaProgression) {
    console.log('\n--- Save System Demo ---');

    // Export progress
    const saveData = metaProgression.exportProgress();
    console.log('✓ Progress exported');
    console.log(`  Player Level: ${saveData.playerProfile.level}`);
    console.log(`  Total XP: ${saveData.playerProfile.totalXP}`);
    console.log(`  Games Played: ${saveData.playerProfile.gamesPlayed}`);

    // Simulate saving to file
    const saveString = JSON.stringify(saveData);
    console.log(`\n💾 Save Data Size: ${saveString.length} bytes`);

    // Import progress (simulate loading)
    const importResult = metaProgression.importProgress(saveData);
    console.log(`\n${importResult.success ? '✓' : '✗'} ${importResult.message}`);

    return saveData;
}

// Example 8: API usage guide
const API_GUIDE = {
    'Initialize Game': {
        code: `
const game = new GrowthGameEngineV2({
    mode: 'real',
    difficulty: 'medium',
    company: 'MyStartup',
    industry: 'saas'
});

game.initializeAdvancedSystems();
        `,
        description: 'Create and initialize game with all advanced systems'
    },

    'Execute Skill with Combos': {
        code: `
const decisions = [
    { text: '选项1', impact: { effectiveness: 1.3, cost: 500 } },
    { text: '选项2', impact: { effectiveness: 1.2, teamEnergy: -10 } }
];

const result = game.executeSkillWithAdvancedSystems(0, decisions);
        `,
        description: 'Execute a skill with decision choices and get combo bonuses'
    },

    'Check Resources': {
        code: `
const constraints = game.checkResourceConstraints({
    budget: 2000,
    teamEnergy: 30
});

if (!constraints.canProceed) {
    console.log('Not enough resources:', constraints.constraints);
}
        `,
        description: 'Check if player has enough resources for an action'
    },

    'Manage Skill Tree': {
        code: `
const metaProgression = new MetaProgressionSystem();

// Unlock skill
metaProgression.unlockSkill('kol-collab', 'acquisition');

// Upgrade skill
metaProgression.upgradeSkill('content-seo', 'acquisition');

// Get progress
const progress = metaProgression.getSkillTreeProgress();
        `,
        description: 'Unlock and upgrade skills in the skill tree'
    },

    'Complete Game': {
        code: `
const summary = game.completeGame();

console.log('XP Awarded:', summary.metaProgression.xpAwarded);
console.log('Level Ups:', summary.metaProgression.xpResult.levelUps);
        `,
        description: 'Complete game and record progress to meta-progression'
    }
};

// Run demo if in browser
if (typeof window !== 'undefined') {
    window.AdvancedSystemsDemo = {
        initializeAdvancedGame,
        executeSkillWithAllSystems,
        completeGameWithMetaProgression,
        manageSkillTree,
        demonstrateResourceManagement,
        fullGamePlaythrough,
        demonstrateSaveSystem,
        API_GUIDE
    };

    console.log('Advanced Systems Demo loaded!');
    console.log('Run AdvancedSystemsDemo.fullGamePlaythrough() to see a complete example');
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeAdvancedGame,
        executeSkillWithAllSystems,
        completeGameWithMetaProgression,
        manageSkillTree,
        demonstrateResourceManagement,
        fullGamePlaythrough,
        demonstrateSaveSystem,
        API_GUIDE
    };
}
