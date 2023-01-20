import Image from 'next/legacy/image';
import { useRouter } from 'next/router';

import { Box, Button, Text } from '@myra-ui/foundations';

import { ROUTES } from '@coop/cbs/utils';

export interface ErrorProps {
  isPage?: boolean;
  isCentered?: boolean;
  errorCode: number;

  // errorTitle: string;
  // errorMessage: string;
  // errorMessageSubTitle: string;
  // errorImage: string;
}

const ERROR: Record<number, { title: string; message: string; subTitle: string; image: string }> = {
  401: {
    title: 'Unauthorized Access',
    message: 'You do not have permissions to access this resource',
    subTitle: 'If you need assistance, please contact branch admin or webssite administrator',
    image: '/401.svg',
  },
  404: {
    title: 'Page Not Found',
    message: 'Unfortunately, this is only a 404 page.',
    subTitle: 'You may have mistyped the address, or the page has been moved to another URL.',
    image: '/404.svg',
  },
  403: {
    title: 'Forbidden Resource',
    message:
      'You do not have permission to access the requested resource. Please contact the server administrator for more information.',
    subTitle: '',
    image: '/403.svg',
  },
  500: {
    title: 'Internal Server Error',
    message:
      'The server encountered an internal error or misconfiguration and was unable to complete your request.',
    subTitle: '',
    image: '/401.svg',
  },
};

export const Error = ({ isPage, isCentered, errorCode }: ErrorProps) => {
  const router = useRouter();
  return (
    <Box
      {...(isPage
        ? {}
        : isCentered
        ? {
            display: 'flex',
            justifyContent: 'center',
            pt: '20vh',
          }
        : { pt: '120px', pl: '120px' })}
    >
      <Box display="flex" flexDir="column" alignItems={isCentered ? 'center' : 'start'} gap="s16">
        <Box display="flex" flexDir="column" alignItems={isCentered ? 'center' : 'start'} gap="s4">
          <Image
            src={ERROR[errorCode]?.image}
            width="100"
            height="100"
            objectFit="contain"
            objectPosition="center"
          />

          <Text fontSize="r2" color="gray.500" fontWeight="600">
            Error Code: {errorCode}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            alignItems={isCentered ? 'center' : 'start'}
            gap="s8"
          >
            <Text fontSize="36px" lineHeight="100%" fontWeight="600" color="gray.700">
              {ERROR[errorCode]?.title}
            </Text>
            <Text
              w="70ch"
              fontSize="r1"
              fontWeight="400"
              color="gray.600"
              textAlign={isCentered ? 'center' : 'left'}
            >
              {ERROR[errorCode]?.message}
              <br />
              <Box display="inline"> {ERROR[errorCode]?.subTitle}</Box>
            </Text>
          </Box>
        </Box>
        <Box display="flex" gap="s16">
          <Button variant="solid" shade="primary" onClick={() => router.back()}>
            Go Back
          </Button>
          <Button variant="outline" shade="neutral" onClick={() => router.push(ROUTES.HOME)}>
            Get back to home page
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Error;
