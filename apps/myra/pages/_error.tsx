import { NextPageContext } from 'next';

import { Box } from '@myra-ui/foundations';
import { Error } from '@myra-ui/templates';

const ERROR: Record<number, { title: string; message: string; subTitle: string }> = {
  404: {
    title: 'Page Not Found',
    message: 'Unfortunately, this is only a 404 page.',
    subTitle: 'You may have mistyped the address, or the page has been moved to another URL.',
  },
  500: {
    title: 'Internal Server Error',
    message:
      'The server encountered an internal error or misconfiguration and was unable to complete your request.',
    subTitle: '',
  },
};

const ErrorPage = ({ statusCode }: { statusCode: number }) => (
  <Box display="flex" alignItems="center" justifyContent="center" minH="100vh" overflow="hidden">
    <Error
      isPage
      isCentered
      errorCode={statusCode}
      errorTitle={ERROR[statusCode].title}
      errorMessage={ERROR[statusCode].message}
      errorMessageSubTitle={ERROR[statusCode].subTitle}
    />
  </Box>
);

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
