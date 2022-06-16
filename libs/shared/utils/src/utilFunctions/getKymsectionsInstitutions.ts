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
const TransactionDetails = [
  'natureOfTransaction',
  'annualTurnover',
  'initialDepositAmount',
];
const monthlyTurnover = [
  'Less than 5 Lakhs0',
  'Less than 10 Lakhs1',
  'Above 10 Lakhs2',
];
const monthlyTransactions = [
  'Less than 10 Lakhs0',
  'Less than 25 Lakhs1',
  'Above 25 Lakhs2',
];
const sisterConcern = ['sisterConcernDetails'];

const BankAccDetails = ['bank', 'accountNumber', 'accountName'];
const directorDetails = ['boardOfDirectorsDetails'];
const directoswithAffiliation = ['detailsOfDirectorsWithAffiliation'];

const accountOperator = ['accountOperatorsDetails'];
const accountInstruction = [
  'accountType',
  'specialInstruction',
  'isCompanyStampCompulsory',
];
const accontDecleration = ['accountHolderName', 'weAgree'];
export const getKymSectionInstitution = (id: string) => {
  if (InstitutionalInfo.includes(id)) {
    return {
      section: 'organizationInfo',
      subSection: 'Basic Information',
    };
  }
  if (Registerdetails.includes(id)) {
    return {
      section: 'organizationInfo',
      subSection: 'Registered Details',
    };
  }
  if (contactDetails.includes(id)) {
    return {
      section: 'organizationInfo',
      subSection: 'Contact Details',
    };
  }
  if (BankAccDetails.includes(id)) {
    return {
      section: 'organizationInfo',
      subSection: 'Bank Account Details',
    };
  }
  if (sisterConcern.includes(id.split('.')[0])) {
    return {
      section: 'organizationInfo',
      subSection: 'Details of sister concern',
    };
  }
  if (TransactionDetails.includes(id.split('.')[0])) {
    return {
      section: 'transactionProfile',
      subSection: 'Transaction Profile',
    };
  }
  if (TransactionDetails.includes(id.split('.')[0])) {
    return {
      section: 'transactionProfile',
      subSection: 'Transaction Profile',
    };
  }
  if (monthlyTurnover.includes(id.split('.')[0])) {
    return {
      section: 'transactionProfile',
      subSection: 'Expected Monthly Turnover',
    };
  }
  if (monthlyTransactions.includes(id.split('.')[0])) {
    return {
      section: 'transactionProfile',
      subSection: 'Expected Monthly Transaction',
    };
  }
  if (directorDetails.includes(id.split('.')[0])) {
    return {
      section: 'details',
      subSection: 'Details of Proprietor, Partners, Directors.',
    };
  }

  if (directoswithAffiliation.includes(id.split('.')[0])) {
    return {
      section: 'details',
      subSection: 'Details of directors affiliated with other Firms',
    };
  }
  if (accountOperator.includes(id.split('.')[0])) {
    return {
      section: 'accountOperations',
      subSection: 'Details of Account Operators',
    };
  }
  if (accountOperator.includes(id.split('.')[0])) {
    return {
      section: 'accountOperations',
      subSection: 'Details of Account Operators',
    };
  }
  if (accountInstruction.includes(id.split('-')[0])) {
    return {
      section: 'accountOperations',
      subSection: 'Account Operation Instruction',
    };
  }
  if (accontDecleration.includes(id.split('.')[0])) {
    return {
      section: 'declaration',
      subSection: 'Account Holder Declaration',
    };
  }

  return;
};
