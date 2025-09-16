// UST Management Consulting Club Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Enhanced mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.classList.toggle('active');
            const isActive = navLinks.classList.contains('active');
            this.innerHTML = isActive ? '<span>✕</span>' : '<span>☰</span>';
            document.body.style.overflow = isActive ? 'hidden' : '';
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!header.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (mobileMenuBtn) {
                mobileMenuBtn.innerHTML = '<span>☰</span>';
            }
            document.body.style.overflow = '';
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu
            if (navLinks) {
                navLinks.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.innerHTML = '<span>☰</span>';
                }
                document.body.style.overflow = '';
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = Array.from(element.parentNode.children).indexOf(element) * 120;
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, delay);
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe all elements that should animate
    document.querySelectorAll('.feature, .officer, .resource, .contact-item, .contact-form-section').forEach(el => {
        observer.observe(el);
    });

    // Enhanced header scroll effect
    function handleHeaderScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.backgroundColor = 'rgba(102, 51, 153, 0.98)';
            header.style.backdropFilter = 'blur(25px)';
            header.style.boxShadow = '0 8px 32px rgba(102, 51, 153, 0.2)';
        } else {
            header.style.backgroundColor = 'rgba(102, 51, 153, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.boxShadow = '0 8px 32px rgba(102, 51, 153, 0.15)';
        }
    }

    // Form enhancement
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('.submit-btn');
            
            if (submitBtn) {
                submitBtn.innerHTML = 'Sending...';
                submitBtn.disabled = true;
                submitBtn.style.background = 'linear-gradient(135deg, #999999 0%, #777777 100%)';
            }
        });

        // Enhanced form validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.style.borderColor = '#e53e3e';
                    this.style.boxShadow = '0 0 0 4px rgba(229, 62, 62, 0.1)';
                } else {
                    this.style.borderColor = '#E2E8F0';
                    this.style.boxShadow = 'none';
                }
            });
        });
    }

    // Initialize
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 768 && navLinks) {
                navLinks.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.innerHTML = '<span>☰</span>';
                }
                document.body.style.overflow = '';
            }
        }, 250);
    });
});

    // Additional form enhancements for mobile
    function enhanceFormForMobile() {
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            const inputs = contactForm.querySelectorAll('input, select, textarea');
            
            // Ensure clean initial state - no error styling on page load
            inputs.forEach(input => {
                input.classList.remove('error');
                input.style.borderColor = '#E2E8F0';
                input.style.boxShadow = 'none';
                
                // Prevent zoom on iOS when focusing inputs
                if (window.innerWidth <= 768) {
                    input.setAttribute('data-mobile-optimized', 'true');
                }
            });
        }
    }
    
    // Initialize mobile enhancements
    enhanceFormForMobile();
    
    // Re-initialize on resize
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            enhanceFormForMobile();
        }
    });

    // Newsletter form validation
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('.newsletter-btn');
            
            // Enhanced email validation
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            
            if (!emailRegex.test(emailInput.value)) {
                e.preventDefault();
                emailInput.style.borderColor = '#e53e3e';
                emailInput.style.boxShadow = '0 0 0 3px rgba(229, 62, 62, 0.2)';
                emailInput.focus();
                
                // Show error feedback
                const originalPlaceholder = emailInput.placeholder;
                emailInput.placeholder = 'Please enter a valid email address';
                emailInput.value = '';
                emailInput.style.animation = 'shake 0.5s ease-in-out';
                
                setTimeout(() => {
                    emailInput.placeholder = originalPlaceholder;
                    emailInput.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    emailInput.style.boxShadow = 'none';
                    emailInput.style.animation = '';
                }, 3000);
                
                return false;
            }
            
            // Success feedback
            if (submitBtn) {
                submitBtn.innerHTML = '✓ Subscribed!';
                submitBtn.disabled = true;
                submitBtn.style.background = '#28a745';
                
                setTimeout(() => {
                    submitBtn.innerHTML = 'Subscribe';
                    submitBtn.disabled = false;
                    submitBtn.style.background = 'white';
                    emailInput.value = '';
                }, 2500);
            }
        });
        
        // Real-time email validation with visual feedback
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        if (emailInput) {
            emailInput.addEventListener('input', function() {
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                
                if (this.value && emailRegex.test(this.value)) {
                    this.style.borderColor = 'rgba(76, 175, 80, 0.6)';
                    this.style.background = 'rgba(76, 175, 80, 0.1)';
                } else if (this.value) {
                    this.style.borderColor = 'rgba(255, 193, 7, 0.6)';
                    this.style.background = 'rgba(255, 255, 255, 0.1)';
                } else {
                    this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    this.style.background = 'rgba(255, 255, 255, 0.1)';
                }
            });
            
            emailInput.addEventListener('blur', function() {
                if (!this.value) {
                    this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    this.style.background = 'rgba(255, 255, 255, 0.1)';
                }
            });
        }
    }
