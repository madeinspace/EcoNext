/* eslint-disable @typescript-eslint/explicit-function-return-type */
import GrossProduct from './gross-product/page';
import Parent from './parent-landing/page';
import Population from './population/page';
import ValueOfBuildingApprovals from './value-of-building-approvals/page';
import WorkersFieldOfQualification from './workers-field-of-qualification/page';
import NumberOfBusinessesByIndustry from './number-of-businesses-by-industry/page';
import IndustrySectorAnalysis from './industry-sector-analysis/page';
import LocalJobs from './local-jobs/page';
import HomePage from './home/page';
import EmploymentByIndustryPage from './employment-by-industry/page';
import EmploymentByIndustryFtePage from './employment-by-industry-fte/page';
import EmploymentCensusPage from './employment-census/page';
import WorkerProductivityByIndustryPage from './worker-productivity-by-industry/page';
import ValueAddByIndustryPage from './value-add-by-industry/page';
import OutputByIndustryPage from './output-by-industry/page';
import LocalSalesByIndustryPage from './local-sales-by-industry/page';
import ExportsByIndustryPage from './exports-by-industry/page';
import ImportsByIndustryPage from './imports-by-industry/page';
import FieldOfQualification from './field-of-qualification/page';
import Industry from './industry/page';
import AgeStructure from './age-structure/page';
import HoursWorked from './hours-worked/page';
import Occupations from './occupations/page';
import Qualifications from './qualifications/page';
import IncomePage from './income/page';
import IncomeQuartile from './income-quartiles/page';
import WorkersAgeStructurePage from './workers-age-structure/page';
import WorkersHoursWorkedPage from './workers-hours-worked/page';
import WorkersOccupationsPage from './workers-occupations/page';
import WorkerLevelOfQualificationPage from './workers-level-of-qualifications/page';
import WorkersIncomePage from './workers-income/page';
import WorkersIncomeQuartilePage from './workers-income-quartile/page';
import WorkerMethodOfTravelToWorkPage from './workers-travel-to-work/page';
import ResidentWorkerMethodOfTravelToWorkPage from './travel-to-work/page';
import WorkersKeyStatisticsPage from './workers-key-statistics/page';
import WorkersKeyStatisticsLitePage from './workers-key-statistics-lite/page';
import ResidentWorkersKeyStatisticsPage from './labourforce-key-statistics/page';
import ResidentWorkersKeyStatisticsLitePage from './labourforce-key-statistics-lite/page';
import UnemployedKeyStatisticsPage from './unemployed-keystats/page';
import GrossRegionalProductPage from './gross-regional-product/page';
import UnemploymentPage from './unemployment/page';
import AboutEconomyId from './about-economy-id/page';
import IndustrySectorDefinitionsPage from './industry-sector-definitions/page';

const parentPageMappings = {
  indicator: Parent,
  size: Parent,
  structure: Parent,
  'spatial-economy': Parent,
  'industry-focus': Parent,
  'journey-to-work': Parent,
  'workforce-profiles': Parent,
  'labour-force': Parent,
  'local-market': Parent,
  'housing-market': Parent,
  tourism: Parent,
  'reports-root': Parent,
  'about-economy-parent': Parent,
  'explanatory-notes': Parent,
};

const PageMappings = {
  home: HomePage,
  'gross-product': GrossProduct,
  population: Population,
  'local-jobs': LocalJobs,
  'value-of-building-approvals': ValueOfBuildingApprovals,
  'workers-field-of-qualification': WorkersFieldOfQualification,
  'number-of-businesses-by-industry': NumberOfBusinessesByIndustry,
  'industry-sector-analysis': IndustrySectorAnalysis,
  'employment-by-industry': EmploymentByIndustryPage,
  'employment-by-industry-fte': EmploymentByIndustryFtePage,
  'employment-census': EmploymentCensusPage,
  'worker-productivity-by-industry': WorkerProductivityByIndustryPage,
  'value-add-by-industry': ValueAddByIndustryPage,
  'output-by-industry': OutputByIndustryPage,
  'local-sales-by-industry': LocalSalesByIndustryPage,
  'exports-by-industry': ExportsByIndustryPage,
  'imports-by-industry': ImportsByIndustryPage,
  'field-of-qualification': FieldOfQualification,
  industry: Industry,
  'age-structure': AgeStructure,
  'hours-worked': HoursWorked,
  occupations: Occupations,
  qualifications: Qualifications,
  income: IncomePage,
  'income-quartiles': IncomeQuartile,
  'workers-age-structure': WorkersAgeStructurePage,
  'workers-hours-worked': WorkersHoursWorkedPage,
  'workers-occupations': WorkersOccupationsPage,
  'workers-level-of-qualifications': WorkerLevelOfQualificationPage,
  'workers-income': WorkersIncomePage,
  'workers-income-quartile': WorkersIncomeQuartilePage,
  'workers-travel-to-work': WorkerMethodOfTravelToWorkPage,
  'travel-to-work': ResidentWorkerMethodOfTravelToWorkPage,
  'workers-key-statistics': WorkersKeyStatisticsPage,
  'workers-key-statistics-lite': WorkersKeyStatisticsLitePage,
  'labourforce-key-statistics': ResidentWorkersKeyStatisticsPage,
  'labourforce-key-statistics-lite': ResidentWorkersKeyStatisticsLitePage,
  'unemployed-keystats': UnemployedKeyStatisticsPage,
  'gross-regional-product': GrossRegionalProductPage,
  unemployment: UnemploymentPage,
  'about-economy-id': AboutEconomyId,
  'industry-sector-definitions': IndustrySectorDefinitionsPage,
};

export default { ...PageMappings, ...parentPageMappings };
