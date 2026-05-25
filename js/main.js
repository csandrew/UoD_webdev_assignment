
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    //MOBILE HAMBURGER MENU TOGGLE
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
            });
        });
    }

    //STATS COUNTER ANIMATION (Home Page)

    const statNumbers = document.querySelectorAll('.stat-number');

    if (statNumbers.length > 0) {
        function animateStats() {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                if (isNaN(target)) return;

                let current = 0;
                const increment = target / 50;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        stat.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target;
                    }
                };
                updateCounter();
            });
        }

        // Use Intersection Observer to trigger animation when stats are visible
        const statsSection = document.querySelector('.stats');
        if (statsSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateStats();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            observer.observe(statsSection);
        }
    }

    //FAQ (Contact Page)

    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', () => {
                    // Close all other items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                        }
                    });
                    // Toggle current item
                    item.classList.toggle('active');
                });
            }
        });
    }

    //CONTACT FORM HANDLER (Contact Page)

    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const fullName = document.getElementById('fullName')?.value.trim() || '';
            const email = document.getElementById('email')?.value.trim() || '';
            const subject = document.getElementById('subject')?.value || '';
            const message = document.getElementById('message')?.value.trim() || '';

            // Validation
            let errors = [];

            if (!fullName) errors.push('Please enter your full name');
            if (!email) errors.push('Please enter your email address');
            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Please enter a valid email address');
            if (!subject) errors.push('Please select a subject');
            if (!message) errors.push('Please enter your message');

            // Display errors or success
            if (formStatus) {
                if (errors.length > 0) {
                    formStatus.innerHTML = `
                        <div class="error-message">
                            <i class="fas fa-exclamation-circle"></i> ${errors.join(', ')}
                        </div>
                    `;
                    // Auto-hide after 5 seconds
                    setTimeout(() => {
                        formStatus.innerHTML = '';
                    }, 5000);
                } else {
                    formStatus.innerHTML = `
                        <div class="success-message">
                            <i class="fas fa-check-circle"></i> Thank you ${fullName}! Your message has been sent. We'll get back to you within 24-48 hours.
                        </div>
                    `;
                    contactForm.reset();

                    // Auto-hide after 5 seconds
                    setTimeout(() => {
                        formStatus.innerHTML = '';
                    }, 5000);
                }
            }
        });
    }

    //SMOOTH SCROLL FOR ANCHOR LINKS

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


    //ADD ACTIVE CLASS TO CURRENT PAGE NAV LINK

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        } else if (currentPage === 'index.html' && linkHref === 'index.html') {
            link.classList.add('active');
        } else if (linkHref && currentPage.includes(linkHref.replace('.html', ''))) {
            // Fallback for partial matches
            if (currentPage === linkHref) {
                link.classList.add('active');
            }
        }
    });

    //REVEAL ANIMATIONS ON SCROLL (Optional)

    const revealElements = document.querySelectorAll('.feature-card, .program-card, .school-card, .research-card, .info-card, .mv-card');

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            revealObserver.observe(el);
        });
    }

    //PRELOADER / PAGE TRANSITION EFFECT
    
    // Simple fade-in effect for body
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';

    window.addEventListener('load', function () {
        document.body.style.opacity = '1';
    });

    //LOG CONSOLE MESSAGE (Just for fun)

    console.log('🏛️ University of Dukes | Excellence in Education Since 1965');
});