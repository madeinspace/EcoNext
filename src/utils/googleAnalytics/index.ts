// googleAnalytics.ts

import ReactGA from 'react-ga';

export const initGA = () => {
  return ReactGA.initialize('UA-27808229-5');
};

export const logPageView = ({ clientAlias, page }) => {
  ReactGA.set({ page: page || 'economy.id.com.au', clientAlias: clientAlias || '.id' });
  ReactGA.pageview(page || 'economy.id.com.au');
};

export const logEvent = (category = '', action = '') => {
  if (category && action) {
    ReactGA.event({ category, action });
  }
};

export const logException = (description = '', fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
};
