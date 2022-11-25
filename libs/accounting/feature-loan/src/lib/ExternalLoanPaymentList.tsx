import { useEffect, useMemo } from 'react';

import { AccountingPageHeader } from '@coop/accounting/ui-components';
import { ExternalLoanPaymentMethod } from '@coop/cbs/data-access';
import { Column, Table } from '@coop/shared/table';
import { TablePopover, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { useExternalLoan } from '../hooks/useExternalLoan';

/* eslint-disable-next-line */
export interface ExternalLoanPaymentListProps {}

interface IPaymentModeProps {
  paymentMode: string;
  t: Record<string, string>;
}

const paymentModeSwitch = ({ paymentMode, t }: IPaymentModeProps) => {
  if (paymentMode === ExternalLoanPaymentMethod.Cash) {
    return <Text>{t['cash']}</Text>;
  }
  if (paymentMode === ExternalLoanPaymentMethod.Bank) {
    return <Text>{t['bank']}</Text>;
  }
  if (paymentMode === ExternalLoanPaymentMethod.Other) {
    return <Text>{t['other']}</Text>;
  }

  return '-';
};

export const ExternalLoanPaymentList = () => {
  const { t } = useTranslation();

  const { loanPaymentList, isLoanPaymentLoading, refetchLoanPayment } = useExternalLoan();
  const rowData = useMemo(() => loanPaymentList ?? [], [loanPaymentList]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Loan',
        accessorFn: (row) => row?.loanName,
      },
      {
        accessorFn: (row) => row?.paymentMode,
        header: 'Payment Mode',
        cell: (props) =>
          props?.row?.original &&
          paymentModeSwitch({ paymentMode: props?.row?.original?.paymentMode ?? ' ', t }),
        meta: {
          width: '60%',
        },
      },
      {
        accessorFn: (row) => row?.amount,
        header: 'Amount',
      },
      {
        header: 'Date',
        accessorFn: (row) => row?.date,
        meta: {
          width: '30%',
        },
      },
      {
        id: '_actions',
        header: '',
        cell: (props) =>
          props?.row?.original && (
            <TablePopover
              node={props?.row?.original}
              items={[
                {
                  title: t['transDetailViewDetail'],
                },
              ]}
            />
          ),
        meta: {
          width: '50px',
        },
      },
    ],
    [t]
  );

  useEffect(() => {
    refetchLoanPayment();
  }, [refetchLoanPayment]);

  return (
    <>
      <AccountingPageHeader heading="External Loan Payment" />

      <Table data={rowData} isLoading={isLoanPaymentLoading} columns={columns} />
    </>
  );
};
