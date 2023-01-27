import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { asyncToast, Box, Loader, SettingsFooter, Text } from '@myra-ui';

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

  const { watch, reset } = methods;

  const { data, refetch, isFetching } = useGetWithdrawSlipPrintPreferenceQuery();

  const printPreferenceData = data?.settings?.general?.printPreference?.get?.data;

  const { mutateAsync } = useSetWithdrawSlipPrintPreferenceMutation({
    onSuccess: () => refetch(),
  });

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

  const slipSizeStandard = watch('slipSizeStandard');

  useEffect(() => {
    if (printPreferenceData) {
      const activePrintPreference = slipSizeStandard
        ? printPreferenceData?.find(
            (preference) => preference?.slipSizeStandard === slipSizeStandard
          )
        : printPreferenceData?.find((preference) => preference?.isSlipStandardActive);

      reset({
        slipSizeStandard: activePrintPreference?.slipSizeStandard,
        slipSizeCustom: {
          height: activePrintPreference?.slipSizeCustom?.height ?? 0,
          width: activePrintPreference?.slipSizeCustom?.width ?? 0,
        },
        blockOne: {
          top: activePrintPreference?.blockOne?.top ?? 0,
          left: activePrintPreference?.blockOne?.left ?? 0,
        },
        blockTwo: {
          top: activePrintPreference?.blockTwo?.top ?? 0,
          left: activePrintPreference?.blockTwo?.left ?? 0,
        },
        blockThree: {
          top: activePrintPreference?.blockThree?.top ?? 0,
          left: activePrintPreference?.blockThree?.left ?? 0,
        },
      });
    }
  }, [printPreferenceData, slipSizeStandard]);

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
          {isFetching ? (
            <Box display="flex" justifyContent="center" pt="100px">
              <Loader />
            </Box>
          ) : (
            <FormProvider {...methods}>
              <WithdrawSlipSize />

              <WithdrawSlipElementCustomization />

              <WithdrawSlipPrintPreview />
            </FormProvider>
          )}
        </Box>
      </Box>
      <SettingsFooter handleSave={onSubmit} />
    </Box>
  );
};

export default WithdrawSlipPrintPreference;
