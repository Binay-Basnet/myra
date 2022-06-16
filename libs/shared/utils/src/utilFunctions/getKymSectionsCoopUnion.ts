const BasicInfo = [
  'nameOfInstitution',
  'institutionType',
  'natureOfBusiness',
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
];
const contactDetails = [
  'phone',
  'fax',
  'contactEmail',
  'website',
  'postBoxNo',
  'lastAgmDate',
  'noOfEmployees',
];
const BankAccDetails = [
  'nameOfBank',
  'accountNumber',
  'accountName',
  'applicantName',
  'applicantDesignation',
];
const BoardOfDirectors = ['boardOfDirectorsDetails'];
const AccountOperatorsDetails = ['accountOperatorsDetails'];
const centralRepresentative = ['centralRepresentativeDetails'];
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
  'miscellnousIncome',
  'totalIncome',
];
const ExpenseDetails = [
  'purchase',
  'directExpense',
  'administrativeExpense',
  'financialCost',
  'riskManangementCost',
  'deferredTaxExpense',
  'totalExpense',
];
const weagree = ['weAgree'];
export const getKymSectionCoOperativeUnion = (id: string) => {
  if (BasicInfo.includes(id)) {
    return {
      section: 'organizationInfo',
      subSection: 'Basic Information',
    };
  }
  if (registerDetails.includes(id)) {
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
  if (BoardOfDirectors.includes(id.split('.')[0])) {
    return {
      section: 'directorDetails',
      subSection: 'Details of Proprietor, Partners, Directors.',
    };
  }
  if (AccountOperatorsDetails.includes(id.split('.')[0])) {
    return {
      section: 'accountOperators',
      subSection: 'Details of Proprietor, Partners, Directors.',
    };
  }
  if (centralRepresentative.includes(id.split('.')[0])) {
    return {
      section: 'centralRepresentatives',
      subSection: 'Details of directors affiliated with other Firms',
    };
  }
  if (
    detailMember.includes(id.split('.')[0]) &&
    id.split('.')[1].includes('Current')
  ) {
    return {
      section: 'memberDetails',
      subSection: 'Current Members',
    };
  }
  if (detailMember.includes(id.split('.')[0])) {
    return {
      section: 'memberDetails',
      subSection: 'Target for next fiscal year',
    };
  }
  if (economicDetails.includes(id)) {
    return {
      section: 'economicDetails',
      subSection: 'Assets',
    };
  }
  if (incomeDetails.includes(id)) {
    return {
      section: 'economicDetails',
      subSection: 'Equity and Liailibities',
    };
  }

  if (cashDetails.includes(id)) {
    return {
      section: 'economicDetails',
      subSection: 'Income Details',
    };
  }
  if (ExpenseDetails.includes(id)) {
    return {
      section: 'economicDetails',
      subSection: 'Expense Details',
    };
  }
  if (weagree.includes(id)) {
    return {
      section: 'declaration',
      subSection: 'Account Holder Declaration',
    };
  }
  return;
};
