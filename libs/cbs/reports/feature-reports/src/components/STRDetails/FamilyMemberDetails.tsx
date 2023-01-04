import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useSTRDetails } from '../../hooks/useSTRDetails';

export const FamilyMemberDetails = () => {
  const { memberDetails } = useSTRDetails();

  return (
    <DetailsCard title="Family Member Details" hasThreeRows>
      {memberDetails?.familyMembers?.map((member) => (
        <DetailCardContent title={member?.relationship} subtitle={member?.fullName} />
      ))}
    </DetailsCard>
  );
};
