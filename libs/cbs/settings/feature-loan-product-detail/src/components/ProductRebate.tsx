import React from 'react';

import { Column, DetailsCard, Table } from '@myra-ui';

import { Maybe, Rebate } from '@coop/ebanking/data-access';

interface IProductRebateProps {
  rebateData: Maybe<Rebate> | undefined;
}

export const ProductRebate = ({ rebateData }: IProductRebateProps) => {
  const rebateDataArray = [rebateData ?? {}];

  const columns = React.useMemo<Column<typeof rebateDataArray[0]>[]>(
    () => [
      {
        header: 'Days before installment date',
        accessorKey: 'dayBeforeInstallmentDate',
        meta: {
          width: '25%',
        },
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
      },
      {
        header: 'Rebate Amount',
        accessorKey: 'rebateAmount',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
        meta: {
          width: '25%',
          isNumeric: true,
        },
      },
      {
        header: 'Deposited amount',
        accessorKey: 'rebateRate',
        cell: (props) => (props.getValue() ? `${props.getValue()}  %` : 'N/A'),
        meta: {
          width: '25%',
          isNumeric: true,
        },
      },
    ],
    []
  );

  if (!rebateData || Object.keys(rebateData).length === 0) return null;

  return (
    <DetailsCard title="Rebate" hasTable>
      <Table isStatic data={rebateDataArray} columns={columns} />
    </DetailsCard>
  );
};
