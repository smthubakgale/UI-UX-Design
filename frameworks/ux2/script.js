document.querySelector('.toggle-sidebar').addEventListener('click', function() {
    document.body.classList.toggle('sidebar-toggled');
});

// Optional: Add this to make the sidebar toggle on smaller screens
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        document.body.classList.remove('sidebar-toggled');
    }
});
