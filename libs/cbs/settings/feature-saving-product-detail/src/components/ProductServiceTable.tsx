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

  return <Table isDetailPageTable isStatic data={serviceListWithIndex ?? []} columns={columns} />;
};
