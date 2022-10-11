import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';

import { Box, Button, Input, Text } from '@coop/shared/ui';

import { AuthContainer } from '../components/AuthContainer';
import { SignUpStatus } from '../types/SignUpStatus';

interface IOTPPageProps {
  setStatus: Dispatch<SetStateAction<SignUpStatus>>;
}

export const OTPPage = ({ setStatus }: IOTPPageProps) => {
  const router = useRouter();
  return (
    <AuthContainer
      title="Verify your mobile number"
      subtitle="Enter the OTP sent to your registered mobile number to continue with sign up."
    >
      <Input label="OTP" />

      <Box w="100%" display="flex" flexDir="column" gap="s16">
        <Button h="s48" w="100%" onClick={() => setStatus(SignUpStatus.DETAILS)}>
          Continue
        </Button>
        <Text fontSize="r1" color="gray.700">
          Didn&apos;t receive a code?
          <Text
            as="span"
            color="primary.500"
            cursor="pointer"
            onClick={() => router.push('/login')}
          >
            Resend
          </Text>
        </Text>
      </Box>
    </AuthContainer>
  );
};

export default OTPPage;
