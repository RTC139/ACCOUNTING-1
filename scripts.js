// This file handles user data storage, including saving user information in local storage or session storage to remember users after they sign up.

// Save both username and password to localStorage
function saveUserData(username, password) {
    const userData = {
        username: username,
        password: password
    };
    localStorage.setItem('userData', JSON.stringify(userData));
}

// Get user data from localStorage
function getUserData() {
    const userData = localStorage.getItem('userData');
    if (userData) {
        return JSON.parse(userData);
    }
    return null;
}

// Clear user data from localStorage
function clearUserData() {
    localStorage.removeItem('userData');
}

// Login authentication function
function login(username, password) {
    const userData = getUserData();
    
    if (userData && userData.username === username && userData.password === password) {
        // Successful login
        alert("Login successful!");
        // Redirect to the dashboard or home page after successful login
        window.location.href = "index.html";
    } else {
        // Failed login
        alert("Invalid username or password. Please try again.");
    }
}

// Check if user is already logged in
function checkLoginStatus() {
    const userData = getUserData();
    return userData !== null;
}