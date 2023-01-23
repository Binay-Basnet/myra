import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Column, DetailsCard, Table } from '@myra-ui';

import { useListAssociatedGuaranteeAccountsQuery } from '@coop/cbs/data-access';
import { RedirectButton, ROUTES } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

export const AssociatedGuaranteeAccounts = () => {
  const router = useRouter();

  const { id } = router.query;

  const { data: guaranteeAccountListQueryData, isFetching } =
    useListAssociatedGuaranteeAccountsQuery({ accountId: id as string }, { enabled: !!id });

  const { guaranteeAccountList, total } = useMemo(
    () => ({
      guaranteeAccountList:
        guaranteeAccountListQueryData?.account?.listAssociatedGuaranteeAccounts?.data?.map(
          (account, index) => ({ index: index + 1, ...account })
        ) ?? [],
      total: guaranteeAccountListQueryData?.account?.listAssociatedGuaranteeAccounts?.total,
    }),
    [guaranteeAccountListQueryData]
  );

  const columns = useMemo<Column<typeof guaranteeAccountList[0]>[]>(
    () => [
      {
        header: 'SN',
        accessorKey: 'index',
        footer: 'Total',
      },
      {
        header: 'Member Name',
        accessorKey: 'memberName',
        cell: (props) => (
          <RedirectButton
            link={`${ROUTES.CBS_MEMBER_DETAILS}?id=${props?.row?.original?.memberId}`}
            label={props.getValue() as string}
          />
        ),
      },
      {
        header: 'Account Name',
        accessorKey: 'accountName',
        cell: (props) => (
          <RedirectButton
            link={`${ROUTES.CBS_LOAN_ACCOUNT_DETAILS}?id=${props?.row?.original?.loanAccountId}`}
            label={props.getValue() as string}
          />
        ),
      },
      {
        header: 'Amount',
        accessorFn: (row) => amountConverter(row?.amount ?? 0),
        footer: amountConverter(total ?? 0) as string,
      },
    ],
    [total]
  );

  return guaranteeAccountList?.length ? (
    <DetailsCard title="Associated Guarantee Accounts" bg="white" hasTable>
      <Table
        isDetailPageTable
        isStatic
        data={guaranteeAccountList}
        columns={columns}
        showFooter
        isLoading={isFetching}
      />
    </DetailsCard>
  ) : null;
};
