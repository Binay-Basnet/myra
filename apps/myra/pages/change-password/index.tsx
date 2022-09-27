import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
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
      borderRadius={8}
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

const errorText = (type) => {
  switch (type) {
    case 'required':
      return (
        <Text fontSize="s2" color="red">
          This field is required
        </Text>
      );
    case 'minLength':
      return (
        <Text fontSize="s2" color="red">
          Must have minimum of 8 characters
        </Text>
      );
    default:
      return (
        <Text fontSize="s2" color="red">
          Password must have 1 lowercase, 1 uppercase and 1 special character
        </Text>
      );
  }
};

const ChangePassword = () => {
  const [success] = React.useState(false);
  const { register, handleSubmit, formState } = useForm();
  const onSubmit = (data) => {
    if (data?.password === data?.cpassword) {
      // alert('password matched');
    }
  };
  const passwordError = formState?.errors?.password;
  const cPasswordError = formState?.errors?.cpassword;

  if (!success) {
    return (
      <Container>
        <Box>
          <Text fontSize="l1" fontWeight="medium">
            Password Recovery
          </Text>
          <Text fontSize="r1">Please enter your new password.</Text>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDir="column" gap="s32">
            <Box>
              <PasswordInput label="New Password" register={register} fieldName="password" />
              {passwordError && errorText(passwordError?.type)}
              {/* <Text fontSize="s2">
                Password must be 8 characters,1 lowercase, 1 uppercase and 1 special character
              </Text> */}
            </Box>
            <Box>
              <PasswordInput label="Confirm Password" register={register} fieldName="cpassword" />
              {cPasswordError && errorText(cPasswordError?.type)}
            </Box>
            <Button type="submit">Update Password</Button>
          </Box>
        </form>
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
