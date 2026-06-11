// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Small delay to ensure all CSS and layout is ready
  setTimeout(function () {
    const navToggle = document.getElementById('nav-toggle');
    const hamburger = document.querySelector('.hamburger');
    const siteNav = document.querySelector('.site-nav');
    const headerRight = document.querySelector('.header-right');

    // Only add click listener if all elements exist
    if (navToggle && hamburger && siteNav && headerRight) {
      // Handle navigation link clicks - close menu when clicked
      const navLinks = siteNav.querySelectorAll('a');
      navLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
          if (navToggle.checked) {
            // Simply close the menu
            navToggle.checked = false;
          }

          // Special handling for Home link
          if (link.getAttribute('href') === '#home') {
            event.preventDefault();
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          }
        });
      });

      // Close hamburger menu when clicking outside the header-right area
      document.addEventListener('click', function (event) {
        // Only close if menu is open and click is completely outside header-right
        if (navToggle.checked && !headerRight.contains(event.target)) {
          navToggle.checked = false;
        }
      });
    }
  }, 100);

  // Hide/show header on scroll
  let lastScrollTop = 0;
  let isScrolling;
  const header = document.querySelector('header');

  window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Clear the timeout if it exists
    clearTimeout(isScrolling);

    // Only trigger hide/show after scrolling past the header height
    if (scrollTop > 80) {
      if (scrollTop > lastScrollTop) {
        // Scrolling down - hide header
        header.style.transform = 'translateY(-100%)';
        header.style.transition = 'transform 0.3s ease-in-out';
      } else {
        // Scrolling up - show header
        header.style.transform = 'translateY(0)';
        header.style.transition = 'transform 0.3s ease-in-out';
      }
    } else {
      // At the top of the page - always show header
      header.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });

  // Expandable bios — truncate long text with "more" toggle
  var BIO_THRESHOLD = 200;
  var bios = document.querySelectorAll('.doctor-bio, .staff-bio');

  bios.forEach(function (bio) {
    var text = bio.textContent.trim();
    if (text.length > BIO_THRESHOLD) {
      bio.classList.add('expandable-bio');
      var btn = document.createElement('button');
      btn.className = 'bio-toggle';
      btn.textContent = 'more';
      btn.addEventListener('click', function () {
        var isExpanded = bio.classList.toggle('expanded');
        btn.textContent = isExpanded ? 'less' : 'more';
      });
      bio.parentNode.insertBefore(btn, bio.nextSibling);
    }
  });

  // ============================================================
  // Scroll reveal animations
  // ============================================================
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    // Tag section headings + body content for individual reveals
    var revealSelectors = [
      '.section h2',
      '.section > .container > p',
      '.policy-group',
      '.contact > div',
      '.contact .map',
    ];
    document.querySelectorAll(revealSelectors.join(',')).forEach(function (el) {
      el.classList.add('reveal');
    });

    // Stagger groups: providers + staff
    document.querySelectorAll('.doctors, .staff').forEach(function (group) {
      group.classList.add('reveal-group');
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    document.querySelectorAll('.reveal, .reveal-group').forEach(function (el) {
      observer.observe(el);
    });
  }
});
