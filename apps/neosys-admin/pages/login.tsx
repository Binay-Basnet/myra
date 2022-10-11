import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { login, useAppDispatch, useLoginMutation } from '@coop/cbs/data-access';
import { FormInput, FormPasswordInput } from '@coop/shared/form';
import { Box, Button } from '@coop/shared/ui';

export const Login = () => {
  const { mutateAsync, isLoading } = useLoginMutation();
  const dispatch = useAppDispatch();

  const router = useRouter();

  const methods = useForm();
  const { register, handleSubmit, watch } = methods;
  const [show, setShow] = React.useState(false);

  const onSubmit = (data) => {
    mutateAsync({ data }).then((res) => {
      if (res.auth.login.recordId === null) {
        return;
      }
      const accessToken = res?.auth?.login?.record?.token?.access;
      const refreshToken = res?.auth?.login?.record?.token?.refresh;
      const user = res?.auth?.login?.record?.user;
      dispatch(login({ user, token: accessToken }));
      localStorage.setItem('refreshToken', refreshToken);
      router.replace('/');
    });
  };

  console.log(watch());

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
      <Box mb="8">
        <Image src="/logo.svg" alt="Main Logo" layout="fill" />
      </Box>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDir="column" gap="s20">
            <Box display="flex" flexDir="column" gap="s16">
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
