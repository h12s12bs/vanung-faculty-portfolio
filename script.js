/* ==========================================
   邱俊維教授 | Faculty Portfolio - JavaScript
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Navigation Scroll Effect ----
  const navbar = document.querySelector('.navbar');
  const backToTop = document.querySelector('.back-to-top');
  const sections = document.querySelectorAll('.section, .hero, .stats-section');
  const navLinks = document.querySelectorAll('.nav-links a');

  const isSubpage = navbar.classList.contains('nav-scrolled');

  function handleScroll() {
    const scrollY = window.scrollY;

    // Nav background
    if (!isSubpage) {
      if (scrollY > 50) {
        navbar.classList.add('nav-scrolled');
      } else {
        navbar.classList.remove('nav-scrolled');
      }
    }

    // Back to top
    if (scrollY > 500) {
      if (backToTop) backToTop.classList.add('visible');
    } else {
      if (backToTop) backToTop.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ---- Smooth Scroll for Nav Links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        const offsetTop = targetEl.offsetTop - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }

      // Close mobile nav
      const navLinksEl = document.querySelector('.nav-links');
      const hamburger = document.querySelector('.hamburger');
      if (navLinksEl.classList.contains('nav-open')) {
        navLinksEl.classList.remove('nav-open');
        hamburger.classList.remove('active');
      }
    });
  });

  // ---- Hamburger Menu ----
  const hamburger = document.querySelector('.hamburger');
  const navLinksEl = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinksEl.classList.toggle('nav-open');
    });
  }

  // ---- Back to Top ----
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Scroll Animations (IntersectionObserver) ----
  const animateElements = document.querySelectorAll('.animate-on-scroll');

  const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        animateObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  animateElements.forEach(el => animateObserver.observe(el));

  // ---- Statistics Counter Animation ----
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  let statsAnimated = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        animateCounters();
      }
    });
  }, { threshold: 0.1 });

  // Watch stats section or stats grid (for research achievements page)
  const statsSection = document.querySelector('.stats-section, .stats-grid');
  if (statsSection) {
    statsObserver.observe(statsSection);
  } else {
    // If not found, animate directly after a short delay
    setTimeout(animateCounters, 800);
  }

  function animateCounters() {
    statNumbers.forEach(numEl => {
      const target = parseInt(numEl.getAttribute('data-target'));
      const suffix = numEl.getAttribute('data-suffix') || '';
      const duration = 2000;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease-out cubic
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.floor(easedProgress * target);

        numEl.textContent = currentVal + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          numEl.textContent = target + suffix;
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  // ---- Hero Stats Counter (smaller ones) ----
  const heroStatNumbers = document.querySelectorAll('.hero-stat-number[data-target]');

  heroStatNumbers.forEach(numEl => {
    const target = parseInt(numEl.getAttribute('data-target'));
    const suffix = numEl.getAttribute('data-suffix') || '';
    const duration = 2500;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easedProgress * target);
      numEl.textContent = currentVal + suffix;
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        numEl.textContent = target + suffix;
      }
    }

    requestAnimationFrame(updateCounter);
  });

  // ---- Skill Bars Animation ----
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  let skillsAnimated = false;

  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !skillsAnimated) {
        skillsAnimated = true;
        skillBars.forEach(bar => {
          const percent = bar.getAttribute('data-percent');
          setTimeout(() => {
            bar.style.width = percent + '%';
          }, 200);
        });
      }
    });
  }, { threshold: 0.3 });

  const skillBarsContainer = document.querySelector('.skill-bars');
  if (skillBarsContainer) {
    skillsObserver.observe(skillBarsContainer);
  }

  // ---- Particles Background ----
  const particlesContainer = document.getElementById('particles-container');

  if (particlesContainer) {
    const particleCount = 40;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');

      const size = Math.random() * 4 + 2;
      const left = Math.random() * 100;
      const delay = Math.random() * 15;
      const duration = Math.random() * 10 + 15;
      const opacity = Math.random() * 0.4 + 0.1;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${left}%`;
      particle.style.bottom = `-10px`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.opacity = opacity;

      if (Math.random() > 0.5) {
        particle.style.background = 'rgba(20, 184, 166, 0.3)';
      }

      particlesContainer.appendChild(particle);
    }
  }

  // ---- Toast Notification System ----
  function showToast(message, icon = 'ℹ️') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.innerHTML = `
      <span class="toast-message-icon">${icon}</span>
      <span class="toast-message-text">${message.replace(/\n/g, '<br>')}</span>
    `;
    
    container.appendChild(toast);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
      toast.classList.add('fade-out');
      toast.addEventListener('transitionend', () => {
        toast.remove();
        if (container.children.length === 0) {
          container.remove();
        }
      });
    }, 4000);
  }

  // ---- Language Toggle Removed ----

  // ---- Automatic Dark Mode based on system preference ----
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  if (prefersDark.matches && !localStorage.getItem('theme')) {
    document.body.classList.add('dark-mode');
  }

  // ---- Typing Effect ----
  const typingElement = document.getElementById('typing-text');
  const isEnglish = document.documentElement.lang === 'en';
  const phrases = isEnglish ? [
    'Decision Sciences & Operations Research',
    'AI & Smart Healthcare Applications',
    'Information Systems & Full-stack Development',
    'Industry-Academia Linkage & Consulting',
    'Admissions & University Administration'
  ] : [
    '決策科學與運籌管理研究',
    'AI與智慧醫療跨域應用',
    '資訊系統與全端軟體開發',
    '產學鏈結與企業管理輔導',
    '招生推廣與校務行政協助'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 120;

  function typeEffect() {
    if (!typingElement) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 60;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 120;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500; // Pause before next phrase
    }

    setTimeout(typeEffect, typeSpeed);
  }

  setTimeout(typeEffect, 1000);

  // ---- Tab Switching ----
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetContent = document.getElementById(targetTab);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // ---- Project Image Carousels ----
  document.querySelectorAll('.project-img-wrapper').forEach(wrapper => {
    const images = wrapper.querySelectorAll('.project-img');
    const dotsContainer = wrapper.querySelector('.carousel-dots');
    const prevBtn = wrapper.querySelector('.carousel-prev');
    const nextBtn = wrapper.querySelector('.carousel-next');

    if (images.length <= 1) return;

    let currentIndex = 0;

    // Clear existing dots first
    if (dotsContainer) dotsContainer.innerHTML = '';

    // Create dots
    images.forEach((img, idx) => {
      const dot = document.createElement('div');
      dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => showSlide(idx));
      if (dotsContainer) dotsContainer.appendChild(dot);
    });

    const dots = wrapper.querySelectorAll('.carousel-dot');

    function showSlide(index) {
      images[currentIndex].classList.remove('active');
      if (dots.length > 0) dots[currentIndex].classList.remove('active');

      currentIndex = (index + images.length) % images.length;

      images[currentIndex].classList.add('active');
      if (dots.length > 0) dots[currentIndex].classList.add('active');
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        showSlide(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        showSlide(currentIndex + 1);
      });
    }
  });

  // ---- Lazy Loading Images ----
  const lazyImages = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  }, { rootMargin: '100px' });

  lazyImages.forEach(img => imageObserver.observe(img));

  // ---- Smooth Reveal for Cards ----
  const cards = document.querySelectorAll('.expertise-card, .dm-card, .cooperation-item, .timeline-item');
  cards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.08}s`;
  });

  console.log(isEnglish ? '✨ Dr. Chun-Wei Chiu Faculty Portfolio Loaded Successfully' : '✨ 邱俊維老師個人網站已載入完成');
});
