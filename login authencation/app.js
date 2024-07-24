// Simple hashing function (not secure, for demonstration purposes only)
function hashPassword(password) {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32-bit integer
    }
    return hash.toString();
}

// Function to register a user
function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const message = document.getElementById('register-message');

    if (!username || !password) {
        message.textContent = 'Both fields are required.';
        return;
    }

    if (localStorage.getItem(username)) {
        message.textContent = 'Username already taken. Please choose another one.';
        return;
    }

    const hashedPassword = hashPassword(password);
    localStorage.setItem(username, hashedPassword);

    message.textContent = 'User registered successfully!';
    setTimeout(() => {
        showLogin(); // Switch to login tab
    }, 1000);
}

// Function to log in a user
function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const message = document.getElementById('login-message');

    if (!username || !password) {
        message.textContent = 'Both fields are required.';
        return;
    }

    const storedHashedPassword = localStorage.getItem(username);
    if (!storedHashedPassword) {
        message.textContent = 'Username not found. Please register first.';
        return;
    }

    if (storedHashedPassword === hashPassword(password)) {
        message.textContent = 'Login successful!';
        localStorage.setItem('currentUser', username);
        setTimeout(() => {
            window.location.href = 'secured.html'; // Redirect to secured page
        }, 1000);
    } else {
        message.textContent = 'Incorrect password. Please try again.';
    }
}

// Function to log out a user
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html'; // Redirect to login page
}

// Function to show the login tab
function showLogin() {
    document.getElementById('register').style.display = 'none';
    document.getElementById('login').style.display = 'flex';
}

// Function to show the registration tab
function showRegister() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('register').style.display = 'flex';
}

// Function to handle "Back" button on secured page
function goBack() {
    window.location.href = 'index.html'; // Redirect to login page
}

// Check if user is on secured page and display username if logged in
if (window.location.pathname.endsWith('secured.html')) {
    const username = localStorage.getItem('currentUser');
    if (!username) {
        window.location.href = 'index.html'; // Redirect to login page if not logged in
    } else {
        document.getElementById('username-display').textContent = username;
    }
}
