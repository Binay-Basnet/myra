import { FormProvider, useForm } from 'react-hook-form';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { login, useAppDispatch, useSetAuthMutation } from '@migration/data-access';

import { asyncToast, Box, Button } from '@myra-ui';

import { FormInput, FormPasswordInput } from '@coop/shared/form';

export const Login = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const methods = useForm();
  const { getValues } = methods;
  const { mutateAsync, isLoading } = useSetAuthMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await asyncToast({
      id: 'migration-login',
      promise: mutateAsync({ userName: getValues()?.userName, password: getValues()?.password }),
      msgs: {
        loading: 'user loggin in',
        success: 'user logged in',
      },
      onSuccess: (res) => {
        if (!res?.userLogin?.accessToken) {
          return;
        }

        const accessToken = res?.userLogin?.accessToken;
        const refreshToken = res?.userLogin?.refreshToken;
        const user = { name: res?.userLogin?.name, email: res?.userLogin?.email };

        dispatch(login({ user, token: accessToken }));
        localStorage.setItem('refreshToken', refreshToken);
        router.replace('/');
      },
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
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDir="column" gap="s20">
            <Box display="flex" flexDir="column" gap="s10">
              <FormInput name="userName" label="username" placeholder="Enter Username" />
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
