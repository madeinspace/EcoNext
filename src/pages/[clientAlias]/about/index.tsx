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

  const { ID, isLite } = client;
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

  const filters = {
    ...pageDefaultFilters,
    ...providedFilters,
  };

  // we pass that data to interpolate the entities
  const data = {
    currentAreaName: client.LongName,
    clientID: client.ClientID,
    HasPrefix: client.HasPrefix,
  };

  const uniqueLayers = [];
  const map = new Map();
  for (const item of client.clientAreas) {
    if (!map.has(item.LayerID)) {
      map.set(item.LayerID, true);
      uniqueLayers.push({
        id: item.LayerID,
        name: item.Group,
      });
    }
  }
  const mapLayers = [...new Set(client.clientAreas.map(item => item.LayerID))].join(',');
  const contentData = await fetchData({ filters, clientAlias, mapLayers });
  const entities = await filterEntities(filters, pageContent['entities'], { contentData, data });

  const page = {
    handle,
    contentData,
    filters,
    filterToggles: [],
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
