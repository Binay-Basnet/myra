import { ShareStatement, TotalReport } from '@coop/cbs/data-access';
import { Table } from '@coop/shared/table';
import { Box } from '@coop/shared/ui';

interface ShareReportTableProps {
  shareReport?: ShareStatement[] | null;
  shareTotal?: TotalReport | null;
}

export const ShareReportTable = ({ shareReport, shareTotal }: ShareReportTableProps) => (
  <Box p="s32">
    <Table
      variant="report"
      size="report"
      isStatic
      data={
        shareReport?.map((share, index) => ({
          ...share,
          index: index + 1,
        })) ?? []
      }
      showFooter
      columns={[
        {
          header: 'S.No.',

          footer: () => <Box textAlign="right">Total Balance</Box>,
          accessorKey: 'index',
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
          cell: (props: { getValue: () => unknown }) => String(props?.getValue())?.split(' ')[0],
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
          footer: () => shareTotal?.totalShares,
          accessorKey: 'noOfShares',
          meta: {
            isNumeric: true,
          },
        },
        {
          header: 'Return Amount (Dr.)',
          accessorKey: 'returnAmountDr',
          footer: () => shareTotal?.totalDr,
          meta: {
            isNumeric: true,
          },
        },
        {
          header: 'Purchase Amount (Cr.)',
          accessorKey: 'purchaseAmountCr',
          footer: () => shareTotal?.totalCr,

          meta: {
            isNumeric: true,
          },
        },
        {
          header: 'Balance Sheet',
          accessorKey: 'balanceSheet',
          footer: () => shareTotal?.totalBalanceSheet,

          meta: {
            isNumeric: true,
          },
        },
      ]}
    />
  </Box>
);
