import MainLayout from '../../../layouts/main';
import fetchClientData from '../../../utils/fetchClientData';

const Page = props => {
  return (
    <MainLayout>
      <div>Hello, {props.name}!</div>
    </MainLayout>
  );
};

Page.getInitialProps = async function({ query, req: { containers } }) {
  const { clientAlias: clientAlias, handle, ...providedFilters } = query;

  const client = await fetchClientData({ clientAlias, containers });

  return {
    client,
    name: 'Rohan',
  };
};

export default Page;
