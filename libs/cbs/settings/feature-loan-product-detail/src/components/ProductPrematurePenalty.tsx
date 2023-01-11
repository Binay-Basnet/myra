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
        header: 'Effective Days From Start',
        accessorKey: 'penaltyDateType',
        cell: (props) =>
          props.getValue() ? (props.getValue() as string)?.replace(/_/g, ' ') : 'N/A',
        meta: {
          width: '25%',
        },
      },
      {
        header: 'Remaining Days to get Matured',
        accessorKey: 'noOfDays',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Penalty Amount',
        accessorKey: 'penaltyAmount',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Penalty Rate',
        accessorKey: 'penaltyRate',
        cell: (props) => (props.getValue() ? `${props.getValue()}  %` : 'N/A'),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Penalty Ledger Mapping',
        accessorKey: 'penaltyLedgerMapping',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
      },
    ],
    []
  );
  if (penaltyDataArray?.length === 0) return null;

  return (
    <DetailsCard title="Premature Penalty Setup" hasTable>
      <Table isDetailPageTable isStatic data={penaltyDataArray} columns={columns} />
    </DetailsCard>
  );
};
