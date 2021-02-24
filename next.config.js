/* eslint-disable @typescript-eslint/no-var-requires */
require('webpack');
const path = require('path');
const assetPrefix = process.env.ASSET_PREFIX || '';
const LitePlusClients = process.env.LITE_PLUS_CLIENTS || '';
const CDN_ENPOINT = process.env.CDN_ENDPOINT || 'https://econext-cdn.azureedge.net';
module.exports =
{
  publicRuntimeConfig: {
    foo: 'bar',
    EcoCDNEndPoint: CDN_ENPOINT,
    LitePlusClients
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


    // necesary for Edge to support spread operator (knex was not babeled)
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
}
