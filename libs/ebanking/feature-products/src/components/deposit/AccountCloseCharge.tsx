import React from 'react';

import { Maybe, ServiceTypeFormState } from '@coop/ebanking/data-access';
import { Column, Table } from '@coop/shared/table';
import { DetailsCard } from '@coop/shared/ui';
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
          width: '33%',
        },
      },
      {
        header: 'Ledger Name',
        accessorKey: 'ledgerName',
        meta: {
          width: '33%',
        },
      },
      {
        header: 'Amount',
        accessorKey: 'amount',
        cell: (props) => amountConverter(props.getValue() as string),
        meta: {
          isNumeric: true,
          width: '33%',
        },
      },
    ],
    []
  );

  if (accountCloseCharge && accountCloseCharge?.length === 0) return null;

  return (
    <DetailsCard title="Account Close Service Charge" hasTable>
      <Table
        variant="report"
        size="report"
        isStatic
        data={accountCloseCharge ?? []}
        columns={columns}
      />
    </DetailsCard>
  );
};
