const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
require('dotenv').config();

module.exports = withCSS(
  withSass({
    cssModules: true,
    webpack(config) {
      config.module.rules.push({
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000
          }
        }
      });

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
