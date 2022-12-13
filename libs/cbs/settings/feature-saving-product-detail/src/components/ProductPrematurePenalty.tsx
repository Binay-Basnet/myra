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
        header: 'Effective Days from Start',
        accessorKey: 'penaltyDateType',
        meta: {
          width: '33%',
        },
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
      },
      {
        header: 'Remaining Days to get Matured',
        accessorKey: 'noOfDays',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
        meta: {
          isNumeric: true,
          width: '33%',
        },
      },
      {
        header: 'Penalty Rs.',
        accessorKey: 'penaltyAmount',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
        meta: {
          isNumeric: true,
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
        header: 'Penalty Ledger Mapping',
        accessorKey: 'penaltyLedgerMapping',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
        meta: {
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
