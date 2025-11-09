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
});
