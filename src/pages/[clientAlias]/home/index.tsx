import * as _ from 'lodash';
import Router from 'next/router';

const HomeLandingPage = () => <></>;

HomeLandingPage.getInitialProps = async context => {
  const {
    query: { clientAlias },
    res,
  } = context;

  if (res) {
    res.writeHead(302, {
      Location: `/${clientAlias}`,
    });
    res.end();
  } else {
    Router.push(`/${clientAlias}`);
  }
  return {};
};

export default HomeLandingPage;
