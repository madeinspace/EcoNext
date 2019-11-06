import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';
import Layout from '../../layouts/main';
import { getPort } from '../../Utils';

const Population = ({ client, navigation, clientProducts, sitemapGroups }) => {
  const { clientAlias } = useRouter().query;
  return (
    <Layout
      client={client}
      navnodes={navigation}
      products={clientProducts}
      sitemapGroup={sitemapGroups}
    ></Layout>
  );
};

export default Population;

Population.getInitialProps = async function({ query }) {
  const { clientAlias } = query;
  const data = await fetch(
    `http://localhost:${getPort()}/api/${clientAlias}/population`
  ).then(res => res.json());
  return data;
};
