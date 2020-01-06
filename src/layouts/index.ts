/* eslint-disable @typescript-eslint/explicit-function-return-type */
import EconomicImpactAssesment from './economic-impact-assesment/page';
import GrossProduct from './gross-product/page';
import Indicator from './indicator/page';
import Population from './population/page';
import ValueOfBuildingApprovals from './value-of-building-approvals/page';
import WorkersFieldOfQualification from './workers-field-of-qualification/page';
import NumberOfBusinessesByIndustry from './number-of-businesses-by-industry/page';
import IndustrySectorAnalysis from './industry-sector-analysis/page';
import productionPages from './productionPages';
import developmentPages from './developmentPages';

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

const fetchPageData = async (handle: string) => {
  const pageData = await import(`./${handle}`);

  return pageData;
};

export const isNextPage = (handle: string) => {
  const availablePages = process.env.DEV_PAGES_ENABLED === 'true' ? developmentPages : productionPages;
  return availablePages.indexOf(handle) >= 0;
};

export default async (handle: string) => {
  if (!isNextPage(handle)) {
    return null;
  }

  const pageData = await fetchPageData(handle);

  return pageData;
};
