import { WIPState } from '@myra-ui';

import { Maybe, ServiceTypeFormState } from '@coop/ebanking/data-access';

interface IProductInsurance {
  insurance?: Maybe<Maybe<ServiceTypeFormState>[]> | undefined;
}

export const ProductInsurance = ({ insurance }: IProductInsurance) => {
  // const columns = React.useMemo<Column<ServiceTypeFormState>[]>(
  //   () => [
  //     {
  //       header: 'Insurance Type',
  //       accessorKey: 'serviceName',
  //       meta: {
  //         width: '33%',
  //       },
  //     },
  //     {
  //       header: 'Insurance Rate',
  //       accessorKey: 'ledgerName',
  //       meta: {
  //         width: '33%',
  //       },
  //     },
  //     {
  //       header: 'Insurance Amount',
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

  if (insurance?.length === 0) return null;

  // return <Table variant="report" size="report" isStatic data={insurance ?? []} columns={columns} />;
  return <WIPState />;
};
