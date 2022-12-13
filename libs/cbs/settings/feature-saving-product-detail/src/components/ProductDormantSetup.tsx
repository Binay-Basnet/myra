import React from 'react';

import { Column, DetailsCard, Table } from '@myra-ui';

import { DormantSetupFormState, Maybe } from '@coop/ebanking/data-access';

interface IProductDormantSetup {
  dormantSetup: Maybe<Maybe<DormantSetupFormState>[]> | undefined;
}

export const ProductDormantSetup = ({ dormantSetup }: IProductDormantSetup) => {
  const dormantSetupWithIndex =
    dormantSetup?.map((dormant, index) => ({
      index: index + 1,
      ...dormant,
    })) ?? [];

  const columns = React.useMemo<Column<typeof dormantSetupWithIndex[0]>[]>(
    () => [
      {
        header: 'S.N.',
        accessorKey: 'index',
        meta: {
          width: '33%',
        },
      },
      {
        header: 'Condition',
        accessorKey: 'condition',
        meta: {
          isNumeric: true,
          width: '33%',
        },
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
      },
      {
        header: 'Dormant Duration',
        accessorKey: 'duration',
        meta: {
          isNumeric: true,
          width: '33%',
        },
        cell: (props) => (props.getValue() ? `${props.getValue()} months` : 'N/A'),
      },
    ],
    []
  );

  if (dormantSetupWithIndex?.length === 0) return null;

  return (
    <DetailsCard title="Dormant Setup" hasTable>
      <Table isStatic data={dormantSetupWithIndex} columns={columns} />
    </DetailsCard>
  );
};
