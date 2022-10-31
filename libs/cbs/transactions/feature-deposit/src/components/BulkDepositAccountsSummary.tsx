import { useFormContext } from 'react-hook-form';

import { BulkDepositInput, ObjState, useGetAccountTableListQuery } from '@coop/cbs/data-access';
import { Box, Text } from '@coop/shared/ui';

interface IBulkDepositAccountsSummaryProps {
  memberId: string;
  totalDepositAmount: number;
  totalRebate: number;
}

export const BulkDepositAccountsSummary = ({
  memberId,
  totalDepositAmount,
  totalRebate,
}: IBulkDepositAccountsSummaryProps) => {
  const { watch } = useFormContext<BulkDepositInput>();

  const accounts = watch('accounts');

  const { data: accountListData } = useGetAccountTableListQuery(
    {
      paginate: {
        first: -1,
        after: '',
      },
      filter: { memberId, objState: ObjState.Active },
    },
    {
      staleTime: 0,
      enabled: !!memberId,
    }
  );

  return (
    <Box bg="background.500" p="s16" display="flex" flexDirection="column" gap="s10">
      {accounts?.map((accountInfo) => {
        const filteredAccount = accountListData?.account?.list?.edges?.find(
          (accountData) => accountData.node?.id === accountInfo?.accountId
        )?.node;

        return (
          <Box display="flex" flexDirection="column" gap="s10">
            <Box display="flex" justifyContent="space-between">
              <Text fontSize="s3" fontWeight={500} color="gray.600">
                {filteredAccount?.product?.productName}
              </Text>
              <Text fontSize="s3" fontWeight={500} color="gray.800">
                {accountInfo?.amount || 0}
              </Text>
            </Box>

            {!!Number(accountInfo?.fine) && (
              <Box display="flex" justifyContent="space-between">
                <Text fontSize="s3" fontWeight={500} color="gray.600">
                  Fine
                </Text>
                <Text fontSize="s3" fontWeight={500} color="danger.500">
                  {`+ ${accountInfo?.fine}`}
                </Text>
              </Box>
            )}

            {!!Number(accountInfo?.rebate) && (
              <Box display="flex" justifyContent="space-between">
                <Text fontSize="s3" fontWeight={500} color="gray.600">
                  Rebate
                </Text>
                <Text fontSize="s3" fontWeight={500} color="success.500">
                  {`+ ${accountInfo?.rebate}`}
                </Text>
              </Box>
            )}
          </Box>
        );
      })}

      <Box display="flex" justifyContent="space-between">
        <Text fontSize="s3" fontWeight={500} color="gray.600">
          Total Deposit
        </Text>
        <Text fontSize="s3" fontWeight={500} color="gray.800">
          {totalDepositAmount + totalRebate}
        </Text>
      </Box>
    </Box>
  );
};
