import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import omit from 'lodash/omit';

import { asyncToast, Box, SettingsFooter, Text } from '@myra-ui';

import {
  PrintPreferenceInput,
  useGetWithdrawSlipPrintPreferenceQuery,
  useSetWithdrawSlipPrintPreferenceMutation,
} from '@coop/cbs/data-access';

import {
  WithdrawSlipElementCustomization,
  WithdrawSlipPrintPreview,
  WithdrawSlipSize,
} from '../components';

export const WithdrawSlipPrintPreference = () => {
  const methods = useForm<PrintPreferenceInput>();
  const { data, isFetching } = useGetWithdrawSlipPrintPreferenceQuery();

  const printPreferenceData = data?.settings?.general?.printPreference?.get?.data;

  const { mutateAsync } = useSetWithdrawSlipPrintPreferenceMutation();

  const onSubmit = async () => {
    await asyncToast({
      id: 'print-preference',
      msgs: {
        success: 'Print Preference Updated',
        loading: 'Updating Print Preference',
      },
      promise: mutateAsync({ data: methods.getValues() }),
    });
  };

  useEffect(() => {
    if (printPreferenceData) {
      const activePrintPreference = printPreferenceData?.find(
        (preference) => preference?.isSlipStandardActive
      );

      methods.reset({
        ...omit(activePrintPreference, ['isSlipStandardActive']),
      });
    }
  }, [isFetching, methods, printPreferenceData]);

  return (
    <Box display="flex" flexDirection="row" h="fit-content">
      <Box flex={1} p="s16" pb="120px">
        <Box borderBottom="1px" borderBottomColor="border.layout" py="s8" w="100%">
          <Text fontSize="r2" fontWeight="SemiBold" color="neutralColorLight.Gray-80">
            Withdraw Slip
          </Text>
          <Text pt="s2" fontSize="r1" fontWeight="Reglular" color="gray.400">
            Adjust and Personalize Your Withdrawal Slip Preferences
          </Text>
        </Box>
        <Box mt="s16" display="flex" flexDir="column" gap="s16">
          <FormProvider {...methods}>
            <WithdrawSlipSize />

            <WithdrawSlipElementCustomization />

            <WithdrawSlipPrintPreview />
          </FormProvider>
        </Box>
      </Box>
      <SettingsFooter handleSave={onSubmit} />
    </Box>
  );
};

export default WithdrawSlipPrintPreference;
