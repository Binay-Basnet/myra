import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Button, DetailsCard } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { NatureOfDepositProduct } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

import { useSTRDetails } from '../../hooks/useSTRDetails';

const accountTypes = {
  [NatureOfDepositProduct.Saving]: 'Saving Account',
  [NatureOfDepositProduct.RecurringSaving]: 'Recurring Saving Account',
  [NatureOfDepositProduct.TermSavingOrFd]: 'Term Saving Account',
  [NatureOfDepositProduct.Current]: 'Current Account',
};

export const SavingAccounts = () => {
  const router = useRouter();

  const { savingAccounts } = useSTRDetails();

  const { savingAccountsList, totalBalance } = useMemo(
    () => ({
      savingAccountsList:
        savingAccounts?.map((account, index) => ({
          index: String(index + 1),
          ...account,
        })) ?? [],
      totalBalance: savingAccounts?.reduce((sum, curr) => sum + Number(curr?.balance ?? 0), 0),
    }),
    [savingAccounts]
  );

  const columns = useMemo<Column<typeof savingAccountsList[0]>[]>(
    () => [
      {
        header: 'SN',
        accessorKey: 'index',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
        footer: 'Total Amount',
      },
      {
        header: 'Account Number',
        accessorKey: 'id',
        cell: (props) => (
          <Button
            variant="link"
            onClick={() =>
              router.push(`${ROUTES.CBS_ACCOUNT_SAVING_DETAILS}?id=${props?.getValue() as string}`)
            }
          >
            {props?.getValue() as string}
          </Button>
        ),
      },
      {
        header: 'Account Name',
        accessorKey: 'accountName',
        meta: {
          width: '45%',
        },
      },
      {
        header: 'Nature of Product',
        accessorFn: (row) => accountTypes[row?.product?.nature as NatureOfDepositProduct],
      },

      {
        header: 'Remaining Balance',
        accessorFn: (row) => amountConverter(row?.balance ?? 0),
        footer: amountConverter(totalBalance ?? 0) as string,
        meta: { isNumeric: true },
      },
    ],
    [totalBalance]
  );

  return (
    <DetailsCard title="Other Saving Accounts" hasTable>
      <Table isDetailPageTable isStatic data={savingAccountsList} columns={columns} showFooter />
    </DetailsCard>
  );
};
