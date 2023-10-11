const basicInfo = [
  'firstName',
  'lastName',
  'middleName',
  'gender',
  'age',
  'dateOfBirth',
  'maritalStatus',
  'ethnicity',
  'bloodGroup',
  'Handicapped',
];

const contact = ['workPhoneNumber', 'workEmailAddress', 'personalPhoneNumber'];
const permanentAddress = [
  'permanentAddress.provinceId',
  'permanentAddress.districtId',
  'permanentAddress.localGovernmentId',
  'permanentAddress.wardNo',
  'permanentAddress.locality',
  'permanentAddress.houseNo',
  'permanentAddress.coordinates',
];
const temporaryAddress = [
  'isTemporarySameAsPermanent',
  'temporaryAddress.provinceId',
  'temporaryAddress.districtId',
  'temporaryAddress.localGovernmentId',
  'temporaryAddress.wardNo',
  'temporaryAddress.locality',
  'temporaryAddress.houseNo',
  'temporaryAddress.coordinates',
];

const familyDetails = ['fullName', 'relation', 'occupation'];
const educationDetails = ['instituteName', 'degree_diploma', 'durationInYrs', 'grade', 'dateOfCompletion'];

const workInformation = [
  'departmentId',
  'designationId',
  'employeeClass',
  'employeeLevelId',
  'serviceCenter',
  'employmentType',
  'employeeStatus',
  'sourceOfHire',
  'referralBy',
  'joiningDate',
];

const identificationDetails = [
  'identificationSelection',
  'citizenship.id',
  'citizenship.placeOfIssue',
  'citizenship.issuedDate',
  'drivingLicense.id',
  'drivingLicense.placeOfIssue',
  'drivingLicense.issuedDate',
];

const payrollSetup = [
  'payGroup',
  'panNumber',
  'salaryStructureId',
  'salaryPaymentMode',
  'account',
  'bank',
  'accountName',
  'accountNumber',
];

const otherScheme = [
  'otherSchemes',
  'providentNumber',
  'nominee',
  'relationWithNominee',
  'ssfNumber',
  'citNumber',
  'citCode',
  'noCitDeduction',
];

const configurations = ['supervisor'];

const documents = [
  'documents.0.identifiers',
  'documents.1.identifiers',
  'documents.2.identifiers',
  'documents.3.identifiers',
];

export const getEmployeeSection = (id: string) => {
  if (basicInfo.includes(id)) {
    return {
      section: 'personalDetails',
      subSection: 'Personal Information',
    };
  }
  if (contact.includes(id)) {
    return {
      section: 'personalDetails',
      subSection: 'Contact Details',
    };
  }
  if (permanentAddress.includes(id)) {
    return {
      section: 'personalDetails',
      subSection: 'Permanent Address',
    };
  }
  if (temporaryAddress.includes(id)) {
    return {
      section: 'personalDetails',
      subSection: 'Temporary Address',
    };
  }
  if (identificationDetails.includes(id)) {
    return {
      section: 'personalDetails',
      subSection: 'Identification Details',
    };
  }
  if (familyDetails.includes(id) || familyDetails.includes(id.split('.')[2])) {
    return {
      section: 'personalDetails',
      subSection: 'Family Details',
    };
  }
  if (educationDetails.includes(id) || educationDetails.includes(id.split('.')[2])) {
    return {
      section: 'personalDetails',
      subSection: 'Educational Information',
    };
  }
  if (workInformation.includes(id)) {
    return {
      section: 'professionalDetails',
      subSection: 'Work Information',
    };
  }
  if (payrollSetup.includes(id)) {
    return {
      section: 'setups',
      subSection: 'Payroll Setup',
    };
  }
  if (otherScheme.includes(id)) {
    return {
      section: 'setups',
      subSection: 'Other Schemes',
    };
  }
  if (configurations.includes(id)) {
    return {
      section: 'setups',
      subSection: 'Configurations',
    };
  }
  if (documents.includes(id)) {
    return {
      section: 'declaration',
      subSection: 'Documents Declarations',
    };
  }
  return undefined;
};
