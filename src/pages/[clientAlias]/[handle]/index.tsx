// #region imports
import { useContext } from 'react';

// #region imports api
import fetchClientData from '../../../utils/fetchClientData';
// #endregion

import fetchLayout, { PageMappings } from '../../../layouts';
import MainLayout from '../../../layouts/main';
import ParentLandingPageLayout from '../../../layouts/parentLandingPages';

import fetchToggleOptions from '../../../utils/fetchToggleOptions';
import RelatedPagesCTA from '../../../components/RelatedPages';
import PageHeader from '../../../components/PageHeader';
import Headline from '../../../components/Headline';
import Description from '../../../components/Description';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import filterEntities from '../../../utils/filterEntities';
import getActiveToggle from '../../../utils/getActiveToggle';

import { PageContext, ClientContext } from '../../../utils/context';

const PageTemplate = () => {
  const { pageData, handle } = useContext(PageContext);

  if (!pageData) {
    return <MainLayout>404</MainLayout>;
  }

  const { ParentPageID } = pageData;

  const MainContent = PageMappings[handle];

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

const PageComponent = ({ client, page }) => (
  <PageContext.Provider value={page}>
    <ClientContext.Provider value={client}>
      <PageTemplate />
    </ClientContext.Provider>
  </PageContext.Provider>
);

PageComponent.getInitialProps = async function({ query, req: { containers } }) {
  const { clientAlias: ClientAlias, handle, ...providedFilters } = query;

  const client = await fetchClientData({ ClientAlias, containers });

  const layoutData = await fetchLayout(handle);

  if (!layoutData) {
    // 404
    return { client, page: { pageData: null, filters: [], handle } };
  }

  const { fetchData, pageContent } = layoutData;

  const { AllPages } = containers;

  const pageData = AllPages[handle];

  const pageDefaultFilters = (pageContent['toggles'] || []).reduce(
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
    ClientID: client.ID,
  };

  const toggles = await fetchToggleOptions(filters, pageContent['toggles'] || []);

  const data = {
    currentAreaName: getActiveToggle(toggles, 'WebID', client.LongName),
    currentGenderName: getActiveToggle(toggles, 'Sex'),
    currentIndustryName: getActiveToggle(toggles, 'Indkey'),
  };

  const tableData = await fetchData({ filters });

  const entities = await filterEntities(filters, pageContent['entities'], { tableData, data });

  const page = {
    handle,
    tableData,
    filters,
    toggles,
    pageData,
    entities,
  };

  return {
    client,
    page,
  };
};

export default PageComponent;
