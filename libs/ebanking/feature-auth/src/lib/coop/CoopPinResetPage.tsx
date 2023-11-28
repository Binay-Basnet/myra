import { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import {
  useResetCoopPinMutation,
  useSendOtpForCoopPinResetMutation,
} from 'libs/ebanking/data-access/src/generated/myra/graphql';

import { asyncToast, Box, Button, PasswordInput, Text } from '@myra-ui';

import { useAppSelector } from '@coop/ebanking/data-access';
import { FormPinInput } from '@coop/shared/form';

export const CoopPinResetPage = () => {
  const methods = useForm();

  const {
    register,
    getValues,
    formState: { errors },
    setValue,
  } = methods;

  const router = useRouter();

  const cooperativesList = useAppSelector((state) => state?.auth?.user?.cooperatives);

  const selectedCoop = useAppSelector((state) => state?.auth?.selectedCoop);

  const mobileNumber = router?.query?.['mobileNumber'];

  const selectedCoopPhone =
    mobileNumber || cooperativesList?.find((c) => c?.id === selectedCoop)?.mobileNo;

  const [status, setStatus] = useState<'generate' | 'otp'>('generate');

  const { mutateAsync: sendOTP } = useSendOtpForCoopPinResetMutation();

  const handleGenerateOTP = () => {
    asyncToast({
      id: 'generate-otp-coop-pin-reset',
      msgs: {
        loading: 'Sending OTP',
        success: 'OTP Sent',
      },
      promise: sendOTP({
        cooperativeId: selectedCoop as string,
        mobileNumber: selectedCoopPhone as string,
      }),
      onSuccess: () => {
        setValue('otp', '');

        handleStart(120);
        setStatus('otp');
      },
    });
  };

  const { mutateAsync: resetPin } = useResetCoopPinMutation();

  const handlePinChange = () => {
    const values = getValues();

    if (values['newPin'] === values['confirmPin']) {
      asyncToast({
        id: 'coop-pin-reset',
        msgs: {
          loading: 'Resetting PIN',
          success: 'PIN Reset',
        },
        promise: resetPin({
          input: {
            cooperativeId: selectedCoop as string,
            mobileNumber: selectedCoopPhone as string,
            newPin: values['newPin'],
            otp: values['otp'],
          },
        }),
        onSuccess: () => {
          router.push('/login/coop');
        },
      });
    } else {
      methods.setError('confirmPin', {
        message: 'Pin did not match',
      });
    }
  };

  useEffect(() => {
    if (!selectedCoop) {
      router.push('/login/coop');
    }
  }, [selectedCoop]);

  const timerRef = useRef<any>(null);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(
    () => () => {
      clearInterval(timerRef.current);
    },
    []
  );

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev === 1) {
          clearInterval(timerRef.current);
        }

        return prev - 1;
      });
    }, 1000);
  };

  const handleStart = (seconds: number) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setCurrentTime(() => seconds);

    startTimer();
  };

  const secondsToHHMMSS = (seconds: number) => {
    if (seconds < 3600) return new Date(seconds * 1000).toISOString().substring(14, 19);

    return new Date(seconds * 1000).toISOString().substring(11, 19);
  };

  return status === 'generate' ? (
    <Box as="form" display="flex" flexDir="column" gap="s16">
      <Box display="flex" flexDir="column" gap="s16">
        <Text fontSize="r3" color="primary.500" fontWeight="600">
          COOP Reset Pin
        </Text>
        <Text variant="bodyRegular" color="gray.700">
          Generate OTP to reset COOP Pin
        </Text>
      </Box>

      <Button onClick={handleGenerateOTP}>Send OTP</Button>
    </Box>
  ) : (
    <FormProvider {...methods}>
      <Box display="flex" flexDir="column" gap="s16">
        <Box display="flex" flexDir="column" gap="s32">
          <Box display="flex" flexDir="column" gap="s8">
            <Text fontSize="r3" color="primary.500" fontWeight="600">
              Coop Reset Pin
            </Text>
            <Text variant="bodyRegular" color="gray.700">
              Enter the OTP sent to your registered mobile number to continue
            </Text>
          </Box>

          <FormPinInput
            name="otp"
            label="Enter OTP"
            type="number"
            helperText={
              currentTime === 0
                ? 'OTP Expired. Please generate OTP again.'
                : `OTP expires in ${secondsToHHMMSS(currentTime)}`
            }
          />

          <PasswordInput
            label="New Pin"
            placeholder="Enter Pin"
            // errorText={errors.password?.message}
            autoComplete="new-password"
            {...register('newPin')}
          />

          <PasswordInput
            label="Confirm Pin"
            placeholder="Confirm Pin"
            autoComplete="new-password"
            errorText={(errors?.['confirmPin']?.message as string) ?? ''}
            {...register('confirmPin')}
          />

          <Button w="100%" onClick={handlePinChange}>
            Change Pin
          </Button>

          {currentTime === 0 && <Button onClick={handleGenerateOTP}>Resend OTP</Button>}
        </Box>
      </Box>
    </FormProvider>
  );
};
