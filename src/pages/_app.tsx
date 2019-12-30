/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/prop-types */
import App from 'next/app';
import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import '../styles/global.scss';
import { initGA, logPageView } from '../utils/googleAnalytics';

const theme = {
  colors: {
    primary: '#70b859',
  },
};

const MyComponent = props => {
  const {
    router: { query },
    pageProps: { page },
  } = props;
  // If handle does not exist is must be a client landing page
  const { handle } = page || { handle: query.clientAlias };
  useEffect(() => {
    initGA().then(() => {
      logPageView({ clientAlias: query.clientAlias, page: handle });
    });
  });
  return <>{props.children}</>;
};

export default class Economy extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <MyComponent {...this.props}>
          <Component {...pageProps} />
        </MyComponent>
      </ThemeProvider>
    );
  }
}
