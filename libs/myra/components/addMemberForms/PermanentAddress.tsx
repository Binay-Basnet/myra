import { DataSchema } from '../form/Form';
import { FormGenerator } from '../form/FormGenerator';
import { Grid } from '../../ui/src/lib/grid/Grid';

export const PermanentAddress = ({ debounced }) => {
  const dataSchema: DataSchema[] = [
    {
      type: 'select',
      name: 'state',
      label: 'State',
      placeholder: 'Select State',
      options: [{ label: 'Bagmati', value: 'Bagmati' }],
    },
    {
      type: 'select',
      name: 'district',
      label: 'District',
      placeholder: 'Enter District',
      options: [
        { label: 'lalitpur', value: 'lalitpur' },
        { label: 'kathmandu', value: 'kathamandu' },
      ],
    },
    {
      type: 'select',
      name: 'vdc',
      label: 'VDC/Muncipality',
      placeholder: 'Enter VDC/Muncipality',
      options: [
        { label: 'lalitpur', value: 'lalitpur' },
        { label: 'kathmandu', value: 'kathamandu' },
      ],
    },
    {
      type: 'input',
      name: 'wardNo',
      label: 'Ward No',
      placeholder: 'Enter Ward no',
    },
    {
      type: 'input',
      name: 'locality',
      label: 'Locality',
      placeholder: 'Enter Locality',
    },
  ];

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
      <FormGenerator
        dataSchema={dataSchema}
        onEachFieldChange={() => {
          debounced();
        }}
      />
    </Grid>
  );
};
