import React from 'react';

import { Column, Table } from '@coop/shared/table';
import { DetailsCard } from '@coop/shared/ui';
import { amountConverter } from '@coop/shared/utils';

interface IProductLimits {
  limits: {
    name: string;
    minAmount: number;
    maxAmount: number;
  }[];
}

export const ProductLimits = ({ limits }: IProductLimits) => {
  const columns = React.useMemo<Column<typeof limits[0]>[]>(
    () => [
      {
        header: 'Limits',
        accessorKey: 'name',
        meta: {
          width: '33%',
        },
      },
      {
        header: 'Minimum Amount',
        accessorKey: 'minAmount',
        meta: {
          isNumeric: true,
          width: '33%',
        },
        cell: (props) => (props.getValue() ? amountConverter(props.getValue() as string) : 'N/A'),
      },
      {
        header: 'Maximum Amount',
        accessorKey: 'maxAmount',
        meta: {
          isNumeric: true,
          width: '33%',
        },
        cell: (props) => (props.getValue() ? amountConverter(props.getValue() as string) : 'N/A'),
      },
    ],
    []
  );

  return (
    <DetailsCard title="Limits" hideBorder hasTable>
      <Table variant="report" size="report" isStatic data={limits} columns={columns} />
    </DetailsCard>
  );
};
