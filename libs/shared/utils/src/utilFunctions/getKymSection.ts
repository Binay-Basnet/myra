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

const profession = ['professionId'];
const mainOccupation = [
  'mainOccupation',
  'mainOccupationButton',
  'isForeignEmployee',
  'nameOfCountry',
  'typeOfVisa',
  'estimatedAnnualIncome',
];
const spouceOccupation = ['spouseOccupation', 'spouseOccupationButton'];
const incomeSource = [
  'annualIncomeSourceId',
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
  'permanentAddress.provinceId',
  'permanentAddress.districtId',
  'permanentAddress.localLevelId',
  'permanentAddress.wardNo',
  'permanentAddress.locality',
  'permanentAddress.houseNo',
  'permanentAddress.coordinate',
];
const temporaryAddress = [
  'sameTempAsPermanentAddress',
  'temporaryAddress.provinceId',
  'temporaryAddress.districtId',
  'temporaryAddress.localLevelId',
  'temporaryAddress.wardNo',
  'temporaryAddress.locality',
  'temporaryAddress.houseNo',
  'temporaryAddress.coordinate',
];
const incaseRented = ['landlordName', 'landlordContact'];
const familyDetails = [
  'maritalStatusId',
  'familyDetails',
  'addFamilyMemberButton',
];
const COOPmembership = ['purposeId', 'memberIdentityLevel'];
const anotherCoop = [
  'isMemberOfAnotherCooperative',
  'nameAddressCooperative',
  'memberNo',
  'otherMembershipDetails',
];
const familyInCoop = [
  'kymIndRelationship',
  'familyRelationship',
  'familyMemberInThisCooperative',
  'familyMemberInThisInstitution',
  'addfamilyCoopButton',
  'firstIntroducerId',
  'secondIntroducerId',
  'findmemberButton',
];
const FinancialTransaction = ['financialTransaction'];
const estimatedWithdrawal = [
  'estimatedAnnualTransactionAmount',
  'estimatedAnnualTransactionFrequencyId',
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
const politicalExposure = [
  'isPoliticallyExposed',
  'politicallyExposedDetails`',
];
const benificialOwner = [
  'hasBeneficialOwner',
  'beneficialFullName',
  'beneficialRelationshipId',
  'beneficialFullName',
];
const convicted = ['isConvicted', 'convictedDetails'];
const foreign = [
  'hasForeignResidentialPermit',
  'foreignResidentialPermitTypeId',
];

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
  if (anotherCoop.includes(id.split('.')[0])) {
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
  if (familyInCoop.includes(id.split('.')[0])) {
    return {
      section: 'COOPmembership',
      subSection: 'kymAccIndFamilyMemberinthisinstitution',
    };
  }
  if (FinancialTransaction.includes(id.split('.')[0])) {
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
  if (politicalExposure.includes(id)) {
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
  if (
    foreign.includes(id.split('-')[0]) ||
    foreign.includes(id.split('.')[0])
  ) {
    return {
      section: 'declaration',
      subSection: 'kymAccIndResidentialpermitofforeigncountry',
    };
  }

  return;
};
