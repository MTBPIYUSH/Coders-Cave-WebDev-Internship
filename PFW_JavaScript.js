// script.js

// Smooth scrolling for side navigation
document.querySelectorAll('#side-nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Progress bar functionality
window.addEventListener('scroll', () => {
    const progressBar = document.getElementById('progress-bar');
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progressHeight = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${progressHeight}%`;
});
