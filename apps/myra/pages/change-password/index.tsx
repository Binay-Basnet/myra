import React, { ReactElement } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useRouter } from 'next/router';

import { Box, Button, ChangePasswordLayout, Icon, PasswordInput, Text } from '@coop/shared/ui';

const Container = ({ children }) => {
  const route = useRouter();
  return (
    <Box
      display="flex"
      flexDirection="column"
      w={492}
      bg="white"
      mt="s20"
      borderRadius="s8"
      p="s16"
      gap="s32"
    >
      <Box display="flex" gap={2} alignItems="center" cursor="pointer" onClick={() => route.back()}>
        <Icon as={BiArrowBack} size="sm" />
        <Text fontSize="r1">Back</Text>
      </Box>
      {children}
    </Box>
  );
};

const ChangePassword = () => {
  const [success] = React.useState(false);
  if (!success) {
    return (
      <Container>
        <Box>
          <Text fontSize="l1" fontWeight="medium">
            Password Recovery
          </Text>
          <Text fontSize="r1">Please enter your new password.</Text>
        </Box>
        <Box>
          <PasswordInput label="New Password" />
          <Text fontSize="s2">
            Password must be 8 characters,1 lowercase, 1 uppercase and 1 special character
          </Text>
        </Box>
        <Box>
          <PasswordInput label="Confirm Password" />
        </Box>
        <Button>Update Password</Button>
      </Container>
    );
  }
  return (
    <Container>
      <Text fontSize="l1" fontWeight="medium">
        Password Updated Successfully!
      </Text>
      <Button>Proceed to login</Button>
    </Container>
  );
};

ChangePassword.getLayout = function getLayout(page: ReactElement) {
  return <ChangePasswordLayout>{page}</ChangePasswordLayout>;
};

export default ChangePassword;
