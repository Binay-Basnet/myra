import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { AccountingPageHeader } from '@coop/accounting/ui-components';
import { ObjState, useGetMemberListQuery } from '@coop/cbs/data-access';
import { PopoverComponent } from '@coop/myra/components';
import { Column, Table } from '@coop/shared/table';
import { Box, DEFAULT_PAGE_SIZE, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export function AccountingFeatureBankAccountsList() {
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
        header: t['bankAccountsCode'],
        accessorFn: (row) => row?.node?.id,
      },
      {
        accessorFn: (row) => row?.node?.name?.local,
        header: t['bankAccountsBankName'],
        cell: (props) => {
          return (
            <Box
              display="flex"
              alignItems="center"
              cursor={'pointer'}
              gap="s12"
              onClick={() => {
                router.push(
                  '/accounting/accounting/bank-accounts/12123/overview'
                );
              }}
            >
              <Text
                fontSize="s3"
                textTransform="capitalize"
                textOverflow="ellipsis"
                overflow="hidden"
              >
                {props.getValue()}
              </Text>
            </Box>
          );
        },

        meta: {
          width: '60%',
        },
      },
      {
        header: t['bankAccountsBookBalance'],
        accessorFn: (row) => row?.node?.code,
        meta: {
          width: '30%',
        },
      },
      {
        header: t['bankAccountsBankBalance'],
        accessorFn: (row) => row?.node?.contact,
        meta: {
          width: '30%',
        },
      },
      {
        header: t['bankAccountsDifference'],
        accessorFn: (row) => row?.node?.contact,
        meta: {
          width: '30%',
        },
      },
      {
        id: '_actions',
        header: '',
        accessorKey: 'actions',
        cell: (cell) => (
          <PopoverComponent
            items={[
              {
                title: 'memberListTableViewMemberProfile',
              },
              {
                title: 'memberListTableEditMember',
                onClick: (member) =>
                  router.push(`/members/individual/edit/${member?.id}`),
              },
              {
                title: 'memberListTableMakeInactive',
              },
            ]}
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
    <>
      <AccountingPageHeader
        heading={t['accountingBankAccountsListBankAccounts']}
        buttonLabel={t['accountingBankAccountsListNewBankAccounts']}
        buttonHandler={() =>
          router.push('/accounting/accounting/bank-accounts/add')
        }
      />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.id)}
        isLoading={isFetching}
        columns={columns}
        pagination={{
          total: data?.members?.list?.totalCount ?? 'Many',
          endCursor: data?.members?.list.pageInfo?.endCursor ?? '',
          startCursor: data?.members?.list.pageInfo?.startCursor ?? '',
        }}
      />
    </>
  );
}

export default AccountingFeatureBankAccountsList;
