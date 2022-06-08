import { useMemo } from 'react';
import { Avatar, Flex } from '@chakra-ui/react';
import {
  PopoverComponent,
  TableListPageHeader,
  TableSearch,
} from '@coop/myra/components';
import { useGetShareRegisterListQuery } from '@coop/myra/graphql';
import { Column, Table } from '@coop/myra/ui';
import format from 'date-fns/format';

export const ShareRegisterTable = () => {
  const { data, isLoading } = useGetShareRegisterListQuery();

  const rowData = useMemo(() => data?.share?.register?.edges ?? [], [data]);

  const popoverTitle = ['View Detail', 'View Member Profile'];

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        Header: 'Date',
        accessor: 'node.transactionDate',
        Cell: ({ value, row }) => {
          return <span>{format(new Date(value), 'yyyy-mm-dd')}</span>;
        },
      },

      {
        Header: 'Type',
        accessor: 'node.transactionDirection',
      },
      {
        Header: 'Member ID',
        accessor: 'node.id',
        maxWidth: 4,
        Cell: ({ value }) => {
          return <span>{value.slice(0, 5).toUpperCase()}</span>;
        },
      },

      {
        Header: 'Name',
        accessor: 'node.member.personalInformation.name.firstName',
        width: '80%',

        Cell: ({ value, row }) => {
          return (
            <Flex alignItems="center" gap="2">
              <Avatar
                name="Dan Abrahmov"
                size="sm"
                src="https://bit.ly/dan-abramov"
              />
              <span>
                {value}{' '}
                {
                  row?.original?.node?.member?.personalInformation?.name
                    ?.lastName
                }
              </span>
            </Flex>
          );
        },
      },

      {
        Header: 'From - To',
        accessor: 'node.shareStartNumber',

        Cell: ({ value, row }) => {
          return (
            <span>
              {value} to {row?.original?.node?.shareEndNumber}
            </span>
          );
        },
      },

      {
        id: 'share-dr',
        Header: 'Share Dr',
        accessor: 'node.shareDr',
        isNumeric: true,

        Cell: ({ value, row }) => {
          return <span>{value ? value.toFixed(2) : '-'}</span>;
        },
      },
      {
        id: 'share-cr',
        Header: 'Share Cr',
        isNumeric: true,
        accessor: 'node.shareCr',
        Cell: ({ value, row }) => {
          return <span>{value ? value.toFixed(2) : '-'}</span>;
        },
      },
      {
        Header: 'Balance',
        accessor: 'node.balance',
        isNumeric: true,
        Cell: ({ value, row }) => {
          return <span>{Number(value).toFixed(2)}</span>;
        },
      },
      {
        accessor: 'actions',
        Cell: () => <PopoverComponent title={popoverTitle} />,
      },
    ],
    []
  );

  const shareRows = useMemo(
    () => [
      {
        title: 'shareActive',
        key: 'APPROVED',
      },
      {
        title: 'shareSubmitted',
        key: 'VALIDATED',
      },
      {
        title: 'shareDraft',
        key: 'DRAFT',
      },
    ],
    []
  );

  return (
    <>
      <TableListPageHeader heading={'Share Register'} tabItems={shareRows} />
      <TableSearch />
      <Table
        isLoading={isLoading}
        data={rowData ?? []}
        columns={columns}
        sort={true}
      />
    </>
  );
};
