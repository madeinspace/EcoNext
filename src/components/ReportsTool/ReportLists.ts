export const EconomicOverviewReports = [
  {
    id: 1,
    label: 'Introduction',
    options: [
      { label: 'About the area', value: 4180 },
      { label: 'Infrastructure', value: 4190 },
    ],
  },
  {
    id: 2,
    label: 'Economic indicators',
    options: [
      { label: 'Population', value: 4110 },
      { label: 'Gross product', value: 4120 },
      { label: 'Local Employment', value: 4122 },
      { label: 'Industry composition', value: 4123 },
      { label: 'Employed residents', value: 4124 },
      { label: 'Unemployment', value: 4130 },
      { label: 'Building approvals', value: 4140 },
      { label: 'Retail trade', value: 4150 },
      { label: 'Consumer Price Index', value: 4160 },
    ],
  },
  {
    id: 3,
    label: 'Industry structure',
    options: [
      { label: 'Employment by industry (FTE)', value: 4230 },
      { label: 'Value added', value: 4250 },
      { label: 'Worker productivity', value: 4300 },
      { label: 'Businesses by industry', value: 4310 },
    ],
  },
  {
    id: 4,
    label: 'Industry focus',
    options: [
      { label: 'Industry sector analysis', value: 4330 },
      { label: 'Time series industry sector analysis', value: 4332 },
    ],
  },
  {
    id: 5,
    label: 'Businesses',
    options: [
      { label: 'Employment locations', value: 4350 },
      { label: 'Business locations', value: 4351 },
    ],
  },
  {
    id: 6,
    label: 'Journey to work',
    options: [
      { label: 'Workers place of residence by industry', value: 4371 },
      { label: 'Residents place of work by industry', value: 4381 },
      { label: 'Jobs to workers ratio', value: 4510 },
    ],
  },
  {
    id: 7,
    label: 'Workforce summary',
    options: [
      { label: 'Key statistics', value: 4422 },
      { label: 'Age structure', value: 4423 },
      { label: 'Income quartiles', value: 4434 },
    ],
  },

  { id: 8, label: 'Resident workers', options: [{ label: 'Key statistics', value: 4430 }] },
  { id: 9, label: 'Supporting information', options: [{ label: 'Overview', value: 4550 }] },
  {
    id: 10,
    label: 'Custom industries',
    options: [
      { label: 'Tourism sector analysis', value: 4541 },
      { label: 'Workforce characteristics', value: 4542 },
    ],
  },
];

export const industrySectorReports = [
  { id: 0, label: 'Introduction', options: [{ label: 'About the area', value: 4180 }] },
  { id: 1, label: 'All industries', options: [] },
  { id: 2, label: 'Industry mapping (1-digit)', options: [] },
  { id: 3, label: 'Local workers', options: [] },
  { id: 4, label: 'Supporting information', options: [] },
];

export const employmentReports = [
  { group: 'Introduction', options: [] },
  { group: 'Employment by industry', options: [] },
  { group: 'Employment by location', options: [] },
  { group: 'Local employment capacity', options: [] },
  { group: 'Local workers', options: [] },
  { group: 'Unemployment', options: [] },
  { group: 'Supporting information', options: [] },
];
