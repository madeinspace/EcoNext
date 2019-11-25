import { Context } from '../../../utils/context';

import fetchClientData from '../../../utils/fetchClientData';
import fetchSitemap from '../../../utils/fetchSitemap';
import fetchIndustries from '../../../utils/fetchIndustries';
import fetchBenchmarkAreas from '../../../utils/fetchBenchmarkAreas';

import Population from '../../../layouts/population/page';
import ValueOfBuildingApprovals from '../../../layouts/value-of-building-approvals/page';
import WorkersFieldOfQualification from '../../../layouts/workers-field-of-qualification/page';

const defaultFilters = {
  Indkey: 23000,
  IGBMID: 40,
  Sex: 3,
  WebID: 10,
};

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

Page.getInitialProps = async function({ query, req }) {
  const filters = {
    ...defaultFilters,
    ...query,
  };

  const { clientAlias, handle } = query;

  const { fetchData } = await import(`../../../layouts/${handle}`);

  const clientData: any = await fetchClientData({
    clientAlias,
    containers: req.containers,
  });

  const { ClientID, clientAreas, clientProducts, clientPages } = clientData;

  const tableData = await fetchData({ ClientID, ...filters });

  const Industries = await fetchIndustries(40);
  const BenchmarkAreas = await fetchBenchmarkAreas(ClientID);
  const sitemapGroups = await fetchSitemap();

  const Sexes = [
    { ID: 1, Name: 'Males' },
    { ID: 2, Name: 'Females' },
    { ID: 3, Name: 'Persons' },
  ];

  return {
    tableData,
    Industries,
    BenchmarkAreas,
    Sexes,
    navigation: clientPages,
    clientProducts,
    sitemapGroups,
    filters,
    clientAreas,
    handle,
    clientData,
    clientAlias,
  };
};

export default Page;
