const webpack = require('webpack');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
require('dotenv').config();

module.exports = withCSS(
  withSass({
    cssModules: true,

    webpack(config, { isServer }) {
      if (!isServer) {
        config.node = {
          fs: 'empty'
        }
      }

      config.module.rules.push({
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000
          }
        }
      });

      const env = Object.keys(process.env).reduce((acc, curr) => {
        acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
        return acc;
      }, {});
      config.plugins.push(new webpack.DefinePlugin(env));

      return config;
    }
    // exportPathMap: async function() {
    //   return {
    //     '/': { page: '/' },
    //     '/[clientAlias]/population': {
    //       page: '/[clientAlias]/population',
    //       query: { clientAlias: 'monash' }
    //     },
    //     '/[clientAlias]/workers-field-of-qualification': {
    //       page: '/[clientAlias]/workers-field-of-qualification',
    //       query: { clientAlias: 'monash' }
    //     }
    //   };
    // }
  })
);
