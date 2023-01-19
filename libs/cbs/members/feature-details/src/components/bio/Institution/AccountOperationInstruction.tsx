import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useGetMemberKymDetailsBioQuery } from '@coop/cbs/data-access';

export const AccountOperationInstruction = () => {
  const router = useRouter();
  const memberBioData = useGetMemberKymDetailsBioQuery({
    id: router.query['id'] as string,
  });

  const bioDataInstitution =
    memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.__typename === 'InstitutionBio'
      ? memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.operatorInstructionDetails
      : null;

  return (
    <DetailsCard title="Account Operation Instruction Details" bg="white" hasThreeRows>
      <DetailCardContent title="Account" subtitle={bioDataInstitution?.accountType} />
      <DetailCardContent
        title="Company Stamp Compulsory"
        subtitle={bioDataInstitution?.stampCompulsory ? 'Yes' : 'No'}
      />
      <DetailCardContent
        title="Special Instruction"
        subtitle={bioDataInstitution?.specialInstruction}
      />
    </DetailsCard>
  );
};
