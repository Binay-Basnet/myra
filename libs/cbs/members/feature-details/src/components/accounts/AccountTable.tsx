import React from 'react';

import { Box, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { NatureOfDepositProduct } from '@coop/cbs/data-access';
import { RedirectButton, ROUTES } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

interface ILoanPaymentScheduleTableProps {
  data:
    | {
        sn: number;
        accountType: string | null | undefined;
        accountName: string | null | undefined;
        totalBalance?: string | number | null | undefined;
        interestRate: string | number | null | undefined;
        accountNumber?: string | null | undefined;
      }[];

  //   data: MemberPaymentView[] | null | undefined;
}

const accountTypes = {
  [NatureOfDepositProduct.Saving]: 'Saving Account',
  [NatureOfDepositProduct.RecurringSaving]: 'Recurring Saving Account',
  [NatureOfDepositProduct.TermSavingOrFd]: 'Term Saving Account',
  [NatureOfDepositProduct.Current]: 'Current Account',
};

export const AccountTable = ({ data }: ILoanPaymentScheduleTableProps) => {
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
        cell: (props) => (
          <RedirectButton
            label={props?.row?.original?.accountName as string}
            link={`${ROUTES.CBS_ACCOUNT_SAVING_DETAILS}?id=${props?.row?.original?.accountNumber}`}
          />
        ),
      },
      {
        header: 'Balance',
        accessorKey: 'totalBalance',
        meta: {
          isNumeric: true,
        },
        accessorFn: (row) => (row?.totalBalance ? amountConverter(row?.totalBalance ?? 0) : null),
      },
      {
        header: 'Interest',
        accessorKey: 'interestRate',
        cell: (props) => (
          <Box>
            {props.getValue() !== '-' && (
              <Text
                fontSize="s3"
                textTransform="capitalize"
                textOverflow="ellipsis"
                overflow="hidden"
              >
                {props.getValue() as string} %
              </Text>
            )}
            {props.getValue() === '-' && (
              <Text
                fontSize="s3"
                textTransform="capitalize"
                textOverflow="ellipsis"
                overflow="hidden"
              >
                {props.getValue() as string}
              </Text>
            )}
          </Box>
        ),
        meta: {
          isNumeric: true,
        },
      },
    ],
    []
  );

  return <Table<typeof data[0]> isStatic data={data ?? []} columns={columns} />;
};
