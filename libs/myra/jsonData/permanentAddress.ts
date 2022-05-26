export const permanentAddress = {
  title: 'Permanent Address Information',
  fields: [
    {
      variant: 'select',
      name: 'permanentState',
      label: 'State',
      placeholder: 'Select State',
      options: [{ label: 'Bagmati', value: 'Bagmati' }],
    },
    {
      variant: 'select',
      name: 'permanentDistrict',
      label: 'District',
      placeholder: 'Select District',
      option: [
        { label: 'Lalitpur', value: 'Lalitpur' },
        { label: 'Kathmandu', value: 'Kathmandu' },
        { label: 'Bhaktapur', value: 'Bhaktapur' },
      ],
    },
    {
      variant: 'select',
      name: 'permanentVdc',
      label: 'VDC/ Muncipality',
      placeholder: 'Select VDC/ Muncipality',
      option: [
        { label: 'Lalitpur-16', value: 'Lalitpur-16' },
        { label: 'Kathmandu-6', value: 'Kathmandu-6' },
        { label: 'Bhaktapur-2', value: 'Bhaktapur-2' },
      ],
    },
    {
      variant: 'input',
      type: 'text',
      name: 'permanentWardNo',
      label: 'Ward No',
      placeholder: 'Enter Ward No',
    },
    {
      variant: 'input',
      type: 'text',
      name: 'permanentLocality',
      label: 'Locality',
      placeholder: 'Enter Locality',
    },
  ],
};
