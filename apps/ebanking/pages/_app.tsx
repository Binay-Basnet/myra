import { ReactElement, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';

import { EbankingMainLayout } from '@coop/ebanking/ui-layout';
import { theme } from '@coop/shared/utils';

import './styles.css';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

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

function App({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <>
      <Head>
        <title>E Banking</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <EbankingMainLayout>
            <Component {...pageProps} />
          </EbankingMainLayout>
        </ChakraProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
