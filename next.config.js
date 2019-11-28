const webpack = require('webpack');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');
require('dotenv').config();
const isProd = process.env.NODE_ENV === 'production';
const assetPrefix = process.env.ASSET_PREFIX;
module.exports = withCSS(
  withSass(
    withImages({
      cssModules: false,
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

        const env = Object.keys(process.env).reduce((acc, curr) => {
          acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
          return acc;
        }, {});
        config.plugins.push(new webpack.DefinePlugin(env));
        assetPrefix: isProd ? assetPrefix : '';
        return config;
      },
    }),
  ),
);
