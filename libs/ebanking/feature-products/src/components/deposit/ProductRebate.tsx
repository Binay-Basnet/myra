import React from 'react';

import { Maybe, Rebate } from '@coop/ebanking/data-access';
import { Column, Table } from '@coop/shared/table';
import { DetailsCard } from '@myra-ui';

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
        header: 'No. of Installment',
        accessorKey: 'noOfInstallment',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
        meta: {
          width: '25%',
        },
      },
      {
        header: 'Rebate Amount',
        accessorKey: 'noOfInstallment',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
        meta: {
          width: '25%',
          isNumeric: true,
        },
      },
      {
        header: 'Deposit Amount',
        accessorKey: 'rebateRate',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
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
      <Table variant="report" size="report" isStatic data={rebateDataArray} columns={columns} />
    </DetailsCard>
  );
};
