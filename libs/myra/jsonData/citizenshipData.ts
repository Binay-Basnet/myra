export const citizenshipData = {
  title: 'Citizenship Information',
  fields: [
    {
      variant: 'input',
      type: 'number',
      name: 'citizenshipNo',
      label: 'Citizenship No',
      __placeholder: 'Enter CitizenShip No',
    },
    {
      variant: 'input',
      type: 'text',
      name: 'placeOfIssue',
      label: 'Place of Issue',
      __placeholder: 'Enter place of issue',
    },
    {
      variant: 'input',
      type: 'date',
      name: 'citizenIssuedDate',
      label: 'Issued Date',
      __placeholder: 'DD-MM-YYYY',
    },
  ],
};
