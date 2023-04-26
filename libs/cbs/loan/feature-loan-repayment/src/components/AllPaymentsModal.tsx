import { useMemo, useRef } from 'react';

import { Modal } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { localizedDate } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

import { IdealLoanInstallment } from '../types';

interface IAllPaymentsModalProps {
  data: IdealLoanInstallment[];
  isOpen: boolean;
  onClose: () => void;
}

export const AllPaymentsModal = ({ data, isOpen, onClose }: IAllPaymentsModalProps) => {
  const tableRef = useRef<HTMLTableElement>(null);

  const { totalPrincipalPaid, totalInterestPaid, totalFinePaid } = useMemo(
    () => ({
      totalPrincipalPaid: data?.reduce(
        (sum, installment) => sum + Number(installment?.principal) ?? 0,
        0
      ),
      totalInterestPaid: data?.reduce(
        (sum, installment) => sum + Number(installment?.interest) ?? 0,
        0
      ),
      totalFinePaid: data?.reduce((sum, installment) => sum + Number(installment?.penalty), 0),
    }),
    [data]
  );

  const columns = useMemo<Column<IdealLoanInstallment>[]>(
    () => [
      {
        header: 'Ins. No.',
        accessorKey: 'installmentNo',
        footer: 'Total',

        meta: {
          width: '3.125rem',
          Footer: {
            colspan: 3,
          },
        },
      },

      {
        header: 'Installment Date',
        accessorKey: 'installmentDate',
        cell: (props) => localizedDate(props?.row?.original?.installmentDate),
        meta: {
          Footer: {
            display: 'none',
          },
        },
      },
      {
        header: 'Last Paid Date',
        accessorKey: 'paidDate',
        cell: (props) => localizedDate(props?.row?.original?.paidDate),
        meta: {
          Footer: {
            display: 'none',
          },
        },
      },

      {
        header: 'Principal',
        accessorKey: 'principal',
        cell: (props) => amountConverter(props?.row?.original?.principal),
        footer: () => amountConverter(totalPrincipalPaid),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Interest',
        accessorKey: 'interest',
        cell: (props) => amountConverter(props.getValue() as string),
        footer: () => amountConverter(totalInterestPaid),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Fine',
        accessorKey: 'penalty',
        cell: (props) => amountConverter(props.getValue() as string),
        footer: () => amountConverter(totalFinePaid),
        meta: {
          isNumeric: true,
        },
      },

      {
        header: 'Total',
        accessorKey: 'payment',
        cell: (props) => amountConverter(props.getValue() as string),
        footer: () => amountConverter(totalPrincipalPaid + totalInterestPaid + totalFinePaid),
        meta: {
          isNumeric: true,
        },
      },
    ],
    [totalPrincipalPaid, totalInterestPaid, totalFinePaid]
  );
  return (
    <Modal
      onClose={onClose}
      open={isOpen}
      title="Recent Loan Payments"
      scrollBehavior="inside"
      blockScrollOnMount
      width="4xl"
    >
      <Table
        size="report"
        variant="report"
        isStatic
        showFooter
        data={data ?? []}
        columns={columns}
        ref={tableRef}
      />
    </Modal>
  );
};
