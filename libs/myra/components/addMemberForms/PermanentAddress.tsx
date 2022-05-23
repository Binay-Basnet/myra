import { DataSchema } from '../form/Form';
import { FormGenerator } from '../form/FormGenerator';
import { Grid } from '../../ui/src/lib/grid/Grid';

export const PermanentAddress = ({ debounced }) => {
  const dataSchema: DataSchema[] = [
    {
      type: 'input',
      name: 'state',
      label: 'State',
    },
    {
      type: 'input',
      name: 'district',
      label: 'District',
    },
    {
      type: 'input',
      name: 'vdc',
      label: 'VDC/Muncipality',
    },
    {
      type: 'input',
      name: 'wardNo',
      label: 'Ward No',
    },
    {
      type: 'input',
      name: 'locality',
      label: 'Locality',
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
