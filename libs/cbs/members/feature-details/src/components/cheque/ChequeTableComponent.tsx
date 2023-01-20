import React from 'react';

import { Column, Table } from '@myra-ui/table';

import { RedirectButton, ROUTES } from '@coop/cbs/utils';

interface ILoanPaymentScheduleTableProps {
  data:
    | {
        sn: number;
        id: string | null | undefined;
        accounttName: string | null | undefined;
        used: number | null | undefined;
        left: number | null | undefined;
      }[];

  //   data: MemberPaymentView[] | null | undefined;
}

export const ReportTableComponent = ({ data }: ILoanPaymentScheduleTableProps) => {
  const columns = React.useMemo<Column<typeof data[0]>[]>(
    () => [
      {
        header: 'S.N.',
        accessorKey: 'sn',
      },
      {
        header: 'Account Name',
        accessorKey: 'accounttName',
        cell: (props) => (
          <RedirectButton
            label={props?.row?.original?.accounttName}
            link={`${ROUTES.CBS_ACCOUNT_SAVING_DETAILS}?id=${props?.row?.original?.id}`}
          />
        ),
        meta: {
          width: '40%',
        },
      },
      {
        header: 'No- of leaves used',
        accessorKey: 'used',
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'No- of leaves left',
        accessorKey: 'left',
        meta: {
          isNumeric: true,
        },
      },
    ],
    []
  );

  return <Table<typeof data[0]> isDetailPageTable isStatic data={data ?? []} columns={columns} />;
};
