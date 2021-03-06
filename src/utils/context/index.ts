import React, { useContext } from 'react';

type ClientProps = {
  ClientID?: number;
  clientAlias?: string;
  clientAreas?: Array<any>;
  clientPages?: Array<any>;
  clientProducts?: Array<any>;
  clientLogo?: string;
  isLite?: boolean;
  isLitePlus?: boolean;
  LongName?: string;
  Name?: string;
  logoLink?: string;
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
const useClient = () => useContext(ClientContext);
const usePage = () => useContext(PageContext);

export { ClientContext, PageContext, useClient, usePage };
