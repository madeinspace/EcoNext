import Head from 'next/head';
import { PageContext, ClientContext } from '../context';
import { useContext } from 'react';

const buildPageTitle = (MetaTitle, Alias) => MetaTitle.replace('[A]', Alias);

export default () => {
  const {
    entities,
    pageData: { MetaTitle },
  } = useContext(PageContext);
  console.log('MetaTitle: ', MetaTitle);
  const MetaDescription = entities ? entities[0].Text || '' : '';
  const { clientAlias } = useContext(ClientContext);
  const title = buildPageTitle(MetaTitle, clientAlias);
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=1024"></meta>
      <meta name="Description" content={MetaDescription}></meta>
      <link rel="shortcut icon" type="image/x-icon" href="/_next/static/images/favicon.ico" />
    </Head>
  );
};
