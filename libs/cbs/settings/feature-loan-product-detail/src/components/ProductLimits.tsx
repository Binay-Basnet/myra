import React from 'react';

import { Column, DetailsCard, Table } from '@myra-ui';

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
      },
      {
        header: 'Minimum Amount',
        accessorKey: 'minAmount',
        meta: {
          isNumeric: true,
          width: '75%',
        },
        cell: (props) => (props.getValue() ? amountConverter(props.getValue() as string) : 'N/A'),
      },
      {
        header: 'Maximum Amount',
        accessorKey: 'maxAmount',
        meta: {
          isNumeric: true,
        },
        cell: (props) => (props.getValue() ? amountConverter(props.getValue() as string) : 'N/A'),
      },
    ],
    []
  );

  return (
    <DetailsCard title="Limits" hasTable>
      <Table isDetailPageTable isStatic data={limits} columns={columns} />
    </DetailsCard>
  );
};
