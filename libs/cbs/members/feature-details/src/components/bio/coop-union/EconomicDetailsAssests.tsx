import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Column, DetailsCard, Table } from '@myra-ui';

import { useGetMemberKymDetailsBioQuery } from '@coop/cbs/data-access';
import { amountConverter } from '@coop/shared/utils';

export const EconomicDetailsAssests = () => {
  const router = useRouter();
  const memberBioData = useGetMemberKymDetailsBioQuery({
    id: router.query['id'] as string,
  });

  const bioDataCoopUnion =
    memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.__typename === 'CoopUnionBio'
      ? memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.assetDetails
      : null;

  const data = [
    {
      label: 'Cash and cash equivalents',
      current: bioDataCoopUnion?.cashAndEquivalentsCurrent,
      target: bioDataCoopUnion?.cashAndEquivalentsTarget,
    },
    {
      label: 'Bank',

      current: bioDataCoopUnion?.bankCurrent,
      target: bioDataCoopUnion?.bankTarget,
    },
    {
      label: 'Investments',

      current: bioDataCoopUnion?.investmentsCurrent,
      target: bioDataCoopUnion?.investmentsTarget,
    },
    {
      label: 'Non current assets',

      current: bioDataCoopUnion?.nonCurrentAssetsCurrent,
      target: bioDataCoopUnion?.nonCurrentAssetsTarget,
    },
    {
      label: 'Other non current assets',

      current: bioDataCoopUnion?.otherNonCurrentAssetsCurrent,
      target: bioDataCoopUnion?.otherNonCurrentAssetsTarget,
    },
  ];

  const columns = useMemo<Column<typeof data[0]>[]>(
    () => [
      {
        header: 'Account',
        accessorKey: 'label',
      },
      {
        header: 'Current',
        accessorKey: 'current',
        cell: (props) => amountConverter(props.getValue() as string),

        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Target For next fiscal year',
        accessorKey: 'target',
        cell: (props) => amountConverter(props.getValue() as string),

        meta: {
          isNumeric: true,
        },
      },
    ],
    []
  );

  return (
    <DetailsCard title="Economic Details - Assets" hasTable>
      <Table isStatic data={data} columns={columns} />
    </DetailsCard>
  );
};
