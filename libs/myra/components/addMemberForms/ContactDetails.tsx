import { DataSchema } from '../form/Form';
import { FormGenerator } from '../form/FormGenerator';
import { Grid } from '../../ui/src/lib/grid/Grid';

export const ContactDetails = ({ debounced }) => {
  const dataSchema: DataSchema[] = [
    {
      type: 'input',
      name: 'mobileNo',
      label: 'Mobile No',
    },
    {
      type: 'input',
      name: 'phoneNo',
      label: 'Phone No',
    },
    {
      type: 'input',
      name: 'email',
      label: 'Email',
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
