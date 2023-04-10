import { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';

import { theme } from '@myra-ui/theme';

import './styles.css';

const CustomApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>CSV Viewer | Product of Myra </title>
    </Head>
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  </>
);

export default CustomApp;
