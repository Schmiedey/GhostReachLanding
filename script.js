/* ==========================================
   GhostReach - JavaScript Interactions
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initParticleSystem();
    initScrollAnimations();
    initNavbarScroll();
    initMobileMenu();
    initCounterAnimation();
    initSmoothScroll();
    initParallaxEffects();
    initMouseGlow();
});

/* ==========================================
   Particle System
   ========================================== */
function initParticleSystem() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer, i);
    }
}

function createParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random properties
    const size = Math.random() * 3 + 1;
    const left = Math.random() * 100;
    const delay = Math.random() * 20;
    const duration = Math.random() * 20 + 15;
    const opacity = Math.random() * 0.5 + 0.2;

    particle.style.cssText = `
        left: ${left}%;
        width: ${size}px;
        height: ${size}px;
        animation-delay: -${delay}s;
        animation-duration: ${duration}s;
        opacity: ${opacity};
    `;

    container.appendChild(particle);
}

/* ==========================================
   Mouse Glow Effect
   ========================================== */
function initMouseGlow() {
    const glow = document.createElement('div');
    glow.className = 'mouse-glow';
    glow.style.cssText = `
        position: fixed;
        width: 400px;
        height: 400px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 60%);
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
        opacity: 0;
    `;
    document.body.appendChild(glow);

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        glow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
    });

    // Smooth follow animation
    function animateGlow() {
        const dx = mouseX - currentX;
        const dy = mouseY - currentY;

        currentX += dx * 0.1;
        currentY += dy * 0.1;

        glow.style.left = currentX + 'px';
        glow.style.top = currentY + 'px';

        requestAnimationFrame(animateGlow);
    }

    animateGlow();
}

/* ==========================================
   Scroll Animations (Intersection Observer)
   ========================================== */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on element position
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);

                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/* ==========================================
   Navbar Scroll Effect
   ========================================== */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove background on scroll
        if (currentScroll > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.8)';
            navbar.style.boxShadow = 'none';
        }

        // Hide/show navbar on scroll direction
        if (currentScroll > lastScroll && currentScroll > 400) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });
}

/* ==========================================
   Mobile Menu Toggle
   ========================================== */
function initMobileMenu() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navCta = document.querySelector('.nav-cta');

    if (!mobileBtn) return;

    mobileBtn.addEventListener('click', () => {
        mobileBtn.classList.toggle('active');

        // Create mobile menu if it doesn't exist
        let mobileMenu = document.querySelector('.mobile-menu');

        if (!mobileMenu) {
            mobileMenu = document.createElement('div');
            mobileMenu.className = 'mobile-menu';
            mobileMenu.innerHTML = `
                <div class="mobile-menu-content">
                    <a href="#features">Features</a>
                    <a href="#how-it-works">How It Works</a>
                    <a href="#pricing">Pricing</a>
                    <div class="mobile-menu-cta">
                        <a href="#" class="btn btn-ghost btn-full">Sign In</a>
                        <a href="#" class="btn btn-primary btn-full">Get Started</a>
                    </div>
                </div>
            `;

            // Add styles for mobile menu
            const style = document.createElement('style');
            style.textContent = `
                .mobile-menu {
                    position: fixed;
                    top: 70px;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.98);
                    backdrop-filter: blur(20px);
                    z-index: 999;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                }
                
                .mobile-menu.active {
                    opacity: 1;
                    visibility: visible;
                }
                
                .mobile-menu-content {
                    display: flex;
                    flex-direction: column;
                    padding: 2rem;
                    gap: 1rem;
                }
                
                .mobile-menu-content a {
                    font-size: 1.25rem;
                    padding: 1rem;
                    color: #e5e5e5;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                    transition: all 0.3s ease;
                }
                
                .mobile-menu-content a:hover {
                    color: white;
                    padding-left: 1.5rem;
                }
                
                .mobile-menu-cta {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    margin-top: 1rem;
                }
                
                .mobile-menu-btn.active span:nth-child(1) {
                    transform: rotate(45deg) translate(5px, 5px);
                }
                
                .mobile-menu-btn.active span:nth-child(2) {
                    opacity: 0;
                }
                
                .mobile-menu-btn.active span:nth-child(3) {
                    transform: rotate(-45deg) translate(7px, -6px);
                }
            `;
            document.head.appendChild(style);
            document.body.appendChild(mobileMenu);

            // Close menu when clicking links
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                    mobileBtn.classList.remove('active');
                });
            });
        }

        mobileMenu.classList.toggle('active');
    });
}

/* ==========================================
   Counter Animation
   ========================================== */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element, target) {
    const duration = 2000; // 2 seconds
    const start = 0;
    const startTime = performance.now();

    function easeOutQuart(x) {
        return 1 - Math.pow(1 - x, 4);
    }

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        const current = Math.floor(start + (target - start) * easedProgress);

        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }

    requestAnimationFrame(update);
}

/* ==========================================
   Smooth Scroll
   ========================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ==========================================
   Parallax Effects
   ========================================== */
function initParallaxEffects() {
    const shapes = document.querySelectorAll('.shape');
    const heroGlow = document.querySelector('.hero-glow');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.03;
            const yPos = scrolled * speed;
            const rotation = scrolled * 0.02 * (index + 1);
            shape.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
        });

        if (heroGlow) {
            heroGlow.style.transform = `translateX(-50%) translateY(${scrolled * 0.3}px)`;
        }
    });

    // Mouse parallax for hero section
    const hero = document.querySelector('.hero');
    const heroVisual = document.querySelector('.dashboard-preview');

    if (hero && heroVisual) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            heroVisual.style.transform = `
                perspective(1000px)
                rotateY(${x * 5}deg)
                rotateX(${-y * 5}deg)
                translateZ(20px)
            `;
        });

        hero.addEventListener('mouseleave', () => {
            heroVisual.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateZ(0)';
        });
    }
}

/* ==========================================
   Magnetic Button Effect
   ========================================== */
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        this.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    button.addEventListener('mouseleave', function () {
        this.style.transform = 'translate(0, 0)';
    });
});

/* ==========================================
   Card Tilt Effect
   ========================================== */
document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card, .problem-card').forEach(card => {
    card.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        this.style.transform = `
            perspective(1000px)
            rotateY(${x * 5}deg)
            rotateX(${-y * 5}deg)
            translateY(-5px)
        `;
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateY(0)';
    });
});

/* ==========================================
   Loading Animation
   ========================================== */
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Trigger hero animations
    document.querySelectorAll('.animate-fade-in, .animate-fade-in-up').forEach((el, i) => {
        el.style.animationDelay = `${i * 0.1}s`;
        el.style.animationPlayState = 'running';
    });
});

/* ==========================================
   Ripple Effect on Buttons
   ========================================== */
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
            position: absolute;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: translate(-50%, -50%);
            left: ${x}px;
            top: ${y}px;
            animation: ripple 0.6s ease-out forwards;
            pointer-events: none;
        `;

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation to document
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

/* ==========================================
   Interactive Demo Dashboard Tabs
   ========================================== */
function switchDemoTab(tabName) {
    // Update sidebar active state
    document.querySelectorAll('.preview-sidebar .sidebar-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-tab') === tabName) {
            item.classList.add('active');
        }
    });

    // Update content visibility
    document.querySelectorAll('.demo-tab-content').forEach(content => {
        content.classList.remove('active');
    });

    const targetContent = document.getElementById('demo-' + tabName);
    if (targetContent) {
        targetContent.classList.add('active');
    }
}

// Add styles for demo tabs
const demoTabStyles = document.createElement('style');
demoTabStyles.textContent = `
    .demo-tab-content {
        display: none;
    }
    
    .demo-tab-content.active {
        display: block;
        animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .preview-sidebar .sidebar-item {
        cursor: pointer;
    }
    
    .preview-sidebar .sidebar-item:hover {
        background: rgba(255, 255, 255, 0.08);
    }
`;
document.head.appendChild(demoTabStyles);
