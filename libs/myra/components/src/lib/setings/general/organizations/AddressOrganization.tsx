import { Control } from 'react-hook-form';
import { Box, Grid, GridItem, Select, TextInput } from '@saccos/myra/ui';

import { FormSelect } from '../../../newFormComponents';
import { FormTextInput } from '../../../newFormComponents';
const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];
type Props = {
  control: Control<any>;
};
export const AddressOrganization = ({ control }: Props) => {
  return (
    <Box>
      <Grid templateColumns="repeat(3, 1fr)" gap="s16">
        <GridItem>
          {' '}
          <FormSelect
            label="Province"
            options={options}
            control={control}
            name="organizationProvince"
          />
        </GridItem>
        <GridItem>
          {' '}
          <FormSelect
            label="District"
            options={options}
            control={control}
            name="organizationDistrict"
          />
        </GridItem>
        <GridItem>
          {' '}
          <FormSelect
            label="VDC / Municipality"
            options={options}
            control={control}
            name="organizationVDC"
          />
        </GridItem>
        <GridItem>
          {' '}
          <FormTextInput
            label="Ward No"
            placeholder="Enter Ward"
            control={control}
            name={'organizationWard'}
          />
        </GridItem>
        <GridItem>
          {' '}
          <FormTextInput
            label="Locality"
            placeholder="Locality"
            control={control}
            name={'organizationLocality'}
          />
        </GridItem>
      </Grid>
    </Box>
  );
};
