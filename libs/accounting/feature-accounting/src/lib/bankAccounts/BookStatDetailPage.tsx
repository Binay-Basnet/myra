import { useMemo } from 'react';
import { useRouter } from 'next/router';

import {
  Arrange,
  ObjState,
  useGetMemberListQuery,
} from '@coop/cbs/data-access';
import { PopoverComponent } from '@coop/myra/components';
import { Column, Table } from '@coop/shared/table';
import { Box, DEFAULT_PAGE_SIZE, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export function BookStatDetailPage() {
  const { t } = useTranslation();

  const router = useRouter();

  const { data, isFetching } = useGetMemberListQuery(
    router.query['before']
      ? {
          objState: (router.query['objState'] ?? ObjState.Approved) as ObjState,
          first: Number(router.query['last'] ?? DEFAULT_PAGE_SIZE),
          after: router.query['before'] as string,
          column: 'ID',
          arrange: Arrange.Desc,
        }
      : {
          objState: (router.query['objState'] ?? ObjState.Approved) as ObjState,
          first: Number(router.query['first'] ?? DEFAULT_PAGE_SIZE),
          after: (router.query['after'] ?? '') as string,
          column: 'ID',
          arrange: Arrange.Desc,
        },
    {
      staleTime: 0,
    }
  );

  const rowData = useMemo(() => data?.members?.list?.edges ?? [], [data]);

  const popoverTitle = [
    {
      title: 'memberListTableViewMemberProfile',
    },
    {
      title: 'memberListTableEditMember',
    },
    {
      title: 'memberListTableMakeInactive',
    },
  ];

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: t['bankAccountStatementBookDate'],
        accessorFn: (row) => row?.node?.id,
        // meta: {
        //   width: '20%',
        // },
      },
      {
        accessorFn: (row) => row?.node?.name?.local,
        header: t['bankAccountStatementBookTransactionType'],
        meta: {
          width: '50%',
        },
      },
      {
        header: t['bankAccountStatementBookTransactionNo'],
        accessorFn: (row) => row?.node?.code,
        meta: {
          width: '50%',
        },
      },
      {
        header: t['bankAccountStatementBookAmount'],
        accessorFn: (row) => row?.node?.contact,
      },
      {
        id: '_actions',
        header: '',
        accessorKey: 'actions',
        cell: (cell) => (
          <PopoverComponent
            items={popoverTitle}
            member={cell?.row?.original?.node}
          />
        ),
        meta: {
          width: '60px',
        },
      },
    ],
    [t]
  );

  return (
    <Box p="s16">
      <Box
        borderBottom="1px solid"
        borderColor="border.layout"
        bg="gray.0"
        p="s16"
        borderRadius="br2"
      >
        <Text
          fontSize="r1"
          color="neutralColorLight.Gray-80"
          fontWeight="SemiBold"
        >
          {t['bankAccountStatementBookStatement']}
        </Text>
      </Box>
      <Box>
        <Table
          data={rowData}
          getRowId={(row) => String(row?.node?.id)}
          isLoading={isFetching}
          columns={columns}
        />
      </Box>
    </Box>
  );
}

export default BookStatDetailPage;
