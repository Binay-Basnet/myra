import { ReactElement, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineMobile, AiOutlineWarning } from 'react-icons/ai';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import * as yup from 'yup';

import { Box, Button, Icon, Input, Modal, PasswordInput, Text } from '@myra-ui';

import { GoBack } from '@coop/ebanking/components';
import { axiosAgent, OtpFor } from '@coop/ebanking/data-access';
import { EbankingHeaderLayout } from '@coop/ebanking/ui-layout';
import { getAPIUrl } from '@coop/shared/utils';

const validationSchema = yup.object({
  mobileNo: yup
    .string()
    .required('No Mobile Number Provided')
    .length(10, 'Mobile Number is Invalid'),
  password: yup
    .string()
    .required('No password provided')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
  cPassword: yup.string().test('passwords-match', 'Passwords must match', function (value) {
    return this.parent.password === value;
  }),
});

export type ResendOtpResponse = {
  success?: boolean;
};

type OtpResendBody = {
  otpFor: string;
  mobile: string;
};

const schemaPath = getAPIUrl();

const otpResend = async (body: OtpResendBody) => {
  const response = await axiosAgent.post<ResendOtpResponse>(
    `${schemaPath}/ebanking/resend-otp`,
    body
  );

  return response?.data;
};

type OtpverifyBody = {
  mobile: string;
  otp: string;
  otpFor: string;
};

export type OtpResponse = {
  success?: boolean;
};

const otpVerify = async (body: OtpverifyBody) => {
  const response = await axiosAgent.post<OtpResponse>(`${schemaPath}/ebanking/verify-otp`, body);

  return response?.data;
};

export type SetPasswordMutation = {
  success?: boolean;
};
type SetPasswordBody = {
  phone: string;
  newPassword: string;
  otp: string;
};
const setPassword = async (body: SetPasswordBody) => {
  const response = await axiosAgent.post<SetPasswordMutation>(
    `${schemaPath}/ebanking/reset-password`,
    body
  );

  return response?.data;
};

const ForgetPasswordPage = () => {
  const methods = useForm<{ mobileNo: string; otp: string; password: string; cPassword: string }>({
    resolver: yupResolver(validationSchema),
  });

  const { isOpen, onClose, onToggle } = useDisclosure();
  const { isOpen: failIsOpen, onClose: failIsOnClose, onToggle: failIsOnToggle } = useDisclosure();

  const [failedMessage, setFailedMessage] = useState('');
  const {
    formState: { errors },
    register,
  } = methods;

  const router = useRouter();
  const [state, setState] = useState<'mobile' | 'otp' | 'password'>('mobile');

  const { mutateAsync: resendOTP, isLoading: otpLoading } = useMutation(otpResend, {
    onError: (error: AxiosError<{ message: string }>) => {
      setFailedMessage(error?.response?.data?.message || 'Server Error');
      failIsOnToggle();
    },
  });
  const { mutateAsync: verifyOTP, isLoading: verifyLoading } = useMutation(otpVerify, {
    onError: (error: AxiosError<{ message: string }>) => {
      setFailedMessage(error?.response?.data?.message || 'Server Error');
      failIsOnToggle();
    },
  });
  const { mutateAsync: resetPassword, isLoading: passwordLoading } = useMutation(setPassword, {
    onError: (error: AxiosError<{ message: string }>) => {
      setFailedMessage(error?.response?.data?.message || 'Server Error');
      failIsOnToggle();
    },
  });

  return (
    <FormProvider {...methods}>
      {(() => {
        if (state === 'mobile') {
          return (
            <Box display="flex" flexDir="column" gap="s16">
              <Box>
                <GoBack handleGoBack={() => router.back()} />
              </Box>
              <Box display="flex" flexDir="column" gap="s32">
                <Box display="flex" flexDir="column" gap="s8">
                  <Text fontSize="r3" color="primary.500" fontWeight="600">
                    Password Recovery
                  </Text>
                  <Text variant="bodyRegular" color="gray.700">
                    Enter the mobile number registered to this account to continue with password
                    recovery.
                  </Text>
                </Box>

                <Input
                  leftElement={<Icon as={AiOutlineMobile} color="gray.500" />}
                  label="Mobile Number"
                  type="number"
                  placeholder="Enter your mobile number"
                  errorText={errors?.mobileNo?.message}
                  {...register('mobileNo', {
                    minLength: {
                      value: 10,
                      message: 'Invalid Mobile Number.',
                    },
                    required: {
                      value: true,
                      message: 'This field should not be empty.',
                    },
                  })}
                />

                <Button
                  w="100%"
                  isLoading={otpLoading}
                  onClick={async () => {
                    const response = await resendOTP({
                      mobile: methods.getValues().mobileNo,
                      otpFor: OtpFor.ResetPassword,
                    });

                    if (response.success) {
                      setState('otp');
                    }
                  }}
                >
                  Continue
                </Button>
              </Box>
            </Box>
          );
        }

        if (state === 'otp') {
          return (
            <Box display="flex" flexDir="column" gap="s16" key={state}>
              <Box>
                <GoBack handleGoBack={() => setState('mobile')} />
              </Box>
              <Box display="flex" flexDir="column" gap="s32">
                <Box display="flex" flexDir="column" gap="s8">
                  <Text fontSize="r3" color="primary.500" fontWeight="600">
                    OTP Verification
                  </Text>
                  <Text variant="bodyRegular" color="gray.700">
                    Enter the OTP sent to your registered mobile number to continue
                  </Text>
                </Box>

                <Input
                  leftElement={<Icon as={AiOutlineMobile} color="gray.500" />}
                  label="OTP"
                  type="number"
                  {...register('otp')}
                />

                <Button
                  w="100%"
                  isLoading={verifyLoading}
                  onClick={async () => {
                    const response = await verifyOTP({
                      otp: methods.getValues()['otp'],
                      mobile: methods.getValues()['mobileNo'],
                      otpFor: OtpFor.ResetPassword,
                    });

                    if (response?.success) {
                      setState('password');
                    }
                  }}
                >
                  Continue
                </Button>
              </Box>
            </Box>
          );
        }

        if (state === 'password') {
          return (
            <Box display="flex" flexDir="column" gap="s16">
              <Box>
                <GoBack handleGoBack={() => setState('mobile')} />
              </Box>
              <Box as="form" display="flex" flexDir="column" gap="s32">
                <Box display="flex" flexDir="column" gap="s8">
                  <Text fontSize="r3" color="primary.500" fontWeight="600">
                    Password Recovery
                  </Text>
                  <Text variant="bodyRegular" color="gray.700">
                    Please enter your new password to proceed.
                  </Text>
                </Box>

                <Box display="flex" flexDir="column" gap="s16">
                  <PasswordInput
                    placeholder="Enter your Password"
                    label="Password"
                    errorText={errors.password?.message}
                    {...register('password')}
                  />
                  <PasswordInput
                    placeholder="Retype your Password"
                    label="Confirm Password"
                    errorText={errors.cPassword?.message}
                    {...register('cPassword')}
                  />
                </Box>

                <Button
                  w="100%"
                  isLoading={passwordLoading}
                  onClick={methods.handleSubmit(async () => {
                    const response = await resetPassword({
                      phone: methods.getValues()['mobileNo'],
                      newPassword: methods.getValues()['password'],
                      otp: methods.getValues()['otp'],
                    });

                    if (response.success) {
                      onToggle();
                    }
                  })}
                >
                  Continue
                </Button>
              </Box>
            </Box>
          );
        }

        return null;
      })()}

      <Modal width="sm" hasCloseBtn={false} open={isOpen} onClose={onClose}>
        <Box display="flex" flexDir="column" alignItems="center" gap="s24" py="s32">
          <Box display="flex" flexDir="column" alignItems="center" gap="s12">
            <Icon as={IoMdCheckmarkCircleOutline} size="xl" color="primary.500" />
            <Text fontSize="r2" fontWeight="600" color="primary.500">
              Success
            </Text>
          </Box>
          <Text fontSize="r1" color="gray.900" textAlign="center">
            Congratulations! Your password has been changed successfully.
          </Text>
          <Button
            onClick={() => {
              router.push('/login').then(() => setState('mobile'));
            }}
          >
            Continue
          </Button>
        </Box>
      </Modal>

      <Modal
        closeOnOverlayClick={false}
        width="sm"
        hasCloseBtn={false}
        open={failIsOpen}
        onClose={failIsOnClose}
      >
        <Box display="flex" flexDir="column" alignItems="center" gap="s24" py="s32">
          <Box display="flex" flexDir="column" alignItems="center" gap="s12">
            <Icon as={AiOutlineWarning} size="xl" color="red.500" />
            <Text fontSize="r2" fontWeight="600" color="red.500">
              Failed
            </Text>
          </Box>
          <Text fontSize="r1" color="gray.900" textAlign="center">
            {failedMessage}
          </Text>
          <Button
            shade="danger"
            onClick={() => {
              failIsOnClose();
              setFailedMessage('');
            }}
          >
            Go Back
          </Button>
        </Box>
      </Modal>
    </FormProvider>
  );
};

export default ForgetPasswordPage;

ForgetPasswordPage.getLayout = function (page: ReactElement) {
  return <EbankingHeaderLayout>{page}</EbankingHeaderLayout>;
};
