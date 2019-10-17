import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';
import Layout from '../../layouts/main';

const Population = ({ clients, navigation, clientProducts }) => {
  const { clientAlias } = useRouter().query;
  return (
    <Layout alias={clientAlias} navnodes={navigation} products={clientProducts}>
      <p>Client alias is {clientAlias}</p>
      <ul>
        {clients.map(client => (
          <li key={client.ClientID}>{client.Name}</li>
        ))}
      </ul>
    </Layout>
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
