import { Control } from 'react-hook-form';

import { FormPhoneNumber } from '@coop/shared/form';
import { FormInput } from '@coop/shared/form';
import { Box, Grid, GridItem } from '@coop/shared/ui';

type Props = {
  control: Control<any>;
};
export const MainContactPersonOrganization = ({ control }: Props) => {
  return (
    <Box>
      <Grid templateColumns="repeat(3, 1fr)" gap="s16">
        <GridItem>
          {' '}
          <FormInput
            label="Name"
            placeholder="Enter name"
            name={'mainContactPersonName'}
            control={control}
          />
        </GridItem>
        <GridItem>
          <FormPhoneNumber
            label="Contact No"
            name={'mainContactPersonNumber'}
            placeholder="Contact Person Phone"
            control={control}
          />
        </GridItem>
        <GridItem>
          {' '}
          <FormInput
            label="Designation"
            placeholder="Designation"
            control={control}
            name={'mainContactPersonTitle'}
          />
        </GridItem>
      </Grid>
    </Box>
  );
};
