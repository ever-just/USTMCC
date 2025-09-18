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

// Partnership Configurator Logic
let partnershipData = {
    currentStep: 'welcome',
    formData: {},
    selectedType: null,
    selectedInterests: [],
    logisticsData: {}
};

function nextStep() {
    const currentStep = partnershipData.currentStep;
    let nextStepName = '';
    
    // Validate current step before proceeding
    if (!validateCurrentStep()) {
        return;
    }
    
    // Determine next step
    switch (currentStep) {
        case 'welcome':
            nextStepName = 'contact';
            break;
        case 'contact':
            nextStepName = 'type';
            break;
        case 'type':
            nextStepName = 'interests';
            if (partnershipData.selectedType === 'other') {
                handleOtherPartnerType();
            } else {
                populateInterests();
            }
            break;
        case 'interests':
            nextStepName = 'logistics';
            populateLogistics();
            break;
        case 'logistics':
            nextStepName = 'summary';
            populateSummary();
            break;
        default:
            return;
    }
    
    showStep(nextStepName);
}

function prevStep() {
    const currentStep = partnershipData.currentStep;
    let prevStepName = '';
    
    switch (currentStep) {
        case 'contact':
            prevStepName = 'welcome';
            break;
        case 'type':
            prevStepName = 'contact';
            break;
        case 'interests':
            prevStepName = 'type';
            break;
        case 'logistics':
            prevStepName = 'interests';
            break;
        case 'summary':
            prevStepName = 'logistics';
            break;
        default:
            return;
    }
    
    showStep(prevStepName);
}

function showStep(stepName) {
    // Hide all steps
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show target step
    const targetStep = document.querySelector(`[data-step="${stepName}"]`);
    if (targetStep) {
        setTimeout(() => {
            targetStep.classList.add('active');
        }, 100);
    }
    
    // Update progress indicator
    updateProgressIndicator(stepName);
    
    // Update current step
    partnershipData.currentStep = stepName;
    
    // Scroll to top of configurator
    document.querySelector('.partnership-configurator').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
}

function updateProgressIndicator(currentStep) {
    const steps = ['welcome', 'contact', 'type', 'interests', 'logistics', 'summary'];
    const currentIndex = steps.indexOf(currentStep);
    
    document.querySelectorAll('.progress-step').forEach((step, index) => {
        step.classList.remove('active', 'completed');
        
        if (index < currentIndex) {
            step.classList.add('completed');
        } else if (index === currentIndex) {
            step.classList.add('active');
        }
    });
}

function validateCurrentStep() {
    const currentStep = partnershipData.currentStep;
    
    switch (currentStep) {
        case 'welcome':
            return true;
            
        case 'contact':
            // Collect contact form data
            const name = document.getElementById('partner-name').value.trim();
            const email = document.getElementById('partner-email').value.trim();
            const company = document.getElementById('partner-company').value.trim();
            const title = document.getElementById('partner-title').value.trim();
            
            if (!name || !email || !company || !title) {
                alert('Please fill in all required fields');
                return false;
            }
            
            // Enhanced email validation requiring @ symbol
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address with @ symbol');
                document.getElementById('partner-email').focus();
                document.getElementById('partner-email').style.borderColor = '#e53e3e';
                setTimeout(() => {
                    document.getElementById('partner-email').style.borderColor = 'rgba(102, 51, 153, 0.15)';
                }, 3000);
                return false;
            }
            
            partnershipData.formData = { name, email, company, title };
            return true;
            
        case 'type':
            if (!partnershipData.selectedType) {
                alert('Please select your partner type');
                return false;
            }
            return true;
            
        case 'interests':
            if (partnershipData.selectedInterests.length === 0) {
                alert('Please select at least one partnership interest');
                return false;
            }
            return true;
            
        case 'logistics':
            // Validate logistics based on selected interests
            return validateLogistics();
            
        default:
            return true;
    }
}

function validateLogistics() {
    const logisticsInputs = document.querySelectorAll('#logistics-container input[required], #logistics-container select[required]');
    
    for (let input of logisticsInputs) {
        if (!input.value.trim()) {
            input.focus();
            input.style.borderColor = '#e53e3e';
            setTimeout(() => {
                input.style.borderColor = '#E2E8F0';
            }, 2000);
            return false;
        }
    }
    
    // Collect logistics data
    logisticsInputs.forEach(input => {
        partnershipData.logisticsData[input.name] = input.value;
    });
    
    return true;
}

// Partner type selection
document.addEventListener('DOMContentLoaded', function() {
    // Initialize partner type selection
    document.querySelectorAll('.partner-type-card').forEach(card => {
        card.addEventListener('click', function() {
            // Remove selection from all cards
            document.querySelectorAll('.partner-type-card').forEach(c => c.classList.remove('selected'));
            
            // Select this card
            this.classList.add('selected');
            partnershipData.selectedType = this.dataset.type;
            
            // Enable continue button
            document.getElementById('type-continue').classList.remove('disabled');
            document.getElementById('type-continue').disabled = false;
        });
    });
});

function populateInterests() {
    const container = document.getElementById('interests-container');
    const description = document.getElementById('interests-description');
    const partnerType = partnershipData.selectedType;
    
    let interestOptions = [];
    let customDescription = '';
    
    switch (partnerType) {
        case 'corporate':
        case 'consulting':
            customDescription = 'How would your organization like to engage with our students?';
            interestOptions = [
                { id: 'speaking', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#663399" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>', title: 'Executive Speaking', desc: 'Present to students about industry trends and career paths' },
                { id: 'office-visit', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#663399" stroke-width="2"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/><path d="M9 9v.01"/><path d="M9 12v.01"/><path d="M9 15v.01"/><path d="M16 12v.01"/><path d="M16 15v.01"/></svg>', title: 'Office Tours & Visits', desc: 'Host students at your workplace for immersive experience' },
                { id: 'case-projects', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#663399" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>', title: 'Case Study Projects', desc: 'Provide real business challenges for student teams' },
                { id: 'mentorship', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#663399" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>', title: 'Executive Mentorship', desc: 'One-on-one guidance for high-potential students' },
                { id: 'internships', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#663399" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>', title: 'Internship Opportunities', desc: 'Offer internship positions for club members' },
                { id: 'competitions', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#663399" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>', title: 'Case Competition Judging', desc: 'Judge student case competition presentations' }
            ];
            break;
            
        case 'alumni':
            customDescription = 'How would you like to give back to current UST students?';
            interestOptions = [
                { id: 'alumni-speaking', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#663399" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>', title: 'Alumni Presentations', desc: 'Share your career journey and insights' },
                { id: 'networking', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#663399" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>', title: 'Networking Events', desc: 'Connect with students at club events' },
                { id: 'mentorship', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#663399" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>', title: 'Alumni Mentorship', desc: 'Guide students as they start their careers' },
                { id: 'job-referrals', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#663399" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>', title: 'Job Referrals', desc: 'Help students find opportunities at your company' },
                { id: 'panel-discussions', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#663399" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>', title: 'Panel Discussions', desc: 'Participate in career and industry panels' },
                { id: 'mock-interviews', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#663399" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6"/></svg>', title: 'Mock Interviews', desc: 'Help students practice interview skills' },
                { id: 'other-alumni', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#663399" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>', title: 'Other Alumni Support', desc: 'Custom way to help students', hasInput: true }
            ];
            break;
            
        case 'faculty':
            customDescription = 'How can we collaborate academically?';
            interestOptions = [
                { id: 'guest-lectures', icon: '📚', title: 'Guest Lectures', desc: 'Present in business or consulting courses' },
                { id: 'research-collab', icon: '🔬', title: 'Research Collaboration', desc: 'Joint research projects with students' },
                { id: 'academic-mentorship', icon: '🎯', title: 'Academic Mentorship', desc: 'Guide students in academic and career development' },
                { id: 'curriculum-input', icon: '📖', title: 'Curriculum Input', desc: 'Help design practical learning experiences' }
            ];
            break;
            
        case 'nonprofit':
            customDescription = 'How can we support your mission while providing student experience?';
            interestOptions = [
                { id: 'pro-bono-consulting', icon: '🤝', title: 'Pro Bono Consulting', desc: 'Student teams work on your strategic challenges' },
                { id: 'nonprofit-speaking', icon: '🌟', title: 'Mission-Driven Speaking', desc: 'Present about social impact and purpose-driven careers' },
                { id: 'volunteer-projects', icon: '❤️', title: 'Volunteer Projects', desc: 'Students volunteer while gaining professional experience' },
                { id: 'board-shadowing', icon: '👀', title: 'Board Meeting Shadowing', desc: 'Students observe governance and strategic decisions' }
            ];
            break;
            
        case 'entrepreneur':
            customDescription = 'How can we help students learn from your entrepreneurial journey?';
            interestOptions = [
                { id: 'startup-speaking', icon: '💡', title: 'Entrepreneur Speaking', desc: 'Share your startup journey and lessons learned' },
                { id: 'startup-projects', icon: '🚀', title: 'Startup Consulting', desc: 'Students help solve business challenges' },
                { id: 'pitch-coaching', icon: '🎯', title: 'Pitch & Presentation Coaching', desc: 'Help students develop presentation skills' },
                { id: 'innovation-workshops', icon: '⚡', title: 'Innovation Workshops', desc: 'Lead workshops on creativity and problem-solving' }
            ];
            break;
    }
    
    description.textContent = customDescription;
    
    // Populate interest options
    container.innerHTML = interestOptions.map(option => `
        <div class="interest-option" data-interest="${option.id}">
            <span class="interest-icon">${option.icon}</span>
            <div class="interest-text">
                <h4>${option.title}</h4>
                <p>${option.desc}</p>
            </div>
        </div>
    `).join('');
    
    // Add click handlers for interest selection
    document.querySelectorAll('.interest-option').forEach(option => {
        option.addEventListener('click', function() {
            const interestId = this.dataset.interest;
            
            if (this.classList.contains('selected')) {
                // Deselect
                this.classList.remove('selected');
                partnershipData.selectedInterests = partnershipData.selectedInterests.filter(id => id !== interestId);
            } else {
                // Select (allow multiple selections)
                this.classList.add('selected');
                partnershipData.selectedInterests.push(interestId);
            }
            
            // Enable/disable continue button
            const continueBtn = document.getElementById('interests-continue');
            if (partnershipData.selectedInterests.length > 0) {
                continueBtn.classList.remove('disabled');
                continueBtn.disabled = false;
            } else {
                continueBtn.classList.add('disabled');
                continueBtn.disabled = true;
            }
        });
    });
}

function populateLogistics() {
    const container = document.getElementById('logistics-container');
    const description = document.getElementById('logistics-description');
    const interests = partnershipData.selectedInterests;
    
    let logisticsHTML = '';
    
    // Generate logistics questions based on selected interests
    if (interests.includes('speaking') || interests.includes('alumni-speaking') || interests.includes('startup-speaking') || interests.includes('nonprofit-speaking')) {
        logisticsHTML += `
            <div class="logistics-section">
                <h4>🎤 Speaking Engagement Details</h4>
                <div class="form-grid">
                    <div class="form-group">
                        <label for="speaking-topics">Preferred Topics *</label>
                        <input type="text" id="speaking-topics" name="speaking-topics" placeholder="e.g., Strategy, Leadership, Industry Trends" required>
                    </div>
                    <div class="form-group">
                        <label for="speaking-duration">Preferred Duration *</label>
                        <select id="speaking-duration" name="speaking-duration" required>
                            <option value="">Select Duration</option>
                            <option value="30-45 minutes">30-45 minutes</option>
                            <option value="1 hour">1 hour</option>
                            <option value="1.5-2 hours">1.5-2 hours</option>
                            <option value="Half day workshop">Half day workshop</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="speaking-frequency">Availability *</label>
                        <select id="speaking-frequency" name="speaking-frequency" required>
                            <option value="">Select Frequency</option>
                            <option value="One-time">One-time presentation</option>
                            <option value="Semester">Once per semester</option>
                            <option value="Multiple">Multiple times per year</option>
                        </select>
                    </div>
                </div>
            </div>
        `;
    }
    
    if (interests.includes('office-visit')) {
        logisticsHTML += `
            <div class="logistics-section">
                <h4>🏢 Office Visit Details</h4>
                <div class="form-grid">
                    <div class="form-group">
                        <label for="office-capacity">Group Size Capacity *</label>
                        <select id="office-capacity" name="office-capacity" required>
                            <option value="">Select Capacity</option>
                            <option value="5-10 students">5-10 students</option>
                            <option value="10-15 students">10-15 students</option>
                            <option value="15-25 students">15-25 students</option>
                            <option value="25+ students">25+ students</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="visit-type">Visit Format *</label>
                        <select id="visit-type" name="visit-type" required>
                            <option value="">Select Format</option>
                            <option value="Office tour only">Office tour only</option>
                            <option value="Tour + presentation">Tour + presentation</option>
                            <option value="Tour + networking">Tour + networking session</option>
                            <option value="Full immersion day">Full immersion day</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="visit-timing">Preferred Timing *</label>
                        <select id="visit-timing" name="visit-timing" required>
                            <option value="">Select Timing</option>
                            <option value="Weekday morning">Weekday morning</option>
                            <option value="Weekday afternoon">Weekday afternoon</option>
                            <option value="Lunch time">Lunch time</option>
                            <option value="After work">After work hours</option>
                        </select>
                    </div>
                </div>
            </div>
        `;
    }
    
    if (interests.includes('case-projects') || interests.includes('pro-bono-consulting') || interests.includes('startup-projects')) {
        logisticsHTML += `
            <div class="logistics-section">
                <h4>📊 Project Details</h4>
                <div class="form-grid">
                    <div class="form-group">
                        <label for="project-duration">Project Duration *</label>
                        <select id="project-duration" name="project-duration" required>
                            <option value="">Select Duration</option>
                            <option value="2-4 weeks">2-4 weeks</option>
                            <option value="1 semester">1 semester (15 weeks)</option>
                            <option value="Academic year">Full academic year</option>
                            <option value="Ongoing">Ongoing partnership</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="team-size">Student Team Size *</label>
                        <select id="team-size" name="team-size" required>
                            <option value="">Select Team Size</option>
                            <option value="1-2 students">1-2 students</option>
                            <option value="3-4 students">3-4 students</option>
                            <option value="5-6 students">5-6 students</option>
                            <option value="Multiple teams">Multiple teams</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="project-scope">Project Scope *</label>
                        <textarea id="project-scope" name="project-scope" placeholder="Describe the business challenge or project scope..." required></textarea>
                    </div>
                </div>
            </div>
        `;
    }
    
    if (interests.includes('mentorship') || interests.includes('academic-mentorship')) {
        logisticsHTML += `
            <div class="logistics-section">
                <h4>👥 Mentorship Details</h4>
                <div class="form-grid">
                    <div class="form-group">
                        <label for="mentorship-type">Mentorship Format *</label>
                        <select id="mentorship-type" name="mentorship-type" required>
                            <option value="">Select Format</option>
                            <option value="One-on-one">One-on-one mentoring</option>
                            <option value="Small group">Small group mentoring (3-5 students)</option>
                            <option value="Cohort">Cohort mentoring (10+ students)</option>
                            <option value="As-needed">As-needed advice</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="mentorship-frequency">Meeting Frequency *</label>
                        <select id="mentorship-frequency" name="mentorship-frequency" required>
                            <option value="">Select Frequency</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Bi-weekly">Bi-weekly</option>
                            <option value="Monthly">Monthly</option>
                            <option value="Quarterly">Quarterly</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="mentorship-focus">Focus Areas *</label>
                        <input type="text" id="mentorship-focus" name="mentorship-focus" placeholder="e.g., Career development, Technical skills, Industry knowledge" required>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Add general timing and logistics
    logisticsHTML += `
        <div class="logistics-section">
            <h4>📅 General Logistics</h4>
            <div class="form-grid">
                <div class="form-group">
                    <label for="timeline">Preferred Timeline *</label>
                    <select id="timeline" name="timeline" required>
                        <option value="">Select Timeline</option>
                        <option value="ASAP">As soon as possible</option>
                        <option value="Fall 2024">Fall 2024 semester</option>
                        <option value="Spring 2025">Spring 2025 semester</option>
                        <option value="Summer 2025">Summer 2025</option>
                        <option value="Academic year 2024-25">Academic year 2024-25</option>
                        <option value="Flexible">Flexible timing</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="additional-notes">Additional Notes</label>
                    <textarea id="additional-notes" name="additional-notes" placeholder="Any additional information, special requirements, or questions..."></textarea>
                </div>
            </div>
        </div>
    `;
    
    description.textContent = customDescription;
    container.innerHTML = logisticsHTML;
    
    // Add validation for logistics fields
    const logisticsInputs = container.querySelectorAll('input, select, textarea');
    logisticsInputs.forEach(input => {
        input.addEventListener('change', function() {
            const requiredFields = container.querySelectorAll('[required]');
            let allFilled = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    allFilled = false;
                }
            });
            
            const continueBtn = document.getElementById('logistics-continue');
            if (allFilled) {
                continueBtn.classList.remove('disabled');
                continueBtn.disabled = false;
            } else {
                continueBtn.classList.add('disabled');
                continueBtn.disabled = true;
            }
        });
    });
}

function populateSummary() {
    const container = document.getElementById('summary-content');
    const data = partnershipData;
    
    // Create summary display
    let summaryHTML = `
        <div class="summary-section">
            <h4>Contact Information</h4>
            <div class="summary-item">
                <span class="summary-label">Name:</span>
                <span class="summary-value">${data.formData.name}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Email:</span>
                <span class="summary-value">${data.formData.email}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Organization:</span>
                <span class="summary-value">${data.formData.company}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Role:</span>
                <span class="summary-value">${data.formData.title}</span>
            </div>
        </div>
        
        <div class="summary-section">
            <h4>Partnership Details</h4>
            <div class="summary-item">
                <span class="summary-label">Partner Type:</span>
                <span class="summary-value">${data.selectedType?.replace('-', ' ')}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Interests:</span>
                <span class="summary-value">${data.selectedInterests.join(', ')}</span>
            </div>
        </div>
    `;
    
    container.innerHTML = summaryHTML;
    
    // Prepare final form data
    const finalData = {
        ...data.formData,
        partnerType: data.selectedType,
        interests: data.selectedInterests,
        logistics: data.logisticsData,
        submittedAt: new Date().toISOString()
    };
    
    document.getElementById('final-data').value = JSON.stringify(finalData, null, 2);
}

// Direct opportunity selection from welcome screen
function selectOpportunityAndAdvance(interestType) {
    // Set partner type to corporate by default for quick access
    partnershipData.selectedType = 'corporate';
    partnershipData.selectedInterests = [interestType];
    
    // Skip to contact step first
    showStep('contact');
}

// Reset selected interests when changing partner type
function resetInterests() {
    partnershipData.selectedInterests = [];
    const continueBtn = document.getElementById('interests-continue');
    if (continueBtn) {
        continueBtn.classList.add('disabled');
        continueBtn.disabled = true;
    }
}

// Enhanced interests population with 'Other' option
function populateInterestsEnhanced() {
    const container = document.getElementById('interests-container');
    const description = document.getElementById('interests-description');
    const partnerType = partnershipData.selectedType;
    
    let interestOptions = [];
    let customDescription = '';
    
    // Reset interests when changing type
    resetInterests();
    
    switch (partnerType) {
        case 'corporate':
        case 'consulting':
            customDescription = 'How would your organization like to engage with our students?';
            interestOptions = [
                { id: 'speaking', icon: '🎤', title: 'Executive Speaking', desc: 'Present to students about industry trends and career paths' },
                { id: 'office-visit', icon: '🏢', title: 'Office Tours & Visits', desc: 'Host students at your workplace for immersive experience' },
                { id: 'case-projects', icon: '📊', title: 'Case Study Projects', desc: 'Provide real business challenges for student teams' },
                { id: 'mentorship', icon: '👥', title: 'Executive Mentorship', desc: 'One-on-one guidance for high-potential students' },
                { id: 'internships', icon: '💼', title: 'Internship Opportunities', desc: 'Offer internship positions for club members' },
                { id: 'competitions', icon: '🏆', title: 'Case Competition Judging', desc: 'Judge student case competition presentations' },
                { id: 'sponsorship', icon: '💰', title: 'Event Sponsorship', desc: 'Sponsor club events and activities' },
                { id: 'recruiting', icon: '🎯', title: 'Campus Recruiting', desc: 'Recruit students for full-time positions' },
                { id: 'other-corporate', icon: '✨', title: 'Other Partnership', desc: 'Custom partnership opportunity', hasInput: true }
            ];
            break;
            
        case 'alumni':
            customDescription = 'How would you like to give back to current UST students?';
            interestOptions = [
                { id: 'alumni-speaking', icon: '🎓', title: 'Alumni Presentations', desc: 'Share your career journey and insights' },
                { id: 'networking', icon: '🤝', title: 'Networking Events', desc: 'Connect with students at club events' },
                { id: 'mentorship', icon: '👥', title: 'Alumni Mentorship', desc: 'Guide students as they start their careers' },
                { id: 'job-referrals', icon: '📋', title: 'Job Referrals', desc: 'Help students find opportunities at your company' },
                { id: 'panel-discussions', icon: '💬', title: 'Panel Discussions', desc: 'Participate in career and industry panels' },
                { id: 'mock-interviews', icon: '🗣️', title: 'Mock Interviews', desc: 'Help students practice interview skills' },
                { id: 'other-alumni', icon: '✨', title: 'Other Way to Help', desc: 'Custom alumni contribution', hasInput: true }
            ];
            break;
            
        case 'faculty':
            customDescription = 'How can educational institutions collaborate?';
            interestOptions = [
                { id: 'school-visits', icon: '🏫', title: 'School Exchange Visits', desc: 'Host UST students or visit your institution' },
                { id: 'joint-programs', icon: '🤝', title: 'Joint Programs', desc: 'Collaborative academic or extracurricular programs' },
                { id: 'guest-lectures', icon: '📚', title: 'Guest Lectures', desc: 'Present to students or invite UST speakers' },
                { id: 'club-partnerships', icon: '👥', title: 'Student Club Partnerships', desc: 'Partnerships between student organizations' },
                { id: 'academic-competitions', icon: '🏆', title: 'Academic Competitions', desc: 'Joint case competitions or academic challenges' },
                { id: 'faculty-exchange', icon: '🔄', title: 'Faculty Exchange', desc: 'Faculty collaboration and knowledge sharing' },
                { id: 'other-educational', icon: '✨', title: 'Other Collaboration', desc: 'Custom educational partnership', hasInput: true }
            ];
            break;
            
        case 'nonprofit':
            customDescription = 'How can we support your mission while providing student experience?';
            interestOptions = [
                { id: 'pro-bono-consulting', icon: '🤝', title: 'Pro Bono Consulting', desc: 'Student teams work on your strategic challenges' },
                { id: 'nonprofit-speaking', icon: '🌟', title: 'Mission-Driven Speaking', desc: 'Present about social impact and purpose-driven careers' },
                { id: 'volunteer-projects', icon: '❤️', title: 'Volunteer Projects', desc: 'Students volunteer while gaining professional experience' },
                { id: 'board-shadowing', icon: '👀', title: 'Board Meeting Shadowing', desc: 'Students observe governance and strategic decisions' },
                { id: 'fundraising-support', icon: '💡', title: 'Fundraising Strategy', desc: 'Students help with fundraising and development' },
                { id: 'impact-measurement', icon: '📊', title: 'Impact Measurement', desc: 'Help measure and communicate your social impact' },
                { id: 'other-nonprofit', icon: '✨', title: 'Other Partnership', desc: 'Custom non-profit collaboration', hasInput: true }
            ];
            break;
            
        case 'entrepreneur':
            customDescription = 'How can students learn from your entrepreneurial journey?';
            interestOptions = [
                { id: 'startup-speaking', icon: '💡', title: 'Entrepreneur Speaking', desc: 'Share your startup journey and lessons learned' },
                { id: 'startup-projects', icon: '🚀', title: 'Startup Consulting', desc: 'Students help solve business challenges' },
                { id: 'pitch-coaching', icon: '🎯', title: 'Pitch & Presentation Coaching', desc: 'Help students develop presentation skills' },
                { id: 'innovation-workshops', icon: '⚡', title: 'Innovation Workshops', desc: 'Lead workshops on creativity and problem-solving' },
                { id: 'startup-visits', icon: '🏢', title: 'Startup Office Tours', desc: 'Show students startup culture and environment' },
                { id: 'investor-insights', icon: '💰', title: 'Investor Perspectives', desc: 'Share insights on funding and business development' },
                { id: 'other-entrepreneur', icon: '✨', title: 'Other Opportunity', desc: 'Custom entrepreneurial partnership', hasInput: true }
            ];
            break;
    }
    
    description.textContent = customDescription;
    
    // Populate interest options with 'Other' support
    container.innerHTML = interestOptions.map(option => `
        <div class="interest-option" data-interest="${option.id}">
            <span class="interest-icon">${option.icon}</span>
            <div class="interest-text">
                <h4>${option.title}</h4>
                <p>${option.desc}</p>
                ${option.hasInput ? '<input type="text" class="other-input" placeholder="Please describe your custom partnership idea..." style="margin-top: 0.5rem; padding: 0.5rem; border: 1px solid #ddd; border-radius: 6px; width: 100%;">' : ''}
            </div>
        </div>
    `).join('');
    
    // Reset continue button
    const continueBtn = document.getElementById('interests-continue');
    continueBtn.classList.add('disabled');
    continueBtn.disabled = true;
    
    // Add click handlers for interest selection with proper continue button logic
    document.querySelectorAll('.interest-option').forEach(option => {
        option.addEventListener('click', function() {
            const interestId = this.dataset.interest;
            
            if (this.classList.contains('selected')) {
                // Deselect
                this.classList.remove('selected');
                partnershipData.selectedInterests = partnershipData.selectedInterests.filter(id => id !== interestId);
            } else {
                // Select (allow multiple selections)
                this.classList.add('selected');
                if (!partnershipData.selectedInterests.includes(interestId)) {
                    partnershipData.selectedInterests.push(interestId);
                }
            }
            
            // Enable/disable continue button based on selections
            if (partnershipData.selectedInterests.length > 0) {
                continueBtn.classList.remove('disabled');
                continueBtn.disabled = false;
            } else {
                continueBtn.classList.add('disabled');
                continueBtn.disabled = true;
            }
        });
    });
}

// Override the original populateInterests function
window.populateInterests = populateInterestsEnhanced;

// Enhanced partner type selection with 'Other' support
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced partner type selection
    document.querySelectorAll('.partner-type-card').forEach(card => {
        card.addEventListener('click', function() {
            // Remove selection from all cards
            document.querySelectorAll('.partner-type-card').forEach(c => {
                c.classList.remove('selected');
                const otherInput = c.querySelector('.other-type-input');
                if (otherInput) {
                    otherInput.style.display = 'none';
                    otherInput.value = '';
                }
            });
            
            // Select this card
            this.classList.add('selected');
            partnershipData.selectedType = this.dataset.type;
            
            // Show input field if 'Other' is selected
            if (this.dataset.type === 'other') {
                const otherInput = this.querySelector('.other-type-input');
                if (otherInput) {
                    otherInput.style.display = 'block';
                    otherInput.focus();
                    
                    // Enable continue only when text is entered
                    otherInput.addEventListener('input', function() {
                        const continueBtn = document.getElementById('type-continue');
                        if (this.value.trim()) {
                            continueBtn.classList.remove('disabled');
                            continueBtn.disabled = false;
                            partnershipData.otherTypeDescription = this.value.trim();
                        } else {
                            continueBtn.classList.add('disabled');
                            continueBtn.disabled = true;
                        }
                    });
                }
            } else {
                // Enable continue button for predefined types
                document.getElementById('type-continue').classList.remove('disabled');
                document.getElementById('type-continue').disabled = false;
            }
        });
    });
});

// Update populateInterests for 'other' partner type
function handleOtherPartnerType() {
    if (partnershipData.selectedType === 'other') {
        const description = document.getElementById('interests-description');
        const container = document.getElementById('interests-container');
        
        description.textContent = 'What type of partnership are you interested in?';
        
        const generalOptions = [
            { id: 'speaking-general', icon: '🎤', title: 'Speaking Opportunities', desc: 'Present to students on your area of expertise' },
            { id: 'site-visits', icon: '🏢', title: 'Site Visits', desc: 'Host students at your location' },
            { id: 'collaboration', icon: '🤝', title: 'General Collaboration', desc: 'Work together on projects or initiatives' },
            { id: 'mentorship-general', icon: '👥', title: 'Mentorship', desc: 'Guide and advise students' },
            { id: 'events', icon: '🎯', title: 'Event Partnership', desc: 'Collaborate on events or activities' },
            { id: 'other-custom', icon: '✨', title: 'Custom Partnership', desc: 'Describe your unique partnership idea', hasInput: true }
        ];
        
        container.innerHTML = generalOptions.map(option => `
            <div class="interest-option" data-interest="${option.id}">
                <span class="interest-icon">${option.icon}</span>
                <div class="interest-text">
                    <h4>${option.title}</h4>
                    <p>${option.desc}</p>
                    ${option.hasInput ? '<textarea class="other-input" placeholder="Please describe your custom partnership idea in detail..." style="margin-top: 0.8rem; padding: 0.8rem; border: 1px solid #ddd; border-radius: 8px; width: 100%; min-height: 80px; resize: vertical;"></textarea>' : ''}
                </div>
            </div>
        `).join('');
        
        // Add enhanced click handlers for Other type
        setupInterestClickHandlers();
    }
}

function setupInterestClickHandlers() {
    const continueBtn = document.getElementById('interests-continue');
    continueBtn.classList.add('disabled');
    continueBtn.disabled = true;
    
    document.querySelectorAll('.interest-option').forEach(option => {
        option.addEventListener('click', function() {
            const interestId = this.dataset.interest;
            
            if (this.classList.contains('selected')) {
                // Deselect
                this.classList.remove('selected');
                partnershipData.selectedInterests = partnershipData.selectedInterests.filter(id => id !== interestId);
            } else {
                // Select (allow multiple selections)
                this.classList.add('selected');
                if (!partnershipData.selectedInterests.includes(interestId)) {
                    partnershipData.selectedInterests.push(interestId);
                }
                
                // Show input field if it has one
                const otherInput = this.querySelector('.other-input');
                if (otherInput) {
                    otherInput.style.display = 'block';
                    otherInput.focus();
                }
            }
            
            // Enable/disable continue button
            if (partnershipData.selectedInterests.length > 0) {
                continueBtn.classList.remove('disabled');
                continueBtn.disabled = false;
            } else {
                continueBtn.classList.add('disabled');
                continueBtn.disabled = true;
            }
        });
    });
}

// Additional corporate partnership options
function addMoreCorporateOptions() {
    return [
        { id: 'speaking', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#663399" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>', title: 'Executive Speaking', desc: 'Present to students about industry trends and career paths' },
        { id: 'office-visit', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#663399" stroke-width="2"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/><path d="M9 9v.01"/><path d="M9 12v.01"/><path d="M9 15v.01"/><path d="M16 12v.01"/><path d="M16 15v.01"/></svg>', title: 'Office Tours & Visits', desc: 'Host students at your workplace for immersive experience' },
        { id: 'case-projects', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#663399" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>', title: 'Case Study Projects', desc: 'Provide real business challenges for student teams' },
        { id: 'mentorship', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#663399" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>', title: 'Executive Mentorship', desc: 'One-on-one guidance for high-potential students' },
        { id: 'internships', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#663399" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>', title: 'Internship Opportunities', desc: 'Offer internship positions for club members' },
        { id: 'competitions', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#663399" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>', title: 'Case Competition Judging', desc: 'Judge student case competition presentations' },
        { id: 'sponsorship', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#663399" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6"/><path d="M1 12h6m6 0h6"/></svg>', title: 'Event Sponsorship', desc: 'Sponsor club events and activities' },
        { id: 'recruiting', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#663399" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>', title: 'Campus Recruiting', desc: 'Recruit students for full-time positions' },
        { id: 'other-corporate', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#663399" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>', title: 'Other Partnership', desc: 'Custom partnership opportunity', hasInput: true }
    ];
}

// Fix Continue button issue by ensuring proper event listener setup
function fixContinueButtonLogic() {
    // Reset interests selection state
    partnershipData.selectedInterests = [];
    
    // Ensure continue button starts disabled
    const continueBtn = document.getElementById('interests-continue');
    if (continueBtn) {
        continueBtn.classList.add('disabled');
        continueBtn.disabled = true;
    }
}

// Enhanced setup for all interest options
function setupEnhancedInterestHandlers() {
    setTimeout(() => {
        const continueBtn = document.getElementById('interests-continue');
        
        document.querySelectorAll('.interest-option').forEach(option => {
            option.addEventListener('click', function() {
                const interestId = this.dataset.interest;
                
                if (this.classList.contains('selected')) {
                    // Deselect
                    this.classList.remove('selected');
                    partnershipData.selectedInterests = partnershipData.selectedInterests.filter(id => id !== interestId);
                    
                    // Hide input if exists
                    const otherInput = this.querySelector('.other-input');
                    if (otherInput) {
                        otherInput.style.display = 'none';
                        otherInput.value = '';
                    }
                } else {
                    // Select (allow multiple selections)
                    this.classList.add('selected');
                    if (!partnershipData.selectedInterests.includes(interestId)) {
                        partnershipData.selectedInterests.push(interestId);
                    }
                    
                    // Show input field if it has one
                    const otherInput = this.querySelector('.other-input, .other-input-textarea');
                    if (otherInput) {
                        otherInput.style.display = 'block';
                        otherInput.focus();
                    }
                }
                
                // Enable/disable continue button
                if (partnershipData.selectedInterests.length > 0) {
                    continueBtn.classList.remove('disabled');
                    continueBtn.disabled = false;
                } else {
                    continueBtn.classList.add('disabled');
                    continueBtn.disabled = true;
                }
            });
        });
    }, 100);
}

// Override populateInterests to use enhanced handler
const originalPopulateInterests = window.populateInterests;
window.populateInterests = function() {
    if (originalPopulateInterests) {
        originalPopulateInterests();
    }
    fixContinueButtonLogic();
    setupEnhancedInterestHandlers();
};
