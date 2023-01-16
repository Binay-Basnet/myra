import { FieldValues, useForm, UseFormRegister } from 'react-hook-form';
import { AiOutlineMobile } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import {
  Box,
  Button,
  Checkbox,
  Icon,
  Input,
  MutationError,
  PasswordInput,
  Text,
  toast,
} from '@myra-ui';

import { axiosAgent, login, useAppDispatch } from '@coop/ebanking/data-access';

import { AuthContainer } from '../components/AuthContainer';

export type LoginResponse = {
  recordId?: string;
  record?: {
    token: { access: string; refresh: string };

    data?: {
      id: string;
      dob?: string | null;
      mobile?: string | null;
      name?: string | null;
      cooperatives?: {
        id: string;
        name?: string | null;
        logoUrl?: string | null;
        mobileNo?: string | null;
      }[];
    };
  };
  error?: MutationError;
};

type LoginBody = {
  mobileNo: string;
  password: string;
};

const loginUser = async (body: LoginBody) => {
  const response = await axiosAgent.post<LoginResponse>(
    `${process.env['NX_SCHEMA_PATH']}/ebanking/login`,
    body
  );

  return response?.data;
};

export const LoginPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<LoginBody>();

  // const { mutateAsync, isLoading } = useEBankingLoginMutation();
  const dispatch = useAppDispatch();

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
      if (!res?.record?.token?.access) {
        return;
      }

      const accessToken = res?.record?.token?.access;
      const refreshToken = res?.record?.token?.refresh;
      const user = res?.record?.data;

      if (accessToken && refreshToken && user) {
        dispatch(login({ user, token: accessToken }));
        localStorage.setItem('master-refreshToken', String(refreshToken));

        if (user?.cooperatives?.length === 0) {
          router.replace('/setup');
        } else {
          router.replace('/login/coop');
        }

        toast({
          id: 'login',
          type: 'success',
          message: 'Logged In Successfully',
        });
      }
    },
  });

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await mutateAsync(data);
      })}
    >
      <AuthContainer
        title="Welcome back to Myra!"
        subtitle="Please enter your login credentials below to continue using the app."
      >
        <Box display="flex" flexDir="column" gap="s16">
          <Box display="flex" flexDir="column" gap="s20">
            <Input
              leftElement={<Icon as={AiOutlineMobile} color="gray.500" />}
              label="Mobile Number"
              placeholder="Enter your mobile number"
              {...register('mobileNo')}
            />
            <PasswordInput
              placeholder="Enter your password"
              fieldName="password"
              register={register as unknown as UseFormRegister<FieldValues>}
            />
          </Box>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Checkbox label="Remember Password" />
            <Box
              fontStyle="italic"
              color="primary.500"
              fontSize="s2"
              cursor="pointer"
              onClick={() => router.push('/forget-password')}
            >
              Forgot Password?
            </Box>
          </Box>
        </Box>

        <Box w="100%" display="flex" flexDir="column" gap="s16">
          <Button h="s48" w="100%" type="submit" isLoading={isLoading}>
            Log In
          </Button>
          <Text fontSize="r1" color="gray.700">
            Don&apos;t have an account?{' '}
            <Text
              as="span"
              color="primary.500"
              cursor="pointer"
              onClick={() => router.push('/sign-up')}
            >
              Create new Myra account
            </Text>
          </Text>
        </Box>

        <Box pt="s40" display="flex" flexDir="column" gap="s16">
          <Box display="flex" alignItems="center" gap="s16">
            <Box h="1px" bg="#DCDCDC" w="100%" />
            <Text fontSize="r1" color="gray.500">
              OR
            </Text>
            <Box h="1px" bg="#DCDCDC" w="100%" />
          </Box>
          <Box>
            <Button
              onClick={() => router.push('/setup/apply/kym')}
              h="s48"
              w="100%"
              variant="outline"
              type="button"
            >
              Apply for COOP registration
            </Button>
          </Box>
        </Box>
      </AuthContainer>
    </form>
  );
};

export default LoginPage;
