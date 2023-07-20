import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';

import { theme } from '@myra-ui/theme';

import './styles.css';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const CustomApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <title>Welcome to employee-portal!</title>
      </Head>
      <ChakraProvider theme={theme}>
        <main className="app" suppressHydrationWarning>
          {getLayout(<Component {...pageProps} />)}
        </main>
      </ChakraProvider>
    </>
  );
};

export default CustomApp;
