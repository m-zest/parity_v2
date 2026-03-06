/**
 * Common Type Definitions
 *
 * Centralized type definitions for the Parity AI platform.
 *
 * @author Mohammad Zeeshan
 */

// Product Types
export interface Product {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  active?: boolean;
  comingSoon?: boolean;
}

// Navigation Types
export interface NavItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  adminOnly?: boolean;
}

// Stats Card Types
export interface StatCard {
  name: string;
  value: string | number;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
  trend: 'up' | 'down';
}

// Alert Types
export interface Alert {
  message: string;
  severity: 'high' | 'medium' | 'low';
  time: string;
}

// Model Types
export interface AIModel {
  id: string;
  name: string;
  status: 'compliant' | 'review' | 'flagged' | 'pending';
  fairnessScore: number;
  lastAudit: string;
  category?: string;
  department?: string;
}

// Compliance Framework Types
export interface ComplianceFramework {
  name: string;
  progress: number;
  status: 'on-track' | 'needs-attention' | 'at-risk';
  deadline?: string;
}

// User Role Types
export type UserRole = 'admin' | 'user' | 'viewer';

// Risk Level Types
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

// Status Types
export type Status = 'active' | 'inactive' | 'pending' | 'archived';
