import { useFormContext } from 'react-hook-form';

import { useGetAccountTableListQuery } from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const LinkedAccounts = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const memberId = watch('memberId');

  const { data } = useGetAccountTableListQuery({
    paginate: {
      first: -1,
      after: '',
    },
    filter: {
      memberId,
    },
  });

  const accountArray = data?.account?.list?.edges;

  const linkedAccList =
    accountArray &&
    accountArray?.map((item) => ({
      label: item?.node?.accountName as string,
      value: item?.node?.id as string,
    }));

  return (
    <Box display="flex" flexDirection="column" gap="s4">
      <Text fontSize="r1" fontWeight="SemiBold">
        {t['loanProductLinkedAccounts']}
      </Text>
      <FormSelect
        name="linkedAccountId"
        label={t['loanProductListofallthesavingaccounts']}
        options={linkedAccList ?? []}
      />
    </Box>
  );
};
