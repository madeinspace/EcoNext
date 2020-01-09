/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/prop-types */
import App from 'next/app';
import React from 'react';
import '../styles/normalize.css';
import '../styles/global.scss';

export default class Economy extends App {
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}
