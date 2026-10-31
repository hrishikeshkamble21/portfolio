/* ===== Settings: add your EmailJS keys to enable the contact form ===== */
const EMAILJS = { publicKey: '', serviceId: '', templateId: '' };
/* Your profile links (leave a value empty to hide that link everywhere) */
const SOCIAL = { github: 'https://github.com/hrishikeshkamble21', linkedin: 'https://www.linkedin.com/in/your-profile' };

(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const hasGsap = !!window.gsap && !!window.ScrollTrigger && !reduce;

  $('#year').textContent = new Date().getFullYear();

  /* Mobile menu */
  const burger = $('.burger'), menu = $('#menu');
  const setMenu = open => { menu.classList.toggle('open', open); burger.setAttribute('aria-expanded', open); };
  burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  menu.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  /* Active nav link */
  const links = $$('#menu a');
  const spy = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) links.forEach(a => a.classList.toggle('active', a.hash === '#' + en.target.id));
  }), { rootMargin: '-50% 0px -50% 0px' });
  $$('main section[id]').forEach(s => spy.observe(s));

  /* Typewriter */
  const roles = ['Android Developer', 'UI Designer', 'Tech Enthusiast'], out = $('#typed');
  if (reduce) out.textContent = roles[0];
  else {
    let r = 0, c = 0, del = false;
    (function tick() {
      const w = roles[r]; c += del ? -1 : 1; out.textContent = w.slice(0, c);
      let t = del ? 40 : 90;
      if (!del && c === w.length) { del = true; t = 1400; }
      else if (del && c === 0) { del = false; r = (r + 1) % roles.length; t = 300; }
      setTimeout(tick, t);
    })();
  }

  /* Social links from one place */
  $$('[data-social]').forEach(a => { const u = SOCIAL[a.dataset.social]; u ? a.href = u : a.remove(); });

  /* Missing image? Show a styled placeholder instead of a broken icon */
  $$('img[data-fallback]').forEach(img => {
    const bad = () => img.closest('.thumb,.avatar').classList.add('no-img');
    img.addEventListener('error', bad);
    if (img.complete && !img.naturalWidth) bad();
  });

  /* Certificate lightbox */
  const box = $('#lightbox'), boxImg = $('img', box);
  $$('.cert').forEach(b => b.addEventListener('click', () => {
    if ($('.thumb', b).classList.contains('no-img')) return;
    boxImg.src = b.dataset.full; boxImg.alt = $('strong', b).textContent; box.showModal();
  }));
  $('.x', box).addEventListener('click', () => box.close());
  box.addEventListener('click', e => { if (e.target === box) box.close(); });

  /* Project card spotlight (follows the pointer) */
  $$('.card').forEach(card => card.addEventListener('pointermove', e => {
    const b = card.getBoundingClientRect();
    card.style.setProperty('--x', e.clientX - b.left + 'px');
    card.style.setProperty('--y', e.clientY - b.top + 'px');
  }));

  /* Skills marquee: duplicate the list for a seamless loop */
  const track = $('.track');
  $$('.chip', track).forEach(c => { const k = c.cloneNode(true); k.setAttribute('aria-hidden', 'true'); track.append(k); });

  /* Split text for animation */
  $$('[data-chars]').forEach(el => {
    el.innerHTML = [...el.textContent].map(ch => `<span class="ch">${ch}</span>`).join('');
  });
  $$('[data-words]').forEach(el => {
    el.innerHTML = el.textContent.trim().split(/\s+/).map(w => `<span class="w">${w}</span>`).join(' ');
  });

  if (hasGsap) {
    gsap.registerPlugin(ScrollTrigger);

    /* One orchestrated moment: the name rises letter by letter */
    gsap.timeline({ defaults: { ease: 'power4.out' } })
      .from('.nav', { yPercent: -100, duration: .9 })
      .from('.ch', { yPercent: 115, rotate: 6, duration: 1.2, stagger: .045 }, '-=.5')
      .from('.role, .hero .btn, .hero .socials', { y: 24, opacity: 0, duration: .9, stagger: .15 }, '-=.7');

    gsap.to('.progress', { scaleX: 1, ease: 'none', scrollTrigger: { scrub: .3, start: 0, end: 'max' } });

    /* About text lights up word by word as you scroll */
    gsap.from('.w', { opacity: .15, stagger: .1, ease: 'none',
      scrollTrigger: { trigger: '.big', start: 'top 80%', end: 'bottom 45%', scrub: true } });

    $$('.sec h2').forEach(h => gsap.from(h, { yPercent: 40, opacity: 0, duration: .9, ease: 'power3.out',
      scrollTrigger: { trigger: h, start: 'top 90%', once: true } }));

    gsap.from('.card', { y: 60, opacity: 0, duration: 1, stagger: .15, ease: 'power3.out',
      scrollTrigger: { trigger: '.grid', start: 'top 85%', once: true } });

    gsap.from('.avatar', { clipPath: 'inset(100% 0 0 0)', duration: 1.3, ease: 'power4.out',
      scrollTrigger: { trigger: '.avatar', start: 'top 85%', once: true } });
    gsap.from('.certs li', { y: 50, opacity: 0, duration: .9, stagger: .12, ease: 'power3.out',
      scrollTrigger: { trigger: '.certs', start: 'top 85%', once: true } });

    if (fine) {
      /* Cursor ring + lagging background glow */
      const ring = $('.ring');
      const rx = gsap.quickTo(ring, 'x', { duration: .35, ease: 'power3' }), ry = gsap.quickTo(ring, 'y', { duration: .35, ease: 'power3' });
      const bx = gsap.quickTo('.blob', 'x', { duration: 1.8, ease: 'power3' }), by = gsap.quickTo('.blob', 'y', { duration: 1.8, ease: 'power3' });
      addEventListener('pointermove', e => { ring.classList.add('on'); rx(e.clientX); ry(e.clientY); bx(e.clientX); by(e.clientY); });
      document.addEventListener('pointerover', e => ring.classList.toggle('hot', !!e.target.closest('a,button,input,textarea')));

      /* Magnetic buttons */
      $$('.magnetic').forEach(b => {
        b.addEventListener('pointermove', e => {
          const r = b.getBoundingClientRect();
          gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * .3, y: (e.clientY - r.top - r.height / 2) * .3, duration: .3 });
        });
        b.addEventListener('pointerleave', () => gsap.to(b, { x: 0, y: 0, duration: .7, ease: 'elastic.out(1,.3)' }));
      });

      /* 3D tilt on project cards */
      $$('.card').forEach(card => {
        card.addEventListener('pointermove', e => {
          const b = card.getBoundingClientRect();
          gsap.to(card, { rotationY: ((e.clientX - b.left) / b.width - .5) * 9, rotationX: -((e.clientY - b.top) / b.height - .5) * 9, transformPerspective: 900, duration: .4 });
        });
        card.addEventListener('pointerleave', () => gsap.to(card, { rotationX: 0, rotationY: 0, duration: .7, ease: 'power3.out' }));
      });
    }
  }

  /* Contact form (EmailJS) */
  const form = $('#contact-form'), status = $('#status');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!form.checkValidity()) { status.textContent = 'Please fill in your name, a valid email and a message.'; return; }
    const { publicKey, serviceId, templateId } = EMAILJS;
    if (!window.emailjs || !publicKey || !serviceId || !templateId) {
      status.textContent = 'The form isn’t connected yet. Add your EmailJS keys in js/main.js.'; return;
    }
    const btn = $('button', form); btn.disabled = true; status.textContent = 'Sending…';
    try {
      await emailjs.sendForm(serviceId, templateId, form, { publicKey });
      status.textContent = 'Message sent. I’ll get back to you soon.'; form.reset();
    } catch { status.textContent = 'Couldn’t send the message. Please try again.'; }
    btn.disabled = false;
  });
})();
