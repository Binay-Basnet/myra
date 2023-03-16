import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Avatar, Box, PageHeader, TablePopover, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useGetClientsListQuery } from '@coop/neosys-admin/data-access';
import { getUrl, useTranslation } from '@coop/shared/utils';

export const CLIENTS_TAB_ITEMS = [
  {
    title: 'neoClientTableActive',
    key: 'APPROVED',
  },

  {
    title: 'neoClientTableDraft',
    key: 'DRAFT',
  },
  {
    title: 'neoClientTableInactive',
    key: 'VALIDATED',
  },
];

export const ClientsListPage = () => {
  const { t } = useTranslation();
  // const queryClient = useQueryClient();
  // const { mutateAsync } = useCreateDbMutation();
  const router = useRouter();

  // const router = useRouter();
  const { data, isFetching } = useGetClientsListQuery();
  // {
  //   pagination: getPaginationQuery(),
  //   filter: {
  //     objState: (router.query['objState'] ?? ObjState.Approved) as ObjState,
  //   },
  // }

  const rowData = useMemo(() => data?.neosys?.client?.list ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        id: 'name',
        accessorFn: (row) => row?.clientName,
        header: 'Client Name',
        // enableSorting: true,
        cell: (props) => (
          <Box display="flex" alignItems="center" gap="s12">
            <Avatar name={props.getValue() as string} size="sm" src={undefined} />
            <Text
              fontSize="s3"
              textTransform="capitalize"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              {props.getValue() as string}
            </Text>
          </Box>
        ),

        meta: {
          width: '500px',
        },
      },
      {
        header: t['memberListTableAddress'],
        accessorFn: (row) =>
          `${row?.provinceId}, ${row?.districtId ?? ''}, ${row?.houseNo ?? ''}, ${
            row?.localGovernmentId
          },`,
        meta: {
          width: '300px',
        },
      },

      {
        header: t['memberListDateJoined'],
        accessorFn: (row) => row?.dateJoined?.split(' ')[0] ?? 'N/A',
      },
      {
        id: '_actions',
        header: '',
        accessorKey: 'actions',
        cell: (cell) =>
          cell.row.original ? (
            <TablePopover
              node={cell.row.original}
              items={[
                // {
                //   title: 'Create Database',
                //   onClick: async (node) => {
                //     if (node.dbCreated) {
                //       toast({
                //         id: 'create-db',
                //         type: 'error',
                //         message: 'Database has already been created!!',
                //       });
                //     } else {
                //       await asyncToast({
                //         id: 'create-db',
                //         msgs: {
                //           success: 'Db Created Successfully',
                //           loading: 'Creating New DB for this Saccos',
                //         },
                //         onSuccess: () => queryClient.invalidateQueries(['getClientsList']),
                //         promise: mutateAsync({ saccosID: node.id as string }),
                //       });
                //     }
                //   },
                // },
                {
                  title: 'View Details',
                  onClick: async (node) => {
                    router.push(`clients/view?id=${node?.id}`);
                  },
                },
              ]}
            />
          ) : null,
        meta: {
          width: 's60',
        },
      },
    ],
    [t]
  );

  return (
    <>
      <PageHeader heading={t['neoClientTableList']} tabItems={CLIENTS_TAB_ITEMS} />

      <Table
        data={rowData}
        searchPlaceholder={t['neoClientTableSearch']}
        getRowId={(row) => String(row?.id)}
        isLoading={isFetching}
        columns={columns}
        noDataTitle={t['member']}
        rowOnClick={(row) => {
          router.push(`/${getUrl(router.pathname, 1)}/view?id=${row?.id}`);
        }}
        // pagination={{
        //   total: data?.members?.list?.totalCount ?? 'Many',
        //   pageInfo: data?.members?.list?.pageInfo,
        // }}
      />
    </>
  );
};

export default ClientsListPage;
