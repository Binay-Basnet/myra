const basicInfo = [
  'firstName',
  'lastName',
  'middleName',
  'genderId',
  'dateOfBirth',
  'age',
  'maritalStatusId',
];

const contact = ['phoneNumber', 'mobileNumber', 'email'];

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
  return undefined;
};
