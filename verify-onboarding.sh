#!/bin/bash

echo "=========================================="
echo "  新手引导系统验证脚本"
echo "=========================================="
echo ""

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查计数
PASSED=0
FAILED=0

# 检查函数
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $2"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} $2 (文件不存在)"
        ((FAILED++))
    fi
}

check_content() {
    if grep -q "$2" "$1" 2>/dev/null; then
        echo -e "${GREEN}✓${NC} $3"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} $3 (未找到)"
        ((FAILED++))
    fi
}

echo "1. 检查核心文件..."
echo "---"
check_file "onboarding.js" "onboarding.js 核心系统"
check_file "crisis-mission.html" "crisis-mission.html 游戏主页"
check_file "test-onboarding.html" "test-onboarding.html 测试页面"
check_file "test-onboarding-integration.html" "test-onboarding-integration.html 验证工具"
echo ""

echo "2. 检查文档..."
echo "---"
check_file "ONBOARDING_SYSTEM_README.md" "详细使用文档"
check_file "ONBOARDING_IMPLEMENTATION.md" "实现总结"
check_file "ONBOARDING_QUICK_START.md" "快速启动指南"
echo ""

echo "3. 检查系统整合..."
echo "---"
check_content "crisis-mission.html" "onboarding.js" "crisis-mission.html 引入引导脚本"
check_content "crisis-mission.html" "OnboardingSystem.init" "crisis-mission.html 初始化引导"
check_content "crisis-mission.html" "onOnboardingComplete" "crisis-mission.html 完成回调"
echo ""

echo "4. 检查核心功能..."
echo "---"
check_content "onboarding.js" "OnboardingSystem" "OnboardingSystem 对象"
check_content "onboarding.js" "init()" "init() 方法"
check_content "onboarding.js" "reset()" "reset() 方法"
check_content "onboarding.js" "localStorage" "localStorage 状态管理"
check_content "onboarding.js" "steps:" "引导步骤配置"
echo ""

echo "5. 检查引导步骤..."
echo "---"
check_content "onboarding.js" "type: 'story'" "故事步骤"
check_content "onboarding.js" "type: 'interactive'" "互动步骤"
check_content "onboarding.js" "type: 'reward'" "奖励步骤"
check_content "onboarding.js" "type: 'tips'" "提示步骤"
echo ""

echo "=========================================="
echo "  验证结果"
echo "=========================================="
echo -e "通过: ${GREEN}${PASSED}${NC}"
echo -e "失败: ${RED}${FAILED}${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ 所有检查通过！系统已准备就绪。${NC}"
    echo ""
    echo "下一步："
    echo "1. 打开 crisis-mission.html 体验引导"
    echo "2. 打开 test-onboarding.html 测试功能"
    echo "3. 查看 ONBOARDING_QUICK_START.md 了解更多"
    exit 0
else
    echo -e "${RED}✗ 部分检查失败，请检查上述错误。${NC}"
    exit 1
fi
