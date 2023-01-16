import React from 'react';

import { Column, DetailsCard, Table } from '@myra-ui';

import { Maybe, ServiceTypeFormState } from '@coop/ebanking/data-access';
import { amountConverter } from '@coop/shared/utils';

interface IProductServiceCharge {
  serviceCharge?: Maybe<Maybe<ServiceTypeFormState>[]> | undefined;
}

export const ProductServiceCharge = ({ serviceCharge }: IProductServiceCharge) => {
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
  if (serviceCharge?.length === 0) return null;

  return (
    <DetailsCard title="Account Service Charge" hasTable>
      <Table isStatic isDetailPageTable data={serviceCharge ?? []} columns={columns} />
    </DetailsCard>
  );
};
