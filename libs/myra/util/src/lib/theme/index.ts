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
  spacing: foundations.space,
  semanticTokens: {
    colors: {
      primary: {
        default: 'primary.500',
        _dark: 'red',
      },
      secondary: {
        default: 'secondary.500',
      },
      success: {
        default: 'success.500',
      },
      danger: {
        default: 'danger.500',
      },
      background: {
        default: 'bakground.500',
      },
      highlight: {
        default: 'highlight.500',
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
