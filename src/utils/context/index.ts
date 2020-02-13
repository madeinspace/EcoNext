import React from 'react';

type ClientProps = {
  clientID?: number;
  clientAlias?: string;
  clientAreas?: Array<any>;
  clientPages?: Array<any>;
  clientProducts?: Array<any>;
  clientLogo?: string;
  isLite?: boolean;
  LongName?: string;
  Name?: string;
  sitemapGroups?: Array<any>;
};

type PageProps = {
  entities?: Array<any>;
  handle?: string;
  filters?: any;
  contentData?: any;
  filterToggles?: Array<any>;
  providedFilters?: any;
  pageData?: any;
  entityData?: any;
};

const ClientContext = React.createContext<Partial<ClientProps>>({});
const PageContext = React.createContext<Partial<PageProps>>({});

export { ClientContext, PageContext };
