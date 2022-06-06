import type { ReactElement, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@saccos/myra/util';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { store } from '../redux/store';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  const fiveMinutesInMs = 5 * 60 * 1000;

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false,
        cacheTime: fiveMinutesInMs,
        staleTime: fiveMinutesInMs,
      },
    },
  });

  const getLayout = Component.getLayout || ((page) => page);
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Head>
            <title>Myra | Cloud Cooperative Platform</title>
          </Head>
          <main className="app">{getLayout(<Component {...pageProps} />)}</main>
        </ChakraProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default CustomApp;
