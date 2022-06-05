import type { ReactElement, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@coop/myra/util';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';

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

  console.log('NX Schema path', process.env.NX_SCHEMA_PATH);

  const getLayout = Component.getLayout || ((page) => page);
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Head>
          <title>Myra | Cloud cooperative Platform</title>
        </Head>
        <main className="app">{getLayout(<Component {...pageProps} />)}</main>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default CustomApp;
