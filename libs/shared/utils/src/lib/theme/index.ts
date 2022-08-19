// 1. Import `extendTheme`
import { extendTheme } from '@chakra-ui/react';

import foundations from './foundations';
import accordion from './foundations/accordion';
import button from './foundations/button';
import checkbox from './foundations/checkbox';
import Input from './foundations/input';
import modal from './foundations/modal';
import radio from './foundations/radio';
import switches from './foundations/switches';
import Table from './foundations/table';
import tags from './foundations/tags';
import textarea from './foundations/textarea';

// 2. Call `extendTheme` and pass your custom values

export const theme = extendTheme({
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

  fonts: {
    heading: 'monospace',
    body: 'monospace',
  },
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
    Input,
    Textarea: {
      sizes: textarea.sizes,
      variants: textarea.variants,
      baseStyle: textarea.baseStyle,
      defaultProps: textarea.defaultProps,
    },
    Tag: {
      sizes: tags.sizes,
      variants: tags.variants,
      baseStyle: tags.baseStyle,
      defaultProps: tags.defaultProps,
    },
    Switch: {
      sizes: switches.sizes,
      baseStyle: switches.baseStyle,
      defaultProps: switches.defaultProps,
    },
    Accordion: {
      baseStyle: accordion.baseStyle,
    },
  },
});
export default theme;
