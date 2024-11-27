import { LogoManager } from './js/logoManager.js';
import { ThemeManager } from './js/themeManager.js';

// Initialize logo and theme management
document.addEventListener('DOMContentLoaded', () => {
  LogoManager.init();
  ThemeManager.init();

  // Navigation menu functionality
  const menuButton = document.querySelector('.menu-button');
  const navLinks = document.querySelector('.nav-links');

  if (menuButton && navLinks) {
    menuButton.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuButton.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuButton.contains(e.target)) {
        navLinks.classList.remove('active');
        menuButton.classList.remove('active');
      }
    });
  }

  // Scroll effects
  let lastScrollY = window.scrollY;
  const nav = document.querySelector('nav');
  const hero = document.querySelector('.hero');

  window.addEventListener('scroll', () => {
    // Hide/show nav on scroll
    if (window.scrollY > lastScrollY) {
      nav?.classList.add('nav-hidden');
    } else {
      nav?.classList.remove('nav-hidden');
    }
    lastScrollY = window.scrollY;

    // Parallax effect on hero
    if (hero && window.scrollY > 50) {
      hero.classList.add('scrolled');
    } else if (hero) {
      hero.classList.remove('scrolled');
    }
  });
});