# MindMaze - Quick Start Guide

## 🚀 Running the Frontend (HTML/CSS/JS)

No build tools needed! Just open the file:

### Option 1: Direct File Open
1. Navigate to `frontend/` folder
2. Double-click `index.html` to open in browser

### Option 2: Local Server (Recommended)
Use Python's built-in server:

**Windows (PowerShell):**
```powershell
cd frontend
python -m http.server 3000
```

**Mac/Linux:**
```bash
cd frontend
python3 -m http.server 3000
```

Then open: **http://localhost:3000**

---

## ✨ Features Included

### 📊 Age Gate
- Anonymous user verification (13-19 years)
- No personal data required
- Secure anonymous ID generation

### 💭 Mood Check-In
- **7 Mood Emojis**: Happy, Sad, Anxious, Angry, Neutral, Excited, Calm
- Optional notes for each check-in
- Time-stamped entries
- Local storage persistence

### 📈 Growth Map
- Total check-ins counter
- Weekly activity statistics
- Visual mood distribution chart
- Complete mood history with timestamps

### 🎮 Stress Buster Games

**1. Breathing Exercise** 🫁
- Guided 4-7-8 breathing cycle
- Visual animation feedback
- Cycle counter
- Pause/Resume controls

**2. Focus Match Game** 🎮
- Memory matching card game
- 8-card grid
- Score tracking
- Win detection

**3. Calm Puzzle** 🧩
- 9-tile selection puzzle
- Progress tracking
- Relaxing interaction
- Completion feedback

### 🆘 Emergency Support
- Country-based helplines:
  - 🇺🇸 Crisis Text Line (US)
  - 🇬🇧 Samaritans (UK)
  - 🇮🇳 AASRA (India)
- Crisis disclaimers
- Quick action list

---

## 💾 Data Storage

All data is stored **locally** in browser:
- `localStorage` for user ID and age
- `localStorage` for mood entries
- No server communication required
- Data persists across sessions

---

## 🎨 Design Features

✅ **Mobile-First Responsive Design**
- Works on phones, tablets, and desktops
- Optimized for small screens
- Touch-friendly buttons

✅ **Teen-Friendly UI**
- Gradient color palette
- Smooth animations
- Emoji-based interactions
- Clear, readable typography

✅ **Accessibility**
- WCAG 2.1 compliant
- Keyboard navigation support
- Clear color contrast
- Semantic HTML

---

## 📁 File Structure

```
frontend/
├── index.html       # Main HTML file
├── styles.css       # All styling (no external dependencies)
├── app.js          # JavaScript logic
└── README.md       # This file
```

---

## 🔧 Customization

### Change Colors
Edit `styles.css` color variables:
```css
/* Primary color */
#6366f1  /* Indigo */

/* Secondary color */
#ec4899  /* Pink */

/* Success/Green */
#10b981

/* Danger/Red */
#ef4444
```

### Add More Moods
1. Edit `moods` object in `app.js`
2. Add emoji-mood pair
3. Add button in HTML

---

## 🚨 Important Notes

### No Backend Required
This version works **completely offline**. It doesn't connect to any server.

### Local Storage Limits
- Browser localStorage: ~5-10MB max
- Enough for ~1000+ mood entries

### Privacy
- All data stored **locally on device**
- No data sent anywhere
- Completely anonymous
- User can clear data anytime

---

## 📱 Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Mobile browsers (iOS Safari, Chrome Android)

---

## 🎯 Next Steps

1. **Test the app**: Go through each section
2. **Add mood entries**: Try the check-in feature
3. **Play games**: Stress relief interactive games
4. **Check growth**: View mood statistics
5. **Backend integration**: Connect to the Node.js backend when ready

---

## 📝 Production Deployment

### Deploy to Netlify
```bash
# Drag & drop 'frontend' folder to Netlify
# Or use Netlify CLI:
netlify deploy --prod --dir=frontend
```

### Deploy to Vercel
```bash
# Drag & drop 'frontend' folder to Vercel
# Or install Vercel CLI and deploy
```

### Deploy to GitHub Pages
```bash
# Push to GitHub
# Enable Pages in repository settings
# Point to 'frontend' folder
```

---

**Version:** 0.1.0 (Vanilla HTML/CSS/JS)  
**Last Updated:** January 2026  
**Status:** ✅ Ready to Use
