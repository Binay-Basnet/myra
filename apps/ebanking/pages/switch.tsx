import { ReactElement } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import {
  logoutCooperative,
  switchCooperative,
  useAppSelector,
  useLoginToCooperativeMutation,
} from '@coop/ebanking/data-access';
import { EbankingHeaderLayout } from '@coop/ebanking/ui-layout';
import { Box, Button, Input, Text, TextFields } from '@coop/shared/ui';

const Switch = () => {
  const methods = useForm();

  const queryClient = useQueryClient();
  const router = useRouter();
  const dispatch = useDispatch();
  const newCoopId = router.query['id'] as string;

  const cooperativesList = useAppSelector((state) => state?.auth?.user?.cooperatives);

  const { mutateAsync: loginToCooperative, isLoading } = useLoginToCooperativeMutation({});

  const selectedCoopPhone = cooperativesList?.find((c) => c.id === newCoopId)?.mobileNo;

  const onSubmit = async () => {
    if (!selectedCoopPhone) return;

    const response = await loginToCooperative({
      cooperativeId: newCoopId,
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
      dispatch(logoutCooperative());
      queryClient.resetQueries();

      const accessToken = response?.eBanking?.auth?.loginToCooperative?.record?.token?.access;
      const refreshToken = response?.eBanking?.auth?.loginToCooperative?.record?.token?.refresh;
      const user = response?.eBanking?.auth?.loginToCooperative?.record?.data;

      localStorage.setItem('coop-refreshToken', String(refreshToken));

      if (user && accessToken) {
        dispatch(switchCooperative({ user, token: accessToken }));
      }

      router.replace('/home');
    }
  };

  return (
    <FormProvider {...methods}>
      {' '}
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
      <Button width="100%" isDisabled={!newCoopId} onClick={onSubmit} isLoading={isLoading}>
        Continue
      </Button>
    </FormProvider>
  );
};

export default Switch;

Switch.getLayout = (page: ReactElement) => <EbankingHeaderLayout>{page}</EbankingHeaderLayout>;
