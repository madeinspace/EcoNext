// googleAnalytics.ts

import ReactGA from 'react-ga';

export const initGA = () => {
  ReactGA.initialize('UA-27808229-5');
};

export const logPageView = ({ clientID, page }) => {
  ReactGA.set({ page, clientID });
  ReactGA.pageview(window.location.pathname);
};
