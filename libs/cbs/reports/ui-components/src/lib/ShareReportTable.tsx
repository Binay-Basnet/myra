import { map, sum } from 'lodash';

import { Table } from '@coop/shared/table';
import { Box } from '@coop/shared/ui';

type ShareReport = {
  's.no.'?: number;
  date: string;
  particular: string;
  noOfShares: number;
  returnAmountDr: number;
  purchaseAmountCr: number;
  balanceSheet: number;
};

interface ShareReportTableProps {
  shareReport: ShareReport[];
}

export const ShareReportTable = ({ shareReport }: ShareReportTableProps) => {
  return (
    <Box p="s32">
      <Table<ShareReport>
        variant="report"
        size="report"
        isStatic
        data={
          shareReport?.map((share, index) => ({
            ...share,
            's.no.': index + 1,
          })) ?? []
        }
        columns={[
          {
            header: 'S.No.',

            footer: () => <Box textAlign="right">Total Balance</Box>,
            accessorKey: 's.no.',
            meta: {
              width: '60px',
              Footer: {
                colspan: 3,
              },
            },
          },
          {
            header: 'Date',
            accessorKey: 'date',
            cell: ({ cell }) => cell.row.original.date.split(' ')[0],
            meta: {
              Footer: {
                display: 'none',
              },
            },
          },
          {
            header: 'Particular',
            accessorKey: 'particular',
            meta: {
              width: '100%',
              Footer: {
                display: 'none',
              },
            },
          },
          {
            header: 'No of Share',
            footer: ({ table }) => {
              return sum(map(table.options.data.map((d) => d.noOfShares)));
            },
            accessorKey: 'noOfShares',
            meta: {
              isNumeric: true,
            },
          },
          {
            header: 'Return Amount (Dr.)',
            accessorKey: 'returnAmountDr',
            footer: ({ table }) => {
              return sum(map(table.options.data.map((d) => d.returnAmountDr)));
            },
            meta: {
              isNumeric: true,
            },
          },
          {
            header: 'Purchase Amount (Cr.)',
            accessorKey: 'purchaseAmountCr',
            footer: ({ table }) => {
              return sum(
                map(table.options?.data.map((d) => d.purchaseAmountCr))
              );
            },
            meta: {
              isNumeric: true,
            },
          },
          {
            header: 'Balance Sheet',
            accessorKey: 'balanceSheet',
            footer: ({ table }) => {
              return sum(map(table.options?.data.map((d) => d.balanceSheet)));
            },
            meta: {
              isNumeric: true,
            },
          },
        ]}
      />
    </Box>
  );
};
