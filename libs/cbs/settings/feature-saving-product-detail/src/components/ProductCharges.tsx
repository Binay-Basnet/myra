import { WIPState } from '@myra-ui';

import { ServiceTypeFormState } from '@coop/ebanking/data-access';

interface IProductChargesProps {
  charges: ServiceTypeFormState[];
}

export const ProductCharges = ({ charges }: IProductChargesProps) => {
  const chargesTable = charges?.map((charge, index) => ({
    index: index + 1,
    ...charge,
  }));

  // const columns = React.useMemo<Column<typeof chargesTable[0]>[]>(
  //   () => [
  //     {
  //       header: 'S.N.',
  //       accessorKey: 'index',
  //       meta: {
  //         width: '33%',
  //       },
  //     },
  //     {
  //       header: 'Service Name',
  //       accessorKey: 'serviceName',
  //       meta: {
  //         width: '33%',
  //       },
  //     },
  //     {
  //       header: 'Amount',
  //       accessorKey: 'amount',
  //       cell: (props) => (props.getValue() ? amountConverter(props.getValue() as string) : 'N/A'),
  //       meta: {
  //         width: '33%',
  //       },
  //     },
  //   ],
  //   []
  // );

  if (chargesTable?.length === 0) return null;

  return <WIPState />;
  // return <Table variant="report" size="report" isStatic data={chargesTable} columns={columns} />;
};
