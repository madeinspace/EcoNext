import filter from 'lodash/filter';

export const pathParts = (path: string) => {
  const REGEX = /^\/?(?<clientAlias>[^\/]+)\/?(?<pageAlias>[^\/]+)?\/?/;
  return path.match(REGEX).groups;
};

const amI = (param, defaultValue) => (navNodes, currentPageAlias) => {
  const matches = filter(navNodes, node => node.Alias === currentPageAlias.split('?')[0]);

  if (matches.length === 0) return defaultValue;

  return matches.pop()[param];
};

export const IsDisabled = amI('Disabled', false);
export const IsSecure = amI('Secure', false);
export const IsParent = amI('ParentPageID', true);
