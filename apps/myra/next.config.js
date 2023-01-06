// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');
const path = require('path');

/**
 * @type {import("@nrwl/next/plugins/with-nx").WithNxOptions}
 **/
const nextConfig = {
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  reactStrictMode: false,

  webpack: (config) => {
    // load worker files as a urls with `file-loader`
    config.module.rules.unshift({
      test: /pdf\.worker\.(min\.)?js/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[contenthash].[ext]',
            publicPath: '_next/static/worker',
            outputPath: 'static/worker',
          },
        },
      ],
    });

    return config;
  },

  // nx: {
  //   // Set this to true if you would like to to use SVGR
  //   // See: https://github.com/gregberge/svgr
  //   svgr: false,
  // },
  images: {
    domains: [
      'images.unsplash.com',
      'cdn.raralabs.live',
      'minio.migration.myraerp.com',
      'minio.myraerp.com',
    ],
    // unoptimized: true,
  },
  i18n: {
    locales: ['en', 'ne'],
    defaultLocale: 'en',
  },
};

module.exports = withNx(nextConfig);
