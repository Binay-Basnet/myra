import { Control } from 'react-hook-form';

import { FormEmailInput } from '@coop/shared/form';
import { FormPhoneNumber } from '@coop/shared/form';
import { FormInput } from '@coop/shared/form';
import { Box, Grid, GridItem } from '@coop/shared/ui';

type Props = {
  control: Control<any>;
};

export const ContactDetailsOrganization = ({ control }: Props) => {
  return (
    <Box>
      <Grid templateColumns="repeat(3, 1fr)" gap="s16">
        <GridItem>
          {' '}
          <FormPhoneNumber
            control={control}
            name={'contactNumber'}
            label={'Phone No'}
            placeholder={'Phone No'}
          />
        </GridItem>
        <GridItem>
          <FormEmailInput
            label="Email Address"
            placeholder="Email Address"
            name={'Email Address'}
            control={control}
          />
        </GridItem>
        <GridItem>
          {' '}
          <FormInput
            label="Website"
            placeholder="Website Address"
            name={'website'}
            control={control}
          />
        </GridItem>
      </Grid>
    </Box>
  );
};
