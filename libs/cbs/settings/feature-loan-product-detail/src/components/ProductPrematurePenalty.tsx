import React from 'react';

import { Column, DetailsCard, Table } from '@myra-ui';

import { PrematurePenaltyFormState } from '@coop/cbs/data-access';
import { Maybe } from '@coop/ebanking/data-access';

interface IProductPrematurePenalty {
  penaltyData: Maybe<PrematurePenaltyFormState> | undefined;
}

export const ProductPrematurePenalty = ({ penaltyData }: IProductPrematurePenalty) => {
  const penaltyDataArray = [penaltyData ?? {}];

  const columns = React.useMemo<Column<typeof penaltyDataArray[0]>[]>(
    () => [
      {
        header: 'Penalty Date Type',
        accessorKey: 'penaltyDateType',
        meta: {
          width: '33%',
        },
        cell: (props) =>
          props.getValue() ? (props.getValue() as string)?.replace(/_/g, ' ') : 'N/A',
      },
      {
        header: 'No. of days',
        accessorKey: 'noOfDays',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
        meta: {
          isNumeric: true,
          width: '33%',
        },
      },
      {
        header: 'Penalty Ledger Mapping',
        accessorKey: 'penaltyLedgerMapping',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
        meta: {
          width: '33%',
        },
      },
      {
        header: 'Penalty Rate',
        accessorKey: 'penaltyRate',
        cell: (props) => (props.getValue() ? `${props.getValue()}  %` : 'N/A'),
        meta: {
          isNumeric: true,
          width: '33%',
        },
      },
      {
        header: 'Penalty Amount',
        accessorKey: 'penaltyAmount',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
        meta: {
          isNumeric: true,
          width: '33%',
        },
      },
    ],
    []
  );

  if (!penaltyData || Object.keys(penaltyData).length === 0) return null;

  return (
    <DetailsCard title="Premature Penalty Setup" hasTable>
      <Table isStatic data={penaltyDataArray} columns={columns} />
    </DetailsCard>
  );
};
