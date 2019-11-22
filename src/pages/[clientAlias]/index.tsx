import * as _ from 'lodash';
import Layout from '../../layouts/main';

const ClientLandingPage = ({ title }) => {
  return (
    <>
      <ul>{title}</ul>
    </>
  );
};

ClientLandingPage.getInitialProps = async context => {
  const title = `Landing page for ${context.query.clientAlias}`;
  return { title };
};

export default ClientLandingPage;
