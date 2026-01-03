# MindMaze Implementation Guide

## Project Structure

```
MindMaze/
├── frontend/              # React + Vite SPA
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── store/        # Zustand state management
│   │   ├── utils/        # API & helpers
│   │   ├── styles/       # Global styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── backend/               # Express.js REST API
│   ├── src/
│   │   ├── routes/       # API endpoints
│   │   ├── controllers/  # Business logic
│   │   ├── models/       # Database models
│   │   ├── middleware/   # Authentication & error handling
│   │   ├── utils/        # Helper functions
│   │   └── server.js     # Express app setup
│   ├── package.json
│   └── .env.example
└── project.md            # Product specification
```

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- npm or yarn

### Backend Setup

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your PostgreSQL credentials
   ```

3. **Start the server:**
   ```bash
   npm run dev
   ```
   Backend runs on `http://localhost:5000`

### Frontend Setup

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:3000`

## Features Implemented (Phase 1)

### ✅ User Access & Identity
- Anonymous user ID generation
- Age verification (13-19)
- No real-name requirement
- Session persistence via localStorage

### ✅ Mood Check-In Module
- Emoji-based mood selection (7 moods)
- Optional notes input
- Real-time storage with Zustand
- Time-stamped entries

### ✅ Growth Map
- Mood distribution pie chart
- Weekly trend visualization
- Statistics dashboard
- Achievement milestones framework

### ✅ Stress Buster Games
- **Breathing Exercise**: Guided 4-7-8 breathing animation
- **Focus Match Game**: Pair matching memory game
- **Calm Puzzle**: Interactive tile puzzle

### ✅ Emergency Support Module
- Country-based helpline listings
- Crisis disclaimers
- Quick-access emergency button
- Helpful resources

### ✅ UI/UX
- Responsive mobile-first design
- Tailwind CSS styling
- Teen-friendly color palette
- Smooth animations & transitions

## Technology Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Zustand** - State management
- **Axios** - HTTP client

### Backend
- **Express.js** - REST API framework
- **PostgreSQL** - Database
- **JWT** - Authentication tokens
- **UUID** - Unique ID generation

## API Endpoints

### Authentication
- `POST /auth/anonymous` - Generate anonymous user
- `POST /auth/verify-age` - Verify age (13-19)

### Mood
- `POST /moods` - Add new mood entry
- `GET /moods/:userId` - Get user's mood history
- `GET /moods/:userId/stats` - Get mood statistics

### Emergency
- `GET /emergency/helplines?country=US` - Get country helplines

## Database Schema

### Users Table
```sql
id: VARCHAR(255) PRIMARY KEY
age: INT
created_at: TIMESTAMP
last_active: TIMESTAMP
```

### Mood Entries Table
```sql
id: SERIAL PRIMARY KEY
user_id: VARCHAR(255) FOREIGN KEY
mood: VARCHAR(50)
notes: TEXT
created_at: TIMESTAMP
```

### Achievements Table
```sql
id: SERIAL PRIMARY KEY
user_id: VARCHAR(255) FOREIGN KEY
title: VARCHAR(255)
description: TEXT
unlocked_at: TIMESTAMP
```

## Development Roadmap

### Phase 1 (Current - MVP)
- [x] Core UI and navigation
- [x] Mood check-in module
- [x] Growth Map visualization
- [x] Stress buster games
- [x] Emergency support links
- [x] Anonymous authentication
- [x] Basic database setup

### Phase 2 (Next)
- [ ] Chat groups with moderation
- [ ] AI toxicity detection
- [ ] Grounding exercises
- [ ] Guided meditations
- [ ] Social features
- [ ] User achievements system

### Phase 3 (Future)
- [ ] Mobile app
- [ ] Localization (i18n)
- [ ] Analytics dashboard
- [ ] Advanced moderation tools
- [ ] PWA offline support
- [ ] Push notifications

## Security & Privacy

- ✅ HTTPS-ready (configure in production)
- ✅ Anonymous user IDs
- ✅ No personal data collection
- ✅ GDPR compliance framework
- ✅ JWT-based stateless auth
- ⏳ End-to-end encryption (Phase 2)

## Running Tests

```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
npm test
```

## Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy dist/ folder to Vercel
```

### Backend (Railway/AWS)
```bash
cd backend
npm install
npm start
```

Set environment variables in production:
- `JWT_SECRET` - Strong random string
- `DB_*` - Production database credentials
- `NODE_ENV` - Set to "production"

## Support

For issues or questions:
1. Check the [Product Specification](./project.md)
2. Review inline code comments
3. Test with `npm run dev` in respective folders

---

**Version:** 0.1.0 (MVP Phase)
**Last Updated:** January 2026
