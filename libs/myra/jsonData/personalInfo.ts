export const personalInfo = {
  title: 'Basic Information',
  id: 'basic_information',
  fields: [
    {
      variant: 'input',
      type: 'text',
      name: 'firstName',
      label: 'First Name',
      placeholder: 'Enter first name',
    },
    {
      variant: 'input',
      type: 'text',
      name: 'middleName',
      label: 'Middle Name',
      placeholder: 'Enter middle name',
    },
    {
      variant: 'input',
      type: 'text',
      name: 'lastName',
      label: 'Last Name',
      placeholder: 'Enter last name',
    },
    {
      variant: 'select',
      name: 'gender',
      label: 'Gender',
      placeholder: 'Select gender',
      options: [
        { label: 'male', value: 'male' },
        { label: 'female', value: 'female' },
        { label: 'other', value: 'other' },
      ],
    },
    {
      variant: 'input',
      type: 'date',
      name: 'dateOfBirthBs',
      label: 'Date of Birth(B.S)',
      placeholder: 'DD-MM-YYYY',
    },
    {
      variant: 'input',
      type: 'date',
      name: 'dateOfBirth',
      label: 'Date of Birth(A.D)',
      placeholder: 'DD-MM-YYYY',
    },
    {
      variant: 'input',
      type: 'text',
      name: 'nationality',
      label: 'Nationality',
      placeholder: 'Enter Nationality',
    },
    {
      variant: 'select',
      name: 'educationQualification',
      label: 'Educational Qualification',
      placeholder: 'Select Educational Qualification',
      options: [
        { label: '10', value: 'ten' },
        { label: '12', value: 'twelve' },
        { label: 'Graduate', value: 'graduate' },
        { label: 'Post Graduate', value: 'postGraduate' },
        { label: 'Doctorate', value: 'doctorate' },
      ],
    },
    {
      variant: 'select',
      name: 'religion',
      label: 'Religion',
      placeholder: 'Select Religion',
      options: [
        { label: 'Christain', value: 'christain' },
        { label: 'Hindu', value: 'hindu' },
        { label: 'Muslim', value: 'muslim' },
        { label: 'Buddhism', value: 'buddhism' },
      ],
    },
  ],
};
