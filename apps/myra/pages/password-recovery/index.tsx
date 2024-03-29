import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import {
  Box,
  Button,
  ChangePasswordContainerLayout,
  ChangePasswordLayout,
  findError,
  Input,
  MutationError,
  Text,
  toast,
} from '@myra-ui';

import { axiosAgent } from '@coop/cbs/data-access';

type EmailVerificationResponse = {
  recordId: string;
  error: MutationError;
};

type EmailVerificationBody = {
  email: string;
  url: string;
};

const emailVerification = async (body: EmailVerificationBody) => {
  const response = await axiosAgent.post<EmailVerificationResponse>(`/erp/forget-password`, body);

  return response?.data;
};

const PasswordRecovery = () => {
  const [isEmailVerified, setIsEmailVerified] = React.useState(null);
  const fullPath = window?.location?.href;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutateAsync, isLoading } = useMutation(emailVerification, {
    onMutate: () => {
      toast({
        id: 'email-verification',
        type: 'success',
        message: 'Email Verified',
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast({
        id: 'email-verification',
        type: 'error',
        message: error?.response?.data?.message || 'Server Error',
      });
      setIsEmailVerified(false);
    },
    onSuccess: (res) => {
      const error = findError(res, 'error');

      if (error) {
        setIsEmailVerified(false);
      } else {
        setIsEmailVerified(true);
      }
    },
  });
  // const { mutateAsync, isLoading } = useSetRecoveryPasswordMutation();
  const onSubmit = (data: { email: string }) => {
    mutateAsync({ email: data?.email, url: fullPath });
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
              <Input
                {...register('email', {
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'invalid email address',
                  },
                })}
                autoFocus
              />
              <Text fontSize="s3">{errors.email && 'Invalid Email'}</Text>
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
