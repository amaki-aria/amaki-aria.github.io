'use strict';

(() => {
    const hero = document.getElementById('heroPage');
    const content = document.getElementById('contentPage');
    const main = document.getElementById('guideMain');
    const sidebar = document.getElementById('guideSidebar');
    const menuButton = document.getElementById('menuButton');
    const shade = document.getElementById('drawerShade');
    const sections = [...document.querySelectorAll('.guide-section')];
    const navigation = [...document.querySelectorAll('[data-page-link]')];
    const pages = new Map(sections.map(section => [section.id, section]));
    const positions = new Map();
    const mobile = window.matchMedia('(max-width: 800px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    // Old content-page anchors remain valid bookmarks.
    const aliases = { contact: 'admission', home: 'home' };
    let currentPage = null;
    let drawerOpen = false;
    let restoreFrame = 0;

    function closeDrawer(returnFocus = false) {
        drawerOpen = false;
        sidebar.classList.remove('is-open');
        sidebar.removeAttribute('role');
        sidebar.removeAttribute('aria-modal');
        sidebar.inert = mobile.matches;
        shade.hidden = true;
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', '打开栏目导航');
        document.body.classList.remove('drawer-open');
        document.querySelector('.guide-shell').inert = false;
        if (returnFocus) menuButton.focus();
    }

    function openDrawer() {
        if (!mobile.matches) return;
        drawerOpen = true;
        sidebar.inert = false;
        sidebar.classList.add('is-open');
        sidebar.setAttribute('role', 'dialog');
        sidebar.setAttribute('aria-modal', 'true');
        shade.hidden = false;
        menuButton.setAttribute('aria-expanded', 'true');
        menuButton.setAttribute('aria-label', '关闭栏目导航');
        document.body.classList.add('drawer-open');
        document.querySelector('.guide-shell').inert = true;
        (sidebar.querySelector('[aria-current="page"]') || sidebar.querySelector('a')).focus();
    }

    function routeFromHash() {
        let id;
        try { id = decodeURIComponent(window.location.hash.slice(1)); }
        catch { return 'about'; }
        if (!id || id === 'home') return 'home';
        if (id === 'guideMain') return currentPage || 'about';
        return aliases[id] || (pages.has(id) ? id : 'about');
    }

    function setPagination(id) {
        const index = sections.findIndex(section => section.id === id);
        for (const [elementId, offset] of [['previousPage', -1], ['nextPage', 1]]) {
            const anchor = document.getElementById(elementId);
            const adjacent = sections[index + offset];
            anchor.hidden = !adjacent;
            if (adjacent) {
                anchor.href = '#' + adjacent.id;
                anchor.querySelector('strong').textContent = adjacent.querySelector('h1').textContent;
            }
        }
    }

    function renderRoute({ focus = true } = {}) {
        cancelAnimationFrame(restoreFrame);
        if (currentPage) positions.set(currentPage, window.scrollY);
        const id = routeFromHash();
        closeDrawer();
        const showGuide = id !== 'home';
        hero.hidden = showGuide;
        content.hidden = !showGuide;
        document.body.classList.toggle('guide-open', showGuide);

        for (const section of sections) {
            section.hidden = section.id !== id;
            section.classList.toggle('is-active', section.id === id);
        }
        for (const anchor of navigation) {
            if (anchor.dataset.pageLink === id) {
                anchor.setAttribute('aria-current', 'page');
                anchor.scrollIntoView?.({ block: 'nearest', inline: 'nearest', behavior: 'instant' });
            }
            else anchor.removeAttribute('aria-current');
        }

        currentPage = showGuide ? id : null;
        if (showGuide) {
            const title = pages.get(id).querySelector('h1');
            document.getElementById('currentPageLabel').textContent = title.textContent;
            document.title = title.textContent + ' · 新乐园 ELYSION';
            setPagination(id);
            if (focus) title.focus({ preventScroll: true });
        } else {
            document.title = '新乐园 ELYSION · 魔女学园都市';
            if (focus) document.getElementById('enterParadise').focus({ preventScroll: true });
        }
        restoreFrame = requestAnimationFrame(() => {
            window.scrollTo({ top: showGuide ? (positions.get(id) || 0) : 0, behavior: 'instant' });
        });
    }

    function navigate(id) {
        if (id === currentPage) {
            closeDrawer();
            pages.get(id).querySelector('h1').focus({ preventScroll: true });
            return;
        }
        // pushState preserves the scroll position before rendering the new section.
        window.history.pushState(null, '', '#' + id);
        renderRoute();
    }

    document.getElementById('enterParadise').addEventListener('click', () => navigate('about'));
    content.addEventListener('click', event => {
        const anchor = event.target.closest('a[href^="#"]');
        if (!anchor || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const id = anchor.getAttribute('href').slice(1);
        if (id === 'guideMain') {
            event.preventDefault();
            main.focus({ preventScroll: true });
            return;
        }
        if (!pages.has(id) && id !== 'home') return;
        event.preventDefault();
        navigate(id);
    });

    menuButton.addEventListener('click', () => drawerOpen ? closeDrawer(true) : openDrawer());
    document.getElementById('drawerClose').addEventListener('click', () => closeDrawer(true));
    shade.addEventListener('click', () => closeDrawer(true));
    document.addEventListener('keydown', event => {
        if (!drawerOpen) return;
        if (event.key === 'Escape') {
            event.preventDefault();
            closeDrawer(true);
        } else if (event.key === 'Tab') {
            const links = [...sidebar.querySelectorAll('a[href], button')];
            const first = links[0];
            const last = links[links.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault(); last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault(); first.focus();
            }
        }
    });
    mobile.addEventListener('change', () => closeDrawer(true));
    window.addEventListener('popstate', () => renderRoute());
    window.addEventListener('hashchange', () => {
        if (routeFromHash() !== (currentPage || 'home')) renderRoute();
    });
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';

    const filterButtons = [...document.querySelectorAll('[data-region-filter]')];
    const places = [...document.querySelectorAll('[data-region]')];
    for (const button of filterButtons) {
        button.addEventListener('click', () => {
            const filter = button.dataset.regionFilter;
            for (const other of filterButtons) {
                const selected = other === button;
                other.classList.toggle('is-active', selected);
                other.setAttribute('aria-pressed', String(selected));
            }
            let count = 0;
            for (const place of places) {
                place.hidden = filter !== 'all' && place.dataset.region !== filter;
                if (!place.hidden) count++;
            }
            document.getElementById('regionStatus').textContent = '共 ' + count + ' 处区域与设施';
        });
    }

    function createParticles() {
        const container = document.getElementById('particleContainer');
        if (reducedMotion.matches || container.childElementCount) return;
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
            particle.style.animationDelay = Math.random() * 2 + 's';
            fragment.appendChild(particle);
        }
        container.appendChild(fragment);
    }

    createParticles();
    renderRoute({ focus: false });
})();
