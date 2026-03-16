import type { ClassifiedAlert } from '../api/classifier';
import type { SourceStatus } from '../hooks/useRegulatoryRadar';

export const DEMO_ALERTS: ClassifiedAlert[] = [
  {
    title: 'EU AI Act Article 6 — High-Risk AI System Classification Update',
    description:
      'The European Commission has published updated guidance on the classification of high-risk AI systems under Article 6 of the EU AI Act. New criteria clarify that AI systems used in employment screening, credit scoring, and law enforcement biometric identification are subject to mandatory conformity assessments. Compliance deadline: August 2, 2026.',
    severity: 'critical',
    source: 'EUR-Lex',
    regulation: 'EU AI Act Article 6',
    affected_framework: 'EU AI Act',
    recommended_action:
      'Review all deployed AI models against updated Article 6 criteria. Initiate conformity assessment for any models classified as high-risk. Deadline: August 2, 2026.',
    category: 'regulatory',
    url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689',
    date: '2026-03-14',
  },
  {
    title: 'EU AI Office Issues First Enforcement Notice on Transparency Obligations',
    description:
      'The EU AI Office has issued its first formal enforcement notice targeting organizations that fail to disclose AI-generated content to end users. Three companies have received preliminary warnings for non-compliance with Article 52 transparency requirements. Fines of up to 3% of global annual turnover may apply.',
    severity: 'major',
    source: 'EU AI Office',
    regulation: 'EU AI Act Article 52',
    affected_framework: 'EU AI Act',
    recommended_action:
      'Audit all customer-facing AI systems for transparency compliance. Ensure AI-generated content is clearly labeled. Update user interfaces to include AI disclosure notices.',
    category: 'enforcement',
    url: 'https://digital-strategy.ec.europa.eu/en/policies/european-approach-artificial-intelligence',
    date: '2026-03-12',
  },
  {
    title: 'NIST AI RMF 1.0 — Updated Guidance on AI Red-Teaming Best Practices',
    description:
      'NIST has published supplementary guidance to the AI Risk Management Framework (AI RMF 1.0) covering red-teaming methodologies for generative AI systems. The update includes new testing protocols for bias detection, adversarial robustness, and hallucination measurement in large language models.',
    severity: 'moderate',
    source: 'NIST',
    regulation: 'NIST AI RMF 1.0',
    affected_framework: 'NIST AI RMF',
    recommended_action:
      'Incorporate updated red-teaming protocols into existing AI testing pipelines. Schedule quarterly red-team exercises for all production generative AI models.',
    category: 'guidance',
    url: 'https://www.nist.gov/artificial-intelligence',
    date: '2026-03-10',
  },
  {
    title: 'NYC Local Law 144 — New Bias Audit Reporting Requirements for Q2 2026',
    description:
      'The NYC Department of Consumer and Worker Protection has updated bias audit reporting requirements for automated employment decision tools. Starting Q2 2026, employers must publish bias audit summaries on their careers pages and file annual compliance reports with DCWP.',
    severity: 'minor',
    source: 'NYC LL144',
    regulation: 'NYC Local Law 144',
    affected_framework: 'NYC LL144',
    recommended_action:
      'Prepare Q2 2026 bias audit report. Ensure careers page includes updated bias audit summary. File compliance documentation with DCWP before June 30, 2026.',
    category: 'compliance',
    url: 'https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page',
    date: '2026-03-08',
  },
];

export const DEMO_AGENT_STATUSES: Record<string, SourceStatus> = {
  'eur-lex': {
    id: 'eur-lex',
    name: 'EUR-Lex',
    status: 'completed',
    message: 'Scan complete — 1 critical alert detected',
    alertCount: 1,
  },
  'eu-ai-office': {
    id: 'eu-ai-office',
    name: 'EU AI Office',
    status: 'completed',
    message: 'Scan complete — 1 major alert detected',
    alertCount: 1,
  },
  nist: {
    id: 'nist',
    name: 'NIST',
    status: 'completed',
    message: 'Scan complete — 1 moderate alert detected',
    alertCount: 1,
  },
  'nyc-ll144': {
    id: 'nyc-ll144',
    name: 'NYC LL144',
    status: 'completed',
    message: 'Scan complete — 1 minor alert detected',
    alertCount: 1,
  },
};
