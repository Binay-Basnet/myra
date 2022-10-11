import { ReactElement, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react';

import { store } from '@coop/cbs/data-access';
import { Box, FloatingShortcutButton } from '@coop/shared/ui';
import { neosysTheme, useInit, useSnap } from '@coop/shared/utils';

import '@raralabs/web-feedback/dist/css/style.css'; // stylesheet

const { ToastContainer } = createStandaloneToast();

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
      refetchOnMount: true,
      refetchOnReconnect: false,
      retry: false,
      keepPreviousData: true,
      cacheTime: fiveMinutesInMs,
      staleTime: fiveMinutesInMs,
    },
  },
});

const MainApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  useInit();
  useSnap();

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <title>Neosys Admin</title>
      </Head>
      <ToastContainer />
      <main className="app">{getLayout(<Component {...pageProps} />)}</main>
      <Box
        position="fixed"
        bottom="40px"
        right="32px"
        display="flex"
        flexDirection="row-reverse"
        zIndex="99"
      >
        <FloatingShortcutButton />
      </Box>
    </>
  );
};

const CustomApp = (props: AppPropsWithLayout) => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={neosysTheme}>
        <MainApp {...props} />
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </Provider>
);

export default CustomApp;
