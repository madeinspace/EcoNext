import PageMappings from '../layouts';
import filter from 'lodash/filter';
import has from 'lodash/has';

export const pathParts = (path: string) => {
  const REGEX = /^\/?(?<clientAlias>[^\/]+)\/?(?<pageAlias>[^\/]+)?\/?/;
  return path.match(REGEX).groups;
};

export const IsNextPage = path => {
  return has(PageMappings(), pathParts(path.split('?')[0]).pageAlias);
};

const amI = param => (navNodes, currentPageAlias) =>
  filter(navNodes, node => node.Alias === currentPageAlias.split('?')[0]).pop()[param];

export const IsDisabled = amI('Disabled');
export const IsSecure = amI('Secure');
