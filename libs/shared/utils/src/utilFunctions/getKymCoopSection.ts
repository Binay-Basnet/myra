// organization detail
const basicInfo = [
  'nameOfOrganization',
  'regdNumber',
  'regdOffice',
  'regdDate',
];

const registeredAddress = [
  'regdProvinceId',
  'regdDistrictId',
  'regdMunicipalityId',
  'regdWardId',
  'regdLocality',
];

const operatingAddress = [
  'oprProvinceId',
  'oprDistrictId',
  'oprMunicipalityId',
  'oprWardId',
  'oprLocality',
];

const contactDetails = ['email', 'website', 'contactNumber'];
const currentMembers = [
  'noOfMaleMembers',
  'noOfFemaleMembers',
  'noOfOtherMembers',
];
const representative = ['representativeFullName', 'representativeDesignatiton'];
const coopAddressDetails = ['economicDetailType', 'mainServiceProduct'];
const numOfEmployee = [
  'noOfMaleEmployee',
  'noOfFemaleEmloyee',
  'totalEmployee',
];
const cooperativeDate = ['lastAuditDate', 'lastAgmDate'];

// economic details
const equityAndLiabilities = [
  'shareCapital',
  'reserveAndSurplus',
  'savingDeposit',
  'loanAccount',
  'capitalGrant',
  'currentLiabilities',
  'nonCurrentLiabilities',
  'totalEquityAndLiabilities',
];

const assets = [
  'cashAndCashEquivalent',
  'bank',
  'investments',
  'loan',
  'currentAssets',
  'nonCurrentAssets',
  'totalAssets',
];

// Details of Board Directors

const boardOfDirectorrDetails = ['boardOfDirectorsDetails'];
const accountOperatorDetail = ['accountOperatorsDetails'];

const accountHolderDeclaration = [
  'passportSizePhoto',
  'signaturePhoto',
  'citizenshipPhoto',
  'fingerprintPhoto',
  'citizenshipPhoto',
];

const documentDeclaration = [
  'accountHoldersName',
  'Signature',
  'accountHolderStamp',
];

export const getKymCoopSection = (id: string) => {
  // organization details
  if (basicInfo.includes(id)) {
    return {
      section: 'organaizationDetails',
      subSection: 'Basic Information',
    };
  }
  if (registeredAddress.includes(id)) {
    return {
      section: 'organaizationDetails',
      subSection: 'Registered Address',
    };
  }
  if (operatingAddress.includes(id)) {
    return {
      section: 'organaizationDetails',
      subSection: 'Operating Address',
    };
  }
  if (contactDetails.includes(id)) {
    return { section: 'organaizationDetails', subSection: 'Contact Details' };
  }
  if (currentMembers.includes(id)) {
    return { section: 'organaizationDetails', subSection: 'Current Members' };
  }
  if (cooperativeDate.includes(id)) {
    return { section: 'organaizationDetails', subSection: 'Cooperative Date' };
  }
  if (representative.includes(id)) {
    return {
      section: 'organaizationDetails',
      subSection: 'Representative',
    };
  }
  if (coopAddressDetails.includes(id)) {
    return {
      section: 'organaizationDetails',
      subSection: 'Additional Coorperative Details',
    };
  }
  if (numOfEmployee.includes(id)) {
    return {
      section: 'organaizationDetails',
      subSection: 'Number of Employee',
    };
  }

  if (cooperativeDate.includes(id)) {
    return {
      section: 'cooperativeDate',
      subSection: 'Cooperative Date',
    };
  }

  // economic details
  if (equityAndLiabilities.includes(id)) {
    return {
      section: 'economicDetails',
      subSection: 'Equity and Liabilities',
    };
  }
  if (assets.includes(id)) {
    return {
      section: 'economicDetails',
      subSection: 'Assets',
    };
  }

  // Details of Board Directors
  if (boardOfDirectorrDetails.includes(id.split('.')[0])) {
    return {
      section: 'boardOfDirectorsDetails',
      subSection: 'Board Of Director Details',
    };
  }

  // Details of Account Operators
  if (accountOperatorDetail.includes(id.split('.')[0])) {
    return {
      section: 'accountOperatorDetails',
      subSection: 'Account Operator Detail',
    };
  }

  // Declaration
  if (accountHolderDeclaration.includes(id)) {
    return {
      section: 'declaration',
      subSection: 'Account Holder Declaration',
    };
  }
  if (documentDeclaration.includes(id)) {
    return {
      section: 'declaration',
      subSection: 'Document Declaration',
    };
  }

  return;
};
