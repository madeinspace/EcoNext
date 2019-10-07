import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';

const Population = ({ clients }) => {
  const router = useRouter();
  const { clientAlias } = router.query;
  return (
    <div>
      <p>Client alias is {clientAlias}</p>
      <ul>
        {clients.map(client => (
          <li key={client.ClientID}>{client.Name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Population;

Population.getInitialProps = async function() {
  const res = await fetch('http://localhost:3000/api/monash/population');
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return data;
};
