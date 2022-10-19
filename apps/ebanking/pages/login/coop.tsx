import { ReactElement, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import {
  switchCooperative,
  useAppSelector,
  useLoginToCooperativeMutation,
} from '@coop/ebanking/data-access';
import { EbankingHeaderLayout } from '@coop/ebanking/ui-layout';
import { Avatar, Box, Button, Input, Text, TextFields } from '@coop/shared/ui';

const CoopSelectPage = () => {
  const methods = useForm();
  const router = useRouter();
  const dispatch = useDispatch();

  const cooperativesList = useAppSelector((state) => state?.auth?.user?.cooperatives);

  const [selectedCoop, setSelectedCoop] = useState<string | null>(null);
  const [status, setStatus] = useState<'coop-select' | 'pin'>('coop-select');

  const { mutateAsync: loginToCooperative, isLoading } = useLoginToCooperativeMutation();

  const selectedCoopPhone = cooperativesList?.find((c) => c.id === selectedCoop)?.mobileNo;

  const onSubmit = async () => {
    if (!selectedCoopPhone) return;

    const response = await loginToCooperative({
      cooperativeId: selectedCoop,
      pinCode: methods.getValues('pin') as number,
      mobileNumber: selectedCoopPhone,
    });

    const errors = response?.eBanking?.auth?.loginToCooperative?.error;

    if (errors) {
      methods.setError('pin', {
        message: 'Invalid Pin',
      });
      return;
    }

    if (response) {
      const accessToken = response?.eBanking?.auth?.loginToCooperative?.record?.token?.access;
      const refreshToken = response?.eBanking?.auth?.loginToCooperative?.record?.token?.refresh;
      const user = response?.eBanking?.auth?.loginToCooperative?.record?.data;

      if (user && accessToken) {
        dispatch(switchCooperative({ user, token: accessToken }));
      }
      localStorage.setItem('coop-refreshToken', String(refreshToken));

      router.replace('/');
    }
  };

  return (
    <>
      {(() => {
        if (status === 'coop-select') {
          return (
            <>
              <Box display="flex" flexDir="column" gap="s16">
                <Text fontSize="r3" color="primary.500" fontWeight="600">
                  Select Your Coop
                </Text>
                <TextFields variant="bodyRegular" color="gray.700">
                  Please select your COOP from following list to proceed.
                </TextFields>
              </Box>

              <Box display="flex" flexDir="column" gap="s16">
                {cooperativesList?.map((coop) => (
                  <Box
                    cursor="pointer"
                    h="60px"
                    _hover={{
                      bg: 'highlight.500',
                    }}
                    bg={selectedCoop === coop.id ? 'highlight.500' : 'transparent'}
                    borderRadius="br2"
                    border="1px"
                    borderColor="border.layout"
                    px="s16"
                    display="flex"
                    alignItems="center"
                    gap="s8"
                    onClick={() => {
                      setSelectedCoop(coop.id);
                      setStatus('pin');
                    }}
                  >
                    <Avatar src={coop.logoUrl} name={coop?.name} size="sm" />

                    <Text fontSize="r1" color="gray.800">
                      {coop.name}
                    </Text>
                  </Box>
                ))}
              </Box>

              <Button
                variant="outline"
                width="100%"
                onClick={() => {
                  router.push('/setup');
                }}
              >
                Connect to an existing COOP
              </Button>
            </>
          );
        }
        if (status === 'pin') {
          return (
            <>
              <Box display="flex" flexDir="column" gap="s16">
                <Text fontSize="r3" color="primary.500" fontWeight="600">
                  COOP Login Pin
                </Text>
                <TextFields variant="bodyRegular" color="gray.700">
                  Enter 4-digit pin to continue with login page
                </TextFields>
              </Box>
              <FormProvider {...methods}>
                <Box display="flex" flexDir="column" gap="s20">
                  <Input
                    label="Pin"
                    errorText={methods?.formState?.errors?.pin?.message as string}
                    {...methods.register('pin')}
                  />
                </Box>
              </FormProvider>
              <Button
                width="100%"
                isDisabled={!selectedCoop}
                onClick={onSubmit}
                isLoading={isLoading}
              >
                Continue
              </Button>
            </>
          );
        }

        return null;
      })()}
    </>
  );
};

export default CoopSelectPage;

CoopSelectPage.getLayout = (page: ReactElement) => (
  <EbankingHeaderLayout>{page}</EbankingHeaderLayout>
);
