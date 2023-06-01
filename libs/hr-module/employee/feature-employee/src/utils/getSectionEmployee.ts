const basicInfo = [
  'firstName',
  'lastName',
  'middleName',
  'genderId',
  'dateOfBirth',
  'age',
  'maritalStatusId',
];

const contact = [
  'workPhoneNumber',
  'workEmailAddress',
  'personalPhoneNumber',
  'personalEmailAddress',
];
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
  'sameTempAsPermanentAddress',
  'temporaryAddress.provinceId',
  'temporaryAddress.districtId',
  'temporaryAddress.localGovernmentId',
  'temporaryAddress.wardNo',
  'temporaryAddress.locality',
  'temporaryAddress.houseNo',
  'temporaryAddress.coordinates',
];

const workInformation = [
  'departmentId',
  'designationId',
  'branchId',
  'employmentTypeId',
  'employmentStatus',
  'sourceOfHire',
];
const joiningDetails = ['jobApplication'];
const workExperience = ['workExperience'];
const salaryDetails = ['salaryPaymentMode', 'pan', 'pfAccount', 'salaryStructure'];
const approvers = ['reportsToId', 'leaveApproverId', 'expenseApproverId'];
const healthInsurance = ['healthInsuranceProviderId', 'healthInsuranceNumberId'];

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
      section: 'Permanent Address',
      subSection: 'Permanent Address',
    };
  }
  if (temporaryAddress.includes(id)) {
    return {
      section: 'personalDetails',
      subSection: 'Temporary Address',
    };
  }
  if (workInformation.includes(id)) {
    return {
      section: 'professionalDetails',
      subSection: 'Work Information',
    };
  }
  if (joiningDetails.includes(id)) {
    return {
      section: 'professionalDetails',
      subSection: 'Joining Details',
    };
  }
  if (workExperience.includes(id.split('.')[0])) {
    return {
      section: 'professionalDetails',
      subSection: 'Work Experience',
    };
  }
  if (salaryDetails.includes(id)) {
    return {
      section: 'professionalDetails',
      subSection: 'Salary Info',
    };
  }
  if (approvers.includes(id)) {
    return {
      section: 'Configurations',
      subSection: 'Approvers',
    };
  }
  if (healthInsurance.includes(id)) {
    return {
      section: 'Configurations',
      subSection: 'Employee Health Insurance',
    };
  }
  return undefined;
};
