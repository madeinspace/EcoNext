import React from 'react';

type ClientProps = {
  clientAlias?: string;
  clientAreas?: Array<any>;
  clientData?: any;
  clientPages?: Array<any>;
  clientProducts?: Array<any>;
  sitemapGroups?: Array<any>;
};

type PageProps = {
  entities?: Array<any>;
  handle?: string;
  filters?: any;
  tableData?: Array<any>;
  toggles?: Array<any>;
  pageData?: any;
};

const ClientContext = React.createContext<Partial<ClientProps>>({});
const PageContext = React.createContext<Partial<PageProps>>({});

export { ClientContext, PageContext };
