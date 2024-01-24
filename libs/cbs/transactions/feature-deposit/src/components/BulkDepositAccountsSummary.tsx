import { useFormContext } from 'react-hook-form';

import { Box, Text } from '@myra-ui';

import {
  BulkDepositInput,
  ObjState,
  useGetAccountTableListMinimalQuery,
} from '@coop/cbs/data-access';

interface IBulkDepositAccountsSummaryProps {
  memberId: string;
}

export const BulkDepositAccountsSummary = ({ memberId }: IBulkDepositAccountsSummaryProps) => {
  const { watch } = useFormContext<BulkDepositInput>();

  const accounts = watch('accounts');

  const { data: accountListData } = useGetAccountTableListMinimalQuery(
    {
      paginate: {
        first: -1,
        after: '',
      },
      filter: {
        query: memberId,
        orConditions: [
          {
            andConditions: [
              {
                column: 'objState',
                comparator: 'EqualTo',
                value: ObjState.Active,
              },
            ],
          },
        ],
      },
    },
    {
      staleTime: 0,
      enabled: !!memberId,
    }
  );
  const totalReb = accounts?.reduce(
    (accumulator, curr) => accumulator + Number(curr?.rebate !== 'N/A' ? curr?.rebate : 0),
    0
  );
  const totalDep = accounts?.reduce(
    (accumulator, curr) => accumulator + Number(curr?.amount || 0),
    0
  );

  return (
    <Box bg="background.500" p="s16" display="flex" flexDirection="column" gap="s10">
      {accounts?.map((accountInfo) => {
        const filteredAccount = accountListData?.account?.list?.data?.edges?.find(
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
                <Text fontSize="s3" fontWeight={500} color="danger.500">
                  Fine
                </Text>
                <Text fontSize="s3" fontWeight={500} color="danger.500">
                  {`+ ${+(accountInfo?.fine || 0)}`}
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
        <Text fontSize="s3" fontWeight={500} color="primary.600">
          Total Deposit
        </Text>
        <Text fontSize="s3" fontWeight={500} color="primary.800">
          {Number(totalDep || '0') + Number(totalReb || '0')}
        </Text>
      </Box>
    </Box>
  );
};
