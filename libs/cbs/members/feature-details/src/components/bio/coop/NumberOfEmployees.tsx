import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useGetMemberOverviewBioDetailsQuery } from '@coop/cbs/data-access';

export const NumberOfEmployeesCoop = () => {
  const router = useRouter();
  const memberBioData = useGetMemberOverviewBioDetailsQuery({
    id: router.query['id'] as string,
  });

  const bioDataCoop =
    memberBioData?.data?.members?.memberOverview?.data?.bio?.__typename === 'CoopBio'
      ? memberBioData?.data?.members?.memberOverview?.data?.bio?.employeeDetails
      : null;
  return (
    <DetailsCard title="No of Employees" bg="white" hasThreeRows>
      <DetailCardContent title="Male" subtitle={bioDataCoop?.male} />
      <DetailCardContent title="Female" subtitle={bioDataCoop?.female} />
      <DetailCardContent title="Total" subtitle={bioDataCoop?.total} />
    </DetailsCard>
  );
};
