import React from 'react';
import { Grid } from '@coop/shared/ui';

import { DataSchema } from '../form/Form';
import { FormGenerator } from '../form/FormGenerator';

export const PermanentAddress = () => {
  type Fields = {
    state: string;
    district: string;
    vdc: string;
    wardNo: string;
    locality: string;
  };
  const dataSchema: DataSchema<Fields>[] = [
    {
      variant: 'select',
      name: 'state',
      label: 'State',
      placeholder: 'Select State',
      options: [{ label: 'Bagmati', value: 'Bagmati' }],
    },
    {
      variant: 'select',
      name: 'district',
      label: 'District',
      placeholder: 'Enter District',
      options: [
        { label: 'lalitpur', value: 'lalitpur' },
        { label: 'kathmandu', value: 'kathamandu' },
      ],
    },
    {
      variant: 'select',
      name: 'vdc',
      label: 'VDC/Muncipality',
      placeholder: 'Enter VDC/Muncipality',
      options: [
        { label: 'lalitpur', value: 'lalitpur' },
        { label: 'kathmandu', value: 'kathamandu' },
      ],
    },
    {
      variant: 'input',
      name: 'wardNo',
      label: 'Ward No',
      placeholder: 'Enter Ward no',
    },
    {
      variant: 'input',
      name: 'locality',
      label: 'Locality',
      placeholder: 'Enter Locality',
    },
  ];

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
      <FormGenerator dataSchema={dataSchema} />
    </Grid>
  );
};
