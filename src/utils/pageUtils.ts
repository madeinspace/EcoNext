/* eslint-disable @typescript-eslint/no-var-requires */
import filter from 'lodash/filter';
import getConfig from 'next/config';
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
