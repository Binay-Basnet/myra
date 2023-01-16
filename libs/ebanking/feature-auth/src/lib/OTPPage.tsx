import { Dispatch, SetStateAction } from 'react';
import { useFormContext } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { Box, Button, Input, Text, toast } from '@myra-ui';

import { axiosAgent, OtpFor } from '@coop/ebanking/data-access';
import { getAPIUrl } from '@coop/shared/utils';

import { AuthContainer } from '../components/AuthContainer';
import { SignUpStatus } from '../types/SignUpStatus';

interface IOTPPageProps {
  setStatus: Dispatch<SetStateAction<SignUpStatus>>;
}

export type OtpResponse = {
  success?: boolean;
};

export type ResendOtpResponse = {
  success?: boolean;
};

type OtpverifyBody = {
  mobile: string;
  otp: string;
};

type OtpResendBody = {
  otpFor: string;
  mobile: string;
};

const schemaPath = getAPIUrl();

const otpVerify = async (body: OtpverifyBody) => {
  const response = await axiosAgent.post<OtpResponse>(`${schemaPath}/ebanking/verify-otp`, body);

  return response?.data;
};

const otpResend = async (body: OtpResendBody) => {
  const response = await axiosAgent.post<ResendOtpResponse>(
    `${schemaPath}/ebanking/resend-otp`,
    body
  );

  return response?.data;
};

export const OTPPage = ({ setStatus }: IOTPPageProps) => {
  const {
    register,
    getValues,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useFormContext<{ otp: string; mobileNo: string }>();

  const { mutateAsync: resendOTP } = useMutation(otpResend, {
    onMutate: () => {
      toast({
        id: 'resend',
        type: 'success',
        state: 'loading',
        message: 'Re-sending OTP',
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast({
        id: 'resend',
        type: 'error',
        message: error?.response?.data?.message || 'Server Error',
      });
    },
    onSuccess: (res) => {
      if (!res?.success) {
        return;
      }

      toast({
        id: 'resend',
        type: 'success',
        message: 'Otp resent Successfully',
      });
    },
  });

  const { isLoading, mutateAsync } = useMutation(otpVerify, {
    onError: (error: AxiosError<{ error: { message: string } }>) => {
      setError('otp', { message: error?.response?.data?.error?.message });
    },
    onSuccess: (res) => {
      if (res?.success) {
        setStatus(SignUpStatus.DETAILS);
      } else {
        setError('otp', { message: 'Invalid Otp' });
      }
    },
  });

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await mutateAsync({ otp: data.otp, mobile: data.mobileNo });
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
              onClick={async () => {
                await resendOTP({ otpFor: OtpFor.SignUp, mobile: getValues().mobileNo });
              }}
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
