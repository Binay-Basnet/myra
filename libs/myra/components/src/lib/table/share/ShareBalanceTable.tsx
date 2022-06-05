import { useMemo } from 'react';
import { Avatar, Flex } from '@chakra-ui/react';
import { PopoverComponent, TableListPageHeader } from '@saccos/myra/components';
import { useGetShareBalanceListQuery } from '@saccos/myra/graphql';
import { Column, Table } from '@saccos/myra/ui';

import { TableSearch } from '../../TableSearch';

export const ShareBalanceTable = () => {
  const { data, isLoading } = useGetShareBalanceListQuery();

  const rowData = useMemo(() => data?.share.balance?.edges ?? [], [data]);

  const popoverTitle = ['View Member Profile'];

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        Header: 'Member #',
        accessor: 'node.id',
        maxWidth: 4,
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
        Header: 'Share Count',
        accessor: 'node.shareCount',
        maxWidth: 48,
      },
      {
        Header: 'Balance',
        accessor: 'node.balance',
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

  return (
    <>
      <TableListPageHeader heading={'Share Balance'} />
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
