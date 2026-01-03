# MindMaze Firebase Implementation - Code Overview

## 🏗️ Architecture

```
Frontend (Vanilla HTML/CSS/JS)
    ↓
firebase-auth.js (Authentication Module)
    ↓
Firebase SDK (Cloud)
    ├── Firebase Auth (User authentication)
    ├── Realtime Database (User data storage)
    └── Authentication State Management

app.js (Main Application Logic)
    ├── Mood tracking
    ├── Game functionality
    ├── Statistics
    └── Emergency helplines

styles.css (Emerald Green Theme)
    ├── Auth page styling
    ├── Main app styling
    ├── Responsive design
    └── Animations & Effects
```

---

## 📜 Code Structure

### 1. firebase-auth.js - Authentication Module

```javascript
// Firebase Configuration
const firebaseConfig = { ... }

// Initialize Firebase
async function initializeFirebase()
  - Imports Firebase modules dynamically
  - Sets up Auth and Database
  - Listens to auth state changes
  - Manages page display

// User Authentication Functions
async function handleSignup()
  - Validates email, password, age
  - Creates Firebase user
  - Stores user profile in database
  - Handles errors gracefully

async function handleLogin()
  - Validates credentials
  - Signs in existing user
  - Loads user data from database
  - Maintains session

async function handleLogout()
  - Signs out user
  - Clears local storage
  - Returns to auth page

// UI Functions
function switchAuthTab(tab)
  - Toggles between sign in/up tabs
  - Clears error messages

function showAuthPage()
  - Displays authentication page
  - Hides main application

function showMainApp()
  - Displays main application
  - Hides authentication page

// Event Listeners
- Page load: Initializes Firebase
- Form submit: Handles signup/login on Enter key
```

### 2. index.html - User Interface

```html
<!-- Authentication Page -->
<div id="authPage">
  <auth-card>
    <auth-tabs>
      - Sign In Tab
        - Email input
        - Password input
        - Age input
        - Sign In button
        - Error message display
      
      - Sign Up Tab
        - Email input
        - Password input
        - Confirm password input
        - Age input
        - Create Account button
        - Error message display

<!-- Main Application Page -->
<div id="mainApp">
  <header>
    - Logo
    - Title
    - User email display
    - Logout button
  
  <nav>
    - Check-In tab
    - Growth Map tab
    - Games tab
    - Emergency Help tab
  
  <content>
    - Tab content sections
    - Mood tracking
    - Statistics
    - Game modals
    - Emergency helplines
  
  <footer>
    - Branding
    - Information
```

### 3. app.js - Application Logic

```javascript
// State Management
const state = {
  userId: Firebase user ID
  userEmail: User email address
  age: User age (13-19)
  moods: Array of mood entries
  selectedMood: Currently selected mood emoji
  currentGame: Active game type
  breathingActive: Breathing exercise state
  focusCards: Focus game cards array
  focusScore: Match game score
}

// Initialization
- Page load handler
- Help line setup

// Tab Switching
function switchTab(tabName)
  - Hides all tabs
  - Shows selected tab
  - Updates navigation styling

// Mood Tracking
function selectMood(mood)
  - Highlights selected mood emoji
  - Enables save button
  - Updates state

function saveMood()
  - Validates mood selection
  - Gets user notes
  - Creates mood entry
  - Saves to localStorage
  - Shows success message
  - Updates growth map

// Growth Map
function updateGrowthMap()
  - Calculates total check-ins
  - Calculates weekly check-ins
  - Generates mood statistics
  - Draws mood distribution chart
  - Updates history list

function drawMoodChart()
  - Creates canvas chart
  - Shows mood distribution
  - Uses HTML5 Canvas API

function updateHistoryList()
  - Displays mood entries
  - Shows timestamp and notes
  - Lists in reverse chronological order

// Games
function startGame(gameType)
  - Opens game modal
  - Initializes game state
  - Shows game instructions

-- Breathing Game
function toggleBreathing()
  - Starts/stops breathing exercise
  - Manages breathing phases
  - Displays cycle count

-- Focus Match Game
function flipCard(index)
  - Flips card animation
  - Checks for matches
  - Tracks score
  - Detects game completion

-- Puzzle Game
function selectPuzzleTile(tile)
  - Tracks selected tiles
  - Updates progress display

// Emergency Support
function updateHelpline()
  - Gets selected country
  - Displays relevant helpline
  - Shows action steps
```

### 4. styles.css - Styling

```css
/* Global Styles */
- Dark navy to emerald gradient background
- Radial gradient overlays
- System font stack
- Smooth scrolling

/* Authentication Page */
.auth-container
  - Centered vertical layout
  - Full viewport height

.auth-card
  - Glass-morphism effect
  - Emerald gradient border
  - Backdrop blur

.auth-tabs
  - Tab button styling
  - Active state highlighting
  - Smooth transitions

.auth-form
  - Form group styling
  - Input field theming
  - Error message display

/* Main Application */
.header
  - Sticky positioning
  - Gradient background
  - User menu layout

.nav-tabs
  - Tab button styling
  - Active underline indicator
  - Color transitions

.card
  - Glass-morphism cards
  - Emerald border accent
  - Hover elevation effect

.btn variants
  .btn-primary: Emerald gradient
  .btn-secondary: Blue gradient
  .btn-danger: Red gradient
  .btn-outline: Transparent with border
  .btn-small: Compact sizing
  .btn-large: Full width

.mood-grid
  - 7 mood emoji buttons
  - Selection highlighting
  - Hover effects

.stats-grid
  - Statistics cards
  - Gradient numbers
  - Animation effects

.game-card
  - Game selection cards
  - Emoji display
  - Hover animations

.modal
  - Game modals
  - Dark background
  - Backdrop blur
  - Pop-in animation

/* Responsive */
@media (max-width: 768px)
  - Tablet adjustments
  - Grid layout changes
  - Font size reductions

@media (max-width: 480px)
  - Mobile optimizations
  - Single column layouts
  - Touch-friendly sizes
```

---

## 🔐 Authentication Flow

```
User visits http://localhost:8000
        ↓
[Check if user logged in] → Firebase Auth
        ↓
    [YES] → Show main app with user email
    [NO]  → Show authentication page
        ↓
[Sign Up Form]
  - User enters email, password, age
  - Client-side validation
  - Firebase creates user account
  - Store user profile in Realtime DB
  - Auto-login user
  - Show main app
        ↓
[Sign In Form]
  - User enters email, password, age
  - Firebase authenticates
  - Retrieve user profile
  - Maintain session
  - Show main app
        ↓
[Main Application]
  - User can check mood
  - Play games
  - View statistics
  - Access emergency help
        ↓
[Logout Button]
  - Firebase signs out
  - Clear local data
  - Return to auth page
```

---

## 🔄 Data Flow

### Sign Up Flow
```
User Input
    ↓
[Client Validation]
  - Email format check
  - Password length check
  - Password match check
  - Age range check
    ↓ (Valid)
[Firebase Auth]
  - Create user account
  - Generate unique UID
    ↓
[Firebase Database]
  - Store user profile
    users/{uid}: {
      email: "...",
      age: 15,
      createdAt: "...",
      moods: {}
    }
    ↓
[Local Storage]
  - Save userId
  - Save userEmail
  - Save age
    ↓
[Navigation]
  - Hide auth page
  - Show main app
  - Display user email in header
```

### Mood Tracking Flow
```
User clicks mood emoji
    ↓
[Select Mood]
  - state.selectedMood = "happy"
  - Visual feedback (highlight)
  - Enable save button
    ↓
[User adds note (optional)]
  - Get textarea value
    ↓
[Save Mood]
  - Create mood object
    {
      id: timestamp,
      mood: "happy",
      notes: "Feeling great!",
      timestamp: ISO string
    }
    ↓
[Local Storage]
  - state.moods.push(entry)
  - localStorage.setItem('moods', JSON.stringify(moods))
    ↓
[Update UI]
  - Show success message
  - Reset form
  - Update growth map
  - Refresh statistics
```

### Game Flow
```
User clicks "Play Now"
    ↓
[Start Game]
  - state.currentGame = game type
  - Initialize game state
  - Show modal
    ↓
[Play Game]
  - Breathing: Scale animation
  - Focus: Card flipping + matching
  - Puzzle: Tile selection
    ↓
[Track Score]
  - Increment score/progress
  - Update display
    ↓
[Close Game]
  - Clear game state
  - Hide modal
  - Return to tab
```

---

## 📊 Data Models

### User Profile
```json
{
  "uid": "user_1234567890",
  "email": "user@example.com",
  "age": 15,
  "createdAt": "2026-01-03T12:00:00Z",
  "moods": {
    "1234567890": {
      "mood": "happy",
      "notes": "Had a good day",
      "timestamp": "2026-01-03T12:30:00Z"
    }
  }
}
```

### Mood Entry
```json
{
  "id": 1672747200000,
  "mood": "happy",
  "notes": "Feeling good",
  "timestamp": "2026-01-03T12:00:00Z"
}
```

---

## 🔗 File Dependencies

```
index.html
  ↓
firebase-auth.js (script tag)
  ├── Imports Firebase SDK dynamically
  ├── Manages authentication
  └── Controls page visibility
  
app.js (script tag)
  ├── Depends on: state, Firebase auth
  ├── Manages: app logic, UI updates
  └── Uses: localStorage, DOM API

styles.css (link tag)
  ├── Styles all HTML elements
  ├── Responsive breakpoints
  └── Animations & effects
```

---

## 💾 Storage Mechanisms

### 1. Firebase Authentication
- Stores user credentials
- Generates unique UID
- Manages session tokens
- Cloud-based storage

### 2. Firebase Realtime Database
- Stores user profiles
- Can store mood history
- Syncs across devices
- Real-time updates

### 3. Browser LocalStorage
- Current mood selection
- Mood history array
- User preferences
- Persistent across sessions

---

## 🎯 Key Features Implemented

✅ **User Authentication**
- Email/password signup
- Email/password login
- Logout functionality
- Session persistence

✅ **User Validation**
- Email format validation
- Password length validation
- Password matching
- Age range validation (13-19)
- Real-time error messages

✅ **Data Persistence**
- Firebase Auth storage
- Firebase Database storage
- LocalStorage cache
- Session maintenance

✅ **User Experience**
- Tab-based form switching
- Real-time validation feedback
- Success/error messages
- User email display
- Logout button

✅ **Responsive Design**
- Mobile optimized
- Tablet friendly
- Desktop full featured
- Touch-friendly interface

✅ **Security Features**
- Password hashing (Firebase)
- HTTPS communication
- Age verification
- Secure logout
- Error message obfuscation

---

**Architecture Complete**: Vanilla HTML/CSS/JS + Firebase SDK
**Status**: Production Ready (with security rules setup)
**Last Updated**: January 3, 2026
