// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');
const path = require('path');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  env: {
    NX_SCHEMA_PATH: process.env['NX_SCHEMA_PATH'],
  },
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  // REMOVE THIS LATER FOR ANY INDEX PAGE
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['images.unsplash.com', 'cdn.raralabs.live'],
  },

  i18n: {
    locales: ['en', 'ne'],
    defaultLocale: 'en',
  },
};

module.exports = withNx(nextConfig);
