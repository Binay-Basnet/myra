import { useForm } from 'react-hook-form';
import Image from "next/legacy/image";
import { useRouter } from 'next/router';

import { login, setPreference, useAppDispatch, useLoginMutation } from '@coop/cbs/data-access';
import {
  asyncToast,
  Box,
  Button,
  Checkbox,
  LocaleSwitcher,
  PasswordInput,
  Text,
  TextFields,
  TextInput,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const Login = () => {
  const { t } = useTranslation();
  const { mutateAsync, isLoading } = useLoginMutation();
  const dispatch = useAppDispatch();

  const { replace } = useRouter();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    await asyncToast({
      id: 'login',
      msgs: {
        success: 'Logged in Successfully!!',
        loading: 'Logging in!!',
      },
      onSuccess: (res) => {
        if (!res?.auth?.login?.recordId) {
          return;
        }
        const accessToken = res?.auth?.login?.record?.token?.access;
        const refreshToken = res?.auth?.login?.record?.token?.refresh;
        const user = res?.auth?.login?.record?.data?.user;
        dispatch(login({ user, token: accessToken }));
        dispatch(setPreference({ preference: res?.auth?.login?.record?.data?.preference }));
        localStorage.setItem('refreshToken', refreshToken);
        replace('/');
      },
      promise: mutateAsync({ data }),
    });
  };

  return (
    <Box
      h="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={170}
      bg="primary.0"
    >
      <Box display="flex" width="100%" justifyContent="space-between">
        <Box display="flex" flexDirection="column" width={500} justifyContent="center" gap="s16">
          <Text fontSize="m2" fontWeight="semibold" lineHeight="shorter" color="gray.700">
            {t['loginTitle']}
          </Text>
          <Text fontSize="r3" color="gray.700">
            {t['loginSubTitle']}
          </Text>
        </Box>
        <Box
          display="flex"
          flexDir="column"
          boxShadow="xs"
          width={400}
          borderRadius={8}
          p={10}
          bg="white"
          gap={5}
          justifyContent="center"
        >
          <Box display="flex" justifyContent="space-between">
            <Box position="relative" w="120px" h="62px">
              <Image src="/loginLogo.svg" layout="fill" alt="logo" />
            </Box>

            <LocaleSwitcher />
          </Box>
          <Text fontSize="l1" color="gray.700">
            {t['loginHeader']}
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" flexDir="column" gap={5}>
              <Box>
                <TextFields variant="formLabel" color="gray.700">
                  {t['loginEmail']}
                </TextFields>
                <TextInput
                  placeholder={t['loginEmailPlaceholder']}
                  {...register('username')}
                  autoFocus
                />
              </Box>
              <Box>
                <PasswordInput
                  label={t['loginPassword']}
                  register={register}
                  fieldName="password"
                />
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" gap={1}>
                  <Checkbox />
                  <Text fontSize="r1">{t['loginKeepSignedIn']}</Text>
                </Box>
                <Text fontSize="s2" color="success">
                  {t['loginForgotPassword']}
                </Text>
              </Box>
              <Button type="submit" isLoading={isLoading}>
                {t['loginText']}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
