/**
 * Application Constants
 *
 * Centralized constants for the Parity AI platform.
 *
 * @author Mohammad Zeeshan
 */

// Application Info
export const APP_NAME = 'Parity AI';
export const APP_VERSION = '2.0.0';
export const APP_AUTHOR = 'Mohammad Zeeshan';

// Product Names
export const PRODUCTS = {
  FAIRHIRE: 'FairHire AI',
  MEDPARITY: 'MedParity',
  FINPARITY: 'FinParity',
  CONTENTGUARD: 'ContentGuard',
  ENTERPRISE: 'Enterprise',
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  TASKS: '/tasks',
  USE_CASES: '/use-cases',
  VENDORS: '/vendors',
  MODELS: '/models',
  RISKS: '/risks',
  BIAS_METRICS: '/bias-metrics',
  COMPLIANCE: '/compliance',
  EVIDENCE: '/evidence',
  REPORTING: '/reporting',
  POLICIES: '/policies',
  INCIDENTS: '/incidents',
  TRANSPARENCY: '/transparency',
  USER_MANAGEMENT: '/settings/users',
  // Product routes
  FINPARITY: '/products/finparity',
  MEDPARITY: '/products/medparity',
  CONTENTGUARD: '/products/contentguard',
  ENTERPRISE: '/products/enterprise',
} as const;

// Compliance Frameworks
export const COMPLIANCE_FRAMEWORKS = {
  EU_AI_ACT: 'EU AI Act',
  NYC_LL144: 'NYC Local Law 144',
  COLORADO_AI_ACT: 'Colorado AI Act',
  ILLINOIS_AIVOIA: 'Illinois AIVOIA',
  NIST_AI_RMF: 'NIST AI RMF',
  ISO_42001: 'ISO 42001',
  ECOA: 'ECOA',
  HIPAA: 'HIPAA',
  FDA_AI_ML: 'FDA AI/ML Guidelines',
} as const;

// Risk Levels
export const RISK_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;

// Status Values
export const STATUS = {
  COMPLIANT: 'compliant',
  REVIEW: 'review',
  FLAGGED: 'flagged',
  PENDING: 'pending',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const;

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  VIEWER: 'viewer',
} as const;

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

// Date Formats
export const DATE_FORMAT = 'MMM dd, yyyy';
export const DATETIME_FORMAT = 'MMM dd, yyyy HH:mm';
