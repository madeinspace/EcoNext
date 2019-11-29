import filter from 'lodash/filter';

export const pathParts = (path: string) => {
  const REGEX = /^\/?(?<clientAlias>[^\/]+)\/?(?<pageAlias>[^\/]+)?\/?/;
  return path.match(REGEX).groups;
};

const amI = param => (navNodes, currentPageAlias) =>
  filter(navNodes, node => node.Alias === currentPageAlias.split('?')[0]).pop()[param];

export const IsDisabled = amI('Disabled');
export const IsSecure = amI('Secure');
export const IsParent = amI('ParentPageID');
