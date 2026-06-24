const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const form = document.querySelector('.contact-form');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    siteNav.classList.toggle('open');
    navToggle.setAttribute(
      'aria-expanded',
      siteNav.classList.contains('open') ? 'true' : 'false'
    );
  });
}

function handleContact(event) {
  event.preventDefault();
  const formMessage = document.querySelector('.form-message');
  if (!formMessage) return;
  formMessage.textContent = 'Merci, votre message a bien été pris en compte !';
  event.target.reset();
}

if (form) {
  form.addEventListener('submit', handleContact);
}

// IntersectionObserver: lazy-load backgrounds and add in-view class for animation
const ioOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const el = entry.target;
    if (entry.isIntersecting) {
      // lazy-load data-bg into background-image
      const img = el.querySelector('.feature-img');
      if (img && img.dataset.bg && !img.style.backgroundImage) {
        img.style.backgroundImage = `url('${img.dataset.bg}')`;
      }
      // elements with data-bg on the container
      if (el.dataset && el.dataset.bg && !el.style.backgroundImage) {
        el.style.backgroundImage = `url('${el.dataset.bg}')`;
        el.style.backgroundSize = 'cover';
        el.style.backgroundPosition = 'center';
      }
      el.classList.add('in-view');
      io.unobserve(el);
    }
  });
}, ioOptions);

document.querySelectorAll('.fade-up').forEach((node) => io.observe(node));

// Parallax on hero: subtle mousemove + scroll
const hero = document.querySelector('.hero.hero-bg');
if (hero) {
  const onMove = (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const mx = (x * 18).toFixed(2) + 'px';
    const my = (y * 12).toFixed(2) + 'px';
    hero.style.setProperty('--mx', mx);
    hero.style.setProperty('--my', my);
  };
  hero.addEventListener('mousemove', onMove);
  // gentle reset on leave
  hero.addEventListener('mouseleave', () => {
    hero.style.setProperty('--mx', '0px');
    hero.style.setProperty('--my', '0px');
  });
  // small scroll parallax for overlay
  window.addEventListener('scroll', () => {
    const sc = window.scrollY / 6;
    const overlay = hero.querySelector(':before');
    // we can't access pseudo-element, so adjust transform on hero children instead
    hero.style.setProperty('--scrollY', `${sc}px`);
  });
}
