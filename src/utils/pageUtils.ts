import NextPages from '../components/_NextPages';
import _ from 'lodash';

export const pathParts = (path: string) => {
  const REGEX = /^\/?(?<clientAlias>[^\/]+)\/?(?<pageAlias>[^\/]+)?\/?/;
  return path.match(REGEX).groups;
};

export const IsNextPage = path => NextPages.includes(pathParts(path).pageAlias);

export const IsDisabled = (navNodes, currentPageAlias) =>
  _.filter(navNodes, node => node.Alias === currentPageAlias).pop().Disabled;
