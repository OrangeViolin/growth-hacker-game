// 测试脚本：验证levels-data.js的完整性

// 加载关卡数据
const fs = require('fs');
const path = require('path');

const levelsContent = fs.readFileSync(path.join(__dirname, 'levels-data.js'), 'utf8');

// 执行文件内容
eval(levelsContent);

console.log('✅ JavaScript语法检查通过');
console.log('✅ 数据加载成功\n');

console.log('📊 关卡总数:', LEVELS_DATA.length);
console.log('\n关卡列表:');
console.log('═'.repeat(80));

LEVELS_DATA.forEach(level => {
    console.log(`\n关卡 ${level.id}: ${level.title}`);
    console.log(`  目标: ${level.objective}`);
    console.log(`  时限: ${level.timeLimit}分钟`);
    console.log(`  行动数: ${level.actions.length}个`);
    console.log(`  问题数: ${level.questions.length}个`);
    console.log(`  利益相关者: ${level.stakeholder}`);

    // 验证每个行动都有必要字段
    level.actions.forEach((action, i) => {
        if (!action.id || !action.name || !action.desc || action.time === undefined || action.value === undefined) {
            console.log(`  ⚠️  行动 ${i+1} 缺少必要字段`);
        }
    });

    // 验证每个问题都有4个选项
    level.questions.forEach((q, i) => {
        if (!q.options || q.options.length !== 4) {
            console.log(`  ⚠️  问题 ${i+1} 选项数量不是4个 (当前: ${q.options?.length || 0})`);
        }
        // 检查是否至少有一个正确答案
        const hasCorrect = q.options.some(opt => opt.correct === true);
        if (!hasCorrect) {
            console.log(`  ⚠️  问题 ${i+1} 没有正确答案`);
        }
    });
});

console.log('\n' + '═'.repeat(80));
console.log('\n✅ 所有关卡数据验证完成！');
console.log(`\n总结:`);
console.log(`  - 关卡总数: ${LEVELS_DATA.length}/10`);
console.log(`  - 总行动数: ${LEVELS_DATA.reduce((sum, l) => sum + l.actions.length, 0)}个`);
console.log(`  - 总问题数: ${LEVELS_DATA.reduce((sum, l) => sum + l.questions.length, 0)}个`);
console.log(`  - 总选项数: ${LEVELS_DATA.reduce((sum, l) => sum + l.questions.reduce((s, q) => s + q.options.length, 0), 0)}个`);
