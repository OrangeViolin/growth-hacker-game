// Decision UI Component for Game Mode V2
// 决策界面组件

class DecisionUI {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentDecisionIndex = 0;
        this.decisions = [];
        this.userChoices = [];
    }

    showDecisionSequence(skill, decisions, onComplete) {
        this.decisions = decisions;
        this.userChoices = [];
        this.currentDecisionIndex = 0;
        this.onComplete = onComplete;

        this.renderHeader(skill);
        this.renderDecision(0);
    }

    renderHeader(skill) {
        const header = `
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 15px; margin-bottom: 30px; color: white;">
                <h2 style="margin-bottom: 15px;">
                    ${skill.icon} ${skill.name}
                </h2>
                <p style="opacity: 0.9; font-size: 1.1em;">${skill.description}</p>
                <div style="margin-top: 20px; background: rgba(255,255,255,0.2); padding: 15px; border-radius: 10px;">
                    <strong>💰 基础成本 Base Cost:</strong> $${skill.cost}<br>
                    <strong>⏱️ 预计时间 Estimated Time:</strong> ${skill.timeframe}<br>
                    <strong>🎯 AARRR:</strong> ${skill.aarrr}
                </div>
            </div>

            <div class="progress-bar-container" style="margin-bottom: 30px;">
                <div class="progress-bar" id="decision-progress" style="width: 0%;">
                    步骤 0/${this.decisions.length}
                </div>
            </div>
        `;

        this.container.innerHTML = header + '<div id="decision-content"></div>';
    }

    renderDecision(index) {
        const decision = this.decisions[index];
        const progress = ((index) / this.decisions.length) * 100;

        document.getElementById('decision-progress').style.width = progress + '%';
        document.getElementById('decision-progress').textContent = `步骤 ${index + 1}/${this.decisions.length}`;

        const html = `
            <div class="decision-card" style="animation: fadeIn 0.5s;">
                <h3 style="font-size: 1.5em; margin-bottom: 15px; color: #667eea;">
                    ${decision.question}
                </h3>
                <p style="color: #6c757d; margin-bottom: 30px; font-size: 1.1em; line-height: 1.6;">
                    ${decision.description}
                </p>

                <div class="decision-options" style="display: grid; gap: 20px;">
                    ${decision.options.map((option, i) => this.renderOption(option, i)).join('')}
                </div>

                <div style="margin-top: 30px; text-align: center;">
                    ${index > 0 ? `
                        <button class="btn btn-secondary" onclick="decisionUI.previousDecision()">
                            ← 上一步 Previous
                        </button>
                    ` : ''}
                    
                    <button class="btn" id="ai-advisor-btn" onclick="decisionUI.useAIAdvisor()" style="margin-left: 15px;">
                        🤖 AI顾问 (剩余 <span id="ai-uses"></span> 次)
                    </button>
                </div>

                <div id="ai-advice" style="display: none; margin-top: 20px; padding: 20px; background: #e3f2fd; border-radius: 12px; border-left: 4px solid #2196f3;">
                </div>
            </div>
        `;

        document.getElementById('decision-content').innerHTML = html;

        // Update AI advisor uses
        if (window.gameEngine) {
            document.getElementById('ai-uses').textContent = gameEngine.aiAdvisorUses;
        }
    }

    renderOption(option, index) {
        const costIndicator = option.impact.cost > 0 
            ? `<span style="color: #dc3545;">+$${option.impact.cost}</span>`
            : option.impact.cost < 0
            ? `<span style="color: #28a745;">-$${Math.abs(option.impact.cost)}</span>`
            : '<span style="color: #6c757d;">$0</span>';

        const effectIndicator = option.impact.effectiveness > 1
            ? `<span style="color: #28a745;">↑ ${Math.round((option.impact.effectiveness - 1) * 100)}%</span>`
            : option.impact.effectiveness < 1
            ? `<span style="color: #dc3545;">↓ ${Math.round((1 - option.impact.effectiveness) * 100)}%</span>`
            : '<span style="color: #6c757d;">标准 Standard</span>';

        return `
            <div class="decision-option-card" onclick="decisionUI.selectOption(${index})" 
                 style="background: white; padding: 25px; border-radius: 15px; border: 3px solid #e9ecef; cursor: pointer; transition: all 0.3s;">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                    <h4 style="font-size: 1.2em; color: #333; margin: 0;">${option.text}</h4>
                    <div style="text-align: right; font-size: 0.9em;">
                        <div><strong>成本:</strong> ${costIndicator}</div>
                        <div><strong>效果:</strong> ${effectIndicator}</div>
                        ${option.impact.teamEnergy ? `<div><strong>精力:</strong> <span style="color: ${option.impact.teamEnergy > 0 ? '#28a745' : '#dc3545'}">${option.impact.teamEnergy > 0 ? '+' : ''}${option.impact.teamEnergy}%</span></div>` : ''}
                    </div>
                </div>
                <p style="color: #6c757d; line-height: 1.6; font-size: 0.95em;">
                    ${option.explanation}
                </p>
            </div>
        `;
    }

    selectOption(optionIndex) {
        const decision = this.decisions[this.currentDecisionIndex];
        const option = decision.options[optionIndex];

        // Store choice
        this.userChoices[this.currentDecisionIndex] = option;

        // Highlight selected
        const options = document.querySelectorAll('.decision-option-card');
        options.forEach((el, i) => {
            if (i === optionIndex) {
                el.style.borderColor = '#667eea';
                el.style.background = '#f0f4ff';
            } else {
                el.style.borderColor = '#e9ecef';
                el.style.background = 'white';
            }
        });

        // Auto-advance after 1 second
        setTimeout(() => {
            if (this.currentDecisionIndex < this.decisions.length - 1) {
                this.nextDecision();
            } else {
                this.completeDecisions();
            }
        }, 800);
    }

    nextDecision() {
        this.currentDecisionIndex++;
        this.renderDecision(this.currentDecisionIndex);
    }

    previousDecision() {
        if (this.currentDecisionIndex > 0) {
            this.currentDecisionIndex--;
            this.renderDecision(this.currentDecisionIndex);
        }
    }

    useAIAdvisor() {
        if (!window.gameEngine) return;

        const advice = gameEngine.useAIAdvisor({
            decisionIndex: this.currentDecisionIndex,
            decision: this.decisions[this.currentDecisionIndex]
        });

        if (!advice.available) {
            alert(advice.message);
            return;
        }

        const adviceEl = document.getElementById('ai-advice');
        adviceEl.innerHTML = advice.advice.replace(/\n/g, '<br>');
        adviceEl.style.display = 'block';

        document.getElementById('ai-uses').textContent = advice.remaining;
    }

    completeDecisions() {
        // Show summary before executing
        this.showDecisionSummary();
    }

    showDecisionSummary() {
        document.getElementById('decision-progress').style.width = '100%';
        document.getElementById('decision-progress').textContent = `完成 Complete`;

        let totalCost = 0;
        let totalWeeks = 0;
        let avgEffectiveness = 1.0;

        this.userChoices.forEach(choice => {
            if (choice.impact.cost) totalCost += choice.impact.cost;
            if (choice.impact.weeks) totalWeeks = Math.max(totalWeeks, choice.impact.weeks);
            if (choice.impact.effectiveness) avgEffectiveness *= choice.impact.effectiveness;
        });

        const html = `
            <div style="background: white; padding: 40px; border-radius: 15px; text-align: center;">
                <h3 style="font-size: 2em; margin-bottom: 30px; color: #667eea;">
                    ✅ 决策完成！Ready to Execute
                </h3>

                <div style="background: #f8f9fa; padding: 25px; border-radius: 12px; margin-bottom: 30px;">
                    <h4 style="margin-bottom: 20px;">你的决策方案 Your Decision Path:</h4>
                    ${this.userChoices.map((choice, i) => `
                        <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 8px; text-align: left;">
                            <strong>${i + 1}. ${this.decisions[i].question}</strong><br>
                            <span style="color: #667eea;">→ ${choice.text}</span>
                        </div>
                    `).join('')}
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-bottom: 30px;">
                    <div style="background: #e3f2fd; padding: 20px; border-radius: 12px;">
                        <div style="font-size: 0.9em; color: #666;">总成本 Total Cost</div>
                        <div style="font-size: 2em; font-weight: bold; color: #2196f3;">$${totalCost + (this.decisions[0].skill?.cost || 0)}</div>
                    </div>
                    <div style="background: #f3e5f5; padding: 20px; border-radius: 12px;">
                        <div style="font-size: 0.9em; color: #666;">预计时间 Time</div>
                        <div style="font-size: 2em; font-weight: bold; color: #9c27b0;">${totalWeeks || 2}周</div>
                    </div>
                    <div style="background: #e8f5e9; padding: 20px; border-radius: 12px;">
                        <div style="font-size: 0.9em; color: #666;">效果系数 Effect</div>
                        <div style="font-size: 2em; font-weight: bold; color: #4caf50;">${avgEffectiveness.toFixed(2)}x</div>
                    </div>
                </div>

                <button class="btn" onclick="decisionUI.executeStrategy()" style="font-size: 1.2em; padding: 20px 50px;">
                    ⚡ 执行策略！Execute Strategy
                </button>
            </div>
        `;

        document.getElementById('decision-content').innerHTML = html;
    }

    executeStrategy() {
        if (this.onComplete) {
            this.onComplete(this.userChoices);
        }
    }
}

// Make it globally available
if (typeof window !== 'undefined') {
    window.DecisionUI = DecisionUI;
}
