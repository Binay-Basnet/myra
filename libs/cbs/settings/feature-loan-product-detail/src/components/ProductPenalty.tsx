import { DetailsCard, WIPState } from '@myra-ui';

import { Maybe, Penalty } from '@coop/ebanking/data-access';

interface IProductPenalty {
  penaltyData: Maybe<Penalty> | undefined;
}

export const ProductPenalty = ({ penaltyData }: IProductPenalty) => {
  // const penaltyDataArray = [penaltyData ?? {}];

  // const columns = React.useMemo<Column<typeof penaltyDataArray[0]>[]>(
  //   () => [
  //     {
  //       header: 'Day from End Date',
  //       accessorKey: 'dayAfterInstallmentDate',
  //       meta: {
  //         width: '33%',
  //       },
  //       cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
  //     },
  //     {
  //       header: 'Penalty Amount',
  //       accessorKey: 'penaltyAmount',
  //       cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
  //       meta: {
  //         width: '33%',
  //       },
  //     },
  //     {
  //       header: 'Penalty',
  //       accessorKey: 'penaltyRate',
  //       cell: (props) => (props.getValue() ? `${props.getValue()}  %` : 'N/A'),
  //       meta: {
  //         isNumeric: true,
  //         width: '33%',
  //       },
  //     },
  //   ],
  //   []
  // );

  if (!penaltyData || Object.keys(penaltyData).length === 0) return null;

  return (
    <DetailsCard title="Penalty" hasTable>
      <WIPState />
      {/* <Table variant="report" size="report" isStatic data={penaltyDataArray} columns={columns} /> */}
    </DetailsCard>
  );
};