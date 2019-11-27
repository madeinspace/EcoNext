import { Context } from '../../../utils/context';

import fetchClientData from '../../../utils/fetchClientData';
import fetchSitemap from '../../../utils/fetchSitemap';

import MainLayout from '../../../layouts/main';

import GrossProduct from '../../../layouts/gross-product/page';
import Population from '../../../layouts/population/page';
import ValueOfBuildingApprovals from '../../../layouts/value-of-building-approvals/page';
import WorkersFieldOfQualification from '../../../layouts/workers-field-of-qualification/page';

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
  population: Population,
  'value-of-building-approvals': ValueOfBuildingApprovals,
  'workers-field-of-qualification': WorkersFieldOfQualification,
};

const Page = props => {
  const MainContent = NextPages[props.handle];

  return (
    <Context.Provider value={props}>
      <MainLayout>
        <PageHeader />
        <Headline />
        <Description />
        <ControlPanel />
        <MainContent />
        <RelatedPagesCTA />
      </MainLayout>
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

  const pageDefaultFilters = (toggleData[handle] || []).reduce((acc, { ParamName, DefaultValue }) => ({
    ...acc,
    [ParamName]: DefaultValue,
  }));

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

  // const { AllPages } = containers;

  const toggles = await fetchToggleOptions(filters, toggleData[handle]);

  const tableData = await fetchData({ filters });

  console.log(tableData[0]);

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
