// UST Management Consulting Club Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation on scroll
    function animateOnScroll() {
        const elements = [
            ...document.querySelectorAll('.feature'),
            ...document.querySelectorAll('.officer'),
            ...document.querySelectorAll('.resource'),
            ...document.querySelectorAll('.contact-item')
        ];
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate-in');
            }
        });
    }

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .feature, .officer, .resource, .contact-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Header scroll effect
    function handleHeaderScroll() {
        const header = document.querySelector('header');
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(81, 40, 136, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.backgroundColor = '#512888';
                header.style.backdropFilter = 'none';
            }
        });
    }

    // Initialize
    window.addEventListener('scroll', animateOnScroll);
    handleHeaderScroll();
    animateOnScroll();
});
