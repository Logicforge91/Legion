document.addEventListener('DOMContentLoaded', init);

const SECTIONS = [
    'hero',
    'about',
    'journey',
    'skills',
    'projects',
    'achievements',
    'testimonials',
    'contact'
];

const el = {
    navToggle: null,
    navLinks: null,
    header: null,
    scrollTopBtn: null,
    year: null,
    typingText: null
};

const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

async function init() {
    try {
        await Promise.all([
            loadHTML('header.html', 'headerContainer'),
            loadHTML('footer.html', 'footerContainer'),
            loadSections()
        ]);

        cacheElements();
        initNavigation();
        initHeaderState();
        initHero();
        initScrollSpy();
        initRevealAnimation();
        initSpotlightCards();
        initScrollTop();
        setYear();
    } catch (error) {
        console.error('Portfolio init error:', error);
    } finally {
        hideLoader();
    }
}

function cacheElements() {
    el.navToggle = document.getElementById('navToggle');
    el.navLinks = document.getElementById('navLinks');
    el.header = document.querySelector('.site-header');
    el.scrollTopBtn = document.getElementById('scrollTopBtn');
    el.year = document.getElementById('year');
    el.typingText = document.getElementById('typingText');
}

async function loadHTML(file, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const response = await fetch(file);
    if (!response.ok) {
        throw new Error(`${file} not found`);
    }

    container.innerHTML = await response.text();
}

async function loadSections() {
    const content = document.getElementById('content');
    if (!content) return;

    const sections = await Promise.all(SECTIONS.map(loadSection));
    const fragment = document.createDocumentFragment();

    sections.forEach(section => {
        if (section) fragment.appendChild(section);
    });

    content.appendChild(fragment);
}

async function loadSection(name) {
    try {
        const response = await fetch(`sections/${name}.html`);
        if (!response.ok) {
            throw new Error(`${name} section missing`);
        }

        const temp = document.createElement('div');
        temp.innerHTML = await response.text();
        const section = temp.querySelector('section');

        if (section) {
            section.id = name;
            return section;
        }
    } catch (error) {
        console.error(error);
    }

    return null;
}

function initNavigation() {
    if (!el.navToggle || !el.navLinks) return;

    const closeMenu = () => {
        el.navLinks.classList.remove('show');
        el.navToggle.setAttribute('aria-expanded', 'false');
    };

    el.navToggle.addEventListener('click', () => {
        const opened = el.navLinks.classList.toggle('show');
        el.navToggle.setAttribute('aria-expanded', String(opened));
    });

    el.navLinks.addEventListener('click', event => {
        if (event.target.closest('a')) closeMenu();
    });

    document.addEventListener('click', event => {
        const clickedToggle = event.target.closest('#navToggle');
        const clickedNav = event.target.closest('#navLinks');

        if (!clickedToggle && !clickedNav && el.navLinks.classList.contains('show')) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && el.navLinks.classList.contains('show')) {
            closeMenu();
            el.navToggle.focus();
        }
    });
}

function initHeaderState() {
    if (!el.header) return;

    const update = () => {
        el.header.classList.toggle('is-scrolled', window.scrollY > 12);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
}

function initHero() {
    typeHeroText();
    animateCounters();
}

function typeHeroText() {
    const target = el.typingText;
    const text = 'Suman K S / Laravel / Spring Boot / APIs / queues / reliable deploys';
    if (!target) return;

    if (motionQuery.matches) {
        target.textContent = text;
        return;
    }

    target.textContent = '';
    let index = 0;

    const tick = () => {
        target.textContent = text.slice(0, index + 1);
        index += 1;

        if (index < text.length) {
            window.setTimeout(tick, 38);
        }
    };

    window.setTimeout(tick, 260);
}

function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;

    const runCounter = counter => {
        if (counter.dataset.animated === 'true') return;
        counter.dataset.animated = 'true';

        const target = Number(counter.dataset.count || 0);
        const decimals = Number(counter.dataset.decimals || 0);
        const prefix = counter.dataset.prefix || '';
        const suffix = counter.dataset.suffix || '';
        const duration = motionQuery.matches ? 0 : 1050;
        const startTime = performance.now();

        const render = value => {
            const formatted = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
            counter.textContent = `${prefix}${formatted}${suffix}`;
        };

        if (duration === 0 || target === 0) {
            render(target);
            return;
        }

        const frame = now => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            render(target * eased);

            if (progress < 1) {
                requestAnimationFrame(frame);
            } else {
                render(target);
            }
        };

        requestAnimationFrame(frame);
    };

    if (!('IntersectionObserver' in window)) {
        counters.forEach(runCounter);
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.35 });

    counters.forEach(counter => observer.observe(counter));
}

function initScrollSpy() {
    const links = document.querySelectorAll('#navLinks a[href^="#"]');
    if (!links.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            links.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
            });
        });
    }, {
        rootMargin: '-38% 0px -54% 0px',
        threshold: 0
    });

    SECTIONS.forEach(id => {
        const section = document.getElementById(id);
        if (section) observer.observe(section);
    });
}

function initRevealAnimation() {
    const revealItems = document.querySelectorAll('[data-reveal]');
    if (!revealItems.length) return;

    if (motionQuery.matches || !('IntersectionObserver' in window)) {
        revealItems.forEach(item => item.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.12
    });

    revealItems.forEach(item => observer.observe(item));
}

function initSpotlightCards() {
    const cards = document.querySelectorAll('.spotlight-card');
    if (!cards.length || motionQuery.matches) return;

    cards.forEach(card => {
        card.addEventListener('pointermove', event => {
            const rect = card.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 100;
            const y = ((event.clientY - rect.top) / rect.height) * 100;

            card.style.setProperty('--mx', `${x}%`);
            card.style.setProperty('--my', `${y}%`);
        });
    });
}

function initScrollTop() {
    const btn = el.scrollTopBtn;
    if (!btn) return;

    const updateVisibility = () => {
        const visible = window.scrollY > 420;
        btn.classList.toggle('show', visible);
        btn.setAttribute('aria-hidden', visible ? 'false' : 'true');
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: motionQuery.matches ? 'auto' : 'smooth' }));
}

function setYear() {
    if (el.year) {
        el.year.textContent = String(new Date().getFullYear());
    }
}

function hideLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;

    window.setTimeout(() => loader.classList.add('fade-out'), 280);
}
