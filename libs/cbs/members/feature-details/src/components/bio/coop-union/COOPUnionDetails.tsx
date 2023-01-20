import { useRouter } from 'next/router';

import { DetailsCard } from '@myra-ui';

import { useGetMemberKymDetailsBioQuery } from '@coop/cbs/data-access';

import { AccountOperatorDetails } from './AccountOperatorsDetails';
import { AppicantDetails } from './ApplicantDetails';
import { BankAccountDetails } from './BankAccountDetails';
import { MemberCooperativeUnionBasicInfo } from './BasicDetails';
import { ContactDetailsInstitution } from './ContactDetails';
import { EconomicDetailsAssests } from './EconomicDetailsAssests';
import { EmployeesTable } from './EmployeesTable';
import { EquityLiabilities } from './EquityAndLaiabilities';
import { ExpenseDetails } from './ExpenseDetails';
import { IncomeDetails } from './IncomeDetails';
import { OperatingOfficeAddress } from './OperatinOfficeDetails';
import { PropritersDirectors } from './PropritorsDirectors';
import { RegisteredDetails } from './RegisteredDetails';
import { ServiceCenterAddress } from './ServiceCenterOffceDetails';
import { DocumentComponent } from '../components/Documents';

export const BioCoopUnion = () => {
  const router = useRouter();
  const memberBioData = useGetMemberKymDetailsBioQuery({
    id: router.query['id'] as string,
  });

  const bioDataCoopUnionDocs =
    memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.__typename === 'CoopUnionBio'
      ? memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.docs
      : null;
  return (
    <>
      <MemberCooperativeUnionBasicInfo />
      <RegisteredDetails />
      <OperatingOfficeAddress />
      <ServiceCenterAddress />
      <ContactDetailsInstitution />
      <BankAccountDetails />
      <AppicantDetails />
      <EmployeesTable />
      <PropritersDirectors />
      <AccountOperatorDetails />
      <EconomicDetailsAssests />
      <EquityLiabilities />
      <IncomeDetails />
      <ExpenseDetails />
      <DetailsCard title="Documents" bg="white">
        {bioDataCoopUnionDocs?.map((docs) => (
          <DocumentComponent keyText={docs?.key as string} value={docs?.value as string} />
        ))}
      </DetailsCard>
    </>
  );
};
