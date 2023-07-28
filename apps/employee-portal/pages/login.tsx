import { useForm } from 'react-hook-form';
import Image from 'next/legacy/image';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import {
  Box,
  Button,
  Checkbox,
  Input,
  LocaleSwitcher,
  MutationError,
  PasswordInput,
  Text,
  toast,
} from '@myra-ui';

import {
  authenticate,
  axiosAgent,
  EmployeeUser,
  saveToken,
  useAppDispatch,
} from '@coop/employee-portal/data-access';
import { useTranslation } from '@coop/shared/utils';

type LoginResponse = {
  recordId?: string;
  record?: {
    token: { access: string; refresh: string };
    data: {
      user?: Partial<EmployeeUser>;
    };
  } | null;
  error?: MutationError;
};

type LoginBody = {
  password: string;
  username: string;
};

const login = async (body: LoginBody) => {
  const response = await axiosAgent.post<LoginResponse>(`/emp/login`, body);

  return response?.data;
};

export const Login = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const { mutateAsync, isLoading } = useMutation(login, {
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

      const loginRecord = res?.record;
      const loginData = loginRecord?.data;

      dispatch(
        saveToken({
          accessToken: loginRecord?.token?.access,
          refreshToken: loginRecord?.token?.refresh,
        })
      );
      dispatch(
        authenticate({
          user: loginData.user,
        })
      );

      replace(((router?.query?.redirect as string) ?? '/') || '/');

      toast({
        id: 'login',
        type: 'success',
        message: 'Logged In Successfully',
      });
    },
  });
  const dispatch = useAppDispatch();

  const { replace } = useRouter();

  const { register, handleSubmit } = useForm<{ username: string; password: string }>();

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
      <Box display="flex" flexWrap="wrap" width="100%" justifyContent="space-between">
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
              <Image src="/images/login-logo.svg" layout="fill" alt="logo" />
            </Box>

            <LocaleSwitcher />
          </Box>
          <Text fontSize="l1" color="gray.700">
            Employee Portal
          </Text>
          <form
            onSubmit={handleSubmit(async (data) => {
              await mutateAsync(data);
            })}
          >
            <Box display="flex" flexDir="column" gap={5}>
              <Box>
                <Text variant="formLabel" color="gray.700">
                  {t['loginEmail']}
                </Text>
                <Input
                  placeholder={t['loginEmailPlaceholder']}
                  {...register('username')}
                  autoFocus
                />
              </Box>
              <Box>
                <PasswordInput label={t['loginPassword']} {...register('password')} />
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" gap={1}>
                  <Checkbox />
                  <Text fontSize="r1">{t['loginKeepSignedIn']}</Text>
                </Box>
                <Text
                  fontSize="s2"
                  color="success"
                  cursor="pointer"
                  onClick={() => replace('/password-recovery')}
                >
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
