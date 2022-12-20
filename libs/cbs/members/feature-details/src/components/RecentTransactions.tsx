import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Button, Column, DetailsCard, Table, Text } from '@myra-ui';

import { useGetMemberDetailsOverviewQuery } from '@coop/cbs/data-access';
import { amountConverter } from '@coop/shared/utils';

export const RecentTransactions = () => {
  const router = useRouter();
  const id = router.query['id'] as string;
  const memberDetails = useGetMemberDetailsOverviewQuery({
    id: id as string,
  });

  const memberRecentTrans =
    memberDetails?.data?.members?.memberOverview?.data?.overview?.recentTransactions;

  const memberRecentTransWithIndex =
    memberRecentTrans?.slice(0, 10)?.map((trans, index) => ({
      index: index + 1,
      ...trans,
    })) ?? [];

  const columns = useMemo<Column<typeof memberRecentTransWithIndex[0]>[]>(
    () => [
      {
        header: 'SN',
        accessorKey: 'index',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
      },
      {
        header: 'Date',
        accessorKey: 'date',
        cell: (props) => (props.getValue() ? `${props.getValue()}` : 'N/A'),
      },
      {
        header: 'Transaction ID',
        accessorKey: 'noOfShares',
        cell: (props) =>
          props.getValue() ? <Text color="primary.500">#{props.getValue() as string}</Text> : 'N/A',
      },
      {
        header: 'Type',
        accessorKey: 'txnType',
        cell: (props) =>
          props.getValue() ? `${(props.getValue() as string).toLowerCase()}` : 'N/A',
      },

      {
        header: 'Account / Particulars',
        accessorKey: 'title',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
        meta: {
          width: '33%',
        },
      },
      {
        header: 'Amount',
        accessorKey: 'amount',
        cell: (props) =>
          props.getValue() ? `${amountConverter(props.getValue() as string)}` : 'N/A',
        meta: {
          isNumeric: true,
          width: '33%',
        },
      },
      // {
      //   header: 'Fine',
      //   accessorKey: 'noOfShares',
      //   cell: (props) => (props.getValue() ? `${props.getValue()}` : '-'),
      //   meta: {
      //     isNumeric: true,
      //     width: '33%',
      //   },
      // },
      // {
      //   header: 'Rebate',
      //   accessorKey: 'noOfShares',
      //   cell: (props) => (props.getValue() ? `${props.getValue()}` : '-'),
      //   meta: {
      //     isNumeric: true,
      //     width: '33%',
      //   },
      // },
      // {
      //   header: 'Total',
      //   accessorKey: 'noOfShares',
      //   cell: (props) =>
      //     props.getValue() ? (
      //       <Text color="primary.500">{amountConverter(props.getValue() as string)}</Text>
      //     ) : (
      //       'N/A'
      //     ),
      //   meta: {
      //     isNumeric: true,
      //     width: '33%',
      //   },
      // },
    ],
    []
  );

  if (!memberRecentTransWithIndex || Object.keys(memberRecentTransWithIndex).length === 0)
    return null;

  return (
    <DetailsCard
      title="Recent Transactions"
      hasTable
      leftBtn={
        <Button
          variant="link"
          onClick={() => router.push(`/members/details?id=${id}&tab=transactions`)}
        >
          View All Transactions
        </Button>
      }
    >
      <Table isStatic data={memberRecentTransWithIndex} columns={columns} />
    </DetailsCard>
    // <Box p="s16" bg="white" borderRadius="br2">
    //   <Box display="flex" justifyContent="space-between" alignItems="center" h="50px">
    //     <Text fontWeight="600" fontSize="r1">
    //       Recent Transactions{' '}
    //     </Text>
    //   </Box>
    //   {memberRecentTrans && (
    //     <Box>
    //       {memberRecentTrans?.slice(0, 10).map((items) => (
    //         <Box
    //           h="80px"
    //           display="flex"
    //           justifyContent="space-between"
    //           borderBottom="1px solid"
    //           alignItems="center"
    //           borderBottomColor="border.layout"
    //           key={`${items?.date}${items?.title}${items?.amount}`}
    //         >
    //           <Box display="flex" flexDirection="column" gap="s4">
    //             <Text fontSize="s3" fontWeight="500">
    //               {items?.title}
    //             </Text>
    //             <Text fontSize="s3" fontWeight="400">
    //               {items?.date}
    //             </Text>
    //           </Box>
    //           <Box>
    //             <Box
    //               display="flex"
    //               justifyContent="flex-start"
    //               color={
    //                 items?.txnType === MemberRecentTransactionViewTxnType?.Debit
    //                   ? 'danger.500'
    //                   : 'primary.500'
    //               }
    //             >
    //               <Text fontSize="s3" fontWeight="400">
    //                 {items?.txnType === MemberRecentTransactionViewTxnType?.Debit ? '-' : '+'}
    //               </Text>
    //               <Text fontSize="s3" fontWeight="400">
    //                 {' '}
    //                 {amountConverter(items?.amount as string)}
    //               </Text>
    //             </Box>
    //             {items?.noOfShares && (
    //               <Box>
    //                 <Tags
    //                   label={String(items?.noOfShares as unknown)}
    //                   type="chip"
    //                   bg={
    //                     items?.txnType === MemberRecentTransactionViewTxnType?.Debit
    //                       ? 'danger.100'
    //                       : 'primary.100'
    //                   }
    //                   labelColor={
    //                     items?.txnType === MemberRecentTransactionViewTxnType?.Debit
    //                       ? 'danger.500'
    //                       : 'primary.500'
    //                   }
    //                 />
    //               </Box>
    //             )}
    //           </Box>
    //         </Box>
    //       ))}
    //     </Box>
    //   )}
    // </Box>
  );
};
