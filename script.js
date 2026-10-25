document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Hamburger Menu Toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-link");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
    // Prevent background scrolling when menu is open
    document.body.style.overflow = navLinks.classList.contains("active")
      ? "hidden"
      : "auto";
  });

  // Close mobile menu when a link is clicked
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });

  // 2. Sticky Glassmorphism Header on Scroll
  const header = document.getElementById("header");
  let scrollTicking = false;

  window.addEventListener(
    "scroll",
    () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 50) {
            header.classList.add("scrolled");
          } else {
            header.classList.remove("scrolled");
          }
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    },
    { passive: true },
  );

  // 3. Active Nav Link Highlighting via Intersection Observer
  const sections = document.querySelectorAll("section");

  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -60% 0px", // Adjusts when the section is considered 'active'
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Remove active class from all links
        navItems.forEach((link) => {
          link.classList.remove("active");
        });

        // Find corresponding link and add active class
        const activeId = entry.target.getAttribute("id");
        const activeLink = document.querySelector(
          `.nav-link[href="#${activeId}"]`,
        );

        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });

  // 4. Lazy load videos — play when in view, pause when out
  const videos = document.querySelectorAll("video");
  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.play().catch(() => {});
        } else {
          entry.target.pause();
        }
      });
    },
    { threshold: 0.3 },
  );

  videos.forEach((video) => videoObserver.observe(video));
});
