import React from 'react';

import { Maybe, PrematurePenaltyFormState } from '@coop/ebanking/data-access';
import { Column, Table } from '@coop/shared/table';
import { DetailsCard } from '@coop/shared/ui';

interface IProductPrematurePenaltyProps {
  prematurePenalty: Maybe<PrematurePenaltyFormState> | undefined;
}

export const ProductPrematurePenalty = ({ prematurePenalty }: IProductPrematurePenaltyProps) => {
  const prematurePenaltyArray = [prematurePenalty ?? {}];

  const columns = React.useMemo<Column<typeof prematurePenaltyArray[0]>[]>(
    () => [
      {
        header: 'Penalty Date Type',
        accessorKey: 'penaltyDateType',
        meta: {
          width: '25%',
        },
        cell: (props) =>
          props.getValue()
            ? props.row.original.penaltyDateType?.replace(/_/g, ' ').toLowerCase()
            : 'N/A',
      },
      {
        header: 'No. of Days',
        accessorKey: 'noOfDays',
        meta: {
          width: '25%',
        },
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
      },
      {
        header: 'Penalty Rs.',
        accessorKey: 'penaltyAmount',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
        meta: {
          isNumeric: true,

          width: '25%',
        },
      },
      {
        header: 'Penalty Rate',
        accessorKey: 'penaltyRate',
        cell: (props) => (props.getValue() ? `${props.getValue()}  %` : 'N/A'),
        meta: {
          isNumeric: true,
          width: '25%',
        },
      },
    ],
    []
  );

  if (!prematurePenalty || Object.keys(prematurePenalty).length === 0) return null;

  return (
    <DetailsCard title="Premature Penalty Setup" hideBorder hasTable>
      <Table
        variant="report"
        size="report"
        isStatic
        data={prematurePenaltyArray}
        columns={columns}
      />
    </DetailsCard>
  );
};
