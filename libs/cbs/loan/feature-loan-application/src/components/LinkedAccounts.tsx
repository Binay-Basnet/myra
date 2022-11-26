import { useFormContext } from 'react-hook-form';

import { Box, FormAccountSelect, Text } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

export const LinkedAccounts = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const memberId = watch('memberId');

  return (
    <Box display="flex" flexDirection="column" gap="s4">
      <Text fontSize="r1" fontWeight="SemiBold">
        {t['loanProductLinkedAccounts']}
      </Text>
      <FormAccountSelect
        name="linkedAccountId"
        label={t['loanProductListofallthesavingaccounts']}
        memberId={memberId as string}
        loanLinkedAccounts
      />
    </Box>
  );
};
