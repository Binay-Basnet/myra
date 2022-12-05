import React from 'react';

import { NatureOfDepositProduct } from '@coop/cbs/data-access';
import { Column, Table } from '@myra-ui/table';

interface ILoanPaymentScheduleTableProps {
  data:
    | {
        sn: number;
        accountType: string | null | undefined;
        accountName: string | null | undefined;
        totalBalance?: string | number | null | undefined;
        interestRate: string | number | null | undefined;
      }[];

  //   data: MemberPaymentView[] | null | undefined;
}

const accountTypes = {
  [NatureOfDepositProduct.Saving]: 'Saving Account',
  [NatureOfDepositProduct.RecurringSaving]: 'Recurring Saving Account',
  [NatureOfDepositProduct.TermSavingOrFd]: 'Term Saving Account',
  [NatureOfDepositProduct.Current]: 'Current Account',
};

export const ClosedAccountTable = ({ data }: ILoanPaymentScheduleTableProps) => {
  const columns = React.useMemo<Column<typeof data[0]>[]>(
    () => [
      {
        header: 'S.N.',
        accessorKey: 'sn',
      },
      {
        header: 'Account Type',
        accessorKey: 'accountType',
        accessorFn: (row) => accountTypes[row?.accountType as NatureOfDepositProduct],
      },
      {
        header: 'Account Name',
        accessorKey: 'accountName',
      },

      {
        header: 'Interest',
        accessorKey: 'interestRate',
        meta: {
          isNumeric: true,
        },
      },
    ],
    []
  );

  return <Table<typeof data[0]> size="report" isStatic data={data ?? []} columns={columns} />;
};
