/* eslint-disable @typescript-eslint/no-explicit-any */
// #region imports
import React, { useContext } from 'react';

// #region imports api
import fetchClientData from '../../../utils/fetchClientData';
// #endregion

import fetchLayout, { PageMappings } from '../../../layouts';
import MainLayout from '../../../layouts/main';
import ParentLandingPageLayout from '../../../layouts/parentLandingPages';

import fetchToggleOptions, { globalToggles } from '../../../utils/fetchToggleOptions';
import PageHeader from '../../../components/PageHeader';
import Headline from '../../../components/Headline';
import Description from '../../../components/Description';
import filterEntities from '../../../utils/filterEntities';
import getActiveToggle from '../../../utils/getActiveToggle';

import { PageContext, ClientContext } from '../../../utils/context';
import { Actions, Share, ExportPage } from '../../../components/Actions';
import SiblingsMenu from '../../../components/SiblingsMenu';

const ErrorPage = ({ status }): JSX.Element => {
  return <div>Oh no, this is a {status} page</div>;
};

const PageTemplate = (): JSX.Element => {
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
      <SiblingsMenu />
      <PageHeader>
        <Actions>
          <Share />
          <ExportPage />
        </Actions>
      </PageHeader>
      <Headline />
      <Description />
      <MainContent />
    </MainLayout>
  );
};

const PageComponent = ({ client, page }): JSX.Element => (
  // we set the value of Page and Client context here
  <PageContext.Provider value={page}>
    <ClientContext.Provider value={client}>
      <PageTemplate />
    </ClientContext.Provider>
  </PageContext.Provider>
);

PageComponent.getInitialProps = async function({ query, req: { containers } }): Promise<{}> {
  const { clientAlias: clientAlias, handle, ...providedFilters } = query;

  const client: any = await fetchClientData({ clientAlias, containers });

  //
  const layoutData = await fetchLayout(handle);

  if (!layoutData || !client) {
    // 404
    return { client, page: { pageData: null, filters: [], handle } };
  }

  const { fetchData, pageContent, activeCustomToggles } = layoutData;

  const { AllPages } = containers;

  const pageData = AllPages[handle];

  const pageDefaultFilters = (pageContent['filterToggles'] || []).reduce(
    (acc, { ParamName, DefaultValue }) => ({
      ...acc,
      [ParamName]: DefaultValue,
    }),
    [],
  );

  /**
   * the provided filters from the query string can be wrong
   * but we don't know it yet at this stage and we'll have to update them later
   * (see note in the fetchToggleOptions() method)
   */
  const tempfilters = {
    ...pageDefaultFilters,
    ...providedFilters,
    ClientID: client.ID,
    IsLite: client.isLite,
  };

  const filterToggles = await fetchToggleOptions(
    tempfilters,
    [...pageContent['filterToggles'], ...globalToggles] || [],
  );

  const activeFilters = filterToggles.map(({ key, value }) => {
    return { [key]: value };
  });

  // let's update the filters with the active one
  const filters = Object.assign(tempfilters, ...activeFilters);

  const contentData = await fetchData({ filters });

  // we pass that data to interpolate the entities
  const customToggles = await activeCustomToggles({ filterToggles });
  const data = {
    currentAreaName: getActiveToggle(filterToggles, 'WebID', client.LongName),
    ...customToggles,
    HasPrefix: client.HasPrefix,
  };
  const entities = await filterEntities(filters, pageContent['entities'], { contentData, data });

  const page = {
    handle,
    contentData,
    filters,
    filterToggles,
    providedFilters,
    pageData,
    entities,
    entityData: data,
  };

  return {
    client,
    page,
  };
};

export default PageComponent;
