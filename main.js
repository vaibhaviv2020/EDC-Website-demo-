// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');
if (navToggle && primaryNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Event filters
const filterButtons = document.querySelectorAll('.chip');
const eventCards = document.querySelectorAll('.event-card');
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const type = btn.getAttribute('data-filter');
    eventCards.forEach(card => {
      const match = type === 'all' || card.getAttribute('data-type') === type;
      card.style.display = match ? '' : 'none';
    });
  });
});

// Lightbox (simple)
document.querySelectorAll('.gallery-item').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const url = link.getAttribute('href');
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.8);display:flex;align-items:center;justify-content:center;z-index:80;padding:20px;';
    const img = document.createElement('img');
    img.src = url;
    img.alt = 'Gallery image';
    img.style.maxWidth = '96%';
    img.style.maxHeight = '90%';
    overlay.appendChild(img);
    overlay.addEventListener('click', () => document.body.removeChild(overlay));
    document.body.appendChild(overlay);
  });
});

// Contact form (demo: client-side only)
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    formStatus.textContent = 'Sending...';
    const formData = new FormData(contactForm);
    const payload = Object.fromEntries(formData.entries());
    // simulate async request
    await new Promise(r => setTimeout(r, 800));
    // success message (replace with real endpoint later)
    formStatus.textContent = 'Thanks! We will reach out soon.';
    contactForm.reset();
  });
}

// Year in footer
const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());

// Newsletter form
const newsletterForm = document.getElementById('newsletterForm');
const newsletterStatus = document.getElementById('newsletterStatus');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', async e => {
    e.preventDefault();
    if (newsletterStatus) newsletterStatus.textContent = 'Subscribing...';
    const formData = new FormData(newsletterForm);
    const email = formData.get('email');
    await new Promise(r => setTimeout(r, 600));
    if (newsletterStatus) newsletterStatus.textContent = 'Thanks for subscribing!';
    newsletterForm.reset();
  });
}
// 


// animations.js
// Smooth & Slow animation preset (A) — IntersectionObserver stagger + simple nav & form behaviors

document.addEventListener('DOMContentLoaded', () => {

  // NAV TOGGLE
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.getElementById('primaryNav');
  if(navToggle && primaryNav){
    navToggle.addEventListener('click', () => {
      const isOpen = primaryNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Footer contact form (client-side demo)
  const footerForm = document.getElementById('footerContact');
  const footerStatus = document.getElementById('footerStatus');
  if(footerForm){
    footerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      footerStatus.textContent = 'Sending...';
      // simulate network
      await new Promise(r=>setTimeout(r,900));
      footerStatus.textContent = 'Thanks! We will reach out soon.';
      footerForm.reset();
      setTimeout(()=> footerStatus.textContent = '', 3000);
    });
  }

  // Small helper to add 'in' class with delay (stagger)
  function staggerAdd(nodes, delay=120){
    nodes.forEach((el,i) => {
      setTimeout(()=> el.classList.add('in'), i*delay);
    });
  }

  // Intersection observer to reveal sections smoothly
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const target = entry.target;
        // reveal hero pieces
        if(target.classList.contains('hero-section') || target.classList.contains('hero-inner')){
          document.querySelectorAll('.hero-line').forEach((el, idx) => {
            setTimeout(()=> el.classList.add('in'), idx*160);
          });
          setTimeout(()=> document.querySelector('.hero-sub')?.classList.add('in'), 500);
          setTimeout(()=> document.querySelector('.hero-buttons')?.classList.add('in'), 720);
        }
        // numbers
        if(target.classList.contains('numbers')){
          staggerAdd(Array.from(document.querySelectorAll('.num-card')), 180);
        }
        // flagship
        if(target.classList.contains('flagship')){
          document.querySelector('.flagship-card')?.classList.add('in');
        }
        // testimonials
        if(target.classList.contains('testimonials')){
          staggerAdd(Array.from(document.querySelectorAll('.testimonial')), 180);
        }

        observer.unobserve(target);
      }
    });
  }, { threshold: 0.12 });

  // Observe hero, numbers, flagship and testimonials
  const hero = document.querySelector('.hero-section');
  if(hero) observer.observe(hero);
  const numbers = document.querySelector('.numbers');
  if(numbers) observer.observe(numbers);
  const flagship = document.querySelector('.flagship');
  if(flagship) observer.observe(flagship);
  const test = document.querySelector('.testimonials');
  if(test) observer.observe(test);

  // gentle parallax for hero panel
  const heroPanel = document.querySelector('.hero-panel');
  if(heroPanel){
    window.addEventListener('scroll', () => {
      const rect = heroPanel.getBoundingClientRect();
      const winH = window.innerHeight;
      if(rect.top < winH && rect.bottom > 0){
        const pct = (winH - rect.top) / (winH + rect.height);
        heroPanel.style.transform = `translateY(${Math.min(18, (1-pct)*24)}px)`;
      }
    }, { passive:true });
  }

});
