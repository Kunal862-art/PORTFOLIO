/**
 * Kunal Bansal - Portfolio Main Script
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       Preloader
       ========================================================================== */
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500); // Fades out after 1.5 seconds

    /* ==========================================================================
       Theme Toggle (Dark/Light Mode)
       ========================================================================== */
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check local storage for theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Re-initialize particles to match theme if needed
        initParticles(newTheme);
    });

    /* ==========================================================================
       Custom Cursor
       ========================================================================== */
    const cursor = document.querySelector('.cursor-glow');
    
    // Only apply custom cursor on desktop devices (where pointer is fine)
    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Add hover effect to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, .glass-card, .chip');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
        });
    }

    /* ==========================================================================
       Navbar Scroll & Mobile Menu
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    // Sticky Navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Animate hamburger to X
        hamburger.classList.toggle('active'); // You can add CSS for this if desired
    });

    // Close mobile menu on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    /* ==========================================================================
       Typed.js Initialization
       ========================================================================== */
    if (document.querySelector('.typed-text')) {
        new Typed('.typed-text', {
            strings: ['B.Tech IT Student', 'Web Developer', 'AI &amp; ML Enthusiast', 'Problem Solver'],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            cursorChar: '|'
        });
    }

    /* ==========================================================================
       Particles.js Initialization
       ========================================================================== */
    function initParticles(theme) {
        const particleColor = theme === 'dark' ? '#00A8FF' : '#0077B6';
        const linkColor = theme === 'dark' ? '#7C3AED' : '#6D28D9';
        
        if (document.getElementById('particles-js')) {
            particlesJS('particles-js', {
                "particles": {
                    "number": {
                        "value": 40,
                        "density": { "enable": true, "value_area": 800 }
                    },
                    "color": { "value": particleColor },
                    "shape": {
                        "type": "circle",
                    },
                    "opacity": {
                        "value": 0.5,
                        "random": true,
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": linkColor,
                        "opacity": 0.2,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 2,
                        "direction": "none",
                        "random": true,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": { "enable": true, "mode": "grab" },
                        "onclick": { "enable": true, "mode": "push" },
                        "resize": true
                    },
                    "modes": {
                        "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } },
                        "push": { "particles_nb": 4 }
                    }
                },
                "retina_detect": true
            });
        }
    }
    
    initParticles(savedTheme);

    /* ==========================================================================
       AOS Initialization
       ========================================================================== */
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    /* ==========================================================================
       Skills Progress Animation on Scroll
       ========================================================================== */
    const progressBars = document.querySelectorAll('.progress');
    
    // Create an intersection observer
    const progressObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.style.width;
                // Animate from 0 to target width
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    bar.style.width = targetWidth;
                }, 100);
                observer.unobserve(bar); // Only animate once
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });

    /* ==========================================================================
       Confetti Animation for Achievements
       ========================================================================== */
    const confettiTrigger = document.getElementById('confetti-trigger');
    let confettiFired = false;
    
    if (confettiTrigger) {
        const confettiObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !confettiFired) {
                    confettiFired = true;
                    // Fire confetti
                    var duration = 3000;
                    var end = Date.now() + duration;

                    (function frame() {
                        confetti({
                            particleCount: 5,
                            angle: 60,
                            spread: 55,
                            origin: { x: 0 },
                            colors: ['#00A8FF', '#7C3AED', '#FFD700']
                        });
                        confetti({
                            particleCount: 5,
                            angle: 120,
                            spread: 55,
                            origin: { x: 1 },
                            colors: ['#00A8FF', '#7C3AED', '#FFD700']
                        });

                        if (Date.now() < end) {
                            requestAnimationFrame(frame);
                        }
                    }());
                }
            });
        }, { threshold: 0.5 });
        
        confettiObserver.observe(confettiTrigger);
    }

    /* ==========================================================================
       Ripple Effect on Buttons
       ========================================================================== */
    const buttons = document.querySelectorAll('.ripple');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            let x = e.clientX - e.target.getBoundingClientRect().left;
            let y = e.clientY - e.target.getBoundingClientRect().top;
            
            let ripples = document.createElement('span');
            ripples.className = 'ripple-element';
            ripples.style.left = x + 'px';
            ripples.style.top = y + 'px';
            this.appendChild(ripples);
            
            setTimeout(() => {
                ripples.remove();
            }, 600);
        });
    });

    /* ==========================================================================
       Konami Code Easter Egg
       ========================================================================== */
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    const easterEggModal = document.getElementById('easter-egg');
    const closeEasterEggBtn = document.getElementById('close-easter-egg');

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Konami code complete!
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0; // Reset if wrong key
        }
    });

    function activateEasterEgg() {
        easterEggModal.classList.remove('hidden');
        confetti({
            particleCount: 150,
            spread: 180,
            origin: { y: 0.6 }
        });
    }

    if (closeEasterEggBtn) {
        closeEasterEggBtn.addEventListener('click', () => {
            easterEggModal.classList.add('hidden');
        });
    }
});
