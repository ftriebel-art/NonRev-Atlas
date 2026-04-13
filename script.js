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
const checkerLoadInput = document.getElementById('checkerLoadInput');
const nonRevCheckerResult = document.getElementById('nonRevCheckerResult');
const nonRevCheckerTip = document.getElementById('nonRevCheckerTip');

const escapeHtml = value => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

if (
  nonRevCheckerForm &&
  checkerFromInput &&
  checkerToInput &&
  checkerDayInput &&
  checkerLoadInput &&
  nonRevCheckerResult &&
  nonRevCheckerTip
) {
  nonRevCheckerForm.addEventListener('submit', e => {
    e.preventDefault();

    const from = checkerFromInput.value.trim().toUpperCase();
    const to = checkerToInput.value.trim().toUpperCase();
    const day = checkerDayInput.value;
    const loadValue = checkerLoadInput.value.trim();
    const parsedLoad = loadValue ? Number(loadValue) : null;

    if (!from || !to || !day) {
      nonRevCheckerResult.classList.remove('nr-high', 'nr-medium', 'nr-low', 'nr-loading', 'is-visible');
      nonRevCheckerResult.textContent = 'Please fill in From, To, and Day of Week.';
      nonRevCheckerTip.classList.remove('is-visible');
      nonRevCheckerTip.textContent = 'Pro Tip: complete route and day first, then add load for sharper advice.';
      return;
    }

    if (loadValue && (Number.isNaN(parsedLoad) || parsedLoad < 0 || parsedLoad > 100)) {
      nonRevCheckerResult.classList.remove('nr-high', 'nr-medium', 'nr-low', 'nr-loading', 'is-visible');
      nonRevCheckerResult.textContent = 'Estimated Load % must be a number between 0 and 100.';
      nonRevCheckerTip.classList.remove('is-visible');
      nonRevCheckerTip.textContent = 'Pro Tip: use rough estimates from app loads, then recheck closer to departure.';
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
    nonRevCheckerResult.innerHTML = `
      <div class="advisor-loading">\n        <span class="advisor-loading-icon">\u23F3</span>\n        Building strategy for ${escapeHtml(from)} to ${escapeHtml(to)} on ${escapeHtml(day)}${parsedLoad !== null ? ` with ${parsedLoad}% estimated load` : ''}...\n      </div>
    `;

    nonRevCheckerTip.classList.remove('is-visible');
    nonRevCheckerTip.textContent = 'Pro Tip: prioritizing load risk, day pattern, and backup options.';

    let strategyText = '';
    let chanceClass = '';
    let riskLevel = '';
    let riskClass = '';
    let riskIcon = '';
    let backupPlan = '';
    let proTipText = '';

    if (parsedLoad !== null) {
      if (parsedLoad > 85) {
        strategyText = 'High risk. Consider earlier flights or alternate routes.';
        chanceClass = 'nr-low';
        riskLevel = 'High';
        riskClass = 'risk-high';
        riskIcon = '🔴';
        backupPlan = 'Prioritize first-bank departures and list at least two fallback flights plus one alternate airport.';
        proTipText = 'Protect your trip with at least two backup flights and one alternate city option';
      } else if (parsedLoad >= 60) {
        strategyText = 'Moderate chance. List backup flights and monitor closely.';
        chanceClass = 'nr-medium';
        riskLevel = 'Medium';
        riskClass = 'risk-medium';
        riskIcon = '🟡';
        backupPlan = 'Hold one nonstop and one connection backup, then re-check loads at 24h and 3h before departure.';
        proTipText = 'Set load checks at 24h, 12h, and 3h before departure for better decision timing';
      } else {
        strategyText = 'Good chance. Still list multiple flights as backup.';
        chanceClass = 'nr-high';
        riskLevel = 'Low';
        riskClass = 'risk-low';
        riskIcon = '🟢';
        backupPlan = 'Keep at least one later departure noted so you can pivot quickly if loads shift at the gate.';
        proTipText = 'Target the first departure bank to maximize same-day recovery options';
      }
    } else if (day === 'Tue' || day === 'Wed') {
      strategyText = 'Good chance. Midweek generally improves standby outcomes.';
      chanceClass = 'nr-high';
      riskLevel = 'Low';
      riskClass = 'risk-low';
      riskIcon = '🟢';
      backupPlan = 'Set one additional departure as a fallback and keep airport standby times flexible.';
      proTipText = 'Even on strong days, keep one later departure bookmarked in case the first wave closes out';
    } else if (day === 'Mon' || day === 'Thu') {
      strategyText = 'Moderate chance. Traffic swings can change quickly, so monitor closely.';
      chanceClass = 'nr-medium';
      riskLevel = 'Medium';
      riskClass = 'risk-medium';
      riskIcon = '🟡';
      backupPlan = 'Track both direct and one-stop flights so you can swap quickly when standby rank moves.';
      proTipText = 'Watch both direct and one-stop options to widen your recovery path';
    } else {
      strategyText = 'Higher risk window. Weekend pressure can reduce standby success.';
      chanceClass = 'nr-low';
      riskLevel = 'High';
      riskClass = 'risk-high';
      riskIcon = '🔴';
      backupPlan = 'Plan an alternate airport or travel window, and avoid last-bank flights where possible.';
      proTipText = 'Shift to very early departures or nearby alternate airports when possible';
    }

    setTimeout(() => {
      nonRevCheckerResult.classList.remove('nr-loading', 'nr-high', 'nr-medium', 'nr-low', 'is-visible');
      nonRevCheckerResult.classList.add(chanceClass);
      nonRevCheckerResult.innerHTML = `
        <article class="advisor-card ${riskClass}">
          <header class="advisor-header">
            <h3>✈️ NonRev Strategy Brief</h3>
            <p class="advisor-route">${escapeHtml(from)} to ${escapeHtml(to)} • ${escapeHtml(day)}${parsedLoad !== null ? ` • ${parsedLoad}% load` : ''}</p>
          </header>
          <div class="advisor-grid">
            <section class="advisor-item">
              <p class="advisor-label">${riskIcon} Risk Level</p>
              <p class="advisor-value ${riskClass}">${escapeHtml(riskLevel)}</p>
            </section>
            <section class="advisor-item">
              <p class="advisor-label">🧭 Strategy Recommendation</p>
              <p class="advisor-copy">${escapeHtml(strategyText)}</p>
            </section>
            <section class="advisor-item">
              <p class="advisor-label">🛫 Backup Plan</p>
              <p class="advisor-copy">${escapeHtml(backupPlan)}</p>
            </section>
            <section class="advisor-item">
              <p class="advisor-label">💡 Pro Tip</p>
              <p class="advisor-copy">${escapeHtml(proTipText)}.</p>
            </section>
          </div>
        </article>
      `;

      // Restart fade animation each check
      void nonRevCheckerResult.offsetWidth;
      nonRevCheckerResult.classList.add('is-visible');

      nonRevCheckerTip.textContent = `Pro Tip: ${proTipText}.`;
      void nonRevCheckerTip.offsetWidth;
      nonRevCheckerTip.classList.add('is-visible');

      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonLabel;
      }
    }, 700);
  });
}

// Premium homepage billing toggle for pricing cards
const billingToggleButtons = document.querySelectorAll('.np-toggle');
const planPrices = document.querySelectorAll('.np-price[data-monthly][data-annual]');
const planPriceNotes = document.querySelectorAll('.np-price-note');

if (billingToggleButtons.length && planPrices.length) {
  billingToggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const billing = button.getAttribute('data-billing');
      if (!billing) {
        return;
      }

      billingToggleButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      planPrices.forEach(priceEl => {
        const value = billing === 'annual'
          ? priceEl.getAttribute('data-annual')
          : priceEl.getAttribute('data-monthly');

        if (value) {
          priceEl.textContent = value;
        }
      });

      planPriceNotes.forEach(noteEl => {
        noteEl.textContent = billing === 'annual' ? 'per month billed annually' : 'per month';
      });
    });
  });
}

// Single-open FAQ behavior for cleaner scanning
const premiumFaqItems = document.querySelectorAll('.np-faq-list details');
if (premiumFaqItems.length) {
  premiumFaqItems.forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        premiumFaqItems.forEach(other => {
          if (other !== item) {
            other.open = false;
          }
        });
      }
    });
  });
}

// Premium page reveal animation to improve visual hierarchy
const premiumRevealTargets = document.querySelectorAll(
  '.nonrev-premium .np-proof-row, .nonrev-premium .np-headline, .nonrev-premium .np-grid-3 > .np-card, .nonrev-premium .np-faq-list details, .nonrev-premium .np-waitlist'
);

if ('IntersectionObserver' in window && premiumRevealTargets.length && !prefersReducedMotion) {
  premiumRevealTargets.forEach((target, index) => {
    target.classList.add('np-reveal');
    target.style.transitionDelay = `${Math.min(index * 35, 210)}ms`;
  });

  const premiumRevealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('np-inview');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.18,
    rootMargin: '0px 0px -11% 0px'
  });

  premiumRevealTargets.forEach(target => premiumRevealObserver.observe(target));
}

// Current luxury homepage interactions
const siteMenuToggle = document.querySelector('[data-menu-toggle]');
const siteNav = document.getElementById('site-nav');
const navDropdownToggle = document.querySelector('.nav-dropdown-toggle');
const navDropdownParent = navDropdownToggle ? navDropdownToggle.closest('.has-dropdown') : null;

if (siteMenuToggle && siteNav) {
  siteMenuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    siteMenuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

if (navDropdownToggle && navDropdownParent) {
  navDropdownToggle.addEventListener('click', e => {
    e.preventDefault();
    const isOpen = navDropdownParent.classList.toggle('is-open');
    navDropdownToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', e => {
    if (!navDropdownParent.contains(e.target)) {
      navDropdownParent.classList.remove('is-open');
      navDropdownToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const atlasDrawerItems = document.querySelectorAll('.atlas-drawer-stack .atlas-drawer');
if (atlasDrawerItems.length) {
  atlasDrawerItems.forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        atlasDrawerItems.forEach(other => {
          if (other !== item) {
            other.open = false;
          }
        });
      }
    });
  });
}

const tripBriefForm = document.querySelector('[data-trip-brief]');
const tripBriefResult = document.querySelector('[data-trip-brief-result]');

if (tripBriefForm && tripBriefResult) {
  const tripBriefMap = {
    'Beach escape': 'Look at San Juan, Tulum, and Mallorca first for the fastest mix of scenery, dining, and easy hotel browsing.',
    'Food city': 'Start with Lisbon, Mexico City, Tokyo, or San Sebastian if the trip needs a memorable restaurant payoff.',
    'Luxury weekend': 'Copenhagen, Paris, and Dubai work best when you want polished hotels, design, and high-touch experiences.',
    'Culture-heavy trip': 'Rome, Kyoto, Istanbul, and Marrakech give you dense sightseeing without needing a complicated itinerary.',
    'Nature reset': 'Vancouver, Cape Town, Bali, and Queenstown are strongest when the trip is really about scenery and slower pacing.'
  };

  tripBriefForm.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(tripBriefForm);
    const origin = formData.get('origin');
    const tripType = formData.get('tripType');
    const budget = formData.get('budget');
    const recommendation = tripBriefMap[tripType] || 'Start with cities that have direct flights, strong neighborhoods, and flexible hotel inventory.';

    tripBriefResult.textContent = `${origin} travelers aiming for ${tripType?.toString().toLowerCase() || 'a smart trip'} under ${budget || 'a flexible budget'} should start here: ${recommendation}`;
  });
}

const dealFilterButtons = document.querySelectorAll('[data-filter-group="home-deals"] .chip');
const homeDealCards = document.querySelectorAll('.deals-grid .deal-card');

if (dealFilterButtons.length && homeDealCards.length) {
  dealFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedFilter = button.getAttribute('data-filter');
      dealFilterButtons.forEach(item => item.classList.remove('is-active'));
      button.classList.add('is-active');

      homeDealCards.forEach(card => {
        const matches = selectedFilter === 'all' || card.getAttribute('data-category') === selectedFilter;
        card.hidden = !matches;
      });
    });
  });
}

const destinationGrid = document.querySelector('[data-destination-grid]');
const destinationCount = document.querySelector('[data-destination-count]');
const destinationRegionSelect = document.querySelector('[data-destination-region]');
const destinationStyleSelect = document.querySelector('[data-destination-style]');
const destinationResetButton = document.querySelector('[data-destination-reset]');

if (destinationGrid && destinationCount && destinationRegionSelect && destinationStyleSelect) {
  const destinationData = [
    { name: 'Lisbon', region: 'Europe', style: 'Food', image: 'https://source.unsplash.com/featured/900x700/?lisbon,portugal', summary: 'Best for first-time Europe with food, design, and high visual payoff.', activity: 'Ride Tram 28 at golden hour and stay out late in Alfama.', place: 'Miradouro de Santa Luzia and the waterfront in Belem.', restaurant: 'Book a seafood dinner at Cervejaria Ramiro.', stay: 'Stay in Chiado or Principe Real for walkability.' },
    { name: 'Tokyo', region: 'Asia', style: 'Food', image: 'https://source.unsplash.com/featured/900x700/?tokyo,japan', summary: 'Massive food upside, perfect service culture, and endlessly varied neighborhoods.', activity: 'Do a late-night ramen and cocktail circuit in Shinjuku.', place: 'Shibuya Sky, Asakusa, and teamLab for contrast.', restaurant: 'Prioritize sushi omakase or tempura counters early.', stay: 'Base in Shibuya or Ginza depending on pace.' },
    { name: 'San Juan', region: 'North America', style: 'Beach', image: 'https://source.unsplash.com/featured/900x700/?san%20juan,puerto%20rico', summary: 'Easy island energy with beach access and strong city texture.', activity: 'Mix Old San Juan walking with a beach afternoon in Condado.', place: 'Castillo San Felipe del Morro and colorful old town streets.', restaurant: 'Find mofongo and elevated Puerto Rican tasting menus.', stay: 'Old San Juan for charm, Condado for convenience.' },
    { name: 'Marrakech', region: 'Africa', style: 'Culture', image: 'https://source.unsplash.com/featured/900x700/?marrakech,morocco', summary: 'High-drama interiors, markets, and riad culture for travelers who want atmosphere.', activity: 'Spend a full day between the souks and a hammam reset.', place: 'Jardin Majorelle and Bahia Palace.', restaurant: 'Reserve one rooftop dinner and one traditional tagine spot.', stay: 'Stay inside a design-forward riad in the medina.' },
    { name: 'Paris', region: 'Europe', style: 'Luxury', image: 'https://source.unsplash.com/featured/900x700/?paris,france', summary: 'Still one of the cleanest combinations of romance, museums, and hotel theater.', activity: 'Structure one slow neighborhood day instead of sprinting landmarks.', place: 'Le Marais, Saint-Germain, and the Seine at dusk.', restaurant: 'Split dining between one bistro and one special-occasion room.', stay: 'Choose Saint-Germain or the 1st for classic access.' },
    { name: 'Rome', region: 'Europe', style: 'Culture', image: 'https://source.unsplash.com/featured/900x700/?rome,italy', summary: 'Ancient scale, street energy, and nonstop food reward for short or long stays.', activity: 'Do an early Colosseum or Vatican slot, then roam by foot.', place: 'Trastevere, the Pantheon area, and Testaccio.', restaurant: 'Target pasta classics and one old-school Roman trattoria.', stay: 'Centro Storico or Trastevere keeps everything close.' },
    { name: 'Mexico City', region: 'Latin America', style: 'Food', image: 'https://source.unsplash.com/featured/900x700/?mexico%20city', summary: 'Arguably one of the best value food capitals on earth.', activity: 'Combine museums, coffee, and a serious taco crawl.', place: 'Roma Norte, Condesa, and Coyoacan.', restaurant: 'Book both street-food stops and one chef-led tasting table.', stay: 'Roma Norte is the easiest first base.' },
    { name: 'Bangkok', region: 'Asia', style: 'Nightlife', image: 'https://source.unsplash.com/featured/900x700/?bangkok,thailand', summary: 'High energy, low cost, and huge sensory payoff.', activity: 'Use rooftop bars and late-night food markets as your rhythm.', place: 'Wat Arun, the river, and Chinatown.', restaurant: 'Balance one fine-dining meal with casual street-side favorites.', stay: 'Sukhumvit or the riverside depending on mood.' },
    { name: 'Barcelona', region: 'Europe', style: 'Beach', image: 'https://source.unsplash.com/featured/900x700/?barcelona,spain', summary: 'Beach access plus design, dining, and walkable urban energy.', activity: 'Split the trip between architecture and long outdoor lunches.', place: 'Eixample, Gothic Quarter, and Barceloneta.', restaurant: 'Tapas hop with one bigger seafood reservation.', stay: 'Eixample delivers the cleanest home base.' },
    { name: 'Istanbul', region: 'Middle East', style: 'Culture', image: 'https://source.unsplash.com/featured/900x700/?istanbul,turkey', summary: 'One of the world’s best value-for-history cities.', activity: 'Build your day around Bosphorus views and layered neighborhoods.', place: 'Hagia Sophia, Karakoy, and Balat.', restaurant: 'Go heavy on mezze, kebabs, and Turkish breakfast.', stay: 'Karakoy balances scenery and access.' },
    { name: 'Cape Town', region: 'Africa', style: 'Nature', image: 'https://source.unsplash.com/featured/900x700/?cape%20town,south%20africa', summary: 'Epic natural setting with serious wine, food, and scenery upside.', activity: 'Do one mountain day and one peninsula coastal day.', place: 'Table Mountain, Camps Bay, and the Cape Winelands.', restaurant: 'Book ocean-view dining and a vineyard lunch.', stay: 'Sea Point or Camps Bay for the best visual payoff.' },
    { name: 'Dubai', region: 'Middle East', style: 'Luxury', image: 'https://source.unsplash.com/featured/900x700/?dubai,uae', summary: 'Strong for polished hotels, dramatic interiors, and high-service travel.', activity: 'Use a short stay for spa, beach club, and skyline moments.', place: 'Downtown, Jumeirah, and the desert edge.', restaurant: 'Book one high-rise dinner and one modern Middle Eastern table.', stay: 'Downtown for spectacle, Jumeirah for resort feel.' },
    { name: 'Singapore', region: 'Asia', style: 'Luxury', image: 'https://source.unsplash.com/featured/900x700/?singapore', summary: 'Hyper-efficient, beautiful, and ideal for a precise premium city break.', activity: 'Use hawker centers by day and design bars by night.', place: 'Marina Bay, Kampong Glam, and Gardens by the Bay.', restaurant: 'Mix hawker icons with one major tasting experience.', stay: 'Marina Bay if this is your first visit.' },
    { name: 'Seoul', region: 'Asia', style: 'Nightlife', image: 'https://source.unsplash.com/featured/900x700/?seoul,south%20korea', summary: 'Design-heavy neighborhoods, nightlife, skincare, and food density.', activity: 'Build one day around shopping and one around late-night dining.', place: 'Bukchon Hanok Village, Hongdae, and Gangnam.', restaurant: 'Go for Korean barbecue and contemporary tasting menus.', stay: 'Myeongdong or Hongdae for convenience.' },
    { name: 'Copenhagen', region: 'Europe', style: 'Luxury', image: 'https://source.unsplash.com/featured/900x700/?copenhagen,denmark', summary: 'Minimalist luxury, strong design culture, and one of the cleanest city experiences in Europe.', activity: 'Bike neighborhoods and anchor the trip with one marquee dinner.', place: 'Nyhavn, Nørrebro, and the harbor baths.', restaurant: 'Balance bakery culture with one destination-level restaurant.', stay: 'Indre By or Vesterbro.' },
    { name: 'Buenos Aires', region: 'Latin America', style: 'Food', image: 'https://source.unsplash.com/featured/900x700/?buenos%20aires,argentina', summary: 'Great for steak, wine, architecture, and long graceful city days.', activity: 'Do cafe hopping by day and steakhouse reservations by night.', place: 'Palermo, Recoleta, and San Telmo.', restaurant: 'Reserve parrilla nights and one more polished tasting menu.', stay: 'Palermo is the easiest entry point.' },
    { name: 'Bali', region: 'Asia', style: 'Nature', image: 'https://source.unsplash.com/featured/900x700/?bali,indonesia', summary: 'Best when the trip is about villas, wellness, and scenery.', activity: 'Pair Ubud calm with a few nights on the coast.', place: 'Ubud rice terraces and the southern beach clubs.', restaurant: 'Book sunset seafood and one wellness-forward brunch spot.', stay: 'Split between Ubud and Seminyak or Uluwatu.' },
    { name: 'Sydney', region: 'Oceania', style: 'Beach', image: 'https://source.unsplash.com/featured/900x700/?sydney,australia', summary: 'A clean luxury-feeling city with beaches, harbor views, and strong dining.', activity: 'Do the Bondi to Coogee walk early and harbor dining later.', place: 'Sydney Opera House, Bondi, and Surry Hills.', restaurant: 'Mix seafood with neighborhood brunch culture.', stay: 'CBD, The Rocks, or Surry Hills.' },
    { name: 'Vancouver', region: 'North America', style: 'Nature', image: 'https://source.unsplash.com/featured/900x700/?vancouver,canada', summary: 'Nature access and city polish without too much planning friction.', activity: 'Use it as a skyline-plus-mountains city break.', place: 'Stanley Park, Gastown, and Capilano or Grouse.', restaurant: 'Prioritize seafood and Asian dining depth.', stay: 'Coal Harbour or Yaletown.' },
    { name: 'New Orleans', region: 'North America', style: 'Culture', image: 'https://source.unsplash.com/featured/900x700/?new%20orleans', summary: 'Music, food, and atmosphere with huge payoff even on a short stay.', activity: 'Build around live music and long meals, not over-scheduled landmarks.', place: 'French Quarter, Garden District, and Magazine Street.', restaurant: 'Go beyond Bourbon Street and reserve real Creole classics.', stay: 'Warehouse District or French Quarter edge.' }
  ];

  const renderDestinations = () => {
    const regionFilter = destinationRegionSelect.value;
    const styleFilter = destinationStyleSelect.value;

    const filteredDestinations = destinationData.filter(destination => {
      const matchesRegion = regionFilter === 'all' || destination.region === regionFilter;
      const matchesStyle = styleFilter === 'all' || destination.style === styleFilter;
      return matchesRegion && matchesStyle;
    });

    destinationCount.textContent = `${filteredDestinations.length} destination${filteredDestinations.length === 1 ? '' : 's'} shown`;

    destinationGrid.innerHTML = filteredDestinations.map(destination => `
      <article class="atlas-card reveal-on-scroll">
        <img class="atlas-image" loading="lazy" src="${destination.image}" alt="${escapeHtml(destination.name)} travel photo" />
        <div class="atlas-card-body">
          <p class="card-label">${escapeHtml(destination.region)} · ${escapeHtml(destination.style)}</p>
          <h3>${escapeHtml(destination.name)}</h3>
          <p>${escapeHtml(destination.summary)}</p>
          <details class="atlas-details">
            <summary>Open insider guide</summary>
            <ul>
              <li><strong>Do:</strong> ${escapeHtml(destination.activity)}</li>
              <li><strong>Visit:</strong> ${escapeHtml(destination.place)}</li>
              <li><strong>Eat:</strong> ${escapeHtml(destination.restaurant)}</li>
              <li><strong>Stay:</strong> ${escapeHtml(destination.stay)}</li>
            </ul>
          </details>
        </div>
      </article>
    `).join('');
  };

  destinationRegionSelect.addEventListener('change', renderDestinations);
  destinationStyleSelect.addEventListener('change', renderDestinations);

  if (destinationResetButton) {
    destinationResetButton.addEventListener('click', () => {
      destinationRegionSelect.value = 'all';
      destinationStyleSelect.value = 'all';
      renderDestinations();
    });
  }

  renderDestinations();
}

// Reveal animation for the current luxury homepage cards
const luxuryRevealTargets = document.querySelectorAll('.reveal-on-scroll');
if ('IntersectionObserver' in window && luxuryRevealTargets.length && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -8% 0px'
  });

  luxuryRevealTargets.forEach(target => revealObserver.observe(target));
}