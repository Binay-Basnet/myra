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

type ShareReportTotal = {
  totalShares?: number;
  totalDr?: number;
  totalCr?: number;
  totalBalanceSheet?: number;
};

interface ShareReportTableProps {
  shareReport: ShareReport[];
  shareTotal: ShareReportTotal;
}

export const ShareReportTable = ({ shareReport, shareTotal }: ShareReportTableProps) => (
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
      showFooter
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
          footer: () => shareTotal.totalShares,
          accessorKey: 'noOfShares',
          meta: {
            isNumeric: true,
          },
        },
        {
          header: 'Return Amount (Dr.)',
          accessorKey: 'returnAmountDr',
          footer: () => shareTotal.totalDr,
          meta: {
            isNumeric: true,
          },
        },
        {
          header: 'Purchase Amount (Cr.)',
          accessorKey: 'purchaseAmountCr',
          footer: () => shareTotal.totalCr,

          meta: {
            isNumeric: true,
          },
        },
        {
          header: 'Balance Sheet',
          accessorKey: 'balanceSheet',
          footer: () => shareTotal.totalBalanceSheet,

          meta: {
            isNumeric: true,
          },
        },
      ]}
    />
  </Box>
);
