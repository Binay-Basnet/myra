import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider, Spinner } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Box, Toaster } from '@myra-ui';
import { theme } from '@myra-ui/theme';

import { store, useInit } from '@coop/csv-viewer/data-access';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      keepPreviousData: true,
      cacheTime: Infinity,
      staleTime: Infinity,
    },
  },
});

const App = ({ Component, pageProps }: AppProps) => {
  const { isLoading } = useInit();

  if (isLoading) {
    return (
      <Box w="100vw" h="100vh" display="flex" alignItems="center" justifyContent="center" gap="s16">
        <Spinner />
      </Box>
    );
  }
  return <Component {...pageProps} />;
};

const CustomApp = (props: AppProps) => (
  <>
    <Head>
      <title>CSV Viewer | Product of Myra </title>
    </Head>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Toaster />
          <App {...props} />
        </ChakraProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Provider>
  </>
);

export default CustomApp;
