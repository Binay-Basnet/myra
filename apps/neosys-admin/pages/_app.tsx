import { QueryClient, QueryClientProvider } from 'react-query';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';

import { neosysTheme } from '@coop/shared/utils';

import './styles.css';
const fiveMinutesInMs = 5 * 60 * 1000;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      keepPreviousData: true,
      cacheTime: fiveMinutesInMs,
      staleTime: fiveMinutesInMs,
    },
  },
});

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={neosysTheme}>
          <Head>
            <title>Welcome to neosys-admin!</title>
          </Head>
          <main className="app">
            <Component {...pageProps} />
          </main>
        </ChakraProvider>
      </QueryClientProvider>
    </>
  );
}

export default CustomApp;
