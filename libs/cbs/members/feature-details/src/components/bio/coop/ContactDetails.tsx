import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useGetMemberKymDetailsBioQuery } from '@coop/cbs/data-access';

export const ContactDetailsCOOP = () => {
  const router = useRouter();
  const memberBioData = useGetMemberKymDetailsBioQuery({
    id: router.query['id'] as string,
  });

  const bioDataCoop =
    memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.__typename === 'CoopBio'
      ? memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.contactDetails
      : null;
  return (
    <DetailsCard title="Contact Details" bg="white" hasThreeRows>
      <DetailCardContent title="Offfice Mail" subtitle={bioDataCoop?.email} />
      <DetailCardContent title="Website Link" subtitle={bioDataCoop?.website} />
      <DetailCardContent title="Phone Number" subtitle={bioDataCoop?.phone} />
    </DetailsCard>
  );
};
