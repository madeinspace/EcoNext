import { NextPages } from '../pages/[clientAlias]/[handle]';
import filter from 'lodash/filter';
import has from 'lodash/has';

export const pathParts = (path: string) => {
  const REGEX = /^\/?(?<clientAlias>[^\/]+)\/?(?<pageAlias>[^\/]+)?\/?/;
  return path.match(REGEX).groups;
};

export const IsNextPage = path => has(NextPages, pathParts(path).pageAlias);

export const IsDisabled = (navNodes, currentPageAlias) =>
  filter(navNodes, node => node.Alias === currentPageAlias.split('?')[0]).pop().Disabled;
