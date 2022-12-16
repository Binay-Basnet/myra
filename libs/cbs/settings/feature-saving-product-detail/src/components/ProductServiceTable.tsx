import React from 'react';

import { Column, Table } from '@myra-ui';

import { Maybe, ServiceTypeFormState } from '@coop/ebanking/data-access';
import { amountConverter } from '@coop/shared/utils';

interface IProductServiceTable {
  serviceList?: Maybe<Maybe<ServiceTypeFormState>[]> | undefined;
}

export const ProductServiceTable = ({ serviceList }: IProductServiceTable) => {
  const serviceListWithIndex =
    serviceList?.map((service, index) => ({
      index: index + 1,
      ...service,
    })) ?? [];

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

  if (serviceListWithIndex?.length === 0) return null;

  return <Table isStatic data={serviceListWithIndex ?? []} columns={columns} />;
};
