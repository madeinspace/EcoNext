/* eslint-disable @typescript-eslint/no-var-requires */
import filter from 'lodash/filter';
import getConfig from 'next/config';
import { useContext } from 'react';
import { ClientContext, PageContext, useClient, usePage } from './context';
import Router from 'next/router';
import qs from 'qs';
const { publicRuntimeConfig } = getConfig();

export const pathParts = (path: string) => {
  const XRegExp = /^\/?(?<clientAlias>[^\/]+)\/?(?<pageAlias>[^\/]+)?\/?/;
  const groups = XRegExp.exec(path).groups;
  return groups;
};

const amI = (param, defaultValue) => (navNodes, currentPageAlias) => {
  const matches = filter(navNodes, node => node.Alias === currentPageAlias.split('?')[0]);

  if (matches.length === 0) return defaultValue;

  return matches.pop()[param];
};

export const IsDisabled = amI('Disabled', false);
export const IsSecure = amI('Secure', false);
export const IsParent = amI('ParentPageID', true);

export const idlogo = `${publicRuntimeConfig.EcoCDNEndPoint}/eco-assets/images/id_grey.png`;

export const getPagesByID = ids => {
  const { clientPages } = useContext(ClientContext);
  return clientPages
    .filter(({ PageID }) => ids.includes(PageID))
    .map(item => ({ label: item.MenuTitle, id: item.PageID, value: item.Alias }));
};

export const PageListMaker = set => set.map(g => ({ ...g, options: getPagesByID(g.options) }));

export const ammendQueryStr = (key, value) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  query[key] = value;
  const stringiifiedQuery = qs.stringify(query);
  const href = `${location.pathname}?${stringiifiedQuery}`;
  window.history.replaceState(query, '', href);
};
