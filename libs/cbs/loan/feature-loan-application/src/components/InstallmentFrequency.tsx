import { Box, Text } from '@myra-ui';

import { InstallmentFrequency } from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const InstallmentFrequencyComp = () => {
  const { t } = useTranslation();

  const installmentFrequency = [
    {
      label: t['daily'],
      value: InstallmentFrequency.Daily,
    },
    {
      label: t['weekly'],
      value: InstallmentFrequency.Weekly,
    },
    {
      label: t['monthly'],
      value: InstallmentFrequency.Monthly,
    },
    {
      label: t['quaterly'],
      value: InstallmentFrequency.Quarterly,
    },
    {
      label: t['halfYearly'],
      value: InstallmentFrequency.HalfYearly,
    },
    {
      label: t['yearly'],
      value: InstallmentFrequency.Yearly,
    },
  ];

  return (
    <Box display="flex" flexDirection="column" gap="s4">
      <Text fontSize="r1" fontWeight="SemiBold">
        {t['loanProductInstallmentFrequency']}
      </Text>
      <FormSelect
        name="installmentFrequency"
        label="Select installment frequency for loan repayment. "
        options={installmentFrequency}
      />
    </Box>
  );
};
