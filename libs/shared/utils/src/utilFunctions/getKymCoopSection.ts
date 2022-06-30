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
const representative = [
  'representativeFullName',
  'representativeDesignatiton',
  'representativeEmail',
  'representativeContact',
  'representativePanOrVatNo',
  'representativePermanentStateID',
  'representativePermanentDistrictId',
  'representativePermanentLocalityId',
  'representativePermanentWardId',
  'representativePermanentTole',
  'representativePermanentHouseNo',
  'isPermanentAndTemporaryAddressRepresentativeSame',
  'representativeTemporaryStateId',
  'representativeTemporaryDistrictId',
  'representativeTemporaryStateId',
  'representativeTemporaryDistrictId',
  'representativeTemporaryLocalityId',
  'representativeTemporaryWardId',
  'representativeTemporaryTole',
  'representativeTemporaryHouseNo',
  'representativeTemporaryAddressLocation',
  'representativePermanentAddressLocation',
  'representativeTemporaryAddressLocation',
];
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

const boardOfDirectorrDetails = [
  'boardOfDirectorsDetails',
  'directorButton',
  'kymCOOPdirectorResetButton',
  'kymCOOPdirectorRemoveButton',
  'boardDirectorCloseIcon',
];
const accountOperatorDetail = [
  'accountOperatorsDetails',
  'accountOperatorButton',
  'accountOperatorResetButton',
  'accountOperatorCloseButton',
  'accountOperatorCloseIcon',
];

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
      subSection: 'kymCoopAccBasicInformation',
    };
  }
  if (registeredAddress.includes(id)) {
    return {
      section: 'organaizationDetails',
      subSection: 'kymCoopAccRegisteredAddress',
    };
  }
  if (operatingAddress.includes(id)) {
    return {
      section: 'organaizationDetails',
      subSection: 'kymCoopAccOperatingAddress',
    };
  }
  if (contactDetails.includes(id)) {
    return {
      section: 'organaizationDetails',
      subSection: 'kymCoopAccContactDetails',
    };
  }
  if (currentMembers.includes(id)) {
    return {
      section: 'organaizationDetails',
      subSection: 'kymCoopAccCurrentMembers',
    };
  }
  if (cooperativeDate.includes(id)) {
    return {
      section: 'organaizationDetails',
      subSection: 'kymCoopAccCooperativeDate',
    };
  }
  if (representative.includes(id)) {
    return {
      section: 'organaizationDetails',
      subSection: 'kymCoopAccRepresentative',
    };
  }
  if (coopAddressDetails.includes(id)) {
    return {
      section: 'organaizationDetails',
      subSection: 'kymCoopAccAdditionalCoorperativeDetails',
    };
  }
  if (numOfEmployee.includes(id)) {
    return {
      section: 'organaizationDetails',
      subSection: 'kymCoopAccNumberofEmployee',
    };
  }

  if (cooperativeDate.includes(id)) {
    return {
      section: 'cooperativeDate',
      subSection: 'kymCoopAccCooperativeDate',
    };
  }

  // economic details
  if (equityAndLiabilities.includes(id)) {
    return {
      section: 'economicDetails',
      subSection: 'kymCoopAccEquityandLiabilities',
    };
  }
  if (assets.includes(id)) {
    return {
      section: 'economicDetails',
      subSection: 'kymCoopAccAssets',
    };
  }

  // Details of Board Directors
  if (boardOfDirectorrDetails.includes(id.split('.')[0])) {
    return {
      section: 'boardOfDirectorsDetails',
      subSection: 'kymCoopAccBoardOfDirectorDetails',
    };
  }

  // Details of Account Operators
  if (accountOperatorDetail.includes(id.split('.')[0])) {
    return {
      section: 'accountOperatorDetails',
      subSection: 'kymCoopAccAccountOperatorDetail',
    };
  }

  // Declaration
  if (accountHolderDeclaration.includes(id)) {
    return {
      section: 'declaration',
      subSection: 'kymCoopAccAccountHolderDeclaration',
    };
  }
  if (documentDeclaration.includes(id)) {
    return {
      section: 'declaration',
      subSection: 'kymCoopAccDocumentDeclaration',
    };
  }

  return;
};
