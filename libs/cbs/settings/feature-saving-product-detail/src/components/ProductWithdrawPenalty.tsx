import React from 'react';

import { Column, DetailsCard, Table } from '@myra-ui';

import { WithdrawPenaltyFormState } from '@coop/cbs/data-access';
import { Maybe } from '@coop/ebanking/data-access';

interface IProductWithdrawPenalty {
  penaltyData: Maybe<WithdrawPenaltyFormState> | undefined;
}

export const ProductWithdrawPenalty = ({ penaltyData }: IProductWithdrawPenalty) => {
  const penaltyDataArray = [penaltyData ?? {}];

  const columns = React.useMemo<Column<typeof penaltyDataArray[0]>[]>(
    () => [
      {
        header: 'Penalty Amount',
        accessorKey: 'penaltyAmount',
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
          width: '33%',
        },
      },
      {
        header: 'Penalty Ledger Mapping',
        accessorKey: 'penaltyLedgerMapping',
        cell: (props) => (props.getValue() ? `${props.getValue()}  %` : 'N/A'),
        meta: {
          isNumeric: true,
          width: '33%',
        },
      },
    ],
    []
  );

  return (
    <DetailsCard title="Withdraw Penalty Setup" hasTable>
      <Table isDetailPageTable isStatic data={penaltyDataArray} columns={columns} />
    </DetailsCard>
  );
};
