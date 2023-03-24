import { useEffect, useState } from 'react';

import { Box, Divider, Text } from '@myra-ui';

import { useGetLoanCloseDataQuery } from '@coop/cbs/data-access';
import { amountConverter } from '@coop/shared/utils';

interface IOutstandingPayments {
  loanAccountId?: string;
}

export const OutstandingPayments = ({ loanAccountId }: IOutstandingPayments) => {
  const [triggerQuery, setTriggerQuery] = useState(false);

  const loanPreview = useGetLoanCloseDataQuery(
    { loanAccountId: loanAccountId as string },
    {
      enabled: triggerQuery,
    }
  );
  const loanData = loanPreview?.data?.loanAccount?.remainingPayments?.data;
  useEffect(() => {
    if (loanAccountId) {
      setTriggerQuery(true);
    }
  }, [loanAccountId]);

  return (
    <Box display="flex" flexDirection="column" gap="s16" py="s16">
      <Divider />
      <Box display="flex" flexDirection="column" gap="s4">
        <Text fontWeight="600" fontSize="r1">
          Outstanding Payments
        </Text>
        <Text fontWeight="400" fontSize="s3">
          All due payments must be paid to get approved.
        </Text>
      </Box>
      <Box bg="highlight.500" display="flex" flexDirection="column" p="s16" gap="s8">
        {loanData?.totalPrincipal && (
          <Box display="flex" justifyContent="space-between">
            <Text fontWeight="400" fontSize="s3">
              Total Principal
            </Text>
            <Text fontWeight="500" fontSize="s3">
              {amountConverter(loanData?.totalPrincipal as string)}
            </Text>
          </Box>
        )}
        {loanData?.totalInterest && (
          <Box display="flex" justifyContent="space-between">
            <Text fontWeight="400" fontSize="s3">
              Total Interest
            </Text>
            <Text fontWeight="500" fontSize="s3">
              {amountConverter(loanData?.totalInterest as string)}
            </Text>
          </Box>
        )}
        {loanData?.totalPenalty && (
          <Box display="flex" justifyContent="space-between">
            <Text fontWeight="400" fontSize="s3">
              Total Fine
            </Text>
            <Text fontWeight="500" fontSize="s3">
              {amountConverter(loanData?.totalPenalty as string)}
            </Text>
          </Box>
        )}
        {loanData?.totalPayableAmount && (
          <Box display="flex" justifyContent="space-between" pt="s8">
            <Text fontWeight="400" fontSize="s3">
              Total Payable Amount
            </Text>
            <Text fontWeight="500" fontSize="s3">
              {amountConverter(loanData?.totalPayableAmount as string)}
            </Text>
          </Box>
        )}
        {!loanData?.totalPayableAmount && (
          <Text fontWeight="400" fontSize="s3">
            All Amounts have been paid
          </Text>
        )}
      </Box>
    </Box>
  );
};
