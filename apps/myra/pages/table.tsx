import { Box } from '@myra-ui/foundations';
import { ExpandedCell, ExpandedHeader, Table } from '@myra-ui/table';

import { useGetTrialSheetReportQuery } from '@coop/cbs/data-access';
import { arrayToTree } from '@coop/shared/components';

export const TablePage = () => {
  const { data: coa } = useGetTrialSheetReportQuery({
    data: {
      branchId: 'TESTBRANCH',
      period: {
        from: { en: '2022-11-10', np: null, local: null },
        to: { en: '2022-12-20', np: null, local: null },
      },
      filter: {
        includeZero: true,
      },
    },
  });

  const coaData = arrayToTree(
    coa?.report?.transactionReport?.financial?.trialSheetReport?.data?.assets?.map((a) => ({
      ...a,
      id: a.ledgerId,
    })) || []
  );

  return (
    <Box p="s16" w="100%" minH="100vh" bg="white">
      <Table
        data={coaData}
        getSubRows={(row) => row.children}
        variant="report"
        isStatic
        size="report"
        columns={[
          {
            header: ({ table }) => (
              <ExpandedHeader table={table} value="1. Equity and Liabilities" />
            ),
            accessorKey: 'ledgerId',
            cell: ({ row, getValue }) => <ExpandedCell row={row} value={getValue() as string} />,
          },
          { header: 'Balance', accessorKey: 'balance' },
        ]}
      />
    </Box>
  );
};

export default TablePage;
