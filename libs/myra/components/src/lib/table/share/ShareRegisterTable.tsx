import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { Avatar, Flex } from '@chakra-ui/react';
import format from 'date-fns/format';

import { PopoverComponent, TableListPageHeader } from '@coop/myra/components';
import { useGetShareRegisterListQuery } from '@coop/shared/data-access';
import { Column, Table } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const ShareRegisterTable = () => {
  const { data, isFetching } = useGetShareRegisterListQuery();
  const { t } = useTranslation();
  const router = useRouter();

  const rowData = useMemo(() => data?.share?.register?.edges ?? [], [data]);

  const popoverTitle = [
    'shareRegisterTableViewDetail',
    'shareRegisterTableViewMemberProfile',
  ];

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        Header: t['shareRegisterDate'],
        width: '20%',
        accessor: 'node.transactionDate',
        Cell: ({ value, row }) => {
          return <span>{format(new Date(value), 'yyyy-mm-dd')}</span>;
        },
      },

      {
        Header: t['shareRegisterType'],
        accessor: 'node.transactionDirection',
      },
      {
        Header: t['shareRegisterTableMemberID'],
        accessor: 'node.id',
        maxWidth: 4,
        Cell: ({ value }) => {
          return <span>{value.slice(0, 5).toUpperCase()}</span>;
        },
      },

      {
        Header: t['shareRegisterTableName'],
        accessor: 'node.member.name.local',
        width: '80%',

        Cell: ({ value, row }) => {
          return (
            <Flex alignItems="center" gap="2">
              <Avatar
                name="Dan Abrahmov"
                size="sm"
                src="https://bit.ly/dan-abramov"
              />
              <span>{value}</span>
            </Flex>
          );
        },
      },

      {
        Header: t['shareRegisterTableNameToFrom'],
        accessor: 'node.shareStartNumber',
        width: '20%',
        Cell: ({ value, row }) => {
          return (
            <span>
              {value} - {row?.original?.node?.shareEndNumber}
            </span>
          );
        },
      },

      {
        id: 'share-dr',
        Header: t['shareRegisterTableNameShareDr'],
        accessor: 'node.shareDr',
        isNumeric: true,

        Cell: ({ value, row }) => {
          return (
            <span>{value ? `${value.toLocaleString('en-IN')}` : '-'}</span>
          );
        },
      },
      {
        id: 'share-cr',
        Header: t['shareRegisterTableNameShareCr'],
        isNumeric: true,
        accessor: 'node.shareCr',
        Cell: ({ value, row }) => {
          return (
            <span>{value ? `${value.toLocaleString('en-IN')}` : '-'}</span>
          );
        },
      },
      {
        Header: t['shareRegisterTableNameBalance'],
        accessor: 'node.balance',
        isNumeric: true,
        Cell: ({ value, row }) => {
          return <span>{Number(value).toLocaleString('en-IN')}</span>;
        },
      },
      {
        accessor: 'actions',
        Cell: () => <PopoverComponent title={popoverTitle} />,
      },
    ],
    [router.locale]
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
      <TableListPageHeader
        heading={'shareRegisterTable'}
        tabItems={shareRows}
      />

      <Table
        isLoading={isFetching}
        data={rowData ?? []}
        columns={columns}
        sort={true}
      />
    </>
  );
};
