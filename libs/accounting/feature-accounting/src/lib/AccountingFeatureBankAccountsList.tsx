import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';

import { AccountingPageHeader } from '@coop/accounting/ui-components';
import { useGetBankAccountListQuery } from '@coop/cbs/data-access';
import { Column, Table } from '@coop/shared/table';
import { TablePopover } from '@myra-ui';
import { getRouterQuery, useTranslation } from '@coop/shared/utils';

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
        header: t['bankAccountsCode'],
        accessorFn: (row) => row?.node?.id,
      },
      {
        accessorFn: (row) => row?.node?.bankName,
        header: t['bankAccountsBankName'],
        meta: {
          width: '60%',
        },
      },
      {
        header: t['bankAccountsAccountNo'],
        accessorFn: (row) => row?.node?.accountNo,
        meta: {
          width: '30%',
        },
      },
      {
        header: t['bankAccountsBankBalance'],
        accessorFn: (row) => row?.node?.balance,
        meta: {
          width: '30%',
        },
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
                  title: t['transDetailViewDetail'],
                },
              ]}
            />
          ),
        meta: {
          width: '50px',
        },
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
        buttonHandler={() => router.push('/accounting/accounting/bank-accounts/add')}
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
