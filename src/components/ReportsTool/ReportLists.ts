export const EconomicOverviewReports = [
  {
    id: 1,
    col: 1,
    label: 'Introduction',
    value: 'introduction',
    options: [
      { label: 'About the area', id: 4180, value: 'about' },
      { label: 'Infrastructure', id: 4190, value: 'infrastructure' },
    ],
  },
  {
    id: 2,
    col: 1,
    label: 'Economic indicators',
    value: 'economic-indicators',
    options: [
      { label: 'Population', id: 4110, value: 'population' },
      { label: 'Gross product', id: 4120, value: 'gross-product' },
      { label: 'Local Employment', id: 4122, value: 'local-jobs' },
      { label: 'Industry composition', id: 4123, value: 'industry-composition' },
      { label: 'Employed residents', id: 4124, value: 'employed-residents' },
      { label: 'Unemployment', id: 4130, value: 'unemployment' },
      { label: 'Building approvals', id: 4140, value: 'value-of-building-approvals' },
      { label: 'Retail trade', id: 4150, value: 'retail-trade' },
      { label: 'Consumer Price Index', id: 4160, value: 'consumer-price-index' },
    ],
  },
  {
    id: 3,
    col: 1,
    label: 'Industry structure',
    value: 'industry-structure',
    options: [
      { label: 'Employment by industry (FTE)', id: 4230, value: 'employment-by-industry-fte' },
      { label: 'Value added', id: 4250, value: 'value-add-by-industry' },
      { label: 'Worker productivity', id: 4300, value: 'worker-productivity-by-industry' },
      { label: 'Businesses by industry', id: 4310, value: 'number-of-businesses-by-industry' },
    ],
  },
  {
    id: 4,
    col: 2,
    label: 'Industry focus',
    value: 'industry-focus',
    options: [
      { label: 'Industry sector analysis', id: 4330, value: 'industry-sector-analysis' },
      { label: 'Time series industry sector analysis', id: 4332, value: 'industry-sector-analysis-series' },
    ],
  },
  {
    id: 5,
    col: 2,
    label: 'Businesses',
    value: 'businesses',
    options: [
      { label: 'Employment locations', id: 4350, value: 'employment-locations' },
      { label: 'Business locations', id: 4351, value: 'business-locations' },
    ],
  },
  {
    id: 6,
    col: 2,
    label: 'Journey to work',
    value: 'journey-to-work',
    options: [
      { label: 'Workers place of residence by industry', id: 4371, value: 'workers-place-of-residence-industry' },
      { label: 'Residents place of work by industry', id: 4381, value: 'residents-place-of-work-industry' },
      { label: 'Jobs to workers ratio', id: 4510, value: 'Employment-capacity' },
    ],
  },
  {
    id: 7,
    col: 2,
    label: 'Workforce summary',
    value: 'workforce-summary',
    options: [
      { label: 'Key statistics', id: 4422, value: 'labourforce-key-statistics' },
      { label: 'Age structure', id: 4423, value: 'age-structure' },
      { label: 'Income quartiles', id: 4434, value: 'income-quartiles' },
    ],
  },

  {
    id: 8,
    col: 3,
    label: 'Resident workers',
    value: 'resident-workers',
    options: [{ label: 'Key statistics', id: 4430, value: 'workers-key-statistic' }],
  },
  {
    id: 9,
    col: 3,
    label: 'Custom industries',
    value: 'custom-industries',
    options: [
      { label: 'Tourism sector analysis', id: 4541, value: 'tourism-value' },
      { label: 'Workforce characteristics', id: 4542, value: 'tourism-workforce' },
    ],
  },
  {
    id: 10,
    col: 3,
    label: 'Supporting information',
    value: 'supporting-information',
    options: [{ label: 'Overview', id: 4550, value: 'about-economy-id' }],
  },
];

export const IndustrySectorReports = [
  { id: 1, col: 1, label: 'Introduction', options: [{ label: 'About the area', id: 4180, value: 'about' }] },
  {
    id: 2,
    col: 1,
    label: 'All industries',
    options: [
      { label: 'Employment by industry (Total)', id: 4240, value: 'employment-by-industry' },
      { label: 'Employment by industry (FTE)', id: 4230, value: 'employment-by-industry-fte' },
      { label: 'Value added', id: 4250, value: 'value-add-by-industry' },
      { label: 'Output', id: 4260, value: 'output-by-industry' },
      { label: 'Exports', id: 4270, value: 'exports-by-industry' },
      { label: 'Imports', id: 4280, value: 'imports-by-industry' },
      { label: 'Local sales', id: 4290, value: 'local-sales-by-industry' },
      { label: 'Worker productivity', id: 4300, value: '"worker-productivity-by-industry' },
      { label: 'Businesses by industry', id: 4310, value: 'number-of-businesses-by-industry' },
    ],
  },
  {
    id: 3,
    col: 2,
    label: 'Industry mapping (1-digit)',
    options: [
      { label: 'Employment locations', id: 4350, value: 'employment-locations' },
      { label: 'Workers place of residence by industry', id: 4371, value: 'workers-place-of-residence-industry' },
      { label: 'Residents place of work by industry', id: 4381, value: 'residents-place-of-work-industry' },
    ],
  },
  {
    id: 4,
    col: 3,
    label: 'Industry mapping (2-digit)',
    options: [{ label: 'Industry sector analysis', id: 4330, value: 'industry-sector-analysis' }],
  },
  {
    id: 5,
    col: 2,
    label: 'Local workers',
    options: [
      { label: 'Key statistics', id: 4430, value: 'workers-key-statistics' },
      { label: 'Age structure', id: 4440, value: 'workers-age-structure' },
      { label: 'Hours worked', id: 4330, value: 'industry-sector-analysis' },
      { label: 'Occupations', id: 4460, value: 'workers-occupations' },
      { label: 'Qualifications', id: 4470, value: 'workers-level-of-qualifications' },
      { label: 'Field of qualification', id: 4480, value: 'workers-field-of-qualification' },
      { label: 'Income', id: 4482, value: 'workers-income' },
      { label: 'Income quartiles', id: 4433, value: 'workers-income-quartile' },
      { label: 'Method of travel to work', id: 4484, value: 'workers-travel-to-work' },
    ],
  },
  {
    id: 6,
    col: 3,
    label: 'Supporting information',
    options: [{ label: 'Overview', id: 4550, value: 'about-economy-id' }],
  },
];

export const EmploymentReports = [
  { group: 'Introduction', options: [{ label: 'About the area', id: 4180, value: 'about' }] },
  {
    group: 'Employment by industry',
    options: [
      { label: 'Employment by industry (Total)', id: 4240, value: 'employment-by-industry' },
      { label: 'Employment by industry (FTE)', id: 4230, value: 'employment-by-industry-fte' },
      { label: 'Worker productivity', id: 4300, value: 'worker-productivity-by-industry' },
    ],
  },
  {
    group: 'Employment by location',
    options: [
      { label: 'Employment locations', id: 4350, value: 'employment-locations' },
      { label: 'Workers place of residence by industry', id: 4371, value: 'workers-place-of-residence-industry' },
      { label: 'Residents place of work by industry', id: 4381, value: 'residents-place-of-work-industry' },
    ],
  },
  {
    group: 'Local employment capacity',
    options: [
      { label: 'Jobs to workers ratio', id: 4510, value: 'Employment-capacity' },
      { label: 'Employment self-containment', id: 4400, value: 'employed-locally' },
      { label: 'Employment self-sufficiency', id: 4410, value: 'local-employment' },
    ],
  },
  {
    group: 'Local workers',
    options: [
      { label: 'Key statistics', id: 4430, value: 'workers-key-statistics' },
      { label: 'Age structure', id: 4423, value: 'age-structure' },
      { label: 'Hours worked', id: 4450, value: 'workers-hours-worked' },
      { label: 'Occupations', id: 4460, value: 'workers-occupations' },
      { label: 'Qualifications', id: 4470, value: 'workers-level-of-qualifications' },
      { label: 'Field of qualification', id: 4480, value: 'workers-field-of-qualification' },
      { label: 'Income', id: 4482, value: 'workers-income' },
      { label: 'Income quartiles', id: 4433, value: 'workers-income-quartile' },
      { label: 'Method of travel to work', id: 4484, value: 'workers-travel-to-work' },
    ],
  },
  {
    group: 'Unemployment',
    options: [
      { label: 'Unemployment', id: 4130, value: 'unemployment' },
      { label: 'Characteristics of the unemployed', id: 4432, value: 'unemployed-keystats' },
    ],
  },
  { group: 'Supporting information', options: [{ label: 'Overview', id: 4550, value: 'about-economy-id' }] },
];
