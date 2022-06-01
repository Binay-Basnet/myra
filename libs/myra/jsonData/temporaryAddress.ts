export const permanentAddress = {
  title: 'Permanent Address Information',
  fields: [
    {
      variant: 'select',
      name: 'temporaryState',
      label: 'State',
      placeholder: 'Select State',
      options: [{ label: 'Bagmati', value: 'Bagmati' }],
    },
    {
      variant: 'select',
      name: 'temporaryDistrict',
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
      name: 'temporaryVdc',
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
      name: 'temporaryWardNo',
      label: 'Ward No',
      placeholder: 'Enter Ward No',
    },
    {
      variant: 'input',
      type: 'text',
      name: 'temporaryLocality',
      label: 'Locality',
      placeholder: 'Enter Locality',
    },
  ],
};
