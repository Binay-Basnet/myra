import { Dispatch, SetStateAction } from 'react';
import { AiOutlineMobile } from 'react-icons/ai';
import { useRouter } from 'next/router';

import { Box, Button, Icon, Input, Text } from '@coop/shared/ui';

import { AuthContainer } from '../components/AuthContainer';
import { SignUpStatus } from '../types/SignUpStatus';

interface ISignUpHomePage {
  setStatus: Dispatch<SetStateAction<SignUpStatus>>;
}

export const SignUpHomePage = ({ setStatus }: ISignUpHomePage) => {
  const router = useRouter();
  return (
    <AuthContainer
      title="Sign up to Myra"
      subtitle="Please enter your phone number below to get started."
    >
      <Input
        leftElement={<Icon as={AiOutlineMobile} color="gray.500" />}
        label="Mobile Number"
        placeholder="Enter your mobile number"
      />

      <Box w="100%" display="flex" flexDir="column" gap="s16">
        <Button h="s48" w="100%" onClick={() => setStatus(SignUpStatus.OTP)}>
          Continue
        </Button>
        <Text fontSize="r1" color="gray.700">
          Already a member?
          <Text
            as="span"
            color="primary.500"
            cursor="pointer"
            onClick={() => router.push('/login')}
          >
            Login instead
          </Text>
        </Text>
      </Box>
    </AuthContainer>
  );
};

export default SignUpHomePage;
