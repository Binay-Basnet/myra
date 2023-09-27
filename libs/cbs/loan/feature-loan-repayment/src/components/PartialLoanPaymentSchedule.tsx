import React, { useMemo } from 'react';

import { Box, Chips } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { localizedDate } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

import { IdealLoanInstallment } from '../types';

interface IPartialLoanPaymentScheduleProps {
  data: IdealLoanInstallment[];
  // nextInstallmentNumber?: number | null;
  total: string;
  totalInterest: string | number;
  totalPrincipal: string | number;
  isLoading?: boolean;
  // remainingInterest?: string | number;
  // currentRemainingPrincipal?: string | number;
}

export const PartialLoanPaymentSchedule = React.forwardRef<
  HTMLTableElement,
  IPartialLoanPaymentScheduleProps
>(
  (
    {
      data,
      total,
      totalInterest,
      totalPrincipal,
      // remainingInterest,
      // currentRemainingPrincipal,
      // nextInstallmentNumber,
      isLoading,
    },
    ref
  ) => {
    const columns = useMemo<Column<IdealLoanInstallment>[]>(
      () => [
        {
          header: 'Ins. No.',
          // accessorKey: 'installmentNo',
          accessorFn: (row) => row?.installmentNo,
          meta: {
            width: '3.125rem',
          },
        },

        {
          header: 'Installment Date',
          accessorKey: 'installmentDate',
          cell: (props) => localizedDate(props?.row?.original?.installmentDate),
          footer: 'Total Cost of Loan',
          meta: {
            width: '3.125rem',
            Footer: {
              colspan: 1,
            },
          },
        },

        {
          header: 'Principal',
          accessorKey: 'principal',
          cell: (props) => amountConverter(props?.row?.original?.idealPrincipal),
          footer: () => amountConverter(totalPrincipal),
          meta: {
            isNumeric: true,
          },
        },
        {
          header: 'Interest',
          accessorKey: 'interest',
          cell: (props) => amountConverter(props?.row?.original?.idealInterest),
          footer: () => amountConverter(totalInterest),
          meta: {
            isNumeric: true,
          },
        },
        {
          header: 'Rebate',
          accessorKey: 'rebate',
          cell: (props) => amountConverter(props?.row?.original?.rebate || 0),
          meta: {
            isNumeric: true,
          },
        },
        {
          header: 'Total',
          accessorKey: 'payment',
          cell: (props) => amountConverter(props?.row?.original?.idealPayment ?? 0),
          footer: () => amountConverter(total) || '-',
          meta: {
            isNumeric: true,
          },
        },
        {
          header: 'Status',
          accessorKey: 'status',

          cell: (props) => {
            switch (props?.row?.original?.status) {
              case 'OVERDUE':
                return (
                  <Chips
                    variant="solid"
                    theme="danger"
                    size="md"
                    type="label"
                    label={`Overdue By ${props?.row?.original?.overDueDays} Days`}
                  />
                );

              case 'PARTIAL':
                return (
                  <Chips variant="solid" theme="warning" size="md" type="label" label="Partial" />
                );

              case 'CURRENT':
                return (
                  <Chips variant="solid" theme="info" size="md" type="label" label="Current" />
                );

              default:
                return '';
            }
          },
        },
      ],
      [total, totalInterest, totalPrincipal]
    );
    return (
      <Box maxW="920" overflowY="auto">
        <Table
          size="report"
          variant="report"
          isStatic
          showFooter
          data={data ?? []}
          columns={columns}
          isLoading={isLoading}
          ref={ref}
        />
      </Box>
    );
  }
);
