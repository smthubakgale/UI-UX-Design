document.querySelector('.toggle-sidebar').addEventListener('click', function() {
    document.body.classList.toggle('sidebar-toggled');
});

// Optional: Add this to make the sidebar toggle on smaller screens
window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
        document.body.classList.add('sidebar-toggled');
    } else {
        document.body.classList.remove('sidebar-toggled');
    }
});

// Toggle top menu on smaller screens
window.addEventListener('resize', function() {
    if (window.innerWidth <= 480) {
        document.querySelectorAll('.top-menu li').forEach((li) => {
            li.querySelector('ul').style.display = 'none';
        });
    } else {
        document.querySelectorAll('.top-menu li').forEach((li) => {
            li.querySelector('ul').style.display = 'block';
        });
    }
});
