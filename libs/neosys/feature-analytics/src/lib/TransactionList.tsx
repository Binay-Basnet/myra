import { useMemo } from 'react';

import { Box, Column, HoverCard, PageHeader, Table, Text } from '@myra-ui';

import { useGetAllTransactionCounterQuery } from '@coop/neosys-admin/data-access';

export const TransactionList = () => {
  const { data, isFetching } = useGetAllTransactionCounterQuery();

  const rowData = useMemo(
    () => data?.neosys?.thread?.transactionCounter?.fetchTransactionCounter?.records ?? [],
    [data]
  );

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Query Date',
        accessorFn: (row) => row?.queryDate?.local,
      },
      {
        header: 'Slug',
        accessorFn: (row) => row?.slug,
      },
      {
        header: 'Txn Count',
        accessorFn: (row) => row?.txnCount,
      },
      {
        id: '_actions',
        header: '',
        accessorKey: 'actions',
        cell: (props) => (
          <HoverCard>
            <HoverCard.Trigger>View Summary</HoverCard.Trigger>
            <HoverCard.Content>
              <HoverCard.Header>
                <Box p="s16">
                  <Text>Transaction Summary</Text>
                </Box>
              </HoverCard.Header>
              <HoverCard.Body>
                <Box
                  p="s16"
                  display="flex"
                  flexDirection="column"
                  gap="s4"
                  maxH="300px"
                  overflowY="auto"
                >
                  {Object.keys(props?.row?.original?.txnTypeCount ?? {})?.map((t) => (
                    <Box display="flex" gap="s4">
                      <Text>{t}:</Text>
                      <Text>
                        {(props?.row?.original?.txnTypeCount as Record<string, string>)?.[t]}
                      </Text>
                    </Box>
                  ))}
                </Box>
              </HoverCard.Body>
            </HoverCard.Content>
          </HoverCard>
        ),
      },
    ],
    []
  );

  return (
    <>
      <PageHeader heading="Transactions" />
      <Table data={rowData} isLoading={isFetching} columns={columns} />
    </>
  );
};

export default TransactionList;
