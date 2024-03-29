import React from 'react';

import { Column, DetailsCard, Table } from '@myra-ui';

import { Maybe, ServiceTypeFormState } from '@coop/ebanking/data-access';
import { amountConverter } from '@coop/shared/utils';

interface IAccountCloseCharge {
  accountCloseCharge?: Maybe<Maybe<ServiceTypeFormState>[]> | undefined;
}

export const AccountCloseCharge = ({ accountCloseCharge }: IAccountCloseCharge) => {
  const columns = React.useMemo<Column<ServiceTypeFormState>[]>(
    () => [
      {
        header: 'Service Name',
        accessorKey: 'serviceName',
        meta: {
          width: '80%',
        },
      },
      {
        header: 'Ledger Name',
        accessorKey: 'ledgerName',
      },
      {
        header: 'Amount',
        accessorKey: 'amount',
        cell: (props) => amountConverter(props.getValue() as string),
        meta: {
          isNumeric: true,
        },
      },
    ],
    []
  );
  if (accountCloseCharge?.length === 0) return null;
  return (
    <DetailsCard title="Account Close Service Charge" hasTable>
      <Table isDetailPageTable isStatic data={accountCloseCharge ?? []} columns={columns} />
    </DetailsCard>
  );
};
