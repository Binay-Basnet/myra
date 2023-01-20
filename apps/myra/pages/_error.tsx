import { NextPageContext } from 'next';

import { Box } from '@myra-ui/foundations';
import { Error } from '@myra-ui/templates';

const ErrorPage = ({ statusCode }: { statusCode: number }) => (
  <Box display="flex" alignItems="center" justifyContent="center" minH="100vh" overflow="hidden">
    <Error isPage isCentered errorCode={statusCode} />
  </Box>
);

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return { statusCode: statusCode || 500 };
};

export default ErrorPage;
