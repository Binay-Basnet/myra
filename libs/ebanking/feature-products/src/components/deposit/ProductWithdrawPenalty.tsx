import React from 'react';

import { Maybe, WithdrawPenaltyFormState } from '@coop/ebanking/data-access';
import { Column, Table } from '@myra-ui/table';
import { DetailsCard } from '@myra-ui';

interface IProductPenaltyWithdrawSetupProps {
  withDrawData: Maybe<WithdrawPenaltyFormState> | undefined;
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
    <DetailsCard title="Withdraw Penalty Setup" hasTable>
      <Table variant="report" size="report" isStatic data={withDrawDataArray} columns={columns} />
    </DetailsCard>
  );
};
