// const rootMain = require('../../../../.storybook/main');
//
// module.exports = {
//   ...rootMain,
//
//   core: { ...rootMain.core, builder: 'webpack5' },
//
//   stories: [
//     ...rootMain.stories,
//     '../src/lib/**/*.stories.mdx',
//     '../src/lib/**/*.stories.@(js|jsx|ts|tsx)',
//   ],
//
//   staticDirs: ['../../../../apps/myra/public'],
//   addons: [
//     ...rootMain.addons,
//     '@nrwl/react/plugins/storybook',
//     '@chakra-ui/storybook-addon',
//     'storybook-addon-next-router',
//   ],
//   typescript: {
//     check: false,
//     checkOptions: {},
//     reactDocgen: 'react-docgen-typescript',
//     reactDocgenTypescriptOptions: {
//       shouldExtractLiteralValuesFromEnum: true,
//     },
//   },
//   features: {
//     emotionAlias: false,
//   },
//   webpackFinal: async (config, { configType }) => {
//     // apply any global webpack configs that might have been specified in .storybook/main.js
//     if (rootMain.webpackFinal) {
//       config = await rootMain.webpackFinal(config, { configType });
//     }
//
//     // [action] your own webpack tweaks if needed
//
//     return {
//       ...config,
//       resolve: {
//         ...config.resolve,
//         alias: {
//           ...config.resolve.alias,
//           '@emotion/core': '@emotion/react',
//           'emotion-theming': '@emotion/react',
//         },
//       },
//     };
//   },
// };

const rootMain = require('../../../../.storybook/main');
const {
  addons: rootAddons,
  stories: rootStories,
  webpackFinal: rootWebpackFinal,
} = rootMain;

module.exports = {
  ...rootMain,

  addons: [...rootAddons, '@nrwl/react/plugins/storybook'],

  core: { ...rootMain.core, builder: 'webpack5' },
  stories: [
    ...rootStories,
    '../src/lib/**/*.stories.mdx',
    '../src/lib/**/*.stories.@(js|jsx|ts|tsx)',
  ],

  webpackFinal: async (config) => {
    config = await rootWebpackFinal(config);

    config.module.rules.push(
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000, // 10kB
          name: '[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.svg$/,
        oneOf: [
          // If coming from JS/TS file, then transform into React component using SVGR.
          {
            issuer: {
              and: [/\.[jt]sx?$/],
            },
            use: [
              '@svgr/webpack?-svgo,+titleProp,+ref![path]',
              {
                loader: require.resolve('url-loader'),
                options: {
                  limit: 10000, // 10kB
                  name: '[name].[hash:7].[ext]',
                  esModule: false,
                },
              },
            ],
          },
          // Fallback to plain URL loader.
          {
            use: [
              {
                loader: require.resolve('url-loader'),
                options: {
                  limit: 10000, // 10kB
                  name: '[name].[hash:7].[ext]',
                },
              },
            ],
          },
        ],
      }
    );

    return config;
  },
};
