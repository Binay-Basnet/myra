import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { asyncToast, Box, Grid, SettingsFooter, Text } from '@myra-ui';

import {
  ActivationInput,
  useChangeUtilityServiceStatusMutation,
  useGetUtilityLedgerSetupQuery,
  useListUtilityServiceTypeQuery,
  useUtilityLedgerSetupMutation,
  UtilityLedgerType,
} from '@coop/cbs/data-access';
import { SettingsCard } from '@coop/cbs/settings/ui-components';
import { FormLeafCoaHeadSelect, FormSwitch } from '@coop/shared/form';

export const AlternativeChannelGeneralSettings = () => {
  const methods = useForm();

  const { getValues, reset } = methods;

  const { data: utilityServicesData } = useListUtilityServiceTypeQuery({
    filter: {},
  });

  const utilityServices = utilityServicesData?.settings?.ebanking?.utility?.listServiceType?.data;

  useEffect(() => {
    if (utilityServices?.length) {
      const formValues = getValues();

      utilityServices?.forEach(
        // eslint-disable-next-line no-return-assign
        (service) => (formValues[service?.name as string] = service?.isActive)
      );

      reset({
        ...formValues,
      });
    }
  }, [utilityServices]);

  const { data: utilityLedgerData } = useGetUtilityLedgerSetupQuery();

  const utilityLedgers = utilityLedgerData?.settings?.general?.setup?.getUtilityLedgerSetup?.data;

  useEffect(() => {
    if (utilityLedgers) {
      const tempFormValues = getValues();

      utilityLedgers?.forEach(
        // eslint-disable-next-line no-return-assign
        (ledger) =>
          (tempFormValues[ledger?.ledgerType] = {
            label: ledger?.coaHeadName,
            value: ledger?.coaHead,
          })
      );

      reset({
        ...tempFormValues,
      });
    }
  }, [utilityLedgers]);

  const { mutateAsync: utilityLedgerSetup, isLoading: isLedgerSetupLoading } =
    useUtilityLedgerSetupMutation();

  const { mutateAsync: changeUtilityServiceStatus, isLoading: isStatusSetupLoading } =
    useChangeUtilityServiceStatusMutation();

  return (
    <>
      <FormProvider {...methods}>
        <Box p="s16" display="flex" flexDir="column" gap="s16">
          <Box display="flex" flexDir="column" gap="s16">
            <Box h="60px" display="flex" flexDir="column" gap="s4" justifyContent="center">
              <Text fontSize="r1" fontWeight="600" color="gray.800">
                General
              </Text>
              <Text fontSize="s3" fontWeight={500} color="gray.600">
                These settings will be applied across all utility payment related pages
              </Text>
            </Box>
          </Box>

          <SettingsCard
            title="Enable or Disable Utility Payment"
            subtitle="Choose utility payments to enable"
          >
            <Box display="flex" flexDirection="column" gap="s8">
              {utilityServices?.map((utility) => (
                <FormSwitch name={utility?.name as string} label={utility?.name} />
              ))}
            </Box>
          </SettingsCard>

          <SettingsCard title="Ledger Mapping" subtitle="Select Ledgers to map">
            <Grid templateColumns="repeat(3, 1fr)" gap="s16">
              <FormLeafCoaHeadSelect
                name={UtilityLedgerType.UtilityLimit}
                label="Utility Payment Ledger Mapping"
              />

              <FormLeafCoaHeadSelect
                name={UtilityLedgerType.CashBack}
                label="Cashback Ledger Mapping"
              />

              <FormLeafCoaHeadSelect
                name={UtilityLedgerType.ServiceCharge}
                label="Service Charge Ledger Mapping"
              />

              <FormLeafCoaHeadSelect
                name={UtilityLedgerType.UtilityLimitContra}
                label="Income from Neosys Ledger Mapping"
              />

              {/* <FormLeafCoaHeadSelect
                name={UtilityLedgerType.IncomeFromNeosysSuspense}
                label="Income from Neosys Suspense Ledger Mapping"
              />

              <FormLeafCoaHeadSelect
                name={UtilityLedgerType.ExpenseToNeosys}
                label="Expense to Neosys Ledger Mapping" */}
              {/* /> */}
            </Grid>
          </SettingsCard>
        </Box>
      </FormProvider>
      <SettingsFooter
        handleSave={async () => {
          const values = getValues();

          await asyncToast({
            id: 'setup-utility-ledger',
            msgs: {
              success: 'Saved Successfully',
              loading: 'Saving Settings',
            },
            promise: utilityLedgerSetup({
              value: [
                // UtilityLedgerType.Utility,
                UtilityLedgerType.CashBack,
                UtilityLedgerType.ServiceCharge,
                // UtilityLedgerType.IncomeFromNeosys,
                // UtilityLedgerType.IncomeFromNeosysSuspense,
                // UtilityLedgerType.ExpenseToNeosys,
              ]?.map((ut) => ({
                coaHead:
                  values && typeof values[ut] === 'object' && 'value' in values[ut]
                    ? values?.[ut]?.value
                    : values?.[ut],
                ledgerType: ut,
              })),
            }),
          });
          await asyncToast({
            id: 'save-utility-service-status',
            msgs: {
              success: 'Saved Successfully',
              loading: 'Saving Settings',
            },
            promise: changeUtilityServiceStatus({
              input: utilityServices?.map((utility) => ({
                id: utility?.id as string,
                activate: values?.[utility?.name as string],
              })) as ActivationInput[],
            }),
          });
        }}
        handleDiscard={() => {
          const formValues = getValues();

          utilityServices?.forEach(
            // eslint-disable-next-line no-return-assign
            (service) => (formValues[service?.name as string] = service?.isActive)
          );

          utilityLedgers?.forEach(
            // eslint-disable-next-line no-return-assign
            (ledger) =>
              (formValues[ledger?.ledgerType] = {
                label: ledger?.coaHeadName,
                value: ledger?.coaHead,
              })
          );

          reset({
            ...formValues,
          });
        }}
        saveLoading={isLedgerSetupLoading || isStatusSetupLoading}
      />
    </>
  );
};

export default AlternativeChannelGeneralSettings;
