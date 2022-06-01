import { Control } from 'react-hook-form';
import { Box, Grid, GridItem, TextInput } from '@saccos/myra/ui';

import { FormTextInput } from '../../../newFormComponents';

type Props = {
  control: Control<any>;
};

export const RegistrationDetailsOrganization = ({ control }: Props) => {
  return (
    <Box>
      <Grid templateColumns="repeat(3, 1fr)" gap="s16">
        <GridItem>
          <FormTextInput
            label="Regd No"
            placeholder="Regd No"
            control={control}
            name={'RegstrationNo'}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <FormTextInput
            label="Regd Office"
            placeholder="Regd Office"
            control={control}
            name="regOffice"
          />
        </GridItem>
      </Grid>
      <Box mt="s16">
        <FormTextInput
          label="Regd Address"
          placeholder="Regd Address"
          control={control}
          name="regAddress"
        />
      </Box>
      <Grid templateColumns="repeat(3, 1fr)" gap="s16" mt={'s16'}>
        <GridItem>
          <FormTextInput
            label="PAN/VAT No"
            placeholder="PAN/VAT No"
            control={control}
            name="pan/VatNo"
          />
        </GridItem>
      </Grid>
    </Box>
  );
};
