import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { asyncToast, Box, SettingsFooter, Text } from '@myra-ui';

import { BankInput, useGetBankTableListQuery, useSetBankListMutation } from '@coop/cbs/data-access';
import { SettingsPageHeader } from '@coop/cbs/settings/ui-layout';

import { BankTable } from '../component/BankTable';

/* eslint-disable-next-line */
export interface CbsSettingsFeatureBankProps {}

export const CbsSettingsFeatureBank = () => {
  const methods = useForm();

  const { getValues, reset } = methods;

  const { mutateAsync } = useSetBankListMutation();

  const { data } = useGetBankTableListQuery();

  const bankList = data?.bank?.bank?.list;
  const bankName = bankList?.map((item) => item?.name);

  useEffect(() => {
    if (bankList) {
      reset({
        BankInput: bankList?.map((item) => ({
          ...item,
          date: item?.date?.local,
        })),
      });
    }
  }, [data]);

  const onSubmit = () => {
    const values = getValues();

    const filteredData = values?.BankInput?.filter(
      (item: BankInput) => !bankName?.includes(item?.name)
    );
    asyncToast({
      id: 'general-settings-bank-list-id',
      msgs: {
        success: 'General Bank List Saved',
        loading: 'Saving General Bank List',
      },
      promise: mutateAsync({
        data: filteredData?.map((item: BankInput) => ({
          name: item?.name,
          logo: '',
        })),
      }),
    });
  };
  return (
    <>
      <SettingsPageHeader heading="Bank List" />

      <Box display="flex" flexDirection="column" p="s16" gap="s16" width="full">
        <Text fontWeight="Regular" fontSize="s2" color="gray.600" lineHeight="125%">
          Default Lists of all commercial banks in Nepal. If your bank is not in the list, you can
          add them.
        </Text>
        <FormProvider {...methods}>
          <BankTable />
        </FormProvider>
        <SettingsFooter handleSave={onSubmit} />
      </Box>
    </>
  );
};

export default CbsSettingsFeatureBank;
