# 🚀 MindMaze - Quick Start (5 Minutes)

## Step 1: Open the App

### Easiest Way - Just Open the File
1. Go to folder: `frontend`
2. Double-click `index.html`
3. **Done!** ✅

Or use a server for better experience...

### With Node.js (Better)
```powershell
cd frontend
node server.js
```
Then open: **http://localhost:3000**

---

## Step 2: Use the App

### Age Gate
1. Enter your age (13-19)
2. Click "Continue"
3. Get assigned anonymous ID ✅

### 📊 Check-In Tab
1. Click emoji for your mood
2. Add optional note
3. Click "Save Check-in"
4. See success message ✅

### 📈 Growth Map Tab
1. See your statistics
2. View mood distribution chart
3. Browse mood history ✅

### 🎮 Games Tab
1. **Breathing**: Click "Play Now", then "Start" button
2. **Focus Match**: Click cards to match pairs (get 80 points to win)
3. **Calm Puzzle**: Click all 9 tiles to complete ✅

### 🆘 Help Tab
1. Select your country
2. See emergency helpline
3. Read tips for support ✅

---

## 📂 Files Overview

```
frontend/
├── index.html  ← Single HTML file (open this!)
├── styles.css  ← All styling
├── app.js      ← All logic
└── server.js   ← Optional Node server
```

**That's it! 3 files you need to understand the entire app.**

---

## 💡 Key Features

| Feature | Details |
|---------|---------|
| **Age Verification** | 13-19 only, anonymous |
| **Mood Tracking** | 7 moods, optional notes |
| **Growth Map** | Charts, history, statistics |
| **Games** | 3 interactive stress relief games |
| **Emergency** | Helplines for US, UK, India |
| **Privacy** | 100% local storage, no server |

---

## 🎯 What Actually Happens?

### Age Gate
- Creates unique ID: `user_1704283945123_abc12345`
- Stores in browser: `localStorage`
- Shows main app

### Mood Save
```javascript
// What's stored:
{
  id: timestamp,
  mood: "happy",
  notes: "Had a great day!",
  timestamp: "2025-01-03T..."
}
```

### Growth Map
- Reads all moods from localStorage
- Counts them
- Draws chart
- Shows history

### Games
- Pure JavaScript animations
- No external libraries
- Score/progress tracking
- Fun stress relief

---

## 🔄 Data Flow

```
User Input
    ↓
JavaScript (app.js) processes it
    ↓
Saves to localStorage
    ↓
Display updates on page
    ↓
Data persists across refreshes
```

**No server. No database. Just the browser.**

---

## 📞 Common Questions

**Q: Where is my data stored?**
A: Browser's localStorage (on your computer)

**Q: Can others see my data?**
A: No, it's private to your browser

**Q: Can I clear my data?**
A: Yes, browser settings → Clear data

**Q: Does it work offline?**
A: Yes, 100% offline (if using direct file open)

**Q: Can I use this on mobile?**
A: Yes, fully responsive design

**Q: Do I need to install anything?**
A: Just open the HTML file!

---

## 🐛 Troubleshooting

**Browser shows blank page?**
- Refresh page (Ctrl+R)
- Check browser console (F12)
- Try different browser

**Games not working?**
- JavaScript must be enabled
- Try closing & reopening
- Clear browser cache

**Data disappeared?**
- Might have cleared browser data
- Data only in localStorage (not synced)
- Refresh page to reload

**Server won't start?**
- Make sure Node.js installed
- Check port 3000 is free
- Use `node -v` to verify Node

---

## 🎨 Customization Tips

### Change Color Theme
Open `styles.css`, find:
```css
#6366f1  /* Change to your color */
```

### Add More Moods
Open `app.js`, find:
```javascript
const moods = {
    happy: '😊',
    // Add here
};
```

### Modify Games
Edit functions in `app.js`:
- `initFocusGame()`
- `runBreathingCycle()`
- `initPuzzleGame()`

---

## 📊 Code Size

- **HTML**: 400 lines
- **CSS**: 900 lines
- **JS**: 600 lines
- **Total**: ~1,900 lines
- **Dependencies**: 0
- **Load Time**: < 500ms

---

## ✅ Everything Working?

Try this checklist:

- [ ] Age gate appears first
- [ ] Can select age and continue
- [ ] See tabs: Check-In, Growth Map, Games, Help
- [ ] Can select mood emoji
- [ ] Can save mood with note
- [ ] Growth Map shows statistics
- [ ] Each game modal opens
- [ ] Games are interactive
- [ ] Help shows helplines
- [ ] Data persists after refresh

**If all ✅, you're ready to go!**

---

## 🚀 Next: Backend Integration

To add a backend later:

1. Install backend packages:
   ```powershell
   cd backend
   npm install
   ```

2. Start backend:
   ```powershell
   npm run dev
   ```

3. Update `app.js` to call backend APIs instead of localStorage

See `IMPLEMENTATION.md` for full backend details.

---

## 🎓 Learning

Great project for learning:
- HTML5 semantic markup
- Modern CSS (Grid, Flexbox)
- Vanilla JavaScript
- localStorage API
- DOM manipulation
- Event handling
- Canvas graphics

---

**🧩 Happy using MindMaze! Your mental wellness matters. 💭**

Questions? See documentation files:
- `VANILLA_VERSION.md` - Detailed feature list
- `README.md` (in frontend) - Development guide
- `project.md` - Product specification
