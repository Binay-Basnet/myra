import { useMemo, useRef } from 'react';

import { Box, Button, Chips, Modal, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { LoanInstallment } from '@coop/cbs/data-access';
import { exportVisibleTableToExcel, localizedDate } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

interface IFullLoanScheduleProps {
  data: LoanInstallment[];
  total: string;
  totalInterest: string | number;
  totalPrincipal: string | number;
  isOpen: boolean;
  onClose: () => void;
  loanName: string;
  totalRemainingPayable?: string | null;
  // remainingInterest?: string | number;
  // currentRemainingPrincipal?: string | number;
}

export const FullLoanSchedule = ({
  data,
  total,
  totalInterest,
  totalPrincipal,
  // remainingInterest,
  // currentRemainingPrincipal,
  isOpen,
  onClose,
  loanName,
  totalRemainingPayable,
}: IFullLoanScheduleProps) => {
  const tableRef = useRef<HTMLTableElement>(null);

  const columns = useMemo<Column<LoanInstallment>[]>(
    () => [
      {
        header: 'Ins. No.',
        accessorKey: 'installmentNo',
        footer: 'Total',

        meta: {
          width: '3.125rem',
          Footer: {
            colspan: 2,
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
        header: 'Principal',
        accessorKey: 'principal',
        cell: (props) =>
          amountConverter(
            props?.row?.original?.isPartial
              ? Number(props?.row?.original?.fullPrincipal ?? 0)
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
            props?.row?.original?.isPartial
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
        header: 'Rem. Principal',
        accessorKey: 'remainingPrincipal',
        cell: (props) => amountConverter(props.getValue() as string),
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
              return <Chips variant="solid" theme="info" size="md" type="label" label="Current" />;

            case 'PAID':
              return <Chips variant="solid" theme="success" size="md" type="label" label="Paid" />;

            default:
              return '';
          }
        },
      },
    ],
    [total]
  );
  return (
    <Modal
      onClose={onClose}
      open={isOpen}
      title="Full Loan Schedule"
      scrollBehavior="inside"
      blockScrollOnMount
      width="4xl"
      headerButton={
        <Button
          variant="ghost"
          onClick={() => exportVisibleTableToExcel(`${loanName} - Recent Payments`, tableRef)}
        >
          Export
        </Button>
      }
    >
      <Box display="flex" flexDirection="column" gap="s16">
        <Table
          size="report"
          variant="report"
          isStatic
          showFooter
          data={data ?? []}
          columns={columns}
          ref={tableRef}
        />

        <Box
          display="flex"
          flexDirection="column"
          fontSize="s3"
          fontWeight={500}
          color="gray.700"
          border="1px"
          borderColor="border.layout"
        >
          <Box
            display="flex"
            px="s20"
            // h="s40"
            alignItems="center"
            borderBottom="1px"
            borderColor="border.layout"
          >
            <Text py="s10" flexBasis="75%" borderRight="1px" borderColor="border.layout">
              Total Loan Amount
            </Text>
            <Text flexBasis="25%" display="flex" justifyContent="flex-end">
              {amountConverter(totalPrincipal)}
            </Text>
          </Box>
          <Box display="flex" px="s20" alignItems="center">
            <Text flexBasis="75%" borderRight="1px" borderColor="border.layout" py="s10">
              Total Payable Amount
            </Text>
            <Text flexBasis="25%" display="flex" justifyContent="flex-end">
              {amountConverter(totalRemainingPayable ?? 0)}
            </Text>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
