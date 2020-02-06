import React, { useContext } from 'react';
import { isNextPage } from '../layouts';
import { PageContext } from '../utils/context';
import { pathParts } from '../utils';

const MonolithOrNextLink = ({ href, ...props }) => {
  const {
    filters: { WebID },
  } = useContext(PageContext);

  const queryString = WebID === '10' ? '' : `?WebID=${WebID}`;
  const isNext = isNextPage(pathParts(href.split('?')[0]).pageAlias);

  return isNext ? (
    <a href={`${href}${queryString}`} {...props} />
  ) : (
    <a href={`https://economy.id.com.au${href}${queryString}`} {...props} />
  );
};

export default MonolithOrNextLink;
