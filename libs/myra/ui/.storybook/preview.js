// import { ThemeProvider as Emotion10ThemeProvider } from 'emotion-theming';
import { ChakraProvider } from '@chakra-ui/react';

import { extendTheme } from '@chakra-ui/react';

const primary = '#8CC63F';
// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  styles: {
    global: () => ({
      background: '#EEF2F7',
    }),
  },
  colors: {
    primary: {
      default: primary,
      dark: '#00382F',
      light: '#1F4D36',
    },
    gray: {
      200: '#DFE5EC',
      600: '#636972',
      800: '#343C46',
    },
  },
  fonts: {
    body: 'Inter, sans-serif',
    heading: 'Inter, serif',
    mono: 'Inter, monospace',
  },

  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '14px',
    lg: '18px',
  },
});

const withThemeProvider = (Story, context) => {
  return (
    <ChakraProvider theme={theme}>
      <Story {...context} />
    </ChakraProvider>
  );
};

export const decorators = [withThemeProvider];
