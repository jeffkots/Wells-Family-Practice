// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Small delay to ensure all CSS and layout is ready
  setTimeout(function () {
    const navToggle = document.getElementById("nav-toggle");
    const hamburger = document.querySelector(".hamburger");
    const siteNav = document.querySelector(".site-nav");
    const headerRight = document.querySelector(".header-right");

    // Only add click listener if all elements exist
    if (navToggle && hamburger && siteNav && headerRight) {
      // Handle navigation link clicks - close menu when clicked
      const navLinks = siteNav.querySelectorAll("a");
      navLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
          if (navToggle.checked) {
            // Simply close the menu
            navToggle.checked = false;
          }

          // Special handling for Home link
          if (link.getAttribute("href") === "#home") {
            event.preventDefault();
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }
        });
      });

      // Close hamburger menu when clicking outside the header-right area
      document.addEventListener("click", function (event) {
        // Only close if menu is open and click is completely outside header-right
        if (navToggle.checked && !headerRight.contains(event.target)) {
          navToggle.checked = false;
        }
      });
    }
  }, 100);
});
