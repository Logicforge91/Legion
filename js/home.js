document.addEventListener('DOMContentLoaded', init);

const SECTIONS = ['hero', 'about', 'journey', 'skills', 'projects', 'contact'];
const el = {
    navToggle: null,
    navLinks: null,
    scrollTopBtn: null,
    year: null,
    typingText: null
};
/* ==========================
   Init
========================== */
async function init() {
    try {
        await Promise.all([
            loadHTML('header.html', 'headerContainer'),
            loadHTML('footer.html', 'footerContainer'),
            loadSections()
        ]);

        cacheElements();
        initNavigation();
        initHero();
        initScrollSpy();
        initRevealAnimation();
        setYear();
        initScrollTop();
    } catch (error) {
        console.error('Init Error:', error);
    } finally {
        hideLoader();
    }
}
function cacheElements() {
    el.navToggle = document.getElementById('navToggle');
    el.navLinks = document.getElementById('navLinks');
    el.scrollTopBtn = document.getElementById('scrollTopBtn');
    el.year = document.getElementById('year');
    el.typingText = document.getElementById('typingText');
}
/* ==========================
   Load HTML
========================== */
async function loadHTML(file, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const response = await fetch(file);
    if (!response.ok) {
        throw new Error(`${file} not found`);
    }

    container.innerHTML = await response.text();
}

/* ==========================
   Load Sections
========================== */
async function loadSections() {
    const content = document.getElementById('content');
    if (!content) return;

    const sections = await Promise.all(SECTIONS.map(loadSection));
    const fragment = document.createDocumentFragment();

    sections.forEach(section => section && fragment.appendChild(section));
    content.appendChild(fragment);
}

async function loadSection(name) {
    try {
        const response = await fetch(`sections/${name}.html`);
        if (!response.ok) {
            throw new Error(`${name} missing`);
        }

        const temp = document.createElement('div');
        temp.innerHTML = await response.text();
        const section = temp.querySelector('section');

        if (section) {
            section.id = name;
            section.classList.add('fade-section');
            return section;
        }
    } catch (error) {
        console.error(error);
    }

    return null;
}

/* ==========================
   Navigation
========================== */
function initNavigation() {
    if (!el.navToggle || !el.navLinks) return;

    el.navToggle.addEventListener('click', () => {
        const opened = el.navLinks.classList.toggle('show');
        el.navToggle.setAttribute('aria-expanded', opened ? 'true' : 'false');
    });

    el.navLinks.addEventListener('click', event => {
        if (event.target.matches('a')) {
            el.navLinks.classList.remove('show');
            el.navToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Close nav when clicking outside
    document.addEventListener('click', (e) => {
        if (!el.navLinks.contains(e.target) && e.target !== el.navToggle) {
            if (el.navLinks.classList.contains('show')) {
                el.navLinks.classList.remove('show');
                el.navToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });

    // Allow closing with Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && el.navLinks.classList.contains('show')) {
            el.navLinks.classList.remove('show');
            el.navToggle.setAttribute('aria-expanded', 'false');
            el.navToggle.focus();
        }
    });
}

/* ==========================
   Hero
========================== */
function initHero() {
    typeHeroText();
    animateCounters();
}

/* Typing */
function typeHeroText() {
    const target = el.typingText;
    const text = 'Suman K S | Backend Engineer';
    if (!target) return;

    target.textContent = '';
    let index = 0;

    const tick = () => {
        target.textContent = text.slice(0, ++index);
        if (index < text.length) {
            setTimeout(tick, 80);
        }
    };

    tick();
}

/* Counter */
function animateCounters() {
    document.querySelectorAll('.counter').forEach(counter => {
        const targetValue = Number(counter.dataset.count) || 0;
        let currentValue = 0;
        const step = Math.max(1, Math.ceil(targetValue / 40));

        const update = () => {
            currentValue += step;
            counter.textContent = `${Math.min(currentValue, targetValue)}+`;
            if (currentValue < targetValue) {
                requestAnimationFrame(update);
            }
        };

        if (targetValue > 0) {
            requestAnimationFrame(update);
        }
    });
}

/* ==========================
   Scroll Spy
========================== */
function initScrollSpy() {
    const links = document.querySelectorAll('#navLinks a[href^="#"]');
    if (!links.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            links.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
            });
        });
    }, {
        threshold: 0.4
    });

    SECTIONS.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            observer.observe(section);
        }
    });
}

/* ==========================
   Reveal Animation
========================== */
function initRevealAnimation() {
    const sections = document.querySelectorAll('.fade-section');
    if (!sections.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2
    });

    sections.forEach(section => observer.observe(section));
}

/* ==========================
   Footer Year
========================== */
function setYear() {
    if (el.year) {
        el.year.textContent = String(new Date().getFullYear());
    }
}

/* ==========================
   Loader
========================== */
function hideLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;

    setTimeout(() => loader.classList.add('fade-out'), 500);
}

/* ==========================
   Scroll Top
========================== */
function initScrollTop() {
    const btn = el.scrollTopBtn;
    if (!btn) return;

    const updateVisibility = () => {
        const visible = window.scrollY > 300;
        btn.classList.toggle('show', visible);
        btn.setAttribute('aria-hidden', visible ? 'false' : 'true');
    };

    window.addEventListener('scroll', updateVisibility, { passive: true });
    updateVisibility();

    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            btn.click();
        }
    });
}
    