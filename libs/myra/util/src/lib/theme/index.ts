// 1. Import `extendTheme`
import { extendTheme } from '@chakra-ui/react';
import foundations from './foundations';
import button from './foundations/button';
import checkbox from './foundations/checkbox';
import radio from './foundations/radio';
import Table from './foundations/table';
import Input from './foundations/input';

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
  components: {
    Button: {
      variants: button.variants,
      sizes: button.sizes,
      baseStyle: button.baseStyle,
      defaultProps: button.defaultProps,
    },
    Checkbox: {
      sizes: checkbox.sizes,
      baseStyle: checkbox.baseStyle,
      defaultProps: checkbox.defaultProps,
    },

    Radio: {
      sizes: radio.sizes,
      baseStyle: radio.baseStyle,
      defaultProps: radio.defaultProps,
    },
    Table,
    Input,
  },
});
export default theme;
