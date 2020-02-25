/* eslint-disable @typescript-eslint/explicit-function-return-type */
import GrossProduct from './gross-product/page';
import Indicator from './indicator/page';
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
import LabourforceKeyStatistics from './labourforce-key-statistics/page';
import IncomePage from './income/page';
import IncomeQuartile from './income-quartiles/page';
import WorkersAgeStructurePage from './workers-age-structure/page';
import WorkersHoursWorkedPage from './workers-hours-worked/page';
import WorkersOccupationsPage from './workers-occupations/page';
import WorkerLevelOfQualificationPage from './workers-level-of-qualifications/page';

const PageMappings = {
  home: HomePage,
  'gross-product': GrossProduct,
  indicator: Indicator,
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
  'labourforce-key-statistics': LabourforceKeyStatistics,
  income: IncomePage,
  'income-quartiles': IncomeQuartile,
  'workers-age-structure': WorkersAgeStructurePage,
  'workers-hours-worked': WorkersHoursWorkedPage,
  'workers-occupations': WorkersOccupationsPage,
  'workers-level-of-qualifications': WorkerLevelOfQualificationPage,
};

export default PageMappings;
