import { Control } from 'react-hook-form';
import { Box, Grid, GridItem } from '@coop/shared/ui';

import { FormInput } from '@coop/shared/form';

type Props = {
  control: Control<any>;
};

export const RegistrationDetailsOrganization = ({ control }: Props) => {
  return (
    <Box>
      <Grid templateColumns="repeat(3, 1fr)" gap="s16">
        <GridItem colSpan={2}>
          <FormInput
            label="Regd Office"
            placeholder="Regd Office"
            control={control}
            name="regOffice"
          />
        </GridItem>
        <GridItem>
          <FormInput
            label="Regd No"
            placeholder="Regd No"
            control={control}
            name={'RegstrationNo'}
          />
        </GridItem>
      </Grid>
      <Box mt="s16">
        <FormInput
          label="Regd Address"
          placeholder="Regd Address"
          control={control}
          name="regAddress"
        />
      </Box>
      <Grid templateColumns="repeat(3, 1fr)" gap="s16" mt={'s16'}>
        <GridItem>
          <FormInput
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
