/* eslint-disable */
export default {
  displayName: 'cbs-kym-form-ui-form-elements',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/cbs/kym-form/ui-form-elements',
};
