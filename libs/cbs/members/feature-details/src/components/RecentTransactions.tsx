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
          props.getValue() ? (
            <Text fontWeight="Medium" fontSize="s3" lineHeight="17px">
              {props.getValue() as string}
            </Text>
          ) : (
            'N/A'
          ),
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
          props.table ? (
            <Text fontWeight="Medium" fontSize="r1" lineHeight="17px" color="primary.500">
              {amountConverter(props.getValue() as string)}
            </Text>
          ) : (
            'N/A'
          ),
        meta: {
          isNumeric: true,
          width: '33%',
        },
      },
    ],
    []
  );

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
      <Table isDetailPageTable isStatic data={memberRecentTransWithIndex} columns={columns} />
    </DetailsCard>
  );
};
