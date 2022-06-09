const basicInfo = [
  'firstName',
  'middleName',
  'lastName',
  'genderId',
  'dateOfBirth',
  'ethnicityId',
  'nationalityId',
  'educationalId',
  'religionId',
];

const contact = ['phoneNumber', 'mobileNumber', 'email'];

const profession = ['profession'];
const mainOccupation = ['mainOccupation'];
const spouceOccupation = ['spouseOccupation'];
const incomeSource = ['incomeSourceDetails'];

export const getKymSection = (id: string) => {
  if (basicInfo.includes(id)) {
    return { section: 'personalDetails', subSection: 'basicInfo' };
  }
  if (contact.includes(id)) {
    return { section: 'personalDetails', subSection: 'contactInfo' };
  }
  if (profession.includes(id)) {
    return { section: 'professionalDetails', subSection: 'profession' };
  }
  if (mainOccupation.includes(id.split('.')[0])) {
    return { section: 'professionalDetails', subSection: 'mainOccupation' };
  }
  if (spouceOccupation.includes(id.split('.')[0])) {
    return { section: 'professionalDetails', subSection: 'spouceOccupation' };
  }
  if (incomeSource.includes(id.split('.')[0])) {
    return { section: 'professionalDetails', subSection: 'incomeSource' };
  }

  return;
};
