import { Context } from '../../../utils/context';

import fetchClientData from '../../../utils/fetchClientData';
import fetchSitemap from '../../../utils/fetchSitemap';

import Population from '../../../layouts/population/page';
import ValueOfBuildingApprovals from '../../../layouts/value-of-building-approvals/page';
import WorkersFieldOfQualification from '../../../layouts/workers-field-of-qualification/page';

import toggleData from '../../../data/toggles';
import fetchToggleOptions from '../../../utils/fetchToggleOptions';

export const NextPages = {
  population: Population,
  'value-of-building-approvals': ValueOfBuildingApprovals,
  'workers-field-of-qualification': WorkersFieldOfQualification,
};

const Page = props => {
  const Layout = NextPages[props.handle];

  return (
    <Context.Provider value={props}>
      <Layout />
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

  // const pageData = AllPages[handle];

  const toggles = await fetchToggleOptions(filters, toggleData[handle]);

  const tableData = await fetchData(filters);

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
  };
};

export default Page;
