// #region imports
import React, { useContext } from 'react';

// #region imports api
import fetchClientData from '../../../utils/fetchClientData';
// #endregion

import fetchLayout, { PageMappings } from '../../../layouts';
import MainLayout from '../../../layouts/main';
import ParentLandingPageLayout from '../../../layouts/parentLandingPages';

import fetchToggleOptions, { globalToggles } from '../../../utils/fetchToggleOptions';
import RelatedPagesCTA from '../../../components/RelatedPages';
import PageHeader from '../../../components/PageHeader';
import Headline from '../../../components/Headline';
import Description from '../../../components/Description';
import filterEntities from '../../../utils/filterEntities';
import getActiveToggle from '../../../utils/getActiveToggle';

import { PageContext, ClientContext } from '../../../utils/context';

const ErrorPage = ({ status }) => {
  return <div>Oh no, this is a {status} page</div>;
};

const PageTemplate = () => {
  const { pageData, handle } = useContext(PageContext);

  if (!pageData) {
    return <MainLayout Template={() => <ErrorPage status={404} />}>404</MainLayout>;
  }

  const { ParentPageID } = pageData;

  const MainContent = PageMappings[handle];

  if (!ParentPageID) {
    return (
      <ParentLandingPageLayout>
        <PageHeader />
        <MainContent />
      </ParentLandingPageLayout>
    );
  }

  return (
    <MainLayout>
      <PageHeader />
      <Headline />
      <Description />
      <MainContent />
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
  const { clientAlias: clientAlias, handle, ...providedFilters } = query;

  const client = await fetchClientData({ clientAlias, containers });

  const layoutData = await fetchLayout(handle);

  if (!layoutData || !client) {
    // 404
    return { client, page: { pageData: null, filters: [], handle } };
  }

  const { fetchData, pageContent } = layoutData;

  const { AllPages } = containers;

  const pageData = AllPages[handle];

  const pageDefaultFilters = (pageContent['filterToggles'] || []).reduce(
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
    IsLite: client.isLite,
  };

  const filterToggles = await fetchToggleOptions(filters, [...pageContent['filterToggles'], ...globalToggles] || []);

  const data = {
    currentAreaName: getActiveToggle(filterToggles, 'WebID', client.LongName),
    currentGenderName: getActiveToggle(filterToggles, 'Sex'),
    currentIndustryName: getActiveToggle(filterToggles, 'Indkey'),
  };

  const tableData = await fetchData({ filters });

  const entities = await filterEntities(filters, pageContent['entities'], { tableData, data });

  const page = {
    handle,
    tableData,
    filters,
    filterToggles,
    pageData,
    entities,
  };

  return {
    client,
    page,
  };
};

export default PageComponent;
