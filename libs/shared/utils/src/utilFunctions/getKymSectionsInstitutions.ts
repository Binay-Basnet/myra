const InstitutionalInfo = [
  'institutionName',
  'institutionType',
  'natureOfBusiness',
  'registrationDate',
  'vatOrPanNo',
  'operatingOfficeAddress',
  'noOfBranches',
  'branchOfficeAddress',
];

const Registerdetails = [
  'registeredDetailsInstitution',
  'registeredAddress',
  'registeredAddressIfChanged',
  'registeredNumber',
  'issuingOffice',
];
const contactDetails = [
  'phone',
  'fax',
  'email',
  'website',
  'postBoxNo',
  'numberOfEmployee',
  'dateOfLastAGM',
];

const operatorOfficeAddress = [
  'operatorOfficeProvinceId',
  'operatorOfficeDistrictId',
  'operatorOfficeLocalityId',
  'operatorOfficeWardId',
  'operatorOfficeTole',
  'operatorOfficeHouseNo',
  'operatingOfficeAddress',
];

const branchOfficeAddress = [
  'branchOfficeProvinceId',
  'branchOfficeDistrictId',
  'branchOfficeLocalityId',
  'branchOfficeWard',
  'branchOfficeTole',
  'branchOfficeHouseNo',
  'branchOfficeAddress',
];

const TransactionDetails = [
  'natureOfTransaction',
  'annualTurnover',

  'institutionTransactionProfile',
];
const monthlyTurnover = [
  'Less than 20 Lakhs',
  'Less than 50 Lakhs',
  'Above 50 Lakhs',
];
const monthlyTransactions = ['Less than 10', 'Less than 25', 'Above 25'];
const sisterConcern = [
  'sisterConcernDetails',
  'sisterConcernButton',
  'sisterConcernsDetails',
];

const BankAccDetails = ['bank', 'accountNumber', 'accountName'];
const directorDetails = [
  'detailsOfDirectors',
  'addDirectorButton',
  'isPermanentAndTemporaryAddressSame',
  'DirectorInstitutionId',
];
const directoswithAffiliation = [
  'detailsOfDirectorsWithAffiliation',
  'newDetailButton',
  'DirectorInstitutionAffiliationId',
];

const accountOperator = [
  'accountOperatorsDetails',
  'accountOperatorDetailsButton',
  'accountOperatorReset',
  'accountOperatorClose',
  'AccountOperatorInstitution',
];
const accountInstruction = [
  'accountType',
  'specialInstruction',
  'isCompanyStampCompulsory',
];
const accontDecleration = [
  'accountHolderName',
  'accountHolderPhone',
  'accountHolderEmail',
  'accountHolderAddress',
  'accountHolderProvinceId',
  'accountHolderDistrictId',
  'accountHolderMunicipality',
  'accountHolderWardNo',
  'accountHolderLocality',
  'weAgree',
];

export const getKymSectionInstitution = (id: string) => {
  if (InstitutionalInfo.includes(id)) {
    return {
      section: 'organizationInfo',
      subSection: 'kymInsBasicInformation',
    };
  }
  if (Registerdetails.includes(id.split('.')[0])) {
    return {
      section: 'organizationInfo',
      subSection: 'kymInsRegisteredDetails',
    };
  }

  if (operatorOfficeAddress.includes(id.split('.')[0])) {
    return {
      section: 'organizationInfo',
      subSection: 'kymInsOperatorOfficeAddress',
    };
  }

  if (branchOfficeAddress.includes(id.split('.')[0])) {
    return {
      section: 'organizationInfo',
      subSection: 'kymInsbranchOfficeAddress',
    };
  }

  if (contactDetails.includes(id)) {
    return {
      section: 'organizationInfo',
      subSection: 'kymInsContactDetails',
    };
  }
  if (BankAccDetails.includes(id)) {
    return {
      section: 'organizationInfo',
      subSection: 'kymInsBankAccountDetails',
    };
  }
  if (sisterConcern.includes(id.split('.')[0])) {
    return {
      section: 'organizationInfo',
      subSection: 'kymInsDetailsofsisterconcern',
    };
  }
  if (TransactionDetails.includes(id.split('.')[0])) {
    return {
      section: 'transactionProfile',
      subSection: 'kymInsTransactionProfile',
    };
  }
  if (TransactionDetails.includes(id.split('.')[0])) {
    return {
      section: 'transactionProfile',
      subSection: 'kymInsTransactionProfile',
    };
  }
  if (monthlyTurnover.includes(id.split('.')[0])) {
    return {
      section: 'transactionProfile',
      subSection: 'kymInsExpectedMonthlyTurnover',
    };
  }
  if (monthlyTransactions.includes(id.split('.')[0])) {
    return {
      section: 'transactionProfile',
      subSection: 'kymInsExpectedMonthlyTransaction',
    };
  }
  if (directorDetails.includes(id.split('.')[0])) {
    return {
      section: 'details',
      subSection: 'kymInsDetailsofProprietorPartnersDirectors',
    };
  }

  if (directoswithAffiliation.includes(id.split('.')[0])) {
    return {
      section: 'details',
      subSection: 'kymInsDetailsofdirectorsaffiliatedwithotherFirms',
    };
  }
  if (accountOperator.includes(id.split('.')[0])) {
    return {
      section: 'accountOperations',
      subSection: 'kymInsDetailsofAccountOperators',
    };
  }
  if (accountOperator.includes(id.split('.')[0])) {
    return {
      section: 'accountOperations',
      subSection: 'kymInsDetailsofAccountOperators',
    };
  }
  if (accountInstruction.includes(id.split('-')[0])) {
    return {
      section: 'accountOperations',
      subSection: 'kymInsAccountOperationInstruction',
    };
  }
  if (accontDecleration.includes(id.split('.')[0])) {
    return {
      section: 'declaration',
      subSection: 'kymInsAccountHolderDeclaration',
    };
  }

  return;
};
