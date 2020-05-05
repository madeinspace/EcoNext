/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/prop-types */
import App from 'next/app';
import '../styles/global.scss';
import Router from 'next/router';
import { initGA, logPageView } from '../utils/googleAnalytics';

export default class Economy extends App {
  componentDidMount() {
    const {
      router: { query },
      pageProps: { page },
    } = this.props;
    const { handle } = page || { handle: query.clientAlias };
    initGA();
    logPageView({ clientAlias: query.clientAlias, page: handle });
    Router.events.on('routeChangeComplete', logPageView);
  }
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}
