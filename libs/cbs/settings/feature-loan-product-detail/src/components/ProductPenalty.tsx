import React from 'react';

import { Column, DetailsCard, Table } from '@myra-ui';

import { LoanPenalty, Maybe } from '@coop/cbs/data-access';

interface IProductPenalty {
  penaltyData: Maybe<LoanPenalty> | undefined;
}

export const ProductPenalty = ({ penaltyData }: IProductPenalty) => {
  const penaltyDataArray = [penaltyData ?? {}];

  const columns = React.useMemo<Column<typeof penaltyDataArray[0]>[]>(
    () => [
      {
        header: 'Penalty On',
        accessorKey: 'penaltyType',
        meta: {
          width: '33%',
        },
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
      },
      {
        header: 'Day after Installment Date',
        accessorKey: 'penaltyDayAfterInstallmentDate',
        cell: (props) => (props.getValue() ? `${props.getValue()}` : 'N/A'),
      },
      {
        header: 'Penalty',
        accessorKey: 'penaltyRate',
        cell: (props) => (props.getValue() ? `${props.getValue()}  %` : 'N/A'),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Penalty Amount',
        accessorKey: 'penaltyAmount',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
      },
    ],
    []
  );
  if (penaltyDataArray?.length === 0) return null;

  return (
    <DetailsCard title="Penalty" hasTable>
      <Table isDetailPageTable isStatic data={penaltyDataArray} columns={columns} />
    </DetailsCard>
  );
};
