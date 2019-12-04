import * as _ from 'lodash';
import Head from 'next/head';

const ClientLandingPage = ({ clientAlias }) => {
  return (
    <>
      <Head>
        <title>{`${clientAlias} | economy.id`}</title>
        <meta name="viewport" content="width=1024"></meta>
        <meta name="Description" content={`${clientAlias} home page`}></meta>
      </Head>
      <h1>{`${clientAlias} landing page`}</h1>
    </>
  );
};

ClientLandingPage.getInitialProps = async context => {
  const clientAlias = context.query.clientAlias;
  return { clientAlias };
};

export default ClientLandingPage;
