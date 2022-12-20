import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

import {
  asyncToast,
  Box,
  Button,
  ChangePasswordContainerLayout,
  ChangePasswordLayout,
  PasswordInput,
  Text,
} from '@myra-ui';

import { useAppSelector, useResetPasswordMutation } from '@coop/cbs/data-access';
import { useTranslation } from '@coop/shared/utils';

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

const passwordValidationRegex = {
  required: true,
  minLength: 8,
  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
};

const ChangePassword = () => {
  const route = useRouter();
  const { t } = useTranslation();
  const [success, setSuccess] = React.useState(false);
  const { register, handleSubmit, formState } = useForm();
  const { mutateAsync } = useResetPasswordMutation();
  const userId = useAppSelector((state) => state?.auth?.user?.id);

  const onSubmit = async (data) => {
    if (data?.password === data?.cpassword) {
      await asyncToast({
        id: 'change-passworrd',
        msgs: {
          success: 'Password changed in Successfully!!',
          loading: 'changing password!!',
        },
        onSuccess: () => {
          setSuccess(true);
        },
        promise: mutateAsync({ userId, newPassword: data?.password }),
      });
    } else {
      toast('Password did not match');
    }
  };
  const passwordError = formState?.errors?.password;
  const cPasswordError = formState?.errors?.cpassword;

  if (!success) {
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
            <Button type="submit">{t['updatePasswordText']}</Button>
          </Box>
        </form>
      </>
    );
  }
  return (
    <>
      <Text fontSize="l1" fontWeight="medium">
        {t['passwordUpdatedText']}
      </Text>
      <Button
        onClick={() => {
          localStorage.clear();
          route.push('/login');
        }}
      >
        {t['proceedToLoginText']}
      </Button>
    </>
  );
};

ChangePassword.getLayout = function getLayout(page: ReactElement) {
  return (
    <ChangePasswordLayout>
      <ChangePasswordContainerLayout>{page}</ChangePasswordContainerLayout>
    </ChangePasswordLayout>
  );
};

export default ChangePassword;
