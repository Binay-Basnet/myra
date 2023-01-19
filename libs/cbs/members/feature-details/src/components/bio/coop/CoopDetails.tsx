import { useRouter } from 'next/router';

import { DetailsCard } from '@myra-ui';

import { useGetMemberKymDetailsBioQuery } from '@coop/cbs/data-access';

import { AccountOperatorDetails } from './AccountOperatorDetails';
import { AdditionalCoopDetails } from './AdditionalCooperativeDetails';
import { AssestsCOOP } from './AssestsDetails';
import { MemberCOOPBasicInfo } from './BasicInfo';
import { ContactDetailsCOOP } from './ContactDetails';
import { CurrentMemberDetailsCOOP } from './CurrentMemberDetails';
import { DirectorDetails } from './DetailsOfDirector';
import { EquityAndLiabilityCOOP } from './EquityAndLiability';
import { NumberOfEmployeesCoop } from './NumberOfEmployees';
import { OperatingOfficeAddress } from './OperatingAddress';
import { RegisteredDetails } from './RegisteredDetails';
import { RepresentativeDetails } from './RepresentativeDetails';
import { DocumentComponent } from '../components/Documents';

export const BioCoop = () => {
  const router = useRouter();
  const memberBioData = useGetMemberKymDetailsBioQuery({
    id: router.query['id'] as string,
  });

  const bioDataCoopDocs =
    memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.__typename === 'CoopBio'
      ? memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.docs
      : null;

  return (
    <>
      <MemberCOOPBasicInfo />
      <RegisteredDetails />
      <OperatingOfficeAddress />
      <ContactDetailsCOOP />
      <CurrentMemberDetailsCOOP />
      <RepresentativeDetails />
      <AdditionalCoopDetails />
      <NumberOfEmployeesCoop />
      <EquityAndLiabilityCOOP />
      <AssestsCOOP />
      <AccountOperatorDetails />
      <DirectorDetails />
      <DetailsCard title="Documents" bg="white">
        {bioDataCoopDocs?.map((docs) => (
          <DocumentComponent
            keyText={docs?.key as string}
            value={docs?.value as string}
            key={docs?.value}
          />
        ))}
      </DetailsCard>
    </>
  );
};
