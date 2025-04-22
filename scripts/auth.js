// This file handles authentication logic

/**
 * Authenticates a user with the provided credentials
 * @param {string} username - The user's username
 * @param {string} password - The user's password
 */
function login(username, password) {
    const userData = getUserData();
    
    if (userData && userData.username === username && userData.password === password) {
        // Successful login
        alert("Login successful!");
        // Redirect to index2.html instead of index.html
        window.location.href = "../index2.html";
    } else {
        // Failed login
        alert("Invalid username or password. Please try again.");
    }
}

/**
 * Checks if a user is currently logged in
 * @returns {boolean} Whether the user is logged in
 */
function checkLoginStatus() {
    return getUserData() !== null;
}

// Optional: Add logout functionality
function logout() {
    clearUserData();
    window.location.href = "../pages/login.html";
}