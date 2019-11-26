import React, { useContext } from 'react';
import Link from 'next/link';
import { IsNextPage } from '../utils/';
import { Context } from '../utils/context';

const MonolithOrNextLink = ({ href, ...props }) => {
  const {
    filters: { WebID },
  } = useContext(Context);
  return IsNextPage(href) ? (
    <Link href={`${href}?WebID=${WebID}`} prefetch={false}>
      <a {...props} />
    </Link>
  ) : (
    <a href={`https://economy.id.com.au${href}?WebID=${WebID}`} {...props} />
  );
};

export default MonolithOrNextLink;
