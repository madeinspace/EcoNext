/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react';
import fetchClientData from '../../utils/fetchClientData';
import fetchLayout, { PageMappings } from '../../layouts';
import MainLayout from '../../layouts/main';
import PageHeader from '../../components/PageHeader';
import Headline from '../../components/Headline';
import Description from '../../components/Description';
import filterEntities from '../../utils/filterEntities';
import axios from 'axios';
import { PageContext, ClientContext } from '../../utils/context';
import { Actions, Share, ExportPage } from '../../components/Actions';

const PageComponent = ({ client, page }): JSX.Element => {
  const MainContent = PageMappings['home'];
  return (
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

PageComponent.getInitialProps = async function({ query, req: { containers } }): Promise<{}> {
  const { clientAlias: clientAlias, ...providedFilters } = query;
  const handle = 'home';
  const client: any = await fetchClientData({ clientAlias, containers });
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
    WebID: 10,
    ...pageDefaultFilters,
    ...providedFilters,
    ClientID: client.ID,
    IsLite: client.isLite,
  };

  // we pass that data to interpolate the entities
  const data = {
    currentAreaName: client.LongName,
    clientID: client.ClientID,
    HasPrefix: client.HasPrefix,
  };

  const contentData = await fetchData({ filters });
  const url = `https://economy.id.com.au/${clientAlias}/geo/areasbytypeid/4`;
  const mapData = await axios
    .get(url)
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    });

  const entities = await filterEntities(filters, pageContent['entities'], { contentData, data });
  console.log('entities: ', entities);

  const page = {
    handle,
    contentData,
    filters,
    filterToggles: [],
    pageData,
    mapData,
    entities,
  };

  return {
    client,
    page,
  };
};

export default PageComponent;
