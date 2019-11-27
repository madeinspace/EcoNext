import React from 'react';

export const Context = React.createContext({
  clientData: null,
  clientAlias: null,
  handle: null,
  tableData: null,
  navigation: null,
  clientProducts: null,
  sitemapGroups: null,
  filters: null,
  clientAreas: null,
  toggles: null,
  pageData: null,
  entities: null,
  templateArgs: null,
});

export const ClientProductsContext = React.createContext({
  clientProducts: null,
});
