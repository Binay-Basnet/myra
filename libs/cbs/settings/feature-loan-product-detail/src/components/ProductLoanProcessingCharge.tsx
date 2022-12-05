import { DetailsCard, WIPState } from '@myra-ui';

import { Maybe, ServiceTypeFormState } from '@coop/ebanking/data-access';

interface IProductLoanProcessingCharge {
  loanProcessingCharge?: Maybe<Maybe<ServiceTypeFormState>[]> | undefined;
}

export const ProductLoanProcessingCharge = ({
  loanProcessingCharge,
}: IProductLoanProcessingCharge) => {
  // const columns = React.useMemo<Column<ServiceTypeFormState>[]>(
  //   () => [
  //     {
  //       header: 'Service Name',
  //       accessorKey: 'serviceName',
  //       meta: {
  //         width: '33%',
  //       },
  //     },
  //     {
  //       header: 'Ledger Name',
  //       accessorKey: 'ledgerName',
  //       meta: {
  //         width: '33%',
  //       },
  //     },
  //     {
  //       header: 'Amount',
  //       accessorKey: 'amount',
  //       cell: (props) => amountConverter(props.getValue() as string),
  //       meta: {
  //         isNumeric: true,
  //         width: '33%',
  //       },
  //     },
  //   ],
  //   []
  // );

  if (loanProcessingCharge?.length === 0) return null;

  return (
    <DetailsCard title="Loan Processing Charge" hasTable>
      <WIPState />
      {/* <Table
        variant="report"
        size="report"
        isStatic
        data={loanProcessingCharge ?? []}
        columns={columns}
      /> */}
    </DetailsCard>
  );
};
