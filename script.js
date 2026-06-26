// MOBILE MENU TOGGLE
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// SCROLL REVEAL ANIMATIONS
const sr = ScrollReveal({
    origin: 'bottom',
    distance: '50px',
    duration: 1500,
    delay: 150,
    reset: false
});

// Reveal components
sr.reveal('.badge');
sr.reveal('.hero-title', { delay: 300 });
sr.reveal('.hero-subtitle', { delay: 450 });
sr.reveal('.hero-actions', { delay: 600 });
sr.reveal('.hero-graphic', { delay: 750, origin: 'right' });
sr.reveal('.why-me .section-head');
sr.reveal('.value-card', { interval: 150 });
sr.reveal('.projects .section-head');
sr.reveal('.project-filters', { delay: 250 });
sr.reveal('.project-featured', { interval: 200 });
sr.reveal('.mastery .section-head');
sr.reveal('.mastery-card', { interval: 200 });
sr.reveal('.faq-section .section-head');
sr.reveal('.faq-item', { interval: 100 });
sr.reveal('.cta-box');

// NAVBAR SCROLL EFFECT
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.padding = '12px 0';
        nav.style.background = 'rgba(8, 10, 16, 0.96)';
        nav.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    } else {
        nav.style.padding = '20px 0';
        nav.style.background = 'transparent';
        nav.style.boxShadow = 'none';
    }
});

// PROGRESS BAR ANIMATION (Intersection Observer)
const progressBars = document.querySelectorAll('.progress');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const targetWidth = bar.getAttribute('data-width');
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.transition = 'width 1.8s cubic-bezier(0.16, 1, 0.3, 1)';
                bar.style.width = targetWidth;
            }, 150);
            observer.unobserve(bar);
        }
    });
}, { threshold: 0.2 });

progressBars.forEach(bar => observer.observe(bar));

// PORTFOLIO FILTERING LOGIC
const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filterValue === 'all' || category === filterValue) {
                item.classList.remove('hidden');
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    item.classList.add('hidden');
                }, 400);
            }
        });
    });
});

// FAQ ACCORDION LOGIC
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
        const item = q.parentElement;
        const isActive = item.classList.contains('active');

        document.querySelectorAll('.faq-item').forEach(i => {
            i.classList.remove('active');
        });

        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// MODAL CONTROLS (CASE STUDIES)
const caseButtons = document.querySelectorAll('.view-case-btn');
const modalCloseButtons = document.querySelectorAll('.modal-close');
const modals = document.querySelectorAll('.modal-overlay');

caseButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

modalCloseButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal-overlay');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modals.forEach(modal => {
            if (modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
});

// CONTACT FORM SUBMISSION HANDLER
const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');

if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;

        formFeedback.textContent = "Mengirim pesan...";
        formFeedback.className = "form-feedback";

        setTimeout(() => {
            formFeedback.textContent = `Terima kasih ${name}, pesan Anda telah berhasil dikirim! Saya akan segera menghubungi Anda.`;
            formFeedback.className = "form-feedback success";
            contactForm.reset();
        }, 1200);
    });
}

// 3D CARD TILT EFFECT (Mousemove tracker)
const tiltCards = document.querySelectorAll('.value-card, .project-featured, .mastery-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Tilt degrees multiplier
        const rotateX = ((centerY - y) / centerY) * 5; 
        const rotateY = ((x - centerX) / centerX) * 5;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
});

// CLICK PARTICLES BURST EFFECT
document.addEventListener('click', (e) => {
    // Avoid triggering particles on inputs and textareas
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.closest('form')) {
        return;
    }

    const particleContainer = document.createElement('div');
    particleContainer.className = 'click-particles';
    particleContainer.style.left = `${e.clientX}px`;
    particleContainer.style.top = `${e.clientY}px`;
    document.body.appendChild(particleContainer);

    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('span');
        const angle = Math.random() * Math.PI * 2;
        // Explode radius
        const speed = 15 + Math.random() * 30;
        const velocityX = Math.cos(angle) * speed;
        const velocityY = Math.sin(angle) * speed;
        
        particle.style.setProperty('--vx', `${velocityX}px`);
        particle.style.setProperty('--vy', `${velocityY}px`);
        
        // Palette matching colors: amber or indigo
        const color = Math.random() > 0.5 ? 'var(--primary)' : 'var(--secondary)';
        particle.style.background = color;
        
        particleContainer.appendChild(particle);
    }

    // Clean up particles
    setTimeout(() => {
        particleContainer.remove();
    }, 800);
});
