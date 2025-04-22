// This file handles user data storage

/**
 * Saves user credentials to local storage
 * @param {string} username - The user's username
 * @param {string} password - The user's password
 */
function saveUserData(username, password) {
    // Store user data as an object
    const userData = {
        username: username,
        password: password,
        lastLogin: new Date().toISOString() // Track when user registered
    };
    // Convert to JSON string and store
    localStorage.setItem('userData', JSON.stringify(userData));
}

/**
 * Retrieves stored user data
 * @returns {Object|null} User data object or null if not found
 */
function getUserData() {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
}

/**
 * Clears user data from storage (for logout)
 */
function clearUserData() {
    localStorage.removeItem('userData');
}