import React, { useMemo } from 'react';

import { Box, Chips, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { LoanInstallment } from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

interface ILoanPaymentScheduleTableProps {
  data: LoanInstallment[];
  nextInstallmentNumber?: number;
  total: string;
  totalInterest: string | number;
  totalPrincipal: string | number;
  // remainingInterest?: string | number;
  // currentRemainingPrincipal?: string | number;
}

export const LoanPaymentScheduleTable = React.forwardRef<
  HTMLTableElement,
  ILoanPaymentScheduleTableProps
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
          header: 'S.N.',
          footer: 'Total Cost of Loan',
          accessorKey: 'installmentNo',
          meta: {
            width: '50px',
            Footer: {
              colspan: 1,
            },
          },
        },

        {
          header: 'Installment Date',
          accessorFn: (row) => localizedDate(row?.installmentDate),
        },

        {
          header: 'Principal',
          accessorKey: 'principal',
          cell: (props) => amountConverter(props.getValue() as string),
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
          header: 'Payment',
          accessorKey: 'payment',
          cell: (props) => amountConverter(props.getValue() as string),
          footer: () => amountConverter(total) || '-',

          meta: {
            isNumeric: true,
          },
        },

        {
          header: 'Remaining Amount',

          accessorKey: 'remainingPrincipal',
          cell: (props) => {
            const principalData = props?.row?.original;
            return principalData?.status === 'PAID' &&
              principalData?.currentRemainingPrincipal === '0' &&
              principalData?.remainingInterest === '0' ? (
              '0.00'
            ) : (
              <>
                {amountConverter(principalData?.principal)}
                {principalData?.currentRemainingPrincipal &&
                  principalData?.currentRemainingPrincipal !== '0' && (
                    <>
                      (Current Remaining Principal:{' '}
                      {amountConverter(principalData?.currentRemainingPrincipal)})
                    </>
                  )}
                {principalData?.remainingInterest && principalData?.remainingInterest !== '0' && (
                  <>(Remaining Interest: {amountConverter(principalData?.remainingInterest)})</>
                )}
              </>
            );
          },

          meta: {
            isNumeric: true,
          },
        },
        {
          header: 'Status',
          accessorKey: 'status',

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
