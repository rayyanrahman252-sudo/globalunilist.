"use client";
import React, { useState, useMemo } from "react";
import { ContainerScroll } from "../components/ui/container-scroll-animation";

// ==========================================
// SYSTEM TYPE INTERFACE DEFINITIONS
// ==========================================

interface ScholarshipTier {
  name: string;
  benefits: string;
  qualifications: {
    alevel: string;
    ib: string;
    apsat: string;
    hsc: string;
  };
  fundingType: "full-waiver-beyond" | "partial-waiver" | "self-funded";
}

interface UniversityProfile {
  name: string;
  tier: "S-Tier" | "A-Tier" | "B-Tier" | "C-Tier";
  appFee: string;
  tuition: string;
  courses: string[];
  link: string;
  roi: {
    "full-waiver-beyond": "Excellent" | "Good" | "Medium" | "Bad" | "Worst";
    "partial-waiver": "Excellent" | "Good" | "Medium" | "Bad" | "Worst";
    "self-funded": "Excellent" | "Good" | "Medium" | "Bad" | "Worst";
  };
  pros: string[];
  cons: string[];
  strategicOverview: string;
  tiers: ScholarshipTier[];
}

interface RegionBlock {
  region: string;
  regionalPros: string[];
  regionalCons: string[];
  regionalWorkCultureNote: string;
  universities: UniversityProfile[];
}

// ==========================================
// MASTER ADMISSIONS & SCHOLARSHIP ENCYCLOPEDIA
// ==========================================

const globalScholarshipDatabase: RegionBlock[] = [
  {
    region: "Hong Kong",
    regionalPros: [
      "World top 50 university clusters using English as the primary instruction medium.",
      "Highly streamlined, grade-heavy metrics targeting raw board percentages.",
      "Lower daily conversational language barrier compared directly to Japan or South Korea."
    ],
    regionalCons: [
      "Severely intense, high-pressure academic and corporate workspace culture loops.",
      "Cramped living conditions with exceptionally high off-campus rental markets.",
      "Cantonese fluency barriers exist when trying to secure non-corporate local post-grad roles."
    ],
    regionalWorkCultureNote: "Grade-Heavy Track: Raw academic board records dictate funding. Extracurriculars carry almost zero weight unless they are major international Olympiad titles.",
    universities: [
      {
        name: "University of Hong Kong (HKU)",
        tier: "S-Tier",
        appFee: "600 HKD",
        tuition: "224,000 HKD / Year (Non-STEM) // 249,000 HKD / Year (STEM Faculties)",
        link: "https://admissions.hku.hk/fees-and-scholarships/scholarships",
        courses: ["Medicine", "Engineering", "Business", "Economics", "Biotech"],
        roi: { "full-waiver-beyond": "Excellent", "partial-waiver": "Good", "self-funded": "Medium" },
        pros: ["Highest local alumni networking leverage", "Strong financial sector placement pathways"],
        cons: ["Intense structural grading curves on internal examinations"],
        strategicOverview: "HKU implements a strict automated merit evaluation matrix based on enrollment streams. Securing World/Country Highest in A-Levels significantly optimizes top funding.",
        tiers: [
          {
            name: "Presidential / Top Merit Track",
            benefits: "100% Tuition Waiver + Full Residential Accommodation Stipend",
            qualifications: { alevel: "5A*", ib: "44-45 Points", apsat: "GPA 4.0 + 4+ APs (Score 5) + SAT 1550+", hsc: "GPA 5.0 (Golden Merit Profile)" },
            fundingType: "full-waiver-beyond"
          },
          {
            name: "Full Tuition Entrance Award",
            benefits: "100% Tuition Fee Waiver (No Housing Allowance)",
            qualifications: { alevel: "4A*", ib: "42-43 Points", apsat: "GPA 3.8 + 3+ APs (Score 5) + SAT 1500+", hsc: "GPA 5.0" },
            fundingType: "full-waiver-beyond"
          },
          {
            name: "Non-Funded Standard Matriculation",
            benefits: "Self-Funded Status (Standard Base Fees Apply)",
            qualifications: { alevel: "3A Baseline", ib: "36 Points Baseline", apsat: "GPA 3.5 + SAT 1400+", hsc: "GPA 4.5" },
            fundingType: "self-funded"
          }
        ]
      },
      {
        name: "Chinese University of Hong Kong (CUHK)",
        tier: "S-Tier",
        appFee: "450 HKD",
        tuition: "214,000 HKD / Year",
        link: "https://admission.cuhk.edu.hk/finance.html",
        courses: ["Engineering", "Business", "Economics", "Medicine", "Biotech"],
        roi: { "full-waiver-beyond": "Excellent", "partial-waiver": "Good", "self-funded": "Medium" },
        pros: ["Expansive, naturally scenic integrated campus environment", "Excellent specialized research hub connections"],
        cons: ["Strict minimum cumulative GPA parameters required annually for renewal tracking"],
        strategicOverview: "CUHK rewards pure academic excellence with massive automated funding loops. Offers are historically locked at entry with fixed guidelines.",
        tiers: [
          {
            name: "Full-Ride Excellence Track",
            benefits: "100% Tuition Waiver + Fully Subsidized Living & Hostel Allowance",
            qualifications: { alevel: "5A*", ib: "44+ Points", apsat: "GPA 4.0 + 4+ APs (Score 5) + SAT 1550+", hsc: "GPA 5.0 (Top Board Percentiles)" },
            fundingType: "full-waiver-beyond"
          },
          {
            name: "Full Tuition Waiver Only",
            benefits: "100% Core Tuition Fee Exemption Matrix",
            qualifications: { alevel: "4A*", ib: "41-43 Points", apsat: "GPA 3.8 + 3+ APs (Score 5) + SAT 1500+", hsc: "GPA 5.0" },
            fundingType: "full-waiver-beyond"
          }
        ]
      },
      {
        name: "Hong Kong University of Science and Technology (HKUST)",
        tier: "S-Tier",
        appFee: "600 HKD",
        tuition: "215,000 HKD / Year",
        link: "https://join.hkust.edu.hk/fees-and-scholarships",
        courses: ["Engineering", "Business", "Economics", "Biotech", "Computing"],
        roi: { "full-waiver-beyond": "Excellent", "partial-waiver": "Good", "self-funded": "Medium" },
        pros: ["Premier international technical infrastructure profiles", "Top tier artificial intelligence laboratory hubs"],
        cons: ["Heavy workload tracking protocols causing prominent academic peer stress"],
        strategicOverview: "Waivers are initially assigned on a 1-year framework, renewable based on high CGPA performance indicators inside the university standard curves.",
        tiers: [
          {
            name: "Full Academic Merit Waiver",
            benefits: "100% Tuition Fee Exemption for 1 Year (Renewable)",
            qualifications: { alevel: "5A*", ib: "44+ Points", apsat: "GPA 4.0 + 4 APs (Score 5) + SAT 1550+", hsc: "GPA 5.0 (Golden Rank)" },
            fundingType: "full-waiver-beyond"
          },
          {
            name: "Half Tuition Merit Waiver",
            benefits: "50% Core Tuition Remission Track (1 Year)",
            qualifications: { alevel: "4A*", ib: "40-43 Points", apsat: "GPA 3.8 + 3 APs (Score 5) + SAT 1480+", hsc: "GPA 5.0" },
            fundingType: "partial-waiver"
          }
        ]
      },
      {
        name: "The Hong Kong Polytechnic University (PolyU)",
        tier: "S-Tier",
        appFee: "450 HKD",
        tuition: "200,000 HKD / Year",
        link: "https://www.polyu.edu.hk/study/undergraduate/scholarships",
        courses: ["Engineering", "Business", "Economics", "Biotech", "Design"],
        roi: { "full-waiver-beyond": "Excellent", "partial-waiver": "Good", "self-funded": "Medium" },
        pros: ["Unmatched upfront monthly cash stipend tracking for top profiles", "Highly practical application tracks"],
        cons: ["Tuition drops to a steep 200k HKD baseline if academic parameters lapse"],
        strategicOverview: "PolyU stands as one of the most generous international funding providers for high-achieving math and science tracking streams.",
        tiers: [
          {
            name: "Presidential Scholarship Framework",
            benefits: "100% Tuition Waiver + 50,000 HKD Annual Living Allowance",
            qualifications: { alevel: "5A*", ib: "43+ Points", apsat: "GPA 4.0 + 4 APs (Score 5) + SAT 1550+", hsc: "GPA 5.0 (Golden Elite)" },
            fundingType: "full-waiver-beyond"
          },
          {
            name: "Entry Scholarship Scheme",
            benefits: "100% Tuition Waiver + 15,000 HKD Annual Living Allowance",
            qualifications: { alevel: "4A*", ib: "40-42 Points", apsat: "GPA 3.8 + 3 APs (Score 5) + SAT 1500+", hsc: "GPA 5.0" },
            fundingType: "full-waiver-beyond"
          }
        ]
      },
      {
        name: "City University of Hong Kong (CityU)",
        tier: "S-Tier",
        appFee: "450 HKD",
        tuition: "190,000 HKD / Year",
        link: "https://www.cityu.edu.hk/admo/fees-and-scholarships",
        courses: ["Engineering", "Business", "Economics", "Biotech", "Medicine"],
        roi: { "full-waiver-beyond": "Excellent", "partial-waiver": "Good", "self-funded": "Medium" },
        pros: ["Rapidly expanding global research footprints", "Excellent engineering automation complexes"],
        cons: ["Dense, crowded urban layout profiles with high off-campus local rents"],
        strategicOverview: "CityU deploys dedicated global recruitment schemes offering simple, clear grade boundaries to capture competitive international metrics.",
        tiers: [
          {
            name: "Top-Tier International Entrance Allocation",
            benefits: "100% Full Tuition Waiver Protection Matrix",
            qualifications: { alevel: "3A*", ib: "40+ Points", apsat: "GPA 3.9 + 3+ APs + SAT 1500+", hsc: "GPA 5.0" },
            fundingType: "full-waiver-beyond"
          },
          {
            name: "Dean's Partial Merit Track",
            benefits: "50% Base Tuition Remission Coverage",
            qualifications: { alevel: "3A", ib: "38 Points", apsat: "GPA 3.7 + SAT 1420+", hsc: "GPA 4.5" },
            fundingType: "partial-waiver"
          }
        ]
      }
    ]
  },
  {
    region: "Singapore",
    regionalPros: [
      "Consistently ranked #1 in Asia for career development metrics and placement tracking.",
      "Completely English-centric corporate society removing linguistic integration problems.",
      "Unmatched technological funding pools and international corporate hubs."
    ],
    regionalCons: [
      "Admissions processes are highly competitive and heavily holistic (Olympiads/Portfolios mandatory).",
      "The mandatory 3-year MOE Tuition Grant service bond legally mandates local economic corporate service.",
      "Extremely grueling 'Bell Curve' evaluation systems cause prominent peer pressure."
    ],
    regionalWorkCultureNote: "Holistic Selection Profile: Pure grades provide the initial filter check, but ultimate selection requires international profiles or performance records in Olympiad tracking streams.",
    universities: [
      {
        name: "National University of Singapore (NUS)",
        tier: "S-Tier",
        appFee: "20 SGD",
        tuition: "17,550 SGD - 38,200 SGD / Year (Subsidized standard ranges)",
        link: "https://www.nus.edu.sg/oam/scholarships",
        courses: ["Engineering", "Business", "Economics", "Biotech", "Computing"],
        roi: { "full-waiver-beyond": "Excellent", "partial-waiver": "Good", "self-funded": "Medium" },
        pros: ["Top global corporate recruiter indexing rankings", "State-of-the-art facility complexes"],
        cons: ["Fierce internal performance scoring curves among elite cohorts"],
        strategicOverview: "The Science & Technology (S&T) pathway provides standard elite tracking but remains strictly tied to institutional service bond execution protocols.",
        tiers: [
          {
            name: "Science & Technology (S&T) Undergraduate Scholarship",
            benefits: "100% Tuition Waiver + S$6,000 Annual Stipend + Free Housing + S$200 Grant",
            qualifications: { alevel: "4A* + International Olympiad Rank", ib: "43+ Points + Strong Profile", apsat: "GPA 4.0 + 5 APs (Score 5) + SAT 1560+", hsc: "GPA 5.0 + National STEM Award Data" },
            fundingType: "full-waiver-beyond"
          }
        ]
      }
    ]
  },
  {
    region: "Japan",
    regionalPros: [
      "Exceptionally affordable base tuition structures compared directly to Western options.",
      "High cultural footprint, clean infrastructure, and structured national safety grids.",
      "Generous government-backed monthly financial support parameters (MEXT)."
    ],
    regionalCons: [
      "Severe post-graduation language barriers; corporate tracks require advanced business Japanese.",
      "Rigid corporate workplace culture loops with heavy unpaid overtime structural profiles.",
      "Extremely long administrative residency validation loops."
    ],
    regionalWorkCultureNote: "Linguistic Barrier Matrix: English programs exist inside top research clusters, but real career conversion requires mastering business-level Japanese post-graduation.",
    universities: [
      {
        name: "MEXT Scholarship (Undergraduate Embassy Track)",
        tier: "S-Tier",
        appFee: "0 JPY",
        tuition: "0 JPY (Fully Covered by Government)",
        link: "https://www.studyinjapan.go.jp/en/smap-stopj-applications-undergraduate.html",
        courses: ["Engineering", "Business", "Economics", "Biotech"],
        roi: { "full-waiver-beyond": "Excellent", "partial-waiver": "Medium", "self-funded": "Medium" },
        pros: ["Full baseline round-trip flight paths covered by state funding", "Stable monthly cash transfers from the Ministry"],
        cons: ["Highly complex screening processes extending across a full calendar year"],
        strategicOverview: "Applications open around April/May at regional Japanese embassies. Success relies on performance in localized math and language entry examinations.",
        tiers: [
          {
            name: "Full Government Embassy Scholar Allocation",
            benefits: "100% Tuition Exemption + 120,000 JPY Monthly Stipend + Travel Flights",
            qualifications: { alevel: "Pass Embassy Screening Tests", ib: "Predicted 42+ Points / High Screening Rank", apsat: "GPA 4.0 + High Standardized Baseline", hsc: "GPA 5.0 + Entrance Exam Pass" },
            fundingType: "full-waiver-beyond"
          }
        ]
      }
    ]
  },
  {
    region: "South Korea",
    regionalPros: [
      "Massive technological sector investments (Samsung, SK Hynix lab integrations).",
      "Highly digitized urban parameters and convenient infrastructure options.",
      "Automated financial profiling loops for high-scoring STEM candidates."
    ],
    regionalCons: [
      "Fierce peer pressure with deeply conservative hierarchical workplace environments.",
      "Fluency in professional Korean (TOPIK levels) is mandatory for post-grad career placement.",
      "High cultural integration boundaries in standard corporate operational teams."
    ],
    regionalWorkCultureNote: "Workplace Dynamics: Technical setups are world-class, but long operational office hours and rigid seniority frameworks characterize the localized work culture.",
    universities: [
      {
        name: "KAIST",
        tier: "S-Tier",
        appFee: "80,000 KRW",
        tuition: "6,800,000 KRW / Year",
        link: "https://admission.kaist.ac.kr/intl-undergraduate/scholarships",
        courses: ["Engineering", "Biotech", "Computing", "Economics"],
        roi: { "full-waiver-beyond": "Excellent", "partial-waiver": "Good", "self-funded": "Medium" },
        pros: ["Premier technological incubator center in South Korea", "Automated waiver checking systems"],
        cons: ["High focus tracking protocols can feel isolating inside remote campuses"],
        strategicOverview: "KAIST screens applicants automatically during core admissions processing, removing separate package documentation requirements.",
        tiers: [
          {
            name: "KAIST International Student Scholarship",
            benefits: "100% Tuition Waiver for 8 Semesters + 350,000 KRW Monthly Living Stipend + Health Cover",
            qualifications: { alevel: "4A* or 3A* with exceptional math records", ib: "41+ Points", apsat: "GPA 3.9 + SAT 1520+ with AP Calculus/Physics", hsc: "GPA 5.0" },
            fundingType: "full-waiver-beyond"
          }
        ]
      }
    ]
  },
  {
    region: "Canada",
    regionalPros: [
      "Highly stable society with structured post-graduation immigration (PGWP) and PR pathways.",
      "Exceptional multi-cultural cities, safe environments, and high standard of student life.",
      "Degrees hold absolute, elite global corporate recognition across North America and Europe."
    ],
    regionalCons: [
      "Extremely expensive baseline tuition frameworks for non-funded international undergrads.",
      "Harsh, prolonged freezing winter climates across major provinces.",
      "Full-ride scholarships are exceptionally rare and require deep school nominations or portfolios."
    ],
    regionalWorkCultureNote: "North American Matrix: Full undergraduate rides are highly limited and fiercely competitive. Strong extracurricular profiles, leadership, and analytical personal essays are heavily weighed alongside 3-4 A* grades.",
    universities: [
      {
        name: "University of Toronto (UofT)",
        tier: "S-Tier",
        appFee: "180 CAD",
        tuition: "61,720 CAD - 65,410 CAD / Year",
        link: "https://pearson.utoronto.ca/",
        courses: ["Medicine", "Engineering", "Business", "Biotech", "Computer Science"],
        roi: { "full-waiver-beyond": "Excellent", "partial-waiver": "Good", "self-funded": "Bad" },
        pros: ["Consistently ranked #1 in Canada", "Global epicenter for AI research and medicine infrastructure"],
        cons: ["Massive campus structure can feel cold and highly competitive for grading slots"],
        strategicOverview: "The Lester B. Pearson International Scholarship covers 100% of all student parameters but strictly requires a formal school nomination blueprint.",
        tiers: [
          {
            name: "Lester B. Pearson International Scholarship",
            benefits: "100% Tuition Waiver + Books Coverage + Residence Fees + Incidental Allowances",
            qualifications: { alevel: "4A* + Explicit School Nomination", ib: "43-45 Points", apsat: "GPA 4.0 + 5 APs (Score 5) + SAT 1560+", hsc: "GPA 5.0 (Golden Merit Profile)" },
            fundingType: "full-waiver-beyond"
          }
        ]
      },
      {
        name: "University of British Columbia (UBC)",
        tier: "S-Tier",
        appFee: "150 CAD",
        tuition: "44,940 CAD - 57,660 CAD / Year",
        link: "https://you.ubc.ca/financial-planning/scholarships-awards-international-students/",
        courses: ["Engineering", "Business", "Economics", "Biotech", "Computer Science"],
        roi: { "full-waiver-beyond": "Excellent", "partial-waiver": "Good", "self-funded": "Bad" },
        pros: ["Breathtaking coastal campus infrastructure", "Unrivaled tech and sustainability placement arcs"],
        cons: ["Extremely expensive off-campus housing markets across Vancouver"],
        strategicOverview: "The International Scholars Program features major need-based awards like the Karen McKellin and Donald A. Wehrung awards to balance full financial need.",
        tiers: [
          {
            name: "International Scholars Program (Need-Based Full Ride)",
            benefits: "Full Tuition Waiver + Living Expenses adjusted dynamically to full family need deficit",
            qualifications: { alevel: "3A* - 4A* + Proven Financial Need Profile", ib: "41+ Points + Need Verification", apsat: "GPA 3.9 + 4+ APs + SAT 1520+", hsc: "GPA 5.0" },
            fundingType: "full-waiver-beyond"
          }
        ]
      },
      {
        name: "McGill University",
        tier: "S-Tier",
        appFee: "175 CAD",
        tuition: "31,500 CAD - 63,000 CAD / Year",
        link: "https://www.mcgill.ca/undergraduate-admissions/scholarships",
        courses: ["Medicine", "Engineering", "Business", "Biotech", "Economics"],
        roi: { "full-waiver-beyond": "Excellent", "partial-waiver": "Good", "self-funded": "Medium" },
        pros: ["Unrivaled academic prestige historical record ('Harvard of Canada')", "Vibrant cultural city placement in Montreal"],
        cons: ["Winters are brutally freezing; local integration requires navigating French speaking nodes"],
        strategicOverview: "McGill uses entrance scholarships and major renewable merit awards based heavily on centralized test profiles.",
        tiers: [
          {
            name: "Major Renewable Entrance Scholarship",
            benefits: "Up to 12,000 CAD per year (Renewable for 4 years)",
            qualifications: { alevel: "3A* - 4A* with top percentile averages", ib: "42+ Points", apsat: "GPA 4.0 + SAT 1540+ or ACT 34+", hsc: "GPA 5.0" },
            fundingType: "partial-waiver"
          }
        ]
      },
      {
        name: "University of Waterloo",
        tier: "S-Tier",
        appFee: "160 CAD",
        tuition: "48,000 CAD - 66,000 CAD / Year",
        link: "https://uwaterloo.ca/undergraduate-admissions/scholarships",
        courses: ["Engineering", "Computer Science", "Business", "Mathematics"],
        roi: { "full-waiver-beyond": "Excellent", "partial-waiver": "Excellent", "self-funded": "Good" },
        pros: ["World-leading North American Co-op Internship system", "Direct pipeline tracks into Google, Meta, and Apple tech corridors"],
        cons: ["Extreme focus on professional job hunting can cause accelerated mental burnout loops"],
        strategicOverview: "While full rides are rare here, the internal Co-op earnings combined with structural entrance awards allow students to self-subsidize rapidly.",
        tiers: [
          {
            name: "President's Scholarship of Distinction",
            benefits: "Entrance awards and research grants scaling up to partial tuition coverage",
            qualifications: { alevel: "3A* - 4A* + Outstanding Euclid Math Contest score", ib: "40+ Points", apsat: "GPA 4.0 + SAT 1530+", hsc: "GPA 5.0" },
            fundingType: "partial-waiver"
          }
        ]
      },
      {
        name: "University of Alberta",
        tier: "A-Tier",
        appFee: "140 CAD",
        tuition: "32,400 CAD - 41,500 CAD / Year",
        link: "https://www.ualberta.ca/admissions/international/tuition-and-scholarships",
        courses: ["Engineering", "Biotech", "Business", "Computing"],
        roi: { "full-waiver-beyond": "Excellent", "partial-waiver": "Good", "self-funded": "Medium" },
        pros: ["Global powerhouse for petroleum engineering and advanced machine learning models", "Lower provincial cost structures"],
        cons: ["Edmonton geographical placement is subject to extreme polar winter phases"],
        strategicOverview: "Alberta tracks international metrics automatically, dispensing top awards like the Gold Standard pipeline to highly rated portfolios.",
        tiers: [
          {
            name: "President's International Distinction Scholarship",
            benefits: "Up to 120,000 CAD disbursed over 4 years operational timeline",
            qualifications: { alevel: "4A*", ib: "42+ Points + Outstanding Essay elements", apsat: "GPA 4.0 + High SAT profile", hsc: "GPA 5.0" },
            fundingType: "full-waiver-beyond"
          }
        ]
      },
      {
        name: "York University",
        tier: "A-Tier",
        appFee: "130 CAD",
        tuition: "34,800 CAD - 41,200 CAD / Year",
        link: "https://yorku.ca/finance/scholarships",
        courses: ["Business", "Economics", "Psychology", "Media"],
        roi: { "full-waiver-beyond": "Excellent", "partial-waiver": "Good", "self-funded": "Medium" },
        pros: ["Generous upfront financial funding allocations for international applicants", "Elite Schulich School of Business"],
        cons: ["Main campus sits outside Toronto central hubs, requiring transit planning"],
        strategicOverview: "York stands as a top destination for South Asian students due to its accessible high-value international scholarships.",
        tiers: [
          {
            name: "Global Leader of Tomorrow Award",
            benefits: "80,000 CAD total value allocated across 4 years framework validation",
            qualifications: { alevel: "3A* + Standout reference maps", ib: "38+ Points", apsat: "GPA 3.8 + SAT 1480+", hsc: "GPA 5.0" },
            fundingType: "full-waiver-beyond"
          }
        ]
      },
      {
        name: "McMaster University / Western University",
        tier: "A-Tier",
        appFee: "150 CAD",
        tuition: "38,000 CAD - 49,000 CAD / Year",
        link: "https://registrar.mcmaster.ca/financial-aid/",
        courses: ["Health Sciences", "Medicine", "Nursing", "Business"],
        roi: { "full-waiver-beyond": "Excellent", "partial-waiver": "Good", "self-funded": "Medium" },
        pros: ["McMaster holds legendary world renown for Health Sciences & Medicine", "Western's Ivey Business School is ultra-elite"],
        cons: ["Fierce competitive cutoff tiers applied to non-local applicants"],
        strategicOverview: "Standard institutional entry prizes apply automated adjustments to high scoring portfolios.",
        tiers: [
          {
            name: "Provost International Merit Award",
            benefits: "Partial tuition offset credits up to 10,000 CAD per annum",
            qualifications: { alevel: "3A* - 4A*", ib: "40+ Points", apsat: "GPA 4.0 + SAT 1510+", hsc: "GPA 5.0" },
            fundingType: "partial-waiver"
          }
        ]
      },
      {
        name: "High-Probability Strategic Alternatives (Lakehead / Laurentian / Manitoba)",
        tier: "B-Tier",
        appFee: "100 CAD",
        tuition: "26,500 CAD - 35,000 CAD / Year",
        link: "https://www.umanitoba.ca/financial-aid-and-awards",
        courses: ["Engineering", "Business", "Nursing", "Health Sciences"],
        roi: { "full-waiver-beyond": "Excellent", "partial-waiver": "Excellent", "self-funded": "Good" },
        pros: ["Significantly less competitive grade thresholds for major entrance tracking awards", "Accelerated regional PR immigration paths"],
        cons: ["Located in smaller regional or mid-sized municipal spaces away from mega-cities"],
        strategicOverview: "These universities are highly recommended for matching robust partial or full tuition allocations with lower localized baseline expenses.",
        tiers: [
          {
            name: "International Strategic Entrance Merit Award",
            benefits: "Renewable packages masking up to 50%-80% of core tuition parameters",
            qualifications: { alevel: "3A / 2A* 1A", ib: "36+ Points", apsat: "GPA 3.7 + SAT 1420+", hsc: "GPA 4.5" },
            fundingType: "partial-waiver"
          }
        ]
      }
    ]
  },
  {
    region: "United Kingdom",
    regionalPros: [
      "Home to historic, globally elite triple-A institutional profiles (Oxbridge/Imperial/UCL).",
      "Accelerated 3-year Bachelor architecture paths optimize early market scaling.",
      "Clear, formal Graduate Route stay-back visa frameworks for non-EU career execution."
    ],
    regionalCons: [
      "Extremely expensive baseline non-EU tuition tiers with high localized text inflation metrics.",
      "Living expenses inside London metrics require heavy monthly capital deployment.",
      "Full living stipends are exceptionally rare at the undergraduate level compared to research routes."
    ],
    regionalWorkCultureNote: "Pure Merit Track: Portfolios require hyper-focused internal academic references and specialized testing indices (like the STEP or ESAT exams for top STEM targets).",
    universities: [
      {
        name: "University of Oxford / University of Cambridge",
        tier: "S-Tier",
        appFee: "60 GBP",
        tuition: "38,500 GBP - 48,600 GBP / Year",
        link: "https://www.ox.ac.uk/admissions/undergraduate/fees-and-funding/oxford-support",
        courses: ["Medicine", "Engineering", "Economics", "Computing", "Natural Sciences"],
        roi: { "full-waiver-beyond": "Excellent", "partial-waiver": "Good", "self-funded": "Medium" },
        pros: ["Unmatched institutional pedigree history on global boards", "Superb hyper-exclusive tutorial learning systems"],
        cons: ["Fierce admissions tracking matrices including mandatory admissions testing and intense academic interviews"],
        strategicOverview: "Full coverage paths require specific regional funding streams or competitive global foundation tracking vectors (e.g., Reach Oxford scholarship frameworks).",
        tiers: [
          {
            name: "Reach Oxford / Central Trust Scholarship",
            benefits: "100% Tuition Waiver + Free Residential Accommodation Allowances + Return Flights",
            qualifications: { alevel: "4A* - 5A* + Exceptional Test Scores", ib: "43-45 Points", apsat: "5+ APs (Score 5) + SAT 1560+", hsc: "GPA 5.0 (Golden Tier + Entrance Exam Distinction)" },
            fundingType: "full-waiver-beyond"
          }
        ]
      },
      {
        name: "Imperial College London / University College London (UCL) / LSE / KCL",
        tier: "S-Tier",
        appFee: "27.50 GBP",
        tuition: "35,000 GBP - 44,000 GBP / Year",
        link: "https://www.imperial.ac.uk/students/fees-and-funding/scholarships/",
        courses: ["Engineering", "Computing", "Biotech", "Economics", "Medicine"],
        roi: { "full-waiver-beyond": "Excellent", "partial-waiver": "Good", "self-funded": "Medium" },
        pros: ["World-class computational hubs nestled in corporate London tech regions", "High corporate engineering placement indices"],
        cons: ["Extremely expensive housing markets require significant financial balancing if un-subsidized"],
        strategicOverview: "President's scholarships and global excellence programs reward high standardized profiles with partial or complete waiver segments.",
        tiers: [
          {
            name: "President's Undergraduate Scholarship",
            benefits: "Full Tuition Coverage up to 100% Core Values (Highly Competitive Allocation)",
            qualifications: { alevel: "4A*", ib: "42+ Points", apsat: "GPA 4.0 + 4+ APs (Score 5) + SAT 1540+", hsc: "GPA 5.0" },
            fundingType: "full-waiver-beyond"
          }
        ]
      }
    ]
  },
  {
    region: "Germany",
    regionalPros: [
      "Public university system features 0 EUR baseline tuition policies for everyone globally.",
      "World-renowned practical and technical engineering frameworks (TU9 systems).",
      "Streamlined stay-back immigration routes support fast integration into top industrial hubs."
    ],
    regionalCons: [
      "95% of Bachelor's configurations require full C1 Goethe level German language fluency.",
      "The state requires locking 11,208 EUR into a personal blocked account (Sperrkonto) for visa validation.",
      "Studienkolleg (a 13th-year prep module) is often mandatory depending on subject matching matrices."
    ],
    regionalWorkCultureNote: "Subsidized Model: Free education removes traditional full-ride scholarship structures. The primary metric to verify is clearing the language barrier and saving living funds.",
    universities: [
      {
        name: "Technical University of Munich (TUM) / LMU / Heidelberg / RWTH Aachen / Humboldt",
        tier: "S-Tier",
        appFee: "100 EUR",
        tuition: "0 EUR / Year (Public University System Fee exemptions apply; administrative semester fees around 150-300 EUR)",
        link: "https://www.tum.de/en/studies/fees/scholarships",
        courses: ["Engineering", "Computing", "Biotech", "Physics", "Business"],
        roi: { "full-waiver-beyond": "Excellent", "partial-waiver": "Excellent", "self-funded": "Excellent" },
        pros: ["The premiere technological engine of Germany", "Direct research links with continental industrial engineering sectors"],
        cons: ["Extremely difficult local rental markets across Munich; strict exams filter students out heavily after year 1"],
        strategicOverview: "Tuition is free by default. High-achieving candidates can apply for the DAAD matrix or Deutschlandstipendium to secure small living offsets.",
        tiers: [
          {
            name: "Deutschlandstipendium Allocation Route",
            benefits: "300 EUR per month structural cash allowance (Tuition is already 0 EUR)",
            qualifications: { alevel: "Perfect conversion scores to the German Abitur (1.0 index) + Local integration proofs", ib: "42+ Points", apsat: "GPA 4.0 + High Test Baselines", hsc: "GPA 5.0 + Native language test distinction" },
            fundingType: "partial-waiver"
          }
        ]
      }
    ]
  },
  {
    region: "Italy",
    regionalPros: [
      "High school or A-Level board exam scores do not dictate your scholarship tier results.",
      "Waivers are predominantly needs-based, scaling directly with verified financial backgrounds.",
      "Extremely strong English-taught Medical tracks (IMAT pipeline networks)."
    ],
    regionalCons: [
      "Extreme administrative bureaucracy requiring massive legal verification of international tax files.",
      "Regional cash stipend disbursements are often delayed by 3-4 months post-arrival.",
      "Severe conversational language gaps when interacting with local civic registry offices."
    ],
    regionalWorkCultureNote: "Entrance-Driven Hub: High school grading metrics function only as a basic entry requirement check. True admission and funding depend entirely on localized entrance testing scores and need verification.",
    universities: [
      {
        name: "Italian Public Universities (Bologna / Politecnico di Milano / Sapienza / Padua)",
        tier: "S-Tier",
        appFee: "30 EUR",
        tuition: "156 EUR - 3,000 EUR / Year (Drops to €0 with DSU allocation)",
        link: "https://www.dsu.toscana.it/en/web/ardsu/-/scholarship-and-other-services",
        courses: ["Medicine", "Engineering", "Business", "Economics", "Biotech"],
        roi: { "full-waiver-beyond": "Excellent", "partial-waiver": "Excellent", "self-funded": "Good" },
        pros: ["MEDICINE SECTOR VECTOR: Access to full state-backed English-taught medical tracks via IMAT mapping", "High equity financial scaling templates"],
        cons: ["Mandatory out-of-pocket survival capital required to navigate initial payout delay loops"],
        strategicOverview: "Applicants must clear specific national testing arrays (IMAT/TOLC) and generate an ISEE Parificato document to verify financial need tracking.",
        tiers: [
          {
            name: "DSU Regional Need Scholarship Alignment",
            benefits: "100% Tuition Waiver (€0 Fees) + Free Canteen Meals + Free University Housing Allocation + €7,000 Annual Cash Allowance",
            qualifications: { alevel: "Pass IMAT/TOLC Exam + Verified ISEE Income Profile under €25,000", ib: "Pass Entrance Exam + Needs Profile Verification", apsat: "Pass Entrance Exam + Needs Documentation", hsc: "Pass IMAT/TOLC + Financial Background check" },
            fundingType: "full-waiver-beyond"
          }
        ]
      }
    ]
  },
  {
    region: "Netherlands",
    regionalPros: [
      "Unmatched density of high-ranking English-taught undergraduate curriculums in Europe.",
      "Highly innovative, collaborative problem-based learning models.",
      "Thriving international technology and commerce hubs (Amsterdam/Rotterdam/Delft)."
    ],
    regionalCons: [
      "Extreme nationwide student housing crisis making accommodation incredibly difficult to lock down.",
      "Non-EU international tuition fees do not receive the standard domestic subsidies.",
      "Fierce global competition for a tiny collection of localized university talent grants."
    ],
    regionalWorkCultureNote: "Housing Constrained Hub: Academic processing paths are streamlined, but applications must be filed exceptionally early to secure restricted student housing lotteries.",
    universities: [
      {
        name: "Delft University of Technology (TU Delft) / Amsterdam / Leiden / Eindhoven / Erasmus",
        tier: "S-Tier",
        appFee: "100 EUR",
        tuition: "16,500 EUR - 21,000 EUR / Year",
        link: "https://www.tudelft.nl/en/education/practical-matters/scholarships",
        courses: ["Engineering", "Computing", "Business", "Economics", "Biotech"],
        roi: { "full-waiver-beyond": "Excellent", "partial-waiver": "Good", "self-funded": "Medium" },
        pros: ["TU Delft stands as a world elite tier for mechanical/aerospace engineering engineering tracks", "Superb industry co-op placements"],
        cons: ["Finding local apartments is notoriously stressful without university-backed slots"],
        strategicOverview: "Top non-EU candidates can apply for elite merit frameworks like the Amsterdam Merit Scholarship or specific institutional tech trust allocations.",
        tiers: [
          {
            name: "Amsterdam Merit / High-Excellence Scholarship",
            benefits: "100% Full Tuition Waiver tracking matching institutional course values",
            qualifications: { alevel: "4A* + Outstanding personal motivation essay tracking analytics", ib: "42+ Points", apsat: "GPA 4.0 + High SAT baseline tracking", hsc: "GPA 5.0 (Top Bracket Portfolio)" },
            fundingType: "full-waiver-beyond"
          }
        ]
      }
    ]
  },
  {
    region: "Switzerland",
    regionalPros: [
      "Home to absolute global powerhouses for science and mechanical tracking (ETH Zurich).",
      "Very low base public tuition fees even for international non-EU students.",
      "Unmatched national laboratory research budgets and high standard of life parameters."
    ],
    regionalCons: [
      "The local cost of living across Zurich and Geneva is exceptionally expensive.",
      "90% of undergraduate tracks require native German or French fluency for entry.",
      "Extremely demanding academic processing metrics with high post-year-one weed-out curves."
    ],
    regionalWorkCultureNote: "Elite STEM Hub: Switzerland offers elite global education at low tuition baselines, meaning budget management focuses primarily on navigating the high local cost of living parameters.",
    universities: [
      {
        name: "ETH Zurich / EPFL Lausanne / Uni Zurich / Uni Geneva",
        tier: "S-Tier",
        appFee: "150 CHF",
        tuition: "1,500 CHF - 1,800 CHF / Year",
        link: "https://ethz.ch/en/studies/financial-matters/scholarships.html",
        courses: ["Engineering", "Computing", "Physics", "Biotech", "Mathematics"],
        roi: { "full-waiver-beyond": "Excellent", "partial-waiver": "Excellent", "self-funded": "Excellent" },
        pros: ["Ranked alongside MIT and Cambridge for raw physical sciences engineering footprint", "Access to top international industrial labs"],
        cons: ["Undergraduate tracks are taught almost exclusively in local national language structures (German/French)"],
        strategicOverview: "Tuition is highly subsidized by the state. Scholarships focus on providing financial living assistance to top academic tracking profiles.",
        tiers: [
          {
            name: "ETH Excellence Living Assistance Track",
            benefits: "Partial living stipend allocations to minimize regional apartment and food expenses",
            qualifications: { alevel: "Perfect board results + Native local language certificate clearance (C1 German/French)", ib: "43+ Points", apsat: "Elite standardized test metrics", hsc: "GPA 5.0 + Strict C1 Level Language Verification" },
            fundingType: "partial-waiver"
          }
        ]
      }
    ]
  },
  {
    region: "France",
    regionalPros: [
      "Elite specialized tracking configurations via highly prestigious Grandes Écoles ecosystems.",
      "Generous state-backed student accommodation subsidies available to foreigners (CAF structures).",
      "Premier European positioning for business administration, fashion, and aeronautics branches."
    ],
    regionalCons: [
      "Complex multi-stage public administration filing loops.",
      "French fluency is highly beneficial for daily structural operations outside international science hubs.",
      "Grandes Écoles tracks require highly specialized entry testing routines."
    ],
    regionalWorkCultureNote: "Grandes Écoles Matrix: Public programs charge subsidized rates, while premium corporate business modules sit under independent fee tracking parameters.",
    universities: [
      {
        name: "École Polytechnique / Sorbonne / HEC Paris / Sciences Po / Paris-Saclay",
        tier: "S-Tier",
        appFee: "100 EUR",
        tuition: "15,000 EUR - 19,000 EUR / Year",
        link: "https://www.polytechnique.edu/en/programmes/bachelor-of-science/fees-and-funding",
        courses: ["Engineering", "Mathematics", "Business", "Economics", "Computing"],
        roi: { "full-waiver-beyond": "Excellent", "partial-waiver": "Good", "self-funded": "Medium" },
        pros: ["École Polytechnique holds legendary status for advanced mathematical branches across Europe", "Highly focused cohort formatting"],
        cons: ["Intense, rigorous competitive oral and written entry reviews"],
        strategicOverview: "Top international portfolios can tap into specific excellence scholarships or corporate foundation grants to neutralize core expenses.",
        tiers: [
          {
            name: "Excellence Entrance Scholarship Scheme",
            benefits: "Tuition waivers scaling up to 50%-100% of core tracking matrices",
            qualifications: { alevel: "4A* + Outstanding mathematical verification scores", ib: "41+ Points", apsat: "GPA 4.0 + Advanced math tracking markers", hsc: "GPA 5.0" },
            fundingType: "full-waiver-beyond"
          }
        ]
      }
    ]
  },
  {
    region: "Hungary",
    regionalPros: [
      "Highly centralized government handling pipelines tracking international student onboarding directly.",
      "Fully English-taught medicine, dentistry, and technical engineering program portfolios.",
      "Affordable urban tracking parameters and low cost of living scales across Europe."
    ],
    regionalCons: [
      "The Hungarian local language profile is exceptionally complex for fast conversational integration.",
      "Fewer non-EU local career conversions compared to Western European corporate nodes.",
      "Rigid internal performance review frameworks with mandatory minimum credit constraints."
    ],
    regionalWorkCultureNote: "Centralized Systems: The Stipendium Hungaricum represents an elite, highly structured pipeline connecting partner nation ministries directly to Hungarian universities.",
    universities: [
      {
        name: "Stipendium Hungaricum (Semmelweis / Debrecen / Eotvos Lorand)",
        tier: "S-Tier",
        appFee: "0 EUR",
        tuition: "0 EUR (Fully Subsidized by State via Ministry Partnership)",
        link: "https://stipendiumhungaricum.hu/",
        courses: ["Medicine", "Engineering", "Business", "Economics", "Biotech"],
        roi: { "full-waiver-beyond": "Excellent", "partial-waiver": "Medium", "self-funded": "Medium" },
        pros: ["MEDICINE SECTOR VECTOR: Access to structured, fully funded medical tracks across Europe", "Smooth structural visa tracking paths"],
        cons: ["Losing your baseline scholarship structure triggers immediate full fee requirements or program cancellation"],
        strategicOverview: "Candidates must secure a primary nomination from their local home Ministry of Education before clearing localized university placement testing components.",
        tiers: [
          {
            name: "Stipendium Hungaricum Full Ride Track",
            benefits: "100% Tuition Waiver + Free University Accommodation/Housing Subsidy + Full Medical Insurance + Monthly Cash Allowance",
            qualifications: { alevel: "Secure Home Ministry Nomination Clearance + Pass Entrance Exam", ib: "Ministry Nomination + Test Pass Criteria", apsat: "Ministry Nomination + University Test Pass", hsc: "Bangladesh MOE Nomination Entry + Oral Test Clear" },
            fundingType: "full-waiver-beyond"
          }
        ]
      }
    ]
  },
  {
    region: "Nordic & Other European Options (Sweden / Finland / Denmark / Spain / Belgium / Austria / Poland)",
    regionalPros: [
      "Highly progressive, clean societies with exceptional research infrastructure profiles (e.g., KTH, KU Leuven, Lund, Aalto).",
      "Very high English fluency index parameters across local civilian populations.",
      "Austria/Poland offer exceptionally low base international fees compared to Western alternatives."
    ],
    regionalCons: [
      "Extremely cold, dark, and prolonged winter cycles across Northern coordinates.",
      "Extremely limited full living stipend frameworks available for international undergraduate students.",
      "High local baseline tax structures and expensive food logistics tracking lines."
    ],
    regionalWorkCultureNote: "Continental Blueprint: These regions prioritize highly independent study models. Strategic candidates leverage localized university global awards or focus on low-fee tuition bases.",
    universities: [
      {
        name: "Nordic & Continental Premium Network (KTH / KU Leuven / Aalto / IE / Copenhagen / Vienna / Warsaw)",
        tier: "A-Tier",
        appFee: "90 EUR",
        tuition: "1,500 EUR - 18,000 EUR / Year (Austria/Poland/Belgium sit under 3k; Nordics sit higher)",
        link: "https://www.kth.se/en/studies/scholarships",
        courses: ["Engineering", "Computing", "Business", "Economics", "Biotech"],
        roi: { "full-waiver-beyond": "Excellent", "partial-waiver": "Good", "self-funded": "Medium" },
        pros: ["KU Leuven and KTH represent top-tier global technical innovation hubs", "Clean, exceptionally secure campus systems"],
        cons: ["Linguistic adaptations are necessary when transitioning to off-campus local professional workplaces"],
        strategicOverview: "Target specialized university-level merit waivers (e.g., KTH Scholarship or Aalto Excellence tracks) to eliminate core international fees.",
        tiers: [
          {
            name: "University Merit Fee Waiver Track",
            benefits: "100% Full Tuition Exemption during the complete program runtime",
            qualifications: { alevel: "3A* - 4A* with top ranking analytical profile data", ib: "40+ Points", apsat: "GPA 3.9 + High standardized score tracking records", hsc: "GPA 5.0" },
            fundingType: "full-waiver-beyond"
          },
          {
            name: "Subsidized Public Entrance Stream",
            benefits: "Access to low base structural public fees (Austria/Poland/Belgium targets)",
            qualifications: { alevel: "3A Baseline / Equivalency checks", ib: "35 Points", apsat: "GPA 3.5 + SAT 1380+", hsc: "GPA 4.5" },
            fundingType: "partial-waiver"
          }
        ]
      }
    ]
  },
  {
    region: "Saudi Arabia",
    regionalPros: [
      "Massive tax-free state-backed research infrastructure investments under Vision 2030.",
      "Extremely generous, comprehensive fully funded international scholarship configurations.",
      "Close logistical flight proximity to South Asian aviation hubs."
    ],
    regionalCons: [
      "Rigid localized employment prioritization tracking (Saudization/Nitaqat favors national citizens).",
      "Rigid career growth tracking for non-citizens in standard corporate sectors.",
      "Extreme summer temperature profiles require significant climate adaptation."
    ],
    regionalWorkCultureNote: "Vision 2030 Research Hub: Offers exceptional fully funded packages globally. Long-term corporate transition, however, navigates strict local hiring quotas.",
    universities: [
      {
        name: "King Fahd University of Petroleum and Minerals (KFUPM)",
        tier: "S-Tier",
        appFee: "0 USD",
        tuition: "0 USD (Fully Subsidized via Full Merit Schemes)",
        link: "https://www.kfupm.edu.sa/",
        courses: ["Petroleum Engineering", "AI", "Computer Science", "Engineering"],
        roi: { "full-waiver-beyond": "Excellent", "partial-waiver": "Medium", "self-funded": "Worst" },
        pros: ["Unrivaled laboratory ecosystems for energy research and advanced robotics", "Incredible learning infrastructure resource setups"],
        cons: ["Fierce competitive candidate filtering for international applicant slots"],
        strategicOverview: "KFUPM provides elite state-backed full-ride configurations to attract high-scoring global engineering profiles.",
        tiers: [
          {
            name: "KFUPM International Full Ride Allocation",
            benefits: "100% Tuition Waiver + Free Campus Housing + Monthly Cash Stipend + Full Travel Flights",
            qualifications: { alevel: "4A* / 5A* + Elite STEM performance tracks", ib: "43+ Points", apsat: "GPA 4.0 + SAT 1550+ with advanced calculus markers", hsc: "GPA 5.0 (Golden Board Rank Profile)" },
            fundingType: "full-waiver-beyond"
          }
        ]
      },
      {
        name: "King Abdullah University of Science and Technology (KAUST)",
        tier: "S-Tier",
        appFee: "0 USD",
        tuition: "0 USD (Fully Subsidized by State)",
        link: "https://www.kaust.edu.sa/en",
        courses: ["AI", "Robotics", "Marine Science", "Biotechnology"],
        roi: { "full-waiver-beyond": "Excellent", "partial-waiver": "Medium", "self-funded": "Worst" },
        pros: ["World-class research endowment assets on the Red Sea coastal layout", "State-of-the-art tech setups"],
        cons: ["Focus tracks are heavily tailored toward high-level graduate paths; strict bachelor screening loops"],
        strategicOverview: "Admitted international research cohorts are automatically fully covered under the state's premium fellowship framework.",
        tiers: [
          {
            name: "KAUST Fellowship Track Alignment",
            benefits: "100% Tuition Waiver + Free Premium Housing + Massive Monthly Cash Stipend + Health Protection",
            qualifications: { alevel: "5A* + Elite analytical portfolio proofs", ib: "44+ Points", apsat: "GPA 4.0 + 5 APs + SAT 1570+", hsc: "GPA 5.0 + Specialized research credentials" },
            fundingType: "full-waiver-beyond"
          }
        ]
      },
      {
        name: "King Saud University / IMSIU / PMU / Princess Nourah / Taibah",
        tier: "A-Tier",
        appFee: "0 USD",
        tuition: "12,000 USD - 22,000 USD / Year (Often completely waived via state programs)",
        link: "https://ksu.edu.sa/en",
        courses: ["Medicine", "Pharmacy", "Engineering", "Business", "Islamic Studies"],
        roi: { "full-waiver-beyond": "Excellent", "partial-waiver": "Medium", "self-funded": "Worst" },
        pros: ["Saudi Arabia's largest public institutional hubs", "Massive medical and surgical research clinics"],
        cons: ["Navigating administrative processing requires patient documentation oversight"],
        strategicOverview: "Deploys targeted external international student scholarship matrices providing full tuition waivers and residential housing offsets.",
        tiers: [
          {
            name: "Saudi Government Flagship Merit Award",
            benefits: "100% Tuition Fee Exemption + Monthly Living Allowance Allowance + Free Hostel Space",
            qualifications: { alevel: "3A* - 4A*", ib: "41+ Points", apsat: "GPA 3.9 + SAT 1510+", hsc: "GPA 5.0" },
            fundingType: "full-waiver-beyond"
          },
          {
            name: "Private Track Entry (PMU / Alternatives)",
            benefits: "Partial tuition reductions based on institutional board parameters",
            qualifications: { alevel: "3A / ABC profiles", ib: "35 Points", apsat: "GPA 3.4 + SAT 1350+", hsc: "GPA 4.5" },
            fundingType: "partial-waiver"
          }
        ]
      }
    ]
  },
  {
    region: "UAE",
    regionalPros: [
      "Completely modern city centers with high safety indexes and tax-free post-grad salary scales.",
      "Massive density of top-tier international branch campuses (UK/US structures).",
      "Streamlined golden visa routing options for standout international graduates."
    ],
    regionalCons: [
      "Most local branch campus awards function as partial tuition discounts rather than complete full rides.",
      "Extremely expensive daily lifestyle, food logistics, and rental frameworks.",
      "Post-graduation career tracks navigate localized hiring quotas."
    ],
    regionalWorkCultureNote: "Commercial Education Centers: Exceptional lifestyle and safety, but full rides are rare. They are concentrated almost entirely inside NYUAD and Khalifa University.",
    universities: [
      {
        name: "New York University Abu Dhabi (NYUAD)",
        tier: "S-Tier",
        appFee: "85 USD",
        tuition: "65,000 USD / Year (Fully waived for selected profiles)",
        link: "https://nyuad.nyu.edu/en/admissions/financial-support.html",
        courses: ["Liberal Arts", "Economics", "Computer Science", "Engineering"],
        roi: { "full-waiver-beyond": "Excellent", "partial-waiver": "Good", "self-funded": "Worst" },
        pros: ["One of the most competitive financial support frameworks globally", "Elite Ivy-adjacent global tracking networks"],
        cons: ["Extremely selective acceptance rate boundaries for non-local portfolios"],
        strategicOverview: "Admissions use a holistic review system. Selected profiles receive full waivers alongside living allowances based on institutional evaluation metrics.",
        tiers: [
          {
            name: "NYUAD Comprehensive Institutional Fellowship",
            benefits: "100% Tuition Waiver + Free Premium Housing + Living Support Stipend + Travel Flights",
            qualifications: { alevel: "4A* - 5A* + Elite Leadership Profile", ib: "43-45 Points", apsat: "GPA 4.0 + 5 APs (Score 5) + SAT 1560+", hsc: "GPA 5.0 (Golden Board Rank) + Analytical Essay Distinction" },
            fundingType: "full-waiver-beyond"
          }
        ]
      },
      {
        name: "Khalifa University",
        tier: "S-Tier",
        appFee: "0 AED",
        tuition: "3,333 AED / Credit Hour (Approx 60,000 AED annually base checks)",
        link: "https://www.ku.ac.ae/scholarships-undergraduate",
        courses: ["Engineering", "AI", "Robotics", "Petroleum Engineering"],
        roi: { "full-waiver-beyond": "Excellent", "partial-waiver": "Medium", "self-funded": "Worst" },
        pros: ["The UAE's premier high-tech scientific research engine", "Direct ties to advanced national laboratories"],
        cons: ["Recent policy updates restrict monthly cash stipends for international undergrad categories"],
        strategicOverview: "Provides automated full tuition waivers directly to high-achieving STEM candidates based on entry test scores.",
        tiers: [
          {
            name: "Presidential Undergraduate Scholarship Track",
            benefits: "100% Full Tuition Waiver Protection Matrix",
            qualifications: { alevel: "4A*", ib: "42+ Points", apsat: "GPA 4.0 + SAT 1540+ with AP Calculus/Physics", hsc: "GPA 5.0 (Science branch concentration focus)" },
            fundingType: "full-waiver-beyond"
          }
        ]
      },
      {
        name: "American University of Sharjah / UAEU / Birmingham Dubai / Middlesex / Wollongong",
        tier: "A-Tier",
        appFee: "400 AED",
        tuition: "55,000 AED - 110,000 AED / Year",
        link: "https://www.aus.edu/admissions/financial-grants-and-scholarships",
        courses: ["Architecture", "Engineering", "Business", "Medicine", "Psychology", "IT", "Media"],
        roi: { "full-waiver-beyond": "Excellent", "partial-waiver": "Medium", "self-funded": "Worst" },
        pros: ["Deep multi-industry prestige across the Middle East", "Clean modern branch installations"],
        cons: ["Waivers usually function as a 20%-50% discount rather than covering living costs"],
        strategicOverview: "Applies multi-tier academic discounts based on standardized entry scores.",
        tiers: [
          {
            name: "Chancellor's Merit Entrance Award Scheme",
            benefits: "Up to 50% partial tuition fee remission blocks",
            qualifications: { alevel: "3A* / 4A*", ib: "40 Points", apsat: "GPA 3.9 + SAT 1500+", hsc: "GPA 5.0" },
            fundingType: "partial-waiver"
          },
          {
            name: "Standard Institutional Academic Discount Token",
            benefits: "15% to 30% ongoing partial tuition fee discounts applied annually",
            qualifications: { alevel: "BBB to ABB profiles", ib: "32 Points", apsat: "GPA 3.4 + SAT 1320+", hsc: "GPA 4.0 / 4.5" },
            fundingType: "partial-waiver"
          }
        ]
      }
    ]
  },
  {
    region: "Qatar",
    regionalPros: [
      "Massive educational investments centralized inside the Education City framework.",
      "Direct access to elite, fully integrated US branch campuses (CMU, Georgetown, Texas A&M).",
      "Generous state-backed funding mechanisms (Qatar Foundation tracking)."
    ],
    regionalCons: [
      "Rigid admissions metrics requiring identical testing standards to parent US campuses.",
      "High baseline living costs outside fully subsidized housing spaces.",
      "Long-term career markets are small and highly focused on energy and defense tracks."
    ],
    regionalWorkCultureNote: "Education City Model: Elite US degree paths combined with generous Middle Eastern funding. Admissions requirements are strictly synchronized with parent US campus expectations.",
    universities: [
      {
        name: "Qatar University",
        tier: "S-Tier",
        appFee: "200 QAR",
        tuition: "40,000 QAR / Year (Approx automated credit mapping baselines)",
        link: "http://www.qu.edu.qa/students/admission/scholarships",
        courses: ["Engineering", "Medicine", "Business", "Petroleum Studies"],
        roi: { "full-waiver-beyond": "Excellent", "partial-waiver": "Good", "self-funded": "Worst" },
        pros: ["Qatar's premier national flagship university asset", "Generous international student packages"],
        cons: ["Relative grading scales create competitive internal pathways"],
        strategicOverview: "Qatar University deploys automated full tuition waivers alongside cash living stipends to secure top-tier regional international talent.",
        tiers: [
          {
            name: "Qatar University International Merit Award",
            benefits: "100% Tuition Waiver + Free University Accommodation + Textbooks Exemption + Return Flights",
            qualifications: { alevel: "4A* / 5A* + Perfect uniform percentages", ib: "43+ Points", apsat: "GPA 4.0 + SAT 1550+", hsc: "GPA 5.0 (Golden Board Rank)" },
            fundingType: "full-waiver-beyond"
          }
        ]
      },
      {
        name: "Hamad Bin Khalifa University (HBKU) / Education City US Branches (CMU / Georgetown / Texas A&M)",
        tier: "S-Tier",
        appFee: "300 QAR",
        tuition: "60,000 QAR - 90,000 QAR / Year",
        link: "https://www.hbku.edu.qa/en/admissions/scholarships",
        courses: ["Computer Science", "Business", "International Relations", "Engineering", "AI"],
        roi: { "full-waiver-beyond": "Excellent", "partial-waiver": "Good", "self-funded": "Worst" },
        pros: ["Earn an authentic US degree (CMU/Georgetown) while accessing fully funded Middle Eastern cash awards", "Superb facility tracks"],
        cons: ["Requires full submission of SAT/ACT scores and advanced analytics essays to pass parent boards"],
        strategicOverview: "The Qatar Foundation funds need-based and merit-based grants that can cover up to 100% of all tuition parameters.",
        tiers: [
          {
            name: "Qatar Foundation Full Merit Fellowship",
            benefits: "100% Tuition Fee Waiver + Subsidized Housing Allocations",
            qualifications: { alevel: "4A* + Top tier parent US campus application clearance", ib: "42+ Points", apsat: "GPA 4.0 + 4+ APs + SAT 1540+", hsc: "GPA 5.0 + Elite Entrance Interview Portfolio" },
            fundingType: "full-waiver-beyond"
          }
        ]
      }
    ]
  }
];

export default function Home() {
  // Navigation & Filtering Configuration States
  const [activeRegion, setActiveRegion] = useState<string>("Hong Kong");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCourse, setActiveCourse] = useState<string>("All");
  
  // Multi-Select Funding Configuration States
  const [fundingFilters, setFundingFilters] = useState({
    "full-waiver-beyond": true,
    "partial-waiver": true,
    "self-funded": true
  });

  // Drill-Down Structural View State
  const [selectedUni, setSelectedUni] = useState<UniversityProfile | null>(null);

  // Memoized System Helpers
  const uniqueCountries = useMemo(() => {
    return globalScholarshipDatabase.map(item => item.region);
  }, []);

  const courseOptions = useMemo(() => {
    return ["All", "Medicine", "Engineering", "Business", "Economics", "Biotech"];
  }, []);

  const toggleFundingFilter = (key: "full-waiver-beyond" | "partial-waiver" | "self-funded") => {
    setFundingFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredData = useMemo(() => {
    const results: RegionBlock[] = [];

    globalScholarshipDatabase.forEach(regionBlock => {
      // 1. Regional navigation filter match
      if (regionBlock.region !== activeRegion) return;

      // 2. Search box text processing
      const queryClean = searchQuery.toLowerCase();
      const matchesRegionSearch = regionBlock.region.toLowerCase().includes(queryClean);

      const filteredUnis = regionBlock.universities.filter(uni => {
        const matchesUniSearch = uni.name.toLowerCase().includes(queryClean);
        const matchesText = matchesRegionSearch || matchesUniSearch;

        // Discipline match
        const matchesCourse = activeCourse === "All" || uni.courses.includes(activeCourse);

        // Funding layer multi-select verification logic
        const matchesFunding = uni.tiers.some(tier => fundingFilters[tier.fundingType]);

        return matchesText && matchesCourse && matchesFunding;
      });

      if (filteredUnis.length > 0) {
        results.push({
          ...regionBlock,
          universities: filteredUnis
        });
      }
    });

    return results;
  }, [activeRegion, searchQuery, activeCourse, fundingFilters]);

  return (
    <div className="flex flex-col bg-[#050507] text-[#f4f4f5] min-h-screen pb-24 font-serif">
      
      {/* GLOBAL MASTER NAVIGATION LINK ASSEMBLY */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-6 border-b border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          🌐 <span className="text-emerald-500">GlobalUniList</span>
        </div>
        <div className="flex flex-col md:flex-row items-center md:items-end gap-3 md:gap-6 text-sm font-mono tracking-wide">
          <a 
            href="https://www.instagram.com/rayyan_n252/#" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-zinc-200 hover:text-emerald-400 transition-colors flex items-center gap-1 font-bold bg-zinc-900/60 px-3 py-1.5 rounded-lg border border-zinc-800"
          >
            📸 Insta Account: rayyan_n252 ↗
          </a>
          <span className="hidden md:inline text-zinc-800">|</span>
          <div className="text-zinc-300 text-center md:text-right text-xs md:text-sm">
            <span className="text-emerald-400 font-bold">Email: </span>
            <a href="mailto:rayyanrahman252@gmail.com" className="underline font-bold text-white hover:text-emerald-400 mr-1">
              rayyanrahman252@gmail.com
            </a>
            <span className="text-zinc-400 block md:inline md:text-xs italic pl-1 text-[#c4c4c6]">
              (Forward all engineering layout suggestions or platform feature requests directly here)
            </span>
          </div>
        </div>
      </nav>

      {/* CORE MOTIVATIONAL HEADER */}
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center justify-center mb-6 px-4">
            <span className="px-5 py-1.5 text-xs tracking-widest uppercase font-extrabold bg-red-500/10 text-red-400 rounded-full border border-red-500/20 mb-6">
              ⚠️ Platform Scope Directive: This system covers all global clusters except the USA.
            </span>
            <h1 className="text-5xl md:text-8xl font-bold text-white max-w-6xl leading-none text-center tracking-tight">
              GlobalUniList
            </h1>
            <p className="mt-6 text-zinc-400 max-w-4xl text-xl md:text-2xl italic text-center leading-relaxed font-serif">
              Uncompromising board frameworks, official fee parameters, and work-culture tracking arrays.
            </p>
          </div>
        }
      >
        <div className="w-full h-full bg-gradient-to-b from-zinc-900 to-black p-6 md:p-12 rounded-2xl flex flex-col justify-between border-2 border-zinc-800 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          
          <div className="flex items-center justify-between border-b border-zinc-800/60 pb-4 relative z-10">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/40" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/40" />
            </div>
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest">PLATFORM_LIVE // STRATEGY_LEDGER</div>
          </div>
          
          {/* BRIGHTER, PREMIUM DESIGN QUOTE BOX WITH DASHED BORDER */}
          <div className="my-8 text-left max-w-4xl bg-zinc-950/90 border-2 border-dashed border-emerald-500/30 p-6 md:p-8 rounded-xl shadow-inner relative z-10">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400 text-3xl font-mono leading-none">“</span> The Genesis Story & Platform Vision
            </h3>
            <p className="text-base md:text-lg text-zinc-200 leading-relaxed italic font-serif">
              "When I began evaluating international undergraduate options, I ran straight into a wall of fragmented documentation. Finding real, un-obscured international tuition parameters, distinct application fees, and true A-Level/IB cut-offs across alternative global clusters felt like an endless, exhausting struggle. I had to parse through broken threads and outdated community records just to uncover basic scholarship frameworks. I developed <strong className="text-emerald-400 font-bold not-italic">GlobalUniList</strong> to put an end to that friction. Every verified tuition matrix, minimum scoring baseline, entrance tracking route, and blunt workplace post-grad disadvantage is cataloged here under a single unified dashboard, built to equip applicants worldwide completely for free."
            </p>
          </div>

          <div className="flex justify-between text-xs font-mono text-zinc-400 uppercase border-t border-zinc-900 pt-4 relative z-10">
            <span>Operational Base: Verified Admissions Hub</span>
            <span>Founder Workspace: @Rayyan2026</span>
          </div>
        </div>
      </ContainerScroll>

      {/* SYSTEM DASHBOARD PLATFORM SPACE */}
      <div className="max-w-7xl mx-auto w-full px-6 -mt-36 relative z-50">
        
        {/* ISOLATED CONTROL PILOT */}
        <div className="bg-zinc-900/95 backdrop-blur-2xl p-6 md:p-8 rounded-3xl border border-zinc-800 shadow-3xl mb-12 space-y-6">
          
          {/* Row 1: Top Category Filters & Right Search Element */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-zinc-800/60">
            <div className="flex flex-wrap items-center gap-2">
              {uniqueCountries.map((regionName) => (
                <button
                  key={regionName}
                  onClick={() => { setActiveRegion(regionName); setSelectedUni(null); }}
                  className={`px-4 py-2 text-base font-bold rounded-lg transition-all ${
                    activeRegion === regionName
                      ? "bg-emerald-600 text-white shadow-lg"
                      : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  }`}
                >
                  {regionName}
                </button>
              ))}
            </div>

            {/* HIGH-ISOLATION SEARCH DECK */}
            <div className="relative w-full lg:w-96">
              <input 
                type="text"
                placeholder="Search target country or university..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setSelectedUni(null); }}
                className="w-full bg-zinc-950 border-2 border-zinc-800 rounded-xl pl-5 pr-14 py-3.5 text-base text-zinc-100 focus:outline-none focus:border-emerald-500 transition-all font-serif placeholder-zinc-500"
              />
              <span className="absolute right-4 top-4 text-zinc-300 text-xl pointer-events-none select-none z-10">🔍</span>
            </div>
          </div>

          {/* Row 2: Disciplinary Maps & Multi-Select Matrices */}
          <div className="grid lg:grid-cols-2 gap-8 pt-2">
            
            {/* Discipline Selection Options */}
            <div>
              <label className="block text-xs font-mono text-zinc-300 uppercase tracking-widest mb-3 font-bold">Select Academic Field Target</label>
              <div className="flex flex-wrap gap-2">
                {courseOptions.map((course) => (
                  <button
                    key={course}
                    onClick={() => { setActiveCourse(course); setSelectedUni(null); }}
                    className={`px-3 py-1.5 text-sm font-bold rounded-md transition-all ${
                      activeCourse === course
                        ? "bg-zinc-100 text-zinc-950 font-bold"
                        : "bg-zinc-950 border border-zinc-800 text-zinc-300 hover:text-white"
                    }`}
                  >
                    {course}
                  </button>
                ))}
              </div>
            </div>

            {/* Checkbox Configuration Blocks */}
            <div>
              <label className="block text-xs font-mono text-zinc-300 uppercase tracking-widest mb-3 font-bold">Funding Coverage Layers (Select Any Mix)</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => { toggleFundingFilter("full-waiver-beyond"); setSelectedUni(null); }}
                  className={`p-3 text-xs font-bold rounded-xl border transition-all text-center ${
                    fundingFilters["full-waiver-beyond"]
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold"
                      : "bg-zinc-950 border-zinc-800 text-zinc-500"
                  }`}
                >
                  [ {fundingFilters["full-waiver-beyond"] ? "✓" : " "} ] Full Waiver & Beyond
                </button>
                <button
                  onClick={() => { toggleFundingFilter("partial-waiver"); setSelectedUni(null); }}
                  className={`p-3 text-xs font-bold rounded-xl border transition-all text-center ${
                    fundingFilters["partial-waiver"]
                      ? "bg-yellow-500/10 border-yellow-500 text-yellow-400 font-bold"
                      : "bg-zinc-950 border-zinc-800 text-zinc-500"
                  }`}
                >
                  [ {fundingFilters["partial-waiver"] ? "✓" : " "} ] Partial Waivers
                </button>
                <button
                  onClick={() => { toggleFundingFilter("self-funded"); setSelectedUni(null); }}
                  className={`p-3 text-xs font-bold rounded-xl border transition-all text-center ${
                    fundingFilters["self-funded"]
                      ? "bg-red-500/10 border-red-500 text-red-400 font-bold"
                      : "bg-zinc-950 border-zinc-800 text-zinc-500"
                  }`}
                >
                  [ {fundingFilters["self-funded"] ? "✓" : " "} ] Fully Self-Funded
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* LAYERED RESULTS WORKSPACE */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT AREA: Country Encyclopedia Cards */}
          <div className={`${selectedUni ? "lg:col-span-5" : "lg:col-span-12"} space-y-12 transition-all duration-300`}>
            {filteredData.length > 0 ? (
              filteredData.map((regionBlock, rIdx) => (
                <div key={rIdx} className="bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
                  
                  <div className="border-b border-zinc-800 pb-2">
                    <h2 className="text-3xl font-bold text-emerald-400">{regionBlock.region}</h2>
                  </div>

                  {/* Regional Work Culture Breakdown Disadvantages Panel */}
                  <div className="grid md:grid-cols-2 gap-4 bg-zinc-950/80 p-5 rounded-xl border border-zinc-800 text-sm leading-relaxed">
                    <div>
                      <strong className="text-white block mb-1.5 font-bold">Regional Structural Advantages:</strong>
                      <ul className="list-disc pl-4 text-zinc-200 space-y-1">
                        {regionBlock.regionalPros.map((p, i) => <li key={i}>{p}</li>)}
                      </ul>
                    </div>
                    <div>
                      <strong className="text-red-400 block mb-1.5 font-bold">Work Culture & Language Disadvantages:</strong>
                      <ul className="list-disc pl-4 text-zinc-200 space-y-1">
                        {regionBlock.regionalCons.map((c, i) => <li key={i}>{c}</li>)}
                      </ul>
                    </div>
                  </div>

                  {/* Special Medicine Disciplinary Indicators */}
                  {regionBlock.region === "Italy" && (
                    <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-xl text-sm text-zinc-200">
                      <strong className="text-emerald-400 font-bold block mb-1">⭐ Medicine Disciplinary Portal Vector:</strong>
                      Italy stands as one of the single primary pathways across the European continent offering English-taught medical programs via needs-based regional scholarship systems.
                    </div>
                  )}
                  {regionBlock.region === "Hungary" && (
                    <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-xl text-sm text-zinc-200">
                      <strong className="text-emerald-400 font-bold block mb-1">⭐ Medicine Disciplinary Portal Vector:</strong>
                      Hungary provides premium fully funded pathways for medical and dental candidates via specialized central Stipendium Hungaricum state frameworks.
                    </div>
                  )}

                  {/* University Profiles Sublist Menu */}
                  <div className="space-y-3">
                    {regionBlock.universities.map((uni, uIdx) => (
                      <div
                        key={uIdx}
                        onClick={() => setSelectedUni(uni)}
                        className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${
                          selectedUni?.name === uni.name
                            ? "bg-emerald-500/10 border-emerald-500 shadow-2xl"
                            : "bg-zinc-950/80 border-zinc-800 hover:border-zinc-700"
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700 text-zinc-300">{uni.tier}</span>
                            <h4 className="text-xl font-bold text-white leading-tight">{uni.name}</h4>
                          </div>
                          <div className="text-sm text-zinc-200 mt-1.5 flex flex-wrap gap-x-4">
                            <span>App Fee: <strong className="text-white font-mono font-bold">{uni.appFee}</strong></span>
                            <span>Tuition Base: <strong className="text-white font-mono font-bold">{uni.tuition.split("//")[0]}</strong></span>
                          </div>
                        </div>
                        <button className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/5 border border-emerald-500/20 px-3 py-2 rounded-md uppercase tracking-wider">
                          Drill Down ➔
                        </button>
                      </div>
                    ))}
                  </div>

                </div>
              ))
            ) : (
              <div className="text-center py-20 text-zinc-300 text-xl bg-zinc-900/10 border border-zinc-800 rounded-3xl font-serif italic">
                No matching country or university structures found matching current filter layouts.
              </div>
            )}
          </div>

          {/* RIGHT AREA: Drill-Down Layered View */}
          {selectedUni && (
            <div className="lg:col-span-7 bg-zinc-900/90 border-2 border-emerald-500/30 rounded-3xl p-6 md:p-8 shadow-3xl sticky top-6 space-y-6 text-left animate-in fade-in slide-in-from-bottom-4 duration-200">
              
              <div className="flex items-start justify-between border-b border-zinc-800 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 uppercase tracking-widest">
                    Detailed Institutional Profile Vector
                  </span>
                  <h2 className="text-3xl font-bold text-white mt-3 leading-tight tracking-tight">{selectedUni.name}</h2>
                </div>
                <button 
                  onClick={() => setSelectedUni(null)}
                  className="text-zinc-200 hover:text-white bg-zinc-950 border border-zinc-800 w-8 h-8 rounded-full flex items-center justify-center font-bold font-mono transition-all shadow-md"
                >
                  ✕
                </button>
              </div>

              {/* Fee Disclosures Matrix */}
              <div className="grid sm:grid-cols-2 gap-4 text-sm bg-zinc-950 p-5 rounded-xl border border-zinc-800/80">
                <div>
                  <span className="text-zinc-500 font-mono block uppercase text-xs tracking-wider mb-1">Official Application Fee</span>
                  <span className="text-base font-bold text-white font-mono">{selectedUni.appFee}</span>
                </div>
                <div>
                  <span className="text-zinc-500 font-mono block uppercase text-xs tracking-wider mb-1">Verified Annual Tuition Structure</span>
                  <span className="text-base font-bold text-white font-mono leading-tight block">{selectedUni.tuition}</span>
                </div>
              </div>

              {/* Strategic overview guidelines content */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block font-bold">// Strategic Overview & Guidelines</span>
                <p className="text-base text-zinc-200 leading-relaxed italic bg-zinc-950/40 p-4 rounded-xl border border-dashed border-zinc-800">
                  {selectedUni.strategicOverview}
                </p>
              </div>

              {/* Course Badges Matrix */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block font-bold">Available Academic Portfolios</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedUni.courses.map((c, i) => (
                    <span key={i} className="bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs px-2.5 py-1 rounded-md font-bold">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* ROI Matrix Element */}
              <div className="space-y-3">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block font-bold">Return On Investment (ROI) Matrix Scale</span>
                <div className="grid grid-cols-3 gap-3 text-center text-sm">
                  <div className="bg-emerald-500/5 border border-emerald-500/20 p-3 rounded-xl">
                    <div className="text-xs text-zinc-500 font-mono uppercase">Full Ride Funding</div>
                    <div className="text-lg font-bold text-emerald-400 mt-1">{selectedUni.roi["full-waiver-beyond"]}</div>
                  </div>
                  <div className="bg-yellow-500/5 border border-yellow-500/20 p-3 rounded-xl">
                    <div className="text-xs text-zinc-500 font-mono uppercase">Partial Funded</div>
                    <div className="text-lg font-bold text-yellow-400 mt-1">{selectedUni.roi["partial-waiver"]}</div>
                  </div>
                  <div className="bg-red-500/5 border border-red-500/20 p-3 rounded-xl">
                    <div className="text-xs text-zinc-500 font-mono uppercase">Self Funded Base</div>
                    <div className="text-lg font-bold text-red-400 mt-1">{selectedUni.roi["self-funded"]}</div>
                  </div>
                </div>
              </div>

              {/* THREE-TIER SEPARATED MULTI-QUALIFICATION REQUIREMENTS MATRIX TABLES */}
              <div className="space-y-3">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block font-bold">Waiver Allocation and Standardized Testing Minimum Boundaries</span>
                <div className="space-y-4">
                  {selectedUni.tiers?.map((tier, idx) => (
                    <div key={idx} className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 space-y-3">
                      <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                        <div className="text-base font-bold text-white flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${
                            tier.fundingType === 'full-waiver-beyond' ? 'bg-emerald-400' : tier.fundingType === 'partial-waiver' ? 'bg-yellow-400' : 'bg-red-400'
                          }`} />
                          {tier.name}
                        </div>
                        <span className="text-sm font-bold text-emerald-400 font-mono">{tier.benefits}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono text-zinc-200">
                        <div className="bg-zinc-900/50 p-2.5 rounded border border-zinc-800/60">
                          <span className="text-zinc-400 block uppercase mb-0.5 font-bold">GCE A-Levels:</span>
                          <span className="text-sm font-bold font-serif text-white">{tier.qualifications?.alevel || "Case Assessment"}</span>
                        </div>
                        <div className="bg-zinc-900/50 p-2.5 rounded border border-zinc-800/60">
                          <span className="text-zinc-400 block uppercase mb-0.5 font-bold">International IB:</span>
                          <span className="text-sm font-bold font-serif text-white">{tier.qualifications?.ib || "Case Assessment"}</span>
                        </div>
                        <div className="bg-zinc-900/50 p-2.5 rounded border border-zinc-800/60">
                          <span className="text-zinc-400 block uppercase mb-0.5 font-bold">US AP + SAT:</span>
                          <span className="text-sm font-bold font-serif text-white">{tier.qualifications?.apsat || "Case Assessment"}</span>
                        </div>
                        <div className="bg-zinc-900/50 p-2.5 rounded border border-zinc-800/60">
                          <span className="text-zinc-400 block uppercase mb-0.5 font-bold">HSC Board:</span>
                          <span className="text-sm font-bold font-serif text-white">
                            {selectedUni.tier === "S-Tier" || selectedUni.tier === "A-Tier" ? "GPA 5.0" : "GPA 4.5 / 4.0"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* LOCALIZED INSTITUTIONAL PROS & CONS ADVANTAGES GRID */}
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                  <span className="text-emerald-400 font-bold block mb-2">Campus Strengths:</span>
                  <ul className="list-disc pl-4 text-zinc-200 space-y-1">
                    {selectedUni.pros.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                  <span className="text-red-400 font-bold block mb-2">Campus Limitations:</span>
                  <ul className="list-disc pl-4 text-zinc-200 space-y-1">
                    {selectedUni.cons.map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                </div>
              </div>

              <div className="pt-2">
                <a 
                  href={selectedUni.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center block bg-emerald-600 hover:bg-emerald-500 text-zinc-950 font-bold py-3.5 px-6 rounded-xl transition-all text-base tracking-wide"
                >
                  Launch Official University Application Portal ↗
                </a>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* CORE FOOTER SIGNATURE PROFILES */}
      <footer className="w-full border-t border-zinc-900 mt-32 pt-8 text-center text-sm font-mono tracking-widest uppercase">
        <div className="text-zinc-300 font-serif font-bold text-base tracking-normal normal-case">
          Registered Database Framework Portfolio © <a href="https://www.instagram.com/rayyan_n252/#" target="_blank" rel="noopener noreferrer" className="hover:underline text-emerald-400">@Rayyan2026</a>
        </div>
      </footer>

    </div>
  );
}
