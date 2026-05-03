
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    document.getElementById('resDate').min = new Date().toISOString().split('T')[0];

    // Navbar scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
      document.querySelectorAll('section[id]').forEach(sec => {
        const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
        if (link) {
          const top = sec.offsetTop - 100;
          link.classList.toggle('active', window.scrollY >= top && window.scrollY < top + sec.offsetHeight);
        }
      });
    });

    // ✅ DARK MODE
    const themeToggle = document.getElementById('themeToggle');
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'dark';
    root.setAttribute('data-theme', savedTheme);
    updateThemeIcon();
    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeIcon();
    });
    function updateThemeIcon() {
      const isDark = root.getAttribute('data-theme') === 'dark';
      themeToggle.innerHTML = isDark ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-fill"></i>';
    }

    // ✅ MENU FILTER
    document.querySelectorAll('.menu-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.dataset.filter;
        document.querySelectorAll('.dish-card').forEach(dish => {
          if (filter === 'all' || dish.dataset.category === filter) {
            dish.style.display = 'block';
            requestAnimationFrame(() => { dish.style.opacity = '1'; dish.style.transform = 'translateY(0)'; });
          } else {
            dish.style.opacity = '0';
            dish.style.transform = 'translateY(20px)';
            setTimeout(() => { dish.style.display = 'none'; }, 300);
          }
        });
      });
    });

    // Scroll reveal
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); observer.unobserve(e.target); }});
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

    // ✅ ANIMATED COUNTERS
    function animateCounters() {
      document.querySelectorAll('.stat-number').forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;
        const update = () => {
          current += step;
          if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(update);
          } else {
            counter.textContent = target;
          }
        };
        update();
      });
    }
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { animateCounters(); statsObserver.unobserve(entry.target); }
      });
    }, { threshold: 0.5 });
    statsObserver.observe(document.querySelector('.hero-stats'));

    // ✅ BACK TO TOP
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
      backToTopBtn.classList.toggle('show', window.scrollY > 400);
    });
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ✅ LAZY LOAD IMAGES
    const lazyImages = document.querySelectorAll('.lazy-img');
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.add('loaded');
          imgObserver.unobserve(img);
        }
      });
    }, { threshold: 0.1 });
    lazyImages.forEach(img => {
      if (img.dataset.src) img.src = '';
      imgObserver.observe(img);
    });

    // Lightbox
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        document.getElementById('lightboxImg').src = item.querySelector('img').src;
        document.getElementById('lightbox').classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
    function closeLightbox(e) {
      if(e.target.id === 'lightbox' || e.target.classList.contains('lightbox-close')) {
        document.getElementById('lightbox').classList.remove('active');
        document.body.style.overflow = '';
      }
    }

    // Toast & Forms
    function showToast(title, msg) {
      document.getElementById('toastTitle').textContent = title;
      document.getElementById('toastMsg').textContent = msg;
      const t = document.getElementById('toast');
      t.classList.add('show');
      setTimeout(() => t.classList.remove('show'), 4000);
    }
    document.getElementById('reservationForm').addEventListener('submit', e => {
      e.preventDefault();
      showToast('Reservation Confirmed!', 'We will contact you within 2 hours.');
      e.target.reset();
    });
    document.getElementById('newsletterForm').addEventListener('submit', e => {
      e.preventDefault();
      showToast('Welcome!', 'You\'ll receive our updates soon.');
      e.target.reset();
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if(target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          const navCollapse = document.querySelector('.navbar-collapse');
          if(navCollapse.classList.contains('show')) new bootstrap.Collapse(navCollapse).hide();
        }
      });
    });
