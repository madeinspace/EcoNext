// googleAnalytics.ts

import ReactGA from 'react-ga';

export const initGA = async () => {
  return ReactGA.initialize('UA-27808229-5');
};

export const logPageView = ({ clientAlias, page }) => {
  console.log('clientAlias, page: ', clientAlias, page);
  ReactGA.set({ page, clientAlias });
  ReactGA.pageview(page);
};
