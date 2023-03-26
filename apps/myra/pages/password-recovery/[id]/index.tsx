import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import {
  Box,
  Button,
  ChangePasswordContainerLayout,
  ChangePasswordLayout,
  MutationError,
  PasswordInput,
  Text,
  toast,
} from '@myra-ui';

import { axiosAgent } from '@coop/cbs/data-access';
import { useTranslation } from '@coop/shared/utils';

type ResetPasswordResponse = {
  recordId: string;
  error: MutationError;
};

type ResetPasswordBody = {
  token: string;
  newPassword: string;
};

const resetPassword = async (body: ResetPasswordBody) => {
  const response = await axiosAgent.post<ResetPasswordResponse>(`/erp/reset-password`, body);

  return response?.data;
};

const passwordValidationRegex = {
  required: true,
  minLength: 8,
  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
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
          Password must have 1 lowercase, 1 uppercase, 1 number and 1 special character
        </Text>
      );
  }
};

const ConfirmPassword = () => {
  const [success, setSuccess] = React.useState(false);
  const route = useRouter();
  const token = route?.query?.id as string;
  const { t } = useTranslation();
  // const { mutateAsync, isLoading } = useSetNewPasswordMutation();
  const { register, handleSubmit, formState } = useForm();
  const { mutateAsync, isLoading } = useMutation(resetPassword, {
    onMutate: () => {
      toast({
        id: 'new-password',
        type: 'success',
        message: 'Password reset successful',
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast({
        id: 'email-verification',
        type: 'error',
        message: error?.response?.data?.message || 'Server Error',
      });
    },
    onSuccess: () => {
      setSuccess(true);
    },
  });

  const onSubmit = async (data) => {
    if (data?.password === data?.cpassword) {
      mutateAsync({ token, newPassword: data?.password });
    } else {
      toast({
        id: 'email-verification',
        type: 'error',
        message: 'Password did not match',
      });
    }
  };

  const passwordError = formState?.errors?.password;
  const cPasswordError = formState?.errors?.cpassword;

  if (success) {
    return (
      <>
        <Text fontSize="l1" fontWeight="medium">
          {t['passwordUpdatedText']}
        </Text>
        <Button onClick={() => route.push('/login')}>Proceed to login</Button>
      </>
    );
  }
  return (
    <>
      <Box>
        <Text fontSize="l1" fontWeight="medium">
          {t['passwordRecoveryText']}
        </Text>
        <Text fontSize="r1">{t['enterNewPasswordText']}</Text>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDir="column" gap="s32">
          <Box>
            <PasswordInput
              label={t['newPasswordText']}
              register={register}
              fieldName="password"
              validation={passwordValidationRegex}
            />
            {passwordError && errorText(passwordError?.type)}
          </Box>
          <Box>
            <PasswordInput
              label={t['confirmPasswordText']}
              register={register}
              fieldName="cpassword"
              validation={passwordValidationRegex}
            />
            {cPasswordError && errorText(cPasswordError?.type)}
          </Box>
          <Button isLoading={isLoading} type="submit">
            {t['updatePasswordText']}
          </Button>
        </Box>
      </form>
    </>
  );
};

ConfirmPassword.getLayout = function getLayout(page: ReactElement) {
  return (
    <ChangePasswordLayout>
      <ChangePasswordContainerLayout>{page}</ChangePasswordContainerLayout>
    </ChangePasswordLayout>
  );
};
export default ConfirmPassword;
