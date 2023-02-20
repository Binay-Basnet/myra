import { useMemo } from 'react';

import { Column, DetailsCard, Table } from '@myra-ui';

import { BalanceType } from '@coop/cbs/data-access';
import { amountConverter } from '@coop/shared/utils';

type ServiceCenterListProps = {
  data:
    | ({
        account: string;
        serviceCenter?: string | null | undefined;
        debit?: string | null | undefined;
        credit?: string | null | undefined;
        ledgerId?: string | null | undefined;
        balance?: string | null | undefined;
        balanceType?: BalanceType | null | undefined;
      } | null)[]
    | null
    | undefined;
};

export const ServiceCenterList = ({ data }: ServiceCenterListProps) => {
  const rowData = useMemo(() => data ?? [], [data]);
  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Service Center',
        accessorFn: (row) => row?.serviceCenter,
      },
      {
        header: 'Account',
        accessorFn: (row) => amountConverter(row?.debit ?? 0),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Ledger',
        accessorFn: (row) => amountConverter(row?.credit ?? 0),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Debit',
        accessorFn: (row) => amountConverter(row?.debit ?? 0),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Credit',
        accessorFn: (row) => amountConverter(row?.credit ?? 0),
        meta: {
          isNumeric: true,
        },
      },
    ],
    []
  );

  if (data?.length === 0) return null;
  return (
    <DetailsCard title="Service Center" subTitle="Destination Service Center " hasTable>
      <Table
        isDetailPageTable
        showFooter
        isStatic
        isLoading={false}
        data={rowData ?? []}
        columns={columns}
      />
    </DetailsCard>
  );
};
