import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Button, DetailsCard, Tooltip } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { localizedDate, ROUTES } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

import { useSTRDetails } from '../../hooks/useSTRDetails';

export const WithdrawList = () => {
  const router = useRouter();

  const { withdrawList } = useSTRDetails();

  const withdrawListWithIndex = useMemo(
    () => withdrawList?.map((withdraw, index) => ({ index: String(index + 1), ...withdraw })) ?? [],
    [withdrawList]
  );

  const columns = useMemo<Column<typeof withdrawListWithIndex[0]>[]>(
    () => [
      {
        header: 'SN',
        accessorKey: 'index',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
      },
      {
        header: 'Date',
        accessorFn: (row) => localizedDate(row?.date),
      },
      {
        header: 'Transaction Code',
        accessorKey: 'transactionCode',
        cell: (props) => (
          <Button
            variant="link"
            onClick={() =>
              router.push(`${ROUTES.CBS_TRANS_WITHDRAW_DETAILS}?id=${props?.row?.original?.id}`)
            }
          >
            {props?.getValue() as string}
          </Button>
        ),
      },
      {
        header: 'Payee',
        accessorKey: 'depositer',
      },
      {
        header: ' Amount',
        accessorFn: (row) => amountConverter(row?.amount ?? 0),
        meta: { isNumeric: true },
      },
      {
        header: 'Remarks',
        cell: (props) => <Tooltip title={props?.row?.original?.remarks ?? ''} />,
        meta: {
          width: '20%',
        },
      },
    ],
    []
  );

  return (
    <DetailsCard title="Details of Top 10 Withdraws (Last One Year)" hasTable>
      <Table isDetailPageTable isStatic data={withdrawListWithIndex} columns={columns} showFooter />
    </DetailsCard>
  );
};
