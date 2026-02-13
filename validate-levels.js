// 简单验证脚本
const fs = require('fs');

// 读取文件
const content = fs.readFileSync('./levels-data.js', 'utf8');

// 使用Function构造器来执行代码并返回LEVELS_DATA
const getLevelsData = new Function(content + '\nreturn LEVELS_DATA;');
const LEVELS_DATA = getLevelsData();

console.log('\n✅ JavaScript语法检查通过');
console.log('✅ 数据加载成功\n');

console.log('📊 关卡总数:', LEVELS_DATA.length);
console.log('\n' + '═'.repeat(80));
console.log('关卡列表:');
console.log('═'.repeat(80));

LEVELS_DATA.forEach(level => {
    console.log(`\n✨ 关卡 ${level.id}: ${level.title}`);
    console.log(`   🎯 目标: ${level.objective.substring(0, 50)}...`);
    console.log(`   ⏰ 时限: ${level.timeLimit}分钟`);
    console.log(`   🎬 场景时间: ${level.scene.time}`);
    console.log(`   🎮 行动数量: ${level.actions.length}个`);
    console.log(`   ❓ 问题数量: ${level.questions.length}个`);
    console.log(`   👤 利益相关者: ${level.stakeholder}`);

    // 验证数据完整性
    let warnings = [];

    // 检查行动
    if (level.actions.length !== 6) {
        warnings.push(`⚠️  行动数量不是6个 (当前: ${level.actions.length})`);
    }
    level.actions.forEach((action, i) => {
        if (!action.id || !action.name || !action.desc || action.time === undefined || action.value === undefined || action.critical === undefined) {
            warnings.push(`⚠️  行动#${i+1} (${action.name || '未命名'}) 缺少必要字段`);
        }
    });

    // 检查问题
    if (level.questions.length !== 3) {
        warnings.push(`⚠️  问题数量不是3个 (当前: ${level.questions.length})`);
    }
    level.questions.forEach((q, i) => {
        if (!q.question) {
            warnings.push(`⚠️  问题#${i+1} 没有问题文本`);
        }
        if (!q.options || q.options.length !== 4) {
            warnings.push(`⚠️  问题#${i+1} 选项数量不是4个 (当前: ${q.options?.length || 0})`);
        }
        const correctCount = q.options?.filter(opt => opt.correct === true).length || 0;
        if (correctCount !== 1) {
            warnings.push(`⚠️  问题#${i+1} 正确答案数量不是1个 (当前: ${correctCount})`);
        }
    });

    // 输出警告
    if (warnings.length > 0) {
        console.log('\n   警告:');
        warnings.forEach(w => console.log(`   ${w}`));
    } else {
        console.log('   ✅ 数据完整性验证通过');
    }
});

console.log('\n' + '═'.repeat(80));
console.log('\n📈 统计信息:');
console.log('═'.repeat(80));
console.log(`   关卡总数: ${LEVELS_DATA.length}/10 ${LEVELS_DATA.length === 10 ? '✅' : '❌'}`);
console.log(`   总行动数: ${LEVELS_DATA.reduce((sum, l) => sum + l.actions.length, 0)}个 (预期60个)`);
console.log(`   总问题数: ${LEVELS_DATA.reduce((sum, l) => sum + l.questions.length, 0)}个 (预期30个)`);
console.log(`   总选项数: ${LEVELS_DATA.reduce((sum, l) => sum + l.questions.reduce((s, q) => s + (q.options?.length || 0), 0), 0)}个 (预期120个)`);

// 检查ID是否连续
const ids = LEVELS_DATA.map(l => l.id).sort((a, b) => a - b);
const expectedIds = Array.from({length: 10}, (_, i) => i + 1);
const idsMatch = JSON.stringify(ids) === JSON.stringify(expectedIds);
console.log(`   关卡ID连续性: ${idsMatch ? '✅' : '❌'} (${ids.join(', ')})`);

console.log('\n' + '═'.repeat(80));
if (LEVELS_DATA.length === 10) {
    console.log('\n🎉 恭喜！所有10个关卡数据已完整添加！\n');
} else {
    console.log(`\n⚠️  注意：当前只有${LEVELS_DATA.length}个关卡，还需要添加${10 - LEVELS_DATA.length}个关卡。\n`);
}
