import { FormProvider, useForm } from 'react-hook-form';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { login, useAppDispatch, useLoginMutation } from '@coop/neosys-admin/data-access';
import { FormInput, FormPasswordInput } from '@coop/shared/form';
import { Box, Button, toast } from '@myra-ui';

export const Login = () => {
  const { mutateAsync, isLoading } = useLoginMutation();
  const dispatch = useAppDispatch();

  const router = useRouter();

  const methods = useForm();
  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    mutateAsync({ data }).then((res) => {
      if ('error' in res) {
        toast({
          id: 'login-error',
          type: 'error',
          message: 'Username or Password is invalid',
        });
        return;
      }
      if (res?.neosys?.auth?.login?.recordId === null) {
        toast({ id: 'login-error', type: 'error', message: 'Username or Password is invalid' });
        return;
      }
      const accessToken = res?.neosys?.auth?.login?.record?.token?.access;
      const refreshToken = res?.neosys?.auth?.login?.record?.token?.refresh;
      const user = res?.neosys?.auth?.login?.record?.user;
      dispatch(login({ user, token: accessToken }));
      localStorage.setItem('refreshToken', refreshToken);
      router.replace('/');
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
        <title>Neosys | Login</title>
      </Head>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDir="column" gap="s20">
            <Box display="flex" flexDir="column" gap="s10">
              <FormInput name="username" label="Username" placeholder="Enter Username" />
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
