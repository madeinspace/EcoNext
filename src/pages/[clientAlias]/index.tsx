import * as _ from 'lodash';

const ClientLandingPage = ({ title }) => {
  return <h1>{title}</h1>;
};

ClientLandingPage.getInitialProps = async context => {
  const title = `Landing page for ${context.query.ClientAlias}`;
  return { title };
};

export default ClientLandingPage;
