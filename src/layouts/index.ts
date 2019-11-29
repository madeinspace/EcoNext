import EconomicImpactAssesment from './economic-impact-assesment/page';
import GrossProduct from './gross-product/page';
import Indicator from './indicator/page';
import Population from './population/page';
import ValueOfBuildingApprovals from './value-of-building-approvals/page';
import WorkersFieldOfQualification from './workers-field-of-qualification/page';
import NumberOfBusinessesByIndustry from './number-of-businesses-by-industry/page';
import IndustrySectorAnalysis from './industry-sector-analysis/page';

export const PageMappings = {
  'gross-product': GrossProduct,
  indicator: Indicator,
  population: Population,
  'value-of-building-approvals': ValueOfBuildingApprovals,
  'workers-field-of-qualification': WorkersFieldOfQualification,
  'economic-impact-assesment': EconomicImpactAssesment,
  'number-of-businesses-by-industry': NumberOfBusinessesByIndustry,
  'industry-sector-analysis': IndustrySectorAnalysis,
};

const productionPages = ['population'];

const devPages = [
  'gross-product',
  'indicator',
  'population',
  'value-of-building-approvals',
  'workers-field-of-qualification',
  'economic-impact-assesment',
  'number-of-businesses-by-industry',
  'industry-sector-analysis',
];

const fetchPageData = async handle => {
  const pageData = await import(`./${handle}`);

  return pageData;
};

export const isNextPage = handle => {
  const availablePages = process.env.NODE_ENV === 'production' ? productionPages : devPages;

  return availablePages.indexOf(handle) >= 0;
};

export default async handle => {
  if (!isNextPage(handle)) {
    return null;
  }

  const pageData = await fetchPageData(handle);

  return pageData;
};
