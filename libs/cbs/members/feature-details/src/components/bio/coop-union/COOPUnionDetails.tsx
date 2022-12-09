import { AddressDetails } from './AddressDetails';
import { ApplicantDetails } from './ApplicantDetails';
import { BankAccountDetails } from './BankAccountDetails';
import { MemberCooperativeUnionBasicInfo } from './BasicDetails';
import { ContactDetailsInstitution } from './ContactDetails';
import { OperatingOfficeAddress } from './OperatinOfficeDetails';
import { PropritersDirectors } from './PropritorsDirectors';
import { RegisteredDetails } from './RegisteredDetails';
import { ServiceCenterAddress } from './ServiceCenterOffceDetails';

export const BioCoopUnion = () => (
  <>
    <MemberCooperativeUnionBasicInfo />
    <AddressDetails />
    <RegisteredDetails />
    <OperatingOfficeAddress />
    <ServiceCenterAddress />
    <ContactDetailsInstitution />
    <BankAccountDetails />
    <ApplicantDetails />
    <PropritersDirectors />
  </>
);
