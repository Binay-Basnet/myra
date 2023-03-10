import React, { useMemo } from 'react';

import { Box, Chips, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { LoanInstallment } from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

interface IPartialLoanPaymentScheduleProps {
  data: LoanInstallment[];
  nextInstallmentNumber?: number;
  total: string;
  totalInterest: string | number;
  totalPrincipal: string | number;
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
      nextInstallmentNumber,
    },
    ref
  ) => {
    const columns = useMemo<Column<LoanInstallment>[]>(
      () => [
        {
          header: 'Ins. No.',
          accessorKey: 'installmentNo',
          meta: {
            width: '50px',
          },
        },

        {
          header: 'Installment Date',
          accessorKey: 'installmentDate',
          cell: (props) => localizedDate(props?.row?.original?.installmentDate),
          footer: 'Total Cost of Loan',
          meta: {
            width: '50px',
            Footer: {
              colspan: 1,
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
          cell: (props) =>
            amountConverter(
              props?.row?.original?.remainingInterest !== '0'
                ? Number(props?.row?.original?.interest ?? 0) +
                    Number(props?.row?.original?.remainingInterest ?? 0)
                : props?.row?.original?.interest ?? 0
            ),
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
        {
          header: 'Status',
          accessorKey: 'paid',

          cell: (props) => {
            const installmentNo = props?.row?.original?.installmentNo;
            const value = props.getValue();

            return (
              <Text
                textAlign="center"
                fontSize="s3"
                fontWeight="500"
                color={
                  installmentNo === nextInstallmentNumber
                    ? 'info.500'
                    : value
                    ? 'primary.500'
                    : 'gray.600'
                }
              >
                {installmentNo === nextInstallmentNumber ? (
                  <Chips variant="solid" theme="success" size="md" type="label" label="Current" />
                ) : value ? (
                  <Chips variant="solid" theme="info" size="md" type="label" label="Paid" />
                ) : (
                  '-'
                )}
              </Text>
            );
          },
        },
      ],
      [nextInstallmentNumber, total]
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
          ref={ref}
        />
      </Box>
    );
  }
);
