import React, { useContext } from 'react';
import { PageContext } from '../utils/context';
import { pathParts } from '../utils';
import productionPages from '../layouts/productionPages';
import developmentPages from '../layouts/developmentPages';

export const isNextPage = (handle: string) => {
  const availablePages = process.env.DEV_PAGES_ENABLED === 'true' ? developmentPages : productionPages;
  return availablePages.indexOf(handle) >= 0;
};

const MonolithOrNextLink = ({ href, ...props }) => {
  const { providedFilters } = useContext(PageContext);

  const params = Object.keys(providedFilters)
    .map(key => key + '=' + providedFilters[key])
    .join('&');

  const queryString = params != '' ? `?${params}` : '';
  const isNext = isNextPage(pathParts(href.split('?')[0]).pageAlias);

  return isNext ? (
    <a href={`${href}${queryString}`} {...props} />
  ) : (
    <a href={`https://economy.id.com.au${href}${queryString}`} {...props} />
  );
};

export default MonolithOrNextLink;
