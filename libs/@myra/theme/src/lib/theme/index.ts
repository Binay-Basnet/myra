import { extendTheme } from '@chakra-ui/react';

import { components } from './components';
import foundations from './foundations';

export const theme = extendTheme({
  // To override chakra default colors.
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
      ':lang(ne)': {
        fontFamily: 'Mukta',
      },
      ':not(.chakra-dont-set-collapse) > .chakra-collapse': {
        overflow: 'initial !important',
      },
      a: {
        display: 'flex',
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
  // Base Component Styling
  components,
});

export default theme;
