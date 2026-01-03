# How to Run MindMaze Locally

## Prerequisites
- Python 3 or Node.js installed
- Firebase account (already configured with provided credentials)

## Option 1: Using Python (Recommended)

### On Windows Command Prompt or PowerShell:
```powershell
cd c:\Users\dell\Desktop\MindMaze\frontend
# Install Python from Microsoft Store if not available
# Then try one of these commands:

# Option A: Using installed Python
py -m http.server 8000

# Option B: Using python3
python3 -m http.server 8000

# Option C: If above don't work, download Python from python.org
# Then use the full path:
"C:\Program Files\Python311\python.exe" -m http.server 8000
```

## Option 2: Using Node.js

### On Windows Command Prompt or PowerShell:
```powershell
cd c:\Users\dell\Desktop\MindMaze\frontend

# Make sure Node.js is installed
node serve.js
```

## Option 3: Using VS Code Live Server Extension

1. Install "Live Server" extension in VS Code
2. Right-click on `frontend/index.html`
3. Select "Open with Live Server"

## Step-by-Step (Easiest Method)

### For Python Installation:
1. Open Windows PowerShell
2. Copy-paste this command:
```powershell
iwr https://www.python.org/ftp/python/3.12.1/python-3.12.1-amd64.exe -OutFile python-installer.exe; .\python-installer.exe
```
3. During installation, **CHECK** "Add Python to PATH"
4. Complete installation
5. Open new PowerShell and run:
```powershell
cd c:\Users\dell\Desktop\MindMaze\frontend
python -m http.server 8000
```

### For Node.js Installation:
1. Visit https://nodejs.org (LTS version)
2. Download and run the installer
3. Follow installation steps (default settings OK)
4. Open new PowerShell and run:
```powershell
cd c:\Users\dell\Desktop\MindMaze\frontend
node serve.js
```

## Access MindMaze

Once the server is running, open your browser and visit:
```
http://localhost:8000
```

## What You Can Do

1. **Sign Up**: Create new account with email and age
2. **Sign In**: Log back in with credentials
3. **Check-In**: Track your mood with emojis
4. **Growth Map**: View mood statistics
5. **Games**: Play breathing, focus matching, and puzzle games
6. **Emergency Help**: Access crisis helplines
7. **Logout**: Sign out safely

## Troubleshooting

### Python not found error:
- Open Windows Settings
- Search for "Manage app execution aliases"
- Turn OFF the Python aliases
- Install Python from https://www.python.org

### Port 8000 already in use:
```powershell
# Use different port
python -m http.server 3000
# Then visit http://localhost:3000
```

### Firebase not loading:
- Check browser console (F12 > Console tab)
- Ensure internet connection is active
- Firebase credentials are already in the code

---
**Need Help?** Check browser console (F12) for error messages
