import { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Toaster } from '@myra-ui';
import { theme } from '@myra-ui/theme';

import './styles.css';

const fiveMinutesInMs = 5 * 60 * 1000;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      retry: false,
      keepPreviousData: true,
      cacheTime: fiveMinutesInMs,
      staleTime: fiveMinutesInMs,
    },
  },
});

const CustomApp = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Dhadda-migration!</title>
      </Head>
      <Toaster />
      <main className="app">
        <Component {...pageProps} />
      </main>
    </QueryClientProvider>
  </ChakraProvider>
);

export default CustomApp;
