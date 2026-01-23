
import { CMSData } from './types';

export const INITIAL_DATA: CMSData = {
  settings: {
    companyName: "BIR Research",
    tagline: "Advancing Evidence-Based Medicine Together",
    heroText: "BIR (Biomedical & International Research) is a doctor-led research mentorship and collaboration organization specializing in systematic reviews and meta-analyses. We work primarily with international medical graduates (IMGs) and early-career clinicians, guiding them through structured, contribution-based research roles while ensuring high methodological standards.",
    contactEmail: "bir.research.in@gmail.com",
    address: "Nagpur, Maharashtra, India",
    phone: "+919096151632",
    socialLinks: {
      linkedin: "https://www.linkedin.com/company/birresearch/",
      instagram: "https://www.instagram.com/bir.research?igsh=cmN5ZHJrMXhyMXNo",
      whatsapp: "https://chat.whatsapp.com/BhQY8vISMNu9h3ulGp1MwG"
    }
  },
  services: [
    {
      id: "s1",
      title: "Systematic Review & Meta-Analysis Projects",
      description: "Full research lifecycle management following established reporting and authorship guidelines.",
      icon: "Search",
      longDescription: "We design, conduct, and publish systematic reviews and meta-analyses. BIR manages the formulation of research questions, literature search strategies, quality control, statistical synthesis, and journal submission.",
      benefits: ["Question formulation & protocol structuring", "Literature search strategy development", "Methodological oversight", "Statistical synthesis (meta-analysis)", "Peer-review revision support"]
    },
    {
      id: "s2",
      title: "Research Mentorship for Trainees",
      description: "Structured guidance for IMGs, medical students, and residents to gain real research experience.",
      icon: "GraduationCap",
      longDescription: "Guided mentorship for early-career clinicians. Participants gain hands-on exposure to high-quality reviews with structured orientation, defined expectations, and academic supervision throughout the project.",
      benefits: ["Hands-on clinical exposure", "Skill development", "Methodological understanding", "Ethical authorship guidance", "Weekly supervised check-ins"]
    },
    {
      id: "s3",
      title: "Institutional & Consultant Collaborations",
      description: "Strategic partnerships with academic groups and senior consultants on a case-by-case basis.",
      icon: "Users",
      longDescription: "We collaborate with institutions and senior consultants, offering support with planning, evidence synthesis for clinical purposes, and manuscript development support to ensure alignment with academic standards.",
      benefits: ["Strategic project planning", "Evidence synthesis for institutions", "Manuscript development", "Feasibility analysis", "Senior consultant alignment"]
    },
    {
      id: "s4",
      title: "End-to-End Publication Support",
      description: "Centralized coordination ensuring consistent timelines and transparent academic communication.",
      icon: "ShieldCheck",
      longDescription: "For all projects, BIR provides coordination to ensure academic integrity and high-quality outputs. We focus on ethical, contribution-based collaboration and long-term academic credibility.",
      benefits: ["Consistent project timelines", "Transparent communication", "High-quality final outputs", "Integrity auditing", "Non-ghostwriting commitment"]
    }
  ],
  caseStudies: [
    {
      id: "pub-aki",
      title: "Predictive Performance and Clinical Utility of AI for Hospital-Acquired AKI",
      category: "Nephrology & AI",
      image: "https://images.unsplash.com/photo-1579154273811-c9111481896d?auto=format&fit=crop&q=80&w=1000",
      problem: "Identifying patients at high risk for Hospital-Acquired Acute Kidney Injury (HA-AKI) early enough for effective intervention remains a significant challenge in critical care.",
      solution: "A systematic review and meta-analysis evaluating the predictive performance and clinical utility of diverse AI models in the inpatient setting.",
      outcome: "Project in Progress. Aims to synthesize global evidence to define the current state of AI implementation in nephrology.",
      tags: ["Nephrology", "AI", "Critical Care", "Meta-Analysis"],
      link: ""
    },
    {
      id: "pub1",
      title: "AI-Driven Predictive CGM for Hypoglycemia Prevention",
      category: "Endocrinology & AI",
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1000",
      problem: "Standard Continuous Glucose Monitoring (CGM) often lacks sufficient predictive accuracy for early hypoglycemia detection.",
      solution: "A systematic review and meta-analysis of randomized evidence to evaluate the clinical impact of AI-driven predictive alerts.",
      outcome: "Published in Healthcare Bulletin. Demonstrated significant reduction in hypoglycemic episodes via proactive AI-driven interventions.",
      tags: ["Endocrinology", "AI", "Meta-Analysis"],
      link: "https://healthcare-bulletin.co.uk/article/ai-driven-predictive-continuous-glucose-monitoring-for-hypoglycemia-prevention-a-systematic-review-and-meta-analysis-of-randomized-evidence-4668/"
    },
    {
      id: "pub2",
      title: "AI-Enabled ECG for Prediction of Paroxysmal Atrial Fibrillation",
      category: "Cardiology & AI",
      image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=1000",
      problem: "Identifying paroxysmal atrial fibrillation (PAF) during normal sinus rhythm is a major clinical challenge.",
      solution: "A systematic review and meta-analysis of external validation studies evaluating AI algorithms applied to standard sinus rhythm ECGs.",
      outcome: "Published in Healthcare Bulletin. Evidence supports AI-ECG as a powerful tool for identifying patients at high risk of PAF from a single sinus rhythm recording.",
      tags: ["Cardiology", "AI", "ECG", "Meta-Analysis"],
      link: "https://healthcare-bulletin.co.uk/article/artificial-intelligence-enabled-electrocardiography-in-sinus-rhythm-for-prediction-of-paroxysmal-atrial-fibrillation-a-systematic-review-and-meta-analysis-of-external-validation-studies-4696/"
    },
    {
      id: "pub3",
      title: "ML-Based Early Warning vs. Clinical Scoring for Sepsis",
      category: "Critical Care & AI",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1000",
      problem: "Standard clinical scoring systems for sepsis (like qSOFA) often suffer from low sensitivity or delayed detection in acute settings.",
      solution: "A systematic review and meta-analysis of implementation trials comparing Machine Learning-Based Early Warning Systems (ML-EWS) to standard care.",
      outcome: "Published in Healthcare Bulletin. Findings suggest that ML-EWS significantly improves lead time for sepsis intervention and reduces associated clinical deterioration.",
      tags: ["Sepsis", "Machine Learning", "Critical Care", "Meta-Analysis"],
      link: "https://healthcare-bulletin.co.uk/article/machine-learning-based-early-warning-systems-vs-standard-clinical-scoring-for-sepsis-prediction-a-systematic-review-and-meta-analysis-of-implementation-trials-4724/"
    },
    {
      id: "pub4",
      title: "DES vs. DEB in Small Coronary Artery Disease",
      category: "Cardiology",
      image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=1000",
      problem: "Comparative efficacy of drug-eluting stents (DES) and drug-eluting balloons (DEB) in patients with small coronary artery disease remains a point of clinical debate.",
      solution: "A systematic review and meta-analysis of randomized controlled trials (RCTs) comparing DES and DEB specifically for small vessel CAD.",
      outcome: "Published in Healthcare Bulletin. Provides comprehensive evidence on clinical outcomes and procedural success rates for both interventional strategies.",
      tags: ["Cardiology", "CAD", "Stents", "Balloons", "Meta-Analysis"],
      link: "https://healthcare-bulletin.co.uk/article/drug-eluting-stents-vs-drug-eluting-balloons-in-small-coronary-artery-disease-a-systematic-review-and-meta-analysis-of-randomized-controlled-trials-4781/"
    }
  ],
  upcomingPapers: [
    {
      id: "up-aki",
      title: "Predictive Performance and Clinical Utility of AI for Hospital-Acquired AKI",
      domain: "Nephrology / AI",
      description: "A high-impact systematic review and meta-analysis evaluating the predictive performance and clinical utility of AI models for hospital-acquired acute kidney injury. We are building the data extraction team.",
      status: "Recruiting",
      requiredBackground: "Medical Student / IMG / Nephrology Resident",
      spots: 5
    },
    {
      id: "up1",
      title: "SGLT2 Inhibitors in Non-Diabetic Heart Failure",
      domain: "Cardiology / Nephrology",
      description: "A comprehensive systematic review investigating the cross-organ benefits of SGLT2 inhibitors. We are currently recruiting data extraction specialists.",
      status: "Recruiting",
      requiredBackground: "Medical Student / IMG / Resident",
      spots: 4
    }
  ],
  team: [
    {
      id: "t1",
      name: "Dr. Roshan",
      role: "Founder & Lead Researcher",
      bio: "Visionary leader dedicated to ethical research mentorship and high-impact medical publications.",
      image: "https://picsum.photos/seed/roshan/400/400",
      social: { linkedin: "https://linkedin.com" }
    }
  ],
  blogs: [],
  submissions: [],
  enrollments: []
};
