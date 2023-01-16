import { FormProvider, useForm } from 'react-hook-form';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { Box, Button, toast } from '@myra-ui';

import { login, ObjState, privateAgent, useAppDispatch } from '@coop/neosys-admin/data-access';
import { FormInput, FormPasswordInput } from '@coop/shared/form';

type LoginResponse = {
  recordId?: string | null;
  record?: {
    token: { access: string; refresh: string };
    user: {
      id: string;
      objState: ObjState;
      username: string;
      firstName: Record<'local' | 'en' | 'np', string>;
      middleName: Record<'local' | 'en' | 'np', string>;
      lastName: Record<'local' | 'en' | 'np', string>;
    };
  };
};

type LoginBody = {
  password: string;
  username: string;
};

const loginUser = async (body: LoginBody) => {
  const response = await privateAgent.post<LoginResponse>(
    `${process.env['NX_SCHEMA_PATH']}/neosys/login`,
    body
  );

  return response?.data;
};

export const Login = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const methods = useForm<LoginBody>();
  const { handleSubmit } = methods;

  const { mutateAsync, isLoading } = useMutation(loginUser, {
    onMutate: () => {
      toast({
        id: 'login',
        type: 'success',
        state: 'loading',
        message: 'Logging In!!',
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast({
        id: 'login',
        type: 'error',
        message: error?.response?.data?.message || 'Server Error',
      });
    },
    onSuccess: (res) => {
      if (!res?.recordId) {
        return;
      }

      const accessToken = res?.record?.token?.access;
      const refreshToken = res?.record?.token?.refresh;
      const user = res?.record?.user;

      dispatch(login({ user, token: accessToken }));
      localStorage.setItem('refreshToken', refreshToken);
      router.replace('/');
      toast({
        id: 'login',
        type: 'success',
        message: 'Logged In Successfully',
      });
    },
  });

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
        <form
          onSubmit={handleSubmit(async (data) => {
            await mutateAsync(data);
          })}
        >
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
