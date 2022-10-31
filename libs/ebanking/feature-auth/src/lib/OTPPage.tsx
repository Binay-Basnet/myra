import { Dispatch, SetStateAction } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import { useVerifyOtpMutation } from '@coop/ebanking/data-access';
import { Box, Button, Input, Text } from '@coop/shared/ui';

import { AuthContainer } from '../components/AuthContainer';
import { SignUpStatus } from '../types/SignUpStatus';

interface IOTPPageProps {
  setStatus: Dispatch<SetStateAction<SignUpStatus>>;
}

export const OTPPage = ({ setStatus }: IOTPPageProps) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useFormContext<{ otp: string; mobileNo: string }>();

  const { isLoading, mutateAsync } = useVerifyOtpMutation({
    onSuccess: (response) => {
      const error = response.eBanking.auth?.verifyOtp?.error;

      if (error?.__typename === 'BadRequestError') {
        setError('otp', {
          message: error.badRequestErrorMessage,
        });
      } else {
        setStatus(SignUpStatus.DETAILS);
      }
    },
  });

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await mutateAsync({ data: { otp: Number(data.otp), mobile: data.mobileNo } });
      })}
    >
      <AuthContainer
        showGoBack
        goBackHandler={() => {
          reset();
          setStatus(SignUpStatus.INITIAL);
        }}
        title="Verify your mobile number"
        subtitle="Enter the OTP sent to your registered mobile number to continue with sign up."
      >
        <Input
          label="OTP"
          type="number"
          errorText={errors?.otp?.message}
          {...register('otp', {
            required: {
              value: true,
              message: 'This field should not be empty.',
            },
          })}
        />

        <Box w="100%" display="flex" flexDir="column" gap="s16">
          <Button type="submit" isLoading={isLoading} h="s48" w="100%">
            Continue
          </Button>
          <Text fontSize="r1" color="gray.700">
            Didn&apos;t receive a code?
            <Text
              as="span"
              color="primary.500"
              cursor="pointer"
              onClick={() => router.push('/login')}
            >
              Resend
            </Text>
          </Text>
        </Box>
      </AuthContainer>
    </form>
  );
};

export default OTPPage;
