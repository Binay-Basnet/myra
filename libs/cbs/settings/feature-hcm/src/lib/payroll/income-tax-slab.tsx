import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { debounce } from 'lodash';

import { Box, Divider, Input, Text } from '@myra-ui';

import {
  useGetTaxSetupQuery,
  useSetTaxSetupTaxExemptionRateMutation,
  useSetTaxSetupTaxLedgerHeadMutation,
  useSetTaxSetupTaxRebateInPercentageMutation,
} from '@coop/cbs/data-access';
import { SettingsCard } from '@coop/cbs/settings/ui-components';
import { FormLeafCoaHeadSelect } from '@coop/shared/form';

import IncomeTaxSlabTable from '../../components/payroll/IncomeTaxSlabTable';

export const IncomeTaxSlab = () => {
  const methods = useForm();
  const { watch, setValue } = methods;
  const { mutateAsync: taxExemptionRateMutateAsync } = useSetTaxSetupTaxExemptionRateMutation();
  const { mutateAsync: taxRebateRateInPercentageMutateAsync } =
    useSetTaxSetupTaxRebateInPercentageMutation();
  const { mutateAsync: taxLedgerHeadMutateAsync } = useSetTaxSetupTaxLedgerHeadMutation();

  const { data, refetch } = useGetTaxSetupQuery();

  const taxExemptionForHandicapped =
    data?.settings?.general?.HCM?.payroll?.taxsetup?.getTaxSetup?.data
      ?.taxExceptionRateInPercentage;
  const taxRebateForWomen =
    data?.settings?.general?.HCM?.payroll?.taxsetup?.getTaxSetup?.data?.taxRebateRateInPercentage;

  const taxSetupLedgerHead =
    data?.settings?.general?.HCM?.payroll?.taxsetup?.getTaxSetup?.data?.taxParentLedgerHead;

  const ledgerIdWatch = watch('ledgerId');

  useEffect(() => {
    taxLedgerHeadMutateAsync({ taxSetupTaxLedgerHead: ledgerIdWatch });
  }, [ledgerIdWatch]);

  useEffect(() => {
    setValue('ledgerId', taxSetupLedgerHead);
  }, [taxSetupLedgerHead]);

  return (
    <Box p="s16" display="flex" flexDir="column" gap="s16">
      <SettingsCard title="Tax Setup" subtitle="It will be reoccurring for a whole year.">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb="s16">
          <Box>
            <Text fontSize="r1" fontWeight="semibold">
              Enable Tax Exemption for Handicapped
            </Text>
            <Text fontSize="s3" color="gray.600" lineHeight="none">
              Exemption limit for Handicapped People is 50%.
            </Text>
          </Box>
          <Box w="-webkit-fit-content">
            <Input
              textAlign="right"
              defaultValue={taxExemptionForHandicapped as unknown as string}
              label="Tax Exemption Rate"
              onChange={debounce(
                (e) =>
                  taxExemptionRateMutateAsync({
                    taxExceptionRate: e.target.value as unknown as number,
                  }).then(() => refetch()),
                800
              )}
              rightElement={<>%</>}
            />
          </Box>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="space-between" alignItems="center" mt="s16" mb="s16">
          <Box>
            <Text fontSize="r1" fontWeight="semibold">
              Tax Rebate for Women
            </Text>
            <Text fontSize="s3" color="gray.600" lineHeight="none">
              A rebate of 10% of the tax liability is provided to women (having only remuneration
              income and not opted for couple status.
            </Text>
          </Box>
          <Box w="-webkit-fit-content">
            <Input
              textAlign="right"
              defaultValue={taxRebateForWomen as unknown as string}
              label="Tax Rebate Rate"
              onChange={debounce(
                (e) =>
                  taxRebateRateInPercentageMutateAsync({
                    taxRebateRateInPercentage: e.target.value as unknown as number,
                  }).then(() => refetch()),
                800
              )}
              rightElement={<>%</>}
            />
          </Box>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="space-between" alignItems="center" mt="s16" mb="s16">
          <Box>
            <Text fontSize="r1" fontWeight="semibold">
              Select Ledger
            </Text>
          </Box>
          <Box w="-webkit-fit-content">
            <FormProvider {...methods}>
              <FormLeafCoaHeadSelect name="ledgerId" />
            </FormProvider>
          </Box>
        </Box>
      </SettingsCard>
      <Box display="flex">
        <Box display="flex" flexDir="column" flex={1} gap="s16">
          <IncomeTaxSlabTable />
        </Box>
      </Box>
    </Box>
  );
};

export default IncomeTaxSlab;
