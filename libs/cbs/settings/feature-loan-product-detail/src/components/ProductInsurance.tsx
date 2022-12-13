import { useMemo } from 'react';

import { Column, Table } from '@myra-ui';

import { Insurance, Maybe } from '@coop/cbs/data-access';
import { amountConverter } from '@coop/shared/utils';

export interface IProductInsurance {
  insurance?: Maybe<Insurance> | undefined;
}

export const ProductInsurance = ({ insurance }: IProductInsurance) => {
  const insuranceArray = [insurance ?? {}];
  const columns = useMemo<Column<typeof insuranceArray[0]>[]>(
    () => [
      {
        header: 'Insurance Type',
        accessorKey: 'type',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
        meta: {
          width: '33%',
        },
      },
      {
        header: 'Insurance Rate',
        accessorKey: 'rate',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
        meta: {
          width: '33%',
        },
      },
      {
        header: 'Insurance Amount',
        accessorKey: 'amount',
        cell: (props) => amountConverter(props.getValue() ? (props.getValue() as string) : 'N/A'),
        meta: {
          isNumeric: true,
          width: '33%',
        },
      },
    ],
    []
  );

  if (insuranceArray?.length === 0) return null;

  return <Table isStatic data={insuranceArray ?? []} columns={columns} />;
};
