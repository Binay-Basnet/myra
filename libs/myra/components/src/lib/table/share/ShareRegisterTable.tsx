import { useMemo } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { Avatar, Flex, IconButton } from '@chakra-ui/react';
import {
  ShareRegisterEdge,
  useGetShareRegisterListQuery,
} from '@saccos/myra/graphql';
import { Column, Table } from '@saccos/myra/ui';
import moment from 'moment';

export const ShareRegisterTable = () => {
  const { data, isLoading } = useGetShareRegisterListQuery();

  const rowData = useMemo(() => data?.share?.register?.edges, [data]);

  const columns: Column<ShareRegisterEdge>[] = useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'node.transactionDate',
        Cell: ({ value, row }) => {
          return <span>{moment(value).format('YYYY-MM-DD')}</span>;
        },
      },

      {
        Header: 'Member ID',
        accessor: 'node.id',
        maxWidth: 4,
      },

      {
        Header: 'Type',
        accessor: 'node.transactionDirection',
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
        Header: 'To - From',
        accessor: 'node.shareStartNumber',
        maxWidth: 48,

        Cell: ({ value, row }) => {
          return (
            <span>
              {value} - {row?.original?.node?.shareEndNumber}
            </span>
          );
        },
      },
      {
        Header: 'Share Count',
        accessor: 'node.noOfShare',
      },
      {
        Header: 'Share Dr',
        accessor: 'node.member.address.permanent.inNepali.locality',
        Cell: ({ value, row }) => {
          return (
            <span>
              {row.original.node.transactionDirection === 'PURCHASE'
                ? row.original.node.shareAmount.toFixed(2)
                : '-'}
            </span>
          );
        },
      },
      {
        Header: 'Share Cr',
        accessor: 'node.member.address.permanent.inNepali.district',
        Cell: ({ value, row }) => {
          return (
            <span>
              {row.original.node.transactionDirection === 'RETURN'
                ? row.original.node.shareAmount.toFixed(2)
                : '-'}
            </span>
          );
        },
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
        Cell: () => (
          <IconButton
            variant="ghost"
            aria-label="Search database"
            icon={<BsThreeDots />}
          />
        ),
      },
    ],
    []
  );

  return (
    <Table
      isLoading={isLoading}
      data={rowData ?? []}
      columns={columns}
      sort={true}
    />
  );
};
