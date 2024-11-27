// Global theme state management
export const ThemeManager = {
    // Default theme values
    defaults: {
      primaryColor: '#003B8E',
      secondaryColor: '#00A3FF',
      textColor: '#1d1d1f',
      backgroundColor: '#ffffff'
    },
  
    // Storage key
    storageKey: 'kioskeys_theme',
  
    // Get current theme
    getTheme() {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : this.defaults;
    },
  
    // Save and apply theme
    setTheme(theme) {
      const newTheme = { ...this.defaults, ...theme };
      localStorage.setItem(this.storageKey, JSON.stringify(newTheme));
      this.applyTheme(newTheme);
      return true;
    },
  
    // Apply theme to document
    applyTheme(theme) {
      document.documentElement.style.setProperty('--primary-blue', theme.primaryColor);
      document.documentElement.style.setProperty('--secondary-blue', theme.secondaryColor);
      document.documentElement.style.setProperty('--text-color', theme.textColor);
      document.documentElement.style.setProperty('--background', theme.backgroundColor);
    },
  
    // Initialize theme management
    init() {
      // Apply theme on page load
      this.applyTheme(this.getTheme());
  
      // Listen for storage changes (works across tabs)
      window.addEventListener('storage', (e) => {
        if (e.key === this.storageKey) {
          this.applyTheme(JSON.parse(e.newValue));
        }
      });
    }
  };