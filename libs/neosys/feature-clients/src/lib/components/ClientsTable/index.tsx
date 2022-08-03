import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { Avatar, Flex } from '@chakra-ui/react';
import format from 'date-fns/format';

import { ObjState, useGetMemberListQuery } from '@coop/cbs/data-access';
import { PopoverComponent } from '@coop/myra/components';
import { NeosysTableListPageHeader } from '@coop/neosys-admin/ui-components';
import { Column, DEFAULT_PAGE_SIZE, Table } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const ClientsTable = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { data, isFetching } = useGetMemberListQuery(
    router.query['before']
      ? {
          objState: (router.query['objState'] ?? ObjState.Approved) as ObjState,
          pagination: {
            last: Number(router.query['last'] ?? DEFAULT_PAGE_SIZE),
            before: router.query['before'] as string,
          },
        }
      : {
          objState: (router.query['objState'] ?? ObjState.Approved) as ObjState,
          pagination: {
            first: Number(router.query['first'] ?? DEFAULT_PAGE_SIZE),
            after: (router.query['after'] ?? '') as string,
          },
        },
    {
      staleTime: 0,
    }
  );

  const rowData = useMemo(() => data?.members?.list?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        Header: t['memberListTableName'],
        accessor: 'node.name.local',

        width: '60%',

        disableSortBy: false,
        disableFilters: false,

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
        Header: t['memberListTableAddress'],
        accessor: 'node.address.locality.local',
        width: '20%',

        Cell: ({ value, row }) => {
          return (
            <span>
              {value}, {row?.original?.node?.address?.locality?.local}
            </span>
          );
        },
      },
      {
        Header: t['memberListDateJoined'],
        accessor: 'node.createdAt',
        disableSortBy: false,
        disableFilters: false,

        Cell: ({ value }) => {
          return <span>{format(new Date(value), 'yyyy-mm-dd')}</span>;
        },
      },
      {
        Header: '',
        accessor: 'actions',
        Cell: (cell) => (
          <PopoverComponent
            items={[
              {
                title: 'neoClientTableViewClientProfile',
                onClick: (client) => router.push(`/clients/${client?.id}`),
              },
              {
                title: 'neoClientTableEditClient',
              },
              {
                title: 'neoClientTableMakeInactive',
              },
            ]}
            member={cell?.row?.original?.node}
          />
        ),
        disableFilters: true,
      },
    ],
    []
  );

  const memberRows = useMemo(
    () => [
      {
        title: 'neoClientTableActive',
        key: 'APPROVED',
      },
      {
        title: 'neoClientTableDraft',
        key: 'VALIDATED',
      },
      {
        title: 'neoClientTableInactive',
        key: 'DRAFT',
      },
    ],
    []
  );

  return (
    <>
      <NeosysTableListPageHeader
        heading={t['neoClientTableList']}
        tabItems={memberRows}
      />

      <Table
        isLoading={isFetching}
        data={rowData}
        columns={columns}
        sort={true}
        disableSortAll={true}
        filter={true}
        disableFilterAll={true}
        searchPlaceholder={t['neoClientTableSearch']}
        pagination={{
          total: 1200,
          endCursor: data?.members?.list.pageInfo?.startCursor ?? '',
          startCursor: data?.members?.list.pageInfo?.endCursor ?? '',
        }}
      />
    </>
  );
};
