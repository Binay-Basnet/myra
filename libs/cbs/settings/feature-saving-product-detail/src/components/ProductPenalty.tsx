import React from 'react';

import { Column, DetailsCard, Table } from '@myra-ui';

import { Maybe, Penalty } from '@coop/ebanking/data-access';

interface IProductPenalty {
  penaltyData: Maybe<Penalty> | undefined;
}

export const ProductPenalty = ({ penaltyData }: IProductPenalty) => {
  const penaltyDataArray = [penaltyData ?? {}];

  const columns = React.useMemo<Column<typeof penaltyDataArray[0]>[]>(
    () => [
      {
        header: 'Day from End Date',
        accessorKey: 'dayAfterInstallmentDate',
        meta: {
          width: '75%',
        },
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
      },
      {
        header: 'Penalty',
        accessorKey: 'penaltyRate',
        cell: (props) => (props.getValue() ? `${props.getValue()}  %` : 'N/A'),
      },
      {
        header: 'Penalty Amount',
        accessorKey: 'penaltyAmount',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
      },
      {
        header: 'Penalty Ledger Mapping',
        accessorKey: 'penaltyLedgerMapping',
        cell: (props) => (props.getValue() ? `${props.getValue()}` : 'N/A'),
        meta: {
          isNumeric: true,
        },
      },
    ],
    []
  );

  return (
    <DetailsCard title="Penalty" hasTable>
      <Table isDetailPageTable isStatic data={penaltyDataArray} columns={columns} />
    </DetailsCard>
  );
};
