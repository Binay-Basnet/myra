import { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';

// ! TODO move this theme to a separate directory within libs folder
// 1. Import the extendTheme function
import { extendTheme } from '@chakra-ui/react';

const primary = '#8CC63F';
// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  styles: {
    global: () => ({
      'html, body': {
        fontSize: 'sm',
        background: '#EEF2F7',
        lineHeight: 'tall',
      },
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

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Welcome to myra!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </ChakraProvider>
  );
}

export default CustomApp;
