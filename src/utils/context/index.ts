import React from 'react';

type ClientProps = {
  clientID?: number;
  clientAlias?: string;
  clientAreas?: Array<any>;
  clientPages?: Array<any>;
  clientProducts?: Array<any>;
  sitemapGroups?: Array<any>;
  LongName?: string;
  Name?: string;
};

type PageProps = {
  entities?: Array<any>;
  handle?: string;
  filters?: any;
  tableData?: Array<any>;
  filterToggles?: Array<any>;
  pageData?: any;
};

const ClientContext = React.createContext<Partial<ClientProps>>({});
const PageContext = React.createContext<Partial<PageProps>>({});

export { ClientContext, PageContext };
