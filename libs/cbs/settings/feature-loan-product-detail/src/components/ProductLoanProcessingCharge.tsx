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
  const loanProcessingChargeListWithIndex =
    loanProcessingCharge?.map((loanProcess, index) => ({
      index: index + 1,
      ...loanProcess,
    })) ?? [];

  const columns = useMemo<Column<typeof loanProcessingChargeListWithIndex[0]>[]>(
    () => [
      {
        header: 'SN',
        accessorKey: 'index',
      },
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
  if (loanProcessingChargeListWithIndex?.length === 0) return null;

  return (
    <DetailsCard title="Loan Processing Charge" hasTable>
      <Table
        isDetailPageTable
        isStatic
        data={loanProcessingChargeListWithIndex ?? []}
        columns={columns}
      />
    </DetailsCard>
  );
};
