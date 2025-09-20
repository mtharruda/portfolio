// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
});
});

// Active navigation
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
    const scrollPos = window.scrollY + 100;
    
    sections.forEach((section, index) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
                
        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            document.querySelector(`a[href="#${id}"]`).classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.classList.add('visible');
    }
});
}, observerOptions);

document.querySelectorAll('.animate-in').forEach(el => {
    observer.observe(el);
});

// Enhanced mouse parallax effect
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    const vizCircles = document.querySelectorAll('.viz-circle');
    vizCircles.forEach((circle, index) => {
        const speed = (index + 1) * 0.5;
        circle.style.transform = `translate(-50%, -50%) translate(${mouseX * speed}px, ${mouseY * speed}px) rotate(${index * 60}deg)`;
    });
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
    }
}
type();
}

// Initialize typing effect on load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        typeWriter(heroTitle, 'Matheus Arruda', 120);
    }
});

// Smooth reveal animations with stagger
const staggerElements = document.querySelectorAll('.project-card');
staggerElements.forEach((el, index) => {
    el.style.transitionDelay = `${index * 0.1}s`;
});

// Performance optimization for scroll events
let ticking = false;
function requestTick() {
    if (!ticking) {
    requestAnimationFrame(updateActiveNav);
    ticking = true;
}
}

window.addEventListener('scroll', () => {
    requestTick();
    ticking = false;
});