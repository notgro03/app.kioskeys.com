// Global logo state management
export const LogoManager = {
    // Default logo URL
    defaultLogo: 'https://ucarecdn.com/bdf174c8-8731-47fa-a3f9-2443689099be/logokioskey.png',
    
    // Storage key
    storageKey: 'kioskeys_logo',
  
    // Get current logo URL
    getLogo() {
      return localStorage.getItem(this.storageKey) || this.defaultLogo;
    },
  
    // Save and update logo
    setLogo(url) {
      localStorage.setItem(this.storageKey, url);
      this.updateAllLogos();
      return true;
    },
  
    // Update all logo elements in the page
    updateAllLogos() {
      const currentLogo = this.getLogo();
      document.querySelectorAll('[data-logo]').forEach(img => {
        img.src = currentLogo;
      });
    },
  
    // Initialize logo management
    init() {
      // Update logos on page load
      this.updateAllLogos();
  
      // Listen for storage changes (works across tabs)
      window.addEventListener('storage', (e) => {
        if (e.key === this.storageKey) {
          this.updateAllLogos();
        }
      });
    }
  };