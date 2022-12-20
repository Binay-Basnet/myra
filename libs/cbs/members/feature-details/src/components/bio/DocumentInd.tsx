import { useRouter } from 'next/router';

import { DetailsCard } from '@myra-ui';

import { useGetMemberOverviewBioDetailsQuery } from '@coop/cbs/data-access';

import { DocumentComponent } from './components/Documents';

export const DocumentInd = () => {
  const router = useRouter();

  const memberBioData = useGetMemberOverviewBioDetailsQuery({
    id: router.query['id'] as string,
  });

  const bioDataIndDocs =
    memberBioData?.data?.members?.memberOverview?.data?.bio?.__typename === 'IndividualBio'
      ? memberBioData?.data?.members?.memberOverview?.data?.bio?.docs
      : null;
  return (
    <DetailsCard title="Documents" bg="white">
      {bioDataIndDocs?.map((docs) => (
        <DocumentComponent keyText={docs?.key as string} value={docs?.value as string} />
      ))}
    </DetailsCard>
  );
};
