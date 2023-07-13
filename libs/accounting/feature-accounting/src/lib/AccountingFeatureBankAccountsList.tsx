import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';

import { TablePopover } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { AccountingPageHeader } from '@coop/accounting/ui-components';
import {
  useGetBankAccountListQuery,
  useGetBankListQuery,
  useGetMemberFilterMappingQuery,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import {
  debitCreditConverter,
  getFilterQuery,
  getPaginationQuery,
  useTranslation,
} from '@coop/shared/utils';

export const AccountingFeatureBankAccountsList = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const { data: bankListData } = useGetBankListQuery();
  const { data: filterMapping } = useGetMemberFilterMappingQuery();

  const { data, isLoading, refetch } = useGetBankAccountListQuery({
    pagination: getPaginationQuery(),
    filter: getFilterQuery(),
  });

  const rowData = useMemo(() => data?.accounting?.bankAccounts?.list?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: t['bankAccountsAccountNo'],
        accessorFn: (row) => row?.node?.accountNo,
      },
      {
        accessorFn: (row) => row?.node?.displayName,
        header: 'Account Name',
        meta: {
          width: '15%',
        },
      },
      {
        id: 'bankId',
        accessorFn: (row) => row?.node?.bankName,
        header: t['bankAccountsBankName'],
        enableColumnFilter: true,

        meta: {
          width: '25%',
          filterMaps: {
            list: bankListData?.bank?.bank?.list?.map((b) => ({ label: b?.name, value: b?.id })),
          },
        },
      },
      {
        id: 'branchId',
        accessorFn: (row) => row?.node?.branchName,
        header: 'Service Center',
        enableColumnFilter: true,
        meta: {
          filterMaps: {
            list: filterMapping?.members?.filterMapping?.serviceCenter || [],
          },
        },
      },

      {
        id: 'balance',
        header: t['bankAccountsBankBalance'],
        meta: {
          isNumeric: true,
        },
        enableColumnFilter: true,
        filterFn: 'amount',
        accessorFn: (row) =>
          debitCreditConverter(row?.node?.balance as string, row?.node?.balanceType as string),
      },
      {
        id: '_actions',
        header: '',
        cell: (props) =>
          props?.row?.original && (
            <TablePopover
              node={props?.row?.original}
              items={[
                {
                  title: 'Edit',
                  onClick: () =>
                    router.push(
                      `${ROUTES.ACCOUNTING_BANK_ACCOUNTS_EDIT}?id=${props?.row?.original?.node?.id}`
                    ),
                },
              ]}
            />
          ),
      },
    ],
    [t, filterMapping, bankListData]
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <AccountingPageHeader
        heading={t['accountingBankAccountsListBankAccounts']}
        buttonLabel={t['accountingBankAccountsListNewBankAccounts']}
        buttonHandler={() => router.push(`${ROUTES.ACCOUNTING_BANK_ACCOUNTS_ADD}`)}
      />

      <Table
        data={rowData}
        // getRowId={(row) => String(row?.node?.id)}
        isLoading={isLoading}
        columns={columns}
        pagination={{
          total: data?.accounting?.bankAccounts?.list?.totalCount ?? 'Many',
          pageInfo: data?.accounting?.bankAccounts?.list?.pageInfo,
        }}
      />
    </>
  );
};

export default AccountingFeatureBankAccountsList;
