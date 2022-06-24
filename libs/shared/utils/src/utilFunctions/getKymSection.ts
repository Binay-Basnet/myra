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
const mainOccupation = ['mainOccupation', 'mainOccupationButton'];
const spouceOccupation = ['spouseOccupation', 'spouseOccupationButton'];
const incomeSource = [
  'incomeSourceDetails',
  'incomeSourceDetails',
  'incomeSourceDetailsButton',
];
const identificationDetails = [
  'identificationDetailsPersonal',
  'identificationFields',
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
  'permanentAddressLocation',
];
const temporaryAddress = [
  'isPermanentAndTemporaryAddressSame',
  'temporaryStateId',
  'temporaryDistrictId',
  'temporaryLocalityId',
  'temporaryWardId',
  'temporaryTole',
];
const incaseRented = ['landlordName', 'landlordContact'];
const familyDetails = [
  'maritalStatus',
  'familyDetails',
  'addFamilyMemberButton',
];
const COOPmembership = ['purposeId'];
const anotherCoop = [
  'memberOfAnotherCooperative',
  'nameAddressCooperative',
  'memberNo',
];
const familyInCoop = [
  'familyMemberInThisInstitution',
  'addfamilyCoopButton',
  'findmemberButton',
];
const FinancialTransaction = ['share', 'savings', 'loan', 'other'];
const estimatedWithdrawal = [
  'estimatedAnnualAccountTransactionAmount',
  'estimatedWithdrawal',
  'annualIncomeCheckbox',
  'estimatedAnnualDepositAmount',
  'estimatedAnnualLoanAmount',
];
const declerationNextToKin = [
  'localKinName',
  'localKinRelationshipId',
  'localKinContact',
  'localKinAddress',
];
const politicalExposure = ['politicallyExposedPerson'];
const benificialOwner = ['beneficialOwner', 'beneficialRelationShipId'];
const convicted = ['declarationOfConvicted', 'convictionDetails'];
const foreign = ['residentForeign'];

export const getKymSection = (id: string) => {
  if (basicInfo.includes(id)) {
    return {
      section: 'personalDetails',
      subSection: 'kymAccIndBasicInformation',
    };
  }
  if (contact.includes(id)) {
    return {
      section: 'personalDetails',
      subSection: 'kymAccIndContactDetails',
    };
  }
  if (identificationDetails.includes(id)) {
    return {
      section: 'personalDetails',
      subSection: 'kymAccIndIdentificationDetails',
    };
  }
  if (permanentAddress.includes(id)) {
    return {
      section: 'personalDetails',
      subSection: 'kymAccIndPermanentAddress',
    };
  }
  if (temporaryAddress.includes(id)) {
    return {
      section: 'personalDetails',
      subSection: 'kymAccIndTemporaryAddress',
    };
  }
  if (incaseRented.includes(id)) {
    return {
      section: 'personalDetails',
      subSection: 'kymAccIndIncaseofresidinginRentedHouse',
    };
  }
  if (familyDetails.includes(id) || familyDetails.includes(id.split('.')[0])) {
    return { section: 'personalDetails', subSection: 'kymAccIndFamilyDetails' };
  }
  if (profession.includes(id)) {
    return {
      section: 'professionalDetails',
      subSection: 'kymAccIndProfession',
    };
  }
  if (mainOccupation.includes(id.split('.')[0])) {
    return {
      section: 'professionalDetails',
      subSection: 'kymAccIndMainProfession',
    };
  }
  if (spouceOccupation.includes(id.split('.')[0])) {
    return {
      section: 'professionalDetails',
      subSection: 'kymAccIndMainOccupationofHusabandWife',
    };
  }
  if (incomeSource.includes(id.split('.')[0])) {
    return {
      section: 'professionalDetails',
      subSection: 'kymAccIndIncomeSourceDetails',
    };
  }
  if (COOPmembership.includes(id)) {
    return {
      section: 'COOPmembership',
      subSection: 'kymAccIndMainPurposeofBecomingMember',
    };
  }
  if (anotherCoop.includes(id.split('-')[0])) {
    return {
      section: 'COOPmembership',
      subSection: 'kymAccIndMemberofAnothercooperative',
    };
  }
  if (anotherCoop.includes(id.split('-')[0])) {
    return {
      section: 'COOPmembership',
      subSection: 'kymAccIndMemberofAnothercooperative',
    };
  }
  if (familyInCoop.includes(id.split('-')[0])) {
    return {
      section: 'COOPmembership',
      subSection: 'kymAccIndFamilyMemberinthisinstitution',
    };
  }
  if (FinancialTransaction.includes(id)) {
    return {
      section: 'COOPmembership',
      subSection: 'kymAccIndFinancialTransactionDetails',
    };
  }
  if (estimatedWithdrawal.includes(id)) {
    return {
      section: 'COOPmembership',
      subSection: 'kymAccIndEstimatedWithdrawDepositAmountintheInstitureion',
    };
  }

  if (declerationNextToKin.includes(id)) {
    return {
      section: 'declaration',
      subSection: 'kymAccIndNexttoKin',
    };
  }
  if (politicalExposure.includes(id.split('-')[0])) {
    return {
      section: 'declaration',
      subSection: 'kymAccIndFamilymembersinpolitics',
    };
  }
  if (benificialOwner.includes(id.split('-')[0])) {
    return {
      section: 'declaration',
      subSection: 'kymAccIndBeneficialOwner',
    };
  }
  if (convicted.includes(id.split('-')[0])) {
    return {
      section: 'declaration',
      subSection: 'kymAccIndConvictedNonconvictedStatus',
    };
  }
  if (foreign.includes(id.split('-')[0])) {
    return {
      section: 'declaration',
      subSection: 'kymAccIndResidentialpermitofforeigncountry',
    };
  }

  return;
};
