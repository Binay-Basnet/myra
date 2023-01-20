import { useRouter } from 'next/router';

import { DetailsCard } from '@myra-ui';

import { useGetMemberKymDetailsBioQuery } from '@coop/cbs/data-access';

import { DocumentComponent } from './components/Documents';

export const DocumentInd = () => {
  const router = useRouter();

  const memberBioData = useGetMemberKymDetailsBioQuery({
    id: router.query['id'] as string,
  });

  const bioDataIndDocs =
    memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.__typename === 'IndividualBio'
      ? memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.docs
      : null;
  return (
    <DetailsCard title="Documents" bg="white">
      {bioDataIndDocs?.map((docs) => (
        <DocumentComponent keyText={docs?.key as string} value={docs?.value as string} />
      ))}
    </DetailsCard>
  );
};
