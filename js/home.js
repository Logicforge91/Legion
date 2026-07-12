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
const CRITICAL_SECTIONS = ['hero'];
const DEFERRED_SECTIONS = SECTIONS.filter(section => !CRITICAL_SECTIONS.includes(section));

const el = {
    navToggle: null,
    navLinks: null,
    header: null,
    scrollTopBtn: null,
    year: null,
    typingText: null
};

const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const hasIntersectionObserver = 'IntersectionObserver' in window;
const closestElement = (target, selector) => target instanceof Element ? target.closest(selector) : null;
const prefersReducedMotion = () => motionQuery.matches;
const runWhenIdle = callback => {
    if ('requestIdleCallback' in window) {
        const handle = window.requestIdleCallback(callback, { timeout: 900 });
        return () => window.cancelIdleCallback(handle);
    }

    const handle = window.setTimeout(callback, 80);
    return () => window.clearTimeout(handle);
};

let deferredSectionsPromise = null;
let cancelDeferredSchedule = null;
let spotlightCardsInitialized = false;
let projectFiltersInitialized = false;

async function init() {
    try {
        await Promise.all([
            loadHTML('header.html', 'headerContainer'),
            loadSections(CRITICAL_SECTIONS)
        ]);

        cacheElements();
        initNavigation();
        initDeferredAnchorLoading();
        initScrollEffects();
        initHero();
        initRevealAnimation();
        initSpotlightCards();

        hideLoader();
        scheduleDeferredSections();
    } catch (error) {
        console.error('Portfolio init error:', error);
        hideLoader();
        scheduleDeferredSections();
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

async function loadSections(sectionNames = SECTIONS) {
    const content = document.getElementById('content');
    if (!content) return;

    const sections = await Promise.all(sectionNames.map(loadSection));
    const fragment = document.createDocumentFragment();

    sections.forEach(section => {
        if (!section || document.getElementById(section.id)) return;

        fragment.appendChild(section);
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

function scheduleDeferredSections() {
    if (deferredSectionsPromise) return deferredSectionsPromise;
    if (cancelDeferredSchedule) return null;

    cancelDeferredSchedule = runWhenIdle(() => {
        cancelDeferredSchedule = null;
        loadDeferredSections();
    });

    return deferredSectionsPromise;
}

function loadDeferredSections() {
    if (deferredSectionsPromise) return deferredSectionsPromise;

    if (cancelDeferredSchedule) {
        cancelDeferredSchedule();
        cancelDeferredSchedule = null;
    }

    deferredSectionsPromise = (async () => {
        await Promise.all([
            loadHTML('footer.html', 'footerContainer'),
            loadSections(DEFERRED_SECTIONS)
        ]);
        cacheElements();
        setYear();
        animateCounters();
        initScrollSpy();
        initRevealAnimation();
        initProjectFilters();
        scrollToDeferredHash();
    })();

    return deferredSectionsPromise;
}

async function ensureDeferredSectionsLoaded() {
    return deferredSectionsPromise || loadDeferredSections();
}

function scrollToSection(id, updateHash = false) {
    if (updateHash && window.location.hash !== `#${id}`) {
        history.pushState(null, '', `#${id}`);
    }

    document.getElementById(id)?.scrollIntoView({
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        block: 'start'
    });
}

function scrollToDeferredHash() {
    const targetId = window.location.hash.slice(1);
    if (DEFERRED_SECTIONS.includes(targetId)) {
        scrollToSection(targetId);
    }
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

    el.navLinks.addEventListener('click', async event => {
        const link = closestElement(event.target, 'a[href^="#"]');
        if (!link) return;

        const targetId = link.hash.slice(1);
        if (targetId && !document.getElementById(targetId)) {
            event.preventDefault();
            await ensureDeferredSectionsLoaded();
            scrollToSection(targetId, true);
        }

        closeMenu();
    });

    document.addEventListener('click', event => {
        const clickedToggle = closestElement(event.target, '#navToggle');
        const clickedNav = closestElement(event.target, '#navLinks');

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

function initDeferredAnchorLoading() {
    document.addEventListener('click', async event => {
        if (event.defaultPrevented) return;

        const link = closestElement(event.target, 'a[href^="#"]');
        if (!link) return;

        const targetId = link.hash.slice(1);
        if (!targetId || document.getElementById(targetId)) return;

        event.preventDefault();
        await ensureDeferredSectionsLoaded();
        scrollToSection(targetId, true);
    });
}

function initHero() {
    typeHeroText();
    animateCounters();
}

function typeHeroText() {
    const target = el.typingText;
    const text = 'Backend Developer / PHP Laravel Developer / Java Backend Developer';
    if (!target) return;

    if (prefersReducedMotion()) {
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
        const duration = prefersReducedMotion() ? 0 : 1050;
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

    if (!hasIntersectionObserver) {
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
    if (!links.length || !hasIntersectionObserver) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            links.forEach(link => {
                const isActive = link.getAttribute('href') === `#${entry.target.id}`;
                link.classList.toggle('active', isActive);

                if (isActive) {
                    link.setAttribute('aria-current', 'page');
                } else {
                    link.removeAttribute('aria-current');
                }
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
    const revealItems = document.querySelectorAll('[data-reveal]:not([data-reveal-ready="true"])');
    if (!revealItems.length) return;

    if (prefersReducedMotion() || !hasIntersectionObserver) {
        revealItems.forEach(item => {
            item.dataset.revealReady = 'true';
            item.classList.add('is-visible');
        });
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

    revealItems.forEach(item => {
        item.dataset.revealReady = 'true';
        observer.observe(item);
    });
}

function initSpotlightCards() {
    if (spotlightCardsInitialized || !document.querySelector('.spotlight-card') || prefersReducedMotion()) return;
    spotlightCardsInitialized = true;

    let frame = 0;
    let latestEvent = null;

    document.addEventListener('pointermove', event => {
        const card = closestElement(event.target, '.spotlight-card');
        if (!card) return;

        latestEvent = { card, clientX: event.clientX, clientY: event.clientY };
        if (frame) return;

        frame = requestAnimationFrame(() => {
            const { card: activeCard, clientX, clientY } = latestEvent;
            const rect = activeCard.getBoundingClientRect();
            const x = ((clientX - rect.left) / rect.width) * 100;
            const y = ((clientY - rect.top) / rect.height) * 100;

            activeCard.style.setProperty('--mx', `${x}%`);
            activeCard.style.setProperty('--my', `${y}%`);
            frame = 0;
            latestEvent = null;
        });
    }, { passive: true });
}

function initProjectFilters() {
    if (projectFiltersInitialized) return;

    const filter = document.querySelector('.project-filter');
    const cards = document.querySelectorAll('.project-card[data-project-tags]');
    if (!filter || !cards.length) return;

    projectFiltersInitialized = true;
    const buttons = filter.querySelectorAll('button[data-filter]');
    const status = document.getElementById('projectFilterStatus');

    const updateStatus = (selected, visibleCount) => {
        if (!status) return;

        const label = selected === 'all' ? 'all featured' : selected;
        status.textContent = `Showing ${visibleCount} ${label} system${visibleCount === 1 ? '' : 's'}.`;
    };

    updateStatus('all', cards.length);

    filter.addEventListener('click', event => {
        const button = closestElement(event.target, 'button[data-filter]');
        if (!button) return;

        const selected = button.dataset.filter || 'all';
        let visibleCount = 0;

        buttons.forEach(item => {
            const isActive = item === button;
            item.classList.toggle('active', isActive);
            item.setAttribute('aria-pressed', String(isActive));
        });

        cards.forEach(card => {
            const tags = (card.dataset.projectTags || '').split(' ');
            const visible = selected === 'all' || tags.includes(selected);

            if (visible) visibleCount += 1;
            card.hidden = !visible;
        });

        updateStatus(selected, visibleCount);
    });
}

function initScrollEffects() {
    const header = el.header;
    const btn = el.scrollTopBtn;
    if (!header && !btn) return;

    let ticking = false;

    const update = () => {
        if (header) {
            header.classList.toggle('is-scrolled', window.scrollY > 12);
        }

        if (btn) {
            const visible = window.scrollY > 420;
            btn.classList.toggle('show', visible);
            btn.setAttribute('aria-hidden', visible ? 'false' : 'true');
        }

        ticking = false;
    };

    const requestUpdate = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });

    if (btn) {
        btn.addEventListener('click', () => window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion() ? 'auto' : 'smooth'
        }));
    }
}

function setYear() {
    if (el.year) {
        el.year.textContent = String(new Date().getFullYear());
    }
}

function hideLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;

    window.setTimeout(() => loader.classList.add('fade-out'), 80);
}
