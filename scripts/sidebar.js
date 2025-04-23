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

    // ...existing code...

    // Simplified Logout functionality - just redirects without affecting saved data
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Simply redirect to the home page
            window.location.href = "index.html";
        });
    }
});