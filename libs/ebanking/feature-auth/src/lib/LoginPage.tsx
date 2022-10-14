import { FieldValues, useForm, UseFormRegister } from 'react-hook-form';
import { AiOutlineMobile } from 'react-icons/ai';
import { useRouter } from 'next/router';

import { useAppDispatch, useEBankingLoginMutation } from '@coop/ebanking/data-access';
import { login } from '@coop/neosys-admin/data-access';
import { Box, Button, Checkbox, Icon, Input, PasswordInput, Text, toast } from '@coop/shared/ui';

import { AuthContainer } from '../components/AuthContainer';

export const LoginPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<{ mobileNo: string; password: string }>();

  const { mutateAsync, isLoading } = useEBankingLoginMutation();
  const dispatch = useAppDispatch();

  const onSubmit = handleSubmit(async (data) => {
    const response = await mutateAsync({
      data,
    });

    if (response?.eBanking?.auth?.login?.recordId === null) {
      toast({ id: 'login-error', type: 'error', message: 'Username or Password is invalid' });
      return;
    }

    if ('error' in response) {
      toast({
        id: 'login-error',
        type: 'error',
        message: 'Username or Password is invalid',
      });
      return;
    }

    const accessToken = response?.eBanking?.auth?.login?.record?.token?.access;
    const refreshToken = response?.eBanking?.auth?.login?.record?.token?.refresh;
    const user = response?.eBanking?.auth?.login?.record?.data;

    if (user && accessToken) {
      dispatch(login({ user, token: accessToken }));
    }
    localStorage.setItem('master-refreshToken', String(refreshToken));

    if (user?.cooperatives?.length === 0) {
      router.replace('/setup');
    } else {
      router.replace('/login/coop');
    }
  });

  return (
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
          <Box fontStyle="italic" color="primary.500" fontSize="s2" cursor="pointer">
            Forget Password?
          </Box>
        </Box>
      </Box>

      <Box w="100%" display="flex" flexDir="column" gap="s16">
        <Button h="s48" w="100%" onClick={onSubmit} isLoading={isLoading}>
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
          <Button h="s48" w="100%" variant="outline">
            Apply for COOP registration
          </Button>
        </Box>
      </Box>
    </AuthContainer>
  );
};

export default LoginPage;
