# 🎮 Quick Start - Testing the Enhanced Game

## How to Test the Integrated Game

### Step 1: Open the Game

```bash
cd /Users/mac/growth-hacker-game
open game-mode.html
```

Or use a local web server:
```bash
python3 -m http.server 8000
# Then open: http://localhost:8000/game-mode.html
```

---

## Test Scenario 1: Real Business Mode (Full Features)

### What to Test:
1. ✅ Difficulty selection
2. ✅ Multi-step decision system
3. ✅ Resource management
4. ✅ Combo detection
5. ✅ Meta-progression

### Steps:

**1. Start the Game**
- Click "真实业务模式 Real Business Mode"

**2. Fill in Business Info**
```
Company Name: MyStartup
Industry: SaaS软件服务
Current Users: 1000
Monthly Revenue: 5000
Budget: 10000
Core Challenge: Need to improve user activation and retention
Difficulty: 中等 Medium
```
- Click "🚀 开始游戏 Start Game"

**3. Play Level 1 - Acquisition**
- You'll see a dashboard with 7 metrics:
  - Users, Revenue, Budget (standard)
  - Team Energy, Market Timing, User Trust, Brand Reputation (NEW!)
- Select a skill card (try "Product Hunt发布")
- Click "⚡ 执行策略 Execute Strategy"

**4. Make Decisions** (NEW FEATURE!)
- You'll now see 3-5 decision points
- Each choice shows:
  - Cost impact (+$500 or -$200)
  - Effectiveness (↑15% or ↓10%)
  - Team Energy impact (if any)
- Read each option carefully
- Select your preferred choice for each decision
- Auto-advances after selection

**5. Review Summary**
- See your complete decision path
- See total cost, time, and effectiveness multiplier
- Click "⚡ 执行策略！Execute Strategy"

**6. View Results**
- See animated metric updates
- Look for synergy bonuses (if you used related skills)
- Look for combo streak status (On Fire after 3 excellent decisions)
- Check achievement unlocks

**7. Continue Through Levels**
- Play through all 6 levels (Acquisition → Activation → Retention → Revenue → Referral → Final Push)
- Try to make excellent decisions to build combos

**8. Final Results**
- Complete the game to see the final plan
- **NEW**: Meta-progression panel shows:
  - Your player level
  - XP earned this game
  - Total games played
  - Progress to next level
- Download the growth plan

---

## Test Scenario 2: AI Challenge Mode (Quick Test)

### What to Test:
1. ✅ Difficulty selection UI
2. ✅ AI-generated scenario
3. ✅ Quick gameplay

### Steps:

**1. Start AI Challenge**
- Click "🎮 AI生成挑战 AI Challenge Mode"

**2. Select Difficulty**
- Choose "简单 Easy" for testing (or any difficulty)

**3. Play Quickly**
- Game auto-generates a scenario
- Select any skill card
- Go through decision sequence
- Complete a few levels to test

---

## Test Scenario 3: Combo System

### What to Test:
1. ✅ Synergy detection
2. ✅ Combo streak
3. ✅ Hidden combos

### Steps:

**1. Use Related Skills**
Try this sequence in a single game to trigger synergies:

**Level 1 (Acquisition):**
- Use: "内容营销+SEO"

**Level 2 (Activation):**
- Use: "AB测试优化"

**Level 3 (Retention):**
- Use: "邮件营销自动化"

**Level 4 (Revenue):**
- Use: "定价策略优化"

This should trigger the **"SEO内容王者"** synergy combo!

**2. Build a Streak**
- Make excellent decisions (high growth, low cost, efficient)
- After 2 excellent decisions → See "2x Combo"
- After 3 excellent decisions → See "🔥 ON FIRE"
- After 5 excellent decisions → See "⚡ LEGENDARY"

---

## Test Scenario 4: Meta-Progression

### What to Test:
1. ✅ XP earning
2. ✅ Level progression
3. ✅ Persistence across sessions

### Steps:

**1. Complete First Game**
- Play through all 6 levels
- Note your XP and level at the end

**2. Play Again**
- Refresh the page
- Start a new game
- Open browser console (F12) and type:
  ```javascript
  console.log(metaProgression.playerProfile);
  ```
- You should see your progress persisted!

**3. Check Skill Tree**
- In console:
  ```javascript
  console.log(metaProgression.getSkillTreeProgress());
  ```
- Should show unlocked percentage

**4. Unlock a Skill**
- In console:
  ```javascript
  metaProgression.unlockSkill('kol-collab', 'acquisition');
  ```
- Should succeed if you have enough XP

---

## Test Scenario 5: Animations

### What to Test:
1. ✅ Number countUp
2. ✅ Particle effects
3. ✅ Card animations
4. ✅ Achievement popups

### Steps:

**1. Watch Metric Animations**
- After executing any strategy
- Watch numbers animate from old to new values
- Look for green glow on increasing metrics

**2. Card Selection**
- Click skill cards
- Should see flip animation
- Should see ripple effect on click

**3. Milestone Celebration**
- Get users to 10,000+
- Should see particles and celebration

**4. Achievement Popup**
- Complete game to unlock achievements
- Should see animated popup

---

## Browser Console Commands (Debugging)

Open browser console (F12) and try these:

### Check Initialization
```javascript
// Should all return objects
console.log(gameEngine);
console.log(decisionUI);
console.log(metaProgression);
console.log(comboSystem);
```

### Test Meta-Progression
```javascript
// View player profile
metaProgression.playerProfile

// View skill tree
metaProgression.getSkillTreeProgress()

// Unlock a skill (if you have XP)
metaProgression.unlockSkill('viral-video', 'acquisition')

// Award XP manually
metaProgression.awardXP(1000, 'test')
```

### Test Animations
```javascript
// Test achievement popup
gameAnimations.showAchievement({
  title: 'Test Achievement',
  description: 'This is a test',
  icon: '🎉',
  rarity: 'epic'
})

// Test particle effect
gameAnimations.createCelebrationParticles(
  document.querySelector('.metric-card')
)
```

### Test Combos
```javascript
// Check current combo state
comboSystem.comboState

// Get combo hints
comboSystem.getComboHints()

// See discovered combos
comboSystem.getDiscoveredCombos()
```

### Test Resources
```javascript
// View all resources
gameEngine.metrics

// Update resources manually
gameEngine.updateResources({
  teamEnergy: 20,
  userTrust: 10,
  brandReputation: 5
})
```

---

## Common Issues & Solutions

### Issue: "gameEngine is not defined"
**Solution**: Wait for page to fully load, or reload the page

### Issue: No decision sequence appears
**Solution**: Check console for errors. Ensure all JS files loaded correctly.

### Issue: Meta-progression not persisting
**Solution**: Check if localStorage is enabled in your browser

### Issue: Animations not working
**Solution**: Make sure animations.js and ui-effects.css are loaded

### Issue: Combo not triggering
**Solution**: Make sure you're using related skills within 5 turns

---

## Success Indicators

You'll know the integration is working when you see:

✅ **On Game Start**:
- Console log: "Meta-progression loaded. Level: X"
- Console log: "Advanced systems initialized: ..."

✅ **During Gameplay**:
- Decision sequence with 3-5 choices appears
- Multiple resources shown in dashboard (not just users/revenue/budget)
- Synergy notifications when combos trigger
- Combo streak counter (2x, 🔥 ON FIRE, etc.)

✅ **On Game Complete**:
- Meta-progression panel with level, XP, games played
- Console log: "Meta-progression updated: ..."
- Player profile saved to localStorage

✅ **On Refresh**:
- Progress persists (same level, same XP)
- Skill tree unlocks remain

---

## Testing Checklist

Mark each item as you test:

### Basic Functionality
- [ ] Game loads without errors
- [ ] Can select Real Business Mode
- [ ] Can select AI Challenge Mode
- [ ] Can fill in business info
- [ ] Can select difficulty
- [ ] Dashboard shows all metrics
- [ ] Can select skill card
- [ ] Card animations work (flip, highlight)

### Advanced Features
- [ ] Decision sequence appears (3-5 steps)
- [ ] Can make all decisions
- [ ] Decision summary shows
- [ ] Strategy executes successfully
- [ ] Results show all resource changes
- [ ] Synergy bonus appears (when applicable)
- [ ] Combo streak builds up
- [ ] Achievement unlocks work

### Meta-Progression
- [ ] Final results show meta-progression panel
- [ ] XP awarded after game completion
- [ ] Level increases (if enough XP)
- [ ] Progress persists after refresh
- [ ] Skill tree tracks unlocks

### Animations
- [ ] Numbers animate (countUp)
- [ ] Particles appear on milestones
- [ ] Ripple effects on clicks
- [ ] Achievement popup animates
- [ ] Cards flip smoothly
- [ ] Metrics pulse when changing

---

## What to Look For

### ✅ Good Signs:
- Smooth animations
- Clear feedback on every action
- Numbers change with animations
- Combo notifications appear
- Meta-progression persists

### ⚠️ Warning Signs:
- Console errors
- Missing animations
- Numbers jump without animation
- No decision sequence
- Progress doesn't persist

---

## Performance Check

The game should:
- Load in < 2 seconds
- Animations run at 60fps
- No lag when clicking cards
- Smooth transitions between screens
- No memory leaks (can play multiple games)

---

## Ready to Test!

1. Open `game-mode.html` in your browser
2. Open the developer console (F12)
3. Follow any test scenario above
4. Check the success indicators
5. Mark off the testing checklist

If everything works, you'll have a fully-featured growth hacking game with deep strategic gameplay, persistent progression, and beautiful animations!

🎮 Have fun testing! 🚀
