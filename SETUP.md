# MindMaze Development Setup Guide

## Getting Started with Development

### System Requirements
- **OS:** Windows, macOS, or Linux
- **Node.js:** v18 or higher
- **PostgreSQL:** v12 or higher
- **npm:** v9 or higher (or yarn)

### Installation Steps

#### 1. Clone and Setup Backend

```powershell
cd backend
npm install
```

**Configure PostgreSQL:**
1. Create a new database:
   ```sql
   CREATE DATABASE mindmaze;
   ```

2. Create `.env` file from template:
   ```powershell
   cp .env.example .env
   ```

3. Edit `.env` with your database credentials:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=mindmaze
   DB_USER=postgres
   DB_PASSWORD=your_password
   JWT_SECRET=your_random_secret_key_here
   ```

4. Start backend:
   ```powershell
   npm run dev
   ```
   Expected output:
   ```
   🚀 MindMaze backend running on http://localhost:5000
   ```

#### 2. Setup Frontend

```powershell
cd frontend
npm install
```

Start development server:
```powershell
npm run dev
```

Expected output:
```
  VITE v5.0.8  ready in 123 ms

  ➜  Local:   http://localhost:3000/
```

### Accessing the Application

1. Open browser and navigate to `http://localhost:3000`
2. Complete age verification (13-19)
3. You'll be assigned an anonymous user ID
4. Start exploring features!

## File Changes During Development

### Frontend File Structure
- **Components** - Located in `frontend/src/components/`
  - `Common.jsx` - Header, Button, Card components
  - `MoodCheckIn.jsx` - Mood selection interface
  - `GrowthMap.jsx` - Data visualization
  - `StressBusters.jsx` - Games (Breathing, Focus, Puzzle)
  - `EmergencySupport.jsx` - Crisis resources

- **Pages** - Located in `frontend/src/pages/`
  - `AgeGate.jsx` - Initial age verification
  - `Home.jsx` - Main dashboard with tabs

- **Store** - Located in `frontend/src/store/`
  - `appStore.js` - Zustand stores (user, mood, achievements)

- **Utils** - Located in `frontend/src/utils/`
  - `api.js` - Axios API client
  - `constants.js` - Mood emojis, colors, helplines

### Backend File Structure
- **Controllers** - Business logic
  - `authController.js` - User creation & verification
  - `moodController.js` - Mood operations
  
- **Routes** - API endpoints
  - `authRoutes.js` - `/auth/*`
  - `moodRoutes.js` - `/moods/*`
  - `emergencyRoutes.js` - `/emergency/*`

- **Models** - Database
  - `database.js` - Connection & initialization

- **Middleware** - Utilities
  - `auth.js` - JWT & error handling

## Troubleshooting

### "Cannot connect to database"
- Ensure PostgreSQL is running
- Check credentials in `.env`
- Verify database name exists
- Run: `npm run dev` from backend directory

### "Port 3000 already in use"
- Change port in `frontend/vite.config.js`
- Or kill process: `netstat -ano | findstr :3000`

### "Module not found errors"
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Restart dev server

### CORS errors
- Backend CORS is enabled in `server.js`
- Frontend proxy is configured in `vite.config.js`
- Ensure both servers are running

## Commands Reference

### Backend
```powershell
npm run dev       # Start development server
npm start         # Start production server
```

### Frontend
```powershell
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
```

## Next Steps

1. **Test Features:**
   - Try mood check-in on the dashboard
   - View growth map with multiple entries
   - Play stress buster games
   - Explore emergency support

2. **Develop Phase 2:**
   - Chat groups implementation
   - AI moderation integration
   - Advanced features

3. **Deploy:**
   - Frontend to Vercel
   - Backend to Railway/AWS
   - Setup monitoring with Sentry

## Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Express.js Guide](https://expressjs.com)
- [Tailwind CSS](https://tailwindcss.com)
- [PostgreSQL Docs](https://www.postgresql.org/docs)

---

For detailed implementation docs, see [IMPLEMENTATION.md](./IMPLEMENTATION.md)
