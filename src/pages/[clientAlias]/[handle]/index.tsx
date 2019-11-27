// #region imports
import { useContext } from 'react';
import { Context } from '../../../utils/context';

// #region imports api
import fetchClientData from '../../../utils/fetchClientData';
import fetchSitemap from '../../../utils/fetchSitemap';
// #endregion

import MainLayout from '../../../layouts/main';

import GrossProduct from '../../../layouts/gross-product/page';
import Population from '../../../layouts/population/page';
import ValueOfBuildingApprovals from '../../../layouts/value-of-building-approvals/page';
import WorkersFieldOfQualification from '../../../layouts/workers-field-of-qualification/page';
import EconomicImpactAssesment from '../../../layouts/economic-impact-assesment/page';
import Indicator from '../../../layouts/indicator/page';
import ParentLandingPageLayout from '../../../layouts/parentLandingPages';
// #endregion

import contentData from '../../../data/content';
import toggleData from '../../../data/toggles';
import fetchToggleOptions from '../../../utils/fetchToggleOptions';
import RelatedPagesCTA from '../../../components/RelatedPages';
import PageHeader from '../../../components/PageHeader';
import Headline from '../../../components/Headline';
import Description from '../../../components/Description';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import filterEntities from '../../../utils/filterEntities';
import getActiveToggle from '../../../utils/getActiveToggle';

export const NextPages = {
  'gross-product': GrossProduct,
  indicator: Indicator,
  population: Population,
  'value-of-building-approvals': ValueOfBuildingApprovals,
  'workers-field-of-qualification': WorkersFieldOfQualification,
  'economic-impact-assesment': EconomicImpactAssesment,
};

const PageTemplate = () => {
  const { pageData, handle } = useContext(Context);
  const { ParentPageID } = pageData;
  const MainContent = NextPages[handle];

  if (!ParentPageID) {
    return (
      <ParentLandingPageLayout>
        <MainContent />
      </ParentLandingPageLayout>
    );
  }

  return (
    <MainLayout>
      <PageHeader />
      <Headline />
      <Description />
      <ControlPanel />
      <MainContent />
      <RelatedPagesCTA />
    </MainLayout>
  );
};

const Page = props => {
  return (
    <Context.Provider value={props}>
      <PageTemplate />
    </Context.Provider>
  );
};

Page.getInitialProps = async function({ query, req: { containers } }) {
  const { clientAlias, handle, ...providedFilters } = query;
  const clientData: any = await fetchClientData({
    clientAlias,
    containers,
  });

  const { ClientID, clientAreas, clientProducts, clientPages } = clientData;

  const pageDefaultFilters = (toggleData[handle] || []).reduce(
    (acc, { ParamName, DefaultValue }) => ({
      ...acc,
      [ParamName]: DefaultValue,
    }),
    [],
  );

  const filters = {
    IGBMID: 40,
    Indkey: 23000,
    Sex: 3,
    WebID: 10,
    ...pageDefaultFilters,
    ...providedFilters,
    ClientID,
  };

  const { fetchData } = await import(`../../../layouts/${handle}`);

  const { AllPages } = containers;

  const pageData = AllPages[handle];

  const toggles = await fetchToggleOptions(filters, toggleData[handle] || []);

  const tableData = await fetchData({ filters });

  const data = {
    currentAreaName: getActiveToggle(toggles, 'WebID', clientData.LongName),
    currentGenderName: getActiveToggle(toggles, 'Sex'),
    currentIndustryName: getActiveToggle(toggles, 'Indkey'),
  };

  const entities = await filterEntities(filters, contentData[handle], { tableData, data });

  const sitemapGroups = await fetchSitemap();

  return {
    tableData,
    navigation: clientPages,
    clientProducts,
    sitemapGroups,
    filters,
    clientAreas,
    handle,
    clientData,
    clientAlias,
    toggles,
    pageData,
    entities,
  };
};

export default Page;
