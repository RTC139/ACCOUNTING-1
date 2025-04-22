/**
 * Sidebar functionality for profile navigation
 */
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const profileToggle = document.getElementById('profile-toggle');
    const sidebar = document.getElementById('profile-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const logoutButton = document.getElementById('logout-button');

    // Toggle sidebar when profile icon is clicked
    profileToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    });

    // Close sidebar when clicking on the overlay
    overlay.addEventListener('click', function() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });

    // Close sidebar when pressing ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        }
    });

    // Improved Logout functionality
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get current user data
            let userData = null;
            try {
                userData = JSON.parse(localStorage.getItem('userData'));
            } catch (e) {
                // If there's an error parsing, start with empty object
                userData = {};
            }
            
            // Save the username and any other account info
            const savedInfo = {
                username: userData?.username,
                email: userData?.email,
                // Add any other account info you want to preserve
            };
            
            // Set logged in status to false instead of deleting data
            localStorage.setItem('userData', JSON.stringify({
                ...savedInfo,
                isLoggedIn: false
            }));
            
            // Redirect to login page
            window.location.href = "pages/login.html";
        });
    }
});