// navbar.js - Handles sticky navbar + mobile menu + active link highlighting
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const menuIcon = document.querySelector(".menu-icon");
  const navLinks = document.getElementById("nav-links");
  const body = document.body;

  if (!navbar || !menuIcon || !navLinks) return;

  const linkElements = navLinks.querySelectorAll("a");

  // === NAVBAR SHRINK ON SCROLL ===
  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add("shrink");
    } else {
      navbar.classList.remove("shrink");
    }

    // === ACTIVE LINK HIGHLIGHT ON SCROLL (SCROLL SPY) ===
    const sections = document.querySelectorAll("section[id]");
    let currentSectionId = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        currentSectionId = section.getAttribute("id");
      }
    });

    linkElements.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(currentSectionId)) {
        link.classList.add("active");
      }
    });
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll);

  // === MOBILE MENU TOGGLE ===
  const openMenu = () => {
    menuIcon.classList.add("active");
    navLinks.classList.add("show");
    body.classList.add("menu-open");
  };

  const closeMenu = () => {
    menuIcon.classList.remove("active");
    navLinks.classList.remove("show");
    body.classList.remove("menu-open");
  };

  const toggleMenu = () => {
    navLinks.classList.contains("show") ? closeMenu() : openMenu();
  };

  menuIcon.addEventListener("click", toggleMenu);
  menuIcon.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleMenu();
    }
  });

  // Close menu on link click (mobile)
  linkElements.forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("show")) closeMenu();
    });
  });

  // Close menu on resize above mobile breakpoint
  window.addEventListener("resize", () => {
    if (window.innerWidth > 992 && navLinks.classList.contains("show")) {
      closeMenu();
    }
  });
});