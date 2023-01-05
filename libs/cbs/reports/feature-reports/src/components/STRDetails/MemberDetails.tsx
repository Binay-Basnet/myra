import { DetailCardContent, DetailsCard } from '@myra-ui';

import { localizedDate, localizedText } from '@coop/cbs/utils';

import { useSTRDetails } from '../../hooks/useSTRDetails';

export const MemberDetails = () => {
  const { memberDetails } = useSTRDetails();

  return (
    <DetailsCard title="Customer Details" hasThreeRows>
      <DetailCardContent title="Name of Main Account Holder" subtitle={memberDetails?.memberName} />
      <DetailCardContent title="Profession" subtitle={memberDetails?.profession} />
      <DetailCardContent
        title="Permanent Address"
        subtitle={localizedText(memberDetails?.permanentAddress)}
      />
      <DetailCardContent
        title="Temporary Address"
        subtitle={localizedText(memberDetails?.currentAddress)}
      />
      <DetailCardContent title="Nationality" subtitle={memberDetails?.nationality} />
      <DetailCardContent title="Date of Birth" subtitle={localizedDate(memberDetails?.dob)} />
    </DetailsCard>
  );
};
