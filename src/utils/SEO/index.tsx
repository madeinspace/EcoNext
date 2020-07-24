import Head from 'next/head';
import { PageContext, ClientContext } from '../context';
import { useContext } from 'react';

const buildPageTitle = (MetaTitle, Alias) => MetaTitle.replace('[A]', Alias);

export default () => {
  const {
    entities,
    pageData: { MetaTitle, PageID },
  } = useContext(PageContext);
  const MetaDescription = entities ? entities[0].Text || '' : '';
  const { ClientID, clientAlias } = useContext(ClientContext);
  const contextInfo = `${clientAlias}-${ClientID}-${PageID}`;
  const title = buildPageTitle(MetaTitle, clientAlias);
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=1024"></meta>
      <meta name="Description" content={MetaDescription}></meta>
      <meta name="contextInfo" content={contextInfo}></meta>
    </Head>
  );
};
