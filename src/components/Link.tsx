import React from 'react';
import Link from 'next/link';
import { IsNextPage } from './Utils';

const MonolithOrNextLink = ({ href, ...props}) => {
  return IsNextPage(href) ? (
    <Link href={href} prefetch={false}>
      <a {...props} />
    </Link>
  ) : (
      <a
        href={`https://economy.id.com.au${href}`}
        {...props}
      />
    );
};

export default MonolithOrNextLink;