import { useMemo } from 'react';

import { Column, DetailsCard, Table } from '@myra-ui';

import { Maybe, ServiceTypeFormState } from '@coop/ebanking/data-access';
import { amountConverter } from '@coop/shared/utils';

interface IProductLoanProcessingCharge {
  loanProcessingCharge?: Maybe<Maybe<ServiceTypeFormState>[]> | undefined;
}

export const ProductLoanProcessingCharge = ({
  loanProcessingCharge,
}: IProductLoanProcessingCharge) => {
  const columns = useMemo<Column<ServiceTypeFormState>[]>(
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

  if (loanProcessingCharge?.length === 0) return null;

  return (
    <DetailsCard title="Loan Processing Charge" hasTable>
      <Table isStatic data={loanProcessingCharge ?? []} columns={columns} />
    </DetailsCard>
  );
};
