import { FormSelect } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

const linkedAccList = [
  {
    label: '123',
    value: 123,
  },
  {
    label: '123',
    value: 123,
  },
];

export const LinkedAccounts = () => {
  const { t } = useTranslation();

  return (
    <Box display="flex" flexDirection="column" gap="s4">
      <Text fontSize="r1" fontWeight="SemiBold">
        {t['loanProductLinkedAccounts']}
      </Text>
      <FormSelect
        name="linkedAccounts"
        label={t['loanProductListofallthesavingaccounts']}
        options={linkedAccList}
      />
    </Box>
  );
};
