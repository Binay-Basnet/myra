import React from 'react';
import dayjs from 'dayjs';

import { InterestTaxReportEntry } from '@coop/cbs/data-access';
import { Column, Table } from '@coop/shared/table';
import { Box } from '@coop/shared/ui';
import { amountConverter } from '@coop/shared/utils';

interface InterestTaxReportTableProps {
  taxReport: InterestTaxReportEntry[];
}

export const InterestTaxReportTable = ({ taxReport }: InterestTaxReportTableProps) => {
  const report = taxReport.map((interest, index) => ({
    ...interest,
    index: index + 1,
  }));

  const columns = React.useMemo<Column<InterestTaxReportEntry & { index: number }>[]>(
    () => [
      {
        header: 'S.No.',
        accessorKey: 'index',
        meta: {
          width: '60px',
          Footer: {
            colspan: 4,
          },
        },
      },
      {
        header: 'Member ID',
        accessorKey: 'memberId',
      },
      {
        header: 'Member Name',
        accessorFn: (row) => row?.name?.local,
      },
      {
        header: 'Address',
        accessorFn: (row) => row?.address?.district,
      },
      {
        header: 'PAN NO.',
        accessorFn: (row) => row?.panNo,
      },
      {
        header: 'Account No',
        accessorKey: 'accountNo',
      },
      {
        header: 'Tax Deduct Date',
        accessorKey: 'date',
        cell: ({ cell }) => dayjs(cell.row.original.date?.local).format('YYYY-MM-DD'),
      },
      {
        header: 'Remarks',
        accessorKey: 'remarks',
      },
      {
        header: 'Saving Balance',
        accessorKey: 'savingBalance',
        cell: (props) => amountConverter(props.getValue() as string),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Interest Amount',
        accessorKey: 'interest',
        cell: (props) => amountConverter(props.getValue() as string),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Tax Amount',
        accessorKey: 'tax',
        cell: (props) => amountConverter(props.getValue() as string),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Closing Balance',
        accessorKey: 'closingBalance',
        cell: (props) => amountConverter(props.getValue() as string),
        meta: {
          isNumeric: true,
        },
      },
    ],
    []
  );

  return (
    <Box p="s32">
      <Table variant="report" size="report" isStatic data={report} showFooter columns={columns} />
    </Box>
  );
};
