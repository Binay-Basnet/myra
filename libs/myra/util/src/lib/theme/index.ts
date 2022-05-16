// 1. Import `extendTheme`
import { extendTheme } from '@chakra-ui/react';
import foundations from './foundations';
import button from './foundations/button';

// 2. Call `extendTheme` and pass your custom values

export const theme = extendTheme({
  styles: {
    global: () => ({
      'html, body': {
        fontSize: 'md',
        background: '#EEF2F7',
        lineHeight: 'tall',
      },
    }),
  },
  colors: foundations.colors,

  fonts: foundations.fonts,

  fontSizes: foundations.fontSizes,
  fontWeight: foundations.fontWeights,
  spacing: foundations.space,
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
        default: 'bakground.50',
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
  components: {
    Button: {
      variants: button.variants,
      sizes: button.sizes,
      baseStyle: button.baseStyle,
      defaultProps: button.defaultProps,
    },
  },
});
export default theme;
