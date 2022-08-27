import { extendTheme } from '@chakra-ui/react';

import foundations from './foundations';
import components from '../theme/components';

export const neosysTheme = extendTheme({
  config: {
    cssVarPrefix: 'myra',
  },
  styles: {
    global: () => ({
      'html, body': {
        fontSize: 'md',
        background: 'background.500',
        lineHeight: 'tall',
        scrollBehavior: 'smooth',
        fontFamily: 'Inter',
      },
      ':not(.chakra-dont-set-collapse) > .chakra-collapse': {
        overflow: 'initial !important',
      },
    }),
  },
  ...foundations,

  semanticTokens: {
    colors: {
      primary: {
        default: 'primary.default',
        _dark: 'red',
      },
      secondary: {
        default: 'secondary.default',
      },
      success: {
        default: 'success.default',
      },
      danger: {
        default: 'danger.default',
      },
      background: {
        default: 'background.50',
      },
      highlight: {
        default: 'highlight.50',
      },
    },
    typography: {
      fontSizes: {
        default: 'fontSizes.m2',
      },
    },
  },
  components,
});

export default neosysTheme;
