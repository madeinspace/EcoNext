import EconomicImpactAssesment from './economic-impact-assesment/page';
import GrossProduct from './gross-product/page';
import Indicator from './indicator/page';
import Population from './population/page';
import ValueOfBuildingApprovals from './value-of-building-approvals/page';
import WorkersFieldOfQualification from './workers-field-of-qualification/page';

const productionPages = {
  population: Population,
};

const devPages = {
  'gross-product': GrossProduct,
  indicator: Indicator,
  population: Population,
  'value-of-building-approvals': ValueOfBuildingApprovals,
  'workers-field-of-qualification': WorkersFieldOfQualification,
  'economic-impact-assesment': EconomicImpactAssesment,
};

export default () => {
  if (process.env.NODE_ENV === 'production') {
    return productionPages;
  }

  return devPages;
};
