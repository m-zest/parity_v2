# Parity AI

**Enterprise AI Governance & Compliance Platform**

[![Deploy Status](https://img.shields.io/badge/deploy-live-success)](https://parity-v2.vercel.app)
[![License](https://img.shields.io/badge/license-proprietary-blue)]()
[![React](https://img.shields.io/badge/React-18.3-61dafb)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6)](https://typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ecf8e)](https://supabase.com)

---

## Author

**Mohammad Zeeshan**
Lead Developer & Architect

---

## Overview

Parity AI is a comprehensive platform that enables organizations to govern AI systems responsibly, ensure regulatory compliance, and mitigate algorithmic risks. Built for enterprises deploying AI at scale, Parity provides the visibility, controls, and documentation needed to meet emerging AI regulations worldwide.

### Key Value Propositions

- **Regulatory Readiness** — Pre-built compliance frameworks for EU AI Act, NYC LL144, Colorado AI Act, NIST AI RMF, and ISO 42001
- **Risk Visibility** — Centralized view of AI model inventory, vendor dependencies, and associated risks
- **Bias Monitoring** — Track fairness metrics across protected attributes with automated testing
- **Audit Trail** — Complete documentation and evidence management for regulatory audits
- **Executive Reporting** — One-click PDF reports for board meetings and regulatory submissions

---

## Product Suite

| Product | Description | Status |
|---------|-------------|--------|
| **FairHire AI** | HR AI governance for hiring, screening, and workforce analytics | **Live** |
| **MedParity** | Healthcare AI governance for clinical decisions and patient safety | **Live** |
| **FinParity** | Financial AI governance for lending, credit, and underwriting | **Live** |
| **ContentGuard** | Media AI governance for content moderation and recommendations | **Live** |
| **Enterprise** | Cross-organization AI governance for enterprise-wide oversight | **Live** |

---

## Core Modules

| Module | Description | Status |
|--------|-------------|--------|
| **Model Registry** | Centralized inventory of all AI/ML models with lifecycle tracking | Live |
| **Vendor Management** | Third-party AI vendor risk assessment and monitoring | Live |
| **Compliance Hub** | Framework-specific checklists and assessment workflows | Live |
| **Incident Management** | Report, investigate, and resolve AI-related incidents | Live |
| **Bias & Fairness** | Fairness metric tracking and bias test results | Live |
| **Risk Register** | Enterprise risk identification and mitigation tracking | Live |
| **Use Case Registry** | AI use case documentation and approval workflows | Live |
| **Evidence Hub** | Document storage for audit evidence and certifications | Live |
| **Reporting Engine** | PDF report generation for all modules | Live |
| **Task Management** | Compliance task tracking with assignees and deadlines | Live |

---

## Supported Compliance Frameworks

| Framework | Jurisdiction | Focus Area |
|-----------|--------------|------------|
| **EU AI Act** | European Union | Comprehensive AI regulation with risk tiers |
| **NYC Local Law 144** | New York City | Automated employment decision tools |
| **Colorado AI Act** | Colorado, USA | High-risk AI consumer protections |
| **Illinois AIVOIA** | Illinois, USA | AI video interview compliance |
| **NIST AI RMF** | United States | AI risk management framework |
| **ISO 42001** | International | AI management system standard |
| **ECOA** | United States | Equal Credit Opportunity Act |
| **HIPAA** | United States | Healthcare data privacy |
| **FDA AI/ML** | United States | FDA guidelines for AI in healthcare |

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, TypeScript 5.6, Vite 5 |
| **UI Components** | Tailwind CSS, shadcn/ui (Radix primitives) |
| **State Management** | TanStack React Query 5 |
| **Backend** | Supabase (PostgreSQL, Auth, Storage, Realtime) |
| **Charts** | Recharts |
| **PDF Generation** | jsPDF, jsPDF-AutoTable |
| **Data Import** | PapaParse (CSV) |
| **Animations** | Framer Motion |

---

## Project Structure

```
parity-ai/
├── docs/                       # Documentation
├── public/                     # Static assets
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── auth/               # Authentication components
│   │   ├── compliance/         # Compliance module components
│   │   ├── dashboard/          # Dashboard widgets
│   │   ├── incidents/          # Incident management components
│   │   ├── landing/            # Landing page components
│   │   ├── layout/             # App layout (sidebar, header)
│   │   ├── models/             # Model management components
│   │   ├── ui/                 # Base shadcn/ui components
│   │   └── vendors/            # Vendor management components
│   │
│   ├── config/                 # App configuration
│   │   └── index.ts            # Environment & feature flags
│   │
│   ├── constants/              # Application constants
│   │   └── index.ts            # Routes, status values, etc.
│   │
│   ├── hooks/                  # React Query data hooks
│   │   ├── useModels.ts        # Model CRUD + queries
│   │   ├── useVendors.ts       # Vendor CRUD + queries
│   │   ├── useIncidents.ts     # Incident management
│   │   ├── useCompliance.ts    # Compliance data
│   │   ├── useRisks.ts         # Risk register
│   │   ├── useBiasTests.ts     # Bias testing results
│   │   ├── useUseCases.ts      # Use case registry
│   │   ├── useEvidence.ts      # Evidence management
│   │   ├── useTasks.ts         # Task tracking
│   │   └── useCurrentUser.ts   # User session
│   │
│   ├── integrations/           # External service clients
│   │   └── supabase/           # Supabase client & types
│   │
│   ├── lib/                    # Utilities & report generators
│   │   ├── generateModelsReport.ts
│   │   ├── generateVendorsReport.ts
│   │   ├── generateComplianceReport.ts
│   │   ├── generateIncidentsReport.ts
│   │   ├── generateRisksReport.ts
│   │   └── generateExecutiveReport.ts
│   │
│   ├── pages/                  # Route components
│   │   ├── products/           # Product-specific pages
│   │   │   ├── FinParity.tsx   # Financial AI governance
│   │   │   ├── MedParity.tsx   # Healthcare AI governance
│   │   │   ├── ContentGuard.tsx # Media AI governance
│   │   │   ├── Enterprise.tsx  # Enterprise governance
│   │   │   └── index.ts        # Barrel exports
│   │   ├── Dashboard.tsx
│   │   ├── Models.tsx
│   │   ├── Vendors.tsx
│   │   ├── Compliance.tsx
│   │   ├── Incidents.tsx
│   │   └── ...
│   │
│   ├── services/               # Business logic services
│   │
│   ├── test/                   # Test utilities
│   │
│   ├── types/                  # TypeScript type definitions
│   │   └── index.ts            # Common types
│   │
│   ├── App.tsx                 # Root component
│   └── main.tsx                # Entry point
│
├── .env.example                # Environment template
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

---

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (free tier available)

### Installation

```bash
# Clone the repository
git clone https://github.com/m-zest/parity_v2.git
cd parity_v2

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Add your Supabase credentials to .env

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080`.

### Demo Mode

The application includes built-in demo data for all modules, allowing immediate exploration without database configuration.

---

## Database Schema

### Core Tables

| Table | Purpose |
|-------|---------|
| `organizations` | Multi-tenant organization data |
| `profiles` | User profiles linked to organizations |
| `user_roles` | Role-based access (admin, user, viewer) |
| `models` | AI model inventory |
| `vendors` | Third-party vendor registry |
| `incidents` | Incident reports and resolution |
| `compliance_frameworks` | Regulatory framework definitions |
| `compliance_assessments` | Assessment records per framework |
| `framework_checklists` | Checklist items per framework |
| `audit_logs` | Activity audit trail |

### Security

- Row-Level Security (RLS) on all tables
- Organization-scoped data isolation
- JWT-based authentication via Supabase Auth

---

## API Reference

### Data Hooks

All hooks follow a consistent pattern with React Query:

```typescript
// Fetch data
const { data, isLoading, error } = useModels();

// Create
const createModel = useCreateModel();
createModel.mutate({ name: "Model Name", status: "pending" });

// Update
const updateModel = useUpdateModel();
updateModel.mutate({ id: "uuid", status: "approved" });

// Delete
const deleteModel = useDeleteModel();
deleteModel.mutate("uuid");
```

Available hooks:
- `useModels`, `useCreateModel`, `useUpdateModel`, `useDeleteModel`
- `useVendors`, `useCreateVendor`, `useUpdateVendor`, `useDeleteVendor`
- `useIncidents`, `useCreateIncident`, `useUpdateIncident`, `useDeleteIncident`
- `useRisks`, `useCreateRisk`, `useUpdateRisk`, `useDeleteRisk`
- `useBiasTests`, `useCreateBiasTest`, `useDeleteBiasTest`
- `useUseCases`, `useCreateUseCase`, `useUpdateUseCase`, `useDeleteUseCase`
- `useEvidence`, `useCreateEvidence`, `useUploadEvidence`, `useDeleteEvidence`
- `useTasks`, `useCreateTask`, `useUpdateTask`, `useDeleteTask`
- `useCompliance` (combined frameworks, assessments, checklists)

---

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
3. Deploy

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 8080
CMD ["npm", "run", "preview"]
```

---

## Roadmap

### Completed

- [x] FairHire AI - HR AI Governance
- [x] MedParity - Healthcare AI Governance
- [x] FinParity - Financial AI Governance
- [x] ContentGuard - Media AI Governance
- [x] Enterprise - Cross-Organization Governance
- [x] Model inventory with CRUD and CSV import
- [x] Vendor management with risk scoring
- [x] Incident management workflow
- [x] Compliance framework tracking with checklists
- [x] Bias & fairness metric tracking
- [x] Risk register with mitigation plans
- [x] Use case documentation registry
- [x] Evidence hub with file management
- [x] PDF report generation (6 report types)
- [x] Task management with assignments
- [x] Real-time dashboard with activity feed
- [x] Role-based access control

### In Development

- [ ] Email notifications for compliance deadlines
- [ ] API integrations (Azure ML, AWS SageMaker, Databricks)
- [ ] Custom report builder
- [ ] Workflow automation
- [ ] SSO/SAML authentication

---

## Contributing

This is a proprietary product. For partnership inquiries, contact:

**Mohammad Zeeshan**
GitHub: [@m-zest](https://github.com/m-zest)

---

## License

Copyright 2024-2026 Parity AI. All rights reserved.

Developed by **Mohammad Zeeshan**

This software is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.
