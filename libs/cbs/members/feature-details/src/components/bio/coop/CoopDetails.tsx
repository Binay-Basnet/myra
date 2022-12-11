import { AccountOperationInstruction } from './AccountOperationInstruction';
import { AccountOperatorDetails } from './AccountOperatorDetails';
import { AdditionalCoopDetails } from './AdditionalCooperativeDetails';
import { MemberCOOPBasicInfo } from './BasicInfo';
import { ContactDetailsCOOP } from './ContactDetails';
import { CurrentMemberDetailsCOOP } from './CurrentMemberDetails';
import { EquityAndLiabilityCOOP } from './EquityAndLiability';
import { NumberOfEmployeesCoop } from './NumberOfEmployees';
import { OperatingOfficeAddress } from './OperatingAddress';
import { RegisteredDetails } from './RegisteredDetails';
import { RepresentativeDetails } from './RepresentativeDetails';

export const BioCoop = () => (
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
    <AccountOperationInstruction />
    <AccountOperatorDetails />
  </>
);
