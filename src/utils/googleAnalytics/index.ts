// googleAnalytics.ts

import ReactGA from 'react-ga';

export const initGA = async () => {
  return ReactGA.initialize('UA-27808229-5');
};

export const logPageView = ({ clientAlias, page }) => {
  ReactGA.set({ page: page || 'economy.id.com.au', clientAlias: clientAlias || '.id' });
  ReactGA.pageview(page || 'economy.id.com.au');
};
