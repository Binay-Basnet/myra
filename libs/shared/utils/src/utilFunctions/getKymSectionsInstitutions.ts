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
  'registeredAddress',
  'registeredAddressIfChanged',
  'registeredNumber',
  'issuingOffice',
  'registeredProvinceId',
  'registeredDistrictId',
  'registeredLocalityId',
  'registeredWardId',
  'registeredTole',
  'registeredHouseNo',
  'registeredInstitutionLocation',
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
];

const branchOfficeAddress = [
  'branchOfficeProvinceId',
  'branchOfficeDistrictId',
  'branchOfficeLocalityId',
  'branchOfficeWard',
  'branchOfficeTole',
  'branchOfficeHouseNo',
];

const TransactionDetails = [
  'natureOfTransaction',
  'annualTurnover',
  'initialDepositAmount',
];
const monthlyTurnover = [
  'Less than 20 Lakhs',
  'Less than 50 Lakhs',
  'Above 50 Lakhs',
];
const monthlyTransactions = ['Less than 10', 'Less than 25', 'Above 25'];
const sisterConcern = ['sisterConcernDetails', 'sisterConcernButton'];

const BankAccDetails = ['bank', 'accountNumber', 'accountName'];
const directorDetails = [
  'detailsOfDirectors',
  'addDirectorButton',
  'isPermanentAndTemporaryAddressSame',
];
const directoswithAffiliation = [
  'detailsOfDirectorsWithAffiliation',
  'newDetailButton',
];

const accountOperator = [
  'accountOperatorsDetails',
  'accountOperatorDetailsButton',
  'accountOperatorReset',
  'accountOperatorClose',
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
  if (Registerdetails.includes(id)) {
    return {
      section: 'organizationInfo',
      subSection: 'kymInsRegisteredDetails',
    };
  }

  if (operatorOfficeAddress.includes(id)) {
    return {
      section: 'organizationInfo',
      subSection: 'kymInsOperatorOfficeAddress',
    };
  }

  if (branchOfficeAddress.includes(id)) {
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
