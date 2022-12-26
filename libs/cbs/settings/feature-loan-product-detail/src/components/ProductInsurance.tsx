import { useMemo } from 'react';

import { Column, Table } from '@myra-ui';

import { Insurance, Maybe } from '@coop/cbs/data-access';
import { amountConverter } from '@coop/shared/utils';

export interface IProductInsurance {
  insurance?: Maybe<Insurance> | undefined;
}

export const ProductInsurance = ({ insurance }: IProductInsurance) => {
  const insuranceArray = [insurance];

  const insuranceListWithIndex =
    insuranceArray?.map((ins, index) => ({
      index: index + 1,
      ...ins,
    })) ?? [];

  const columns = useMemo<Column<typeof insuranceListWithIndex[0]>[]>(
    () => [
      {
        header: 'SN',
        accessorKey: 'index',
      },
      {
        header: 'Insurance Type',
        accessorKey: 'type',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
        meta: {
          width: '80%',
        },
      },
      {
        header: 'Rate',
        accessorKey: 'rate',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
      },
      {
        header: 'Amount',
        accessorKey: 'amount',
        cell: (props) => amountConverter(props.getValue() ? (props.getValue() as string) : 'N/A'),
        meta: {
          isNumeric: true,
        },
      },
    ],
    []
  );

  return <Table isDetailPageTable isStatic data={insuranceListWithIndex ?? []} columns={columns} />;
};
