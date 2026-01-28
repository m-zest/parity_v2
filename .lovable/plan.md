

# Parity AI - AI Governance Platform

An umbrella platform for domain-specific AI bias testing and compliance monitoring, with FairHire AI (HR) as the flagship product.

---

## 1. Parity AI - Parent Platform

### Landing Page
- Clean, professional white theme matching the VerifyWise/Ghost design you shared
- Hero section: *"Fairness Testing for Every AI System"*
- Product suite showcase:
  - **FairHire AI** (HR/Hiring) - Active
  - **MedParity** (Healthcare) - Coming Soon
  - **FinParity** (Financial Services) - Coming Soon
  - **ContentGuard** (Media/Content) - Coming Soon
  - **Enterprise AI Governance** (General) - Coming Soon
- Unified navigation: Platform, Solutions, Resources, Blog, About
- Call-to-action: "Get Started" → leads to auth/signup

### Authentication System (Shared Across All Products)
- Supabase-powered authentication
- Email/password signup and login
- Clean auth page with Parity AI branding
- Role-based access control (Admin, User, Viewer)
- Organization/team management
- All products share single sign-on

---

## 2. FairHire AI - HR Governance Product (Fully Functional MVP)

### Dashboard Overview
- Welcome panel with key stats:
  - Total AI Models tracked
  - Vendors monitored
  - Open Incidents
  - Compliance Score
- Toggle: "Operations View" vs "Executive View"
- Quick action buttons (+ Add Model, + Add Vendor, etc.)

### Dashboard Widgets
- **Task Radar** - Overdue, Due Soon, Upcoming compliance tasks
- **Incident Status** - Open, Investigating, Mitigated, Closed counts
- **Evidence Coverage** - % of models with complete documentation
- **Risk Distribution** - Donut charts (High/Medium/Low)
- **Recent Activity Feed** - Timeline of system events

### Bias Metrics & Visualizations
- **Adverse Impact Ratio (AIR)** charts by demographic group
- **Demographic Parity** indicators with Pass/Warning/Fail badges
- **Selection Rate** comparisons with bar charts
- **Time-series trends** showing bias over time
- **Comparative analysis** between models/time periods

### Multi-Country Compliance Framework System
- **Framework Registry:**
  - NYC Local Law 144 (USA) - Active
  - EU AI Act (Europe) - Active
  - Colorado AI Act (USA) - Active
  - Illinois AIVOIA (USA) - Active
  - ISO 42001 - Active
  - NIST AI RMF - Active
- Per-framework compliance checklists
- Pass/Fail status indicators
- Deadline tracking
- "Generate Compliance Report" button

### Model Inventory
- Table view: Provider, Model Name, Version, Status, Security Assessment, Date
- Status categories: Approved, Restricted, Pending, Blocked (with counts)
- Filter, Group, Search functionality
- Model detail pages with full assessment history
- "Add New Model" workflow

### Vendor Management
- Vendor registry with risk scores
- Security assessment tracking (Yes/No)
- Vendor-linked incident history
- Documentation attachments per vendor

### Incident Management
- Incident log table with columns:
  - ID, Title, Severity, Status, Model, Created, Updated
- Severity levels: Critical, High, Medium, Low
- Status flow: Open → Investigating → Mitigated → Closed
- Incident detail page with:
  - Investigation notes
  - Linked model/vendor
  - Resolution timeline
  - Audit trail

---

## 3. Other Parity AI Products (Coming Soon Pages)

### MedParity - Healthcare AI Governance
- Placeholder page: "Coming Soon"
- Description: "Bias testing for clinical AI, diagnostic systems, treatment recommendations"
- Email signup for launch notification

### FinParity - Financial AI Governance
- Placeholder page: "Coming Soon"
- Description: "Lending, credit scoring, insurance underwriting fairness testing"
- Email signup for launch notification

### ContentGuard - Media/Content AI
- Placeholder page: "Coming Soon"
- Description: "Content moderation, recommendation systems, ad targeting fairness"
- Email signup for launch notification

### Enterprise AI Governance
- Placeholder page: "Coming Soon"
- Description: "General-purpose AI governance for any business application"
- Email signup for launch notification

---

## 4. Navigation & Sidebar

### Main Sidebar (FairHire AI Active)
```
[Parity AI Logo]
[Product Switcher Dropdown]
  ├── FairHire AI (Active)
  ├── MedParity (Coming Soon)
  ├── FinParity (Coming Soon)
  ├── ContentGuard (Coming Soon)
  └── Enterprise (Coming Soon)

MAIN
├── Dashboard
├── Tasks

DISCOVERY
├── Use Cases
├── Vendors
├── Model Inventory

ASSURANCE
├── Risk Management
├── Bias & Fairness
├── Compliance Frameworks
├── Evidence Hub
├── Reporting

GOVERNANCE
├── Policy Manager
├── Incident Management

[User Profile]
```

---

## 5. Design System

### Visual Theme (Matching Your Screenshots)
- **Background:** Clean white (#FFFFFF)
- **Cards:** White with subtle gray borders
- **Primary color:** Deep teal/green (#0D9488 or similar)
- **Typography:** Modern sans-serif (Inter or similar)
- **Status colors:**
  - Green: Approved/Passed
  - Orange/Yellow: Warning/Pending
  - Red: Critical/Failed
  - Blue: Info/In Progress

### Component Style
- Card-based layouts with subtle shadows
- Status badges with rounded corners
- Tables with hover states
- Progress indicators
- Interactive charts (Recharts)

---

## 6. Data & Backend

### Database Tables (Supabase)
- **organizations** - Company accounts
- **users** - User profiles & roles
- **user_roles** - Role assignments (admin, user, viewer)
- **models** - AI model registry
- **vendors** - Third-party vendor registry
- **incidents** - Incident tracking
- **compliance_frameworks** - Framework definitions
- **compliance_assessments** - Per-model framework assessments
- **audit_logs** - Activity tracking

### Sample Data
- Pre-populated demo frameworks (NYC LL144, EU AI Act, etc.)
- Example models and vendors
- Sample incidents and compliance statuses
- Demo bias metrics for visualization

---

## 7. Key Pages Summary

| Page | Description |
|------|-------------|
| `/` | Parity AI landing page |
| `/auth` | Login/Signup |
| `/dashboard` | FairHire AI main dashboard |
| `/models` | AI Model inventory |
| `/vendors` | Vendor management |
| `/incidents` | Incident management |
| `/compliance` | Compliance frameworks |
| `/bias-metrics` | Bias analysis & visualizations |
| `/products/medparity` | Coming Soon page |
| `/products/finparity` | Coming Soon page |
| `/products/contentguard` | Coming Soon page |
| `/products/enterprise` | Coming Soon page |

