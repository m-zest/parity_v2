/**
 * Application Configuration
 *
 * Environment and feature configuration for Parity AI.
 *
 * @author Mohammad Zeeshan
 */

// Environment
export const config = {
  // App Info
  app: {
    name: 'Parity AI',
    version: '2.0.0',
    author: 'Mohammad Zeeshan',
    description: 'Enterprise AI Governance & Compliance Platform',
  },

  // API Configuration
  api: {
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
    supabaseAnonKey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '',
  },

  // Feature Flags
  features: {
    enableFairHire: true,
    enableMedParity: true,
    enableFinParity: true,
    enableContentGuard: true,
    enableEnterprise: true,
    enableDemoMode: true,
    enableEmailNotifications: false,
    enableApiIntegrations: false,
    enableCustomReports: false,
    enableWorkflowAutomation: false,
    enableSSO: false,
  },

  // Theme
  theme: {
    defaultTheme: 'dark' as const,
    enableSystemTheme: true,
  },

  // Pagination
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [10, 25, 50, 100],
  },

  // File Upload
  upload: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['csv', 'pdf', 'png', 'jpg', 'jpeg', 'doc', 'docx'],
  },
} as const;

export default config;
