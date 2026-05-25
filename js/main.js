// ========================================
// UNIVERSITY OF DUKES - MAIN JAVASCRIPT
// Interactive Features & Functionality
// ========================================

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    
    // ---------- NAVIGATION ----------
    // Mobile Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.innerHTML = navMenu.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (hamburger) hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // Sticky Navigation on Scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // ---------- STATS COUNTER ANIMATION ----------
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        const animateNumbers = () => {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                let current = 0;
                const increment = target / 50;
                const updateNumber = () => {
                    if (current < target) {
                        current += increment;
                        stat.textContent = Math.ceil(current);
                        requestAnimationFrame(updateNumber);
                    } else {
                        stat.textContent = target.toLocaleString();
                    }
                };
                updateNumber();
            });
        };
        
        // Trigger animation when stats come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        const statsSection = document.querySelector('.stats');
        if (statsSection) observer.observe(statsSection);
    }
    
    // ---------- ADMISSIONS FORM VALIDATION ----------
    const applicationForm = document.getElementById('applicationForm');
    if (applicationForm) {
        applicationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('firstName')?.value.trim();
            const lastName = document.getElementById('lastName')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const phone = document.getElementById('phone')?.value.trim();
            const dob = document.getElementById('dob')?.value;
            const program = document.getElementById('program')?.value;
            
            let errors = [];
            
            if (!firstName) errors.push('First name is required');
            if (!lastName) errors.push('Last name is required');
            if (!email) errors.push('Email is required');
            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Valid email is required');
            if (!phone) errors.push('Phone number is required');
            if (!dob) errors.push('Date of birth is required');
            if (!program) errors.push('Please select a program');
            
            if (errors.length > 0) {
                alert('Please fix the following errors:\n' + errors.join('\n'));
            } else {
                alert(`Thank you ${firstName}! Your application has been submitted. We will contact you at ${email} within 3-5 business days.`);
                applicationForm.reset();
            }
        });
    }
    
    // ---------- SMOOTH SCROLLING ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== "#" && href !== "") {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ---------- BACK TO TOP BUTTON ----------
    // Create back to top button
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.id = 'backToTop';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary, #800020);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(backToTop);
    
    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.background = '#5a0016';
        backToTop.style.transform = 'translateY(-3px)';
    });
    
    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.background = '#800020';
        backToTop.style.transform = 'translateY(0)';
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ---------- ANIMATION ON SCROLL ----------
    const animateElements = document.querySelectorAll('.feature-card, .program-card, .school-card, .info-card');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(el);
    });
    
    // ---------- CURRENT YEAR IN FOOTER ----------
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2025', currentYear);
    }
    
    // ---------- ACTIVE NAVIGATION LINK HIGHLIGHTING ----------
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinkItems = document.querySelectorAll('.nav-link');
    
    navLinkItems.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });
    
    // ---------- NEWSLETTER SUBSCRIPTION (if exists) ----------
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]')?.value;
            if (email) {
                alert(`Thank you for subscribing! Updates will be sent to ${email}`);
                this.reset();
            }
        });
    }
    
    // ---------- PROGRAM FILTER (if on academics page) ----------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const programCards = document.querySelectorAll('.program-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                programCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // ---------- PRELOADER (optional) ----------
    // Add a simple preloader effect
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    preloader.innerHTML = `
        <div style="text-align: center;">
            <i class="fas fa-university" style="font-size: 3rem; color: #800020; animation: pulse 1s infinite;"></i>
            <p style="margin-top: 1rem; color: #800020;">Loading...</p>
        </div>
    `;
    
    // Uncomment to enable preloader
    // document.body.appendChild(preloader);
    // window.addEventListener('load', () => {
    //     setTimeout(() => {
    //         preloader.style.opacity = '0';
    //         setTimeout(() => preloader.remove(), 500);
    //     }, 500);
    // });
    
    console.log('University of Dukes website loaded successfully!');
});

// ---------- ADDITIONAL UTILITY FUNCTIONS ----------

// Function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to validate phone number
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return phoneRegex.test(phone);
}

// Function to format date
function formatDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Export functions for global use
window.isValidEmail = isValidEmail;
window.isValidPhone = isValidPhone;
window.formatDate = formatDate;