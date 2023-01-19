import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useGetMemberKymDetailsBioQuery } from '@coop/cbs/data-access';

export const NumberOfEmployeesCoop = () => {
  const router = useRouter();
  const memberBioData = useGetMemberKymDetailsBioQuery({
    id: router.query['id'] as string,
  });

  const bioDataCoop =
    memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.__typename === 'CoopBio'
      ? memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.employeeDetails
      : null;
  return (
    <DetailsCard title="No of Employees" bg="white" hasThreeRows>
      <DetailCardContent title="Male" subtitle={bioDataCoop?.male} />
      <DetailCardContent title="Female" subtitle={bioDataCoop?.female} />
      <DetailCardContent title="Total" subtitle={bioDataCoop?.total} />
    </DetailsCard>
  );
};
