import { useMemo, useRef } from 'react';

import { Modal } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { LoanInstallment } from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

interface IAllPaymentsModalProps {
  data: LoanInstallment[];
  total: string;
  totalInterest: string | number;
  totalPrincipal: string | number;
  isOpen: boolean;
  onClose: () => void;
  // remainingInterest?: string | number;
  // currentRemainingPrincipal?: string | number;
}

export const AllPaymentsModal = ({
  data,
  total,
  totalInterest,
  totalPrincipal,
  // remainingInterest,
  // currentRemainingPrincipal,
  isOpen,
  onClose,
}: IAllPaymentsModalProps) => {
  const tableRef = useRef<HTMLTableElement>(null);

  const columns = useMemo<Column<LoanInstallment>[]>(
    () => [
      {
        header: 'Ins. No.',
        accessorKey: 'installmentNo',
        footer: 'Total Cost of Loan',

        meta: {
          width: '50px',
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
        cell: (props) =>
          amountConverter(
            props?.row?.original?.currentRemainingPrincipal !== '0'
              ? Number(props?.row?.original?.principal ?? 0) +
                  Number(props?.row?.original?.currentRemainingPrincipal ?? 0)
              : props?.row?.original?.principal ?? 0
          ),
        footer: () => amountConverter(totalPrincipal),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Interest',
        accessorKey: 'interest',
        cell: (props) => amountConverter(props.getValue() as string),
        footer: () => amountConverter(totalInterest),
        meta: {
          isNumeric: true,
        },
      },

      {
        header: 'Total',
        accessorKey: 'payment',
        cell: (props) => amountConverter(props.getValue() as string),
        footer: () => amountConverter(total) || '-',
        meta: {
          isNumeric: true,
        },
      },
    ],
    [total]
  );
  return (
    <Modal
      onClose={onClose}
      open={isOpen}
      title="Recent Loan Payments"
      scrollBehavior="inside"
      blockScrollOnMount
      width="4xl"
      // headerButton={
      //   <Button
      //     variant="ghost"
      //     onClick={() => exportVisibleTableToExcel(`${loanName} - Recent Payments`, tableRef)}
      //   >
      //     Export
      //   </Button>
      // }
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
