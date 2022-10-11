import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';

import { Box, Button, Input, PasswordInput } from '@coop/shared/ui';

import { AuthContainer } from '../components/AuthContainer';
import { SignUpStatus } from '../types/SignUpStatus';

interface IDetailsPageProps {
  setStatus: Dispatch<SetStateAction<SignUpStatus>>;
}

export const DetailsPage = ({ setStatus }: IDetailsPageProps) => {
  const router = useRouter();

  return (
    <AuthContainer title="Your Details" subtitle="Enter your details to continue with sign up.">
      <Box display="flex" flexDir="column" gap="s20">
        <Input placeholder="Enter your full name" label="Your Name" />
        <Input type="date" label="Date of Birth (BS)" />
        <PasswordInput placeholder="Enter your Password" label="Password" />
        <PasswordInput placeholder="Retype your Password" label="Confirm Password" />
      </Box>

      <Button
        h="s48"
        w="100%"
        onClick={() => {
          router.push('/login').then(() => setStatus(SignUpStatus.INITIAL));
        }}
      >
        Continue
      </Button>
    </AuthContainer>
  );
};

export default DetailsPage;
