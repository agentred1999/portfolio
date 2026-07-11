// Matrix Rain Animation
// Uses configuration from MATRIX_CONFIG (see js/rain-config.js)

const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

// Function to set canvas to full page dimensions (not just viewport)
function initCanvasSize() {
    canvas.width = window.innerWidth;
    // Use scrollHeight to capture the FULL page height, not just viewport
    canvas.height = Math.max(window.innerHeight, document.documentElement.scrollHeight);
}

// Initialize canvas size on first load
initCanvasSize();

// Read character set from config
const characters = MATRIX_CONFIG.characters;
const fontSize = MATRIX_CONFIG.fontSize;
const columns = canvas.width / fontSize;

// Initialize drops array based on density config
const drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = Math.random();
}

function drawMatrix() {
    const isLightMode = document.documentElement.classList.contains('light-mode');
    
    // Read fade trail opacity from config
    const bgAlpha = isLightMode ? 
        `rgba(255, 255, 255, ${MATRIX_CONFIG.trailOpacity})` : 
        `rgba(10, 14, 39, ${MATRIX_CONFIG.trailOpacity * 2})`;
    
    ctx.fillStyle = bgAlpha;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Use black text in light mode, cyan in dark mode
    const rainColor = isLightMode ? '#000000' : MATRIX_CONFIG.color;
    ctx.fillStyle = rainColor;
    ctx.globalAlpha = 0.8;
    ctx.font = 'bold ' + fontSize + 'px "Courier New"';

    for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Read speed and density from config
        // Speed multiplier: higher config value = faster fall
        // Density: higher value = more frequent resets
        if (drops[i] * fontSize > canvas.height && Math.random() > (1 - 1 / MATRIX_CONFIG.density)) {
            drops[i] = 0;
        }

        // Apply speed multiplier to drop increment
        drops[i] += MATRIX_CONFIG.speed;
    }
    
    ctx.globalAlpha = 1;
}

let animationId;
function animate() {
    drawMatrix();
    animationId = requestAnimationFrame(animate);
}

animate();

// Function to properly size canvas for full page coverage
function resizeCanvas() {
    canvas.width = window.innerWidth;
    // Capture FULL page height, not just viewport
    canvas.height = Math.max(window.innerHeight, document.documentElement.scrollHeight);
}

// Resize on window resize events
window.addEventListener('resize', resizeCanvas);

// Resize after all resources load (images, fonts, content settles)
window.addEventListener('load', () => {
    // Give a small delay to ensure layout is fully complete
    setTimeout(resizeCanvas, 100);
});

// Also re-check after a longer delay to catch lazy-loaded content
setTimeout(resizeCanvas, 1000);

// Pause animation when light mode is active
const pauseMatrixAnimation = () => {
    const isLightMode = document.documentElement.classList.contains('light-mode');
    if (isLightMode) {
        cancelAnimationFrame(animationId);
    } else {
        animate();
    }
};

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const toggleIcon = document.querySelector('.toggle-icon');

// Load saved theme preference
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    html.classList.add('light-mode');
    toggleIcon.textContent = '☀️';
    cancelAnimationFrame(animationId);
}

themeToggle.addEventListener('click', () => {
    const flash = document.getElementById('themeFlash');
    flash.classList.remove('active');
    void flash.offsetWidth;
    flash.classList.add('active');

    html.classList.toggle('light-mode');
    const isLightMode = html.classList.contains('light-mode');
    
    // Update toggle icon
    toggleIcon.textContent = isLightMode ? '☀️' : '🌙';
    
    // Pause/resume Matrix animation based on theme
    if (isLightMode) {
        cancelAnimationFrame(animationId);
    } else {
        animate();
    }
    
    // Save preference
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        }
    });
}

// Close mobile menu on link click
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update active nav link on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
});

// Navbar glass intensifies on scroll
const headerEl = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        headerEl.classList.add('scrolled');
    } else {
        headerEl.classList.remove('scrolled');
    }
});

// Reveal About and Footer content on scroll
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    revealObserver.observe(el);
});

// Cursor-follow glow effect
const cursorGlow = document.getElementById('cursorGlow');
let glowX = 0, glowY = 0, targetX = 0, targetY = 0;

document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
});

function animateGlow() {
    // Smooth trailing/lag effect
    glowX += (targetX - glowX) * 0.1;
    glowY += (targetY - glowY) * 0.1;
    cursorGlow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateGlow);
}

animateGlow();

// Easter egg: Konami code
const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiProgress = 0;

document.addEventListener('keydown', function(e) {
    var key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (key === konamiCode[konamiProgress]) {
        konamiProgress++;
        if (konamiProgress === konamiCode.length) {
            triggerEasterEgg();
            konamiProgress = 0;
        }
    } else {
        konamiProgress = 0;
    }
});

function triggerEasterEgg() {
    var overlay = document.getElementById('easterEgg');
    overlay.classList.remove('active');
    void overlay.offsetWidth;
    overlay.classList.add('active');
    window.setTimeout(function() {
        overlay.classList.remove('active');
    }, 4000);
}
