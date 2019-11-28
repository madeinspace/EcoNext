import React, { useContext } from 'react';
import Link from 'next/link';
import { IsNextPage } from '../utils/';
import { PageContext } from '../utils/context';

const MonolithOrNextLink = ({ href, ...props }) => {
  const {
    filters: { WebID },
  } = useContext(PageContext);

  const queryString = WebID === 10 ? '' : `?WebID=${WebID}`;

  return IsNextPage(href) ? (
    <Link href={`${href}${queryString}`} prefetch={false}>
      <a {...props} />
    </Link>
  ) : (
    <a href={`https://economy.id.com.au${href}${queryString}`} {...props} />
  );
};

export default MonolithOrNextLink;
