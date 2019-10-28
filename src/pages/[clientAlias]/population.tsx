import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';
import Layout from '../../layouts/main';

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
    `http://localhost:3000/api/${clientAlias}/population`
  ).then(res => res.json());
  return data;
};
