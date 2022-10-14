import { ReactElement, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineMobile } from 'react-icons/ai';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import { omit } from 'lodash';

import {
  switchCooperative,
  useAppDispatch,
  useCheckAccountMutation,
  useGetCoopListQuery,
  useLoginToCooperativeMutation,
  useSetNewPinMutation,
  useVerifyOtpMutation,
} from '@coop/ebanking/data-access';
import { EbankingHeaderLayout } from '@coop/ebanking/ui-layout';
import { FormSelect } from '@coop/shared/form';
import { Box, Button, ChakraModal, Icon, Input, Text, TextFields } from '@coop/shared/ui';

const SetupConnectPage = () => {
  const router = useRouter();
  const { isOpen, onClose, onToggle } = useDisclosure();
  const dispatch = useAppDispatch();

  const [status, setStatus] = useState<'details' | 'otp' | 'pin'>('details');

  //   const user = useAppSelector((state) => state.auth?.user);
  const methods = useForm<{ id: string; mobileNumber: string; otp: string; pin?: number }>();

  const { data } = useGetCoopListQuery();

  const { isLoading: verifyLoading, mutateAsync: verifyOtp } = useVerifyOtpMutation({
    onSuccess: (response) => {
      const error = response?.eBanking?.auth?.verifyOtp?.error;

      if (error?.__typename === 'BadRequestError') {
        methods.setError('otp', {
          message: error.badRequestErrorMessage,
        });
      } else {
        onToggle();
      }
    },
  });

  const { isLoading, mutateAsync: checkAccount } = useCheckAccountMutation({
    onSuccess: (response) => {
      if (response?.eBanking?.auth?.checkAccount?.success) {
        setStatus('otp');
      }
    },
  });

  const { mutateAsync: loginToCooperative } = useLoginToCooperativeMutation();

  const { isLoading: setPinLoading, mutateAsync: setPin } = useSetNewPinMutation({
    onSuccess: async (response) => {
      if (response?.eBanking?.auth?.setNewPin?.record?.id) {
        const coopResponse = await loginToCooperative({
          cooperativeId: methods.getValues().id,
          pinCode: methods.getValues().pin as number,
        });

        const tokens = coopResponse.eBanking.auth.loginToCooperative.record;
        const accessToken = tokens.token.access;
        const refreshToken = tokens.token.refresh;

        if (accessToken) {
          dispatch(switchCooperative({ token: accessToken, user: tokens.data }));
        }
        localStorage.setItem('coop-refreshToken', String(refreshToken));
        router.push('/home');
      }
    },
  });

  return (
    <FormProvider {...methods}>
      {(() => {
        if (status === 'details') {
          return (
            <>
              <Box display="flex" flexDir="column" gap="s16">
                <Text fontSize="r3" color="primary.500" fontWeight="600">
                  Connect to an existing COOP
                </Text>
                <TextFields variant="bodyRegular" color="gray.700">
                  If you are already a member of a COOP, you can start using Myra if you have signed
                  up for mobile banking.
                </TextFields>
              </Box>

              <FormProvider {...methods}>
                <Box display="flex" flexDir="column" gap="s20">
                  <FormSelect
                    name="id"
                    options={data?.eBanking?.neosysClientsList?.map((d) => ({
                      label: d.clientName,
                      value: d.id,
                    }))}
                    label="Co-operative"
                  />
                  <Input
                    leftElement={<Icon as={AiOutlineMobile} color="gray.500" />}
                    label="Mobile Number"
                    placeholder="Enter your mobile number"
                    {...methods.register('mobileNumber')}
                  />
                </Box>
              </FormProvider>

              <Button
                w="100%"
                isLoading={isLoading}
                onClick={methods.handleSubmit(async (submitData) => {
                  await checkAccount(omit(submitData, 'otp'));
                })}
              >
                Check for account
              </Button>
            </>
          );
        }
        if (status === 'otp') {
          return (
            <>
              <Box display="flex" flexDir="column" gap="s16">
                <Text fontSize="r3" color="primary.500" fontWeight="600">
                  Verify your mobile number
                </Text>
                <TextFields variant="bodyRegular" color="gray.700">
                  Enter the OTP sent to your registered mobile number to continue connecting your
                  account.
                </TextFields>
              </Box>

              <FormProvider {...methods}>
                <Box display="flex" flexDir="column" gap="s20">
                  <Input
                    label="OTP"
                    errorText={methods.formState.errors?.otp?.message}
                    {...methods.register('otp')}
                  />
                </Box>
              </FormProvider>

              <Box w="100%" display="flex" flexDir="column" gap="s16">
                <Button
                  w="100%"
                  onClick={methods.handleSubmit(async (otpData) => {
                    await verifyOtp({
                      data: {
                        mobile: otpData.mobileNumber,
                        otp: otpData.otp as unknown as number,
                      },
                    });
                  })}
                  isLoading={verifyLoading}
                >
                  Continue
                </Button>
                <Text fontSize="r1" color="gray.700">
                  Didn&apos;t receive a code?
                  <Text as="span" color="primary.500" cursor="pointer">
                    Resend
                  </Text>
                </Text>
              </Box>
            </>
          );
        }

        if (status === 'pin') {
          return (
            <>
              <Box display="flex" flexDir="column" gap="s16">
                <Text fontSize="r3" color="primary.500" fontWeight="600">
                  Create Coop Login Pin
                </Text>
                <TextFields variant="bodyRegular" color="gray.700">
                  Enter 4-digit login pin to continue with login page
                </TextFields>
              </Box>

              <FormProvider {...methods}>
                <Box display="flex" flexDir="column" gap="s20">
                  <Input label="New Pin" {...methods.register('pin')} />
                  <Input label="Confirm Pin" {...methods.register('pin')} />
                </Box>
              </FormProvider>

              <Button
                w="100%"
                onClick={methods.handleSubmit(async (pinData) => {
                  await setPin({
                    data: {
                      cooperativeId: pinData.id,
                      mobileNo: pinData.mobileNumber,
                      pinCode: pinData.pin as unknown as number,
                    },
                  });
                })}
                isLoading={setPinLoading}
              >
                Continue
              </Button>
            </>
          );
        }

        return null;
      })()}

      <ChakraModal width="sm" hasCloseBtn={false} open={isOpen} onClose={onClose}>
        <Box display="flex" flexDir="column" alignItems="center" gap="s24" py="s32">
          <Box display="flex" flexDir="column" alignItems="center" gap="s12">
            <Icon as={IoMdCheckmarkCircleOutline} size="xl" color="primary.500" />
            <Text fontSize="r2" fontWeight="600" color="primary.500">
              Success
            </Text>
          </Box>
          <Text fontSize="r1" color="gray.900" textAlign="center">
            Congratulations! Your account has been connected successfully.
          </Text>
          <Button
            onClick={() => {
              setStatus('pin');
              onClose();
            }}
          >
            Continue
          </Button>
        </Box>
      </ChakraModal>
    </FormProvider>
  );
};

export default SetupConnectPage;

SetupConnectPage.getLayout = (page: ReactElement) => (
  <EbankingHeaderLayout>{page}</EbankingHeaderLayout>
);
