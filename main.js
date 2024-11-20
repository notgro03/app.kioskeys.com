// Theme management
const theme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', theme);

// Navegación con efecto de scroll
let lastScrollY = window.scrollY;
const nav = document.querySelector('nav');
const hero = document.querySelector('.hero');

// Add theme toggle button to nav
const themeToggle = document.createElement('button');
themeToggle.className = 'theme-toggle';
themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  themeToggle.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
});
nav.insertBefore(themeToggle, nav.firstChild);

window.addEventListener('scroll', () => {
  // Ocultar/mostrar nav al hacer scroll
  if (window.scrollY > lastScrollY) {
    nav.classList.add('nav-hidden');
  } else {
    nav.classList.remove('nav-hidden');
  }
  lastScrollY = window.scrollY;

  // Efecto parallax en hero
  if (hero && window.scrollY > 50) {
    hero.classList.add('scrolled');
  } else if (hero) {
    hero.classList.remove('scrolled');
  }
});

// Configuración del observador para animaciones
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

// Observador compartido para todas las animaciones
const sharedObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Función para inicializar animaciones
function initializeAnimations() {
  // Seleccionar todas las tarjetas que necesitan animación
  const cards = document.querySelectorAll('.feature-card, .product-card, .service-card, .tutorial-button, .step-card, .brand-card');
  
  // Observar cada tarjeta
  cards.forEach((card, index) => {
    if (card) {
      // Aplicar delay escalonado
      card.style.transitionDelay = `${index * 100}ms`;
      // Observar para animación
      sharedObserver.observe(card);
    }
  });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initializeAnimations);