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
          width: '50%',
        },
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
      },
      {
        header: 'No. of Installment',
        accessorKey: 'noOfInstallment',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
      },
      {
        header: 'Rebate Amount',
        accessorKey: 'rebateAmount',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: '% of deposited amount',
        accessorKey: 'rebateRate',
        cell: (props) => (props.getValue() ? `${props.getValue()}  %` : 'N/A'),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Rebate Ledger Mapping',
        accessorKey: 'rebateLedgerMapping',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
        meta: {
          width: '25%',
          isNumeric: true,
        },
      },
    ],
    []
  );

  return (
    <DetailsCard title="Rebate" hasTable>
      <Table isDetailPageTable isStatic data={rebateDataArray} columns={columns} />
    </DetailsCard>
  );
};
