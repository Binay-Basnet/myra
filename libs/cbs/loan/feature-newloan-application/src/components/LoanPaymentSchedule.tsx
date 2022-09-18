import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { LoanInstallment, useGetLoanInstallmentsQuery } from '@coop/cbs/data-access';
import { Table } from '@coop/shared/table';
import { Box, Text } from '@coop/shared/ui';

export const LoanPaymentSchedule = () => {
  const {
    watch,
    formState: { errors },
  } = useFormContext();

  const [trigger, setTrigger] = useState(false);

  const productId = watch('productId');
  const tenure = watch('tenure');
  const sanctionAmount = watch('totalSanctionedAmount');
  const interest = watch('intrestRate');
  const repaymentScheme = watch('repaymentScheme');

  const { data } = useGetLoanInstallmentsQuery(
    {
      interest: interest ?? 12,
      productId,
      tenure: Number(tenure),
      sanctionAmount: Number(sanctionAmount),
      repaymentScheme,
    },
    {
      enabled: trigger,
      onSuccess: () => setTrigger(false),
    }
  );

  useEffect(() => {
    if (!!productId && !!tenure && !!sanctionAmount && !!interest && !!repaymentScheme) {
      setTrigger(true);
    }
  }, [productId, tenure, sanctionAmount, interest, repaymentScheme, errors]);

  return (
    <Box display="flex" flexDirection="column" gap="s16">
      <Box display="flex" flexDirection="column" gap="s4">
        <Text fontSize="r1" fontWeight="600">
          Loan Payment Schedule
        </Text>
      </Box>
      {data && data?.loanAccount.getLoanInstallments?.data?.installments && (
        <Table<LoanInstallment>
          variant="report"
          size="compact"
          isStatic
          data={data?.loanAccount.getLoanInstallments?.data?.installments as LoanInstallment[]}
          columns={[
            {
              header: 'Installment NO.',
              accessorKey: 'installmentNo',
            },
            {
              header: 'Principal',
              accessorKey: 'principal',
              meta: {
                isNumeric: true,
              },
            },
            {
              header: 'Interest',
              accessorKey: 'interest',
              meta: {
                isNumeric: true,
              },
            },
            {
              header: 'Payment',
              accessorKey: 'payment',
              meta: {
                isNumeric: true,
              },
            },
            {
              header: 'Remaining Principal',
              accessorKey: 'remainingPrincipal',
              meta: {
                isNumeric: true,
              },
            },
          ]}
        />
      )}
    </Box>
  );
};
