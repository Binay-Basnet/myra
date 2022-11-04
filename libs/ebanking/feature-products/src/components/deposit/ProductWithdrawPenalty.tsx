import React from 'react';

import { Maybe, WithdrawPenalty } from '@coop/ebanking/data-access';
import { Column, Table } from '@coop/shared/table';
import { DetailsCard } from '@coop/shared/ui';

interface IProductPenaltyWithdrawSetupProps {
  withDrawData: Maybe<WithdrawPenalty> | undefined;
}

export const ProductPenaltyWithdrawSetup = ({
  withDrawData,
}: IProductPenaltyWithdrawSetupProps) => {
  const withDrawDataArray = [withDrawData ?? {}];

  const columns = React.useMemo<Column<typeof withDrawDataArray[0]>[]>(
    () => [
      {
        header: 'Withdraw Penalty Amount',
        accessorKey: 'penaltyAmount',
        meta: {
          width: '33%',
        },
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
      },
      {
        header: 'Withdraw Penalty Rate',
        accessorKey: 'penaltyRate',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
        meta: {
          width: '33%',
        },
      },
    ],
    []
  );

  if (!withDrawData || Object.keys(withDrawData).length === 0) return null;

  return (
    <DetailsCard title="Withdraw Penalty Setup" hideBorder hasTable>
      <Table variant="report" size="report" isStatic data={withDrawDataArray} columns={columns} />
    </DetailsCard>
  );
};
