/* eslint-disable */
export default {
  displayName: 'cbs-kym-form-feature-cooperative-union',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory:
    '../../../../coverage/libs/cbs/kym-form/feature-cooperative-union',
};
