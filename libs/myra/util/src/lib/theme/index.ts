// 1. Import `extendTheme`
import { extendTheme } from '@chakra-ui/react';
import foundations from './foundations';
import button from './foundations/button';
import checkbox from './foundations/checkbox';
import radio from './foundations/radio';
import Table from './foundations/table';
import modal from './foundations/modal';
import tags from './foundations/tags';
import chips from './foundations/chips';

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
      parts: checkbox.parts,
      sizes: checkbox.sizes,
      baseStyle: checkbox.baseStyle,
      defaultProps: checkbox.defaultProps,
    },
    Radio: {
      parts: radio.parts,
      sizes: radio.sizes,
      baseStyle: radio.baseStyle,
      defaultProps: radio.defaultProps,
    },
    Modal: {
      parts: modal.parts,
      sizes: modal.sizes,
      baseStyle: modal.baseStyle,
      defaultProps: modal.defaultProps,
    },
    Table,
    Tag: {
      sizes: tags.sizes,
      variants: tags.variants,
      baseStyle: tags.baseStyle,
      defaultProps: tags.defaultProps,
    },
    Chips: {
      sizes: chips.sizes,
      variants: chips.variants,
      baseStyle: chips.baseStyle,
      defaultProps: chips.defaultProps,
    },
  },
});
export default theme;
