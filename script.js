const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const languageSwitch = document.getElementById('languageSwitch');
const year = document.getElementById('year');
let currentLanguage = 'en';
year.textContent = new Date().getFullYear();

menuToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

document.querySelectorAll('#navMenu a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

languageSwitch.addEventListener('click', () => {
  currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-en][data-ar]').forEach(element => {
    element.innerHTML = element.dataset[currentLanguage];
  });
  languageSwitch.innerHTML = currentLanguage === 'en' ? 'عربي <span>↗</span>' : 'English <span>↗</span>';
  menuToggle.setAttribute('aria-label', currentLanguage === 'en' ? 'Open navigation' : 'فتح القائمة');
});

// Reveal sections gently as they enter the viewport, with a safe fallback.
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealTargets = document.querySelectorAll('.section-heading, .project-card, .skill-card, .education-card, .contact-panel, .about-grid, .future-project');
  revealTargets.forEach(el => { el.style.opacity = '0'; el.style.transform = 'translateY(12px)'; el.style.transition = 'opacity .55s ease, transform .55s ease'; });
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealTargets.forEach(el => observer.observe(el));
}
