/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react';
import fetchClientData from '../../../utils/fetchClientData';
import fetchLayout from '../../../layouts';
import PageMappings from '../../../layouts/pageMappings';
import MainLayout from '../../../layouts/main';
import PageHeader from '../../../components/PageHeader';
import Headline from '../../../components/Headline';
import Description from '../../../components/Description';
import filterEntities from '../../../utils/filterEntities';
import { PageContext, ClientContext } from '../../../utils/context';
import { Actions, Share, ExportPage } from '../../../components/Actions';
import Error from 'next/error';
import fetchToggleOptions from '../../../utils/fetchToggleOptions';
import { activeCustomToggles } from '../../../layouts/about';
import getActiveToggle from '../../../utils/getActiveToggle';

const HomePageComponent = ({ client, page }): JSX.Element => {
  const MainContent = PageMappings['about'];
  const { pageData } = page;
  return !pageData ? (
    <Error statusCode={404} />
  ) : (
    <PageContext.Provider value={page}>
      <ClientContext.Provider value={client}>
        <MainLayout>
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
      </ClientContext.Provider>
    </PageContext.Provider>
  );
};

HomePageComponent.getInitialProps = async function({ query, req: { containers } }): Promise<{}> {
  const { clientAlias, ...providedFilters } = query;
  const handle = 'about';
  const client: any = await fetchClientData({ clientAlias, containers });
  const fourOfourData = { client, page: { pageData: null, filters: [], handle } };
  // no client? => 404
  if (client === null) return fourOfourData;

  const { ID, isLite, LongName } = client;
  const layoutData = await fetchLayout(handle);
  const { fetchData, pageContent } = layoutData;
  const { AllPages } = containers;
  const pageData = AllPages[handle];
  const pageDefaultFilters = (pageContent['filterToggles'] || []).reduce(
    (acc, { ParamName, DefaultValue }) => ({
      ...acc,
      [ParamName]: DefaultValue,
    }),
    { ClientID: ID, IsLite: isLite, WebID: 10 },
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

  // we pass that data to interpolate the entities
  const customToggles = await activeCustomToggles({ filterToggles });
  const currentAreaName = getActiveToggle(filterToggles, 'WebID', client.LongName);
  const HasPrefix = client.HasPrefix;
  const prefix = HasPrefix ? 'the ' : '';
  const prefixedAreaName = `${prefix}${currentAreaName}`;
  const data = {
    HasPrefix,
    currentAreaName,
    prefixedAreaName,
    ...customToggles,
  };

  const mapLayers = [...new Set(client.clientAreas.map(item => item.LayerID))].join(',');
  const contentData = await fetchData({ filters, LongName, clientAlias, mapLayers });
  const entities = await filterEntities(filters, pageContent['entities'], { contentData, data });

  const page = {
    handle,
    contentData,
    filters,
    filterToggles,
    providedFilters: [],
    pageData,
    entities,
    entityData: data,
  };

  return {
    client,
    page,
  };
};

export default HomePageComponent;
