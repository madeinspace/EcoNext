/* eslint-disable @typescript-eslint/no-var-requires */
require('webpack');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');
const path = require('path');
require('dotenv').config();
const assetPrefix = process.env.ASSET_PREFIX || '';
module.exports = withCSS(
  withSass(
    withImages({
      cssModules: false,
      assetPrefix,
      webpack(config, { isServer }) {
        if (!isServer) {
          config.node = {
            fs: 'empty',
          };
        }

        config.module.rules.push({
          test: /\.(eot|ttf|woff|woff2)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 100000,
            },
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
