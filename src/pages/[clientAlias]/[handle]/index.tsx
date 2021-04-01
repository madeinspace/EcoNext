// #region imports
import React, { useContext } from 'react';
import fetchClientData from '../../../utils/fetchClientData';
import fetchLayout from '../../../layouts';
import PageMappings from '../../../layouts/pageMappings';
import MainLayout from '../../../layouts/main';
import ParentLandingPageLayout from '../../../layouts/parentLandingPages';
import fetchToggleOptions, { globalToggles } from '../../../utils/fetchToggleOptions';
import PageHeader from '../../../components/PageHeader';
import Headline from '../../../components/Headline';
import Banner from '../../../components/ui/Banner';
import Description from '../../../components/Description';
import filterEntities from '../../../utils/filterEntities';
import getActiveToggle from '../../../utils/getActiveToggle';
import { PageContext, ClientContext } from '../../../utils/context';
import { Actions, Share, ExportPage } from '../../../components/Actions';
import SiblingsMenu from '../../../components/SiblingsMenu';
import Error from 'next/error';
// #endregion

const PageTemplate = (): JSX.Element => {
  const { pageData, handle } = useContext(PageContext);

  if (!pageData) {
    return <Error statusCode={404} />;
  }

  const { ParentPageID, IsParent } = pageData;

  const MainContent = PageMappings[handle];

  if (IsParent) {
    return (
      <ParentLandingPageLayout>
        <PageHeader />
        <MainContent />
      </ParentLandingPageLayout>
    );
  }

  return (
    <MainLayout>
      {ParentPageID > 0 && <SiblingsMenu />}
      <PageHeader>
        <Actions>
          <Share />
          <ExportPage />
        </Actions>
      </PageHeader>
      <Banner />
      <Headline />
      <Description />
      <MainContent />
    </MainLayout>
  );
};

const PageComponent = ({ client, page }): JSX.Element => {
  // we set the value of Page and Client context here
  return (
    <PageContext.Provider value={page}>
      <ClientContext.Provider value={client}>
        <PageTemplate />
      </ClientContext.Provider>
    </PageContext.Provider>
  );
};

PageComponent.getInitialProps = async function({ query, req: { containers } }): Promise<{}> {
  const { clientAlias, handle, ...providedFilters } = query;
  const client: any = await fetchClientData({ clientAlias, containers });
  const fourOfourData = { client, page: { pageData: null, filters: [], handle } };

  // no client? => 404
  if (!client) return fourOfourData;

  const clientPage = await client.clientPages.find(page => page.Alias === handle);

  // no page? => 404
  if (!clientPage) return fourOfourData;

  const layoutData = await fetchLayout(handle);
  const { ClientID, isLite, LongName } = client;
  const { fetchData, pageContent, activeCustomToggles } = layoutData;
  const pageDefaultFilters = (pageContent['filterToggles'] || []).reduce(
    (acc, { ParamName, DefaultValue }) => ({
      ...acc,
      [ParamName]: DefaultValue,
    }),
    { ClientID, IsLite: isLite, clientAlias, LongName },
  );

  /**
   * the provided filters from the query string can be wrong
   * but we don't know it yet at this stage and we'll have to update them later
   * (see note in the fetchToggleOptions() method)
   */
  const tempfilters = {
    ...pageDefaultFilters,
    ...providedFilters,
  };

  const filterToggles = await fetchToggleOptions(tempfilters, [...pageContent['filterToggles']] || []);

  const activeFilters = filterToggles.map(({ key, value }) => ({ [key]: value }));

  // let's update the filters with the active one
  const filters = Object.assign(tempfilters, ...activeFilters);

  const contentData = await fetchData({ filters });

  // we pass that data to interpolate the entities
  const customToggles = await activeCustomToggles({ filterToggles });
  const currentAreaName = getActiveToggle(filterToggles, 'WebID') || LongName;
  const HasPrefix = client.HasPrefix;
  const prefix = HasPrefix ? 'the ' : '';
  const prefixedAreaName = `${prefix}${currentAreaName}`;
  const data = {
    HasPrefix,
    currentAreaName,
    prefixedAreaName,
    ...customToggles,
  };
  const entities = await filterEntities(filters, pageContent['entities'], { contentData, data });

  const page = {
    handle,
    contentData,
    filters,
    filterToggles,
    providedFilters,
    pageData: clientPage,
    entities,
    entityData: data,
  };

  return {
    client,
    page,
  };
};

export default PageComponent;
