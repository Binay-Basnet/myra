import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';

import { TablePopover } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { AccountingPageHeader } from '@coop/accounting/ui-components';
import { useGetBankAccountListQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { amountConverter, getRouterQuery, useTranslation } from '@coop/shared/utils';

export const AccountingFeatureBankAccountsList = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const { data, isLoading, refetch } = useGetBankAccountListQuery({
    pagination: getRouterQuery({ type: ['PAGINATION'] }),
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
      },
      {
        accessorFn: (row) => row?.node?.bankName,
        header: t['bankAccountsBankName'],
      },
      {
        accessorFn: (row) => row?.node?.branchName,
        header: 'Service Center',
      },

      {
        header: t['bankAccountsBankBalance'],
        accessorFn: (row) =>
          row?.node?.balance
            ? `${row?.node?.balanceType}. ${amountConverter(row?.node?.balance)}`
            : '0',
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
      />
    </>
  );
};

export default AccountingFeatureBankAccountsList;
