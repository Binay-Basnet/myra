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
const BoardOfDirectors = ['boardOfDirectorsDetails', 'directordetailsButton'];
const AccountOperatorsDetails = [
  'accountOperatorsDetails',
  'accountOperatorButton',
];
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
      subSection: 'kymCoopUnionAccBasicInformation',
    };
  }
  if (registerDetails.includes(id)) {
    return {
      section: 'organizationInfo',
      subSection: 'kymCoopUnionAccRegisteredDetails',
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
  if (BoardOfDirectors.includes(id.split('.')[0])) {
    return {
      section: 'directorDetails',
      subSection: 'kymCoopUnionAccDetailsofProprietor',
    };
  }
  if (AccountOperatorsDetails.includes(id.split('.')[0])) {
    return {
      section: 'accountOperators',
      subSection: 'kymCoopUnionAccDetailsofAccountOperators',
    };
  }
  if (centralRepresentative.includes(id.split('.')[0])) {
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
  return;
};
