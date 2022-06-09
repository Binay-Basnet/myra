const basicInfo = [
  'firstName',
  'middleName',
  'lastName',
  'genderId',
  'dateOfBirth',
  'ethnicityId',
  'nationalityId',
  'educationQualificationId',
  'religionId',
];

const contact = ['phoneNumber', 'mobileNumber', 'email'];

const profession = ['profession'];
const mainOccupation = ['mainOccupation'];
const spouceOccupation = ['spouseOccupation'];
const incomeSource = ['incomeSourceDetails'];
const identificationDetails = [
  'citizenshipNo',
  'citizenshipPlaceOfIssue',
  'citizenshipIssueDate',
  'divingLicenseNo',
  'divingLicensePlaceOfIssue',
  'divingLicenseIssuedDate',
  'passportNumber',
  'passportPlaceOfIssue',
  'passportIssueDate',
  'voterCardNo',
  'pollingStation',
  'nationalId',
];
const permanentAddress = [
  'permanentStateId',
  'permanentDistrictId',
  'permanentLocalityId',
  'permanentWardId',
  'permanentTole',
];
const temporaryAddress = [
  'temporaryStateId',
  'temporaryDistrictId',
  'temporaryLocalityId',
  'temporaryWardId',
  'temporaryTole',
];
const incaseRented = ['landlordName', 'landlordContact'];
const familyDetails = ['maritalStatus', 'familyDetails'];
const COOPmembership = ['purposeId'];
const familyInCoop = ['nameAddressCooperative', 'memberNo'];
const FinancialTransaction = ['share', 'savings', 'loan', 'other'];
const estimatedWithdrawal = [
  'estimatedWithdrawal',
  'estimatedAnnualDepositAmount',
  'estimatedAnnualLoanAmount',
];
const declerationNextToKin = [
  'localKinName',
  'localKinRelationshipId',
  'localKinContact',
  'localKinAddress',
];

export const getKymSection = (id: string) => {
  if (basicInfo.includes(id)) {
    return { section: 'personalDetails', subSection: 'Basic Information' };
  }
  if (contact.includes(id)) {
    return { section: 'personalDetails', subSection: 'Contact Details' };
  }
  if (identificationDetails.includes(id)) {
    return { section: 'personalDetails', subSection: 'Identification Details' };
  }
  if (permanentAddress.includes(id)) {
    return { section: 'personalDetails', subSection: 'Permanent Address' };
  }
  if (temporaryAddress.includes(id)) {
    return { section: 'personalDetails', subSection: 'Temporary Address' };
  }
  if (incaseRented.includes(id)) {
    return {
      section: 'personalDetails',
      subSection: 'Incase of residing in Rented House',
    };
  }
  if (familyDetails.includes(id) || familyDetails.includes(id.split('.')[0])) {
    return { section: 'personalDetails', subSection: 'Family Details' };
  }
  if (profession.includes(id)) {
    return { section: 'professionalDetails', subSection: 'Profession' };
  }
  if (mainOccupation.includes(id.split('.')[0])) {
    return {
      section: 'professionalDetails',
      subSection: 'Main Profession',
    };
  }
  if (spouceOccupation.includes(id.split('.')[0])) {
    return {
      section: 'professionalDetails',
      subSection: 'Main Occupation of Husaband/Wife',
    };
  }
  if (incomeSource.includes(id.split('.')[0])) {
    return {
      section: 'professionalDetails',
      subSection: 'Income Source Details',
    };
  }
  if (COOPmembership.includes(id)) {
    return {
      section: 'COOPmembership',
      subSection: 'Main Purpose of Becoming a Member',
    };
  }
  if (familyInCoop.includes(id)) {
    return {
      section: 'COOPmembership',
      subSection: 'Family Member in this institution',
    };
  }
  if (FinancialTransaction.includes(id)) {
    return {
      section: 'COOPmembership',
      subSection: 'Financial Transaction Details',
    };
  }
  if (estimatedWithdrawal.includes(id)) {
    return {
      section: 'COOPmembership',
      subSection: 'Estimated Withdraw/Deposit Amount in the Institureion',
    };
  }

  if (declerationNextToKin.includes(id)) {
    return {
      section: 'declaration',
      subSection: 'Next to Kin',
    };
  }

  return;
};
