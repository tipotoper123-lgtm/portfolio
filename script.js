(() => {
  'use strict';
  const translations = window.PORTFOLIO_CONTENT;
  const languageKey = 'nikita-portfolio-language';
  const nav = document.querySelector('#site-nav');
  const menu = document.querySelector('.menu-toggle');
  const mobile = window.matchMedia('(max-width: 760px)');
  let language = 'en';
  try {
    const saved = localStorage.getItem(languageKey);
    if (saved === 'en' || saved === 'ru') language = saved;
  } catch { /* Storage is optional; the page still works for this visit. */ }
  const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[char]));
  function setMenu(open, restoreFocus = false) {
    nav.classList.toggle('is-open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', translations[language][open ? 'closeMenu' : 'openMenu']);
    if (restoreFocus) menu.focus();
  }
  function renderProjects() {
    const t = translations[language];
    document.querySelector('#project-list').innerHTML = window.PORTFOLIO_PROJECTS.map(project => {
      const p = project[language];
      return `<article class="project" id="project-${escapeHTML(project.id)}" aria-labelledby="title-${escapeHTML(project.id)}">
        <figure class="project-media">${project.report ? `<pre class="report-preview" lang="${language}">${escapeHTML(project.report[language])}</pre>` : `<a class="media-link" href="${escapeHTML(project.image)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHTML(t.screenshot + ': ' + p.title)}"><img src="${escapeHTML(project.image)}" alt="${escapeHTML(p.alt)}" width="${project.width}" height="${project.height}" loading="lazy" decoding="async"></a>`}<figcaption class="media-caption">${escapeHTML(p.caption)}</figcaption></figure>
        <div class="project-content"><p class="project-type">${escapeHTML(t[project.type])}</p><h3 id="title-${escapeHTML(project.id)}">${escapeHTML(p.title)}</h3><p class="project-summary">${escapeHTML(p.summary)}</p>
        <dl class="project-facts">${['task', 'built', 'result'].map(key => `<div><dt>${escapeHTML(t[key])}</dt><dd>${escapeHTML(p[key])}</dd></div>`).join('')}</dl>
        <ul class="tech-list" aria-label="${escapeHTML(t.technologies)}">${project.tech.map(tech => `<li>${escapeHTML(tech)}</li>`).join('')}</ul>
        <div class="project-links">${(project.links || []).map(link => `<a class="text-link" href="${escapeHTML(link.url)}"${link.download ? ' download' : ' target="_blank" rel="noopener noreferrer"'}>${escapeHTML(link[language])}<span aria-hidden="true"> ↗</span></a>`).join('')}</div></div></article>`;
    }).join('');
  }
  function renderContact() {
    const t = translations[language];
    const username = (window.PORTFOLIO_CONFIG?.telegramUsername || '').trim().replace(/^@/, '');
    const valid = /^[a-z][a-z0-9_]{4,31}$/i.test(username);
    document.querySelectorAll('[data-telegram-link]').forEach(link => {
      link.hidden = !valid;
      if (valid) {
        link.href = `https://t.me/${username}`;
        link.textContent = link.dataset.telegramLink === 'username' ? `@${username}` : t.telegramAction;
      } else {
        link.removeAttribute('href');
        link.textContent = '';
      }
    });
    document.querySelector('#contact-status').hidden = !valid;
  }
  function setLanguage(next, persist = false) {
    language = next === 'ru' ? 'ru' : 'en';
    const t = translations[language];
    document.documentElement.lang = language;
    document.title = t.title;
    document.querySelectorAll('[data-i18n]').forEach(element => { element.textContent = t[element.dataset.i18n]; });
    document.querySelectorAll('[data-i18n-aria]').forEach(element => { element.setAttribute('aria-label', t[element.dataset.i18nAria]); });
    document.querySelectorAll('[data-lang]').forEach(button => { button.setAttribute('aria-pressed', String(button.dataset.lang === language)); });
    for (const [selector, content] of [
      ['meta[name="description"]', t.description], ['meta[name="keywords"]', t.keywords], ['meta[name="author"]', t.name],
      ['meta[property="og:title"]', t.title], ['meta[property="og:description"]', t.description], ['meta[property="og:locale"]', language === 'ru' ? 'ru_RU' : 'en_US'],
      ['meta[name="twitter:title"]', t.title], ['meta[name="twitter:description"]', t.description]
    ]) document.querySelector(selector).setAttribute('content', content);
    renderProjects(); renderContact(); setMenu(false);
    if (persist) { try { localStorage.setItem(languageKey, language); } catch { /* Optional preference storage. */ } }
  }
  document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang, true)));
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    setMenu(open);
    if (open) nav.querySelector('a').focus();
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') setMenu(false, true); });
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) setMenu(false); });
  document.addEventListener('focusin', event => { if (!event.target.closest('.site-header')) setMenu(false); });
  document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', () => {
    setMenu(false);
    const target = document.querySelector(link.getAttribute('href'));
    if (target) { target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); }
  }));
  mobile.addEventListener('change', () => setMenu(false));
  setLanguage(language);
  document.documentElement.classList.add('js');
  document.querySelector('.language-switch').hidden = false;
  menu.hidden = false;
  document.querySelector('#year').textContent = new Date().getFullYear();
})();
