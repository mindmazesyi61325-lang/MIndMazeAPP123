// ===== STATE MANAGEMENT =====
const state = {
    userId: localStorage.getItem('userId') || null,
    userEmail: localStorage.getItem('userEmail') || null,
    userName: localStorage.getItem('userName') || null,
    age: localStorage.getItem('age') || null,
    moods: JSON.parse(localStorage.getItem('moods') || '[]'),
    selectedMood: null,
    currentGame: null,
    breathingActive: false,
    breathingPhase: 'breathe-in',
    cycleCount: 0,
    focusCards: [],
    focusFlipped: [],
    focusScore: 0,
};

const helplines = {
    US: { name: 'Crisis Text Line', number: 'Text HOME to 741741' },
    UK: { name: 'Samaritans', number: '116 123' },
    IN: { name: 'AASRA', number: '9820466726' },
};

const moods = {
    happy: '😊',
    sad: '😢',
    anxious: '😰',
    angry: '😠',
    neutral: '😐',
    excited: '🤩',
    calm: '😌',
};

// ===== PAGE INITIALIZATION =====
window.addEventListener('DOMContentLoaded', () => {
    // Firebase auth handles page display
    // This section kept for backward compatibility
    updateHelpline();
});

// ===== AGE VERIFICATION (Removed - Now handled by Firebase Auth) =====
// Authentication system now managed in firebase-auth.js

// ===== TAB SWITCHING =====
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Remove active state from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabName + 'Tab').classList.add('active');

    // Add active state to clicked button
    event.target.classList.add('active');
}

// ===== MOOD CHECK-IN =====
function selectMood(mood) {
    // Remove previous selection
    document.querySelectorAll('.mood-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    // Add selection to clicked button
    document.querySelector(`[data-mood="${mood}"]`).classList.add('selected');
    
    state.selectedMood = mood;
    
    // Enable save button
    document.getElementById('saveMoodBtn').disabled = false;
}

function saveMood() {
    if (!state.selectedMood) return;

    const notes = document.getElementById('moodNotes').value;
    const moodEntry = {
        id: Date.now(),
        mood: state.selectedMood,
        notes: notes,
        timestamp: new Date().toISOString(),
    };

    state.moods.push(moodEntry);
    localStorage.setItem('moods', JSON.stringify(state.moods));

    // Show success message
    const successMsg = document.getElementById('successMessage');
    successMsg.style.display = 'block';
    setTimeout(() => {
        successMsg.style.display = 'none';
    }, 3000);

    // Reset form
    document.querySelectorAll('.mood-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    document.getElementById('moodNotes').value = '';
    document.getElementById('saveMoodBtn').disabled = true;
    state.selectedMood = null;

    // Update growth map
    updateGrowthMap();
}

// ===== GROWTH MAP =====
function updateGrowthMap() {
    const total = state.moods.length;
    const lastWeek = state.moods.filter(m => {
        const date = new Date(m.timestamp);
        const today = new Date();
        const diff = today - date;
        return diff < 7 * 24 * 60 * 60 * 1000;
    }).length;

    const activePercent = total > 0 ? Math.round((lastWeek / total) * 100) : 0;

    document.getElementById('totalMoods').textContent = total;
    document.getElementById('weekMoods').textContent = lastWeek;
    document.getElementById('activePercent').textContent = activePercent + '%';

    // Draw mood distribution chart
    drawMoodChart();

    // Update history list
    updateHistoryList();
}

function drawMoodChart() {
    const moodCounts = {};
    state.moods.forEach(m => {
        moodCounts[m.mood] = (moodCounts[m.mood] || 0) + 1;
    });

    const canvas = document.getElementById('moodChart');
    if (!canvas || Object.keys(moodCounts).length === 0) return;

    const ctx = canvas.getContext('2d');
    const total = Object.values(moodCounts).reduce((a, b) => a + b, 0);

    // Simple bar chart
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const moodList = Object.entries(moodCounts);
    const barWidth = canvas.width / moodList.length;
    const maxHeight = canvas.height * 0.8;

    moodList.forEach((entry, index) => {
        const [mood, count] = entry;
        const height = (count / total) * maxHeight;
        const x = index * barWidth;
        const y = canvas.height - height;

        // Draw bar
        ctx.fillStyle = '#6366f1';
        ctx.fillRect(x + 5, y, barWidth - 10, height);

        // Draw emoji
        ctx.font = '1.5rem Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#333';
        ctx.fillText(moods[mood], x + barWidth / 2, canvas.height - 10);
    });
}

function updateHistoryList() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';

    if (state.moods.length === 0) {
        historyList.innerHTML = '<p style="color: #999; text-align: center; padding: 2rem;">Start checking in to see your history!</p>';
        return;
    }

    // Show last 20 entries
    const recent = [...state.moods].reverse().slice(0, 20);

    recent.forEach(m => {
        const date = new Date(m.timestamp);
        const timeStr = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div>
                <span class="history-emoji">${moods[m.mood]}</span>
            </div>
            <div class="history-info">
                <div class="history-mood">${m.mood.charAt(0).toUpperCase() + m.mood.slice(1)}</div>
                <div class="history-time">${timeStr}</div>
                ${m.notes ? `<p style="margin-top: 0.5rem; color: #666; font-size: 0.9rem;">${m.notes}</p>` : ''}
            </div>
        `;
        historyList.appendChild(historyItem);
    });
}

// ===== GAMES =====
function startGame(gameType) {
    state.currentGame = gameType;

    if (gameType === 'breathing') {
        document.getElementById('breathingModal').classList.add('active');
    } else if (gameType === 'focus') {
        document.getElementById('focusModal').classList.add('active');
        initFocusGame();
    } else if (gameType === 'puzzle') {
        document.getElementById('puzzleModal').classList.add('active');
        initPuzzleGame();
    } else if (gameType === 'color') {
        document.getElementById('colorModal').classList.add('active');
        initColorGame();
    } else if (gameType === 'memory') {
        document.getElementById('memoryModal').classList.add('active');
        initMemoryGame();
    } else if (gameType === 'click') {
        document.getElementById('clickModal').classList.add('active');
        initClickGame();
    } else if (gameType === 'zen') {
        document.getElementById('zenModal').classList.add('active');
        initZenGame();
    } else if (gameType === 'journey') {
        document.getElementById('journeyModal').classList.add('active');
        initJourneyGame();
    }
}

function closeGame() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });

    if (state.breathingActive) {
        state.breathingActive = false;
        document.getElementById('breathingBtn').textContent = 'Start';
    }

    state.currentGame = null;
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeGame();
    }
});

// ===== BREATHING GAME =====
function toggleBreathing() {
    state.breathingActive = !state.breathingActive;
    const btn = document.getElementById('breathingBtn');
    btn.textContent = state.breathingActive ? 'Pause' : 'Resume';

    if (state.breathingActive) {
        runBreathingCycle();
    }
}

function runBreathingCycle() {
    if (!state.breathingActive) return;

    const phases = [
        { name: 'Breathe In', duration: 4000, scale: 'breathing-in' },
        { name: 'Hold', duration: 7000, scale: '' },
        { name: 'Breathe Out', duration: 8000, scale: 'breathing-out' },
    ];

    let phaseIndex = 0;

    function runPhase() {
        if (!state.breathingActive) return;

        const phase = phases[phaseIndex];
        const textEl = document.getElementById('breathingText');
        const circleEl = document.getElementById('breathingCircle');

        textEl.textContent = phase.name;
        circleEl.className = 'breathing-circle ' + phase.scale;

        setTimeout(() => {
            phaseIndex++;
            if (phaseIndex >= phases.length) {
                phaseIndex = 0;
                state.cycleCount++;
                document.getElementById('cycleCount').textContent = state.cycleCount;
            }
            runPhase();
        }, phase.duration);
    }

    runPhase();
}

// ===== FOCUS GAME =====
function initFocusGame() {
    state.focusCards = Array(8).fill(null).map((_, i) => ({
        id: i,
        value: i % 2,
        matched: false,
    }));

    state.focusFlipped = [];
    state.focusScore = 0;
    document.getElementById('focusScore').textContent = '0';

    const grid = document.getElementById('focusGrid');
    grid.innerHTML = '';

    state.focusCards.forEach((card, index) => {
        const tile = document.createElement('button');
        tile.className = 'focus-tile';
        tile.textContent = '?';
        tile.onclick = () => flipCard(index);
        grid.appendChild(tile);
    });
}

function flipCard(index) {
    if (state.focusCards[index].matched || state.focusFlipped.includes(index) || state.focusFlipped.length >= 2) {
        return;
    }

    state.focusFlipped.push(index);
    const tile = document.querySelectorAll('.focus-tile')[index];
    tile.classList.add('flipped');
    tile.textContent = '✓';

    if (state.focusFlipped.length === 2) {
        setTimeout(() => {
            if (state.focusCards[state.focusFlipped[0]].value === state.focusCards[state.focusFlipped[1]].value) {
                // Match found
                state.focusCards[state.focusFlipped[0]].matched = true;
                state.focusCards[state.focusFlipped[1]].matched = true;

                document.querySelectorAll('.focus-tile').forEach((tile, i) => {
                    if (state.focusCards[i].matched) {
                        tile.classList.add('matched');
                    }
                });

                state.focusScore += 10;
                document.getElementById('focusScore').textContent = state.focusScore;
            } else {
                // No match
                document.querySelectorAll('.focus-tile').forEach((tile, i) => {
                    if (state.focusFlipped.includes(i)) {
                        tile.classList.remove('flipped');
                        tile.textContent = '?';
                    }
                });
            }

            state.focusFlipped = [];

            // Check if game is complete
            if (state.focusCards.every(c => c.matched)) {
                setTimeout(() => {
                    alert(`Awesome focus! Final score: ${state.focusScore}! 🎉`);
                }, 300);
            }
        }, 1000);
    }
}

function resetFocusGame() {
    initFocusGame();
}

// ===== PUZZLE GAME =====
function initPuzzleGame() {
    const tiles = Array.from({ length: 9 }, (_, i) => i + 1);
    const shuffled = tiles.sort(() => Math.random() - 0.5);

    const grid = document.getElementById('puzzleGrid');
    grid.innerHTML = '';

    shuffled.forEach((num) => {
        const tile = document.createElement('button');
        tile.className = 'puzzle-tile';
        tile.textContent = num;
        tile.onclick = () => selectPuzzleTile(tile);
        grid.appendChild(tile);
    });

    document.getElementById('puzzleProgress').textContent = '0';
}

function selectPuzzleTile(tile) {
    if (tile.classList.contains('selected')) return;

    tile.classList.add('selected');
    const progress = document.querySelectorAll('.puzzle-tile.selected').length;
    document.getElementById('puzzleProgress').textContent = progress;

    if (progress === 9) {
        setTimeout(() => {
            alert('Puzzle complete! You found your calm! 🧘');
        }, 200);
    }
}

// ===== EMERGENCY SECTION =====
function updateHelpline() {
    const country = document.getElementById('countrySelect').value;
    const helpline = helplines[country];

    document.getElementById('helplineName').textContent = helpline.name;
    document.getElementById('helplineNumber').textContent = helpline.number;
}

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
    const countrySelect = document.getElementById('countrySelect');
    if (countrySelect) {
        updateHelpline();
    }
});

// ===== COLOR ZEN GAME =====
function initColorGame() {
    const colors = [
        '#ef4444', '#f87171', '#10b981',
        '#34d399', '#3b82f6', '#60a5fa',
        '#ef4444', '#f87171', '#10b981'
    ];
    const shuffled = colors.sort(() => Math.random() - 0.5);
    const grid = document.getElementById('colorGrid');
    grid.innerHTML = '';

    state.colorTiles = shuffled.map((color, index) => ({
        id: index,
        color: color,
        matched: false,
        pair: Math.floor(index / 3)
    }));
    state.colorFlipped = [];
    state.colorScore = 0;
    document.getElementById('colorScore').textContent = '0';

    shuffled.forEach((color, index) => {
        const tile = document.createElement('div');
        tile.className = 'color-tile';
        tile.style.backgroundColor = color;
        tile.onclick = () => flipColorTile(index);
        grid.appendChild(tile);
    });
}

function flipColorTile(index) {
    if (state.colorTiles[index].matched || state.colorFlipped.includes(index) || state.colorFlipped.length >= 2) return;

    state.colorFlipped.push(index);
    const tile = document.querySelectorAll('.color-tile')[index];
    tile.classList.add('matched');

    if (state.colorFlipped.length === 2) {
        setTimeout(() => {
            if (state.colorTiles[state.colorFlipped[0]].color === state.colorTiles[state.colorFlipped[1]].color) {
                state.colorTiles[state.colorFlipped[0]].matched = true;
                state.colorTiles[state.colorFlipped[1]].matched = true;
                state.colorScore += 10;
                document.getElementById('colorScore').textContent = state.colorScore;
            } else {
                document.querySelectorAll('.color-tile')[state.colorFlipped[0]].classList.remove('matched');
                document.querySelectorAll('.color-tile')[state.colorFlipped[1]].classList.remove('matched');
            }
            state.colorFlipped = [];
            
            if (state.colorTiles.every(c => c.matched)) {
                setTimeout(() => alert(`Color harmony achieved! Score: ${state.colorScore}! 🎨`), 300);
            }
        }, 800);
    }
}

function resetColorGame() {
    initColorGame();
}

// ===== MEMORY GAME =====
function initMemoryGame() {
    const emojis = ['🌟', '🎈', '🌸', '🦋', '🌊', '☀️'];
    const pairs = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    const grid = document.getElementById('memoryGrid');
    grid.innerHTML = '';

    state.memoryCards = pairs.map((emoji, index) => ({
        id: index,
        emoji: emoji,
        flipped: false,
        matched: false
    }));
    state.memoryFlipped = [];
    state.memoryScore = 0;
    document.getElementById('memoryScore').textContent = '0';

    pairs.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.textContent = '?';
        card.onclick = () => flipMemoryCard(index);
        grid.appendChild(card);
    });
}

function flipMemoryCard(index) {
    if (state.memoryCards[index].matched || state.memoryCards[index].flipped || state.memoryFlipped.length >= 2) return;

    state.memoryFlipped.push(index);
    const card = document.querySelectorAll('.memory-card')[index];
    card.classList.add('flipped');
    card.textContent = state.memoryCards[index].emoji;
    state.memoryCards[index].flipped = true;

    if (state.memoryFlipped.length === 2) {
        setTimeout(() => {
            if (state.memoryCards[state.memoryFlipped[0]].emoji === state.memoryCards[state.memoryFlipped[1]].emoji) {
                state.memoryCards[state.memoryFlipped[0]].matched = true;
                state.memoryCards[state.memoryFlipped[1]].matched = true;
                document.querySelectorAll('.memory-card').forEach((card, i) => {
                    if (state.memoryCards[i].matched) card.classList.add('matched');
                });
                state.memoryScore += 1;
                document.getElementById('memoryScore').textContent = state.memoryScore;
            } else {
                document.querySelectorAll('.memory-card')[state.memoryFlipped[0]].classList.remove('flipped');
                document.querySelectorAll('.memory-card')[state.memoryFlipped[1]].classList.remove('flipped');
                document.querySelectorAll('.memory-card')[state.memoryFlipped[0]].textContent = '?';
                document.querySelectorAll('.memory-card')[state.memoryFlipped[1]].textContent = '?';
                state.memoryCards[state.memoryFlipped[0]].flipped = false;
                state.memoryCards[state.memoryFlipped[1]].flipped = false;
            }
            state.memoryFlipped = [];

            if (state.memoryCards.every(c => c.matched)) {
                setTimeout(() => alert(`Perfect memory! You matched all pairs! 🧠`), 300);
            }
        }, 800);
    }
}

function resetMemoryGame() {
    initMemoryGame();
}

// ===== CLICK GAME =====
function initClickGame() {
    state.clickScore = 0;
    state.clickTime = 30;
    state.clickGameActive = false;
    document.getElementById('clickScore').textContent = '0';
    document.getElementById('clickTimer').textContent = '30';
    document.getElementById('clickStartBtn').textContent = 'Start Game';
    document.getElementById('clickTarget').style.display = 'block';
}

function startClickGame() {
    if (state.clickGameActive) return;
    
    state.clickGameActive = true;
    state.clickScore = 0;
    state.clickTime = 30;
    document.getElementById('clickStartBtn').style.display = 'none';
    document.getElementById('clickScore').textContent = '0';
    
    const timer = setInterval(() => {
        state.clickTime--;
        document.getElementById('clickTimer').textContent = state.clickTime;
        
        if (state.clickTime <= 0) {
            clearInterval(timer);
            state.clickGameActive = false;
            document.getElementById('clickTarget').style.display = 'none';
            document.getElementById('clickStartBtn').style.display = 'block';
            document.getElementById('clickStartBtn').textContent = `Game Over! Score: ${state.clickScore}`;
            setTimeout(() => {
                alert(`⚡ Final Score: ${state.clickScore} clicks! ⚡`);
                initClickGame();
            }, 500);
        }
    }, 1000);
    
    moveClickTarget();
}

function moveClickTarget() {
    if (!state.clickGameActive) return;
    
    const target = document.getElementById('clickTarget');
    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 150;
    
    target.style.left = (Math.random() * maxX) + 'px';
    target.style.top = (Math.random() * maxY) + 'px';
}

function clickTargetClicked(e) {
    if (!state.clickGameActive) return;
    
    e.stopPropagation();
    state.clickScore++;
    document.getElementById('clickScore').textContent = state.clickScore;
    
    const target = document.getElementById('clickTarget');
    target.classList.add('hiding');
    setTimeout(() => {
        target.classList.remove('hiding');
        moveClickTarget();
    }, 300);
}

document.addEventListener('DOMContentLoaded', () => {
    const clickTarget = document.getElementById('clickTarget');
    if (clickTarget) {
        clickTarget.addEventListener('click', clickTargetClicked);
    }
});

// ===== ZEN GAME =====
function initZenGame() {
    const grid = document.getElementById('zenGrid');
    grid.innerHTML = '';
    
    state.zenOrbs = Array(4).fill(null).map((_, i) => ({
        id: i,
        tapped: false
    }));
    state.zenScore = 0;
    document.getElementById('zenScore').textContent = '0';
    
    state.zenOrbs.forEach(orb => {
        const element = document.createElement('div');
        element.className = 'zen-orb';
        element.onclick = () => tapZenOrb(orb.id);
        element.id = `zen-orb-${orb.id}`;
        grid.appendChild(element);
    });
}

function tapZenOrb(id) {
    state.zenOrbs[id].tapped = true;
    const element = document.getElementById(`zen-orb-${id}`);
    element.classList.add('tapped');
    element.style.pointerEvents = 'none';
    
    const tappedCount = state.zenOrbs.filter(o => o.tapped).length;
    state.zenScore = (tappedCount / state.zenOrbs.length) * 100;
    document.getElementById('zenScore').textContent = Math.round(state.zenScore);
    
    if (tappedCount === state.zenOrbs.length) {
        setTimeout(() => {
            alert('🕉️ Perfect zen harmony reached! 🕉️');
            resetZenGame();
        }, 500);
    }
}

function resetZenGame() {
    initZenGame();
}

// ===== JOURNEY GAME =====
function initJourneyGame() {
    state.journeyStep = 0;
    state.journeySteps = [
        { emoji: '🌅', title: 'Awakening', text: 'Begin your journey with a fresh perspective' },
        { emoji: '🚶', title: 'Exploration', text: 'Venture into new experiences' },
        { emoji: '🧗', title: 'Challenge', text: 'Overcome obstacles and grow stronger' },
        { emoji: '🏔️', title: 'Achievement', text: 'Reach your peak and celebrate' },
        { emoji: '🌟', title: 'Transformation', text: 'You\'ve evolved into your best self' }
    ];
    
    displayJourneyStep();
}

function displayJourneyStep() {
    const pathDiv = document.getElementById('journeyPath');
    pathDiv.innerHTML = '';
    
    state.journeySteps.forEach((step, index) => {
        const stepEl = document.createElement('div');
        stepEl.className = `journey-step ${index === state.journeyStep ? 'active' : ''}`;
        stepEl.innerHTML = `
            <div class="step-emoji">${step.emoji}</div>
            <div class="step-title">${step.title}</div>
            <div class="step-text">${step.text}</div>
        `;
        pathDiv.appendChild(stepEl);
    });
    
    document.getElementById('journeyStep').textContent = state.journeyStep + 1;
}

function nextJourneyStep() {
    if (state.journeyStep < state.journeySteps.length - 1) {
        state.journeyStep++;
        displayJourneyStep();
    } else {
        alert('🌈 You\'ve completed your healing journey! 🌈\n\nRemember: Growth is a continuous adventure.');
        closeGame();
    }
}