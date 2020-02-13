import React, { useContext } from 'react';
import { isNextPage } from '../layouts';
import { PageContext } from '../utils/context';
import { pathParts } from '../utils';

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
