import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';

import { TablePopover } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { AccountingPageHeader } from '@coop/accounting/ui-components';
import { useGetBankAccountListQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { debitCreditConverter, getPaginationQuery, useTranslation } from '@coop/shared/utils';

export const AccountingFeatureBankAccountsList = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const { data, isLoading, refetch } = useGetBankAccountListQuery({
    pagination: getPaginationQuery(),
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
        accessorFn: (row) => row?.node?.bankName,
        header: t['bankAccountsBankName'],
        meta: {
          width: '25%',
        },
      },
      {
        accessorFn: (row) => row?.node?.branchName,
        header: 'Service Center',
      },

      {
        header: t['bankAccountsBankBalance'],
        meta: {
          isNumeric: true,
        },
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
    [t]
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
