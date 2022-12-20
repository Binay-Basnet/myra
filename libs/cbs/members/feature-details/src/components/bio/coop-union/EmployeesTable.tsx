import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Column, DetailsCard, Table } from '@myra-ui';

import { useGetMemberOverviewBioDetailsQuery } from '@coop/cbs/data-access';
import { quantityConverter } from '@coop/shared/utils';

export const EmployeesTable = () => {
  const router = useRouter();
  const memberBioData = useGetMemberOverviewBioDetailsQuery({
    id: router.query['id'] as string,
  });

  const bioDataCoopUnion =
    memberBioData?.data?.members?.memberOverview?.data?.bio?.__typename === 'CoopUnionBio'
      ? memberBioData?.data?.members?.memberOverview?.data?.bio?.memberInfo
      : null;

  const data = [
    {
      label: 'No of Male Members',
      current: bioDataCoopUnion?.noOfMaleCurrent,
      target: bioDataCoopUnion?.noOfMaleTarget,
    },
    {
      label: 'No of Female Members',

      current: bioDataCoopUnion?.noOfFemaleCurrent,
      target: bioDataCoopUnion?.noOfFemaleTarget,
    },
    {
      label: 'No of Institutional Members',

      current: bioDataCoopUnion?.noOfInstitutionalCurrent,
      target: bioDataCoopUnion?.noOfInstitutionalCurrent,
    },
  ];

  const columns = useMemo<Column<typeof data[0]>[]>(
    () => [
      {
        header: 'Member Details',
        accessorKey: 'label',
      },
      {
        header: 'Current',
        accessorKey: 'current',
        cell: (props) => quantityConverter(props.getValue() as string),

        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Target For next fiscal year',
        accessorKey: 'target',
        cell: (props) => quantityConverter(props.getValue() as string),

        meta: {
          isNumeric: true,
        },
      },
    ],
    []
  );

  return (
    <DetailsCard title="Cooperative Member Information" hasTable>
      <Table isStatic data={data} columns={columns} />
    </DetailsCard>
  );
};
