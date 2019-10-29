import App from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import '../styles/global.scss';

const theme = {
  colors: {
    primary: '#70b859'
  }
};

export default class Economy extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}
