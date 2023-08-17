import React from 'react';
import { useRouter } from 'next/router';

import { Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { ObjState } from '@coop/cbs/data-access';
import { RedirectButton, ROUTES } from '@coop/cbs/utils';

interface ILoanPaymentScheduleTableProps {
  data:
    | {
        sn: number;

        accountID: string | null | undefined;
        accountName: string | null | undefined;
        status: ObjState | null | undefined;
      }[];

  //   data: MemberPaymentView[] | null | undefined;
}

export const AccountDetailsTable = ({ data }: ILoanPaymentScheduleTableProps) => {
  const router = useRouter();
  const columns = React.useMemo<Column<typeof data[0]>[]>(
    () => [
      {
        header: 'S.N.',
        accessorKey: 'sn',
        meta: {
          width: '20px',
        },
      },
      {
        header: 'Account Name',
        accessorKey: 'accountName',
        meta: { width: '70%' },
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: (props) => {
          if (props?.row?.original?.status === 'SUBMITTED') {
            return (
              <RedirectButton
                link={`${ROUTES.BPM_OPERATIONS_AUTO_OPEN_ACCOUNT_UPDATES_EDIT}?id=${props?.row?.original?.accountID}&redirect=${router.asPath}`}
                label="Update Details"
              />
            );
          }
          return (
            <Text fontWeight="600" fontSize="r1">
              Completed
            </Text>
          );
        },
      },
    ],
    []
  );

  return (
    <Table<typeof data[0]>
      variant="report"
      size="report"
      isStatic
      data={data ?? []}
      columns={columns}
    />
  );
};
