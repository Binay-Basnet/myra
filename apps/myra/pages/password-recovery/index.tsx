import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';

import {
  Box,
  Button,
  ChangePasswordContainerLayout,
  ChangePasswordLayout,
  findError,
  Input,
  Text,
} from '@myra-ui';

import { useSetRecoveryPasswordMutation } from '@coop/cbs/data-access';

const PasswordRecovery = () => {
  const [isEmailVerified, setIsEmailVerified] = React.useState(null);
  const fullPath = window?.location?.href;
  const { register, handleSubmit } = useForm();
  const { mutateAsync, isLoading } = useSetRecoveryPasswordMutation();
  const onSubmit = (data: { email: string }) => {
    mutateAsync({ email: data?.email, url: fullPath }).then((res) => {
      const error = findError(res, 'error');

      if (error[0]) {
        setIsEmailVerified(false);
      } else {
        setIsEmailVerified(true);
      }
    });
  };
  if (isEmailVerified === null) {
    return (
      <>
        <Box>
          <Text fontSize="l1" fontWeight="medium">
            Password Recovery
          </Text>
          <Text fontSize="r1">Please enter the email address linked to this account.</Text>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDir="column" gap="s32">
            <Box>
              <Text variant="formLabel" color="gray.700">
                Email
              </Text>
              <Input {...register('email')} autoFocus />
            </Box>
            <Button type="submit" isLoading={isLoading}>
              Check for account
            </Button>
          </Box>
        </form>
      </>
    );
  }
  if (isEmailVerified) {
    return (
      <>
        <Box>
          <Text fontSize="l1" fontWeight="medium">
            Password Recovery
          </Text>
          <Text fontSize="r1">Please enter the email address linked to this account.</Text>
        </Box>
        <Button type="submit" onClick={handleSubmit(onSubmit)} isLoading={isLoading}>
          Re-sent Email
        </Button>
      </>
    );
  }
  return (
    <>
      <Text fontSize="l1" fontWeight="medium">
        User Not Found!
      </Text>
      <Text fontSize="r1">Please make sure you entered the email correctly and try again.</Text>
      <Button type="submit" onClick={() => setIsEmailVerified(null)}>
        Try another Email
      </Button>
    </>
  );
};

PasswordRecovery.getLayout = function getLayout(page: ReactElement) {
  return (
    <ChangePasswordLayout>
      <ChangePasswordContainerLayout>{page}</ChangePasswordContainerLayout>
    </ChangePasswordLayout>
  );
};
export default PasswordRecovery;
