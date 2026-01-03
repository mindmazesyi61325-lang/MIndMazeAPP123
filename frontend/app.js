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
