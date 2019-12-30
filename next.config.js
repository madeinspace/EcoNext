/* eslint-disable @typescript-eslint/no-var-requires */
require('webpack');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');
const path = require('path');
require('dotenv').config();
const assetPrefix = process.env.ASSET_PREFIX || '';
const CDN_ENPOINT = process.env.CDN_ENDPOINT || 'https://econext-cdn.azureedge.net';
console.log('CDN_ENPOINT: ', CDN_ENPOINT);
module.exports = withCSS(
  withSass(
    withImages({
      publicRuntimeConfig: {
        EcoCDNEndPoint: CDN_ENPOINT
      },
      cssModules: false,
      assetPrefix,
      webpack(config, { isServer }) {
        if (!isServer) {
          config.node = {
            fs: 'empty',
          };
        }

        config.module.rules.push({
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          use: {
            loader: 'url-loader',
          },
        });

        // necesary for Edge to support spread operator
        config.module.rules.push({
          test: /\.js(\?[^?]*)?$/,
          include: [path.resolve(__dirname, './node_modules/knex')],
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread'],
            },
          },
        });

        return config;
      },
    }),
  ),
);
