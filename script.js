
  // Navbar scroll
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
    document.querySelectorAll('section[id]').forEach(s => {
      const link = document.querySelector(`.nav-link[href="#${s.id}"]`);
      if (link) link.classList.toggle('active', window.scrollY >= s.offsetTop - 100 && window.scrollY < s.offsetTop + s.offsetHeight - 100);
    });
  });

  // Reveal on scroll
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('v'); io.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal, .reveal-l, .reveal-r').forEach(el => io.observe(el));

  // Menu tabs
  function switchTab(id, btn) {
    document.querySelectorAll('.mtab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.menu-group').forEach(g => { g.classList.remove('active'); g.style.display = 'none'; });
    const grp = document.getElementById('tab-' + id);
    grp.style.display = '';
    grp.classList.add('active');
  }

  // Gallery lightbox
  document.querySelectorAll('.gal').forEach(g => {
    g.addEventListener('click', () => {
      document.getElementById('lbImg').src = g.querySelector('img').src;
      document.getElementById('lb').classList.add('on');
    });
  });
  function closeLb() { document.getElementById('lb').classList.remove('on'); }
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });

  // Toast
  function showToast(html) {
    const t = document.getElementById('toast');
    t.innerHTML = html;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 4500);
  }

  // Reservation
  document.getElementById('resDate').min = new Date().toISOString().split('T')[0];
  function doReserve() { showToast('<strong>Reservation Confirmed!</strong>We will contact you within a few hours to confirm your table.'); }

  // Newsletter
  function doSubscribe() { showToast('<strong>شكراً!</strong>You have joined the Nile & Clay family.'); }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  // stagger reveal delays
  document.querySelectorAll('.reveal, .reveal-l, .reveal-r').forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 0.1 + 's';
  });
