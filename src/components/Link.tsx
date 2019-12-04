import React, { useContext } from 'react';
import Link from 'next/link';
import { isNextPage } from '../layouts';
import { PageContext } from '../utils/context';
import { pathParts } from '../utils';

const MonolithOrNextLink = ({ href, ...props }) => {
  const {
    filters: { WebID },
  } = useContext(PageContext);

  const queryString = WebID === 10 ? '' : `?WebID=${WebID}`;

  const isNext = isNextPage(pathParts(href.split('?')[0]).pageAlias);

  return isNext ? (
    <Link href={`${href}${queryString}`} prefetch={false}>
      <a {...props} />
    </Link>
  ) : (
    <a href={`https://economy.id.com.au${href}${queryString}`} {...props} />
  );
};

export default MonolithOrNextLink;
