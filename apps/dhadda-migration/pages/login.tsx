import { FormProvider, useForm } from 'react-hook-form';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { login, setAuth, useAppDispatch } from '@dhadda-migration/data-access';
import { useMutation } from '@tanstack/react-query';

import { Box, Button, toast } from '@myra-ui';

import { FormInput, FormPasswordInput } from '@coop/shared/form';

export const Login = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const methods = useForm();
  const { getValues, handleSubmit } = methods;

  const { mutateAsync, isLoading } = useMutation(setAuth, {
    onSuccess: (res) => {
      if (res?.data?.error) {
        toast({
          id: 'dhadda-login',
          type: 'error',
          message: 'Something went wrong',
        });
      }
      if (!res?.data?.access_token) {
        return;
      }

      const accessToken = res?.data?.access_token;
      const refreshToken = res?.data?.refresh_token;
      const user = { name: res?.data?.user_id, email: res?.data?.email };

      dispatch(login({ user, token: accessToken }));
      localStorage.setItem('refreshToken', refreshToken);
      router.replace('/');
      toast({
        id: 'dhadda-login',
        type: 'success',
        message: 'Logged in successfully',
      });
    },
    onError: () => {
      toast({
        id: 'dhadda-login',
        type: 'error',
        message: 'Something went wrong',
      });
    },
  });

  const onSubmit = async () => {
    mutateAsync({
      username: getValues()?.username,
      password: getValues()?.password,
    });
  };

  return (
    <Box
      h="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Head>
        <title>Migration | Login</title>
      </Head>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDir="column" gap="s20">
            <Box display="flex" flexDir="column" gap="s10">
              <FormInput name="username" label="username" placeholder="Enter Username" />
              <FormPasswordInput placeholder="Enter password" name="password" />
            </Box>

            <Button width="100%" type="submit" isLoading={isLoading}>
              Login
            </Button>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
};

export default Login;
