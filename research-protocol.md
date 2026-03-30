# The Great Reallocation: AI, Automation, and the Restructuring of American Work
## A Multi-Sector Research Study on Employment Displacement and Creation in the Age of Generative AI
### Research Protocol · Version 1.0 · March 2026

---

## Abstract

This study provides the first comprehensive, multi-sector analysis of how generative AI is reshaping U.S. employment at the occupation, industry, and geographic level. Prior research has either focused narrowly on exposure indices (Eloundou et al., 2024; Felten et al., 2023) or relied on employer self-reporting (Challenger, Gray & Christmas), which undercounts AI-related displacement by a factor of 4–6x due to disclosure incentives. We take a different approach: combining federal labor data (BLS OEWS, JOLTS, CPS, WARN Act filings), corporate filings (SEC 8-K, 10-K), job posting data (Lightcast/Burning Glass, Indeed), and establishment-level data (County Business Patterns) to construct a bottom-up estimate of displacement, creation, and transition across 356 occupations, 50 states, and 389 metropolitan statistical areas.

The study is structured in three parts:

**Part I — The Precursor**: A retrospective analysis of industrial robotics and automation's impact on U.S. manufacturing employment from 2000–2024, using the Acemoglu & Restrepo (2020) framework to establish baseline displacement dynamics, geographic concentration patterns, and labor market adjustment speeds. This provides the historical control against which AI-era displacement can be measured.

**Part II — The Software Engineering Sector**: A deep intra-sector analysis of the software engineering labor market, tracking role-level changes in hiring, layoffs, compensation, and job posting volumes across 14 distinct engineering sub-occupations from January 2023 to present. This sector serves as the canary — it had the earliest and most direct exposure to generative AI tools.

**Part III — The Nationwide Study**: A comprehensive analysis of all occupations with significant AI exposure, covering white-collar professional services, entry-level roles, creative industries, customer service, financial services, legal, education, and healthcare administration. We map displacement and creation patterns across all 50 states, identify geographic concentration of impact, and model the adjustment dynamics.

---

## Part I: The Precursor — Robotics, Automation, and Manufacturing (2000–2024)

### I.1 Research Questions

1. **Displacement magnitude**: How many manufacturing jobs were displaced by industrial robotics and automation between 2000 and 2024, and at what rate?
2. **Geographic concentration**: Was displacement geographically concentrated, and if so, in which commuting zones (CZs) and metropolitan statistical areas (MSAs)?
3. **Wage effects**: What happened to wages in communities with high robot penetration?
4. **Adjustment speed**: How long did it take affected labor markets to reach a new equilibrium? Did displaced workers transition to comparable-wage occupations?
5. **Secondary effects**: What correlations exist between automation displacement and downstream social outcomes (opioid prevalence, disability claims, labor force exit rates)?
6. **Lessons for AI**: What does the manufacturing automation experience predict about the speed, geography, and social cost of AI-driven white-collar displacement?

### I.2 Data Sources

| Dataset | Provider | Coverage | Variables of Interest | Access |
|---------|----------|----------|----------------------|--------|
| International Federation of Robotics (IFR) | IFR | Industrial robot shipments/stock by industry, 1993–2024 | Robot units by industry, country | Licensed ($) |
| Occupational Employment and Wage Statistics (OEWS) | BLS | ~830 occupations, annual, by state and MSA | Employment counts, mean/median wages by occupation | Public |
| Current Population Survey (CPS) | Census/BLS | Monthly household survey, ~60,000 households | Employment status, occupation, industry, demographics | Public (IPUMS) |
| County Business Patterns (CBP) | Census | Annual, by county | Establishment counts, employment by industry (NAICS) | Public |
| American Community Survey (ACS) | Census | Annual, 1% sample | Employment, wages, commuting, demographics by CZ | Public (IPUMS) |
| WARN Act Filings | State DOLs | Varies by state (some 2000–present) | Company, location, affected count, reason, date | Public (state sites) |
| Quarterly Census of Employment and Wages (QCEW) | BLS | Quarterly, by county and industry | Employment, wages by industry and county | Public |
| Local Area Unemployment Statistics (LAUS) | BLS | Monthly, by county and MSA | Unemployment rates, labor force participation | Public |
| Fatality Analysis Reporting System / CDC WONDER | NHTSA/CDC | Annual, by county | Opioid mortality rates (secondary outcome) | Public |

### I.3 Methodology

**Unit of Analysis**: Commuting Zone (CZ). Following Acemoglu & Restrepo (2020), we use 722 commuting zones as the primary geographic unit because they capture local labor markets better than counties or MSAs. CZs are clusters of counties with strong internal commuting ties.

**Measurement Strategy**:

We replicate and extend the Acemoglu & Restrepo (2020) instrument — **Adjusted Penetration of Robots (APR)** — which measures the increase in robot adoption in a CZ based on:
1. National industry-level robot adoption rates (from IFR data)
2. The CZ's baseline industry composition (how manufacturing-heavy it was in 2000)

This instrumental variable approach avoids the endogeneity problem: CZs that lost manufacturing jobs might have lost them for many reasons (trade, demand shifts, etc.), not just robots. By using European robot adoption rates as an instrument for U.S. adoption, we isolate the causal effect of robots specifically.

**Specification**:

```
ΔY_cz = α + β₁(ΔRobots_cz) + X_cz'γ + ε_cz

Where:
  ΔY_cz       = Change in outcome (employment/population ratio, log wages,
                 labor force participation) in commuting zone cz
  ΔRobots_cz  = Change in robot exposure (APR instrument)
  X_cz        = Controls: Chinese import exposure (Autor et al., 2013),
                 baseline demographics, industry mix, education levels
  ε_cz        = Error term
```

**Extensions beyond Acemoglu & Restrepo**:
1. Extend the time period from 2007 to 2024 (their data stopped at 2014)
2. Add granular occupation-level analysis within manufacturing
3. Track displaced workers longitudinally via CPS/ACS to measure transition outcomes
4. Analyze secondary outcomes: opioid mortality, disability claims, SNAP enrollment
5. Map adjustment speed: how many years until CZ employment-to-population ratio stabilizes?

**Expected Outputs**:
- CZ-level maps of robot displacement intensity
- Estimated displacement coefficient (jobs lost per robot installed), updated through 2024
- Median transition time for displaced manufacturing workers
- Wage trajectory for displaced workers (pre-displacement vs 1yr, 3yr, 5yr post)
- Correlation analysis with secondary social outcomes
- Historical benchmark displacement velocity: how fast did manufacturing displacement occur, measured in % of workforce per year?

### I.4 Why This Matters for the AI Study

The manufacturing automation experience provides three critical benchmarks:

1. **Displacement velocity**: Manufacturing automation displaced ~2% of the sector's workforce over 20 years. If AI displaces white-collar work at even 2x this velocity, the social infrastructure implications are enormous.

2. **Geographic concentration**: Acemoglu & Restrepo found that robot displacement was not evenly distributed — it concentrated in specific CZs (the Rust Belt), devastating local economies. We need to test whether AI displacement is similarly concentrated (likely in knowledge-economy metros: SF, NYC, Seattle, Austin) or more diffuse.

3. **Adjustment failure**: Manufacturing workers displaced by automation largely did NOT transition to comparable-wage jobs. Many exited the labor force entirely. This is the counterfactual that AI optimists ("AI will create more jobs than it destroys") must grapple with — net job creation nationally doesn't help if displaced workers in specific geographies can't access the new roles.

---

## Part II: Software Engineering — The Canary Sector

### II.1 Research Questions

1. **Role-level displacement**: Which specific software engineering sub-occupations have experienced the largest declines in job postings, employment, and hiring since the widespread adoption of generative AI coding tools (GitHub Copilot GA: June 2022; ChatGPT: November 2022)?
2. **Seniority stratification**: Is displacement concentrated at entry-level/junior roles (as Amodei and others predict), or is it distributed across seniority levels?
3. **Productivity vs headcount**: In companies that adopted AI coding tools, did they reduce headcount, or did output per engineer increase while headcount held steady?
4. **Role creation**: What new software engineering roles have emerged (prompt engineer, AI/ML engineer, AI safety engineer, LLMOps), and at what rate are they growing?
5. **Compensation effects**: Have AI-tool-augmented engineers seen wage premiums? Have engineers in AI-exposed sub-occupations seen wage compression?
6. **Geographic redistribution**: Is AI-related software engineering work concentrating in specific metros, or is remote work distributing it?

### II.2 Sub-Occupation Taxonomy

The BLS SOC code 15-1252 ("Software Developers") is far too coarse for this analysis. We construct a 14-category sub-occupation taxonomy based on job title analysis:

| Sub-Occupation | SOC Proxy | AI Exposure | Rationale |
|---------------|-----------|-------------|-----------|
| Frontend Engineer | 15-1252 | High | UI code generation is among the strongest AI use cases |
| Backend Engineer | 15-1252 | High | API/CRUD code generation is highly automatable |
| Full-Stack Engineer | 15-1252 | High | Combines both surfaces |
| Mobile Engineer (iOS/Android) | 15-1252 | Medium-High | Platform constraints limit but don't prevent AI assistance |
| DevOps/SRE/Platform Engineer | 15-1241 | Medium | Infrastructure-as-code is AI-amenable but requires deep systems knowledge |
| QA/Test Engineer | 15-1253 | Very High | Test generation is one of AI's strongest capabilities |
| Data Engineer | 15-1252 | Medium-High | Pipeline/ETL code is highly patterned |
| ML/AI Engineer | 15-1252 | Low (paradox) | These roles are BUILDING the tools, not being replaced by them |
| Security Engineer | 15-1212 | Medium | Vulnerability detection is AI-amenable; response is not |
| Embedded/Systems Engineer | 15-1252 | Low-Medium | Hardware constraints and safety requirements limit AI replacement |
| Database Administrator | 15-1242 | High | Query optimization and schema management are AI-amenable |
| Technical Writer | 27-3042 | Very High | Documentation generation is a core LLM capability |
| Computer Programmer (general) | 15-1251 | Very High | The BLS already projects -6% decline to 2034 |
| IT Support/Help Desk | 15-1232 | Very High | Tier 1/2 support is among the first AI automation targets |

### II.3 Data Sources

| Dataset | Provider | What It Gives Us |
|---------|----------|-----------------|
| Lightcast (formerly Burning Glass/EMSI) | Lightcast | Real-time job posting data with title, skills, location, salary, company. The gold standard for job market analysis. Can filter to sub-occupation level by title keywords. |
| Indeed Hiring Lab Data | Indeed | Monthly job posting trends by occupation and metro. Public research datasets. |
| LinkedIn Economic Graph | LinkedIn | Hiring rates, talent migration, skills demand. Some data public via Economic Graph reports. |
| BLS OEWS (May 2023, May 2024) | BLS | Annual employment and wage estimates by detailed SOC, by state and MSA. |
| BLS OOH Projections (2024–2034) | BLS | 10-year employment projections by detailed occupation. |
| BLS JOLTS | BLS | Monthly job openings, hires, separations, quits by industry. |
| BLS CPS | BLS/Census | Monthly employment status, occupation, industry, demographics. |
| Challenger Gray & Christmas | CGC | Monthly layoff announcements with company, count, and reason. Only source that tracks AI-attributed layoffs specifically. |
| Layoffs.fyi | Community | Tech layoff tracker. Not statistically rigorous but comprehensive on tech sector. |
| SEC EDGAR 8-K Filings | SEC | Material event disclosures including mass layoffs at public companies. Keyword-searchable. |
| State WARN Act Databases | State DOLs | Pre-layoff notifications. 60-day advance notice required for large layoffs. |
| GitHub Copilot Adoption Data | GitHub | Adoption rates of AI coding tools by developer segment. Published in Octoverse reports. |
| Stack Overflow Developer Survey | Stack Overflow | Annual survey of ~90,000 developers on tool usage, satisfaction, and career changes. |
| Levels.fyi / Glassdoor | Third-party | Compensation data by role, company, level, and location. |

### II.4 Methodology

**Study Design**: Interrupted time series with comparison groups.

The "interruption" is the widespread availability of generative AI coding tools, which we date to two events:
- **T₁**: June 2022 — GitHub Copilot general availability
- **T₂**: November 2022 — ChatGPT launch (dramatic expansion of AI coding awareness)

We measure trends in job postings, employment, wages, and layoffs for each of the 14 sub-occupations across three periods:
- **Pre-AI**: January 2019 – May 2022 (baseline, adjusting for COVID-19 anomaly 2020–2021)
- **Early AI**: June 2022 – December 2023 (adoption phase)
- **Mature AI**: January 2024 – Present (widespread integration)

**Analysis 1: Job Posting Volume Trends**

Using Lightcast data:
- Monthly job posting counts for each sub-occupation, normalized to January 2019 = 100
- Decompose into: trend, seasonal, and residual components
- Test for structural breaks at T₁ and T₂ using Chow test
- Compare AI-exposed sub-occupations (QA, frontend, programmer) vs AI-building sub-occupations (ML engineer) to test the differential impact hypothesis

**Analysis 2: Layoff Attribution Analysis**

Using Challenger, WARN Act, SEC 8-K, and Layoffs.fyi data:
- Construct a unified layoff event database for the software industry
- Classify each event by: company, affected count, sub-occupation (when disclosed), whether AI was cited as a factor
- Estimate the "AI attribution gap": the difference between explicitly AI-cited layoffs (~55,000 in 2025 per Challenger) and the estimated true AI-driven displacement (~200,000–300,000 per modeling)
- Methodology: compare layoff rates in high-AI-exposure roles vs low-AI-exposure roles within the same companies to estimate the AI-specific displacement effect

**Analysis 3: Seniority Stratification**

Using Lightcast + Levels.fyi + LinkedIn data:
- Segment job postings by seniority (entry/junior, mid, senior, staff, principal, executive)
- Test Amodei's hypothesis: that entry-level roles face disproportionate displacement
- Measure the "experience premium shift": is the wage gap between junior and senior engineers widening (consistent with AI replacing juniors) or narrowing?

**Analysis 4: Role Creation Velocity**

Using Lightcast data:
- Track monthly posting volumes for newly emergent roles: prompt engineer, AI/ML engineer, AI safety researcher, LLMOps engineer, AI product manager
- Measure creation velocity: how fast are these roles scaling relative to the roles they may be replacing?
- Test net displacement: are new AI roles offsetting displaced traditional roles in the same geographies?

**Analysis 5: Compensation Analysis**

Using OEWS, Levels.fyi, and Glassdoor:
- Track median and percentile wages by sub-occupation, 2019–present
- Segment by metro area (SF, NYC, Seattle, Austin, Remote)
- Test for wage compression in AI-exposed roles
- Test for wage premiums in AI-building roles
- Decompose: how much of the wage change is composition effect (junior roles eliminated, raising median) vs genuine per-worker change?

**Analysis 6: Geographic Redistribution**

Using OEWS, Lightcast, and ACS:
- Map software engineering job posting density by MSA, quarterly
- Track remote vs onsite/hybrid posting ratios over time
- Identify MSAs with the largest absolute and percentage declines in software engineering postings
- Test whether AI-related posting declines are concentrated in high-cost metros (suggesting companies are using AI to reduce expensive headcount)

### II.5 Controls and Confounds

The major confound is that the tech sector experienced a macro hiring correction in 2022–2023 (post-COVID overhiring, rising interest rates, advertising revenue decline) that overlaps with the AI adoption timeline. To isolate the AI effect:

1. **Industry control**: Compare software engineering layoffs at AI-investing companies vs non-AI-investing companies within the same sub-sector
2. **Macro control**: Include Fed funds rate, NASDAQ index, and advertising revenue as covariates
3. **COVID correction control**: Use 2019 as baseline, not 2021 (which was peak pandemic hiring)
4. **Comparison sector**: Compare software engineering trends with other tech-adjacent sectors (hardware, IT services) that had similar macro exposure but lower direct AI tool exposure
5. **Company-level AI adoption**: Where possible, control for whether the company has publicly adopted AI coding tools (announced Copilot Enterprise, built internal tools, etc.)

---

## Part III: The Nationwide Study — All AI-Impacted Occupations

### III.1 Research Questions

1. **Occupation-level displacement**: Across all ~830 BLS-tracked occupations, which have experienced employment declines that exceed baseline projections since 2022, and do those declines correlate with AI exposure scores?
2. **Sector analysis**: Which sectors are experiencing the largest net displacement (jobs lost – jobs created)?
3. **Entry-level concentration**: Is AI displacement disproportionately affecting entry-level positions across sectors, or is this a sector-specific phenomenon?
4. **Geographic impact mapping**: Which MSAs and states are most affected by AI-driven employment changes?
5. **Demographic stratification**: Does AI displacement disproportionately affect specific demographic groups (age, gender, race, education level)?
6. **The Jevons Paradox test**: In sectors where AI increases productivity, does total employment in that sector increase (Jevons effect) or decrease (displacement effect)?
7. **Wage polarization**: Is AI exacerbating the existing wage polarization trend (hollowing out of middle-skill jobs)?

### III.2 Sector-by-Sector Analysis Framework

Each sector analyzed using the same framework:

```
For each sector:
  1. Define the occupation set (SOC codes)
  2. Establish pre-AI baseline employment and wage trends (2019–2022)
  3. Measure post-AI employment and wage changes (2022–present)
  4. Calculate deviation from BLS projected trends
  5. Correlate with AI exposure scores (Eloundou et al., 2024; Felten et al., 2023)
  6. Identify specific roles created vs eliminated within the sector
  7. Map geographic distribution of impact
  8. Analyze seniority/wage-level distribution of impact
  9. Assess Jevons Paradox: did AI productivity gains increase or decrease total sector employment?
```

**Sectors Covered**:

| Sector | Key Occupations (SOC) | AI Exposure | Priority |
|--------|----------------------|-------------|----------|
| Software Engineering | 15-1251, 15-1252, 15-1253 | Very High | Primary (Part II) |
| Financial Services | 13-2051, 13-2011, 13-2041 | High | High |
| Legal Services | 23-1011, 23-2011, 23-2093 | High | High |
| Customer Service | 43-4051, 43-3031, 43-4171 | Very High | High |
| Marketing & Content | 27-3031, 11-2021, 13-1161 | Very High | High |
| Administrative/Office | 43-6014, 43-3011, 43-9061 | Very High | High |
| Accounting & Auditing | 13-2011, 13-2082, 43-3031 | High | Medium |
| Human Resources | 13-1071, 13-1151, 11-3121 | Medium-High | Medium |
| Healthcare Admin | 29-2071, 43-6013, 29-2072 | Medium-High | Medium |
| Translation/Interpretation | 27-3091 | Very High | Medium |
| Graphic Design | 27-1024, 27-1014 | High | Medium |
| Data Entry & Processing | 43-9021, 43-9111 | Very High | High |
| Insurance Underwriting | 13-2053 | High | Medium |
| Real Estate | 41-9022, 13-2021 | Medium | Lower |
| Education (Admin) | 25-9031, 25-3098 | Medium | Lower |
| Retail & Warehouse | 41-2031, 53-7065 | Medium (robotics) | Precursor tie-in |
| Manufacturing | 51-XXXX | Medium-High (robotics + AI) | Precursor tie-in |

### III.3 Data Sources (National Study)

All sources from Parts I and II, plus:

| Dataset | Variables |
|---------|-----------|
| O*NET 30.1 (2025) | Task descriptions, skill importance ratings for ~1,000 occupations |
| Eloundou et al. (2024) AI Exposure Scores | LLM exposure by occupation (E1, E2, E1+0.5E2 measures) |
| Anthropic AI Usage Data (August 2025) | Task-level AI usage frequencies from Claude usage patterns |
| Felten et al. (2023) AI Occupational Exposure | AI application-level exposure index by occupation |
| BLS Employment Projections (2024–2034) | Official 10-year forecasts by detailed occupation |
| WEF Future of Jobs Report 2025 | Employer survey: 1,000+ employers, 14M workers, 55 economies |
| SHRM 2025 Automation/AI Survey | Automation levels, nontechnical barriers to displacement, by occupation |
| Brookings Adaptive Capacity Index | Occupation-level measures of workers' ability to transition if displaced |

### III.4 Methodology — National Study

**Primary Analysis: Deviation from Projected Employment**

The core analytical strategy: compare *actual* employment changes (2022–present) with BLS *projected* employment changes (from the 2022–2032 projections vintage, issued before ChatGPT). The residual — the gap between what was predicted and what actually happened — is our candidate AI displacement signal.

```
AI_Effect_o = Actual_Employment_Change_o (2022–2025) - Projected_Employment_Change_o (2022–2025)

Where o = occupation

If AI_Effect_o is significantly negative AND the occupation has a high AI exposure
score, we have evidence consistent with AI-driven displacement.

If AI_Effect_o is significantly positive AND the occupation has a high AI exposure
score, we have evidence consistent with the Jevons Paradox (AI augmentation
increases total employment).
```

**Confound management**: The 2022–2025 period also included: post-COVID normalization, interest rate tightening, inflation-driven cost cutting, and sector-specific demand shifts. We include these as covariates.

**Geographic Analysis**:

For each of the 389 MSAs with sufficient OEWS data:
1. Calculate total employment in high-AI-exposure occupations (exposure > 0.5 on Eloundou scale)
2. Measure change from 2022 to 2024/2025
3. Normalize by MSA size (per 10,000 workers)
4. Map results to identify geographic concentration
5. Correlate with: metro median income, industry mix, educational attainment, broadband access
6. Compare with manufacturing automation displacement map from Part I: are the same communities hit, or different ones?

**Demographic Stratification**:

Using CPS microdata:
1. Segment AI-exposed workers by: age (18–24, 25–34, 35–44, 45–54, 55+), gender, race/ethnicity, educational attainment
2. Measure employment rate changes within each segment for AI-exposed occupations
3. Test the Brookings "adaptive capacity" hypothesis: do workers with higher savings, more transferable skills, and stronger professional networks experience less displacement cost?
4. Flag any disproportionate impact patterns that have civil rights or policy implications

**The Jevons Paradox Test**:

For sectors where AI demonstrably increases per-worker productivity:
1. Measure sector-level output (GDP contribution) and employment pre/post-AI
2. If output increases AND employment increases → Jevons Paradox holds (AI augmentation)
3. If output increases AND employment decreases → displacement effect dominates
4. If output flat AND employment decreases → substitution without productivity gain
5. This test is sector-level, not occupation-level, because the Jevons effect operates through increased demand for the sector's output

---

## IV. Study Governance, Ethics, and Limitations

### IV.1 Ethical Considerations

This study works exclusively with publicly available aggregate data and does not involve human subjects research in the traditional sense. However:

- We do NOT identify individual displaced workers
- We do NOT make predictions about specific companies' future layoff decisions
- We DO acknowledge that labor displacement has real human cost and frame findings accordingly
- We DO provide uncertainty bounds on all estimates and clearly distinguish correlation from causation
- We DO flag when our AI attribution methodology relies on inference rather than explicit employer disclosure

### IV.2 Known Limitations

1. **Attribution problem**: We cannot definitively attribute any specific layoff to AI. We can only measure correlations between AI exposure and employment changes while controlling for confounds.

2. **Data lag**: BLS OEWS data is released annually with a ~10 month delay. May 2024 data was released April 2025. The most current employment snapshot may be 6–18 months old.

3. **Occupation classification granularity**: BLS SOC codes are coarser than real-world job titles. "Software Developer" (15-1252) encompasses roles as different as a junior React developer and a senior systems architect. Our sub-occupation taxonomy is a best-effort mapping, not an official classification.

4. **AI adoption measurement**: We have no direct measure of how many companies have adopted AI tools. We use proxy measures (public announcements, survey data, tool adoption reports) that likely undercount adoption.

5. **Counterfactual uncertainty**: We cannot observe what would have happened without AI. Our projection-deviation method assumes that pre-AI BLS projections were reasonable forecasts, which may not hold if other structural shifts occurred simultaneously.

6. **Informal employment effects**: AI may be reducing hours, reducing future hiring (not reflected in layoff data), or converting full-time roles to contractor roles. These effects are harder to measure than outright layoffs.

7. **Survivor bias in wage data**: If lower-paid workers are disproportionately displaced, average wages for remaining workers rise — creating a statistical artifact of "rising wages" that masks deteriorating conditions.

### IV.3 Reproducibility

All analysis code, data sources, and methodology documentation will be published alongside the study:
- Analysis code: public GitHub repository
- Data: all public datasets referenced with exact download dates and URLs
- Licensed data (IFR, Lightcast): described in sufficient detail for replication by others with access
- Methodology versions: all classification taxonomies, exposure scores, and analytical choices documented and version-controlled

---

## V. Expected Outputs

### V.1 Deliverables

| Output | Format | Audience |
|--------|--------|----------|
| Full research paper | PDF, 60–80 pages + appendices | Academic, policy |
| Executive summary | PDF, 8–10 pages | Journalists, executives |
| Interactive data dashboard | Web application | General public, journalists |
| Geographic impact maps | Interactive + static PNG | Media, policymakers |
| Occupation-level displacement index | Downloadable CSV/API | Researchers, journalists |
| Historical automation comparison report | PDF, 15–20 pages | Policy, academic |
| Methodology document | Public web page | Reproducibility |
| Code repository | GitHub | Reproducibility |

### V.2 Key Metrics to Report

```
HEADLINE METRICS:
  - Net AI-attributable employment change, by sector (2022–present)
  - Number of occupations with statistically significant negative deviation
    from projected employment (the "displacement list")
  - Number of occupations with statistically significant positive deviation
    (the "creation list")
  - Geographic concentration index: are impacts diffuse or clustered?
  - Entry-level vs senior displacement ratio
  - Median wage change in high-AI-exposure occupations
  - Historical comparison: AI displacement velocity vs manufacturing
    automation displacement velocity (jobs per year, % of sector workforce)

SOFTWARE ENGINEERING DEEP DIVE:
  - Role-level posting trends for all 14 sub-occupations
  - Seniority distribution of displacement
  - Net role creation vs elimination
  - AI adoption rate as a predictor of headcount change
  - Geographic redistribution patterns

NATIONAL STUDY:
  - All-occupation AI displacement index (Eloundou exposure × actual employment change)
  - Top 20 most-displaced occupations with AI exposure correlation
  - Top 20 most-created occupations
  - State-by-state net impact map
  - MSA-level heat map of displacement concentration
  - Demographic impact stratification
  - Jevons Paradox results by sector
```

---

## VI. Publication and Distribution Strategy

### VI.1 Academic Track
- Working paper on SSRN / NBER Working Papers series
- Submission to: Quarterly Journal of Economics, American Economic Review, or Journal of Labor Economics
- Presentation at: NBER Summer Institute, AEA Annual Meeting

### VI.2 Journalism Track
- Executive summary designed for journalist consumption
- Embeddable charts and maps with attribution
- Data API for newsroom integrations
- Pitching to: The Atlantic (long-form narrative), The New York Times (data story), The Washington Post (interactive feature), Bloomberg (data terminal integration), Vox/The Verge (explanatory)

### VI.3 Policy Track
- Briefing document for: Senate Commerce Committee, House Education and Workforce Committee
- Presentation to: Brookings, Economic Policy Institute, National Bureau of Economic Research
- State-level fact sheets for the 10 most-affected states

### VI.4 Public Track
- Interactive dashboard on jobanxiety.ai
- Monthly data updates with methodology versioning
- Career transition resources linked to specific findings

---

## Appendix A: Key Academic References

| Citation | Contribution | Relevance |
|----------|-------------|-----------|
| Acemoglu & Restrepo (2020), "Robots and Jobs" | Established causal framework for measuring robot displacement at CZ level | Direct model for Part I |
| Eloundou et al. (2024), "GPTs are GPTs" | LLM exposure index for ~1,000 occupations | Primary exposure measure for Part III |
| Felten et al. (2023), "AI Occupational Exposure" | AI application-level exposure index | Secondary exposure measure |
| Autor, Dorn & Hanson (2013), "China Syndrome" | Trade-shock employment effects by CZ | Control variable for Part I |
| Brookings (2026), "Adaptive Capacity" | Occupation-level measure of workers' transition ability | Moderating variable for Part III |
| Yale Budget Lab (2025), "AI and Labor Market" | Analysis using Anthropic usage data + O*NET | Methodological reference |
| WEF Future of Jobs (2025) | 1,000 employer survey across 55 economies | Employer perspective data |
| SHRM (2025), "Automation/AI Survey" | Task automation levels + nontechnical displacement barriers | Moderation analysis |
| Manning & Aguirre (2026), GovAI | AI exposure + actual hiring/separation data | Methodological peer |
| Acemoglu et al. (2022), "Tasks, Automation" | Task-based model of AI displacement and augmentation | Theoretical framework |

## Appendix B: SOC Code Reference for Key Occupations

```
15-1251  Computer Programmers (-6% projected 2024–2034)
15-1252  Software Developers (+15% projected 2024–2034)
15-1253  Software QA Analysts and Testers (+15% projected)
15-1241  Computer Network Architects
15-1242  Database Administrators
15-1243  Database Architects
15-1244  Network/Systems Administrators
15-1211  Computer Systems Analysts
15-1212  Information Security Analysts (+33% projected)
15-1221  Computer and Information Research Scientists (+20% projected)
15-2051  Data Scientists (+33% projected)
13-2051  Financial Analysts
13-2011  Accountants and Auditors
23-1011  Lawyers
27-3031  Public Relations Specialists
27-3042  Technical Writers
27-1024  Graphic Designers
43-4051  Customer Service Representatives
43-9021  Data Entry Keyers
43-6014  Secretaries and Administrative Assistants
27-3091  Interpreters and Translators
41-2031  Retail Salespersons
```
