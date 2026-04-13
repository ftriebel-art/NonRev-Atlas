// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

if (mobileMenuBtn && navMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// Close mobile menu after navigation on small screens
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu) {
      navMenu.classList.remove('active');
    }
  });
});

// Conversion behavior for all email capture forms
document.querySelectorAll('.newsletter-form').forEach(form => {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const emailField = this.querySelector('input[type="email"]');
    const submitButton = this.querySelector('button[type="submit"], button');
    if (!emailField || !submitButton) {
      return;
    }

    const originalLabel = submitButton.textContent;
    const email = emailField.value.trim();

    submitButton.textContent = '✓ Subscribed!';
    submitButton.style.background = '#28a745';
    submitButton.disabled = true;

    setTimeout(() => {
      submitButton.textContent = originalLabel;
      submitButton.style.background = '';
      submitButton.disabled = false;
      this.reset();
    }, 2000);

    console.log('Subscribed:', email);
  });
});

// Lead magnet form behavior with thank-you placeholder messaging
document.querySelectorAll('.lead-magnet-form').forEach(form => {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const emailField = this.querySelector('input[type="email"]');
    const submitButton = this.querySelector('button[type="submit"], button');
    const thankYou = this.parentElement.querySelector('.lead-magnet-thankyou');
    if (!emailField || !submitButton) {
      return;
    }

    const originalLabel = submitButton.textContent;
    const email = emailField.value.trim();

    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    setTimeout(() => {
      submitButton.textContent = originalLabel;
      submitButton.disabled = false;
      this.reset();
      if (thankYou) {
        thankYou.classList.add('visible');
      }
    }, 700);

    console.log('Lead magnet signup:', email);
  });
});

// Smooth-scroll for on-page anchors only
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') {
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Blog filter controls
const filterButtons = document.querySelectorAll('.filter-btn');
const blogCards = document.querySelectorAll('.blog-card');

if (filterButtons.length && blogCards.length) {
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedFilter = button.getAttribute('data-filter');

      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      blogCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const shouldShow = selectedFilter === 'all' || cardCategory === selectedFilter;
        card.classList.toggle('is-hidden', !shouldShow);
      });
    });
  });
}

// Staggered reveal animation for cards and value blocks
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -90px 0px'
  };

  const observer = new IntersectionObserver((entries, animationObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.animation = 'fadeInUp 0.55s ease-out';
        animationObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const revealTargets = document.querySelectorAll(
    '.article-card, .featured-card, .tool-card, .blog-card, .info-item, .trust-item, .coverage-item, .testimonial, .stat, .stat-box'
  );

  revealTargets.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

console.log('✈️ Nonrev Insider Loaded');

// Homepage Flight Finder advice output
const flightFinderForm = document.getElementById('flightFinderForm');
const fromInput = document.getElementById('fromInput');
const toInput = document.getElementById('toInput');
const flightFinderResult = document.getElementById('flightFinderResult');

if (flightFinderForm && fromInput && toInput && flightFinderResult) {
  const routeAdvice = {
    'ATL-MCO': 'Great starter non-rev route. Check first and last departures for better seat odds.',
    'LAX-LAS': 'Strong short-haul choice. Keep a same-day backup departure in your pocket.',
    'JFK-BOS': 'Useful positioning route. Confirm weather and crew movement before committing.'
  };

  flightFinderForm.addEventListener('submit', e => {
    e.preventDefault();

    const from = fromInput.value.trim().toUpperCase();
    const to = toInput.value.trim().toUpperCase();

    if (!from || !to) {
      flightFinderResult.textContent = 'Please enter both airports to get non-rev advice.';
      return;
    }

    const routeKey = `${from}-${to}`;
    const advice = routeAdvice[routeKey] || 'Load-check this route at 24 hours and again 3 hours before departure. Keep one backup city ready.';

    flightFinderResult.textContent = `Route: ${from} to ${to}. Advice: ${advice}`;
  });
}

// NonRev Flight Checker day-based availability output
const nonRevCheckerForm = document.getElementById('nonRevCheckerForm');
const checkerFromInput = document.getElementById('checkerFromInput');
const checkerToInput = document.getElementById('checkerToInput');
const checkerDayInput = document.getElementById('checkerDayInput');
const nonRevCheckerResult = document.getElementById('nonRevCheckerResult');
const nonRevCheckerTip = document.getElementById('nonRevCheckerTip');

if (
  nonRevCheckerForm &&
  checkerFromInput &&
  checkerToInput &&
  checkerDayInput &&
  nonRevCheckerResult &&
  nonRevCheckerTip
) {
  nonRevCheckerForm.addEventListener('submit', e => {
    e.preventDefault();

    const from = checkerFromInput.value.trim().toUpperCase();
    const to = checkerToInput.value.trim().toUpperCase();
    const day = checkerDayInput.value;

    if (!from || !to || !day) {
      nonRevCheckerResult.classList.remove('nr-high', 'nr-medium', 'nr-low', 'nr-loading', 'is-visible');
      nonRevCheckerResult.textContent = 'Please fill in From, To, and Day of Week.';
      nonRevCheckerTip.classList.remove('is-visible');
      nonRevCheckerTip.textContent = 'Tip: complete all fields first to get tailored guidance.';
      return;
    }

    const submitButton = nonRevCheckerForm.querySelector('button[type="submit"]');
    const originalButtonLabel = submitButton ? submitButton.textContent : '';

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Checking...';
    }

    nonRevCheckerResult.classList.remove('nr-high', 'nr-medium', 'nr-low', 'is-visible');
    nonRevCheckerResult.classList.add('nr-loading');
    nonRevCheckerResult.textContent = `Analyzing ${from} to ${to} for ${day}...`;

    nonRevCheckerTip.classList.remove('is-visible');
    nonRevCheckerTip.textContent = 'Tip: checking day patterns and likely standby pressure.';

    let chanceText = '';
    let chanceClass = '';
    let tipText = '';

    if (day === 'Tue' || day === 'Wed') {
      chanceText = 'High chance: multiple flights + low loads expected';
      chanceClass = 'nr-high';
      tipText = 'Fly early morning for best odds';
    } else if (day === 'Mon' || day === 'Thu') {
      chanceText = 'Medium: check backup flights';
      chanceClass = 'nr-medium';
      tipText = 'List multiple flights and monitor loads';
    } else {
      chanceText = 'Low: expect to get stuck, have a backup plan';
      chanceClass = 'nr-low';
      tipText = 'Avoid weekends and holidays';
    }

    setTimeout(() => {
      nonRevCheckerResult.classList.remove('nr-loading', 'nr-high', 'nr-medium', 'nr-low', 'is-visible');
      nonRevCheckerResult.classList.add(chanceClass);
      nonRevCheckerResult.textContent = `Route: ${from} to ${to} on ${day}. ${chanceText}.`;

      // Restart fade animation each check
      void nonRevCheckerResult.offsetWidth;
      nonRevCheckerResult.classList.add('is-visible');

      nonRevCheckerTip.textContent = `Tip: ${tipText}.`;
      void nonRevCheckerTip.offsetWidth;
      nonRevCheckerTip.classList.add('is-visible');

      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonLabel;
      }
    }, 700);
  });
}