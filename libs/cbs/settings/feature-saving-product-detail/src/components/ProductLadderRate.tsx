import React from 'react';

import { Column, Table } from '@myra-ui';

interface IProductLadderRate {
  ladderRate:
    | ({
        type: string;
        amount: string;
        rate: number;
      } | null)[]
    | null
    | undefined;
}

export const ProductLadderRate = ({ ladderRate }: IProductLadderRate) => {
  const ladderRateListWithIndex =
    ladderRate?.map((ladder, index) => ({
      index: index + 1,
      ...ladder,
    })) ?? [];

  const columns = React.useMemo<Column<typeof ladderRateListWithIndex[0]>[]>(
    () => [
      {
        header: 'SN',
        accessorKey: 'index',
      },
      {
        header: 'Type',
        accessorKey: 'type',
        cell: (props) => (props.getValue() ? `${props.getValue()}` : 'N/A'),
      },
      {
        header: 'Ladder Amount',
        accessorKey: 'amount',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
      },
      {
        header: 'Ladder Rate',
        accessorKey: 'rate',
        cell: (props) => (props.getValue() ? `${props.getValue()}` : 'N/A'),
        meta: {
          isNumeric: true,
        },
      },
    ],
    []
  );

  return <Table isDetailPageTable isStatic data={ladderRateListWithIndex} columns={columns} />;
};
