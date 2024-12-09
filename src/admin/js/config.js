// Admin configuration constants
// Base URL for API endpoints
export const API_BASE_URL = '/api';

// Storage keys for local/session storage
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'kioskeys_auth_token',  // Key for storing authentication token
  USER_DATA: 'kioskeys_user_data',    // Key for storing user information
  THEME: 'kioskeys_theme',            // Key for storing theme settings
  SETTINGS: 'kioskeys_settings'       // Key for storing general settings
};

// Default theme configuration
export const DEFAULT_THEME = {
  primaryColor: '#003B8E',     // Main branding color
  secondaryColor: '#00A3FF',   // Accent color
  textColor: '#1d1d1f',        // Default text color
  backgroundColor: '#ffffff'   // Background color
};

// User roles for access control
export const ROLES = {
  ADMIN: 'admin',     // Full access to all features
  EDITOR: 'editor',   // Can edit content but has limited admin access
  VIEWER: 'viewer'    // Read-only access
};

// Permissions for specific actions
export const PERMISSIONS = {
  MANAGE_APPEARANCE: 'manage_appearance',  // Permission to modify UI appearance
  MANAGE_PRODUCTS: 'manage_products',      // Permission to manage product listings
  MANAGE_CONTENT: 'manage_content',        // Permission to edit and manage content
  MANAGE_USERS: 'manage_users',            // Permission to handle user accounts
  MANAGE_SETTINGS: 'manage_settings'       // Permission to adjust system settings
};
