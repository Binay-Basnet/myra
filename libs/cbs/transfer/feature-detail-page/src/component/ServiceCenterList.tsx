import { useMemo } from 'react';

import { Column, DetailsCard, Table } from '@myra-ui';

import { CashTransferBranchView } from '@coop/cbs/data-access';
import { amountConverter } from '@coop/shared/utils';

type ServiceCenterListProps = {
  data: [CashTransferBranchView] | null | undefined;
  totalCr: string | null | undefined;
  totalDr: string | null | undefined;
};

export const ServiceCenterList = ({ data, totalCr, totalDr }: ServiceCenterListProps) => {
  const rowData = useMemo(() => data ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Service Center',
        footer: 'Total',
        cell: (props) => props?.row?.original?.branchName,
        meta: {
          width: '100%',
        },
      },
      {
        header: 'Debit',
        footer: amountConverter(Number(totalDr)),
        accessorFn: (row) => amountConverter(row?.dr ?? 0),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Credit',
        footer: amountConverter(Number(totalCr)),
        accessorFn: (row) => amountConverter(row?.cr ?? 0),
        meta: {
          isNumeric: true,
        },
      },
    ],
    []
  );

  if (rowData?.length === 0) return null;
  return (
    <DetailsCard title="Service Center" subTitle="Destination Service Center" hasTable>
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
