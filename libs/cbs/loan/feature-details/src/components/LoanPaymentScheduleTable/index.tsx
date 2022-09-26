import { useEffect, useState } from 'react';

import {
  GracePeriod,
  LoanInstallment,
  LoanRepaymentScheme,
  useGetLoanInstallmentsQuery,
} from '@coop/cbs/data-access';
import { Table } from '@coop/shared/table';

type WithNull<T> = {
  [P in keyof T]: T[P] | null | undefined;
};

interface ILoanPaymentScheduleTableProps {
  interest: number;
  productId: string;
  tenure: number;
  sanctionAmount: string;
  repaymentScheme: LoanRepaymentScheme;
  gracePeriod: {
    installmentNo?: number | null;
    gracePeriod?: GracePeriod | null;
  };
}

export const LoanPaymentScheduleTable = ({
  gracePeriod,
  interest,
  productId,
  tenure,
  sanctionAmount,
  repaymentScheme,
}: WithNull<ILoanPaymentScheduleTableProps>) => {
  const [trigger, setTrigger] = useState(false);

  const { data } = useGetLoanInstallmentsQuery(
    {
      interest: interest as number,
      productId: productId as string,
      tenure: tenure as number,
      sanctionAmount: Number(sanctionAmount),
      repaymentScheme: repaymentScheme ?? LoanRepaymentScheme.Emi,
      gracePeriod: gracePeriod?.installmentNo
        ? {
            gracePeriod: gracePeriod?.gracePeriod ?? GracePeriod.Interest,
            installmentNo: gracePeriod.installmentNo,
          }
        : null,
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
  }, [
    productId,
    tenure,
    sanctionAmount,
    interest,
    repaymentScheme,
    gracePeriod?.gracePeriod,
    gracePeriod?.installmentNo,
  ]);

  return data && data?.loanAccount.getLoanInstallments?.data?.installments ? (
    <Table<LoanInstallment>
      variant="report"
      size="small"
      isStatic
      showFooter
      data={data?.loanAccount.getLoanInstallments?.data?.installments as LoanInstallment[]}
      columns={[
        {
          header: 'Installment No.',
          footer: 'Total Cost of Loan',
          accessorKey: 'installmentNo',
          meta: {
            Footer: {
              colspan: 4,
            },
          },
        },
        {
          header: 'Principal',
          accessorKey: 'principal',
          meta: {
            isNumeric: true,
            Footer: {
              display: 'none',
            },
          },
        },
        {
          header: 'Interest',
          accessorKey: 'interest',
          meta: {
            isNumeric: true,
            Footer: {
              display: 'none',
            },
          },
        },
        {
          header: 'Payment',
          accessorKey: 'payment',
          meta: {
            isNumeric: true,
            Footer: {
              display: 'none',
            },
          },
        },
        {
          header: 'Remaining Principal',
          footer: data?.loanAccount.getLoanInstallments?.data?.total,
          accessorKey: 'remainingPrincipal',
          meta: {
            isNumeric: true,
          },
        },
      ]}
    />
  ) : null;
};
