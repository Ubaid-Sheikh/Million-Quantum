/**
 * Million Quantums - Premium Interactive Experience
 * Next-Level JavaScript
 */

(function () {
  "use strict";

  // ============================================
  // CUSTOM CURSOR - DISABLED
  // ============================================
  function initCustomCursor() {
    // Custom cursor disabled - using default browser cursor
    return;
    
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');

    if (!cursor || !cursorDot) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      // Smooth follow for main cursor
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;

      // Faster follow for dot
      dotX += (mouseX - dotX) * 0.15;
      dotY += (mouseY - dotY) * 0.15;

      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      cursorDot.style.left = dotX + 'px';
      cursorDot.style.top = dotY + 'px';

      requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .btn-primary, .btn-secondary, .btn-outline');

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.borderColor = '#00D4FF';
      });

      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.borderColor = '#00D4FF';
      });
    });
  }

  // ============================================
  // QUANTUM CANVAS PARTICLES
  // ============================================
  function initQuantumCanvas() {
    const canvas = document.getElementById('quantum-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = `hsla(${Math.random() * 60 + 180}, 100%, 70%, ${Math.random() * 0.5 + 0.2})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function createParticles() {
      const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 100);
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = `rgba(74, 95, 217, ${0.2 * (1 - distance / 150)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      connectParticles();
      animationId = requestAnimationFrame(animate);
    }

    createParticles();
    animate();

    window.addEventListener('resize', () => {
      cancelAnimationFrame(animationId);
      createParticles();
      animate();
    });
  }

  // ============================================
  // TYPING EFFECT
  // ============================================
  function initTypingEffect() {
    const typedElement = document.querySelector('.typed-text');
    if (!typedElement) return;

    const phrases = [
      'Real-world products',
      'Quantum computing solutions',
      'Breakthrough technologies',
      'Market-ready innovations'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
      }

      setTimeout(type, typingSpeed);
    }

    type();
  }

  // ============================================
  // NAVIGATION SCROLL EFFECT
  // ============================================
  function initNavScroll() {
    const nav = document.querySelector('.quantum-nav');
    if (!nav) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    });
  }

  // ============================================
  // SMOOTH SCROLL
  // ============================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const offsetTop = target.offsetTop - 80;

          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // ============================================
  // ACTIVE NAV LINK
  // ============================================
  function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function setActiveLink() {
      let current = '';
      const scrollY = window.pageYOffset;

      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    }

    window.addEventListener('scroll', setActiveLink);
    setActiveLink();
  }

  // ============================================
  // HAMBURGER OVERLAY MENU
  // ============================================
  function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburgerMenu');
    const overlay = document.getElementById('navOverlay');
    const overlayClose = document.getElementById('overlayClose');
    const navLinks = document.querySelectorAll('.nav-item-link');

    if (!hamburger || !overlay) return;

    // Open overlay
    hamburger.addEventListener('click', () => {
      overlay.classList.add('active');
      hamburger.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    // Close overlay
    const closeOverlay = () => {
      overlay.classList.remove('active');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (overlayClose) {
      overlayClose.addEventListener('click', closeOverlay);
    }

    // Close on link click
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        closeOverlay();
      });
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        closeOverlay();
      }
    });
  }

  // ============================================
  // PARALLAX EFFECT
  // ============================================
  function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;

      parallaxElements.forEach(el => {
        const speed = el.dataset.parallax || 0.5;
        const yPos = -(scrolled * speed);
        el.style.transform = `translateY(${yPos}px)`;
      });
    });
  }

  // ============================================
  // COUNTER ANIMATION
  // ============================================
  function initCounters() {
    const counters = document.querySelectorAll('.stat-value');
    const speed = 200;

    const animateCounter = (counter) => {
      const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
      const increment = target / speed;
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.ceil(current) + (counter.textContent.includes('$') ? 'B+' : counter.textContent.includes('%') ? '%' : '+');
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = counter.textContent;
        }
      };

      updateCounter();
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }

  // ============================================
  // GLASSMORPHISM MOUSE EFFECT
  // ============================================
  function initGlassEffect() {
    const glassCards = document.querySelectorAll('.glass-card, .feature-card, .focus-inner');

    glassCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }

  // ============================================
  // SCROLL REVEAL ANIMATIONS
  // ============================================
  function initScrollReveal() {
    const reveals = document.querySelectorAll('[data-aos]');

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });

    reveals.forEach(el => revealObserver.observe(el));
  }

  // ============================================
  // MAGNETIC BUTTONS
  // ============================================
  function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');

    buttons.forEach(button => {
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });

      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
      });
    });
  }

  // ============================================
  // INITIALIZE AOS
  // ============================================
  function initAOS() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100,
        delay: 0
      });
    }
  }

  // ============================================
  // PRELOADER
  // ============================================
  function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500);
      }, 1000);
    });
  }

  // ============================================
  // PERFORMANCE OPTIMIZATION
  // ============================================
  function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  // ============================================
  // INITIALIZE ALL
  // ============================================
  function init() {
    initCustomCursor();
    initQuantumCanvas();
    initTypingEffect();
    initNavScroll();
    initSmoothScroll();
    initActiveNav();
    initHamburgerMenu();
    initParallax();
    initCounters();
    initGlassEffect();
    initScrollReveal();
    initMagneticButtons();
    initAOS();
    initPreloader();
    optimizePerformance();

    // Add loaded class to body
    document.body.classList.add('loaded');
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose to window for debugging
  window.QuantumApp = {
    version: '1.0.0',
    init: init
  };

})();
