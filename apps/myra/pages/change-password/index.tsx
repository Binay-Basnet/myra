import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiArrowBack } from 'react-icons/bi';
import { useRouter } from 'next/router';

import { useResetPasswordMutation } from '@coop/cbs/data-access';
import { Box, Button, ChangePasswordLayout, Icon, PasswordInput, Text } from '@coop/shared/ui';
import { useAppSelector, useTranslation } from '@coop/shared/utils';

const Container = ({ children }) => {
  const { t } = useTranslation();
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
        <Text fontSize="r1">{t['backText']}</Text>
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
  const route = useRouter();
  const { t } = useTranslation();
  const [success, setSuccess] = React.useState(false);
  const { register, handleSubmit, formState } = useForm();
  const { mutateAsync } = useResetPasswordMutation();
  const userId = useAppSelector((state) => state?.auth?.user?.id);

  const onSubmit = (data) => {
    if (data?.password === data?.cpassword) {
      mutateAsync({ userId, newPassword: data?.password }).then(() => setSuccess(true));
    } else {
      toast('Password did not match');
    }
  };
  const passwordError = formState?.errors?.password;
  const cPasswordError = formState?.errors?.cpassword;

  if (!success) {
    return (
      <Container>
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
              />
              {passwordError && errorText(passwordError?.type)}
            </Box>
            <Box>
              <PasswordInput
                label={t['confirmPasswordText']}
                register={register}
                fieldName="cpassword"
              />
              {cPasswordError && errorText(cPasswordError?.type)}
            </Box>
            <Button type="submit">{t['updatePasswordText']}</Button>
          </Box>
        </form>
      </Container>
    );
  }
  return (
    <Container>
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
    </Container>
  );
};

ChangePassword.getLayout = function getLayout(page: ReactElement) {
  return <ChangePasswordLayout>{page}</ChangePasswordLayout>;
};

export default ChangePassword;
