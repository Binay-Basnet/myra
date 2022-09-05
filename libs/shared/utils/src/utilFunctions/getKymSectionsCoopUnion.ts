const BasicInfo = [
  'nameOfInstitutionEn',
  'institutionType',
  'natureOfBusinessEn',
  'regdDate',
  'vatOrPan',
  'oprOfficeAddress',
  'noOfBranches',
  'branchOfficeAddress',
];
const registerDetails = [
  'regdAddress',
  'regdAddressChanged',
  'regdNo',
  'issuingOffice',
  'regdAddress.provinceId',
  'regdAddress.districtId',
  'regdAddress.localGovernmentId',
  'regdAddress.wardNo',
  'regdAddress.locality',
  'regdAddress.houseNo',
  'regdAddress.coordinates',
];

const operatingOfficeAddress = [
  'operatingOfficeAddress.provinceId',
  'operatingOfficeAddress.districtId',
  'operatingOfficeAddress.localGovernmentId',
  'operatingOfficeAddress.wardNo',
  'operatingOfficeAddress.locality',
  'operatingOfficeAddress.houseNo',
  'operatingOfficeAddress.coordinates',
];

const branchOfficeAddress = [
  'branchOfficeAddress.provinceId',
  'branchOfficeAddress.districtId',
  'branchOfficeAddress.localGovernmentId',
  'branchOfficeAddress.wardNo',
  'branchOfficeAddress.locality',
  'branchOfficeAddress.houseNo',
  'branchOfficeAddress.coordinates',
];

const contactDetails = [
  'phone',
  'fax',
  'contactEmail',
  'website',
  'postBoxNo',
  'lastAgmDate',
  'noOfEmployee',
];
const BankAccDetails = ['nameOfBank', 'accountNumber', 'accountName'];

const applicant = [
  'applicantName',
  'applicantDesignationEn',
  'applicantEmail',
  'applicantContactNo',
  'applicantPanNo',
  'applicantPermanentAddress.provinceId',
  'applicantPermanentAddress.districtId',
  'applicantPermanentAddress.localGovernmentId',
  'applicantPermanentAddress.wardNo',
  'applicantPermanentAddress.locality',
  'applicantPermanentAddress.houseNo',
  'applicantPermanentAddress.coordinates',
  'applicantIsPermanentAndTemporaryAddrSame',
  'applicantTemporaryAddress.provinceId',
  'applicantTemporaryAddress.districtId',
  'applicantTemporaryAddress.localGovernmentId',
  'applicantTemporaryAddress.wardNo',
  'applicantTemporaryAddress.locality',
  'applicantTemporaryAddress.houseNo',
  'applicantTemporaryAddress.coordinates',
  'applicantSign',
  'applicantStamp',
];

const cooperativeMemberInformation = [
  'noOfMaleMemberCurrent',
  'noOfMaleMemberTarget',
  'noOfFemaleMemberCurrent',
  'noOfFemaleMemberTarget',
  'noOfInstitutionalMemberCurrent',
  'noOfInstitutionalMemberTarget',
];

const BoardOfDirectors = [
  'boardOfDirectors.boardOfDirectorsDetails',
  'boardOfDirectors.directordetailsButton',
  'boardOfDirectors.fullName',
  'boardOfDirectors.designationEn',
  'boardOfDirectors.permanentAddress.provinceId',
  'boardOfDirectors.permanentAddress.districtId',
  'boardOfDirectors.permanentAddress.localGovernmentId',
  'boardOfDirectors.permanentAddress.wardNo',
  'boardOfDirectors.permanentAddress.locality',
  'boardOfDirectors.permanentAddress.houseNo',
  'boardOfDirectors.permanentAddress.coordinates',
  'boardOfDirectors.isPermanentAndTemporaryAddressSame',
  'boardOfDirectors.temporaryAddress.provinceId',
  'boardOfDirectors.temporaryAddress.districtId',
  'boardOfDirectors.temporaryAddress.localGovernmentId',
  'boardOfDirectors.temporaryAddress.wardNo',
  'boardOfDirectors.temporaryAddress.locality',
  'boardOfDirectors.temporaryAddress.houseNo',
  'boardOfDirectors.temporaryAddress.coordinates',
  'boardOfDirectors.dateOfMembership',
  'boardOfDirectors.highestQualification',
  'boardOfDirectors.mobileNumber',
  'boardOfDirectors.email',
  'boardOfDirectors.citizenshipNo',
  'boardOfDirectors.panNo',
  'boardOfDirectors.photograph',
  'boardOfDirectors.identityDocumentPhoto',
  'boardOfDirectorRelatedTrainig',
  'boardOfDirectors.trainingAttended.subjectOfTraining',
  'boardOfDirectors.trainingAttended.dateOfTraining',
  'boardOfDirectors.trainingAttended.trainingOrganization',
];
const AccountOperatorsDetails = [
  'accountOperatorsDetails',
  'accountOperator.accountOperatorButton',
  'accountOperator.fullName',
  'accountOperator.designationEn',
  'accountOperator.permanentAddress.provinceId',
  'accountOperator.permanentAddress.districtId',
  'accountOperator.permanentAddress.localGovernmentId',
  'accountOperator.permanentAddress.wardNo',
  'accountOperator.permanentAddress.locality',
  'accountOperator.permanentAddress.houseNo',
  'accountOperator.permanentAddress.coordinates',
  'accountOperator.isPermanentAndTemporaryAddressSame',
  'accountOperator.temporaryAddress.provinceId',
  'accountOperator.temporaryAddress.districtId',
  'accountOperator.temporaryAddress.localGovernmentId',
  'accountOperator.temporaryAddress.wardNo',
  'accountOperator.temporaryAddress.locality',
  'accountOperator.temporaryAddress.houseNo',
  'accountOperator.temporaryAddress.coordinates',
  'accountOperator.dateOfMembership',
  'accountOperator.highestQualification',
  'accountOperator.mobileNumber',
  'accountOperator.email',
  'accountOperator.citizenshipNo',
  'accountOperator.panNo',
  'accountOperator.photograph',
  'accountOperator.identityDocumentPhoto',
  'accountOperator.relatedTrainingButton',
  'accountOperator.trainingAttended.subjectOfTraining',
  'accountOperator.trainingAttended.dateOfTraining',
  'accountOperator.trainingAttended.trainingOrganization',
];
const centralRepresentative = [
  'centralRepresentativeDetails',
  'isPermanentAndTemporaryAddressSame',
  'centralRepID',
  'centralRepresentative.fullName',
  'centralRepresentative.designationEn',
  'centralRepresentative.permanentAddress.provinceId',
  'centralRepresentative.permanentAddress.districtId',
  'centralRepresentative.permanentAddress.localGovernmentId',
  'centralRepresentative.permanentAddress.wardNo',
  'centralRepresentative.permanentAddress.locality',
  'centralRepresentative.permanentAddress.houseNo',
  'centralRepresentative.permanentAddress.coordinates',
  'centralRepresentative.isPermanentAndTemporaryAddressSame',
  'centralRepresentative.temporaryAddress.provinceId',
  'centralRepresentative.temporaryAddress.districtId',
  'centralRepresentative.temporaryAddress.localGovernmentId',
  'centralRepresentative.temporaryAddress.wardNo',
  'centralRepresentative.temporaryAddress.locality',
  'centralRepresentative.temporaryAddress.houseNo',
  'centralRepresentative.temporaryAddress.coordinates',
  'centralRepresentative.dateOfMembership',
  'centralRepresentative.highestQualification',
  'centralRepresentative.mobileNumber',
  'centralRepresentative.email',
  'centralRepresentative.citizenshipNo',
  'centralRepresentative.panNo',
  'centralRepresentative.photograph',
  'centralRepresentative.identityDocumentPhoto',
  'centralRepresentative.relatedTrainingButton',
  'centralRepresentative.trainingAttended.subjectOfTraining',
  'centralRepresentative.trainingAttended.dateOfTraining',
  'centralRepresentative.trainingAttended.trainingOrganization',
];
const detailMember = ['detailsOfMember'];
const economicDetails = [
  'cashAndCashEquivalentCurrent',
  'cashAndCashEquivalentTarget',
  'bankCurrent',
  'bankTarget',
  'investmentsCurrent',
  'investmentsTarget',
  'loanCurrent',
  'loanTarget',
  'nonCurrentAssetsCurrent',
  'nonCurrentAssetsTarget',
  'otherNonCurrentAssetsCurrent',
  'otherNonCurrentAssetsTarget',
  'totalAssetsCurrent',
  'totalAssetsTarget',
];
const incomeDetails = [
  'shareCapitalCurrent',
  'shareCapitalTarget',
  'reserveAndSurplusCurrent',
  'reserveAndSurplusTarget',
  'savingDepositCurrent',
  'savingDepositTarget',
  'loanAccountCurrent',
  'loanAccountTarget',
  'capitalGrantCurrent',
  'capitalGrantTarget',
  'currentLiabilitiesCurrent',
  'currentLiabilitiesTarget',
  'nonCurrentLiabilitiesCurrent',
  'nonCurrentLiabilitiesTarget',
  'totalEquityAndLiabilitiesCurrent',
  'totalEquityAndLiabilitiesTarget',
];
const cashDetails = [
  'incomeFromFinancialInvestment',
  'incomeFromNonFinancialInvestment',
  'incomeFromInvestment',
  'incomeFromServiceOperation',
  'incomeFromSales',
  'otherIncome',
  'miscellaneousIncome',
  'totalIncome',
];
const ExpenseDetails = [
  'purchase',
  'directExpense',
  'administrativeExpense',
  'financialCost',
  'riskManagementCost',
  'deferredTaxExpense',
  'totalExpense',
];
const weagree = ['declarationAgreement'];
export const getKymSectionCoOperativeUnion = (id: string) => {
  if (BasicInfo.includes(id)) {
    return {
      section: 'organizationInfo',
      subSection: 'kymCoopUnionAccBasicInformation',
    };
  }
  if (registerDetails.includes(id)) {
    return {
      section: 'organizationInfo',
      subSection: 'kymCoopUnionAccRegisteredDetails',
    };
  }
  if (operatingOfficeAddress.includes(id)) {
    return {
      section: 'organizationInfo',
      subSection: 'kymCoopUnionAccOperatingOfficeAddress',
    };
  }
  if (branchOfficeAddress.includes(id)) {
    return {
      section: 'organizationInfo',
      subSection: 'kymCoopUnionAccBranchOfficeAddress',
    };
  }
  if (contactDetails.includes(id)) {
    return {
      section: 'organizationInfo',
      subSection: 'kymCoopUnionAccContactDetails',
    };
  }
  if (BankAccDetails.includes(id)) {
    return {
      section: 'organizationInfo',
      subSection: 'kymCoopUnionAccBankAccountDetails',
    };
  }
  if (applicant.includes(id)) {
    return {
      section: 'organizationInfo',
      subSection: 'kymCoopUnionAccApplicant',
    };
  }
  if (cooperativeMemberInformation.includes(id)) {
    return {
      section: 'organizationInfo',
      subSection: 'kymCoopUnionAccCooperativeMemberInformation',
    };
  }
  if (BoardOfDirectors.includes(id)) {
    return {
      section: 'directorDetails',
      subSection: 'kymCoopUnionAccDetailsofProprietor',
    };
  }
  if (AccountOperatorsDetails.includes(id)) {
    return {
      section: 'accountOperators',
      subSection: 'kymCoopUnionAccDetailsofAccountOperators',
    };
  }
  if (centralRepresentative.includes(id)) {
    return {
      section: 'centralRepresentatives',
      subSection: 'kymCoopUnionAccDetailsofdirectorsaffiliatedwithotherFirms',
    };
  }
  if (
    detailMember.includes(id.split('.')[0]) &&
    id.split('.')[1].includes('Current')
  ) {
    return {
      section: 'memberDetails',
      subSection: 'kymCoopUnionAccCurrentMembers',
    };
  }
  if (detailMember.includes(id.split('.')[0])) {
    return {
      section: 'memberDetails',
      subSection: 'kymCoopUnionAccTargetfornextfiscalyear',
    };
  }
  if (economicDetails.includes(id)) {
    return {
      section: 'economicDetails',
      subSection: 'kymCoopUnionAccAssets',
    };
  }
  if (incomeDetails.includes(id)) {
    return {
      section: 'economicDetails',
      subSection: 'kymCoopUnionAccEquityandLiailibities',
    };
  }

  if (cashDetails.includes(id)) {
    return {
      section: 'economicDetails',
      subSection: 'kymCoopUnionAccIncomeDetails',
    };
  }
  if (ExpenseDetails.includes(id)) {
    return {
      section: 'economicDetails',
      subSection: 'kymCoopUnionAccExpenseDetails',
    };
  }
  if (weagree.includes(id)) {
    return {
      section: 'declaration',
      subSection: 'kymCoopUnionAccAccountHolderDeclaration',
    };
  }
  return {
    section: 'na',
    subSection: 'na',
  };
};
