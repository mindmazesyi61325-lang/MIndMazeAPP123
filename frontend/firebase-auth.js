// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCMC-6wLSq89TOs6yFDh7rOy3d7VKMD4no",
    authDomain: "mindmaze-e839e.firebaseapp.com",
    databaseURL: "https://mindmaze-e839e-default-rtdb.firebaseio.com",
    projectId: "mindmaze-e839e",
    storageBucket: "mindmaze-e839e.firebasestorage.app",
    messagingSenderId: "334141717682",
    appId: "1:334141717682:web:465a25f598ee27a9351dab",
    measurementId: "G-DW9H3P4ZNR"
};

// Initialize Firebase
let auth;
let database;

async function initializeFirebase() {
    try {
        const { initializeApp } = await import("https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js");
        const { getAuth, onAuthStateChanged } = await import("https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js");
        const { getDatabase } = await import("https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js");

        const app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        database = getDatabase(app);

        // Monitor auth state changes
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                state.userId = user.uid;
                state.userEmail = user.email;
                localStorage.setItem('userId', user.uid);
                localStorage.setItem('userEmail', user.email);
                showMainApp();
                document.getElementById('userEmail').textContent = user.email;
                updateGrowthMap();
                updateHelpline();
            } else {
                // User is signed out
                state.userId = null;
                state.userEmail = null;
                localStorage.removeItem('userId');
                localStorage.removeItem('userEmail');
                showAuthPage();
            }
        });

        return true;
    } catch (error) {
        console.error('Firebase initialization error:', error);
        return false;
    }
}

// Sign Up Function
async function handleSignup() {
    try {
        const { createUserWithEmailAndPassword } = await import("https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js");
        const { ref, set } = await import("https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js");

        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirm').value;
        const age = parseInt(document.getElementById('signupAge').value);
        const errorEl = document.getElementById('signupError');

        errorEl.textContent = '';

        // Validation
        if (!email) {
            errorEl.textContent = 'Email is required';
            return;
        }
        if (password.length < 6) {
            errorEl.textContent = 'Password must be at least 6 characters';
            return;
        }
        if (password !== confirmPassword) {
            errorEl.textContent = 'Passwords do not match';
            return;
        }
        if (isNaN(age) || age < 13 || age > 19) {
            errorEl.textContent = 'Age must be between 13-19';
            return;
        }

        // Create user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store user data in Realtime Database
        await set(ref(database, 'users/' + user.uid), {
            email: email,
            age: age,
            createdAt: new Date().toISOString(),
            moods: {},
        });

        state.userId = user.uid;
        state.userEmail = email;
        state.age = age;

        localStorage.setItem('userId', user.uid);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('age', age);

        showMainApp();
        document.getElementById('userEmail').textContent = email;

    } catch (error) {
        const errorEl = document.getElementById('signupError');
        if (error.code === 'auth/email-already-in-use') {
            errorEl.textContent = 'This email is already registered';
        } else if (error.code === 'auth/invalid-email') {
            errorEl.textContent = 'Invalid email format';
        } else {
            errorEl.textContent = 'Sign up failed: ' + error.message;
        }
    }
}

// Login Function
async function handleLogin() {
    try {
        const { signInWithEmailAndPassword } = await import("https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js");
        const { ref, get } = await import("https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js");

        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        const age = parseInt(document.getElementById('loginAge').value);
        const errorEl = document.getElementById('loginError');

        errorEl.textContent = '';

        if (!email || !password) {
            errorEl.textContent = 'Email and password are required';
            return;
        }
        if (isNaN(age) || age < 13 || age > 19) {
            errorEl.textContent = 'Age must be between 13-19';
            return;
        }

        // Sign in user
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Fetch user data
        const userSnapshot = await get(ref(database, 'users/' + user.uid));
        const userData = userSnapshot.val();

        state.userId = user.uid;
        state.userEmail = email;
        state.age = userData?.age || age;

        localStorage.setItem('userId', user.uid);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('age', state.age);

        showMainApp();
        document.getElementById('userEmail').textContent = email;

    } catch (error) {
        const errorEl = document.getElementById('loginError');
        if (error.code === 'auth/user-not-found') {
            errorEl.textContent = 'No account found with this email';
        } else if (error.code === 'auth/wrong-password') {
            errorEl.textContent = 'Incorrect password';
        } else if (error.code === 'auth/invalid-email') {
            errorEl.textContent = 'Invalid email format';
        } else {
            errorEl.textContent = 'Login failed: ' + error.message;
        }
    }
}

// Logout Function
async function handleLogout() {
    try {
        const { signOut } = await import("https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js");
        await signOut(auth);
        
        state.userId = null;
        state.userEmail = null;
        state.moods = [];
        state.selectedMood = null;

        localStorage.clear();
        showAuthPage();
    } catch (error) {
        console.error('Logout error:', error);
    }
}

// Switch Auth Tabs
function switchAuthTab(tab) {
    document.querySelectorAll('.auth-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.remove('active');
    });

    if (tab === 'login') {
        document.getElementById('loginForm').classList.add('active');
        document.querySelectorAll('.auth-tab-btn')[0].classList.add('active');
    } else {
        document.getElementById('signupForm').classList.add('active');
        document.querySelectorAll('.auth-tab-btn')[1].classList.add('active');
    }

    document.getElementById('loginError').textContent = '';
    document.getElementById('signupError').textContent = '';
}

// Show/Hide Pages
function showAuthPage() {
    document.getElementById('authPage').classList.add('active');
    document.getElementById('mainApp').classList.remove('active');
}

function showMainApp() {
    document.getElementById('authPage').classList.remove('active');
    document.getElementById('mainApp').classList.add('active');
}

// Initialize Firebase on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeFirebase();
});

// Allow Enter key for auth forms
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        if (document.getElementById('loginForm').classList.contains('active')) {
            handleLogin();
        } else if (document.getElementById('signupForm').classList.contains('active')) {
            handleSignup();
        }
    }
});
