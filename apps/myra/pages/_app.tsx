import React, { ReactElement, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react';

import { Box, FloatingShortcutButton } from '@coop/shared/ui';
import { store, theme, useInit } from '@coop/shared/utils';

import '@raralabs/web-feedback/dist/css/style.css'; // stylesheet
// import '../styles/globals.css';

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

function MainApp({ Component, pageProps }: AppPropsWithLayout) {
  useInit();
  // useSnap();

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <title>Myra | Cloud Cooperative Platform</title>
      </Head>
      <ToastContainer />
      <main className="app">{getLayout(<Component {...pageProps} />)}</main>
      <Box
        position="fixed"
        bottom={'40px'}
        left={'32px'}
        display="flex"
        flexDirection={'row-reverse'}
        zIndex="99"
      >
        <FloatingShortcutButton />
      </Box>
    </>
  );
}

function CustomApp(props: AppPropsWithLayout) {
  return (
    <Provider store={store}>
      {/* <AuthProvider> */}
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <MainApp {...props} />
        </ChakraProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
      {/* </AuthProvider> */}
    </Provider>
  );
}

export default CustomApp;
