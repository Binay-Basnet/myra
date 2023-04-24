import { FormProvider, useForm } from 'react-hook-form';
// import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { Box, Button, Text, toast } from '@myra-ui';

import { login, publicAgent } from '@coop/csv-viewer/data-access';
import { FormEmailInput, FormPasswordInput } from '@coop/shared/form';
import { getAPIUrl } from '@coop/shared/utils';

import { DarkLogo, Header } from '../components/Header';

type LoginBody = {
  username: string;
  password: string;
};

type LoginResponse = {
  access_token: string | null;
  refresh_token: string | null;
  email: string | null;
  user_id: string | null;
};

const loginUser = async (body: LoginBody) => {
  const response = await publicAgent.post<LoginResponse>(`${getAPIUrl()}/login`, body);

  return response?.data;
};

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const methods = useForm<LoginBody>();

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
      if (!res?.access_token) {
        toast({
          id: 'login',
          type: 'error',
          message: 'Username or Password is invalid',
        });
        return;
      }

      const accessToken = res?.access_token;
      const refreshToken = res?.refresh_token;

      if (accessToken && refreshToken && res?.email && res?.user_id) {
        dispatch(
          login({
            email: res?.email,
            user_id: res?.user_id,
            refreshToken,
            accessToken,
          })
        );

        router.replace('/');

        toast({
          id: 'login',
          type: 'success',
          message: 'Logged In Successfully',
        });
      } else {
        toast({
          id: 'login',
          type: 'error',
          message: 'Username or Password is invalid',
        });
      }
    },
  });

  return (
    <Box h="100vh" w="100vw" display="flex" flexDir="column" bg="background.500" overflowX="auto">
      <Header />
      <Box w="100%" pt="120px" display="flex" justifyContent="center">
        <Box
          w="380px"
          bg="white"
          display="flex"
          flexDir="column"
          gap="s32"
          boxShadow="E0"
          borderRadius="br3"
          p="s32"
        >
          <DarkLogo />
          <Text fontSize="r3" fontWeight={500} color="gray.700">
            Login
          </Text>
          <form
            onSubmit={methods.handleSubmit(async (data) => {
              await mutateAsync(data);
            })}
          >
            <Box display="flex" flexDir="column" gap="s24">
              <FormProvider {...methods}>
                <Box display="flex" flexDir="column" gap="s16">
                  <FormEmailInput label="Email" name="username" />
                  <FormPasswordInput name="password" />
                </Box>
              </FormProvider>
              <Button isLoading={isLoading} type="submit" w="100%">
                Log In
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
